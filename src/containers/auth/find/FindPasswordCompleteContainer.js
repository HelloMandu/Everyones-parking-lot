import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
/* Library */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';

import InputBox from '../../../components/inputbox/InputBox';

import { isPasswordForm } from '../../../lib/formatChecker';

import { requestPutRePassword } from '../../../api/user'

import { Paths } from '../../../paths'

import classNames from 'classnames/bind'
import styles from './FindPasswordCompleteContainer.module.scss'
import FixedButton from '../../../components/button/FixedButton';

const cx = classNames.bind(styles)

const FindPasswordCompleteContainer = () => {
    const history = useHistory()
    const openDialog = useDialog();
    const token = sessionStorage.getItem('session_pw')

    if(token === null){
        openDialog('잘못된 접근입니다.');
        history.push(Paths.auth.login);
    }

    const [password, onChangePassword] = useInput(
        '',
        isPasswordForm,
    );
    const [passwordCheck, onChangePasswordCheck] = useInput('');
    const [submit, setSubmit] = useState(false)

    const onClickSignUp = useCallback(async() => {
        const resetPW = await requestPutRePassword(token, password)

        if(resetPW.msg === "success"){
            sessionStorage.removeItem('session_pw')
            history.push(Paths.auth.signin)
        } else {
            openDialog(resetPW.msg, "")
        }
    }, [token, password, history, openDialog])

    useEffect(() => {
        if(password !== '' && passwordCheck !== '' && password === passwordCheck) setSubmit(true)
        else setSubmit(false)
    }, [password, passwordCheck])

    return (
        <>
        <div className={cx("container")}>
            <div className={cx("comment")}>인증이 완료되어 비밀번호를 새로 설정합니다.</div>

            <div className={cx('input-wrapper')}>
                    <div className={cx('input-title')}>새 비밀번호</div>
                    <InputBox
                        className={'input-bar'}
                        type={'password'}
                        value={password}
                        placeholder={'비밀번호를 입력해주세요.'}
                        onChange={onChangePassword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onClickSignUp();
                        }}
                    />
                    <InputBox
                        className={'input-bar'}
                        type={'password'}
                        value={passwordCheck}
                        placeholder={'비밀번호를 재입력해주세요.'}
                        onChange={onChangePasswordCheck}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onClickSignUp();
                        }}
                    />
                    <div
                        className={cx(
                            'password-check',
                            { apear: password !== '' || passwordCheck !== '' },
                            {
                                same:
                                    password !== '' &&
                                    password === passwordCheck,
                            },
                        )}
                    >
                        비밀번호가 <span>불</span>일치합니다.
                    </div>
                </div>
        </div>
        <FixedButton button_name={"비밀번호 변경 후 로그인"} disable={!submit} onClick={onClickSignUp} />
        </>
    );
};

export default FindPasswordCompleteContainer;