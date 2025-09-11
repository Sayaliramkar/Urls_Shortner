export const errorHandler = (err , req, res, next) => {
    if( err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error(err);
    res.status(500).json({
        success: false,
        message:err.message || "internet server error"
    });
};

export class AppError extends Error {
    statusCode;
    isOperational;

    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ConflictError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
