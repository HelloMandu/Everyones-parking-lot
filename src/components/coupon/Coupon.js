import React, {memo} from 'react';
import cn from 'classnames/bind';

import CouponCheckBox from './CouponCheckBox';
import CouponCheck from './CouponCheck';

import { numberFormat } from '../../lib/formatter';

import styles from './Coupon.module.scss';
import { ButtonBase } from '@material-ui/core';

const cx = cn.bind(styles);

const CouponItem = memo(({ subject, endDate, price, checked }) => {
    return (
        <>
            <div className={styles['default']}>coupon</div>
            <div className={styles['description']}>
                <div className={styles['subject']}>{subject}</div>
                <div className={styles['price']}>
                    {numberFormat(price)}
                    <span>원</span>
                </div>
                <div className={styles['end-date']}>{endDate}까지</div>
            </div>
            <div className={styles['state-box']}>
                <CouponCheckBox></CouponCheckBox>
                <div className={cx('check', { checked })}>
                    <CouponCheck></CouponCheck>
                </div>
            </div>
        </>
    );
});

const Coupon = ({ list, onClick }) => {
    return (
        <ul className={styles['coupon-list']}>
            {list.map(
                ({ cp_id, cp_subject, cp_end_date, cp_price, checked }) => (
                    <ButtonBase
                        className={styles['coupon-item']}
                        component="li"
                        key={cp_id}
                        onClick={() => {
                            if (onClick !== undefined) {
                                onClick(cp_id);
                            }
                        }}
                    >
                        <CouponItem
                            subject={cp_subject}
                            endDate={cp_end_date}
                            price={cp_price}
                            checked={checked}
                        ></CouponItem>
                    </ButtonBase>
                ),
            )}
        </ul>
    );
};

export default Coupon;
