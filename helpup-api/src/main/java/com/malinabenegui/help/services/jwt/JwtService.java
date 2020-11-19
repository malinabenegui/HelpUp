package com.malinabenegui.help.services.jwt;

import com.malinabenegui.help.models.httpResponseParsers.HttpSimpleStringResponse;
import com.malinabenegui.help.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Autowired
    private JwtUtil jwtUtil;

    public HttpSimpleStringResponse parseUsernameFromJWT(String header) {
        return new HttpSimpleStringResponse(jwtUtil.extractUsername(header.substring(7)));
    }
}
