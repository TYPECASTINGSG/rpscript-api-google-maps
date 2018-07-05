/**
 * @module google-maps
 */

import GoogleMap from '@google/maps';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

let MOD_ID = "google-maps";
export interface GoogleMapContext {
  mapClient?:any;
  apiKey?:string;
  clientId?:string;
  clientSecret?:string;
}

@RpsModule(MOD_ID)
export default class RPSGoogleMap {

  constructor(ctx:RpsContext){
    let mapContext = ctx.getModuleContext(MOD_ID);
    
    if(!mapContext)
      ctx.event.emit(RpsContext.LOAD_MOD_ERR_EVT,MOD_ID,new Error("No config found for Google Map module"));
    else {
      let config = ctx.getModuleContext(MOD_ID);

      if(config.clientId && config.clientSecret)
        config.mapClient = GoogleMap.createClient({
          clientId:config.clientId,clientSecret:config.clientSecret,
          Promise: Promise});
      else if(config.apiKey)
        config.mapClient = GoogleMap.createClient({key:config.apiKey,Promise: Promise});
      
      ctx.addModuleContext(MOD_ID,config);
    }
  }

  @rpsAction({verbName:'configure-google-maps'})
  async configure (ctx:RpsContext,opts:Object) : Promise<any>{
    let config = ctx.getModuleContext(MOD_ID) || {};
    if(opts['apiKey']) config['apiKey'] = opts['apiKey'];
    if(opts['clientId']) config['clientId'] = opts['clientId'];
    if(opts['clientSecret']) config['clientSecret'] = opts['clientSecret'];

    if(config.clientId && config.clientSecret)
    config.mapClient = GoogleMap.createClient({
      clientId:config.clientId,clientSecret:config.clientSecret,
      Promise: Promise});
    else if(config.apiKey)
    config.mapClient = GoogleMap.createClient({key:config.apiKey,Promise: Promise});

    ctx.addModuleContext(MOD_ID,config);
  }

  @rpsAction({verbName:'geocode'})
  async geocode (ctx:RpsContext,opts:Object,address:string) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];

    return new Promise((resolve,reject) => {
      mapClient.geocode({address:address},function(err, response) {
        if (!err) resolve(response.json.results);
        else reject(err);
      });
    });
  }

  @rpsAction({verbName:'directions'})
  async directions (ctx:RpsContext,opts:Object,originLat:number,originLng:number,destLat:number,destLng:number) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.directions({origin:{lat:originLat,lng:originLng},destination:{lat:destLat,lng:destLng}}).asPromise();
  }

  @rpsAction({verbName:'distance-matrix'})
  async distanceMatrix (ctx:RpsContext,opts:Object,originLat:number,originLng:number,destLat:number,destLng:number) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.distanceMatrix({origin:{lat:originLat,lng:originLng},destination:{lat:destLat,lng:destLng}}).asPromise();
  }

  @rpsAction({verbName:'elevation'})
  async elevation (ctx:RpsContext,opts:Object,lat:number,lng:number) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.elevation({lat:lat,lng:lng}).asPromise();
  }

  @rpsAction({verbName:'find-place'})
  async findPlace (ctx:RpsContext,opts:Object,input:string,inputType:string) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.findPlace({input:input,inputType:inputType}).asPromise();
  }

  @rpsAction({verbName:'geolocate'})
  async geolocate (ctx:RpsContext,opts:Object) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.geolocate({}).asPromise();
  }

  @rpsAction({verbName:'nearest-roads'})
  async nearestRoads (ctx:RpsContext,opts:Object,lat:number,lng:number) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.nearestRoads({lat:lat,lng:lng}).asPromise();
  }

  @rpsAction({verbName:'place'})
  async place (ctx:RpsContext,opts:Object,placeId:string) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.place({placeId}).asPromise();
  }

  @rpsAction({verbName:'places'})
  async places (ctx:RpsContext,opts:Object,query:string) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.places({query:query}).asPromise();
  }

  @rpsAction({verbName:'places-nearby'})
  async placesNearby (ctx:RpsContext,opts:Object,lat:number,lng:number) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.placesNearby({lat:lat,lng:lng}).asPromise();
  }

  @rpsAction({verbName:'places-photo'})
  async placesPhoto (ctx:RpsContext,opts:Object,photoreference:string) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.placesPhoto({photoreference:photoreference}).asPromise();
  }

  @rpsAction({verbName:'places-radar'})
  async placesRadar (ctx:RpsContext,opts:Object,lat:number,lng:number,radius:number) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.placesRadar({lat:lat,lng:lng,radius:radius}).asPromise();
  }

  @rpsAction({verbName:'reverse-geocode'})
  async reverseGeocode (ctx:RpsContext,opts:Object) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.reverseGeocode({}).asPromise();
  }

  // @rpsAction({verbName:'snapped-speed-limits'})
  // async snappedSpeedLimits (ctx:RpsContext,opts:Object,address:string) : Promise<any>{
  //   let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
  //   return mapClient.snappedSpeedLimits({address:address}).asPromise();
  // }

  // @rpsAction({verbName:'snap-to-roads'})
  // async snapToRoads (ctx:RpsContext,opts:Object,address:string) : Promise<any>{
  //   let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
  //   return mapClient.snapToRoads({address:address}).asPromise();
  // }

  // @rpsAction({verbName:'speed-limits'})
  // async speedLimits (ctx:RpsContext,opts:Object,address:string) : Promise<any>{
  //   let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
  //   return mapClient.speedLimits({address:address}).asPromise();
  // }

  @rpsAction({verbName:'timezone'})
  async timezone (ctx:RpsContext,opts:Object,lat:number,lng:number) : Promise<any>{
    let mapClient = ctx.getModuleContext(MOD_ID)['mapClient'];
    
    return mapClient.timezone({lat:lat,lng:lng}).asPromise();
  }
}

