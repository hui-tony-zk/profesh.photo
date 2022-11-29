import React from 'react';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import Button from '@mui/material/Button';
import removeBG from '../functions/removeBG';

export default function ({ selectedImage, setSelectedImage }) {
    const processImage = async () => {
        const image = await removeBG(selectedImage)
    }

    return (
        <div>
            <Button variant="contained" startIcon={<AutoFixHighOutlinedIcon />} onClick={processImage}>
                Remove Background
            </Button>
        </div>
    );
};