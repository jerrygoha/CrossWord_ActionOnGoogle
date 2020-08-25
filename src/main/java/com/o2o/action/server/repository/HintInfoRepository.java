package com.o2o.action.server.repository;

import com.o2o.action.server.model.HintInfo;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface HintInfoRepository extends PagingAndSortingRepository<HintInfo, Short> {
    List<HintInfo> findAll();
    List<HintInfo.HintMapping> findByWordContent(String word_content);
}
