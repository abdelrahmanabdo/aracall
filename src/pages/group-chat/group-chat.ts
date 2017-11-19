import { AudiohandlerPage } from './../audiohandler/audiohandler';
import { Videohandler2Page } from './../videohandler2/videohandler2';
import { VideohandlerPage } from './../videohandler/videohandler';
import { DatabaseProvider } from './../../providers/database/database';
import { Component , AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import {PopoverController, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ScrollToService } from 'ng2-scroll-to-el';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { TabsPage } from './../tabs/tabs';
import { GroupInfoPage } from './../group-info/group-info';

import { ProfilePage } from './../profile/profile';

import {MaplocationPage} from './../maplocation/maplocation';
import * as $ from 'jquery'
import {FormControl , FormGroup , Validators } from '@angular/forms'
import { Media, MediaObject } from '@ionic-native/media';
import { PopupPage } from './../popup/popup';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/**
 * Generated class for the GroupChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
let temp ; 
let typer ; let message ; let loading ; 
let profiledet ; let remoteid ; let loader = 0 ; 
let loadedchats = [] ; let loading1 ; 
let imagelink;
let urlkkk;
var flags
let id;
@Component({
  selector: 'page-group-chat',
  templateUrl: 'group-chat.html',
})
export class GroupChatPage {
  private fileReader: FileReader;
  private base64Encoded: string;
  file: MediaObject
  items=[];
  public db: SQLiteObject

  msgs : any =[] ;
  allmessages=[];
 @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('input1') private myinput: ElementRef;
cid ; myavatar ; id ; remoteavatar ; group_name; title;
titles ; remoteid ; typing = false  ; 
toggled: boolean = false;
emojitext: string ="";
  userName
  messages 
  user ={'message': ''}
  group_admin
userid
  constructor(public imagePicker: ImagePicker,public navCtrl: NavController,public loadingctrl:LoadingController, public navParams: NavParams,public database:DatabaseProvider) {
    this.messages= this.navParams.get('messages')
    this.cid= this.navParams.get('cid')
    this.group_name= this.navParams.get('group_name')
    this.group_admin= this.navParams.get('group_admin')
    console.log(this.group_admin)
    
    this.title= this.navParams.get('chatUserName')
    if(this.group_name != null)
    {
      this.userName=this.group_name
    }else{
      this.userName =this.titles
    }
    this.userid =localStorage.getItem('userid') 
         this.database.newmsg(this.cid).subscribe(data => {
       
        message = data ; 
        if(parseInt(message.time)>1000){message.time = edittime(Date.now(),message.time)}
        this.messages.push(message);
     
    // alert(JSON.stringify(this.messages) )
    //  if(loadedchats.indexOf(this.title) == -1){loading.dismiss();}
  
  loadedchats.push(this.title) ; 
        
  
        
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
      })
 
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupChatPage');
  //  this.init() ; 
  }
  userForm = new FormGroup ({
    
     mail : new FormControl (null , [Validators.required]) 
    

 });
 handleSelection(event) {
  
  
     this.emojitext+=event.char;
  
  
  
  }
  
  location()
  {
    this.navCtrl.push(MaplocationPage,{id,remoteid});
    
  }
  Clear_Conversation()
  {
    // alert(this.cid)
    let loading1 = this.loadingctrl.create({
            showBackdrop : false 
          });
          
    // chat/delete/messages
    this.database.Delete_conversation(this.userid,this.cid).subscribe(res =>{
                loading1.dismiss()
           
                if(res.status==1){
  
                  this.database.Delete_conversationfirebase(this.cid)
                  // window.location.reload();
                  
                  this.navCtrl.push(TabsPage);
                  
                } 
            // alert("xxx"+JSON.stringify(res) )
           //   firebase.database().ref(userID + '/chats').delete(); 
              }
            );
  }
  dropdown()
  {
    
    $(document).on('click','.type-message .ion-android-arrow-dropup-circle',function() {
      
      $(this).toggleClass('arrow-dropdown');
      $('.toggle-icons').toggleClass('open');
  
    });
    $(document).on('click','.toggle-icons .ion-more',function() {
   // $('.toggle-icons .ion-more').click(function() {
      $('.chat-message-box .dropdown').toggleClass('open');
      
    });
  }
  checkinput() {
  
    if (this.userForm.value.mail==""){return true}else {return false}
  }
  getremoteid() {
  this.database.remoteid (this.title).then (data => {remoteid = data ; })
  
  }
  typo () {
  
     this.database.remoteid (this.title).then (data => {
       this.database.watchtype(data,this.cid).subscribe(data => {
        
       temp = data ; 
       this.typing = temp ; 
   
       })
     })
  }
  
  //   init() {
     
  //     // alert(this.messages)
  //   //  alert("1")
  //     // this.callapi()
  //   //   if(this.callapi())
  //   //   {
  //   //  alert(this.callapi())
  //   //  alert("2")
  //   //  //this.create()
  //   //     this.messages=this.getallmessages();
  //   //     alert("3")
  //   //     alert(" this.messages"+ this.getallmessages())
      
  //   //   }
      
     
      
  //   //   loading = this.loadingctrl.create({
  //   //   showBackdrop : false 
  //   // });
  
   
   
   
   
  //   // if(loadedchats.indexOf(this.title) == -1){
  //   //  // alert("wewqeqw")
  //   //   loading.present()
  //   // }
   
    
  //     //  alert("x"+JSON.stringify(x))
  //     //  alert("local"+localStorage.getItem("msgs")) 
  //     //  if(x==[])
  //     //  {
  //     //   this.messages=localStorage.getItem("msgs")
  //     //  }
  //     //  else{
      
  //     // }
  //     // this.database.getApiMessages(25,this.cid).subscribe(res =>
  //     //   {
        
  //     //     this.messages=res;
    
  //     //   }
  //     //   )
  //     this.database.newmsg(this.cid).subscribe(data => {
       
  //       message = data ; 
  //       if(parseInt(message.time)>1000){message.time = edittime(Date.now(),message.time)}
  //       this.messages.push(message);
     
  //   // alert(JSON.stringify(this.messages) )
  //   //  if(loadedchats.indexOf(this.title) == -1){loading.dismiss();}
  
  // loadedchats.push(this.title) ; 
        
  
        
  //       function edittime (current , previous) {
  //             var msPerMinute = 60 * 1000;
  //     var msPerHour = msPerMinute * 60;
  //     var msPerDay = msPerHour * 24;
  //     var msPerWeek  = 7 * msPerDay ; 
  //     var msPerMonth = msPerDay * 30;
  //     var msPerYear = msPerDay * 365;
  
  //     var elapsed = current - previous;
  
  //     if (elapsed < msPerMinute) {
  //          return 'now';   
  //     }
  
  //     else if (elapsed < msPerHour) {
  //          return Math.round(elapsed/msPerMinute) + ':minutes ago';   
  //     }
  
  //     else if (elapsed < msPerDay ) {
  //          return Math.round(elapsed/msPerHour ) + ':hours ago';   
  //     }
  //     else if (elapsed < msPerWeek) {
  //         return  Math.round(elapsed/msPerDay) + ':days ago';   
  //     }
  // else if (elapsed < msPerMonth) {
  //          return Math.round(elapsed/msPerWeek) + ':weeks ago';   
  //     }
      
      
  
  //     else if (elapsed < msPerYear) {
  //         return   Math.round(elapsed/msPerMonth) + ':months ago';   
  //     }
  
  //     else {
  //         return Math.round(elapsed/msPerYear ) + ':years ago';   
  //     }
  //       }
  //     })
      
  //   }
    
      ngAfterViewChecked() {  
             
          // this.scrollToBottom();  
           
      } 
  
      // scrollToBottom(): void {
      //     try {
      //         this.myScrollContainer.nativeElement.scrollTop =  this.myScrollContainer.nativeElement.scrollHeight ;
      //     } catch(err) { }                 
      // }
     
    
    checkURL(url) {
      if(url==undefined){
        return false ; 
      }else { 
       return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);}
     
   }
  
    send() {
  
     if(imagelink==undefined )
     {
      //  alert(remoteid)
      //  alert(this.cid)
        let obj = {
          avatar : "undefined" , 
          from_me : true , 
          id : "undefined" , 
          image :'', 
        //  file : "" , 
       //   location : "" , 
        audio : "" , 
         video : "" , 
          is_read : true , 
          text :  this.userForm.value.mail , 
          time : Date.now() 
    
        }
    
      if(this.userForm.value.mail != '') {
  
      }
      
      this.userForm.value.mail = '' ; 
  this.database.sendmsg(  obj,this.cid , remoteid);
      
      //  this.myinput.nativeElement.value = '';
      $('input').focus() ; 
      // $('#div1').scrollTop($('#div1')[0].scrollHeight);
      this.emojitext = '' ; 
    }
    if(imagelink!=undefined)
    {
      let obj = {
        avatar : "undefined" , 
        from_me : true , 
        id : "undefined" , 
        image :imagelink, 
      //  files : "" , 
     //   location : "" , 
        audio : "" , 
       video : "" , 
        is_read : true , 
        text : '', 
        time : Date.now() 
  
      }
  
    if(this.userForm.value.mail != '') {
  
    }
    
    this.userForm.value.mail = '' ; 
  this.database.sendmsg(  obj,this.cid , remoteid);
    
    //  this.myinput.nativeElement.value = '';
    $('input').focus() ; 
    // $('#div1').scrollTop($('#div1')[0].scrollHeight);
    this.emojitext = '' ; 
    imagelink=undefined;
    obj.text=undefined;
  }
  
    }
       getApiMesagesChat(cid=this.cid)
      {
     
      }
  onfocus() {
  
  
  
  if(typer == 1 ) {  }else { this.database.settyping(this.cid) ; typer = 1}
  
  }
  
  focusout() {
  typer = 0 ; 
  this.database.removetyping(this.cid) ;
  }
  
  toggle () {
  
    (this.typing == true) ? (this.typing = false) : (this.typing = true) ; 
  }
  
 

  
  pickimg() {
  //  alert("11111111")
     this.imagePicker.getPictures({maximumImagesCount : 1}).then((results) => {
      
    //  alert(results[0])
     let x=results[0]
    //  alert("ggg"+x)
      this.database.uploadimage(results[0]).then(data => {
        // alert("data"+data)
        
        imagelink=data;
     
  this.send();
  // alert("1")
  
      })
    })
  }
  
  
  // sendPicMsg() {
  //     let loader = this.loadingCtrl.create({
  //       content: 'Please wait'
  //     });
  //     loader.present();
  //     this.imgstore.picmsgstore().then((imgurl) => {
  //       loader.dismiss();
  //       this.chatservice.addnewmessage(imgurl).then(() => {
  //         this.scrollto();
  //         this.newmessage = '';
  //       })
  //     }).catch((err) => {
  //       alert(err);
  //       loader.dismiss();
  //     })
  //   }
  
//  onfocus() {
  
  
  
//   if(typer == 1 ) {  }else { this.database.settyping(this.cid) ; typer = 1}
  
//   }
//   dropdown()
//   {
//     //2press
//     // $('.type-message .ion-android-arrow-dropup-circle').click(function() {
      
//     //   $(this).toggleClass('arrow-dropdown');
//     //   $('.toggle-icons').toggleClass('open');
  
//     // });
//     // $('.toggle-icons .ion-more').click(function() {
//     //   $('.chat-message-box .dropdown').toggleClass('open');
      
//     // });
//     //1 press
//     $(document).on('click','.type-message .ion-android-arrow-dropup-circle',function() {
      
//       $(this).toggleClass('arrow-dropdown');
//       $('.toggle-icons').toggleClass('open');
  
//     });
//     $(document).on('click','.toggle-icons .ion-more',function() {
//    // $('.toggle-icons .ion-more').click(function() {
//       $('.chat-message-box .dropdown').toggleClass('open');
      
//     });
//   }
//   checkinput() {
  
//     if (this.userForm.value.mail==""){return true}else {return false}
//   }
//   send() {
//     // alert(urlkkk)
    
//     //  if(urlkkk!=undefined && imagelink==undefined)
//     //  {
//     //     let obj = {
//     //       avatar : urlkkk , 
//     //       from_me : true , 
//     //       id : "undefined" , 
//     //       image :'', 
//     //     //  file : "" , 
//     //    //   location : "" , 
//     //   //    audio : "" , 
//     //     //  video : "" , 
//     //       is_read : true , 
//     //       text :  '' , 
//     //       time : Date.now() 
    
//     //     }
    
//     //   if(this.userForm.value.mail != '') {
    
//     //   }
      
//     //   this.userForm.value.mail = '' ; 
//     // this.database.sendmsg(  obj,this.cid , remoteid);
      
//     //   //  this.myinput.nativeElement.value = '';
//     //   $('input').focus() ; 
//     //   // $('#div1').scrollTop($('#div1')[0].scrollHeight);
//     //   this.emojitext = '' ; 
//     // }
//        if(imagelink==undefined )
//        {
//         //  alert(remoteid)
//         //  alert(this.cid)
//           let obj = {
//             avatar : "undefined" , 
//             from_me : true , 
//             id : "undefined" , 
//             image :'', 
//           //  file : "" , 
//          //   location : "" , 
//           audio : "" , 
//            video : "" , 
//             is_read : true , 
//             text :  this.userForm.value.mail , 
//             time : Date.now() 
      
//           }
      
//         // if(this.userForm.value.mail != '') {
    
//         // }
        
//         // this.userForm.value.mail = '' ; 
//     this.database.sendmsg(  obj,this.cid , remoteid);
        
//    //      this.myinput.nativeElement.value = '';
//         $('input').focus() ; 
//         // $('#div1').scrollTop($('#div1')[0].scrollHeight);
//         this.emojitext = '' ; 
//       }
//       if(imagelink!=undefined)
//       {
//         let obj = {
//           avatar : "undefined" , 
//           from_me : true , 
//           id : "undefined" , 
//           image :imagelink, 
//         //  files : "" , 
//        //   location : "" , 
//           audio : "" , 
//          video : "" , 
//           is_read : true , 
//           text : '', 
//           time : Date.now() 
    
//         }
    
//       if(this.userForm.value.mail != '') {
    
//       }
      
//       this.userForm.value.mail = '' ; 
      
//     this.database.sendmsg(  obj,this.cid , remoteid);
      
//   //     this.myinput.nativeElement.value = '';
//       $('input').focus() ; 
//       // $('#div1').scrollTop($('#div1')[0].scrollHeight);
//       this.emojitext = '' ; 
//       imagelink=undefined;
//       obj.text=undefined;
//     }
    
//       }

//   sendMessageFunction()
//   {


//     this.database.ChatMessagesSend(this.cid,this.userid,this.user.message).subscribe(res => { console.log(res)
//     if(res.status == 1)
//     {
//       this.messages.push(res)
//     }
    
//     });
    
//   }

//   toggleOptions()
//   {
//   $(document).on('click','.type-message .ion-android-arrow-dropup-circle',function(){
//     $(this).toggleClass('arrow-dropdown');
//     $('.toggle-icons').toggleClass('open');

//   })
//   $(document).on('click','.toggle-icons .ion-more',function(){
//     $('.chat-message-box .dropdown').toggleClass('open');
 
//   })    
//   }

back()
{
  this.navCtrl.pop()
}

goToGroupInfo(){
  this.navCtrl.push(GroupInfoPage,{'title':this.userName,'cid':this.cid,'group_admin':this.group_admin})
}
  
}
