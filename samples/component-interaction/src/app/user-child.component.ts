import { Component, Input } from '@angular/core';
import { User } from './user';


@Component({
  selector: 'app-user-child',
  template: `
    <p>{{user.name}} 的老师是 {{masterName}}.</p>
  `
})
export class UserChildComponent {
  @Input() user: User; // 输入型属性
  @Input() masterName: string; // 输入型属性
}
