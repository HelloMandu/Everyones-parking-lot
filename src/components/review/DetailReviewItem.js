import React from 'react';
import { useHistory } from 'react-router-dom';

import ReviewRating from './ReviewRating';

import { getFormatDateNanTime } from '../../lib/calculateDate';
import { Paths } from '../../paths';

import profile_icon from '../../static/asset/png/profile.png';

import styles from './DetailReviewItem.module.scss';

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
        <li
            className={styles['detail-review-item']}
            key={review_id}
            onClick={() =>
                history.push(
                    `${Paths.main.review.detail}?review_id=${review_id}`,
                )
            }
        >
            <div className={styles['user-table']}>
                <div className={styles['profile']}>
                    <img
                        src={
                            user && user.profile_image
                                ? `${Paths.storage}${user.profile_image.replace(
                                      'uploads/',
                                      '',
                                  )}`
                                : profile_icon
                        }
                        alt="profile_icon"
                    />
                </div>
                <div className={styles['user-info']}>
                    <div className={styles['user-name']}>{user && user.name}</div>
                    <div className={styles['comment-date']}>
                        {getFormatDateNanTime(createdAt)}
                    </div>
                </div>
            </div>

            <div className={styles['comment']}>{review_body}</div>
            <div className={styles['rating']}>
                <ReviewRating rating={parseInt(review_rating)} />
            </div>
        </li>
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
                    등록된 댓글이 없습니다.
                    <br />첫 댓글을 남겨주세요!
                </div>
            </div>
        );
    }
    return <ul>{list}</ul>;
};

export default DetailReviewList;
