import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
/* Components */

import styles from './UpdateNameContainer.module.scss';
import XButton from '../../../../static/asset/svg/X_button';
/* stylesheets */

import { useDialog } from '../../../../hooks/useDialog';
/* Hooks */

import { Paths } from '../../../../paths';
/* Paths */

import { updateUser } from '../../../../store/user';
/* Store */

import { requestPutReName } from '../../../../api/user';
/* API */

const UpdateNameContainer = () => {

    const history = useHistory();
    const openDialog = useDialog();
    const [name, setName] = useState('');

    const getUserInfo = useSelector(state => state.user);
    const reduxDispatch = useDispatch();

    const onChangeName = e => setName(e.target.value);
    const onClickName = () => setName('');
    const onKeyPressEnter = e => { if (e.key === 'Enter') onClickButton(); };

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPutReName(JWT_TOKEN, name);
        if (response.msg === 'success') {
            reduxDispatch(updateUser('name', name));
            openDialog("이름변경 완료", "", () => history.push(Paths.main.mypage.index));
        } else {
            openDialog(response.msg);
        }
    }, [history, name, openDialog, reduxDispatch]);

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['name-area']}>
                    <div className={styles['text']}>
                        <input
                            type="text"
                            className={styles['input']}
                            name="name"
                            value={name}
                            onChange={onChangeName}
                            onKeyPress={onKeyPressEnter}
                            placeholder={getUserInfo.name}
                        />
                        <button className={styles['x-button']} onClick={onClickName}><XButton /></button>
                    </div>
                </div>
            </div>
            <FixedButton button_name="변경" disable={!name} onClick={onClickButton} />
        </>
    );
};

export default UpdateNameContainer;