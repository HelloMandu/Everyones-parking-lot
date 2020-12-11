import React, { useCallback, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
/* Library */

import useInput from '../../hooks/useInput';
import { useDialog } from '../../hooks/useDialog'

import InputBox from '../../components/inputbox/InputBox';

import { requestPostSignIn } from '../../api/user'

import { getUser } from '../../store/user';

import { Paths } from '../../paths';

import classNames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import styles from './SignInContainer.module.scss';
import Logo from '../../static/asset/svg/Logo';
import Naver from '../../static/asset/svg/auth/naver';
import Kakao from '../../static/asset/svg/auth/kakao';
import Facebook from '../../static/asset/svg/auth/facebook';

const cx = classNames.bind(styles);

const SignInContainer = () => {
    const history = useHistory()

    const dispatch = useDispatch()

    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const openDialog = useDialog()

    const onClickLogin = useCallback(async () => {
        const response = await requestPostSignIn(email, password)
        
        if(response.data.msg === 'success') {
            localStorage.setItem("user_id", response.data.token)
            dispatch(getUser(response.data.token))
            history.push(Paths.main.index)
        } else {
            openDialog(response.data.msg, '')
            console.log(response.data.msg)
        }
    }, [email, password, dispatch, history, openDialog]);

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
                    <ButtonBase className={cx('button')}>
                        회원가입
                    </ButtonBase>
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
