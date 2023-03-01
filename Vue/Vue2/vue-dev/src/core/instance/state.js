/* @flow */

import config from "../config";
import Watcher from "../observer/watcher";
import Dep, { pushTarget, popTarget } from "../observer/dep";
import { isUpdatingChildComponent } from "./lifecycle";

import {
  set,
  del,
  observe,
  defineReactive,
  toggleObserving,
} from "../observer/index";

import {
  warn,
  bind,
  noop, // 空方法 function(){}
  hasOwn,
  hyphenate,
  isReserved,
  handleError,
  nativeWatch,
  validateProp,
  isPlainObject,
  isServerRendering,
  isReservedAttribute,
  invokeWithErrorHandling,
} from "../util/index";

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};

// 通过proxy函数将_data（或者_props等）上面的数据代理到vm上，这样就可以用app.text代替app._data.text了
export function proxy(target: Object, sourceKey: string, key: string) {
  // this.key => this[xx].key
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  // 拦截数据访问
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

/**
 * 初始化props、methods、data、computed与watch
 * 两件事：
 *   数据响应式的入口：分别处理 props、methods、data、computed、watch
 *   优先级：props、methods、data、computed 对象中的属性不能出现重复，优先级和列出顺序一致
 *   其中 computed 中的 key 不能和 props、data 中的 key 重复，methods 不影响
 */
export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  // 处理 props 对象，为 props 对象的每个属性设置响应式，并将其代理到 vm 实例上
  if (opts.props) initProps(vm, opts.props);
  // 处理 methos 对象，校验每个属性的值是否为函数、和 props 属性比对进行判重处理，最后得到 vm[key] = methods[key]
  if (opts.methods) initMethods(vm, opts.methods);
  /**
   * 做了三件事
   *   1、判重处理，data 对象上的属性不能和 props、methods 对象上的属性相同
   *   2、代理 data 对象上的属性到 vm 实例
   *   3、为 data 对象的上数据设置响应式
   */
  if (opts.data) {
    initData(vm);
  } else {
    // 响应式处理 该组件没有data的时候绑定一个空对象
    observe((vm._data = {}), true /* asRootData */);
  }
  /**
   * 三件事：
   *   1、为 computed[key] 创建 watcher 实例，默认是懒执行
   *   2、代理 computed[key] 到 vm 实例
   *   3、判重，computed 中的 key 不能和 data、props 中的属性重复
   *   @param {*} computed = {
   *   key1: function() { return xx },
   *   key2: {
   *     get: function() { return xx },
   *     set: function(val) {}
   *   }
   * }
   */

  if (opts.computed) initComputed(vm, opts.computed);
  /**
   * 三件事：
   *   1、处理 watch 对象
   *   2、为 每个 watch.key 创建 watcher 实例，key 和 watcher 实例可能是 一对多 的关系
   *   3、如果设置了 immediate，则立即执行 回调函数
   * @param {*} watch = {
   *   'key1': function(val, oldVal) {},
   *   'key2': 'this.methodName',
   *   'key3': {
   *     handler: function(val, oldVal) {},
   *     deep: true
   *   },
   *   'key4': [
   *     'this.methodNanme',
   *     function handler1() {},
   *     {
   *       handler: function() {},
   *       immediate: true
   *     }
   *   ],
   *   'key.key5' { ... }
   * }
   */
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }

  /**
   * 其实到这里也能看出，computed 和 watch 在本质是没有区别的，都是通过 watcher 去实现的响应式
   * 非要说有区别，那也只是在使用方式上的区别，简单来说：
   *   1、watch：适用于当数据变化时执行异步或者开销较大的操作时使用，即需要长时间等待的操作可以放在 watch 中
   *   2、computed：其中可以使用异步方法，但是没有任何意义。所以 computed 更适合做一些同步计算
   */
}

// 初始化props，为props对象的每个属性设置响应式，并将其代理到 vm 实例上
function initProps(vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {};
  const props = (vm._props = {});
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  // 缓存 props 的每个 key，性能优化，判重处理
  const keys = (vm.$options._propKeys = []);
  // 根据$parent是否存在来判断当前是否是根结点
  const isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  // 遍历 props 对象
  for (const key in propsOptions) {
    // 缓存 key
    keys.push(key);
    // 验证prop,不存在用默认值替换，类型为bool则声称true或false，当使用default中的默认值的时候会将默认值的副本进行observe
    const value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    // 为 props 的每个 key 是设置数据响应式
    if (process.env.NODE_ENV !== "production") {
      const hyphenatedKey = hyphenate(key);
      if (
        isReservedAttribute(hyphenatedKey) ||
        config.isReservedAttr(hyphenatedKey)
      ) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        );
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
              `overwritten whenever the parent component re-renders. ` +
              `Instead, use a data or computed property based on the prop's ` +
              `value. Prop being mutated: "${key}"`,
            vm
          );
        }
      });
    } else {
      // 对 props 数据做响应式处理
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      // 代理 key 到 vm 对象上 this.property
      // this.key => this[_props].key
      proxy(vm, `_props`, key);
    }
  }
  toggleObserving(true);
}

// 初始化data
function initData(vm: Component) {
  let data = vm.$options.data;
  // 得到 data 数据，如果是个方法就调用
  data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};
  // data 需返回一个 object
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== "production" &&
      warn(
        "data functions should return an object:\n" +
          "https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function",
        vm
      );
  }
  // proxy data on instance
  /**
   * 两件事
   *   1、判重处理，data 对象上的属性不能和 props、methods 对象上的属性相同
   *   2、代理 data 对象上的属性到 vm 实例
   */
  const keys = Object.keys(data);
  const props = vm.$options.props;
  const methods = vm.$options.methods;
  let i = keys.length;
  while (i--) {
    // 判重处理
    const key = keys[i];
    if (process.env.NODE_ENV !== "production") {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== "production" &&
        warn(
          `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
          vm
        );
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key);
    }
  }
  // observe data
  // 为 data 对象上的数据设置响应式
  observe(data, true /* asRootData */);
}

// 获取data数据，当 data 是一个方法的时候，通过call将方法的执行上下文 this 指向 vm
export function getData(data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, `data()`);
    return {};
  } finally {
    popTarget();
  }
}

const computedWatcherOptions = { lazy: true };

/**
 * 三件事：
 *   1、为 computed[key] 创建 watcher 实例，默认是懒执行
 *   2、代理 computed[key] 到 vm 实例
 *   3、判重，computed 中的 key 不能和 data、props 中的属性重复
 */
function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null));
  // computed properties are just getters during SSR
  const isSSR = isServerRendering();

  // 遍历 computed 对象
  for (const key in computed) {
    // 获取 key 对应的值，即 getter 函数
    const userDef = computed[key];
    // 计算属性可能是一个function，也有可能设置了get以及set的对象
    const getter = typeof userDef === "function" ? userDef : userDef.get;
    // getter不存在的时候抛出warning并且给getter赋空函数
    if (process.env.NODE_ENV !== "production" && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      // 为 computed 属性创建 watcher 实例
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        // 配置项，computed 默认是懒执行
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    // 判重处理
    if (!(key in vm)) {
      /*
       * 代理 computed 对象中的属性到 vm 实例
       * 这样就可以使用 vm.computedKey 访问计算属性了
       */
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== "production") {
      // 非生产环境有一个判重处理，computed 对象中的属性不能和 data、props 中的属性相同
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(
          `The computed property "${key}" is already defined as a prop.`,
          vm
        );
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn(
          `The computed property "${key}" is already defined as a method.`,
          vm
        );
      }
    }
  }
}

/**
 * 定义计算属性
 * computed 对象中的 key 到 target（vm）上
 */
export function defineComputed(
  target: any,
  key: string,
  userDef: Object | Function
) {
  const shouldCache = !isServerRendering();
  // 构造属性描述符(get、set)
  if (typeof userDef === "function") {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (
    process.env.NODE_ENV !== "production" &&
    sharedPropertyDefinition.set === noop
  ) {
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      );
    };
  }
  // 拦截对 target.key 的访问和设置
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

/**
 * 创建计算属性的getter
 * @returns 返回一个函数，这个函数在访问 vm.computedProperty 时会被执行，然后返回执行结果
 */
function createComputedGetter(key) {
  // computed 属性值会缓存的原理也是在这里结合 watcher.dirty、watcher.evalaute、watcher.update 实现的
  return function computedGetter() {
    // 得到当前 key 对应的 watcher
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      /**
       * 计算 key 对应的值，通过执行 computed.key 的回调函数来得到
       * watcher.dirty 属性就是大家常说的 computed 计算结果会缓存的原理
       * <template>
       *   <div>{{ computedProperty }}</div>
       *   <div>{{ computedProperty }}</div>
       * </template>
       * 像这种情况下，在页面的一次渲染中，两个 dom 中的 computedProperty 只有第一个会执行 computed.computedProperty 的回调函数计算实际的值，
       * 即执行 watcher.evalaute，而第二个就不走计算过程了，
       * 因为上一次执行 watcher.evalute 时把 watcher.dirty 置为了 false，
       * 待页面更新后，wathcer.update 方法会将 watcher.dirty 重新置为 true，
       * 供下次页面更新时重新计算 computed.key 的结果
       */

      if (watcher.dirty) {
        // 执行 watcher.evaluate 方法
        // 执行conputed.key 的值（方法），得到执行结果，赋值给watcher.value
        // 将watcher.dirty 设置为 false
        // 一次渲染只执行一次 computed 方法，dirty设置为false，后续访问就不会执行computed 方法了
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

// 功能同 createComputedGetter 一样
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

// 初始化方法
function initMethods(vm: Component, methods: Object) {
  const props = vm.$options.props;
  for (const key in methods) {
    if (process.env.NODE_ENV !== "production") {
      // 校验每个属性的值是否为函数
      if (typeof methods[key] !== "function") {
        warn(
          `Method "${key}" has type "${typeof methods[
            key
          ]}" in the component definition. ` +
            `Did you reference the function correctly?`,
          vm
        );
      }
      // 与props名称冲突报出warning
      if (props && hasOwn(props, key)) {
        warn(`Method "${key}" has already been defined as a prop.`, vm);
      }
      // 如果方法存在在vm上，判断属性名不能以 $ or _ 开头
      if (key in vm && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
            `Avoid defining component methods that start with _ or $.`
        );
      }
    }
    // 在为null的时候写上空方法，有值时候将上下文替换成vm
    // 将 methods 中的所有方法赋值到 vue 实例上，支持通过 this.methodKey 的方式
    vm[key] =
      typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
  }
}

// 初始化watchers
function initWatch(vm: Component, watch: Object) {
  // 遍历 watch 对象
  for (const key in watch) {
    const handler = watch[key];
    if (Array.isArray(handler)) {
      // handler 为数组，遍历数组，获取其中的每一项，然后调用 createWatcher
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

/**
 * 创建一个观察者Watcher
 * 两件事：
 *   1、兼容性处理，保证 handler 肯定是一个函数
 *   2、调用 $watch
 * @returns
 */
function createWatcher(
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  // 如果 handler 为对象，则获取其中的 handler 选项的值
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  // 如果 hander 为字符串，则说明是一个 methods 方法，获取 vm[handler]
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}

// 定义Vue.prototype.$data、$props、$set、$delete、$watch
export function stateMixin(Vue: Class<Component>) {
  // data
  const dataDef = {};
  dataDef.get = function () {
    return this._data;
  };

  // props
  const propsDef = {};
  propsDef.get = function () {
    return this._props;
  };
  if (process.env.NODE_ENV !== "production") {
    // 异常提示
    dataDef.set = function () {
      warn(
        "Avoid replacing instance root $data. " +
          "Use nested data properties instead.",
        this
      );
    };
    // 只读
    propsDef.set = function () {
      warn(`$props is readonly.`, this);
    };
  }

  // 将 data 属性和 props 属性挂载到 Vue.prototype 对象上
  // 这样在程序中就可以通过 this.$data 和 this.$props 来访问 data 和 props 对象了
  Object.defineProperty(Vue.prototype, "$data", dataDef);
  Object.defineProperty(Vue.prototype, "$props", propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  /**
   * 创建 watcher，返回 unwatch，共完成如下 5 件事：
   *   1、兼容性处理，保证最后 new Watcher 时的 cb 为函数
   *   2、标示用户 watcher
   *   3、创建 watcher 实例
   *   4、如果设置了 immediate，则立即执行一次 cb
   *   5、返回 unwatch
   * @param {*} expOrFn key
   * @param {*} cb 回调函数
   * @param {*} options 配置项，用户直接调用 this.$watch 时可能会传递一个 配置项
   * @returns 返回 unwatch 函数，用于取消 watch 监听
   */

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this;
    // 兼容性处理，因为用户调用 vm.$watch 时设置的 cb 可能是对象
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    // options.user 表示用户 watcher，还有渲染 watcher，即 updateComponent 方法中实例化的 watcher
    options.user = true;
    // 实例化 watcher 此时的 watcher 因为非 lazy 会立即执行 watcher 的 get 获取值，完成依赖收集 
    const watcher = new Watcher(vm, expOrFn, cb, options);
    // 如果用户设置了 immediate 为 true，则立即执行一次回调函数
    if (options.immediate) {
      const info = `callback for immediate watcher "${watcher.expression}"`;
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    // 返回一个 unwatch 函数，用于解除监听
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
