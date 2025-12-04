const NotificationEvent = {
    FriendRequest: 'friendRequest',
    FriendAccepted: 'friendAccepted',
};

class EventMessage {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

class FriendNotifier {
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = () => {
            console.log('Startup connected');
        };
        this.socket.onclose = () => {
            console.log('Startup disconnected');
        };
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                // const event = JSON.parse(msg.data instanceof Blob ? await msg.data.text() : msg.data);
                this.receiveEvent(event);
            } catch {}
        };
    }

    broadcastEvent(type, data) {
        const event = new EventMessage(type, data);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers = this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.handlers.forEach((handler) => {
            handler(event);
        });
    }
}

const Notifier = new FriendNotifier();
export { NotificationEvent, Notifier };
