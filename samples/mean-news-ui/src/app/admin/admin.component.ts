import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { News } from './../news';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminUrl = '/api/admins/hi';
  createNewsUrl = '/api/admins/news';

  adminData = '';
  markdownTitle = '';
  markdownContent = '';

  // 注入HttpClient
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  // 获取后台接口数据
  getData() {
    return this.http.get(this.adminUrl, { responseType: 'text' })
      .subscribe(data => this.adminData = data);
  }

  // 同步编辑器中的内容
  syncContent(content: string) {
    this.markdownContent = content;
  }

  // 同步编辑器中的标题
  syncTitle(title: string) {
    this.markdownTitle = title;
  }

  // 提交新闻内容到后台
  submitData() {
    console.log('markdownTitle:' + this.markdownTitle + '; markdownContent:' + this.markdownContent );
    this.http.post<News>(this.createNewsUrl,
      new News(null, this.markdownTitle, this.markdownContent, new Date())).subscribe(
        data => {console.log(data);
         alert("已经成功提交");

         // 清空数据
         this.markdownTitle = '';
         this.markdownContent = '';
        },
        error => {
          console.error(error);
          alert("提交失败");
        }
      );
    ;
  }
}