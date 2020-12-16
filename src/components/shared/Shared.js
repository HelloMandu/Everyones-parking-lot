/*global Kakao*/
import React, { useCallback } from 'react';
import { Backdrop, Fade, IconButton, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { API_SERVER } from '../../paths';

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
import { imageFormat } from '../../lib/formatter';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '3000 !important',
    },
}));

const Share = ({ open, onToggle, placeInfo }) => {
    const classes = useStyles();
    const handleKakaoShare = useCallback(() => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
        if (!placeInfo) {
            return;
        }
        const { place_name, place_id, place_images, place_comment } = placeInfo;
        if (Kakao) {
            Kakao.Link.createDefaultButton({
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: `${place_name}`,
                    description: `${place_comment}`,
                    imageUrl: `${imageFormat(place_images[0])}`,
                    link: {
                        mobileWebUrl: `https://www.intospace.kr/detail?place_id=${place_id}`,
                        webUrl: `https://www.intospace.kr/detail?place_id=${place_id}`,
                    },
                },
            });
        }
    }, [placeInfo]);
    const handleTwitterShare = useCallback(() => {
        if (!placeInfo) {
            return;
        }
        const { place_id, place_name } = placeInfo;
        window.open(
            `https://www.twitter.com/intent/tweet?&url=${API_SERVER}/detail?place_id=${place_id}&t=${place_name}`,
        );
    }, [placeInfo]);
    const handleFacebookShare = useCallback(() => {
        if (!placeInfo) {
            return;
        }
        const { place_id } = placeInfo;
        window.open(
            `https://www.facebook.com/sharer/sharer.php?display=popup&u=${API_SERVER}/detail?place_id=${place_id}`,
        );
    }, [placeInfo]);
    const handleKakaoStoryShare = useCallback(() => {
        if (!placeInfo) {
            return;
        }
        const { place_id } = placeInfo;
        window.open(
            `https://story.kakao.com/share?url=${API_SERVER}/detail?place_id=${place_id}`,
        );
    }, [placeInfo]);
    const handleNaverBlogShare = useCallback(() => {
        if (!placeInfo) {
            return;
        }
        const { place_id, place_name } = placeInfo;
        window.open(
            `https://share.naver.com/web/shareView.nhn?url=${API_SERVER}/detail?place_id=${place_id}"&title=${place_name}"`,
        );
    }, [placeInfo]);
    const handleBandShare = (url, content) => {
        const { place_id, place_name } = placeInfo;
        window.open(
            `http://band.us/plugin/share?body=${place_name}&route=${API_SERVER}/detail?place_id=${place_id}`,
            'share',
        );
    };
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
                                            id="kakao-link-btn"
                                            className={styles['circle-btn']}
                                            onClick={handleKakaoShare}
                                        >
                                            <img src={kakao} alt="alt" />
                                        </IconButton>
                                        <p>카카오</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                            onClick={handleTwitterShare}
                                        >
                                            <img src={twitter} alt="alt" />
                                        </IconButton>
                                        <p>트위터</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                            onClick={handleFacebookShare}
                                        >
                                            <img src={facebook} alt="alt" />
                                        </IconButton>
                                        <p>페이스북</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                            onClick={handleKakaoStoryShare}
                                        >
                                            <img src={kakaostory} alt="alt" />
                                        </IconButton>
                                        <p>카카오스토리</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                            onClick={handleNaverBlogShare}
                                        >
                                            <img src={blog} alt="alt" />
                                        </IconButton>
                                        <p>블로그</p>
                                    </li>
                                    <li className={styles['share-item']}>
                                        <IconButton
                                            className={styles['circle-btn']}
                                            onClick={handleBandShare}
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
