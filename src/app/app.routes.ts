import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PacketComponent } from './packet/packet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CategoryComponent } from './category/category.component'; // Importar CategoryComponent

export const routes: Routes = [
  { path: 'packet-component', component: PacketComponent },
  { path: 'user-component', component: UserComponent },
  { path: 'register-component', component: RegisterFormComponent },
  { path: 'search', component: SearchComponent },
  { path: 'category-component', component: CategoryComponent }, // Nueva ruta para categorías
  { path: '', redirectTo: '/user-component', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];