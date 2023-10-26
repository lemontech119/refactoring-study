import { Doctor } from './Doctor';

export class DoctorForView extends Doctor{
  private _isView: boolean;

  constructor(data) {
    super(data)
    this._isView = data.isView;
  }

  get isView(){
    return this._isView;
  }

  public checkView() {
    return this._isView = !this._isView
  }
}