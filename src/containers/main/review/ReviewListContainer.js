import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';

import { requestGetReviewList, requestDeleteReview } from '../../../api/review';

import { Paths } from '../../../paths';

import className from 'classnames/bind';
import styles from './ReviewListContainer.module.scss';
import { ButtonBase } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Notice from '../../../static/asset/svg/Notice';

const cx = className.bind(styles);

const ReviewItem = ({ review }) => {
    const openDialog = useDialog();
    const reviewDelete = useCallback(() => {
        const token = localStorage.getItem('user_id');
        openDialog(
            '리뷰를 삭제하시겠습니까 ?',
            '',
            () => requestDeleteReview(token, review.review_id),
            true,
        );
    }, [openDialog, review]);

    return (
        <div className={cx('card')}>
            <Link to={Paths.main.review.detail + `?id=${review.review_id}`}>
                <img
                    src={
                        Paths.storage +
                        review.place.place_images[0].split('\\')[1]
                    }
                    alt=""
                />
                <div className={cx('title')}>{review.place.place_name}</div>
                <div className={cx('rating')}>
                    <Rating
                        value={parseFloat(review.review_rating)}
                        precision={0.5}
                        readOnly
                    />
                </div>
                <div className={cx('date')}>
                    {review.updated_at ? review.updated_at : review.created_at}
                    <hr />
                </div>
                <div className={cx('body')}>{review.review_body}</div>
            </Link>

            <div className={cx('button-area')}>
                <ButtonBase onClick={reviewDelete}>삭제</ButtonBase>
                <Link to={Paths.main.review.write + `?id=${review.rental_id}`}>
                    <ButtonBase>수정</ButtonBase>
                </Link>
            </div>
        </div>
    );
};

const ReviewListContainer = () => {
    const token = useToken();
    const [list, setList] = useState([]);

    const getReviewList = useCallback(async () => {
        const { data } = await requestGetReviewList(token);

        setList(data.reviews);
    }, [token]);

    useEffect(() => {
        if (token !== null) getReviewList();

        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return list.length !== 0 ? (
        <div className={cx('container')}>
            {list.map((item) => (
                <ReviewItem key={item.review_id} review={item} />
            ))}
        </div>
    ) : (
        <div className={styles['non-qna']}>
            <div className={styles['non-container']}>
                <Notice />
                <div className={styles['explain']}>리뷰가 없습니다.</div>
            </div>
        </div>
    );
};

export default ReviewListContainer;
