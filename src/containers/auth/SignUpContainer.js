import React from 'react';
/* Library */

import useInput from '../../hooks/useInput';
import InputBox from '../../components/inputbox/InputBox';
import {
    isEmailForm,
    isPasswordForm,
    isCellPhoneForm,
} from '../../lib/formatChecker';

import styles from './SignUpContainer.module.scss';

const SignUpContainer = () => {
    const [email, onChangeEmail, isEmail] = useInput('', isEmailForm);
    const [name, onChangeName] = useInput('');
    const [password, onChangePassword, isPassword] = useInput(
        '',
        isPasswordForm,
    );
    const [passwordCheck, onChangePasswordCheck] = useInput('');
    const [birth, onChangeBirth] = useInput('');
    const [phone, onChangePhone, isPhone] = useInput('', isCellPhoneForm);

    const onClickSignUp = () => {
        console.log('sign up');
    };

    return (
        <div className={styles['container']}>
            <div className={styles['input-wrapper']}>
                <div className={styles['input-title']}>이메일</div>
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

            <div className={styles['input-wrapper']}>
                <div className={styles['input-title']}>이름</div>
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

            <div className={styles['input-wrapper']}>
                <div className={styles['input-title']}>비밀번호</div>
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
            </div>

            <div className={styles['input-wrapper']}>
                <div className={styles['input-title']}>생년월일</div>
                <InputBox
                    className={'input-bar'}
                    type={'text'}
                    value={birth}
                    placeholder={'생년월일을 입력해주세요.'}
                    onChange={onChangeBirth}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onClickSignUp();
                    }}
                />
            </div>

            <div className={styles['input-wrapper']}>
                <div className={styles['input-title']}>휴대폰 번호</div>
                <InputBox
                    className={'input-bar'}
                    type={'text'}
                    value={phone}
                    placeholder={'이름을 입력해주세요.'}
                    onChange={onChangePhone}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onClickSignUp();
                    }}
                />
            </div>
        </div>
    );
};

export default SignUpContainer;
