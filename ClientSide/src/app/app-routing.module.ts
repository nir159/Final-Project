import { NgModule, ContentChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientsComponent } from './clients/clients.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContentComponent } from './content/content.component';
import { IntroComponent } from './intro/intro.component';
import { HeaderComponent } from './header/header.component';
import { BoardsComponent } from './boards/boards.component';
import { EditBoardComponent } from './edit-board/edit-board.component'
import { NotfoundComponent } from './notfound/notfound.component';
import { RouteguardService } from './routeguard.service'
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { ShareBoardComponent } from './share-board/share-board.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HeaderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'contactus', component: ContactusComponent},
  {path: 'about', component: IntroComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'services', component: ContentComponent},
  {path: 'testimonials', component: TestimonialComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'contactus', component: ContactusComponent, outlet: 'popup'},
  {path: 'dashboard', loadChildren: () => UserDashboardModule, canActivate: [RouteguardService]},
  {path: 'boards', component: BoardsComponent, canActivate: [RouteguardService]},
  {path: 'create-board', component: CreateBoardComponent, canActivate: [RouteguardService]},
  {path: 'share-board', component: ShareBoardComponent, canActivate: [RouteguardService]},
  {path: 'board/:id', component: EditBoardComponent},
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
