import React, { forwardRef } from 'react';

import { Dialog, Slide } from '@material-ui/core';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImageModal = ({ open }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
        ></Dialog>
    );
};

export default ImageModal;
