package com.codemantri.payroll.common.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "faqs")
public class FaqEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="question", nullable = false)
    private String question;
    @Column(name="answer", nullable = false)
    private String answer;

    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
}
