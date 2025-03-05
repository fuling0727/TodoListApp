import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]  // ✅ Required imports
})
export class TodoListComponent {
  todos: any[] = [];
  newTodo: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<any[]>('http://localhost:3000/todos')
      .subscribe(data => this.todos = data);
  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.http.post('http://localhost:3000/todos', { text: this.newTodo })
        .subscribe(() => {
          this.loadTodos();
          this.newTodo = '';
        });
    }
  }

  deleteTodo(id: number) {
    this.http.delete(`http://localhost:3000/todos/${id}`)
      .subscribe(() => this.loadTodos());
  }
}
