export class User {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id || -1;
    this._name = name || 'unknown';
  }

  get id(){
    return this._id
  }

  get name() {
    return this._name
  }

  set name(name: string) {
    this._name = name;
  }
}
