import { Component, OnInit } from '@angular/core';
import { LoadAnimationService } from '../../../data/services/load-animation.service';


@Component({
  selector: 'app-loading-page-animation',
  standalone: true,
  imports: [],
  templateUrl: './loading-page-animation.component.html',
  styleUrl: './loading-page-animation.component.scss'
})
export class LoadingPageAnimationComponent implements OnInit {
  isLoading: boolean = false;

  constructor (private loadAnimationService: LoadAnimationService) {}

  ngOnInit(): void {
    if (!this.loadAnimationService.getLoaAnimation()) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.loadAnimationService.setLoaAnimation();
      }, 2050);
    }
  }
}
