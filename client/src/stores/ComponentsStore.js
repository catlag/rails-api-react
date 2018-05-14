
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import BaseStore from './BaseStore';

const CHANGE_EVENT = 'change';

var CachedComponents = {};

class ComponentsStoreClass extends EventEmitter {
  getComponents(opts={}) {
    return new Promise(function(fulfill, reject) {
      if (Object.keys(CachedComponents).length === 0 && CachedComponents.constructor === Object) {
        return BaseStore.fetch(`api/all_from_category?q=${opts.type}`, opts)
          .then(components => {
            CachedComponents['components'] = components
            fulfill(CachedComponents['components'])
          }
        )
      } else {
        fulfill(CachedComponents['components'])
      }
    }.bind(this))
  }


  cachedComponents() {
    return CachedComponents['components'];
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
}

const ComponentsStore = new ComponentsStoreClass();

export default ComponentsStore;
