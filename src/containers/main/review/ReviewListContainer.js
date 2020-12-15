import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';
import useLoading from '../../../hooks/useLoading'

import { requestGetReviewList, requestDeleteReview } from '../../../api/review';

import { Paths } from '../../../paths';

import className from 'classnames/bind';
import styles from './ReviewListContainer.module.scss';
import { ButtonBase } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Notice from '../../../static/asset/svg/Notice';

const cx = className.bind(styles);

const ReviewItem = ({ review }) => {
    const history = useHistory()
    const openDialog = useDialog();
    const [onLoading, offLoading] = useLoading()
    const reviewDelete = useCallback(() => {
        onLoading('reviewDelete')

        const token = localStorage.getItem('user_id');
        openDialog(
            '리뷰를 삭제하시겠습니까 ?',
            '',
            async() => {
                const {data} = await requestDeleteReview(token, review.review_id)

                if(data.msg === 'success') {
                    openDialog('리뷰가 삭제되었습니다.')
                    history.push(Paths.main.index)
                } else openDialog(data.msg)
            },
            true,
        );

        offLoading('reviewDelete')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, openDialog, review]);

    return (
        <div className={cx('card')}>
            <Link to={Paths.main.review.detail + `?review_id=${review.review_id}`}>
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
                <Link to={Paths.main.review.write + `?rental_id=${review.rental_id}`}>
                    <ButtonBase>수정</ButtonBase>
                </Link>
            </div>
        </div>
    );
};

const ReviewListContainer = () => {
    const token = useToken();
    const [list, setList] = useState([]);
    const [onLoading, offLoading] = useLoading()

    const getReviewList = useCallback(async () => {
        onLoading('getReviewList')

        const { data } = await requestGetReviewList(token);

        setList(data.reviews);

        offLoading('getReviewList')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (token !== null) getReviewList();

        return;
    }, [getReviewList, token]);

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
                <div className={styles['explain']}>내가 작성한 리뷰가 없습니다.</div>
            </div>
        </div>
    );
};

export default ReviewListContainer;
