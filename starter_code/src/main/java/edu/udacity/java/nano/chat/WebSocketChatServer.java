package edu.udacity.java.nano.chat;

import com.alibaba.fastjson.*;
import org.springframework.stereotype.Component;
import javax.websocket.*;
import javax.websocket.server.*;
import java.io.*;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * WebSocket Server
 *
 * @see ServerEndpoint WebSocket Client
 * @see Session   WebSocket Session
 */

@Component
@ServerEndpoint(value="/websocket-demo")
public class WebSocketChatServer {

    /**
     * All chat sessions.
     */
    private static Map<Session, Integer> onlineSessions = new ConcurrentHashMap<>();
    static int onlineUsers = 0;
    int userId = 0;

    private void sendMessageToAll(String msg){
        for(Session session: onlineSessions.keySet())
        {
            try {
                session.getBasicRemote().sendText(String.valueOf(msg));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    /**
     * Open connection, 1) add session, 2) add user.
     */
    @OnOpen
    public void onOpen(Session session) throws IOException{

        if (onlineSessions.containsKey(session)) {
            try {
                session.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        userId++;
        onlineSessions.put(session, userId);
        onlineUsers++;
    }

    /**
     * Send message, 1) get username and session, 2) send message to all.
     */
    @OnMessage
    public void onMessage(Session session, String jsonStr){
        JSONObject jsonObj = JSONObject.parseObject(jsonStr);
        jsonObj.put("onlineCount",onlineUsers);
        sendMessageToAll(jsonObj.toString());
    }

    /**
     * Close connection, 1) remove session, 2) update user.
     */
    @OnClose
    public void onClose(Session session) {
        onlineSessions.remove(session);
        onlineUsers--;
    }

    /**
     * Print exception.
     */
    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

}
