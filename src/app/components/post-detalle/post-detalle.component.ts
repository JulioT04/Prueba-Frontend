import { Profile } from './../../models/profile';
import { Post } from './../../models/post';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Comment } from 'src/app/models/comment';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-post-detalle',
  templateUrl: './post-detalle.component.html',
  styleUrls: ['./post-detalle.component.css']
})
export class PostDetalleComponent implements OnInit {
  post!:Post;
  postD!: Post[];
  userId:any;
  idPost:any;
  currentUser!: User;
  canModify!: boolean;
  comments!: Comment[];
  commentControl = new UntypedFormControl();
  isSubmitting = false;
  isDeleting = false;
  lista: string[] | undefined;
  commentForm: UntypedFormGroup;
  comment: Comment = {} as Comment;
  currentProfile!: Profile;

  constructor(private postService: PostService, private router: Router,
    private route: ActivatedRoute, private commentService: CommentService,
    private userService:UserService,private fb: UntypedFormBuilder,
    private profileService: ProfileService,private snackBar: MatSnackBar) { 

    this.commentForm = this.fb.group({
      id:[''],
      body: [''],
    });

  }


  ngOnInit(): void {

    this.userId = this.route.snapshot.paramMap.get('user');
    this.idPost= this.route.snapshot.paramMap.get('post');

    console.log("detalle-post USER: "+ this.userId);
    console.log("detalle-post POST: "+ this.idPost);

    this.postService.getPostId(this.idPost).subscribe((data)=>{
      this.post = data;
    });

    this.getPost();

    this.userService.getUserId(this.userId).subscribe((userData:User)=>
    {this.currentUser = userData;}
    )

    this.profileService.getProfileId(this.userId).subscribe((profileData)=>
    {this.currentProfile = profileData;}
    )
    //this.lista = this.post.tagList.split(",");
  }

  getPost() {
    this.postService.getPosts().subscribe((data:Post[])=>{
      this.postD= data;
    })
  }

  onToggleFavorite(favorited: boolean) {
    /*this.post.favorite = favorited;

    if (favorited) {
      this.post.favoritesCount++;
    } else {
      this.post.favoritesCount--;
    }*/
  }
  addComment() {
    const variable = this.route.snapshot.paramMap.get('id2');
    const comment:Comment = {
      id: 0,
      body: this.commentForm.get('body')!.value,
      createdAt: new Date().toISOString(),
      autor: this.currentProfile,
      post: this.post,
    }
    console.log(this.userId);
    console.log("hola ");
    //debugger
    this.commentService.add(comment).subscribe({
      next: (data) => {
        this.snackBar.open('El comentario fue registrado con exito!', '', {
          duration: 3000,
        });
        this.commentForm.reset();
        this.router.navigate(['/homePage',this.userId,'foro',this.userId]);
      },
      error: (err) => {
        this.snackBar.open('No se logro añadir!', '', {
          duration: 3000,
        });
        console.log(err);
      }
    });;

  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(() => {
      this.postD = this.postD.filter((e: Post) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('La beca fue eliminada con exito!', '', {
        duration: 6000,
      });

      this.router.navigate(['/homePage',this.userId,'foro',this.userId]);
    });
  }
}
