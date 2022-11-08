import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit,OnDestroy {
  @Input() task!: Task;
  @Output() updateEmitter: EventEmitter<Task> = new EventEmitter;

  constructor(public modal: ModalService) { }
  
  ngOnInit(): void {
    this.modal.register('edit');
  }
  
  ngOnDestroy(): void {
    this.modal.unregister('edit');
  }

  update(task: Task){
    this.updateEmitter.emit(task)
  }

}
