import React from 'react';
import styles from './Review.module.scss';
import Star from '../../static/asset/svg/review/Star';

export default ({ rating, textAlign }) => {
    const rate = parseInt(rating);
    return (
        <p className={styles['rating']} style={{ textAlign }}>
            {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} clip={star > rate} />
            ))}
            <span className={styles['rate']}>{ rating }</span>
        </p>
    );
};