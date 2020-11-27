import { useDispatch } from 'react-redux';
import { startLoading, finishLoading } from '../store/loading';

const useLoading = () => {
    const dispatch = useDispatch();
    const onLoading = () => dispatch(startLoading());
    const offLoading = () => dispatch(finishLoading());
    return [onLoading, offLoading];
};

export default useLoading;
