const axios = require('axios');
const User = require("../user");
const ResourceNotFoundException = require('../exception/ResourceNotFoundException')
const IllegalOperationException = require('../exception/IllegalOperationException')


const origin = 'https://raw.githubusercontent.com/alj-devops/santa-data/master/'

// This could have been splitted into to disctinct calls chained (checking if name exists or not)
// This function has been implemented for convenience
async function getUsers() {
        const response = axios.all([axios.get(origin + 'users.json'), axios.get(origin + 'userProfiles.json')])
                .then(axios.spread((response1, response2) => {
                        let usersMap = response1.data
                        let userProfiles = response2.data
                        var users = []

                        for (var u of usersMap) {
                                let p = userProfiles.find(profile => profile.userUid == u.uid)
                                if (typeof p != 'undefined') {
                                        users.push(new User(u.uid, u.username, p.address, p.birthdate))
                                }
                        }
                        return users
                }))

        return response

}

async function getUserByName(name) {
        return getUsers().then(users => {
                let u = users.find(user => user.name == name)
                if (typeof u == 'undefined') {
                        throw new ResourceNotFoundException(`User ${name} not found`)
                }
                console.log(`user ${name} has been successfully found`)
                return u
        })
}

async function getMajorUserByName(name) {
        return getUserByName(name).then(u => {
                if (!u.isChild()) {
                        throw new IllegalOperationException(`User ${name} is not allowed to make a wish. only allowed for users strictly below 10 y.o (here : ${u.age})`)
                }
                return u
        })
}

module.exports = {
        getUserByName,
        getUsers,
        getMajorUserByName
}
