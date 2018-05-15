export class  User{
  private userId:number;
  private name:string;
  private password:string;
  private sex:string;
  private picturePath:string;
  private phone:string;
  private address:string;

  constructor(){}


  get _phone(): String {
    return this.phone;
  }
  get _userId():number{
    return this.userId;
  }
}
