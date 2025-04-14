// a utility to handle async errors in express routes
// it takes a request handler function and returns a new function that catches errors
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next))
            .catch((err) => next(err));
    }
}

export {asyncHandler};