import {Navigate} from 'react-router-dom';

const PrivateRoute = ({children}) => {
    return window.localStorage.getItem('maishah')? children : <Navigate to="/"/>;
}

export default PrivateRoute;