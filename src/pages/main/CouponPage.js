import React, { forwardRef, useEffect, useState } from 'react';
import { ButtonBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Dialog, Slide } from '@material-ui/core';

import CouponContainer from '../../containers/main/CouponContainer';
import CouponCodeModal from '../../components/coupon/CouponCodeModal';

import XButton from '../../static/asset/svg/X_button';

import styles from './CouponPage.module.scss';
import { useCallback } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CouponPage = () => {
    const history = useHistory();
    const [openCouponCode, setOpenCouponCode] = useState(false);
    const onToggleConponCode = useCallback(()=>{
        if(openCouponCode){ 
            history.goBack();
        } else{
            history.push('/coupon/code')
        }
    }, [history, openCouponCode])
    useEffect(() => {
        setOpenCouponCode(history.location.pathname === '/coupon/code');
    }, [history.location.pathname]);
    return (
        <div className={styles['coupon-page']}>
            <ButtonBase
                className={styles['coupon-input']}
                onClick={()=>onToggleConponCode()}
            >
                {!openCouponCode ? '쿠폰입력' : <XButton/>}
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
