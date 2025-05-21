import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { PolicyPageComponent } from './pages/policy-page/policy-page.component';
import { InProgressPageComponent } from './pages/in-progress-page/in-progress-page.component';
import { OfferPageComponent } from './pages/offer-page/offer-page.component';
import { DebugPageComponent } from './pages/debug-page/debug-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { canActivateAuth } from './auth/access.guard';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { canActivateSignup } from './auth/guest.guard';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'info', component: InfoPageComponent},
    {path: 'policy', component: PolicyPageComponent},
    {path: 'offer', component: OfferPageComponent},
    {path: 'debug', component: DebugPageComponent},
    {path: 'contacts', component: ContactsPageComponent},
    {path: 'product/:id_product', component: ProductDetailPageComponent},
    {
        path: 'shop', 
        component: ShopPageComponent, 
        data: {mode:'all'}
    },
    {
        path: 'sale', 
        component: ShopPageComponent, 
        data: {mode:'sale'}},
    {
        path: 'new-collection', 
        component: ShopPageComponent, 
        data: {mode:'new'}},
    {
        path: 'category/:id_category', 
        component: ShopPageComponent, 
        data: {mode:'category'}
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [canActivateSignup]
    },
    {path: 'cart', component: CartPageComponent},
    {
        path: 'account', component: AccountPageComponent,
        canActivate: [canActivateAuth]
    },
    {
        path: 'signup', component: SignupPageComponent,
        canActivate: [canActivateSignup]
    },

    {path: '**', component: InProgressPageComponent},
];
