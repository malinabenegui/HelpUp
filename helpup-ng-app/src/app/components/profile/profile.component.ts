import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/ApiService';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Post} from "../../models/Post";
import {UserDetails} from "../../models/UserDetails";
import {TranslateService} from "../../services/TranslateService";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: UserDetails;
  editMode: boolean;
  onPhotoMode: boolean;
  profileForm: FormGroup;
  selectedFile: File;
  retrievedPosts: Post[];

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute,
              private cookies: CookieService, public translateService: TranslateService) {
    this.profileForm = new FormGroup({
      description: new FormControl(),
      city: new FormControl(),
      education: new FormControl(),
      job: new FormControl()
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe(
      () => {
        this.initDetails();
      });
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
    this.userDetails.profilepic = event.target.files[0];
    const uploadData = new FormData();

    uploadData.append('imageFile', this.selectedFile);
    uploadData.append('username', this.userDetails.username);

    this.apiService.editProfilePicture(uploadData).subscribe(() => {
      this.userDetails.profilepic = this.translateService.translateImage(this.userDetails.profilepic);
      this.initDetails();
    });
  }

  initDetails(): void {
    this.userDetails = new UserDetails('', '', '',
      '', '', '', '', '', '', null, '', '');

    this.apiService.getUserDetails(this.activatedRoute.snapshot.params.username)
      .subscribe(
        (data: UserDetails) => {
          this.userDetails = data;
          this.userDetails.profilepic = this.translateService.translateImage(this.userDetails.profilepic);
          this.getPosts();
        });
  }

  saveEdit(): void {
    this.editMode = false;
    this.apiService.editUserDetails(this.userDetails).subscribe();
  }

  getPosts(): void {
    this.apiService.getPostsOfUser(this.userDetails.username)
      .subscribe((data: Post[]) => {
        this.retrievedPosts = data;
      });
  }

  saveDescriptionAfterEdit(post: Post, newDescription: string): void {
    post.editMode = false;
    if (post.description !== newDescription) {
      post.description = newDescription;
      this.apiService.editPost(post.id, post.description);
    }
  }

  deletePost(idPost: number): void {
    this.apiService.deletePost(idPost).subscribe(() => {
      this.getPosts();
    });
  }

  isMine(): boolean {
    return this.cookies.get('username') === this.userDetails.username;
  }

  isAdmin(): boolean {
    return this.cookies.get('username').includes('admin');
  }

}
