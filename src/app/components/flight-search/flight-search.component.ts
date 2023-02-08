import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { IClassType } from 'src/app/interfaces/class-type.interface';
import { IFlightResults } from 'src/app/interfaces/flight-results.interface';
import { IFlightType } from 'src/app/interfaces/flight-type.interface';
import { ILocations } from 'src/app/interfaces/location.interface';
import { FlightService } from 'src/app/services/flight-service.service';


@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  classTypeArr: IClassType[];
  locationsArr: ILocations[];
  flightTypeArr: IFlightType[];
  flightResultsArr: IFlightResults[];

  flight: IFlightResults;

  flightDetailsStepperForm: FormGroup;
  flightResultsStepperForm: FormGroup;
  personDetailsStepperForm: FormGroup;
  overviewStepperForm: FormGroup;

  overviewDepartLoction: string;
  overviewArrivalLoction: string;
  overviewFlightDate: string;
  overviewFlightTime: string;
  overviewCompany: string;
  overviewTravelTimeEstimate: string;
  overviewCost: string;
  overviewFlightCode: string;
  overviewCustName: string;
  overviewCustSurname: string;
  overviewAmountOfPeople: string;
  overviewEmail: string;
  overviewContactDetail: string;
  overviewFlightType: string;
  overviewClassType: string;

  selectedFlight = new Set<IFlightResults>();

  displayedColumns: string[] = ['id', 'Departure Location', 'Arrival Location', 'Flight Date', 'Flight Time', 'Company', 'Travel Time', 'Cost', 'Flight Code'];
  dataSource: IFlightResults[];

  constructor(private _formBuilder: FormBuilder, private flightService: FlightService) {
  }

  ngOnInit(): void {

    this.constructForms();
    this.getFlyingLocations();
    this.getFlightClassType();
    this. getFlightType();
    this. getFlightResults();

    this.dataSource = this.flightResultsArr;
  }

  constructForms(): void {

    this.flightDetailsStepperForm = this._formBuilder.group({
      flightType: [''],
      fromLocation: [''],
      toLocation: [''],
      fromDate: [''],
      toDate: [''],
      numberOfPeople: [''],
      classType: ['']
    });

    this.personDetailsStepperForm = this._formBuilder.group({
      name: [''],
      surname: [''],
      email: [''],
      contactDetails: ['']
    });

  }

  getFlyingLocations(): void {

    this.flightService.getLocations().subscribe(data => {
      this.locationsArr = data;
    });

  }

  getFlightClassType(): void {

    this.flightService.getClassTypes().subscribe(data => {
      this.classTypeArr = data;
    });


  }

  getFlightType(): void {

    this.flightService.getFlightTypes().subscribe(data => {
      this.flightTypeArr = data;
    });

  }

  getFlightResults(): void {

    this.flightService.getFlightResults().subscribe(data => {
      this.flightResultsArr = data;
    });

  }

  validateChosenflight(): void {

    if (this.selectedFlight) {

      this.stepper.next();
      this.setOverviewForm();
    }

  }

  setOverviewForm(): void {

    this.selectedFlight.forEach(entry  => {
      this.flight = entry;
    });

    this.selectedFlight.clear();

  }

  stepperFirstStep(): void {

    if(!this.flightDetailsStepperForm.valid) {
      this.flightDetailsStepperForm.markAllAsTouched();
      return;
  }

  this.stepper.next();

  }

  stepperThirdStep(): void {

    if(!this.personDetailsStepperForm.valid) {
      this.personDetailsStepperForm.markAllAsTouched();
      return;
  }

  this.overviewDepartLoction = this.flight.departLocation;
  this.overviewArrivalLoction = this.flight.arrivalLocation;
  this.overviewFlightDate = this.flight.flightDate;
  this.overviewFlightTime = this.flight.flightTime;
  this.overviewCompany = this.flight.company;
  this.overviewTravelTimeEstimate = this.flight.travelTimeEstimate;
  this.overviewCost = '\u20AC' + this.flight.cost.toString();
  this.overviewFlightCode = this.flight.flightCode;
  this.overviewCustName = this.personDetailsStepperForm.get('name')?.value;
  this.overviewCustSurname = this.personDetailsStepperForm.get('surname')?.value;
  this.overviewAmountOfPeople = this.flightDetailsStepperForm.get('numberOfPeople')?.value;
  this.overviewEmail = this.personDetailsStepperForm.get('email')?.value;
  this.overviewContactDetail = this.personDetailsStepperForm.get('contactDetails')?.value;
  this.overviewFlightType = this.flightDetailsStepperForm.get('flightType')?.value;
  this.overviewClassType = this.flightDetailsStepperForm.get('classType')?.value;

  this.stepper.next();

  }

}