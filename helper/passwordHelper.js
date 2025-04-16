const bcrypt = require('bcrypt');


exports.passcrypt = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
}

exports.compass = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}