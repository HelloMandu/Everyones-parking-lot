import React from 'react';
import styles from './DetailReviewItem.module.scss';
import profile_icon from '../../static/asset/png/profile.png';
import ReviewRating from './ReviewRating';

const DetailReviewItem = () => {
    return (
        <div className={styles['detail-review-item']}>
            <div className={styles['user-table']}>
                <div className={styles['profile']}>
                    <img src={profile_icon} alt="profile_icon" />
                </div>
                <div className={styles['user-info']}>
                    <div className={styles['user-name']}>스페이스</div>
                    <div className={styles['comment-date']}>2020/10/00</div>
                </div>
            </div>

            <div className={styles['comment']}>
                주차장이 꽤 넓어서 너무 좋았습니다~!! 다음에도 다시 이용할거
                같아요!! 추천드려요~~
            </div>
            <div className={styles['rating']}>
                <ReviewRating rating={5} />
            </div>
        </div>
    );
};


const DetailReviewList =({review_list})=>{
    const list = review_list.map((item)=>(
        <DetailReviewItem />
    ))
        return (
            <>
            
            </>
        )
}

export default DetailReviewItem;
