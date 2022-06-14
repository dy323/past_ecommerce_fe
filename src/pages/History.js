import Logo from 'assets/images/logo/pure_logo.png';
import {useEffect, useState, useContext} from 'react';
import moment from 'moment';
import { StorageDataContext } from 'App';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination} from '@mui/material';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Image from 'components/Image';
import useEncryption from 'utilities/hooks/useEncryption';
import {getOrders} from 'utilities/APIs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {TriggerToast} from 'store/actions';
import useQuery from 'utilities/hooks/useQuery';
import "styles/profile.scss";
import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';


const History = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const [storageData, setStorageData] = useContext(StorageDataContext);
    const {decryptData} = useEncryption();
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        profile: [{
            name: JSON.parse(decryptData(storageData, 'maishah123')).first_name + JSON.parse(decryptData(storageData, 'maishah123')).last_name,
            card_number: JSON.parse(decryptData(storageData, 'maishah123')).card_number,
            wallet: parseFloat(JSON.parse(decryptData(storageData, 'maishah123')).wallet_balance).toFixed(2),
        }],
        order: [],
        page: query.get('page'),
        maxPage: 1,
    })

    useEffect(() => {

        navigate({
            pathname: '/history',
            search: `?page=${info.page}`
        })

        return getOrders(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {"page": info.page})
            .then((resp) => {
                setInfo ({
                    ...info,
                    order: [
                        ...resp.data.data
                    ],
                    maxPage: resp.data.meta.last_page
                })
            })

    }, [info.page]); 

    const resubmitOrder = (oid, detail, total) => {

        if (parseFloat(JSON.parse(decryptData(storageData, 'maishah123')).wallet_balance) > parseFloat(total)) {
            return navigate(`/checkout?transaction=${oid}`, {state: {transaction: oid, order_items: detail, order_total: total}});
        } else {
            return dispatch(TriggerToast(true, 'warning', 'Insufficient Credit to proceed'));
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
                        <p className="title">Order History</p>
                    </div>
                    <div className="card">
                        <TableContainer className="card-table" component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Order Date</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {info.order.map((order = info.order, k) => (
                                    <TableRow
                                    key={k}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell>{moment(order.created_at).format('YYYY/MM/DD, HH:MM')}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {order.delivery_address && order.delivery_address.first_name} {order.delivery_address && order.delivery_address.last_name}
                                        {!order.delivery_address && '-'}
                                    </TableCell>
                                    <TableCell>
                                        {order.delivery_address && order.delivery_address.phone}
                                        {!order.delivery_address && '-'}
                                    </TableCell>
                                    <TableCell>
                                        {order.delivery_address && order.delivery_address.email}
                                        {!order.delivery_address && '-'}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            order.delivery_address && (
                                                `${order.delivery_address.details}, ${order.delivery_address.area}, ${order.delivery_address.city}, ${order.delivery_address.state}, ${order.delivery_address.postal_code}, China`
                                            )
                                        }
                                        {!order.delivery_address && '-'}
                                    </TableCell>
                                    <TableCell>{order.total_price}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>
                                        <div className="address-option">
                                            {
                                                !order.delivery_address && order.status == 'created' ?
                                                (
                                                    <a onClick={(e)=> resubmitOrder(order.id, order.order_details, order.total_price)}>
                                                        <ShoppingCartCheckoutOutlinedIcon fontSize="medium"/>
                                                    </a>
                                                ) : (
                                                    <a onClick={(e)=> navigate(`/detail?transaction=${order.id}`, {state: {transaction: order.id}})}>
                                                        <PageviewOutlinedIcon fontSize="medium"/>
                                                    </a>
                                                )
                                            }
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                ))}
                                {
                                    Array.isArray(info.order) && info.order.length == 0 && (
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>No Order</TableCell>
                                        </TableRow>
                                    )
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <Pagination count={info.maxPage} page={parseInt(info.page)} onChange={(e,v)=> setInfo({...info, page: v})} showFirstButton showLastButton />
                </div>
            </div>
        </div>
    );
}

export default History;