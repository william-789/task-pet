import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes, faPencil } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/services/task.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  faTimes = faTimes;  
  faPencil = faPencil;

  constructor(
    private taskService: TaskService,
    public modal: ModalService) { }

  ngOnInit(): void {
  }

  onDelete(task: Task) {
    this.taskService.deleteTask(task);
  }

  onToggle(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.toggleReminder(task);
  }

  onEdit(task: Task) {
    this.taskService.toggleEditMode();
    this.openModal();
    this.taskService.setTaskToEdit(task);
  }

  onUpdate(task: Task){
    this.taskService.updateTask(task);
    //this.clearState();
  }

  /*clearState(){
    this.editState = false;
    this.taskToEdit = {
      text: '',
      day: new Date(),
      reminder: false
    };
  }*/

  openModal(){
    this.modal.toggleModal('create');
  }

}
