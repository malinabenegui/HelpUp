package com.malinabenegui.help.search;

import com.malinabenegui.help.models.UserDetails;
import com.malinabenegui.help.models.search.SearchFilter;
import com.malinabenegui.help.repositories.UserDetailsRepository;
import com.malinabenegui.help.services.search.SearchUserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class SearchUser {
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Test
    public void when_searching_by_username_then_find() {
        UserDetails userDetails = new UserDetails();
        userDetails.setUsername("mariapopescu");
        userDetails.setFirstname("");
        userDetails.setLastname("");

        userDetailsRepository.save(userDetails);
        SearchUserService service = new SearchUserService(userDetailsRepository);

        List<UserDetails> actualList = Arrays.asList(userDetailsRepository.getByUsername("mariapopescu"));

        ResponseEntity<List<UserDetails>> foundUsersList = service.searchUsers(new SearchFilter("popescu"));
        assertArrayEquals(foundUsersList.getBody().toArray(new UserDetails[0]), actualList.toArray());
    }

    @Test
    public void when_searching_by_lastname_then_find() {
        UserDetails userDetails = new UserDetails();
        userDetails.setUsername("username");
        userDetails.setFirstname("");
        userDetails.setLastname("popescu");

        userDetailsRepository.save(userDetails);
        SearchUserService service = new SearchUserService(userDetailsRepository);

        List<UserDetails> actualList = Arrays.asList(userDetailsRepository.getByLastname("popescu"));

        ResponseEntity<List<UserDetails>> foundUsersList = service.searchUsers(new SearchFilter("popescu"));
        assertArrayEquals(foundUsersList.getBody().toArray(new UserDetails[0]), actualList.toArray());
    }

    @Test
    public void when_searching_by_firstname_then_find() {
        UserDetails userDetails = new UserDetails();
        userDetails.setUsername("username");
        userDetails.setFirstname("mariaa");
        userDetails.setLastname("");

        userDetailsRepository.save(userDetails);
        SearchUserService service = new SearchUserService(userDetailsRepository);

        List<UserDetails> actualList = Arrays.asList(userDetailsRepository.getByFirstname("mariaa"));

        ResponseEntity<List<UserDetails>> foundUsersList = service.searchUsers(new SearchFilter("maria"));
        assertArrayEquals(foundUsersList.getBody().toArray(new UserDetails[0]), actualList.toArray());
    }
}

