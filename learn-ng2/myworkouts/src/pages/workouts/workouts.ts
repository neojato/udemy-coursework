import { WorkoutService } from './../../app/services/workout.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WorkoutDetailsPage } from '../workout-details/workout-details';

@Component({
  selector: 'page-workouts',
  templateUrl: 'workouts.html'
})
export class WorkoutsPage {
  workouts: any;

  constructor(public navCtrl: NavController, private _workoutsService: WorkoutService) {

  }

  ngOnInit() {
    this._workoutsService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  ionViewWillEnter() {
    this._workoutsService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
    });
  }

  workoutSelected(event, workout) {
    this.navCtrl.push(WorkoutDetailsPage, {
      workout: workout
    });
  }

}
