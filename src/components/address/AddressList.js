import React from 'react';
import { ButtonBase} from '@material-ui/core';
import styles from './AddressList.module.scss';

import address_icon from '../../static/asset/svg/main/address.svg';

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
                <img src={address_icon} alt={jibunAddr} />
            </div>
            <div className={styles['pd-box']}>
                <div className={styles['item-info']}>
                    <div className={styles['jibun-addr']}>{jibunAddr}</div>
                    <div className={styles['road-addr']}>
                        {roadAddr}
                    </div>
                </div>
            </div>
            {distance &&        <div className={styles['distance']}>12.24km</div>}
     
        </ButtonBase>
    );
};

export default ({addr_list,onClick})=>{
    const list = addr_list.map((addr,index)=>(
        <AddressItem
            key={index}
            index={index}
            jibunAddr={addr.jibunAddr}
            roadAddr={addr.roadAddr}
            post_num={addr.zipNo}
            distance={addr.distance}
            onClick={() => onClick(addr.jibunAddr, addr.zipNo, index)}
        />
    ))
    return(
        <>
        {list}
        </>
    )
}

