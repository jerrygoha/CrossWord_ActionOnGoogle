package com.o2o.action.server.app;
//유저정보 클래스 - 실제로는 DBConnector에서 받아올것임
public class UserInfo {

    private int level;
    private int myExp;
    private int fullExp;
    private int myHint;
    private int myCoin;


    public UserInfo() {
        //레벨
        level = 2;
        // 현재 경험치
        myExp = 31;
        // 전체 경험치
        fullExp = 54;
        // 가진 힌트 개수
        myHint = 4;
        // 가진 코인 개수
        myCoin = 5000;
    }
    public UserInfo(int _level, int _myExp, int _fullExp, int _myHint, int _myCoin)
    {
        // 원래는 DB객체에서 숫자를 가져올거임
        level = _level;
        myExp = _myExp;
        fullExp = _fullExp;
        myHint = _myHint;
        myCoin = _myCoin;
    }


    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getMyExp() {
        return myExp;
    }

    public void setMyExp(int myExp) {
        this.myExp = myExp;
    }

    public int getFullExp() {
        return fullExp;
    }

    public void setFullExp(int fullExp) {
        this.fullExp = fullExp;
    }

    public int getMyHint() {
        return myHint;
    }

    public void setMyHint(int myHint) {
        this.myHint = myHint;
    }

    public int getMyCoin() {
        return myCoin;
    }

    public void setMyCoin(int myCoin) {
        this.myCoin = myCoin;
    }



    void SetUserInfo(int _level, int _myExp, int _fullExp, int _myHint, int _myCoin)
    {
        level = _level;
        myExp = _myExp;
        fullExp = _fullExp;
        myHint = _myHint;
        myCoin = _myCoin;
    }

}