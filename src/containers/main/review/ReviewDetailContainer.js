import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading'

import {
    requestDeleteReview,
    requestGetDetailReview,
    requestPostWriteComment,
} from '../../../api/review';

import { getFormatDateTime } from '../../../lib/calculateDate';
import { isEmpty } from '../../../lib/formatChecker';

import { Paths } from '../../../paths';

import classNames from 'classnames/bind';
import styles from './ReviewDetailContainer.module.scss';
import Profile from '../../../static/asset/png/profile.png';
import Rating from '@material-ui/lab/Rating';
import { ButtonBase } from '@material-ui/core';
import { imageFormat, DBImageFormat } from '../../../lib/formatter';

const cx = classNames.bind(styles);

const ReviewDetailContainer = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { review_id } = query;

    const [review, setReview] = useState();
    const [commentList, setCommentList] = useState([]);
    const [comment, onChangeComment] = useInput();
    const commentRef = useRef();
    const history = useHistory();
    const openDialog = useDialog();
    const user = useSelector((state) => state.user);
    const [onLoading, offLoading] = useLoading()

    const onClickSubmit = useCallback(async () => {
        onLoading('writeComment')

        const token = localStorage.getItem('user_id');
        const { data } = await requestPostWriteComment(
            token,
            review_id,
            comment,
        );
        if (data.msg === 'success') {
            setCommentList(commentList.concat(data.comment));
            commentRef.current.value = '';
        } else {
            openDialog('댓글 작성을 실패했습니다.');
        }

        offLoading('writeComment')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comment, commentList, review_id, openDialog]);

    const getReview = useCallback(async () => {
        onLoading('getReview')

        const { data } = await requestGetDetailReview(review_id);
        const { msg, review, comments } = data;
        if (msg === 'success') {
            setReview(review);
            setCommentList(comments);
        } else {
            openDialog(
                msg,
                '',
                () => history.push(Paths.main.index),
                false,
                true,
            );
        }

        offLoading('getReview')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, review_id, openDialog]);

    useEffect(() => {
        getReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reviewDelete = useCallback(() => {
        onLoading('deletComment')

        const token = localStorage.getItem('user_id');
        openDialog(
            '리뷰를 삭제하시겠습니까 ?',
            '',
            async () => {
                const { data } = await requestDeleteReview(
                    token,
                    review.review_id,
                );

                if (data.msg === 'success') {
                    history.push(Paths.main.index);
                } else {
                    openDialog(data.msg);
                }
            },
            true,
        );

        offLoading('deletComment')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, openDialog, review]);

    return (
        review !== undefined && (
            <div className={cx('container')}>
                <img src={imageFormat(review.place.place_images[0])} alt="" />
                <div className={cx('area')}>
                    <div className={cx('rental-comment')}>
                        대여시간
                        <span className={cx('rental-date')}>
                            10/05(수) 14:00 ~ 10/07(금) 16:00
                        </span>
                    </div>
                </div>
                <div className={cx('bar')} />
                <div className={cx('area')}>
                    <div className={cx('title')}>
                        {review.place.place_name}
                        <Rating
                            className={'rating'}
                            value={parseFloat(review.review_rating)}
                            precision={0.5}
                            readOnly
                        />
                    </div>
                    <div className={cx('date')}>
                        {getFormatDateTime(review.createdAt)}
                        <hr />
                    </div>
                    <div className={cx('body')}>{review.review_body}</div>
                    {user.user_id === review.user_id && (
                        <div className={cx('button-area')}>
                            <ButtonBase onClick={reviewDelete}>삭제</ButtonBase>
                            <Link
                                to={
                                    Paths.main.review.write +
                                    `?rental_id=${review.rental_id}`
                                }
                            >
                                <ButtonBase>수정</ButtonBase>
                            </Link>
                        </div>
                    )}
                </div>

                <div className={cx('bar')} />

                <div className={cx('area')}>
                    <div className={cx('title')}>댓글</div>

                    {commentList.length === 0 ? (
                        <div className={cx('comment-none-wrapper')}>
                            <div className={cx('comment-none')}>
                                등록된 댓글이 없습니다.
                                <br />첫 댓글을 남겨주세요!
                            </div>
                        </div>
                    ) : (
                        commentList.map((item) => (
                            <div
                                key={item.comment_id}
                                className={cx('comment-item')}
                            >
                                <img src={DBImageFormat(item.user && item.user.profile_image, Profile)} alt="" />
                                <div className={cx('user-area')}>
                                    <div className={cx('user-id')}>
                                        {item.user ? item.user.name : '탈퇴한 회원입니다.'}
                                    </div>
                                    <div className={cx('date')}>
                                        {item.updatedAt
                                            ? getFormatDateTime(item.updatedAt)
                                            : getFormatDateTime(item.createdAt)}
                                    </div>
                                </div>
                                <div className={cx('comment-body')}>
                                    {item.comment_body}
                                </div>
                            </div>
                        ))
                    )}
                    {!isEmpty(user) ? (
                        <>
                            <input
                                className={cx('input-box')}
                                type="text"
                                name="comment"
                                value={comment}
                                placeholder="댓글을 남겨주세요."
                                onChange={onChangeComment}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onClickSubmit();
                                    }
                                }}
                                ref={commentRef}
                            />
                            <ButtonBase onClick={onClickSubmit}>
                                등록
                            </ButtonBase>
                        </>
                    ) : (
                        <p className={styles['not-user']}>
                            로그인 후 댓글을 남기실 수 있습니다.
                        </p>
                    )}
                </div>
            </div>
        )
    );
};

export default ReviewDetailContainer;
