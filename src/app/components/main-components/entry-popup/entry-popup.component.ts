import { Component, HostListener, OnInit } from '@angular/core';
import { EntryPopupService } from '../../../data/services/entry-popup.service';

@Component({
  selector: 'app-entry-popup',
  standalone: true,
  imports: [],
  templateUrl: './entry-popup.component.html',
  styleUrl: './entry-popup.component.scss'
})
export class EntryPopupComponent implements OnInit{
  isVisible: boolean = false;

  constructor (private popupService: EntryPopupService) {}

  @HostListener('document:keydown.esc', ['$event'])
  onEscape(): void {
    this.closePopup();
  }

  ngOnInit(): void {
    if (!this.popupService.getPopupShown()) {
      this.isVisible = true;
      setTimeout(() => {
        this.isVisible = false;
        this.popupService.setPopupShown();
      }, 1200000);
    }
  }

  closePopup(): void {
    this.isVisible = false;
    this.popupService.setPopupShown();
  }
}
