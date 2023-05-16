import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user.model';
import {AuthService} from 'src/app/services/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = new User();

  constructor(private authService:AuthService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(frm:NgForm){
    if (frm.valid) {
      this.authService.register(this.user).subscribe({
        next: res => {
          this.toastr.success(res);
          void this.router.navigate(["/auth/login"]);
        },
        error: e => this.toastr.error(e)
      });

    } else {
      this.toastr.error('Vui điền đầy đủ thông tin');
    }
  }
}
