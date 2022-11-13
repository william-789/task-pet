import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map, Subject } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Task } from '../Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public routineCollection: AngularFirestoreCollection<Task>;
  public taskCollection: AngularFirestoreCollection<Task>;
  items: Observable<Task[]>;
  taskDoc!: AngularFirestoreDocument<Task>;
  taskToEdit!: Task;
  editMode: boolean = false;

  auth = getAuth();
  user = this.auth.currentUser;
  uid = this.user?.uid;

  constructor(
    private db: AngularFirestore
  ) { 
    this.routineCollection = db.collection('routine'); 
    this.taskCollection = db.collection('users').doc(this.uid).collection('task');

    this.items = this.taskCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a =>{
        const data = a.payload.doc.data() as Task;
        data.docID = a.payload.doc.id;
        return data;
      })
    }));
  }
  
  getTasks () {
    return this.items
  }

  addTask(task: Task) {
    this.taskCollection.add(task);
  }

  deleteTask(task: Task) {
    this.taskDoc = this.db.doc(`users/${this.uid}/task/${task.docID}`);
    this.taskDoc.delete();
  }

  //Edition functions
  updateTask(task: Task) {
    this.taskDoc = this.db.doc(`users/${this.uid}/task/${task.docID}`);
    this.taskDoc.update(task);
  }

  toggleReminder(task: Task) {
    this.taskDoc = this.db.doc(`users/${this.uid}/task/${task.docID}`);
    this.taskDoc.update(task);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  
  setTaskToEdit(task: Task) {
    this.taskToEdit = task;
    console.log(this.taskToEdit);
  }
}
