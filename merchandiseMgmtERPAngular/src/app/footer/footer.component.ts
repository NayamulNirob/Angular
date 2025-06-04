import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  email: string = '';
  currentYear: number = new Date().getFullYear();

  subscribeToNewsletter() {
    if (this.email) {
      console.log('Subscribed with email:', this.email);
      
      alert(`Thanks for subscribing, ${this.email}!`);
      this.email = '';
    }
  }
}
