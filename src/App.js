import React, { useState } from 'react';
import { Grid, Box } from "@mui/material";
import './App.css';

import TakePhoto from './components/TakePhoto';
import ResetButton from './components/ResetButton';
import RemoveBGButton from './components/RemoveBGButton';


function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="App">
          <div className="App-body">
            <div className="App-content">
              {selectedImage ? (
                <>
                  <img alt="Cropped Image" src={selectedImage} style={componentStyles.croppedImageContainer} />
                  <RemoveBGButton selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                  <ResetButton resetState={setSelectedImage} />
                </>
              ) : (
                <>
                  <h5>Take a Selfie!</h5>
                  <TakePhoto selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                </>
              )
              }
            </div></div>
        </div>
      </Grid>
    </Grid>
  );
}

export default App;


const componentStyles = {
  croppedImageContainer: {
    width: '100%',
    maxWidth: '300px'
  }
}