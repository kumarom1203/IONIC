import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: Product[];
  cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService) { }

  // Initializing cart items
  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartCount();
  }

  // Increate product count
  increaseProductCount(product: Product) {
    this.cartService.addProduct(product, true);
  }

  // Decrease product count
  decreaseProductCount(product: Product, index: number) {
    this.cartService.decreaseProduct(product);
  }

  // clear all products
  clarCart() {
    this.cartService.clearCart();
  }

}
