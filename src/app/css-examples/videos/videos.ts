import { Component } from '@angular/core';

@Component({
  selector: 'app-videos',
  imports: [],
  templateUrl: './videos.html',
  styleUrl: './videos.scss',
})
export class Videos {
  title: string = 'Videos';
  src: string = '/videos/red_dragon_202511231815.mp4';
  type: string = 'video/mp4';
}
