package com.back.teamcoffee.global.exception;

import com.back.teamcoffee.global.baseresponse.BaseResponse;
import org.springframework.http.HttpStatus;

public class EmailExistException extends BaseResponse {
    public EmailExistException(String email) {

      super("409-EMAIL-EXISTS", "이미 존재하는 이메일입니다:" + email, HttpStatus.CONFLICT);
    }
}
