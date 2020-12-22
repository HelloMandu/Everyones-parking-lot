import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './SupportContainer.module.scss';
import { useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Swiper, SwiperSlide } from 'swiper/react';
/* Library */

import NoticeContainer from './NoticeContainer';
import FAQContainer from './FAQContainer';
import QNAContainer from './QNAContainer';
/* Containers */

import { Paths } from '../../../paths';
/* Paths */

import 'swiper/swiper.scss';

const SupportContainer = ({ location }) => {

    const history = useHistory();

    const swiperRef = useRef();

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabIndex = useCallback((event, newValue) => {
        setTabIndex(newValue);
        swiperRef.current.slideTo(newValue, 300);
    }, []);
    const handleSwiperIndex = useCallback((newValue) => {
        setTabIndex(newValue);
        swiperRef.current.slideTo(newValue, 300);
        if (newValue === 0) {
            history.replace(Paths.main.support.notice);
        } else if (newValue === 1) {
            history.replace(Paths.main.support.faq);
        } else if (newValue === 2) {
            history.replace(Paths.main.support.qna);
        }
    }, [history]);

    useEffect(() => {
        const { pathname } = location;
        if (pathname.indexOf(Paths.main.support.notice) !== -1) {
            setTabIndex(0);
            swiperRef.current.slideTo(0, 300);
        }
        else if (pathname.indexOf(Paths.main.support.faq) !== -1) {
            setTabIndex(1);
            swiperRef.current.slideTo(1, 300);
        }
        else if (pathname.indexOf(Paths.main.support.qna) !== -1) {
            setTabIndex(2);
            swiperRef.current.slideTo(2, 300);
        }
        else {
            history.replace(Paths.main.support.notice);
        }
    }, [location, history]);

    return (
        <div className={styles['container']}>
            <Tabs
                className={styles['tabs']}
                value={tabIndex}
                onChange={handleTabIndex}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: 'black',
                    },
                }}
            >
                <Tab className={styles['tab']} label="공지사항" />
                <Tab className={styles['tab']} label="자주 묻는 질문" />
                <Tab className={styles['tab']} label="1:1 문의" />
            </Tabs>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                    handleSwiperIndex(swiper.activeIndex);
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <SwiperSlide>
                    {({ isActive }) => isActive && <NoticeContainer />}
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive }) => isActive && <FAQContainer />}
                </SwiperSlide>
                <SwiperSlide>
                    {({ isActive, isDuplicate }) => isActive && <QNAContainer isDuplicate={isDuplicate} />}
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SupportContainer;