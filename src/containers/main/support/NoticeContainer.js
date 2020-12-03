<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
>>>>>>> jh
import { ButtonBase } from '@material-ui/core';
/* Library */

import styles from './NoticeContainer.module.scss';
import Notice from '../../../static/asset/svg/Notice';
/* StyleSheets */

<<<<<<< HEAD
import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading';
/* Hooks */

import { getFormatDateNanTime } from '../../../lib/calculateDate';
/* Lib */

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

    const [noticeList, setNoticeList] = useState([]);
    const [onLoading, offLoading] = useLoading();
    const openDialog = useDialog();
    const history = useHistory();

    const getNoticeList = useCallback(async () => {
        onLoading('notice');
        const response = await requestGetNoticeList();
        setNoticeList(response.notices);
        offLoading('notice');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        try {
            getNoticeList();
        } catch (e) {
            openDialog("공지사항 오류", "", () => history.goBack());
        }
    }, [getNoticeList, openDialog, history]);

    if (noticeList.length !== 0) {
        return (
            <div className={styles['container']}>
                <NoticeItems noticeList={noticeList} />
            </div>
        )
    }
    return (
        <div className={styles['non-notice']}>
            <div className={styles['non-container']}>
                <Notice />
                <div className={styles['explain']}>등록된 공지사항이 없습니다.</div>
            </div>
        </div>
    );
};

=======
import { Paths } from '../../../paths';
/* Paths */

const NoticeItems = ({ noticeList }) => {

    return (
        <>
            {noticeList.map(({ notice_id, notice_time, notice_title, notice_name, notice_cnt }) => (
                <Link to={Paths.main.support.notice_detail + `?id=${notice_id}`} key={notice_id}>
                    <ButtonBase className={styles['item-container']}>
                        <div className={styles['item-time']}>{notice_time}</div>
                        <div className={styles['item-title']}>{notice_title}</div>
                        <div className={styles['item-bottom']}>
                            <div className={styles['item-name']}>{notice_name}</div>
                            <div className={styles['item-cnt']}>조회수 {notice_cnt}</div>
                        </div>
                    </ButtonBase>
                </Link>
            ))}
        </>
    )
}
const NoticeContainer = () => {

    const [noticeList, setNoticeList] = useState([
        {
            notice_id: 1,
            notice_time: '2020/05/22',
            notice_title: 'TEST 공지사항',
            notice_name: '스페이스',
            notice_cnt: '123',
        },
        {
            notice_id: 2,
            notice_time: '2020/05/22',
            notice_title: 'TEST 공지사항',
            notice_name: '스페이스',
            notice_cnt: '123',
        },
        {
            notice_id: 3,
            notice_time: '2020/05/22',
            notice_title: 'TEST 공지사항',
            notice_name: '스페이스',
            notice_cnt: '123',
        },
    ]);

    if (noticeList.length !== 0) {
        return (
            <div className={styles['container']}>
                <NoticeItems noticeList={noticeList} />
            </div>
        )
    }
    return (
        <div className={styles['non-notice']}>
            <div className={styles['non-container']}>
                <Notice />
                <div className={styles['explain']}>등록된 공지사항이 없습니다.</div>
            </div>
        </div>
    );
};

>>>>>>> jh
export default NoticeContainer;