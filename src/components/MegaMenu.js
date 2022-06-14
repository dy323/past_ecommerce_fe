import "styles/components/mega_menu.scss";
import {Grid} from '@mui/material'; 
import { Link } from 'react-router-dom';

const MegaMenu = ({presentation, target}) => {

    return (
        <div className="_mega-menu">
          <div className="mega-content">
            <p className="mega-header">Categories</p>
            {
              target.section == 'category' && (
                <Grid container spacing={3} className="mega-container">
                  {
                    presentation.category && presentation.category.map((i,k) => {
                      return (
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} className="mega-col" key={k}>
                          <Link className="main-link" to={{
                            pathname: '/search/product',
                            search: `?query=&category=${i.code}&min=&max=&rating=&term=&type=&page=1`,
                            state: {area: i.code}
                          }}>
                              <h4 className="mega-title">{i.name}</h4>
                          </Link>
                        </Grid>
                      )
                    })
                  }

                </Grid>
              )
            }
          </div>
        </div>
    )
}

export default MegaMenu;