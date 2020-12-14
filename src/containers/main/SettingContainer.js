import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import { updateUser } from '../../store/user';
import { requestPutAgreeMail } from '../../api/user';
import { useDialog } from '../../hooks/useDialog';
import { isEmpty } from '../../lib/formatChecker';

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

const SettingItem = ({
    type = 'version',
    title = '버전정보',
    bottom = false,
}) => {
    return (
        <ButtonBase
            className={cx('setting-item', { bottom })}
            component={'div'}
        >
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
    const user = useSelector((state) => state.user);
    const { agree_mail, agree_sms, agree_push } = user;
    const dispatch = useDispatch();
    const openDialog = useDialog();
    const handleAgreeToggle = useCallback(
        async (state, type) => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            if(JWT_TOKEN){
                const { data } = await requestPutAgreeMail(JWT_TOKEN, !state, type);
                if (data.msg === 'success') {
                    dispatch(updateUser(type, !state));
                } else {
                    openDialog('통신 불량', '네트워크 상태를 확인해주세요');
                }
            }
        },
        [dispatch, openDialog],
    );
    return (
        <article className={styles['setting-container']}>
            <section className={styles['wrapper']}>
                <SettingItem />
            </section>
            <section className={styles['wrapper']}>
                <SettingItem type={'arrow'} title={'이용약관'} bottom={true} />
                <SettingItem type={'arrow'} title={'개인정보처리방침'} />
            </section>
            {!isEmpty(user) && (
                <section className={styles['selector-wrapper']}>
                    <p className={styles['selector-agree']}>
                        <div className={styles['title']}>
                            마케팅 정보 수신 동의
                        </div>
                        <div className={styles['description']}>
                            이벤트 및 할인 혜택에 대한 정보를 받으실 수
                            있습니다.
                        </div>
                    </p>
                    <Selector
                        name={'메일 수신 동의'}
                        checked={agree_mail}
                        onToggle={() =>
                            handleAgreeToggle(agree_mail, 'agree_mail')
                        }
                    ></Selector>
                    <Selector
                        name={'SMS 수신 동의'}
                        checked={agree_sms}
                        onToggle={() =>
                            handleAgreeToggle(agree_sms, 'agree_sms')
                        }
                    ></Selector>
                    <Selector
                        name={'푸시알림'}
                        checked={agree_push}
                        onToggle={() =>
                            handleAgreeToggle(agree_push, 'agree_push')
                        }
                    ></Selector>
                </section>
            )}
        </article>
    );
};

export default SettingContainer;
