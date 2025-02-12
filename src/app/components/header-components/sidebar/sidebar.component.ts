import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesProducts } from '../../../data/interfaces/categories-products.interfaces';
import { SidebarService } from '../../../data/services/sidebar.service';
import { CategoriesProductsService } from '../../../data/services/categories-products.service';
import { CategoryUrlPipe } from "../../../helpers/pipes/category-url.pipe";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CategoryUrlPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('150ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  categoriesProducts: CategoriesProducts[] | null = null;
  private sidebarService = inject(SidebarService);
  private categoriesProductsService = inject(CategoriesProductsService);
  sidebarVisible: boolean = false;

  ngOnInit(): void {
    this.categoriesProductsService.getCategoriesProducts().subscribe(val => {
      this.categoriesProducts = val;
    });

    this.sidebarService.isVisible$.subscribe(visible => {
      this.sidebarVisible = visible;
    });
  }

  toggleSideBar(): void {
    this.sidebarService.toggleSidebar();
  }

  closeSideBar(): void {
    this.sidebarService.closeSideBar();
  }
}
