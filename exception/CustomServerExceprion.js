class BusinessException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = BusinessException;