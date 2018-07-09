import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-gaurd/auth.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'product', component: ProductComponent
        , canActivate: [AuthGuard]

    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
