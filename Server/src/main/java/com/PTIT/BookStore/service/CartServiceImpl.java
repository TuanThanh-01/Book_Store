package com.PTIT.BookStore.service;

import com.PTIT.BookStore.entities.Cart;
import com.PTIT.BookStore.repository.CartItemRepository;
import com.PTIT.BookStore.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public Cart getCartByUser(int userId) {

        return null;
    }

    public Cart addCartItem() {

        return null;
    }

    public void removeCartItem() {

    }
}
