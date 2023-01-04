import React from 'react';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-converter'
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
import { width } from '@mui/system';
// import '@mediapipe/selfie_segmentation';

// docs here: https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/body_pix 
// or here: https://blog.tensorflow.org/2022/01/body-segmentation.html

const configureSegmenter = async () => {
    const model = bodySegmentation.SupportedModels.BodyPix;

    const segmenterConfig = {
        architecture: 'MobileNetV1',
        outputStride: 8,
        multiplier: 1,
        quantBytes: 4
    };

    const segmenter = await bodySegmentation.createSegmenter(model, segmenterConfig);
    return segmenter
}


export default async function (imgSrc) {
    const segmentFacesConfig = {
        multiSegmentation: false,
        segmentBodyParts: true,
        segmentationThreshold: 0.9,
        maxDetections: 1
    };

    const segmenter = await configureSegmenter();

    const imgCanvas = imgSrcToCanvas(imgSrc);

    const segmentation = await segmenter.segmentPeople(imgCanvas, segmentFacesConfig);

    const faceBodyPartIdsToExtract = [0, 1];

    const colorFaceOnly = (id) => {
        if (id in faceBodyPartIdsToExtract) {
            return [255, 255, 255, 255];
        } else {
            return [0, 0, 0, 0];
        }
    };

    const maskedImageData = await bodySegmentation.toColoredMask(segmentation, colorFaceOnly);

    const maskedCanvas = await drawColoredMask(imgCanvas, maskedImageData);

    return maskedCanvas.toDataURL();

}

const imgSrcToCanvas = (imgSrc) => {
    const img = new Image(300, 300);
    img.src = imgSrc;
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height= 300;
    const ctx = canvas.getContext('2d');
    // Scale the image to fit the canvas dimensions
    const scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
    const scaledWidth = img.width * scaleFactor;
    const scaledHeight = img.height * scaleFactor;

    ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
    return canvas
};

const drawColoredMask = async (imgCanvas, maskImage) => {
    const canvas = document.createElement('canvas');
    const maskOpacity = 1;
    const maskBlurAmount = 2;
    await bodySegmentation.drawMask(
        canvas, imgCanvas, maskImage, maskOpacity, maskBlurAmount
    );
    return canvas
};