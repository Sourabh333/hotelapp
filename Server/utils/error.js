export const createError = (status, message, stack)=>{
    console.log(status, message, stack);
    let err = new Error();
    err.status = status;
    err.message = message;
    err.stack = stack;
    console.log(err.toString());
    return err;
};