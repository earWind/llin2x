!function(e){function n(n){for(var t,o,c=n[0],a=n[1],i=n[2],d=0,l=[];d<c.length;d++)o=c[d],Object.prototype.hasOwnProperty.call(H,o)&&H[o]&&l.push(H[o][0]),H[o]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t]);for(U&&U(n);l.length;)l.shift()();return I.push.apply(I,i||[]),r()}function r(){for(var e,n=0;n<I.length;n++){for(var r=I[n],t=!0,o=1;o<r.length;o++){var c=r[o];0!==H[c]&&(t=!1)}t&&(I.splice(n--,1),e=C(C.s=r[0]))}return e}var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,n){if(!O[e]||!A[e])return;for(var r in A[e]=!1,n)Object.prototype.hasOwnProperty.call(n,r)&&(y[r]=n[r]);0==--w&&0===m&&D()}(e,n),t&&t(e,n)};var o,c=!0,a="aef3d2040f6f9b02b82e",i={},d=[],l=[];function s(n){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:o!==n,active:!0,accept:function(e,n){if(void 0===e)r._selfAccepted=!0;else if("function"==typeof e)r._selfAccepted=e;else if("object"==typeof e)for(var t=0;t<e.length;t++)r._acceptedDependencies[e[t]]=n||function(){};else r._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("object"==typeof e)for(var n=0;n<e.length;n++)r._declinedDependencies[e[n]]=!0;else r._declinedDependencies[e]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=r._disposeHandlers.indexOf(e);n>=0&&r._disposeHandlers.splice(n,1)},invalidate:function(){switch(this._selfInvalidated=!0,u){case"idle":(y={})[n]=e[n],p("ready");break;case"ready":x(n);break;case"prepare":case"check":case"dispose":case"apply":(b=b||[]).push(n)}},check:_,apply:k,status:function(e){if(!e)return u;f.push(e)},addStatusHandler:function(e){f.push(e)},removeStatusHandler:function(e){var n=f.indexOf(e);n>=0&&f.splice(n,1)},data:i[n]};return o=void 0,r}var f=[],u="idle";function p(e){u=e;for(var n=0;n<f.length;n++)f[n].call(null,e)}var h,y,v,b,w=0,m=0,g={},A={},O={};function E(e){return+e+""===e?+e:e}function _(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return c=e,p("check"),(n=1e4,n=n||1e4,new Promise((function(e,r){if("undefined"==typeof XMLHttpRequest)return r(new Error("No browser support"));try{var t=new XMLHttpRequest,o=C.p+""+a+".hot-update.json";t.open("GET",o,!0),t.timeout=n,t.send(null)}catch(e){return r(e)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)r(new Error("Manifest request to "+o+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)r(new Error("Manifest request to "+o+" failed."));else{try{var n=JSON.parse(t.responseText)}catch(e){return void r(e)}e(n)}}}))).then((function(e){if(!e)return p(P()?"ready":"idle"),null;A={},g={},O=e.c,v=e.h,p("prepare");var n=new Promise((function(e,n){h={resolve:e,reject:n}}));for(var r in y={},H)j(r);return"prepare"===u&&0===m&&0===w&&D(),n}));var n}function j(e){O[e]?(A[e]=!0,w++,function(e){var n=document.createElement("script");n.charset="utf-8",n.src=C.p+""+e+"."+a+".hot-update.js",document.head.appendChild(n)}(e)):g[e]=!0}function D(){p("ready");var e=h;if(h=null,e)if(c)Promise.resolve().then((function(){return k(c)})).then((function(n){e.resolve(n)}),(function(n){e.reject(n)}));else{var n=[];for(var r in y)Object.prototype.hasOwnProperty.call(y,r)&&n.push(E(r));e.resolve(n)}}function k(n){if("ready"!==u)throw new Error("apply() is only allowed in ready status");return function n(r){var t,c,l,s,f;function u(e){for(var n=[e],r={},t=n.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),c=o.id,a=o.chain;if((s=B[c])&&(!s.hot._selfAccepted||s.hot._selfInvalidated)){if(s.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:c};if(s.hot._main)return{type:"unaccepted",chain:a,moduleId:c};for(var i=0;i<s.parents.length;i++){var d=s.parents[i],l=B[d];if(l){if(l.hot._declinedDependencies[c])return{type:"declined",chain:a.concat([d]),moduleId:c,parentId:d};-1===n.indexOf(d)&&(l.hot._acceptedDependencies[c]?(r[d]||(r[d]=[]),h(r[d],[c])):(delete r[d],n.push(d),t.push({chain:a.concat([d]),id:d})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:r}}function h(e,n){for(var r=0;r<n.length;r++){var t=n[r];-1===e.indexOf(t)&&e.push(t)}}P();var w={},m=[],g={},A=function(){console.warn("[HMR] unexpected require("+j.moduleId+") to disposed module")};for(var _ in y)if(Object.prototype.hasOwnProperty.call(y,_)){var j;f=E(_),j=y[_]?u(f):{type:"disposed",moduleId:_};var D=!1,k=!1,x=!1,I="";switch(j.chain&&(I="\nUpdate propagation: "+j.chain.join(" -> ")),j.type){case"self-declined":r.onDeclined&&r.onDeclined(j),r.ignoreDeclined||(D=new Error("Aborted because of self decline: "+j.moduleId+I));break;case"declined":r.onDeclined&&r.onDeclined(j),r.ignoreDeclined||(D=new Error("Aborted because of declined dependency: "+j.moduleId+" in "+j.parentId+I));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(j),r.ignoreUnaccepted||(D=new Error("Aborted because "+f+" is not accepted"+I));break;case"accepted":r.onAccepted&&r.onAccepted(j),k=!0;break;case"disposed":r.onDisposed&&r.onDisposed(j),x=!0;break;default:throw new Error("Unexception type "+j.type)}if(D)return p("abort"),Promise.reject(D);if(k)for(f in g[f]=y[f],h(m,j.outdatedModules),j.outdatedDependencies)Object.prototype.hasOwnProperty.call(j.outdatedDependencies,f)&&(w[f]||(w[f]=[]),h(w[f],j.outdatedDependencies[f]));x&&(h(m,[j.moduleId]),g[f]=A)}var M,q=[];for(c=0;c<m.length;c++)f=m[c],B[f]&&B[f].hot._selfAccepted&&g[f]!==A&&!B[f].hot._selfInvalidated&&q.push({module:f,parents:B[f].parents.slice(),errorHandler:B[f].hot._selfAccepted});p("dispose"),Object.keys(O).forEach((function(e){!1===O[e]&&function(e){delete H[e]}(e)}));var S,U,L=m.slice();for(;L.length>0;)if(f=L.pop(),s=B[f]){var R={},T=s.hot._disposeHandlers;for(l=0;l<T.length;l++)(t=T[l])(R);for(i[f]=R,s.hot.active=!1,delete B[f],delete w[f],l=0;l<s.children.length;l++){var F=B[s.children[l]];F&&((M=F.parents.indexOf(f))>=0&&F.parents.splice(M,1))}}for(f in w)if(Object.prototype.hasOwnProperty.call(w,f)&&(s=B[f]))for(U=w[f],l=0;l<U.length;l++)S=U[l],(M=s.children.indexOf(S))>=0&&s.children.splice(M,1);p("apply"),void 0!==v&&(a=v,v=void 0);for(f in y=void 0,g)Object.prototype.hasOwnProperty.call(g,f)&&(e[f]=g[f]);var J=null;for(f in w)if(Object.prototype.hasOwnProperty.call(w,f)&&(s=B[f])){U=w[f];var N=[];for(c=0;c<U.length;c++)if(S=U[c],t=s.hot._acceptedDependencies[S]){if(-1!==N.indexOf(t))continue;N.push(t)}for(c=0;c<N.length;c++){t=N[c];try{t(U)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:f,dependencyId:U[c],error:e}),r.ignoreErrored||J||(J=e)}}}for(c=0;c<q.length;c++){var X=q[c];f=X.module,d=X.parents,o=f;try{C(f)}catch(e){if("function"==typeof X.errorHandler)try{X.errorHandler(e)}catch(n){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:f,error:n,originalError:e}),r.ignoreErrored||J||(J=n),J||(J=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:f,error:e}),r.ignoreErrored||J||(J=e)}}if(J)return p("fail"),Promise.reject(J);if(b)return n(r).then((function(e){return m.forEach((function(n){e.indexOf(n)<0&&e.push(n)})),e}));return p("idle"),new Promise((function(e){e(m)}))}(n=n||{})}function P(){if(b)return y||(y={}),b.forEach(x),b=void 0,!0}function x(n){Object.prototype.hasOwnProperty.call(y,n)||(y[n]=e[n])}var B={},H={0:0,1:0},I=[];function C(n){if(B[n])return B[n].exports;var r=B[n]={i:n,l:!1,exports:{},hot:s(n),parents:(l=d,d=[],l),children:[]};return e[n].call(r.exports,r,r.exports,function(e){var n=B[e];if(!n)return C;var r=function(r){return n.hot.active?(B[r]?-1===B[r].parents.indexOf(e)&&B[r].parents.push(e):(d=[e],o=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),d=[]),C(r)},t=function(e){return{configurable:!0,enumerable:!0,get:function(){return C[e]},set:function(n){C[e]=n}}};for(var c in C)Object.prototype.hasOwnProperty.call(C,c)&&"e"!==c&&"t"!==c&&Object.defineProperty(r,c,t(c));return r.e=function(e){return"ready"===u&&p("prepare"),m++,C.e(e).then(n,(function(e){throw n(),e}));function n(){m--,"prepare"===u&&(g[e]||j(e),0===m&&0===w&&D())}},r.t=function(e,n){return 1&n&&(e=r(e)),C.t(e,-2&n)},r}(n)),r.l=!0,r.exports}C.m=e,C.c=B,C.d=function(e,n,r){C.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},C.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},C.t=function(e,n){if(1&n&&(e=C(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(C.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)C.d(r,t,function(n){return e[n]}.bind(null,t));return r},C.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return C.d(n,"a",n),n},C.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},C.p="",C.h=function(){return a};var M=window.webpackJsonp=window.webpackJsonp||[],q=M.push.bind(M);M.push=n,M=M.slice();for(var S=0;S<M.length;S++)n(M[S]);var U=q;I.push([12,2]),r()}([function(e,n,r){"use strict";r.r(n);var t=r(5),o=r.n(t),c=r(6),a=r.n(c),i=r(2),d=r.n(i),l=r(7),s=r(8),f=a()(o.a),u=d()(l.a),p=d()(s.a);f.push([e.i,'@font-face {\r\n  font-family: "MyFont";\r\n  src: url('+u+') format("woff2");\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n.hello {\r\n  font-family: "MyFont";\r\n  color: greenyellow;\r\n  background: url('+p+");\r\n  background-repeat: no-repeat;\r\n}\r\n.left {\r\n  margin-left: 500px;\r\n}\r\n","",{version:3,sources:["webpack://./src/styles/style.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,4DAAmD;EACnD,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,mDAAoC;EACpC,4BAA4B;AAC9B;AACA;EACE,kBAAkB;AACpB",sourcesContent:['@font-face {\r\n  font-family: "MyFont";\r\n  src: url("../fonts/iconfont.woff2") format("woff2");\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n.hello {\r\n  font-family: "MyFont";\r\n  color: greenyellow;\r\n  background: url("../assets/lyf.jpg");\r\n  background-repeat: no-repeat;\r\n}\r\n.left {\r\n  margin-left: 500px;\r\n}\r\n'],sourceRoot:""}]),n.default=f},function(e,n,r){"use strict";function t(e,n){return e+n}r.r(n),r.d(n,"add",(function(){return t}))},,,,,,function(e,n,r){"use strict";n.a=r.p+"124b4b759c0e1a1ce485a5417c324240.woff2"},function(e,n,r){"use strict";n.a=r.p+"8894916c452355afbca1c84165f3c2db.jpg"},,,function(e,n,r){"use strict";var t=r(4),o=r.n(t),c=r(0),a={insert:"head",singleton:!1},i=o()(c.default,a);if(!c.default.locals||e.hot.invalidate){var d=c.default.locals;e.hot.accept(0,function(n){c=r(0),function(e,n,r){if(!e&&n||e&&!n)return!1;var t;for(t in e)if((!r||"default"!==t)&&e[t]!==n[t])return!1;for(t in n)if(!(r&&"default"===t||e[t]))return!1;return!0}(d,c.default.locals,void 0)?(d=c.default.locals,i(c.default)):e.hot.invalidate()}.bind(this))}e.hot.dispose((function(){i()}));c.default.locals},function(e,n,r){"use strict";r.r(n);var t=r(3),o=r.n(t),c=(r(11),r.p+"54aec17a343c4c8e4aa9ad8ba9f869dc.jpg"),a=r(1);document.body.appendChild(function(){let e=document.createElement("div");e.innerHTML=o.a.join(["Hello","webpack"]," "),e.classList.add("hello");let n=new Image;return n.src=c,n.classList.add("left"),e.appendChild(n),console.log(Object(a.add)(1,2)),e}())}]);
//# sourceMappingURL=app.bundle.js.map