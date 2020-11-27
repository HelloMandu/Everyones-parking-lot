import React from 'react';
import className from 'classnames/bind';
import { Link } from 'react-router-dom'
import { ButtonBase } from '@material-ui/core';

import { Paths } from '../../../paths'

import styles from './ReviewListContainer.module.scss';
import Parking from '../../../static/asset/png/parking.png';

const cx = className.bind(styles);

const reviewList = [
    {
        review_id: 1,
        review_body:
            '주차장이 꽤 넓어서 너무 좋았습니다! 다음에도 다시 이용 할거 같아요!!',
        review_rating: 5.0,
        review_img: 'parking',
        hit: 123,
        deleted: 1,
        created_at: '2020/01/20',
        updated_at: '2020/01/20',
        rental_id: 1,
        user_id: 1,
        place_id: 1,
    },
    {
        review_id: 2,
        review_body:
            '주차장이 꽤 넓어서 너무 좋았습니다! 다음에도 다시 이용 할거 같아요!!',
        review_rating: 1.0,
        review_img: 'reviewItem2',
        hit: 123,
        deleted: 2,
        created_at: '2020/01/20',
        updated_at: '2020/01/20',
        rental_id: 2,
        user_id: 2,
        place_id: 2,
    },
    {
        review_id: 3,
        review_body:
            '주차장이 꽤 넓어서 너무 좋았습니다! 다음에도 다시 이용 할거 같아요!!',
        review_rating: 3.5,
        review_img: 'reviewItem',
        hit: 123,
        deleted: 3,
        created_at: '2020/01/20',
        updated_at: '2020/02/10',
        rental_id: 3,
        user_id: 3,
        place_id: 3,
    },
];

const ReviewItem = ({
    review_id,
    review_body,
    review_rating,
    review_img,
    created_at,
    updated_at,
    place_id
}) => {
    return (
        <div className={cx('card')}>
            <img src={`${Parking}`} alt={`${review_img}`} />
            <div className={cx('title')}>{place_id}.title</div>
            <div className={cx('rating')}>{review_rating}</div>
            <div className={cx('date')}>
                {updated_at ? updated_at : created_at}
                <hr />
            </div>
            <div className={cx('body')}>{review_body}</div>

            <div className={cx('button-area')}>
                <ButtonBase>삭제</ButtonBase>
                <Link to={Paths.main.review.write + `?id=${review_id}`}>
                <ButtonBase>수정</ButtonBase>
                </Link>
            </div>
        </div>
    );
};

const ReviewListContainer = () => {
    // requestGetReviewList API

    return (
        <div className={cx('container')}>
            {reviewList.map(
                ({
                    review_id,
                    review_body,
                    review_rating,
                    review_img,
                    created_at,
                    updated_at,
                    place_id
                }) => (
                    <ReviewItem
                        key={review_id}
                        review_id={review_id}
                        review_body={review_body}
                        review_rating={review_rating}
                        review_img={review_img}
                        created_at={created_at}
                        updated_at={updated_at}
                        place_id={place_id}
                    />
                ),
            )}
        </div>
    );
};

export default ReviewListContainer;
