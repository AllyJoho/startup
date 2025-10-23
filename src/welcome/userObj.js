function getAge(name) {
    // This will be replaced with a 3rd party service call
    return Math.floor(Math.random() * 30) + 15 + name.length;
}

export class Users {
    constructor(name, username, password) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.games = [];
        this.friends = [];
        this.friendRequests = [];
        this.age = getAge(name);
    }
}
