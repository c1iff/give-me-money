import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2'

@Injectable()
export class ProjectService {

  projects: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.projects = angularFire.database.list('projects')
   }

   getProjects(){
     console.log(this.projects)
     return this.projects;
   }

   createProject(projectToCreate: Project)
   {
     console.log(projectToCreate);
     this.projects.push(projectToCreate);
   }

   getProjectById(projectId) {
     return this.angularFire.database.object('/projects/' + projectId)
   }

   addDonation(amount, projectToDonateTo) {
     var projectInFirebase = this.getProjectById(projectToDonateTo.$key);

     projectInFirebase.update({progress: (amount + projectToDonateTo.progress)})
   }

}
