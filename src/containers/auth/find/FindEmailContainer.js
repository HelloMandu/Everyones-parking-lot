import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
/* Library */

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading'

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
    const nameRef = useRef()
    const phoneNumber = useRef();
    const [checkPhone, setCheckPhone] = useState(false);
    const [onLoading, offLoading] = useLoading()

    const onClickSubmit = useCallback(async () => {
        onLoading('findEmail')

        const {data} = await requestPostFindId(
            name,
            phoneNumber.current.phoneNumber,
        );

        if (data.msg === 'success') {
            sessionStorage.setItem('session_email', data.email);
            history.push(Paths.auth.find.email_complete);
        } else {
            if(data.msg === '가입하지 않은 유저입니다.') {
                onChangeName('')
                openDialog(data.msg, '', () => nameRef.current.focus(), false, true)
            } else openDialog(data.msg)
        }

        offLoading('findEmail')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, history, openDialog, onChangeName]);

    useEffect(() => {
        nameRef.current.focus()
    }, [])

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
                    reference={nameRef}
                />

                <div className={cx('title')}>휴대폰 번호 인증</div>
                <VerifyPhone setCheck={setCheckPhone} ref={phoneNumber} />
            </div>
            <FixedButton
                button_name={'확인'}
                disable={!(name !== '' && checkPhone)}
                onClick={onClickSubmit}
            />
        </>
    );
};

export default FindEmailContainer;
