package com.o2o.action.server.app;

import com.o2o.action.server.model.User;
import com.o2o.action.server.repository.HintInfoRepository;
import com.o2o.action.server.repository.UserRepository;
import com.o2o.action.server.repository.WordInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.Serializable;
import java.util.List;

@Service
public class DBConnector implements Serializable {

    @Autowired
    UserRepository userRepo;
    WordInfoRepository wordRepo;
    HintInfoRepository hintRepo;

    //신규유저 이메일 db로 저장
    public String newUser(@PathVariable String email){
        userRepo.save(new User(email));
        return "new user data created";
    }

    //최근접속시간 갱신
    public String visitCheck(@PathVariable String email){
        User ur = new User();
        ur.setVisitTimestamp();
        return "time check";
    }

    //유저 정보 검색 email_level_exp_hint_coin
    public List<User.getUserInfo> getUserInfo(@PathVariable String email){
        return userRepo.findByUserEmail(email);
    }

    //유저 레벨 갱신
    //유저 경험치 갱신
    //유저 힌트 갱신
    //유저 코인 갱신









    /*UserRepository user = new UserRepository() {
        @Override
        public List<User> findAll() {
            return null;
        }

        @Override
        public Iterable<User> findAll(Sort sort) {
            return null;
        }

        @Override
        public Page<User> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public <S extends User> S save(User String) {
            return null;
        }

        @Override
        public <S extends User> Iterable<S> saveAll(Iterable<S> entities) {
            return null;
        }

        @Override
        public Optional<User> findById(String s) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(String s) {
            return false;
        }

        @Override
        public Iterable<User> findAllById(Iterable<String> strings) {
            return null;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(String s) {

        }

        @Override
        public void delete(User entity) {

        }

        @Override
        public void deleteAll(Iterable<? extends User> entities) {

        }

        @Override
        public void deleteAll() {

        }
    };

    WordInfoRepository word = new WordInfoRepository() {
        @Override
        public List<WordInfo> findAll() {
            return null;
        }

        @Override
        public List<WordInfo.wordMapping> findByStageDifficulty(String stageDifficulty) {
            return null;
        }

        @Override
        public Iterable<WordInfo> findAll(Sort sort) {
            return null;
        }

        @Override
        public Page<WordInfo> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public <S extends WordInfo> S save(S entity) {
            return null;
        }

        @Override
        public <S extends WordInfo> Iterable<S> saveAll(Iterable<S> entities) {
            return null;
        }

        @Override
        public Optional<WordInfo> findById(Short aShort) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(Short aShort) {
            return false;
        }

        @Override
        public Iterable<WordInfo> findAllById(Iterable<Short> shorts) {
            return null;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(Short aShort) {

        }

        @Override
        public void delete(WordInfo entity) {

        }

        @Override
        public void deleteAll(Iterable<? extends WordInfo> entities) {

        }

        @Override
        public void deleteAll() {

        }
    };

    HintInfoRepository hint = new HintInfoRepository() {

        @Override
        public List<HintInfo> findAll() {
            return null;
        }

        @Override
        public List<HintInfo.HintMapping> findByWordContent(String word_content) {
            return null;
        }

        @Override
        public Iterable<HintInfo> findAll(Sort sort) {
            return null;
        }

        @Override
        public Page<HintInfo> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public <S extends HintInfo> S save(S entity) {
            return null;
        }

        @Override
        public <S extends HintInfo> Iterable<S> saveAll(Iterable<S> entities) {
            return null;
        }

        @Override
        public Optional<HintInfo> findById(Short aShort) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(Short aShort) {
            return false;
        }

        @Override
        public Iterable<HintInfo> findAllById(Iterable<Short> shorts) {
            return null;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(Short aShort) {

        }

        @Override
        public void delete(HintInfo entity) {

        }

        @Override
        public void deleteAll(Iterable<? extends HintInfo> entities) {

        }

        @Override
        public void deleteAll() {

        }
    };*/


}
