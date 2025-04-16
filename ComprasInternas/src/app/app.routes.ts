import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'supervisor', component: SupervisorComponent },
];
