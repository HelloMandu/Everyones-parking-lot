import React, { useCallback, useRef, useEffect, useMemo } from 'react';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import InputBox from '../../../../components/inputbox/InputBox';
/* Components */

import styles from './UpdatePasswordContainer.module.scss';
/* Stylesheets */

import useInput from '../../../../hooks/useInput';
import { useState } from 'react';
/* Hooks */

const UpdatePasswordContainer = () => {

    const toNewPasswordRef = useRef(null);
    const toConfirmPasswordRef = useRef(null);

    const [curPassword, onChangeCurPassword] = useInput('');
    const [newPassword, onChangeNewPassword] = useInput('');
    const [confirmPassword, onChangeConfirmPassword] = useInput('');

    const [message, setMessage] = useState('');
    const [password, setPassword] = useState(false);
    const [messageStyle, setMessageStyle] = useState({});


    const onClickButton = useCallback(() => {
        // 업데이트 요청
        alert("비밀번호 업데이트");
    }, []);

    useMemo(() => {
        if (confirmPassword !== "") {
            setMessageStyle({ height: "15px" });
        } else {
            setMessageStyle({ height: "0px" });
        }
    }, [confirmPassword]);

    const CheckPassword = useCallback(() => {
        setMessage(
            confirmPassword === "" ? (
                ""
            ) : newPassword === confirmPassword ? (
                <div className={styles['success']}>비밀번호가 일치합니다.</div>
            ) : (<div className={styles['failure']}>비밀번호가 불일치합니다.</div>)
        );
        if (curPassword !== '' && newPassword !== '' && confirmPassword !== '' && newPassword === confirmPassword) {
            setPassword(true);
        } else {
            setPassword(false);
        }
    }, [curPassword, newPassword, confirmPassword])

    useEffect(() => {
        CheckPassword();
    }, [CheckPassword])

    return (
        <div className={styles['container']}>
            <div className={styles['input-area']}>
                <div className={styles['cur-area']}>
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        value={curPassword}
                        placeholder={'현재 비밀번호'}
                        onChange={onChangeCurPassword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') toNewPasswordRef.current.focus();
                        }}
                    />
                </div>
                <div className={styles['new-area']}>
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        value={newPassword}
                        placeholder={'새 비밀번호'}
                        onChange={onChangeNewPassword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') toConfirmPasswordRef.current.focus();
                        }}
                        reference={toNewPasswordRef}
                    />
                </div>
                <div className={styles['confirm-area']}>
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        value={confirmPassword}
                        placeholder={'비밀번호 재확인'}
                        onChange={onChangeConfirmPassword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') CheckPassword();
                        }}
                        reference={toConfirmPasswordRef}
                    />
                </div>
                <div className={styles['text-area']} style={messageStyle}>{message}</div>
            </div >
            <FixedButton button_name="변경" disable={!password} onClick={onClickButton} />
        </div >
    );
};

export default UpdatePasswordContainer;