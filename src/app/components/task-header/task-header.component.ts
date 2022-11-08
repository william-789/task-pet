import { Component, OnInit } from '@angular/core';
import  { UiService } from 'src/app/services/ui.service'
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css']
})
export class TaskHeaderComponent implements OnInit {
  title:string = 'Tasks';
  
  constructor(public modal: ModalService) {
  }

  ngOnInit(): void {
  }

  openModal(){
    this.modal.toggleModal('create');
  }

}