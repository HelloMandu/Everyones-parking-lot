import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import useToken from '../../hooks/useToken';
import useModal from '../../hooks/useModal';
import { useDialog } from '../../hooks/useDialog';
import {
    requestGetCouponBook,
    requestGetCouponMy,
    requestGetCouponUse,
    requestPostCouponCode,
} from '../../api/coupon';

import Coupon from '../../components/coupon/Coupon';
import CouponCodeModal from '../../components/coupon/CouponCodeModal';
import ArrowSmall from '../../static/asset/svg/ArrowSmall';
import XButton from '../../static/asset/svg/X_button';

import 'swiper/swiper.scss';

import styles from './CouponContainer.module.scss';

const CouponContainer = ({ match }) => {
    const JWT_TOKEN = useToken();
    const [myCoupon, setMyCoupon] = useState([]);
    const [couponBook, setCouponBook] = useState([]);
    const [useCoupon, setuseCoupon] = useState([]);
    const openDialog = useDialog();
    const history = useHistory();
    const { url, params } = match;
    const [isOpenCouponCodeModal, OpenCouponModal] = useModal(
        url,
        params.modal,
        'code',
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
    const onToggleConponCode = useCallback(() => {
        if (isOpenCouponCodeModal) {
            history.goBack();
        } else {
            OpenCouponModal();
        }
    }, [isOpenCouponCodeModal, OpenCouponModal, history]);

    const handleCouponEnroll = useCallback(
        async (id, isInput) => {
            if (JWT_TOKEN) {
                const { msg, coupon } = await requestPostCouponCode(
                    JWT_TOKEN,
                    id,
                );
                if (msg === 'success') {
                    const newCouponList = couponBook.map((coupon) =>
                        coupon.cz_id === id
                            ? { ...coupon, checked: !coupon.checked }
                            : coupon,
                    );
                    setCouponBook(newCouponList);
                    setMyCoupon((myCoupon) => myCoupon.concat(coupon));
                    if (isInput) {
                        history.goBack();
                    }
                } else {
                    openDialog(msg);
                }
            }
        },
        [JWT_TOKEN, couponBook, history, openDialog],
    );

    useEffect(() => {
        const getCouponList = async () => {
            const book = await requestGetCouponBook();
            const my = await requestGetCouponMy();
            const use = await requestGetCouponUse();
            if (book.msg === my.msg && my.msg === use.msg) {
                const couponBook = book.coupons.map(
                    (
                        {
                            cz_id,
                            cz_subject,
                            cz_start_date,
                            cz_end_date,
                            cz_price,
                            down_status,
                        },
                        index,
                    ) => ({
                        cz_id,
                        cp_id: index,
                        cp_subject: cz_subject,
                        cp_start_date: cz_start_date,
                        cp_end_date: cz_end_date,
                        cp_price: cz_price,
                        checked: down_status,
                    }),
                );
                setCouponBook(couponBook);
                setMyCoupon(my.coupons);
                setuseCoupon(use.coupons);
            }
        };
        getCouponList();
    }, []);
    return (
        <>
            <div className={styles['coupon-container']}>
                <ButtonBase
                    className={styles['coupon-input']}
                    onClick={onToggleConponCode}
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
                <section className={styles['order']}>
                    <div className={styles['order-select']}>
                        <select>
                            <option value={'temp'} defaultValue>
                                최신순
                            </option>
                        </select>
                        <ArrowSmall rotate={180}></ArrowSmall>
                    </div>
                </section>
                <Swiper
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
                        <Coupon list={myCoupon}></Coupon>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon
                            list={couponBook}
                            onClick={handleCouponEnroll}
                            clicked={true}
                            book={true}
                        ></Coupon>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Coupon list={useCoupon}></Coupon>
                    </SwiperSlide>
                </Swiper>
            </div>
            <CouponCodeModal
                open={isOpenCouponCodeModal}
                onClick={handleCouponEnroll}
            ></CouponCodeModal>
        </>
    );
};

export default CouponContainer;
