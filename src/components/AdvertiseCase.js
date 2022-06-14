import "styles/pages/seek/advertise.scss";
import Image from 'components/Image';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import {RiHeartFill, RiHeart3Line} from 'react-icons/ri';
import getSymbolFromCurrency from 'currency-symbol-map'
import Rating from '@mui/material/Rating';

const AdvertiseCase = ({data}) => {

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
        <Link className="_advertise-product" to={`/product?code=${data.code}`} state={{code: data.code, name: data.name, sub_category: data.sub_category}}>
            <div className="advertise-img">
                <Image src={data.cover_image} alt={'Maishah'} />
                <div className="list-wishlist">
                    {/* <RiHeartFill /> */}
                    <RiHeart3Line />
                </div>
                <div className="list-sales">
                    <p className="banner">- 10% Off</p>
                </div>
            </div>
            <div className="advertise-descp">

                <div className="list-counter">
                    <p className="counter">Promotion Ended:</p>
                    <Countdown date={Date.now() + 500000} renderer={renderer} />
                </div>

                <div className="list-promo">
                    <div className="list-promo-info">
                        <span>New</span>
                    </div>
                    <div className="list-promo-info">
                        <span>Free Shipping</span>
                    </div>
                </div>

                <p className="name">{data.name}</p>
                <div className="info">
                    <div className="list-info">
                        <div className="list-price">
                            <p>{getSymbolFromCurrency(JSON.parse(localStorage.getItem("maishah_config")).currency)}</p>
                            <p>{data.average_price}</p>
                        </div>
                        <div className="list-price">
                            <p>{getSymbolFromCurrency(JSON.parse(localStorage.getItem("maishah_config")).currency)}</p>
                            <p>{data.average_price}</p>
                        </div>
                    </div>

                    <div className="list-review">
                        <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <p className="rating-txt">0 Sold</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AdvertiseCase;