import React from "react";
import { IconButton } from '@mui/material';

export default function({ label, onPress, Icon }) {
  return (
    <IconButton
        color="primary"
        aria-label="Reset"
        component="span" onClick={reset}>
        {Icon}
        Refresh
    </IconButton>
  )
}

