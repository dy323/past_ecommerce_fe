import Coin from 'assets/images/components/accountnav/dollar.png';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {Link} from "react-router-dom";

const AccountMenu = ({account, clearCredential}) => {
    return (
        <>
            <Link to="/">
                <span>Hi, {account.first_name} {account.last_name}</span>
            </Link>
            <Link to="/">
                <div className="coin">
                    <img src={Coin} />
                    <span>{parseFloat(account.wallet_balance).toFixed(2)}</span>
                </div>
            </Link>
            <Link to="/cart">
                <AiOutlineShoppingCart className="cart-svg"/>
                <span>Cart</span>
            </Link>
            <Link to="/wishlist?page=1">
                <span>Wishlist</span>
            </Link>
            <Link to="/profile?page=1">
                <span>Profile</span>
            </Link>
            <Link to="/history?page=1">
                <span>History</span>
            </Link>
            <a onClick={() => clearCredential()}>
                <span>Logout</span>
            </a>
        </>
    )
}

export default AccountMenu;