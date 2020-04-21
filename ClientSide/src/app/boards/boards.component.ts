import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../config.service';
import { PagerService } from '../pager.service';
import { ApiService } from '../api.service';
import { JsonPipe } from '@angular/common';
import { WebsocketService } from '../websocket.service';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { MatDialog, matDialogAnimations } from '@angular/material/dialog';
import { NewBoardComponent } from '../new-board/new-board.component';
import { BoardDeletedComponent } from '../board-deleted/board-deleted.component';
import { ReadOnlyComponent } from '../read-only/read-only.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit, OnDestroy {
  boards;
  allItems: any = [];
  pages: any[];
  pageSize = 6;
  pager: any = {};
  user = JSON.parse(localStorage.getItem('currentUser'));
  subscription: Subscription;

  constructor(private api: ApiService, private config: ConfigService, private pagerService: PagerService, private wsService: WebsocketService, public dialog: MatDialog) { 
    this.subscription = wsService.createSocket(environment.wsurl + 'lobby' + '/')
    .subscribe(
      msg => {
        var msg = JSON.parse(msg);
        let dialogRef;
        switch (msg.message.split(';')[0]) {
          case 'new':
            if (this.user.email == msg.message.split(';')[1]) {
              dialogRef = this.dialog.open(NewBoardComponent, {
                width: '400px',
                height: 'auto',
                data: {from: msg.user, boardName: msg.message.split(';')[2], msg: msg.message.split(';')[3]}
              });
          
              dialogRef.afterClosed().subscribe(result => {
                this.resetBoards();
              });
              this.removeNote();
            }
            break;
          case 'deleted':
            let board = JSON.parse(msg.message.split(';')[1]);
            if (board.users.includes(this.user.email)) {
              dialogRef = this.dialog.open(BoardDeletedComponent, {
                width: '400px',
                height: 'auto',
                data: {name: board.name, reason: 'Board was deleted!'}
              });
          
              dialogRef.afterClosed().subscribe(result => {
                this.resetBoards();
              });
              this.removeNote();
            }
            break;
          case 'removed':
            if (msg.message.split(';')[1] == this.user.email) {
              dialogRef = this.dialog.open(BoardDeletedComponent, {
                width: '400px',
                height: 'auto',
                data: {name: JSON.parse(msg.message.split(';')[2]).name, reason: 'You were removed!'}
              });
          
              dialogRef.afterClosed().subscribe(result => {
                this.resetBoards();
              });
              this.removeNote();
            }
            break;
        }
        
        

      },
      err => console.log(err)
    )

    this.user.notifications = JSON.parse(this.user.notifications).reverse();
    if (this.user.notifications) {
      this.user.notifications.forEach(note => {
        let dialogRef;
        switch (note.split(';')[0]) {
          case 'new':
            dialogRef = this.dialog.open(NewBoardComponent, {
              width: '400px',
              height: 'auto',
              data: {from: note.split(';')[1], boardName: note.split(';')[2], msg: note.split(';')[3]}
            });
        
            dialogRef.afterClosed().subscribe(result => {
              this.resetBoards();
            });
            break;
          case 'deleted':
            dialogRef = this.dialog.open(BoardDeletedComponent, {
              width: '400px',
              height: 'auto',
              data: {name: note.split(';')[1], reason: 'Board was deleted!'}
            });
        
            dialogRef.afterClosed().subscribe(result => {
              this.resetBoards();
            });
            break;
          case 'removed':
            dialogRef = this.dialog.open(BoardDeletedComponent, {
              width: '400px',
              height: 'auto',
              data: {name: note.split(';')[1], reason: 'You were removed!'}
            });
        
            dialogRef.afterClosed().subscribe(result => {
              this.resetBoards();
            });
            break;
        }
      });

      this.user.notifications = "[]";
      this.api.updateUser(this.user).subscribe(
        data => {
          localStorage.setItem('currentUser', JSON.stringify(this.user));
        },
        error => {
          console.log(error);
      });
    }
  }

  ngOnInit() {
    this.boards = this.config.getConfig().boards;
    this.resetBoards();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetBoards() {
    this.api.getAllBoards().subscribe(
      data => {
        this.allItems = [];
        let e = JSON.parse(localStorage.getItem('currentUser')).email;
        JSON.parse(JSON.stringify(data)).forEach(board => {
          if (e == board.owner || JSON.parse(board.users).includes(e)) {
            this.allItems.push(board);
          }
        });
      },
      error => {
        this.allItems = this.boards.boardslist;
        console.log(error);
      }).add(() => {
        this.setPage(1);
    });
  }

  removeNote() {
    this.api.getUserByEmail(this.user.email).subscribe(
      data => {
        data.notifications = JSON.parse(data.notifications);
        if (data.notifications.length) {
          data.notifications.pop();
          data.notifications = JSON.stringify(data.notifications);
          this.api.updateUser(data).subscribe(
            data => {
              
            },
            error => {
              console.log(error);
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deletedBoard(board) {
    var users = JSON.parse(board.users);
    users.forEach(user => {
      this.api.getUserByEmail(user).subscribe(
        data => {
          data.notifications = JSON.parse(data.notifications);
          data.notifications.push('deleted;' + board.name);
          data.notifications = JSON.stringify(data.notifications);
          this.api.updateUser(data).subscribe(
            data => {
              
            },
            error => {
              console.log(error);
          });
        },
        error => {
          console.log(error);
        }
      );
    });
    this.wsService.sendMsg({user: JSON.parse(localStorage.getItem('currentUser')).email, message: 'deleted' + ';' + JSON.stringify(board)});
  }

  setPage(pageNumber: number) {
    // create a pager
    this.pager = this.pagerService.getPager(this.allItems.length, pageNumber, this.pageSize);
    this.pages = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  onUser(info) {
    let board = info.board;
    board.users = JSON.parse(board.users);
    const index = board.users.indexOf(info.email);
    if (index > -1) {
      board.permissions = JSON.parse(board.permissions);
      board.permissions.splice(index, 1);
      board.permissions = JSON.stringify(board.permissions);
      board.users.splice(index, 1);
      board.users = JSON.stringify(board.users);
      this.api.updateBoard(board).subscribe(
        data => {
          this.api.getUserByEmail(info.email).subscribe(
            data => {
              data.notifications = JSON.parse(data.notifications);
              data.notifications.push('removed;' + board.name);
              data.notifications = JSON.stringify(data.notifications);
              this.api.updateUser(data).subscribe(
                data => {
                  
                },
                error => {
                  console.log(error);
              });
              this.wsService.sendMsg({user: JSON.parse(localStorage.getItem('currentUser')).email, message: 'removed' + ';' + info.email + ';' + JSON.stringify(board)});
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
      });
    }
  }
}
