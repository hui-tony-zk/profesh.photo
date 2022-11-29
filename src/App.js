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
          <header className="App-header">
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
          </header>
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