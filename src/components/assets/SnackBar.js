import React from 'react';
import { Snackbar, Slide } from '@material-ui/core';
import { useSelector } from 'react-redux';
import cn from 'classnames/bind';

import styles from './SnackBar.module.scss';

const cx = cn.bind(styles);

const TransitionLeft = (props) => {
    return <Slide {...props} direction="up" />;
};

const SnackBar = () => {
    const { open, message, variant, up } = useSelector(
        (state) => state.snackbar,
    );
    return (
        <Snackbar
            className={cx('snackbar', variant, { up })}
            open={open}
            autoHideDuration={6000}
            TransitionComponent={TransitionLeft}
            message={message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    );
};

export default SnackBar;
