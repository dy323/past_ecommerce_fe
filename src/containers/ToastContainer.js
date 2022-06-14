import Toast from 'components/Toast';
import { useSelector, useDispatch } from "react-redux";
import {TriggerToast} from 'store/actions';

const ToastContainer = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.toast.open);
    const status = useSelector((state) => state.toast.status);
    const message = useSelector((state) => state.toast.message);

    /* status including success, error, warning, info */

    return (
        <Toast open={open} status={status}  message={message} onCloseAction={()=> dispatch(TriggerToast(!open, status, null))} />
    )

}

export default ToastContainer;