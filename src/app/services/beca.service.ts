import { Injectable } from '@angular/core';
import { Beca } from '../models/beca';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BecaService {
  basePath1:string=environment.api_url;
  constructor(private http: HttpClient) { }
  getBeca() {
    return this.http.get<Beca[]>(`${this.basePath1}/becas`);
  }

  getBecaId(id:any){
    return this.http.get<Beca>(`${this.basePath1}/becas/${id}`);
  }
  addBeca(beca: Beca) {
    return this.http.post<Beca>(
      `${this.basePath1}/becas`,
      beca
    );  
  }
  updateBeca(id: any, beca: Beca) {
    return this.http.put<Beca>(`${this.basePath1}/becas/${id}`, beca);
  }
  deleteBeca(id: any) {
    return this.http.delete<Beca>(`${this.basePath1}/becas/${id}`);
  }
}