import React from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';

export default function ({ resetState }) {
    const reset = async () => {
        resetState(null)
    }
    return (
        <div>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={reset}>
                Refresh
            </Button>
        </div>
    );
};