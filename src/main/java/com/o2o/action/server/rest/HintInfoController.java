package com.o2o.action.server.rest;

import com.o2o.action.server.model.HintInfo;
import com.o2o.action.server.repository.HintInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.List;

@RestController
public class HintInfoController implements Serializable {

    @Autowired
    HintInfoRepository repository;

    @RequestMapping("/getHint/{wordContent}")
    public List<HintInfo.HintMapping> getHint(@PathVariable String wordContent){
        return repository.findByWordContent(wordContent);
    }

    @RequestMapping("/find/{id}")
    public String getAll(@PathVariable short id){
        String result = "";
        result = repository.findById(id).toString();
        return result;
    }

    @GetMapping("/findall")
    public HintInfo findAll(){
        return (HintInfo) repository.findAll();
    }


}
