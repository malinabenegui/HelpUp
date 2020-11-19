package com.malinabenegui.help.controller;

import com.malinabenegui.help.models.Post;
import com.malinabenegui.help.models.UserDetails;
import com.malinabenegui.help.models.search.SearchFilter;
import com.malinabenegui.help.services.search.SearchPostService;
import com.malinabenegui.help.services.search.SearchUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
@CrossOrigin
public class SearchController {
    private final SearchUserService searchUserService;
    private final SearchPostService searchPostService;

    @Autowired
    public SearchController(SearchUserService searchUserService, SearchPostService searchPostService) {
        this.searchUserService = searchUserService;
        this.searchPostService = searchPostService;
    }

    @GetMapping
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    private ResponseEntity<List<UserDetails>> searchUsers(@RequestBody SearchFilter search) {
        return searchUserService.searchUsers(search);
    }

    @RequestMapping(value = "/posts", method = RequestMethod.POST)
    private ResponseEntity<List<Post>> searchPosts(@RequestBody SearchFilter search) {
        return searchPostService.searchPosts(search);
    }
}
