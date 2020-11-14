import React, { useCallback } from 'react';

import useInput from '../../hooks/useInput';

import { isCellPhoneForm } from '../../lib/formatChecker';

import InputBox from '../inputbox/InputBox';
import ConfirmButton from '../../components/button/ConfirmButton';

import styles from './VerifyPhone.module.scss';
import useKeyDown from '../../hooks/useKeyDown';

const VerifyPhone = () => {
    const [phone, handleChangePhone, phoneCheck, setPhoneCheck] = useInput(
        '',
        isCellPhoneForm,
    );
    const onClickSendVerify = useCallback(() => {
        if (phoneCheck) {
            console.log('onClickSendVerify');
            setPhoneCheck(!phoneCheck);
        }
    }, [phoneCheck, setPhoneCheck]);
    const [sendFocus, sendKeyDown] = useKeyDown(onClickSendVerify);

    const [verify, handleChangeVerify, verifyCheck] = useInput(
        '',
        (state) => state.length === 6,
    );
    const onClickVerify = useCallback(() => {
        if (verifyCheck) {
            console.log('onClickVerify');
        }
    }, [verifyCheck]);
    const [verifyFocus, verifyKeyDown] = useKeyDown(onClickVerify);
    return (
        <>
            <div className={styles['send-verify']}>
                <InputBox
                    className={'input-box'}
                    type={'text'}
                    value={phone}
                    placeholder={'ex) 01012341234'}
                    onChange={handleChangePhone}
                    onKeyDown={sendKeyDown}
                ></InputBox>
                <div className={styles['confirm-button']}>
                    <ConfirmButton
                        button_name={'인증번호 발송'}
                        disable={!phoneCheck}
                        focus={sendFocus}
                    ></ConfirmButton>
                </div>
            </div>
            <div className={styles['verify-phone']}>
                <InputBox
                    className={'input-box'}
                    type={'text'}
                    value={verify}
                    placeholder={'인증번호 입력'}
                    onChange={handleChangeVerify}
                    onKeyDown={verifyKeyDown}
                ></InputBox>
                <div className={styles['confirm-button']}>
                    <ConfirmButton
                        button_name={'인증완료'}
                        disable={!verifyCheck}
                        focus={verifyFocus}
                    ></ConfirmButton>
                </div>
            </div>
        </>
    );
};

export default VerifyPhone;
