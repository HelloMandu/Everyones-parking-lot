import React, { forwardRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';

import { Paths } from '../../../paths/index';

import EnrollCouponModal from '../../../components/coupon/EnrollCouponModal';

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

const enrollTitle = '대여자의 정보 제공 및 모든 약관에 동의합니다.';

const enroll = [
    {
        id: 1,
        checked: false,
        description: '개인정보취급방침',
    },
    {
        id: 2,
        checked: false,
        description: '이용약관',
    },
];

const ParkingEnrollContainer = () => {
    const history = useHistory();
    const [openCoupon, setOpenCoupon] = useState(false);
    useEffect(() => {
        setOpenCoupon(
            history.location.pathname === Paths.main.parking.enrollment.coupon,
        );
    }, [history.location.pathname]);
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
                        onClick={() =>
                            history.push(Paths.main.parking.enrollment.coupon)
                        }
                    >
                        <div className={styles['coupon']} name="coupon">
                            오픈 이벤트 10% 할인 이벤트 쿠폰
                        </div>
                        <ArrowSmall rotate={180}></ArrowSmall>
                    </div>
                    <Dialog
                        fullScreen
                        open={openCoupon}
                        TransitionComponent={Transition}
                    >
                        <EnrollCouponModal></EnrollCouponModal>
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
                <CheckBox allCheckTitle={enrollTitle} checkListProps={enroll}></CheckBox>
            </div>
            <FixedButton
                button_name={'68,000원 결제'}
                disable={false}
            ></FixedButton>
        </>
    );
};

export default ParkingEnrollContainer;
