/*global Kakao*/
import React, { useCallback } from 'react';
import { Backdrop, Fade, IconButton, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CloseButton from '../../static/asset/svg/payment/CloseButton';

import {
    kakao,
    twitter,
    facebook,
    kakaostory,
    blog,
    band,
} from '../../static/asset/svg/shared';

import styles from './Shared.module.scss';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '3000 !important'
    },
}));

const Share = ({ open, onToggle, placeInfo }) => {
    const classes = useStyles();
    const createKakaoButton = useCallback(() => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
        if (Kakao) {
            Kakao.Link.createDefaultButton({
                // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: '타이틀',
                    description: '#리액트 #카카오 #공유버튼',
                    imageUrl: 'IMAGE_URL', // i.e. process.env.FETCH_URL + '/logo.png'
                    link: {
                        mobileWebUrl: 'https://www.naver.com',
                        webUrl: 'https://www.naver.com',
                    },
                },
                social: {
                    likeCount: 77,
                    commentCount: 55,
                    sharedCount: 333,
                },
                buttons: [
                    {
                        title: '웹으로 보기',
                        link: {
                            mobileWebUrl: 'https://www.naver.com',
                            webUrl: 'https://www.naver.com',
                        },
                    },
                    {
                        title: '앱으로 보기',
                        link: {
                            mobileWebUrl: 'https://www.naver.com',
                            webUrl: 'https://www.naver.com',
                        },
                    },
                ],
            });
        }
    }, []);
    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={onToggle}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <section className={styles['share-wrapper']}>
                            <div className={styles['share-header']}>
                                <h4 className={styles['title']}>공유하기</h4>
                                <IconButton
                                    className={styles['close-btn']}
                                    onClick={onToggle}
                                >
                                    <CloseButton stroke={'#333'}></CloseButton>
                                </IconButton>
                            </div>
                            <div className={styles['share-content']}>
                                <ul className={styles['share-list']}>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                            onClick={createKakaoButton}
                                        >
                                            <img src={kakao} alt="alt" />
                                        </IconButton>
                                        <p>카카오</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                        >
                                            <img src={twitter} alt="alt" />
                                        </IconButton>
                                        <p>트위터</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                        >
                                            <img src={facebook} alt="alt" />
                                        </IconButton>
                                        <p>페이스북</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                        >
                                            <img src={kakaostory} alt="alt" />
                                        </IconButton>
                                        <p>카카오스토리</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                        >
                                            <img src={blog} alt="alt" />
                                        </IconButton>
                                        <p>블로그</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                        >
                                            <img src={band} alt="alt" />
                                        </IconButton>
                                        <p>밴드</p>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default Share;
