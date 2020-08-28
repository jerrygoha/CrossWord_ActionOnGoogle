package com.o2o.action.server.repository;

import com.o2o.action.server.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.Serializable;
import java.util.List;

public interface UserRepository extends PagingAndSortingRepository<User, String> , Serializable {
    List<User> findAll();
    List<User.getUserInfo> findByUserEmail(String email);

}
