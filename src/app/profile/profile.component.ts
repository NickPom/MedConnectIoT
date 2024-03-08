import { Component, OnInit, ViewChild , inject, TemplateRef} from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { User } from '../user';
import { UserService } from '../user/user.service';
import { Visit } from '../visit';
import { VisitListComponent } from '../visit/visit-list/visit-list.component';
import { VisitService } from '../visit/visit.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User('', '', '', 0, '');
  visit = new Visit('', '', '', '');
  success = false;
  selectedValue = "paziente";
  patientList: any;
  medicList: any;
  @ViewChild(VisitListComponent) visitList!:VisitListComponent;

  constructor(private authService: AuthService, private userService: UserService, private visitService: VisitService) {}

  ngOnInit() {
    this.userService.getUserData().subscribe(resp => {
      if(resp.status == 200) {
        this.user = new User(resp.body.nome, resp.body.cognome, resp.body.email, resp.body.id_persona, resp.body.tipo);
        if(resp.body.tipo == "medico") {
          this.userService.getAllPatients().subscribe(resp => {
            this.patientList = resp.body;
            console.log(this.patientList);
          });

          this.userService.getDoctors().subscribe(resp => {
            this.medicList = resp.body.filter((medic: { id_persona: number; }) => {
              return medic.id_persona != this.user.id_persona;
            });
          });
        }
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onSubmit() {
    this.visitService.createVisit(this.visit).subscribe(resp => {
      if(resp.status == 200) {
        this.success = true;
        this.visitList.refreshList();
      }
    });

  }

  private modalService = inject(NgbModal);
	closeResult = '';

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'programma-visita' }).result.then(
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

  
}
