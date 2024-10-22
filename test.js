const bcrypt = require('bcryptjs')

const password = 'virat';
const hash = '$2a$10$qnaMwVxmcyWpDIGIqOEf/urlZdNEg92c4TEc2ShAGnwT9PsIk1T6e';


async function verifyPassword() {
    const match = await bcrypt.compare(password, hash);
    if (match) {
        console.log("Password matches!");
    } else {
        console.log("Invalid password");
    }
}

verifyPassword();
