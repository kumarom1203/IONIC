import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LoadingController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;

  latitude: number;
  longitude: number;

  public dataForm: FormGroup;
  


  constructor(public loadingController: LoadingController, private router: Router, public formBuilder: FormBuilder,  private apiService: ApiService, private geolocation: Geolocation) {
    
    if(localStorage.getItem('is_login') == 'IS_LOIGIN'){

    }else{
      this.router.navigateByUrl('/login');
    }


    this.dataForm = formBuilder.group({
      shop_name: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      shop_code: ['', Validators.compose([Validators.minLength(2), Validators.required])],
      latitude: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      longitude: ['', Validators.compose([Validators.minLength(1), Validators.required])]
  });


  }






  ngOnInit() {
    this.loadData();

    setInterval(() => { 
     //this.loadData(); 
     }, 150000);

  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Fetching Information&nbsp;&nbsp;&nbsp;&nbsp;',
    });
    loading.present();


    this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp);

        this.dataForm.setValue({
          shop_name:'',
          shop_code:'',
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude
        })



        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          zoomControl: true,
          draggable: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
          disableDefaultUI: true,
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      new google.maps.Marker({
        position: latLng,
        map:this.map,
        title: "Hello World!",
      });

        

     }).catch((error) => {
       console.log('Error getting location', error);
     });

    
   /*
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        console.log(data);
      });
   */



        
 

    loading.dismiss();

  }

  async submitForm(){
    const loading = await this.loadingController.create({
      message: 'Fetching Information&nbsp;&nbsp;&nbsp;&nbsp;',
    });
    loading.present();
		console.log(this.dataForm.value);
		//alert(JSON.stringify(this.dataForm.value));
    if(this.dataForm.valid){

		
		this.apiService.post('addShop',this.dataForm.value).subscribe(data => { 
      loading.dismiss();
			alert(data['message']);

      if(data['success'] == 1){
    
        this.router.navigateByUrl('/success');
       
      }else{
        
        this.router.navigateByUrl('/login');

      }
      
      


		},err=>{
      loading.dismiss();
			console.log(err);
          alert(JSON.stringify(err));
          
        }
      ); 
      }else{
        loading.dismiss();
        alert('Invalid Form Data');
      }
	}


}
