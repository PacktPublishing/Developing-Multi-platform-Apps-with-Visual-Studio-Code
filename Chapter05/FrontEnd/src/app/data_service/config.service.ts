import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  nodeUrl : string = 'http://localhost:3001';
  javaUrl : string = 'http://localhost:9003';
  
  constructor() { }
}
