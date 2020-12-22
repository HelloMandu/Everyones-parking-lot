import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cn from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';

import { updateUser } from '../../store/user';
import { requestPutAgreeMail } from '../../api/user';
import { isEmpty } from '../../lib/formatChecker';

import useSnackbar from '../../hooks/useSnackBar';
import { useDialog } from '../../hooks/useDialog';

import PolicyModal from '../../components/modal/PolicyModal';

import ArrowSmall from '../../static/asset/svg/ArrowSmall';

import styles from './SettingContainer.module.scss';
import { Paths } from '../../paths';

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
    onClick,
}) => {
    const { version } = useSelector((state) => state.company);

    return (
        <ButtonBase
            className={cx('setting-item', { bottom })}
            component={'div'}
            onClick={onClick}
        >
            <div className={styles['title']}>{title}</div>
            {type === 'version' ? (
                <div className={styles['version']}>{version} ver</div>
            ) : (
                <ArrowSmall rotate={90}></ArrowSmall>
            )}
        </ButtonBase>
    );
};

const SettingContainer = ({ match }) => {
    const { url, params } = match;
    const user = useSelector((state) => state.user);
    const { agree_mail, agree_sms, agree_push } = user;
    const dispatch = useDispatch();
    const openDialog = useDialog();
    const history = useHistory();
    const [isOpenPolicy, setIsOpenPolicy] = useState(-1);
    useEffect(() => {
        if (params.modal === 'term') {
            setIsOpenPolicy(0);
        } else if (params.modal === 'privacy') {
            setIsOpenPolicy(1);
        } else {
            setIsOpenPolicy(-1);
        }
    }, [params.modal]);
    const handleAgreeToggle = useCallback(
        async (state, type) => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            if (JWT_TOKEN) {
                try {
                    const { data } = await requestPutAgreeMail(
                        JWT_TOKEN,
                        !state,
                        type,
                    );
                    if (data.msg === 'success') {
                        dispatch(updateUser(type, !state));
                    } else {
                        openDialog('통신 불량', '네트워크 상태를 확인해주세요');
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        },
        [dispatch, openDialog],
    );
    const [handleSnackbar] = useSnackbar();
    return (
        <>
            <article className={styles['setting-container']}>
                <section className={styles['wrapper']}>
                    <SettingItem onClick={() => handleSnackbar('성공?', 'warning')}/>
                </section>
                <section className={styles['wrapper']}>
                    <SettingItem
                        type={'arrow'}
                        title={'이용약관'}
                        bottom={true}
                        onClick={() => history.push(url + '/term')}
                    />
                    <SettingItem
                        type={'arrow'}
                        title={'개인정보처리방침'}
                        onClick={() => history.push(url + '/privacy')}
                    />
                </section>
                {!isEmpty(user) && (
                    <section className={styles['selector-wrapper']}>
                        <div className={styles['selector-agree']}>
                            <p className={styles['title']}>
                                마케팅 정보 수신 동의
                            </p>
                            <p className={styles['description']}>
                                이벤트 및 할인 혜택에 대한 정보를 받으실 수
                                있습니다.
                            </p>
                        </div>
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
            <PolicyModal
                url={Paths.main.setting}
                open={isOpenPolicy !== -1}
                type={params.modal}
            ></PolicyModal>
        </>
    );
};

export default SettingContainer;
