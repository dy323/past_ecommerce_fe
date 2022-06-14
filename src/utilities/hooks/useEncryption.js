import CryptoJS from "crypto-js";

const useEncryption = () => {

    const encryptData = (data, key) => {
        return CryptoJS.AES.encrypt(data, key).toString();
    }

    const decryptData = (encryptedData, key) => {
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    return {
        encryptData,
        decryptData
    }

}

export default useEncryption;