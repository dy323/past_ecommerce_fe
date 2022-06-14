import Logo from 'assets/images/logo/pure_logo.png';
import Image from 'components/Image';
import "styles/address.scss";
import {useEffect, useState, useContext} from 'react';
import {Grid } from '@mui/material';
import { useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import { TextField, FormHelperText } from '@mui/material';
import useQuery from 'utilities/hooks/useQuery';
import { createAddress, updateAddress, getSingleAddress} from 'utilities/APIs';
import { StorageDataContext } from 'App';
import useEncryption from 'utilities/hooks/useEncryption';
import { useNavigate, useLocation } from 'react-router-dom';

import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';
import { getStatesOfCountry } from '../../node_modules/country-state-city/dist/lib/state';


const AddressInfo = () => {
    const navigate = useNavigate();
    const uselocation = useLocation();
    const {addressId}= uselocation.state || {};
    const query = useQuery();
    const [storageData, setStorageData] = useContext(StorageDataContext);
    const {decryptData} = useEncryption();
    //library will fetch state list
    const [locationList, setLocationList] = useState({
        countries: null,
        state: null
    })
    //user selected state
    const [location, setLocation] = useState({
        country: "",
        state: ""
    })
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {

        if (query.get('id')) {
            updateAddress(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {
                "address_id": data.address_id,
                "first_name" : data.first_name,
                "last_name" : data.last_name,
                "phone" : data.phone,
                "email" : data.email,
                "postal_code" : data.postal_code,
                "state" : location.state == 'unavailable'? "null" : location.state.name,
                "area" : data.area,
                "city" : data.city,
                "details" : data.details,
                "country" : location.country,
            }).then((resp)=> {
                return navigate(`/profile`);
            })
        } else {
            createAddress(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {
                "first_name" : data.first_name,
                "last_name" : data.last_name,
                "phone" : data.phone,
                "email" : data.email,
                "postal_code" : data.postal_code,
                "state" : location.state == 'unavailable'? "null" : location.state.name,
                "area" : data.area,
                "city" : data.city,
                "details" : data.details,
                "country" : location.country,
            }).then((resp)=> {
                return navigate(`/profile`);
            })
        }
    }

    // const selectCountry = (e) => {
    //     let stateList = getStatesOfCountry(e.isoCode);

    //     if (e) {
    //         setLocationList({...locationList, state: stateList})
    //         return setLocation(
    //             {...location, 
    //             country: e, 
    //             state: (Array.isArray(stateList) && !stateList.length? 'unavailable' : null)
    //             });
    //     } else {
    //         setLocation({state: "", country: ""}); 
    //         return setLocationList({...locationList, state: null});
    //     }
    // }

    //function when user select state from state list
    const selectState = (e) => {
        if (e) {
            return setLocation({country: 'China', state: e});
        } else {
            return setLocation({country: 'China', state: ""}); 
        }
    }


    //state template for primereact
    const afterSelectedTemplate = (option, props) => {

        if (option) {
            return (
                <div className="address-list-item">
                    {
                        option.flag && (<p>{option.flag}</p>)
                    }
                    <p>{option.name}</p>
                </div>
            )
        } else if (!option && location.state != "") {
            return (
                <div className="address-list-item">
                    {
                        option && option.flag && (<p>{option.flag}</p>)
                    }
                    <p>{location.state.name}</p>
                </div>
            )
        }

        return (
            <span>
            {props.placeholder}
            </span>
        );
    }
    
    //state template for primereact
    const beforeSelectedTemplate = (option, props) => {
        return (
            <div className="address-list-item">
                {
                    option.flag && (<p>{option.flag}</p>)
                }
                <p>{option.name}</p>
            </div>
        );
    }

    useEffect(()=> {
        setLocationList({...locationList, countries: 'CN', state: getStatesOfCountry('CN')});
        if (query.get('id')) {
            getSingleAddress(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {
                address_id: addressId? addressId : query.get('id')
            }).then(resp => {
                //this set value list below is for default value on hook form
                setValue('address_id', resp.data.data.id);
                setValue('first_name', resp.data.data.first_name);
                setValue('last_name', resp.data.data.last_name);
                setValue('phone', resp.data.data.phone);
                setValue('email', resp.data.data.email);
                setValue('details', resp.data.data.details);
                setValue('city', resp.data.data.city);
                setValue('area', resp.data.data.area);
                setValue('postal_code', resp.data.data.postal_code);
                setLocation({country: 'China', state: {name: resp.data.data.state}});
            })
        }
    },[])

    return (
        <div className="__address">
            <div className="_header">
                <a href="/" className="logo-link">
                    <Image src={Logo} alt={'Maishah'} />
                </a>
            </div>
            <div className="body">
                <div className="data-details">
                    <div className="header">
                        <p className="title">{query.get('id')? 'Edit Address' : 'Add Address'}</p>
                    </div>
                    <div className="body">
                        <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container className="_address-container" spacing={2}>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">First Name</label>
                                        <TextField type="text" {...register("first_name", { required: true, maxLength: 20 })} required/>
                                        {errors.first_name && errors.first_name.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.first_name && errors.first_name.type === "maxLength" && <span className="err-warn">Max length exceeded</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Last Name</label>
                                        <TextField type="text" {...register("last_name", { required: true, maxLength: 20 })} required/>
                                        {errors.last_name && errors.last_name.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.last_name && errors.last_name.type === "maxLength" && <span className="err-warn">Max length exceeded</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Phone</label>
                                        <TextField type="number" {...register("phone", { required: true, valueAsNumber: true })} required/>
                                        {errors.phone && errors.phone.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.phone && errors.phone.type === "valueAsNumber" && <span className="err-warn">Accept numeric only</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Email</label>
                                        <TextField type="text" {...register("email", { required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} required/>
                                        {errors.email && errors.email.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.email && errors.email.type === "pattern" && <span className="err-warn">Accept email Only</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Address</label>
                                        <TextField type="text" {...register("details", { required: true, maxLength: 40 })} required/>
                                        {errors.details && errors.details.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.details && errors.details.type === "maxLength" && <span className="err-warn">Max length exceeded</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">City</label>
                                        <TextField type="text" {...register("city", { required: true, maxLength: 30 })} required/>
                                        {errors.city && errors.city.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.city && errors.city.type === "maxLength" && <span className="err-warn">Max length exceeded</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Area</label>
                                        <TextField type="text" {...register("area", { required: true, maxLength: 30 })} required/>
                                        {errors.area && errors.area.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.area && errors.area.type === "maxLength" && <span className="err-warn">Max length exceeded</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Postal Code</label>
                                        <TextField type="text" {...register("postal_code", { required: true, maxLength: 20 })} required/>
                                        {errors.postal_code && errors.postal_code.type === "required" && <span className="err-warn">This is required</span>}
                                        {errors.postal_code && errors.postal_code.type === "maxLength" && <span className="err-warn">Max length exceeded</span> }
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">State</label>
                                        <Dropdown className="dropdown-input" value={location.state} onChange={(e)=> selectState(e.value)} options={locationList.state} optionLabel="name" filter showClear filterBy="name" placeholder={location.state == 'unavailable'? "No state selection" : "Select your State"}
                                        valueTemplate={afterSelectedTemplate} itemTemplate={beforeSelectedTemplate} required={location.state == 'unavailable' || location.state? false : true}/>
                                    </div>
                                </Grid>
                                <Grid className="_address-col" xs={12} sm={6} md={6} lg={6} xl={6} item>
                                    <div className="p-field">
                                        <label htmlFor="firstname1">Country</label>
                                        <TextField type="text" value={'China'} required disabled/>
                                        <FormHelperText id="my-helper-text">The delivery is accepted within China Only</FormHelperText>
                                    </div>
                                </Grid>
                                <input type="hidden" {...register("address_id")}/>
                            </Grid>
                            <button className="address-submit" type="submit">
                                {query.get('id')? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressInfo;