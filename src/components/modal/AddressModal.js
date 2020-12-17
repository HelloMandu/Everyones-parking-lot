import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
//styles

import cn from 'classnames/bind';

//components
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Header from '../header/Header';
import { ButtonBase, IconButton } from '@material-ui/core';
import search_icon from '../../static/asset/svg/main/search.svg';
import Slide from '@material-ui/core/Slide';
import styles from './AddressModal.module.scss';
import AddressList from '../../components/address/AddressList';
// import { Backdrop } from '@material-ui/core';

//asset
import banner_img from '../../static/asset/png/event.png';
import space_zone from '../../static/asset/png/space_zone.png';
// import FixedButton from '../button/FixedButton';

//api
import { requestAddress } from '../../api/address';
import { requestGetAddressInfo } from '../../api/place';

//action
import { set_arrive, set_address } from '../../store/main/position';
import { Paths } from '../../paths';

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
        zIndex: 3000,
        padding: 0,
        paddingTop: 48,
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

const AddressModal = (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0);
    const { address } = useSelector((state) => state.position);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [space_list, setSpaceList] = useState([]);
    const [addr_list, setAddrList] = useState([]);
    const classes = useStyles();
    const ref = useRef(null);

    const onChangeSearch = useCallback((e) => {
        setSearch(e.target.value);
        let timer = setTimeout(() => {
            setIsSearch(true);
        }, 1800);
        if (isSearch) {
            clearTimeout(timer);
        }
    }, [isSearch])

    const callGetAddressSearch = useCallback(async () => {
        try {
            const res = await requestAddress(search);
            if (res) setAddrList(res);
            else setAddrList([]);
            setTimeout(() => {
                setIsSearch(false);
            }, 1500);
        } catch (e) {
            console.error(e);
        }
    }, [search]);

    useEffect(() => {
        if (isSearch) {
            callGetAddressSearch();
        }
    }, [callGetAddressSearch, isSearch])

    const onClickAddressItem = async (jibun) => {
        try {
            const res = await requestGetAddressInfo(jibun);
            const { x, y, address_name, building_name } = res.data.documents[0].road_address;
            dispatch(set_address(address_name + ' ' + building_name));
            dispatch(set_arrive({ lat: y, lng: x }));
            history.replace(Paths.main.index);
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <Dialog
            fullScreen
            open={props.open}
            onClose={props.handleClose}
            TransitionComponent={Transition}
            className={classes.dialog}
        >
            <Header title={''} />
            <DialogContent className={classes.content}>
                <div className={styles['container']}>
                    <div className={styles['search']}>
                        <input
                            type="text"
                            className={styles['search-input']}
                            placeholder="도착지를 알려주세요."
                            ref={ref}
                            value={search}
                            onChange={onChangeSearch}
                        />
                        <IconButton
                            className={styles['search-icon']}
                            onClick={callGetAddressSearch}
                        >
                            <img src={search_icon} alt="" />
                        </IconButton>
                    </div>
                    {search.length === 0 && (
                        <>
                            <div className={styles['distance-list']}>
                                <DistanceItem on={index === 0} onClick={() => setIndex(0)} distance={'100m'} />
                                <DistanceItem on={index === 1} onClick={() => setIndex(1)} distance={'300m'} />
                                <DistanceItem on={index === 2} onClick={() => setIndex(2)} distance={'1km'} />
                            </div>
                            <p>최근 이용 스페이스 존</p>
                            <div className={styles['space-list']}>
                                <AddressList addr_list={space_list} />
                            </div>
                            <div className={styles['event-zone']}>
                                <ButtonBase className={styles['event-img']}>
                                    <img src={banner_img} alt="event" />
                                </ButtonBase>
                            </div>
                            <div className={styles['space-zone']}>
                                <p>스페이스 이벤트존</p>
                                <ButtonBase className={styles['event-img']}>
                                    <img src={space_zone} alt="event" />
                                </ButtonBase>
                            </div>
                        </>
                    )}
                    {search.length !== 0 && (
                        <AddressList addr_list={addr_list} onClick={onClickAddressItem} />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

const DistanceItem = ({ on, onClick, distance }) => {
    return (
        <ButtonBase className={cx('distance-item', { on })} onClick={onClick}>
            {distance} 이내
        </ButtonBase>
    );
};
export default AddressModal;
