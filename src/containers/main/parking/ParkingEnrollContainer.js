<<<<<<< HEAD
import React from 'react';
import { ButtonBase } from '@material-ui/core';
=======
/*global daum*/
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonBase, IconButton } from '@material-ui/core';

import { Paths } from '../../../paths';
>>>>>>> mandu

import {
    requestGetAddressInfo,
    requestPostEnrollParking,
} from '../../../api/place';
import { getDateRange, getFormatDate } from '../../../lib/calculateDate';

import { useDialog } from '../../../hooks/useDialog';
import useForm from '../../../hooks/useForm';
import useInput from '../../../hooks/useInput';

import InputBox from '../../../components/inputbox/InputBox';
import FixedButton from '../../../components/button/FixedButton';

import Information from '../../../static/asset/svg/Information';

import styles from './ParkingEnrollContainer.module.scss';

<<<<<<< HEAD
const perList = [];
const hourList = [];
const minuteList = [];
for (let i = 1; i <= 6; i++) {
    perList.push({ id: i, per: 30 * i });
}
for (let i = 0; i < 24; i++) {
    hourList.push({ id: i, hour: i });
}
for (let i = 0; i < 60; i++) {
    minuteList.push({ id: i + 1, minute: i });
}

const BasicInfo = () => {
    const [parkingInfo, onChangeParkingInfo] = useForm({
        name: '',
        kind: '',
        address: '',
        addressDetail: '',
        price: '',
    });
    const { name, kind, address, addressDetail, price } = parkingInfo;
=======
const typeList = [
    {
        id: 0,
        type: '주차타운',
    },
    {
        id: 1,
        type: '지하주차장',
    },
    {
        id: 2,
        type: '지상주차장',
    },
    {
        id: 3,
        type: '지정주차',
    },
];

const BasicInfo = forwardRef(({ setCheck }, ref) => {
    const [name, onChangeName, checkName] = useInput(
        '',
        (state) => state.length > 0,
    );
    const [type, onChangeType] = useInput('0');
    const [address, setAddress] = useState('');
    const [postNum, setPostNum] = useState();
    const [addressDetail, onChangeAddressDetail, checkAddressDetail] = useInput(
        '',
        (state) => state.length > 0,
    );
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [price, onChangePrice, checkPrice] = useInput(
        '',
        (state) => state.length > 0,
    );

    const getAddressInfo = useCallback(
        async (address) => {
            const response = await requestGetAddressInfo(address);
            if (response.data.documents) {
                const {
                    address_name,
                    x: lng,
                    y: lat,
                } = response.data.documents[0];
                setAddress(address_name);
                setLat(lat);
                setLng(lng);
            }
        },
        [setAddress],
    );

    const onClickAddressSearch = useCallback(() => {
        daum.postcode.load(() => {
            new daum.Postcode({
                oncomplete: (data) => {
                    setPostNum(data.zonecode);
                    getAddressInfo(data.address);
                },
            }).open();
        });
    }, [getAddressInfo]);

    const typeSelectList = typeList.map(({ id, type }) => (
        <option className={styles['select-item']} key={id} value={id}>
            {type}
        </option>
    ));

    useImperativeHandle(ref, () => ({
        name,
        type,
        address,
        addressDetail,
        lat,
        lng,
        postNum,
        price,
    }));

    useEffect(() => {
        setCheck(
            checkName && address.length > 0 && checkAddressDetail && checkPrice,
        );
    }, [setCheck, checkName, address, checkAddressDetail, checkPrice]);
>>>>>>> mandu

    return (
        <>
            <div className={styles['title']}>주차장 기본 정보</div>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={name}
                name={'name'}
                placeholder={'주차 공간 이름을 입력해주세요'}
                onChange={onChangeParkingInfo}
            ></InputBox>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={kind}
                name={'kind'}
                placeholder={'주차장 종류를 선택하세요'}
                onChange={onChangeParkingInfo}
            ></InputBox>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={address}
                name={'address'}
                placeholder={'주차장 주소를 입력해주세요'}
                onChange={onChangeParkingInfo}
            ></InputBox>
            <ButtonBase className={styles['button']}>주소찾기</ButtonBase>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={addressDetail}
                name={'addressDetail'}
                placeholder={'상세 주소를 입력해주세요'}
                onChange={onChangeParkingInfo}
            ></InputBox>
            <div className={styles['per-price']}>
                <div className={styles['per']}>30분당</div>
                <div className={styles['price']}>
                    <InputBox
                        className={'input-box-right'}
                        type={'text'}
                        value={price}
                        name={'price'}
                        placeholder={'30분당 주차가격을 입력하세요'}
                        onChange={onChangeParkingInfo}
                    ></InputBox>
                    <span>원</span>
                </div>
            </div>
        </>
    );
};

const OperatingTime = () => {
    const [startTime, onChangeStartTime] = useForm({
<<<<<<< HEAD
        per: '',
        hour: '',
        minute: '',
    });
    const perSelectList = perList.map(({ id, per }) => (
        <option className={styles['select-item']} key={id} value={per}>
            {per}분당
=======
        day: getFormatDate(new Date()),
        hour: 0,
        minute: 0,
    });
    const [endTime, onChangeEndTime] = useForm({
        day: getFormatDate(new Date()),
        hour: 0,
        minute: 0,
    });

    const [startTimeFormat, setStartTimeFormat] = useState();
    const [endTimeFormat, setEndTimeFormat] = useState();

    const perSelectList = dateList.map((value, index) => (
        <option
            className={styles['select-item']}
            key={index}
            value={value.DATE}
        >
            {value.DAY}
>>>>>>> mandu
        </option>
    ));
    const hourSelectList = hourList.map(({ id, hour }) => (
        <option className={styles['select-item']} key={id} value={hour}>
            {parseInt(hour / 10) === 0 ? `0${hour}` : hour}시
        </option>
    ));
    const minuteSelectList = minuteList.map(({ id, minute }) => (
        <option className={styles['select-item']} key={id} value={minute}>
            {parseInt(minute / 10) === 0 ? `0${minute}` : minute}분
        </option>
    ));
<<<<<<< HEAD
=======
    useImperativeHandle(ref, () => ({
        startTimeFormat,
        endTimeFormat,
    }));

    useEffect(() => {
        const startDate = new Date();
        const endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + 1,
            startDate.getDate(),
        );
        setDateList(getDateRange(startDate, endDate));
        const newHourList = [];
        for (let i = 0; i < 24; i++) {
            newHourList.push(i);
        }
        setHourList(newHourList);
        const newMinuteList = [];
        for (let i = 0; i < 60; i++) {
            newMinuteList.push(i);
        }
        setMinuteList(newMinuteList);
    }, []);
    useEffect(()=>{
        setStartTimeFormat(
            `${startTime.day} ${startTime.hour}:${startTime.minute}`,
        );
    }, [startTime])
    useEffect(() => {
        setEndTimeFormat(`${endTime.day} ${endTime.hour}:${endTime.minute}`);
    }, [endTime]);
>>>>>>> mandu
    return (
        <>
            <div className={styles['title']}>운영시간</div>
            <div className={styles['schedule-wrapper']}>
                <div className={styles['schedule-title']}>운영 시작 시간</div>
                <div className={styles['select-time']}>
                    <select
                        className={styles['select-list']}
                        name="per"
                        onChange={onChangeStartTime}
                    >
                        {perSelectList}
                    </select>
                    <select
                        className={styles['select-list']}
                        name="hour"
                        onChange={onChangeStartTime}
                    >
                        {hourSelectList}
                    </select>
                    <select
                        className={styles['select-list']}
                        name="minute"
                        onChange={onChangeStartTime}
                    >
                        {minuteSelectList}
                    </select>
                </div>
            </div>
            <div className={styles['schedule-wrapper']}>
                <div className={styles['schedule-title']}>운영 종료 시간</div>
                <div className={styles['select-time']}>
                    <select className={styles['select-list']} name="per">
                        {perSelectList}
                    </select>
                    <select className={styles['select-list']} name="hour">
                        {hourSelectList}
                    </select>
                    <select className={styles['select-list']} name="minute">
                        {minuteSelectList}
                    </select>
                </div>
            </div>
        </>
    );
};

const ExtraInfo = () => {
    const [extraInfo, onChangeExtraInfo] = useInput('');
<<<<<<< HEAD
=======
    useImperativeHandle(ref, () => ({
        extraInfo,
    }));
>>>>>>> mandu
    return (
        <>
            <div className={styles['title']}>추가정보</div>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={extraInfo}
                name={'extraInfo'}
                placeholder={'주차 공간에 대한 추가적인 설명을 작성해주세요'}
                onChange={onChangeExtraInfo}
            ></InputBox>
        </>
    );
};

<<<<<<< HEAD
const ParkingPicture = () => {
=======
const ParkingPicture = forwardRef(({ setCheck }, ref) => {
    const [fileList, setFileList] = useState([]);
    const onChangeFileList = useCallback((e) => {
        const { files } = e.target;
        if (files) {
            const newFileList = [];
            for (let i = 0; i < files.length; i++) {
                newFileList.push({ id: i + 1, file: files[i] });
            }
            setFileList(newFileList);
        }
    }, []);
    const handleDeleteFile = useCallback(
        (id) => setFileList(fileList.filter((file) => file.id !== id)),
        [fileList],
    );
    useImperativeHandle(ref, () => ({
        fileList,
    }));
    useEffect(() => {
        setCheck(fileList.length >= 2);
    }, [setCheck, fileList]);
>>>>>>> mandu
    return (
        <>
            <div className={styles['title-wrapper']}>
                <div className={styles['title']}>주차공간 사진</div>
                <div className={styles['important-wrapper']}>
                    <div className={styles['important']}>
                        <Information></Information>
                        <span className={styles['explain']}>
                            (필수) 주차 환경 파악 가능한 전경
                        </span>
                    </div>
                    <div className={styles['important']}>
                        <Information></Information>
                        <span className={styles['explain']}>
                            (필수) 토지, 건물 관계 입증 서류
                        </span>
                    </div>
                </div>
            </div>
            <ButtonBase className={styles['button']}>
                <span className={styles['plus']}>+</span>사진추가
            </ButtonBase>
        </>
    );
};

const ParkingEnrollContainer = () => {
<<<<<<< HEAD
    return (
        <>
            <div className={styles['parking-enroll-container']}>
                <div className={styles['parking-enroll-area']}>
                    <BasicInfo></BasicInfo>
                </div>
=======
    const [checkAll, setCheckAll] = useState(false);
    const [checkBasicInfo, setCheckBasicInfo] = useState(false);
    const [checkParkingPicture, setCheckParkingPicture] = useState(false);

    const basicInfo = useRef(null);
    const operatingTime = useRef(null);
    const extraInfo = useRef(null);
    const parkingPicture = useRef(null);

    const openDialog = useDialog();
    const history = useHistory();

    const onClickEnrollParking = useCallback(async () => {
        if (checkAll) {
            const JWT_TOKEN = localStorage.getItem('user_id');
            const response = await requestPostEnrollParking(JWT_TOKEN, {
                addr: basicInfo.current.address,
                addr_detail: basicInfo.current.addressDetail,
                post_num: basicInfo.current.postNum,
                place_type: basicInfo.current.type,
                lat: basicInfo.current.lat,
                lng: basicInfo.current.lng,
                place_name: basicInfo.current.name,
                place_comment: extraInfo.current.extraInfo,
                place_images: parkingPicture.current.fileList,
                place_fee: basicInfo.current.price,
                oper_start_time: operatingTime.current.startTimeFormat,
                oper_end_time: operatingTime.current.endTimeFormat,
            });
            if (response.data.msg === 'success') {
                openDialog('등록완료', '주차공간 등록을 완료했습니다');
                history.replace(Paths.main.parking.manage);
            } else {
                openDialog('등록실패', '주차공간 등록에 실패했습니다');
            }
        }
    }, [checkAll, history, openDialog]);

    useEffect(() => {
        setCheckAll(checkBasicInfo && checkParkingPicture);
    }, [checkBasicInfo, checkParkingPicture]);
    return (
        <>
            <div className={styles['parking-enroll-container']}>
                <BasicInfo
                    setCheck={setCheckBasicInfo}
                    ref={basicInfo}
                ></BasicInfo>
>>>>>>> mandu
                <div className={styles['bar']} />
                <div className={styles['parking-enroll-area']}>
                    <OperatingTime></OperatingTime>
                </div>
                <div className={styles['bar']} />
<<<<<<< HEAD
                <div className={styles['parking-enroll-area']}>
                    <ExtraInfo></ExtraInfo>
                </div>
                <div className={styles['parking-enroll-area']}>
                    <ParkingPicture></ParkingPicture>
                </div>
            </div>
            <FixedButton button_name={'작성완료'}></FixedButton>
=======
                <ExtraInfo ref={extraInfo}></ExtraInfo>
                <ParkingPicture
                    setCheck={setCheckParkingPicture}
                    ref={parkingPicture}
                ></ParkingPicture>
            </div>
            <FixedButton
                button_name={'작성완료'}
                disable={!checkAll}
                onClick={onClickEnrollParking}
            ></FixedButton>
>>>>>>> mandu
        </>
    );
};

export default ParkingEnrollContainer;
