import {useEffectOnce} from 'react-use';
import AccountNav from 'components/AccountNav';
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from 'utilities/hooks/useLocalStorage';

export default function NavContainer () {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const location = useLocation();

    const [setting, setSetting] = useLocalStorage('maishah_config', {
        lang : 'en',
        currency : 'MYR'
    });

    //store latest setting to local storage
    const adjustSetting = (e, k) => {
        switch (e) {
            case 'lang':
                setSetting({
                    ...setting,
                    lang: k,
                });
                break;
            case 'currency':
                setSetting({
                    ...setting,
                    currency: k
                });
                break;
            default:
                break;
        }
        //will replace current stack to trigger refresh
        return navigate({
            pathname: location.pathname,
            search: location.search 
        })
    }

    //setting up localstorage setting for first time 
    useEffectOnce(()=> {
        if (!window.localStorage.getItem('maishah_config')) {
            setSetting({
                lang: setting.lang,
                currency: setting.currency
            });
        }
    })

    return (
        <AccountNav 
        isLoggedIn={isLoggedIn} 
        lang={setting.lang} 
        currency={setting.currency} 
        toggleSetting={(e, k)=> adjustSetting(e, k)}
        />
    )
}