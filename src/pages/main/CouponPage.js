import React, { forwardRef, useEffect, useState } from 'react';
import { ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';

import CouponContainer from '../../containers/main/CouponContainer';
import CouponCodeModal from '../../components/coupon/CouponCodeModal';

import styles from './CouponPage.module.scss';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CouponPage = () => {
    const history = useHistory();
    const [openCouponCode, setOpenCouponCode] = useState(false);
    useEffect(() => {
        setOpenCouponCode(history.location.pathname === '/coupon/code');
    }, [history.location.pathname]);
    return (
        <div className={styles['coupon-page']}>
            <ButtonBase
                className={styles['coupon-input']}
                onClick={() => history.push('/coupon/code')}
            >
                쿠폰입력
            </ButtonBase>
            <Dialog
                fullScreen
                open={openCouponCode}
                TransitionComponent={Transition}
            >
                <CouponCodeModal></CouponCodeModal>
            </Dialog>
            <CouponContainer />
        </div>
    );
};

export default CouponPage;
