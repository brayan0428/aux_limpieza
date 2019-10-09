import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitar-servicio',
  templateUrl: './solicitar-servicio.page.html',
  styleUrls: ['./solicitar-servicio.page.scss'],
})
export class SolicitarServicioPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(localStorage.getItem('idUser'))
  }

  ionViewDidEnter(){
    
  }
}
