import React, { forwardRef } from 'react';
import cn from 'classnames/bind';
import { Dialog, Slide } from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ButtonBase } from '@material-ui/core';

import useModal from '../../hooks/useModal';

import EnrollCardModal from './EnrollCardModal';
import Header from '../header/Header';
import FixedButton from '../button/FixedButton';

import KakaoPay from '../../static/asset/svg/payment/KakaoPay.js';
import NaverPay from '../../static/asset/svg/payment/NaverPay.js';
import Payco from '../../static/asset/svg/payment/Payco.js';
import RegisterIcon from './RegisterIcon';

import Card1 from '../../static/asset/png/card/06.png';
import Card2 from '../../static/asset/png/card/02.png';
import Card3 from '../../static/asset/png/card/03.png';

import styles from './PaymentTypeModal.module.scss';

const cx = cn.bind(styles);

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentContainer = ({ open, match }) => {
    const {url, params} = match;
    const [isOpenCardEnrollment, openCardEnrollment] = useModal(url, params.modal2, 'enrollment');
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <Header title={'결제 수단 선택'}></Header>
            <div className={styles['payment-container']}>
                <h2 className={styles['payment-title']}>등록카드 결제</h2>
                <Swiper
                    className={styles['card-swiper']}
                    spaceBetween={20}
                >
                    <SwiperSlide>
                        <div className={styles['card-wrapper']}>
                            <img src={Card1} alt="card"></img>
                            <div className={styles['card-info']}>
                                <div className={styles['card-num']}>
                                    현대카드(1234 **** **** ****)
                                </div>
                                <ButtonBase>삭제</ButtonBase>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles['card-wrapper']}>
                            <img src={Card2} alt="card"></img>
                            <div className={styles['card-info']}>
                                <div className={styles['card-num']}>
                                    현대카드(1234 **** **** ****)
                                </div>
                                <ButtonBase>삭제</ButtonBase>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles['card-wrapper']}>
                            <img src={Card3} alt="card"></img>
                            <div className={styles['card-info']}>
                                <div className={styles['card-num']}>
                                    현대카드(1234 **** **** ****)
                                </div>
                                <ButtonBase>삭제</ButtonBase>
                            </div>
                        </div>
                    </SwiperSlide>
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
            <EnrollCardModal open={isOpenCardEnrollment}></EnrollCardModal>
        </Dialog>
    );
};

export default PaymentContainer;
