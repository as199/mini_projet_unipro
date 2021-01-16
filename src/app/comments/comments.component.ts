import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {CommentService} from '../services/comments/comment.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  comments: any;
  selectedId: number;
  name = '';
  body = '';
  email = '';
  postId = 0;
  id: any;
  message ='';
  css = '';
  constructor(private commentService: CommentService) {

  }


  ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        autoWidth: true,
        order: [[0, 'desc']],
        lengthMenu: [5]
      };
    this.afficherTable();
  }

  afficherTable(){
    this.commentService.getAllComment().subscribe(
      (data) => {
        console.log(data);
        this.comments = data;
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
        this.commentService.deleteComment(this.selectedId).subscribe(
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
    this.commentService.getOneComments(id).subscribe(
      (data) => {
        this.body = data.body;
        this.name = data.name;
        this.email = data.email;
        this.postId = data.postId;
        this.id = id;
        console.log(data);
      }, (error) => {
        console.log(error);
      }
    );
  }


  validerEdit(editerForm: NgForm) {
    this.message = '';
    this.css = '';
    this.commentService.putPosts(this.id,editerForm.value).subscribe(
      (data) => {
        this.css = 'alert-success';
        this.message ='comment modifier avec sucess';

      }, (error) => {
        console.log(error);
        this.css = 'alert-danger';
        this.message ='erreur de modification du comment';
      }
    );
  }

  validerPost(addForm: NgForm) {
    this.message = '';
    this.css = '';
    this.commentService.addComments(addForm.value).subscribe(
      (data) => {
        this.css = 'alert-success';
        this.message ='comment creer avec sucess';
        addForm.reset();
      }, (error) => {
        this.css = 'alert-danger';
        this.message ='erreur de creation du comment';
      }
    );
  }
}
