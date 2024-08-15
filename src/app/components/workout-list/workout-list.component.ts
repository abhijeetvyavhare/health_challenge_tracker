// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { NgxPaginationModule } from 'ngx-pagination';

// interface Workout {
//   type: string;
//   minutes: number;
// }

// interface User {
//   id: number;
//   name: string;
//   workouts: Workout[];
// }

// @Component({
//   selector: 'app-workout-list',
//   standalone: true,
//   imports: [FormsModule, CommonModule, NgxPaginationModule],
//   templateUrl: './workout-list.component.html',
//   styleUrls: ['./workout-list.component.css']
// })
// export class WorkoutListComponent implements OnInit {
// getWorkoutCount(_t31: User) {
// throw new Error('Method not implemented.');
// }
//   users: User[] = [];
//   filteredUsers: User[] = [];

//   searchTerm: string = '';
//   selectedWorkoutType: string = '';
//   workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

//   currentPage: number = 1;
//   itemsPerPage: number = 5;

//   ngOnInit() {
//     this.loadUsersFromLocalStorage();
//     this.applyFilter();
//   }

//   private loadUsersFromLocalStorage() {
//     const data = localStorage.getItem('users');
//     this.users = data ? JSON.parse(data) : [];
//     this.filteredUsers = [...this.users];
//   }

//   getWorkoutTypes(user: User): string {
//     return user.workouts.map(workout => workout.type).join(', ');
//   }

//   getTotalWorkoutMinutes(user: User): number {
//     return user.workouts.reduce((acc, workout) => acc + workout.minutes, 0);
//   }

//   applyFilter() {
//     this.filteredUsers = this.users.filter(user => 
//       user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
//       (this.selectedWorkoutType ? user.workouts.some(workout => workout.type === this.selectedWorkoutType) : true)
//     );

//     this.currentPage = 1; // Reset to first page when filters are applied
//   }

//   get paginatedUsers(): User[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   nextPage() {
//     if (this.currentPage * this.itemsPerPage < this.filteredUsers.length) {
//       this.currentPage++;
//     }
//   }

//   prevPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  currentPage: number = 1;

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    const storedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    const userMap = new Map<string, User>();

    storedWorkouts.forEach((workout: { userName: string; workoutType: string; workoutMinutes: number }) => {
      if (!userMap.has(workout.userName)) {
        userMap.set(workout.userName, { name: workout.userName, workouts: [] });
      }
      userMap.get(workout.userName)?.workouts.push({
        type: workout.workoutType,
        minutes: workout.workoutMinutes
      });
    });

    this.users = Array.from(userMap.values());
    this.filteredUsers = [...this.users];
    this.applyFilter();
  }
  getWorkoutTypes(user: User): string {
    return user.workouts.map(workout => workout.type).join(', ');
  }

  getTotalWorkoutMinutes(user: User): number {
    return user.workouts.reduce((acc, workout) => acc + workout.minutes, 0);
  }

  applyFilter() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.selectedWorkoutType) {
      this.filteredUsers = this.filteredUsers.filter(user =>
        user.workouts.some(workout => workout.type === this.selectedWorkoutType)
      );
    }
  }
}
