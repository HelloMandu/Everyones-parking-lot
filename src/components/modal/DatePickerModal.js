import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//styles

import cn from 'classnames/bind';
//components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Header from '../header/Header';
import Select from '../../static/asset/svg/detail/Select';
import { ButtonBase, IconButton } from '@material-ui/core';

import Slide from '@material-ui/core/Slide';
import styles from './DatePickerModal.module.scss';
import FixedButton from '../button/FixedButton';
import { Swiper, SwiperSlide } from 'swiper/react';

const cx = cn.bind(styles);
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: 'solid 1px #aaa',
        fontSize: 10,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        minHeight: '100vh',
        zIndex: 3000,
        padding: 0,
        paddingTop: 76,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 60,
        flex: '0 0 auto',
    },
    close: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        left: 14,
        zIndex: 2100,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const test=['00','10','20','30','40','50'];
const DatePickerModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const list = test.map((data) => (
        <SwiperSlide className={styles['swiper-slide']} key={data}>
            <DateItem minute={data} />
        </SwiperSlide>
    ));
    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
            className={classes.dialog}
        >
            <Header title={'대여시간 설정'} />
            <DialogContent className={classes.content}>
                <div className={styles['container']}>
                    <div className={styles['total-date']}>
                        <h1>총 1일 2시간 대여</h1>
                        <p>10/07(수) 15:00 ~ 10/08(목) 17:00</p>
                    </div>
                    <div className={cx('date-box', { open })}>
                        <div className={styles['txt-value']}>
                            <div className={styles['txt']}>입차 시각</div>
                            <ButtonBase
                                className={styles['value']}
                                onClick={() => setOpen(!open)}
                            >
                                10/07(수) 15:00
                                <Select />
                            </ButtonBase>
                        </div>

                        <Swiper
                            direction={'vertical'}
                            initialSlide={1}
                            spaceBetween={5}
                            slidesPerView={3}
                            loop
                            centeredSlides={true}
                            className={styles['date-swiper']}
                            onSlideChange={(swiper) => {
                                console.log(swiper.activeIndex);
                                console.log(swiper);
                            }}
                        >
                            {list}
                        </Swiper>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
const DateItem = ({minute}) => {
    return (
    <div className={styles['date-item']}>
        <div className={styles['day']}>
        10/07 (수)
        </div>
        <div className={styles['hour']}>
        15시
        </div>
        <div className={styles['minute']}>
        {minute}분
        </div>
    </div>
    )
};

export default DatePickerModal;
