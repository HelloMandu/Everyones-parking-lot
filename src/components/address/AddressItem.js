import React from 'react';
import { ButtonBase/*, IconButton*/ } from '@material-ui/core';
import styles from './AddressItem.module.scss';

import location_icon from '../../static/asset/svg/main/location.svg';

/* 주소 아이템
    jibunAddr : 지번
    roadAddr : 도로명 혹은 상세주소
    distance : 현재위치와의 거리
    onClick : 클릭 이벤트
*/
const AddressItem = ({ jibunAddr, roadAddr, distance, onClick }) => {
    return (
        <ButtonBase className={styles['address-item']}>
            <div className={styles['icon']}>
                <img src={location_icon} alt={jibunAddr} />
            </div>
            <div className={styles['pd-box']}>
                <div className={styles['item-info']}>
                    <div className={styles['jibun-addr']}>마곡나루역</div>
                    <div className={styles['road-addr']}>
                        강서구 마곡중앙5로 2 9호선마곡나루역
                    </div>
                </div>
            </div>
            <div className={styles['distance']}>12.24km</div>
        </ButtonBase>
    );
};

export default AddressItem;
