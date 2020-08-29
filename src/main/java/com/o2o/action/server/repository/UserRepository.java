package com.o2o.action.server.repository;

import com.o2o.action.server.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends PagingAndSortingRepository<User, String> {
    List<User> findAll();
    List<User.getUserInfo> findByUserEmail(String email);

    //@Query(value = "select x.* from public.ktour_api x where upper(regexp_replace(x.title, '[[:punct:]]|[[:space:]]', '', 'g')) like concat('%',upper(regexp_replace(:title, '[[:punct:]]|[[:space:]]', '', 'g')), '%') and lang in (:Lang)", nativeQuery = true)
    //public List<?> queryByTitleAndLang(String title, String Lang);

    @Transactional
    @Modifying
    @Query(value = "update User a set a.userLevel= :level where a.userEmail in (:email)")
    void queryByUserLevelAndUserEmail(Short level, String email);

    @Transactional
    @Modifying
    @Query(value = "update User b set b.userExp= :exp where b.userEmail in (:email)")
    void queryByUserExpAndUserEmail(Integer exp, String email);

    @Transactional
    @Modifying
    @Query(value = "update User c set c.userHint= :hint where c.userEmail in (:email)")
    void queryByUserHintAndUserEmail(Integer hint, String email);

    @Transactional
    @Modifying
    @Query(value = "update User d set d.userCoin= :coin where d.userEmail in (:email)")
    void queryByUserCoinAndUserEmail(Integer coin, String email);

    //리셋 누르면 들어가는 쿼리
    @Transactional
    @Modifying
    @Query(value = "delete from User e where e.userEmail in (:email)")
    void queryByUserEmail(String email);
}