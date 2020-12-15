import React from 'react';
import styles from './ParkingList.module.scss';
import { ButtonBase } from '@material-ui/core';

import { Swiper, SwiperSlide } from 'swiper/react';
import cn from 'classnames/bind';

//lib
import { numberFormat } from '../../lib/formatter';
import { getFormatDateTime } from '../../lib/calculateDate';
import { Paths } from '../../paths';

const cx = cn.bind(styles);
const ParkingItem = ({
    onClick,
    place_name,
    place_fee,
    place_images,
    oper_start,
    oper_end,
}) => {
    return (
        <ButtonBase className={styles['parking-item']} onClick={onClick}>
            <div className={styles['item-img']} style={{ backgroundImage: 'url(' + Paths.storage + place_images[0].replace('uploads/', '') + ')'}}>
            </div>
            <div className={styles['item-info']}>
                <div className={styles['item-name']}>{place_name}</div>
                <div className={styles['item-price']}>
                    <div className={styles['price']}>
                        {' '}
                        (30분당 {numberFormat(place_fee)}원)
                    </div>
                </div>
                <div className={styles['item-date']}>
                    <div className={styles['title']}>운영시간</div>
                    <div className={styles['value']}>
                        {getFormatDateTime(oper_start)} ~{' '}
                        {getFormatDateTime(oper_end)}
                    </div>
                </div>
            </div>
        </ButtonBase>
    );
};

const ParkingList = ({ onClick, view, slide_list }) => {
    const list = slide_list.map((slide) => (
        <SwiperSlide className={styles['swiper-slide']} key={slide.place_id}>
            <ParkingItem
                place_name={slide.place_name}
                place_fee={slide.place_fee}
                place_images={slide.place_images}
                oper_start={slide.oper_start_time}
                oper_end={slide.oper_end_time}
                onClick={onClick}
            />
        </SwiperSlide>
    ));
    return (
        <Swiper
            initialSlide={0}
            spaceBetween={15}
            slidesPerView={1}
            centeredSlides={true}
            className={cx('swiper', { view })}
        >
            {list}
        </Swiper>
    );
};

export default ParkingList;
