import React from 'react';
import { Link } from 'react-router-dom'
import { ButtonBase } from '@material-ui/core'
import classNames from 'classnames/bind'
/* Library */

import { Paths } from '../../paths'

import styles from './LoginContainer.module.scss'

import logo from '../../static/asset/png/logo.png'
import background from '../../static/asset/png/auth_background.png'

import Naver from '../../static/asset/svg/naver'
import Kakao from '../../static/asset/svg/kakao'
import Facebook from '../../static/asset/svg/facebook'
import Email from '../../static/asset/svg/mail'

const cx = classNames.bind(styles)

const Button = ({ name, color, backgroundColor, children }) => {
    return (
        <ButtonBase className={cx("button")} style={{color:`${color}`, background:`${backgroundColor}`}}>
            {children}
            {name}
        </ButtonBase>
    );
}

const LoginContainer = () => {

    return (
        <div className={cx('container')}>
            <div className={cx("logo")}>
                <img src={logo} alt="" />
            </div>

            <div className={cx("background")}>
                <img src={background} alt="" />
            </div>

            <div className={cx("area")}>
                <Button name={"네이버로 주차하기"} color={"#EBEBEB"} backgroundColor={"#00BF19"}><Naver /></Button>
                <Button name={"카카오로 주차하기"} color={"#381E1F"} backgroundColor={"#FCE000"}><Kakao /></Button>
                <Button name={"페이스북으로 주차하기"} color={"#EBEBEB"} backgroundColor={"#4267B2"}><Facebook /></Button>
                <Link to={Paths.auth.signin} ><Button name={"이메일로 주차하기"} color={"#EBEBEB"} backgroundColor={"#333333"}><Email /></Button></Link>
            </div>
        </div>
    );
};

export default LoginContainer;