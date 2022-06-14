import ClientOAuth2 from "client-oauth2";
import { authPost } from "utilities/Axios.service.js"; 

//staging
export const OAuthClient = new ClientOAuth2({
    clientId: process.env.REACT_APP_STAGING_CLIENT_ID,
    clientSecret: process.env.REACT_APP_STAGING_CLIENT_SECRET,
    accessTokenUri: process.env.REACT_APP_STAGING_ACCESS_TOKEN_URI,
    authorizationUri: process.env.REACT_APP_STAGING_AUTHORIZATION_URI,
    redirectUri: process.env.REACT_APP_STAGING_REDIRECT_URL,
    scopes: ["read"],
})

export function login(data) {
    return authPost(`/token`, data);
}







