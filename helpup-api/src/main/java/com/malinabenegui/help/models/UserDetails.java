package com.malinabenegui.help.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserDetails {
    @Id
    private String username;
    private String firstname;
    private String lastname;
    private byte[] profilepic;
    private String city;
    private String education;
    private String job;
    private String gender;
    private String description;
    private Date birthday;
    private String phonenumber;
    private String userType;

    public UserDetails(String username, String firstname, String lastname, byte[] profilepic, String city, String education,
                       String job, String gender, String description, Date birthday, String phonenumber, String userType) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.profilepic = profilepic;
        this.city = city;
        this.education = education;
        this.job = job;
        this.gender = gender;
        this.description = description;
        this.birthday = birthday;
        this.phonenumber = phonenumber;
        this.userType = userType;
    }

    @Override
    public String  toString() {
        return "UserDetails{" +
                "username='" + username + '\'' +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                '}';
    }
}
