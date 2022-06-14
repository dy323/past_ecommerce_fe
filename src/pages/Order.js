import {useEffect, useContext, useState} from "react";
import { StorageDataContext } from 'App';
import "../styles/order.scss";
import {TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table, Stepper, Step, StepLabel } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import useEncryption from 'utilities/hooks/useEncryption';
import moment from 'moment';
import {getOrderDetail} from 'utilities/APIs';
import useQuery from 'utilities/hooks/useQuery';

const Order = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const {decryptData} = useEncryption();
  const [storageData, setStorageData] = useContext(StorageDataContext);
  const {transaction, bg} = location.state || {};
  const [detail, setDetail] = useState(bg? bg : null);

  useEffect(()=> {
      if (!detail) {
          console.log('hi');
        return (
            getOrderDetail(JSON.parse(decryptData(storageData, 'maishah123')).maishah_access_token, {
                order_id: transaction? transaction : query.get('transaction')
            }).then((resp)=> setDetail(resp.data.data))
        )
      }
  }, [])

  return (
      <div className="__completion">

        {
            bg && (
                <div className="guide">
                <h3>Thank you for your order!</h3>
                <p>
                    Your order #34VB554SJ112L has been placed and will be processed as soon as
                    possible.
                </p>
                </div>
            )
        }

        {
            query.get('transaction') && detail && !bg && (
                <div className="guide">
                    <h3>Order Status</h3>
                    <p>
                        #{detail.id}
                    </p>
                </div>
            )
        }

        <div className="details">

            <div className="header">
                <p className="title">Recipient</p>
            </div>
            <TableContainer className="detail-paper" component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <p>Name</p>
                            </TableCell>
                            <TableCell>
                                <p>Phone</p>
                            </TableCell>
                            <TableCell>
                                <p>Email</p>
                            </TableCell>
                            <TableCell>
                                <p>Address</p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className="detail-row">
                            <TableCell>
                                <p>{detail && detail.delivery_address.first_name} {detail && detail.delivery_address.last_name}</p>
                            </TableCell>
                            <TableCell>
                                <p>{detail && detail.delivery_address.phone}</p>
                            </TableCell>
                            <TableCell>
                                <p>{detail && detail.delivery_address.email}</p>
                            </TableCell>
                            <TableCell>
                                <p>{detail && detail.delivery_address.details}, {detail && detail.delivery_address.area}, {detail && detail.delivery_address.city}, {detail && detail.delivery_address.postal_code}, {detail && detail.delivery_address.state}, China</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="header">
                <p className="title">ordered Products</p>
            </div>
            <TableContainer className="detail-paper" component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <p>#</p>
                            </TableCell>
                            <TableCell>
                                <p>Cover</p>
                            </TableCell>
                            <TableCell>
                                <p>Name</p>
                            </TableCell>
                            <TableCell>
                                <p>Variation</p>
                            </TableCell>
                            <TableCell>
                                <p>Price</p>
                            </TableCell>
                            <TableCell>
                                <p>Total</p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            detail && detail.order_details.map((i,k)=> {
                                return (
                                    <TableRow className="detail-row" key={k}>
                                        <TableCell>
                                            <p>{k+1}</p>
                                        </TableCell>
                                        <TableCell>
                                            <img className="product-img" src={i.cover_image} />
                                        </TableCell>
                                        <TableCell>
                                            <p>{i.main_product_name}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>{i.product_variation_name}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>$ {i.item_price}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p>$ {i.total_price}</p>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        <TableRow className="detail-row">
                            <TableCell colSpan={3} />
                            <TableCell colSpan={2}>
                                <p>{detail && detail.delivery_record.express_company} Shipping Fee</p>
                            </TableCell>
                            <TableCell align="left">
                                <p>$ {detail && detail.delivery_fee.total_price}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow className="detail-row">
                            <TableCell colSpan={3} />
                            <TableCell colSpan={2}>
                                <p>Grand Total</p>
                            </TableCell>
                            <TableCell align="left">
                                <p>$ {detail && detail.total_price}</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

        <div className="progress">

            <div className="header">
                <p className="title">{detail && detail.delivery_record.express_company} Shipping Log</p>
            </div>

            <div className="body">
                <div className="shipping-detail">
                    <p>Courier:</p>
                    <p>{detail && detail.delivery_record.express_company}</p>
                </div>
                <div className="shipping-detail">
                    <p>Express No:</p>
                    <p>{detail && detail.delivery_record.express_no}</p>
                </div>
                <div className="shipping-detail">
                    <p>Package No:</p>
                    <p>{detail && detail.delivery_record.package_id}</p>
                </div>
            </div>

            <Stepper activeStep={detail && detail.delivery_record.delivery_logs.length? detail.delivery_record.delivery_logs.length : 0} orientation={'vertical'}>
                {detail && detail.delivery_record.delivery_logs.map((data, k) => (
                    <Step key={k}>
                        <StepLabel className="progress-label" key={k}>
                            <p>{data.status}</p>
                            <p>{moment(data.created_at).format('YYYY/MM/DD, HH:MM')}</p>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
        
      </div>
  );
}

export default Order;