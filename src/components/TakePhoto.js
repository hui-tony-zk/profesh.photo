/* Create a functional React component that allows users to upload a photo and crop to a 1:1 aspect ratio */
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop'
import getCroppedImg from '../functions/getCroppedImage';

const UploadAndProcessImage = (props) => {
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const squareImg = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      )
      setCroppedImage(squareImg)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      setImageSrc(newUrl)
      setCroppedImage(null)
    }
  }

  return (
    <>
      <input accept="image/*" type="file" onChange={onSelectFile} />
      {!!imageSrc && (
        <>
          <div style={componentStyles.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <button onClick={showCroppedImage}>Result</button>
          {croppedImage &&
            <img alt="Crop" src={croppedImage} />
          }
        </>
      )}
    </>
  )
}

export default UploadAndProcessImage;

const componentStyles = {
  cropContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    background: '#000'
  }
}