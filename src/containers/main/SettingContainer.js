import React from 'react';
import cn from 'classnames/bind';

import { ButtonBase } from '@material-ui/core';

import ArrowSmall from '../../static/asset/svg/ArrowSmall';

import styles from './SettingContainer.module.scss';

const cx = cn.bind(styles);

const Selector = ({ name, checked, onToggle }) => {
    return (
        <div className={styles['selector']}>
            <div className={styles['name']}>{name}</div>
            <div className={cx('toggle', { checked })} onClick={onToggle}>
                <div className={styles['box']}>
                    <div className={styles['switch']}></div>
                </div>
            </div>
        </div>
    );
};

const SettingItem = ({ type = 'version', title = '버전정보' }) => {
    return (
        <ButtonBase className={styles['setting-item']} component={'div'}>
            <div className={styles['title']}>{title}</div>
            {type === 'version' ? (
                <div className={styles['version']}>1.0.0 ver</div>
            ) : (
                <ArrowSmall rotate={90}></ArrowSmall>
            )}
        </ButtonBase>
    );
};

const SettingContainer = () => {
    return (
        <div className={styles['setting-container']}>
            <div className={styles['wrapper']}>
                <SettingItem />
            </div>
            <div className={styles['wrapper']}>
                <SettingItem type={'arrow'} title={'이용약관'} />
                <SettingItem type={'arrow'} title={'개인정보처리방침'} />
            </div>
            <div className={styles['selector-wrapper']}>
                <div className={styles['selector-agree']}>
                    <div className={styles['title']}>마케팅 정보 수신 동의</div>
                    <div className={styles['description']}>
                        이벤트 및 할인 혜택에 대한 정보를 받으실 수 있습니다.
                    </div>
                </div>
                <Selector name={'메일 수신 동의'} checked={true}></Selector>
                <Selector name={'SMS 수신 동의'} checked={true}></Selector>
                <Selector name={'푸시알림'} checked={false}></Selector>
            </div>
        </div>
    );
};

export default SettingContainer;
