import React from 'react';
import styles from './DetailContainer.module.scss';
import cn from 'classnames/bind';

//components
import ReviewRating from '../../components/review/ReviewRating';
import CircleButton from '../../components/button/CircleButton';

//asset
import test_img from '../../static/asset/png/test_img.png';
import guid_icon from '../../static/asset/svg/detail/guid.svg';
import roadview_icon from '../../static/asset/svg/detail/roadview.svg';
import shared_icon from '../../static/asset/svg/detail/shared.svg';

const cx = cn.bind(styles);

const DetailContainer = () => {
    // requestGetDetailParking API
    // API 에서 정보와 리뷰 내용이 한번에 넘어옴

    return (
        <>
            <div className={styles['parking-img']}>
                <img src={test_img} alt="img" />
            </div>
            <div className={styles['container']}>
                <div className={styles['pd-box']}>
                    <div className={styles['item-table']}>
                        <div className={styles['item-name']}>
                            <h1>길동이 주차공간</h1>
                            <div className={styles['item-state']}>대여가능</div>
                        </div>
                        <div className={styles['item-rating']}>
                            <ReviewRating rating={3} />
                            <div className={styles['item-review']}>
                                리뷰(124)
                        </div>
                        </div>
                        <div className={styles['function-box']}>
                            <CircleButton src={shared_icon} />
                            <CircleButton src={guid_icon} />
                            <CircleButton src={roadview_icon} />
                        </div>
                    </div>
                </div>
                <div className={styles['parking-detail-info']}>
                    <div className={cx('price', 'space-between')}>
                        <div className={styles['txt']}>
                            주차요금
                        </div>
                        <div className={styles['value']}>
                            <div className={styles['item-price']}>
                                3,000원
                            </div>
                            <div className={styles['item-base-time']}>
                                /30분 기준
                            </div>
                        </div>

                    </div>
                    <div className={cx('shared-time', 'space-between')}>
                        <div className={styles['txt']}>
                            대여시간
                        </div>
                        <div className={styles['value']}>
                            10/5(수)14:00 ~ 10/5(수)16:00
                        </div>

                    </div>
                    <div className={cx('operation-time', 'space-between')}>
                        <div className={styles['txt']}>
                            운영시간
                        </div>
                        <div className={styles['value']}>
                            10/5(수) 10:00 ~ 10/5(수) 20:00
                        </div>

                    </div>
                </div>
                <div className={styles['info-review']}>
                
                </div>
            </div>
        </>
    );
};

export default DetailContainer;
