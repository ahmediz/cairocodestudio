import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SocialIcons } from "../../shared/components/social-icons/social-icons";

@Component({
  selector: 'c-footer',
  imports: [RouterLink, SocialIcons],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {

}
