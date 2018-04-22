export class  User{
  private userId:number;
  private name:String;
  private password:String;
  private sex:String;
  private phone:String;
  private address:String;

  constructor(){}


  get _phone(): String {
    return this.phone;
  }
}
