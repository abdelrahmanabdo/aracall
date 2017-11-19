import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http'
import { Geolocation } from '@ionic-native/geolocation';
import { ChathandlerPage } from'./../chathandler/chathandler';
import { DatabaseProvider } from './../../providers/database/database';
 import { Diagnostic } from '@ionic-native/diagnostic';

let lat1 ;
let long1;
let cid,remoteid;
let isenabled:boolean=false;

/**
 * Generated class for the MaplocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-maplocation',
  templateUrl: 'maplocation.html',
})
export class MaplocationPage {
  map: any;
  

  constructor(public diagnostic: Diagnostic,public alertCtrl: AlertController,public loadingctrl : LoadingController,public database:DatabaseProvider,public navCtrl: NavController, public navParams: NavParams,public http: Http ,public geolocation: Geolocation) {

  cid =  this.navParams.get('id');
    remoteid= this.navParams.get('remoteid')
  
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaplocationPage');
    this.diagnostic.isLocationEnabled().then(
      (isAvailable) => {
     
      // console.log('Is available? ' + isAvailable);
      this.getlocation();
      }).catch( (e) => {
      console.log(e);
      this.diagnostic.switchToLocationSettings();
      // const alert = this.alertCtrl.create({
      //   title: 'Open Gps',
      //   message: 'pLease Open Mobile GPS',
      //   buttons: [
      //     {
      //       text: 'Cancel',
      //       role: 'cancel',
      //       handler: () => {
      //         this.navCtrl.pop();
  
      //       }
      //     },
      //     {
      //       text: 'OK',
      //       handler: () => {
      //         this.diagnostic.switchToLocationSettings();
              
      //         console.log('Buy clicked');
      //       }
      //     }
      //   ]
      // });
      // alert.present();
    
   });
    
    
  
  
    
  }
//   var urlkkk =" http://maps.google.com/?q=" +localStorage.getItem("lat")+","+localStorage.getItem("long");
//   alert(urlkkk)
//   if(urlkkk!=undefined )
//   {
//      let obj = {
//        avatar : urlkkk , 
//        from_me : true , 
//        id : "undefined" , 
//        image :'', 
//      //  file : "" , 
//     //   location : "" , 
//    //    audio : "" , 
//      //  video : "" , 
//        is_read : true , 
//        text :  '' , 
//        time : Date.now() 
 
//      }
 
   
 
//  this.database.sendmsg(  obj,this.cid ,this.remoteid);
   
  
//  }
   send(){
    //  alert(cid+"xx"+remoteid)
     
       var urlkkk =" http://maps.google.com/?q=" +lat1+","+long1;
  console.log(urlkkk)
  if(urlkkk!=undefined )
  {
     let obj = {
       avatar : urlkkk , 
       from_me : true , 
       id : "undefined" , 
       image :'', 
     //  file : "" , 
    //   location : "" , 
   //    audio : "" , 
     //  video : "" , 
       is_read : true , 
       text :  '' , 
       time : Date.now() 
 
     }
 
   
 
 this.database.sendmsg(  obj,cid ,remoteid);
   
  
 }
//     localStorage.setItem("flag","1")
// alert(lat1+long1)
// localStorage.setItem("lat",lat1)
// localStorage.setItem("long",long1)
//localStorage.long=long1;
this.navCtrl.pop();
//this.navCtrl.push(ChathandlerPage,{cid,remoteid});

  //  this.navCtrl.push(ChathandlerPage);
     
    }
  addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
    
   }
   
  getlocation()
  {
     
    let optionsGPS = {timeout: 4000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(optionsGPS).then((resp) => {
      lat1=resp.coords.latitude;
      long1=resp.coords.longitude;
     let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    // currentPosMarker.setPosition(latLng);
     
     let mapOptions = {
       center: latLng,
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     }
     
     this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter()
     });
    
     let content = "<h4>Information!</h4>";         
    
    this.addInfoWindow(marker, content);
    }).catch((err) => {
      isenabled=true;
      let alert = this.alertCtrl.create({
            title: 'Open GPS',
            subTitle: 'You need active the GPS',
            buttons: [
                 
                  {
                    text: 'OK',
                    handler: () => {
                      this.navCtrl.pop();
                      this.diagnostic.switchToLocationSettings();
                      
                      console.log('Buy clicked');
                    }
                  }
                ]
        });
        alert.present();
        // this.diagnostic.switchToLocationSettings();
    });
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   lat1=resp.coords.latitude;
    //    long1=resp.coords.longitude;
    //   let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    //  // currentPosMarker.setPosition(latLng);
      
    //   let mapOptions = {
    //     center: latLng,
    //     zoom: 15,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }
      
    //   this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //   let marker = new google.maps.Marker({
    //     map: this.map,
    //     animation: google.maps.Animation.DROP,
    //     position: this.map.getCenter()
    //   });
     
    //   let content = "<h4>Information!</h4>";         
     
    //  this.addInfoWindow(marker, content);
  
    // https://www.bing.com/maps/default.aspx?where1=30.0444196, 31.2357116
    // http://maps.google.com/?q=30.0444196,31.2357116
    // var url = "  http://maps.google.com/?q="+30.0444196+","+ 31.2357116;
//      var url2=" https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=" +resp.coords.latitude+","+resp.coords.longitude;
//      var url = "http://maps.google.com/maps?saddr=" +resp.coords.latitude+","+resp.coords.longitude;
//     console.log(url2)
      
//     //  this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true').map(res=>res.json()).subscribe(data => {
//     //       var address = data.results[0];
//     //    var location=address.formatted_address;
//     //    alert(location)
    //      });
//  }).catch(e => 
//   {
//   alert(JSON.stringify(e))
//   alert('please Turn GPS ON');
// }


//  , function(error){
//   alert(JSON.stringify(error))
//   alert('please Turn GPS ON');
//   // alert('please Turn GPS ON');
//   // console.log("Could not get location");


// }
     
  }

}
