import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Coupon from '../../../components/coupon/Coupon';
import FixedButton from '../../../components/button/FixedButton';

import styles from './EnrollCouponContainer.module.scss';

const EnrollCouponContainer = ({ offCoupon }) => {
    const history = useHistory();
    const [useCoupon, setUseCoupon] = useState(false);
    const [couponList, setCouponList] = useState([
        {
            cp_id: 1,
            cp_subject: '첫 대여 할인쿠폰',
            cp_start_date: '2020/11/15',
            cp_end_date: '2021/11/15',
            cp_price: 3000,
            checked: false,
        },
        {
            cp_id: 2,
            cp_subject: '첫 대여 할인 쿠폰',
            cp_start_date: '2020/11/15',
            cp_end_date: '2021/11/15',
            cp_price: 3000,
            checked: false,
        },
        {
            cp_id: 3,
            cp_subject: '첫 대여 할인쿠폰',
            cp_start_date: '2020/11/15',
            cp_end_date: '2021/11/15',
            cp_price: 3000,
            checked: false,
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
            const seleted = newCouponList.reduce(
                (prev, cur) => prev || cur.checked,
                false,
            );
            setUseCoupon(seleted);
        },
        [couponList],
    );

    return (
        <div
            className={styles['enroll-coupon']}
            onClick={() => {
                offCoupon();
                history.goBack();
            }}
        >
            <Coupon list={couponList} onClick={onClickCoupon}></Coupon>
            <FixedButton disable={!useCoupon}></FixedButton>
        </div>
    );
};

export default EnrollCouponContainer;
