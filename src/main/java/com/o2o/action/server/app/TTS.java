package com.o2o.action.server.app;

import java.util.HashMap;

public class TTS {
    public HashMap<String, String> getTtsmap() {
        return ttsmap;
    }

    private HashMap<String,String> ttsmap;
    public TTS()
    {
        ttsmap = new HashMap<>();
        //원래는 DB로 TTS 정보 가져올것임
        ttsmap.put("welcome","안녕하세요 크로스 워드에 오신 걸 환영합니다. 크로스 워드는 무작위하게 나열되어 있는 알파벳 사이에서 정해진 시간 내 영어 단어를 찾아내는 게임입니다. ");
        ttsmap.put("main","예전에 하신 적이 있다면 이어하기를 새로운 게임을 원하신다면 새게임을 코인 또는 힌트를 추가 구매하고 싶다면coin purchase, hint purchase라고 말하거나 버튼을 클릭하면 됩니다어느 걸 해보시겠어요? ");
        ttsmap.put("stageselect","크로스 워드는 여러 스테이지를 선택 하실 수 있습니다. 스테이지가 올라갈수록 단어의 수와 난이도가 증가합니다. 스테이지를 선택해 주세요.");
        ttsmap.put("difficultyselect","크로스워드는 난이도에 따라 게임할 수 있습니다. 어려운 난이도일수록 제한시간이 적지만 이길 경우 코인을 추가 획득할 수 있으며 경험치도 큽니다 Easy, medium, hard 중 난이도를 선택해 주세요.");
        ttsmap.put("ingame","타이머가 종료하기 전에 단어를 찾아주세요. ");
        ttsmap.put("win","게임에서 승리하였습니다. 원하시는 버튼을 선택해주세요.");
        ttsmap.put("loose","게임에서 패배하셨습니다. 원하시는 버튼을 선택해주세요.");
    }

}
