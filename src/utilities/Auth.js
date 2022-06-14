import {post, postWithAuthorization} from "utilities/Axios.service";
import { getKardbys } from "utilities/Maishah.service";

export function getToken(data) {
    return post("/api/oauth/token", data);
}

export function getSignature(data) {
    return postWithAuthorization('/api/oauth/signature', data);
}

export function getWallet(wallet_id, access_token) {
    return getKardbys(access_token, `/api/user/wallet/${wallet_id}`)
};

export function payYanXuan(data) {
    return postWithAuthorization('/api/maishah/order/pay', data);
}

export function getUser(access_token) {
    return getKardbys(access_token, "/api/user/kyc");
}

export function createTransaction(access_token, data) {
    return Kardbys_post(access_token, "api/user/transaction/create", data)
}

