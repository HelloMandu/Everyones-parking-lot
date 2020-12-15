import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonBase } from '@material-ui/core';

import ReviewRating from './ReviewRating';

import { getFormatDateNanTime } from '../../lib/calculateDate';
import { Paths } from '../../paths';

import profile_icon from '../../static/asset/png/profile.png';

import styles from './DetailReviewItem.module.scss';
import { DBImageFormat } from '../../lib/formatter';

const DetailReviewItem = ({ reviewInfo }) => {
    const {
        review_id,
        review_rating,
        createdAt,
        review_body,
        user,
    } = reviewInfo;
    const history = useHistory();
    return (
        <ButtonBase
            component="li"
            className={styles['detail-review-item']}
            key={review_id}
            onClick={() =>
                history.push(`${Paths.main.review.detail}?review_id=${review_id}`)
            }
        >
            <div className={styles['user-table']}>
                <div className={styles['profile']}>
                    <img
                        src={DBImageFormat(user && user.profile_image, profile_icon)}
                        alt="profile_icon"
                    />
                </div>
                <div className={styles['user-info']}>
                    <div className={styles['user-name']}>
                        {user ? user.name : '탈퇴한 회원입니다.'}
                    </div>
                    <div className={styles['comment-date']}>
                        {getFormatDateNanTime(createdAt)}
                    </div>
                </div>
            </div>

            <div className={styles['comment']}>{review_body}</div>
            <div className={styles['rating']}>
                <ReviewRating rating={parseInt(review_rating)} />
            </div>
        </ButtonBase>
    );
};

const DetailReviewList = ({ review_list }) => {
    const list = review_list.map((reviewInfo) => (
        <DetailReviewItem reviewInfo={reviewInfo} />
    ));
    if (review_list.length === 0 || !review_list) {
        return (
            <div className={styles['comment-none-wrapper']}>
                <div className={styles['comment-none']}>
                    등록된 리뷰가 없습니다.
                    <br />첫 리뷰를 남겨주세요!
                </div>
            </div>
        );
    }
    return <ul>{list}</ul>;
};

export default DetailReviewList;
