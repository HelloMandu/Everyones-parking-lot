import React from 'react';
/* Library */

import styles from '../CouponPage.module.scss';

import CouponContainer from '../../containers/main/CouponContainer';
/* Containers */

const CouponPage = () => {
    // 적용쿠폰이랑 내 쿠폰이랑 같은걸로 사용해야 할것 같습니다요..

    return (
        <div className={styles['coupon-page']}>
            <CouponContainer />
        </div>
    );
};

export default CouponPage;
