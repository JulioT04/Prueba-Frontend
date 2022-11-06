import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  basePath:string=environment.api_url;
  constructor(private http: HttpClient) { }

  add(comment: Comment) {
    debugger
    return this.http.post<Comment>(
      `${this.basePath}/comentarios`,
      comment
    );  
  }
}
