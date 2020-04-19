import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  cart: Product[];
  cartItemCount: BehaviorSubject<number>;

  constructor(private cartService: CartService) { }

  // Initializing cart items
  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartCount();
    console.log(this.cart);
  }

}
