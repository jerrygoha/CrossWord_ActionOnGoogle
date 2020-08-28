package com.o2o.action.server.rest;

import com.o2o.action.server.app.Main;
import com.o2o.action.server.model.User;
import com.o2o.action.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
public class UserController implements Serializable {

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
    public List getUser(@PathVariable String email){
        return repository.findByUserEmail(email);
    }

    @Modifying
    @RequestMapping("/updateLevel/{newLevel}/{email}")
    public String newLevel(@PathVariable Short newLevel, @PathVariable String email){
        repository.queryByUserLevelAndUserEmail(newLevel, email);
        return "done!" + newLevel + " " +email;
    }

    @Modifying
    @RequestMapping("/updateExp/{newExp}/{email}")
    public String newExp(@PathVariable Integer newExp, @PathVariable String email){
        repository.queryByUserExpAndUserEmail(newExp, email);
        return "done!" + newExp + " " +email;
    }

    @Modifying
    @RequestMapping("/updateHint/{newHint}/{email}")
    public String newHint(@PathVariable Integer newHint, @PathVariable String email){
        repository.queryByUserHintAndUserEmail(newHint, email);
        return "done!" + newHint + " " +email;
    }

    @Modifying
    @RequestMapping("/updateCoin/{newCoin}/{email}")
    public String newCoin(@PathVariable Integer newCoin, @PathVariable String email){
        repository.queryByUserCoinAndUserEmail(newCoin, email);
        return "done!" + newCoin + " " +email;
    }

    @Modifying
    @RequestMapping("/resetUser/{email}")
    public String resetUser(@PathVariable String email){
        repository.queryByUserEmail(email);
        return "reset " + email + "'s data";
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
