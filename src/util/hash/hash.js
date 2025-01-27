import * as bcrypt from "bcrypt";
export const generateHash = ({ planText = "", salt = process.env.HASH_SALT } = {}) => {

    return bcrypt.hashSync(planText, parseInt(salt));
}
export const compareHash = ({ hashValue = "", planText="" } = {}) => {
    return bcrypt.compareSync(planText, hashValue);
}