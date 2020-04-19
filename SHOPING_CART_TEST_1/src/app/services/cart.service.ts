import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(public toastController: ToastController) { }

  // Display toast msg
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // add new product to cart or increase product count
  addProduct(item: Product, option: boolean = false) {
    let isAdded = false;
    for (let _item of this.cartItems) {
      if (item.id === _item.id) {
        if (option && item.item_count < 6) {
          _item.item_count += 1;
        }
        isAdded = true;
        break;
      }
    }
    if (!isAdded) {
      this.cartItems.push(item);
      this.cartItemCount.next(this.cartItemCount.value + 1);
      this.presentToast('Product added to cart');
    }
  }

  // Decrease product count from cart or remove product from cart
  decreaseProduct(item: Product) {
    for (let [index, _item] of this.cartItems.entries()) {
      if (_item.id === item.id) {
        _item.item_count -= 1;
        if (_item.item_count == 0) {
          _item.item_count = 1;
          this.cartItems.splice(index, 1);
          this.cartItemCount.next(this.cartItemCount.value - 1);
          this.presentToast('Product removed from cart');
        }
      }
    }
  }

  // Clear all products from cart
  clearCart() {
    this.cartItems = [];
    this.cartItemCount.next(0);
  }

  // Get cart
  getCart() {
    return this.cartItems;
  }

  // Get cart count
  getCartCount() {
    return this.cartItemCount;
  }

}
