import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
/* Library */

import styles from './NoticeContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
/* StyleSheets */

import { getFormatDateNanTime } from '../../../lib/calculateDate';
/* Lib */

import useLoading from '../../../hooks/useLoading';
/* Hooks */

import { Paths } from '../../../paths';
/* Paths */

import { requestGetNoticeList } from '../../../api/notice';
import useScrollEnd from '../../../hooks/useScrollEnd';
/* API */

const NoticeItems = ({ noticeList }) => {
    return (
        <>
            {noticeList.map(({ notice_id, notice_title, hit, updatedAt }) => (
                <Link
                    to={Paths.main.support.notice_detail + `?id=${notice_id}`}
                    key={notice_id}
                >
                    <ButtonBase className={styles['item-container']}>
                        <div className={styles['item-time']}>
                            {getFormatDateNanTime(updatedAt)}
                        </div>
                        <div className={styles['item-title']}>
                            {notice_title}
                        </div>
                        <div className={styles['item-bottom']}>
                            <div className={styles['item-name']}>운영자</div>
                            <div className={styles['item-cnt']}>
                                조회수 {hit}
                            </div>
                        </div>
                    </ButtonBase>
                </Link>
            ))}
        </>
    );
};

const LOADING_NOTICE = 'notice';

const NoticeContainer = () => {
    const [onLoading, offLoading, isLoading] = useLoading();

    const allNoticeList = useRef([]);
    const dataLength = useRef(0);

    const [noticeList, setNoticeList] = useState([]);

    const fetchNoticeList = useCallback(() => {
        const allLength = allNoticeList.current.notices.length;
        const length = dataLength.current;
        if (length >= allLength) return;

        const fetchData = allNoticeList.current.notices.slice(
            length,
            length + 10,
        );
        setNoticeList((noticeList) => noticeList.concat(fetchData));
        dataLength.current += 10;
    }, []);

    const handleScroll = useCallback(() => {
        const endPoint =
            Math.ceil(
                window.innerHeight + document.documentElement.scrollTop,
            ) === document.documentElement.offsetHeight;
        if (endPoint) {
            fetchNoticeList();
        }
    }, [fetchNoticeList]);

    useScrollEnd(handleScroll);
    useEffect(() => {
        const getNoticeList = async () => {
            onLoading(LOADING_NOTICE);
            const response = await requestGetNoticeList();
            allNoticeList.current = response;
            fetchNoticeList();
            offLoading(LOADING_NOTICE);
        };
        getNoticeList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {!isLoading[LOADING_NOTICE] &&
                (noticeList.length ? (
                    <div className={styles['container']}>
                        <NoticeItems noticeList={noticeList} />
                    </div>
                ) : (
                    <div className={styles['non-notice']}>
                        <div className={styles['non-container']}>
                            <Notice />
                            <div className={styles['explain']}>
                                등록된 공지사항이 없습니다.
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default NoticeContainer;
