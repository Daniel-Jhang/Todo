import { Component } from '@angular/core';

@Component({
  selector: 'app-voter-parent',
  templateUrl: './voter-parent.component.html',
  styleUrls: ['./voter-parent.component.scss'],
})
export class VoterParentComponent {
  agree = 0;
  disagree = 0;
  voters = ['Dr IQ', 'Celeritas', 'Bombasto'];

  onVoted(agreed: boolean) {
    if (agreed) {
      this.agree++;
    } else {
      this.disagree++;
    }
  }
}
