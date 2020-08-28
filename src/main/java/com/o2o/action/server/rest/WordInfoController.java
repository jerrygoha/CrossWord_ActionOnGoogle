package com.o2o.action.server.rest;

import com.o2o.action.server.model.WordInfo;
import com.o2o.action.server.repository.WordInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.List;

@RestController
public class WordInfoController implements Serializable {
    @Autowired
    WordInfoRepository repository;

    @RequestMapping("/getWord/{stageDifficulty}")
    public List<WordInfo.wordMapping> getWord(@PathVariable Short stageDifficulty){
        return repository.findByStageDifficulty(stageDifficulty);
    }
}
