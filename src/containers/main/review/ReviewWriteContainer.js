import React from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
/* Library */

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
    const { review_id } = query;

    return (
        <div className="container">
            {review_id ? <ModifyReview /> : <WriteReview />}
        </div>
    );
};

export default ReviewWriteContainer;