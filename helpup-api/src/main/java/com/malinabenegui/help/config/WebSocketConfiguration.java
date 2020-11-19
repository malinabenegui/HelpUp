package com.malinabenegui.help.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;


@Configuration
public class WebSocketConfiguration extends AbstractWebSocketMessageBrokerConfigurer {

}