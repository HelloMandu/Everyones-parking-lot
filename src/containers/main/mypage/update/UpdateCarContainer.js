import React, { useState, useEffect, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { ButtonBase, IconButton } from '@material-ui/core'
/* Library */

import InputBox from '../../../../components/inputbox/InputBox';
import FixedButton from '../../../../components/button/FixedButton';
/* Components */

import Delete from '../../../../static/asset/svg/parking/Delete';
import Information from '../../../../static/asset/svg/Information';
/* Static */

import styles from './UpdateCarContainer.module.scss';
/* StyleSheets */

import useInput from '../../../../hooks/useInput';
import { useDialog } from '../../../../hooks/useDialog';
/* Hooks */

import { requestPutReCarInfo } from '../../../../api/user';
/* API */

import { Paths } from '../../../../paths';
/* Paths */

const cx = classNames.bind(styles);

const areas = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '강원',
    '경기',
    '경남',
    '경북',
    '전남',
    '전북',
    '충남',
    '충북',
];

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
            {imgFile && file && (
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

const ParkingPicture = forwardRef(({ setCheck }, ref) => {
    const [fileList, setFileList] = useState([]);
    const onChangeFileList = useCallback((e) => {
        const { files } = e.target;
        if (files) {
            setFileList(files);
        }
    }, []);
    const handleDeleteFile = useCallback(() => setFileList([]), [setFileList]
    );
    useImperativeHandle(ref, () => ({
        fileList,
    }));
    useEffect(() => {
        setCheck(fileList.length >= 1);
    }, [setCheck, fileList]);
    return (
        <div className={styles['parking-enroll-area']}>
            <div className={cx('title')}>차량 사진 등록</div>

            <div className={cx('imformation')}>
                <Information />
                <div className={cx('sub-title')}>
                    앞 번호판이 보이는 차량사진을 등록해주세요
                </div>
            </div>
            <div className="file-wrapper">
                <ButtonBase className={styles['button']}>
                    <label htmlFor="file-setter">
                        <div className={styles['button-text']}>
                            <div className={styles['plus']}>+</div>
                            <div className={styles['plus-text']}>사진추가</div>
                        </div>
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
                    <li >
                        <FileItem
                            file={fileList[0]}
                            onDelete={handleDeleteFile}
                        ></FileItem>
                    </li>
                </ul>
            </div>
        </div>
    );
});

const UpdateCar = () => {

    const history = useHistory();
    const openDialog = useDialog();

    const [area, onChangeArea] = useInput('');
    const [carNumber, onChangeCarNumber] = useInput('');

    const [checkAll, setCheckAll] = useState(false);
    const [carNum, setCarNum] = useState(false);
    const [carPicture, setCarPicture] = useState(false);

    const parkingPicture = useRef();

    const onClickButton = useCallback(async () => {
        // 업데이트 요청
        const JWT_TOKEN = localStorage.getItem('user_id');
        if (JWT_TOKEN) {
            const response = await requestPutReCarInfo(JWT_TOKEN, {
                car_location: area === 'default' ? undefined : area === '' ? undefined : area,
                car_num: carNumber,
                car_image: parkingPicture.current.fileList[0],
            });
            if (response.msg === 'success') {
                openDialog("차량정보변경 완료", "", () => history.push(Paths.main.mypage.index));
            } else {
                openDialog(response.msg, response.sub);
            }
        } else {
            openDialog("로그인이 필요합니다", "로그인 창으로 이동합니다", () => history.push(Paths.auth.signin));
        }
    }, [history, openDialog, area, carNumber]);

    useEffect(() => {
        if (carNumber === '') setCarNum(false);
        else setCarNum(true);
    }, [carNumber])
    useEffect(() => {
        setCheckAll(carNum && carPicture);
    }, [carNum, carPicture]);
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('select-wrapper')}>
                    <select className={cx('select')} onChange={onChangeArea} defaultValue={'defalut'} >
                        <option value='defalut'>번호판에 지역 존재시 선택</option>
                        {areas.map((item) => (
                            <option key={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <InputBox
                    className={'input-box'}
                    type={'text'}
                    value={carNumber}
                    placeholder={'차량 번호를 입력해주세요. Ex)21수 7309'}
                    onChange={onChangeCarNumber}
                />

                <div className={cx('img-wrapper')}>
                    <ParkingPicture ref={parkingPicture} setCheck={setCarPicture} />
                </div>
            </div>
            <FixedButton button_name="등록" disable={!checkAll} onClick={onClickButton} />
        </>
    );
};

export default UpdateCar;