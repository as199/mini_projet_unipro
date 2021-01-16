import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {PostService} from '../services/posts/post.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  posts: any;
  selectedId: number;
   postEdit: any;
   title ='';
   body ='';
   userid = 0;
   id: number;
   message ='';
  css = '';
  constructor(private postService: PostService) {

  }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      autoWidth: true,
      order: [[0, 'desc']],
      lengthMenu: [4,5,6]
    };
    this.afficherTable();

  }

  afficherTable(){
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
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
        this.postService.deletePosts(this.selectedId).subscribe(
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

  editer(id: number): any {
    this.postService.getOnePosts(id).subscribe(
      (data) => {
        this.body = data.body;
        this.title = data.title;
        this.userid = data.userId;
        this.id = id;
        console.log(data);
      }, (error) => {
        console.log(error);
      }
    );
  }

  Ajouter(formulaire: NgForm): any {
    this.css = '';
    this.message ='';
    this.postService.addPosts(formulaire.value).subscribe(
      (data) => {
        this.css = 'alert-success';
        this.message ='post creer avec sucess';
        formulaire.reset();
      }, (error) => {
        console.log(error);
        this.css = 'alert-danger';
        this.message ='erreur de creation du post';
      }
    );
  }

  validerEditer(EditeForm: NgForm) {
    this.css = '';
    this.message ='';
    this.postService.putPosts(this.id,EditeForm.value).subscribe(
      (data) => {
        this.css = 'alert-success';
        this.message ='post modifier avec sucess';
      }, (error) => {
        this.css = 'alert-danger';
        this.message ='erreur de modification du post';
      }
    );
  }


}
