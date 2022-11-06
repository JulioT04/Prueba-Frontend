import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-preview-post',
  templateUrl: './preview-post.component.html',
  styleUrls: ['./preview-post.component.css']
})
export class PreviewPostComponent implements OnInit {
  @Input() post!:Post;
  userId:any;
  idPost:any;
  contador:any;
  lista: string[] | undefined;
  
   constructor(private postService: PostService,private router: Router,
    public route: ActivatedRoute) { }

   ngOnInit(): void {
      this.userId = this.route.snapshot.paramMap.get('id2');
      console.log("preview-post: "+ this.userId);
      this.lista = this.post.tagList.split(",");
      this.contador = this.post.favoritesCount;
   }
   onToggleFavorite(favorited: boolean) {
    this.post['favorite'] = favorited;

    if (favorited) {
      this.contador++;
    } else {
      this.contador--;
    }
  }

}
