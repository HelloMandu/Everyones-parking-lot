import React from 'react';
import cn from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';

import ReviewRating from '../../../components/review/ReviewRating';
import CircleButton from '../../../components/button/CircleButton';
import CustomTabs from '../../../components/nav/CustomTabs';
import DetailReviewItem from '../../../components/review/DetailReviewItem';

import Arrow from '../../../static/asset/svg/Arrow';
import test_img from '../../../static/asset/png/test_img.png';
import guid_icon from '../../../static/asset/svg/detail/guid.svg';
import roadview_icon from '../../../static/asset/svg/detail/roadview.svg';
import shared_icon from '../../../static/asset/svg/detail/shared.svg';
import datepicker_icon from '../../../static/asset/svg/detail/time_filter.svg';

import styles from 'ParkingPreviewModal.module.scss';

const cx = cn.bind(styles);

const InfoItem = ({ txt, value }) => {
    return (
        <div className={styles['info-item']}>
            <div className={styles['txt']}>{txt}</div>
            <div className={styles['value']}>{value}</div>
        </div>
    );
};

const ParkingPreviewModal = () => {
    return (
        <>
            <div className={styles['wrapper']}>
                <IconButton className={styles['back']}>
                    <Arrow white={true}></Arrow>
                </IconButton>
                <div className={styles['parking-img']}>
                    <img src={test_img} alt="img" />
                </div>
                <div className={styles['container']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['item-table']}>
                            <div className={styles['item-name']}>
                                <h1>test</h1>
                                <div className={styles['item-state']}>
                                    대여가능
                                </div>
                            </div>
                            <div className={styles['item-rating']}>
                                <ReviewRating rating={3} />
                                <div className={styles['item-review']}>
                                    리뷰
                                </div>
                            </div>
                            <div className={styles['function-box']}>
                                <CircleButton src={shared_icon} txt={'공유'} />
                                <CircleButton src={guid_icon} txt={'안내'} />
                                <CircleButton
                                    src={roadview_icon}
                                    txt={'로드뷰'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles['parking-detail-info']}>
                        <div className={cx('price', 'space-between')}>
                            <div className={styles['txt']}>주차요금</div>
                            <div className={styles['value']}>
                                <div className={styles['item-price']}>
                                    {1000}원
                                </div>
                                <div className={styles['item-base-time']}>
                                    /30분 기준
                                </div>
                            </div>
                        </div>
                        <div className={cx('shared-time', 'space-between')}>
                            <div className={styles['txt']}>대여시간</div>
                            <div className={styles['value']}>
                                "시작시간 ~ 끝시간"
                                <ButtonBase className={styles['date-picker']}>
                                    <img src={datepicker_icon} alt="date" />
                                </ButtonBase>
                            </div>
                        </div>
                        <div className={cx('operation-time', 'space-between')}>
                            <div className={styles['txt']}>운영시간</div>
                            <div className={styles['value']}>
                                시작시간 ~ 끝시간
                            </div>
                        </div>
                    </div>
                    <div className={styles['tab-wrapper']}>
                        <CustomTabs
                            idx={1}
                            categories={[
                                { ca_name: '정보' },
                                { ca_name: '리뷰' },
                            ]}
                        />
                        <div className={styles['detail-info']}>
                            <InfoItem txt={'주소'} value={'주소'} />
                            <InfoItem
                                txt={'주차장 종류'}
                                value={'지하주차장'}
                            />
                            <InfoItem
                                txt={'추가 요금'}
                                value={`30분당 10000원`}
                            />
                            <InfoItem
                                txt={'추가 전달 사항'}
                                value={'추가전달사항'}
                            />
                        </div>
                        <div className={styles['review-list']}>
                            <DetailReviewItem />
                            <DetailReviewItem />
                            <DetailReviewItem />
                            <DetailReviewItem />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ParkingPreviewModal;
