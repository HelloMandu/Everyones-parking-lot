import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
/* Library */

import FixedButton from '../../../../components/button/FixedButton';
import Birth from '../../../../components/birth/Birth';
/* Components */

import styles from './UpdateBirthdayContainer.module.scss';
/* StyleSheets */

import useBirth from '../../../../hooks/useBirth';
import { useDialog } from '../../../../hooks/useDialog';
import useToken from '../../../../hooks/useToken';
/* Hooks */

import { Paths } from '../../../../paths';
/* Paths */

import { updateUser } from '../../../../store/user';
/* Store */

import { getFormatDateNanTime } from '../../../../lib/calculateDate';
/* Lib */

import { requestPutReBirth } from '../../../../api/user';
/* API */

const UpdateBirthdayContiner = () => {

    const location = useLocation();
    const formatDate = getFormatDateNanTime(location.state);
    const date = formatDate.split('/');

    const openDialog = useDialog();
    const history = useHistory();
    const reduxDispatch = useDispatch();
    const TOKEN = useToken();

    const [onChangeBirth, getBirth] = useBirth({
        year: date[0],
        month: date[1],
        day: date[2],
    });

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPutReBirth(JWT_TOKEN, getBirth());
        if (response.msg === 'success') {
            reduxDispatch(updateUser('birth', getBirth()));
            openDialog("생년월일변경 완료", "", () => history.replace(Paths.main.mypage.index));
        } else {
            openDialog(response.msg, response.sub);
        }
    }, [history, openDialog, getBirth, reduxDispatch]);

    return (
        <>
            {TOKEN !== null &&
                <>
                    <div className={styles['container']}>
                        <div className={styles['birth-area']}>
                            <Birth onChangeBirth={onChangeBirth} year={parseInt(date[0])} month={parseInt(date[1])} day={parseInt(date[2])} />
                        </div>
                    </div>
                    <FixedButton button_name="변경" disable={false} onClick={onClickButton} />
                </>
            }
        </>
    );
};

export default UpdateBirthdayContiner;