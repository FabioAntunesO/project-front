import { Routes } from '@angular/router';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';

export const routes: Routes = [
  { path: 'cadastro/:id', component: ItemFormComponent },
  { path: 'cadastro', component: ItemFormComponent },
  { path: 'listagem', component: ItemListComponent },
  { path: '', redirectTo: '/listagem', pathMatch: 'full' }
];
