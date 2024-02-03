import { LightningElement,track } from 'lwc';

export default class Trackdemo extends LightningElement {
@track products=['Ponds','Hamam','Nirma','Lux','Colgate'];
@track full={firstName:'Roger',lastName:'Gol D.'};
handleClick(){
 this.products=['Mysore Sandal Soap','Dove','Yardley','Lifebuoy','Pears'];
 this.full={firstName:'Luffy',lastName:'Monkey D.'};
}
handleClicky(){
    this.products.push('Keto');
    this.full.firstName='Robin';
    this.full.lastName='Nico';
   }
}