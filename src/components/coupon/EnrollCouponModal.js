import React, { useState, useCallback } from 'react';

import Coupon from './Coupon';
import FixedButton from '../button/FixedButton';

import styles from './EnrollCouponModal.module.scss';

const EnrollCouponContainer = () => {
    const [useCoupon, setUseCoupon] = useState(false);
    const [couponList, setCouponList] = useState([
        // {
        //     cp_id: 1,
        //     cp_subject: '첫 대여 할인쿠폰',
        //     cp_start_date: '2020/11/15',
        //     cp_end_date: '2021/11/15',
        //     cp_price: 3000,
        //     checked: false,
        // },
        // {
        //     cp_id: 2,
        //     cp_subject: '첫 대여 할인 쿠폰',
        //     cp_start_date: '2020/11/15',
        //     cp_end_date: '2021/11/15',
        //     cp_price: 3000,
        //     checked: false,
        // },
        // {
        //     cp_id: 3,
        //     cp_subject: '첫 대여 할인쿠폰',
        //     cp_start_date: '2020/11/15',
        //     cp_end_date: '2021/11/15',
        //     cp_price: 3000,
        //     checked: false,
        // },
        // {
        //     cp_id: 4,
        //     cp_subject: '첫 대여 할인쿠폰',
        //     cp_start_date: '2020/11/15',
        //     cp_end_date: '2021/11/15',
        //     cp_price: 3000,
        //     checked: false,
        // },
    ]);
    const onClickCoupon = useCallback(
        (id) => {
            const newCouponList = couponList.map((coupon) =>
                coupon.cp_id === id
                    ? { ...coupon, checked: !coupon.checked }
                    : { ...coupon, checked: false },
            );
            setCouponList(newCouponList);
            const seleted = newCouponList.reduce(
                (prev, cur) => prev || cur.checked,
                false,
            );
            setUseCoupon(seleted);
        },
        [couponList],
    );

    return (
        <div className={styles['enroll-coupon']}>
            <Coupon list={couponList} onClick={onClickCoupon}></Coupon>
            <FixedButton
                button_name={'쿠폰적용'}
                disable={!useCoupon}
            ></FixedButton>
        </div>
    );
};

export default EnrollCouponContainer;
