(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{183:function(n,t,e){"use strict";var r=e(26),o=e(6),u=e(25),i=e(120),c=e(121),f=e(24),a=e(192),l=e(122);o(o.S+o.F*!e(83)(function(n){Array.from(n)}),"Array",{from:function(n){var t,e,o,p,s=u(n),d="function"==typeof this?this:Array,m=arguments.length,y=m>1?arguments[1]:void 0,E=void 0!==y,v=0,_=l(s);if(E&&(y=r(y,m>2?arguments[2]:void 0,2)),null==_||d==Array&&c(_))for(e=new d(t=f(s.length));t>v;v++)a(e,v,E?y(s[v],v):s[v]);else for(p=_.call(s),e=new d;!(o=p.next()).done;v++)a(e,v,E?i(p,y,[o.value,v],!0):o.value);return e.length=v,e}})},186:function(n,t,e){"use strict";e.r(t);e(35),e(30),e(22),e(12),e(45),e(61),e(183),e(181),e(60),e(46);var r=e(175),o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},u=c(["@media (",": ","em) {\n      ","\n    }"],["@media (",": ","em) {\n      ","\n    }"]),i=c(["@media (min-width: ","em) and (max-width: ","em) {\n      ","\n    }"],["@media (min-width: ","em) and (max-width: ","em) {\n      ","\n    }"]);function c(n,t){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}function f(n){if(Array.isArray(n)){for(var t=0,e=Array(n.length);t<n.length;t++)e[t]=n[t];return e}return Array.from(n)}function a(n){return n/16}function l(n,t){return n[t]}function p(n,t,e){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=l(n,t);return"min-width"===e&&0===i?function(n){for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return r.css.apply(void 0,[n].concat(f(e)))}:function(n){for(var t=arguments.length,c=Array(t>1?t-1:0),l=1;l<t;l++)c[l-1]=arguments[l];return Object(r.css)(u,e,a(i+o),r.css.apply(void 0,[n].concat(f(c))))}}function s(n,t){return p(n,t,"min-width")}function d(n,t,e){return void 0===e?s(n,t):function(n,t,e){var o=l(n,t),u=l(n,e);return function(n){for(var t=arguments.length,e=Array(t>1?t-1:0),c=1;c<t;c++)e[c-1]=arguments[c];return Object(r.css)(i,a(o),a(u-1),r.css.apply(void 0,[n].concat(f(e))))}}(n,t,e)}function m(n,t,e){var r=t;return null===r||"object"!==(void 0===r?"undefined":o(r))?e(r):[e(void 0)].concat(f(Object.keys(r).map(function(t){var o=s(n,t),u=r[t];return o([],[].concat(e(u)))})))}e.d(t,"map",function(){return E}),e.d(t,"createStatic",function(){return v});var y={mobile:0,tablet:737,desktop:1025};function E(n,t){return function(e){var r=e.theme;return m((void 0===r?{}:r).breakpoints||y,n,t)}}function v(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y;return Object.keys(n).reduce(function(t,e){return t[e]=d(n,e),t},{breakpoint:function(t,e){return d(n,t,e)},map:function(t,e){return m(n,t,e)}})}t.default=function(n,t){return function(e){for(var r=arguments.length,o=Array(r>1?r-1:0),u=1;u<r;u++)o[u-1]=arguments[u];return function(r){var u=r.theme;return d((void 0===u?{}:u).breakpoints||y,n,t).apply(void 0,[e].concat(function(n){if(Array.isArray(n)){for(var t=0,e=Array(n.length);t<n.length;t++)e[t]=n[t];return e}return Array.from(n)}(o)))}}}},190:function(n,t,e){"use strict";e(30),e(22),e(12),e(45),Object.defineProperty(t,"__esModule",{value:!0});var r=e(217);Object.keys(r).forEach(function(n){"default"!==n&&"__esModule"!==n&&Object.defineProperty(t,n,{enumerable:!0,get:function(){return r[n]}})});var o=e(218);Object.keys(o).forEach(function(n){"default"!==n&&"__esModule"!==n&&Object.defineProperty(t,n,{enumerable:!0,get:function(){return o[n]}})})},191:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getSpacingFromTheme=u,t._m=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        margin: "+u(n,t)+";\n      ":""})},t._mx=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        margin-left: "+u(n,t)+";\n        margin-right: "+u(n,t)+";\n      ":""})},t._my=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        margin-top: "+u(n,t)+";\n        margin-bottom: "+u(n,t)+";\n      ":""})},t._mt=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        margin-top: "+u(n,t)+";\n      ":""})},t._mr=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        margin-right: "+u(n,t)+";\n      ":""})},t._mb=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        margin-bottom: "+u(n,t)+";\n      ":""})},t._ml=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n      margin-left: "+u(n,t)+";\n      ":""})},t._p=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        padding: "+u(n,t)+";\n      ":""})},t._px=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        padding-left: "+u(n,t)+";\n        padding-right: "+u(n,t)+";\n      ":""})},t._py=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        padding-top: "+u(n,t)+";\n        padding-bottom: "+u(n,t)+";\n      ":""})},t._pt=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        padding-top: "+u(n,t)+";\n      ":""})},t._pr=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        padding-right: "+u(n,t)+";\n      ":""})},t._pb=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        padding-bottom: "+u(n,t)+";\n      ":""})},t._pl=function(n,t){return(0,r.map)(n,function(n){return"string"==typeof n||"number"==typeof n?"\n        padding-left: "+u(n,t)+";\n      ":""})};var r=e(186),o={0:"0",1:"0.25rem",2:"0.5rem",3:"1rem",4:"2rem",5:"4rem",6:"8rem"};function u(n,t){return t&&t.spacing&&t.spacing[n]||o[n]}},192:function(n,t,e){"use strict";var r=e(14),o=e(47);n.exports=function(n,t,e){t in n?r.f(n,t,o(0,e)):n[t]=e}},196:function(n,t,e){var r=e(6),o=e(220)(!1);r(r.S,"Object",{values:function(n){return o(n)}})},217:function(n,t,e){"use strict";e(181),Object.defineProperty(t,"__esModule",{value:!0}),t.Margin=void 0;var r,o,u=(r=["\n  ","\n  ","\n  "," \n  "," \n  "," \n  "," \n  "," \n  "," \n"],o=["\n  ","\n  ","\n  "," \n  "," \n  "," \n  "," \n  "," \n  "," \n"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(o)}})));t.m=function(n){return function(t){var e=t.theme;return(0,a._m)(n,e)}},t.mx=function(n){return function(t){var e=t.theme;return(0,a._mx)(n,e)}},t.my=function(n){return function(t){var e=t.theme;return(0,a._my)(n,e)}},t.mt=function(n){return function(t){var e=t.theme;return(0,a._mt)(n,e)}},t.mr=function(n){return function(t){var e=t.theme;return(0,a._mr)(n,e)}},t.mb=function(n){return function(t){var e=t.theme;return(0,a._mb)(n,e)}},t.ml=function(n){return function(t){var e=t.theme;return(0,a._ml)(n,e)}};var i,c=e(175),f=(i=c)&&i.__esModule?i:{default:i},a=e(191);(t.Margin=f.default.div(u,function(n){return n.inline&&"display: inline-block;"},function(n){var t=n.all,e=n.theme;return(0,a._m)(t,e)},function(n){var t=n.horizontal,e=n.theme;return(0,a._mx)(t,e)},function(n){var t=n.vertical,e=n.theme;return(0,a._my)(t,e)},function(n){var t=n.top,e=n.theme;return(0,a._mt)(t,e)},function(n){var t=n.right,e=n.theme;return(0,a._mr)(t,e)},function(n){var t=n.bottom,e=n.theme;return(0,a._mb)(t,e)},function(n){var t=n.left,e=n.theme;return(0,a._ml)(t,e)})).displayName="Margin"},218:function(n,t,e){"use strict";e(181),Object.defineProperty(t,"__esModule",{value:!0}),t.Padding=void 0;var r,o,u=(r=["\n  ","\n  ","\n  "," \n  "," \n  "," \n  "," \n  "," \n  "," \n"],o=["\n  ","\n  ","\n  "," \n  "," \n  "," \n  "," \n  "," \n  "," \n"],Object.freeze(Object.defineProperties(r,{raw:{value:Object.freeze(o)}})));t.p=function(n){return function(t){var e=t.theme;return(0,a._p)(n,e)}},t.px=function(n){return function(t){var e=t.theme;return(0,a._px)(n,e)}},t.py=function(n){return function(t){var e=t.theme;return(0,a._py)(n,e)}},t.pt=function(n){return function(t){var e=t.theme;return(0,a._pt)(n,e)}},t.pr=function(n){return function(t){var e=t.theme;return(0,a._pr)(n,e)}},t.pb=function(n){return function(t){var e=t.theme;return(0,a._pb)(n,e)}},t.pl=function(n){return function(t){var e=t.theme;return(0,a._pl)(n,e)}};var i,c=e(175),f=(i=c)&&i.__esModule?i:{default:i},a=e(191);var l=t.Padding=f.default.div(u,function(n){return n.inline&&"display: inline-block;"},function(n){var t=n.all,e=n.theme;return(0,a._p)(t,e)},function(n){var t=n.horizontal,e=n.theme;return(0,a._px)(t,e)},function(n){var t=n.vertical,e=n.theme;return(0,a._py)(t,e)},function(n){var t=n.top,e=n.theme;return(0,a._pt)(t,e)},function(n){var t=n.right,e=n.theme;return(0,a._pr)(t,e)},function(n){var t=n.bottom,e=n.theme;return(0,a._pb)(t,e)},function(n){var t=n.left,e=n.theme;return(0,a._pl)(t,e)});l.displayName="Padding",t.default=l},219:function(n,t){n.exports=function(n,t){return t||(t=n.slice(0)),n.raw=t,n}},220:function(n,t,e){var r=e(10),o=e(31),u=e(32),i=e(48).f;n.exports=function(n){return function(t){for(var e,c=u(t),f=o(c),a=f.length,l=0,p=[];a>l;)e=f[l++],r&&!i.call(c,e)||p.push(n?[e,c[e]]:c[e]);return p}}},294:function(n,t,e){"use strict";function r(n,t){return n(t={exports:{}},t.exports),t.exports}e(181),e(196),e(118),e(119),e(30),e(22),e(45),e(35),e(36),e(82),e(12),Object.defineProperty(t,"__esModule",{value:!0});var o=r(function(n){var t=n.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=t)}),u=r(function(n){var t=n.exports={version:"2.6.5"};"number"==typeof __e&&(__e=t)}),i=(u.version,function(n){return"object"==typeof n?null!==n:"function"==typeof n}),c=function(n){if(!i(n))throw TypeError(n+" is not an object!");return n},f=function(n){try{return!!n()}catch(t){return!0}},a=!f(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),l=o.document,p=i(l)&&i(l.createElement),s=!a&&!f(function(){return 7!=Object.defineProperty((n="div",p?l.createElement(n):{}),"a",{get:function(){return 7}}).a;var n}),d=Object.defineProperty,m={f:a?Object.defineProperty:function(n,t,e){if(c(n),t=function(n,t){if(!i(n))return n;var e,r;if(t&&"function"==typeof(e=n.toString)&&!i(r=e.call(n)))return r;if("function"==typeof(e=n.valueOf)&&!i(r=e.call(n)))return r;if(!t&&"function"==typeof(e=n.toString)&&!i(r=e.call(n)))return r;throw TypeError("Can't convert object to primitive value")}(t,!0),c(e),s)try{return d(n,t,e)}catch(r){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(n[t]=e.value),n}},y=a?function(n,t,e){return m.f(n,t,function(n,t){return{enumerable:!(1&n),configurable:!(2&n),writable:!(4&n),value:t}}(1,e))}:function(n,t,e){return n[t]=e,n},E={}.hasOwnProperty,v=function(n,t){return E.call(n,t)},_=0,h=Math.random(),b=function(n){return"Symbol(".concat(void 0===n?"":n,")_",(++_+h).toString(36))},g=r(function(n){var t=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(n.exports=function(n,e){return t[n]||(t[n]=void 0!==e?e:{})})("versions",[]).push({version:u.version,mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),O=g("native-function-to-string",Function.toString),S=r(function(n){var t=b("src"),e=(""+O).split("toString");u.inspectSource=function(n){return O.call(n)},(n.exports=function(n,r,u,i){var c="function"==typeof u;c&&(v(u,"name")||y(u,"name",r)),n[r]!==u&&(c&&(v(u,t)||y(u,t,n[r]?""+n[r]:e.join(String(r)))),n===o?n[r]=u:i?n[r]?n[r]=u:y(n,r,u):(delete n[r],y(n,r,u)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[t]||O.call(this)})}),T=function(n,t,e){if(function(n){if("function"!=typeof n)throw TypeError(n+" is not a function!")}(n),void 0===t)return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,o){return n.call(t,e,r,o)}}return function(){return n.apply(t,arguments)}},I=function n(t,e,r){var i,c,f,a,l=t&n.F,p=t&n.G,s=t&n.P,d=t&n.B,m=p?o:t&n.S?o[e]||(o[e]={}):(o[e]||{}).prototype,E=p?u:u[e]||(u[e]={}),v=E.prototype||(E.prototype={});for(i in p&&(r=e),r)f=((c=!l&&m&&void 0!==m[i])?m:r)[i],a=d&&c?T(f,o):s&&"function"==typeof f?T(Function.call,f):f,m&&S(m,i,f,t&n.U),E[i]!=f&&y(E,i,a),s&&v[i]!=f&&(v[i]=f)};o.core=u,I.F=1,I.G=2,I.S=4,I.P=8,I.B=16,I.W=32,I.U=64,I.R=128;var D,A,N=I,L={}.toString,M=Object("z").propertyIsEnumerable(0)?Object:function(n){return"String"==function(n){return L.call(n).slice(8,-1)}(n)?n.split(""):Object(n)},P=function(n){return M(function(n){if(null==n)throw TypeError("Can't call method on  "+n);return n}(n))},j=Math.ceil,R=Math.floor,H=function(n){return isNaN(n=+n)?0:(n>0?R:j)(n)},w=Math.min,k=Math.max,x=Math.min,G=function(n){return function(t,e,r){var o,u,i=P(t),c=(o=i.length)>0?w(H(o),9007199254740991):0,f=function(n,t){return(n=H(n))<0?k(n+t,0):x(n,t)}(r,c);if(n&&e!=e){for(;c>f;)if((u=i[f++])!=u)return!0}else for(;c>f;f++)if((n||f in i)&&i[f]===e)return n||f||0;return!n&&-1}},B=g("keys"),Y=G(!1),C=B[D="IE_PROTO"]||(B[D]=b(D)),K="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),U=Object.keys||function(n){return function(n,t){var e,r=P(n),o=0,u=[];for(e in r)e!=C&&v(r,e)&&u.push(e);for(;t.length>o;)v(r,e=t[o++])&&(~Y(u,e)||u.push(e));return u}(n,K)},F={f:{}.propertyIsEnumerable}.f,z=(A=!1,function(n){for(var t,e=P(n),r=U(e),o=r.length,u=0,i=[];o>u;)F.call(e,t=r[u++])&&i.push(A?[t,e[t]]:e[t]);return i});N(N.S,"Object",{values:function(n){return z(n)}});u.Object.values;var Q=r(function(n){var t=g("wks"),e=o.Symbol,r="function"==typeof e;(n.exports=function(n){return t[n]||(t[n]=r&&e[n]||(r?e:b)("Symbol."+n))}).store=t})("unscopables"),V=Array.prototype;null==V[Q]&&y(V,Q,{});var q=G(!0);N(N.P,"Array",{includes:function(n){return q(this,n,arguments.length>1?arguments[1]:void 0)}}),function(n){V[Q][n]=!0}("includes");var J;u.Array.includes;!function(n){n.DOCUMENT="document",n.PARAGRAPH="paragraph",n.HEADING_1="heading-1",n.HEADING_2="heading-2",n.HEADING_3="heading-3",n.HEADING_4="heading-4",n.HEADING_5="heading-5",n.HEADING_6="heading-6",n.OL_LIST="ordered-list",n.UL_LIST="unordered-list",n.LIST_ITEM="list-item",n.HR="hr",n.QUOTE="blockquote",n.EMBEDDED_ENTRY="embedded-entry-block",n.EMBEDDED_ASSET="embedded-asset-block"}(J||(J={}));var W,X=J;!function(n){n.HYPERLINK="hyperlink",n.ENTRY_HYPERLINK="entry-hyperlink",n.ASSET_HYPERLINK="asset-hyperlink",n.EMBEDDED_ENTRY="embedded-entry-inline"}(W||(W={}));var Z,$=W,nn=[X.PARAGRAPH,X.HEADING_1,X.HEADING_2,X.HEADING_3,X.HEADING_4,X.HEADING_5,X.HEADING_6,X.OL_LIST,X.UL_LIST,X.HR,X.QUOTE,X.EMBEDDED_ENTRY,X.EMBEDDED_ASSET],tn=[X.HR,X.EMBEDDED_ENTRY,X.EMBEDDED_ASSET],en=((Z={})[X.OL_LIST]=[X.LIST_ITEM],Z[X.UL_LIST]=[X.LIST_ITEM],Z[X.LIST_ITEM]=nn.slice(),Z[X.QUOTE]=[X.PARAGRAPH],Z);var rn=Object.freeze({isInline:function(n){return Object.values($).includes(n.nodeType)},isBlock:function(n){return Object.values(X).includes(n.nodeType)},isText:function(n){return"text"===n.nodeType}});t.helpers=rn,t.BLOCKS=X,t.INLINES=$,t.MARKS={BOLD:"bold",ITALIC:"italic",UNDERLINE:"underline",CODE:"code"},t.TOP_LEVEL_BLOCKS=nn,t.VOID_BLOCKS=tn,t.CONTAINERS=en},295:function(n,t,e){"use strict";e(181),e(196),e(118),e(119),e(30),e(22),e(45),e(35),e(36),e(82),e(12),e(23),Object.defineProperty(t,"__esModule",{value:!0});var r,o=e(0),u=(r=o)&&"object"==typeof r&&"default"in r?r.default:r,i=function(){return(i=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++)for(var o in t=arguments[e])Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}).apply(this,arguments)};var c,f=function(n,t){return n(t={exports:{}},t.exports),t.exports}(function(n,t){function e(n,t){return n(t={exports:{}},t.exports),t.exports}Object.defineProperty(t,"__esModule",{value:!0});var r=e(function(n){var t=n.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=t)}),o=e(function(n){var t=n.exports={version:"2.6.5"};"number"==typeof __e&&(__e=t)}),u=(o.version,function(n){return"object"==typeof n?null!==n:"function"==typeof n}),i=function(n){if(!u(n))throw TypeError(n+" is not an object!");return n},c=function(n){try{return!!n()}catch(t){return!0}},f=!c(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),a=r.document,l=u(a)&&u(a.createElement),p=!f&&!c(function(){return 7!=Object.defineProperty((n="div",l?a.createElement(n):{}),"a",{get:function(){return 7}}).a;var n}),s=Object.defineProperty,d={f:f?Object.defineProperty:function(n,t,e){if(i(n),t=function(n,t){if(!u(n))return n;var e,r;if(t&&"function"==typeof(e=n.toString)&&!u(r=e.call(n)))return r;if("function"==typeof(e=n.valueOf)&&!u(r=e.call(n)))return r;if(!t&&"function"==typeof(e=n.toString)&&!u(r=e.call(n)))return r;throw TypeError("Can't convert object to primitive value")}(t,!0),i(e),p)try{return s(n,t,e)}catch(r){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(n[t]=e.value),n}},m=f?function(n,t,e){return d.f(n,t,function(n,t){return{enumerable:!(1&n),configurable:!(2&n),writable:!(4&n),value:t}}(1,e))}:function(n,t,e){return n[t]=e,n},y={}.hasOwnProperty,E=function(n,t){return y.call(n,t)},v=0,_=Math.random(),h=function(n){return"Symbol(".concat(void 0===n?"":n,")_",(++v+_).toString(36))},b=e(function(n){var t=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(n.exports=function(n,e){return t[n]||(t[n]=void 0!==e?e:{})})("versions",[]).push({version:o.version,mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),g=b("native-function-to-string",Function.toString),O=e(function(n){var t=h("src"),e=(""+g).split("toString");o.inspectSource=function(n){return g.call(n)},(n.exports=function(n,o,u,i){var c="function"==typeof u;c&&(E(u,"name")||m(u,"name",o)),n[o]!==u&&(c&&(E(u,t)||m(u,t,n[o]?""+n[o]:e.join(String(o)))),n===r?n[o]=u:i?n[o]?n[o]=u:m(n,o,u):(delete n[o],m(n,o,u)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[t]||g.call(this)})}),S=function(n,t,e){if(function(n){if("function"!=typeof n)throw TypeError(n+" is not a function!")}(n),void 0===t)return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,o){return n.call(t,e,r,o)}}return function(){return n.apply(t,arguments)}},T=function n(t,e,u){var i,c,f,a,l=t&n.F,p=t&n.G,s=t&n.P,d=t&n.B,y=p?r:t&n.S?r[e]||(r[e]={}):(r[e]||{}).prototype,E=p?o:o[e]||(o[e]={}),v=E.prototype||(E.prototype={});for(i in p&&(u=e),u)f=((c=!l&&y&&void 0!==y[i])?y:u)[i],a=d&&c?S(f,r):s&&"function"==typeof f?S(Function.call,f):f,y&&O(y,i,f,t&n.U),E[i]!=f&&m(E,i,a),s&&v[i]!=f&&(v[i]=f)};r.core=o,T.F=1,T.G=2,T.S=4,T.P=8,T.B=16,T.W=32,T.U=64,T.R=128;var I,D,A=T,N={}.toString,L=Object("z").propertyIsEnumerable(0)?Object:function(n){return"String"==function(n){return N.call(n).slice(8,-1)}(n)?n.split(""):Object(n)},M=function(n){return L(function(n){if(null==n)throw TypeError("Can't call method on  "+n);return n}(n))},P=Math.ceil,j=Math.floor,R=function(n){return isNaN(n=+n)?0:(n>0?j:P)(n)},H=Math.min,w=Math.max,k=Math.min,x=function(n){return function(t,e,r){var o,u,i=M(t),c=(o=i.length)>0?H(R(o),9007199254740991):0,f=function(n,t){return(n=R(n))<0?w(n+t,0):k(n,t)}(r,c);if(n&&e!=e){for(;c>f;)if((u=i[f++])!=u)return!0}else for(;c>f;f++)if((n||f in i)&&i[f]===e)return n||f||0;return!n&&-1}},G=b("keys"),B=x(!1),Y=G[I="IE_PROTO"]||(G[I]=h(I)),C="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),K=Object.keys||function(n){return function(n,t){var e,r=M(n),o=0,u=[];for(e in r)e!=Y&&E(r,e)&&u.push(e);for(;t.length>o;)E(r,e=t[o++])&&(~B(u,e)||u.push(e));return u}(n,C)},U={f:{}.propertyIsEnumerable}.f,F=(D=!1,function(n){for(var t,e=M(n),r=K(e),o=r.length,u=0,i=[];o>u;)U.call(e,t=r[u++])&&i.push(D?[t,e[t]]:e[t]);return i});A(A.S,"Object",{values:function(n){return F(n)}});o.Object.values;var z=e(function(n){var t=b("wks"),e=r.Symbol,o="function"==typeof e;(n.exports=function(n){return t[n]||(t[n]=o&&e[n]||(o?e:h)("Symbol."+n))}).store=t})("unscopables"),Q=Array.prototype;null==Q[z]&&m(Q,z,{});var V=x(!0);A(A.P,"Array",{includes:function(n){return V(this,n,arguments.length>1?arguments[1]:void 0)}}),function(n){Q[z][n]=!0}("includes");var q;o.Array.includes;!function(n){n.DOCUMENT="document",n.PARAGRAPH="paragraph",n.HEADING_1="heading-1",n.HEADING_2="heading-2",n.HEADING_3="heading-3",n.HEADING_4="heading-4",n.HEADING_5="heading-5",n.HEADING_6="heading-6",n.OL_LIST="ordered-list",n.UL_LIST="unordered-list",n.LIST_ITEM="list-item",n.HR="hr",n.QUOTE="blockquote",n.EMBEDDED_ENTRY="embedded-entry-block",n.EMBEDDED_ASSET="embedded-asset-block"}(q||(q={}));var J,W=q;!function(n){n.HYPERLINK="hyperlink",n.ENTRY_HYPERLINK="entry-hyperlink",n.ASSET_HYPERLINK="asset-hyperlink",n.EMBEDDED_ENTRY="embedded-entry-inline"}(J||(J={}));var X,Z=J,$=[W.PARAGRAPH,W.HEADING_1,W.HEADING_2,W.HEADING_3,W.HEADING_4,W.HEADING_5,W.HEADING_6,W.OL_LIST,W.UL_LIST,W.HR,W.QUOTE,W.EMBEDDED_ENTRY,W.EMBEDDED_ASSET],nn=[W.HR,W.EMBEDDED_ENTRY,W.EMBEDDED_ASSET],tn=((X={})[W.OL_LIST]=[W.LIST_ITEM],X[W.UL_LIST]=[W.LIST_ITEM],X[W.LIST_ITEM]=$.slice(),X[W.QUOTE]=[W.PARAGRAPH],X);var en=Object.freeze({isInline:function(n){return Object.values(Z).includes(n.nodeType)},isBlock:function(n){return Object.values(W).includes(n.nodeType)},isText:function(n){return"text"===n.nodeType}});t.helpers=en,t.BLOCKS=W,t.INLINES=Z,t.MARKS={BOLD:"bold",ITALIC:"italic",UNDERLINE:"underline",CODE:"code"},t.TOP_LEVEL_BLOCKS=$,t.VOID_BLOCKS=nn,t.CONTAINERS=tn});(c=f)&&c.__esModule&&Object.prototype.hasOwnProperty.call(c,"default")&&c.default;var a,l,p=f.helpers,s=f.BLOCKS,d=f.INLINES,m=f.MARKS;f.TOP_LEVEL_BLOCKS,f.VOID_BLOCKS,f.CONTAINERS;function y(n,t){return n.map(function(n,e){return r=function(n,t){var e=t.renderNode,r=t.renderMark,o=t.renderText;if(p.isText(n))return n.marks.reduce(function(n,t){return r[t.type]?r[t.type](n):n},o?o(n.value):n.value);var i=y(n.content,t);return n.nodeType&&e[n.nodeType]?e[n.nodeType](n,i):u.createElement(u.Fragment,null,i)}(n,t),i=e,o.isValidElement(r)&&null===r.key?o.cloneElement(r,{key:i}):r;var r,i})}var E=((a={})[s.PARAGRAPH]=function(n,t){return u.createElement("p",null,t)},a[s.HEADING_1]=function(n,t){return u.createElement("h1",null,t)},a[s.HEADING_2]=function(n,t){return u.createElement("h2",null,t)},a[s.HEADING_3]=function(n,t){return u.createElement("h3",null,t)},a[s.HEADING_4]=function(n,t){return u.createElement("h4",null,t)},a[s.HEADING_5]=function(n,t){return u.createElement("h5",null,t)},a[s.HEADING_6]=function(n,t){return u.createElement("h6",null,t)},a[s.EMBEDDED_ENTRY]=function(n,t){return u.createElement("div",null,t)},a[s.UL_LIST]=function(n,t){return u.createElement("ul",null,t)},a[s.OL_LIST]=function(n,t){return u.createElement("ol",null,t)},a[s.LIST_ITEM]=function(n,t){return u.createElement("li",null,t)},a[s.QUOTE]=function(n,t){return u.createElement("blockquote",null,t)},a[s.HR]=function(){return u.createElement("hr",null)},a[d.ASSET_HYPERLINK]=function(n){return _(d.ASSET_HYPERLINK,n)},a[d.ENTRY_HYPERLINK]=function(n){return _(d.ENTRY_HYPERLINK,n)},a[d.EMBEDDED_ENTRY]=function(n){return _(d.EMBEDDED_ENTRY,n)},a[d.HYPERLINK]=function(n,t){return u.createElement("a",{href:n.data.uri},t)},a),v=((l={})[m.BOLD]=function(n){return u.createElement("b",null,n)},l[m.ITALIC]=function(n){return u.createElement("i",null,n)},l[m.UNDERLINE]=function(n){return u.createElement("u",null,n)},l[m.CODE]=function(n){return u.createElement("code",null,n)},l);function _(n,t){return u.createElement("span",{key:t.data.target.sys.id},"type: ",t.nodeType," id: ",t.data.target.sys.id)}t.documentToReactComponents=function(n,t){return void 0===t&&(t={}),n&&n.content?y(n.content,{renderNode:i({},E,t.renderNode),renderMark:i({},v,t.renderMark),renderText:t.renderText}):null}}}]);
//# sourceMappingURL=10-01fde3cbf715170a1538.js.map