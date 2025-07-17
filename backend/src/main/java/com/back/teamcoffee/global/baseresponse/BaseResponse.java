package com.back.teamcoffee.global.baseresponse;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public abstract class BaseResponse extends RuntimeException
{
    private final String resultCode;
    private final HttpStatus statusCode;

    protected BaseResponse(String resultCode, String message, HttpStatus statusCode) {
        super(message);
        this.resultCode = resultCode;
        this.statusCode = statusCode;
    }

    public String getResultCode() {
        return resultCode;
    }
    public HttpStatus getStatusCode() {
        return statusCode;
    }


}
