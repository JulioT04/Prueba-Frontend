import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BecaService } from './../../services/beca.service';
import { Beca } from 'src/app/models/beca';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-beca',
  templateUrl: './edit-beca.component.html',
  styleUrls: ['./edit-beca.component.css']
})
export class EditBecaComponent implements OnInit {

  myForm!: FormGroup;
  beca!: Beca;
  idBeca: any;

  constructor(
    private fb: FormBuilder,
    private becaService: BecaService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadBeca();
  }

  loadBeca() {
    this.idBeca = this.route.snapshot.paramMap.get('id');
    this.becaService.getBecaId(this.idBeca).subscribe((data) => {
      this.beca = data;
      this.myForm = this.fb.group({
        id: this.idBeca,
        title: [
          this.beca.title,
          [Validators.required, Validators.maxLength(60)],
        ],
        imgUrl: [this.beca.imgUrl, [Validators.required]],
        description: [this.beca.description],
        requirements: this.beca.requisitos,
        telephone: this.beca.telefono,
         urlpage: this.beca.urlPage,
        benefits:this.beca.beneficios,
      });
    });
  }

  updateBeca(): void {
    const beca: Beca = {
      id: this.idBeca,
      title: this.myForm.get('title')!.value,
      imgUrl: this.myForm.get('imgUrl')!.value,
      description: this.myForm.get('description')!.value,
      requisitos: this.myForm.get('requirements')!.value,
      telefono: this.myForm.get('telephone')!.value,
      urlPage: this.myForm.get('urlpage')!.value,
      beneficios:this.myForm.get('benefits')!.value,
      tagList:"",
    };
    this.becaService
      .updateBeca(this.idBeca, beca)
      .subscribe({
        next: (data) => {
          this.snackBar.open('La beca fue actualizada con exito!', '', {
            duration: 6000,
          });
          this.router.navigate(['becas']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
