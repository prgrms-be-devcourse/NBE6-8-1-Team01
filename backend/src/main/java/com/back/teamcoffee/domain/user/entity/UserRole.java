package com.back.teamcoffee.domain.user.entity;

public enum UserRole {
    ADMIN,
    USER;

    public String getAuthority() {
        return "ROLE_" + this.name();
    }




}
