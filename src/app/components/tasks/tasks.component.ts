import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  myTask : Task = {
    label : '' ,
    completed: false
  }

  tasks : Task[]= []

  editForm = false;
  showForm = false;


  constructor(private taskSercice : TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.taskSercice.findAll()
        .subscribe(tasks=> this.tasks = tasks )
  }

  deleteTasks(id){
    this.taskSercice.delete(id)
    .subscribe(()=> {
      this.tasks = this.tasks.filter(task=> task.id != id)
    })
  }

  persistTask(){
    this.taskSercice.persist(this.myTask)
        .subscribe((task)=> {
          this.tasks = [task, ...this.tasks]
          this.resetTask();
          this.showForm=false;
        })
  }

  resetTask(){
    this.myTask = {
      label : '',
      completed : false
    }
  }

  toggleCompleted(task){
    this.taskSercice.completed(task.id,task.completed)
         .subscribe(() => {
           task.completed = !task.completed;
         })

  }

  editTask(task){
    this.myTask = task;
    this.editForm = true;
    this.showForm=true;
    
  }

  updateTask(){
    this.taskSercice.update(this.myTask)
        .subscribe(task =>{
        this.resetTask();
        this.editForm = false;
        this.showForm=false;
      })
  }



}
