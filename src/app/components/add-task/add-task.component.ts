import { Component, OnInit} from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task: Task = {
    text: '',
    day: new Date(),
    reminder: false
  }
  
  constructor(private taskService: TaskService) { }

  

  ngOnInit(): void {
    if(this.taskService.editMode){
      this.task = this.taskService.taskToEdit;
      this.taskService.updateTask(this.task);
      console.log(this.task);
    }
  }

  onSubmit() {
    if(!this.task.text) {
      alert('Please add a task!');
      return;
    }
    if(!this.task.day) {
      alert('Please, select a date.');
      return;
    }
    
    this.taskService.addTask(this.task);
    this.task.text = '';
    this.task.day = new Date();
    this.task.reminder = false;
  }
}
