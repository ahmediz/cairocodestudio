import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'c-team-item',
  imports: [],
  templateUrl: './team-item.html',
  styleUrl: './team-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamItem {
  member = input.required<{
    name: string;
    title: string;
    image: string;
    socials: { name: string; icon: string; link: string }[];
  }>();
}
