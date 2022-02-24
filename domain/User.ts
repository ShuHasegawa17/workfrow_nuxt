import { Address } from '~/types/zipAddress'
export default class User {
  constructor(
    public id?: number,
    public userId?: string,
    public name?: string,
    public bornDate?: string,
    public postNumber?: string,
    public address1?: string,
    public address2?: string,
    public address3?: string,
    public address4?: string,
    public email?: string,
    public activeFlag?: boolean,
    public memo?: string
  ) {}

  public setAddress(address: Address) {
    this.postNumber = address.zipcode
    this.address1 = address.address1
    this.address2 = address.address2
    this.address3 = address.address3
  }
}
