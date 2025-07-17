package com.back.teamcoffee.global.exception;

import com.back.teamcoffee.global.baseresponse.BaseResponse;
import com.back.teamcoffee.global.rsdata.RsData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RsData<Void>> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult()
                .getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        RsData<Void> response = RsData.of("400-BAD-REQUEST",  errorMessage, null);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);

    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<RsData<Void>> handleDataNotFoundException(DataNotFoundException ex) {

        RsData<Void> response = RsData.of("404-NOT-FOUND", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    //권한 거부
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<RsData<Void>> handleAccessDeniedException(AccessDeniedException ex) {
        RsData<Void> response = RsData.of("403-FORBIDDEN", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    //인증 실패
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<RsData<Void>> handleAuthenticationException(AuthenticationException ex) {
        RsData<Void> response = RsData.of("401-UNAUTHORIZED", ex.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    // 비즈니스 예외 (커스텀)
    @ExceptionHandler(BaseResponse.class)
    public ResponseEntity<RsData<Void>> handleBaseResponseException(BaseResponse ex) {
        RsData<Void> response = RsData.of(ex.getResultCode(), ex.getMessage(), null);
        return new ResponseEntity<>(response, ex.getStatusCode());
    }

    // 마지막 예외 처리 핸들러
    @ExceptionHandler(Exception.class)
    public ResponseEntity<RsData<Void>> handleGeneralException(Exception ex) {
        RsData<Void> response = RsData.of("500-INTERNAL-SERVER-ERROR", "서버 오류가 발생했습니다.", null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
