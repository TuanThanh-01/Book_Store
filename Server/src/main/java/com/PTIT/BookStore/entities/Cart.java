package com.PTIT.BookStore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "tbl_cart")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany
    @JoinColumn(name = "cart_id")
    private Set<CartItem> listCartItem;

    public long getTotalPrice(){
        long total = 0;
        for(CartItem cartItem: listCartItem) {
            total += cartItem.getQuantity() * cartItem.getBook().getPrice();
        }
        return total;
    }
}
