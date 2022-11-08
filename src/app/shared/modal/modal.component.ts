import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  //providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID: string = '';

  constructor(public modal: ModalService, public elem: ElementRef) { }

  ngOnInit(): void {
    //Maintain modals original text color regarless of parent
    document.body.appendChild(this.elem.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.elem.nativeElement);
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }

}
