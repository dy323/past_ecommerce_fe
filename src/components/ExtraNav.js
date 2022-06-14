import "styles/components/extra_nav.scss";
import {Grid } from '@mui/material';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import Image from 'components/Image';
import LogoImg from 'assets/images/components/extranav/logo.png';

const StyledMenu = styled.a`

    .icon {
        transform: ${({active}) => active && 'rotate(180deg)'};
        color: ${({active}) => active ? '#78c4cd' : '#fff'} !important;
    }

    .txt {
        color: ${({active}) => active && '#78c4cd'} !important;
    }

`

const ExtraNav = ({fetchCategory, target, closeAll, closeSuggestion}) => {

    const backToHome = () => {
        closeAll();
        return closeSuggestion();
    }

    return (
        <>
            <Grid className="col" xs={5} sm={5} md={2} lg={2} item>
                <Link className="logo-link" to="/" onClick={()=> backToHome()}>
                    <Image src={LogoImg} alt={'Wellnes2u'} />
                </Link>
            </Grid>
            <Grid className="col category" xs={7} sm={7} md={2} lg={2} item>
                <StyledMenu className="toward" onClick={()=> !target.section? fetchCategory('category') : closeAll()} active={target.section? true : false}>
                    <p className="txt">Categories</p>
                    <ExpandLessOutlinedIcon className="icon" fontSize={'medium'} />
                </StyledMenu>
            </Grid>
        </>
    )
}

export default ExtraNav;