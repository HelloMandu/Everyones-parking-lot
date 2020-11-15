import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ButtonBase } from '@material-ui/core'
/* Library */

import { Paths } from '../../paths'

import useInput from '../../hooks/useInput'
import InputBox from '../../components/inputbox/InputBox'

import { useDialog } from '../../hooks/useDialog'

import styles from './SignInContainer.module.scss';
import logo from '../../static/asset/png/logo.png';

import Naver from '../../static/asset/svg/naver'
import Kakao from '../../static/asset/svg/kakao'
import Facebook from '../../static/asset/svg/facebook'

const SignInContainer = () => {
    const [email, onChangeEmail] = useInput("")
    const [password, onChangePassword] = useInput("")

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const openDialog = useDialog()
    const onClickLogin = async () => {
        console.log(email, password)
        if(email === '') openDialog("이메일을 입력해 주세요", "", () => emailRef.current.focus())
        else if(password === '') openDialog("비밀번호를 입력해 주세요", "", () => passwordRef.current.focus())
        else{
            try {
                const res = await axios.post('http://221.152.146.60:8080/api/user/signin', {
                    email: 'test@test.com'
                });
                console.log(res);

                //res(api 결과)의 메세지에 따라 처리
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    return (
        <div className={styles['container']}>
            <div className={styles['logo']}>
                <img src={logo} alt="" />
            </div>

            <InputBox
                className={"input-radius"}
                type={"text"}
                value={email}
                placeholder={"이메일을 입력해주세요."}
                onChange={onChangeEmail}
                onKeyDown={e => {
                    if(e.key === 'Enter') onClickLogin()
                }}
                reference={emailRef}
            />
            
            <InputBox
                className={"input-radius"}
                type={"password"}
                value={password}
                placeholder={"비밀번호를 입력해주세요."}
                onChange={onChangePassword}
                onKeyDown={e => {
                    if(e.key === 'Enter') onClickLogin()
                }}
                reference={passwordRef}
            />

            <div className={styles['right']}>
                <Link to={Paths.auth.find.index} ><ButtonBase className={styles['find']}>아이디/비밀번호 찾기</ButtonBase></Link>
            </div>

            <div className={styles['button-wrapper']}>
                <ButtonBase className={styles['button']} style={{color:"#FFFFFF", background:"#222222", fontWeight:"bold", fontSize:"16px"}} onClick={onClickLogin} >로그인</ButtonBase>
                <Link to={Paths.auth.signup} ><ButtonBase className={styles['button']} >회원가입</ButtonBase></Link>
            </div>

            <div className={styles['social-text']}>소셜 간편 로그인</div>

            <div className={styles['social-icon-wrapper']}>
                <ButtonBase className={styles["social-icon"]} style={{background: "#00BF19"}} ><Naver /></ButtonBase>
                <ButtonBase className={styles["social-icon"]} style={{background: "#FCE000"}} ><Kakao /></ButtonBase>
                <ButtonBase className={styles["social-icon"]} style={{background: "#4267B2"}} ><Facebook /></ButtonBase>
            </div>
        </div>
    );
};

export default SignInContainer;
