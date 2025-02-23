import { Component, inject, signal } from '@angular/core';
import { CategoriesProductsService } from '../../../data/services/categories-products.service';
import { CategoriesProducts } from '../../../data/interfaces/categories-products.interfaces';
import { CategoryUrlPipe } from "../../../helpers/pipes/category-url.pipe";
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../data/services/sidebar.service';
import { CartService } from '../../../cart/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CategoryUrlPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categoriesProducts: CategoriesProducts[] | null = null;
  categoriesProductsService = inject(CategoriesProductsService);
  cartService = inject(CartService);
  sidebarService = inject(SidebarService);

  cartCount: number = 0;

  // mb delete THIS
  items: any[] = [];
  isMobile: boolean = false;
  sidebarVisible = signal<boolean>(false);



  ngOnInit(): void {
    this.categoriesProductsService.getCategoriesProducts().subscribe(val => {
      this.categoriesProducts = val;
    });

    this.cartService.getCartCount$().subscribe(
      val => this.cartCount = val
    );
  
    this.items = [
      { label: 'Каталог', routerLink: '/shop' },
      { label: 'Новая коллекция', routerLink: '/new-collection' },
      { label: 'Sale', routerLink: '/sale' }
    ];
  }

  toggleSideBar(): void {
    this.sidebarService.toggleSidebar();
    this.sidebarVisible.set(!this.sidebarVisible());
  }
}
