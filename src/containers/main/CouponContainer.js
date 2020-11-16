import React, { useCallback, useState } from 'react';

import SwiperCore, { Controller, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';

import Coupon from '../../components/coupon/Coupon';
import ArrowSmall from '../../static/asset/svg/ArrowSmall';

import styles from './CouponContainer.module.scss';
import 'swiper/swiper.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Controller, Scrollbar]);

const CouponContainer = () => {
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);
    const [couponList, setCouponList] = useState([
        {
            cp_id: 1,
            cp_subject: '첫 대여 할인쿠폰',
            cp_start_date: '2020/11/15',
            cp_end_date: '2021/11/15',
            cp_price: 3000,
            checked: false,
            use_status: 0,
        },
        {
            cp_id: 2,
            cp_subject: '첫 대여 할인 쿠폰',
            cp_start_date: '2020/11/15',
            cp_end_date: '2021/11/15',
            cp_price: 3000,
            checked: false,
            use_status: 0,
        },
        {
            cp_id: 3,
            cp_subject: '첫 대여 할인쿠폰',
            cp_start_date: '2020/11/15',
            cp_end_date: '2021/11/15',
            cp_price: 3000,
            checked: false,
            use_status: 0,
        },
    ]);
    const onClickCoupon = useCallback(
        (id) => {
            const newCouponList = couponList.map((coupon) =>
                coupon.cp_id === id
                    ? { ...coupon, checked: !coupon.checked }
                    : { ...coupon, checked: false },
            );
            setCouponList(newCouponList);
        },
        [couponList],
    );

    return (
        <>
            <Swiper
                onSwiper={setFirstSwiper}
                controller={{ control: secondSwiper }}
                slidesPerView={3}
            >
                <SwiperSlide>test1</SwiperSlide>
                <SwiperSlide>test1</SwiperSlide>
                <SwiperSlide>test1</SwiperSlide>
            </Swiper>
            <div className={styles['order']}>
                <div className={styles['order-select']}>
                    <select>
                        <option value={'temp'} defaultValue>
                            최신순
                        </option>
                    </select>
                    <ArrowSmall rotate={180}></ArrowSmall>
                </div>
            </div>
            <Swiper
                onSwiper={setSecondSwiper}
                controller={{ control: firstSwiper }}
                spaceBetween={50}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <Coupon list={couponList}></Coupon>
                </SwiperSlide>
                <SwiperSlide>
                    <Coupon list={couponList} onClick={onClickCoupon}></Coupon>
                </SwiperSlide>
                <SwiperSlide>
                    <Coupon list={couponList}></Coupon>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default CouponContainer;
