import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {
  private mediaSamplesApiUrl = 'https://cordovavrview.tangodev.it/media-samples-api.php';
  private infoTextApiUrl = 'https://cordovavrview.tangodev.it/info-text-api.php';
  private videosUrl = "http://ffserver.eu-gb.mybluemix.net/vr-videos?user_id=" ; 
  constructor(public http: Http) {}

  getMediaSamples(id) {
    console.log(this.videosUrl+id)
     return this.http.get(this.videosUrl+id)
       .map(this.extractJsonData)
       .catch(this.handleErrors);

 
  }

  getInfoText() {
    return this.http.get(this.infoTextApiUrl)
      .map(this.extractTextData)
      .catch(this.handleErrors);
  }

  private extractJsonData(res: Response) {
    let body = res.json();
    
    body.videos.forEach(Video => { 
      Video['type'] = "VIDEO" ; 
      Video['previewUrl'] = Video.preview_url ; 
      Video['inputType'] = "TYPE_STEREO_OVER_UNDER" ; 
     // Video['inputFormat'] = "FORMAT_DEFAULT"; 
      Video.isLocal = false ; 
    
    });
   // body.map(this.addMissingData)
    console.log("sadiki" , body)
    return body || { };
  }


  private extractTextData(res: Response) {
    let body = res.text();
    return body || "";
  }

  private handleErrors(error: Response) {
    console.log("Error API");
    return Observable.throw("There was an error while loading data.");
  }
}
