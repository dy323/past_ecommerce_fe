import {Grid, ClickAwayListener} from '@mui/material';
import "styles/components/auto_suggest.scss";
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';

const AutoSuggest = ({suggestion, setSuggestion}) => {
    return (
        <ClickAwayListener onClickAway={()=> setSuggestion(null)}>
            <div className="_auto-suggestion">
                <Grid className="suggest-container" container spacing={2}>
                    {
                        suggestion.map((i,k) => {
                            return (
                                <Grid className="suggest-col" xs={12} sm={12} md={12} lg={12} xl={12} key={k} item>
                                    <Link to={`/product?code=${i.code}`} state={{code: i.code, name: i.name, sub_category: i.sub_category}}>
                                        {
                                            i.cover_image && (
                                                <img className="suggest-img" src={i.cover_image} />
                                            )
                                        }
                                        <div className="suggest-info">
                                            <p className="suggest-name">{i.info.name}</p>
                                            <div className="suggest-detail">
                                                <div className="suggest-price">
                                                    {
                                                        i.average_price && (
                                                                <p className="suggest-discount">$ {i.average_price}</p>
                                                        )
                                                    }
                                                    {
                                                        i.average_price && (
                                                            <p className="suggest-original">$ {i.average_price}</p>
                                                        )
                                                    }
                                                </div>
                                                <Rating className="suggest-rating" name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                            </div>
                                        </div>
                                    </Link>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </ClickAwayListener>
    )
}

export default AutoSuggest;