import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
/* Components */

import styles from './UpdateNameContainer.module.scss';
import XButton from '../../../../static/asset/svg/X_button';
/* stylesheets */

import { useDialog } from '../../../../hooks/useDialog';
import useToken from '../../../../hooks/useToken';
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
    const reduxDispatch = useDispatch();
    const TOKEN = useToken();

    const getUserInfo = useSelector(state => state.user);

    const onChangeName = e => setName(e.target.value);
    const onClickName = () => setName('');
    const onKeyPressEnter = e => { if (e.key === 'Enter') onClickButton(); };

    const [name, setName] = useState('');
    const nameRef = useRef();

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.focus();
        }
    }, [])

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPutReName(JWT_TOKEN, name);
        if (response.msg === 'success') {
            reduxDispatch(updateUser('name', name));
            openDialog("이름변경 완료", "", () => history.replace(Paths.main.mypage.myinfo));
        } else {
            openDialog(response.msg);
        }
    }, [history, name, openDialog, reduxDispatch]);

    return (
        <>
            {TOKEN !== null &&
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
                                    ref={nameRef}
                                />
                                <button className={styles['x-button']} onClick={onClickName}><XButton /></button>
                            </div>
                        </div>
                    </div>
                    <FixedButton button_name="변경" disable={!name} onClick={onClickButton} />
                </>
            }
        </>
    );
};

export default UpdateNameContainer;