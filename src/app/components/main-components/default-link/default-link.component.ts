import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-default-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default-link.component.html',
  styleUrl: './default-link.component.scss'
})
export class DefaultLinkComponent {
  @Input() rLink = "";
  @Input() btnText: string = "null name";
}
