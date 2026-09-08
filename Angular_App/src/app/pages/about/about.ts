import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TeamItem } from '../../shared/components/team-item/team-item';

@Component({
  selector: 'c-about',
  imports: [TeamItem],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  team = signal([
    {
      name: 'Ahmed Shaarawy',
      title: 'Founder & CEO',
      image: 'images/team/ahmed.jpg',
      socials: [
        {
          name: 'LinkedIn',
          icon: 'pi pi-linkedin',
          link: 'https://www.linkedin.com/in/ahmedshaarawy/',
        },
      ],
    },
    {
      name: 'Samar Aly',
      title: 'PR & Marketing',
      image: 'images/team/samar.png',
      socials: [
        {
          name: 'LinkedIn',
          icon: 'pi pi-linkedin',
          link: 'https://www.linkedin.com/in/samaraly/',
        },
      ],
    },
    {
      name: 'Taha Ahmed',
      title: 'UI/UX Designer',
      image: 'images/team/taha.jpg',
      socials: [
        {
          name: 'LinkedIn',
          icon: 'pi pi-linkedin',
          link: 'https://www.linkedin.com/in/taha-ui/',
        },
      ],
    },
    {
      name: 'Toka Aly',
      title: 'Frontend Developer',
      image: 'images/team/toka.png',
      socials: [
        {
          name: 'LinkedIn',
          icon: 'pi pi-linkedin',
          link: 'https://www.linkedin.com/in/toka-aly-033822175/',
        },
      ],
    },
  ]);
}
