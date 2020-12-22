import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* Library */

import { useDialog } from '../../../hooks/useDialog';
import useLoading from '../../../hooks/useLoading';
/* Hooks */

import { requestGetEventList } from '../../../api/event';
/* API */

import Notice from '../../../static/asset/svg/Notice';
import styles from './EventListContainer.module.scss';
import { Paths } from '../../../paths';
import { ButtonBase } from '@material-ui/core';
import { imageFormat } from '../../../lib/formatter';
/* StyleSheets */

const LOADING_EVENT = 'loading/EVENT';

const EventListContainer = ({ history }) => {
    const [eventList, setEventList] = useState([]);
    const openDialog = useDialog();
    const [onLoading, offLoading, isLoading] = useLoading();

    const getNoticeList = useCallback(async () => {
        onLoading(LOADING_EVENT);
        try {
            const response = await requestGetEventList();
            const { msg, events } = response;
            if (msg === 'success') {
                setEventList(events);
            } else {
                openDialog(
                    '이벤트를 가지고 오는 도중에 오류가 발생했습니다.',
                    '잠시 후에 다시 시도해 주세요.',
                    history.goBack(),
                );
            }
        } catch (e) {
            openDialog(
                '이벤트를 가지고 오는 도중에 오류가 발생했습니다.',
                '잠시 후에 다시 시도해 주세요.',
                history.goBack(),
            );
        }
        offLoading(LOADING_EVENT);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getNoticeList();
    }, [getNoticeList]);

    return (
        <div className={styles['container']}>
            {!isLoading[LOADING_EVENT] && 
                <div className={styles['list']}>
                    {eventList.length !== 0 ?
                        eventList.map(({ event_banner_image, event_id }) => (
                            <Link
                                className={styles['item']}
                                to={Paths.main.event.detail + '?id=' + event_id}
                                key={event_id}
                            >
                                <ButtonBase
                                    compoennt="div"
                                    className={styles['content']}
                                >
                                    <img
                                        className={styles['banner-image']}
                                        src={`${imageFormat(event_banner_image)}`}
                                        alt="banner"
                                    />
                                </ButtonBase>
                            </Link>
                        )) : 
                        <div className={styles['non-qna']}>
                            <div className={styles['non-container']}>
                                <Notice />
                                <div className={styles['explain']}>
                                    이벤트가 없습니다.
                                </div>
                            </div>
                        </div>}
                </div>}
        </div>
    );
};

export default EventListContainer;
