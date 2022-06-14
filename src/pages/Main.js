import React, {useEffect, useState, useRef} from 'react';
import "styles/main.scss";
import 'styles/components/guarantee.scss';
import Image from 'components/Image';
import {Grid, Paper, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { getHomePage } from "utilities/APIs";
import axios from '../../node_modules/axios/index';
import { Link } from 'react-router-dom';
import getSymbolFromCurrency from 'currency-symbol-map'
import Countdown from 'react-countdown';
import {AiOutlineQuestionCircle} from 'react-icons/ai';
import banner1 from 'assets/images/homepage/slider/banner.jpg';
import banner2 from 'assets/images/homepage/slider/banner2.png';
import FeatureImg from 'assets/images/homepage/tab/feature.png';
import BestImg from 'assets/images/homepage/tab/best.png';
import SaleImg from 'assets/images/homepage/tab/sale.png';
import SecureImg from 'assets/images/homepage/guarantee/secure.png';
import SatisfiedImg from 'assets/images/homepage/guarantee/satisfied.png';
import QualityImg from 'assets/images/homepage/guarantee/quality.png';
import MinimumImg from 'assets/images/homepage/guarantee/minimum.png';
import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';
import ProductDisplay from 'components/ProductDisplay';
import Rating from '@mui/material/Rating';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useQuery from 'utilities/hooks/useQuery';
import { useSelector } from "react-redux";

const Main = () => {
    const query = useQuery();
    const category = useSelector((state) => state.data.category)
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [largeBanner, setLargeBanner] = useState([
        {
            img: banner1
        },
        {
            img: banner2
        }
    ])
    const [advertiseImg, setAdvertiseImg] = useState([
        {
            img: 'https://advertisingrow.com/wp-content/uploads/2018/06/Print-Advertising-Motivo-da-escolha-Humor-A-nova-lata-da-Coca-Cola-com-alongada-em-compara%C3%A7%C3%A3o.jpg'
        },
        {
            img: 'https://c8.alamy.com/comp/JAA2HR/an-advert-for-oxydol-detergent-it-appeared-in-a-magazine-published-JAA2HR.jpg'
        }
    ])

    useEffect(()=> {
        axios.all([getHomePage()])
        .then(axios.spread((productData) => {
            setProduct(productData.data.data);
        }))
        .finally(()=> {
            setLoading(false);
        });
    },[]);

    console.log(product);

    return (
        <div className="__main">
            <div className="__main-page">
                <div className="_notice">
                    <p className="_notice-words">Get 5% off your first purchase with minimum order S$80 , enter discount code NEWLIFE5 at checkout!</p>
                </div>
                <Grid className="__main-container" container spacing={3}>
                    <Grid className="__main-col category" xs={12} sm={12} md={3} lg={2} xl={2} item>
                        <div className="_advertise-column">
                            <div className="_advertise-title">
                                <p className="title">shop by categories</p>
                            </div>
                            <div className="_advertise-content">
                                {
                                    category && category.map((i,k)=> {
                                        return (
                                            <Link 
                                            className="_advertise-category" 
                                            key={k}
                                            to={{
                                                pathname: '/search/product',
                                                search: `?query=&category=${i.code}&min=&max=&rating=&term=&type=&page=1`,
                                                state: {area: i.code}
                                            }}>
                                                <p className="category">{i.name}</p>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="_advertise-column">
                            <div className="_advertise-title">
                                <p className="title">Latest Product</p>
                            </div>
                            <div className="_advertise-content">
                                {
                                    product && product.latest.map((i,k) => {
                                        if (k<6) {
                                            return (
                                                <Link 
                                                className="advertise-product"
                                                key={k}
                                                to={{
                                                    pathname: `/product`,
                                                    search: `?code=${i.id}`,
                                                    state: {
                                                        uid: i.id,
                                                        name: i.info.name
                                                    }
                                                }}
                                                >
                                                    <div className="advertise-img">
                                                        <Image src={i.cover_image} alt={'HealthCare'} />
                                                    </div>
                                                    <div className="advertise-info">
                                                        <p className="advertise-name">{i.info.name}</p>
                                                        <div className="advertise-cost">
                                                            <p className="actual-price">$ {i.average_price}</p>
                                                            {/* <p className="discount-price">$ {i.average_price}</p> */}
                                                        </div>
                                                        <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} size={'medium'} readOnly />
                                                    </div>
                                                </Link>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </Grid>
                    <Grid className="__main-col slide" xs={12} sm={12} md={9} lg={8} xl={8} item>
                        <div className="__categories-ad">
                            <Carousel>
                                {
                                    largeBanner.map((i,k)=> {
                                        return (
                                            <Paper className="_banner-img" key={k}>
                                                <Image src={i.img} alt={'HealthCare'} />
                                            </Paper>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                        <div className="categorize">
                            <Grid className="tab-container" container spacing={3}>
                                <Grid className="tab-col" xs={12} sm={4} md={4} lg={4} item>
                                    <Link to={'/'} className="tab-clickable">
                                        <div className="tab-img-box">
                                                <img className="tab-image" src={FeatureImg} alt={'healthcare'} />
                                        </div>
                                        <div className="tab-content">
                                            <h5 className="tab-title">Featured</h5>
                                            <p className="tab-subtitle">this month</p>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid className="tab-col" xs={12} sm={4} md={4} lg={4} item>
                                    <Link to={'/'} className="tab-clickable">
                                        <div className="tab-img-box">
                                                <img className="tab-image" src={BestImg} alt={'healthcare'} />
                                        </div>
                                        <div className="tab-content">
                                            <h5 className="tab-title">Bestsellers</h5>
                                            <p className="tab-subtitle">this month</p>
                                        </div>
                                    </Link>
                                </Grid>
                                <Grid className="tab-col" xs={12} sm={4} md={4} lg={4} item>
                                    <Link to={'/'} className="tab-clickable">
                                        <div className="tab-img-box">
                                                <img className="tab-image" src={SaleImg} alt={'healthcare'} />
                                        </div>
                                        <div className="tab-content">
                                            <h5 className="tab-title">On Sale</h5>
                                            <p className="tab-subtitle">this month</p>
                                        </div>
                                    </Link>
                                </Grid>
                            </Grid>

                            <div className="tab-products">
                                <div className="tab-title">
                                    <p className="tab-header">Featured</p>
                                </div>
                                <div className="tab-list">
                                    <Grid className="tab-grid" container spacing={3}>
                                        {
                                            product && product.featured_product.map((i,k) => {
                                                return (
                                                    <Grid className="tab-col" xs={6} sm={6} md={4} lg={4} xl={4} key={k} item>
                                                        <ProductDisplay product={i} />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid className="__main-col best" xs={12} sm={12} md={12} lg={2} xl={2} item>
                        <div className="_advertise-column">
                            <div className="_advertise-title">
                                <p className="title">Bestsellers</p>
                            </div>
                            <div className="_advertise-content">
                                {
                                    product && product.best_seller.map((i,k) => {
                                        if (k<6) {
                                            return (
                                                <Link 
                                                className="advertise-product"
                                                key={k}
                                                to={{
                                                    pathname: `/product`,
                                                    search: `?code=${i.id}`,
                                                    state: {
                                                        uid: i.id,
                                                        name: i.info.name
                                                    }
                                                }}
                                                >
                                                    <div className="advertise-img">
                                                        <Image src={i.cover_image} alt={'HealthCare'} />
                                                    </div>
                                                    <div className="advertise-info">
                                                        <p className="advertise-name">{i.info.name}</p>
                                                        <div className="advertise-cost">
                                                            <p className="actual-price">$ {i.average_price}</p>
                                                            {/* <p className="discount-price">$ {i.average_price}</p> */}
                                                        </div>
                                                        <Rating className="list-icons" name="half-rating-read" defaultValue={2.5} precision={0.5} size={'medium'} readOnly />
                                                    </div>
                                                </Link>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className="_advertise-banner">
                            <Carousel indicators={false}>
                                {
                                    advertiseImg.map((i,k) => {
                                        return (
                                            <Paper className="_advertise-intro" key={k}>
                                                <img src={i.img} alt={'HealthCare'} />
                                            </Paper>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Grid className="__guarantee" container spacing={3}>
                <Grid className="_guarantee-col" item xs={3} sm={3} md={3} lg={3}>
                    <img className="guarantee-img" src={SatisfiedImg} />
                    <p className="guarantee-txt">Satisfied or refunded</p>
                </Grid>
                <Grid className="_guarantee-col" item xs={3} sm={3} md={3} lg={3}>
                    <img className="guarantee-img" src={MinimumImg} />
                    <p className="guarantee-txt">Minimum 48H shipping of products in stock</p>
                </Grid>
                <Grid className="_guarantee-col" item xs={3} sm={3} md={3} lg={3}>
                    <img className="guarantee-img" src={QualityImg} />
                    <p className="guarantee-txt">Quality Packaging</p>
                </Grid>
                <Grid className="_guarantee-col" item xs={3} sm={3} md={3} lg={3}>
                    <img className="guarantee-img" src={SecureImg} />
                    <p className="guarantee-txt">Payment Secure</p>
                </Grid>
            </Grid>
        </div>
    )
}

export default Main;