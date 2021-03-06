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
import { RenameBoardComponent } from './rename-board/rename-board.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RenameUserComponent } from './rename-user/rename-user.component';
import { NewBoardComponent } from './new-board/new-board.component';
import { AreYouSureComponent } from './are-you-sure/are-you-sure.component';
import { BoardDeletedComponent } from './board-deleted/board-deleted.component';
import { ReadOnlyComponent } from './read-only/read-only.component';

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
    BoardObjectComponent,
    RenameBoardComponent,
    RenameUserComponent,
    NewBoardComponent,
    AreYouSureComponent,
    BoardDeletedComponent,
    ReadOnlyComponent
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
    ColorCircleModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    RenameBoardComponent,
    RenameUserComponent
  ],
  providers: [ConfigService, PagerService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
