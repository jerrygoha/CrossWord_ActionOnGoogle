package com.o2o.action.server.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "word_info")
public class WordInfo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short word_seq;

    @Column(name = "stage_difficulty")
    private Short stageDifficulty;

    @Column(name = "word_content")
    private String wordContent;

    @Column(name = "use_flag", nullable = false, columnDefinition = "boolean default true")
    private boolean useFlag;

    public WordInfo(Short stageDifficulty, String wordContent) {
        this.stageDifficulty = stageDifficulty;
        this.wordContent = wordContent;
        this.useFlag = true;
    }
    public interface wordMapping{
        String getWordContent();
    }

    protected WordInfo(){

    }


    public short getWordSeq() {
        return word_seq;
    }
    public void setWordSeq(short word_seq) {
        this.word_seq = word_seq;
    }
    public Short getStageDifficulty() {
        return stageDifficulty;
    }
    public void setStageDifficulty(Short stageDifficulty) {
        this.stageDifficulty = stageDifficulty;
    }
    public String getWordContent() {
        return wordContent;
    }
    public void setWordContent(String word_content) {
        this.wordContent = wordContent;
    }
    public boolean getUseFlag() {
        return useFlag;
    }
    public void setUseFlag(boolean useFlag) {
        this.useFlag = useFlag;
    }
}

