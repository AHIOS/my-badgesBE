var passport = require('passport');
var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

//*  <<- Add/remove one '/' here to toggle active code block
dotenv.load({ path: '.env.example' });
/*/
dotenv.load({ path: '.env.local' });
//*/


/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const providersController = require('./controllers/providers');
const contactController = require('./controllers/contact');
const apiController = require('./controllers/APIs/api');

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
 * Social Accounts routes.
 */
router.get('/providers', providersController.getProviders);
router.get('/providers/nyt', providersController.getNewYorkTimes);
router.get('/providers/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, providersController.getFacebook);
router.get('/providers/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, providersController.getGithub);
router.get('/providers/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, providersController.getTwitter);
router.post('/providers/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, providersController.postTwitter);
router.get('/providers/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, providersController.getLinkedin);

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
router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

router.get('/api', passport.authenticate('jwt'), apiController.index);
router.get('/api/items', apiController.getItems);
router.get('/api/items/:shortname', apiController.getItem);
router.post('/api/items', apiController.postItem);
router.put('/api/items/:id', apiController.putItem);
router.delete('/api/items/:id', apiController.deleteItem);


module.exports = router;
