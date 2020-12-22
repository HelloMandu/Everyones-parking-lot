import React from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { useSelector } from 'react-redux';

import styles from './SnackBar2.module.scss';

const TransitionLeft = (props) => {
    return <Slide {...props} direction="left" />;
};

const SnackBar = () => {
    const { open, message, variant } = useSelector((state) => state.snackbar);
    return (
        <Snackbar
            className={styles[variant]}
            open={open}
            autoHideDuration={6000}
            TransitionComponent={TransitionLeft}
            message={message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    );
};

export default SnackBar;
