import React from 'react';
/* Library */


import CouponContainer from '../../containers/main/CouponContainer';
/* Containers */

import styles from './CouponPage.module.scss';

const CouponPage = () => {
    return (
        <div className={styles['coupon-page']}>
            <CouponContainer />
        </div>
    );
};

export default CouponPage;
   