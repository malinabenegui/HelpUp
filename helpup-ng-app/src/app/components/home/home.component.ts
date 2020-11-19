import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ApiService} from '../../services/ApiService';
import {TranslateService} from '../../services/TranslateService';
import {FilterService} from '../../services/FilterService';
import {Post} from '../../models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  postForm: FormGroup;
  selectedFile: File;
  filteredPosts: Post[];
  allPosts: Post[];
  username: string;
  @ViewChild('fileInput', {static: false})
  myFileInput: ElementRef;
  errorMessage: string;
  selectedType = '';
  filterAfter: string[];

  constructor(private httpClient: HttpClient, private cookies: CookieService, private router: Router,
              private apiService: ApiService, public translateService: TranslateService,
              private filterService: FilterService) {
    this.postForm = new FormGroup({
      description: new FormControl(),
    });

    this.filteredPosts = new Array<Post>();
    this.filterAfter = new Array<string>();
    this.errorMessage = '';
  }

  public onFileChanged(event): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    const description = this.postForm.get('description').value;
    const type = this.selectedType;

    if (!description) {
      this.errorMessage = 'Description must be completed.';
    } else if (!this.selectedFile) {
      this.errorMessage = 'Image must be uploaded.';
    } else {
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile);
      uploadData.append('description', description);
      uploadData.append('type', type);

      this.apiService.addNewPost(uploadData).subscribe(() => {
        this.getPosts();
      });
      this.myFileInput.nativeElement.value = '';
      this.postForm.reset();
      this.errorMessage = '';
    }
  }

  getPosts(): void {
    this.apiService.getAllPosts()
      .subscribe((data: Post[]) => {
        this.allPosts = data;
        for (const post of this.allPosts) {
          this.getProfilePicture(post);
        }
        this.filteredPosts = this.allPosts;
      });
  }

  selectFilter(event): void {
    if (event.target.name === 'ending' || event.target.name === 'starting') {
      this.filterAfter.push(event.target.name + ' ' + event.target.value);
    }
    else if (event.target.name === 'city') {
      if (!event.target.checked) {
        this.filterAfter.splice(this.filterAfter.indexOf(event.target.name + ' ' + event.target.value));
      } else {
        this.filterAfter.push(event.target.name + ' ' + event.target.value);
      }
    } else if (!event.target.checked) {
      this.filterAfter.splice(this.filterAfter.indexOf(event.target.value));
    } else {
      this.filterAfter.push(event.target.value);
    }

    this.filteredPosts = this.filterService.filterPosts(this.allPosts, this.filterAfter);
  }

  getProfilePicture(post: Post): void {
    this.apiService.getProfilePicture(post.username).subscribe(data => {
        post.profilepic = this.translateService.translateImage(data.image);
      });
  }

  deletePost(idPost: number): void {
    this.apiService.deletePost(idPost).subscribe(() => {
      this.getPosts();
    });
  }

  saveDescriptionAfterEdit(post: Post, newDescription: string): void {
    post.editMode = false;
    if (post.description !== newDescription) {
      post.description = newDescription;
      this.apiService.editPost(post.id, post.description);
    }
  }

  ngOnInit(): void {
    if (this.cookies.check('jwt')) {
      this.getPosts();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  isMine(post: Post): boolean {
    return this.cookies.get('username') === post.username;
  }

  isAdmin(): boolean {
    return this.cookies.get('username').includes('admin');
  }

  selectType(event: any): void {
    this.selectedType = event.target.value;
  }
}
