import React, { forwardRef } from 'react';
import { Dialog, Slide } from '@material-ui/core';

import useInput from '../../hooks/useInput';

import InputBox from '../inputbox/InputBox';
import FixedButton from '../button/FixedButton';

import styles from './CouponCodeModal.module.scss';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CouponCodeModal = ({ open }) => {
    const [couponCode, onChangeCouponCode] = useInput('');
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
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
        </Dialog>
    );
};

export default CouponCodeModal;
