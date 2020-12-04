import React, { forwardRef, useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';

import useForm from '../../hooks/useForm';
import useInput from '../../hooks/useInput';
import { useDialog } from '../../hooks/useDialog';

import { requestPostCardEnroll } from '../../api/card';

import Header from '../header/Header';
import InputBox from '../inputbox/InputBox';
import FixedButton from '../button/FixedButton';

import styles from './EnrollCardModal.module.scss';

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EnrollCardModal = ({ open, setCardList }) => {
    const [cardNum, onChangeCardNum, checkCardNum] = useForm(
        {
            card1: '',
            card2: '',
            card3: '',
            card4: '',
        },
        4,
    );
    const { card1, card2, card3, card4 } = cardNum;

    const [cardPeriod, onChangeCardPeriod, checkCardPeriod] = useForm(
        {
            month: '',
            year: '',
        },
        2,
    );
    const { month, year } = cardPeriod;

    const [cardPassword, onChangeCardPassword, checkCardPassword] = useInput(
        '',
        (state) => state.length === 2,
        2,
    );

    const [allCheck, setAllCheck] = useState(false);

    const openDialog = useDialog();
    const history = useHistory();
    const handleEnrollCard = useCallback(async () => {
        if (!allCheck) {
            openDialog('등록실패', '필수 입력 사항을 입력해 주세요');
            return;
        }
        const JWT_TOKEN = localStorage.getItem('user_id');
        const cardNumber = `${cardNum.card1}-${cardNum.card2}-${cardNum.card3}-${cardNum.card4}`;
        const cardValid = `20${cardPeriod.year}/${cardPeriod.month}`;
        const { data } = await requestPostCardEnroll(
            JWT_TOKEN,
            cardNumber,
            cardValid,
            cardPassword,
        );
        if (data.msg === 'success') {
            setCardList((cardList) => cardList.concat(data.card));
            history.goBack();
        } else {
            openDialog('등록실패', '네트워크 상태를 확인하세요');
        }

        cardNum.card1 = ''
        cardNum.card2 = ''
        cardNum.card3 = ''
        cardNum.card4 = ''

        cardPeriod.month = ''
        cardPeriod.year = ''

        onChangeCardPassword()
    }, [allCheck, cardNum, cardPeriod, cardPassword, onChangeCardPassword, openDialog, setCardList, history]);

    useEffect(
        () => setAllCheck(checkCardNum && checkCardPeriod && checkCardPassword),
        [checkCardNum, checkCardPeriod, checkCardPassword],
    );
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <Header title={'결제수단등록'}></Header>
            <div className={styles['enrollcard-container']}>
                <div className={styles['enroll-title']}>카드번호</div>
                <div className={styles['card-input']}>
                    <input
                        type={'text'}
                        name={'card1'}
                        value={card1}
                        onChange={onChangeCardNum}
                    />
                    -
                    <input
                        type={'text'}
                        name={'card2'}
                        value={card2}
                        onChange={onChangeCardNum}
                    />
                    -
                    <input
                        type={'text'}
                        name={'card3'}
                        value={card3}
                        onChange={onChangeCardNum}
                    />
                    -
                    <input
                        type={'text'}
                        name={'card4'}
                        value={card4}
                        onChange={onChangeCardNum}
                    />
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
            <FixedButton
                button_name={'등록하기'}
                disable={!allCheck}
                onClick={handleEnrollCard}
            ></FixedButton>
        </Dialog>
    );
};

export default EnrollCardModal;
