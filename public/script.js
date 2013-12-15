var socket = io.connect();

function sentMessage(message) {

		socket.emit('message', message);
		//addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
		//$('#messageInput').val('');
}
function setPseudo(pseudo) {
		socket.emit('setPseudo', pseudo);
}
socket.on('message', function(data) {
	//addMessage(data['message'], data['pseudo']);
	parseMessage(data['message']);
});
$(function() {
});