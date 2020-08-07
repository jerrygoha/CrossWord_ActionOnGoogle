package com.o2o.action.server.app;

import com.google.actions.api.*;
import com.google.actions.api.response.ResponseBuilder;
import com.google.api.services.actions_fulfillment.v2.model.*;
import com.google.api.services.dialogflow_fulfillment.v2.model.WebhookRequest;
import com.o2o.action.server.util.CommonUtil;

import java.util.*;
import java.util.concurrent.ExecutionException;

public class Main extends DialogflowApp {

    String URL = "https://actions.o2o.kr/devsvr7/test/index.html";

    GameBoard gameBoard;
    UserInfo user;
    GameInfo gameinfo;
    TTS tts;

    private void setUp() {
        gameinfo = new GameInfo();
        tts = new TTS();
    }

//    ActionRequest ingameRequest;
//    public ActionResponse sendTxQuery(String text) {
//
//        if(ingameRequest==null)
//        {System.out.println("ingamerequst null" + text);}
//        System.out.println(ingameRequest.getIntent() + text);
//        ResponseBuilder rb = getResponseBuilder(ingameRequest);
//        Map<String, Object> data = rb.getConversationData();
//        Map<String, Object> htmldata = new HashMap<>();
//        HtmlResponse htmlResponse = new HtmlResponse();
//        System.out.println("recv query from Mainjava before text.eqult fail");
//        if(text.equals("fail"))
//        {
//            System.out.println("recv query from Mainjava after text.eqult fail");
//            htmldata.put("command","result");
//            htmldata.put("result","success");
//            Result results = gameBoard.getResult();
//            htmldata.put("level", user.getLevel());
//            htmldata.put("myExp", user.getMyExp());
//            htmldata.put("fullExp", user.getFullExp());
//            htmldata.put("myHint", user.getMyHint());
//            htmldata.put("myCoin", user.getMyCoin());
//            htmldata.put("correctList", results.getAnser());
//            htmldata.put("wrongList", results.getRestWord());
//            rb.removeContext("ingame");
//            rb.add(new ActionContext("result",3));
//            String response ="";
//            response = tts.getTtsmap().get("result");
//            return rb.add(new SimpleResponse().setTextToSpeech(response))
//                    .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
//                .build();
//      }
//        return rb.add(new SimpleResponse().setTextToSpeech("Loose!"))
//            .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
//            .build();
//    }

    @ForIntent("Default Fallback Intent")
    public ActionResponse fallback(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        String response = "Please say one more time";
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }

    @ForIntent("Default Welcome Intent")
    public ActionResponse defaultWelcome(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        String response;
        data.clear();
        setUp();
        data.put("history", "welcome");
        data.put("special case", false);
        htmldata.put("command", "welcome");

        user = new UserInfo();

        if (!request.hasCapability("actions.capability.INTERACTIVE_CANVAS")) {
            response = "Inveractive Canvas가 지원되지 않는 기기예요.";
            return rb.add(new SimpleResponse().setSsml(response)).endConversation().build();
        } else {
            response = tts.getTtsmap().get("welcome") ;
            return rb.add(new SimpleResponse().setTextToSpeech(response))
                    .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                    .build();
        }
    }


    @ForIntent("mainFromWelcome")
    public ActionResponse mainFromWelcome(ActionRequest request) throws ExecutionException, InterruptedException {
        return main(request);
    }
    @ForIntent("stageFromMain")
    public ActionResponse stageSelect(ActionRequest request) throws ExecutionException, InterruptedException {
        return stage(request);
    }
    @ForIntent("stageFromDifficulty")
    public ActionResponse stageFromDifficulty(ActionRequest request) throws ExecutionException, InterruptedException {
        return stage(request);
    }
    @ForIntent("stageFromResult")
    public ActionResponse stageFromResult(ActionRequest request) throws ExecutionException, InterruptedException {
        return stage(request);
    }
    @ForIntent("difficultyFromMain")
    public ActionResponse difficultySelect(ActionRequest request) throws ExecutionException, InterruptedException {
        return difficulty(request);
    }
    @ForIntent("difficultyFromStage")
    public ActionResponse difficultyFromStage(ActionRequest request) throws ExecutionException, InterruptedException {
        return difficulty(request);
    }
    @ForIntent("ingameFromDifficulty")
    public ActionResponse ingameFromDifficulty(ActionRequest request) throws ExecutionException, InterruptedException {
        return ingame(request);
    }
    @ForIntent("ingameFromResult")
    public ActionResponse ingameFromResult(ActionRequest request) throws ExecutionException, InterruptedException {
        return ingame(request);
    }


    @ForIntent("main")
    public ActionResponse main(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        data.put("history", "main");
        data.put("special case", false);

        htmldata.put("command", "main");
        htmldata.put("level", user.getLevel());
        htmldata.put("myExp", user.getMyExp());
        htmldata.put("fullExp", user.getFullExp());
        htmldata.put("myHint", user.getMyHint());
        htmldata.put("myCoin", user.getMyCoin());

        String response = tts.getTtsmap().get("main");
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }


    public ActionResponse stage(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        data.put("history", "stageSelect");
        data.put("special case", false);

        htmldata.put("command", "stageSelect");

        String response = tts.getTtsmap().get("stageselect");
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }


    public ActionResponse difficulty(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        //메인에서 왔는지,, 스테이지에서왔는지
        int stage;
        if (data.get("history").equals("main")) {
            stage = user.getLevel();
        } else {
            stage = ((Double) request.getParameter("number")).intValue();
        }

        data.put("stage", stage);
        data.put("history", "difficultySelect");
        data.put("special case", false);

        htmldata.put("command", "difficultySelect");
        htmldata.put("winMoney1", gameinfo.getStage()[1].getWinMoney());
        htmldata.put("winMoney2", gameinfo.getStage()[2].getWinMoney());
        htmldata.put("winMoney3", gameinfo.getStage()[3].getWinMoney());
        htmldata.put("betMoney1", gameinfo.getStage()[1].getBetMoney());
        htmldata.put("betMoney2", gameinfo.getStage()[2].getBetMoney());
        htmldata.put("betMoney3", gameinfo.getStage()[3].getBetMoney());
        htmldata.put("timeLimit1", gameinfo.getStage()[1].getTimeLimit()[0]);
        htmldata.put("timeLimit2", gameinfo.getStage()[2].getTimeLimit()[0]);
        htmldata.put("timeLimit3", gameinfo.getStage()[3].getTimeLimit()[0]);

        String response = tts.getTtsmap().get("difficultyselect");
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }


    public ActionResponse ingame(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();
        data.put("history", "ingame");
        data.put("special case", false);

        String response;
        gameBoard = new GameBoard(GameBoard.Difficulty.easy, 3);
        //gameBoard = new GameBoard(data.difficulty,data.stage);
        char[][] board = gameBoard.getBoard();
        int timeLimit = gameBoard.getTimeLimit();
        int totalWord = gameBoard.getTotalWord();
        htmldata.put("command", "ingame");
        htmldata.put("board", board);
        htmldata.put("timeLimit", timeLimit);
        htmldata.put("totalWord", totalWord);

        response = tts.getTtsmap().get("ingame");
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }

    @ForIntent("ingameMessage")
    public ActionResponse ingameMessage(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        String response = "";

        String word = CommonUtil.makeSafeString(request.getParameter("word"));

        if (word.isEmpty()) {
            htmldata.put("command", "hint");
            htmldata.put("hint", gameBoard.getHintMessage());
            response = "hint";
        } else {

            if (gameBoard.tryAnswer(word)) {
                htmldata.put("command", "correct");
                response = "correct";
                Result result = gameBoard.getResult();
                data.put("history", "result");
                data.put("special case", false);

                if (result.isWin()) {
                    htmldata.put("finish", true);
                    //htmldata.put("command","result");
                    //htmldata.put("result","success");
//                    Result results = gameBoard.getResult();
//                    htmldata.put("level", user.getLevel());
//                    htmldata.put("myExp", user.getMyExp());
//                    htmldata.put("fullExp", user.getFullExp());
//                    htmldata.put("myHint", user.getMyHint());
//                    htmldata.put("myCoin", user.getMyCoin());
//                    htmldata.put("correctList", results.getAnser());
//                    htmldata.put("wrongList", results.getRestWord());

//                               rb.removeContext("ingame");
//                    rb.add(new ActionContext("result",5));

//                    response = tts.getTtsmap().get("result");
//                    return rb.add(new SimpleResponse().setTextToSpeech(response))
//                            .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
//                            .build();
                } else
                    htmldata.put("finish", false);
            } else {
                htmldata.put("command", "wrong");
                response = "wrong";
            }
        }

        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }

    @ForIntent("result")
    public ActionResponse result(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        String result = CommonUtil.makeSafeString(request.getParameter("result"));

        data.put("history", "result");
        data.put("special case", false);

        htmldata.put("command", "result");
        htmldata.put("result", result);
        htmldata.put("level", user.getLevel());
        htmldata.put("myExp", user.getMyExp());
        htmldata.put("fullExp", user.getFullExp());
        htmldata.put("myHint", user.getMyHint());
        htmldata.put("myCoin", user.getMyCoin());
        Result results = gameBoard.getResult();
        htmldata.put("correctList", results.getAnser());
        htmldata.put("wrongList", results.getRestWord());

        String response="";
        if(result.equals("success"))
            response = tts.getTtsmap().get("success");
        else
            response = tts.getTtsmap().get("fail");

        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }


    @ForIntent("setting")
    public ActionResponse setting(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        data.put("special case", true);
        htmldata.put("command", "setting");

        String response = tts.getTtsmap().get("setting");

        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }

    @ForIntent("ranking")
    public ActionResponse ranking(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        data.put("special case", true);
        htmldata.put("command", "ranking");

        String response = tts.getTtsmap().get("ranking");
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }

    @ForIntent("shop")
    public ActionResponse shop(ActionRequest request) throws ExecutionException, InterruptedException {
        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        data.put("special case", true);
        htmldata.put("command", "shop");

        String response = tts.getTtsmap().get("store");
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }

    @ForIntent("return")
    public ActionResponse returnback(ActionRequest request) throws ExecutionException, InterruptedException {

        ResponseBuilder rb = getResponseBuilder(request);
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        String history = CommonUtil.makeSafeString(data.get("history"));
        Boolean isSpecial = (Boolean)(data.get("special case"));

        if(isSpecial) {
            htmldata.put("command", history);
            data.put("special case",false);

            String response = "return";
            return rb.add(new SimpleResponse().setTextToSpeech(response))
                    .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                    .build();
        }

        String response = "can't return";
        return rb.add(new SimpleResponse().setTextToSpeech(response))
                .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                .build();
    }
}
