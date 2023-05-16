import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './commom/auth.guard';

const routes: Routes = [
  {
    path:"",
    redirectTo:"todo",
    pathMatch:"full"
  },
  {
    path:"todo",
    loadChildren:()=>import('./modules/todo/todo.module').then(m=>m.TodoModule),
    canLoad:[AuthGuard]
  },
  {
    path:"auth",
    loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
