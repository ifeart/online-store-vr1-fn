import { inject, Injectable } from '@angular/core';
import { CartItem } from './cart-item.interface';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AllUrls } from '../data/enums/all-urls.enum';
import { ItemPrice } from './item-price.interface';
import { ProductSizes } from '../data/interfaces/product-sizes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http: HttpClient = inject(HttpClient);
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private AuthService = inject(AuthService);
  private isLogin: boolean = false;
  private readonly LOCAL_STORAGE_KEY = 'guest_cart';
  private getCartApiUrl = AllUrls.GetCartApiUrl;
  private syncCartApiUrl = AllUrls.SyncCartApiUrl;
  private updateItemApiUrl = AllUrls.UpdateItemApiUrl;
  private patchCartApiUrl = AllUrls.PatchCartApiUrl;
  private getCartPricesApiUrl = AllUrls.GetCartPricesApiUrl;


  constructor(  ) {
    this.initAuthListener();
  }

  private initAuthListener(): void {
    this.AuthService.getAuthStatus().subscribe((status) => {
      if (status) {
        if (!this.isLogin) {
          this.handleLogin();
        }
      } else {
        if (this.isLogin) {
          this.logOut();
        } else {
          const localCart = this.getLocalCart();
          this.cartItems.next(localCart);
          this.updateCartCount();
        }
      }
      this.isLogin = status;
    });
  }
  
  private handleLogin(): void {
    const localCart = this.getLocalCart();
    if (localCart.length > 0) {
      try {
        this.http.post(this.syncCartApiUrl, localCart).subscribe();
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
      } catch (error) {
        console.error('Sync cart error: ', error);
      }
    }
    
    this.fetchServerCart().subscribe();
  }
  
  private logOut(): void {
    this.cartItems.next([]);
    this.updateCartCount();
  }

  private fetchServerCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.getCartApiUrl).pipe(
      tap(items => {
        this.cartItems.next(items);
        this.updateCartCount();
      })
    );
  }

  private getLocalCart(): CartItem[] {
    const localCart = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return localCart ? JSON.parse(localCart) : [];
  }

  addItem(item: CartItem): void {
    if (this.isLogin) {
      this.http.put(this.updateItemApiUrl, item).subscribe({
        next: () => this.fetchServerCart().subscribe(() => this.updateCartCount()),
        error: (err) => console.error('Add item error: ', err)
      });
    } else {
      this.updateLocalCart(current => {
        const existing = current.find(i => 
          i.id === item.id &&
          i.size === item.size &&
          i.article === item.article
        );
        existing ? existing.quantity += item.quantity : current.push(item);
        return current;
      });
      this.updateCartCount();
    }
  }
  
  removeItem(item: CartItem): void {
    if (this.isLogin) {
      this.http.delete(`${this.updateItemApiUrl}`, {body: {
        id: item.id,
        size: item.size,
        article: item.article
      }}).subscribe({
        next: () => this.fetchServerCart().subscribe(() => this.updateCartCount()),
        error: (err) => console.error('Remove item error: ', err)
      });
    } else {
      this.updateLocalCart(current => 
        current.filter(i => !(
          i.id === item.id && 
          i.size === item.size &&
          i.article === item.article)
        )
      );
      this.updateCartCount();
    }
  }

  updateQuantity(item: CartItem): void {
    if (this.isLogin) {
      this.http.patch(`${this.patchCartApiUrl}/${item.id}`, item).subscribe({
        next: () => this.fetchServerCart().subscribe(() => this.updateCartCount()),
        error: (err) => console.error('Update quantity error: ', err)
      });
    } else {
      this.updateLocalCart(current =>
        current.map(i => (
          i.id === item.id &&
          i.size === item.size &&
          i.article === item.article) ? { ...i, quantity: item.quantity } : i
        )
      );
      this.updateCartCount();
    }
  }

  private updateLocalCart(updateFn: (items: CartItem[]) => CartItem[]): void {
    const updated = updateFn([...this.cartItems.value]);
    this.cartItems.next(updated);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };



  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    if (this.isLogin) {
      this.http.delete(this.getCartApiUrl).subscribe();
    }
    this.updateCartCount();
  }
  
  private cartCountSubject = new BehaviorSubject<number>(0);

  private itemsPricesSubject = new BehaviorSubject<ItemPrice[]>([]);

  private finalCartPrice = new BehaviorSubject<number>(0);

  getCart$(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }
  
  getCartCount$(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  getFinalCartPrice$(): Observable<number> {
    return this.finalCartPrice.asObservable();
  }

  getItemCount(item: ProductSizes): number {
    const itemInCart = this.cartItems.value.find(i => 
      i.id === item.id &&
      i.size === item.size &&
      i.article === item.article
    );
    return itemInCart ? itemInCart.quantity : 0;
  }

  getItemsPrices$(items: CartItem[]): Observable<ItemPrice[]> {
    this.fetchItemsPrices(items);
    return this.itemsPricesSubject.asObservable();
  }

  private fetchItemsPrices(items: CartItem[]): void {
    const req = items.map(item => ({
      id: item.id_from_product,
      quantity: item.quantity
    }));
    console.log(req);

    this.http.post<{prices: ItemPrice[], finalPrice: number}>(
      this.getCartPricesApiUrl,
      {products: req}
      ).subscribe({
        next: (res) => {
          this.itemsPricesSubject.next(res.prices);
          this.finalCartPrice.next(res.finalPrice);
        }, error: (err) => console.error('Error fetching items prices: ', err)
      });
  }

  
  private updateCartCount(): void {
    const items = this.cartItems.value;
    const count = items.reduce((count, item) => count + item.quantity, 0);
    this.cartCountSubject.next(count);
  }
}