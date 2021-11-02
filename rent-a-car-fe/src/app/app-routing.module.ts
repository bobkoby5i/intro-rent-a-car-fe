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

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
    {path: 'create-car', component: CreateCarComponent, canActivate: [AuthGuard] },
    {path: 'manage', component: ManageReservationsComponent, canActivate: [AuthGuard] },
    {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard] },
    {path: 'cars', component: AdminCarsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
