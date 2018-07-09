import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatToolbarModule, MatButtonModule, MatCardModule,
  MatInputModule, MatDialogModule, MatTableModule,MatGridListModule,
} from '@angular/material';
import { MatListModule } from '@angular/material/list';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth-gaurd/auth.guard';
import { FileValidator } from './shared/file.validater';
import { FileValueAccessor } from './shared/fileValue';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { AuthInterceptor } from './auth-gaurd/auth.intercepter';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponent,
    ProductComponent,
    HomeComponent,
    FileValidator,
    FileValueAccessor,
    FileSelectDirective,
    RegisterComponent,

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,MatGridListModule ,
    MatListModule,
    MatToolbarModule, MatButtonModule, MatCardModule,
    MatInputModule, MatDialogModule, MatTableModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [AuthGuard,ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
