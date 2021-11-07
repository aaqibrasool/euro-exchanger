import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;

        if (token) {
            decodedData = jwt.verify(token, process.env.SECRET_JWT);
            req.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        res.status(401).json({ msg: 'token expired' });
    }
};

export default auth;