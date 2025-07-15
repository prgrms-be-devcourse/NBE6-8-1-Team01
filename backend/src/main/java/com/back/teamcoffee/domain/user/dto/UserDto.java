package com.back.teamcoffee.domain.user.dto;

public record UserDto(
        int id,
        String name,
        String email,
        String role
) {

    public UserDto(int id, String name, String email, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public UserDto of(int id, String name, String email, String role) {
        return new UserDto(id, name, email, role);
    }

    public UserDto of(int id, String name, String email) {
        return new UserDto(id, name, email, "USER");
    }
    public UserDto of(int id, String name) {
        return new UserDto(id, name, null, "USER");
    }
    public UserDto of(int id) {
        return new UserDto(id, null, null, "USER");
    }
    public UserDto from(int id, String name, String email, String role) {
        return new UserDto(id, name, email, role);
    }

}
