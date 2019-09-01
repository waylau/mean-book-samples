import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from "./news/news.component";
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: NewsComponent },  // 新闻列表
  { path: 'news/:newsId', component: NewsDetailComponent}, // 新闻详情;带参数
  { path: 'admin', component: AdminComponent} // 后台管理
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
