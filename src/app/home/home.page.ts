import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonCardContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { AlertController } from '@ionic/angular';
interface Person {
  Name: string;
  Position: string;
  Nationality: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CdkDropList, CdkDrag, IonButton, IonIcon, IonCardContent, IonCard, IonCardHeader, IonCardTitle, CommonModule],
})
export class HomePage {

  timeoutId: any;
  applied: Person[] = [
    { Name: 'John Smith', Position: 'Developer', Nationality: 'USA' },
    { Name: 'Alice Johnson', Position: 'Manager', Nationality: 'Canada' },
    { Name: 'Sean Maguire', Position: 'Designer', Nationality: 'UK' },
    { Name: 'Emma Brown', Position: 'Tester', Nationality: 'Australia' },
  ];

  interviewed: Person[] = [
    { Name: 'Michael Müller', Position: 'Analyst', Nationality: 'Germany' },
    { Name: 'Maxime Renaud', Position: 'Engineer', Nationality: 'France' },
    { Name: 'Carlos Rodriguez', Position: 'Architect', Nationality: 'Spain' },
    { Name: 'Giulia Rossi', Position: 'Consultant', Nationality: 'Italy' },
    { Name: 'Takeshi Suzuki', Position: 'Manager', Nationality: 'Japan' },
  ];

  shortlisted: Person[] = [
    { Name: 'Arthur Morgan', Position: 'Developer', Nationality: 'USA' },
    { Name: 'Edgar Ross', Position: 'Manager', Nationality: 'Canada' },
    { Name: 'Clara Moreau', Position: 'Engineer', Nationality: 'France' },
  ];

  offered: Person[] = [
    { Name: 'Sophie Martin', Position: 'Engineer', Nationality: 'France' },
    { Name: 'Jordan Williamson', Position: 'Tester', Nationality: 'Australia' },
    { Name: 'Alessia Conti', Position: 'Consultant', Nationality: 'Italy' },
  ];

  finalized: Person[] = [
    { Name: 'Andrew Allen', Position: 'Manager', Nationality: 'Canada' },
    { Name: 'Ali Hussain', Position: 'Manager', Nationality: 'Bahrain' },
    { Name: 'Alex Hunter', Position: 'Designer', Nationality: 'UK' },
  ];

  drop(event: CdkDragDrop<Person[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  constructor(private alertController: AlertController) {} 

  async handleMouseDown(event: MouseEvent, item: Person, listId: string) {
    this.timeoutId = setTimeout(async () => {
      await this.showLongPressAlert(item, listId);
    }, 1000); 
  }

  handleMouseUp() {
    clearTimeout(this.timeoutId);
  }

  async showLongPressAlert(item: Person, listId: string) {
    const alert = await this.alertController.create({
      header: 'Choose an action',
      inputs: [
        {
          name: 'disqualify',
          type: 'radio',
          label: 'Disqualify',
          value: 'disqualify',
        },
        {
          name: 'answer',
          type: 'radio',
          label: 'Answer',
          value: 'answer',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelled');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Chosen option:', data);
          },
        },
      ],
    });
  
    await alert.present();
  }
  




}
