const USE_WAIT = '이용대기';
const USE_USING = '이용중';
const USE_FINISH = '이용완료';
const USE_CANCEL = '이용취소';

export const rentalStatus = ({
    rental_start_time,
    rental_end_time,
    cancel_time,
}) => {
    const current = Date.now();
    const rentalStartTime = new Date(rental_start_time).getTime();
    const rentalEndTime = new Date(rental_end_time).getTime();

    return cancel_time
        ? USE_CANCEL
        : current < rentalStartTime
        ? USE_WAIT
        : current > rentalEndTime
        ? USE_FINISH
        : USE_USING;
};
