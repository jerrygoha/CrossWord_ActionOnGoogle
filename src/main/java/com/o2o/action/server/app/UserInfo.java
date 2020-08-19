package com.o2o.action.server.app;
//유저정보 클래스 - 실제로는 DBConnector에서 받아올것임
public class UserInfo {
    // 유저레벨
    private int mylevel;
    // 유저 누적 경험치
    private int myExp;
    // 유저 힌트
    private int myHint;
    // 유저 코인
    private int myCoin;
    // 스테이지 프로퍼티 정보
    private StagePropertyInfo stageInfo;
    // 상점 프로퍼티 정보
    private StorePropertyInfo storeInfo;
    public UserInfo(int _mylevel, int _myExp, int _myHint, int _myCoin, StagePropertyInfo _stageInfo )
    {
        mylevel = _mylevel;
        myExp = _myExp;
        myHint = _myHint;
        myCoin = _myCoin;
        stageInfo = _stageInfo;
        // 상점정보는 해당 UserInfo 내에서만 사용하기 때문에 이곳에서 인스턴스 생성
        storeInfo = new StorePropertyInfo();
    }


    public int getLevel() {
        return mylevel;
    }

    public int getMyExp() {
        return myExp;
    }

    public int getMyHint() {
        return myHint;
    }

    public int getMyCoin() {
        return myCoin;
    }


    // 유저 레벨업 - 레벨과 코인 증가
    private void UserLevelUp()
    {
        // levelupcoin은 해당 유저의 레벨에 따라 근거하므로 mylevel이 스테이지의 인덱스가 됨.
        int levelupcoin = stageInfo.Stages[mylevel].getLevelUpCoin();
        mylevel++;
        myCoin += levelupcoin;
    }
    // 스테이지 클리어 - 경험치, 코인 증가
    public void UserStageClearChange(int _stage, String _difficulty)
    {

        int winexp = stageInfo.Stages[_stage].getExp().get(_difficulty);
        int wincoin = stageInfo.Stages[_stage].getBetCoin().get(_difficulty);
        float coinratio = stageInfo.Stages[_stage].getCoinRatio();
        // levelupexp는 해당 유저의 레벨에 따라 근거하므로 mylevel이 스테이지의 인덱스가 됨.
        int levelupexp = stageInfo.Stages[mylevel].getLevelUpExp();
        // 코인 증가
        myCoin+=wincoin*coinratio;
        // 경험치 증가
        myExp+=winexp;
        // 레벨업 확인
        if(myExp>= levelupexp)
        {
            // 유저 레벨업
            UserLevelUp();
        }
    }
    // 게임 시작시 변경 - 배팅코인만큼 감소
    public void GameStartChange(int _stage, String _difficulty)
    {
        // 코인 감소
        myCoin -= stageInfo.Stages[_stage].getBetCoin().get(_difficulty);
    }


    // 상점에서 힌트구매 - 코인 감소, 힌트 증가
    public void HintPurchaseChange()
    {
        // 코인 감소
        myCoin-=storeInfo.getHintpurchase_losecoin();
        // 힌트 증가
        myHint+=storeInfo.getHintpurchase_gethint();
    }
    // 상점에서 광고 보고 코인 충전 - 코인 증가
    public void CoinChargeChange()
    {
        myCoin+=storeInfo.getHintcharge_getcoin();
    }
    // 상점에서 코인구매 - 코인 증가
    public void CoinPurchaseChange()
    {
        myCoin+=storeInfo.getCoinpurchase_getcoin();
    }
}