import { DatabaseProvider } from './../../providers/database/database';
import { AddmemberPage } from './../addmember/addmember';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Popover1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover1',
  templateUrl: 'popover1.html',
})
export class Popover1Page {
groupid ; 
  constructor(public database:DatabaseProvider,public navCtrl: NavController, public navParams: NavParams) {
this.groupid = this.navParams.get('id')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popover1Page');
  }
clickme () {
  console.log('hello')
}
groupinfo(){

}
addmember() {
this.navCtrl.push(AddmemberPage , {id:this.groupid});

}
leavegroup(){
this.database.deletegroup(this.groupid);
}
  

}
