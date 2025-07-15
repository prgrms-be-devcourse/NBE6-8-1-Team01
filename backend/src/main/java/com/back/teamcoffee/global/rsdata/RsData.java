package com.back.teamcoffee.global.rsdata;

import com.fasterxml.jackson.annotation.JsonIgnore;

public record RsData<T>(
        String resultCode,
        @JsonIgnore
        String statusCode,
        String msg,
        T data
) {
    public RsData(String resultCode,String msg){
        this(resultCode, msg, null);
    }

    public RsData(String resultCode, String msg, T data){
        this(resultCode, ParseStatus(resultCode), msg, data);
    }

    private static int ParseStatus(String resultCode){
        try
        {
            return Integer.parseInt(resultCode.split("-",2)[0]);
        }
        catch (Exception e){
            return 200;
        }
    }

    public static <T> RsData<T> of(String resultCode, String msg, T data) {
        return new RsData<>(resultCode, msg, data);
    }

    public static <T> RsData<T> of(String resultCode, String msg){
        return new RsData<>(resultCode, msg);
    }

    public static <T> RsData<T> error(String resultCode, String msg, T data){
        return new RsData<>(resultCode, msg, data);
    }


    public static <T> RsData<T> error(String resultCode, String msg){
        return new RsData<>(resultCode, msg);
    }


    public boolean isSuccess() {
        return statusCode >=200 && statusCode < 300;
    }

    public boolean isError() {
        return statusCode >= 400;
    }
}
