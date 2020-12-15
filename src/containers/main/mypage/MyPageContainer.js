import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonBase } from '@material-ui/core';
/* Library */

import ImageModal from '../../../components/modal/ImageModal';
/* Components */

import ArrowSmall from '../../../static/asset/svg/ArrowSmall';
/* Static */

import styles from './MyPageContainer.module.scss';
import Car from '../../../static/asset/svg/Car';
import Camera from '../../../static/asset/svg/Camera';
/* StyleSheets */

import { deleteUser } from '../../../store/user';
import { getFormatDateString } from '../../../lib/calculateDate';
import { imageFormat, stringToTel } from '../../../lib/formatter';
/* Lib */

import useToken from '../../../hooks/useToken';
import { useDialog } from '../../../hooks/useDialog';
import useModal from '../../../hooks/useModal';
/* Hooks */

import { requestPutProfile } from '../../../api/user';
/* API */

import { Paths } from '../../../paths';
/* Paths */

const FileItem = ({ file, image }) => {
    const openDialog = useDialog();
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
    }, [file, setImgfile]);

    useEffect(() => {
        try {
            UpdateProfile();
        } catch (e) {
            openDialog('프로필 사진 업로드 오류');
        }
    }, [UpdateProfile, openDialog]);

    return (
        <>
            {imgFile ? (
                <div
                    className={styles['img-item']}
                    style={{ backgroundImage: `url(${imgFile})` }}
                />
            ) : image ? (
                <div
                    className={styles['img-item']}
                    style={{ backgroundImage: `url(${imageFormat(image)})` }}
                />
            ) : (
                <div
                    className={styles['img-item']}
                    style={{ backgroundImage: `url(${image})` }}
                />
            )}
        </>
    );
};
const ProfileImg = ({ image, onClick }) => {
    const fileRef = useRef();
    const [imgFile, setImgFile] = useState([]);
    const [sliceImage, setSliceImage] = useState('');

    useEffect(() => {
        if (image !== undefined && image !== null) {
            setSliceImage(image);
        }
    }, [image]);

    const onChangeImgFile = useCallback((e) => {
        const { files } = e.target;
        if (files) {
            setImgFile(files);
        }
    }, []);

    return (
        <ButtonBase
            component="div"
            className={styles['img-wrap']}
            onClick={onClick}
        >
            <FileItem file={imgFile[0]} image={sliceImage} />
            <ButtonBase
                component="div"
                className={styles['camera']}
                onClick={() => fileRef.current.click()}
            >
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
            </ButtonBase>
        </ButtonBase>
    );
};

const MyPageContainer = ({ match }) => {
    const getUserInfo = useSelector((state) => state.user);

    const openDialog = useDialog();
    const history = useHistory();
    const TOKEN = useToken();
    const dispatch = useDispatch();

    const { url, params } = match;
    const [isOpenProfile, handleOpenProfile] = useModal(
        url,
        params.modal,
        'profile',
    );

    const onClickLogout = () => {
        const JWT_TOKEN = localStorage.getItem('user_id');
        openDialog(
            '로그아웃 하시겠습니까?',
            '',
            () => {
                dispatch(deleteUser(JWT_TOKEN));
                history.replace(Paths.main.index);
            },
            true,
        );
    };

    return (
        <>
            {TOKEN !== null && (
                <>
                    <div className={styles['container']}>
                        <div className={styles['user-area']}>
                            <ProfileImg
                                image={getUserInfo.profile_image}
                                onClick={handleOpenProfile}
                            />
                            <div className={styles['right-wrap']}>
                                <Link to={Paths.main.mypage.update.name}>
                                    <ButtonBase
                                        component="div"
                                        className={styles['name-wrap']}
                                    >
                                        <div className={styles['user-name']}>
                                            <span>{getUserInfo.name}</span>
                                        </div>
                                        <ArrowSmall rotate={90} />
                                    </ButtonBase>
                                </Link>
                                <Link to={Paths.main.mypage.update.enrollment}>
                                    <ButtonBase
                                        component="div"
                                        className={styles['enroll-wrap']}
                                    >
                                        <div className={styles['enroll']}>
                                            <Car />
                                            <span> 차량 등록관리</span>
                                        </div>
                                    </ButtonBase>
                                </Link>
                            </div>
                        </div>
                        <div className={styles['mypage-area']}>
                            <Link to={Paths.main.parking.manage}>
                                <ButtonBase
                                    component="div"
                                    className={styles['parking-wrap']}
                                >
                                    <div className={styles['text']}>
                                        <span>내 주자공간 관리</span>
                                        <ArrowSmall rotate={90} />
                                    </div>
                                </ButtonBase>
                            </Link>
                            <Link to={Paths.main.use.list}>
                                <ButtonBase
                                    component="div"
                                    className={styles['use-wrap']}
                                >
                                    <div className={styles['text']}>
                                        <span>이용내역 관리</span>
                                        <ArrowSmall rotate={90} />
                                    </div>
                                </ButtonBase>
                            </Link>
                        </div>
                        <div className={styles['info-area']}>
                            <Link to={Paths.main.mypage.update.hp}>
                                <ButtonBase
                                    component="div"
                                    className={styles['hp-wrap']}
                                >
                                    <div className={styles['text']}>
                                        <span>휴대폰번호</span>
                                        <span className={styles['user-text']}>
                                            {stringToTel(
                                                getUserInfo.phone_number,
                                            )}
                                        </span>
                                        <ArrowSmall rotate={90} />
                                    </div>
                                </ButtonBase>
                            </Link>
                            <div className={styles['email-wrap']}>
                                <div className={styles['text']}>
                                    <span>이메일 주소</span>
                                    <span className={styles['user-text']}>
                                        {getUserInfo.email}
                                    </span>
                                </div>
                            </div>
                            <Link
                                to={{
                                    pathname: Paths.main.mypage.update.birthday,
                                    state: getUserInfo.birth,
                                }}
                            >
                                <ButtonBase
                                    component="div"
                                    className={styles['birthday-wrap']}
                                >
                                    <div className={styles['text']}>
                                        <span>생년월일</span>
                                        <span className={styles['user-text']}>
                                            {getFormatDateString(
                                                getUserInfo.birth,
                                            )}
                                        </span>
                                        <ArrowSmall rotate={90} />
                                    </div>
                                </ButtonBase>
                            </Link>
                        </div>
                        <div className={styles['password-area']}>
                            <Link to={Paths.main.mypage.update.password}>
                                <ButtonBase
                                    component="div"
                                    className={styles['password-wrap']}
                                >
                                    <div className={styles['text']}>
                                        <span>비밀번호 변경</span>
                                        <ArrowSmall rotate={90} />
                                    </div>
                                </ButtonBase>
                            </Link>
                        </div>
                        <div className={styles['logout-area']}>
                            <ButtonBase
                                component="div"
                                className={styles['logout-wrap']}
                                onClick={onClickLogout}
                            >
                                <span>로그아웃</span>
                            </ButtonBase>
                        </div>
                        <Link to={Paths.main.mypage.withdraw}>
                            <div className={styles['withdraw-area']}>
                                <ButtonBase
                                    component="div"
                                    className={styles['withdraw-wrap']}
                                >
                                    <span>회원탈퇴</span>
                                </ButtonBase>
                            </div>
                        </Link>
                    </div>
                    <ImageModal
                        open={isOpenProfile}
                        title={'프로필 이미지'}
                        images={imageFormat(getUserInfo.profile_image)}
                        handleClose={handleOpenProfile}
                    ></ImageModal>
                </>
            )}
        </>
    );
};

export default MyPageContainer;
