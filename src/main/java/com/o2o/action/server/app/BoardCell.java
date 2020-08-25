package com.o2o.action.server.app;

import java.io.Serializable;

public class BoardCell implements Serializable {
    public char cellchar;
    public boolean isAnswer;
    public BoardCell()
    {
        cellchar = '*';
        isAnswer = false;
    }
}
