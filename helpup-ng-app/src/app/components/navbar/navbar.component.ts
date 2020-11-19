import {Component, OnDestroy, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ApiService} from '../../services/ApiService';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../../services/NotificationService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchedUsers: any[];
  showDropdown: boolean;
  searchForm: FormGroup;
  id: number;
  noOfNotifications: any;

  constructor(public cookies: CookieService, private api: ApiService, private router: Router,
              private notificationService: NotificationService) {
    this.searchForm = new FormGroup({
      searchField: new FormControl()
    });
  }

  ngOnInit(): void {
    this.noOfNotifications = '0';
    this.id = setInterval(() => {
      if (this.cookies.check('jwt')) {
        this.notificationService.getNrOfNotifications().subscribe(
          (data) => {
            this.noOfNotifications = data.string;
          }
        );
      }
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  logout(): void {
    this.cookies.delete('jwt');
    this.cookies.delete('username');
    this.router.navigateByUrl('login');
  }

  onSubmit(): void {
    const searchFilter = this.searchForm.get('searchField').value;
    this.api.searchAfterUsers(searchFilter).subscribe(
      (data) => {
        this.searchedUsers = data;
      }
    );
  }

  translateImage(image: any): any {
    return 'data:image/jpeg;base64,' + image;
  }

  isAdmin(): boolean {
    return this.cookies.get('username').includes('admin');
  }

  clearSearchField():void {
    this.showDropdown = false;
    this.searchForm.reset();
  }
}
