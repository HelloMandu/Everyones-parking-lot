import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
/* Library */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';

import InputBox from '../../../components/inputbox/InputBox';
import VerifyPhone from '../../../components/verifyphone/VerifyPhone';
import FixedButton from '../../../components/button/FixedButton';

import { requestPostFindPassword } from '../../../api/user'

import { Paths } from '../../../paths'

import classNames from 'classnames/bind';
import styles from './FindPasswordContainer.module.scss';

const cx = classNames.bind(styles);

const FindPasswordContainer = () => {
    const history = useHistory()
    const openDialog = useDialog();
    const [email, onChangeEmail] = useInput('');
    const [name, onChangeName] = useInput('');
    const phoneNumber = useRef()
    const [isPhone, setIsPhone] = useState(false);

    const onClickSubmit = useCallback(async() => {
        const resetPW = await requestPostFindPassword(name, email, phoneNumber.current.phoneNumber)

        if(resetPW.status === 200){
            localStorage.setItem('user_id', resetPW.data.token)
            history.push(Paths.auth.find.password_complete)
        } else {
            openDialog(resetPW.data.msg, '')
        }
    }, [name, email, phoneNumber, history, openDialog]);

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('title')}>아이디</div>
                <InputBox
                    className={'input-bar'}
                    type={'text'}
                    value={email}
                    placeholder={'아이디를 입력해주세요.'}
                    onChange={onChangeEmail}
                />

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
                disable={!isPhone}
                onClick={onClickSubmit}
            />
        </>
    );
};

export default FindPasswordContainer;
