import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from 'src/app/services/consultas.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {
  proveedores = []
  constructor(private router: ActivatedRoute,
    private consultasService: ConsultasService,
    private loading: LoadingService) { }

  async ngOnInit() {
    await this.loading.showCargando("Consultando...");
    let id = this.router.snapshot.paramMap.get("especialidad");
    this.consultasService.obtenerProveedores(id).subscribe((data:any) => {
      this.proveedores = JSON.parse(data);
      console.log(this.proveedores)
      this.loading.stopCargando();
    });
  }
}
