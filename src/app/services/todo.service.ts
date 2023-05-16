import {Injectable} from '@angular/core';
import {Todo} from "../models/todo.model";

const TODO_KEY = 'Todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todos: Todo [] = [];

  constructor() {
    this.init();
  }

  init() {
    this._todos = this.loadLocal(TODO_KEY) ?? [];
  }

  get todos() {
    this._todos = this.loadLocal(TODO_KEY) ?? [];
    return this._todos;
  }

  save(todo: Todo) {
    if (todo.id > 0) {
      this._todos = this._todos.map(e => {
        if (e.id == todo.id) {
          return {...todo, id: e.id} as Todo;
        }
        return e;
      });

      this.saveLocal(this._todos, TODO_KEY);
    } else {
      todo.id = Date.now();
      this._todos.push(todo);
      this.saveLocal(this._todos, TODO_KEY);
    }
  }

  remove(todo: Todo) {
    const i = this._todos.findIndex((t => t.id == todo.id));
    if (i < 0) {
      return false
    }

    this._todos.splice(i, 1);
    this.saveLocal(this._todos, TODO_KEY);
    return true;
  }

  saveLocal(data: any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadLocal(key: string) {
    let str = localStorage.getItem(key);
    if (str && str != "") {
      return JSON.parse(str);
    } else {
      return null;
    }
  }

}
