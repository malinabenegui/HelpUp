package com.malinabenegui.help.userDetails;

import com.malinabenegui.help.models.UserDetails;
import com.malinabenegui.help.repositories.PostRepository;
import com.malinabenegui.help.repositories.UserDetailsRepository;
import com.malinabenegui.help.services.user.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class UserDetailsCheck {

    @Autowired
    private UserDetailsRepository userDetailsRepository;


    @Test
    public void when_edit_description_then_update() throws IOException {
        UserDetails userDetails = new UserDetails();
        userDetails.setUsername("mariapopescu");
        userDetails.setFirstname("");
        userDetails.setLastname("");
        userDetails.setDescription("me pretty");
        userDetailsRepository.save(userDetails);


        UserService service = new UserService(userDetailsRepository);
        UserDetails updatedUserDetails = new UserDetails();
        updatedUserDetails.setUsername("mariapopescu");
        updatedUserDetails.setFirstname("");
        updatedUserDetails.setLastname("");
        updatedUserDetails.setDescription("you ugly");

        service.editUserDetails(updatedUserDetails);

        assertEquals("you ugly", userDetailsRepository.getByUsername("mariapopescu").getDescription());
    }
}
