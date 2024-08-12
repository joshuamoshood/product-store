const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req,res,next)=>{
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        return res.redirect("/auth");
    }
    try {
        const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user={
            userId:payload.userId,
            userName: payload.userName
        }
        next();
    } catch (error) {
        next();
        return
    }
}

module.exports = auth;