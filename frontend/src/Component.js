export default class Component{
  constructor(){
    this.getElementToId();
  }

  getElementToId(id){
    let element
    if(id === '') {
      element = window;
    } else {
      element = document.getElementById(id)
    }
    return element;
  }

  static fonAnim(){
    const wrapper = document.querySelector('.wrapper')
    const element = document.createElement('span');


    function toStyle(col) {
      let style = [];
      for(let k = 0 ;k < col ;k++){
        let widthHeight = Math.floor(Math.random() * (10 - 1) + 1);
        let i = Math.floor(Math.random() * 100);
        style.push({
          left:`${i}%`,
          width: `${widthHeight}%`,
          height:` ${widthHeight}%`,
        })
      }
      return style
    }

    function cloneElement(element) {
      let cloneElement = element.cloneNode(true);
      cloneElement.className = 'heartFons'
      return cloneElement
    }
    

    const marup = toStyle(20).map((styles)=> {
      const el = cloneElement(element);
      const secAnim = Math.floor(Math.random()* (40-15)+15);
      const minPlus = secAnim % 2 === 0 ? '-': '';
      el.style.left = styles['left'] 
      el.style.height = styles['height'] 
      el.style.width = styles['width'] 
      el.animate(
        {
          top: ['-10%','100%'],
          transform: ['rotate(0deg)', `rotate(${minPlus}${Math.floor(Math.random()* 360)}deg)`],
          easing:'linear', 
        }, {
        delay: +`${Math.floor(Math.random()* 15)* 1000}`,
        duration: +`${secAnim *1000}`,
        iterations: Infinity
      });

      return el
    })

    marup.forEach(mark =>{
      wrapper.insertAdjacentElement('afterbegin', mark)
    })

    }
  }