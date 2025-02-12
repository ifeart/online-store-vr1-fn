import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusInvalidInput]',
  standalone: true
})
export class FocusInvalidInputDirective {

  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onSubmit() {
    this.el.nativeElement.querySelector('input.ng-invalid')?.focus();
  }
}

/// ПЛОХО - ПЕРЕДЕЛАТЬ 