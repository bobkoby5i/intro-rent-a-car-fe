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
import { RouterModule } from '@angular/router';
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
import { HttpClientModule } from '@angular/common/http';




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
    AdminUsersComponent
  ],
  imports: [
    HttpClientModule,
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
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'main', component: MainPageComponent},
      {path: 'create-car', component: CreateCarComponent},
      {path: 'manage', component: ManageReservationsComponent},
      {path: 'users', component: AdminUsersComponent},
    ])
  ],
  providers: [UserService, LoginComponent, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
