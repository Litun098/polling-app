const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpController = require('../../controllers/helpController');
const jwt = require('jsonwebtoken')

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res) => {
        res.status(200).json({
            success: true,
            message: "Signed up successfully",
            data: {
                user: req.user
            }
        })
    })

router.post(
    '/login',
    async (req, res) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error("Something went wrong.");
                        return next(error);
                    }
                    req.login(
                        user,
                        { session: false },
                        async (err) => {
                            if (err) {
                                return next(err);
                            }
                            const body = {
                                _id: user._id,
                                email: user.email
                            }
                            const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '10d' })
                            return res.status(200).json({
                                token: token,
                                success: true,
                                message: "Successfully logged in"
                            })
                        }
                    )
                } catch (err) {
                    console.log(err);
                    return next(err)
                }
            }
        )
    }
)

router.get('/help', helpController.helpDetails);

module.exports = router
