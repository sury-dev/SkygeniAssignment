class ApiError extends Error{ //custom error class for api errors
    // constructor for the ApiError class
    constructor(
        statusCode,
        message = "Something Went Wrong in ApiError.js",
        errors = [],
        stack = ""
    ){
        // Call the parent constructor with the message
        super(message)
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if(stack){ // if stack is provided, use it
            this.stack = stack;
        }
        else{ // otherwise, capture the stack trace
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export { ApiError };