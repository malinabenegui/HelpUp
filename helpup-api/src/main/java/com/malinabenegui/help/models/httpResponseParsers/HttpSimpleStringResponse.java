package com.malinabenegui.help.models.httpResponseParsers;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HttpSimpleStringResponse {
    private String string;

    public HttpSimpleStringResponse(String registerResponseMessage) {
        this.string = registerResponseMessage;
    }
}
