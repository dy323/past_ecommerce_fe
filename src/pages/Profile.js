import Logo from 'assets/images/logo/pure_logo.png';
import {useEffect, useState, useContext, useRef} from 'react';
import { StorageDataContext } from 'App';
import {FormHelperText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Menu, MenuItem, ListItemText, ListItemIcon, Pagination} from '@mui/material';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Image from 'components/Image';
import useEncryption from 'utilities/hooks/useEncryption';
import {getAddress, deleteAddress, getOrders} from 'utilities/APIs';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {MdAddCircleOutline} from 'react-icons/md';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {TriggerToast} from 'store/actions';
import "styles/profile.scss";

import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';


const Profile = () => {
    const dispatch = useDispatch();
    const [storageData, setStorageData] = useContext(StorageDataContext);
    const {decryptData} = useEncryption();
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        profile: [{
            name: JSON.parse(decryptData(storageData, 'maishah123')).first_name + JSON.parse(decryptData(storageData, 'maishah123')).last_name,
            card_number: JSON.parse(decryptData(storageData, 'maishah123')).card_number,
            wallet: parseFloat(JSON.parse(decryptData(storageData, 'maishah123')).wallet_balance).toFixed(2),
        }],
        address: [],
    })
    const targetRef = useRef();
    const [expand, setExpand] = useState(null);
    const open = Boolean(expand);

    useEffect(() => {

        navigate({
            pathname: '/profile',
        })

        return getAddress(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token)
        .then((resp) => {
            setInfo({
                ...info,
                address:[
                    ...resp.data.data
                ]
            })
        })

    }, [info.address.length > 0 & info.address]); 

    const remove = () => {

        return (
            deleteAddress(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {
                "address_id": targetRef.current
            })
            .then ((resp) => {
                if (resp.status == 200) {
                    setInfo({...info, address: info.address.filter(i => i.id !== targetRef.current)})
                }
            })
            .catch(err => console.log(err))
        )
    }

    const triggerExpand = (target, id) => {
        setExpand(target);
        return targetRef.current = id;
    }

    const create = () => {
        if (info.address.length < 5) {
            return navigate(`/address`);
        } else {
            return dispatch(TriggerToast(true, 'info', 'Maximum saved address reached'));
        }
    }

    return (
        <div className="__profile">
            <div className="_header">
                <a href="/" className="logo-link">
                    <Image src={Logo} alt={'Maishah'} />
                </a>
            </div>
            <div className="body">
                <div className="data-details">
                    <div className="header">
                        <p className="title">Profile</p>
                    </div>
                    <div className="card">
                        <DataTable value={info.profile} responsiveLayout="scroll">
                            <Column field="name" header="Name"></Column>
                            <Column field="card_number" header="Card Number"></Column>
                            <Column field="wallet" header="Balance"></Column>
                        </DataTable>
                    </div>
                </div>
                <div className="data-details">
                    <div className="header">
                        <p className="title">Saved Address</p>
                        <a className="add-address" onClick={() => create()}>
                            <MdAddCircleOutline />
                            New Address
                        </a>
                    </div>
                    <div className="card">
                        <TableContainer className="card-table" component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Area</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {info.address.map((address = info.address, k) => (
                                    <TableRow
                                    key={k}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {address.first_name}
                                    </TableCell>
                                    <TableCell>{address.last_name}</TableCell>
                                    <TableCell>{address.phone}</TableCell>
                                    <TableCell>{address.email}</TableCell>
                                    <TableCell>{address.details}</TableCell>
                                    <TableCell>{address.area}</TableCell>
                                    <TableCell>{address.city}</TableCell>
                                    <TableCell>{address.state}</TableCell>
                                    <TableCell>{address.country}</TableCell>
                                    <TableCell>
                                        <div className="address-option">
                                            <a onClick={(e)=> triggerExpand(e.currentTarget, address.id)}>
                                                <SettingsOutlinedIcon fontSize="medium"/>
                                            </a>
                                            <Menu
                                                className="address-menu"
                                                anchorEl={expand}
                                                open={open}
                                                onClose={() => triggerExpand(false, null)}
                                            >
                                                <MenuItem onClick={() => navigate(`/address?id=${address.id}`, {state: {addressId: address.id}})}>
                                                    <ListItemIcon>
                                                        <ModeEditOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>Edit</ListItemText>
                                                </MenuItem>
                                                <MenuItem onClick={() => remove(address.id)}>
                                                    <ListItemIcon>
                                                        <DeleteOutlineOutlinedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText>Delete</ListItemText>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                {
                                    Array.isArray(info.address) && info.address.length == 0 && (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>No Saved Address</TableCell>
                                        </TableRow>
                                    )
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <FormHelperText className="small-reminder">Limited to 5 saved address only</FormHelperText>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;