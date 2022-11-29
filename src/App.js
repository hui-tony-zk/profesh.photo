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
            {
              selectedImage ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  border={1}
                >
                  <img src={selectedImage} alt={"snap"} id={"selectedImage"}/>
                  <canvas id={"canvas"}/>
                </Box>
              ) :
                <h5>Take a Selfie!</h5>
            }
            {!selectedImage ?
              <TakePhoto selectedImage={selectedImage} setSelectedImage={setSelectedImage} /> : (
                <>
                  <RemoveBGButton selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                  <ResetButton resetState={setSelectedImage} />
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
