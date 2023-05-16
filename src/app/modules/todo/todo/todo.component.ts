import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {}

  logout(){
    this.authService.logOut();
    void this.router.navigate(["/auth/login"]);
  }

  get url() {
    const url = this.router.url?.split('/');
    return url[url.length - 1]
  }

}
