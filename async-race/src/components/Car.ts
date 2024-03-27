// import { carSVG } from '../assets/car.svg';
// import carSVG from '../../public/smallCar.svg';

import { BaseComponent } from './Component';

export class Car extends BaseComponent {
  constructor(carColor: string) {
    // const sprite = new BaseComponent({
    //   tag: 'use',
    //   className: '',
    // });

    // sprite.setAttribute('xlink:href', `${carSVG}#volkswagen`);
    // sprite.setAttribute('xlink:href', '#volkswagen');

    // const sprite = document.createElementNS(
    //   'http://www.w3.org/2000/svg',
    //   'svg',
    // );

    // sprite.classList.add('car_svg');
    // sprite.setAttribute('width', '80');
    // sprite.setAttribute('height', '40');
    // sprite.setAttribute('fill', carColor);
    // const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    // use.setAttributeNS(
    //   'http://www.w3.org/1999/xlink',
    //   'xlink:href',
    //   './assets/smallCar.svg#car',
    // );
    // sprite.append(use);

    const template = `<svg class="car_svg" fill="${carColor}" width="80" height="40" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve">
      <g class="layer">
       <title>Layer 1</title>
       <g id="SVGRepo_bgCarrier" stroke-width="0"/>
       <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
       <g id="SVGRepo_iconCarrier">
        <g id="svg_1">
         <path d="m1.7,27.79l2.2,0c0.55,-3.32 1.52,-7.85 3.05,-10.26c7.2,-11.26 16.23,-17.3 27.58,-17.3c7.36,0 12.14,0.87 14.65,2.65c0.33,0.24 1.34,0.95 4.02,7.45c3.91,0.08 14.27,0.93 19.23,7.69c2.5,3.39 3.49,7.03 3.86,9.76l1.03,0c0.92,0 1.67,0.9 1.67,2c0,1.1 -0.75,2 -1.67,2l-0.83,0c0,0.11 -0.02,0.19 -0.02,0.21c-0.09,1.01 -0.81,1.79 -1.65,1.79l-2.09,0c-1.27,3.54 -4.22,6.02 -7.6,6.02s-6.32,-2.48 -7.62,-6.02l-31.71,0c-1.27,3.54 -4.22,6.02 -7.6,6.02c-3.4,0 -6.32,-2.48 -7.6,-6.02l-5.6,0c-0.02,0 -0.02,0 -0.02,0c-0.92,0 -1.67,-0.9 -1.67,-2l-1.62,0c-0.92,0 -1.67,-0.9 -1.67,-2c0,-1.11 0.75,-2 1.65,-2l0.02,0.01l0.01,0zm63.46,8.02c2.74,0 4.98,-2.69 4.98,-6.02c0,-3.32 -2.24,-6.02 -4.98,-6.02c-2.74,0 -4.98,2.7 -4.98,6.02c0,3.32 2.24,6.02 4.98,6.02zm-29.47,-23.32c0,0.56 0.37,1 0.83,1l12.91,0c0.29,0 0.55,-0.18 0.7,-0.47c0.15,-0.29 0.18,-0.66 0.04,-0.97c-0.61,-1.51 -1.71,-4.13 -2.24,-4.67c-1.76,-1.35 -5.29,-1.99 -10.56,-1.99c-0.29,0 -0.57,0 -0.86,0.01c-0.44,0.01 -0.81,0.46 -0.81,1l0,6.09l0,0l-0.02,0l0.01,0zm-1.67,0l0,-5.8c0,-0.29 -0.11,-0.56 -0.29,-0.75c-0.18,-0.19 -0.42,-0.29 -0.66,-0.24c-5.84,0.83 -10.34,3.16 -12.03,6.24c-0.18,0.31 -0.18,0.7 -0.04,1.02c0.13,0.32 0.42,0.53 0.72,0.53l11.44,0c0.46,0 0.83,-0.44 0.83,-1l0.02,-0.01l0.01,0.01zm-15.79,23.32c2.74,0 4.98,-2.69 4.98,-6.02c0,-3.32 -2.24,-6.02 -4.98,-6.02c-2.74,0 -4.98,2.7 -4.98,6.02c0,3.32 2.24,6.02 4.98,6.02z" id="svg_2"/>
        </g>
       </g>
      </g>
     </svg>`;

    super({ tag: 'div', className: 'car' });
    const carElement = this.getElement();

    carElement.innerHTML = template;

    // carElement.append(sprite);
  }
}
