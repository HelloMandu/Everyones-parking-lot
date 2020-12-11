import React from 'react';
import { Link, useLocation } from 'react-router-dom'
/* Library */

import BasicButton from '../../../components/button/BasicButton';

import { Paths } from '../../../paths'

import classNames from 'classnames/bind';
import styles from './FindEmailCompleteContainer.module.scss';
import EmailComplete from '../../../static/asset/svg/auth/EmailComplete';

const cx = classNames.bind(styles);

const FindEmailCompleteContainer = () => {
    const location = useLocation()
    const email = location.state;
    const emailSplite = email.split('@');
    const userID = emailSplite[0].toString();

    return (
        <div className={cx('container')}>
            <div className={cx('area')}>
                <EmailComplete />

                <div className={cx('comment-area')}>
                    <div className={cx('comment')}>
                        찾으시려는 이메일 주소입니다.
                    </div>
                    <div className={cx('email')}>{`${userID.substring(
                        0,
                        userID.length - 2,
                    )}**@${emailSplite[1].toString()}`}</div>
                </div>
            </div>

            <Link to={Paths.auth.signin} ><BasicButton button_name={'로그인'} disable={false} /></Link>
            <Link to={Paths.auth.find.password} ><BasicButton button_name={'비밀번호 찾기'} disable={false} color={'gray'} /></Link>
        </div>
    );
};

export default FindEmailCompleteContainer;
