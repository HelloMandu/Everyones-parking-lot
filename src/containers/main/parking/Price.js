import React from 'react';

import { numberFormat } from '../../../lib/formatter';

import styles from './Price.module.scss';


const Price = () =>{
    return(
        <div className={styles["final-payment"]}>
                <div className={styles["total-payment"]}>
                    <div className={styles["title"]}>최종 결제금액</div>
                    <div className={styles["price"]}>{numberFormat(60000)}원</div>
                </div>
                <div className={styles["payment"]}>
                    <div className={styles["title"]}>대여비</div>
                    <div className={styles["price"]}>{numberFormat(60000)}원</div>
                </div>
                <div className={styles["payment"]}>
                    <div className={styles["title"]}>보증금</div>
                    <div className="price">{numberFormat(10000)}원</div>
                </div>
                <div className={styles["payment"]}>
                    <div className={styles["title"]}>쿠폰 할인</div>
                    <div className={styles["price"]}>{numberFormat(-1000)}원</div>
                </div>
                <div className={styles["payment"]}>
                    <div className={styles["title"]}>포인트 할인</div>
                    <div className={styles["price"]}>{numberFormat(-1000)}원</div>
                </div>
            </div>
    )
}

export default Price;