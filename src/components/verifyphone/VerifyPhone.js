import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from 'react';
import cn from 'classnames/bind';

import useInput from '../../hooks/useInput';

import { isCellPhoneForm } from '../../lib/formatChecker';

import InputBox from '../inputbox/InputBox';
import ConfirmButton from '../button/ConfirmButton';

import styles from './VerifyPhone.module.scss';
import useKeyDown from '../../hooks/useKeyDown';

const cx = cn.bind(styles);

const VerifyPhone = ({setCheck}, ref) => {
    const [sent, setSent] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [phone, handleChangePhone, sendCheck, setSendCheck] = useInput(
        '',
        isCellPhoneForm,
        undefined,
        isConfirm,
    );
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
            setIsConfirm(true);
            setCheck(true);
        }
    }, [verifyCheck, setIsConfirm, setCheck]);
    const [verifyFocus, verifyKeyDown] = useKeyDown(onClickVerify);

    useImperativeHandle(ref, () => ({
        phoneNumber: phone,
    }));
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

export default forwardRef(VerifyPhone);
