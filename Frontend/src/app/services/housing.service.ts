import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../interfaces/iproperty';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(sellRent: number): Observable<IProperty[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertyList: IProperty[] = data as IProperty[];
        const propertiesArray: Array<IProperty> = [];
        const newProps = localStorage.getItem('newProp');
        const localProperties = JSON.parse(newProps !== null ? newProps : '');
        
        if(localProperties) {
          for(const id in localProperties) {
            if(localProperties[id].sellRent === sellRent)
            propertiesArray.push(localProperties[id]);
          }
        }

        for(const id in propertyList) {
          if(propertyList[id].sellRent === sellRent)
          propertiesArray.push(propertyList[id]);
        }

        return propertiesArray;
      }));
  }

  addProperty(property: Property) {
    let newProp = [property];
    if(localStorage.getItem('newProp')) {
      const prop = localStorage.getItem('newProp');
      newProp = [property, ...JSON.parse(prop !== null ? prop : '')];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropId() {
    const pid = localStorage.getItem('PID');
    localStorage.setItem('PID', String(pid !== null ? +pid + 1 : 101));
    return Number(localStorage.getItem('PID'));
  }
}
