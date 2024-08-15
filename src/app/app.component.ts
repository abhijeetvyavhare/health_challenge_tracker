import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkoutFormComponent } from "./components/workout-form/workout-form.component";
import { WorkoutListComponent } from "./components/workout-list/workout-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkoutFormComponent, WorkoutListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health_challenge_tracker';
  @ViewChild('workoutList') workoutList!: WorkoutListComponent;

  onWorkoutAdded() {
    this.workoutList.loadWorkouts();
  }
}
