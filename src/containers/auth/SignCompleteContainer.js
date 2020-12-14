import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';

import FixedButton from '../../components/button/FixedButton';

import { Paths } from '../../paths';

import styles from './SignCompleteContainer.module.scss';

import Firework from '../../static/asset/svg/auth/firework';

const cx = classNames.bind(styles);

const SignCompleteContainer = () => {
    const sessionName = sessionStorage.getItem('session_name')
    const history = useHistory()

    const signComplete = useCallback(() => {
        sessionStorage.removeItem('session_name')
        history.push(Paths.main.index)
    }, [history])

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('area')}>
                    <div className={cx('icon-area')}>
                        <Firework />
                    </div>

                    <div className={cx('ment')}>
                        <div className={cx('title')}>가입을 축하합니다.</div>
                        <div className={cx('content')}>
                            {sessionName}님 회원가입이 완료되었습니다.
                        </div>
                    </div>
                </div>
            </div>
                <FixedButton button_name={'이용하러 가기'} disable={false} onClick={signComplete} />
        </>
    );
};
export default SignCompleteContainer;
