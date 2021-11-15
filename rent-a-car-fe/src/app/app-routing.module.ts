import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { MainPageComponent } from './main-page/main-page.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCarsComponent } from './admin-cars/admin-cars.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CarsComponent } from './cars/cars.component';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomePageComponent  },
    {path: 'cars', component: CarsComponent  },
    {path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
    {path: 'create-car', component: CreateCarComponent, canActivate: [AuthGuard] },
    {path: 'manage', component: ManageReservationsComponent, canActivate: [AuthGuard] },
    {path: 'admin-users', component: AdminUsersComponent, canActivate: [AuthGuard] },
    {path: 'admin-cars', component: AdminCarsComponent, canActivate: [AuthGuard] },
];



@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64] // [x, y]
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
