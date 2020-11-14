import React from 'react';
import { Link } from 'react-router-dom'
import { ButtonBase } from '@material-ui/core'
/* Library */

import { Paths } from '../../paths'

import useInput from '../../hooks/useInput'
import InputBox from '../../components/inputbox/InputBox'

import styles from './SignInContainer.module.scss';
import logo from '../../static/asset/png/logo.png';

import Naver from '../../static/asset/svg/naver'
import Kakao from '../../static/asset/svg/kakao'
import Facebook from '../../static/asset/svg/facebook'

const SignInContainer = () => {
    const [email, onChangeEmail] = useInput("")
    const [password, onChangePassword] = useInput("")

    const onClickLogin = () => {
        console.log("login")
    }

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
            />

            <div className={styles['right']}>
                <Link to={Paths.auth.find.index} ><ButtonBase className={styles['find']}>아이디/비밀번호 찾기</ButtonBase></Link>
            </div>

            <div className={styles['button-wrapper']}>
                <ButtonBase className={styles['button']} style={{color:"#FFFFFF", background:"#222222", fontWeight:"bold", fontSize:"16px"}} >로그인</ButtonBase>
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
