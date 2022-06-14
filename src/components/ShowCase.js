import Image from 'components/Image';
import { Link } from 'react-router-dom';
import {BsShopWindow} from 'react-icons/bs';
import {RiHeartFill, RiHeart3Line} from 'react-icons/ri';
import Countdown from 'react-countdown';
import Rating from '@mui/material/Rating';
import getSymbolFromCurrency from 'currency-symbol-map'
import 'styles/pages/seek/list.scss';

const ShowCase = ({product, setOption, option}) => {

    const renderer = (props) => {
        return (
            <div className="time-remaining">
                <span className="time-display">{props.formatted.hours}</span>
                <span className="time-dot">:</span>
                <span className="time-display">{props.formatted.minutes}</span>
                <span className="time-dot">:</span>
                <span className="time-display">{props.formatted.seconds}</span>
            </div>
        )
    }

    return (
        <div className="list-product">
            <Link 
            className="list-img"
            to={{
                pathname: `/product`,
                search: `?code=${product.id}`,
                state: {
                    uid: product.id,
                    name: product.info.name
                }
            }}
            >
                <Image src={product.cover_image} alt={'Maishah'} />
                <div className="list-view">
                    <p>浏览此物品</p>
                </div>
                <div className="list-sales">
                    <p className="banner">- 10% Off</p>
                </div>
                <div className="list-ribbon">
                    <span>New</span>
                </div>
            </Link>
            <div className="list-descp">

                <div className="list-counter">
                    <p className="counter">Promotion Ended:</p>
                    <Countdown date={Date.now() + 500000} renderer={renderer} />
                </div>

                <div className="list-promo">
                    <div className="list-promo-info">
                        <span>Free Shipping</span>
                    </div>
                    <div className="list-promo-info">
                        <span>Free Shipping</span>
                    </div>
                </div>

                <div className="list-info">
                    <div className="list-price">
                        <p>{getSymbolFromCurrency(JSON.parse(localStorage.getItem("maishah_config")).currency)}</p>
                        <p>{product.average_price}</p>
                    </div>
                    <div className="list-price">
                        <p>{getSymbolFromCurrency(JSON.parse(localStorage.getItem("maishah_config")).currency)}</p>
                        <p>{product.average_price}</p>
                    </div>
                </div>
                {
                    product && product.categories.map((i,k) => {
                        if (k<1) {
                            return (
                                <Link 
                                className="list-store"
                                key={k}
                                to={{
                                    pathname: '/search/product',
                                    search: `?query=&category=${i.code}&min=&max=&rating=&term=&type=&page=1`,
                                    state: {area: i.code}
                                }}
                                onClick={()=> setOption({...option, activeCategory: i.code})}
                                >
                                    <BsShopWindow />
                                    <span className="store-name" key={k}>{i.name}</span>
                                </Link>
                            )
                        }
                    })
                }
                <p className="list-para">
                    {product.info.name}
                </p>
                <div className="list-shop">
                    <div className="list-wishlist">
                        {/* <RiHeartFill /> */}
                        <RiHeart3Line />
                    </div>
                    <div className="list-review">
                        <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <p className="rating-txt">0 Sold</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCase;