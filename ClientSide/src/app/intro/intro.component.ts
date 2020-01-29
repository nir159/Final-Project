import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service'
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  intro;

  constructor(private config: ConfigService) { }

  ngOnInit() {
    this.intro = this.getIntro();
  }

  getIntro() {
    return this.config.getConfig().intro;
  }

}
