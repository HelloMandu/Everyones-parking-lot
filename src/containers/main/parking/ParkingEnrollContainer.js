import React from 'react';
/* Library */
import useInput from '../../../hooks/useInput';

import Price from './Price';

import ParkingInfo from '../../../components/parking/ParkingInfo';
import ConfirmButton from '../../../components/button/ConfirmButton';
import InputBox from '../../../components/inputbox/InputBox';
import ArrowSmall from '../../../static/asset/svg/ArrowSmall';

import styles from './ParkingEnrollContainer.module.scss';
import VerifyPhone from '../../../components/verifyPhone/VerifyPhone';

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
                    <select className={styles['coupon']} name="coupon">
                        <option value="temp">
                            오픈 이벤트 10% 할인 이벤트 쿠폰
                        </option>
                    </select>
                    <ArrowSmall rotate={180}></ArrowSmall>
                </div>
            </div>
            <div className={styles['parkingpayment-wrapper']}>
                <div className={styles['title']}>{'포인트 할인'}</div>
                <InputBox
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
                <div className={styles['title']}>{'결제수단'}</div>
                <div className={styles['verify-payment']}>
                    <select className={styles['payment']} name="payment">
                        <option value="temp">카카오페이</option>
                    </select>
                    <ArrowSmall rotate={90}></ArrowSmall>
                </div>
            </div>
            <Price></Price>
        </div>
    );
};

export default ParkingEnrollContainer;
