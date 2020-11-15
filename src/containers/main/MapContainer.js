/*global kakao*/
import React, { useEffect, useState,useRef } from 'react';

//styles
import styles from './MapContainer.module.scss';
import cn from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';
import search_icon from '../../static/asset/svg/search.svg'
import zoom_in from '../../static/asset/svg/plus.svg'
import zoom_out from '../../static/asset/svg/minus.svg'


//lib
import { Paths } from '../../paths';

const cx = cn.bind(styles);

const MapContainer = () => {

    const [open, setOpen] = useState(false);
    const kakao_map = useRef(null);
    useEffect(() => {
        mapScript();
    }, []);

    const zoomMap = (type)=>{

        let level = kakao_map.current.getLevel();
        level = type==='zoomin' ? level-1 : level +1; 
        kakao_map.current.setLevel(level, {
            animate: {
                duration: 300
            }
        });
    }


    const mapScript = () => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
            level: 5,
        };
        const map = new kakao.maps.Map(container, options);
        kakao_map.current = map;


        const marker = new kakao.maps.Marker({
            position: map.getCenter()
        });
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

            // 클릭한 위도, 경도 정보를 가져옵니다 
            var latlng = mouseEvent.latLng;

            // 마커 위치를 클릭한 위치로 옮깁니다
            marker.setPosition(latlng);

            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            console.log(message);
            var resultDiv = document.getElementById('clickLatlng');
            var level = kakao_map.current.getLevel();
            console.log(level);
            //resultDiv.innerHTML = message;

        });

        // markerdata.forEach((el) => {
        //     const marker = new kakao.maps.Marker({
        //         map: map,
        //         position: new kakao.maps.LatLng(el.lat, el.lng),
        //         title: el.title,
        //         clickable: true
        //     })

        //     var iwContent = '<div style="padding:5px;">Hello Wozzzrld!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        //         iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        //     // 인포윈도우를 생성합니다
        //     var infowindow = new kakao.maps.InfoWindow({
        //         content: iwContent,
        //         removable: iwRemoveable
        //     });

        //     // 마커에 클릭이벤트를 등록합니다
        //     kakao.maps.event.addListener(marker, 'click', function () {
        //         // 마커 위에 인포윈도우를 표시합니다
        //         infowindow.open(map, marker);
        //     });

        // });





        /* 단일 마커 표시 */

        // //마커가 표시될 위치
        // let markerPosition = new kakao.maps.LatLng(
        //     37.62197524055062,
        //     127.16017523675508
        // );

        // //마커 생성
        // let marker = new kakao.maps.Marker({
        //     position : markerPosition,
        // });
        // //마커를 지도위에 표시
        // marker.setMap(map);
    };

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div id="map" style={{ width: "100vw", height: "100vh", zIndex: 1 }} />
                </div>

                <ButtonBase className={styles['menu']} onClick={() => { setOpen(true) }}>
                    <div className={styles['line-box']}>
                        <div className={styles['line']} />
                        <div className={styles['line']} />
                        <div className={styles['line']} />
                    </div>
                </ButtonBase>
                <div className={styles['search-input']}>
                    <input type="text" placeholder="위치를 입력해주세요" />
                    <IconButton className={styles['search-btn']}>
                        <img src={search_icon} alt="search" />
                    </IconButton>
                </div>
                <div className={cx('side-bar', 'left')}>
                    <CircleButton src={zoom_in} onClick={() => { zoomMap('zoomin') }} />
                    <CircleButton src={zoom_out} onClick={() => { zoomMap('zoomout') }} />

                </div>
                <div className={cx('side-bar', 'right')}>
                    <CircleButton src={search_icon} />
                    <CircleButton src={search_icon} />
                    <CircleButton src={search_icon} />
                </div>
                <div className={cx('slide-menu', { open })} />
                <div className={cx('dim', { open })} onClick={() => setOpen(false)} />
            </div>
        </>
    );
};

const CircleButton = ({ src, onClick }) => {
    return (
        <IconButton className={styles['circle-btn']} onClick={onClick}>
            <img src={src} alt="alt" />
        </IconButton>
    )
}


export default MapContainer;