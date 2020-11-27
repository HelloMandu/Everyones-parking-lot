import { useDispatch } from 'react-redux';
import { startLoading, finishLoading } from '../store/loading';

const useLoading = () => {
    const dispatch = useDispatch();
    const onLoading = (type) => dispatch(startLoading(type));
    const offLoading = (type) => dispatch(finishLoading(type));
    return [onLoading, offLoading];
};

export default useLoading;
