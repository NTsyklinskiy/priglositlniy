export default class Listeners {
  constructor(id, type, param){
    this.id = id;
    this.type = type;
    this.param = param;
  }
  navHover(ob,e){
    if (e.target.classList.contains('navigation__link')) {
      const link = e.target;
      const siblings = link.closest('.navigation__items').querySelectorAll('.navigation__link');
  
      siblings.forEach(el => {
        if (el !== link) {
          el.style.opacity = ob;
        }
      });
    }
  }

  navClick(e){
    e.preventDefault()
    const elAll = document.querySelectorAll('.navigation__link');
    const elRect = [];
    for(const el of elAll){
      const attr = el.getAttribute('href');
      if(attr){
        const rect = document.querySelector(attr).getBoundingClientRect()
        elRect.push([attr, rect])
      }
    }

    elRect.forEach(elR => {
      if(e.target.getAttribute('href') === elR[0] ){
        window.scrollTo({
          left: elR[1].left + window.pageXOffset,
          top: elR[1].top + window.pageYOffset,
          behavior: 'smooth',
        });
      }    
    })
  }

  navScroll(id,param, e){
    const value = window.scrollY;
    const docValue = document.getElementById(id).offsetTop;
    const elHeart = document.querySelector(param);
    if(value > docValue ) elHeart.classList.add('focus'); 
  }

  listenerHeader(){
    const el = document.getElementById(this.id);
    this.type.split(' ').forEach((t) => {
        if(t === 'mouseover'){
          el.addEventListener(t, this.navHover.bind(null, this.param.split(' ')[0]))
        } else if(t === 'mouseout') {
          el.addEventListener(t, this.navHover.bind(null,this.param.split(' ')[1]))
        } else if(t === 'click'){
          el.addEventListener(t, this.navClick.bind(this))
        } else if(t === 'scroll'){
          window.addEventListener(t, this.navScroll.bind(null, this.param.split(' ')[0], this.param.split(' ')[1]))
        }
      })
    }

  }
                                                                                                         