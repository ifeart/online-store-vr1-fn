import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadAnimationService {
  private loadAnimation = false;
  constructor() {
    this.loadAnimation = sessionStorage.getItem('loadAnimation') === 'true';
  }

  getLoaAnimation(): boolean {
    return this.loadAnimation;
  }

  setLoaAnimation() {
    this.loadAnimation = true;
    sessionStorage.setItem('loadAnimation', 'true');
  }
}
