import { Component, OnInit} from '@angular/core';
//import { FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  /*const form = new FormGroup({
    first: new FormControl(),
    last: new FormControl()
 });*/
  task: Task = {
    text: '',
    day: new Date(),
    reminder: false
  }
  
  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
    if(this.taskService.editMode){
      this.task.text = this.taskService.taskToEdit.text;
      this.task.day = this.taskService.taskToEdit.day;
      this.task.reminder = this.taskService.taskToEdit.reminder;
    }

    console.log(`this is add task: ${this.task}`);
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

    if(this.taskService.editMode) {
      this.taskService.updateTask(this.task);
    }else {
      this.taskService.addTask(this.task);
    }
    this.task.text = '';
    this.task.day = new Date();
    this.task.reminder = false
  }
}
