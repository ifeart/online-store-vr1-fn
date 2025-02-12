import { Component, inject } from '@angular/core';
import { CategoriesProductsService } from '../../../data/services/categories-products.service';
import { CategoriesProducts } from '../../../data/interfaces/categories-products.interfaces';
import { CategoryUrlPipe } from "../../../helpers/pipes/category-url.pipe";
import { RouterLink } from '@angular/router';
import { SidebarService } from '../../../data/services/sidebar.service';


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
  sidebarService = inject(SidebarService);

  // mg delet THIS
  items: any[] = [];
  isMobile: boolean = false;
  sidebarVisible: boolean = false;



  ngOnInit(): void {
    this.categoriesProductsService.getCategoriesProducts().subscribe(val => {
      this.categoriesProducts = val;
    });

  
    this.items = [
      { label: 'Каталог', routerLink: '/shop' },
      { label: 'Новая коллекция', routerLink: '/new-collection' },
      { label: 'Sale', routerLink: '/sale' }
    ];
  }

  toggleSideBar(): void {
    this.sidebarService.toggleSidebar();
  }
}
