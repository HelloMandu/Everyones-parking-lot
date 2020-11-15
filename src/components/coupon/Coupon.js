import React, { useCallback, useState } from 'react';
import cn from 'classnames/bind';

import CouponCheckBox from './CouponCheckBox';

import { numberFormat } from '../../lib/formatter';

import styles from './Coupon.module.scss';

const cx = cn.bind(styles);

const CouponItem = ({ subject, endDate, price, checked }) => {
    return (
        <>
            <div className={styles['default']}>coupon</div>
            <div className={styles['description']}>
                <div className={styles['subject']}>{subject}</div>
                <div className={styles['price']}>{endDate}</div>
                <div className={styles['end-date']}>
                    {numberFormat(price)}원
                </div>
            </div>
            <div className={styles['state-box']}>
                <div className={cx({ checked })}></div>
            </div>
        </>
    );
};

const Coupon = () => {
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
            cp_subject: '첫 대여 할인쿠폰',
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
            setCouponList(
                couponList.map((coupon) =>
                    coupon.id === id
                        ? { ...coupon, checked: true }
                        : { ...coupon, checked: false },
                ),
            );
        },
        [couponList],
    );
    return (
        <ul className={styles['coupon-list']}>
            {couponList.map(
                ({ cp_id, cp_subject, cp_end_date, cp_price, checked }) => (
                    <li
                        className={styles['coupon-item']}
                        key={cp_id}
                        onClick={() => onClickCoupon(cp_id)}
                    >
                        <CouponItem
                            subject={cp_subject}
                            endDate={cp_end_date}
                            price={cp_price}
                            checked={checked}
                        ></CouponItem>
                    </li>
                ),
            )}
        </ul>
    );
};

export default Coupon;
