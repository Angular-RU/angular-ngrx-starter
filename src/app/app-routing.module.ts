import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesGuard } from './guards/heroes.guard';
import { SelectedHeroGuard } from './guards/selected-hero.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [HeroesGuard]
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
    canActivate: [SelectedHeroGuard]
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    canActivate: [HeroesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [HeroesGuard, SelectedHeroGuard]
})
export class AppRoutingModule {}
