export class Game {
    constructor(id, name, scoreType, creator, players = []) {
        this.id = id;
        this.name = name;
        this.scoreType = scoreType; // 'low' or 'high'
        this.creator = creator;
        this.players = players;
        this.winner = null;
        this.status = 'unknown';
    }
}
