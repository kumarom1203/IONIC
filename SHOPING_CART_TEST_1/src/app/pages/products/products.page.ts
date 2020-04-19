import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { API_PATH } from 'src/app/constants/api-paths.constant';
import { Shop } from 'src/app/models/shop.model';
import { ITEM_LIST } from 'src/app/constants/common.constant';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  shopData: Shop;
  isFailed: boolean;
  itemList: number[];
  cartList: Product[] = [];
  cartItemCount: BehaviorSubject<number>;

  constructor(private apiService: ApiService, private cartService: CartService) { }

  // Initializing cart items and get product list
  ngOnInit() {
    this.itemList = ITEM_LIST;
    this.cartItemCount = this.cartService.getCartCount();
    this.getShopProducts();
  }

  // Get shop products
  getShopProducts() {
    let apiPath = API_PATH;
    this.isFailed = false;
    this.apiService.get(apiPath).subscribe(
      res => {
        if (res && res['product']) {
          this.shopData = res as Shop
          this.setCartInfo();
        } else {
          this.isFailed = true;
        }
        console.log('RESdata ', JSON.stringify(res));
      }, err => {
        this.isFailed = true;
        console.log('err', JSON.stringify(err));
      }
    );
  }

  // Add product
  addProduct(product: Product) {
    if (product.quantity_selected === '0') {
      this.cartService.presentToast('Please select quantity');
      return;
    } else if (product.item_count <= 6) {
      this.cartService.addProduct(product);
    }
  }

  // Set Cart details
  setCartInfo() {
    this.shopData.product.forEach((product: Product, i: any) => {
      Object.assign(product, {
        id: i,
        quantity_selected: '0',
        item_count: 1
      });
    });
  }

}
