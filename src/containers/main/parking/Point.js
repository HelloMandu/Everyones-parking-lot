import React from 'react';

import useInput from '../../../hooks/useInput';

import InputBox from '../../../components/inputbox/InputBox';
import ConfirmButton from '../../../components/button/ConfirmButton';

import styles from './Point.module.scss';


const Point = () => {
    const [point, handleChangePoint] = useInput('');
    return (
        <>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={point}
                placeholder={'사용하실 포인트를 입력해주세요'}
                onChange={handleChangePoint}
            ></InputBox>
            <div className={styles['use-point']}>
                <div className={styles['point']}>
                    내 보유 포인트 <span>35,000P</span>
                </div>
                <div className={styles['confirm-button']}>
                    <ConfirmButton
                        button_name={'전체사용'}
                        disable={false}
                    ></ConfirmButton>
                </div>
            </div>
        </>
    );
};

export default Point;
