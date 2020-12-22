import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import cn from 'classnames/bind';

import { requestPostAuth, requestPostConfirm } from '../../api/mobile';

import useInput from '../../hooks/useInput';
import useKeyDown from '../../hooks/useKeyDown';
import useInterval from '../../hooks/useInterval';
import { useDialog } from '../../hooks/useDialog';
import useLoading from '../../hooks/useLoading';
import useSnackBar from '../../hooks/useSnackBar';

import { isCellPhoneForm } from '../../lib/formatChecker';

import InputBox from '../inputbox/InputBox';
import ConfirmButton from '../button/ConfirmButton';

import styles from './VerifyPhone.module.scss';

const cx = cn.bind(styles);

const getTime = (timer) =>
    `${parseInt(timer / 60000)}:${parseInt((timer % 60000) / 10000)}${parseInt(
        ((timer % 60000) % 10000) / 1000,
    )}`;

const LOADING_PHONE = 'sendVerify';

const VerifyPhone = ({ setCheck }, ref) => {
    const [handleSnackBar] = useSnackBar();

    const [sent, setSent] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [
        phoneNumber,
        handleChangePhoneNumber,
        sendCheck,
        setSendCheck,
    ] = useInput('', isCellPhoneForm, undefined, isConfirm);
    const [timer, setTimer] = useState(0);
    const [verify, handleChangeVerify, verifyCheck] = useInput(
        '',
        (state) => state.length === 6 && timer > 0,
    );
    const [buttonTitle, setButtonTitle] = useState('인증번호 발송');
    const openDialog = useDialog();
    const [onLoading, offLoading] = useLoading();
    const verifyRef = useRef();

    const onClickSendVerify = useCallback(async () => {
        if (sendCheck) {
            onLoading(LOADING_PHONE);
            try {
                const response = await requestPostAuth(phoneNumber);
                if (response.data.msg === 'success') {
                    // openDialog('인증번호를 전송했습니다.');
                    handleSnackBar('인증번호를 전송했습니다.', 'success');
                    setSent(true);
                    setButtonTitle('인증번호 재발송');
                    setTimer(180000);
                    verifyRef.current.focus();
                } else {
                    openDialog('전송실패', '인증번호 전송에 실패했습니다.');
                }
            } catch {
                openDialog(
                    '전송실패',
                    '인증번호를 전송하는 도중 오류가 발생했습니다.',
                );
            }
            offLoading(LOADING_PHONE);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendCheck, phoneNumber, openDialog]);
    const [sendFocus, sendKeyDown] = useKeyDown(onClickSendVerify);

    const onClickVerify = useCallback(async () => {
        if (verifyCheck) {
            onLoading('verify');
            const response = await requestPostConfirm(phoneNumber, verify);
            if (response.data.msg === 'success') {
                // openDialog('인증완료하였습니다.');
                handleSnackBar('인증완료하였습니다', 'success');
                setIsConfirm(true);
                setSendCheck(!sendCheck);
                setButtonTitle('인증완료');
                setTimer(0);
                if (setCheck !== undefined) {
                    setCheck(true);
                }
            } else {
                openDialog('인증실패', '인증번호가 다릅니다');
            }
            offLoading('verify');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        verifyCheck,
        phoneNumber,
        verify,
        setSendCheck,
        sendCheck,
        setCheck,
        openDialog,
    ]);
    const [verifyFocus, verifyKeyDown] = useKeyDown(onClickVerify);

    useInterval(() => setTimer(timer - 1000), sent && timer > 0 ? 1000 : 0);

    useImperativeHandle(ref, () => ({
        phoneNumber,
    }));
    return (
        <section>
            <div className={styles['send-verify']}>
                <InputBox
                    className={'input-box'}
                    type={'number'}
                    value={phoneNumber}
                    placeholder={'ex) 01012341234'}
                    onChange={handleChangePhoneNumber}
                    onKeyDown={sendKeyDown}
                ></InputBox>

                <div className={cx('confirm-button')}>
                    <ConfirmButton
                        button_name={buttonTitle}
                        disable={!sendCheck}
                        focus={sendFocus}
                        onClick={onClickSendVerify}
                    ></ConfirmButton>
                </div>
            </div>
            <div className={cx('verify-phone', { sent, isConfirm })}>
                <InputBox
                    className={'input-box'}
                    type={'number'}
                    value={verify}
                    placeholder={'인증번호 입력'}
                    onChange={handleChangeVerify}
                    onKeyDown={verifyKeyDown}
                    reference={verifyRef}
                ></InputBox>
                <div className={styles['timer']}>
                    {timer !== 0 && getTime(timer)}
                </div>
                <div className={styles['confirm-button']}>
                    <ConfirmButton
                        button_name={'인증완료'}
                        disable={!verifyCheck}
                        focus={verifyFocus}
                        onClick={onClickVerify}
                    ></ConfirmButton>
                </div>
            </div>
        </section>
    );
};

export default forwardRef(VerifyPhone);
