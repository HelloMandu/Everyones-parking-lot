import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames/bind';
import { ButtonBase } from '@material-ui/core';
import { useDispatch } from 'react-redux';
/* Library */

import FixedButton from '../../../components/button/FixedButton';
/* Components */

import Information from '../../../static/asset/svg/Information';
/* Static */

import styles from './WithdrawContainer.module.scss';
/* StyleSheets */

import { useDialog } from '../../../hooks/useDialog';
/* Hooks */

import { Paths } from '../../../paths';
/* Paths */

import { deleteUser } from '../../../store/user';
/* Store */

import { requestDeleteUser } from '../../../api/user';
/* API */

const cn = classnames.bind(styles);

const WithdrawContainer = () => {
    const openDialog = useDialog();
    const dispatch = useDispatch();
    const history = useHistory();

    const [click, setClick] = useState(false);

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            try {
                const response = await requestDeleteUser(JWT_TOKEN);
                if (response.msg === 'success') {
                    localStorage.removeItem('user_id');
                    dispatch(deleteUser(JWT_TOKEN));
                    openDialog('회원탈퇴가 완료되었습니다.', '', () =>
                        history.replace(Paths.main.index),
                    );
                } else {
                    openDialog(response.msg, response.sub);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [history, openDialog, dispatch]);

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['withdraw-area']}>
                    <div className={styles['text-wrap']}>
                        <div className={styles['text']}>
                            <span>
                                탈퇴 후 회원정보 및 이용기록은
                                <p />
                                모두 삭제되며 다시 복구가 불가합니다.
                            </span>
                        </div>
                    </div>
                    <ButtonBase
                        className={cn('confirm', { click })}
                        onClick={() => setClick(!click)}
                    >
                        예, 탈퇴를 신청합니다.
                    </ButtonBase>
                    <div className={styles['precautions-wrap']}>
                        <div className={styles['first']}>
                            <Information />
                            <div>
                                주문내역 및 결제 내용은 이용약관과 관련법에
                                의하여 보관됩니다.
                            </div>
                        </div>
                        <div className={styles['second']}>
                            <Information />
                            <div>
                                동일한 SNS계정과 이메일을 사용한 재가입은
                                24시간이내에 불가합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FixedButton
                button_name="탈퇴완료"
                disable={!click}
                onClick={onClickButton}
            />
        </>
    );
};

export default WithdrawContainer;
