import React, { useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import VerifyPhone from '../../../../components/verifyphone/VerifyPhone';
/* Components */

import styles from './UpdateHpContainer.module.scss';
/* StyleSheets */

import { useDialog } from '../../../../hooks/useDialog';
/* Hooks */

import { Paths } from '../../../../paths';
/* Paths */

import { requestPutRePhoneNumber } from '../../../../api/user';
/* API */

const UpdateHpContainer = () => {
    const phoneRef = useRef();
    const history = useHistory();
    const openDialog = useDialog();

    const [phoneCheck, setPhoneCheck] = useState(false);

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            const response = await requestPutRePhoneNumber(JWT_TOKEN, phoneRef.current.phoneNumber);
            if (response.msg === 'success') {
                openDialog("연락처변경 완료", "", () => history.push(Paths.main.mypage.index));
            } else {
                openDialog(response.msg, response.sub);
            }
        } else {
            openDialog("로그인이 필요합니다", "로그인 창으로 이동합니다", () => history.push(Paths.auth.signin));
        }
    }, [history, openDialog]);

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['input-area']}>
                    <VerifyPhone setCheck={setPhoneCheck} ref={phoneRef} />
                </div>
            </div>
            <FixedButton button_name="변경" disable={!phoneCheck} onClick={onClickButton} />
        </>
    );
};

export default UpdateHpContainer;