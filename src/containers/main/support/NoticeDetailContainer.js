import React, { useCallback, useState, useEffect } from 'react';
import qs from 'qs';
import { useLocation, useHistory } from 'react-router-dom';
/* Library */

import useLoading from '../../../hooks/useLoading';
import { useDialog } from '../../../hooks/useDialog';
/* Hooks */

import { requestGetDetailNotice } from '../../../api/notice';
/* API */

import { getFormatDateNanTime } from '../../../lib/calculateDate';
/* Lib */

import styles from './NoticeDetailContainer.module.scss';
/* StyleSheets */

const NoticeDetailContainer = () => {

    const location = useLocation();
    const history = useHistory();
    const openDialog = useDialog();
    const [onLoading, offLoading] = useLoading();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const notice_id = parseInt(query.id);

    const [detailNotice, setDetailNotice] = useState([]);

    const getNoticeDetail = useCallback(async () => {
        onLoading('notice_detail');
        const response = await requestGetDetailNotice(notice_id);
        setDetailNotice(response.notice);
        offLoading('notice_detail');
        // eslint-disable-next-line
    }, [notice_id])

    useEffect(() => {
        try {
            getNoticeDetail();
        } catch (e) {
            openDialog("공지사항 상세보기 오류", "", history.goBack());
        }
    }, [getNoticeDetail, openDialog, history])

    return (
        <div className={styles['container']}>
            <div className={styles['header-area']}>
                <div className={styles['header-text']}>
                    <div className={styles['header-time']}>{getFormatDateNanTime(detailNotice.updatedAt)}</div>
                    <div className={styles['header-title']}>{detailNotice.notice_title}</div>
                    <div className={styles['header-bottom']}>
                        <div className={styles['header-name']}>운영자</div>
                        <div className={styles['header-cnt']}>조회수 {detailNotice.hit}</div>
                    </div>
                </div>
            </div>
            <div className={styles['text-area']}>
                {detailNotice.notice_body}
            </div>
        </div>
    );
};

export default NoticeDetailContainer;