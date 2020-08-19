package com.o2o.action.server.app;

import java.io.*;
import java.net.URL;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

class Stage
{
    // 스테이지 갯수
    private int StageCount=0;
    // 이겼을 때 얻는 코인 배수
    private float CoinRatio=0.0f;
    // 보드판 세로열
    private  int Size_Row=0;
    // 보드판 가로열
    private  int Size_Col=0;
    // 배팅코인 (easy, medium. hard)
    private Map<String, Integer> BetCoin;
    // 제한시간 (easy, medium. hard)
    private Map<String, Integer> Time;
    // 얻는 경험치 (easy, medium. hard)
    private Map<String, Integer> Exp;
    // 정답 갯수
    private  int AnswerCount=0;
    // 레벨업에 필요한 누적 경험치
    private  int LevelUpExp=0;
    // 스테이지업에 따른 지급 코인
    private  int LevelUpCoin=0;


    public float getCoinRatio() {
        return CoinRatio;
    }

    public int getSize_Row() {
        return Size_Row;
    }

    public int getSize_Col() {
        return Size_Col;
    }

    public Map<String, Integer> getBetCoin() {
        return BetCoin;
    }

    public Map<String, Integer> getTime() {
        return Time;
    }

    public Map<String, Integer> getExp() {
        return Exp;
    }

    public int getAnswerCount() {
        return AnswerCount;
    }

    public int getLevelUpExp() {
        return LevelUpExp;
    }

    public int getLevelUpCoin() {
        return LevelUpCoin;
    }

    public Stage(int stagecount,float coinratio,int size_Row, int size_Col,int easy_BetCoin, int medium_BetCoin, int hard_BetCoin, int easy_Time, int medium_Time, int hard_Time, int answerCount, int easy_Exp, int medium_Exp, int hard_Exp, int levelUpExp, int levelUpCoin) {
        StageCount = stagecount;
        CoinRatio = coinratio;
        Size_Row = size_Row;
        Size_Col = size_Col;
        BetCoin = new HashMap<String, Integer>();
        BetCoin.put("easy", easy_BetCoin);
        BetCoin.put("medium", medium_BetCoin);
        BetCoin.put("hard", hard_BetCoin);
        Time = new HashMap<String,Integer>();
        Time.put("easy",easy_Time);
        Time.put("medium",medium_Time);
        Time.put("hard",hard_Time);
        Exp = new HashMap<String,Integer>();
        Exp.put("easy",easy_Exp);
        Exp.put("medium",medium_Exp);
        Exp.put("hard",hard_Exp);
        AnswerCount = answerCount;
        LevelUpExp = levelUpExp;
        LevelUpCoin = levelUpCoin;
    }



}
// 스테이지 프로퍼티 정보 클래스
public class StagePropertyInfo {
    private Properties props = null;
    public Stage[] Stages = null;

    public StagePropertyInfo() throws FileNotFoundException {
        try {
            // 프로퍼티 경로
            String propFile = "https://actions.o2o.kr/devsvr7/properties/StageProperties.properties";
            // 프로퍼티 변수 초기화
            props = new Properties();
            // 인풋 스트림 생성
            InputStream is = new URL(propFile).openStream();
            // 인풋 스트림 리더 생성
            Reader reader = new InputStreamReader(is,"UTF-8");
            // 인풋 스트림 로드
            props.load(reader);
            // 스테이지 갯수
            int StageCount =GetIntProperty("stagecount");
            // 스테이지 변수 초기화
            Stages= new Stage[StageCount+1];
            for (int i=1; i<= StageCount; i++)
            {
                int stagecount = GetIntProperty("stagecount");
                float coinratio = Float.parseFloat(props.getProperty("coinratio"));
                int size_row = GetIntProperty("stage"+i+".size.row");
                int size_col = GetIntProperty("stage"+i+".size.col");
                int easy_betcoin = GetIntProperty("stage"+i+".easy.betcoin");
                int medium_betcoin = GetIntProperty("stage"+i+".medium.betcoin");
                int hard_betcoin = GetIntProperty("stage"+i+".hard.betcoin");
                int easy_time = GetIntProperty("stage"+i+".easy.time");
                int medium_time = GetIntProperty("stage"+i+".medium.time");
                int hard_time = GetIntProperty("stage"+i+".hard.time");
                int answercount = GetIntProperty("stage"+i+".answercount");
                int easy_exp = GetIntProperty("stage"+i+".easy.exp");
                int medium_exp = GetIntProperty("stage"+i+".medium.exp");
                int hard_exp = GetIntProperty("stage"+i+".hard.exp");
                int levelupexp = GetIntProperty("stage"+i+".levelupexp");
                int levelupcoin = GetIntProperty("stage"+i+".levelupcoin");
                Stage tmpstage = new Stage(stagecount,coinratio,size_row,size_col,easy_betcoin,medium_betcoin,hard_betcoin,easy_time,medium_time,hard_time,answercount,easy_exp,medium_exp,hard_exp,levelupexp,levelupcoin);
                Stages[i] = tmpstage;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {

        }
    }



    // key를 통해 나오는 String 결과를 INT로 바꿔주기
    private int GetIntProperty(String key)
    {
        try{
            return Integer.parseInt(props.getProperty(key));

        }catch(Exception e)
        {
            throw  e;
        }

    }
}
