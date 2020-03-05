const moment = require('moment')

const childrenAgeUpperBound = 10

class User {
    constructor(id, name, address, birthDate) {
        this.id = id
        this.name = name,
            this.address = address
        this.birthDate = moment(birthDate, 'YYYY/DD/MM').toDate()
        this.age = calculate_age(this.birthDate)
    }

    // Here we suppose wish are allowed only for user under 10 strictly speaking
    isChild() {
        return this.age < childrenAgeUpperBound
    }

    fromJSON(input) {
        return new User(input["userUid"],
            input["address"],
            input["birthdate"])
    }
}

function calculate_age(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    return age;
}

module.exports = User;