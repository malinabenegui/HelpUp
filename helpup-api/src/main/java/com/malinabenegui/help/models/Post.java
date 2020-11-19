package com.malinabenegui.help.models;

import jdk.jfr.Name;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Arrays;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date date;
    private String username;
    private String description;
    private byte[] image;
    private String type;
    private String city;

    public Post(String description, String username, byte[] image, String type, String city) {
        date = new Date(System.currentTimeMillis());

        this.description = description;
        this.username = username;
        this.image = image;
        this.type = type;
        this.city = city;
    }
}
