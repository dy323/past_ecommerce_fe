import 'styles/components/product_display.scss';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import {RiHeartFill, RiHeart3Line, AiOutlineShoppingCart} from 'react-icons/ri';
import Countdown from 'react-countdown';
import {Grid} from '@mui/material';
import Image from 'components/Image';
import getSymbolFromCurrency from 'currency-symbol-map'

const ProductDisplay = ({product}) => {

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
        <div className="product-display">
            <div className="list-sales">
                <p className="banner">- 10% Off</p>
            </div>
            <div className="list-ribbon">
                <span>New</span>
            </div>

            <div className="info">
                <Link 
                className="img"
                to={{
                    pathname: `/product`,
                    search: `?code=${product && product.id}`,
                    state: {
                        uid: product && product.id,
                        name: product && product.info.name
                    }
                }}
                >
                    <Image src={product && product.cover_image} alt={'healthcare'} />
                    <div className="list-view">
                        <p>浏览此物品</p>
                    </div>
                </Link>
                <div className="bg">
                    <div className="list-counter">
                        <p className="counter">Promotion Ended:</p>
                        <Countdown date={Date.now() + 53303000} renderer={renderer} />
                    </div>
                    <div className="name-list">
                        {
                            product && product.categories.map((a,k)=> {
                                if (k<1) {
                                    return (
                                        <Link 
                                        className="name-go" 
                                        key={k}
                                        to={{
                                            pathname: '/search/product',
                                            search: `?query=&category=${a.code}&min=&max=&rating=&term=&type=&page=1`,
                                            state: {area: a.code}
                                        }}
                                        >
                                            <p className="name">{a.name}</p>
                                        </Link>
                                    )
                                }
                            })
                        }
                    </div>
                    <div className="detail">
                        <div className="subinfo">
                            <p className="category">{product && product.info.name}</p>
                        </div>
                        <div className="list-review">
                            <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} size={'medium'} readOnly />
                        </div>
                    </div>
                </div>
            </div>
            <div className="operation">
                <Grid className="operation-grid" container spacing={2}>
                    <Grid className="operation-col" xs={12} sm={12} md={6} lg={6} xl={6} item>
                        <p className="operation-disc">$ {product && product.average_price}</p>
                        {/* <p className="operation-amt">$ 70.00</p> */}
                    </Grid>
                    <Grid className="operation-col" xs={12} sm={12} md={6} lg={6} xl={6} item>
                        <div className="list-wishlist">
                            {/* <RiHeartFill /> */}
                            <RiHeart3Line />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ProductDisplay;