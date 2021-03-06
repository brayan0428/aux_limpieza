import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import { ProcesosService } from 'src/app/services/procesos.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController,Platform } from '@ionic/angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import {File} from '@ionic-native/File/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-registro-proveedores',
  templateUrl: './registro-proveedores.page.html',
  styleUrls: ['./registro-proveedores.page.scss'],
})

export class RegistroProveedoresPage implements OnInit {
  ciudades:[];
  tipodoc:[];
  especialidades:[];
  grupos:[];

  constructor(private consultasService:ConsultasService,
              private procesosService:ProcesosService,
              private toast:ToastService,
              private loading:LoadingService,
              private navCtrl:NavController,
              private plataforma:Platform,
              private document:DocumentViewer,
              private file:File,
              private ft:FileTransfer,
              private fileOpener:FileOpener) { }

  ngOnInit() {
    this.consultasService.obtenerCiudades().subscribe((data: any) => {
      this.ciudades = JSON.parse(data)
    })

    this.consultasService.obtenerTiposDocumentos().subscribe((data:any) => {
      this.tipodoc = JSON.parse(data)
    })

    this.consultasService.obtenerGruposEspecialidades().subscribe((data:any) => {
      this.grupos = JSON.parse(data);
    });
  }

  async guardarProveedor(form){
    form.perfil = 2
    console.log(form)
    await this.loading.showCargando('Espere...')
    this.procesosService.guardarProveedor(form).subscribe((data) => {
      if(data["error"]){
        this.toast.mostrarNotificacion(data["message"],2000)
      }else{
        this.toast.mostrarNotificacion('Proveedor creado exitosamente',2000)
        this.navCtrl.navigateRoot('/home')
      }
      this.loading.stopCargando()
    })
  }

  abrirTerminos(){
    let downloadUrl = 'https://docs.google.com/viewerng/viewer?url=https://auxlimpieza.com/wp-content/uploads/2019/10/TERMINOS-Y-CONDICIONES-PROVIDER-AUX.pdf'
    let path = this.file.dataDirectory
    const transfer = this.ft.create()
    transfer.download(downloadUrl,`${path}terminos_condiciones_usuario.pdf`).then(entry => {
      let url = entry.toURL()
	    console.log(url)
      if(this.plataforma.is("android")){
        this.fileOpener.open(url,'application/pdf')
      }else{
        this.document.viewDocument(url,'application/pdf',{})
      }
    }).catch(err => {
      console.log(err.message)
    })
  }

  async consultarEspecialidades(e){
    console.log(e.target.value)
    await this.loading.showCargando('Espere...')
    this.consultasService.obtenerEspecialidadesxGrupoTodos(e.target.value).subscribe((data:any) => {
      this.especialidades = JSON.parse(data)
      this.loading.stopCargando()
    })
  }
}
