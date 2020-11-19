package com.malinabenegui.help.controller;


import com.malinabenegui.help.models.Post;
import com.malinabenegui.help.models.editPostRequest.DeleteRequest;
import com.malinabenegui.help.models.editPostRequest.EditRequest;
import com.malinabenegui.help.services.post.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/post")
@CrossOrigin
public class PostController {
    @Autowired
    private PostService service;


    @GetMapping("/all")
    private Iterable<Post> retrieveAllPosts() {
        return service.getAllPosts();
    }

    @PostMapping("/upload")
    private ResponseEntity<?> uploadPost(
            @RequestParam("imageFile") MultipartFile file,
            @RequestParam("description") String description,
            @RequestParam("user_username") String user_username,
            @RequestParam("type") String type) throws IOException {
        return service.addPostInDatabase(file, description, user_username, type);
    }

    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public void editPost(@RequestBody EditRequest editRequest) {
        service.editPost(editRequest);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public void deletePost(@RequestBody DeleteRequest deleteRequest) {
        service.deletePostById(deleteRequest);
    }

}
