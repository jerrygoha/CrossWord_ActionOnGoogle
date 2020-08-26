package com.o2o.action.server.repository;

import com.o2o.action.server.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface UserRepository extends PagingAndSortingRepository<User, String> {
    List<User> findAll();
    List<User.getUserInfo> findByUserEmail(String email);

}
