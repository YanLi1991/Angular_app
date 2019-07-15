import { AuthService } from "./../../auth/auth.service";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"]
})
export class SidenavListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.authService.authChange.unsubscribe();
  }
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
}
