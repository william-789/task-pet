import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
  }

  openModal($event: Event){
    $event.preventDefault();

    this.modal.toggleModal('auth');
  }

  async logout($event: Event) {
    $event.preventDefault()

    //clear credentials from storage
    await this.afAuth.signOut()
  }
}
