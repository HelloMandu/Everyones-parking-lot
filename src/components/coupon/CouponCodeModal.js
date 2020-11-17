import React from 'react';
import useInput from '../../hooks/useInput';

import InputBox from '../inputbox/InputBox';
import FixedButton from '../button/FixedButton';

import styles from './CouponCodeModal.module.scss';

const CouponCodeModal = () => {
    const [couponCode, onChangeCouponCode] = useInput('');
    return (
        <>
            <div className={styles['coupon-code']}>
                <div className={styles['code-input']}>쿠폰 코드 입력</div>
                <InputBox
                    className={'input-box'}
                    type={'text'}
                    value={couponCode}
                    onChange={onChangeCouponCode}
                    placeholder={'쿠폰 코드를 입력하세요'}
                ></InputBox>
            </div>
            <FixedButton button_name={'쿠폰 입력'}></FixedButton>
        </>
    );
};

export default CouponCodeModal;
