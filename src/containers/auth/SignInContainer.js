import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* Library */

import useInput from '../../hooks/useInput';
import { useDialog } from '../../hooks/useDialog';
import useLoading from '../../hooks/useLoading';

import InputBox from '../../components/inputbox/InputBox';

import { requestPostSignIn, requestPutNativeToken } from '../../api/user';

import { getUser } from '../../store/user';

import { Paths } from '../../paths';

import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import styles from './SignInContainer.module.scss';
import Logo from '../../static/asset/svg/Logo';
import Naver from '../../static/asset/svg/auth/naver';
import Kakao from '../../static/asset/svg/auth/kakao';
import Facebook from '../../static/asset/svg/auth/facebook';
import { getMobileOperatingSystem } from '../../lib/os';

const cx = classNames.bind(styles);

const SignInContainer = () => {
    const history = useHistory();

    const dispatch = useDispatch();

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const openDialog = useDialog();
    const [onLoading, offLoading] = useLoading();

    const LoginOs = useCallback((JWT_TOKEN) => {
        window.setToken = async (native_token) => {
            try {
                // 푸쉬 토큰 보내기
                const res = await requestPutNativeToken(
                    JWT_TOKEN,
                    native_token,
                );
                if (res.data.msg !== 'success') {
                    alert(res.data.msg);
                }
            } catch (e) {
                alert(e);
            }
        };

        const login_os = getMobileOperatingSystem();
        if (login_os === 'Android') {
            if (typeof window.myJs !== 'undefined') {
                window.myJs.requestToken();
            }
        } else if (login_os === 'iOS') {
            if (typeof window.webkit !== 'undefined') {
                if (typeof window.webkit.messageHandlers !== 'undefined') {
                    window.webkit.messageHandlers.requestToken.postMessage('');
                }
            }
        }
    }, []);

    const onClickLogin = useCallback(async () => {
        onLoading('signIp');
        try {
            const response = await requestPostSignIn(email, password);
            if (response.data.msg === 'success') {
                localStorage.setItem('user_id', response.data.token);
                dispatch(getUser(response.data.token));
                LoginOs(response.data.token);
                history.push(Paths.main.index);
            } else {
                if (response.data.msg === '가입하지 않은 이메일입니다.') {
                    onChangeEmail('');
                    onChangePassword('');
                    openDialog(
                        response.data.msg,
                        '',
                        () => emailRef.current.focus(),
                        false,
                        true,
                    );
                } else if (
                    response.data.msg === '비밀번호가 일치하지 않습니다.'
                ) {
                    onChangePassword('');
                    openDialog(
                        response.data.msg,
                        '',
                        () => passwordRef.current.focus(),
                        false,
                        true,
                    );
                } else openDialog(response.data.msg);
            }
        } catch (e) {
            console.error(e);
            offLoading('signIp');
        }
        offLoading('signIp');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        email,
        password,
        dispatch,
        history,
        openDialog,
        onChangeEmail,
        onChangePassword,
    ]);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('logo')}>
                <Logo />
            </div>

            <InputBox
                className={'input-radius'}
                type={'text'}
                value={email}
                placeholder={'이메일을 입력해주세요.'}
                onChange={onChangeEmail}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onClickLogin();
                }}
                reference={emailRef}
            />

            <InputBox
                className={'input-radius'}
                type={'password'}
                value={password}
                placeholder={'비밀번호를 입력해주세요.'}
                onChange={onChangePassword}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') onClickLogin();
                }}
                reference={passwordRef}
            />

            <div className={cx('right')}>
                <Link to={Paths.auth.find.index}>
                    <ButtonBase className={cx('find')}>
                        아이디/비밀번호 찾기
                    </ButtonBase>
                </Link>
            </div>

            <div className={cx('button-wrapper')}>
                <ButtonBase
                    className={cx('button')}
                    style={{
                        color: '#FFFFFF',
                        background: '#222222',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                    onClick={onClickLogin}
                >
                    로그인
                </ButtonBase>
                <Link to={Paths.auth.signup}>
                    <ButtonBase className={cx('button')}>회원가입</ButtonBase>
                </Link>
            </div>

            <div className={cx('social-text')}>소셜 간편 로그인</div>

            <div className={cx('social-icon-wrapper')}>
                <ButtonBase
                    component="a"
                    href={Paths.api + 'Oauth/naver'}
                    className={cx('social-icon')}
                    style={{ background: '#00BF19' }}
                >
                    <Naver />
                </ButtonBase>
                <ButtonBase
                    component="a"
                    href={Paths.api + 'Oauth/kakao'}
                    className={cx('social-icon')}
                    style={{ background: '#FCE000' }}
                >
                    <Kakao />
                </ButtonBase>
                <ButtonBase
                    component="a"
                    href={Paths.api + 'Oauth/facebook'}
                    className={cx('social-icon')}
                    style={{ background: '#4267B2' }}
                >
                    <Facebook />
                </ButtonBase>
            </div>
        </div>
    );
};

export default SignInContainer;
