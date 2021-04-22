'use strict';

import Timer from './Timer.js'
import Component from './Component.js'
import Listeners from './Listeners.js'
import Controller from './controller.js'
  class App {
  static init() {
      const timer = new Timer()
      timer.startLogOutTimer()

      Component.fonAnim()
      const controller = new Controller()
      controller.handlerForm(controller.controlLogin)
      const navHover = new Listeners('navigation', 'mouseover mouseout', '0.5 1');
      navHover.listenerHeader();
      const navClick = new Listeners('header', 'click');
      navClick.listenerHeader();
      const navScroll = new Listeners('', 'scroll','timer .priglos' ) 
      navScroll.listenerHeader();
  }
}

App.init()