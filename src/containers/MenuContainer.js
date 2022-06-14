import {useState, useEffect} from 'react';
import ExtraNav from 'components/ExtraNav';
import MegaMenu from 'components/MegaMenu';
import SearchPanel from "components/SearchPanel";
import AutoSuggest from 'components/AutoSuggest';
import NoFoundSuggest from 'components/NoFoundSuggest';
import { throttle } from 'throttle-debounce';
import { getAllCategory } from "utilities/APIs";
import {ClickAwayListener, Grid} from '@mui/material';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import {Link, useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {getProducts} from 'utilities/APIs';
import NewProduct from 'assets/images/components/topbar/new.png';
import DiscountProduct from 'assets/images/components/topbar/discount.png';
import { useDispatch } from "react-redux";
import { FetchCategory } from 'store/actions';

const StyledOverallMenu = styled.div`
  visibility: ${({active}) => active ? 'visible' : 'hidden'};
  opacity: ${({active}) => active ? '1' : '0'};
  z-index: ${({active}) => active ? '10' : '-1'};
  transform: ${({active}) => active ? 'translateY(0%)' : 'translateY(-2em)'}; 
  transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
  transition-delay: ${({active}) => active && '0s, 0s, 0.3s'};
  position: absolute;
  top: 75px;
  width: 100%;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  transition: all 0.5s ease;
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`

const StyledOuterDiv = styled.div`
   position: relative;
   margin-bottom: 15px;
`

const useStyles = makeStyles({
    categoryContainer: {
        background: ({trigger}) => trigger
    }
})

const MenuContainer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [suggestion, setSuggestion] = useState(null);
    const [unattainable, setUnattainable] = useState(null);
    const [query, setQuery] = useState(null);
    let [target, setTarget] = useState({
        section: null,
        category_id: null,
        category_sub_id: null,
    });
    
    let [presentation, setPresentation] = useState({
        category: null,
        promotion: null,
    })

    useEffect(()=> {
        getAllCategory()
        .then((resp)=> {
            setPresentation({...presentation, category: resp.data.data})
            dispatch(FetchCategory(resp.data.data))
        })
    }, [])

    const fetchCategory = throttle (3000, (e)=> {
        setTarget({...target, section: e});
        setSuggestion(null);

        switch (e) {
            case 'category':
                break;
            case 'promotion':
                break;
            default:
                break;
        }

        return false;

    })

    const closeAll = () => {
        return setTarget({...target, section: null});
    }

    const props = {
        trigger: target.section? '#fff' : '#fff',
    }

    const classes = useStyles(props);

    function manual() {
        if (query) {
            return navigate({
                pathname: `/search/product`,
                search: `?query=${query}&category=&min=&max=&page=1`,
                state: {title: query}
            })
        }
    }

    function auto(val) {      
        closeAll();
        setSuggestion(null);
        setUnattainable(null);

        if (val) {
            setQuery(val);
            getProducts({
                search_query: val,
                price_range: null,
                category_code: null,
                page: null,
            })
            .then ((resp) => {
                if (resp.data.data.length > 0) {
                    setSuggestion(resp.data.data);
                } else{
                    setUnattainable('No Product Found');
                }
            })
        } else {
            setQuery(null);
        }

    }

    useEffect(()=> {
        setSuggestion(null);
        setUnattainable(null);
        closeAll();
    }, [location.pathname])

    return (
        <ClickAwayListener onClickAway={()=> closeAll()}>
            <StyledOuterDiv className="_menu-outer">
                <div className="_menu-container">
                    <Grid container className={classes.categoryContainer} spacing={3}>
                        <ExtraNav fetchCategory={(e)=> fetchCategory(e)} target={target} closeAll={()=> closeAll()} closeSuggestion={()=> setSuggestion(false)}/>
                        <Grid className="col center" xs={12} sm={12} md={8} lg={4} item>
                            <SearchPanel auto={(e) => auto(e)} manual={() => manual()} setQuery={(e) => setQuery(e)} target={target} closeAll={()=> closeAll()} />
                            {
                                suggestion && (
                                    <AutoSuggest setSuggestion={(e) => setSuggestion(e)} suggestion={suggestion} />
                                )
                            }
                            {
                                unattainable && (
                                    <NoFoundSuggest setUnattainable={(e)=> setUnattainable(e)} unattainable={unattainable} />
                                )
                            }
                        </Grid>
                        <Grid className="col separate" xs={12} sm={12} md={12} lg={4} item>
                            <Link to={'#'} className="link-to arrival">
                                <img src={NewProduct} className="link-arrival-icon" />
                                <p className="link-txt new">Latest Products</p>
                            </Link>
                            <Link to={'#'} className="link-to arrival">
                                <img src={DiscountProduct} className="link-arrival-icon" />
                                <p className="link-txt arrival">Special Deal</p>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                <StyledOverallMenu active={target.section ? true : false}>
                    <MegaMenu presentation={presentation} target={target}/>
                </StyledOverallMenu>
           </StyledOuterDiv>
        </ClickAwayListener>
    )
}

export default MenuContainer;