package com.o2o.action.server.app;


import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;

import javax.print.DocFlavor;
import java.io.FileNotFoundException;
import java.io.Serializable;
import java.util.*;

public class GameBoard implements Serializable {
    // 보드 배열
    private BoardCell Board[][];
    // 정답변수
    private AnswerWord[] answers;
    // 맞춘 정답 리스트
    private  ArrayList<AnswerWord> answerlist;
    // 맞춰야 할 정답 리스트
    private  ArrayList<AnswerWord> restanswerlist;
    //정답 개수
    private  int answercount;
    // 보드판 가로길이
    private  int col;
    // 보드판 세로길이
    private int row;
    // 현재 게임판의 스테이지
    private int stage;
    // 현재 게임판의 난이도
    private String difficulty;
    // 스테이지 프로퍼티 정보
    private StagePropertyInfo stageinfo;
    // 정답 배열
    private List<String> wordlist;
    // 힌트 배열
    private List<String> hintlist;
    // 유저 레벨
    private int userlevel;
    public GameBoard(String _difficulty, int _stage, StagePropertyInfo _stageinfo, List<String>_wordlist,List<String>_hintlist, int _userlevel )
    {
        // 매개변수 대입
        stageinfo = _stageinfo;
        stage = _stage;
        difficulty = _difficulty;
        row = stageinfo.Stages[stage].getSize_Row();
        col = stageinfo.Stages[stage].getSize_Col();
        answercount = stageinfo.Stages[stage].getAnswerCount();
        wordlist = _wordlist;
        hintlist = _hintlist;
        userlevel = _userlevel;
        // 보드판 생성
        makeBoard();
    }
    private void printBoard(BoardCell[][]board,int x, int y)
    {
        for (int i = 0; i<y; i++)
        {
            for (int j = 0; j<x; j++)
            {
                System.out.print(Board[i][j].cellchar + " ");
            }
            System.out.println();
        }
    }
    // 타임시간 가져오기
    public int getTimeLimit()
    {
        int timelimit =stageinfo.Stages[stage].getTime().get(difficulty);
        return timelimit;
    }
    // 총 단어 개수 가져오기
    public int getTotalWord()
    {
        return answercount;
    }
    // 보드판 배열 가져오기
    public char[][] getBoard()
    {
        char board[][] = new char[row][col];
        for (int i=0; i< row; i++)
        {
            for (int j=0; j< col; j++)
            {
                board[i][j] = Board[i][j].cellchar;
            }
        }
        return board;
    }
    // 정답 DB에서 가져오기
    private void loadAnswer()
    {
        if(wordlist.size()<answercount || hintlist.size()<answercount)
        {
            System.out.println("DB의 정답이나 힌트 리스트가 정답 개수 보다 적습니다.");
            return;

        }
        answers = new AnswerWord[answercount];
        int dif = 0;
        if(difficulty.equals("easy"))
            dif = 1;
        else if(difficulty.equals("medium"))
            dif = 2;
        else if(difficulty.equals("hard"))
            dif = 3;
        for(int i=0; i< answercount; i++)
        {
            AnswerWord answerWord = new AnswerWord(wordlist.get(i),new String[]{hintlist.get(i)});
            answers[i]=answerWord;
        }

        Arrays.sort(answers);
    }
    // 보드판 만들기
    private void makeBoard()
    {
        Board = new BoardCell[row][col];
        answerlist = new ArrayList<AnswerWord>();
        restanswerlist = new ArrayList<AnswerWord>();
         // 정답 불러오기
        loadAnswer();
        // 채워야할 정답 리스트에 모든 정답 넣기
        for (int i=0; i<answercount; i++)
        {
            restanswerlist.add(answers[i]);
        }
        // 오른쪽 아래 1~5스테이지
        ArrayList dirarray1 = new ArrayList(Arrays.asList(2,4));
        // 오른쪽, 오른쪽 아래,아래 6~9스테이지
        ArrayList dirarray2 = new ArrayList(Arrays.asList(2,3,4));
        // 전방향 10스테이지
        ArrayList dirarray3 = new ArrayList(Arrays.asList(0,1,2,3,4,5,6,7));
        ArrayList dirarray = null;
        if(userlevel<6)
        {
            dirarray = dirarray1;
        }
        else if(userlevel<10)
        {
            dirarray = dirarray2;
        }else if( userlevel>=10)
        {
            dirarray = dirarray3;
        }

        // 보드판 알고리즘 클래스 인스턴스 생성
        BoardAlgorithm boardAlgorithm = new BoardAlgorithm(col,row,Board,answers);
        // 보드판 알고리즘이 성공할때까지 계속 시도
        boolean issucess = false;
        while(!issucess)
        {
            System.out.println("보드생성 실패!");
            boardAlgorithm = new BoardAlgorithm(col,row,Board,answers);
            // 보드판에 정답 알파벳 넣기
            boardAlgorithm.MakeUpBoardAnswer(dirarray);
            //보드판에서 정답아닌곳에 랜덤 알파벳 구성
            boardAlgorithm.MakeUpBoardAlphabet();
            issucess = boardAlgorithm.isBoardSuccess;
        }
        // 성공보드 저장하기
        Board = boardAlgorithm.Successboard;
        //보드판 출력
        printBoard(Board,col,row);
    }
    // 해당 정답의 힌트 얻기
    private String getHint(AnswerWord _answerWord)
    {
        //만약 힌트가 없으면 "NoHint" 출력
        return _answerWord.useHint();
    }
    // 힌트 메세지 출력
    public String getHintMessage()
    {
        if(restanswerlist.size()==0)
            return "맞춰야 할 단어가 더이상 없습니다.";
        for(int i=0; i< restanswerlist.size(); i++)
        {
        }
        return restanswerlist.get(0).useHint();
    }
    // 정답의 좌표정보 가져오기
    public String[] GetAnswerPoint(String _answer)
    {
        for (int i = 0; i<answercount; i++)
        {
            if(answers[i].getAnswer().equals(_answer)) {
                return answers[i].GetAlphabetPoint();
            }
        }
        System.out.println("좌표정보 가져오기 오류 : 가져오려는 정답이 부적절합니다");
        return null;
    }
    // 정답 시도
    public boolean tryAnswer(String _answer)
    {
        // 정답맞았는지 체크
        for (int i = 0; i<answercount; i++)
        {
            if(answers[i].getAnswer().equals(_answer))
            {
                // 정답 맞았으면 정답리스트에 추가하고 맞춰야할 리스트에서 제거
                answerlist.add(answers[i]);
                if(restanswerlist.size()>0)
                    restanswerlist.remove(answers[i]);
                return  true;
            }
        }
        return false;
    }
    // 결과값 가져오기
    public Result getResult()
    {
        Result result = new Result();
        // 결과 객체에 정답리스트와 맞춰야할답 리스트 복사 후 리턴
        for (AnswerWord i:answerlist) {
            if(!result.answer.contains(i.getAnswer()))
            {
                result.answer.add(i.getAnswer());
            }
        }
        for (AnswerWord i:restanswerlist) {
            if(!result.restword.contains(i.getAnswer()))
            {
                result.restword.add(i.getAnswer());
            }

        }
        return result;
    }
}
