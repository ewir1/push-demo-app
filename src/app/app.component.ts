import { Component, OnInit } from '@angular/core';
import { PushNotificationOptions, PushNotificationService } from 'ngx-push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'push';

  constructor(private _pushNotificationService: PushNotificationService) { }


  ngOnInit() {
    this._pushNotificationService.requestPermission();
  }

  btnPush() {
    const title = 'Bienvenido a las notificaciones';
    const options = new PushNotificationOptions();
    options.body = 'Native Push Notification';

    this._pushNotificationService.create(title, options).subscribe((notif) => {
      if (notif.event.type === 'show') {
        console.log('onshow');
        setTimeout(() => {
          notif.notification.close();
        }, 3000);
      }
      if (notif.event.type === 'click') {
        console.log('click');
        notif.notification.close();
      }
      if (notif.event.type === 'close') {
        console.log('close');
      }
    },
      (err) => {
        console.log(err);
      });
  }

}
