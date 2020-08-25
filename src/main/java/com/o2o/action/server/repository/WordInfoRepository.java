package com.o2o.action.server.repository;

import com.o2o.action.server.model.WordInfo;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface WordInfoRepository extends PagingAndSortingRepository<WordInfo, Short> {
    List<WordInfo> findAll();
    List<WordInfo.wordMapping> findByStageDifficulty(String stageDifficulty);
}
