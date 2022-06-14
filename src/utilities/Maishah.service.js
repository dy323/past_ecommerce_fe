import axios from "axios";

const base_url = process.env.REACT_APP_DASHBOARD_MAISHAH_URL;

const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
		Accept: "application/json",
    }
});

export function getMaishah(url, access_token) {
    return instance.get(base_url + url, {
        headers: {Authorization: "Bearer " + access_token}
    }).catch((err) => {
        console.log(err);
    })
}

export function postMaishah(url, access_token, data) {
    return instance.post(base_url + url, data, {
        headers: {Authorization: "Bearer " + access_token}
    }).catch((err)=> {
        console.log(err);
    })
}

