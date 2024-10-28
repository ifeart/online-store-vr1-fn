import { Component } from '@angular/core';
import { EmailSubFormComponent } from "../../main-components/email-sub-form/email-sub-form.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [EmailSubFormComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
