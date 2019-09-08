package edu.udacity.java.nano;

import org.junit.runner.RunWith;
import org.junit.Test;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.*;
import org.springframework.test.web.servlet.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class WebSocketChatApplicationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private WebTestClient webClient;

    @Test
    public void exampleTest() {
        this.webClient.get().uri("/").exchange().expectStatus().isOk();
    }

    @Test
    public void testWebSocketChatServer() throws Exception {
        WebSocketChatApplication webSocketChatApplication = new WebSocketChatApplication();
        this.mvc.perform(get("/")).andExpect(status().isOk());
        this.mvc.perform(get("/index")).andExpect(status().isOk());
    }
}