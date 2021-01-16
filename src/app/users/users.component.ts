import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/users/user.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
   users: any;
   selectedId: number;
   id: number;
   name= '';
   email= '';
   phone= '';
   website= '';
   company = '';
   adresse= '';
  message ='';
  css = '';
  constructor(private userService: UserService) {

  }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      autoWidth: true,
      order: [[0, 'desc']],
      lengthMenu: [4,5,6]
    };
    this.userService.refresh.subscribe(
      ()=> {
        this.afficherTable();
      });
    this.afficherTable();

  }

  afficherTable(){
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.dtTrigger.next();
      }
    );
  }
  delete(id: number): any {
    this.selectedId = id;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsers(this.selectedId).subscribe(
          (data) => {
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
            )
          }, (error) => {
            Swal.fire(
              'Deleted!',
              'Your file hasn\'t been deleted.',
              'error'
            )
          }
        );

      }
    })
  }

  editer(id: number) {
    this.userService.getOneUsers(id).subscribe(
      (data) => {
        this.id = id;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phone;
        this.website = data.website;
        this.adresse = data.address.city;
        this.company = data.company.name;
      }, (error) => {
      }
    );
  }

  /**
   * Ajout d'un nouveau user
   * @param AddForm
   * @constructor
   */
  Ajouter(AddForm: NgForm) {
    this.message = '';
    this.css = '';
    const users = {
      "name": AddForm.value.name,
      "username": AddForm.value.name,
      "email": AddForm.value.email,
      "address": {
          "city": AddForm.value.adresse
      },
      "phone": AddForm.value.phone,
      "website": AddForm.value.website,
      "company": {
        "name": AddForm.value.company,
      }
    }
    this.userService.addUsers(users).subscribe(
      (data) => {
        this.css = 'alert-success';
        this.message ='utiliasteur creer avec sucess';
      }, (error) => {
        console.log(error);
        this.css = 'alert-danger';
        this.message ='erreur de creation de l\'utiliasteur';
      }
    );
  }

  validEdite(ValiderEditeForm: NgForm) {
    this.message = '';
    this.css = '';
    const user = {
      "name": ValiderEditeForm.value.name,
      "username": ValiderEditeForm.value.name,
      "email": ValiderEditeForm.value.email,
      "address": {
        "city": ValiderEditeForm.value.adresse
      },
      "phone": ValiderEditeForm.value.phone,
      "website": ValiderEditeForm.value.website,
      "company": {
        "name": ValiderEditeForm.value.company,
      }
    }
    this.userService.putUsers(this.id,user).subscribe(
      (data) => {
        this.css = 'alert-success';
        this.message ='utiliasteur modifier avec succé';
      }, (error) => {
        this.css = 'alert-danger';
        this.message ='erreur de modification de l\'utiliasteur';
      }
    );
  }
}
