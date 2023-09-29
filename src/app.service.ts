import { Injectable } from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  // @Inject('AUTH_SERVICE')
  // private readonly authClient: ClientKafka;

  getHello(): string {
    return 'Hello World!';
  }

  // register() {
  //   this.authClient.send('register', { name: 'John Doe' }).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  // onModuleInit() {
  //   this.authClient.subscribeToResponseOf('register');
  // }
}
