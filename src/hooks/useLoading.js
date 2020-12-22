import { useDispatch, useSelector } from 'react-redux';
import { startLoading, finishLoading } from '../store/loading';

const useLoading = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.loading)
    const onLoading = (type) => dispatch(startLoading(type));
    const offLoading = (type) => dispatch(finishLoading(type));
    return [onLoading, offLoading, isLoading];
};

export default useLoading;
