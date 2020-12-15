import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
/* Library */

import ProfileCoverImage from '../asset/ProfileCoverImage';
/* Asset */

import styles from './ImageModal.moudle.scss';
/* StyleSheet */

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImageModal = ({ title, src, open, handleClose }) => {

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar className={styles['appBar']}>
                <Toolbar className={styles['toolBar']}>
                    <IconButton
                        className={styles['close']}
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={styles['title']}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent className={styles['content']}>
                <div className={styles['profile']}>
                    <ProfileCoverImage src={src} size={200} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImageModal;