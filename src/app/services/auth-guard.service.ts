import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import {UserService} from '../services/user.service'
import { ToastService } from './toast.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  logged:boolean = false
  constructor(private router:Router,
              private toastService:ToastService) {
    
  }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.logged =  UserService.loggedUser
    console.log(route)
    let proxUrl = route.routeConfig.path;
    if(!this.logged){
      if(proxUrl === 'login' || proxUrl === 'registro' || proxUrl === 'home'){
        return true
      }
      this.toastService.mostrarNotificacion('Debe iniciar sesión',2000)
      this.router.navigate(["login"]);
      return false
    }else{
      if(proxUrl === 'home'){
        this.router.navigate(["/solicitar-servicio"]);
      }
    }
    return true
  }
}
