export interface IProject {
  names: string[];
  description: string;
  urls: {
    home: string;
    docs: string;
  }[];
  img: string;
  ready: boolean;
}

export interface IData {
  prop: string;
  index: number;
  toggle: 'modal';
  target: '.modal';
}
