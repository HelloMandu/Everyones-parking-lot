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
import './overlay.scss';
import cn from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core';

//main icons
import SEARCH from '../../static/asset/svg/main/search.svg';
import ZOOMIN from '../../static/asset/svg/main/plus.svg';
import ZOOMOUT from '../../static/asset/svg/main/minus.svg';
import FILTER from '../../static/asset/svg/main/filter.svg';
import POSITION from '../../static/asset/svg/main/location.svg';
// import TIME from '../../static/asset/svg/main/time.svg';
import BOOKMARK from '../../static/asset/svg/main/like.svg';

//marker
// import PARKING_MARKER from '../../static/asset/svg/main/marker2.svg';
import ARRIVED_MARKER from '../../static/asset/svg/main/arrive_marker.svg';
import USER_LOCATION_MARKER from '../../static/asset/svg/main/mylocation.svg';

//componenst
import Aside from '../../components/aside/Aside';
import BottomModal from '../../components/nav/BottomModal';
import ParkingList from '../../components/items/ParkingList';
import CircleButton from '../../components/button/CircleButton';
import AddressModal from '../../components/modal/AddressModal';
import BookmarkModal from '../../components/modal/BookmarkModal';

//lib
import { getDistanceFromLatLonInKm } from '../../lib/distance';
import { getMobileOperatingSystem } from '../../lib/os';
//action
import { set_position, set_level, get_area } from '../../store/main/position';
import { get_list } from '../../store/main/parking';
import { set_filters } from '../../store/main/filters';

//api

import { getCoordinates } from '../../api/address';
//hooks
import useLoading from '../../hooks/useLoading';


const cx = cn.bind(styles);

const MapContainer = ({ modal }) => {
    const dispatch = useDispatch();
    const { position, level, address, arrive,area } = useSelector(
        (state) => state.position,
    ); //마지막 좌표 및 레벨
    const { parking } = useSelector((state) => state.parking);
    const { parking_town, underground_parking, ground_parking, stated_parking } = useSelector((state) => state.filters);

    const [onLoading, offLoading] = useLoading();

    let position_ref = useRef(null); //지도 첫렌더시 좌표
    let map_lev = useRef(5); // 디폴트 레벨
    let slide_view = useRef(false); // 슬라이드 여부
    let arrive_markers = useRef([]); //도착지 마커
    let location_marker = useRef([]); // 유저 위치 마커
    let cluster_marker = useRef(null);
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
        window.setGps = (lat, lng) => {
            // Gps 지정 함수
            dispatch(set_position({ lat, lng }));
            setCoordinates(lat, lng);
            // createMyLocationMarker(latitude, longitude);
        }
        const login_os = getMobileOperatingSystem();
        if (login_os === 'Android') {
            // 구글 스토어 기기
            if (typeof window.myJs !== 'undefined') {
                window.myJs.getGps();
                return;
            }
        } else if (login_os === 'iOS') {
            // 애플 앱 스토어 기기
            if (typeof window.webkit !== 'undefined') {
                if (typeof window.webkit.messageHandlers !== 'undefined') {
                    window.webkit.messageHandlers.getGps.postMessage("");
                    return;
                }
            }
        }
        // 브라우저 기기
        if ('geolocation' in navigator) {
            try {
                const p = await getCoordinates();
                const lat = p.coords.latitude;
                const lng = p.coords.longitude;
                window.setGps(lat, lng);
            } catch (e) {
                if (e.code === 3) {
                    // 요청 시간 초과
                } else {
                    alert(e.message);
                    // 위치접근 거부
                }
            }
        }
    };

    //내위치 마커를 생성하는 함수
    const createMyLocationMarker =(lat,lng)=>{
        if (location_marker.current.length !== 0) {
            location_marker.current.map((marker) => marker.setMap(null));
            location_marker.current = [];
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
        location_marker.current.push(marker);
    }

    // 도착지 마커를 생성하는 함수.
    const createArriveMarker = () => {
        if (arrive_markers.current.length !== 0) {
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

    //주차장 마커를 생성하는 함수
    const createParkingMarker =()=>{
        onLoading('parking/GET_LIST');
        if (cluster_marker.current !== null) {
            cluster_marker.current.clear();
        };
        const map = kakao_map.current;

        cluster_marker.current = new kakao.maps.MarkerClusterer({
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
            const level = map.getLevel();
            const latlng = map.getCenter();
            map_lev.current = level;
            position_ref.current.lat = latlng.getLat();
            position_ref.current.lng = latlng.getLng();
            const { lat, lng } = position_ref.current;
            dispatch(get_area({ lat, lng }));
            const new_position = { lat, lng };
            localStorage.setItem('position', JSON.stringify(new_position));
        });

        //슬라이드가 켜진상태로 지도를 클릭하면 슬라이드를 끄는 이벤트
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            if (slide_view.current) {
                slide_view.current = !slide_view.current;
                setOnSlide(slide_view.current);
            }
        });
        const markdata = parking.filter(
            (item) => item.addr.indexOf(area) !== -1,
        );
        // 주차장 마커 생성
        const data = markdata.map((el) => {
            // const distance ='300';
            const distance = getDistanceFromLatLonInKm(
                el.lat,
                el.lng,
                position_ref.current.lat,
                position_ref.current.lng,
            );
            const content = `<div onclick="onClickOverlay(${el.place_id})" class="custom-overlay" title=${JSON.stringify(el)} ><span>${distance}Km</span></div>`;
            var customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(el.lat, el.lng),
                content: content,
                yAnchor: 1,
                clickable:true,
                zIndex : 1600,
            });
            customOverlay.setMap(map);
            return customOverlay;
        });

        cluster_marker.current.addMarkers(data);
        kakao.maps.event.addListener(cluster_marker.current, 'clusterclick',
            function (cluster) {
                const overlays = cluster.getMarkers();

                if (overlays.length > 10) {
                    var level = map.getLevel() - 1;
                    map.setLevel(level, {
                        anchor: cluster.getCenter(),
                        animate: 300,
                    });
                } else {
                    slide_view.current = !slide_view.current;

                    const slides = overlays.map((overlay) => {
                        const data = overlay.getContent();
                        const t_index = data.indexOf('title=');
                        const close_index = data.indexOf('>');
                        const str = data.substring(t_index + 6, close_index);
                        return JSON.parse(str);
                    });
                    setSlideList(slides);
                    setOnSlide(slide_view.current);
                }
            },
        );
        window.onClickOverlay = (place_id) => {
            history.push(Paths.main.detail+'?place_id='+place_id);
        }
        offLoading('parking/GET_LIST');
    }

    // 맵 중심좌표를 설정하는 함수
    const setCoordinates = useCallback((lat, lng) => {
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        kakao_map.current.setCenter(moveLatLon);
    }, []);

    //지도를 렌더하는 함수
    const mapRender = () => {
        let container = document.getElementById('map');
        let lat = position_ref.current.lat;
        let lng = position_ref.current.lng;
        let options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: level !== 0 ? level : map_lev.current,
        };
        const map = new kakao.maps.Map(container, options);
        map.setMaxLevel(8);
        kakao_map.current = map;
    };

    useEffect(() => {
        const storage_position = JSON.parse(localStorage.getItem('position'));
        if (storage_position && storage_position.lat && storage_position.lng) {
            position_ref.current = storage_position;
            const { lat, lng } = position_ref.current;
            dispatch(get_area({ lat, lng }));
        } else {
            const init_position = {
                lat: 35.8360328674316,
                lng: 128.5743408203125,
            };
            position_ref.current = init_position;
            const { lat, lng } = init_position;
            localStorage.setItem('position', JSON.stringify(init_position));
            dispatch(get_area({ lat, lng }));
        }
    }, [dispatch]);

    useEffect(() => {
        const storage_filter = JSON.parse(localStorage.getItem('filter_data'));
        if (storage_filter) {
            const { parking_town, underground_parking, ground_parking, stated_parking } = storage_filter
            dispatch(set_filters({ type: 'parking_town', value: parking_town }));
            dispatch(set_filters({ type: 'underground_parking', value: underground_parking }));
            dispatch(set_filters({ type: 'ground_parking', value: ground_parking }));
            dispatch(set_filters({ type: 'stated_parking', value: stated_parking }));
        }
        else {
            const init_filter = {
                parking_town: true,
                underground_parking: true,
                ground_parking: true,
                stated_parking: true,
            };
            localStorage.setItem('filter_data', JSON.stringify(init_filter));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        mapRender();
        const login_os = getMobileOperatingSystem();
        const interval = setInterval(() => {
            window.setGps = (latitude, longitude) => {
                // Gps 지정 함수
                createMyLocationMarker(latitude, longitude);
            }
            if (login_os === 'Android') {
                if (typeof window.myJs !== 'undefined') {
                    window.myJs.getGps();
                    return;
                }
            } else if (login_os === 'iOS') {
                if (typeof window.webkit !== 'undefined') {
                    if (typeof window.webkit.messageHandlers !== 'undefined') {
                        window.webkit.messageHandlers.getGps.postMessage("");
                        return;
                    }
                }
            }
            if ('geolocation' in navigator) {
                getCoordinates().then(result => {
                    const lat = result.coords.latitude;
                    const lng = result.coords.longitude;
                    window.setGps(lat, lng);
                }).catch(e => {
                    console.log(e.message);
                    if (e.code === 3) {
                        //요청 시간 초과
                    } else {
                        //위치접근 거부
                    }
                });
            }
        }, 2000); // 계속해서 현재 위치를 반복으로 찍음.
        return () => {
            clearInterval(interval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { lat, lng } = position_ref.current;
        let filter_arr = [];
        if (parking_town) {
            filter_arr.push(1);
        }
        if (underground_parking) {
            filter_arr.push(2);
        }
        if (ground_parking) {
            filter_arr.push(3);
        }
        if (stated_parking) {
            filter_arr.push(4);
        }
        dispatch(get_list({ lat, lng, range: 3000, filter: filter_arr }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parking_town, underground_parking, ground_parking, stated_parking]);

    useEffect(() => {
        createParkingMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parking, area, position]);

    useEffect(() => {
        if (address) createArriveMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, arrive]);

    useEffect(() => {
        if (position.lat !== 0 && position.lng !== 0) {
            setCoordinates(position.lat, position.lng);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    useEffect(() => {
        return () => {
            dispatch(set_position(position_ref.current));
            dispatch(set_level(map_lev.current));
        };
    }, [dispatch]);


    return (
        <>
            <div className={styles['container']}>
                <div className={styles['content']}>
                    <div
                        id="map"
                        style={{ width: '100%', height: '100vh', zIndex: 1 }}
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
                        위치를 입력해 주세요.
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
                <ParkingList
                    onClick={(id) => history.push(Paths.main.detail + '?place_id=' + id)}
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
