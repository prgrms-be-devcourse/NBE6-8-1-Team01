package com.back.teamcoffee.global.exception;

import com.back.teamcoffee.global.baseresponse.BaseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DataNotFoundException extends BaseResponse {
  @Serial
  private static final long serialVersionUID = 1L;
  public DataNotFoundException(String message) {

    super("404-NOT-FOUND", message, HttpStatus.NOT_FOUND);
  }
}
