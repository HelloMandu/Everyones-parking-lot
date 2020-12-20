import React from 'react';
import { useHistory } from 'react-router-dom'
/* Library */

import { Paths } from '../../paths'

import classNames from 'classnames/bind'
import styles from './LoginContainer.module.scss'
import Logo from '../../static/asset/svg/Logo'
import Naver from '../../static/asset/svg/auth/naver'
import Kakao from '../../static/asset/svg/auth/kakao'
import Facebook from '../../static/asset/svg/auth/facebook'
import Email from '../../static/asset/svg/auth/mail'
import XButton from '../../static/asset/svg/auth/XButton'
import { ButtonBase, IconButton } from '@material-ui/core'

const cx = classNames.bind(styles)

const Button = ({ name, color, backgroundColor, linkTo, children }) => {
    return (
        <ButtonBase component="a" href={linkTo} className={cx("button")} style={{color:`${color}`, background:`${backgroundColor}`}}>
            {children}
            {name}
        </ButtonBase>
    );
}

const LoginContainer = () => {
    const history = useHistory()
    
    const onClickBack = () => history.push(Paths.main.index)

    return (
        <div className={cx('container')}>
            <div className={cx("logo")}>
                <Logo />
            </div>

            <IconButton onClick={onClickBack} ><XButton /></IconButton>

            <div className={cx("area")}>
                <Button name={"네이버로 주차하기"} color={"#EBEBEB"} backgroundColor={"#00BF19"} linkTo={Paths.api + 'Oauth/naver'} ><Naver /></Button>
                <Button name={"카카오로 주차하기"} color={"#381E1F"} backgroundColor={"#FCE000"} linkTo={Paths.api + 'Oauth/kakao'}><Kakao /></Button>
                <Button name={"페이스북으로 주차하기"} color={"#EBEBEB"} backgroundColor={"#4267B2"} linkTo={Paths.api + 'Oauth/facebook'}><Facebook /></Button>
                <Button name={"이메일로 주차하기"} color={"#EBEBEB"} backgroundColor={"#333333"} linkTo={Paths.auth.signin}><Email /></Button>
            </div>
        </div>
    );
};

export default LoginContainer;