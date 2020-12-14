import React, { useState, useEffect } from 'react';
import styles from './SupportContainer.module.scss';
import { useLocation, useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
/* Library */

import NoticeContainer from './NoticeContainer';
import FAQContainer from './FAQContainer';
import QNAContainer from './QNAContainer';
/* Containers */

import { Paths } from '../../../paths';
/* Paths */

const SupportContainer = () => {

    const location = useLocation();
    const history = useHistory();

    const [mode, setMode] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const { pathname } = location;
        if (pathname.indexOf(Paths.main.support.notice) !== -1) {
            setMode('notice');
            setTabIndex(0);
        }
        else if (pathname.indexOf(Paths.main.support.faq) !== -1) {
            setMode('faq');
            setTabIndex(1);

        }
        else if (pathname.indexOf(Paths.main.support.qna) !== -1) {
            setMode('qna');
            setTabIndex(2);
        }
        else {
            history.replace(Paths.main.support.notice);
        }
    }, [location, history])

    return (
        <div className={styles['container']}>
            <Tabs
                className={styles['tabs']}
                value={tabIndex}
                onChange={(e, index) => {
                    if (index === 0) {
                        history.replace(Paths.main.support.notice);
                    }
                    else if (index === 1) {
                        history.replace(Paths.main.support.faq + '?type=0');
                    }
                    else if (index === 2) {
                        history.replace(Paths.main.support.qna);
                    }
                }}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: 'black',
                    },
                }}
            >
                <Tab className={styles['tab']} label="공지사항" />
                <Tab className={styles['tab']} label="자주 묻는 질문" />
                <Tab className={styles['tab']} label="1:1 문의" />
            </Tabs>
            {mode === 'notice' && <NoticeContainer />}
            {mode === 'faq' && <FAQContainer />}
            {mode === 'qna' && <QNAContainer />}
        </div>
    );
};

export default SupportContainer;