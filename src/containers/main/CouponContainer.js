import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ButtonBase } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useModal from '../../hooks/useModal';

import Coupon from '../../components/coupon/Coupon';
import CouponCodeModal from '../../components/coupon/CouponCodeModal';
import ArrowSmall from '../../static/asset/svg/ArrowSmall';
import XButton from '../../static/asset/svg/X_button';

import 'swiper/swiper.scss';

import styles from './CouponContainer.module.scss';

const CouponContainer = ({ match }) => {
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
    const history = useHistory();
    const { url, params } = match;
    const [isOpenCouponCodeModal, OpenCouponModal] = useModal(
        url,
        params.modal,
        'code',
    );
    const onToggleConponCode = useCallback(() => {
        if (isOpenCouponCodeModal) {
            history.goBack();
        } else {
            OpenCouponModal();
        }
    }, [isOpenCouponCodeModal, OpenCouponModal, history]);

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
    const [tabValue, setTabValue] = useState(0);

    const handleTabIndex = useCallback((event, newValue) => {
        setTabValue(newValue);
        swiperRef.current.slideTo(newValue, 300);
    }, []);
    const handleSwiperIndex = useCallback((newValue) => {
        setTabValue(newValue);
        swiperRef.current.slideTo(newValue, 300);
    }, []);
    return (
        <>
            <div className={styles['coupon-container']}>
                <ButtonBase
                    className={styles['coupon-input']}
                    onClick={() => onToggleConponCode()}
                >
                    {!isOpenCouponCodeModal ? '쿠폰입력' : <XButton />}
                </ButtonBase>
                <Tabs
                    className={styles['tabs']}
                    value={tabValue}
                    onChange={handleTabIndex}
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: 'black',
                        },
                    }}
                >
                    <Tab className={styles['tab']} label="내 쿠폰" />
                    <Tab className={styles['tab']} label="쿠폰북" />
                    <Tab className={styles['tab']} label="사용내역" />
                </Tabs>
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
                    onSlideChange={(swiper) =>
                        handleSwiperIndex(swiper.activeIndex)
                    }
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    <SwiperSlide>
                        <Coupon list={couponList}></Coupon>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon
                            list={couponList}
                            onClick={onClickCoupon}
                        ></Coupon>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon list={couponList}></Coupon>
                    </SwiperSlide>
                </Swiper>
            </div>
            <CouponCodeModal open={isOpenCouponCodeModal}></CouponCodeModal>
        </>
    );
};

export default CouponContainer;
