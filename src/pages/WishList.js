import Logo from 'assets/images/logo/pure_logo.png';
import {useEffect, useState, useContext} from 'react';
import moment from 'moment';
import { StorageDataContext } from 'App';
import {Grid, Card, CardMedia, CardHeader, CardContent, Typography, FormHelperText, Pagination} from '@mui/material';
import Image from 'components/Image';
import useEncryption from 'utilities/hooks/useEncryption';
import {RiHeartFill, RiHeart3Line} from 'react-icons/ri';
import {MdSearch} from 'react-icons/md';
import {getOrders} from 'utilities/APIs';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import useQuery from 'utilities/hooks/useQuery';
import "styles/profile.scss";
import "styles/wishlist.scss";
import '../../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';
import '../../node_modules/primereact/resources/primereact.min.css';
import '../../node_modules/primeicons/primeicons.css';


const WishList = () => {
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
        product: [],
        page: query.get('page'),
        maxPage: 1,
    })

    useEffect(() => {

        navigate({
            pathname: '/wishlist',
            search: `?page=${info.page}`
        })

        return getOrders(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {"page": info.page})
            .then((resp) => {
                setInfo ({
                    ...info,
                    product: [
                        ...resp.data.data
                    ],
                    maxPage: resp.data.meta.last_page
                })
            })

    }, [info.page]); 

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
                        <p className="title">Wish List</p>
                    </div>
                    <div className="wish-list">
                        <Grid container className="payment-item" spacing={3}>
                            <Grid className="payment-col" xs={12} sm={6} md={4} lg={4} xl={4} item>
                                <Card className="payment-card">
                                    <a onClick={()=> console.log('hi')} className="list-wishlist">
                                        <RiHeartFill />
                                    </a>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={'https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/Apple_iPhone_14_fanmade_renders.jpg'}
                                        alt="Maishah"
                                    />
                                    <div className="item-descp">
                                        <CardHeader
                                            title={'abc'}
                                            subheader={'abcd'}
                                        />
                                        <CardContent className="item-descp">
                                            <Link className="access" to="/">
                                                <MdSearch />
                                            </Link>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                    <Pagination count={info.maxPage} page={parseInt(info.page)} onChange={(e,v)=> setInfo({...info, page: v})} showFirstButton showLastButton />
                </div>
            </div>
        </div>
    );
}

export default WishList;