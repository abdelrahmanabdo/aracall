import { MorePage } from './../more/more';
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { GroupPage } from '../group/group';
import { ChatPage } from '../chat/chat';
import { SearchPage } from '../search/search';
// import {App} from '../../app/app.comp'
import { ContactsPage } from '../contacts/contacts';
import { Events } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import * as $ from 'jquery'
let clicked = true ; 
/**
 * Generated class for the TabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  groupRoot = GroupPage
  chatRoot = ChatPage
  contactsRoot = ContactsPage
  Search=SearchPage
   mySelectedIndex: number;
   userid
   unreadMessagesCount
  constructor(public app: App, public navCtrl: NavController,public events: Events,public NavParams:NavParams,private database:DatabaseProvider) {
    this.userid =localStorage.getItem('userid') 
    
      this.mySelectedIndex = this.NavParams.data.tabIndex || 0 ;
      this.database.get_unread_message_count(this.userid).subscribe(res=>{
        if(res >0){
        this.unreadMessagesCount=res.count
        }else{
          this.unreadMessagesCount=null
          
        }
      })
  }
onclick () {

  this.events.publish('clicked', "user");
}

more () {

  this.navCtrl.push(MorePage) ; 
}
search() {

  if(clicked == false){clicked = true}else{clicked = false}
  this.events.publish('search', clicked);
  this.app.getRootNav().push(SearchPage)
}
hide()
{
  alert('faf')
}
}
