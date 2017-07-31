import { WorkoutsPage } from './../workouts/workouts';
import { WorkoutService } from './../../app/services/workout.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'workout-details',
  templateUrl: 'workout-details.html'
})
export class WorkoutDetailsPage {
  public workout: any;
  public result: any;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    private _workoutService: WorkoutService
  ) {
    this.workout = params.get('workout');
  }

  deleteWorkout(workoutId) {
    this._workoutService.deleteWorkout(workoutId).subscribe(data => {
      this.result = data;
    });

    this.navCtrl.push(WorkoutsPage);
  }

}
