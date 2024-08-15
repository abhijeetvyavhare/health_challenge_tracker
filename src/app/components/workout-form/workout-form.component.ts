import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  @Output() workoutAdded = new EventEmitter<void>();

  onSubmit() {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
      workouts.push({
        userName: this.userName,
        workoutType: this.workoutType,
        workoutMinutes: this.workoutMinutes
      });
      localStorage.setItem('workouts', JSON.stringify(workouts));

      this.workoutAdded.emit();

      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    }
  }

  incrementMinutes() {
    this.workoutMinutes++;
  }

  decrementMinutes() {
    if (this.workoutMinutes > 0) {
      this.workoutMinutes--;
    }
  }
}
