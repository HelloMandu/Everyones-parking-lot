import React from 'react';
import classnames from 'classnames/bind';
/* Library */

import styles from './MyPointContainer.module.scss';
/* stylesheets */

const cn = classnames.bind(styles);

// const PointItem = ({ status }) => {
//     return (
//         <div className={styles['point-wrap']}>
//             <div className={cn('status-text', status)}>적립</div>
//             <div className={styles['time']}>2020-00-00 00:00:00</div>
//             <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
//             <div className={cn('point', status)}>+ 1,000P</div>
//         </div>
//     );
// };

const MyPointContainer = () => {

    return (
        <div className={styles['container']}>
            <div className={styles['show-area']}>
                <div className={styles['content']}>
                    <div className={styles['mypoint']}>나의 수익금</div>
                    <div className={styles['total_point']}>35,000 P</div>
                </div>
                <button className={styles['withdraw']}>출금 신청</button>
            </div>
            <div className={styles['point-area']}>
                <div className={styles['point-text']}>수익금 내역</div>
                {/* --------------PointItem---------------- */}
                <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'plus')}>적립</div>
                    <div className={styles['time']}>2020-00-00 00:00:00</div>
                    <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                    <div className={cn('point', 'plus')}>+ 1,000P</div>
                </div>
                <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'minus')}>차감</div>
                    <div className={styles['time']}>2020-00-00 00:00:00</div>
                    <div className={styles['text']}>출금신청 <span>(계좌:1234-12345-12)</span></div>
                    <div className={cn('point', 'minus')}>- 1,000P</div>
                </div>
                <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'plus')}>적립</div>
                    <div className={styles['time']}>2020-00-00 00:00:00</div>
                    <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                    <div className={cn('point', 'plus')}>+ 1,000P</div>
                </div>
                <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'plus')}>적립</div>
                    <div className={styles['time']}>2020-00-00 00:00:00</div>
                    <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                    <div className={cn('point', 'plus')}>+ 1,000P</div>
                </div>
                <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'minus')}>차감</div>
                    <div className={styles['time']}>2020-00-00 00:00:00</div>
                    <div className={styles['text']}>출금신청 <span>(계좌:1234-12345-12)</span></div>
                    <div className={cn('point', 'minus')}>- 1,000P</div>
                </div>
                <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'plus')}>적립</div>
                    <div className={styles['time']}>2020-00-00 00:00:00</div>
                    <div className={styles['text']}>주차공간 대여 수익금<span></span></div>
                    <div className={cn('point', 'plus')}>+ 1,000P</div>
                </div>
                <div className={styles['point-wrap']}>
                    <div className={cn('status-text', 'minus')}>차감</div>
                    <div className={styles['time']}>2020-00-00 00:00:00</div>
                    <div className={styles['text']}>출금신청 <span>(계좌:1234-12345-12)</span></div>
                    <div className={cn('point', 'minus')}>- 1,000P</div>
                </div>
            </div>
        </div>
    );
};

export default MyPointContainer;