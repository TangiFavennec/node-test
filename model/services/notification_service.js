const wishRepository = require('../persistence/wish_repository')
const userService = require('./user_service')
const smtpService = require('./smtp_service')

var timeOut = {}

const timeIntervall = 15000

function notifyWishes() {
  // TODO : Implement cache management instead of doing such a thing here
  var cache = []

  if (wishRepository.isEmpty()) {
    console.log(`No notification to be sent`)
  }
  else {
    console.log(`Notification to be sent ${wishRepository.getNotificationsCount()}`)
    while (!wishRepository.isEmpty()) {
      let w = wishRepository.pop()
      console.log(w)
      var users = {};
      if (users[w.username] == undefined) {
        users[w.username] = userService.getUserByName(w.username)
      }
      console.log(`Sending notification for user ${w.name} with content : ${w.text}`)
      try {
        smtpService.sendMessage(users[w.username], w.text)
        console.log('Notification sent successfully')
      }
      catch (e) {
        console.log(`Notication could not be sent : ${e.data}`)
      }
    }
  }
}

function startMailingJob() {
  // Set periodical job for sending email
  timeOut = setInterval(notifyWishes, timeIntervall);
}

function stopMailingJob() {
  // Set periodical job for sending email
  clearInterval(timeOut)
}

module.exports = {
  startMailingJob,
  stopMailingJob
}