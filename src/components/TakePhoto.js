/* Create a functional React component that allows users to upload a photo and crop to a 1:1 aspect ratio */
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop'
import Slider from '@mui/material/Slider'
import getCroppedImg from '../functions/getCroppedImage';

const UploadAndProcessImage = ({ selectedImage, setSelectedImage }) => {
  const [rawImage, setRawImage] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const saveCrop = useCallback(async () => {
    try {
      const squareImg = await getCroppedImg(
        rawImage,
        croppedAreaPixels
      )
      setCroppedImage(squareImg)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const resetCrop = () => {
    setCroppedImage(null)
  }

  const finishedCropping = () => {
    setSelectedImage(croppedImage)
  }

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      setRawImage(newUrl)
      setCroppedImage(null)
    }
  }

  return (
    <>
      <input accept="image/*" type="file" onChange={onSelectFile} />
      {rawImage && (
        <>
          {croppedImage ? (
            <>
              <img alt="Crop" src={croppedImage} style={componentStyles.croppedImageContainer} />
              <div>
                <button onClick={resetCrop}>Crop again</button>
                <button onClick={finishedCropping}>Done cropping</button>
              </div>
            </>
          ) : (
            <>
              <div style={componentStyles.cropContainer}>
                <Cropper
                  image={rawImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <Slider
                size="small"
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom"
                valueLabelDisplay="auto"
                onChange={(e, zoom) => setZoom(zoom)}
              />
              <button onClick={saveCrop}>Save Crop</button>
            </>
          )}
        </>
      )}
    </>
  )
}

export default UploadAndProcessImage;

const componentStyles = {
  cropContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    background: '#000'
  },
  croppedImageContainer: {
    width: '100%',
    maxWidth: '300px'
  },
  zoomControl: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    height: 80,
    display: 'flex',
    alignItems: 'center'
  }
}