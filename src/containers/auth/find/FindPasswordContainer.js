import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
/* Library */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading'

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
    const [checkPhone, setCheckPhone] = useState(false);
    const [onLoading, offLoading] = useLoading()
    
    const emailRef = useRef(null)

    const onClickSubmit = useCallback(async() => {
        onLoading('findPassword')

        const {data} = await requestPostFindPassword(name, email, phoneNumber.current.phoneNumber)

        if(data.msg === 'success'){
            sessionStorage.setItem('session_pw', data.token)
            history.push(Paths.auth.find.password_complete)
        } else {
            if(data.msg === '가입하지 않은 유저입니다.'){
                onChangeEmail('')
                onChangeName('')
                openDialog(data.msg, '', () => emailRef.current.focus(), false, true)
            } else openDialog(data.msg)
        }

        offLoading('findPassword')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, email, history, openDialog, onChangeEmail, onChangeName]);

    useEffect(() => {
        emailRef.current.focus()
    }, [])

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
                    reference={emailRef}
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
                <VerifyPhone setCheck={setCheckPhone} ref={phoneNumber} />
            </div>
            <FixedButton
                button_name={'확인'}
                disable={!(email !== '' && name !== '' && checkPhone)}
                onClick={onClickSubmit}
            />
        </>
    );
};

export default FindPasswordContainer;
