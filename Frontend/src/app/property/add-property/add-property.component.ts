import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/interfaces/ipropertybase';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  //@ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  addPropertyForm!: FormGroup;
  nextClicked!: boolean;
  property: Property = new Property();

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  propertyView: IPropertyBase = {
    id: 0,
    name: '',
    price: 0,
    sellRent: 0,
    pType: '',
    fType: '',
    bhk: 0,
    builtArea: 0,
    city: '',
    rtm: 0
  };

  constructor(private fb: FormBuilder, private router: Router, private housingService: HousingService, private alertifyService: AlertifyService) {}

  ngOnInit(): void {
    this.createAddPropertyForm();
  }

  createAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      basicInfo: this.fb.group({
        sellRent: ['1', Validators.required],
        bhk: [null, Validators.required],
        pType: [null, Validators.required],
        fType: [null, Validators.required],
        name: [null, Validators.required],
        city: [null, Validators.required]
      }),
      priceInfo: this.fb.group({
        price: [null, Validators.required],
        builtArea: [null, Validators.required],
        carpetArea: [null],
        security: [null],
        maintenance: [null]
      }),
      addressInfo: this.fb.group({
        floorNo: [null],
        totalFloor: [null],
        address: [null, Validators.required],
        landmark: [null]
      }),
      otherInfo: this.fb.group({
        rtm: [null, Validators.required],
        possesionOn: [null],
        aop: [null, Validators.required],
        gated: [null],
        mainEntrance: [null],
        description: [null]
      })
    });
  }

  //#region <Getter Methods>
  //#region <FormGroups>
  get basicInfo() {
    return this.addPropertyForm.controls['basicInfo'] as FormGroup;
  }

  get priceInfo() {
    return this.addPropertyForm.controls['priceInfo'] as FormGroup;
  }

  get addressInfo() {
    return this.addPropertyForm.controls['addressInfo'] as FormGroup;
  }

  get otherInfo() {
    return this.addPropertyForm.controls['otherInfo'] as FormGroup;
  }
  //#endregion

  //#region <FormControls>
  //#region <Basic Info>
  get sellRent() {
    return this.basicInfo.controls['sellRent'] as FormControl;
  }

  get bhk() {
    return this.basicInfo.controls['bhk'] as FormControl;
  }
  
  get pType() {
    return this.basicInfo.controls['pType'] as FormControl;
  }

  get fType() {
    return this.basicInfo.controls['fType'] as FormControl;
  }

  get name() {
    return this.basicInfo.controls['name'] as FormControl;
  }

  get city() {
    return this.basicInfo.controls['city'] as FormControl;
  }
  //#endregion

  //#region <Price Info>
  get price() {
    return this.priceInfo.controls['price'] as FormControl;
  }

  get builtArea() {
    return this.priceInfo.controls['builtArea'] as FormControl;
  }

  get carpetArea() {
    return this.priceInfo.controls['carpetArea'] as FormControl;
  }

  get security() {
    return this.priceInfo.controls['security'] as FormControl;
  }

  get maintenance() {
    return this.priceInfo.controls['maintenance'] as FormControl;
  }
  //#endregion

  //#region <Address Info>
  get floorNo() {
    return this.addressInfo.controls['floorNo'] as FormControl;
  }

  get totalFloor() {
    return this.addressInfo.controls['totalFloor'] as FormControl;
  }

  get address() {
    return this.addressInfo.controls['address'] as FormControl;
  }

  get landmark() {
    return this.addressInfo.controls['landmark'] as FormControl;
  }
  //#endregion

  //#region <Other Info>
  get rtm() {
    return this.otherInfo.controls['rtm'] as FormControl;
  }

  get possesionOn() {
    return this.otherInfo.controls['possesionOn'] as FormControl;
  }

  get aop() {
    return this.otherInfo.controls['aop'] as FormControl;
  }

  get gated() {
    return this.otherInfo.controls['gated'] as FormControl;
  }

  get mainEntrance() {
    return this.otherInfo.controls['mainEntrance'] as FormControl;
  }

  get description() {
    return this.otherInfo.controls['description'] as FormControl;
  }
  //#endregion
  //#endregion
  //#endregion

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;

    if(this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertifyService.success('Congrats, Your property listed successfully!');
      console.log(this.addPropertyForm);

      if(this.sellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.alertifyService.error('Please review the form and provide valid entries!');
    }
  }

  mapProperty(): void {
    this.property.id = this.housingService.newPropId();
    this.property.sellRent = +this.sellRent.value;
    this.property.bhk = this.bhk.value;
    this.property.pType = this.pType.value;
    this.property.name = this.name.value;
    this.property.city = this.city.value;
    this.property.fType = this.fType.value;
    this.property.price = this.price.value;
    this.property.security = this.security.value;
    this.property.maintenance = this.maintenance.value;
    this.property.builtArea = this.builtArea.value;
    this.property.carpetArea = this.carpetArea.value;
    this.property.floorNo = this.floorNo.value;
    this.property.totalFloor = this.totalFloor.value;
    this.property.address = this.address.value;
    this.property.address2 = this.landmark.value;
    this.property.rtm = this.rtm.value;
    this.property.aop = this.aop.value;
    this.property.gated = this.gated.value;
    this.property.mainEntrance = this.mainEntrance.value;
    this.property.possession = this.possesionOn.value;
    this.property.description = this.description.value;
    this.property.postedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.formTabs) {

      if (this.basicInfo.invalid) {
        this.formTabs.tabs[0].active = true;
         return false;
      }

      if (this.priceInfo.invalid) {
        this.formTabs.tabs[1].active = true;
         return false;
      }

      if (this.addressInfo.invalid) {
        this.formTabs.tabs[2].active = true;
         return false;
      }

      if (this.otherInfo.invalid) {
        this.formTabs.tabs[3].active = true;
         return false;
      }
    }

    return true;
  }

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid && this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }
}
