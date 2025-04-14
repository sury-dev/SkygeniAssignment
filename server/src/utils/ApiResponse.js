class ApiResponse{ // custom response class for api responses
    // constructor for the ApiResponse class
    constructor(statusCode, data, message="Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiResponse };