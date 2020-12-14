import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import qs from 'qs';

import useInput from '../../../hooks/useInput';
import { useDialog } from '../../../hooks/useDialog';
import useToken from '../../../hooks/useToken';

import {
    requestDeleteReview,
    requestGetDetailReview,
    requestPostWriteComment,
} from '../../../api/review';

import { getFormatDateTime } from '../../../lib/calculateDate';

import { Paths } from '../../../paths';

import classNames from 'classnames/bind';
import styles from './ReviewDetailContainer.module.scss';
import Profile from '../../../static/asset/png/profile.png';
import Rating from '@material-ui/lab/Rating';
import { ButtonBase } from '@material-ui/core';

const cx = classNames.bind(styles);

const ReviewDetailContainer = ({ location }) => {
    const token = useToken();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { id } = query;

    const [review, setReview] = useState();
    const [commentList, setCommentList] = useState([]);
    const [comment, onChangeComment] = useInput();
    const commentRef = useRef()
    const history = useHistory();
    const openDialog = useDialog();

    const onClickSubmit = useCallback(async () => {
        const { data } = await requestPostWriteComment(token, id, comment);

        setCommentList(commentList.concat(data.comment));
        commentRef.current.value = ''

        if (data.msg !== 'success') {
            openDialog('댓글 작성을 실패했습니다.');
        }
    }, [comment, commentList, id, openDialog, token]);

    const getReview = useCallback(async () => {
        const { data } = await requestGetDetailReview(id);
        const { msg, review, comments } = data;

        if (msg === 'success') {
            setReview(review);
            setCommentList(comments);
        } else {
            openDialog(msg, '', () => history.push(Paths.main.index), false, true);
        }
    }, [history, id, openDialog]);

    useEffect(() => {
        getReview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const reviewDelete = useCallback(() => {
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
    }, [history, openDialog, review, token]);

    return (
        review !== undefined && (
            <div className={cx('container')}>
                <img
                    src={
                        Paths.storage +
                        review.place.place_images[0].split('\\')[1]
                    }
                    alt=""
                />
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

                    <div className={cx('button-area')}>
                        <ButtonBase onClick={reviewDelete}>삭제</ButtonBase>
                        <Link
                            to={
                                Paths.main.review.write +
                                `?id=${review.rental_id}`
                            }
                        >
                            <ButtonBase>수정</ButtonBase>
                        </Link>
                    </div>
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
                                <img src={Profile} alt="" />
                                <div className={cx('user-area')}>
                                    <div className={cx('user-id')}>
                                        {item.user_id}.id
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
                    <ButtonBase onClick={onClickSubmit}>등록</ButtonBase>
                </div>
            </div>
        )
    );
};

export default ReviewDetailContainer;
