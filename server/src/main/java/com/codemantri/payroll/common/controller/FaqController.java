package com.codemantri.payroll.common.controller;

import com.codemantri.payroll.common.entity.FaqEntity;
import com.codemantri.payroll.common.repository.FaqRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
public class FaqController {

    private final FaqRepository faqRepository;

    public FaqController(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    @GetMapping
    public List<FaqEntity> getAllFaqs() {
        return faqRepository.findAll();
    }
}

