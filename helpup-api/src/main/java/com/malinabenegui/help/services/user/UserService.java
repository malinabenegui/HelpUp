package com.malinabenegui.help.services.user;

import com.malinabenegui.help.models.ImageModel;
import com.malinabenegui.help.models.Post;
import com.malinabenegui.help.models.UserDetails;
import com.malinabenegui.help.models.httpResponseParsers.HttpSimpleStringResponse;
import com.malinabenegui.help.repositories.PostRepository;
import com.malinabenegui.help.repositories.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {
    private final UserDetailsRepository userDetailsRepository;
    @Autowired
    private PostRepository postRepository;

    @Autowired
    public UserService(UserDetailsRepository userDetailsRepository) {
        this.userDetailsRepository = userDetailsRepository;
    }

    public ResponseEntity<UserDetails> getUserDetails(HttpSimpleStringResponse username) {
        return new ResponseEntity<>(userDetailsRepository.getByUsername(username.getString()), HttpStatus.ACCEPTED);
    }

    public void editProfilePicture(MultipartFile profilePic, String username) throws IOException {
        UserDetails oldUserDetails = userDetailsRepository.getByUsername(username);
        oldUserDetails.setProfilepic(profilePic.getBytes());
        userDetailsRepository.save(oldUserDetails);
    }

    public void editUserDetails(UserDetails userDetails) throws IOException {
        UserDetails oldUserDetails = userDetailsRepository.getByUsername(userDetails.getUsername());
        userDetails.setProfilepic(oldUserDetails.getProfilepic());
        oldUserDetails = userDetails;
        userDetailsRepository.save(oldUserDetails);
    }

    public ResponseEntity<?> getPostsOfUser(HttpSimpleStringResponse username) {
        return ResponseEntity.ok(postRepository.getAllByUsername(username.getString()));
    }

    public ResponseEntity<ImageModel> getProfilePic(HttpSimpleStringResponse username) {
        return ResponseEntity.ok(new ImageModel(userDetailsRepository.getByUsername(username.getString()).getProfilepic()));
    }

    public ResponseEntity<List<UserDetails>> getAllUsersDetails() {
        return ResponseEntity.ok(userDetailsRepository.findAll());
    }
}
