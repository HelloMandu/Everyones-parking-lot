import React from 'react';
import { ButtonBase } from '@material-ui/core';

import useForm from '../../../hooks/useForm';

import InputBox from '../../../components/inputbox/InputBox';
// import FixedButton from '../../../components/button/FixedButton';

import ArrowSmall from '../../../static/asset/svg/ArrowSmall';

import styles from './ParkingEnrollContainer.module.scss';

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
// const date = [];

const ParkingEnrollContainer = () => {
    const [parkingInfo, onChangeParkingInfo] = useForm({
        name: '',
        kind: '',
        address: '',
        addressDetail: '',
        price: '',
    });
    const [startTime, onChangeStartTime] = useForm({
        per: perList,
        hour: hourList,
        minute: minuteList,
    });

    // const [schedule, onChangeSchedule] = useForm({
    //     per: '',
    //     startHour: '',
    //     startMinute: '',
    //     endDate: '',
    //     endHour: '',
    //     endMinute: ''
    // })

    const { name, kind, address, addressDetail, price } = parkingInfo;
    const { per, hour, minute } = startTime;
    const perSelectList = per.map(({ id, per }) => (
        <option className={styles['select-item']} key={id} value={per}>
            {per}분당
        </option>
    ));
    const hourSelectList = hour.map(({ id, hour }) => (
        <option className={styles['select-item']} key={id} value={hour}>
            {parseInt(hour / 10) === 0 ? `0${hour}` : hour}시
        </option>
    ));
    const minuteSelectList = minute.map(({ id, minute }) => (
        <option className={styles['select-item']} key={id} value={minute}>
            {parseInt(minute / 10) === 0 ? `0${minute}` : minute}분
        </option>
    ));
    return (
        <>
            <div className={styles['parking-enroll-container']}>
                <div className={styles['parking-enroll-area']}>
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
                    <ButtonBase className={styles['enroll-button']}>
                        주소찾기
                    </ButtonBase>
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
                                className={'input-box'}
                                type={'text'}
                                value={price}
                                name={'price'}
                                placeholder={'30분당 주차가격을 입력하세요'}
                                onChange={onChangeParkingInfo}
                            ></InputBox>
                            <span>원</span>
                        </div>
                    </div>
                </div>
                <div className={styles['bar']}></div>
                <div className={styles['parking-enroll-area']}>
                    <div className={styles['title']}>운영시간</div>
                    <div className={styles['schedule-wrapper']}>
                        <div className={styles['schedule-title']}>
                            운영 시작 시간
                        </div>
                        <div className={styles['select-time']}>
                            <div className={styles['select-wrapper']}>
                                <select
                                    className={styles['select-list']}
                                    name="per"
                                    onChange={onChangeStartTime}
                                >
                                    {perSelectList}
                                </select>
                                <ArrowSmall rotate={180}></ArrowSmall>
                            </div>
                            <div className={styles['select-wrapper']}>
                                <select
                                    className={styles['select-list']}
                                    name="hour"
                                    onChange={onChangeStartTime}
                                >
                                    {hourSelectList}
                                </select>
                                <ArrowSmall rotate={180}></ArrowSmall>
                            </div>
                            <div className={styles['select-wrapper']}>
                                <select
                                    className={styles['select-list']}
                                    name="minute"
                                    onChange={onChangeStartTime}
                                >
                                    {minuteSelectList}
                                </select>
                                <ArrowSmall rotate={180}></ArrowSmall>
                            </div>
                        </div>
                    </div>
                    <div className={styles['schedule-wrapper']}>
                        <div className={styles['schedule-title']}>
                            운영 종료 시간
                        </div>
                        <div className={styles['select-time']}>
                            <div className={styles['select-wrapper']}>
                                <select
                                    className={styles['select-list']}
                                    name="per"
                                >
                                    {perSelectList}
                                </select>
                                <ArrowSmall rotate={180}></ArrowSmall>
                            </div>
                            <div className={styles['select-wrapper']}>
                                <select
                                    className={styles['select-list']}
                                    name="hour"
                                >
                                    {hourSelectList}
                                </select>
                                <ArrowSmall rotate={180}></ArrowSmall>
                            </div>
                            <div className={styles['select-wrapper']}>
                                <select
                                    className={styles['select-list']}
                                    name="minute"
                                >
                                    {minuteSelectList}
                                </select>
                                <ArrowSmall rotate={180}></ArrowSmall>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['bar']}></div>
            </div>
            {/* <FixedButton button_name={'작성완료'}></FixedButton> */}
        </>
    );
};

export default ParkingEnrollContainer;
