// In memory storage
let Wish = require('../wish')

var wishes = []

function enqueue(username, wish) {
  wishes.push(new Wish(username, wish))
  console.log(`Successfully added wish ${wish} for user ${username}`)
}

function isEmpty() {
  return wishes.length == 0
}

function getNotificationsCount() {
  return wishes.length
}

function pop() {
  console.log(wishes)
  return wishes.pop()
}

module.exports = {
  enqueue,
  pop,
  isEmpty,
  getNotificationsCount
}