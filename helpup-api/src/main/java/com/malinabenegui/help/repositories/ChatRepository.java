package com.malinabenegui.help.repositories;

import com.malinabenegui.help.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    List<Chat> findBySender(String from);

    List<Chat> findByReceiver(String to);

}
