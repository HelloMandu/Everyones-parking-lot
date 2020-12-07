/*global kakao*/
import React, {
    useEffect,
    useReducer,
    useRef,
    useState,
    useCallback,
} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Paths } from '../../paths';

//styles
import styles from './MapContainer.module.scss';
import cn from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';

//main icons
import SEARCH from '../../static/asset/svg/main/search.svg';
import ZOOMIN from '../../static/asset/svg/main/plus.svg';
import ZOOMOUT from '../../static/asset/svg/main/minus.svg';
import FILTER from '../../static/asset/svg/main/filter.svg';
import POSITION from '../../static/asset/svg/main/location.svg';
import TIME from '../../static/asset/svg/main/time.svg';
import BOOKMARK from '../../static/asset/svg/main/like.svg';

//marker
import PARKING_MARKER from '../../static/asset/svg/main/marker2.svg';
import ARRIVED_MARKER from '../../static/asset/svg/main/arrive_marker.svg';
import USER_LOCATION_MARKER from '../../static/asset/svg/main/mylocation.svg';

//componenst
import Aside from '../../components/aside/Aside';
import BottomModal from '../../components/nav/BottomModal';
import ParkingItem from '../../components/items/ParkingItem';
import CircleButton from '../../components/button/CircleButton';
import AddressModal from '../../components/modal/AddressModal';
import BookmarkModal from '../../components/modal/BookmarkModal';

//lib
import { getDistanceFromLatLonInKm } from '../../lib/distance';
//action
import { set_position, set_level } from '../../store/main/position';

//api

import { getCoordinates } from '../../api/address';
import {requsetGetSampleDate} from '../../api/place';

const cx = cn.bind(styles);

const MapContainer = ({ modal }) => {
    const dispatch = useDispatch();
    const { position, level, address, arrive } = useSelector(
        (state) => state.position,
    ); //마지막 좌표 및 레벨

    let position_ref = useRef({
        lat: 35.1158949746728,
        lng: 128.966901860943,
    }); //지도 첫렌더시 좌표
    let map_lev = useRef(5); // 디폴트 레벨
    let slide_view = useRef(false); // 슬라이드 여부
    let arrive_markers = useRef([]); //도착지 마커
    let user_location_marker = useRef([]); // 유저 위치 마커
    const kakao_map = useRef(null); //카카오 맵
    const history = useHistory();
    const [on_slide, setOnSlide] = useState(false);
    const [slide_list,setSlideList] = useState([]);
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
                duration: 300,
            },
        });
        dispatch(set_level(level));
    };

    //현재 위치를 받아오는 함수.
    const callGetCoordinates = async () => {
        if ('geolocation' in navigator) {
            try {
                const p = await getCoordinates();
                const lat = p.coords.latitude;
                const lng = p.coords.longitude;
                setCoordinates(lat, lng);
                createMyLocationMarker(lat,lng);
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

    const createMyLocationMarker =(lat,lng)=>{
        if(user_location_marker.current.length!==0){
            user_location_marker.current.map((marker) => marker.setMap(null));
            user_location_marker.current = [];
        }
        const imageSrc = USER_LOCATION_MARKER;
        const imageSize = new kakao.maps.Size(22, 22); // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
        );
        const markerPosition = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
        });
        marker.setMap(kakao_map.current);
        user_location_marker.current.push(marker);

    }

    // 도착지 마커를 생성하는 함수.
    const createArriveMarker = () => {
        if (arrive_markers.current.length !== 0) {
            console.log(arrive_markers.current);
            arrive_markers.current.map((marker) => marker.setMap(null));
            arrive_markers.current = [];
        }
        const lat = arrive.lat ? arrive.lat : 0;
        const lng = arrive.lng ? arrive.lng : 0;
        const imageSrc = ARRIVED_MARKER;
        const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
        const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
        );
        const markerPosition = new kakao.maps.LatLng(lat, lng);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
        });
        marker.setMap(kakao_map.current);
        arrive_markers.current.push(marker);
        setCoordinates(lat, lng);
    };

    // 맵 중심좌표를 설정하는 함수
    const setCoordinates = useCallback((lat, lng) => {
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        kakao_map.current.setCenter(moveLatLon);
    }, []);

    // 지도와 마커를 렌더하는 함수
    const mapRender = () => {
        let container = document.getElementById('map');
        let lat = position.lat !== 0 ? position.lat : position_ref.current.lat;
        let lng = position.lng !== 0 ? position.lng : position_ref.current.lng;
        let options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: level !== 0 ? level : map_lev.current,
        };

        const map = new kakao.maps.Map(container, options);
        kakao_map.current = map;

        var imageSrc = PARKING_MARKER,
            imageSize = new kakao.maps.Size(120, 70),
            imageOption = { offset: new kakao.maps.Point(27, 69) };

        var markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
        );
        // 마커 클러스터러를 생성합니다
        var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel: 5, // 클러스터 할 최소 지도 레벨
            disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
            styles: [{ // calculator 각 사이 값 마다 적용될 스타일을 지정한다
                width : '40px', height : '40px',
                background: 'rgba(34, 34, 34, .8)',
                borderRadius: '30px',
                color: '#fff',
                border:'1px solid white',
                boxSizing:'border-box',
                fontSize:'15px',
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: '40px'
            }
        ]
        });

        //마커의 중심좌표가 변경되었을 시 이벤트
        kakao.maps.event.addListener(map, 'center_changed', function () {
            let level = map.getLevel();
            let latlng = map.getCenter();
            map_lev.current = level;
            position_ref.current.lat = latlng.getLat();
            position_ref.current.lng = latlng.getLng();
        });

        //슬라이드가 켜진상태로 지도를 클릭하면 슬라이드를 끄는 이벤트
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            if (slide_view.current) {
                slide_view.current = !slide_view.current;
                setOnSlide(slide_view.current);
            }
        });

        let markerdata = requsetGetSampleDate();
        // 주차장 마커 생성
        const data = markerdata.map((el) => {
            let content = `<span class="custom-overlay">${el.distance}m</span>`;
            const marker = new kakao.maps.Marker({
                image: markerImage,
                map: map,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                zIndex:1500,
                
            });
            new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                content: content,
                yAnchor: 1,
                clickable:true,
                zIndex : 1600,
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                history.push(Paths.main.detail + `/${el.title}`);
            });
            const str = JSON.stringify(el);
            marker.setTitle(str);
            return marker;
        });
        clusterer.addMarkers(data);

        kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
            slide_view.current = !slide_view.current;
            const markers =cluster.getMarkers() ;
            const slides = markers.map((maker)=>{
                const data = maker.getTitle();
                return JSON.parse(data);
            })
            setSlideList(slides)
            setOnSlide(slide_view.current);
        });
    };

    useEffect(() => {
        mapRender();
        // requsetGetSampleDate();
    }, []);

    useEffect(() => {
        if (address) createArriveMarker();
    }, [address, arrive]);

    useEffect(() => {
        if (position.lat !== 0 && position.lng !== 0) {
            setCoordinates(position.lat, position.lng);
        }
    }, [position]);

    useEffect(() => {
        return () => {
            dispatch(set_position(position_ref.current));
            dispatch(set_level(map_lev.current));
        };
    }, [dispatch]);


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
                    <div
                        id="map"
                        style={{ width: '100vw', height: '100vh', zIndex: 1 }}
                    />
                </div>

                <ButtonBase
                    className={styles['menu']}
                    onClick={() => {
                        dispatchHandle({ type: 'aside_', payload: true });
                    }}
                >
                    <div className={styles['line-box']}>
                        <div className={styles['line']} />
                        <div className={styles['line']} />
                        <div className={styles['line']} />
                    </div>
                </ButtonBase>
                <div
                    className={styles['search']}
                    onClick={() => history.push(Paths.main.index + '/address')}
                >
                    <ButtonBase className={styles['search-box']}>
                        위치를 입력해주세요
                    </ButtonBase>
                    <IconButton className={styles['search-btn']}>
                        <img src={SEARCH} alt="search" />
                    </IconButton>
                </div>
                <div className={cx('side-bar', 'left')}>
                    <CircleButton
                        src={ZOOMIN}
                        onClick={() => {
                            zoomMap('zoomin');
                        }}
                    />
                    <CircleButton
                        src={ZOOMOUT}
                        onClick={() => {
                            zoomMap('zoomout');
                        }}
                    />
                </div>
                <div className={cx('side-bar', 'right')}>
                    <CircleButton
                        src={FILTER}
                        onClick={() => {
                            dispatchHandle({ type: 'filter_', payload: true });
                        }}
                    />
                    <CircleButton
                        src={POSITION}
                        onClick={callGetCoordinates}
                    />
                    <CircleButton
                        src={BOOKMARK}
                        onClick={() =>
                            history.push(Paths.main.index + '/bookmark')
                        }
                    />
                </div>
                <Aside
                    open={modalState.aside_}
                    handleClose={() => {
                        dispatchHandle({ type: 'aside_', payload: false });
                    }}
                />
                <ParkingItem
                    onClick={() => history.push(Paths.main.detail + '?id=1')}
                    view={on_slide}
                    slide_list={slide_list}
                />
            </div>
            <BottomModal
                open={modalState.filter_}
                handleClose={() => {
                    dispatchHandle({ type: 'filter_', payload: false });
                }}
            />
            <BookmarkModal
                open={modal === 'bookmark'}
                handleClose={() => history.goBack()}
            />
            <AddressModal
                open={modal === 'address'}
                handleClose={() => history.goBack()}
            />
        </>
    );
};



export default MapContainer;
