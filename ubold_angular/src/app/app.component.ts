import { Component } from '@angular/core';
import { Router, NavigationError, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ubold-angular';


 
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        this.router.navigate(['./pages/extra-pages/error404']); // Redireccionar a la página de error
      }
    });
  }
}
