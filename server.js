// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const userService = require('./model/services/user_service')
const wishRepository = require('./model/persistence/wish_repository')
const notificationService = require('./model/services/notification_service')

app.use(bodyParser());
app.use(morgan());

// View engine
app.set('view engine', 'ejs');

// TODO : move it and link it to some endpoint
notificationService.startMailingJob()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('pages/index');
});

app.post('/wish', (req, res) => {
  let cReq = req.body
  if (typeof cReq.username == 'undefined' || cReq.username == '') {
    const msg = 'Required user name to post message for Santa'
    errorView(msg, msg, res)
    return
  } else if (typeof cReq.wish == 'undefined' || req.body.wish == '') {
    const msg = 'Wish required for posting to Santa'
    errorView(msg, msg, res)
    return
  }
  else {
    performWish(cReq, res)
  }
})

async function performWish(req, res) {
  return userService.getMajorUserByName(req.username)
    .then(() => { wishRepository.enqueue(req.username, req.wish) })
    .then(() => {
      console.log(`Successfully accepted wish ${req.wish} on behalf of ${req.username}`)
      res.render('pages/success', {
        message: req.wish
      });
    })
    .catch(error => {
      errorView(`Wish (${req.wish}) rejection for user ${req.username}. Error occured : ${error.message}`, error.message, res)
    })
}

function errorView(logmsg, displayMessage, res){
  console.log(logmsg)
  res.render('pages/error', {
    message: displayMessage
  });
}

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
