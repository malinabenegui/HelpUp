package com.malinabenegui.help.controller;

import com.malinabenegui.help.models.ImageModel;
import com.malinabenegui.help.models.UserDetails;
import com.malinabenegui.help.models.httpResponseParsers.HttpSimpleStringResponse;
import com.malinabenegui.help.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService service;

    @RequestMapping(value = "/getdetails", method = RequestMethod.POST)
    private ResponseEntity<UserDetails> getUserDetails(@RequestBody HttpSimpleStringResponse username) {
        return service.getUserDetails(username);
    }

    @RequestMapping(value = "/editdetails", method = RequestMethod.POST)
    private void editUserDetails(@RequestBody UserDetails userDetails) throws IOException {
        service.editUserDetails(userDetails);
    }

    @RequestMapping(value = "/editprofilepicture", method = RequestMethod.POST)
    private void editProfilePicture(@RequestParam("imageFile") MultipartFile file,
                                    @RequestParam("username") String username) throws IOException {
        service.editProfilePicture(file, username);
    }

    @RequestMapping(value = "/getposts", method = RequestMethod.POST)
    private ResponseEntity<?> getPostsOfUser(@RequestBody HttpSimpleStringResponse username) {
        return service.getPostsOfUser(username);
    }

    @RequestMapping(value = "/getprofilepicture", method = RequestMethod.POST)
    private ResponseEntity<ImageModel> getProfilePicture(@RequestBody HttpSimpleStringResponse username) {
        return service.getProfilePic(username);
    }

    @RequestMapping(value = "/getAllUsersDetails", method = RequestMethod.GET)
    private ResponseEntity<List<UserDetails>> getAllUsersDetails() {
        return service.getAllUsersDetails();
    }

}
