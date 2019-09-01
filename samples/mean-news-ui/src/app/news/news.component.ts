import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { News } from './../news'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsListUrl = '/api/news';
  newsData: News[] = [];

  // 注入HttpClient
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData();
  }

  // 获取后台接口数据
  getData() {
    return this.http.get<News[]>(this.newsListUrl)
      .subscribe(data => this.newsData = data);
  }

}
