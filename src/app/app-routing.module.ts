import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/frooks/list/list.component';
import { FormComponent } from './components/frooks/form/form.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'edit', component: FormComponent},
  {path: 'edit/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
