import React from 'react';
import styles from './ParkingItem.module.scss';
import { ButtonBase } from '@material-ui/core';
// import { numberFormat } from '../../lib/formatter';
import ParkingImg from '../../static/asset/png/parking.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import cn from 'classnames/bind';

const cx = cn.bind(styles);
const ParkingItem = ({ onClick, title }) => {
    return (
        <ButtonBase className={styles['parking-item']} onClick={onClick}>
            <div className={styles['item-img']}>
                <img src={ParkingImg} alt="parking-img" />
            </div>
            <div className={styles['item-info']}>
                <div className={styles['item-name']}>{title}</div>
                <div className={styles['item-price']}>
                    <div className={styles['price']}>12,000원</div>
                    <div className={styles['price-to-time']}>
                        (30분당 3000원)
                    </div>
                </div>
                <div className={styles['item-date']}>
                    <div className={styles['title']}>대여시간</div>
                    <div className={styles['value']}>
                        10/5(수)14:00 ~ 10/5(수)16:00
                    </div>
                </div>
            </div>
        </ButtonBase>
    );
};

const ParkingList = ({ onClick, view, slide_list }) => {
    const list = slide_list.map((slide) => (
        <SwiperSlide className={styles['swiper-slide']} key = {slide.title}>
            <ParkingItem  title={slide.title} onClick={onClick} />
        </SwiperSlide>
    ));
    return (
        <Swiper
            initialSlide={0}
            spaceBetween={15}
            slidesPerView={1}
            freeMode={true}
            centeredSlides={true}
            className={cx('swiper', { view })}
        >
            {list}
        </Swiper>
    );
};


export default ParkingList;
