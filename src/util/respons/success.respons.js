export const successResponse = ({ res, message, data, status } = {}) => {

    return res.status(status || 200).json({
        message: message || "success",
        data: data || "no data"
    });
};
