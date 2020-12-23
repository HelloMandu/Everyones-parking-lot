import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';
import useLoading from '../../../hooks/useLoading';
import { useScrollEnd } from '../../../hooks/useScroll';
import useSnackBar from '../../../hooks/useSnackBar';

import { requestGetReviewList, requestDeleteReview } from '../../../api/review';
import { imageFormat } from '../../../lib/formatter';
import { getFormatDateNanTime } from '../../../lib/calculateDate';

import { Paths } from '../../../paths';

import className from 'classnames/bind';
import styles from './ReviewListContainer.module.scss';
import { ButtonBase } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Notice from '../../../static/asset/svg/Notice';

const cx = className.bind(styles);

const ReviewItem = ({ review, onDelete }) => {
    return (
        <li className={cx('card')}>
            <Link
                to={
                    Paths.main.review.detail +
                    `?review_id=${review.review_id}&place_id=${review.place.place_id}`
                }
            >
                <div
                    className={cx('card-img')}
                    style={{
                        backgroundImage: `url('${imageFormat(
                            review.place.place_images[0],
                        )}')`,
                    }}
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
                    {getFormatDateNanTime(
                        review.updatedAt ? review.updatedAt : review.createdAt,
                    )}
                    <hr />
                </div>
                <div className={cx('body')}>{review.review_body}</div>
            </Link>

            <div className={cx('button-area')}>
                <ButtonBase onClick={onDelete}>삭제</ButtonBase>
                <Link
                    to={
                        Paths.main.review.modify +
                        `?rental_id=${review.rental_id}`
                    }
                >
                    <ButtonBase>수정</ButtonBase>
                </Link>
            </div>
        </li>
    );
};

const LOADING_REVIEW = 'review';

const ReviewListContainer = () => {
    const token = useToken();
    const reviewlist = useRef([]);
    const [list, setList] = useState([]);
    const reviewLength = useRef(0);
    const [onLoading, offLoading, isLoading] = useLoading();
    const openDialog = useDialog();
    const [handleSnackBar] = useSnackBar();

    const fetchReviewList = useCallback(() => {
        const LIMIT = 3;
        const length = reviewLength.current;
        const fetchData = reviewlist.current.slice(length, length + LIMIT);
        if (fetchData.length > 0) {
            setList((list) => list.concat(fetchData));
            reviewLength.current += LIMIT;
        }
    }, [reviewlist]);

    const getReviewList = useCallback(async () => {
        if (!token) {
            return;
        }
        try {
            onLoading(LOADING_REVIEW);
            const { data } = await requestGetReviewList(token);
            reviewlist.current = data.reviews;
            fetchReviewList();
            offLoading(LOADING_REVIEW);
        } catch (e) {
            console.error(e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const deleteReview = useCallback(
        async (id) => {
            try {
                if (!token) {
                    return;
                }
                const { data } = await requestDeleteReview(token, id);
                if (data.msg === 'success') {
                    setList((list) =>
                        list.filter((item) => item.review_id !== id),
                    );
                    reviewlist.current = reviewlist.current.filter(
                        (item) => item.review_id !== id,
                    );
                    reviewLength.current -= 1;
                    handleSnackBar('리뷰가 삭제되었습니다', 'info', false);
                } else {
                    handleSnackBar(
                        '삭제도중 오류가 발생했습니다.',
                        'error',
                        false,
                    );
                }
            } catch (e) {
                openDialog('Error', '삭제도중 오류가 발생했습니다.');
            }
        },
        [handleSnackBar, openDialog, token],
    );

    const reviewDelete = useCallback(
        (id) => {
            openDialog(
                '리뷰를 삭제하시겠습니까 ?',
                '',
                () => deleteReview(id),
                true,
            );
        },
        [deleteReview, openDialog],
    );

    useEffect(getReviewList, [getReviewList]);
    useScrollEnd(fetchReviewList);

    return (
        <>
            {!isLoading[LOADING_REVIEW] &&
                (list.length ? (
                    <ul className={cx('container')}>
                        {list.map((review) => (
                            <ReviewItem
                                key={review.review_id}
                                review={review}
                                onDelete={() => reviewDelete(review.review_id)}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className={styles['non-qna']}>
                        <div className={styles['non-container']}>
                            <Notice />
                            <div className={styles['explain']}>
                                내가 작성한 리뷰가 없습니다.
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default ReviewListContainer;
