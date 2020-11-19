package com.malinabenegui.help.services.post;

import com.malinabenegui.help.models.Post;
import com.malinabenegui.help.models.UserDetails;
import com.malinabenegui.help.models.editPostRequest.DeleteRequest;
import com.malinabenegui.help.models.editPostRequest.EditRequest;
import com.malinabenegui.help.repositories.PostRepository;
import com.malinabenegui.help.repositories.UserDetailsRepository;
import com.malinabenegui.help.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public Iterable<Post> getAllPosts() {
        List<Post> list = postRepository.findAll();
        Collections.reverse(list);
        return list;
    }

    public ResponseEntity<?>
    addPostInDatabase(MultipartFile file, String description, String user_username, String type) throws IOException {
        if (description == null || user_username == null || file == null)
            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        postRepository.save(
                new Post(description, user_username, file.getBytes(), type, userDetailsRepository.getByUsername(user_username).getCity()));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void editPost(EditRequest editRequest) {
        Post post = postRepository.getOne(editRequest.getId());
        post.setDescription(editRequest.getDescription());
        postRepository.save(post);
    }

    public void deletePostById(DeleteRequest deleteRequest) {
        postRepository.deleteById(deleteRequest.getId());
    }

}
