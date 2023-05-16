import {Injectable} from '@angular/core';
import * as md5 from 'md5';
import {User} from '../models/user.model';
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  listUser: User [] = [];
  currentUser: User | any = null;

  constructor() {
    this.loadUser();
    this.loadCurrentUser();
  }

  loadUser() {
    let tmp = this.loadLocal("Users");
    if (tmp)
      this.listUser = tmp;
    else {
      this.listUser = [];
    }
    return this.listUser;
  }

  loadCurrentUser() {
    let tmp = this.loadLocal("currentUser");
    if (tmp)
      this.currentUser = tmp;
    else {
      this.currentUser = null;
    }
    return this.currentUser;
  }

  register(user: User): Observable<string> {
    const checkExist = this.listUser.some(s => s.email == user.email);
    if (checkExist) {
      return throwError(() => 'User này đã tồn tại, không thể đăng ký');
    }

    user.id = Date.now(); // phát sinh id cho user dựa vào ngày
    user.password = md5(user.password);

    this.listUser.push(user);

    this.saveLocal(this.listUser, "Users");
    return of("Đăng ký thành công");
  }

  login(username: string, password: string): Observable<string> {

    const user = this.listUser.find((s => s.email == username));

    if (!user) {
      return throwError(() => 'Email không chính xác');
    }

    if (user.password == md5(password)) {
      this.currentUser = user;
      this.saveLocal(this.currentUser, "currentUser");
      return of('Đăng nhập thành công');
    } else {
      return throwError(() => 'Mật khẩu không chính xác');
    }
  }

  checkAuth() {
    return !!(this.currentUser && this.currentUser.email);
  }

  logOut() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  }


  saveLocal(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadLocal(key: string) {
    let str = localStorage.getItem(key);
    if (str && str != "") {
      return JSON.parse(str);
    } else {
      return false;
    }
  }

}
