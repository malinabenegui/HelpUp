package com.malinabenegui.help.services.register;

import com.malinabenegui.help.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailingService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendNotification(User user) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(user.getEmail());
        mail.setFrom("helpupcompany@gmail.com");
        mail.setSubject("Account created");
        mail.setText("Hello,\n\n Your HelpUp account has been created. Your username is " + user.getUsername() +
                ". Now you can access all posts and contact others. \n\nThank you,\nHelpUp Team");

        javaMailSender.send(mail);
    }
}
