package com.o2o.action.server.app;

import java.util.Stack;
// 정답 클래스
public class AnswerWord {
    // 정답 문자
    private  String Answer;
    // 정답의 힌트 배열
    private  String[] Hints;
    // 정답의 힌트사용 카운트를 위한 힌트 스택
    private  Stack<String> HintsStack;
    public AnswerWord(String _word, String[] _hints)
    {
        Answer = _word;
        Hints= _hints.clone();
        HintsStack = new Stack<String>();
        for (String st:Hints)
        {
            HintsStack.push(st);
        }
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

}
