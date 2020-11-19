package com.malinabenegui.help.repositories;

import com.malinabenegui.help.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    Optional<Post> findById(Integer id);

    @Override
    Post getOne(Integer id);

    List<Post> getAllByUsername(String username);

    @Override
    void deleteById(Integer id);

}
