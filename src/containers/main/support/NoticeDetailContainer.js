import React from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
/* Library */

import styles from './NoticeDetailContainer.module.scss';
/* StyleSheets */

const NoticeDetailContainer = () => {
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const notice_id = parseInt(query.id);
    return (
        <div className={styles['container']}>
            <div className={styles['header-area']}>
                <div className={styles['header-text']}>
                    <div className={styles['header-time']}>2020/05/22</div>
                    <div className={styles['header-title']}>TEST 이벤트 제목입니다.</div>
                    <div className={styles['header-bottom']}>
                        <div className={styles['header-name']}>스페이스</div>
                        <div className={styles['header-cnt']}>조회수 123</div>
                    </div>
                </div>
            </div>
            <div className={styles['text-area']}>
                {notice_id}<p />
                TEST 이벤트 제목입니이벤트 제목입니다.
                TEST 이벤트 제목입니다.
                TEST 이벤트 제목ST 이벤트 제목입니다.
                TEST 이벤트 제목입니다. TEST 이벤트 제목입니ST 이벤트 제목입
                니다TEST 이벤트 제목입니EST 이벤트 제목입니다.
                TEST 이벤트 제목입니다.
            </div>
        </div>
    );
};

export default NoticeDetailContainer;