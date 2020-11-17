import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import FixedButton from '../button/FixedButton';

import HyundaiCard from '../../static/asset/png/hyundai_card.png';
import SsgCard from '../../static/asset/png/ssg_card.png';

import KakaoPay from '../../static/asset/svg/payment/KakaoPay.js'
import NaverPay from '../../static/asset/svg/payment/NaverPay.js'
import Payco from '../../static/asset/svg/payment/Payco.js'

import styles from './PaymentTypeModal.module.scss';

const PaymentContainer = () => {
    return (
        <>
            <div className={styles['payment-container']}>
                <div className={styles['payment-title']}></div>
                <Swiper className={styles['card-swiper']}>
                    <SwiperSlide>
                        <img src={HyundaiCard} alt="card"></img>
                        {/* <img src="#" alt="card"></img> */}
                    </SwiperSlide>  
                    <SwiperSlide>
                        <img src={SsgCard} alt="card"></img>
                        {/* <img src="#" alt="card"></img> */}
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="#" alt="card"></img>
                    </SwiperSlide>
                </Swiper>
                <div className={styles['card-info']}>
                    <div className={styles['card-name']}></div>
                    <div className={styles['card-delete']}></div>
                </div>
                <div className={styles['payment-title']}></div>
                <ul className={styles['pay-list']}>
                    <li>
                        <KakaoPay></KakaoPay>
                        <div className={styles['pay-name']}>카카오페이</div>
                    </li>
                    <li>
                        <NaverPay></NaverPay>
                        <div className={styles['pay-name']}>카카오페이</div>
                    </li>
                    <li>
                        <Payco></Payco>
                        <div className={styles['pay-name']}>카카오페이</div>
                    </li>
                </ul>
            </div>
            <FixedButton button_name={'결제하기'}></FixedButton>
        </>
    );
};

export default PaymentContainer;
