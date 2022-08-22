import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle.model';
import { Observable } from 'rxjs';

@Injectable()
export class VehicleService {
  public resourceUrl = environment.baseUrl + ':11018/api/list-vehicles/1';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<HttpResponse<Vehicle[]>> {
    return this.http.get<Vehicle[]>(this.resourceUrl, { observe: 'response' })
  }
}
