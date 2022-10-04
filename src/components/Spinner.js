import React from 'react'
import { CircularProgress } from '@mui/material';

const Spinner = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100%", backgroundColor: "rgba(15, 15, 15,0.5)", position: "fixed", zIndex: 1500, }}>
            <CircularProgress className="progress" sx={{ color: "red", backgroundColor: "transparent" }} />
        </div>
    )
}

export default Spinner