package com.diabetes.common.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Getter
public class CustomPageDto<T> {
    List<T> content;
    boolean first;
    boolean last;
    boolean empty;
    int numberOfElements;
    long totalElements;
    int totalPages;

    int pageNumber;
    int pageSize;
    long offset;

    public CustomPageDto(Page page) {
        Pageable pageable = page.getPageable();

        this.content = page.getContent();
        this.last = page.isLast();
        this.first = page.isFirst();
        this.empty = page.isEmpty();
        this.numberOfElements = page.getNumberOfElements();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();

        this.pageNumber = pageable.getPageNumber();
        this.pageSize = pageable.getPageSize();
        this.offset = pageable.getOffset();
    }
}
