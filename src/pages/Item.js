import {useState, useEffect, useContext } from 'react';
import {Grid, Backdrop, CircularProgress, Rating } from '@mui/material'; 
import Image from 'components/Image';
import useQuery from 'utilities/hooks/useQuery';
import ImageGallery from 'react-image-gallery';
import styled from 'styled-components';
import "react-image-gallery/styles/css/image-gallery.css";
import 'styles/pages/item/item.scss';
import 'styles/pages/item/detail.scss';
import 'styles/pages/item/selection.scss';
import 'styles/pages/item/slideshow.scss';
import Logo from 'assets/images/logo/pure_logo.png';
import { useLocation, Link, Navigate } from "react-router-dom";
import getSymbolFromCurrency from 'currency-symbol-map'
import { getProductDetail, updateItem } from 'utilities/APIs.js';
import { MdOutlineLocalShipping, MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { InputNumber } from 'primereact/inputnumber';
import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';
import MenuContainer from 'containers/MenuContainer';
import {RiHeartFill, RiHeart3Line} from 'react-icons/ri';
import { StorageDataContext } from 'App';
import useEncryption from 'utilities/hooks/useEncryption';
import { useSelector, useDispatch } from "react-redux";
import {TriggerToast} from 'store/actions';
import {FiClock} from 'react-icons/fi';
import Countdown from 'react-countdown';


const StyledVariation = styled.a`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border: 1px solid ${({selected}) => selected? '#ff6600' : '#ddd'};   
    cursor: pointer;
    border-radius: 4px;
    padding: 10px;
    pointer-events: ${({unavailable}) => unavailable && 'none'};

    p {
        color: ${({unavailable}) => unavailable && '#d2d2d2'};
    }
`;

const SubmitBtn = styled.a`
    height: 40px;
    width: 150px;
    box-shadow: none;
    font-size: 14px;
    background-color: #ff6600;
    color: #fff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    pointer-events: ${({available}) => !available && 'none'};
    opacity: ${({available}) => !available? 0.3 : 1};
`

const AddWishListBtn = styled.a`
   margin-left: 20px;
   cursor: pointer;
   vertical-align: text-bottom;
   display: flex;
   align-items: center;
   pointer-events: ${({available}) => !available && 'none'};
   opacity: ${({available}) => !available? 0.3 : 1};

   .wishlist-empty-icon {
       margin-right: 8px;
       font-size: 20px;
       color: #6C6C6C;
   }

   .add {
       margin-top: 0;
       margin-bottom: 0;
       font-weight: 600;
       color: #6C6C6C;
   }

`

const AddedWishListBtn = styled.a`
    margin-left: 20px;
    cursor: pointer;
    vertical-align: text-bottom;
    display: flex;
    align-items: center;

    .wishlist-filled-icon {
        margin-right: 8px;
        font-size: 20px;
        color: #e40310;
    }

    .added {
        margin-top: 0;
        margin-bottom: 0;
        font-weight: 600;
        color: #e40310;
    }

`

const Item = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = useQuery();
    const [storageData, setStorageData] = useContext(StorageDataContext);
    const {decryptData} = useEncryption();
    const status = useSelector((state) => state.toast.status);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    
    const {uid, name} = location.state || {};
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(null);
    const [attachment, setAttachment] = useState(null);
    const [selection, setSelection] = useState({
        code: query.get('id'),
        variation_code: null,
        variation_quantity: 1,
        variation_max_quantity: 0,
    });

    useEffect(()=> {
        setLoading(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
        return getProductDetail(uid? uid : query.get('code'))
        .then(resp => {
            setItem(resp.data.data);
            setAttachment(() => {
                return (
                    resp.data.data.attachment.map((i,k) => {
                        return (
                            {
                                key: k,
                                original: i,
                                thumbnail: i,
                                originalWidth: '420',
                                thumbnailHeight: '62',
                                thumbnailHeight: '62',
                                originalClass: 'slide-box-img',
                                thumbnailClass: 'thumb-btn-img',
                                loading: 'lazy',
                            }
                        )
                    })
                )
            })
        }).finally(()=> setLoading(false))
    }, [query.get('code')])

    console.log(item);

    const addCart = () => {

        if (isLoggedIn) {
            return updateItem(
            JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token,{
                "item_code" : selection.variation_code,
                "item_quantity" : selection.variation_quantity
            }).then((resp) => {
                if (resp.status == 200) {
                    dispatch(TriggerToast(true, 'success', 'The item has been added into cart'));
                }
            }).catch(err => dispatch(TriggerToast(true, 'error', 'Please try again')))
        } else {
            dispatch(TriggerToast(true, 'info', 'Please login to access more features'));
        }

    }

    const renderer = (props) => {
        return (
            <div className="duration">
                <p className="time">{props.formatted.hours}</p>
                <p className="dot">:</p>
                <p className="time">{props.formatted.minutes}</p>
                <p className="dot">:</p>
                <p className="time">{props.formatted.seconds}</p>
            </div>
        )
    }

    return (
        <>
        <div className="__item">
            
            <div className="_overall-content">
                <div className="_item-details">
                    <Grid className="_item-container" container spacing={5}>
                        <Grid className="_item-col" item xs={12} sm={5} md={5} lg={4} xl={4}>
                            <div className="__slideshow">
                                {/* {
                                    attachment && (
                                        <ImageGallery items={attachment} thumbnailPosition={'bottom'} showFullscreenButton={false} showNav={false} showPlayButton={false} />
                                    )
                                } */}
                                <div className="product">
                                    <div className="serial-code">
                                        <p className="serial">Serial Code:</p>
                                        <p className="code">{item && item.code}</p>
                                    </div>
                                    <div className="product-hr" />
                                    <div className="info-list">
                                        <div className="info-detail">
                                            <div className="shipping">
                                                <MdOutlineLocalShipping />
                                                <p className="info">Supported Region</p>
                                            </div>
                                            <div className="location">
                                                {/* {
                                                    item && item.details.available_countries.map((i,k) => {
                                                        return (
                                                            <a className="place" key={k}>
                                                                <p>{i.name}</p>
                                                            </a>
                                                        )
                                                    })
                                                } */}
                                                <a className="place">
                                                    <p>包裹寄送暂仅限中国区域</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid className="_item-col" item xs={12} sm={7} md={7} lg={8} xl={8}>
                            <div className="__selection">

                                <div className="_selection-product">
                                    {/* <a href="#">
                                        <p>{sub_category? sub_category : (item && item.details.sub_category)}</p>
                                    </a> */}
                                    <h5 className="product">{name? name : (item && item.info.name)}</h5>
                                </div>
                                <div className="_selection-price">
                                    <div className="notice">
                                        <p className="title">Shocking Sales</p>
                                        <div className="countdown">
                                            <FiClock className="clock"></FiClock>
                                            <p className="ending">Ending in</p>
                                            <Countdown date={Date.now() + 500000} renderer={renderer} />
                                        </div>
                                    </div>
                                    <div className="descp">
                                        <div className="descp-container">
                                            <div className="descp-col">
                                                <div className="descp-box">
                                                    <p className="descp-mention">Price</p>
                                                </div>
                                                <div className="descp-price">
                                                    <div className="descp-ori-price">
                                                        <p className="descp-amount">{getSymbolFromCurrency(JSON.parse(localStorage.getItem("maishah_config")).currency)} {item && item.average_price}</p>
                                                    </div>
                                                    <div className="descp-disc-price">
                                                        <p className="descp-amount">{getSymbolFromCurrency(JSON.parse(localStorage.getItem("maishah_config")).currency)} {item && item.average_price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="descp-col">
                                                <div className="descp-box-alt">
                                                    <p className="descp-mention">Policy</p>
                                                </div>
                                                <div className="descp-col">
                                                    {
                                                        item && (item.details.policies.map((i,k)=> {
                                                            return (
                                                                <div key={k}>
                                                                    <p className="descp-advertise">
                                                                        {i.title}
                                                                    </p>
                                                                    {
                                                                        i.content && (
                                                                        <p className="descp-advertise">
                                                                            {i.content}
                                                                        </p>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }))
                                                    }
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <form className="_selection-choices">
                                    <div className="choice-type">
                                        <div className="para">
                                            <p className="text">Rating</p>
                                        </div>
                                        <div className="insert">
                                            <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                    <div className="choice-type">
                                        <div className="para">
                                            <p className="text">Description</p>
                                        </div>
                                        <div className="insert">
                                            <p className="info">{item && item.info.description}</p>
                                        </div>
                                    </div>
                                    <div className="choice-type">
                                        <div className="para">
                                            <p className="text">Quantity</p>
                                        </div>
                                        <div className="insert">
                                            <InputNumber className="quantity-input" inputId="stacked" min={1} value={1} max={selection.variation_max_quantity} onValueChange={(e) => setSelection({...selection, variation_quantity: e.target.value})}  showButtons disabled={isLoggedIn && selection.variation_code? false : true} required/>
                                            <p className="quantity-reminder">1件起售</p>
                                        </div>
                                    </div>
                                    <div className="choice-type">
                                        <div className="para">
                                        </div>
                                        <div className="insert">
                                            <SubmitBtn className="choice-btn" type="submit" variant="contained" onClick={()=> addCart()} available={isLoggedIn && selection.code && selection.variation_code? true : false}>Add to Cart</SubmitBtn>
                                            {/* <AddedWishListBtn available={isLoggedIn? true : false}>
                                                <MdOutlineFavorite className="wishlist-filled-icon" />
                                                <p className="added">Added To Wish List</p>
                                            </AddedWishListBtn> */}
                                            <AddWishListBtn available={isLoggedIn? true : false}>
                                                <MdOutlineFavoriteBorder className="wishlist-empty-icon" />
                                                <p className="add">Add To Wish List</p>
                                            </AddWishListBtn>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {/* <div className="_item-detail">
                    <div className="_item-detail-header">
                        <p className="txt">Related Products</p>
                    </div>
                    <div className="_item-detail-body">
                        <Grid className="item-related-container" container spacing={3}>
                            {
                                item && item.related_products.map((i,k) => {
                                    if (k < 4) 
                                    {
                                            return (
                                                <Grid className="_related-col" xs={12} sm={6} md={3} lg={3} xl={3} key={k} item>
                                                    <Link className="related-item" to={`/product?code=${i.code}`} state={{code: i.code, name: i.name, sub_category: i.sub_category}}>
                                                        <div className="related-img">
                                                            <Image src={i.cover_image} alt={i.name} />
                                                        </div>
                                                        <div className="related-name">
                                                            <p className="name">{i.name}</p>
                                                        </div>
                                                        <div className="related-price">
                                                            <p className="currency">{getSymbolFromCurrency(JSON.parse(localStorage.getItem("maishah_config")).currency)}</p>
                                                            <p className="price">{i.average_price}</p>
                                                        </div>
                                                    </Link>
                                                </Grid>
                                                )
                                        }
                                })
                            }
                        </Grid>
                    </div>
                </div> */}
                {/* <div className="_item-detail">
                    <div className="_item-detail-header">
                        <p className="txt">Product Details</p>
                    </div>
                    <div className="_item-detail-content" dangerouslySetInnerHTML={{ __html: item && item.details.content}} />
                </div> */}
                <div className="_item-detail">
                    <div className="_item-detail-header">
                        <p className="txt">Buyer Review</p>
                    </div>
                    <div className="_item-review-list">
                        <div className="review">
                            <div className="top">
                                <div className="profile">
                                    <p className="name">Oliver Queen</p>
                                </div>
                                <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                            </div>
                            <div className="bottom">
                                <p className="comment">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.
                                </p>
                            </div>
                        </div>
                        <div className="review">
                            <div className="top">
                                <div className="profile">
                                    <p className="name">Oliver Queen</p>
                                </div>
                                <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                            </div>
                            <div className="bottom">
                                <p className="comment">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque cumque.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    )
}

export default Item;