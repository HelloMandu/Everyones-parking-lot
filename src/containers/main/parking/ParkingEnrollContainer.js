import React, { forwardRef, useCallback, useState } from 'react';
import {Link} from 'react-router-dom'

import { Dialog,Slide } from '@material-ui/core';

import {Paths} from '../../../paths';

import useInput from '../../../hooks/useInput';

import CouponPage from '../../../pages/main/CouponPage';

import ParkingInfo from '../../../components/parking/ParkingInfo';
import VerifyPhone from '../../../components/verifyphone/VerifyPhone';
import CheckBox from '../../../components/checkbox/CheckBox';
import InputBox from '../../../components/inputbox/InputBox';
import ConfirmButton from '../../../components/button/ConfirmButton';
import FixedButton from '../../../components/button/FixedButton';
import Price from './Price';

import ArrowSmall from '../../../static/asset/svg/ArrowSmall';

import styles from './ParkingEnrollContainer.module.scss';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ParkingEnrollContainer = () => {
    const [point, handleChangePoint] = useInput(0);
    const [openCoupon, setOpenCoupon] = useState(false);
    const onToggleCoupon = useCallback(() => {
        setOpenCoupon(!openCoupon);
    }, [openCoupon]);
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
                    <div className={styles['verify-coupon']}>
                        <div
                            className={styles['coupon']}
                            name="coupon"
                            onClick={onToggleCoupon}
                        >
                            오픈 이벤트 10% 할인 이벤트 쿠폰
                        </div>
                        <ArrowSmall rotate={180}></ArrowSmall>
                    </div>
                    <Link to={Paths.main.coupon}>시발</Link>
                    {/* <Dialog
                        fullScreen
                        open={openCoupon}
                        onClose={onToggleCoupon}
                        TransitionComponent={Transition}
                    >
                        <CouponPage></CouponPage>
                    </Dialog> */}
                </div>
                <div className={styles['parkingpayment-wrapper']}>
                    <div className={styles['title']}>{'포인트 할인'}</div>
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        value={point}
                        placeholder={'사용하실 포인트를 입력해주세요'}
                        onChange={handleChangePoint}
                    ></InputBox>
                    <div className={styles['use-point']}>
                        <div className={styles['point']}>
                            내 보유 포인트 <span>35,000P</span>
                        </div>
                        <div className={styles['confirm-button']}>
                            <ConfirmButton
                                button_name={'전체사용'}
                                disable={false}
                            ></ConfirmButton>
                        </div>
                    </div>
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
