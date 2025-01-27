export const asyncHandling = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            if (!res.headersSent) {
                next(new Error(error, { cause: 500 }));
            }
        }
    };
};

export const globalErrorHandling = (err, req, res, next) => {
    if (!res.headersSent) {
        if(process.env.MODE==="DEV"){
            return res.status(err.cause || 400).json({
                message: err.message || "Server error",
                stack:err.stack
            });
        }
        return res.status(err.cause || 400).json({
            message: err.message || "Server error",
        
        });

        
    }
};