import { AudiohandlerPage } from './../audiohandler/audiohandler';
import { Videohandler2Page } from './../videohandler2/videohandler2';
import { VideohandlerPage } from './../videohandler/videohandler';
import { DatabaseProvider } from './../../providers/database/database';
import { Component , AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';
import {PopoverController, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { ScrollToService } from 'ng2-scroll-to-el';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { TabsPage } from './../tabs/tabs';

import { ProfilePage } from './../profile/profile';
import { ProfileInfoPage } from './../profile-info/profile-info';
import {MaplocationPage} from './../maplocation/maplocation';
import * as $ from 'jquery'
import {FormControl , FormGroup , Validators } from '@angular/forms'
import { Media, MediaObject } from '@ionic-native/media';
import { PopupPage } from './../popup/popup';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
let temp ; 
let typer ; let message ; let loading ; 
let profiledet ; let remoteid ; let loader = 0 ; 
let loadedchats = [] ; let loading1 ; 
let imagelink;
let urlkkk;
var flags
let id;

/**
 * Generated class for the ChathandlerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  
  selector: 'page-new-chat',
  templateUrl: 'new-chat.html',
 
    styleUrls : ['../../assets/main.css','../../assets/ionicons.min.css']
})
export class NewChatPage  implements AfterViewChecked {
  private fileReader: FileReader;
  private base64Encoded: string;
  file: MediaObject
  items=[];
  userID
  public db: SQLiteObject
  currentUserID;
  is_blocked
  msgs :any=[]; 
  allmessages  ;
 @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('input1') private myinput: ElementRef;
cid ; myavatar ; id ; remoteavatar ; 
title ; remoteid ; typing = false  ; 
settings=[{'last_seen_status':'','read_receipt':''}];
lastonline
  constructor(public sqlite: SQLite,public popoverCtrl: PopoverController,public fileChooser: FileChooser,public alert:AlertController, public media: Media,public imagePicker: ImagePicker,public scrollService:ScrollToService , public navCtrl: NavController, public navParams: NavParams,public database:DatabaseProvider,public loadingctrl : LoadingController) {
      this.cid =  this.navParams.get('data');
      this.is_blocked =  this.navParams.get('is_blocked')
     this.title = this.navParams.get('title')
     id=this.cid;
     console.log(this.title)
     this.userID =localStorage.getItem('userid')    
    loading = this.loadingctrl.create({
    showBackdrop : false 
  });
  
  this.database.remoteid(this.title).then(data => 
    {
    this.database.profileDetailsApiCall(this.userID,data).subscribe(res =>{
    console.log(res)
    this.currentUserID=res.id;
    console.log(this.currentUserID)
    this.lastonline = res.profile_info[0].value;
    this.database.get_user_chat_settings(this.currentUserID).subscribe(res=>
      {
          this.settings[0].last_seen_status=res.last_seen_status
          this.settings[0].read_receipt=res.read_receipt_status
      })
    // console.log(res)
     });
  })
  // alert("111")
  // this.callapi()
  // alert("222222222")
  // this.msgs= this.getallmessages();
//alert(JSON.stringify(this.msgs))
 
    //this.create()
  //  this.msgs=this.items
      //alert( localStorage.getItem("lat")+ localStorage.getItem("long"))
   
      this.remoteavatar = this.navParams.get('avatar');
   
   
   //this.send("http://maps.google.com/?q=30.0444196,31.2357116")
 
 //  alert("in con"+JSON.stringify( this.msgs))
   
  
   this.getremoteid () ; 
  this.typo () ; 
}
toggled: boolean = false;
emojitext: string ="";
// find()
// {
 
  getallmessages()
  {
   
    let array=[];
    // alert("111")
    return new Promise (resolve => {
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
     })
    
     .then((db: SQLiteObject) => {
       this.db=db
     
       this.db.executeSql('select * from Messages', {}).then((data) => {
         
    // alert(data.rows.length)
   
    if(data.rows.length > 0) {
    for(var i = 0; i < data.rows.length; i++) {

    // this.items.push(data);
    this.items.push({
      "id": data.rows.item(i).id,
      "time": data.rows.item(i).time,
      "text": data.rows.item(i).text,
  });

    }
    array= this.items
    }
  
    // alert("after_Insert1"+JSON.stringify(array))
   resolve(array)

  }, (err) => {
    // alert('Unable to execute sql: '+JSON.stringify(err));
    });
   })
 
 .catch(e => console.log(JSON.stringify(e)));
})
  }

 
// }
 create(allmessages){
 // alert("cc")
 
 let array=[];
//  return new Promise (resolve => {
  // alert(JSON.stringify(allmessages))
  // return new Promise (resolve => {
    return new Promise (resolve => {
    this.sqlite.create({
     name: 'data.db',
     location: 'default'
     })
     .then((db: SQLiteObject) => {
       this.db=db
      
        this.db.executeSql('CREATE TABLE IF NOT EXISTS Messages(id INTEGER PRIMARY KEY AUTOINCREMENT,time,text)', {})
           .then(() =>{
        // alert("crated")
           })
          
           .catch(e => console.log(JSON.stringify(e)));
    
           
        
       
   
          
           for(var i = 0; i < allmessages.length; i++){
            this.db.executeSql("INSERT INTO Messages (time,text) VALUES (?, ?)", [allmessages[i].time, allmessages[i].text])
            .then(() =>{
              // alert("data inserted")
                 })
                 
                
                 .catch(e => alert(JSON.stringify(e)));

                 resolve(true)
                }

                // this.msgs= this.getallmessages();
                // alert()
        //          this.db.executeSql('select * from Messages', {}).then((data) => {
                 
        //     alert(data.rows.length)
        //     if(data.rows.length < 0) {
        //       for(var i = 0; i < allmessages.length; i++){
        //         this.db.executeSql("INSERT INTO Messages (time,text) VALUES (?, ?)", [allmessages[i].time, allmessages[i].text])
        //         .then(() =>{
        //           alert("data inserted")
        //              })
                    
        //              .catch(e => alert(JSON.stringify(e)));
        //             }
        //             this.items.push({
        //               "id": data.rows.item(i).id,
        //               "time": data.rows.item(i).time,
        //               "text": data.rows.item(i).text,
        //           });
        //            array= this.items
        //             alert("after_Insert"+JSON.stringify(array))
        //     }
          
        // //    alert(data.rows.length);
        //     if(data.rows.length > 0) {
        //     for(var i = 0; i < data.rows.length; i++) {
        
        //     // this.items.push(data);
        //     this.items.push({
        //       "id": data.rows.item(i).id,
        //       "time": data.rows.item(i).time,
        //       "text": data.rows.item(i).text,
        //   });
      
        //     }
        //     array= this.items
        //     }
          
        //     alert("after_Insert1"+JSON.stringify(array))
        //     return array;
        
        //   }, (err) => {
        //     alert('Unable to execute sql: '+JSON.stringify(err));
        //     });
          })
        
          
        // alert("X"+ this.msgs)
       
        
       
     })
     .catch(e => alert(JSON.stringify(e)));
    
    //   resolve(this.msgs) ; 
        //})
      
 }
   
     //create table section
    
view_profile()
{
console.log(this.currentUserID)
  this.remoteavatar = this.navParams.get('avatar');
  console.log(remoteid)
  this.navCtrl.push(ProfileInfoPage,{'currentUserID':this.currentUserID,'remoteid':remoteid,id: this.cid,title: this.title,remoteavatar: this.remoteavatar});
}
Clear_Conversation()
{ let editGroupName = this.alert.create(
  {
    title : 'Delete conversation',
    message: "Do you want clear conversation ! ",
 
    buttons : [
      {
        text: 'ok',
        handler: data => {
          this.database.Delete_conversation(this.userID,this.cid).subscribe(res =>{
            loading1.dismiss()
            console.log(res)
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

      },
      {
        'text': 'cancel',
        role:'cancel'
      }
    ],
    
  })
editGroupName.present()
  // alert(this.cid)
  let loading1 = this.loadingctrl.create({
          showBackdrop : false 
        });
        
  // chat/delete/messages
 
}
Report_Conversation()
{

}
Block(blockedUser)
{

  let editGroupName = this.alert.create(
    {
      title : 'Block user',
      message: "Do you want block this user ! ",
   
      buttons : [
        {
          text: 'ok',
          handler: data => {
            this.database.blockUser(blockedUser,this.userID).subscribe(res =>{
              loading1.dismiss()
         
              if(res.status==1){

             
                // window.location.reload();
                
                this.navCtrl.push(TabsPage);
                
              } 
          // alert("xxx"+JSON.stringify(res) )
         //   firebase.database().ref(userID + '/chats').delete(); 
            }
          )
          }
  
        },
        {
          'text': 'cancel',
          role:'cancel'
        }
      ],
      
    })
  editGroupName.present()
  // alert(this.cid)
  let loading1 = this.loadingctrl.create({
          showBackdrop : false 
        });
        
  // chat/delete/messages

}
unBlock(userid)
{
  let editGroupName = this.alert.create(
    {
      title : 'unBlock user',
      message: "Do you want unblock this user ! ",
   
      buttons : [
        {
          text: 'ok',
          handler: data => {
            this.database.unblockUser(userid,this.userID).subscribe(res =>{
              loading1.dismiss()
         
              if(res.status==1){

             
                // window.location.reload();
                
                this.navCtrl.push(TabsPage);
                
              } 
          // alert("xxx"+JSON.stringify(res) )
         //   firebase.database().ref(userID + '/chats').delete(); 
            }
          )
          }
  
        },
        {
          'text': 'cancel',
          role:'cancel'
        }
      ],
      
    })
  editGroupName.present()
  // alert(this.cid)
  let loading1 = this.loadingctrl.create({
          showBackdrop : false 
        });
        
}
sendaudio()
{
//  this.file.stopRecord()
  //  alert(JSON.stringify( this.file))
  this.file.play();
}
remove()
{
  $('.remove-class').click(function(e) {
    $('.rec-btn').removeClass('open');
  });
  try {

    
      // alert(JSON.stringify( this.file))
      this.file.stopRecord()
    
      }
      catch (e) {
        //alert('Error: '+ e);
        
      }
}
presentPopover() {
 
//  alert("sdsdsd")
  	$(function() {
			// $('.type-message .ion-android-arrow-dropup-circle').click(function() {
			// 	$(this).toggleClass('arrow-dropdown');
			// 	$('.toggle-icons').toggleClass('open');
			// });
			// $('.toggle-icons .ion-more').click(function() {
			// 	$('.chat-message-box .dropdown').toggleClass('open');
      // });
     
			$('.type-message .ion-ios-mic').click(function(e) {
    $('.rec-btn').addClass('open');
});
    })
   
 
  try {
    // alert("1")
    this.file= this.media.create('my_file.m4a');
  //  alert(JSON.stringify(this.file) )
this.file.startRecord();
//alert("2")
//  return MediaObject;
  }

  catch (e) {
    alert('Error: '+ e);
    
  }


// stopRecording() {
//   try {
//     window.setTimeout(
//       () => 
//       { 
//        },
    
//     0
//     );
//   this.file.stopRecord()

//   }
//   catch (e) {
//     alert('Error: '+ e);
    
//   }

// }

// playRecording() {
//   try {
//   this.file.play();
//   }
//   catch (e) {
//     alert('Error: '+ e);
    
//   }
// }

// stopRecordingPlay() {
//   try {
//     this.file.stop();
//   }
//   catch (e) {
//     alert('Error: '+ e);
    
//   }
// }
  // let popover = this.popoverCtrl.create(PopupPage);
  // popover.present({
  //   ev: myEvent
  // });
}
 handleSelection(event) {


   this.emojitext+=event.char;



}

location()
{
  this.navCtrl.push(MaplocationPage,{id,remoteid});
  
}
// startRecording() {
//   this.file= this.media.create('file.mp3');

//   try {
// this.file.startRecord();
// window.setTimeout(
//   () => 
//   {

//     this.file.stopRecord()
//     // recorded=true
//     alert(JSON.stringify(this.file))
//   }

 
  
//   , 

//  60000
// );
//  return MediaObject;
//   }

//   catch (e) {
//     alert('Error: '+ e);
    
//   }
// }

// stopRecording() {
//   try {
//     window.setTimeout(
//       () => 
//       { 
//        },
    
//     0
//     );
//   this.file.stopRecord()

//   }
//   catch (e) {
//     alert('Error: '+ e);
    
//   }

// }

// playRecording() {
//   try {
//   this.file.play();
//   }
//   catch (e) {
//     alert('Error: '+ e);
    
//   }
// }

// stopRecordingPlay() {
//   try {
//     this.file.stop();
//   }
//   catch (e) {
//     alert('Error: '+ e);
    
//   }
// }
dropdown()
{
  //2press
  // $('.type-message .ion-android-arrow-dropup-circle').click(function() {
    
  //   $(this).toggleClass('arrow-dropdown');
  //   $('.toggle-icons').toggleClass('open');

  // });
  // $('.toggle-icons .ion-more').click(function() {
  //   $('.chat-message-box .dropdown').toggleClass('open');
    
  // });
  //1 press
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
// callapi()
// {
//   this.database.getApiMessages(25,this.cid).subscribe(res =>
//     {
//     //alert("callapi")
//       this.allmessages=res;
//     //  alert("ccccX"+JSON.stringify( this.allmessages))
  
//       this.create( this.allmessages)
     
//       // alert("XX"+JSON.stringify(x))
      

//     }
//     )
//     alert("Finished call api")
// }
//getallmessages()
// {
//   alert("a am here")
//  this.sqlite.create({
//    name: 'data.db',
//    location: 'default'
//    })
//    .then((db: SQLiteObject) => {
//      this.db=db
//  // this.db.openDBs({
//  //   name: 'data.db',
//  //   location: 'default'
//  //   })
//  //   .then((db: SQLiteObject) => {
//  //   })
 
 
//  this.db.executeSql('select * from Chat_Messagess', {}).then((data) => {
   
 
     
 
// //    alert(data.rows.length);
//    if(data.rows.length > 0) {
//    for(var i = 0; i < data.rows.length; i++) {

//    // this.items.push(data);
//     this.msgs.push({
//      "id": data.rows.item(i).id,
//      "time": data.rows.item(i).time,
//      "text": data.rows.item(i).text,
//  });

//    }
   // localStorage.setItem("msgs",this.msgs)
   //  this.msgs=  this.items

//    }
   
 
   
//  })
//  .catch(e =>  console.log(JSON.stringify(e)));
// })
// .catch(e => console.log(JSON.stringify(e)));
// alert(this.msgs);
//  return  this.msgs;
// }
  init() {
    // alert(this.msgs)
  //  alert("1")
    // this.callapi()
  //   if(this.callapi())
  //   {
  //  alert(this.callapi())
  //  alert("2")
  //  //this.create()
  //     this.msgs=this.getallmessages();
  //     alert("3")
  //     alert(" this.msgs"+ this.getallmessages())
    
  //   }
    
   
    
  //   loading = this.loadingctrl.create({
  //   showBackdrop : false 
  // });

 
 
 
 
  // if(loadedchats.indexOf(this.title) == -1){
  //  // alert("wewqeqw")
  //   loading.present()
  // }
 
  
    //  alert("x"+JSON.stringify(x))
    //  alert("local"+localStorage.getItem("msgs")) 
    //  if(x==[])
    //  {
    //   this.msgs=localStorage.getItem("msgs")
    //  }
    //  else{
    
    // }
    this.database.getApiMessages(this.userID,this.cid).subscribe(res =>
      {
      
        this.database.newmsg(this.cid).subscribe(data => {
          
           message = data ; 
           if(parseInt(message.time)>1000){message.time = edittime(Date.now(),message.time)}
           this.msgs.push(message);
        console.log(this.msgs)
       // alert(JSON.stringify(this.msgs) )
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
      )
   
  }
   userForm = new FormGroup ({
     
      mail : new FormControl (null , [Validators.required]) 
     

  });

    ngAfterViewChecked() {  
           
        // this.scrollToBottom();  
         
    } 

    // scrollToBottom(): void {
    //     try {
    //         this.myScrollContainer.nativeElement.scrollTop =  this.myScrollContainer.nativeElement.scrollHeight ;
    //     } catch(err) { }                 
    // }
   
  ionViewDidLoad() {

       let loading = this.loadingctrl.create({
    showBackdrop : false 
  });
  // this.database.getApiMessages2(25,this.cid).then(res =>
  //       {
  //         console.log("2")
       
  //         this.allmessages=res;
  //        alert("ccccX"+JSON.stringify( this.allmessages))
  //   //  // alert("2")
  //   //   this.create(this.allmessages).then(res2 =>
  //   //     {
  //   //       this.getallmessages().then(res3 =>
  //   //         {
            
  //   //           this.msgs.push(res3);
  //   //           var y=  this.msgs[0].time
  //   //           alert("res"+JSON.stringify( this.msgs) )
              
  //   //         })
  //   //     })
  //      this.msgs=res
  //   }
  // )
     
  //   alert(" this.msgs"+ this.msgs)
    
        
        //setTimeout(function(){
         
       
     //  },3000);
      
    //    console.log("777777")

    // console.log("88888888")
//loading.present() ; 
   this.database.getmsg(this.cid).subscribe(data => {
  
//this.msgs = data ; 
// loading.dismiss() ; 
// console.log(this.msgs)
this.id = this.msgs.length ; 

for ( let i = 0 ; i < this.msgs.length ; i ++) {

  if(this.msgs[i].from_me == true) {
    
    this.myavatar = this.msgs[i].avatar
    

  }
}



//     }) ; 


   })
   this.database.getprofile().then (data => {
   profiledet = data ; 
  if(profiledet.avatar != false){this.myavatar = profiledet.avatar}

})
 
  this.init() ; 
   
  }
  checkURL(url) {
    if(url==undefined){
      return false ; 
    }else { 
     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);}
   
 }
//  checkURL(url) {
//    if(url==undefined){
//      return false ; 
//    }
//  else { 
//     return true }
  
// }
  send() {
// alert(urlkkk)

//  if(urlkkk!=undefined && imagelink==undefined)
//  {
//     let obj = {
//       avatar : urlkkk , 
//       from_me : true , 
//       id : "undefined" , 
//       image :'', 
//     //  file : "" , 
//    //   location : "" , 
//   //    audio : "" , 
//     //  video : "" , 
//       is_read : true , 
//       text :  '' , 
//       time : Date.now() 

//     }

//   if(this.userForm.value.mail != '') {

//   }
  
//   this.userForm.value.mail = '' ; 
// this.database.sendmsg(  obj,this.cid , remoteid);
  
//   //  this.myinput.nativeElement.value = '';
//   $('input').focus() ; 
//   // $('#div1').scrollTop($('#div1')[0].scrollHeight);
//   this.emojitext = '' ; 
// }
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
this.database.send_New_Msg(  obj,this.cid , remoteid);
    
     this.myinput.nativeElement.value = '';
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
    //  file: "" , 
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
  
   this.myinput.nativeElement.value = '';
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

call() {
  loading1 = this.loadingctrl.create({
    showBackdrop : false 
  });
  loading1.present();
let number = Math.floor(Math.random()*1000000000) ; 
 this.database.remoteid (this.title).then (data => {
this.database.sendnumber(data , number , 'audio') ; 
let avatar = this.remoteavatar ; 
loading1.dismiss()
this.navCtrl.push(AudiohandlerPage , {avatar,data , number , remote : false});

 })

}
// ngOnDestroy() {
//     loading.dismiss()
//   }
  // ionViewWillUnload(){
  //  loading.present();
  // }
video() {
    loading1 = this.loadingctrl.create({
    showBackdrop : false 
  });
  loading1.present();
//    this.database.remoteid (this.title).then (data => {
// this.navCtrl.push(VideohandlerPage , {type : 'local' , candidate : 'anything' , id :data })

//    })

let number = Math.floor(Math.random()*1000000000) ; 

 this.database.remoteid (this.title).then (data => {
this.database.sendnumber(data , number , 'video') ; 
let avatar = this.remoteavatar ; 
loading1.dismiss()
this.navCtrl.push(Videohandler2Page , {name:this.title , avatar,data , number , remote : false});

 })


}
d(x)
{
  alert(JSON.stringify(this.msgs) )
   alert(JSON.stringify(x) )
  alert(x.id) 
  

//   this.database.delete_message(this.userID,x.id).then(data => {
//     alert("data"+JSON.stringify(data) )
      
//     // this.send();
   
// //this.send(undefined,data)
    
//    })
 
  // alert("x")
}
selectfile()
{
  alert("asfjdcvbsdfbshdsafds")
  this.fileChooser.open().then(uri =>
    {
      alert(uri)
    this.database.upload(uri).then(data => {
    alert("data"+JSON.stringify(data) )
      
    this.send();
   
//this.send(undefined,data)
    
   })
    
     } )
    // 
 
  .catch(e => 
  alert(e)
  );
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
