import { inject, Injectable } from '@angular/core';
import { CartItem } from './cart-item.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { AllUrls } from '../data/enums/all-urls.enum';

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
  private updateCartApiUrl = AllUrls.UpdateCartApiUrl;
  private updateItemApiUrl = AllUrls.UpdateItemApiUrl;


  // constructor(
  //   private http: HttpClient,
  //   private authService: AuthService
  // ) {
  //   this.initAuthListener();
  //   this.loadInitialCart();
  // }

  private initAuthListener(): void {
    this.AuthService.getAuthStatus().subscribe((status) => {
      if (status && !this.isLogin) {
        this.handleLogin();
      } else if (!status && this.isLogin) {
        this.logOut();
      }

      this.isLogin = status
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
  }

  private fetchServerCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.getCartApiUrl).pipe(
      tap(items => this.cartItems.next(items))
    );
  }

  private getLocalCart(): CartItem[] {
    const localCart = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return localCart ? JSON.parse(localCart) : [];
  }

  addItem(item: CartItem): void {
    if (this.isLogin) {
      this.http.put(this.updateItemApiUrl, item).subscribe({
        next: () => this.fetchServerCart().subscribe(),
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
    }
  }
  
  removeItem(item: CartItem): void {
    if (this.isLogin) {
      this.http.delete(`${this.updateItemApiUrl}/${item.id}`, {
        params: {
          size: item.size,
          article: item.article
        }
      }).subscribe({
        next: () => this.fetchServerCart().subscribe(),
        error: (err) => console.error('Remove item error: ', err)
      });
    } else {
      this.updateLocalCart(current => 
        current.filter(i => !(i.id === item.id && 
          i.size === item.size &&
          i.article === item.article)
        )
      );
    }
  }

  updateQuantity(item: CartItem): void {
    if (this.isLogin) {
      this.http.patch(`${this.updateItemApiUrl}/${item.id}`, item).subscribe({
        next: () => this.fetchServerCart().subscribe(),
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
    }
  }

  private updateLocalCart(updateFn: (items: CartItem[]) => CartItem[]): void {
    const updated = updateFn([...this.cartItems.value]);
    this.cartItems.next(updated);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  getCart$(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  };

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    if (this.isLogin) {
      this.http.delete(this.getCartApiUrl).subscribe();
    }
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((count, item) => count + item.quantity, 0);
  }
}