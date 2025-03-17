import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { PacketComponent } from './packet/packet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  // Define aquí tus rutas
  {path: 'packet-component', component: PacketComponent},
  {path: 'user-component', component: UserComponent},
  { path: 'search', component: SearchComponent },
  { path: '',   redirectTo: '/user-component', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent},
];
