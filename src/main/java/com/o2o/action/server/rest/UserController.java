package com.o2o.action.server.rest;

import com.o2o.action.server.model.User;
import com.o2o.action.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository repository;
    @RequestMapping("/createUser/{email}")
    public String createUser(@PathVariable String email){
        repository.save(new User(email));

        return "createUser";
    }
    //테스트 해보지 못함
    @PostMapping("/update")
    public boolean update(@RequestBody User user){
        repository.save(user);
        return true;
    }
    @RequestMapping("/getUser/{email}")
    public User getUser(@PathVariable String email){
        return repository.findById(email).get();
    }

    //변수명에 "_"붙이면 오류생겨서 _안붙이도록함
    @GetMapping("/getTotalRank")
    public List<User> getTotalRank(){
        List<Sort.Order> orders = new ArrayList<Sort.Order>();
        Sort.Order order1 = new Sort.Order(Sort.Direction.DESC, "userLevel");
        orders.add(order1);
        Sort.Order order2 = new Sort.Order(Sort.Direction.DESC, "userExp");
        orders.add(order2);
        Sort.Order order3 = new Sort.Order(Sort.Direction.ASC, "accountTimestamp");
        orders.add(order3);
        return (List<User>) repository.findAll(Sort.by(orders));
    }
    //iterator을 쓰는 방법보다 더 효율적인 방법이 있을까?
    @RequestMapping("/getMyRank/{email}")
    public int getMyRank(@PathVariable String email){
        int index = 0;
        List<Sort.Order> orders = new ArrayList<Sort.Order>();
        Sort.Order order1 = new Sort.Order(Sort.Direction.DESC, "userLevel");
        orders.add(order1);
        Sort.Order order2 = new Sort.Order(Sort.Direction.DESC, "userExp");
        orders.add(order2);
        Sort.Order order3 = new Sort.Order(Sort.Direction.ASC, "accountTimestamp");
        orders.add(order3);
        Iterator<User> it = repository.findAll(Sort.by(orders)).iterator();
        while(it.hasNext()){
            index++;
            if(it.next().getUserEmail().equals(email))
                return index;
        }
        return 0;
    }
}
