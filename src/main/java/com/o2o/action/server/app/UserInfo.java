package com.o2o.action.server.app;

public class UserInfo {

    private int level;
    private int myExp;
    private int fullExp;
    private int myHint;
    private int myCoin;


    public UserInfo() {
            level = 2;
            myExp = 31;
            fullExp = 54;
            myHint = 4;
            myCoin = 5000;
            //DB에서 가져오기
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
