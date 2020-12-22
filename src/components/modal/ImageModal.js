import React from 'react';
import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
/* Library */
import styles from './ImageModal.module.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
/* StyleSheet */

SwiperCore.use([Pagination]);

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ImageModal = ({ title, images, open, handleClose }) => {
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <div className={styles['image-dialog']}>
                <div className={styles['header']}>
                    <IconButton
                        className={styles['close']}
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <h6 className={styles['title']}>{title}</h6>
                </div>
                <Swiper
                    className={styles['swiper']}
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination
                >
                    {images && Array.isArray(images) ? (
                        images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img src={img} alt="img"></img>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <img src={images} alt="img"></img>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </Dialog>
    );
};

export default ImageModal;
