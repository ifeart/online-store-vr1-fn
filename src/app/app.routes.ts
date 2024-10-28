import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { PolicyPageComponent } from './pages/policy-page/policy-page.component';
import { InProgressPageComponent } from './pages/in-progress-page/in-progress-page.component';
import { OfferPageComponent } from './pages/offer-page/offer-page.component';
import { DebugPageComponent } from './pages/debug-page/debug-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'shop', component: ShopPageComponent},
    {path: 'info', component: InfoPageComponent},
    {path: 'policy', component: PolicyPageComponent},
    {path: 'offer', component: OfferPageComponent},
    {path: 'debug', component: DebugPageComponent},
    {path: 'contacts', component: ContactsPageComponent},
    {path: '**', component: InProgressPageComponent},
    
];
