package com.PTIT.BookStore.repository;

import com.PTIT.BookStore.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
}
