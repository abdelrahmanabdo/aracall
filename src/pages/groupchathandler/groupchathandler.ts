import { Popover1Page } from './../popover1/popover1';

import { DatabaseProvider } from './../../providers/database/database';
import { Component, ViewChild,ElementRef } from '@angular/core';
import { NavController, NavParams,PopoverController,ViewController } from 'ionic-angular';
import * as $ from 'jquery'
import {FormControl , FormGroup , Validators } from '@angular/forms'
let loaded = [] ; let msgs ; 
/**
 * Generated class for the GroupchathandlerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-groupchathandler',
  templateUrl: 'groupchathandler.html',
      styleUrls : ['../../assets/main.css','../../assets/ionicons.min.css']
})
export class GroupchathandlerPage {
    @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
  @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;
     @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('input1') private myinput: ElementRef;
avatar ; admin ; members ; chats ; title  ; msgs = [] ; myid ; groupid ;
  constructor(public popoverCtrl: PopoverController,public database:DatabaseProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.get('title')
    this.admin = this.navParams.get('admin')
    this.avatar = this.navParams.get('avatar')
    this.chats = this.navParams.get('chats')
    this.members = this.navParams.get('members')
    
    this.myid = this.navParams.get('myid')
    this.groupid = this.navParams.get('groupid')
    this.init (this.chats);
  }
 

   userForm = new FormGroup ({
     
      mail : new FormControl (null , [Validators.required]) 
     

  });

    ngAfterViewChecked() {  
           
        this.scrollToBottom();  
         
    } 

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop =  this.myScrollContainer.nativeElement.scrollHeight ;
        } catch(err) { }                 
    }
 init (chats) {


this.database.groupmsg(this.groupid).subscribe(data => {
   msgs = data ;
   alert(JSON.stringify(msgs))
   msgs.time = edittime(Date.now(),parseInt(msgs.time))
   this.msgs.push(msgs) ; 
})

      function edittime (current , previous) {
            var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerWeek  = 7 * msPerDay ; 
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return 'now';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ':minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ':hours ago';   
    }
    else if (elapsed < msPerWeek) {
        return  Math.round(elapsed/msPerDay) + ':days ago';   
    }
else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerWeek) + ':weeks ago';   
    }
    
    

    else if (elapsed < msPerYear) {
        return   Math.round(elapsed/msPerMonth) + ':months ago';   
    }

    else {
        return Math.round(elapsed/msPerYear ) + ':years ago';   
    }
      }
 }
 onfocus () {

 }

focusout()  {

 }
 send() {

this.database.sendmessage(this.groupid,this.userForm.value.mail,"text");
this.userForm.value.mail = "";
this.myinput.nativeElement.value = '';
 }
ngOnInit () {
  console.log(this.content.nativeElement)
}
presentRadioPopover(ev: UIEvent) {
    let popover = this.popoverCtrl.create(Popover1Page, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement,
   id:this.groupid });

    popover.present({
      ev: ev
    });
  }
clickme() {
  console.log('hello')
}
}