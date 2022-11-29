import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-converter'
import * as bodySegmentation from '@tensorflow-models/body-segmentation';
// import '@mediapipe/selfie_segmentation';

// docs here: https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation/src/body_pix

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


export default async function (imgElement) {
    const segmentFacesConfig = {
        multiSegmentation: false,
        segmentBodyParts: true,
        segmentationThreshold: 0.9,
        maxDetections: 1
    };

    const segmenter = await configureSegmenter();

    const img = document.getElementById('selectedImage');

    const segmentation = await segmenter.segmentPeople(img, segmentFacesConfig);

    const faceBodyPartIdsToExtract = [0, 1];

    const colorFaceOnly = (id) => {
        if (id in faceBodyPartIdsToExtract) {
            return [255, 255, 255, 255];
        } else {
            return [0, 0, 0, 0];
        }
    };
    
    const coloredFace = await bodySegmentation.toColoredMask(segmentation, colorFaceOnly);
    const opacity = 0.99;
    const canvas = document.getElementById('canvas');
    bodySegmentation.drawMask(
        canvas, img, coloredFace, opacity
    );

}


