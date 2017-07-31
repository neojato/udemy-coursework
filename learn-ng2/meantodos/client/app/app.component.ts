import { TodoService } from './services/todo.service';
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [TodoService]
})

export class AppComponent { }
