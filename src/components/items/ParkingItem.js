import React from 'react';
import styles from './ParkingItem.module.scss';
import { ButtonBase } from '@material-ui/core';
// import { numberFormat } from '../../lib/formatter';
import ParkingImg from '../../static/asset/png/parking.png';
import { Swiper, SwiperSlide } from 'swiper/react';

const ParkingItem = ({onClick}) => {
    return (
        <ButtonBase className={styles['parking-item']} onClick={onClick}>
            <div className={styles['item-img']}>
                <img src={ParkingImg} alt='parking-img'/>
            </div>
            <div className={styles['item-info']}>
                <div className={styles['item-name']}>길동이 주차공간</div>
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

const ParkingList = ({onClick}) => {
    return (
        <Swiper 
        initialSlide={0} 
        spaceBetween={15}
        slidesPerView={1}
        freeMode={true}
        centeredSlides={true}
        className={styles['swiper'] } 
        >
            <SwiperSlide className={styles['swiper-slide']}><ParkingItem onClick={onClick}/></SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}><ParkingItem onClick={onClick}/></SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}><ParkingItem onClick={onClick}/></SwiperSlide>

        </Swiper>
    );
};

// const Test=()=>{
//     return(
//         <div className={styles['test']}>
//                 gd
//         </div>
//     )
// }

export default ParkingList;
