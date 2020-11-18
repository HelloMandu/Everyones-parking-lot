import React from 'react';
/* Library */

import profile from '../../../static/asset/png/profile.png';
import ArrowSmall from '../../../static/asset/svg/ArrowSmall';
/* Static */

import styles from './MyPageContainer.module.scss';
import Car from '../../../static/asset/svg/Car';
/* StyleSheets */


const MyPageContainer = () => {

    return (
        <div className={styles['container']}>
            <div className={styles['user-area']}>
                <div className={styles['img-wrap']}>
                    <img src={profile} alt="프로필 사진" />
                </div>
                <div className={styles['right-wrap']}>
                    <div className={styles['name-wrap']}>
                        <div className={styles['user-name']}>
                            <span>스페이스</span>
                        </div>
                        <ArrowSmall rotate={90} />
                    </div>
                    <div className={styles['enroll-wrap']}>
                        <div className={styles['enroll']}>
                            <Car />
                            <span> 차량 등록관리</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['mypage-area']}>
                <div className={styles['parking-wrap']}>

                </div>
                <div className={styles['use-wrap']}>

                </div>
            </div>
            <div className={styles['info-area']}>
                <div className={styles['hp-wrap']}>

                </div>
                <div className={styles['email-wrap']}>

                </div>
                <div className={styles['birthday-wrap']}>

                </div>
            </div>
            <div className={styles['password-area']}>
                <div className={styles['password-wrap']}>

                </div>
            </div>
            <div className={styles['withdraw-area']}>
                <div className={styles['withdraw-wrap']}>

                </div>
            </div>
        </div>
    );
};

export default MyPageContainer;