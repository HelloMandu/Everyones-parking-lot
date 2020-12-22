import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';
import useSWR from 'swr';
/* Library */

import styles from './NoticeContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
/* StyleSheets */

import { getFormatDateNanTime } from '../../../lib/calculateDate';
/* Lib */

import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading';
/* Hooks */

import { Paths } from '../../../paths';
/* Paths */

import { requestGetNoticeList } from '../../../api/notice';
/* API */

const NoticeItems = ({ noticeList }) => {

    return (
        <>
            {noticeList.map(({ notice_id, notice_title, hit, updatedAt }) => (
                <Link to={Paths.main.support.notice_detail + `?id=${notice_id}`} key={notice_id}>
                    <ButtonBase className={styles['item-container']}>
                        <div className={styles['item-time']}>{getFormatDateNanTime(updatedAt)}</div>
                        <div className={styles['item-title']}>{notice_title}</div>
                        <div className={styles['item-bottom']}>
                            <div className={styles['item-name']}>운영자</div>
                            <div className={styles['item-cnt']}>조회수 {hit}</div>
                        </div>
                    </ButtonBase>
                </Link>
            ))
            }
        </>
    )
}

const NoticeContainer = () => {

    const openDialog = useDialog();
    const history = useHistory();
    const [onLoading, offLoading] = useLoading();

    const [noticeList, setNoticeList] = useState([]);

    const { data } = useSWR(['notice'], requestGetNoticeList);
    useEffect(() => {
        if (!data) onLoading('notice');
        if (data !== undefined) {
            offLoading('notice');
            if (data.msg === 'success') {
                setNoticeList(data.notices);
            } else {
                openDialog("공지사항 요청 오류", "", () => history.goBack());
            }
        }
        // eslint-disable-next-line
    }, [data])

    return (
        <>
            {noticeList.length !== 0
                ? <div className={styles['container']}>
                    <NoticeItems noticeList={noticeList} />
                </div>
                : <div className={styles['non-notice']}>
                    <div className={styles['non-container']}>
                        <Notice />
                        <div className={styles['explain']}>등록된 공지사항이 없습니다.</div>
                    </div>
                </div>
            }
        </>
    );
};

export default NoticeContainer;