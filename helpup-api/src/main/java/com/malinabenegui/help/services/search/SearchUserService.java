package com.malinabenegui.help.services.search;

import com.malinabenegui.help.models.UserDetails;
import com.malinabenegui.help.models.search.SearchFilter;
import com.malinabenegui.help.repositories.UserDetailsRepository;
import com.malinabenegui.help.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchUserService {
    private UserDetailsRepository userDetailsRepository;

    public SearchUserService() {
    }

    @Autowired
    public SearchUserService(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public ResponseEntity<List<UserDetails>> searchUsers(SearchFilter search) {
        List<UserDetails> filteredUsersList = userDetailsRepository.findAll()
                .stream()
                .filter(user -> usersFilter(user, search.getSearchField().toLowerCase()))
                .collect(Collectors.toList());

        return new ResponseEntity<>(filteredUsersList, HttpStatus.ACCEPTED);
    }

    private boolean usersFilter(UserDetails user, String filter) {
        if (user.getUsername().toLowerCase().contains(filter))
            return true;


        if (user.getFirstname().toLowerCase().contains(filter))
            return true;
        return user.getLastname().toLowerCase().contains(filter);
    }


}
