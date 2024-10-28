import { Component } from '@angular/core';
import { BtnHeaderComponent } from "../btn-header/btn-header.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BtnHeaderComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
