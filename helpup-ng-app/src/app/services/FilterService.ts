import {Injectable} from '@angular/core';
import {Post} from '../models/Post';


@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor() {
  }
  isStartingDateValid(post: Post, filter): boolean {
    if (filter.includes('starting')) {
      const dateStr = filter.substr(filter.indexOf(' '), filter.length);
      if ((new Date(post.date).getFullYear() > new Date(dateStr).getFullYear())) {
        return true;
      } else if ((new Date(post.date).getFullYear() === new Date(dateStr).getFullYear())) {
        if ((new Date(post.date).getMonth() > new Date(dateStr).getMonth())) {
          return true;
        } else if ((new Date(post.date).getMonth() === new Date(dateStr).getMonth()) &&
          (new Date(post.date).getDate() >= new Date(dateStr).getDate())) {
          return true;
        }
      }
    }
    return false;
  }

  isEndingDateValid(post: Post, filter): boolean {
    if (filter.includes('ending')) {
      const dateStr = filter.substr(filter.indexOf(' '), filter.length);
      if ((new Date(post.date).getFullYear() < new Date(dateStr).getFullYear())) {
        return true;
      } else if ((new Date(post.date).getFullYear() === new Date(dateStr).getFullYear())) {
        if ((new Date(post.date).getMonth() < new Date(dateStr).getMonth())) {
          return true;
        } else if ((new Date(post.date).getMonth() === new Date(dateStr).getMonth()) &&
          (new Date(post.date).getDate() <= new Date(dateStr).getDate())) {
          return true;
        }
      }
    }
    return false;
  }

  filterPosts(allPosts: Post[], filterAfter: string[]): Post[] {

    const filteredPostsByType = this.filterByType(allPosts, filterAfter);

    const filteredPostsByCity = this.filterByCity(filteredPostsByType, filterAfter);

    const filteredPosts = this.filterByDate(filteredPostsByCity, filterAfter);

    return filteredPosts;
  }

  filterByType(allPosts: Post[], filterAfter: string[]): Post[] {
    let filteredPosts = [];
    let iHadAPool = false;
    for (const post of allPosts) {
      for (const type of filterAfter) {
        if (post.type.includes(type)) {
          iHadAPool = true;
          filteredPosts.push(post);
        }
      }
    }
    if (filterAfter.length === 0 || !iHadAPool) {
      filteredPosts = allPosts;
    }
    return filteredPosts;
  }

  filterByDate(allPosts: Post[], filterAfter: string[]): Post[] {
    let filteredPosts = [];
    let iHadAPool = false;

    for (const post of allPosts) {
      let cont1 = false;
      let cont2 = false;
      let startingFilter;
      let endingFilter;
      for (const filter of filterAfter) {
        if (filter.includes('starting')) {
          iHadAPool = true;
          cont1 = true;
          startingFilter = filter;
        }
        if (filter.includes('ending')) {
          iHadAPool = true;
          cont2 = true;
          endingFilter = filter;
        }
      }
      if (cont1 && cont2) {
        if (this.isStartingDateValid(post, startingFilter) && this.isEndingDateValid(post, endingFilter)) {
          filteredPosts.push(post);
        }
      } else if (cont1) {
        if (this.isStartingDateValid(post, startingFilter)) {
          filteredPosts.push(post);
        }
      } else if (cont2) {
        if (this.isEndingDateValid(post, endingFilter)) {
          filteredPosts.push(post);
        }
      }
    }
    if (!iHadAPool) {
      filteredPosts = allPosts;
    }

    return filteredPosts;
  }

  filterByCity(allPosts: Post[], filterAfter: string[]): Post[] {
    let filteredPosts = [];
    let iHadAPool = false;

    for (const post of allPosts) {
      for (const city of filterAfter) {
        if (city.includes('city') && post.city === city.substr(5)) {
          iHadAPool = true;
          filteredPosts.push(post);
        }
      }
    }
    if (!iHadAPool) {
      filteredPosts = allPosts;
    }

    return filteredPosts;
  }
}
