import { Beca } from './../../models/beca';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BecaService } from './../../services/beca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-beca',
  templateUrl: './add-beca.component.html',
  styleUrls: ['./add-beca.component.css']
})
export class AddBecaComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private BecaService: BecaService,
    private snackBar: MatSnackBar,
    private router: Router,
    public route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(60)]],
      imgUrl: ['', [Validators.required]],
      description: [''],
      requirements:[''],
      telephone:[''] ,
      urlpage:[''] ,
      benefits:['']
    });
  }

  saveBeca(): void {
    const variable = this.route.snapshot.paramMap.get('id2');
    const beca: Beca= {
      id: 0,
      title: this.myForm.get('title')!.value,
      imgUrl: this.myForm.get('imgUrl')!.value,
      description: this.myForm.get('description')!.value,
      requisitos: this.myForm.get('requirements')!.value,
      telefono: this.myForm.get('telephone')!.value,
      urlPage: this.myForm.get('urlpage')!.value,
      beneficios:this.myForm.get('benefits')!.value,
      tagList: "-",
    };
    this.BecaService.addBeca(beca).subscribe({
      next: (data) => {
        this.snackBar.open('La beca fue registrada con exito!', '', {
          duration: 3000,
        });
        this.router.navigate(['/homePage',variable]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
