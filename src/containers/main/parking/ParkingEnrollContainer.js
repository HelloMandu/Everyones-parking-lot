import React from 'react';
/* Library */
import useInput from '../../../hooks/useInput';

import ParkingInfo from '../../../components/parking/ParkingInfo';
import VerifyPhone from '../../../components/verifyphone/VerifyPhone';
import CheckBox from '../../../components/checkbox/CheckBox';
import Price from './Price';

import InputBox from '../../../components/inputbox/InputBox';
import ConfirmButton from '../../../components/button/ConfirmButton';
import ArrowSmall from '../../../static/asset/svg/ArrowSmall';

import styles from './ParkingEnrollContainer.module.scss';

const ParkingEnrollContainer = () => {
    const [point, handleChangePoint] = useInput(0);
    return (
        <div className={styles['parkingpayment-container']}>
            <ParkingInfo></ParkingInfo>
            <div className={styles['parkingpayment-wrapper']}>
                <div className={styles['title']}>{'대여자 연락처'}</div>
                <VerifyPhone></VerifyPhone>
            </div>
            <div className={styles['parkingpayment-wrapper']}>
                <div className={styles['title']}>{'쿠폰 할인'}</div>
                <div className={styles['verify-coupon']}>
                    <div className={styles['coupon']} name="coupon">
                        오픈 이벤트 10% 할인 이벤트 쿠폰
                    </div>
                    <ArrowSmall rotate={180}></ArrowSmall>
                </div>
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
    );
};

export default ParkingEnrollContainer;
