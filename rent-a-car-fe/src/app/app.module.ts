import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { DialogOverviewExampleDialog } from './main-page/main-page.component';
//import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AdminUsersComponent } from './admin-users/admin-users.component'
import { UserService } from './services/user.service'
import { AdminService } from './services/admin.service'
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import {  MatDialogModule } from '@angular/material/dialog';
import { AdminCarsComponent } from './admin-cars/admin-cars.component';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptorService } from './services/token-interceptor.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ManageReservationsComponent,
    CreateCarComponent,
    MainPageComponent,
    DatepickerComponent,
    AdminUsersComponent, 
    DialogOverviewExampleDialog, 
    AdminCarsComponent,
  ],entryComponents: [DialogOverviewExampleDialog],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule, 
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule
  ],
  providers: [UserService, LoginComponent, AdminService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
