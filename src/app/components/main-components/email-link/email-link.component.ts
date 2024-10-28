import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-link',
  standalone: true,
  imports: [],
  templateUrl: './email-link.component.html',
  styleUrl: './email-link.component.scss'
})
export class EmailLinkComponent {
  @Input() emailLinkText: string = '';
  get emailLink(): string {
    return 'mailto:' + this.emailLinkText;
  }
}
