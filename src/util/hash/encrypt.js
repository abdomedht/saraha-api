import CryptoJS from "crypto-js";

export const encrypt = ({ planText = "", signature = process.env.ENCRYPTION } = {}) => {
    return CryptoJS.AES.encrypt(planText, signature).toString();
}

export const decrypt = ({ cipherText = "", signature = process.env.ENCRYPTION } = {}) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, signature);
    return bytes.toString(CryptoJS.enc.Utf8);
}