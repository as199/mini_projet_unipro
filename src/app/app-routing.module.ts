import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {PostsComponent} from './posts/posts.component';
import {CommentsComponent} from './comments/comments.component';

const routes: Routes = [
  {path: '',redirectTo:'/user', pathMatch:'full'},
  {path: 'user', component: UsersComponent},
  {path: 'post', component: PostsComponent},
  {path: 'comment', component: CommentsComponent},
  { path: '**', redirectTo: '/user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
