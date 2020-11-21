import React, { useCallback, useState } from 'react';
import cn from 'classnames/bind';

import useInput from '../../hooks/useInput';

import InputBox from '../inputbox/InputBox';
import ConfirmButton from '../button/ConfirmButton';

import styles from './VerifyPhone.module.scss';
import useKeyDown from '../../hooks/useKeyDown';

const cx = cn.bind(styles);

const VerifyPhone = ({ phone, handleChangePhone, sendCheck, setSendCheck, setIsPhone }) => {
    const [sent, setSent] = useState(false);
    const onClickSendVerify = useCallback(() => {
        if (sendCheck) {
            console.log('onClickSendVerify');
            setSendCheck(!sendCheck);
            setSent(true);
        }
    }, [sendCheck, setSendCheck]);
    const [sendFocus, sendKeyDown] = useKeyDown(onClickSendVerify);

    const [verify, handleChangeVerify, verifyCheck] = useInput(
        '',
        (state) => state.length === 6,
    );
    const onClickVerify = useCallback(() => {
        if (verifyCheck) {
            console.log('onClickVerify');
            setIsPhone(true)
        }
    }, [verifyCheck, setIsPhone]);
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
                        disable={!sendCheck}
                        focus={sendFocus}
                        onClick={onClickSendVerify}
                    ></ConfirmButton>
                </div>
            </div>
            <div className={cx('verify-phone', { sent })}>
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
                        onClick={onClickVerify}
                    ></ConfirmButton>
                </div>
            </div>
        </>
    );
};

export default VerifyPhone;
