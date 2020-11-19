package com.malinabenegui.help.services.search;

import com.malinabenegui.help.models.Post;
import com.malinabenegui.help.models.search.SearchFilter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchPostService {

    public ResponseEntity<List<Post>> searchPosts(@RequestBody SearchFilter search) {
        List<Post> filteredPostsList = new ArrayList<>();
        String searchFilter = search.getSearchField();


        return new ResponseEntity<>(filteredPostsList, HttpStatus.ACCEPTED);
    }
}
