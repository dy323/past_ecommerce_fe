import Logo from 'assets/images/logo/pure_logo.png';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import {Grid, DialogTitle, DialogContent, DialogActions, Dialog, Button, CircularProgress} from '@mui/material';
import Image from 'components/Image';
import {FiTrash} from 'react-icons/fi';
import { InputNumber } from 'primereact/inputnumber';
import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';
import 'styles/components/dialog.scss';
import 'styles/cart.scss';
import 'styles/responsive/cart.scss';
import { useNavigate } from 'react-router-dom';
import useEncryption from 'utilities/hooks/useEncryption';
import {getCart, updateItem, deleteItem, createOrder} from 'utilities/APIs';
import {useEffect, useContext, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {TriggerToast} from 'store/actions';
import { StorageDataContext } from 'App';
import { throttle } from 'throttle-debounce';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [storageData, setStorageData] = useContext(StorageDataContext);
    const {encryptData, decryptData} = useEncryption();
    let [cart, setCart] = useState({
        item: null,
        deliveryFee: '-',
        subTotal: 0,
        grandTotal: 0,
    });
    let [notice, setNotice] = useState({
        open: false,
        code: null,
        name: null,
    })

    useEffect(()=> {
        getCart(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token)
        .then((resp)=> {
            let total = resp.data.data.reduce((a = cart.grandTotal, b) => parseFloat(a) + parseFloat(b.total_price), 0).toFixed(2);
            setCart({...cart, item: resp.data.data, subTotal: total, grandTotal: total})
        });
    },[cart.subTotal])
;
    const adjust = throttle(3000, (code, quantity) => {
        return updateItem(
        JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token,{
            "item_code" : code,
            "item_quantity" : quantity
        }).then((resp) => {
            setCart({...cart, subTotal: null, grandTotal: null})
        })
    });

    const remove = throttle(3000, () => {
        return deleteItem(
        JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token,{
            "cart_id" : notice.code,
        }).then((resp) => {
            setCart({...cart, subTotal: 0, grandTotal: 0})
            setNotice({
                open: false,
                code: null,
                name: null,
            })
        })
    });

    const submit = throttle(10000, () => {

        if (parseFloat(JSON.parse(decryptData(storageData, 'maishah123')).wallet_balance) > parseFloat(cart.grandTotal)) {
            setLoading(true);
            return (
                createOrder(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {
                    "cart_items" : cart.item.map(i => {
                        return i.id;
                    })
                }).then((resp)=> {
                    if (resp.status == 200) {
                        return navigate(`/checkout?transaction=${resp.data.data.id}`, {state: {transaction: resp.data.data.id, order_items: resp.data.data.order_details, order_total: resp.data.data.total_price}});
                    }
                }).catch(err => {
                    return dispatch(TriggerToast(true, 'error', 'Please try again'));
                }).finally(()=> {
                    return setLoading(false);
                })
            )
        } else {
            return dispatch(TriggerToast(true, 'warning', 'Insufficient Credit to proceed'));
        }
    });


    return (
        <>
        <div className="__cart">
            <div className="_header">
                <a href="/" className="logo-link">
                    <Image src={Logo} alt={'Maishah'} />
                </a>
            </div>
            <div className="_body">
                <div className="header">
                    <p className="title">Cart</p>
                </div>
                {
                    cart.item && cart.item.length > 0 ? (
                        <div className="body">
                            <div className="item">
                                <div className="store">
                                    <div className="descp">
                                        <p className="exp">店铺:</p>
                                        <p className="name">生活派</p>
                                    </div>
                                    {/* <a className="remove" href="#">
                                        <FiTrash />
                                    </a> */}
                                </div>
                                <div className="detail">
                                    <Grid container className="detail-container">
                                        <Grid className="col" xs={12} sm={2} md={2} lg={2} xl={2} item>
                                            <div className="exp">
                                                <p>Photo</p>
                                            </div>
                                        </Grid>
                                        <Grid className="col" xs={12} sm={3} md={3} lg={3} xl={3} item>
                                            <div className="exp">
                                                <p>Name</p>
                                            </div>
                                        </Grid>
                                        <Grid className="col" xs={12} sm={3} md={2} lg={2} xl={2} item>
                                            <div className="exp">
                                                <p>Variation</p>
                                            </div>
                                        </Grid>
                                        <Grid className="col" xs={12} sm={1} md={1} lg={1} xl={1} item>
                                            <div className="exp">
                                                <p>Price</p>
                                            </div>
                                        </Grid>
                                        <Grid className="col" xs={12} sm={3} md={2} lg={2} xl={2} item>
                                            <div className="exp">
                                                <p>Quantity</p>
                                            </div>
                                        </Grid>
                                        <Grid className="col" xs={12} sm={1} md={1} lg={1} xl={1} item>
                                            <div className="exp">
                                                <p>Total</p>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    {
                                        cart.item && cart.item.map((i,k) => {
                                            return (
                                                <Grid container className="detail-container" key={k}>
                                                    <Grid className="col" xs={4} sm={2} md={2} lg={2} xl={2} item>
                                                        <div className="image">
                                                            <Image src={i.product_cover_image} alt={'Maishah'} />
                                                        </div>
                                                    </Grid>
                                                    <Grid className="col" xs={8} sm={3} md={3} lg={3} xl={3} item>
                                                        <div className="name">
                                                            <p>{i.main_product_name}</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid className="col" xs={12} sm={3} md={2} lg={2} xl={2} item>
                                                        <div className="name">
                                                            <p>{i.product_variation_name}</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid className="col" xs={12} sm={1} md={1} lg={1} xl={1} item>
                                                        <div className="name">
                                                            <p className="currency">RM</p>
                                                            <p className="amount">{i.item_price}</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid className="col" xs={12} sm={3} md={2} lg={2} xl={2} item>
                                                        <div className="quantity">
                                                            <InputNumber className="quantity-input" showButtons onValueChange={(e)=> adjust(i.product_variation_code, e.value)} value={i.item_quantity} min={1} max={i.item_stock}/>
                                                        </div>
                                                    </Grid>
                                                    <Grid className="col" xs={11} sm={1} md={1} lg={1} xl={1} item>
                                                        <div className="name">
                                                            <p className="currency">RM</p>
                                                            <p className="amount">{i.total_price}</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid className="col" xs={1} sm={1} md={1} lg={1} xl={1} xl={1} item>
                                                        <a className='remove-item' onClick={()=> setNotice({
                                                            open: true,
                                                            code: i.id,
                                                            name: i.main_product_name,
                                                        })}>
                                                            <div className="remove-icon">
                                                                <FiTrash />
                                                            </div>
                                                        </a>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    ) : 
                    <p>No item in the cart</p>
                }
            </div>
            {
                cart.item && cart.item.length > 0 && (
                <div className="_sum">
                    <div className="exp-title">
                        <h5 className="_sum-total">Overall Summary</h5>
                    </div>
                    <div className="wrap">
                        <div className="_sum-container">
                            <div className="exp">
                                <p className="is">Delivery Fee:</p>
                                <div className="total">
                                    <p className="ans">{cart.deliveryFee}</p>
                                </div>
                            </div>
                            <div className="exp">
                                <p className="is">Total:</p>
                                <div className="total">
                                    <p className="currency">$</p>
                                    <p className="ans">{cart.subTotal}</p>
                                </div>
                            </div>
                            <div className="exp">
                                <p className="is">Grand Total:</p>
                                <div className="total">
                                    <p className="grand-currency">$</p>
                                    <p className="grand">{cart.grandTotal}</p>
                                </div>
                            </div>
                        </div>
                        <Button className="_submit" onClick={()=> submit()} disabled={loading? true : false}>
                            <p className="txt">{loading ? 'Processing' : 'Proceed'}</p>
                            {
                                loading && (
                                    <CircularProgress className="circle" size={16} />
                                )
                            }
                        </Button>
                    </div>
                </div>)
            }
        </div>
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="sm"
            open={notice.open}
            className="dialog-component"
        >
            <DialogTitle>
            <ReportGmailerrorredOutlinedIcon />
                Remove Item - {notice.name}
            </DialogTitle>
            <DialogContent>
                Do you want to delete item - {notice.name}
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={()=> {
                    return setNotice({
                        open: false,
                        code: null,
                        name: null,
                    })
                }}>
                    Cancel
                </Button>
                <Button onClick={() => remove()}>Confirm</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default Cart;