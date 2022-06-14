import {Grid, ClickAwayListener} from '@mui/material';
import "styles/components/auto_suggest.scss";
import { Link } from 'react-router-dom';

const NoFoundSuggest = ({unattainable, setUnattainable}) => {
    return (
        <ClickAwayListener onClickAway={()=> setUnattainable(null)}>
            <div className="_auto-suggestion">
                <Grid className="suggest-container" container spacing={2}>
                    <Grid className="suggest-col-no" xs={12} sm={12} md={12} lg={12} xl={12} item>
                        <p className="nofound">{unattainable}</p>
                        <div className="suggest-search">
                            <p className="suggest-word">Maybe you will be interested</p>
                            <div className="suggest-terms">
                                <Link to={'#'} className="suggest-which">
                                    <p className="suggest-term">Safety Devices</p>
                                </Link>
                                <Link to={'#'} className="suggest-which">
                                    <p className="suggest-term">Surgical Gloves</p>
                                </Link>
                                <Link to={'#'} className="suggest-which">
                                    <p className="suggest-term">Covid 19 Antigen Rapid Test Home Test Kit</p>
                                </Link>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </ClickAwayListener>
    )
}

export default NoFoundSuggest;