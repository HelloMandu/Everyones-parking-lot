import React, { forwardRef, useState, useEffect } from 'react';
import cn from 'classnames/bind';
import { Dialog, Slide } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ButtonBase } from '@material-ui/core';

import useModal from '../../hooks/useModal';
import { requestGetCardInfo } from '../../api/card';

import EnrollCardModal from './EnrollCardModal';
import Header from '../header/Header';
import FixedButton from '../button/FixedButton';

import KakaoPay from '../../static/asset/svg/payment/KakaoPay.js';
import NaverPay from '../../static/asset/svg/payment/NaverPay.js';
import Payco from '../../static/asset/svg/payment/Payco.js';
import RegisterIcon from './RegisterIcon';

import styles from './PaymentTypeModal.module.scss';

const cx = cn.bind(styles);

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentContainer = ({ open, match }) => {
    const { url, params } = match;
    const [isOpenCardEnrollment, openCardEnrollment] = useModal(
        url,
        params.modal2,
        'enrollment',
    );

    const [cardList, setCardList] = useState([]);
    useEffect(() => {
        const requestCardInfo = async () => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            const response = await requestGetCardInfo(JWT_TOKEN);
            const resCard = response.data.cards;
            setCardList(resCard);
        };
        requestCardInfo();
    }, []);
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <Header title={'결제 수단 선택'}></Header>
            <div className={styles['payment-container']}>
                <h2 className={styles['payment-title']}>등록카드 결제</h2>
                <Swiper className={styles['card-swiper']} spaceBetween={20}>
                    {cardList.map(({card_id, bank_name, card_type, card_num}) => (
                        <SwiperSlide key={card_id}>
                            <div className={styles['card-wrapper']}>
                                <img src={process.env.PUBLIC_URL + `/card/${card_type}.png`} alt="card"></img>
                                <div className={styles['card-info']}>
                                    <div className={styles['card-num']}>
                                        {bank_name}({card_num.split('-')[0]}{' '}
                                        **** **** ****)
                                    </div>
                                    <ButtonBase>삭제</ButtonBase>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
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
                    <li>
                        <KakaoPay></KakaoPay>
                        <div className={styles['pay-name']}>카카오페이</div>
                    </li>
                    <li>
                        <NaverPay></NaverPay>
                        <div className={styles['pay-name']}>네이버페이</div>
                    </li>
                    <li>
                        <Payco></Payco>
                        <div className={styles['pay-name']}>페이코</div>
                    </li>
                </ul>
            </div>
            <FixedButton button_name={'결제하기'}></FixedButton>
            <EnrollCardModal open={isOpenCardEnrollment} setCardList={setCardList}></EnrollCardModal>
        </Dialog>
    );
};

export default PaymentContainer;
