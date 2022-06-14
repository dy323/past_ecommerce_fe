import {useLocation, useNavigate} from 'react-router-dom';
import ShowCase from 'components/ShowCase';
import AdvertiseCase from 'components/AdvertiseCase';
import "styles/pages/seek/seek.scss";
import "styles/pages/seek/filter.scss";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useQuery from 'utilities/hooks/useQuery';
import {getProducts, getAllCategoryandSubCategory, getSimilarProduct} from 'utilities/APIs';
import {FiChevronUp} from 'react-icons/fi';
import {Grid, Pagination, PaginationItem, Collapse, Checkbox, FormControlLabel} from '@mui/material'; 
import Logo from 'assets/images/logo/pure_logo.png';
import Image from 'components/Image';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../node_modules/axios/index';
import { DebounceInput } from 'react-debounce-input';

const Seek = () => {
    const query = useQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const {title, area}= location.state || {};
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({
        result: null,
        similar: null,
    });
    const [category, setCategory] = useState({
        overallCategory: null,
        selectedSubCategory: null,
    });

    const [option, setOption] = useState({
        minPrice: query.get('min') == ''? '' : query.get('min'),
        maxPrice: query.get('max') == ''? '' : query.get('max'),
        rating: query.get('rating') == ''? '' : query.get('rating'),
        type: query.get('type') == ''? '' : query.get('type'),
        term: title? title : (query.get('query') == ''? '' : query.get('query')),
        page: query.get('page')? query.get('page') : "",
        totalPage: 1,
        activeCategory: area? area : (query.get('category') == ''? '' : query.get('category')),
    });

    const [expanded, setExpanded] = useState(false);

    useEffect(()=> {
        navigate({
            pathname: '/search/product',
            search: `?query=${option.term}&category=${option.activeCategory}&min=${option.minPrice}&max=${option.maxPrice}&type=${option.type}&rating=${option.rating}&page=${option.page}`
        })

        axios.all([
            getProducts({
                "search_query": option.activeCategory? "" : option.term,
                "category_code": option.activeCategory,
            })
        ]).then(axios.spread((productData) => {
            setProduct({...product, result: productData.data.data});
            setOption({...option, totalPage: productData.data.meta.last_page})
        })).finally(()=> {
            setLoading(false);
            setExpanded(false);
        });

    }, [
        option.activeCategory, 
        option.minPrice, 
        option.maxPrice,
        option.type,
        option.rating,
        option.page,
    ])

    const ChevronHOC = styled.div`
        transform: rotate(0deg);
        overflow: hidden;
        transition: all 0.3s ease-out;
        ${({expanded}) => expanded ? `transform: rotate(180deg)` : `transform: rotate(360deg)`}
    `;

    const StyledCategoryLink = styled.a`
        p {
            color: ${({active}) => active ? '#ff6600' : '#000'}
        }
    `

    console.log(option);

    return (
        <>
        <div className="___seek">
            
            <Grid className="_seek-container" container spacing={4}>
                <Grid className="_seek-col" item lg={9}>
                    <div className="__filter">
                        <div className="_filter-search">
                            <h5>You are searching</h5>
                            <h5>Item</h5>
                        </div>
                        <div className="_filter-guide">
                            <p>Filter Categories</p>
                            <a onClick={()=> setExpanded(!expanded)}>
                                <span>{expanded? 'Collapse' : 'Expand'}</span>
                                <ChevronHOC expanded={expanded}>
                                    <FiChevronUp />
                                </ChevronHOC>
                            </a>
                        </div>
                        <Collapse in={expanded}>
                            {/* <div className="_filter-box">
                                <div className="_filter-category-box">
                                    <div className="_filter-category">
                                        <p>Category</p>
                                    </div>
                                    <div className="_filter-category-list">
                                        <Grid container spacing={1}>
                                            {
                                                category.overallCategory && category.overallCategory.map((i,k) => {
                                                    return (
                                                        <Grid className="_filter-category-col" xs={6} sm={4} md={3} lg={3} xl={3} key={k} item>
                                                            <StyledCategoryLink onClick={()=> console.log(i.code)} active={option.activeCategory ? (i.code == option.activeCategory? true : false) : false}>
                                                                <p>{i.name}</p>
                                                            </StyledCategoryLink>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </div>
                                </div>
                            </div> */}
                            <div className="_filter-criteria">
                                <Grid container className="_criteria-container">
                                    <Grid xl={4} className="_criteria-col">
                                        <p className="_criteria-title">Range</p>
                                        <form className="_criteria-inputs">
                                            <DebounceInput className="range-input" type="number" placeholder="min" minLength={1} debounceTimeout={1500} onChange={(e)=> setOption({...option, minPrice: e.target.value, page: '1'})} value={option.minPrice} />
                                            <span className="range-divider">-</span>
                                            <DebounceInput className="range-input" type="number" placeholder="max" minLength={1} debounceTimeout={1500} onChange={(e)=> setOption({...option, maxPrice: e.target.value, page: '1'})} value={option.maxPrice}/>
                                        </form>
                                    </Grid>
                                    <Grid xl={8} className="_criteria-col">
                                        <p className="_criteria-title">Product Type</p>
                                        <form className="_criteria-inputs">
                                            <FormControlLabel className="type-control" control={<Checkbox className="type-different" sx={{
                                                color: '#ff6600',
                                                '&.Mui-checked': {
                                                color: '#ff6600',
                                                },
                                            }} defaultChecked />} label="New" />
                                            <FormControlLabel className="type-control" control={<Checkbox className="type-different" sx={{
                                                color: '#ff6600',
                                                '&.Mui-checked': {
                                                color: '#ff6600',
                                                },
                                            }} defaultChecked />} label="Hot" />
                                            <FormControlLabel className="type-control" control={<Checkbox className="type-different" sx={{
                                                color: '#ff6600',
                                                '&.Mui-checked': {
                                                color: '#ff6600',
                                                },
                                            }} defaultChecked />} label="Free Shipping" />
                                            <FormControlLabel className="type-control" control={<Checkbox className="type-different" sx={{
                                                color: '#ff6600',
                                                '&.Mui-checked': {
                                                color: '#ff6600',
                                                },
                                            }} defaultChecked />} label="Discount" />
                                        </form>
                                    </Grid>
                                </Grid>
                            </div>
                        </Collapse>
                    </div>
                    
                    <Grid container className="__list-container" spacing={1}>
                        {product.result && product.result.map((i,k) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className="_list-col" key={k}>
                                    <ShowCase product={i} setOption={(e)=> setOption(e)} option={option} />
                                </Grid>
                            )
                        })}

                        {
                            product.result && product.result.length == 0 && (
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} className="_list-col">
                                    <h3 className="unavailable-msg">No Product</h3>
                                </Grid>
                            )
                        }
                    </Grid>

                </Grid>
                {/* <Grid className="_seek-col" item lg={3}>
                    
                    <div className="__advertise-top" />
                    <div className="__advertise-points">
                        <div className="_advertise-search">
                            <h5>Similiar Category</h5>
                        </div>
                        <div className="_advertise-section">
                            {
                                product.similar && product.similar.map((i,k)=> {
                                    if (k < 3) {
                                        return (
                                            <AdvertiseCase data={i} key={k} />
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>

                </Grid> */}
            </Grid>
        </div>
        <Pagination
            className="__pagination"
            count={option.totalPage}
            page={parseInt(option.page)}
            onChange={(e,p) => setOption({...option, page: p})}
            renderItem={(item) => (
            <PaginationItem
                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
            />
            )}
        />
        <div className="_hr" />
        </>
    )
}

export default Seek;