import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { DynamicTitleService } from '../../data/services/dynamic-title.service';



@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  dynamicTitleService = inject(DynamicTitleService);
  
  ngOnInit(): void {
    this.dynamicTitleService.setNewTitle('ife');

  }
}
