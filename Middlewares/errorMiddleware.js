export const errorMiddleware = (err, req, res, next) =>{
    return res.status(err?.status || 500).send({
        msg : err?.message || "Internal Server Error",
        success : false,
    })
}

