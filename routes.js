var passport = require('passport');
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.load({ path: '.env.example' });
// dotenv.load({ path: '.env.local' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');
console.log('passportConfig = ' + passportConfig );

/**
 * Primary app routes.
 */
router.get('/', homeController.index);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);
router.get('/forgot', userController.getForgot);
router.post('/forgot', userController.postForgot);
router.get('/reset/:token', userController.getReset);
router.post('/reset/:token', userController.postReset);
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/contact', contactController.getContact);
router.post('/contact', contactController.postContact);
router.get('/account', passportConfig.isAuthenticated, userController.getAccount);
router.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
router.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
router.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
router.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

/**
 * API examples routes.
 */
router.get('/api', apiController.getApi);
router.get('/api/nyt', apiController.getNewYorkTimes);
router.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
router.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
router.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
router.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
router.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);

/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/auth/instagram', passport.authenticate('instagram'));
router.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

/**
 * OAuth authorization routes. (API examples)
 */
router.get('/auth/foursquare', passport.authorize('foursquare'));
router.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/foursquare');
});
router.get('/auth/tumblr', passport.authorize('tumblr'));
router.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
  res.redirect('/api/tumblr');
});
router.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
router.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
router.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/api/pinterest');
});



module.exports = router;
