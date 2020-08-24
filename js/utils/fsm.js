export default class FSM {
  constructor(args) {
    this.current = args.init || 'none';
    this.transitions = {};
    this.stage = 'none';
    this.callbacks = {}
    buildStates.bind(this, args.transitions, args.callbacks)()
  }

  is(state) {
    return this.current === state;
  }

  can(t, getTo) {
    const transition = this.transitions[t]
    const to = transition.options[this.current] || null
    if (getTo)
      return [ Boolean(to), to ]
    else 
      return Boolean(to)
  }
}

function buildStates (transitions, callbacks) {
  for(const trans of transitions) {
    let name = trans.name;
    
    this[name] = this[name]
      ? this[name] 
      : createTransition.bind(this, name)()
    
    this.transitions[name] = this.transitions[name] 
      ? this.transitions[name] 
      : { options: {} }
    
    createOptions.bind(this, this.transitions[name].options, trans)()
  }

  for(const [name, callback] of Object.entries(callbacks)) {
    this[name] = callback
  }
}

function runCallback(callback, ...params) {
  if (callback)
    return callback.bind(this, ...params)()
}

function createTransition(name) {
  let can, to, from, args
  
  const transition = (params) => {
    if (this.stage === 'none') {
      [can, to] = this.can(name, true)
      from = this.current
      args = {name, from, to, ...params}
  
      if (!can) 
        return false
          
      const beforeEnter = runCallback.bind(this,this['onbefore' + name], args)();
      // const enter = runCallback(this['onenter' + to], )
      const afterLeave = runCallback.bind(this,this['onleave' + from], args)();
  
      if (beforeEnter == false || afterLeave == false)
        return false;

      this.stage = name + "DidLeave"

      transition.bind(this, params)();
      return true;
    }
    else if (this.stage === name + "DidLeave") {
      this.current = to;

      const onEnter = runCallback.bind(this, this['onenter' + to] || this['on' + to], args)();

      if (onEnter == false)
        return false;

      this.stage = name + "didEnter"

      transition.bind(this, params)();
      return true;
    }
    else if (this.stage === name + "didEnter") {
      runCallback.bind(this, this['onafter' + name] || this['on' + name], args)();
      runCallback.bind(this, this['onstatechange'], args)();
      this.stage = 'none'
    }
  }
  return transition;
}

function createOptions(options, transition) {
  if (typeof transition.from === "string") {
    options[transition.from] = transition.to
  } else {
    for (from of transition.from) {
      options[from] = transition.to
    }
  }
}
