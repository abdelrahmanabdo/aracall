import { DatabaseProvider } from './../../providers/database/database';
import { Component , ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
let type , remoteid , candidate ,database ; 
 let  servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'webrtc','username': 'websitebeaver@mail.com'}]};
  const pc = new RTCPeerConnection(servers); 
  let remotevideo , localvideo ; 
/**
 * Generated class for the VideohandlerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-videohandler',
  templateUrl: 'videohandler.html',
})
export class VideohandlerPage {
  @ViewChild('localVideo') localVideo;
  @ViewChild('selfVideo') selfVideo;
  constructor(public navCtrl: NavController, public navParams: NavParams , public db : DatabaseProvider) {
     
    database = this.db ; 
    type = this.navParams.get('type');
    if(type == 'remote') { candidate = this.navParams.get('candidate') ; remoteid = this.navParams.get('id');this.remote(candidate) }
else {remoteid = this.navParams.get('id'); this.init()}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideohandlerPage');
  }
    ngOnInit () {

    remotevideo = this.localVideo.nativeElement ; 
    localvideo = this.selfVideo.nativeElement ; 
    navigator.getUserMedia({audio : true , video : true}, (stream) => {
  
localvideo.srcObject = stream
   pc.addStream(stream)
     

    }, (err) => console.error(err) )
  }
  init () {
pc.onicecandidate = (event => {
  
  console.log(event);
  event.candidate?sendMessagetoremote(JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice")} );
pc.onaddstream = (event => remotevideo.srcObject = event.stream);
database.listenoninit('video').subscribe (data => {
  if(data.message != undefined) {
var msg = JSON.parse(data.message);
     if (msg.ice != undefined)
 pc.addIceCandidate(new RTCIceCandidate(msg.ice));

 else if (msg.sdp.type == "answer"){ pc.setRemoteDescription(new RTCSessionDescription(msg.sdp)); console.log('set remote desc true')}

  }
})
 pc.createOffer()
 .then(function (offer) {

   pc.setLocalDescription(offer)
 console.log('set local description to true')
 } )
 .then(function () {
sendMessagetoremote(JSON.stringify({'sdp': pc.localDescription}))
 })
function sendMessagetoremote (msg) {
  database.sendtoremote(remoteid,msg,'video') ; 
}
  }
remote (candidate) {
pc.onicecandidate = (event => event.candidate?sendtoinit(remoteid, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
pc.onaddstream = (event => remotevideo.srcObject = event.stream);
  var msg = JSON.parse(candidate);
  console.log(msg)
  database.remotelisten('video').subscribe (data => {
     if (msg.ice != undefined){
       pc.addIceCandidate(new RTCIceCandidate(msg.ice));
     }
  })

pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
 .then(() => 
  pc.createAnswer())
 .then(answer => {
   console.log('set local desc to true')
   pc.setLocalDescription(answer)})
 .then(() => {
   sendtoinit(remoteid, JSON.stringify({'sdp': pc.localDescription}))
  console.log(JSON.stringify({'sdp': pc.localDescription}))
});



function sendtoinit (remoteid , msg) {
database.sendtoinit(remoteid , msg,'video') ; 
}
}
}
