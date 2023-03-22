export class User {
  constructor(
    public readonly email: string,
    public readonly groups: string[]
  ) {}

  public isCustomer() {
    return this.groups.indexOf('Customer') >= 0;
  }

  public isFleetManager() {
    return this.groups.indexOf('FleetManager') >= 0;
  }
}
