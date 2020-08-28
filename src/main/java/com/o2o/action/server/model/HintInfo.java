package com.o2o.action.server.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "hint_info")
public class HintInfo implements Serializable {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short hintSeq;

    @Column(name = "word_content")
    private String wordContent;

    @Column(name = "hint_priority")
    private short hintPriority;

    @Column(name = "hint_content")
    private String hintContent;

    @Column(name = "use_flag", nullable = false, columnDefinition = "boolean default true")
    private boolean useFlag;

    protected HintInfo(){
    }

    public HintInfo(String wordContent, short hintPriority, String hintContent){
        this.wordContent = wordContent;
        this.hintContent = hintContent;
        this.hintPriority = hintPriority;
        this.useFlag = true;
    }

    public interface HintMapping{
        String getHintContent();
    }

    public short getHintSeq() {
        return hintSeq;
    }
    public void setHintSeq(short hintSeq) {
        this.hintSeq = hintSeq;
    }
    public String getWordContent() {
        return wordContent;
    }
    public void setWordContent(String wordContent) {
        this.wordContent = wordContent;
    }
    public short getHintPriority() {
        return hintPriority;
    }
    public void setHintPriority(short hintPriority) {
        this.hintPriority = hintPriority;
    }
    public String getHintContent() {
        return hintContent;
    }
    public void setHintContent(String hintContent) {
        this.hintContent = hintContent;
    }

    public boolean getUseFlag() {
        return useFlag;
    }
    public void setUseFlag(boolean useFlag) {
        this.useFlag = useFlag;
    }

}
