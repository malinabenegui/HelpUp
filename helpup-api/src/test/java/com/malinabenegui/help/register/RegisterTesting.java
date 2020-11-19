package com.malinabenegui.help.register;

import com.malinabenegui.help.constants.RegisterResponseMessage;
import com.malinabenegui.help.models.User;
import com.malinabenegui.help.repositories.UserRepository;
import com.malinabenegui.help.services.register.CredentialsChecker;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class RegisterTesting {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void when_register_with_good_credentials_then_ACCEPTED() {
        User user = new User();
        user.setUsername("ionel");
        user.setEmail("ionel@gmail.com");
        user.setRole("USER");
        user.setPassword("aaaa");

        CredentialsChecker service = new CredentialsChecker(userRepository);

        assertEquals(HttpStatus.ACCEPTED, service.checkCredentialsAvailability(user).getHttpStatus());
    }

    @Test
    public void when_register_with_bad_credentials_then_rejected() {
        User user = new User();
        user.setUsername("ionel");
        user.setEmail("ionel@gmail.com");
        user.setRole("USER");
        user.setPassword("aaaa");
        userRepository.save(user);

        CredentialsChecker service = new CredentialsChecker(userRepository);

        assertEquals(HttpStatus.UNAUTHORIZED, service.checkCredentialsAvailability(user).getHttpStatus());
    }

    @Test
    public void when_register_with_used_username_then_rejected_with_suitable_response() {
        User user1 = new User();
        user1.setUsername("ionel");
        user1.setEmail("ionel@gmail.com");
        user1.setRole("USER");
        user1.setPassword("aaaa");
        userRepository.save(user1);

        User user2 = new User();
        user2.setUsername("ionel");
        user2.setEmail("altemail@gmail.com");
        user1.setRole("USER");
        user1.setPassword("aaaa");

        CredentialsChecker service = new CredentialsChecker(userRepository);

        assertEquals(HttpStatus.UNAUTHORIZED, service.checkCredentialsAvailability(user2).getHttpStatus());
        assertEquals(RegisterResponseMessage.USED_USERNAME_HTTP_RESPONSE, service.checkCredentialsAvailability(user2).getResponseMessage());
    }

    @Test
    public void when_register_with_used_email_then_rejected_with_suitable_response() {
        User user1 = new User();
        user1.setUsername("ionel");
        user1.setEmail("ionel@gmail.com");
        user1.setRole("USER");
        user1.setPassword("aaaa");
        userRepository.save(user1);

        User user2 = new User();
        user2.setUsername("andrei");
        user2.setEmail("ionel@gmail.com");
        user1.setRole("USER");
        user1.setPassword("aaaa");

        CredentialsChecker service = new CredentialsChecker(userRepository);

        assertEquals(HttpStatus.UNAUTHORIZED, service.checkCredentialsAvailability(user2).getHttpStatus());
        assertEquals(RegisterResponseMessage.USED_MAIL_HTTP_RESPONSE, service.checkCredentialsAvailability(user2).getResponseMessage());
    }
}
