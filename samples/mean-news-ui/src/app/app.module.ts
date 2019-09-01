import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './admin/admin.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';

import { MarkdownModule } from 'ngx-markdown';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsDetailComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule, // NG-ZORRO模块
    FormsModule,  // FORM表单模块
    HttpClientModule,
    BrowserAnimationsModule,  // 动画模块
    NzButtonModule, // NG-ZORRO按钮模块
    NzListModule, // NG-ZORRO列表模块
    NzCardModule,// 用于新闻详情
    HttpClientModule, // HTTP客户端
    NzFormModule, // NG-ZORRO表单模块
    MarkdownModule.forRoot(), // Markdown渲染
    AppRoutingModule 
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }], // 国际化
  bootstrap: [AppComponent]
})
export class AppModule { }
