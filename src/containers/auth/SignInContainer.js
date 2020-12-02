import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import classNames from 'classnames/bind';
/* Library */

import { Paths } from '../../paths';

import useInput from '../../hooks/useInput';
import InputBox from '../../components/inputbox/InputBox';

import { requestPostSignIn } from '../../api/user'

import styles from './SignInContainer.module.scss';
import logo from '../../static/asset/png/logo.png';

import Naver from '../../static/asset/svg/auth/naver';
import Kakao from '../../static/asset/svg/auth/kakao';
import Facebook from '../../static/asset/svg/auth/facebook';

const cx = classNames.bind(styles);

const SignInContainer = () => {
    const history = useHistory()
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const onClickLogin = useCallback(async () => {
        const response = await requestPostSignIn(email, password)
        
        if(response.data.msg === 'success') {
            localStorage.setItem("user_id", response.data.token)
            history.push(Paths.main.index)
        } else {
            console.log(response.data.msg)
        }
    }, [email, password, history]);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('logo')}>
                <img src={logo} alt="" />
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
                    <ButtonBase className={cx('button')}>
                        회원가입
                    </ButtonBase>
                </Link>
            </div>

            <div className={cx('social-text')}>소셜 간편 로그인</div>

            <div className={cx('social-icon-wrapper')}>
                <ButtonBase
                    className={cx('social-icon')}
                    style={{ background: '#00BF19' }}
                >
                    <Naver />
                </ButtonBase>
                <ButtonBase
                    className={cx('social-icon')}
                    style={{ background: '#FCE000' }}
                >
                    <Kakao />
                </ButtonBase>
                <ButtonBase
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
