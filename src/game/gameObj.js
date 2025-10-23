export class Game {
    constructor(id, name, scoreType, creator, players = []) {
        this.name = name;
        this.scoreType = scoreType; // 'low' or 'high'
        this.creator = creator;
        this.players = players;
        this.winner = null;
    }
}