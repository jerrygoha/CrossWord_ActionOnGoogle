package com.o2o.action.server.app;
// 단순히 연산안하고 DB로 받아온 정보를 해당 클래스로 묶는 역활

class StageInfo
{
    public int getWinMoney() {
        return winMoney;
    }

    public int getBetMoney() {
        return betMoney;
    }

    public int[] getTimeLimit() {
        return timeLimit;
    }
    public int getTotalWord() {
        return totalword;
    }
    int winMoney =0;
    int betMoney =0;
    int timeLimit[];
    int totalword = 0;



    public StageInfo(int _winmoney, int _betmoney, int _timelimit[], int _totalword )
    {
        winMoney = _winmoney;
       betMoney = _betmoney;
       timeLimit = _timelimit;
        totalword = _totalword;
    }

}
public class GameInfo {
    public int getStageCount() {
        return StageCount;
    }

    public StageInfo[] getStage() {
        return Stage;
    }

    int StageCount = 10;
    StageInfo[] Stage = new StageInfo[StageCount];
    public GameInfo()
    {
        //게임정보 DB에서 로드 (일단은 임의로 초기화)
        for (int i=0; i< StageCount; i++)
        {
            Stage[i] = new StageInfo(100,100,new int[]{30,25,20},3);
        }
    }

}
