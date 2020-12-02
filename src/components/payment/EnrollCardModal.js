import React, { forwardRef } from 'react';
import { Dialog, Slide } from '@material-ui/core';

import useForm from '../../hooks/useForm';
import useInput from '../../hooks/useInput';

import Header from '../header/Header';
import InputBox from '../inputbox/InputBox';
import FixedButton from '../button/FixedButton';

import styles from './EnrollCardModal.module.scss';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EnrollCardModal = ({ open }) => {
    const [cardNum, onChangeCardNum] = useForm(
        {
            card1: '',
            card2: '',
            card3: '',
            card4: '',
        },
        4,
    );
    const [cardPeriod, onChangeCardPeriod] = useForm(
        {
            month: '',
            year: '',
        },
        2,
    );
    const [cardPassword, onChangeCardPassword] = useInput('', undefined, 2);
    const { card1, card2, card3, card4 } = cardNum;
    const { month, year } = cardPeriod;
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <Header title={'결제수단등록'}></Header>
            <div className={styles['enrollcard-container']}>
                <div className={styles['enroll-title']}>카드번호</div>
                <div className={styles['card-input']}>
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        name={'card1'}
                        value={card1}
                        onChange={onChangeCardNum}
                    ></InputBox>
                    -
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        name={'card2'}
                        value={card2}
                        onChange={onChangeCardNum}
                    ></InputBox>
                    -
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        name={'card3'}
                        value={card3}
                        onChange={onChangeCardNum}
                    ></InputBox>
                    -
                    <InputBox
                        className={'input-box'}
                        type={'text'}
                        name={'card4'}
                        value={card4}
                        onChange={onChangeCardNum}
                    ></InputBox>
                </div>
                <div className={styles['enroll-title']}>유효기간</div>
                <div className={styles['card-period']}>
                    <div className={styles['card-period-wrapper']}>
                        <InputBox
                            className={'input-box'}
                            type={'text'}
                            name={'month'}
                            value={month}
                            placeholder={'MM'}
                            onChange={onChangeCardPeriod}
                        ></InputBox>
                    </div>
                    <span>/</span>
                    <div className={styles['card-period-wrapper']}>
                        <InputBox
                            className={'input-box'}
                            type={'text'}
                            name={'year'}
                            value={year}
                            placeholder={'YY'}
                            onChange={onChangeCardPeriod}
                        ></InputBox>
                    </div>
                </div>
                <div className={styles['enroll-title']}>비밀번호</div>

                <div className={styles['card-password']}>
                    <InputBox
                        className={'input-box'}
                        type={'password'}
                        value={cardPassword}
                        placeholder={'카드 비밀번호 앞 두자리'}
                        onChange={onChangeCardPassword}
                    ></InputBox>
                </div>
            </div>
            <FixedButton button_name={'결제하기'}></FixedButton>
        </Dialog>
    );
};

export default EnrollCardModal;
