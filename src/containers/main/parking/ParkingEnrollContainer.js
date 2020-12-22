/*global daum*/
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { ButtonBase, IconButton } from '@material-ui/core';
import qs from 'qs';

import {
    requestGetAddressInfo,
    requestGetDetailParking,
    requestGetImageFile,
} from '../../../api/place';
import { getDateRange, getFormatDate } from '../../../lib/calculateDate';

import { Paths } from '../../../paths';

import useForm from '../../../hooks/useForm';
import useInput from '../../../hooks/useInput';
import useModal from '../../../hooks/useModal';
import { useScrollTop } from '../../../hooks/useScroll';

import ParkingPreviewModal from './ParkingPreviewModal';
import InputBox from '../../../components/inputbox/InputBox';
import FixedButton from '../../../components/button/FixedButton';

import Information from '../../../static/asset/svg/Information';
import Delete from '../../../static/asset/svg/parking/Delete';

import styles from './ParkingEnrollContainer.module.scss';

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

const BasicInfo = forwardRef(({ setCheck, parkingInfoInit }, ref) => {
    const [name, onChangeName, checkName] = useInput(
        '',
        (state) => state.length > 0,
    );
    const [type, onChangeType] = useInput('0');
    const [address, onChangeAddress] = useInput('');
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
            try {
                const response = await requestGetAddressInfo(address);
                if (response.data.documents) {
                    const {
                        address_name,
                        x: lng,
                        y: lat,
                    } = response.data.documents[0];
                    onChangeAddress(address_name);
                    setLat(lat);
                    setLng(lng);
                }
            } catch (e) {
                console.error(e);
            }
        },
        [onChangeAddress],
    );

    const onClickAddressSearch = useCallback(() => {
        daum.postcode.load(() =>
            new daum.Postcode({
                oncomplete: (data) => {
                    setPostNum(data.zonecode);
                    getAddressInfo(data.address);
                },
            }).open(),
        );
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
    useEffect(() => {
        if (parkingInfoInit) {
            const {
                addr,
                addr_detail,
                lat,
                lng,
                place_fee,
                place_name,
                place_type,
                post_num,
            } = parkingInfoInit;
            onChangeName(place_name);
            onChangeType(place_type);
            onChangeAddress(addr);
            setPostNum(post_num);
            onChangeAddressDetail(addr_detail);
            setLat(lat);
            setLng(lng);
            onChangePrice(place_fee.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parkingInfoInit]);

    return (
        <section className={styles['parking-enroll-area']}>
            <h3 className={styles['title']}>주차장 기본 정보</h3>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={name}
                name={'name'}
                placeholder={'주차 공간 이름을 입력해 주세요.'}
                onChange={onChangeName}
            ></InputBox>
            <select
                className={styles['select-type']}
                name="type"
                onChange={onChangeType}
            >
                {typeSelectList}
            </select>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={address}
                name={'address'}
                placeholder={'주차장 주소를 입력해 주세요.'}
                readOnly={true}
            ></InputBox>
            <ButtonBase
                className={styles['button']}
                onClick={onClickAddressSearch}
            >
                주소찾기
            </ButtonBase>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={addressDetail}
                name={'addressDetail'}
                placeholder={'상세 주소를 입력해 주세요.'}
                onChange={onChangeAddressDetail}
            ></InputBox>
            <div className={styles['per-price']}>
                <div className={styles['per']}>30분당</div>
                <div className={styles['price']}>
                    <InputBox
                        className={'input-box-right'}
                        type={'number'}
                        value={price}
                        name={'price'}
                        placeholder={'30분당 주차가격을 입력해 주세요.'}
                        onChange={onChangePrice}
                    ></InputBox>
                    <span>원</span>
                </div>
            </div>
        </section>
    );
});

const TimeSelector = ({ title, date, hour, minute, onChange }) => {
    return (
        <section className={styles['schedule-wrapper']}>
            <h3 className={styles['schedule-title']}>{title}</h3>
            <div className={styles['select-time']}>
                <select
                    className={styles['select-list']}
                    name="day"
                    onChange={onChange}
                >
                    {date}
                </select>
                <select
                    className={styles['select-list']}
                    name="hour"
                    onChange={onChange}
                >
                    {hour}
                </select>
                <select
                    className={styles['select-list']}
                    name="minute"
                    onChange={onChange}
                >
                    {minute}
                </select>
            </div>
        </section>
    );
};

const OperatingTime = forwardRef((props, ref) => {
    const [dateList, setDateList] = useState([]);
    const [hourList, setHourList] = useState([]);
    const [minuteList, setMinuteList] = useState([]);
    const [startTime, onChangeStartTime] = useForm({
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
        </option>
    ));
    const hourSelectList = hourList.map((value, index) => (
        <option className={styles['select-item']} key={index} value={value}>
            {parseInt(value / 10) === 0 ? `0${value}` : value}시
        </option>
    ));
    const minuteSelectList = minuteList.map((value, index) => (
        <option className={styles['select-item']} key={index} value={value}>
            {parseInt(value / 10) === 0 ? `0${value}` : value}분
        </option>
    ));
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
    useEffect(() => {
        setStartTimeFormat(
            `${startTime.day} ${startTime.hour}:${startTime.minute}`,
        );
    }, [startTime]);
    useEffect(() => {
        setEndTimeFormat(`${endTime.day} ${endTime.hour}:${endTime.minute}`);
    }, [endTime]);
    return (
        <section className={styles['parking-enroll-area']}>
            <h3 className={styles['title']}>운영시간</h3>
            <TimeSelector
                title={'운영 시작 시간'}
                date={perSelectList}
                hour={hourSelectList}
                minute={minuteSelectList}
                onChange={onChangeStartTime}
            />
            <TimeSelector
                title={'운영 종료 시간'}
                date={perSelectList}
                hour={hourSelectList}
                minute={minuteSelectList}
                onChange={onChangeEndTime}
            />
        </section>
    );
});

const ExtraInfo = forwardRef(({ parkingInfoInit }, ref) => {
    const [extraInfo, onChangeExtraInfo] = useInput('');
    useImperativeHandle(ref, () => ({
        extraInfo,
    }));
    useEffect(() => {
        if (parkingInfoInit) {
            onChangeExtraInfo(parkingInfoInit.place_comment);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parkingInfoInit]);
    return (
        <section className={styles['parking-enroll-area']}>
            <h3 className={styles['title']}>추가정보</h3>
            <InputBox
                className={'input-box'}
                type={'text'}
                value={extraInfo}
                name={'extraInfo'}
                placeholder={'주차 공간에 대한 추가적인 설명을 작성해주세요'}
                onChange={onChangeExtraInfo}
            ></InputBox>
        </section>
    );
});

const FileItem = ({ file, onDelete }) => {
    const [imgFile, setImgFile] = useState(null);
    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            if (base64) {
                setImgFile(base64.toString());
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }, [file]);
    return (
        <>
            {imgFile && (
                <div className={styles['file-item']}>
                    <img
                        className={styles['file-image']}
                        src={imgFile}
                        alt="file"
                    />
                    <IconButton
                        className={styles['file-delete']}
                        onClick={onDelete}
                    >
                        <Delete />
                    </IconButton>
                </div>
            )}
        </>
    );
};

const ParkingPicture = forwardRef(({ images, setCheck }, ref) => {
    const [fileList, setFileList] = useState([]);
    const onChangeFileList = useCallback(
        (e) => {
            const { files } = e.target;
            if (files) {
                const newFileList = [];
                const idx = fileList.length;
                for (let i = 0; i < files.length; i++) {
                    newFileList.push({ id: idx + i + 1, file: files[i] });
                }
                setFileList((fileList) => fileList.concat(newFileList));
            }
        },
        [fileList.length],
    );
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
    useEffect(() => {
        const initImage = async () => {
            if (images) {
                try {
                    const placeImages = [];
                    for (let i = 0; i < images.length; i++) {
                        const res = await requestGetImageFile(images[i]);
                        placeImages.push({ id: i + 1, file: res });
                    }
                    setFileList(placeImages);
                } catch (e) {
                    console.error(e);
                }
            }
        };
        initImage();
    }, [images]);
    return (
        <section className={styles['parking-enroll-area']}>
            <div className={styles['title-wrapper']}>
                <h3 className={styles['title']}>주차공간 사진</h3>
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
            <div className="file-wrapper">
                <ButtonBase className={styles['button']}>
                    <label htmlFor="file-setter">
                        <span className={styles['plus']}>+</span>사진추가
                    </label>
                </ButtonBase>
                <input
                    id="file-setter"
                    className={styles['input-files']}
                    onChange={onChangeFileList}
                    multiple="multiple"
                    type="file"
                    accept="image/gif, image/jpeg, image/png, image/svg"
                    formEncType="multipart/form-data"
                />
                <ul className={styles['file-list']}>
                    {fileList.map(({ id, file }) => (
                        <li key={id}>
                            <FileItem
                                file={file}
                                onDelete={() => handleDeleteFile(id)}
                            ></FileItem>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
});

const ParkingEnrollContainer = ({ location, match }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { place_id } = query;
    const { url, params } = match;
    const [parkingInfoInit, setParkingInfoInit] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [checkBasicInfo, setCheckBasicInfo] = useState(false);
    const [checkParkingPicture, setCheckParkingPicture] = useState(false);

    const basicInfo = useRef(null);
    const operatingTime = useRef(null);
    const extraInfo = useRef(null);
    const parkingPicture = useRef(null);

    const [isOpenPreview, openPreviewModal] = useModal(
        url,
        params.modal,
        `preview${place_id ? `?place_id=${place_id}` : ``}`,
    );

    const getDetailParking = useCallback(async () => {
        if (!place_id) {
            return;
        }
        try {
            const { data } = await requestGetDetailParking(place_id);
            const { msg, place } = data;
            if (msg === 'success') {
                const {
                    addr,
                    addr_detail,
                    lat,
                    lng,
                    place_comment,
                    place_fee,
                    place_name,
                    place_type,
                    post_num,
                    place_images,
                } = place;

                setParkingInfoInit({
                    addr,
                    addr_detail,
                    lat,
                    lng,
                    place_comment,
                    place_fee,
                    place_name,
                    place_type,
                    post_num,
                    place_images,
                });
            }
        } catch (e) {
            console.error(e);
        }
    }, [place_id]);
    useEffect(() => setCheckAll(checkBasicInfo && checkParkingPicture), [
        checkBasicInfo,
        checkParkingPicture,
    ]);
    useScrollTop();
    useEffect(getDetailParking, [getDetailParking]);
    return (
        <>
            <main className={styles['parking-enroll-container']}>
                <BasicInfo
                    setCheck={setCheckBasicInfo}
                    parkingInfoInit={parkingInfoInit}
                    ref={basicInfo}
                ></BasicInfo>
                <div className={styles['bar']} />
                <OperatingTime ref={operatingTime}></OperatingTime>
                <div className={styles['bar']} />
                <ExtraInfo
                    ref={extraInfo}
                    parkingInfoInit={parkingInfoInit}
                ></ExtraInfo>
                <ParkingPicture
                    images={parkingInfoInit && parkingInfoInit.place_images}
                    setCheck={setCheckParkingPicture}
                    ref={parkingPicture}
                ></ParkingPicture>
            </main>
            {!isOpenPreview && (
                <FixedButton
                    button_name={
                        Paths.main.parking.enrollment === url
                            ? '작성완료'
                            : '수정완료'
                    }
                    disable={!checkAll}
                    onClick={openPreviewModal}
                ></FixedButton>
            )}
            <ParkingPreviewModal
                open={isOpenPreview}
                parkingInfo={
                    checkAll && {
                        place_id,
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
                    }
                }
            ></ParkingPreviewModal>
        </>
    );
};

export default ParkingEnrollContainer;
