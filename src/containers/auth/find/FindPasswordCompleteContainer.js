import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
/* Library */

import useInput from '../../../hooks/useInput';

import InputBox from '../../../components/inputbox/InputBox';

import { isPasswordForm } from '../../../lib/formatChecker';

import FixedButton from '../../../components/button/FixedButton';

import { useDialog } from '../../../hooks/useDialog';

import { Paths } from '../../../paths'

import styles from './FindPasswordCompleteContainer.module.scss'

const cx = classNames.bind(styles)

const FindPasswordCompleteContainer = () => {
    const openDialog = useDialog();

    const [password, onChangePassword] = useInput(
        '',
        isPasswordForm,
    );
    const [passwordCheck, onChangePasswordCheck] = useInput('');
    const [submit, setSubmit] = useState(false)

    const onClickSignUp = () => {
        if(password === '') openDialog("비밀번호를 입력해주세요", "")
        else {
            if(passwordCheck) openDialog("비밀번호를 재입력해주세요", "")
            else {
                if(!submit) openDialog("비밀번호가 일치하지 않습니다.", "")
                else console.log("onClickSignUp")
            }
        }
    }

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
        <Link to={Paths.auth.signin} ><FixedButton button_name={"비밀번호 변경 후 로그인"} disable={!submit} onClick={onClickSignUp} /></Link>
        </>
    );
};

export default FindPasswordCompleteContainer;