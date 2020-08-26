package com.o2o.action.server.app;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

//@Service
public class DBConnector {
    String userEmail = "";

    String commandGetUser = "/getUser/";
    String commandCreateUser = "/createUser/";
    String defaultSendUrl = " ";
    QueryController queryController;
    JsonObject user;

    public DBConnector(String userEmail) {
        this.userEmail = userEmail;
        defaultSendUrl = "https://actions.o2o.kr/devsvr5" + commandGetUser + userEmail;
        queryController = new QueryController();
        String result = queryController.get(defaultSendUrl);
        JsonParser jsonParser = new JsonParser();

        if(result == null){
            defaultSendUrl = "https://actions.o2o.kr/devsvr5" + commandCreateUser + userEmail;
            queryController.get(defaultSendUrl);
        }else{
            //유저 한명 data 전체 row
            JsonArray jsonObject = (JsonArray) jsonParser.parse(result);
            //user = jsonObject.getAsString();
        }

    }

    public String GetUserInfo() {
        return user.toString();
    }
}






//    @Autowired
//    UserRepository userRepo;
//    WordInfoRepository wordRepo;
//    HintInfoRepository hintRepo;
//
//    String userEmail = "t2@naver.com";
//    User ur = new User();
//    /*
//    * user table 접근 함수
//    */
//    //신규유저 이메일 db로 저장
//    public String newUser(@PathVariable String email){
//        userRepo.save(new User(email));
//        return "new user data created";
//    }
//
//    //최근접속시간 갱신
//    public void visitCheck(){
//        ur.setVisitTimestamp();
//    }
//
//    //유저 정보 검색 email_level_exp_hint_coin
//    public List getUserInfo(String email){
//        return userRepo.findByUserEmail(email);
//    }
//
//    //유저 레벨 갱신
//    public void updateLevel(short level){
//        ur.setUserLevel(level);
//
//    }
//    //유저 경험치 갱신
//    public void updateExp(int exp){
//        ur.setUserExp(exp);
//    }
//    //유저 힌트 갱신
//    public void updateHint(int hint){
//        ur.setUserHint(hint);
//    }
//    //유저 코인 갱신
//    public void updateCoin(int coin){
//        ur.setUserCoin(coin);
//    }
//    //전체 랭킹 반환
//    public List<User> getTotalRank(){
//        List<Sort.Order> orders = new ArrayList<>();
//        Sort.Order order1 = new Sort.Order(Sort.Direction.DESC, "user_level");
//        orders.add(order1);
//        Sort.Order order2 = new Sort.Order(Sort.Direction.DESC, "user_exp");
//        orders.add(order2);
//        Sort.Order order3 = new Sort.Order(Sort.Direction.DESC, "account_timestamp");
//        orders.add(order3);
//        return (List<User>) userRepo.findAll(Sort.by(orders));
//    }
//    //개인 랭킹 반환
//
//    /*
//     * word table 접근 함수
//     */




