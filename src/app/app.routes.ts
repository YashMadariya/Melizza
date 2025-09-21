import { Routes } from '@angular/router';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'products', component: ProductComponent },
    { path: 'aboutus', component: AboutUsComponent }
];
