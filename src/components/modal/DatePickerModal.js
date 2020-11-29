import React, { useState, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//styles
import cn from 'classnames/bind';

//components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Header from '../header/Header';
import Select from '../../static/asset/svg/detail/Select';
import { ButtonBase /*, IconButton */ } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import styles from './DatePickerModal.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import FixedButton from '../button/FixedButton';

//lib
import { getDateRange ,calculateDate} from '../../lib/calculateDate';

const cx = cn.bind(styles);
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxShadow: 'none',
        borderBottom: 'solid 1px #aaa',
        fontSize: 10,
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 16,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        minHeight: '100vh',
        position: 'relative',
        zIndex: 3000,
        padding: 0,
        paddingTop: 76,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 60,
        flex: '0 0 auto',
    },
    close: {
        position: 'absolute',
        width: '40px',
        height: '40px',
        left: 14,
        zIndex: 2100,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initState = {
    start_day: 0,
    start_hour: 0,
    start_minute: 0,
    end_day: 0,
    end_hour: 0,
    end_minute: 0,
};

const dateReducer = (state, action) => {
    return {
        ...state,
        [action.type]: action.payload,
    };
};
const DatePickerModal = (props) => {

    let minute = [],
        hour = [];
    for (let i = 0; i < 6; i++) minute.push(`${i}0`);
    for (let i = 0; i < 24; i++) hour.push(i < 10 ? `0${i}` : `${i}`);

    const classes = useStyles();

    const [date_index, dispatchDateIndex] = useReducer(dateReducer, initState);
    const [date_list, setDateList] = useState([]);
    const [start_open, setStartOpen] = useState(false);
    const [end_open, setEndOpen] = useState(false);
    const [start_date, setStateDate] = useState(0);
    const [end_date, setEndDate] = useState(0);
    const [total_date ,setTotalDate] = useState(0);


    const day_list = date_list.map((data) => (
        <SwiperSlide className={styles['swiper-slide']} key={data.DAY}>
            <DateItem value={data.DAY} />
        </SwiperSlide>
    ));
    const hour_list = hour.map((h) => (
        <SwiperSlide className={styles['swiper-slide']} key={h}>
            <DateItem value={h + '시'} />
        </SwiperSlide>
    ));
    const minute_list = minute.map((min) => (
        <SwiperSlide className={styles['swiper-slide']} key={min}>
            <DateItem value={min + '분'} />
        </SwiperSlide>
    ));

    useEffect(() => {
        let start = new Date();
        let end = new Date();
        end.setFullYear(start.getFullYear());
        end.setMonth(start.getMonth() + 1);
        end.setDate(start.getDate());
        const res = getDateRange(start, end);
        setDateList(res);
    }, []);


    useEffect(() => {
        const { start_day, start_hour, start_minute } = date_index;
        const { end_day, end_hour, end_minute } = date_index;
 
        if (date_list.length !== 0) {
            const newStartState ={
                DAY: date_list[start_day].DAY + ' ' + hour[start_hour] + ':' + minute[start_minute],
                DATE : date_list[start_day].DATE,
                TIME : hour[start_hour] + ':' + minute[start_minute],
            }
            const newEndState ={
                DAY : date_list[end_day].DAY + ' ' + hour[end_hour] + ':' + minute[end_minute],
                DATE : date_list[end_day].DATE,
                TIME : hour[end_hour] + ':' + minute[end_minute],
            }
            setStateDate(newStartState);
            setEndDate(newEndState);
        }
    }, [date_index, date_list]);

    useEffect(()=>{
        if(start_date!==0 && end_date !==0){
            setTotalDate(calculateDate(start_date.DATE,end_date.DATE ,start_date.TIME , end_date.TIME));
        }
    },[start_date,end_date])

    useEffect(()=>{
        console.log(total_date);
    },[total_date])


    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
            className={classes.dialog}
        >
            <Header title={'대여시간 설정'} />
            <DialogContent className={classes.content}>
                <div className={styles['container']}>
                    <div className={styles['total-date']}>
                        <h1>총 1일 2시간 대여</h1>
                        <p>{start_date.DAY} ~ {end_date.DAY}</p>
                    </div>
                    <div className={cx('date-box', { open: start_open })}>
                        <div className={styles['txt-value']}>
                            <div className={styles['txt']}>입차 시각</div>
                            <ButtonBase
                                className={styles['value']}
                                onClick={() => setStartOpen(!start_open)}
                            >
                                {start_date.DAY}
                                <Select />
                            </ButtonBase>
                        </div>
                        <div className={styles['swiper']}>
                            <Swiper
                                direction={'vertical'}
                                initialSlide={1}
                                spaceBetween={5}
                                slidesPerView={3}
                                centeredSlides={true}
                                className={styles['day-swiper']}
                                onSlideChange={(swiper) => {
                                    dispatchDateIndex({
                                        type: 'start_day',
                                        payload: swiper.activeIndex,
                                    });
                                }}
                            >
                                {day_list}
                            </Swiper>
                            <Swiper
                                direction={'vertical'}
                                initialSlide={1}
                                spaceBetween={5}
                                slidesPerView={3}
                                centeredSlides={true}
                                className={styles['hour-swiper']}
                                onSlideChange={(swiper) => {
                                    dispatchDateIndex({
                                        type: 'start_hour',
                                        payload: swiper.activeIndex,
                                    });
                                }}
                            >
                                {hour_list}
                            </Swiper>
                            <Swiper
                                direction={'vertical'}
                                initialSlide={1}
                                spaceBetween={5}
                                slidesPerView={3}
                                centeredSlides={true}
                                className={styles['minute-swiper']}
                                onSlideChange={(swiper) => {
                                    dispatchDateIndex({
                                        type: 'start_minute',
                                        payload: swiper.activeIndex,
                                    });
                                }}
                            >
                                {minute_list}
                            </Swiper>
                        </div>

                        <div className={styles['select-line']}>
                            <div className={styles['line']}></div>
                        </div>
                    </div>

                    <div
                        className={cx(
                            'date-box',
                            { open: end_open },
                            'end-box',
                        )}
                    >
                        <div className={styles['txt-value']}>
                            <div className={styles['txt']}>출차 시각</div>
                            <ButtonBase
                                className={styles['value']}
                                onClick={() => setEndOpen(!end_open)}
                            >
                                {end_date.DAY}
                                <Select />
                            </ButtonBase>
                        </div>
                        <div className={styles['swiper']}>
                            <Swiper
                                direction={'vertical'}
                                initialSlide={1}
                                spaceBetween={5}
                                slidesPerView={3}
                                centeredSlides={true}
                                className={styles['day-swiper']}
                                onSlideChange={(swiper) => {
                                    dispatchDateIndex({
                                        type: 'end_day',
                                        payload: swiper.activeIndex,
                                    });
                                }}
                            >
                                {day_list}
                            </Swiper>
                            <Swiper
                                direction={'vertical'}
                                initialSlide={1}
                                spaceBetween={5}
                                slidesPerView={3}
                                centeredSlides={true}
                                className={styles['hour-swiper']}
                                onSlideChange={(swiper) => {
                                    dispatchDateIndex({
                                        type: 'end_hour',
                                        payload: swiper.activeIndex,
                                    });
                                }}
                            >
                                {hour_list}
                            </Swiper>
                            <Swiper
                                direction={'vertical'}
                                initialSlide={1}
                                spaceBetween={5}
                                slidesPerView={3}
                                centeredSlides={true}
                                className={styles['minute-swiper']}
                                onSlideChange={(swiper) => {
                                    dispatchDateIndex({
                                        type: 'end_minute',
                                        payload: swiper.activeIndex,
                                    });
                                }}
                            >
                                {minute_list}
                            </Swiper>
                        </div>

                        <div className={styles['select-line']}>
                            <div className={styles['line']}></div>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <FixedButton disable={false} button_name={"시간 설정 완료"} />
        </Dialog>

    );
};
const DateItem = ({ value }) => {
    return <div className={styles['date-item']}>{value}</div>;
};

export default DatePickerModal;
