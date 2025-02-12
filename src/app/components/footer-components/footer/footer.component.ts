import { Component } from '@angular/core';
import { SubToNewsFormComponent } from "../sub-to-news-form/sub-to-news-form.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SubToNewsFormComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
