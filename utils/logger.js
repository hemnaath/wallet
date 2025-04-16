const LOG = {
    info: (message, data = {}, res = null, status= null, statusCode = 200) => {
        return res.status(statusCode).json({ message, data, status, statusCode });
    },
    error: (message, data = {}, error, res = null, status=null, statusCode = 500) => {
        console.error(error);
        return res.status(statusCode).json({ message, error, status, statusCode });
    },
}


global.LOG = LOG;