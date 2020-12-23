import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './SupportContainer.module.scss';
import { useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Swiper, SwiperSlide } from 'swiper/react';
import qs from 'qs';
/* Library */

import NoticeContainer from './NoticeContainer';
import FAQContainer from './FAQContainer';
import QNAContainer from './QNAContainer';
/* Containers */

import { Paths } from '../../../paths';
/* Paths */

import 'swiper/swiper.scss';
import useLoading from '../../../hooks/useLoading';
import { useDialog } from '../../../hooks/useDialog';
import { requestGetQNAList } from '../../../api/qna';
import { requestGetNoticeList } from '../../../api/notice';

const initialTab = (location) => {
    switch (location.pathname) {
        case Paths.main.support.notice:
            return 0;
        case Paths.main.support.faq:
            return 1;
        default:
            return 2;
    }
};

const SupportContainer = ({ location }) => {
    const history = useHistory();
    const [onLoading, offLoading, isLoading] = useLoading();
    const openDialog = useDialog();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const t = query.type ? query.type : '0';
    const type = parseInt(t);

    const swiperRef = useRef();
    const [tabIndex, setTabIndex] = useState(initialTab(location));
    const handleTabIndex = useCallback((event, newValue) => {
        setTabIndex(newValue);
        swiperRef.current.slideTo(newValue, 300);
    }, []);
    const handleSwiperIndex = useCallback(
        (newValue) => {
            setTabIndex(newValue);
            swiperRef.current.slideTo(newValue, 300);
            if (newValue === 0) {
                history.replace(Paths.main.support.notice);
            } else if (newValue === 1) {
                history.replace(Paths.main.support.faq);
            } else if (newValue === 2) {
                history.replace(Paths.main.support.qna);
            }
        },
        [history],
    );
    useEffect(() => {
        if (tabIndex === 0) {
            swiperRef.current.slideTo(0, 0);
        } else if (tabIndex === 1) {
            swiperRef.current.slideTo(1, 0);
        } else if (tabIndex === 2) {
            swiperRef.current.slideTo(2, 0);
        } else {
            history.replace(Paths.main.support.notice);
        }
    }, [history, tabIndex]);
    const [noticeList, setNoticeList] = useState([]);
    const requesetNoticeList = useCallback(async () => {
        if (!noticeList.length) {
            onLoading('notice');
            try {
                const data = await requestGetNoticeList('notice');
                if (data.msg === 'success') {
                    setNoticeList(data.notices);
                } else {
                    openDialog('공지사항 요청 오류', '', () => {
                        history.goBack();
                    });
                }
            } catch (e) {
                console.error(e);
            }
            offLoading('notice');
        }
    }, [history, noticeList.length, offLoading, onLoading, openDialog]);

    const [QNAList, setQNSList] = useState([]);
    const requesetQnaList = useCallback(async () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            if (!QNAList.length) {
                onLoading('qna');
                try {
                    const { data } = await requestGetQNAList('qna', JWT_TOKEN);
                    if (data.msg === 'success') {
                        setQNSList(data.qnas);
                    } else {
                        openDialog('1:1문의 오류', '', () => {
                            history.goBack();
                        });
                    }
                } catch (e) {
                    console.error(e);
                }
                offLoading('qna');
            }
        } else {
            openDialog('로그인 후 이용가능 합니다', '', () => history.goBack());
        }
    }, [QNAList.length, history, offLoading, onLoading, openDialog]);

    useEffect(() => {
        switch (tabIndex) {
            case 0:
                requesetNoticeList();
                return;
            case 2:
                requesetQnaList();
                return;
            default:
                return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabIndex]);

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
                    {!isLoading['notice'] && (
                        <NoticeContainer noticeList={noticeList} />
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    <FAQContainer type={type} />
                </SwiperSlide>
                <SwiperSlide>
                    {!isLoading['qna'] && <QNAContainer QNAList={QNAList} />}
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default SupportContainer;
