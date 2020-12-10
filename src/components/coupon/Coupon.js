import React, { memo } from 'react';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import CouponCheckBox from '../../static/asset/svg/coupon/CouponCheckBox';
import CouponCheck from '../../static/asset/svg/coupon/CouponCheck';
import CouponDown from '../../static/asset/svg/coupon/CouponDown';
import CouponBox from '../../static/asset/svg/coupon/CouponBox';

import { numberFormat } from '../../lib/formatter';
import { getFormatDateNanTime } from '../../lib/calculateDate';

import styles from './Coupon.module.scss';

const cx = cn.bind(styles);

const CouponItem = memo(({ subject, endDate, price, book, checked }) => {
    const bookCheck = !checked;
    return (
        <>
            <div className={styles['default']}>coupon</div>
            <div className={styles['description']}>
                <div className={styles['subject']}>{subject}</div>
                <div className={styles['price']}>
                    {numberFormat(price)}
                    <span>원</span>
                </div>
                <div className={styles['end-date']}>
                    {getFormatDateNanTime(endDate)}까지
                </div>
            </div>
            <div className={cx('state-box')}>
                <CouponCheckBox></CouponCheckBox>
                {book && (
                    <div className={cx({ book, bookCheck })}>
                        <CouponDown />
                    </div>
                )}
                <div className={cx('check', { checked })}>
                    <CouponCheck></CouponCheck>
                </div>
            </div>
        </>
    );
});

const Coupon = memo(({ list, onClick = () => {}, book = false }) => {
    if (list !== undefined && list.length) {
        return (
            <ul className={styles['coupon-list']}>
                {list.map(
                    (
                        { cp_id, cp_subject, cp_end_date, cp_price, checked },
                        index,
                    ) => (
                        <ButtonBase
                            className={styles['coupon-item']}
                            component="li"
                            key={index}
                            onClick={() => {
                                if (book) {
                                    onClick(cp_id);
                                }
                            }}
                        >
                            <CouponItem
                                subject={cp_subject}
                                endDate={cp_end_date}
                                price={cp_price}
                                checked={checked}
                                book={book}
                            ></CouponItem>
                        </ButtonBase>
                    ),
                )}
            </ul>
        );
    }
    return (
        <div className={styles['coupon-box']}>
            <CouponBox></CouponBox>
            <div className={styles['explain']}>
                보유하고 계신 쿠폰이 없습니다.
            </div>
        </div>
    );
});

export default Coupon;
