package com.o2o.action.server.app;

import java.io.*;
import java.net.URL;
import java.util.Properties;

public class StorePropertyInfo implements Serializable {


    // 힌트 구입 시 잃는 코인
    private int hintpurchase_losecoin=0;
    // 힌트 구입 시 얻는 힌트
    private int hintpurchase_gethint=0;
    // 힌트 충전 시 얻는 코인
    private int hintcharge_getcoin=0;
    // 코인 구입 시 얻는 코인
    private int coinpurchase_getcoin=0;
    // 프로퍼티 변수
    private Properties  props= null;

    public int getHintpurchase_losecoin() {
        return hintpurchase_losecoin;
    }

    public int getHintpurchase_gethint() {
        return hintpurchase_gethint;
    }

    public int getHintcharge_getcoin() {
        return hintcharge_getcoin;
    }

    public int getCoinpurchase_getcoin() {
        return coinpurchase_getcoin;
    }
    public StorePropertyInfo()
    {
        try {
            // 프로퍼티 경로
            String propFile = "https://actions.o2o.kr/devsvr3/properties/StoreProperties.properties";
            // 프로퍼티 변수 초기화
            props = new Properties();
            // 인풋 스트림 생성
            InputStream is = new URL(propFile).openStream();
            // 인풋 스트림 리더 생성
            Reader reader = new InputStreamReader(is,"UTF-8");
            // 인풋 스트림 로드
            props.load(reader);
               hintpurchase_gethint = GetIntProperty("store.hintpurchase.gethint");
                hintpurchase_losecoin = GetIntProperty("store.hintpurchase.losecoin");
                hintcharge_getcoin = GetIntProperty("store.hintcharge.getcoin");
                coinpurchase_getcoin = GetIntProperty("store.coinpurchase.getcoin");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {

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
