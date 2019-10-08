import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  ciudades:Observable<any>;

  constructor(private consultasService:ConsultasService) { }


  ngOnInit() {
    this.ciudades = this.consultasService.getCiudades()
    console.log(this.ciudades)
  }

  guardarUsuario(){

  }
}
