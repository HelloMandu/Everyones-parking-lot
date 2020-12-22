import React from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { useSelector } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const TransitionLeft = (props) => {
    return <Slide {...props} direction="left" />;
};

const SnackBar = () => {
    const { open, message } = useSelector((state) => state.snackBar);
    return (
        <Snackbar
            open={open}
            TransitionComponent={TransitionLeft}
            message={message}
            // key={transition ? transition.name : ""}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert severity="success">{message}</Alert>
        </Snackbar>
    );
};

export default SnackBar;
