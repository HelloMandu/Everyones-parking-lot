import React, { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import { useHistory } from 'react-router-dom';

import FixedButton from '../../components/button/FixedButton';

import { Paths } from '../../paths';

import classNames from 'classnames/bind';
import styles from './IntroContainer.module.scss';
import Intro from '../../static/asset/png/intro_1.png';
import Intro2 from '../../static/asset/png/intro_2.png';
import LogoIntro from '../../static/asset/png/logo_intro.png';
import 'swiper/components/pagination/pagination.scss';
import { ButtonBase } from '@material-ui/core'

const cx = classNames.bind(styles);

SwiperCore.use([Pagination]);

const IntroPage = ({ img, comment, comment2, addtion, correction }) => {
    return (
        <>
            <img className={cx({ correction })} src={img} alt="" />
            <div className={cx('comment', addtion)}>
                {comment}
                <br />
                {comment2}
            </div>
        </>
    );
};

const IntroContainer = () => {
    const history = useHistory();
    const swiperRef = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const handleSwiperIndex = useCallback((newValue) => {
        setTabValue(newValue);
        swiperRef.current.slideTo(newValue, 300);
    }, []);

    const visit = useCallback(() => {
        localStorage.setItem('SpaceStation_visited', true);
        history.push(Paths.main.index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={cx('header')}>
                {tabValue !== 2 && (
                    <ButtonBase onClick={visit}>건너뛰기</ButtonBase>
                )}
            </div>
            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) =>
                    handleSwiperIndex(swiper.activeIndex)
                }
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <SwiperSlide>
                    <IntroPage
                        img={Intro}
                        comment={'아직도 주차때문에'}
                        comment2={'매번 고민하시나요?'}
                    ></IntroPage>
                </SwiperSlide>
                <SwiperSlide>
                    <IntroPage
                        img={Intro2}
                        comment={'주차고민?'}
                        comment2={'공유주차장으로 해결하세요.'}
                        addtion={'page-two'}
                    ></IntroPage>
                </SwiperSlide>
                <SwiperSlide>
                    <IntroPage img={LogoIntro} correction={true}></IntroPage>
                </SwiperSlide>
            </Swiper>
            <FixedButton
                button_name={'시작하기'}
                disable={tabValue !== 2}
                onClick={visit}
            />
        </>
    );
};

export default IntroContainer;
