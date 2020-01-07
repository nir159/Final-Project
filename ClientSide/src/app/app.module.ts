import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { AboutComponent } from './about/about.component';
import { WorkSpaceComponent } from './work-space/work-space.component';
import { HomePageComponent } from './home-page/home-page.component';
import { from } from 'rxjs';
import { UserPageComponent } from './user-page/user-page.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserAuthComponent,
    AboutComponent,
    WorkSpaceComponent,
    HomePageComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CanvasWhiteboardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
