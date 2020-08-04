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
        ttsmap.put("welcome","Hello, welcome to XXX. To play the game, say 'Play' or press the button. ");
        ttsmap.put("main","Hello, welcome to XXX. XXX is a game of finding English words in a randomly \n" +
                "arranged alphabets within a set time.\n" +
                "Say 'Start' if you want to play the game, 'View all' if you want to select a level, \n" +
                "'Settings' if you want to see my settings. Say 'coin store'or'hint store' if you \n" +
                "want to purchase additional coins or hints, or click the button. \n" +
                "Which would you like to try?");
        ttsmap.put("setting","To change the game settings, say 'Sound effect on', 'background sound off', or \n" +
                "'reset'.");
        ttsmap.put("stageselect","You can play XXX at any level you want.\n" +
                "Say your desired level, as an example 'level1' or click the button.");
        ttsmap.put("difficultyselect","In XXX you can select the difficulty level. \n" +
                "As the game level gets higher, the game gets more difficult, the bigger entry \n" +
                "fee and the less time limit. However, if you win, you can earn additional coins \n" +
                "and experience point.\n" +
                "Select the difficulty level from Easy, medium or hard. When you are ready to \n" +
                "play, say like 'play' or click the button.");
        ttsmap.put("ingame","Find the word before the time limit ends! If you need help, you can say ‘hint’. \n" +
                "Let's play! ");
        ttsmap.put("result","Clear! (Fail) \n" +
                "Say 'again' if you want to play more games or 'end' if you want to quit the \n" +
                "game or click the button.");
        ttsmap.put("ranking","These are the top rankers of XXX. Would you like to give it a try?");
        ttsmap.put("store","You can buy coins and hints. To buy hints and coins, say 'purchase hints' or \n" +
                "'purchase coins'. You can get free coins by saying 'get coins' and watch the \n" +
                "ad. Say \"go back\" if you want to go to the game");
    }

}
