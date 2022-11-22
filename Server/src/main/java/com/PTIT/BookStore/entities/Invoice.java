package com.PTIT.BookStore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "tbl_invoice")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String address;
    private String phoneNumber;
    private String fullNameUserOrder;

    @DateTimeFormat(pattern = "HH:mm dd-MM-yyyy")
    private Date dateOrder;

    @ManyToOne
    @JoinColumn(name = "user_order")
    private User user;

    @OneToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
}
