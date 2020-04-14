import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { PublicBoardsComponent } from './public-boards/public-boards.component';
import { ContentComponent } from './content/content.component';
import { MembersComponent } from './members/members.component';
import { FooterComponent } from './footer/footer.component';
import { GroupsComponent } from './groups/groups.component';
import { HeaderComponent } from './header/header.component';
import { SocialComponent } from './social/social.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ConfigService } from './config.service';
import { BoardsComponent } from './boards/boards.component';
import { BoardComponent } from './board/board.component';
import { EditBoardComponent } from './edit-board/edit-board.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { NotfoundComponent } from './notfound/notfound.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PagerService } from './pager.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateBoardComponent } from './create-board/create-board.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { ShareBoardComponent } from './share-board/share-board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoardObjectComponent } from './board-object/board-object.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorCircleModule } from 'ngx-color/circle';
import { WebsocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    PublicBoardsComponent,
    ContentComponent,
    MembersComponent,
    FooterComponent,
    GroupsComponent,
    HeaderComponent,
    SocialComponent,
    NavigationComponent,
    BoardsComponent,
    BoardComponent,
    EditBoardComponent,
    NotfoundComponent,
    PaginationComponent,
    LoginComponent,
    SignupComponent,
    ContactusComponent,
    CreateBoardComponent,
    ShareBoardComponent,
    BoardObjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CanvasWhiteboardModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    UserDashboardModule,
    RouterModule,
    FontAwesomeModule,
    ColorPickerModule,
    ColorCircleModule
  ],
  providers: [ConfigService, PagerService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
