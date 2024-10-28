import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-btn-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './btn-header.component.html',
  styleUrl: './btn-header.component.scss'
})
export class BtnHeaderComponent {
  @Input() rLink = "";
  @Input() imgSrc: string = "";
  @Input() altText: string = "";
  @Input() btnText: string = "null name";
}
