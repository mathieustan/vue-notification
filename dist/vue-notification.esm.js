import Vue from 'vue';

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); }
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) { continue; }
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

var positionable = {
  props: {
    absolute: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    }
  }
};

var toggleable = {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      isActive: false
    };
  },
  watch: {
    value: {
      handler: function handler(val) {
        this.isActive = val;
      },
      immediate: true
    },
    isActive: function isActive(val) {
      val !== this.value && this.$emit('input', val);
    }
  }
};

function isCssColor(color) {
  return Boolean(color) && Boolean(color.match(/^(#|(rgb|hsl)a?\()/));
}

var colorable = {
  props: {
    color: {
      type: String
    }
  },
  methods: {
    setBackgroundColor: function setBackgroundColor(color) {
      if (!isCssColor(color)) { return; }
      return {
        'background-color': "".concat(color),
        'border-color': "".concat(color)
      };
    },
    setTextColor: function setTextColor(color) {
      if (!isCssColor(color)) { return; }
      return {
        'color': "".concat(color)
      };
    }
  }
};

var ICONS = {
  /* eslint-disable */
  check: {
    path: 'M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z',
    viewBox: '0 0 512 512'
  },
  info: {
    path: 'M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z',
    viewBox: '0 0 192 512'
  },
  exclamation: {
    path: 'M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z',
    viewBox: '0 0 192 512'
  },
  exclamationTriangle: {
    path: 'M248.747 204.705l6.588 112c.373 6.343 5.626 11.295 11.979 11.295h41.37a12 12 0 0 0 11.979-11.295l6.588-112c.405-6.893-5.075-12.705-11.979-12.705h-54.547c-6.903 0-12.383 5.812-11.978 12.705zM330 384c0 23.196-18.804 42-42 42s-42-18.804-42-42 18.804-42 42-42 42 18.804 42 42zm-.423-360.015c-18.433-31.951-64.687-32.009-83.154 0L6.477 440.013C-11.945 471.946 11.118 512 48.054 512H527.94c36.865 0 60.035-39.993 41.577-71.987L329.577 23.985zM53.191 455.002L282.803 57.008c2.309-4.002 8.085-4.002 10.394 0l229.612 397.993c2.308 4-.579 8.998-5.197 8.998H58.388c-4.617.001-7.504-4.997-5.197-8.997z',
    viewBox: '0 0 576 512'
  },
  close: {
    path: 'M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z',
    viewBox: '0 0 320 512'
  },
  wifiSlash: {
    path: 'M36 3.51C29.1-2.01 19.03-.9 13.51 6l-10 12.49C-2.02 25.39-.9 35.46 6 40.98l598 467.51c6.9 5.52 16.96 4.4 22.49-2.49l10-12.49c5.53-6.9 4.41-16.97-2.49-22.49L36 3.51zm467.18 304.31c1.77-.6 3.67-.83 5.05-2.29l16.46-17.37c4.62-4.87 4.38-12.64-.58-17.15-47.67-43.38-105.71-68.61-165.55-76.26l144.62 113.07zm100.09-118.96c4.8 4.39 12.29 4.13 16.81-.54l16.6-17.19c4.65-4.81 4.37-12.43-.57-16.95C509.51 38.38 333.7 5.4 178.62 54.08l46.71 36.52c130.7-29.93 273.12 2.51 377.94 98.26zM3.89 154.18c-4.94 4.52-5.22 12.14-.57 16.95l16.6 17.19c4.52 4.68 12.01 4.93 16.81.54 12.72-11.62 26.16-21.97 39.9-31.74L37.34 126.4c-11.47 8.69-22.66 17.91-33.45 27.78zm112 116.83c-4.96 4.52-5.2 12.28-.58 17.15l16.46 17.37c4.46 4.71 11.81 4.95 16.62.6 19.7-17.81 41.53-31.84 64.54-42.46l-41.51-32.45c-19.55 11.03-38.28 24.09-55.53 39.79zM240 400c0 44.18 35.82 80 80 80 41.03 0 74.45-31 79.07-70.79l-107.24-83.84C261.6 336.79 240 365.77 240 400zm80-32c17.64 0 32 14.36 32 32s-14.36 32-32 32-32-14.36-32-32 14.36-32 32-32z',
    viewBox: '0 0 640 512'
  }
  /* eslint-enable */

};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) { keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } return keys; }

function _objectSpread(target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i] != null ? arguments$1[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Z_INDEX_LIST = {
  notification: 1003
};
var NOTIFICATION_POSITIONS = ['top', 'bottom', 'left', 'right'];
var NOTIFICATION_TYPES = ['success', 'warning', 'info', 'error', 'offline'];
var NOTIFICATION_ICONS = {
  success: _objectSpread({}, ICONS.check, {
    height: 16
  }),
  info: _objectSpread({}, ICONS.info, {
    height: 14
  }),
  warning: _objectSpread({}, ICONS.exclamation, {
    height: 14
  }),
  error: _objectSpread({}, ICONS.exclamationTriangle, {
    height: 16
  }),
  offline: _objectSpread({}, ICONS.wifiSlash, {
    height: 14
  }),
  close: _objectSpread({}, ICONS.close)
};

var script = {
  name: 'NotificationItem',
  mixins: [positionable, toggleable, colorable],
  props: {
    // Can be : success / info / warning / error
    type: {
      type: String
    },
    hideIcon: {
      type: Boolean,
      default: false
    },
    // Text to show on notification
    message: {
      type: String,
      default: String
    },
    // A position name like (top-left) only used to categorize notification emplacement
    position: {
      type: String,
      default: String
    },
    // Makes the notification higher (mobile)
    multiLine: {
      type: Boolean,
      default: false
    },
    // Makes the notification full width like in mobile
    fullWidth: {
      type: Boolean,
      default: false
    },
    // Offset to show notification
    verticalOffset: {
      type: Number,
      default: 16
    },
    // Delay before closing notification
    closeDelay: {
      type: Number,
      default: 4500
    },
    // Action button
    actionText: {
      type: String,
      default: undefined
    },
    onActionClick: {
      type: Function,
      default: undefined
    },
    // show a close button
    showClose: {
      type: Boolean,
      default: false
    },
    // zindex
    zIndex: {
      type: Number,
      default: Z_INDEX_LIST.notification
    }
  },
  data: function data() {
    return {
      NOTIFICATION_ICONS: NOTIFICATION_ICONS,
      activeTimeout: -1
    };
  },
  computed: {
    classes: function classes() {
      return {
        'notification--active': this.isActive,
        'notification--multi-line': this.multiLine,
        'notification--absolute': this.absolute,
        'notification--bottom': this.bottom || !this.top,
        'notification--left': this.left,
        'notification--right': this.right,
        'notification--top': this.top,
        'notification--full-width': this.fullWidth
      };
    },
    verticalProperty: function verticalProperty() {
      return /^top/.test(this.position) ? 'top' : 'bottom';
    },
    positionStyle: function positionStyle() {
      return defineProperty({
        zIndex: this.zIndex
      }, this.verticalProperty, "".concat(this.verticalOffset, "px"));
    },
    iconType: function iconType() {
      return this.type && NOTIFICATION_ICONS[this.type];
    }
  },
  watch: {
    isActive: {
      handler: function () {
        var _handler = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee() {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return this.$nextTick();

                case 2:
                  this.setTimeout();

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function handler() {
          return _handler.apply(this, arguments);
        }

        return handler;
      }(),
      immediate: true
    }
  },
  methods: {
    setTimeout: function (_setTimeout) {
      function setTimeout() {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function () {
      var _this = this;

      clearTimeout(this.activeTimeout);
      if (!this.isActive || !this.closeDelay) { return; }
      this.activeTimeout = setTimeout(function () {
        _this.isActive = false;
      }, this.closeDelay);
    }),
    destroyElement: function destroyElement() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close: function close() {
      this.isActive = false;
    }
  }
};

/* script */
            var __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"notification-transition"},on:{"after-leave":_vm.destroyElement}},[_c('div',_vm._g({directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],ref:"notification",staticClass:"notification",class:[this.type && ("notification--" + (this.type)), this.classes],style:(_vm.positionStyle)},_vm.$listeners),[_c('div',{staticClass:"notification__wrapper"},[_c('div',{staticClass:"notification__content"},[_c('span',{staticClass:"notification__message"},[(Boolean(_vm.iconType) && !_vm.hideIcon)?_c('span',{staticClass:"notification__icon"},[_c('svg',{attrs:{"viewBox":_vm.iconType.viewBox,"width":_vm.iconType.width,"height":_vm.iconType.height,"role":"img","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"fill":"currentColor","d":_vm.iconType.path}})])]):_vm._e(),_vm._v(" "),_c('p',{staticClass:"notification__text"},[_vm._v(_vm._s(_vm.message)+" ")])]),_vm._v(" "),(_vm.actionText)?_c('button',{staticClass:"notification__action",attrs:{"type":"button"},on:{"click":_vm.onActionClick}},[_vm._v("\n          "+_vm._s(_vm.actionText)+"\n        ")]):_vm._e(),_vm._v(" "),(_vm.showClose)?_c('button',{staticClass:"notification__close",attrs:{"type":"button"},on:{"click":_vm.close}},[_c('svg',{attrs:{"viewBox":_vm.NOTIFICATION_ICONS.close.viewBox,"role":"img","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"fill":"currentColor","d":_vm.NOTIFICATION_ICONS.close.path}})])]):_vm._e()])])])])};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-6992dfd9_0", { source: "*,::after,::before{box-sizing:border-box}", map: undefined, media: undefined })
,inject("data-v-6992dfd9_1", { source: ".notification[data-v-6992dfd9]{position:fixed;display:flex;align-items:center;left:0;right:0;font-size:14px;color:#fff;pointer-events:none;transition:all .4s cubic-bezier(.25,.8,.5,1);transition-property:transform,top,bottom,opacity}.notification--absolute[data-v-6992dfd9]{position:absolute}.notification--top[data-v-6992dfd9]{top:0}.notification--bottom[data-v-6992dfd9]{bottom:0}@media only screen and (min-width:480px){.notification--left[data-v-6992dfd9]:not(.notification--full-width),.notification--right[data-v-6992dfd9]:not(.notification--full-width){margin:0 24px}.notification--left:not(.notification--full-width).notification--top[data-v-6992dfd9],.notification--right:not(.notification--full-width).notification--top[data-v-6992dfd9]{transform:translateY(24px)}.notification--left:not(.notification--full-width).notification--bottom[data-v-6992dfd9],.notification--right:not(.notification--full-width).notification--bottom[data-v-6992dfd9]{transform:translateY(-24px)}}.notification__wrapper[data-v-6992dfd9]{position:relative;display:flex;align-items:center;width:100%;background-color:#000;pointer-events:auto;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.notification--success .notification__wrapper[data-v-6992dfd9]{background-color:#4f88ff}.notification--info .notification__wrapper[data-v-6992dfd9]{background-color:#5d6a89}.notification--warning .notification__wrapper[data-v-6992dfd9]{background-color:#f8a623}.notification--error .notification__wrapper[data-v-6992dfd9]{background-color:#ff4577}.notification--offline .notification__wrapper[data-v-6992dfd9]{background-color:#ff4577}@media only screen and (min-width:480px){.notification__wrapper[data-v-6992dfd9]{width:auto;max-width:568px;min-width:288px;margin:0 auto;border-radius:4px}.notification--left .notification__wrapper[data-v-6992dfd9]{margin-left:0}.notification--right .notification__wrapper[data-v-6992dfd9]{margin-right:0}.notification--full-width .notification__wrapper[data-v-6992dfd9]{width:100%;max-width:100%;border-radius:0}}.notification__content[data-v-6992dfd9]{position:relative;display:flex;align-items:center;justify-content:space-between;width:100%;min-height:48px;padding:8px 24px;overflow:hidden}.notification--multi-line .notification__content[data-v-6992dfd9]{min-height:80px;padding:16px 24px}.notification__message[data-v-6992dfd9]{position:relative;display:flex;align-items:center;flex-grow:1}.notification__message p[data-v-6992dfd9]{font-stretch:normal;letter-spacing:.23px;line-height:inherit;font-weight:400;margin:0}.notification__close svg[data-v-6992dfd9]{position:relative;height:20px;width:20px}.notification button[data-v-6992dfd9]{border:none;margin:0;padding:0;width:auto;overflow:visible;background:0 0;color:inherit;font:inherit;line-height:normal;-webkit-font-smoothing:inherit;-moz-osx-font-smoothing:inherit;-webkit-appearance:none;position:relative;display:inline-flex;flex:0 0 auto;align-items:center;justify-content:center;border-radius:4px;cursor:pointer;padding:8px;margin:0 0 0 16px;height:auto;color:#fff;font-size:14px;font-weight:500;outline:0;text-decoration:none;transition:.3s cubic-bezier(.25,.8,.5,1),color 1ms;user-select:none}.notification button[data-v-6992dfd9]:active,.notification button[data-v-6992dfd9]:focus{outline:0;box-shadow:0}.notification button[data-v-6992dfd9]:hover{background-color:rgba(0,0,0,.1)}.notification button[data-v-6992dfd9]:first-of-type{margin:0 0 0 24px}.notification button.notification__close[data-v-6992dfd9]{border-radius:50%}.notification button.notification__action[data-v-6992dfd9]{background-color:rgba(0,0,0,.1)}.notification button.notification__action[data-v-6992dfd9]:hover{background-color:rgba(0,0,0,.3)}.notification__icon[data-v-6992dfd9]{display:flex;justify-content:center;align-items:center;border-radius:4px;width:26px;min-width:26px;height:26px;min-height:26px;margin-right:16px}.notification--success .notification__icon[data-v-6992dfd9]{background-color:#1c66ff}.notification--info .notification__icon[data-v-6992dfd9]{background-color:#535e7a}.notification--warning .notification__icon[data-v-6992dfd9]{background-color:#e18d07}.notification--error .notification__icon[data-v-6992dfd9]{background-color:#ff1252}.notification--offline .notification__icon[data-v-6992dfd9]{background-color:#ff1252}.notification__icon svg[data-v-6992dfd9]{position:relative;width:auto}.notification-transition-enter-active[data-v-6992dfd9],.notification-transition-leave-active[data-v-6992dfd9]{transition:transform .4s cubic-bezier(.25,.8,.5,1)}.notification-transition-enter-active .notification__content[data-v-6992dfd9],.notification-transition-leave-active .notification__content[data-v-6992dfd9]{transition:opacity .3s linear .1s}.notification-transition-enter .notification__content[data-v-6992dfd9]{opacity:0}.notification-transition-enter-to .notification__content[data-v-6992dfd9],.notification-transition-leave .notification__content[data-v-6992dfd9]{opacity:1}.notification-transition-enter.notification.notification--top[data-v-6992dfd9],.notification-transition-leave-to.notification.notification--top[data-v-6992dfd9]{transform:translateY(calc(-100% - 8px))}@media only screen and (min-width:480px){.notification-transition-enter.notification.notification--top.notification--right[data-v-6992dfd9]:not(.notification--full-width),.notification-transition-leave-to.notification.notification--top.notification--right[data-v-6992dfd9]:not(.notification--full-width){transform:translateY(24px) translateX(calc(100% + 8px))}.notification-transition-enter.notification.notification--top.notification--left[data-v-6992dfd9]:not(.notification--full-width),.notification-transition-leave-to.notification.notification--top.notification--left[data-v-6992dfd9]:not(.notification--full-width){transform:translateY(24px) translateX(calc(-100% - 8px))}}.notification-transition-enter.notification.notification--bottom[data-v-6992dfd9],.notification-transition-leave-to.notification.notification--bottom[data-v-6992dfd9]{transform:translateY(100%)}@media only screen and (min-width:480px){.notification-transition-enter.notification.notification--bottom.notification--right[data-v-6992dfd9]:not(.notification--full-width),.notification-transition-leave-to.notification.notification--bottom.notification--right[data-v-6992dfd9]:not(.notification--full-width){transform:translateY(-24px) translateX(calc(100% + 8px))}.notification-transition-enter.notification.notification--bottom.notification--left[data-v-6992dfd9]:not(.notification--full-width),.notification-transition-leave-to.notification.notification--bottom.notification--left[data-v-6992dfd9]:not(.notification--full-width){transform:translateY(-24px) translateX(calc(-100% - 8px))}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-6992dfd9";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    var component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "NotificationItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) { component.functional = true; }
    }

    component._scopeId = scope;

    {
      var hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          var originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    var isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) { return } // SSR styles are present.

      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        var code = css.source;
        var index = style.ids.length;

        style.ids.push(id);

        if ( css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          var el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) { el.setAttribute('media', css.media); }
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          var textNode = document.createTextNode(code);
          var nodes = style.element.childNodes;
          if (nodes[index]) { style.element.removeChild(nodes[index]); }
          if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }
          else { style.element.appendChild(textNode); }
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var NotificationItem = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    __vue_create_injector__);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) { keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } return keys; }

function _objectSpread$1(target) {
var arguments$1 = arguments;
 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i] != null ? arguments$1[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var NotificationConstructor = Vue.extend(NotificationItem);
var instance;
var instances = [];
var seed = 1;

var Notification = function Notification() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = Notification.options || {};
  var mergedParams = mergeOptionsWithParams(options, params);
  var id = 'notification_' + seed++;
  var positions = getPositionsFromOptions(mergedParams);
  var positionName = setPositionName(positions);
  instance = new NotificationConstructor({
    propsData: _objectSpread$1({}, mergedParams, {
      value: false,
      // required prop
      position: positionName,
      verticalOffset: getVerticalOffset(instances, positionName, mergedParams)
    }),
    mounted: function mounted() {
      this.$on('input', function (value) {
        if (value) { return; }
        Notification.close(id);
      });
    }
  });
  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.value = true;
  instance.$nextTick(function () {
    instance.dom = instance.$el;
  });
  instances.push(instance);
  return instance;
};

NOTIFICATION_TYPES.forEach(function (type) {
  Notification[type] = function (params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    params.type = type;
    return Notification(params);
  };
});

Notification.close = function (id) {
  var instancesLength = instances.length;
  var instance = instances.find(function (instance) {
    return instance.id === id;
  });
  if (!instance) { return; }
  var instanceIndex = instances.findIndex(function (instance) {
    return instance.id === id;
  });
  instances.splice(instanceIndex, 1);
  if (instancesLength <= 1) { return; }
  var position = instance.position;
  var removedHeight = instance.dom.offsetHeight; // Update notifications position after current closed notification

  for (var i = instanceIndex; i < instancesLength - 1; i++) {
    if (instances[i].position !== position) { return; }
    instances[i].dom.style[instance.verticalProperty] = "".concat(parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16, "px");
  }
};

Notification.closeAll = function () {
  for (var i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
}; // -----------------------------------------
// Helpers
// - getPositionsFromOptions : pick top, left, bottom, right from params
// - setPositionName : Generate a position string (like top-left)
// - getVerticalOffset : Should return verticial offset from previous instance with same position
// - getVerticalProperty : Return vertical property to update for position
// -----------------------------------------


function getPositionsFromOptions(params) {
  return Object.assign.apply(Object, [{}].concat(toConsumableArray(NOTIFICATION_POSITIONS.map(function (key) {
    return defineProperty({}, key, params[key]);
  }))));
}

function setPositionName(positions) {
  return Object.keys(positions).filter(function (key) {
    return positions[key];
  }).join('-');
}

function getVerticalOffset(instances, position, _ref2) {
  var _ref2$offset = _ref2.offset,
      offset = _ref2$offset === void 0 ? 0 : _ref2$offset;
  return instances.filter(function (item) {
    return item.position === position;
  }).reduce(function (offset, item) {
    offset += item.$el.offsetHeight + 16;
    return offset;
  }, offset);
}

function mergeOptionsWithParams(options, params) {
  var paramsToMerge = typeof params === 'string' ? {
    message: params
  } : params;
  if (!options.breakpoints) { return paramsToMerge; }
  var windowWidth = window.innerWidth;
  var match = -1;
  Object.keys(options.breakpoints).forEach(function (breakpoint) {
    if (breakpoint <= windowWidth && breakpoint > match) {
      match = Number(breakpoint);
    }
  });
  if (match === -1) { return paramsToMerge; }
  return Object.assign({}, options.breakpoints[match], paramsToMerge);
}

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Notification.options = opts;
  Vue.prototype.$notify = Notification;
}; // Plugin


var plugin = {
  // eslint-disable-next-line no-undef
  version: "0.1.2",
  install: install
};

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
