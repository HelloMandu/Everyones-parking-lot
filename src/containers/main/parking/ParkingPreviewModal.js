import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import cn from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';
import { Dialog, Slide } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { useDispatch } from 'react-redux';

import CircleButton from '../../../components/button/CircleButton';
import CustomTabs from '../../../components/nav/CustomTabs';
import FixedButton from '../../../components/button/FixedButton';
import { numberFormat } from '../../../lib/formatter';

import {
    getMyParkingList,
    updateMyParkingItem,
} from '../../../store/myParking';
import {
    requestPostEnrollParking,
    requestPutModifyParking,
} from '../../../api/place';
import { getFormatDateTime } from '../../../lib/calculateDate';
import { isEmpty } from '../../../lib/formatChecker';
import useSnackBar from '../../../hooks/useSnackBar';
import useLoading from '../../../hooks/useLoading';

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

const getParkingType = (type) => {
    switch (parseInt(type)) {
        case 0:
            return '주차타운';
        case 1:
            return '지하주차장';
        case 2:
            return '지상주차장';
        default:
            return '지정주차';
    }
};

const InfoItem = ({ txt, value }) => {
    return (
        <div className={styles['info-item']}>
            <div className={styles['txt']}>{txt}</div>
            <div className={styles['value']}>{value}</div>
        </div>
    );
};

const ParkingPreviewModal = ({ open, parkingInfo }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { place_id } = parkingInfo;
    const enrollState = place_id ? '수정' : '등록';
    const [handleSnackbar] = useSnackBar();

    const [onLoading, offLoading] = useLoading();

    const onClickEnrollParking = useCallback(async () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            onLoading('enrollParking');
            try {
                const { data } = await (place_id
                    ? requestPutModifyParking(JWT_TOKEN, parkingInfo, place_id)
                    : requestPostEnrollParking(JWT_TOKEN, parkingInfo));
                if (data.msg === 'success') {
                    if (place_id) {
                        dispatch(updateMyParkingItem(data.place));
                    } else {
                        dispatch(getMyParkingList(JWT_TOKEN));
                    }
                    history.go(place_id ? -3 : -2);
                    handleSnackbar(
                        `성공적으로 주차공간 ${enrollState}을 완료했습니다.`,
                        'success',
                        false,
                    );
                } else {
                    handleSnackbar(
                        `주차공간 ${enrollState}에 실패했습니다.`,
                        'error',
                        false,
                    );
                }
            } catch (e) {
                handleSnackbar(
                    `주차공간을 ${enrollState}하는 도중 오류가 발생했습니다.`,
                    'error',
                    false,
                );
            }
            offLoading('enrollParking');
        }
    }, [
        dispatch,
        enrollState,
        handleSnackbar,
        history,
        offLoading,
        onLoading,
        parkingInfo,
        place_id,
    ]);
    const [imgFile, setImgFile] = useState(null);
    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
                setImgFile(base64.toString());
            }
        };
        if (parkingInfo.place_images && parkingInfo.place_images.length) {
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
                <div
                    className={styles['parking-img']}
                    style={{ backgroundImage: `url(${imgFile})` }}
                />
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
                                <Rating
                                    name="half-rating"
                                    defaultValue={5}
                                    precision={0.5}
                                />
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
                                    {numberFormat(place_fee)}원
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
                                value={getParkingType(parkingInfo.place_type)}
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
            <FixedButton
                button_name={`최종${enrollState}`}
                disable={false}
                onClick={onClickEnrollParking}
            ></FixedButton>
        </Dialog>
    );
};

export default ParkingPreviewModal;
