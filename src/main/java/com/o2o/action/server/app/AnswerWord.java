package com.o2o.action.server.app;

import java.util.Stack;

public class AnswerWord {
    private  String Answer;
    private  String[] Hints;
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
    public String useHint()
    {
        if(HintsStack.empty())
            return "noHint";
        String hint = HintsStack.pop();
        return hint;
    }
    public int getAnswerLength()
    {
        return Answer.length();
    }
    public char getAnswerChar(int _index)
    {
        return Answer.charAt(_index);
    }
    public String getAnswer()
    {
        return Answer;
    }

}
