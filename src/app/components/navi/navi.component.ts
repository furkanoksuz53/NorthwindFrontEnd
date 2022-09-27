import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isLogged=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.login2()
  }

  login2(){
    if(localStorage.getItem("token")!=null){
      this.isLogged=true
    }else{
      this.isLogged=false
    }
  }
}
