package com.back.teamcoffee.domain.user.service;

import com.back.teamcoffee.global.rsdata.RsData;
import com.back.teamcoffee.domain.user.dto.UserDto;
import com.back.teamcoffee.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    public RsData<UserDto> getUserList(String email) {
        UserDto userDto = userRepository.findByEmail(email);
        if (userDto == null) {
            return RsData.of("404-1", "사용자를 찾을 수 없습니다.", null);
        }
        return RsData.of("201-1", "사용자 조회 성공", userDto);

    }

    public RsData<UserDto> getUserWishList(String email) {

        UserDto userDto = userRepository.findByEmail(email);
        if (userDto == null) {
            return RsData.of("404-1", "사용자를 찾을 수 없습니다.", null);
        }
        // Assuming wish list is part of UserDto, otherwise this logic needs to be adjusted
        return RsData.of("201-1", "사용자 위시리스트 조회 성공", userDto);
    }
}
