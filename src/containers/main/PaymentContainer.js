import React, { forwardRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';

import useInput from '../../hooks/useInput';
import { numberFormat } from '../../lib/formatter';

import { Paths } from '../../paths/index';

import PaymentTypeModal from '../../components/payment/PaymentTypeModal';
import EnrollCouponModal from '../../components/payment/EnrollCouponModal';

import ParkingInfo from '../../components/parking/ParkingInfo';
import VerifyPhone from '../../components/verifyphone/VerifyPhone';
import CheckBox from '../../components/checkbox/CheckBox';
import FixedButton from '../../components/button/FixedButton';
import InputBox from '../../components/inputbox/InputBox';
import ConfirmButton from '../../components/button/ConfirmButton';

import ArrowSmall from '../../static/asset/svg/ArrowSmall';

import styles from './PaymentContainer.module.scss';
import useModal from '../../hooks/useModal';

const Point = () => {
    const [point, handleChangePoint] = useInput('');
    return (
        <>
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
        </>
    );
};

const Price = () => {
    return (
        <div className={styles['final-payment']}>
            <div className={styles['total-payment']}>
                <div className={styles['title']}>최종 결제금액</div>
                <div className={styles['price']}>{numberFormat(60000)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>대여비</div>
                <div className={styles['price']}>{numberFormat(60000)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>보증금</div>
                <div className="price">{numberFormat(10000)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>쿠폰 할인</div>
                <div className={styles['price']}>{numberFormat(-1000)}원</div>
            </div>
            <div className={styles['payment']}>
                <div className={styles['title']}>포인트 할인</div>
                <div className={styles['price']}>{numberFormat(-1000)}원</div>
            </div>
        </div>
    );
};

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
    const [isOpenCoupon, openCouponModal] = useModal(Paths.main.payment.coupon);
    const [isOpenPayment, OpenPayment] = useModal(Paths.main.payment.type, [
        Paths.main.payment.type,
        Paths.main.payment.enrollment,
    ]);
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
                        onClick={openCouponModal}
                    >
                        <div className={styles['coupon']} name="coupon">
                            오픈 이벤트 10% 할인 이벤트 쿠폰
                        </div>
                        <ArrowSmall rotate={180}></ArrowSmall>
                    </div>
                </div>
                <div className={styles['parkingpayment-wrapper']}>
                    <div className={styles['title']}>{'포인트 할인'}</div>
                    <Point></Point>
                </div>
                <div className={styles['parkingpayment-wrapper']}>
                    <div className={styles['title']}>결제수단</div>
                    <div className={styles['verify-payment']}>
                        <div
                            className={styles['payment']}
                            name="payment"
                            onClick={OpenPayment}
                        >
                            카카오페이
                        </div>
                        <ArrowSmall rotate={90}></ArrowSmall>
                    </div>
                </div>
                <Price></Price>
                <CheckBox
                    allCheckTitle={enrollTitle}
                    checkListProps={enroll}
                ></CheckBox>
            </div>
            <FixedButton
                button_name={'68,000원 결제'}
                disable={false}
                onClick={()=>history.push(Paths.main.payment_complete)}
            ></FixedButton>
            <Dialog
                fullScreen
                open={isOpenCoupon}
                TransitionComponent={Transition}
            >
                <EnrollCouponModal></EnrollCouponModal>
            </Dialog>
            <Dialog
                fullScreen
                open={isOpenPayment}
                TransitionComponent={Transition}
            >
                <PaymentTypeModal></PaymentTypeModal>
            </Dialog>
        </>
    );
};

export default ParkingEnrollContainer;
