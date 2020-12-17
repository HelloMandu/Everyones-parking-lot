import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* Library */

import { useDialog } from '../../../hooks/useDialog';
/* Hooks */

import { requestGetEventList } from '../../../api/event';
/* API */

import styles from './EventListContainer.module.scss';
import { Paths } from '../../../paths';
import { ButtonBase } from '@material-ui/core';
import { imageFormat } from '../../../lib/formatter';
/* StyleSheets */

const EventListContainer = ({ history }) => {
    const [eventList, setEventList] = useState([]);
    const openDialog = useDialog();

    const getNoticeList = useCallback(async () => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getNoticeList();
    }, [getNoticeList]);

    return (
        <div className={styles['container']}>
            <div className={styles['list']}>
                {eventList.length !== 0 &&
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
                    ))}
            </div>
        </div>
    );
};

export default EventListContainer;
