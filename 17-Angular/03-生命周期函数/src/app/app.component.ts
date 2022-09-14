import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public flag: boolean = true
  title = 'angulardemo03';

  change() {
    this.flag = !this.flag
  }
}
