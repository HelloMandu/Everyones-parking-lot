import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import cn from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ButtonBase } from '@material-ui/core';

import useModal from '../../hooks/useModal';
import { useDialog } from '../../hooks/useDialog';
import { requestGetCardInfo, requestDeleteCard } from '../../api/card';

import EnrollCardModal from './EnrollCardModal';
import Header from '../header/Header';
import FixedButton from '../button/FixedButton';

import KakaoPay from '../../static/asset/svg/payment/KakaoPay.svg';
import NaverPay from '../../static/asset/svg/payment/NaverPay.svg';
import Payco from '../../static/asset/svg/payment/Payco.svg';
import RegisterIcon from './RegisterIcon';

import styles from './PaymentTypeModal.module.scss';

const cx = cn.bind(styles);

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentContainer = ({ open, match, setPaymentType }) => {
    const history = useHistory();
    const { url, params } = match;
    const [isOpenCardEnrollment, openCardEnrollment] = useModal(
        url,
        params.modal2,
        'enrollment',
    );

    const [payList, setPayList] = useState([
        {
            src: KakaoPay,
            title: '카카오페이',
            checked: false,
        },
        {
            src: NaverPay,
            title: '네이버페이',
            checked: false,
        },
        {
            src: Payco,
            title: '페이코',
            checked: false,
        },
    ]);
    const [cardList, setCardList] = useState([]);
    const [check, setCheck] = useState(false);

    const handlePayList = useCallback(
        (e) => {
            const key = parseInt(e.target.dataset.key);
            const newPayList = payList.map((pay, index) =>
                index === key
                    ? { ...pay, checked: !pay.checked }
                    : { ...pay, checked: false },
            );
            setPayList(newPayList);
            const newCardList = cardList.map((card) => ({
                ...card,
                checked: false,
            }));
            setCardList(newCardList);
            setPaymentType(e.target.dataset.pay);
        },
        [payList, cardList, setPaymentType],
    );
    const handleCardList = useCallback(
        (e) => {
            const key = parseInt(e.target.dataset.key);
            const newCardList = cardList.map((card, index) =>
                index === key
                    ? { ...card, checked: !card.checked }
                    : { ...card, checked: false },
            );
            setCardList(newCardList);
            const newPayList = payList.map((pay) => ({
                ...pay,
                checked: false,
            }));
            setPayList(newPayList);
            setPaymentType('등록카드결제');
        },
        [payList, cardList, setPaymentType],
    );

    const openDialog = useDialog();

    const onDeleteCard = useCallback(
        async (id) => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            const response = await requestDeleteCard(JWT_TOKEN, id);
            const { msg } = response.data;
            if (msg === 'success') {
                const newCardList = cardList.filter(
                    ({ card_id }) => card_id !== id,
                );
                setCardList(newCardList);
            }
        },
        [cardList],
    );

    const handleDeleteCard = useCallback(
        (id) => {
            openDialog(
                '정말 삭제 하시겠습니까?',
                '',
                () => onDeleteCard(id),
                true,
            );
        },
        [openDialog, onDeleteCard],
    );

    const [activeCard, setActiveCard] = useState(0);
    useEffect(() => {
        const newCardList = cardList.map((card, index) =>
            activeCard === index
                ? { ...card, active: true }
                : { ...card, active: false },
        );
        setCardList(newCardList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCard]);

    useEffect(() => {
        const payCheck = payList.reduce(
            (prev, cur) => prev || cur.checked,
            false,
        );
        const cardCheck = cardList.reduce(
            (prev, cur) => prev || cur.checked,
            false,
        );
        setCheck(payCheck || cardCheck);
    }, [payList, cardList]);

    useEffect(() => {
        const requestCardInfo = async () => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            const response = await requestGetCardInfo(JWT_TOKEN);
            const { cards } = response.data;
            const newCardList = cards.map((card, index) => ({
                ...card,
                checked: false,
                active: activeCard === index,
            }));
            setCardList(newCardList);
        };
        requestCardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <Header title={'결제 수단 선택'}></Header>
            <div className={styles['payment-container']}>
                <h2 className={styles['payment-title']}>등록카드 결제</h2>
                <Swiper
                    className={styles['card-swiper']}
                    spaceBetween={20}
                    onSlideChange={({ activeIndex }) =>
                        setActiveCard(activeIndex)
                    }
                >
                    {cardList.map(
                        (
                            {
                                card_id,
                                bank_name,
                                card_type,
                                card_num,
                                checked,
                                active,
                            },
                            index,
                        ) => (
                            <SwiperSlide key={index}>
                                <div className={styles['card-wrapper']}>
                                    <img
                                        className={cx('card-image', {
                                            checked,
                                            active,
                                        })}
                                        data-key={index}
                                        src={`${process.env.PUBLIC_URL}/card/${card_type}.png`}
                                        alt="card"
                                        onClick={handleCardList}
                                    ></img>
                                    <div
                                        className={cx('card-info', { active })}
                                    >
                                        <div className={styles['card-num']}>
                                            {bank_name}({card_num.split('-')[0]}{' '}
                                            **** **** ****)
                                        </div>
                                        <ButtonBase
                                            onClick={() =>
                                                handleDeleteCard(card_id)
                                            }
                                        >
                                            삭제
                                        </ButtonBase>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ),
                    )}
                    <SwiperSlide>
                        <div
                            className={styles['card-register']}
                            onClick={openCardEnrollment}
                        >
                            <RegisterIcon></RegisterIcon>
                            <div>카드등록</div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className={styles['card-info']}>
                    <div className={styles['card-name']}></div>
                    <div className={styles['card-delete']}></div>
                </div>
                <h2 className={cx(['payment-title', 'type'])}>일반결제</h2>
                <ul className={styles['pay-list']}>
                    {payList.map(({ src, title, checked }, index) => (
                        <li key={index}>
                            <img
                                className={cx({ checked })}
                                data-key={index}
                                data-pay={title}
                                src={src}
                                alt="card"
                                onClick={handlePayList}
                            ></img>
                            <div className={cx('pay-name')}>{title}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <FixedButton
                button_name={'결제하기'}
                disable={!check}
                onClick={() => history.goBack()}
            ></FixedButton>
            <EnrollCardModal
                open={isOpenCardEnrollment}
                setCardList={setCardList}
            ></EnrollCardModal>
        </Dialog>
    );
};

export default PaymentContainer;
