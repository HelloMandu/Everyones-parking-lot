import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
/* Library */

import useInput from '../../hooks/useInput';
import useBirth from '../../hooks/useBirth';
import InputBox from '../../components/inputbox/InputBox';
import {
    isEmailForm,
    isPasswordForm,
    isCellPhoneForm,
} from '../../lib/formatChecker';

import Birth from '../../components/birth/Birth';

import CheckBox from '../../components/checkbox/CheckBox';

import VerifyPhone from '../../components/verifyphone/VerifyPhone';

import FixedButton from '../../components/button/FixedButton';

import { requestPostAuth } from '../../api/user';

import { Paths } from '../../paths';

import styles from './SignUpContainer.module.scss';

const cx = classNames.bind(styles);

const SignUpContainer = () => {
    const history = useHistory();

    const [email, onChangeEmail] = useInput('', isEmailForm);
    const [name, onChangeName] = useInput('');
    const [password, onChangePassword] = useInput(
        '',
        isPasswordForm,
    );
    const [passwordCheck, onChangePasswordCheck] = useInput('');

    const [onChangeBirth, getBirth] = useBirth({
        year: '1970',
        month: '1',
        day: '1',
    });

    const [phone, handleChangePhone, sendCheck, setSendCheck] = useInput(
        '',
        isCellPhoneForm,
    );
    const [isPhone, setIsPhone] = useState(false);

    const [checkList, setCheckList] = useState([
        {
            id: 1,
            checked: false,
            description: '이용약관 필수 동의',
        },
        {
            id: 2,
            checked: false,
            description: '개인정보 처리방침 필수 동의',
        },
        {
            id: 3,
            checked: false,
            description: '쿠폰 / 이벤트 알림 선택 동의',
            subDescription:
                'SMS, 이메일을 통해 파격할인/이벤트/쿠폰 정보를 받아보실 수 있습니다.',
        },
    ]);

    const [signUp, setSignUp] = useState(false);

    const onClickSignUp = useCallback(async () => {
        if(signUp) {
            const response = await requestPostAuth(
                email,
                name,
                password,
                getBirth(),
                phone,
            );
            if (response.data.msg === "success") history.push(Paths.auth.sign_complete);
            else console.log(response.data.msg)
        }
    }, [
        email,
        name,
        password,
        getBirth,
        phone,
        signUp,
        history,
    ]);

    useEffect(() => {
        if (
            email !== '' &&
            name !== '' &&
            password !== '' &&
            phone !== '' &&
            isPhone &&
            checkList[0].checked &&
            checkList[1].checked
        )
            setSignUp(true);
        else setSignUp(false);

    }, [email, name, password, phone, isPhone, checkList]);

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('input-wrapper')}>
                    <div className={cx('input-title')}>이메일</div>
                    <InputBox
                        className={'input-bar'}
                        type={'text'}
                        value={email}
                        placeholder={'이메일을 입력해주세요.'}
                        onChange={onChangeEmail}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onClickSignUp();
                        }}
                    />
                </div>

                <div className={cx('input-wrapper')}>
                    <div className={cx('input-title')}>이름</div>
                    <InputBox
                        className={'input-bar'}
                        type={'text'}
                        value={name}
                        placeholder={'이름을 입력해주세요.'}
                        onChange={onChangeName}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onClickSignUp();
                        }}
                    />
                </div>

                <div className={cx('input-wrapper')}>
                    <div className={cx('input-title')}>비밀번호</div>
                    <InputBox
                        className={'input-bar'}
                        type={'password'}
                        value={password}
                        placeholder={'비밀번호를 입력해주세요.'}
                        onChange={onChangePassword}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onClickSignUp();
                        }}
                    />
                    <InputBox
                        className={'input-bar'}
                        type={'password'}
                        value={passwordCheck}
                        placeholder={'비밀번호를 재입력해주세요.'}
                        onChange={onChangePasswordCheck}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onClickSignUp();
                        }}
                    />
                    <div
                        className={cx(
                            'password-check',
                            { apear: password !== '' || passwordCheck !== '' },
                            {
                                same:
                                    password !== '' &&
                                    password === passwordCheck,
                            },
                        )}
                    >
                        비밀번호가 <span>불</span>일치합니다.
                    </div>
                </div>

                <div className={cx('input-wrapper')}>
                    <div className={cx('input-title')}>생년월일</div>

                    <div className={cx('select-wrapper')}>
                        <Birth onChangeBirth={onChangeBirth} />
                    </div>
                </div>

                <div className={cx('input-title')}>휴대폰 번호 인증</div>
                <VerifyPhone
                    phone={phone}
                    handleChangePhone={handleChangePhone}
                    sendCheck={sendCheck}
                    setSendCheck={setSendCheck}
                    setIsPhone={setIsPhone}
                />

                <div className={cx('check-box-wrapper')}>
                    <CheckBox
                        allCheckTitle={'모두 동의합니다.'}
                        checkListProps={checkList}
                        box={true}
                        setterFunc={setCheckList}
                    />
                </div>
            </div>

            <FixedButton
                button_name={'회원가입하기'}
                disable={!signUp}
                onClick={onClickSignUp}
            />
        </>
    );
};

export default SignUpContainer;
