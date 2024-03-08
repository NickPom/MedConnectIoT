import { Component, OnInit, ViewChild, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons,  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { VisitService } from '../visit/visit.service';
import { UserService } from '../user/user.service';
import { DeviceService } from '../device/device.service';
import { Device } from '../device';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrl: './device.component.scss'
})


export class DeviceComponent {
[x: string]: any;
  device = new Device(0,'','','','', 0);
  success = false;
  fail = false;
  displayedColumns = ['id_device','id_tipologia', 'nome','intervallo', 'editButton', 'deleteButton'];
  typeList: any;
  deviceList: any;
  pageSizeOptions = [5, 10, 25];
  showPageSizeOptions = true;
  length: any;
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent | undefined;
  patientList: any;
  editing = false;
  new = false;
  dataSource!: MatTableDataSource<any, any>;

  constructor(private authService: AuthService, private userService: UserService, private visitService: VisitService, private deviceService: DeviceService) { }
  ngOnInit() {
    this.deviceService.getAllDeviceType().subscribe(resp => {
      if (resp.status == 200) {
        this.typeList = resp.body;

        console.log(resp.body);
      }
    });
    this.refreshList();
    this.dataSource = new MatTableDataSource(this.deviceList);

      this.userService.getAllPatients().subscribe(resp => {
        this.patientList = resp.body;
        console.log(this.patientList);
      });

      
  
  }

  onPageChange(event: PageEvent) {
    this.pageEvent = event;
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.refreshList();
    return event;
  }

  refreshList(){
    this.userService.getUserData().subscribe(resp => {
      if(resp.body.tipo == "medico") {
        this.deviceService.getAllDevice().subscribe(data => {
          if (data.status == 200) {
            this.deviceList = data.body;
  
            this.length= data.body.length;
            console.log('LOGGGGG',this.length);
            this.dataSource = new MatTableDataSource(this.deviceList);
            console.log(this.deviceList);
          }
        });

        
      }
    });
  }

  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'iot-device' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  edit(device: any) {
    device.editable = true;
    this.editing = true;
    this.range = new FormGroup({
      start: new FormControl<Date | null>({value: device.data_inizio, disabled: false}),
      end: new FormControl<Date | null>({value: device.data_fine, disabled: false}),
    });
    this.device.data_inizio = device.data_inizio;
    this.device.data_fine = device.data_fine;
  }

  modify(device: any) {
    console.log('ENTRATO');
    this.deviceService.updateDevice(device.id_cambiato, device.id_persona, this.device.data_inizio, this.device.data_fine, device.id_device).subscribe(resp => {
      device.editable = false;
    this.editing = false;
    });
    
    //this.refreshList();
       
  }

  culo() {
    console.log('ENTRATO');
    
       
  }

  
  insert(device: any) {
    device.isNew = true;
    this.new = true;
    device.editable = true;
    this.editing = true;
    this.range = new FormGroup({
      start: new FormControl<Date | null>({value: device.data_inizio, disabled: false}),
      end: new FormControl<Date | null>({value: device.data_fine, disabled: false}),
    });
    this.device.data_inizio = device.data_inizio;
    this.device.data_fine = device.data_fine;
  }

  add(device: any) {
    this.deviceService.pairDevice(device.id_persona, this.device.data_inizio, this.device.data_fine, device.id_device).subscribe(resp => {
      device.isNew = false;
    this.new = false;
    });
    device.isNew = false;
    this.new = false;
    device.editable = false;
    this.editing = false;
    this.refreshList();
       
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  closedPicker(device: any) {  
   
    if(this.range.value.start!=null && this.range.value.end!=null ){
    this.device.data_inizio = this.formatDate(this.range.value['start']);
    this.device.data_fine = this.formatDate(this.range.value['end']);
    device.data_inizio = this.formatDate(this.range.value['start']);
    device.data_fine = this.formatDate(this.range.value['end']);
    }
  }

   formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}


  
  delete(device: any) {
    // this.visitService.deleteVisit(device.id_visita).subscribe(resp => {
    //   this.refreshList();
    // });
  }
  cancel(device: any) {
    device.isNew = false;
    this.new = false;
    device.editable = false;
    this.editing = false;
    this.refreshList();
   
  }

  onSubmit() {

    this.deviceService.createDevice(this.device).subscribe({
      next:(resp) => {
        console.log(resp.status);
              if (resp.status == 200) {
                this.success=true;
              }
      },error:(err) => {
          
          this.fail=true;
      },
    })
  }
}
