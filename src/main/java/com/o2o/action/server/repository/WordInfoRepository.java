package com.o2o.action.server.repository;

import com.o2o.action.server.model.WordInfo;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.Serializable;
import java.util.List;

public interface WordInfoRepository extends PagingAndSortingRepository<WordInfo, Short> , Serializable {
    List<WordInfo> findAll();
    List<WordInfo.wordMapping> findByStageDifficulty(Short stageDifficulty);
}
