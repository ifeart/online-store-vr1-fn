import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-top-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }), // Начальная позиция вне экрана
        animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 })) // Плавное появление
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ transform: 'translateY(-100%)', opacity: 0 })) // Уход вверх
      ])
    ])
  ]
})
export class TopBannerComponent implements OnInit {
  authService = inject(AuthService);
  showBanner: boolean = false;

  
  ngOnInit(): void {
    if (this.showBanner) {
      this.authService.getAuthStatus().subscribe((status) => {
        this.showBanner = !status;
        sessionStorage.setItem('topBannerClosed', String(status));
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const isBannerClosed = sessionStorage.getItem('topBannerClosed');
      if (isBannerClosed !== 'true') {
        this.showBanner = true;
      }
    }, 10000);
  }

  closeBanner(): void {
    sessionStorage.setItem('topBannerClosed', 'true');
    this.showBanner = false;
  }
}
