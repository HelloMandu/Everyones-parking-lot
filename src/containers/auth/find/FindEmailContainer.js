import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
/* Library */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';

import InputBox from '../../../components/inputbox/InputBox';
import VerifyPhone from '../../../components/verifyphone/VerifyPhone';
import FixedButton from '../../../components/button/FixedButton';

import { requestPostFindId } from '../../../api/user';

import { Paths } from '../../../paths';

import classNames from 'classnames/bind';
import styles from './FindEmailContainer.module.scss';

const cx = classNames.bind(styles);

const FindEmailContainer = () => {
    const history = useHistory();
    const openDialog = useDialog();
    const [name, onChangeName] = useInput('');
    const phoneNumber = useRef();
    const [isPhone, setIsPhone] = useState(false);

    const onClickSubmit = useCallback(async () => {
        const userEmail = await requestPostFindId(
            name,
            phoneNumber.current.phoneNumber,
        );

        if (userEmail.status === 200) {
            history.push({
                pathname: Paths.auth.find.email_complete,
                state: userEmail.data.email,
            });
        } else {
            openDialog(userEmail.data.msg, '');
        }
    }, [name, openDialog, history]);

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('title')}>이름</div>
                <InputBox
                    className={'input-bar'}
                    type={'text'}
                    value={name}
                    placeholder={'이름을 입력해주세요.'}
                    onChange={onChangeName}
                />

                <div className={cx('title')}>휴대폰 번호 인증</div>
                <VerifyPhone setCheck={setIsPhone} ref={phoneNumber} />
            </div>
            <FixedButton
                button_name={'확인'}
                disable={name === '' && !isPhone}
                onClick={onClickSubmit}
            />
        </>
    );
};

export default FindEmailContainer;
