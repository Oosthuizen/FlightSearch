import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { of } from 'rxjs'

import * as locationData from 'src/app/data/locations.json'
import * as classTypes from 'src/app/data/class-types.json'
import * as flightTypes from 'src/app/data/flight-type.json'
import * as flightResults from 'src/app/data/flight-results.json'

import { IClassType } from '../interfaces/class-type.interface';
import { ILocations } from '../interfaces/location.interface';
import { IFlightType } from '../interfaces/flight-type.interface'
import { IFlightResults } from '../interfaces/flight-results.interface'

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  locations = locationData;
  classTypes = classTypes;
  flightTypes = flightTypes;
  flightResults = flightResults;

  constructor() { }

  getLocations(): Observable<ILocations[]> {

    return of(this.locations.locations);

  }

  getClassTypes(): Observable<IClassType[]> {

    return of(this.classTypes.classType);

  }

  getFlightTypes(): Observable<IFlightType[]> {

    return of(this.flightTypes.flightType);

  }

  getFlightResults(): Observable<IFlightResults[]> {

    return of(this.flightResults.flightResults);

  }
}
