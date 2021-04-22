import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';


export default class Controller{
  constructor(){
    this.form = document.querySelector('.modal-form');
    this.modal = document.querySelector('.modal');
    this.priglos = document.querySelector('.priglos__title')
  }

  async controlLogin(user){
    try{
      await model.signIn(user);
      window.history.pushState(null, '', `/#me`);
      const addClass = function() {
        document.body.style.overflow = 'visible';
        document.querySelector('.modal').classList.add('hidden');
        setTimeout(()=> {
          document.querySelector('.modal').style.display = 'none';
        }, 1000)
        document.querySelector('.priglos__title').textContent = model.state.user.options;
      }
      addClass()
    } catch (err) {
      throw err;   
    }
  }



  handlerForm(callback) {
    this.form.addEventListener('submit', function(e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)] 
      const data = Object.fromEntries(dataArr)
      callback(data)
    })
  }
}
