import { Component, OnInit, DoCheck } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit, DoCheck {
  userLogged;
  constructor() {}

  ngOnInit() {
    console.log("ngOnInit");
  }

  ngDoCheck() {
    this.userLogged = UserService.idUser;
  }
}
