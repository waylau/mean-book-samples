import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // 用于回退浏览记录
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { News } from './../news'

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  newsUrl = '/api/news/';
  news: News = new News(null, null, null, null);

  // 注入HttpClient
  constructor(private location: Location, 
    private http: HttpClient, 
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.getData();
  }

  // 获取后台接口数据
  getData() {
    const newsId = this.route.snapshot.paramMap.get('newsId');
    console.log("newsId:" + newsId);
    return this.http.get<News>(this.newsUrl + newsId)
      .subscribe(data => this.news = data);
  }

  // 返回
  goback() {
    // 浏览器回退浏览记录
    this.location.back();
  }
}
