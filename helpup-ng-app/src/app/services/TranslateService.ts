import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor() {
  }

  translateImage(image: any): any {
    return 'data:image/jpeg;base64,' + image;
  }

  translateTime(date: Date): any {
    const yearsAndMonths = date.toString().substring(0, 8);
    const day = date.toString().substring(8, 10);
    return yearsAndMonths + (Number(day) + 1);
  }
}
