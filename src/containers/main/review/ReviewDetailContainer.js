import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import qs from 'qs';

import useInput from '../../../hooks/useInput';

import { Paths } from '../../../paths';

import styles from './ReviewDetailContainer.module.scss';
import Parking from '../../../static/asset/png/parking.png';
import Profile from '../../../static/asset/png/profile.png';
import Rating from '@material-ui/lab/Rating';
import { ButtonBase } from '@material-ui/core';

const cx = classNames.bind(styles);

const list = [
    {
        comment_id: 1,
        comment_body:
            '주차장이 꽤 넓어서 너무 좋았습니다~!! 다음에도 다시 이용할거 같아요!! 추천드려요~~',
        deleted: 0,
        created_at: '2020/10/00',
        updated_at: '',
        review_id: 1,
        user_id: 1,
    },
    {
        comment_id: 1,
        comment_body:
            '주차장이 꽤 넓어서 너무 좋았습니다~!! 다음에도 다시 이용할거 같아요!! 추천드려요~~',
        deleted: 0,
        created_at: '2020/10/00',
        updated_at: '',
        review_id: 1,
        user_id: 1,
    },
    {
        comment_id: 1,
        comment_body:
            '주차장이 꽤 넓어서 너무 좋았습니다~!! 다음에도 다시 이용할거 같아요!! 추천드려요~~',
        deleted: 0,
        created_at: '2020/10/00',
        updated_at: '',
        review_id: 1,
        user_id: 1,
    },
];

const ReviewDetailContainer = ({ location }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const { id } = query;

    const [comment, onChangeComment] = useInput();

    const onClickSubmit = () => {
        console.log('submit');
    };

    // requestGetDetailReview API
    // requestPostWriteComment API

    return (
        <>
            <div className={cx('container')}>
                <img src={Parking} alt="" />
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
                        길동이 주차공간
                        <Rating
                            className={'rating'}
                            defaultValue={5}
                            precision={0.5}
                            readOnly
                        />
                    </div>
                    <div className={cx('date')}>
                        2020/01/20
                        <hr />
                    </div>
                    <div className={cx('body')}>
                        주차장이 꽤 넓어서 너무 좋았습니다! 다음에도 다시 이용
                        할거 같아요!!
                    </div>

                    <div className={cx('button-area')}>
                        <ButtonBase>삭제</ButtonBase>
                        <Link to={Paths.main.review.write + `?id=${id}`}>
                            <ButtonBase>수정</ButtonBase>
                        </Link>
                    </div>
                </div>

                <div className={cx('bar')} />

                <div className={cx('area')}>
                    <div className={cx('title')}>댓글</div>

                    {list.length === 0 ? (
                        <div className={cx('comment-none-wrapper')}>
                            <div className={cx('comment-none')}>
                                등록된 댓글이 없습니다.
                                <br />첫 댓글을 남겨주세요!
                            </div>
                        </div>
                    ) : (
                        list.map((item) => (
                            <div
                                key={item.comment_id}
                                className={cx('comment-item')}
                            >
                                <img src={Profile} alt="profile" />
                                <div className={cx('user-area')}>
                                    <div className={cx('user-id')}>
                                        {item.user_id}.id
                                    </div>
                                    <div className={cx('date')}>
                                        {item.updated_at
                                            ? item.updated_at
                                            : item.created_at}
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
                    />
                    <ButtonBase onClick={onClickSubmit}>등록</ButtonBase>
                </div>
            </div>
        </>
    );
};

export default ReviewDetailContainer;
