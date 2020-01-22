import { NgModule, ContentChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientsComponent } from './clients/clients.component';
import { PricingComponent } from './pricing/pricing.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContentComponent } from './content/content.component';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HeaderComponent},
  {path: 'about', component: IntroComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'services', component: ContentComponent},
  {path: 'testimonials', component: TestimonialComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'pricing', component: PricingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
