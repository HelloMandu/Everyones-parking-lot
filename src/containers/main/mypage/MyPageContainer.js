import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
/* Library */

import profile from '../../../static/asset/png/profile.png';
import ArrowSmall from '../../../static/asset/svg/ArrowSmall';
/* Static */

import styles from './MyPageContainer.module.scss';
import Car from '../../../static/asset/svg/Car';
import Camera from '../../../static/asset/svg/Camera';
/* StyleSheets */

import { getFormatDateString } from '../../../lib/calculateDate';
import { stringToTel } from '../../../lib/formatter';
/* Lib */

import { requestPutProfile } from '../../../api/user';
/* API */

import { Paths } from '../../../paths'
/* Paths */

const FileItem = ({ file, image }) => {

    const [imgFile, setImgfile] = useState(null);

    const UpdateProfile = useCallback(async () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        const response = await requestPutProfile(JWT_TOKEN, file);
        if (response.msg === 'success') {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result;
                if (base64) {
                    setImgfile(base64.toString());
                }
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    }, [file, setImgfile])

    useEffect(() => {
        try {
            UpdateProfile();
        } catch (e) {

        }
    }, [UpdateProfile]);

    return (
        <>
            {imgFile
                ? <div
                    className={styles['img-item']}
                    style={{ backgroundImage: `url(${imgFile})` }}
                />
                : image
                    ? <div
                        className={styles['img-item']}
                        style={{ backgroundImage: `url(http://localhost:8080/${image})` }}
                    />
                    : <div
                        className={styles['img-item']}
                        style={{ backgroundImage: `url(${profile})` }}
                    />
            }
        </>
    )
}
const ProfileImg = ({ image }) => {

    const fileRef = useRef();
    const [imgFile, setImgFile] = useState([]);

    const onChangeImgFile = useCallback((e) => {
        const { files } = e.target;
        if (files) {
            setImgFile(files);
        }
    }, []);

    return (
        <div className={styles['img-wrap']}>
            <FileItem
                file={imgFile[0]}
                image={image}
            />
            <div className={styles['camera']} onClick={() => fileRef.current.click()}>
                <input
                    type="file"
                    className={styles['input-file']}
                    ref={fileRef}
                    onChange={onChangeImgFile}
                    id="file-setter"
                    accept="image/gif, image/jpeg, image/png, image/svg"
                    formEncType="multipart/form-data"
                />
                <Camera />
            </div>
        </div>

    )
}

const MyPageContainer = () => {

    const getUserInfo = useSelector(state => state.user);

    return (
        <div className={styles['container']}>
            <div className={styles['user-area']}>
                <ProfileImg image={getUserInfo.profile_image} />
                <div className={styles['right-wrap']}>
                    <Link to={Paths.main.mypage.update.name}>
                        <div className={styles['name-wrap']}>
                            <div className={styles['user-name']}>
                                <span>{getUserInfo.name}</span>
                            </div>
                            <ArrowSmall rotate={90} />
                        </div>
                    </Link>
                    <Link to={Paths.main.mypage.update.enrollment}>
                        <div className={styles['enroll-wrap']}>
                            <div className={styles['enroll']}>
                                <Car />
                                <span> 차량 등록관리</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={styles['mypage-area']}>
                <Link to={Paths.main.parking.manage}>
                    <div className={styles['parking-wrap']}>
                        <div className={styles['text']} >
                            <span>내주자창 관리</span>
                            <ArrowSmall rotate={90} />
                        </div>
                    </div>
                </Link>
                <Link to={Paths.main.use.list}>
                    <div className={styles['use-wrap']}>
                        <div className={styles['text']} >
                            <span>이용내역 관리 항목</span>
                            <ArrowSmall rotate={90} />
                        </div>
                    </div>
                </Link>
            </div>
            <div className={styles['info-area']}>
                <Link to={Paths.main.mypage.update.hp}>
                    <div className={styles['hp-wrap']}>
                        <div className={styles['text']} >
                            <span>휴대폰번호</span>
                            <span className={styles['user-text']}>{stringToTel(getUserInfo.phone_number)}</span>
                            <ArrowSmall rotate={90} />
                        </div>
                    </div>
                </Link>
                <div className={styles['email-wrap']}>
                    <div className={styles['text']} >
                        <span>이메일 주소</span>
                        <span className={styles['user-text']}>{getUserInfo.email}</span>
                    </div>
                </div>
                <Link to={{ pathname: Paths.main.mypage.update.birthday, state: getUserInfo.birth }}>
                    <div className={styles['birthday-wrap']}>
                        <div className={styles['text']} >
                            <span>생년월일</span>
                            <span className={styles['user-text']}>{getFormatDateString(getUserInfo.birth)}</span>
                            <ArrowSmall rotate={90} />
                        </div>
                    </div>
                </Link>
            </div>
            <div className={styles['password-area']}>
                <Link to={Paths.main.mypage.update.password}>
                    <div className={styles['password-wrap']}>
                        <div className={styles['text']} >
                            <span>비밀번호 변경</span>
                            <ArrowSmall rotate={90} />
                        </div>
                    </div>
                </Link>
            </div>
            <Link to={Paths.main.mypage.withdraw}>
                <div className={styles['withdraw-area']}>
                    <div className={styles['withdraw-wrap']}>
                        <span>회원탈퇴</span>
                    </div>
                </div>
            </Link>
        </div >
    );
};

export default MyPageContainer;