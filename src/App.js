import {createContext, useState, useLayoutEffect } from 'react';
import "./styles/inherit.scss";
import 'styles/components/footer.scss';
import Logo from 'assets/images/components/extranav/logo.png';
import { Link } from 'react-router-dom';
import PrivateRoute from 'utilities/PrivateRoute';
import NavContainer from 'containers/NavContainer';
import ToastContainer from 'containers/ToastContainer';
import LoginContainer from 'containers/LoginContainer';
import MenuContainer from 'containers/MenuContainer';
import UnionImg from 'assets/images/components/footer/unionpay.png';
import MasterImg from 'assets/images/components/footer/mastercard.png';
import VisaImg from 'assets/images/components/footer/visa.png';
import {Grid} from '@mui/material';
import { Route, Routes, useLocation } from "react-router-dom";
import useLocalStorage from 'utilities/hooks/useLocalStorage';
import i18n from 'utilities/localization/i18n';
import RouteList from "./path";

export const StorageDataContext = createContext(0);

export default function App() {
  const [storageData, setStorageData] = useLocalStorage('maishah' , null);

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <StorageDataContext.Provider value={[storageData, setStorageData]}>
        <NavContainer />
        <LoginContainer />
        <MenuContainer />
          <div className="content">
            <Routes>
              {RouteList.map((i, k) => {
                if (!i.protected) {
                  return (<Route key={k} path={i.path} element={<i.component />}/>)
                } else {
                  return (
                    <Route key={k} path={i.path} element={
                      <PrivateRoute>
                        <i.component />
                      </PrivateRoute>
                    } 
                      />
                  )
                }
                
              })}
            </Routes>
        </div>
      </StorageDataContext.Provider>
      <div className="__footer">
            <Grid className="_footer-container" container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className="_footer-col">
                <Link to="/" className="logo">
                  <img src={Logo} />
                </Link> 
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={4} className="_footer-col">
                <p className="footer-title">help</p>
                <div className="footer-links">
                  <Link to="/" className="footer-link"> 
                      <p className="footer-txt">
                        About Us
                      </p>
                  </Link> 
                  <Link to="/" className="footer-link"> 
                      <p className="footer-txt">
                        Privacy Policy
                      </p>
                  </Link> 
                  <Link to="/" className="footer-link"> 
                      <p className="footer-txt">
                        Terms & Conditions
                      </p>
                  </Link> 
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={4} className="_footer-col">
                <p className="footer-title">Sign up and save</p>
                <form className="footer-form">
                  <input className="footer-input" type="email" placeholder='Your Email'/>
                  <button className="footer-btn" type="submit">registration</button>
                </form>
                <p className="footer-subtitle">Stay up to date with news and promotions by signing up for our newsletter</p>
              </Grid>
            </Grid>
      </div>
      <div className="__highlight-footer"></div>
      <div className="__copyright">
        <div className="_terms">
          <p>&copy; 2021, Wellnes2u Group, All Rights Reserved.</p>
          <div className="_support">
            <img src={VisaImg} />
            <img src={MasterImg} />
            <img src={UnionImg} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
