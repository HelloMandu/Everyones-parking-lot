import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import VerifyPhone from '../../../../components/verifyphone/VerifyPhone';
/* Components */

import styles from './UpdateHpContainer.module.scss';
/* StyleSheets */

import { useDialog } from '../../../../hooks/useDialog';
import useToken from '../../../../hooks/useToken';
/* Hooks */

import { Paths } from '../../../../paths';
/* Paths */

import { updateUser } from '../../../../store/user';
/* Store */

import { requestPutRePhoneNumber } from '../../../../api/user';
/* API */

const UpdateHpContainer = () => {

    const history = useHistory();
    const openDialog = useDialog();
    const reduxDispatch = useDispatch();
    const TOKEN = useToken();

    const phoneRef = useRef();
    const [phoneCheck, setPhoneCheck] = useState(false);

    useEffect(() => {
        console.log(phoneRef)
    }, []);

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPutRePhoneNumber(JWT_TOKEN, phoneRef.current.phoneNumber);
        if (response.msg === 'success') {
            reduxDispatch(updateUser('phone_number', phoneRef.current.phoneNumber));
            openDialog("연락처변경 완료", "", () => history.replace(Paths.main.mypage.index));
        } else {
            openDialog(response.msg, response.sub);
        }
    }, [history, openDialog, reduxDispatch]);

    return (
        <>
            {TOKEN !== null &&
                <>
                    <div className={styles['container']}>
                        <div className={styles['input-area']}>
                            <VerifyPhone setCheck={setPhoneCheck} ref={phoneRef} />
                        </div>
                    </div>
                    <FixedButton button_name="변경" disable={!phoneCheck} onClick={onClickButton} />
                </>
            }
        </>
    );
};

export default UpdateHpContainer;