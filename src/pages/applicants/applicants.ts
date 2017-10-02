import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-applicants',
  templateUrl: 'applicants.html',
})
export class Applicants {

  acceptedapplicants:any=[];
  refusedapplicants:any=[];
 sim_name;
 sim_id;
 list;
 applied:any=[];
 accepted:any=[];
 degree:any[];
 setdage:any={lower:-1,upper:5};
 refrence;
 original;
 pretab;
 sim_price;
 app_bool=false;
 acc_bool=false;
  constructor(platform:Platform,public navCtrl: NavController, public navParams: NavParams, public http: Http) {
   this.list="applied";
   this.app_bool=true;
  this. pretab=false;
  
  platform.ready().then(()=>{
    
            platform.registerBackButtonAction(() =>{
    
              if(this.navCtrl.canGoBack()){
                this.navCtrl.pop();
              }
            });
    
    
          });
  }

 

  ngOnInit() {

this.sim_name=this.navParams.get("name");
this.sim_id=this.navParams.get("id")
this.sim_price=this.navParams.get("price")
this.http.get("https://ffserver.eu-gb.mybluemix.net/get-applicants?simulation_date_id="+this.sim_id).subscribe(data => {
  var res = JSON.parse(data['_body']);
  this.applied=res.applied;
 this.accepted=res.accepted;
 this.original=this.refrence=this.applied;
 
});
  }

  switchapplied(){
    this.app_bool=true;
    this.acc_bool=false;
   this.list="applied";
   
   if(this.pretab==true){

this.filter();

   }
   this.pretab=false;
    }
    switchaccepted(){
      
   this.app_bool=false;
   this.acc_bool=true;

     this.list="accepted";
     if(this.pretab==true){
      
      this.filter();
      
         }
         this.pretab=false;
      }



    filterswitch(){
    
      if (this.list!="filter"){
this.list="filter";
this.pretab=true;

this.app_bool=false;
this.acc_bool=false;
      }
      else{
this.list="applied";
this.pretab=false;
this.app_bool=true;
this.filter();
      }
    }


filter(){
  console.log("REF",this.refrence);
  
  this.applied=[];
  this.original=this.refrence;
  
  
  //degree
if(this.degree!=null && this.degree.length>0){
  
  for (var _i = 0; _i < this.degree.length; _i++) {
    this.original=this.refrence;
   this.original = this.original.filter(
     (item) => {

       
        return (item.degree===this.degree[_i]);
      });
        this.original.forEach(element => {
         this.applied.push(element);
       });

}
this.original=this.applied;
}

//rating
this.applied = this.original.filter(
  (item) => {

    
     return (item.rating>=this.setdage.lower && item.rating<=this.setdage.upper);
   });


}


accept(i,User){
  console.log("accept",i);
  this.accepted.push(this.applied[i]);
 this.applied.splice(i,1);

 this.refrence= this.refrence.filter(
  (item) => {

    
     return (item.user_id!= User.user_id);
   });

this.original=this.refrence;


 let applicant={
user_id:User.user_id,
price:this.sim_price,
simulation_date_id:this.sim_id

 }

 this.http.post("https://ffserver.eu-gb.mybluemix.net/accept-applicant",applicant).subscribe(data => {
  // var res = JSON.parse(data['_body']);
 

 },(ERROR)=>{
   console.log('ERROR',ERROR);
   
 });
    }

reject(i,User){

  this.applied.splice(i,1);
  this.refrence= this.refrence.filter(
    (item) => {
       return (item.user_id!= User.user_id);
     });
  
  this.original=this.refrence;
 
  
  let applicant={
    user_id:User.user_id,
    price:this.sim_price,
    simulation_date_id:this.sim_id
    
     } 
         
     this.http.post("https://ffserver.eu-gb.mybluemix.net/reject-applicant",applicant).subscribe(data => {
      var res = JSON.parse(data['_body']);
      console.log("res",res);
      
     });

}

}
