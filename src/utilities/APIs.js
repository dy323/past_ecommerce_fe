import { get, post, postWithAuthorization } from "utilities/Axios.service.js";
import { getMaishah, postMaishah } from "utilities/Maishah.service";


//Products related api

export function getProducts(data, page) {
  return post(
    `/api/user/${JSON.parse(localStorage.getItem("maishah_config")).lang}/${JSON.parse(localStorage.getItem("maishah_config")).currency}/product/search`, data
  );
}

export function getProductDetail(data) {
  return post(`/api/user/${JSON.parse(localStorage.getItem("maishah_config")).lang}/${JSON.parse(localStorage.getItem("maishah_config")).currency}/product/get/${data}`);
}

export function getAllCategory() {
  return get(`/api/user/${JSON.parse(localStorage.getItem("maishah_config")).lang}/${JSON.parse(localStorage.getItem("maishah_config")).currency}/category/index`);
}

export function getRecommendationProduct() {
  return get(`/index/recommend`);
}

export function getHomePage() {
  return get(`/api/user/${JSON.parse(localStorage.getItem("maishah_config")).lang}/${JSON.parse(localStorage.getItem("maishah_config")).currency}/index`);
}

export function getSimilarProduct() {
  return get('/index/similar');
}

//Location related Api
export function getUserLocation() {
  return get(`https://ipapi.co/json/`).catch((err) => {
    console.log(err);
  })
}

//Cart related Api
export function getCart(access_token) {
  return getMaishah("/cart/get", access_token);
}

export function updateItem(access_token, data) {
  return postMaishah("/cart/update", access_token, data);
}

export function deleteItem(access_token, data) {
  return postMaishah("/cart/delete", access_token, data);
}

//Transaction
export function createOrder(access_token, data) {
  return postMaishah("/order/create", access_token, data);
}

export function payOrder(access_token, data) {
  return postMaishah("/order/pay", access_token, data);
}

//Address 
export function getAddress(access_token) {
  return getMaishah("/address/get", access_token);
}

export function createAddress(access_token, data) {
  return postMaishah("/address/create", access_token, data);
}

export function updateAddress(access_token, data) {
  return postMaishah("/address/update", access_token, data);
}

export function deleteAddress(access_token, data) {
  return postMaishah("/address/delete", access_token, data);
}

export function getSingleAddress(access_token, data) {
  return postMaishah('/address/detail', access_token, data);
}

//Order history
export function getOrders(access_token, data) {
  return postMaishah("/order/history", access_token, data);
}

export function getOrderDetail(access_token, data) {
  return postMaishah("/order/get", access_token, data);
}

/* using order_id for get order detail api*/