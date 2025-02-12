import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header-components/header/header.component";
import { FooterComponent } from './components/footer-components/footer/footer.component';
import { EntryPopupComponent } from "./components/main-components/entry-popup/entry-popup.component";
import { LoadingPageAnimationComponent } from "./components/main-components/loading-page-animation/lloading-page-animation.component";
import { TopBannerComponent } from "./components/header-components/top-banner/top-banner.component";
import { SidebarComponent } from "./components/header-components/sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, EntryPopupComponent, LoadingPageAnimationComponent, TopBannerComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'ife';
}