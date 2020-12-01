import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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

import { requestPutReName } from '../../../../api/user';
/* API */

const UpdateNameContainer = () => {

    const history = useHistory();
    const openDialog = useDialog();
    const [name, setName] = useState('');

    const onChangeName = e => setName(e.target.value);
    const onClickName = () => setName('');
    const onKeyPressEnter = e => { if (e.key === 'Enter') onClickButton(); };

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            const response = await requestPutReName(JWT_TOKEN, name);
            if (response.msg === 'success') {
                openDialog("이름변경 완료", "", () => history.push(Paths.main.mypage.index));
            } else {
                openDialog(response.msg);
            }
        } else {
            openDialog("로그인이 필요합니다", "로그인 창으로 이동합니다", () => history.push(Paths.auth.signin));
        }
    }, [history, name, openDialog]);

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
                            placeholder="김종완"
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