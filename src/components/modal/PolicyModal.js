import React from 'react';
import cn from 'classnames/bind';
import { Dialog, Slide, Tabs, Tab, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from './PolicyModal.module.scss';
import Arrow from '../../static/asset/svg/Arrow';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../lib/formatChecker';
const cx = cn.bind(styles);

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomTabs = ({ idx, categories, onChange }) => {
    const tabList = categories.map((category) => (
        <Tab
            label={category.ca_name}
            key={category.ca_name}
            className={styles['tab-item']}
        />
    ));

    return (
        <Tabs
            value={idx}
            onChange={onChange}
            variant="scrollable"
            scrollButtons="auto"
            className={styles['tabs']}
            TabIndicatorProps={{
                style: {
                    backgroundColor: 'black',
                },
            }}
        >
            {tabList}
        </Tabs>
    );
};

const getPaths = ['term', 'privacy'];

const PolicyModal = ({ url, open, type }) => {
    const history = useHistory();
    const index = getPaths.findIndex((path) => path === type); // 현재 보여줘야 할 내용 결정.
    const company = useSelector(state => state.company);
    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition}>
            <div className={cx('header')} >
                <div className={styles['content']}>
                    <IconButton
                        className={styles['back-btn']}
                        onClick={() => history.goBack()}
                    >
                        <Arrow />
                    </IconButton>
                    <div className={styles['title']}>
                        {index === 0 ? '이용약관' : '개인정보 처리방침'}
                    </div>
                </div>
            </div>
            {index !== -1 && (
                <>
                    <CustomTabs
                        idx={index}
                        categories={[
                            { ca_name: '이용 약관' },
                            { ca_name: '개인정보 처리방침' },
                        ]}
                        onChange={(e, path) =>
                            history.replace(`${url}/${getPaths[path]}`)
                        }
                    ></CustomTabs>
                    {!isEmpty(company) &&
                    <p className={styles['description']}
                        dangerouslySetInnerHTML={{ __html: index === 0 ? company.use_terms : company.private_policy }}
                    />
                    }
                </>
            )}
        </Dialog>
    );
};

export default PolicyModal;
