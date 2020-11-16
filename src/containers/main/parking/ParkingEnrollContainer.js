import React, { forwardRef, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';

import { Paths } from '../../../paths/index';

import EnrollCouponContainer from './EnrollCouponContainer';

import ParkingInfo from '../../../components/parking/ParkingInfo';
import VerifyPhone from '../../../components/verifyphone/VerifyPhone';
import CheckBox from '../../../components/checkbox/CheckBox';
import FixedButton from '../../../components/button/FixedButton';

import Point from './Point';
import Price from './Price';

import ArrowSmall from '../../../static/asset/svg/ArrowSmall';

import styles from './ParkingEnrollContainer.module.scss';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ParkingEnrollContainer = () => {
    const [openCoupon, setOpenCoupon] = useState(false);
    const onOpenCoupon = useCallback(() => {
        setOpenCoupon(true);
    }, [setOpenCoupon]);
    const offOpenCoupon = useCallback(() => {
        setOpenCoupon(false);
    }, [setOpenCoupon]);
    const history = useHistory();
    return (
        <>
            <div className={styles['parkingpayment-container']}>
                <ParkingInfo></ParkingInfo>
                <div className={styles['parkingpayment-wrapper']}>
                    <div className={styles['title']}>{'대여자 연락처'}</div>
                    <VerifyPhone></VerifyPhone>
                </div>
                <div className={styles['parkingpayment-wrapper']}>
                    <div className={styles['title']}>{'쿠폰 할인'}</div>
                    <div
                        className={styles['verify-coupon']}
                        onClick={() => {
                            history.push(Paths.main.parking.enrollment.coupon);
                        }}
                    >
                        <div
                            className={styles['coupon']}
                            name="coupon"
                            onClick={onOpenCoupon}
                        >
                            오픈 이벤트 10% 할인 이벤트 쿠폰
                        </div>
                        <ArrowSmall rotate={180}></ArrowSmall>
                    </div>
                    <Dialog
                        fullScreen
                        open={openCoupon}
                        onClose={offOpenCoupon}
                        TransitionComponent={Transition}
                    >
                        <EnrollCouponContainer
                            offCoupon={offOpenCoupon}
                        ></EnrollCouponContainer>
                    </Dialog>
                </div>
                <div className={styles['parkingpayment-wrapper']}>
                    <div className={styles['title']}>{'포인트 할인'}</div>
                    <Point></Point>
                </div>
                <div className={styles['parkingpayment-wrapper']}>
                    <div className={styles['title']}>결제수단</div>
                    <div className={styles['verify-payment']}>
                        <div className={styles['payment']} name="payment">
                            카카오페이
                        </div>
                        <ArrowSmall rotate={90}></ArrowSmall>
                    </div>
                </div>
                <Price></Price>
                <CheckBox></CheckBox>
            </div>
            <FixedButton
                button_name={'68,000원 결제'}
                disable={false}
            ></FixedButton>
        </>
    );
};

export default ParkingEnrollContainer;
