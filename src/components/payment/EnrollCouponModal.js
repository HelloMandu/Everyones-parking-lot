import React, { useState, useCallback, forwardRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';

import { useDialog } from '../../hooks/useDialog';
import { requestGetCoupon } from '../../api/payment';

import Coupon from '../coupon/Coupon';
import Header from '../header/Header';
import FixedButton from '../button/FixedButton';

import styles from './EnrollCouponModal.module.scss';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EnrollCouponContainer = ({ open, setCoupon, price, placeId }) => {
    const history = useHistory();
    const openDialog = useDialog();
    const [useCoupon, setUseCoupon] = useState(false);
    const [couponList, setCouponList] = useState([]);
    const handleCouponApply = useCallback(
        (id) => {
            const newCouponList = couponList.map((coupon) =>
                coupon.cz_id === id
                    ? { ...coupon, checked: !coupon.checked }
                    : { ...coupon, checked: false },
            );
            setCouponList(newCouponList);
            const seleted = newCouponList.reduce(
                (prev, cur) => prev || cur.checked,
                false,
            );
            setUseCoupon(seleted);
            if (!seleted) {
                setCoupon({ cp_subject: '쿠폰 선택', cp_price: 0, cp_id: 0 });
            }
        },
        [couponList, setCoupon],
    );
    const handleEnrollCoupon = useCallback(() => {
        const selectedCoupon = couponList.find(({ checked }) => checked);
        const { cp_price } = selectedCoupon;
        if (price >= cp_price) {
            setCoupon(selectedCoupon);
            history.goBack();
        } else {
            openDialog(
                '사용 불가',
                '결제금액 이상의 쿠폰은 사용하실 수 없습니다',
            );
        }
    }, [couponList, price, setCoupon, history, openDialog]);
    useEffect(() => {
        const getCouponList = async () => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            if(JWT_TOKEN){
                const { coupons } = await requestGetCoupon(JWT_TOKEN, placeId);
                setCouponList(coupons);
            }
        };
        getCouponList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <Header title={'적용쿠폰선택'}></Header>
            <main className={styles['enroll-coupon']}>
                <Coupon
                    list={couponList}
                    onClick={handleCouponApply}
                    clicked={true}
                ></Coupon>
                <FixedButton
                    button_name={'쿠폰적용'}
                    disable={!useCoupon}
                    onClick={handleEnrollCoupon}
                ></FixedButton>
            </main>
        </Dialog>
    );
};

export default EnrollCouponContainer;
