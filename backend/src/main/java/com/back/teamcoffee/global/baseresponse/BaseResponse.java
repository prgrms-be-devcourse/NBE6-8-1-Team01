package com.back.teamcoffee.global.baseresponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse
{
    private String message;
    private int statusCode;

    public BaseResponse(String message, int statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }


}
