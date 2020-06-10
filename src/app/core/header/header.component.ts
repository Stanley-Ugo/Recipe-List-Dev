import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStrorageService: DataStorageService,
    private authService: AuthService){}

  onSaveData(){
    this.dataStrorageService.storeRecipes()
    .subscribe(
      (response: Response) => {
        console.log(response)
      }
    );
  }

  onFetchData(){
    this.dataStrorageService.getRecipes();
  }

  onLogout(){
    this.authService.logout();
  }
}
