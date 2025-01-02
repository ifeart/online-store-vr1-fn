import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryPopupService {
  private popupShown: boolean = false;
  constructor() {
    this.popupShown = sessionStorage.getItem('popupShown') === 'true';
  }

  getPopupShown(): boolean {
    return this.popupShown;
  }

  setPopupShown(): void {
    this.popupShown = true;
    sessionStorage.setItem('popupShown', 'true');
  }
}
