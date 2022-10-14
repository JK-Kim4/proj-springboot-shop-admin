package com.tutomato.bootshopadmin;

import org.joda.time.LocalDateTime;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        Runtime.getRuntime().addShutdownHook(new Thread(){
            public void run(){
                System.out.println(" ****************** [SHUT DOWN] at " + new LocalDateTime());
            }
        });

        SpringApplication.run(Application.class, args);
    }

}
