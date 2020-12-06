import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import Birth from '../../../../components/birth/Birth';
/* Components */

import styles from './UpdateBirthdayContainer.module.scss';
/* StyleSheets */

import useBirth from '../../../../hooks/useBirth';
import { useDialog } from '../../../../hooks/useDialog';
/* Hooks */

import { Paths } from '../../../../paths';
/* Paths */

import { requestPutReBirth } from '../../../../api/user';
import { updateUser } from '../../../../store/user';
/* API */

const UpdateBirthdayContiner = () => {

    const openDialog = useDialog();
    const history = useHistory();
    const reduxDispatch = useDispatch();

    const [onChangeBirth, getBirth] = useBirth({
        year: '1980',
        month: '12',
        day: '1',
    });

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPutReBirth(JWT_TOKEN, getBirth());
        if (response.msg === 'success') {
            reduxDispatch(updateUser('birth', getBirth()));
            openDialog("생년월일변경 완료", "", () => history.push(Paths.main.mypage.index));
        } else {
            openDialog(response.msg, response.sub);
        }
    }, [history, openDialog, getBirth, reduxDispatch]);

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['birth-area']}>
                    <Birth onChangeBirth={onChangeBirth} />
                </div>
            </div>
            <FixedButton button_name="변경" disable={false} onClick={onClickButton} />
        </>
    );
};

export default UpdateBirthdayContiner;