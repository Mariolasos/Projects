import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from './models/user.model';
import {map} from 'rxjs/operators';
import { Todo } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }

  getUsers() : Observable<User[]>{
    return this.http.get("https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/users.json")
    .pipe(map(res=>{
      const users :User[] = [];
      for(let key in res){
        users.push({...res[key],id:key});
      }
      return users;
    }));
  }

  getTodos() : Observable<Todo[]>{
    return this.http.get("https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/todos.json")
    .pipe(map(res=>{
      const todos :Todo[] = [];
      for(let key in res){
        todos.push({...res[key],id:key});
      }
      return todos;
    }));
  }

  addUser(user:User){
    return this.http.post("https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/users.json",user);
  }

  deleteTodo(id){
    return this.http.delete(`https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
  }

  editTodo(todo:Todo,id){
    return this.http.patch(`https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}/.json`,todo);
  }

  createTodo(todo:Todo){
    return this.http.post("https://noteapp-94851-default-rtdb.europe-west1.firebasedatabase.app/todos.json",todo);
  }

  getUserLocalStorage():User{
    return JSON.parse(localStorage.getItem("user"));
  }

  getUserSessionStorage():User{
    return JSON.parse(sessionStorage.getItem("user"));
  }

  clearStorages(){
    localStorage.clear();
    sessionStorage.clear();
    return true
  }
}
