import React, { useCallback, useEffect, useState } from 'react';
import qs from 'qs';
/* Library */

import { useDialog } from '../../../hooks/useDialog';
/* Hooks */

import { requestGetDetailEvent } from '../../../api/event';
/* API */

import styles from './EventDetailContainer.module.scss';
import { isEmpty } from '../../../lib/formatChecker';
import { Paths } from '../../../paths';
import { dateToYYYYMMDD } from '../../../lib/formatter';
/* StyleSheets */

const EventDetailContainer = ({ location, history }) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const event_id = parseInt(query.id);
    const openDialog = useDialog();

    const [event, setEvent] = useState({});

    const { event_banner_image, event_title, event_body, warn, createdAt } = event;

    const getNoticeDetail = useCallback(async () => {
        try {
            const response = await requestGetDetailEvent(event_id);
            const { msg, event } = response;
            if (msg === 'success') {
                setEvent(event);
            } else {
                openDialog("이벤트를 가지고 오는 도중에 오류가 발생했습니다.", "잠시 후에 다시 시도해 주세요.", history.goBack());
            }
        } catch (e) {
            openDialog("이벤트를 가지고 오는 도중에 오류가 발생했습니다.", "잠시 후에 다시 시도해 주세요.", history.goBack());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event_id]);

    useEffect(() => {
        getNoticeDetail();
    }, [getNoticeDetail]);

    return (
        <div className={styles['container']}>
            {!isEmpty(event) &&
            <div className={styles['banner']}>
                {event_banner_image && <img className={styles['image']} src={`${Paths.storage}${event_banner_image.replace('uploads/', '')}`} alt="banner" />}
            </div>}
            <div className={styles['content']}>
                <div className={styles['created']}>{dateToYYYYMMDD(createdAt, '/')}</div> 
                <h3 className={styles['title']}>{event_title}</h3>
                <div className={styles['body']}>{event_body}</div>
                {warn && <div className={styles['warn']}>{warn}</div>}
            </div>
        </div>
    );
};

export default EventDetailContainer;