import React from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import className from 'classnames/bind';
/* Library */

import styles from './ReviewWriteContainer.module.scss';
import Rating from '@material-ui/lab/Rating';

const cx = className.bind(styles);

const WriteReview = () => {
    // requestPostWriteReview API

    return <div>리뷰 작성</div>;
};

const ModifyReview = () => {
    // requestPutModifyReview API

    return (
        <div className={cx('comment')}>
            <div className={cx('date')}>10/05(수) 14:00 ~ 10/05(수) 16:00</div>
            <div className={cx('title')}>길동이 주차 공간</div>

            <div className={cx('rating')}>
                    <Rating
                        name="half-rating"
                        defaultValue={2.5}
                        precision={0.5}
                    />
                <div className={cx('rating-comment')}>
                    이용에 대한 평점을 매겨주세요.
                </div>
            </div>

            <div className={cx('input')}>
                <input
                    type="textarea"
                    name="review"
                    placeholder="리뷰를 작성해주세요.작성시 100P를 지급해드립니다."
                />
            </div>
        </div>
    );
};

const ReviewWriteContainer = () => {
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { id } = query;

    return (
        <div className={cx('container')}>
            {console.log(id, location)}
            {id ? <ModifyReview /> : <WriteReview />}
        </div>
    );
};

export default ReviewWriteContainer;
