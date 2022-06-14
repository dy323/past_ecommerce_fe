import {useEffect, useState, useContext} from 'react';
import { StorageDataContext } from 'App';
import Logo from 'assets/images/logo/pure_logo.png';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import Image from 'components/Image';
import {Grid, Card, CardMedia, CardHeader, CardContent, Typography, FormHelperText, Button, CircularProgress} from '@mui/material';
import useEncryption from 'utilities/hooks/useEncryption';
import {getAddress, getOrderDetail, payOrder} from 'utilities/APIs';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {useLocation, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import {TriggerToast} from 'store/actions';
import useQuery from 'utilities/hooks/useQuery';
import { throttle } from 'throttle-debounce';
import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';
import 'styles/payment.scss';

const Payment = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {transaction, order_items, order_total}= location.state || {};
    const {decryptData} = useEncryption();
    const [storageData, setStorageData] = useContext(StorageDataContext);
    let [loading, setLoading] = useState(false);
    let [cart, setCart] = useState({
        item: order_items,
        deliveryFee: 10,
        subTotal: 0,
        grandTotal: 0,
    });
    let [info, setInfo] = useState({
        profile: [{
            name: JSON.parse(decryptData(storageData, 'maishah123')).first_name + JSON.parse(decryptData(storageData, 'maishah123')).last_name,
            card_number: JSON.parse(decryptData(storageData, 'maishah123')).card_number,
            wallet: parseFloat(JSON.parse(decryptData(storageData, 'maishah123')).wallet_balance).toFixed(2),
        }],
        address: [],
    })

    let [selection, setSelection] = useState({
        delivery_address_id: null,
        order_id: transaction? transaction : query.get('transaction'),
    })

    useEffect(()=> {

        getAddress(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token)
        .then((resp)=> {
            setInfo({...info, address:[
                ...resp.data.data
            ]})
        })

        if (!transaction && !order_items && !order_total) {
            getOrderDetail(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {
                order_id: selection.order_id
            }).then((resp)=> {
                setCart({
                    ...cart,
                    item: resp.data.data.order_details,
                    subTotal: resp.data.data.total_price,
                    grandTotal: resp.data.data.total_price,
                    deliveryFee: resp.data.data.delivery_fee.total_price,
                })
            })
        }

        return setLoading(false);

    }, []);

    const pay = throttle(30000, () => {
        
        if (!selection.delivery_address_id) {
            return dispatch(TriggerToast(true, 'warning', 'Please select address'));
        } else {
            setLoading(true);
            return payOrder(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, selection)
            .then((resp)=> {
                if (resp.status == 200) {
                    return navigate(`/detail?transaction=${resp.data.data.id}`, {state: {transaction: resp.data.data.id, bg: resp.data.data}})
                }
            })
            .catch(err => dispatch(TriggerToast(true, 'error', 'Failed to pay order')))
            .finally(()=> setLoading(false))
        }
    });

    //Primereact templates
    const representativeNameTemplate = (rowData) => {
        return (
            <div className="address-info">
                <p className="address-text">{rowData.first_name}</p>
                <p className="address-text">{rowData.last_name}</p>
            </div>
        );
    }

    const representativePhoneTemplate = (rowData) => {
        return (
            <div className="address-info">
                <p className="address-text">{rowData.phone}</p>
            </div>
        );
    }

    const representativeEmailTemplate = (rowData) => {
        return (
            <div className="address-info">
                <p className="address-text">{rowData.email}</p>
            </div>
        );
    }

    const representativeAddressTemplate = (rowData) => {
        return (
            <div className="address-info">
                <p className="address-text">{rowData.details},</p>
                <p className="address-text">{rowData.area},</p>
                <p className="address-text">{rowData.city},</p>
                <p className="address-text">{rowData.state},</p>
                <p className="address-text">{rowData.country}</p>
            </div>
        );
    }

    return (
        <div className="__payment">
            <div className="_header">
                <a href="/" className="logo-link">
                    <Image src={Logo} alt={'Maishah'} />
                </a>
            </div>
            <h2 className="__payment-title">Payment Confirmation</h2>
            <div className="body">
                <div className="data-details">
                    <div className="header">
                        <p className="title">Select Shipping Address</p>
                    </div>
                    <div className="list">
                        <DataTable value={info.address} className="datatable-address" rows={5}
                        dataKey="id" rowHover selection={selection.delivery_address_id} onSelectionChange={e => setSelection({...selection, delivery_address_id: e.value})} loading={loading} responsiveLayout="scroll" emptyMessage="No address found" showGridlines >
                            <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                            <Column header="Name" style={{ minWidth: '14rem' }} body={representativeNameTemplate} />
                            <Column header="Phone" style={{ minWidth: '14rem' }} body={representativePhoneTemplate} />
                            <Column header="Email" style={{ minWidth: '14rem' }} body={representativeEmailTemplate} />
                            <Column header="Address" style={{ minWidth: '14rem' }} body={representativeAddressTemplate} />
                        </DataTable>
                    </div>
                    <FormHelperText className="small-reminder">
                        <ReportOutlinedIcon />
                        The shipping is within China Only
                    </FormHelperText>
                </div>
                <div className="data-details">
                    <div className="header">
                        <p className="title">Cart Item</p>
                    </div>
                    <div className="list">
                        <Grid container className="payment-item" spacing={3}>
                            {
                                cart.item && cart.item.map((i,k) => {
                                    return (
                                        <Grid className="payment-col" xs={12} sm={6} md={4} lg={4} xl={4} key={k} item>
                                            <Card className="payment-card">
                                                <CardHeader
                                                    title={i.main_product_name}
                                                    subheader={i.product_variation_name}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    height="194"
                                                    image={i.cover_image}
                                                    alt="Maishah"
                                                />
                                                <CardContent className="item-descp">
                                                    <Typography variant="body1" color="text.secondary">
                                                        Unit Price: $ {i.item_price}
                                                    </Typography>

                                                    <Typography variant="body1" color="text.secondary">
                                                      Quantity: {i.item_quantity}
                                                    </Typography>

                                                    <Typography variant="body1" color="text.secondary">
                                                        Total: $ {i.item_price * i.item_quantity}
                                                    </Typography>

                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                </div>
                <div className='data-details'>
                    <div className="_sum">
                        <div className="exp-title">
                            <h5 className="_sum-total">Overall Summary</h5>
                        </div>
                        <div className="wrap">
                            <div className="_sum-container">
                                <div className="exp">
                                    <p className="is">Delivery Fee:</p>
                                    <div className="total">
                                        <p className="currency">$</p>
                                        <p className="ans">{parseFloat(cart.deliveryFee).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="exp">
                                    <p className="is">Total:</p>
                                    <div className="total">
                                        <p className="currency">$</p>
                                        <p className="ans">{order_total? (order_total-10).toFixed(2) : cart.subTotal}</p>
                                    </div>
                                </div>
                                <div className="exp">
                                    <p className="is">Grand Total:</p>
                                    <div className="total">
                                        <p className="grand-currency">$</p>
                                        <p className="grand">{order_total? order_total : cart.grandTotal}</p>
                                    </div>
                                </div>
                            </div>
                            <Button className="_submit" onClick={()=> pay()} disabled={loading? true : false}>
                                <p className="txt">
                                    {
                                        loading ? `Processing the transaction` : `Proceed to pay $ ${order_total? order_total : cart.grandTotal}`
                                    }
                                </p>
                                {
                                loading && (
                                    <CircularProgress className="circle" size={16} />
                                )
                            }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}

export default Payment;