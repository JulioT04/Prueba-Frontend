import { DetalleBeca } from './../../models/detalle-beca';
import { DetalleBecaService } from './../../services/detalle-beca.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-becas-detalle',
  templateUrl: './becas-detalle.component.html',
  styleUrls: ['./becas-detalle.component.css']
})
export class BecasDetalleComponent implements OnInit {


  detalles:DetalleBeca[]=[]
  constructor(private detalleBecaService:DetalleBecaService) { }

  ngOnInit(): void {
    
  }
  getDetalleBeca(){
    this.detalles=this.detalleBecaService.getDetalleBeca();
  }

}
