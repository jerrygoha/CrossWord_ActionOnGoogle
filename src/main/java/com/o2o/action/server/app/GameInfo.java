package com.o2o.action.server.app;
// 단순히 연산안하고 DB로 받아온 정보를 해당 클래스로 묶는 역활

// 스테이지 정보 클래스
class StageInfo
{
    // 보상 머니 반환
    public int getWinMoney() {
        return winMoney;
    }
    // 배팅 머니 반환
    public int getBetMoney() {
        return betMoney;
    }
    // 시간리스트(0 - easy, 1 - medium, 2 - hard) 반환
    public int[] getTimeLimit() {
        return timeLimit;
    }
    // 정답개수 반환
    public int getTotalWord() {
        return totalword;
    }
    // 맞을 금액
    private int winMoney =0;
    // 배팅 금액
    private int betMoney =0;
    // 시간리스트(0 - easy, 1 - medium, 2 - hard)
    private int timeLimit[];
    // 정답 개수
    private int totalword = 0;

    public StageInfo(int _winmoney, int _betmoney, int _timelimit[], int _totalword )
    {
        winMoney = _winmoney;
        betMoney = _betmoney;
        timeLimit = _timelimit;
        totalword = _totalword;
    }

}
// 게임에 필요한 정보
public class GameInfo {
    // 스테이지 카운트 반환
    public int getStageCount() {
        return StageCount;
    }
    // 스테이지 배열 반환
    public StageInfo[] getStage() {
        return Stage;
    }
    // 스테이지 개수
    int StageCount = 10;
    // 스테이지 배열
    private StageInfo[] Stage = new StageInfo[StageCount];
    public GameInfo()
    {
        //게임정보 DB에서 로드 (일단은 임의로 초기화)
        for (int i=0; i< StageCount; i++)
        {
            Stage[i] = new StageInfo(100,100,new int[]{30,25,20},3);
        }
    }

}
