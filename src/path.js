import HomePage from "pages/Main";
import ProductPage from "pages/Item.js";
import CartPage from "pages/Cart.js";
import SearchPage from "pages/Seek.js";
import PaymentPage from "./pages/Payment";
import ProfilePage from "./pages/Profile";
import HistoryPage from "./pages/History";
import WishListPage from "./pages/WishList";
import AddressPage from './pages/Address';
import DetailPage from "./pages/Order";
import FaqPage from "./pages/Faq";
import HowToBuyPage from "./pages/HowToBuy";
import TNCPage from "./pages/Tnc";
import PaymentPolicyPage from './pages/Policy';
import PrivacyPolicyPage from './pages/Privacy';
import UnavailablePage from "./pages/unavailable";

export default [
  {
    name: "Home Page",
    path: "/",
    protected: false,
    component: HomePage,
  },
  {
    name: "Product Details",
    path: "/product",
    protected: false,
    component: ProductPage,
  },
  {
    name: "Cart",
    path: "/cart",
    protected: true,
    component: CartPage,
  },
  {
    name: "Search",
    path: "/search/product",
    protected: false,
    component: SearchPage,
  },
  {
    name: "Profile",
    path: "/profile",
    protected: true,
    component: ProfilePage,
  },
  {
    name: "History",
    path: "/history",
    protected: true,
    component: HistoryPage,
  },
  {
    name: "WishList",
    path: "/wishlist",
    protected: true,
    component: WishListPage,
  },
  {
    name: "Address",
    path: "/address",
    protected: true,
    component: AddressPage,
  },
  {
    name: "CheckOut Page",
    path: "/checkout",
    protected: true,
    component: PaymentPage,
  },
  {
    name: "Completion Page",
    path: "/completion",
    protected: true,
    component: DetailPage,
  },
  {
    name: "Order Detail Page",
    path: "/detail",
    protected: true,
    component: DetailPage,
  },
  {
    name: "Faq",
    path: "/faq",
    protected: false,
    component: FaqPage,
  },
  {
    name: "How To Buy",
    path: "/guide",
    protected: false,
    component: HowToBuyPage,
  },
  {
    name: "Term And Condition",
    path: "/tnc",
    protected: false,
    component: TNCPage,
  },
  {
    name: "Payment Policy",
    path: "/payment_policy",
    protected: false,
    component: PaymentPolicyPage,
  },
  {
    name: "Privacy Policy",
    path: "/privacy_policy",
    protected: false,
    component: PrivacyPolicyPage,
  },
  {
    name: "404",
    path: "*",
    protected: false,
    component: UnavailablePage,
  },
];
