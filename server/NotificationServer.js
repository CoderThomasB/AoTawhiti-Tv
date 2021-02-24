const WebSocket = require('ws');

global.NotificationServer = new WebSocket.Server({server: TimeTableServer});

function log(message){
	console.log(`${(new Date()).toLocaleTimeString("en-US")} ${message}`)
}

NotificationServer.on('connection', (TheConnection) => {

	log('Connection open')
	SendPing(TheConnection)

	TheConnection.on('pong', () => {
		log("Received pong\n")
		TheConnection.IsBeingPinged = false;
	});

	TheConnection.on('message', (message) => {
		log('Received message: ' + message);
	});
});

function SendPing(TheConnection) {
	log('Sending ping')
	TheConnection.ping("Are you alive?")
	TheConnection.IsBeingPinged = true;
}

function PingAllClients() {
	NotificationServer.clients.forEach((TheConnection) => {
		SendPing(TheConnection)
		setTimeout(() => {
			if (TheConnection.IsBeingPinged === true) {
				TheConnection.terminate()
				log('Terminating connection')
			}
		}, 1000)
	})
}

setInterval(() => {
	PingAllClients()
}, 10000);