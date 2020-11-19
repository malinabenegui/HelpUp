import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/ApiService';
import {Chart} from 'node_modules/chart.js';
import {Post} from "../../models/Post";
import {UserDetails} from "../../models/UserDetails";
import {Type} from "../../models/Type";
import {Week} from "../../models/Week";


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  allPosts: Post[];
  allUsersDetails: UserDetails[];
  postType: Type;
  dailyPosts: Week;
  bucharest: number;
  timisoara: number;
  cluj: number;
  otherCity: number;

  constructor(public apiService: ApiService) {
    this.postType = new Type();
    this.dailyPosts = new Week();
    this.bucharest = 0;
    this.timisoara = 0;
    this.cluj = 0;
    this.otherCity = 0;
  }

  ngOnInit(): void {
    this.getPosts();
    this.getAllUsersDetails();
  }

  barchart(): void {
    this.countType();

    const myChart = new Chart('barPostsChart', {
      type: 'bar',
      data: {
        labels: ['Dog', 'Cat', 'Bunny', 'Autism', 'Down Syndrome', 'Other'],
        datasets: [{
          label: '# of posts',
          data: [this.postType.dog, this.postType.cat, this.postType.bunny, this.postType.asd, this.postType.down, this.postType.other],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        },
        title: {
          display: true,
          text: 'Number of posts by type'
        }
      }
    });
  }

  piechart(): void {
    this.countUsersType();

    const total = this.postType.pet + this.postType.affection + this.postType.other;
    const petPercentage = (this.postType.pet * 100 / total).toFixed(2);
    const affectionPercentage = (this.postType.affection * 100 / total).toFixed(2);
    const otherPercentage = (this.postType.other * 100 / total).toFixed(2);

    const myCharts = document.getElementById('piePostsChart') as HTMLCanvasElement;
    const ctx = myCharts.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Well-doer %', 'Down Syndrome/Autism %', 'Other %'],
        datasets: [{
          data: [petPercentage, affectionPercentage, otherPercentage],
          backgroundColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
          ],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Percentage of posts by user\'s type'
        }
      }
    });
  }

  linechart(): void {
    this.postsPerDay();

    const myChart = new Chart('linePostsChart', {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
          data: [this.dailyPosts.monday, this.dailyPosts.tuesday, this.dailyPosts.wednesday, this.dailyPosts.thursday,
            this.dailyPosts.friday, this.dailyPosts.saturday, this.dailyPosts.sunday],
          label: 'posts',
          borderColor: [
            'rgba(75, 192, 192, 1)',
          ],
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Most active days of posts'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });
  }

  doughnutCityChart(): void {
    this.countUsersByCities();

    const myChart = new Chart('doughnutCityChart', {
      type: 'doughnut',
      data: {
        labels: ['Bucharest', 'Cluj', 'Timisoara', 'Other cities'],
        datasets: [{
          data: [this.bucharest, this.cluj, this.timisoara, this.otherCity],
          backgroundColor: [
            'rgba(255, 159, 64, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
          ],
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Number of users by city'
        }
      }
    });
  }


  countUsersByCities(): void {

    for (const userDetails of this.allUsersDetails) {
      if (userDetails.city === 'Bucharest') {
        this.bucharest++;
      } else if (userDetails.city === 'Timisoara') {
        this.timisoara++;
      } else if (userDetails.city === 'Cluj') {
        this.cluj++;
      } else {
        this.otherCity++;
      }
    }
  }

  postsPerDay(): void {

    for (const post of this.allPosts) {
      if (new Date(post.date).getDay() === 0) {
        this.dailyPosts.monday++;
      } else if (new Date(post.date).getDay() === 1) {
        this.dailyPosts.tuesday++;
      } else if (new Date(post.date).getDay() === 2) {
        this.dailyPosts.wednesday++;
      } else if (new Date(post.date).getDay() === 3) {
        this.dailyPosts.thursday++;
      } else if (new Date(post.date).getDay() === 4) {
        this.dailyPosts.friday++;
      } else if (new Date(post.date).getDay() === 5) {
        this.dailyPosts.saturday++;
      } else if (new Date(post.date).getDay() === 6) {
        this.dailyPosts.sunday++;
      }
    }
  }

  countUsersType(): void {
    this.postType.pet = this.postType.dog + this.postType.cat + this.postType.bunny;
    this.postType.affection = this.postType.down + this.postType.asd;
  }

  countType(): void {
    for (const post of this.allPosts) {
      if (post.type === 'dog') {
        this.postType.dog++;
      } else if (post.type === 'cat') {
        this.postType.cat++;
      } else if (post.type === 'bunny') {
        this.postType.bunny++;
      } else if (post.type === 'chromosome') {
        this.postType.down++;
      } else if (post.type === 'asd') {
        this.postType.asd++;
      } else if (post.type === 'other') {
        this.postType.other++;
      }
    }
  }

  getPosts(): void {
    this.apiService.getAllPosts()
      .subscribe((data: Post[]) => {
        this.allPosts = data;
        this.barchart();
        this.piechart();
        this.linechart();
      });
  }

  getAllUsersDetails(): void {
    this.apiService.getAllUsersDetails().subscribe((data: UserDetails[]) => {
      this.allUsersDetails = data;
      this.doughnutCityChart();
    });
  }
}
