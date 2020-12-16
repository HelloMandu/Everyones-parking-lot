import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { Paths } from '../../../paths';

import styles from './FindContainer.module.scss';

import FindId from '../../../static/asset/svg/auth/FindId';
import FindPassword from '../../../static/asset/svg/auth/FindPassword';
import { ButtonBase } from '@material-ui/core';

const cx = classNames.bind(styles);

const FindItem = ({ title, content, content2, children }) => {
    return (
        <ButtonBase component="div" className={cx('area')}>
            <div className={cx('wrapper')}>
                <div className={cx('item-title')}>{title}</div>
                <div className={cx('item-content')}>{content}</div>
                <div className={cx('item-content')}>{content2}</div>
                <div className={cx('item-icon')}>{children}</div>
            </div>
        </ButtonBase>
    );
};

const FindContainer = () => {
    return (
        <div className={cx('container')}>
            <Link to={Paths.auth.find.email}>
                <FindItem
                    title={'아이디 찾기'}
                    content={'휴대폰 인증을 통하여'}
                    content2={'아이디를 찾습니다.'}
                >
                    <FindId />
                </FindItem>
            </Link>
            <Link to={Paths.auth.find.password}>
                <FindItem
                    title={'비밀번호 찾기'}
                    content={'휴대폰 인증을 통하여'}
                    content2={'비밀번호를 찾습니다.'}
                >
                    <FindPassword />
                </FindItem>
            </Link>
        </div>
    );
};

export default FindContainer;
