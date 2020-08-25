package com.o2o.action.server.app;

import java.io.Serializable;
import java.lang.reflect.Array;
import java.util.*;

// x,y 좌표점 클래스
class Point implements Serializable
{
    private int rowpoint=0;
    private int colpoint=0;
    public Point(int _row, int _col)
    {
        rowpoint = _row;
        colpoint = _col;
    }
    public Point GetRandomPoint(int _limitrow, int _limitcol)
    {
        Random random = new Random();
        int randomrow = random.nextInt(_limitrow-1);
        int randomcol = random.nextInt(_limitcol-1);
        rowpoint = randomrow;
        colpoint = randomcol;
        return this;
    }
    public int GetRow()
    {
        return rowpoint;
    }

    public int GetCol()
    {
        return colpoint;
    }
}
// 보드판 알고리즘 클래스
public class BoardAlgorithm implements Serializable{
    private int col = 0;
    private int row = 0;
    public BoardCell[][] board;
    private AnswerWord answers[];
    private int answercount = 0;
    // 성공한 결과가 담긴 보드판
    public BoardCell[][] Successboard;
    // 보드 생성에 성공했는지 변수
    public boolean isBoardSuccess = false;
    private void printBoard(BoardCell[][] tmpboard) {
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                System.out.print(tmpboard[i][j].cellchar + " ");
            }
            System.out.println();
        }
        System.out.println();
    }

    // 보드판 구성 정보 초기화
    public BoardAlgorithm(int _col, int _row, BoardCell[][] _board, AnswerWord _answers[]) {
        col = _col;
        row = _row;
        board = _board;
        answers = _answers.clone();
        answercount = _answers.length;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                BoardCell cell = new BoardCell();
                board[i][j] = cell;
            }
        }
        for(int i=0; i<_answers.length; i++)
        {
            if(_answers[i].getAnswerLength()>col ||_answers[i].getAnswerLength()>row )
            {
                System.out.println("정답단어의 길이가 너무 깁니다. 종료합니다.");
                return;
            }
        }

        isBoardSuccess = false;
        Successboard = new BoardCell[_row][_col];

    }
    // Int 어레이에 해당 숫자 포함되는지 확인하는 함수
    private boolean isContainArray(int[] _arry, int _num)
    {
        for(int i=0; i< _arry.length; i++)
        {
            if(_arry[i]==_num)
            {
                return true;
            }
        }
        return false;
    }
    // 보드판 정답을 제외한 알파벳 구성
    public void MakeUpBoardAlphabet() {
        // 모음 알파벳 아스키 순서모음
        int vowel[] = {0,4,8,14,20};
        Random random = new Random();
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if(board[i][j].isAnswer==false) {
                    // 0~26까지 숫자 랜덤하게 받아서 알파벳으로 변환
                    int randomnum = random.nextInt(26);
                    // 만약 나온 숫자가 모음이라면
                    if (isContainArray(vowel,randomnum)) {
                        System.out.println("containrandom : " + randomnum);
                        // 모음이 나오면 모음 아스키 넘버+1
                        randomnum += 1;
                    }
                    System.out.println("random :" + randomnum);
                    board[i][j].cellchar = (char) (randomnum + 97);
                    board[i][j].isAnswer = false;
                    BoardCell cell = new BoardCell();
                    cell.isAnswer = board[i][j].isAnswer;
                    cell.cellchar = board[i][j].cellchar;
                    Successboard[i][j] = cell;
                }
            }

        }

    }

    // 보드판에 정답 알파벳 넣기 - 만약 _isfrontdir이 true이면 단어가 정방향으로만 배치됨
    public void MakeUpBoardAnswer(ArrayList _dirarray) {
        // 보드성공했는지 변수 초기화
        isBoardSuccess = false;
        // 보드 구성(정답인 곳에 정답 넣기)
        boolean offset[] = new boolean[answercount];
        PlaceAnswer(0,0,0,offset,_dirarray);
    }

    // 정답 위치 포인트
    ArrayList<Point> AnswerPoint = new ArrayList<>();
    // isPuton으로 받아온 정답의 위치에 실제 정답을 입력
    void Puton(int _answerindex, boolean visit[]) {
        if (AnswerPoint.size() != answers[_answerindex].getAnswerLength()) {
            System.out.println("isPuton에서 받아온 Answer와 실제 Answer의 길이가 다릅니다." +answers[_answerindex].getAnswer() +"  size:"+AnswerPoint.size());
            System.out.println();
            for(Point p:AnswerPoint)
            {
                System.out.println("row : " +p.GetRow() +"col : "+p.GetCol());
            }
            return;
        }
        // 해당 정답의 글자수
        int answerlen = answers[_answerindex].getAnswerLength();
        for (int i = 0; i < answerlen; i++) {
            int rowindex = AnswerPoint.get(i).GetRow();
            int colindex = AnswerPoint.get(i).GetCol();
            board[rowindex][colindex].isAnswer = true;
            board[rowindex][colindex].cellchar = answers[_answerindex].getAnswerChar(i);
        }
    }

    // 들어온 좌표는 첫글자의 위치로, 해당 위치에서 8방향을 탐색하여 가능한 자리에 정답을 위치시킬 수 있는지 확인
    boolean isPuton(int _answerindex, int _row, int _col, boolean visit[], ArrayList _dirarray) {
        // 해당 정답의 글자수
        int answerlen = answers[_answerindex].getAnswerLength();
        // 랜덤한 방향 설정
        Random random = new Random();
        int randomdirindex = random.nextInt(_dirarray.size());
        // 처음 정한 랜덤 방향 저장한 변수
        int originrandomdir = randomdirindex;
        // 해당 방향이 가능한지 확인 변수
        boolean isanswerdir = true;
        // 해당 랜덤하게 뽑은 방향부터 시계방향으로 탐색
        // 0-up, 1-upright, 2-right, 3-downright, 4-down, 5-downleft, 6-left, 7-upleft
        // isanswerdir이 true라면 해당 방향은 선택되었으므로 반복문 탈출

        do {
            int limitcount = 1;
            isanswerdir = true;
            int dir = (int)_dirarray.get(randomdirindex%_dirarray.size());
            switch (dir) {
                //up
                case 0:
                    for (int i = 0; i < answerlen; i++) {

                         if (_row - i < 0) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row - i][_col].isAnswer == true &&limitcount>0 &&board[_row - i][_col].cellchar == answers[_answerindex].getAnswerChar(i))
                         {
                             AnswerPoint.add(new Point(_row - i, _col));
                             limitcount--;
                             continue;
                         }
                         else if(board[_row - i][_col].isAnswer == true)
                         {
                             isanswerdir = false;
                             AnswerPoint.clear();
                             break;
                         }
                        AnswerPoint.add(new Point(_row - i, _col));
                    }
                    break;
                //upright
                case 1:
                    for (int i = 0; i < answerlen; i++) {
                        if (_row - i < 0 || _col + i >= col ) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row - i][_col+i].isAnswer == true &&limitcount>0 &&board[_row - i][_col+i].cellchar == answers[_answerindex].getAnswerChar(i))
                        {
                            AnswerPoint.add(new Point(_row - i, _col + i));
                            limitcount--;
                            continue;
                        }
                        else if (board[_row - i][_col + i].isAnswer == true) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        }
                        AnswerPoint.add(new Point(_row - i, _col + i));

                    }
                    break;
                //right
                case 2:
                    for (int i = 0; i < answerlen; i++) {
                        if (_col + i >= col ) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row][_col+i].isAnswer == true &&limitcount>0 &&board[_row][_col+i].cellchar == answers[_answerindex].getAnswerChar(i))
                        {
                            AnswerPoint.add(new Point(_row, _col + i));
                            limitcount--;
                            continue;
                        }
                        else if ( board[_row][_col + i].isAnswer == true) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        }
                        AnswerPoint.add(new Point(_row, _col + i));

                    }
                    break;
                //downright
                case 3:
                    for (int i = 0; i < answerlen; i++) {
                        if (_row + i >= row || _col + i >= col ) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row + i][_col+i].isAnswer == true &&limitcount>0 &&board[_row + i][_col+i].cellchar == answers[_answerindex].getAnswerChar(i))
                        {
                            limitcount--;
                            AnswerPoint.add(new Point(_row + i, _col + i));
                            continue;
                        }
                        else if ( board[_row + i][_col + i].isAnswer == true) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        }
                        AnswerPoint.add(new Point(_row + i, _col + i));

                    }
                    break;
                //down
                case 4:
                    for (int i = 0; i < answerlen; i++) {
                        if (_row + i >= row) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row + i][_col].isAnswer == true &&limitcount>0 &&board[_row + i][_col].cellchar == answers[_answerindex].getAnswerChar(i))
                        {
                            AnswerPoint.add(new Point(_row + i, _col));
                            limitcount--;
                            continue;
                        }
                        else if (_row + i >= row || board[_row + i][_col].isAnswer == true) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        }
                        AnswerPoint.add(new Point(_row + i, _col));

                    }

                    break;
                //downleft
                case 5:
                    for (int i = 0; i < answerlen; i++) {
                        if (_row + i >= row || _col - i < 0) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row + i][_col -i].isAnswer == true &&limitcount>0 &&board[_row + i][_col -i].cellchar == answers[_answerindex].getAnswerChar(i))
                        {
                            AnswerPoint.add(new Point(_row + i, _col - i));
                            limitcount--;
                            continue;
                        }
                        else if (board[_row + i][_col - i].isAnswer == true) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        }
                        AnswerPoint.add(new Point(_row + i, _col - i));

                    }
                    break;
                //left
                case 6:
                    for (int i = 0; i < answerlen; i++) {
                        if (_col - i < 0) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row][_col -i].isAnswer == true &&limitcount>0 &&board[_row][_col -i].cellchar == answers[_answerindex].getAnswerChar(i))
                        {
                            AnswerPoint.add(new Point(_row, _col - i));
                            limitcount--;
                            continue;
                        }
                        else  if (board[_row][_col - i].isAnswer == true) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        }
                        AnswerPoint.add(new Point(_row, _col - i));

                    }
                    break;
                //upleft
                case 7:
                    for (int i = 0; i < answerlen; i++) {
                        if (_row - i < 0 || _col - i < 0) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        } else if(board[_row - i][_col -i].isAnswer == true &&limitcount>0 &&board[_row - i][_col -i].cellchar == answers[_answerindex].getAnswerChar(i))
                        {
                            AnswerPoint.add(new Point(_row - i, _col - i));
                            limitcount--;
                            continue;
                        }
                        else if ( board[_row - i][_col - i].isAnswer == true) {
                            isanswerdir = false;
                            AnswerPoint.clear();
                            break;
                        }
                        AnswerPoint.add(new Point(_row - i, _col - i));

                    }
                    break;
                default:

            }
            // 가능한 방향을 찾았으면 while문 탈출
            if (isanswerdir == true) {
                return true;
            }
            randomdirindex++;
        }
        while ((randomdirindex) % 8 != originrandomdir);

        //만약 하나라도 방향이 맞았다면 true, 8방향 전부 불가능하다면 false 리턴
        AnswerPoint.clear();
        return false;
    }


    // 보드판에 정답 배치하는 알고리즘
    public void PlaceAnswer(int _answerindex, int _row, int _col, boolean visit[], ArrayList _dirarray) {
        if (_answerindex == answercount) {
           for (int i = 0; i < row; i++) {
               for (int j = 0; j < col; j++) {
                   BoardCell cell = new BoardCell();
                   cell.isAnswer = board[i][j].isAnswer;
                   cell.cellchar = board[i][j].cellchar;
                   Successboard[i][j] = cell;
                    }
               }
           isBoardSuccess = true;
           System.out.println("AnswerBoard");
           printBoard(Successboard);
            return;
        }
        // 랜덤한 점에서 시작
        Point point = new Point(0,0);
        Point RandomPoint = point.GetRandomPoint(row,col);

        // 어떤 랜덤 포인트를 정해놓고 모듈러 연산을 통해 한바퀴 돌면서 단어의 시작점 찾기
        for (int i = RandomPoint.GetRow()+1; i%row!=RandomPoint.GetRow(); i++) {
            for (int j = RandomPoint.GetCol()+1; j%col!=RandomPoint.GetCol(); j++) {
                i%=row;
                j%=col;
              //  System.out.println(i+" "+j);
                // 방문 안한 정답중에 놓을 수 있는 셀이면
                if (visit[_answerindex]==false&&isPuton(_answerindex, i, j, visit,_dirarray)) {
                    // 정답 넣기
                    Puton(_answerindex,visit);
                    // 해당 정답 방문처리
                    visit[_answerindex] = true;
                    // 넣은 정답의 좌표를 해당 정답클래스에 기록
                    for(int alphaindex=0; alphaindex<answers[_answerindex].getAnswerLength(); alphaindex++ )
                    {
                        int alpharow = AnswerPoint.get(alphaindex).GetRow();
                        int alphacol = AnswerPoint.get(alphaindex).GetCol();
                        answers[_answerindex].SetAlphabetPoint(alphaindex,alpharow,alphacol);
                    }

                    AnswerPoint.clear();
                    // 재귀호출
                    PlaceAnswer(_answerindex + 1, i, j, visit,_dirarray);

                }
                else if(visit[_answerindex]==true)
                {
                    AnswerPoint.clear();
                }
            }


        }
        System.out.println();
    }
}
