// can probably delete this as i put all this info straight into app.js?

module.exports = {
  'appID' : process.env.FB_APP_ID,
  'appSecret' : process.env.FB_APP_SECRET,
  'callbackUrl' : 'http://localhost:3000/login/facebook/callback'
}
