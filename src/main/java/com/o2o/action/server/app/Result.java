package com.o2o.action.server.app;
import java.io.Serializable;
import java.util.ArrayList;

class Result implements Serializable
{
    //맞춘 단어
    ArrayList<String> answer;
    //맞춰야 할 단어
    ArrayList<String> restword;
    public Result()
    {
        answer = new ArrayList<String>();
        restword = new ArrayList<String>();
    }
    // 맞춘 단어 반환
    public ArrayList<String> getAnser()
    {
        return  answer;
    }
    // 맞춰야할 단어 반환
    public ArrayList<String> getRestWord()
    {
        return restword;
    }
    // 정답을 모두 맞췄는지 반환
    public boolean isWin()
    {
        return restword.size()==0? true:false;
    }

}
