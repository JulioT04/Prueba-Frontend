import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { TagService } from 'src/app/services/tag.service';
import { PostListConfig } from 'src/app/models/post-list-config';
import { Etiqueta } from 'src/app/models/etiqueta';
@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  user !: User;
  idUser:any;
  basePath:string=environment.basePath;
  constructor(  private userService:UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private tagService: TagService,
    private route:ActivatedRoute,
    private http : HttpClient) { }

    isAuthenticated!: boolean;
    listConfig: PostListConfig = {
      type: 'all',
      filters: {}
    };
    tags!: Etiqueta[];
    tagsLoaded = false;

  ngOnInit(): void {
     const variable2 = this.route.snapshot.paramMap.get('id2');
     console.log("foro 2 "+variable2);

     this.setListTo('all');

     this.tagService.getAll()
     .subscribe((data) => {
       this.tags = data;
       this.tagsLoaded = true;
     });

  }
  setListTo(type: string = '', filters: Object = {}) {
    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
  
}
