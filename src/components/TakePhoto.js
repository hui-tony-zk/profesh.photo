import React from "react";
import { IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const useStyles = {
  root: {
    height: "100%",
    textAlign: "center"
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px"
  },
  img: {
    height: "inherit",
    maxWidth: "inherit"
  },
  input: {
    display: "none"
  }
};

export default function ({stateChanger}) {
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        stateChanger(newUrl)
      }
    }
  };
  return (
    <>
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        onChange={(e) => handleCapture(e.target)}
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <CameraAltIcon fontSize="large" color="primary" />
        </IconButton>
      </label>
    </>
  );
}
