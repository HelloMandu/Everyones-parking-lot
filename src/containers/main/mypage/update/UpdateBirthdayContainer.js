import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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
/* API */

const UpdateBirthdayContiner = () => {

    const openDialog = useDialog();
    const history = useHistory();
    const [onChangeBirth, getBirth] = useBirth({
        year: '1970',
        month: '1',
        day: '1',
    });

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            const response = await requestPutReBirth(JWT_TOKEN, getBirth());
            if (response.msg === 'success') {
                openDialog("생년월일변경 완료", "", () => history.push(Paths.main.mypage.index));
            } else {
                openDialog(response.msg, response.sub);
            }
        } else {
            openDialog("로그인이 필요합니다", "로그인 창으로 이동합니다", () => history.push(Paths.auth.signin));
        }
    }, [history, openDialog, getBirth]);

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