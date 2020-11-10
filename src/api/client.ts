export class Client {
    private socket: WebSocket;

    public connect() {
        this.socket = new WebSocket('wss://echo.websocket.org/');
        this.socket.onopen = (evt) => {this.onOpen()}
        this.socket.onclose = (evt) => {this.onClose()}
        this.socket.onmessage = (evt) => {this.onMessage(evt)}
        this.socket.onerror = (evt) => {this.onError()}
    }

    private onOpen() {
        console.log('open');
    }

    private onClose() {
        console.log('close');
    }

    private onMessage(evt) {
        console.log('resp: ' + evt.data);
    }

    private onError() {
        console.log('error');
    }

    send(message) {
        this.socket.send(message);
    }
}