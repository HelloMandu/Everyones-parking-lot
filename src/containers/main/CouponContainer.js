import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

import Coupon from '../../components/coupon/Coupon';
import ArrowSmall from '../../static/asset/svg/ArrowSmall';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';

import styles from './CouponContainer.module.scss';

SwiperCore.use([Pagination]);

const category = [
    {
        id: 1,
        title: '내 쿠폰',
    },
    {
        id: 2,
        title: '쿠폰북',
    },
    {
        id: 3,
        title: '사용내역',
    },
];

const CouponContainer = () => {
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
        {
            cp_id: 4,
            cp_subject: '첫 대여 할인쿠폰',
            cp_start_date: '2020/11/15',
            cp_end_date: '2021/11/15',
            cp_price: 3000,
            checked: false,
            use_status: 0,
        },
        {
            cp_id: 5,
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
    const swiperRef = useRef(null);
    useEffect(() => {
        const paginationBullet = document.querySelector('.swiper-pagination');
        paginationBullet.classList += styles['swiper-pagination'];
        paginationBullet.style.position = 'fixed';
        paginationBullet.style.top = '55px';
        paginationBullet.style.marginLeft = '20px';
        for (let i = 0; i < category.length; i++) {
            paginationBullet.children[i].innerHTML = category[i].title;
            paginationBullet.children[i].style.display = 'inline-block';
            paginationBullet.children[i].style.width = '65px';
            paginationBullet.children[i].style.height = '21px';
            paginationBullet.children[i].style.background = 'inherit';
            paginationBullet.children[i].style.fontSize = '16px';
            paginationBullet.children[i].style.fontWeight = 'bold';
        }
    }, []);
    return (
        <>
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
                id="category-swiper"
                className={styles['coupon-swiper']}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log(swiperRef.current.activeIndex)}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    console.log(swiperRef.current);
                }}
                pagination={{
                    clickable: true,
                }}
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
