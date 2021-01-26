import React from 'react';
import { Link, useHistory } from 'react-router-dom';
/* Library */

import BasicButton from '../../../components/button/BasicButton';

import { useDialog } from '../../../hooks/useDialog';

import { Paths } from '../../../paths';

import classNames from 'classnames/bind';
import styles from './FindEmailCompleteContainer.module.scss';
import EmailComplete from '../../../static/asset/svg/auth/EmailComplete';

const cx = classNames.bind(styles);

const FindEmailCompleteContainer = () => {
    const openDialog = useDialog();
    const history = useHistory()
    const email = sessionStorage.getItem('session_email')
    let emailSplite
    let userID

    if (email === null) {
        openDialog('잘못된 접근입니다.')
        history.push(Paths.main.index)
    } else {
        emailSplite = email.split('@');
        userID = emailSplite[0].toString();
        if(userID.length > 2) userID = userID.subString(0, userID.length - 2)
        else userID = ''
        userID += '**@' + emailSplite[1].toString()
        sessionStorage.removeItem('session_email')
    }

    return (
        <div className={cx('container')}>
            <div className={cx('area')}>
                <EmailComplete />

                <div className={cx('comment-area')}>
                    <div className={cx('comment')}>
                        찾으시려는 이메일 주소입니다.
                    </div>
                    <div className={cx('email')}>{userID}</div>
                </div>
            </div>

            <Link to={Paths.auth.signin}>
                <BasicButton button_name={'로그인'} disable={false} onClick={sessionStorage.removeItem('session_email')} />
            </Link>
            <Link to={Paths.auth.find.password}>
                <BasicButton
                    button_name={'비밀번호 찾기'}
                    disable={false}
                    color={'gray'}
                    onClick={sessionStorage.removeItem('session_email')}
                />
            </Link>
        </div>
    );
};

export default FindEmailCompleteContainer;
