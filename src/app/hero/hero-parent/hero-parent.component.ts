import { Component } from '@angular/core';
import { HEROS } from '../models/hero';

@Component({
  selector: 'app-hero-parent',
  templateUrl: './hero-parent.component.html',
  styleUrls: ['./hero-parent.component.scss'],
})
export class HeroParentComponent {
  heroes = HEROS;
  master = 'master';
}
