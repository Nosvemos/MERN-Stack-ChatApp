import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
	const token = jwt.sign({userId}, process.env.JWT_SECRET, {
		expiresIn: "3d"
	});

	res.cookie('jwt', token, {
		maxAge: 3 * 24 * 60 * 60 * 1000, // 3 day
		httpOnly: true, // Prevent XSS attacks cross-site scripting attacks
		sameSite: 'strict', // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== 'development'
	});

	return token;
};

export default generateToken;