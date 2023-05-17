import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../interfaces/iproperty';
import { Observable } from 'rxjs';

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
        for(const id in propertyList) {
          if(propertyList[id].sellRent === sellRent)
          propertiesArray.push(propertyList[id]);
        }

        return propertiesArray;
      }));
  }
}
