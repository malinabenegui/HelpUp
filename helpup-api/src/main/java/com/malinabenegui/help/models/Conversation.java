package com.malinabenegui.help.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Vector;

@Getter
@Setter
@NoArgsConstructor
public class Conversation {
    private Vector<Chat> chat;
    private String to;
    private String from;
    private byte[] icon;

    public Conversation(String to, String from, byte[] icon) {
        chat = new Vector<>();
        this.to = to;
        this.from = from;
        this.icon = icon;
    }
}
