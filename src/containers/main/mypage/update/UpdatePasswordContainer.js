import React, { useCallback, useRef, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import InputBox from '../../../../components/inputbox/InputBox';
/* Components */

import styles from './UpdatePasswordContainer.module.scss';
/* Stylesheets */

import useInput from '../../../../hooks/useInput';
import { useDialog } from '../../../../hooks/useDialog';
import useToken from '../../../../hooks/useToken';
/* Hooks */

import { Paths } from '../../../../paths';
/* Paths */

import { updateUser } from '../../../../store/user';
/* Store */

import { requestPutRePassword } from '../../../../api/user';
/* API */

const UpdatePasswordContainer = () => {

    const history = useHistory();
    const openDialog = useDialog();
    const reduxDispatch = useDispatch();
    const TOKEN = useToken();

    const passwordRef = useRef();
    const toNewPasswordRef = useRef(null);
    const toConfirmPasswordRef = useRef(null);

    const [curPassword, onChangeCurPassword] = useInput('');
    const [newPassword, onChangeNewPassword] = useInput('');
    const [confirmPassword, onChangeConfirmPassword] = useInput('');

    const [message, setMessage] = useState('');
    const [password, setPassword] = useState(false);
    const [messageStyle, setMessageStyle] = useState({});

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPutRePassword(JWT_TOKEN, curPassword, newPassword);
        if (response.msg === 'success') {
            reduxDispatch(updateUser('password', newPassword));
            openDialog("비밀번호변경 완료", "", () => history.replace(Paths.main.mypage.index));
        } else {
            openDialog(response.msg, response.sub);
        }
    }, [history, curPassword, newPassword, openDialog, reduxDispatch]);

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

    useEffect(() => {
        if(passwordRef.current){
            passwordRef.current.focus();
        }
    }, []);

    return (
        <>
            {TOKEN !== null &&
                <>
                    <div className={styles['container']}>
                        <div className={styles['input-area']}>
                            <div className={styles['cur-area']}>
                                <InputBox
                                    className={'input-box'}
                                    type={'password'}
                                    value={curPassword}
                                    placeholder={'현재 비밀번호'}
                                    onChange={onChangeCurPassword}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') toNewPasswordRef.current.focus();
                                    }}
                                    reference={passwordRef}
                                />
                            </div>
                            <div className={styles['new-area']}>
                                <InputBox
                                    className={'input-box'}
                                    type={'password'}
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
                                    type={'password'}
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
                    </div >
                    <FixedButton button_name="변경" disable={!password} onClick={onClickButton} />
                </>
            }
        </>
    );
};

export default UpdatePasswordContainer;