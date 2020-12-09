const USE_WAIT = '이용대기';
const USE_USING = '이용중';
const USE_FINISH = '이용완료';
const USE_CANCEL = '이용취소';

export const rentalStatus = (order) => {
    const current = new Date().getTime();
    const rentalStartTime = new Date(order.rental_start_time).getTime();

    return order.total_price
        ? USE_FINISH
        : order.cancel_time
        ? USE_CANCEL
        : current < rentalStartTime
        ? USE_WAIT
        : USE_USING;
};
