import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
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

  updateTask(task: Task) {
    this.taskDoc = this.db.doc(`users/${this.uid}/task/${task.docID}`);
    this.taskDoc.update(task);
  }

  toggleReminder(task: Task) {
    this.taskDoc = this.db.doc(`users/${this.uid}/task/${task.docID}`);
    this.taskDoc.update(task);
  }




/*

  getTasks(sort$: BehaviorSubject<string>) {
    return combineLatest([
      this.auth.user,
      sort$
    ]).pipe(
      switchMap(values => {
        const [user, sort] = values
        
        if(!user) {
          return of([])
        }

        const query = this.taskCollection.ref.where(
          'uid', '==', user.uid
        ).orderBy(
          'timestamp',
          sort ? 'asc' : 'asc'
        )

        return query.get()
      }),
      map(snapshot => (snapshot as QuerySnapshot<Task>).docs)
    )
  }

  /*updateTaskR(task: Task) {
    return this.taskCollection.doc(task.id).update({
      task
    })
  }

  private apiUrl = 'http://localhost:5000/tasks'
*/
}
