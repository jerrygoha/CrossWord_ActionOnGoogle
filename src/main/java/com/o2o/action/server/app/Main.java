package com.o2o.action.server.app;

import com.google.actions.api.*;
import com.google.actions.api.response.ResponseBuilder;
import com.google.api.services.actions_fulfillment.v2.model.*;
import com.o2o.action.server.util.CommonUtil;

import java.io.*;
import java.net.URL;
import java.util.*;
import java.util.concurrent.ExecutionException;

public class Main extends DialogflowApp {

    public static void main(String[] args) {
        BoardCell[][] Board = new BoardCell[4][4];
        int answercount = 3;
        AnswerWord[] answers = new AnswerWord[answercount];

        AnswerWord answerWord = new AnswerWord("back", new String[]{"힌트입니다.", "힌트입닌다2", "힌트입니다3"});
        answers[0] = answerWord;
        answerWord = new AnswerWord("dog", new String[]{"힌트입니다.", "힌트입닌다2", "힌트입니다3"});
        answers[1] = answerWord;
        answerWord = new AnswerWord("wing", new String[]{"힌트입니다.", "힌트입닌다2", "힌트입니다3"});
        answers[2] = answerWord;
    /*    answerWord = new AnswerWord("comes",new String[]{"힌트입니다.","힌트입닌다2","힌트입니다3"});
        answers[3]=answerWord;
        answerWord = new AnswerWord("apple",new String[]{"힌트입니다.","힌트입닌다2","힌트입니다3"});
        answers[4]=answerWord;*/
        Arrays.sort(answers);
        boolean issucess = false;
        ArrayList dirarray1 = new ArrayList(Arrays.asList(2, 4));

        ArrayList dirarray2 = new ArrayList(Arrays.asList(2, 3, 4));

        ArrayList dirarray3 = new ArrayList(Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7));

        // 보드판 알고리즘 클래스 인스턴스 생성
        BoardAlgorithm boardAlgorithm = new BoardAlgorithm(4, 4, Board, answers);
        // 보드판에 정답 알파벳 넣기
        boardAlgorithm.MakeUpBoardAnswer(dirarray3);
        //보드판에서 정답아닌곳에 랜덤 알파벳 구성
        boardAlgorithm.MakeUpBoardAlphabet();
        issucess = boardAlgorithm.isBoardSuccess;
        // 보드판 알고리즘이 성공할때까지 계속 시도
        while (!issucess) {
            System.out.println("보드생성 실패!");
            boardAlgorithm = new BoardAlgorithm(4, 4, Board, answers);
            // 보드판에 정답 알파벳 넣기
            boardAlgorithm.MakeUpBoardAnswer(dirarray3);
            //보드판에서 정답아닌곳에 랜덤 알파벳 구성
            boardAlgorithm.MakeUpBoardAlphabet();
            issucess = boardAlgorithm.isBoardSuccess;

        }

        Board = boardAlgorithm.Successboard;
        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                System.out.print(Board[i][j].cellchar + " ");
            }
            System.out.println();
        }
        String ss = Createserial(boardAlgorithm);
    boardAlgorithm = (BoardAlgorithm) Desrial(ss);

    }

    String URL = "https://actions.o2o.kr/devsvr4/test/index.html";

    StagePropertyInfo stageinfo;
    TTS tts;

    private void setUp() {
        tts = new TTS();
        try {
            stageinfo = new StagePropertyInfo();
        } catch (FileNotFoundException e) {
            e.getStackTrace();
        }

    }

   static String Createserial(Object obj) {
        byte[] serializedMember = null;
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream out = new ObjectOutputStream(baos);
            out.writeObject(obj);
            serializedMember = baos.toByteArray();
            out.close();
            System.out.println("serial!! " + serializedMember);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Base64.getEncoder().encodeToString(serializedMember);
    }

   static Object Desrial(String outst) {
        byte[] inserializedMember = Base64.getDecoder().decode(outst);
        ;
        try {
            ByteArrayInputStream bais = new ByteArrayInputStream(inserializedMember);
            ObjectInputStream out = new ObjectInputStream(bais);
            System.out.println("serial!!!");
            out.close();
            return out.readObject();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
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
        Map<String, Object> data = rb.getConversationData();
        Map<String, Object> htmldata = new HashMap<>();
        HtmlResponse htmlResponse = new HtmlResponse();

        if (data.get("history") != null && data.get("history").equals("ingame")) {
            htmldata.put("command", "wrong");
            String response = "wrong";
            return rb.add(new SimpleResponse().setTextToSpeech(response))
                    .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                    .build();
        }

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
        request.getConversationData().clear();
        System.out.println(request.getConversationData());
        System.out.println(request.getContexts());
        data.clear();
        setUp();
        data.put("history", "welcome");
        data.put("special case", false);
        htmldata.put("command", "welcome");

        //db 연결
       UserInfo user = new UserInfo(1,0,3,5000,stageinfo);
       String serial = Createserial(user);
       data.put("user",serial);
        if (!request.hasCapability("actions.capability.INTERACTIVE_CANVAS")) {
            response = "Inveractive Canvas가 지원되지 않는 기기예요.";
            return rb.add(new SimpleResponse().setSsml(response)).endConversation().build();
        } else {
            response = tts.getTtsmap().get("welcome");
            return rb.add(new SimpleResponse().setTextToSpeech(response))
                    .add(htmlResponse.setUrl(URL).setUpdatedState(htmldata))
                    .build();
        }
    }

    @ForIntent("home")
    public ActionResponse home(ActionRequest request) throws ExecutionException, InterruptedException {
        return main(request);
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
        // 세팅,상점, 랭킹인 경우 - 스페셜 케이스 -> 뒤로 돌아갈 수 있음
        data.put("special case", false);

        htmldata.put("command", "main");
        // User정보 가져오기
        String userserial = (String)data.get("user");
        UserInfo user = (UserInfo) Desrial(userserial);

        htmldata.put("level", user.getLevel());
        htmldata.put("myExp", user.getMyExp());
        htmldata.put("myHint", user.getMyHint());
        htmldata.put("myCoin", user.getMyCoin());
        htmldata.put("fullExp",1024000);
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
        // User정보 가져오기
        String userserial = (String)data.get("user");
        UserInfo user = (UserInfo) Desrial(userserial);
       // UserInfo user = new UserInfo(1,0,3,5000,stageinfo);
        //메인에서 왔는지,, 스테이지에서왔는지
        int stage;
        if (data.get("history").equals("main")) {
            stage = user.getLevel();
        } else {
            stage = ((Double) request.getParameter("number")).intValue();
        }

        data.put("history", "difficultySelect");
        data.put("special case", false);
        data.put("stage", stage);

        htmldata.put("command", "difficultySelect");
        Stage SelectStage = stageinfo.Stages[stage];
        htmldata.put("winMoney1",Float.toString(SelectStage.getBetCoin().get("easy")*SelectStage.getCoinRatio()));
        htmldata.put("winMoney2", Float.toString(SelectStage.getBetCoin().get("medium")*SelectStage.getCoinRatio()));
        htmldata.put("winMoney3", Float.toString(SelectStage.getBetCoin().get("hard")*SelectStage.getCoinRatio()));
        htmldata.put("betMoney1", stageinfo.Stages[stage].getBetCoin().get("easy").toString());
        htmldata.put("betMoney2", stageinfo.Stages[stage].getBetCoin().get("medium").toString());
        htmldata.put("betMoney3", stageinfo.Stages[stage].getBetCoin().get("hard").toString());
        htmldata.put("timeLimit1", stageinfo.Stages[stage].getTime().get("easy").toString());
        htmldata.put("timeLimit2", stageinfo.Stages[stage].getTime().get("medium").toString());
        htmldata.put("timeLimit3", stageinfo.Stages[stage].getTime().get("hard").toString());

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

        //난이도에서 왔는지, 결과에서왔는지
        String difficulty;

        double stages = ((double)data.get("stage"));
        int stage = (int)stages;
        if (data.get("history").equals("result")) {
            difficulty = CommonUtil.makeSafeString(data.get("difficulty"));
        } else {
            difficulty = CommonUtil.makeSafeString(request.getParameter("difficulty"));
        }

        data.put("history", "ingame");
        data.put("special case", false);
        data.put("difficulty",difficulty);

        // User정보 가져오기
        String userserial = (String)data.get("user");
        UserInfo user = (UserInfo) Desrial(userserial);
        // 유저 게임 시작 시 코인 감소
        user.GameStartChange(stage,difficulty);
        // 유저 정보 저장
        userserial = Createserial(user);
        data.put("user",userserial);

        String response;
        // 게임보드 생성
       GameBoard gameBoard = new GameBoard(difficulty, stage,stageinfo);
       // 게임보드 직렬화 후 전송
        String boardserial = Createserial(gameBoard);
        data.put("gameboard",boardserial);
        char[][] board = gameBoard.getBoard();
        int timeLimit = gameBoard.getTimeLimit();
        int totalWord = gameBoard.getTotalWord();
        htmldata.put("command", "ingame");
        htmldata.put("board", board);
        htmldata.put("timeLimit", timeLimit);
        htmldata.put("totalWord", totalWord);
        htmldata.put("gameboard",gameBoard);
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
        String hint = CommonUtil.makeSafeString(request.getParameter("hint"));
        // User정보 가져오기
        String userserial = (String)data.get("user");
        UserInfo user = (UserInfo) Desrial(userserial);
        // GameBoard정보 가져오기
        String boardserial = (String)data.get("gameboard");
        GameBoard gameBoard = (GameBoard) Desrial(boardserial);
        if (word.isEmpty()) {

            if (hint.equals("open")) {
                htmldata.put("command", "openhint");
                // 힌트 개수 차감
                user.ConsumeHintCount();
                htmldata.put("hint", gameBoard.getHintMessage());
                response = "open hint";
            }

        } else {
            if (gameBoard.tryAnswer(word)) {
                htmldata.put("command", "correct");
                response = "correct";
                htmldata.put("matchpoint", gameBoard.GetAnswerPoint(word));
                Result result = gameBoard.getResult();
                if (result.isWin())
                    htmldata.put("finish", true);
                else
                    htmldata.put("finish", false);
            } else {
                htmldata.put("command", "wrong");
                response = "wrong";
            }
        }
        // 게임보드 저장
        boardserial = Createserial(gameBoard);
        data.put("gameboard",boardserial);
        // 유저 정보 저장
        userserial = Createserial(user);
        data.put("user",userserial);
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

        // User정보 가져오기
        String userserial = (String)data.get("user");
        UserInfo user = (UserInfo) Desrial(userserial);

        //결과, stage, difficulty에 따라 user의 level, exp, coin 정보를 조정한다.
        String response = "";
        double stage = (double)data.get("stage");
        String difficulty = (String)data.get("difficulty");
        if (result.equals("success"))
        {
            response = tts.getTtsmap().get("success");
            user.UserStageClearChange((int)stage,difficulty);
        }

        else
        {
            response = tts.getTtsmap().get("fail");
        }
        htmldata.put("command", "result");
        htmldata.put("result", result);
        htmldata.put("level", user.getLevel());
        htmldata.put("myExp", user.getMyExp());
        htmldata.put("myHint", user.getMyHint());
        htmldata.put("myCoin", user.getMyCoin());
        // GameBoard정보 가져오기
        String boardserial = (String)data.get("gameboard");
        GameBoard gameBoard = (GameBoard) Desrial(boardserial);
        Result results = gameBoard.getResult();
        htmldata.put("correctList", results.getAnser());
        htmldata.put("wrongList", results.getRestWord());
        // 유저 정보 저장
        String serial = Createserial(user);
        data.put("user",serial);
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

    @ForIntent("store")
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
        Boolean isSpecial = (Boolean) (data.get("special case"));

        if (isSpecial) {
            htmldata.put("command", history);
            data.put("special case", false);

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
