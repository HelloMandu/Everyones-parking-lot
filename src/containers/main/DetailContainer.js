import React from 'react';
import styles from './DetailContainer.module.scss';
import test_img from '../../static/asset/png/test_img.png';
const DetailContainer = () => {
    // requestGetDetailParking API
    // API 에서 정보와 리뷰 내용이 한번에 넘어옴

    return (
        <>
            <div className={styles['parking-img']}>
                <img src={test_img} alt="img" />
            </div>
            <div className={styles['container']}>
                <div className={styles['parking-info']}>
                
                </div>

            </div>
        </>
    );
};

export default DetailContainer;
