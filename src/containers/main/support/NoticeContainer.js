import React from 'react';
/* Library */

import styles from './NoticeContainer.module.scss';
/* StyleSheets */

const NoticeContainer = () => {

    return (
        <div className={styles['container']}>
            공지사항 리스트 뷰
        </div>
    );
};

export default NoticeContainer;