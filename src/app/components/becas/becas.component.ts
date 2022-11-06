import { Component, OnInit } from '@angular/core';
import { Beca } from 'src/app/models/beca';
import { User } from './../../models/user';
import {BecaService} from './../../services/beca.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute} from '@angular/router';
import { environment } from './../../../environments/environment';
@Component({
  selector: 'app-becas',
  templateUrl: './becas.component.html',
  styleUrls: ['./becas.component.css']
})
export class BecasComponent implements OnInit {
  
  beca!: Beca[];
  user!:any;
  snackBar: any;
  // isReadMore: boolean=false;
  data!: string;
  
  constructor(public route:ActivatedRoute,
    private becaService:BecaService) { }

  ngOnInit(): void {
    const variable = this.route.snapshot.paramMap.get('id');
    this.user = variable;
    this.getBeca();
/*     this.checkDataLength(this.data); */
  }

  getBeca(){
    this.becaService.getBeca().subscribe((data:Beca[])=>{
      this.beca= data;
    })
  }
  deleteBeca(id: number) {
    this.becaService.deleteBeca(id).subscribe(() => {
      this.beca = this.beca.filter((e: Beca) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('La beca fue eliminada con exito!', '', {
        duration: 6000,
      });
    });
  }
/*   checkDataLength(data:string){

  } */
  
  /* applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    beca.filter = filterValue.trim().toLowerCase();
  } */
}

