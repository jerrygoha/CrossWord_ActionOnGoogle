package com.o2o.action.server.app;

import java.lang.reflect.Array;
import java.util.*;

// x,y 좌표점 클래스
class Point
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
public class BoardAlgorithm {
    private int col = 0;
    private int row = 0;
    public BoardCell[][] board;
    private AnswerWord answers[];
    private int answercount = 0;
    // 성공한 결과가 담긴 보드판
    public BoardCell[][] Successboard;

    private void printBoard(BoardCell[][] tmpboard) {
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                System.out.print(tmpboard[i][j].cellchar + " ");
            }
            System.out.println();
        }
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
        Successboard = new BoardCell[_row][_col];

    }

    // 보드판 정답을 제외한 알파벳 구성
    public void MakeUpBoardAlphabet() {
        // 모음 알파벳 아스키 순서모음
        int vowel[] = {0,4,8,14,20};
        ArrayList vowelArray = new ArrayList(Arrays.asList(vowel));
        Random random = new Random();
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                BoardCell cell = new BoardCell();
                // 0~26까지 숫자 랜덤하게 받아서 알파벳으로 변환
                int randomnum = random.nextInt(26);
                // 만약 나온 숫자가 모음이라면
                if(vowelArray.contains(randomnum))
                {
                    // 모음의 확률 줄이기 위해 한번더 랜덤 돌림
                    randomnum +=1;
                }
                cell.cellchar = (char) (randomnum + 97);
                board[i][j] = cell;
            }

        }

    }

    // 보드판에 정답 알파벳 넣기
    public void MakeUpBoardAnswer() {
        // 보드 구성(정답인 곳에 정답 넣기)
        boolean offset[] = new boolean[answercount];
        PlaceAnswer(0,0,0,offset);
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
    boolean isPuton(int _answerindex, int _row, int _col, boolean visit[]) {
        // 해당 정답의 글자수
        int answerlen = answers[_answerindex].getAnswerLength();
        // 랜덤한 방향 설정
        Random random = new Random();
        int randomdir = random.nextInt(8);
        // 처음 정한 랜덤 방향 저장한 변수
        int originrandomdir = randomdir;
        // 해당 방향이 가능한지 확인 변수
        boolean isanswerdir = true;
        // 해당 랜덤하게 뽑은 방향부터 시계방향으로 탐색
        // 0-up, 1-upright, 2-right, 3-downright, 4-down, 5-downleft, 6-left, 7-upleft
        // isanswerdir이 true라면 해당 방향은 선택되었으므로 반복문 탈출

        do {
            int limitcount = 1;
            isanswerdir = true;
            switch (randomdir % 8) {
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
            randomdir++;
        }
        while ((randomdir) % 8 != originrandomdir);

        //만약 하나라도 방향이 맞았다면 true, 8방향 전부 불가능하다면 false 리턴
        AnswerPoint.clear();
        return false;
    }


    // 보드판에 정답 배치하는 알고리즘
    public void PlaceAnswer(int _answerindex, int _row, int _col, boolean visit[]) {
        if (_answerindex == answercount) {
           for (int i = 0; i < row; i++) {
               for (int j = 0; j < col; j++) {
                   BoardCell cell = new BoardCell();
                   cell.isAnswer = board[i][j].isAnswer;
                   cell.cellchar = board[i][j].cellchar;
                   Successboard[i][j] = cell;
                    }
               }
            printBoard(board);
            return;
        }
        // 랜덤한 점에서 시작
        Point point = new Point(0,0);
        Point RandomPoint = point.GetRandomPoint(row,col);
        Random random = new Random();
        int r = random.nextInt(row-1);
        // 어떤 랜덤 포인트를 정해놓고 모듈러 연산을 통해 한바퀴 돌면서 단어의 시작점 찾기
        for (int i = r+1; i!=r; i++) {
            for (int j = r+1; j!=r; j++) {
                i%=row;
                j%=col;
               // System.out.println(i+" "+j);
                // 방문 안한 정답중에 놓을 수 있는 셀이면
                if (visit[_answerindex]==false&&isPuton(_answerindex, i, j, visit)) {
                    // 정답 넣기
                    Puton(_answerindex,visit);
                    // 해당 정답 방문처리
                    visit[_answerindex] = true;
                    AnswerPoint.clear();
                    // 재귀호출
                    PlaceAnswer(_answerindex + 1, i, j, visit);

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
