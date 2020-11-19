package com.malinabenegui.help.mappers;

import com.malinabenegui.help.models.httpResponseParsers.HttpSimpleStringResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
public class AuthorizationResponseMapper {
    private HttpStatus httpStatus;
    private HttpSimpleStringResponse responseMessage;

    public AuthorizationResponseMapper(HttpStatus httpStatus, HttpSimpleStringResponse responseMessage) {
        this.httpStatus = httpStatus;
        this.responseMessage = responseMessage;
    }
}
