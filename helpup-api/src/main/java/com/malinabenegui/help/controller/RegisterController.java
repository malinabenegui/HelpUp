package com.malinabenegui.help.controller;

import com.malinabenegui.help.models.User;
import com.malinabenegui.help.models.httpResponseParsers.HttpSimpleStringResponse;
import com.malinabenegui.help.services.register.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;


@RestController
@RequestMapping("/register")
@CrossOrigin
public class RegisterController {
    @Autowired
    private RegisterService service;

    @RequestMapping("")
    public @ResponseBody ResponseEntity<HttpSimpleStringResponse> registerUser(@RequestBody User user) throws IOException {
        return service.registerNewUser(user);
    }

}
