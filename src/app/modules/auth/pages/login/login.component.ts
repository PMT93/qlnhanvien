import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  onSubmit(frm: NgForm) {

    if (frm.valid) {

      this.authService
        .login(this.username, this.password)
        .subscribe({
          next: res => {
            this.toastr.success(res);
            void this.router.navigate(['/todo']);
          },
          error: err => this.toastr.error(err)
        });


    } else {
      this.toastr.error('Vui lòng nhập đầy đủ thông tin đăng nhập')
    }
  }

}
