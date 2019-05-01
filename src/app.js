const express = require('express');
const bodyParser = require("body-parser");
const LdapStrategy = require('passport-ldapauth');
const passport = require('passport');

const jwt = require('./jwt.js');

const app = express();
const port = 3000;

var OPTS = {
  server: {
    url: '',
    bindDN: '',
    bindCredentials: '',
    searchBase: '',
    searchFilter: ''
  }
};

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/login',
  passport.authenticate('ldapauth', { session: false }),
  (req, res) => {

    const user = req.body; /* input values */

    console.log(req.user); /* user object from ldap */

    const token = jwt.sign({ username: user.username, password: user.password });

    res.json({
      sucess: true,
      err: null,
      user: {
        name: req.user.name,
        uid: req.user.uid,
        email: req.user.mail
      },
      token
    });
  });

app.get('/logout', (req, res) => {
  res.send('Logged out');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
