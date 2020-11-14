import React from 'react';
import { ButtonBase } from '@material-ui/core'
/* Library */

import styles from './LoginContainer.module.scss'
import logo from '../../static/asset/png/logo.png'
import background from '../../static/asset/png/auth_background.png'

import Naver from '../../static/asset/svg/naver'
import Kakao from '../../static/asset/svg/kakao'
import Facebook from '../../static/asset/svg/facebook'
import Email from '../../static/asset/svg/mail'

const Button = ({ name, color, backgroundColor, children }) => {
    return (
        <ButtonBase className={styles["button"]} style={{color:`${color}`, background:`${backgroundColor}`}}>
            {children}
            {name}
        </ButtonBase>
    );
}

const LoginContainer = () => {

    return (
        <div className={styles["container"]}>
            <div className={styles["logo"]}>
                <img src={logo} alt="" />
            </div>

            <div className={styles["background"]}>
                <img src={background} alt="" />
            </div>

            <div className={styles["area"]}>
                <Button name={"네이버로 주차하기"} color={"#EBEBEB"} backgroundColor={"#00BF19"}><Naver /></Button>
                <Button name={"카카오로 주차하기"} color={"#381E1F"} backgroundColor={"#FCE000"}><Kakao /></Button>
                <Button name={"페이스북으로 주차하기"} color={"#EBEBEB"} backgroundColor={"#4267B2"}><Facebook /></Button>
                <Button name={"이메일로 주차하기"} color={"#EBEBEB"} backgroundColor={"#333333"}><Email /></Button>
            </div>
        </div>
    );
};

export default LoginContainer;