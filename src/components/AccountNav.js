import "styles/components/account_nav.scss";
import {BiPhoneCall, BiMailSend} from 'react-icons/bi';
import {MdOutlineLocalShipping} from 'react-icons/md';
import ReactCountryFlag from "react-country-flag"
import {Grid, InputLabel, FormControl, Select,  MenuItem} from '@mui/material';
import LoginContainer from 'containers/LoginContainer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const AccountNav = ({isLoggedIn, lang, currency, toggleSetting}) => {
    const { t } = useTranslation();

    return (
        <>
        <div className="_nav-decorator"></div>
        <div className="_nav-decorator"></div>
        <Grid container className="_account-nav" spacing={2}>
           <Grid className="_account-col contact" xs={12} sm={8} md={8} lg={7} xl={6} item>
                <Link className="home" to="/">
                    <BiPhoneCall />
                    <span>Call Us +6565357333</span>
                </Link>
                <Link className="hello" to="/">
                    <BiMailSend />
                    <span>Contact Us</span>
                </Link>
                <Link className="hello" to="/">
                    <MdOutlineLocalShipping />
                    <span>Shipping & GST</span>
                </Link>
                {/* <LoginContainer isLoggedIn={isLoggedIn} /> */}
           </Grid>
           <Grid className="_account-col" xs={12} sm={4} md={4} lg={5} xl={6} item>
                <FormControl className="lang-switch">
                    <InputLabel className="lang-label">Currency</InputLabel>
                    <Select className="lang-select" value={currency} label="MYR" onChange={(e)=> toggleSetting('currency', e.target.value)}>
                        <MenuItem className="lang-option" value={'MYR'}>
                            <ReactCountryFlag
                                countryCode="MY"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="MY"
                            />
                            MYR (RM)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'CNY'}>
                            <ReactCountryFlag
                                countryCode="CN"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="CN"
                            />
                            CN (¥)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'USD'}>
                            <ReactCountryFlag
                                countryCode="US"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="US"
                            />
                            USD ($)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'SGD'}>
                            <ReactCountryFlag
                                countryCode="SG"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="SG"
                            />
                            SGD ($)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'THB'}>
                            <ReactCountryFlag
                                countryCode="TH"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="TH"
                            />
                            THB (฿)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'VND'}>
                            <ReactCountryFlag
                                countryCode="VN"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="VN"
                            />
                            VND (₫)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'TWD'}>
                            <ReactCountryFlag
                                countryCode="TW"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="TW"
                            />
                            TWD (NT$)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'BND'}>
                            <ReactCountryFlag
                                countryCode="BN"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="BN"
                            />
                            BND ($)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'NZD'}>
                            <ReactCountryFlag
                                countryCode="NZ"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="NZ"
                            />
                            NZD ($)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'MOP'}>
                            <ReactCountryFlag
                                countryCode="Mo"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="MO"
                            />
                            MOP (MOP$)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'HKD'}>
                            <ReactCountryFlag
                                countryCode="HK"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="HK"
                            />
                            HKD ($)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'IDR'}>
                            <ReactCountryFlag
                                countryCode="ID"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="ID"
                            />
                            IDR (Rp)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'AUD'}>
                            <ReactCountryFlag
                                countryCode="AU"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="AU"
                            />
                            AUD ($)
                        </MenuItem>
                        <MenuItem className="lang-option" value={'NZD'}>
                            <ReactCountryFlag
                                countryCode="NZ"
                                svg
                                style={{
                                    width: '13px',
                                    height: '13px',
                                }}
                                title="NZ"
                            />
                            NZD ($)
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="lang-switch">
                    <InputLabel className="lang-label">Lang</InputLabel>
                    <Select className="lang-select" value={lang} label="en" onChange={(e)=> toggleSetting('lang', e.target.value)}>
                        <MenuItem className="lang-option" value={'en'}>English</MenuItem>
                        <MenuItem className="lang-option" value={'zh'}>中文</MenuItem>
                        <MenuItem className="lang-option" value={'ms'}>Malay</MenuItem>
                        <MenuItem className="lang-option" value={'th'}>Thai</MenuItem>
                        <MenuItem className="lang-option" value={'vn'}>Vietnamese</MenuItem>
                    </Select>
                </FormControl>
           </Grid>
        </Grid>
        </>
    )
}

export default AccountNav;