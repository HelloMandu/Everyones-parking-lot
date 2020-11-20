import React, { useState } from 'react';
import classNames from 'classnames/bind'
/* Library */

import useInput from '../../../hooks/useInput'
import InputBox from '../../../components/inputbox/InputBox'

import VerifyPhone from '../../../components/verifyphone/VerifyPhone'

import FixedButton from '../../../components/button/FixedButton'

import { useDialog } from '../../../hooks/useDialog';

import styles from './FindEmailContainer.module.scss'

const cx = classNames.bind(styles)

const FindEmailContainer = () => {
    const openDialog = useDialog()
    const [name, onChangeName] = useInput("")
    const [isPhone, setIsPhone] = useState(false)

    const onClickSubmit = () => {
        console.log(name)
        if(name === "") openDialog("이름을 입력해주세요", "")
        else console.log("onClickSubmit")
    }

    return (
        <>
        <div className={cx("container")}>
            <div className={cx("title")}>이름</div>
            <InputBox
                className={"input-bar"}
                type={"text"}
                value={name}
                placeholder={"이름을 입력해주세요."}
                onChange={onChangeName}
            />

            <div className={cx("title")}>휴대폰 번호 인증</div>
            <VerifyPhone setIsPhone={setIsPhone} />
        </div>
        <FixedButton button_name={"확인"} disable={!isPhone} onClick={onClickSubmit} />
        </>
    );
};

export default FindEmailContainer;