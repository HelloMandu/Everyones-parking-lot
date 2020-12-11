import React, { useCallback, useEffect, useState } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
/* Library */

import FixedButton from '../../../components/button/FixedButton';

import { requestGetDetailUseRental } from '../../../api/rental';
import { requestPostWriteReview, requestPutModifyReview } from '../../../api/review'

import { getFormatDateTime } from '../../../lib/calculateDate';

import className from 'classnames/bind';
import styles from './ReviewWriteContainer.module.scss';
import Rating from '@material-ui/lab/Rating';

const cx = className.bind(styles);

const ReviewWriteContainer = () => {
    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { id } = query;

    const [order, setOrder] = useState();
    const [exist, setExist] = useState(false);
    const [rating, setRating] = useState(5);
    const [reviewBody, setReviewBody] = useState()
    const [review, setReview] = useState()

    const getOrder = useCallback(async () => {
        const { msg, order, review } = await requestGetDetailUseRental(id);

        console.log(order, review);
        if (msg === 'success') {
            setOrder(order);
              
            if(review) {
                setExist(true)
                setReviewBody(review.review_body)
                setReview(review)
            } else setExist(false);
        }
    }, [id]);

    useEffect(() => {
        getOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const writeReview = useCallback(async() => {
        const token = localStorage.getItem('user_id')
        const result = await requestPostWriteReview(token, order.rental_id, order.place_id, reviewBody, rating)
        
        console.log(result)
    }, [order, rating, reviewBody])

    const modifyReview = useCallback(async() => {
        const token = localStorage.getItem('user_id')
        const result = await requestPutModifyReview(token, review.review_id, reviewBody, rating)

        console.log(result)
    }, [rating, review, reviewBody])

    return (
        order !== undefined && (
            <>
            {console.log(rating, reviewBody)}
                <div className={cx('container')}>
                    <div className={cx('comment')}>
                        <div className={cx('date')}>
                            {`${getFormatDateTime(
                                order.rental_start_time,
                            )} ~ ${getFormatDateTime(
                                order.rental_end_time,
                            )}`}
                        </div>
                        <div className={cx('title')}>{order.place.place_name}</div>

                        <div className={cx('rating')}>
                            <Rating
                                name="half-rating"
                                defaultValue={5}
                                precision={0.5}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                  }}
                            />
                            <div className={cx('rating-comment')}>
                                이용에 대한 평점을 매겨주세요.
                            </div>
                        </div>

                        <div className={cx('input')}>
                            <textarea
                                name="review"
                                rows="10"
                                cols="20"
                                placeholder="리뷰를 작성해주세요.&#13;&#10;작성시 100P를 지급해드립니다."
                                onChange={e => setReviewBody(e.target.value)}
                                defaultValue={reviewBody ? reviewBody : ''}
                            />
                        </div>
                    </div>
                </div>
                <FixedButton
                    button_name={exist ? '수정하기' : '작성하기'}
                    disable={false}
                    onClick={exist ? modifyReview : writeReview}
                />
            </>
        )
    );
};

export default ReviewWriteContainer;
