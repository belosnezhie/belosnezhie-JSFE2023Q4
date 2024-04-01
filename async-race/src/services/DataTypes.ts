export interface GarageCars {
  garageCars: GarageCar[];
}

export interface GarageCar {
  name: string;
  color: string;
  id: number;
}

export interface CarsTypes {
  carTypes: CarType[];
}

export interface CarType {
  name: string;
  models: string[];
}

export interface TrafficParam {
  velocity: number;
  distance: number;
}

export interface Winners {
  winners: Winner[];
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface CreateCarData {
  name: string;
  color: string;
}
