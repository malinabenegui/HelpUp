export class UserDetails {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  profilepic: any;
  city: string;
  education: string;
  job: string;
  gender: string;
  description: string;
  birthday: Date;
  phonenumber: string;
  user_type: string;


  constructor(username: string, firstname: string, lastname: string, profilepic: any,
              city: string, education: string, job: string, gender: string, description: string,
              birthday: Date, phonenumber: string, user_type: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.profilepic = profilepic;
    this.city = city;
    this.education = education;
    this.job = job;
    this.gender = gender;
    this.description = description;
    this.birthday = birthday;
    this.phonenumber = phonenumber;
    this.user_type = user_type;
  }


}
