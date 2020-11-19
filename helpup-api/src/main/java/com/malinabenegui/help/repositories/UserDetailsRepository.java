package com.malinabenegui.help.repositories;

import com.malinabenegui.help.models.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails, String> {
    UserDetails getByUsername(String username);
    UserDetails getByFirstname(String firstname);
    UserDetails getByLastname(String lastname);
}
