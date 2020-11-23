/*global kakao*/
import React, { useEffect, useReducer, useRef, useState,useCallback } from 'react';

import {useSelector , useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {Paths} from '../../paths';

//styles
import styles from './MapContainer.module.scss';
import cn from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';
import search_icon from '../../static/asset/svg/main/search.svg'
import zoom_in from '../../static/asset/svg/main/plus.svg'
import zoom_out from '../../static/asset/svg/main/minus.svg'
import filter_img from '../../static/asset/svg/main/filter.svg';
import time_img from '../../static/asset/svg/main/time.svg'
import like_img from '../../static/asset/svg/main/like.svg';
import MarkerImg from '../../static/asset/svg/main/marker2.svg';
import UserMakerImg from '../../static/asset/svg/main/arrive_marker.svg';
import Location_img from '../../static/asset/svg/main/location.svg';

//componenst
import Aside from '../../components/aside/Aside';
import BottomModal from '../../components/nav/BottomModal';
import ParkingItem from '../../components/items/ParkingItem';
import CircleButton from '../../components/button/CircleButton';
import AddressModal from '../../components/modal/AddressModal';
import BookmarkModal from '../../components/modal/BookmarkModal';

//lib
import {getDistanceFromLatLonInKm} from '../../lib/distance';
//action
import {set_position,set_level} from '../../store/user_position';

//api

import {getCoordinates} from '../../api/address';

const cx = cn.bind(styles);

const MapContainer = ({modal}) => {

    const dispatch = useDispatch();

    const {position,level} = useSelector((state) => state.user_position); //마지막 좌표 및 레벨
    let position_ref = useRef({lat :37.6219752405506 , lng : 127.16017523675508  }); //지도 첫렌더시 좌표
    let level_ref = useRef(5); // 디폴트 레벨
    let view_ref= useRef(false); // 슬라이드 여부
    let arrive_marker = useRef(null); // 도착지 마커
    const kakao_map = useRef(null); //카카오 맵
    const history= useHistory();
    const [view,setView] = useState(false);
    

    // 모달을 제어하는 리듀서
    const [modalState, dispatchHandle] = useReducer(
        (state, action) => {
            return {
                ...state,
                [action.type]: action.payload,
            };
        },
        { aside_: false, filter_: false },
    );


    //지도 레벨을 조정하는 함수
    const zoomMap = (type) => {

        let level = kakao_map.current.getLevel();
        level = type === 'zoomin' ? level - 1 : level + 1;
        kakao_map.current.setLevel(level, {
            animate: {
                duration: 300
            }
        });
        dispatch(set_level(level));
    }


    //현재 위치를 받아오는 함수.
    const callGetCoordinates = async () => {
        if ('geolocation' in navigator) {
            try {
                const p = await getCoordinates();
                const lat = p.coords.latitude;
                const lng = p.coords.longitude;
                setCoordinates(lat,lng);
                dispatch(set_position({lat,lng}));
                arrive_marker.current.setMap(null);  
                setTimeout(()=>{
                createMarker(lat,lng);
                },1000)
            } catch (e) {
                if (e.code === 3) {
                    //요청 시간 초과
                } else {
                    alert(e.message);
                    //위치접근 거부
                }
            }
        }
    };

    // 도착지 마커를 생성하는 함수.
    const createMarker = (lat = 33.450701,lng=126.570667) => {
        const markerPosition = new kakao.maps.LatLng(lat, lng);
        const imageSrc = UserMakerImg,
            imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
            imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        // 마커 정보를 가지고 뷰에 띄울 마커 생성
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
        );
        arrive_marker.current = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
        });

        arrive_marker.current.setMap(kakao_map.current);

    };


    // 맵 중심좌표를 설정하는 함수
    const setCoordinates =useCallback((lat,lng) =>{            
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        kakao_map.current.setCenter(moveLatLon);
    },[]);

    // 지도와 마커를 렌더하는 함수
    const mapRender =()=>{
        let container = document.getElementById("map");
        let lat = position.lat !==0 ? position.lat : position_ref.current.lat;
        let lng = position.lng !==0 ? position.lng : position_ref.current.lng;
        let options = {
            center: new kakao.maps.LatLng(lat,lng),
            level: level !== 0 ? level : level_ref.current,
        };

        const map = new kakao.maps.Map(container, options);
        kakao_map.current = map;

        var imageSrc = MarkerImg,
            imageSize = new kakao.maps.Size(120, 70),
            imageOption = { offset: new kakao.maps.Point(27, 69) };

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        //마커의 중심좌표가 변경되었을 시 이벤트
        kakao.maps.event.addListener(map, 'center_changed', function() {
            let level = map.getLevel();
            let latlng = map.getCenter();
            level_ref.current=level;
            position_ref.current.lat = latlng.getLat();
            position_ref.current.lng = latlng.getLng();
        
        });

        //슬라이드가 켜진상태로 지도를 클릭하면 슬라이드를 끄는 이벤트
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
            if(view_ref.current){
                view_ref.current= !view_ref.current;
                setView(view_ref.current);
            }            
        });

        // 주차장 마커 생성
        markerdata.forEach((el) => {
            let content = `<span class="custom-overlay">${el.title}m</span>`;
            const marker = new kakao.maps.Marker({
                image: markerImage,
                map: map,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                title: el.distance,
            });
            new kakao.maps.CustomOverlay({
                map:  map,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                content: content,
                yAnchor: 1
            });
        
            kakao.maps.event.addListener(marker, 'click', function () {
                view_ref.current= !view_ref.current;
                // setView(view_.current);
                history.push(Paths.main.detail +`/${el.title}`)
            });
        });
    }

    useEffect(()=>{
        mapRender();
    },[])

    useEffect(()=>{
        return () => {
            dispatch(set_position(position_ref.current));
            dispatch(set_level(level_ref.current));
        }
    },[dispatch])

    // useEffect(()=>{
    //     const lat1 = markerdata[0].lat;
    //     const lng1 =markerdata[0].lng;
    //     const lat2 = markerdata[2].lat;
    //     const lng2= markerdata[2].lng;
    //     getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2);
    // },[])

    return (
        <>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div id="map" style={{ width: "100vw", height: "100vh", zIndex: 1 }} />
                </div>

                <ButtonBase className={styles['menu']} onClick={() => { dispatchHandle({ type: 'aside_', payload: true }) }}>
                    <div className={styles['line-box']}>
                        <div className={styles['line']} />
                        <div className={styles['line']} />
                        <div className={styles['line']} />
                    </div>
                </ButtonBase>
                <div className={styles['search']} onClick={()=>history.push(Paths.main.index+'/address')}>
                    <ButtonBase className={styles['search-box']}>
                        위치를 입력해주세요
                    </ButtonBase>
                    <IconButton className={styles['search-btn']}>
                        <img src={search_icon} alt="search" />
                    </IconButton>
                </div>
                <div className={cx('side-bar', 'left')}>
                    <CircleButton src={zoom_in} onClick={() => { zoomMap('zoomin') }} />
                    <CircleButton src={zoom_out} onClick={() => { zoomMap('zoomout') }} />

                </div>
                <div className={cx('side-bar', 'right')}>
                    <CircleButton src={filter_img} onClick={() => { dispatchHandle({ type: 'filter_', payload: true }) }} />
                    <CircleButton src={Location_img} onClick={callGetCoordinates}/>
                    <CircleButton src={like_img} onClick={()=>history.push(Paths.main.index +'/bookmark')}/>
                </div>      
                <Aside open={modalState.aside_} handleClose ={() => { dispatchHandle({ type: 'aside_', payload: false }) }}/>
                <ParkingItem onClick={()=>history.push(Paths.main.detail +'?id=1')} view={view}/>
            </div>
            <BottomModal open={modalState.filter_} handleClose={() => { dispatchHandle({ type: 'filter_', payload: false }) }} />
            <BookmarkModal open ={modal ==='bookmark'} handleClose={() =>history.goBack()}/>
            <AddressModal open ={modal==='address'} handleClose={() =>history.goBack()}/>
        </>
    );
};



const markerdata = [
    {
        title: "콜드스퀘어",
        distance : 300,
        lat: 37.62197524055062,
        lng: 127.16017523675508,
    },
    {
        title: "하남돼지집",
        distance : 300,
        lat: 37.620842424005616,
        lng: 127.1583774403176,
    },
    {
        title: "수유리우동",
        distance : 300,
        lat: 37.624915253753194,
        lng: 127.15122688059974,
    },
    {
        title: "맛닭꼬",
        distance : 300,
        lat: 37.62456273069659,
        lng: 127.15211256646381,
    },
];

export default MapContainer;