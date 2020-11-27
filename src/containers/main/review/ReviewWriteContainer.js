import React from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import className from 'classnames/bind'
/* Library */

import styles from './ReviewWriteContainer.module.scss'

const cx = className.bind(styles)

const WriteReview = () => {

    // requestPostWriteReview API

    return (
        <div>
            리뷰 작성
        </div>
    );
};

const ModifyReview = () => {

    // requestPutModifyReview API

    return (
        <div>
            리뷰 수정
        </div>
    );
};

const ReviewWriteContainer = () => {

    const location = useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    })
    const { id } = query;

    return (
        <div className={cx("container")}>
        {console.log(id, location)}
            {id ? <ModifyReview /> : <WriteReview />}
        </div>
    );
};

export default ReviewWriteContainer;