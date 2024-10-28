import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-text-func',
  standalone: true,
  imports: [],
  templateUrl: './copy-text-func.component.html',
  styleUrl: './copy-text-func.component.scss'
})
export class CopyTextFuncComponent {
  @Input() textToCopy: string = "";
  copyText(textToCopy: string) {
  const dummy = document.createElement('textarea');
  document.body.appendChild(dummy);
  dummy.value = textToCopy;
  dummy.select();
  navigator.clipboard.writeText(textToCopy);
  document.body.removeChild(dummy);
}
}
