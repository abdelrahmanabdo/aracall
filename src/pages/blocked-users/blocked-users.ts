import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

/**
 * Generated class for the BlockedUsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-blocked-users',
  templateUrl: 'blocked-users.html',
})
export class BlockedUsersPage {
  userId
  blocked
  constructor(public navCtrl: NavController,public toastCtrl :ToastController,public database:DatabaseProvider, public navParams: NavParams) {
    this.userId = localStorage.getItem('userid');
    this.getAllBlocked();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlockedUsersPage');
  }
  unblockUser(id, index){
    this.database.unblockUser(id, this.userId).subscribe(res => {
      // console.log(res);
      if(res.status == 1){
        let toast = this.toastCtrl.create({
          message: 'User unblocked successfully',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.blocked.splice(index, 1);
      }
    });
  }
  getAllBlocked(){
    this.database.getAllBlocked(this.userId).subscribe(res => {
      console.log(res);
      this.blocked = res;
      console.log(res)
    });
  }
  back(){
    this.navCtrl.pop();
  }
}
