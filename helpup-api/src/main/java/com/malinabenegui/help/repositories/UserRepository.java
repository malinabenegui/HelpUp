package com.malinabenegui.help.repositories;

import com.malinabenegui.help.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAllByUsername(String username);
    List<User> findAllByEmail(String email);
    User findUserByUsername(String username);

}
