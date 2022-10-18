package com.tutomato.bootshopadmin.controller.message;


import com.tutomato.bootshopadmin.controller.message.domain.Greeting;
import com.tutomato.bootshopadmin.controller.message.domain.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class MessageController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage helloMessage) throws Exception{
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(helloMessage.getName()));
    }
}
