package com.malinabenegui.help.constants;

import com.malinabenegui.help.models.httpResponseParsers.HttpSimpleStringResponse;

public final class RegisterResponseMessage {
    public static final HttpSimpleStringResponse USED_MAIL_HTTP_RESPONSE =
            new HttpSimpleStringResponse("Mail already used.");
    public static final HttpSimpleStringResponse USED_USERNAME_HTTP_RESPONSE =
            new HttpSimpleStringResponse("Username already used.");
    public static final HttpSimpleStringResponse SHORT_PASSWORD =
            new HttpSimpleStringResponse("Your password must be at least 8 characters in length.");
    public static final HttpSimpleStringResponse NULL_USERNAME =
            new HttpSimpleStringResponse("Please provide a username");
    public static final HttpSimpleStringResponse NULL_EMAIL =
            new HttpSimpleStringResponse("Please provide an email");
    public static final HttpSimpleStringResponse NULL_PASSWORD =
            new HttpSimpleStringResponse("Please provide a password");
    public static final HttpSimpleStringResponse ACCEPTED_HTTP_RESPONSE =
            new HttpSimpleStringResponse("ACCEPTED");

    @Override
    public String toString() {
        return "RegisterResponseMessage{}";
    }
}
