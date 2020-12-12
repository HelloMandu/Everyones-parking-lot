import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';
import { Dialog, Slide } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import ReviewRating from '../../../components/review/ReviewRating';
import CircleButton from '../../../components/button/CircleButton';
import CustomTabs from '../../../components/nav/CustomTabs';
import FixedButton from '../../../components/button/FixedButton';

import { Paths } from '../../../paths';

import { useDialog } from '../../../hooks/useDialog';

import {
    requestPostEnrollParking,
} from '../../../api/place';
import { getFormatDateTime } from '../../../lib/calculateDate';
import { isEmpty } from '../../../lib/formatChecker';

import Arrow from '../../../static/asset/svg/Arrow';
import guid_icon from '../../../static/asset/svg/detail/guid.svg';
import roadview_icon from '../../../static/asset/svg/detail/roadview.svg';
import shared_icon from '../../../static/asset/svg/detail/shared.svg';
import datepicker_icon from '../../../static/asset/svg/detail/time_filter.svg';

import styles from './ParkingPreviewModal.module.scss';

const cx = cn.bind(styles);

const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InfoItem = ({ txt, value }) => {
    return (
        <div className={styles['info-item']}>
            <div className={styles['txt']}>{txt}</div>
            <div className={styles['value']}>{value}</div>
        </div>
    );
};

//TODO: 최종등록 이전 페이지로 수정하기와 나눌지 고려
const ParkingPreviewModal = ({ open, parkingInfo }) => {
    const history = useHistory();
    const openDialog = useDialog();
    const onClickEnrollParking = useCallback(async () => {
            const JWT_TOKEN = localStorage.getItem('user_id');
            const response = await requestPostEnrollParking(JWT_TOKEN, parkingInfo);
            if (response.data.msg === 'success') {
                openDialog('등록완료', '주차공간 등록을 완료했습니다');
                history.replace(Paths.main.parking.manage);
            } else {
                openDialog('등록실패', '주차공간 등록에 실패했습니다');
            }
    }, [history, openDialog, parkingInfo]);
    const [imgFile, setImgFile] = useState(null);
    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
                setImgFile(base64.toString());
            }
        };
        if (parkingInfo.place_images) {
            reader.readAsDataURL(parkingInfo.place_images[0].file);
        }
    }, [parkingInfo]);
    if (isEmpty(parkingInfo)) {
        return null;
    }
    const {
        addr,
        place_name,
        place_comment,
        place_fee,
        oper_start_time,
        oper_end_time,
    } = parkingInfo;
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <div className={styles['wrapper']}>
                <IconButton
                    className={styles['back']}
                    onClick={() => history.goBack()}
                >
                    <Arrow white={true}></Arrow>
                </IconButton>
                <div className={styles['parking-img']}>
                    {imgFile && (
                        <img src={imgFile} alt="img" />
                    )}
                </div>
                <div className={styles['container']}>
                    <div className={styles['pd-box']}>
                        <div className={styles['item-table']}>
                            <div className={styles['item-name']}>
                                <h1>{place_name}</h1>
                                <div className={styles['item-state']}>
                                    대여가능
                                </div>
                            </div>
                            <div className={styles['item-rating']}>
                                <ReviewRating rating={5} />
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
                                    {place_fee}원
                                </div>
                                <div className={styles['item-base-time']}>
                                    /30분 기준
                                </div>
                            </div>
                        </div>
                        <div className={cx('shared-time', 'space-between')}>
                            <div className={styles['txt']}>대여시간</div>
                            <div className={styles['value']}>
                                대여시간을 설정해주세요.
                                <ButtonBase className={styles['date-picker']}>
                                    <img src={datepicker_icon} alt="date" />
                                </ButtonBase>
                            </div>
                        </div>
                        <div className={cx('operation-time', 'space-between')}>
                            <div className={styles['txt']}>운영시간</div>
                            <div className={styles['value']}>
                                {getFormatDateTime(oper_start_time)} ~{' '}
                                {getFormatDateTime(oper_end_time)}
                            </div>
                        </div>
                    </div>
                    <div className={styles['tab-wrapper']}>
                        <CustomTabs
                            idx={0}
                            categories={[
                                { ca_name: '정보' },
                                { ca_name: '리뷰' },
                            ]}
                        />
                        <div className={styles['detail-info']}>
                            <InfoItem txt={'주소'} value={addr} />
                            <InfoItem
                                txt={'주차장 종류'}
                                value={'지하주차장'}
                            />
                            <InfoItem
                                txt={'추가 요금'}
                                value={`30분당 ${place_fee}원`}
                            />
                            <InfoItem
                                txt={'추가전달사항'}
                                value={place_comment}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <FixedButton button_name={'최종등록'} disable={false} onClick={onClickEnrollParking}></FixedButton>
        </Dialog>
    );
};

export default ParkingPreviewModal;
