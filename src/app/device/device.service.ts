import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Device } from '../device';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  

  

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}
  getAvaibleDevice(){

  }

  getAllDevice(){
    const reqHeader = this.authService.getHeaderWithBearer();

    return this.httpClient.get<any>("https://" + environment.apiLocation + ":" + environment.apiPort + '/alldevice', {
      headers: reqHeader,
      observe: 'response'
    });
   
  }
  getAllDeviceType(){
    const reqHeader = this.authService.getHeaderWithBearer();

    return this.httpClient.get<any>("https://" + environment.apiLocation + ":" + environment.apiPort + '/alldevicetype', {
      headers: reqHeader,
      observe: 'response'
    });
   
  }

  getIdDevicebyVisit(id_visita: Number){
    const reqHeader = this.authService.getHeaderWithBearer();

    return this.httpClient.get<any>("https://" + environment.apiLocation + ":" + environment.apiPort + '/getIdDevicebyVisit'+'?id_visita='+id_visita, {
      headers: reqHeader,
      observe: 'response'
    });
   
  }

  createDevice(device: Device) {
    const reqHeader = this.authService.getHeaderWithBearer();

    return this.httpClient.put<any>("https://" + environment.apiLocation + ":" + environment.apiPort + '/createdevice', device,{
      headers: reqHeader,
      observe: 'response'
    });
  }

  updateDevice(id_cambiato: number, id_persona:number, data_inizio:string, data_fine: string, id_device:number) {
    const reqHeader = this.authService.getHeaderWithBearer();

    if(Number(id_cambiato)==null){
      id_cambiato=Number(id_persona);
    }

    return this.httpClient.post<any>("https://" + environment.apiLocation + ":" + environment.apiPort + '/updatedevice',{
      id_cambiato: Number(id_cambiato),
      id_persona: Number(id_persona),
      data_inizio: data_inizio,
      data_fine: data_fine,
      id_device: Number(id_device)

  },
  {
    headers: reqHeader,
      observe: 'response'
    });
  }

  pairDevice( id_persona:number, data_inizio:string, data_fine: string, id_device:number) {
    const reqHeader = this.authService.getHeaderWithBearer();

  

    return this.httpClient.put<any>("https://" + environment.apiLocation + ":" + environment.apiPort + '/pairDevice',{

      id_persona: Number(id_persona),
      data_inizio: data_inizio,
      data_fine: data_fine,
      id_device: Number(id_device)

  },
  {
    headers: reqHeader,
      observe: 'response'
    });
  }

}
