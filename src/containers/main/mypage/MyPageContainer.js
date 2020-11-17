import React from 'react';
/* Library */

import styles from './MyPageContainer.module.scss';
/* StyleSheets */

const MyPageContainer = () => {

    return (
        <div className={styles['container']}>
            내 정보 수정(마이페이지)
        </div>
    );
};

export default MyPageContainer;