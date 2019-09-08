var stompClient = null;
var username = null;

/**
 * WebSocket Client
 * 1、WebSocket client receive messages with callback. example：webSocket.onmessage
 * 2、WebSocket client send message to server. example：webSocket.send();
 */
function getWebSocket() {
    /**
     * WebSocket client PS：URL shows WebSocket protocal, port number, and then end point.
     */
    var webSocket = new WebSocket('ws://localhost:8080/websocket-demo');
    stompClient = Stomp.over(webSocket);

    /**
     * websocket open connection.
     */
    webSocket.onopen = function (event) {
        console.log('WebSocket open connection');
        username = $('#username').text();
    };

    /**
     * Server send 1) broadcast message, 2) online users.
     */
    webSocket.onmessage = function (event) {
        //Receive Message from Server
        var message = JSON.parse(event.data) || {};
        var messageContainer = $('#userinfo');
        if (message.type === 'SPEAK') {
            messageContainer.append(
                '<div class="mdui-card" style="margin: 10px 0;">' +
                '<div class="mdui-card-primary">' +
                '<div class="mdui-card-content message-content">' + message.username + "：" + message.msg + '</div>' +
                '</div></div>');
        }
        $('.chat-num').text(message.onlineCount);
        var $cards = messageContainer.children('.mdui-card:visible').toArray();
        if ($cards.length > 5) {
            $cards.forEach(function (item, index) {
                index < $cards.length - 5 && $(item).slideUp('fast');
            });
        }
    };

    /**
     * Close connection
     */
    webSocket.onclose = function (event) {
 //       setConnected(false);
        console.log('WebSocket close connection.');
    };

    /**
     * Exception
     */
    webSocket.onerror = function (event) {
        console.log('WebSocket exception.');
    };
    return webSocket;
}

var webSocket = getWebSocket();


/**
 * Send messages to server use webSocket.
 */
function sendMsgToServer(e) {
    var $message = $('#msg');
    var msgg = $message.val();
    var name = username;
    var onlineCounts = $('.chat-num').text();
    var chatMessage = {
        username: name,
        msg: msgg,
        onlineCount: onlineCounts,
        type: 'SPEAK'
    };
    if (msgg) {
    webSocket.send(JSON.stringify(chatMessage));
        $message.val(null);
    }
}
function setConnected(connected) {
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#userinfo").html("");
}

/**
 * Clear screen
 */
function clearMsg() {
    $("#userinfo").empty();
}

/**
 * Enter to send message.
 */
document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    console.log(e.keyCode);
    e.keyCode === 13 && sendMsgToServer();
};

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });

    $( ".mdui-ripple-clear" ).on("click", clearMsg);
    $( ".mdui-ripple-send" ).on("click", sendMsgToServer);
});