package com.o2o.action.server.app;
import org.jetbrains.annotations.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Stack;
// 정답 클래스
public class AnswerWord implements Comparable, Serializable {
    // 정답 문자
    private  String Answer;
    // 정답의 힌트 배열
    private  String[] Hints;
    // 정답의 힌트사용 카운트를 위한 힌트 스택
    private  Stack<String> HintsStack;
    // 정답 알파벳의 좌표 배열
    private String[] AnswerPoint;
    public AnswerWord(String _word, String[] _hints)
    {
        Answer = _word;
        Hints= _hints.clone();
        HintsStack = new Stack<String>();
        HintsStack.push(Character.toString(Answer.charAt(0)));
        String LenSt = "";
        for(int i=0; i< Answer.length(); i++)
        {
            LenSt +="_ ";
        }
        HintsStack.push(LenSt);

        HintsStack.push(Hints[0]);
        // row좌표 col좌표 이므로 *2의 배열 자리 선정
        AnswerPoint = new String[Answer.length()];
    }
    // 해당 정답의 알파벳 위치 기록
    public void SetAlphabetPoint(int _alphabetindex, int _row, int _col)
    {
        if(_alphabetindex>=Answer.length())
        {
            System.out.println("인덱스가 단어의 길이를 벗어났습니다.");
            return;
        }
        String pointstring = _row+","+_col;
        // AnswerPoint[_alphabetindex*2] = _row;
        AnswerPoint[_alphabetindex] = pointstring;
    }
    // 정답의 알파벳 위치 배열 반환
    public String[] GetAlphabetPoint()
    {
        return AnswerPoint;
    }
    // 해당 힌트스택에서 힌트 뺴기
    public String useHint()
    {
        // 만약 스택이 비었으면 noHint 출력
        if(HintsStack.empty())
            return "noHint";
        String hint = HintsStack.pop();
        return hint;
    }
    // 정답 길이 반환
    public int getAnswerLength()
    {
        return Answer.length();
    }
    // 정답 String 내부 char 반환
    public char getAnswerChar(int _index)
    {
        return Answer.charAt(_index);
    }
    // 정답 반환
    public String getAnswer()
    {
        return Answer;
    }
    @Override
    public int compareTo(@NotNull Object _answerWord) {
        AnswerWord answerWord = (AnswerWord)_answerWord;
        if (this.getAnswerLength() < answerWord.getAnswerLength()) {
            return 1;
        } else if (this.getAnswerLength() == answerWord.getAnswerLength()) {
            return 0;
        } else {
            return -1;
        }
    }
}