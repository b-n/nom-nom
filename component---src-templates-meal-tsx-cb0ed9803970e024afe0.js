(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{245:function(e,t,n){"use strict";n.r(t);var r=n(268),o=n.n(r),u=n(0),i=n.n(u),c=n(241),a=n.n(c),l=n(4),f=n(168),d=n(120),s=n(242),p=n(75),E=n(317),y={renderMark:{},renderNode:{}},m=function(e){return Object(E.documentToReactComponents)(e,y)};function h(){var e=o()(["\n    width: auto;\n  "]);return h=function(){return e},e}function b(){var e=o()(["\n    flex-wrap: nowrap;\n  "]);return b=function(){return e},e}var v=l.default.div.withConfig({displayName:"Meal__HeaderWrapper",componentId:"sc-184u9yb-0"})(["width:100%;display:flex;flex-wrap:wrap;justify-content:space-between;",";",""],Object(d.mb)({mobile:2,tablet:3,desktop:3}),Object(f.default)("tablet")(b())),g=l.default.h1.withConfig({displayName:"Meal__Header",componentId:"sc-184u9yb-1"})(["margin:0;width:100%;",""],Object(f.default)("tablet")(h())),_=l.default.div.withConfig({displayName:"Meal__SubHeader",componentId:"sc-184u9yb-2"})(["margin:0;font-size:0.8em;color:#777;flex-shrink:0;"]),O=l.default.div.withConfig({displayName:"Meal__Description",componentId:"sc-184u9yb-3"})(["width:100%;color:#223;",";"],Object(d.pb)({mobile:2,tablet:3,desktop:4})),T=function(e){var t=e.meal,n=e.children,r=t.title,o=t.updatedAt,u=t.description,c=t.node_locale;return i.a.createElement(i.a.Fragment,null,i.a.createElement(v,null,i.a.createElement(g,null,r),i.a.createElement(_,null,Object(p.a)(c,new Date(o)))),i.a.createElement(O,null,m(u.json)),n)};function w(){var e=o()(["\n    width: 39%;\n    order: 3;\n  "]);return w=function(){return e},e}function I(){var e=o()(["\n    width: 59%;\n    order: 2;\n  "]);return I=function(){return e},e}function N(){var e=o()(["\n    display: none;\n  "]);return N=function(){return e},e}var S=l.default.div.withConfig({displayName:"Recipe__Wrapper",componentId:"sc-1d27y5q-0"})(["width:100%;display:flex;border:4px outset #606060;border-radius:20px;"," "," "," flex-wrap:wrap;justify-content:space-between;"],Object(d.px)({mobile:3,tablet:4,desktop:4}),Object(d.py)({mobile:2,tablet:3,desktop:3}),Object(d.mb)({mobile:3,tablet:3,desktop:4})),D=l.default.h2.withConfig({displayName:"Recipe__Title",componentId:"sc-1d27y5q-1"})(["width:100%;"," "," order:1;"],Object(d.mt)(2),Object(d.mb)(3)),j=l.default.h3.withConfig({displayName:"Recipe__SubHeading",componentId:"sc-1d27y5q-2"})([""," "," ",""],Object(d.mt)(2),function(e){return e.showTitle&&Object(d.mt)(0)},Object(f.default)("desktop")(N())),L=l.default.div.withConfig({displayName:"Recipe__Instructions",componentId:"sc-1d27y5q-3"})(["width:100%;order:3;",""],Object(f.default)("desktop")(I())),A=l.default.div.withConfig({displayName:"Recipe__Ingredients",componentId:"sc-1d27y5q-4"})(["width:100%;order:2;",""],Object(f.default)("desktop")(w())),R=function(e){var t=e.recipe,n=e.showTitle;return i.a.createElement(i.a.Fragment,null,i.a.createElement(S,null,n&&i.a.createElement(D,null,t.title),i.a.createElement(L,null,i.a.createElement(j,{showTitle:n},"Instructions"),m(t.instructions.json)),i.a.createElement(A,null,i.a.createElement(j,{showTitle:n},"Ingredients"),m(t.ingredients.json))))};function M(){var e=o()(["\n    width: 80%;\n  "]);return M=function(){return e},e}function k(){var e=o()(["\n    width: 90%;\n  "]);return k=function(){return e},e}function H(){var e=o()(["\n    width: 100%;\n  "]);return H=function(){return e},e}n.d(t,"pageQuery",function(){return C});var P=l.default.div.withConfig({displayName:"meal__Content",componentId:"g0rjuc-0"})(["background-color:white;",";"," "," ",""],Object(d.p)({mobile:3,tablet:4,desktop:5}),Object(f.default)("mobile")(H()),Object(f.default)("tablet")(k()),Object(f.default)("desktop")(M())),C=(t.default=function(e){var t=e.data,n=e.pageContext,r=t.contentfulMeal,o=r.title,u=r.recipes,c=t.site.siteMetadata.title;return i.a.createElement(s.a,{pageContext:n},i.a.createElement(a.a,{title:o+" | "+c}),i.a.createElement(P,null,i.a.createElement(T,{meal:r},u&&u.map(function(e){return i.a.createElement(R,{key:e.id,showTitle:u.length>1,recipe:e})}))))},"2724501960")},268:function(e,t){e.exports=function(e,t){return t||(t=e.slice(0)),e.raw=t,e}},269:function(e,t,n){var r=n(1),o=n(270)(!1);r(r.S,"Object",{values:function(e){return o(e)}})},270:function(e,t,n){var r=n(12),o=n(54),u=n(42),i=n(71).f;e.exports=function(e){return function(t){for(var n,c=u(t),a=o(c),l=a.length,f=0,d=[];l>f;)n=a[f++],r&&!i.call(c,n)||d.push(e?[n,c[n]]:c[n]);return d}}},317:function(e,t,n){"use strict";(function(e){n(50),n(27),n(74),n(269),n(117),n(118),n(52),n(94),n(25),n(37),n(7),n(9),n(15),n(16),n(28),n(22),n(30),n(35),n(36),n(3),n(21),n(2),Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(0),u=(r=o)&&"object"==typeof r&&"default"in r?r.default:r,i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},c="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==e?e:"undefined"!=typeof self?self:{};var a,l=function(e,t){return e(t={exports:{}},t.exports),t.exports}(function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==c?c:"undefined"!=typeof self?self:{};function r(e,t){return e(t={exports:{}},t.exports),t.exports}var o,u,i,a="object",l=function(e){return e&&e.Math==Math&&e},f=l(typeof globalThis==a&&globalThis)||l(typeof window==a&&window)||l(typeof self==a&&self)||l(typeof n==a&&n)||Function("return this")(),d=function(e){try{return!!e()}catch(t){return!0}},s=!d(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),p={}.propertyIsEnumerable,E=Object.getOwnPropertyDescriptor,y={f:E&&!p.call({1:2},1)?function(e){var t=E(this,e);return!!t&&t.enumerable}:p},m=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}},h={}.toString,b="".split,v=d(function(){return!Object("z").propertyIsEnumerable(0)})?function(e){return"String"==function(e){return h.call(e).slice(8,-1)}(e)?b.call(e,""):Object(e)}:Object,g=function(e){return v(function(e){if(null==e)throw TypeError("Can't call method on "+e);return e}(e))},_=function(e){return"object"==typeof e?null!==e:"function"==typeof e},O=function(e,t){if(!_(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!_(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!_(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!_(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")},T={}.hasOwnProperty,w=function(e,t){return T.call(e,t)},I=f.document,N=_(I)&&_(I.createElement),S=function(e){return N?I.createElement(e):{}},D=!s&&!d(function(){return 7!=Object.defineProperty(S("div"),"a",{get:function(){return 7}}).a}),j=Object.getOwnPropertyDescriptor,L={f:s?j:function(e,t){if(e=g(e),t=O(t,!0),D)try{return j(e,t)}catch(n){}if(w(e,t))return m(!y.f.call(e,t),e[t])}},A=function(e){if(!_(e))throw TypeError(String(e)+" is not an object");return e},R=Object.defineProperty,M={f:s?R:function(e,t,n){if(A(e),t=O(t,!0),A(n),D)try{return R(e,t,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(e[t]=n.value),e}},k=s?function(e,t,n){return M.f(e,t,m(1,n))}:function(e,t,n){return e[t]=n,e},H=function(e,t){try{k(f,e,t)}catch(n){f[e]=t}return t},P=r(function(e){var t=f["__core-js_shared__"]||H("__core-js_shared__",{});(e.exports=function(e,n){return t[e]||(t[e]=void 0!==n?n:{})})("versions",[]).push({version:"3.1.3",mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),C=P("native-function-to-string",Function.toString),x=f.WeakMap,G="function"==typeof x&&/native code/.test(C.call(x)),B=0,Y=Math.random(),K=function(e){return"Symbol("+String(void 0===e?"":e)+")_"+(++B+Y).toString(36)},U=P("keys"),F=function(e){return U[e]||(U[e]=K(e))},q={},V=f.WeakMap;if(G){var z=new V,Q=z.get,W=z.has,J=z.set;o=function(e,t){return J.call(z,e,t),t},u=function(e){return Q.call(z,e)||{}},i=function(e){return W.call(z,e)}}else{var X=F("state");q[X]=!0,o=function(e,t){return k(e,X,t),t},u=function(e){return w(e,X)?e[X]:{}},i=function(e){return w(e,X)}}var Z={set:o,get:u,has:i,enforce:function(e){return i(e)?u(e):o(e,{})},getterFor:function(e){return function(t){var n;if(!_(t)||(n=u(t)).type!==e)throw TypeError("Incompatible receiver, "+e+" required");return n}}},$=r(function(e){var t=Z.get,n=Z.enforce,r=String(C).split("toString");P("inspectSource",function(e){return C.call(e)}),(e.exports=function(e,t,o,u){var i=!!u&&!!u.unsafe,c=!!u&&!!u.enumerable,a=!!u&&!!u.noTargetGet;"function"==typeof o&&("string"!=typeof t||w(o,"name")||k(o,"name",t),n(o).source=r.join("string"==typeof t?t:"")),e!==f?(i?!a&&e[t]&&(c=!0):delete e[t],c?e[t]=o:k(e,t,o)):c?e[t]=o:H(t,o)})(Function.prototype,"toString",function(){return"function"==typeof this&&t(this).source||C.call(this)})}),ee=f,te=function(e){return"function"==typeof e?e:void 0},ne=function(e,t){return arguments.length<2?te(ee[e])||te(f[e]):ee[e]&&ee[e][t]||f[e]&&f[e][t]},re=Math.ceil,oe=Math.floor,ue=function(e){return isNaN(e=+e)?0:(e>0?oe:re)(e)},ie=Math.min,ce=Math.max,ae=Math.min,le=function(e){return function(t,n,r){var o,u,i=g(t),c=(o=i.length)>0?ie(ue(o),9007199254740991):0,a=function(e,t){var n=ue(e);return n<0?ce(n+t,0):ae(n,t)}(r,c);if(e&&n!=n){for(;c>a;)if((u=i[a++])!=u)return!0}else for(;c>a;a++)if((e||a in i)&&i[a]===n)return e||a||0;return!e&&-1}},fe={includes:le(!0),indexOf:le(!1)},de=fe.indexOf,se=function(e,t){var n,r=g(e),o=0,u=[];for(n in r)!w(q,n)&&w(r,n)&&u.push(n);for(;t.length>o;)w(r,n=t[o++])&&(~de(u,n)||u.push(n));return u},pe=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],Ee=pe.concat("length","prototype"),ye={f:Object.getOwnPropertyNames||function(e){return se(e,Ee)}},me={f:Object.getOwnPropertySymbols},he=ne("Reflect","ownKeys")||function(e){var t=ye.f(A(e)),n=me.f;return n?t.concat(n(e)):t},be=function(e,t){for(var n=he(t),r=M.f,o=L.f,u=0;u<n.length;u++){var i=n[u];w(e,i)||r(e,i,o(t,i))}},ve=/#|\.prototype\./,ge=function(e,t){var n=Oe[_e(e)];return n==we||n!=Te&&("function"==typeof t?d(t):!!t)},_e=ge.normalize=function(e){return String(e).replace(ve,".").toLowerCase()},Oe=ge.data={},Te=ge.NATIVE="N",we=ge.POLYFILL="P",Ie=ge,Ne=L.f,Se=function(e,t){var n,r,o,u,i,c=e.target,a=e.global,l=e.stat;if(n=a?f:l?f[c]||H(c,{}):(f[c]||{}).prototype)for(r in t){if(u=t[r],o=e.noTargetGet?(i=Ne(n,r))&&i.value:n[r],!Ie(a?r:c+(l?".":"#")+r,e.forced)&&void 0!==o){if(typeof u==typeof o)continue;be(u,o)}(e.sham||o&&o.sham)&&k(u,"sham",!0),$(n,r,u,e)}},De=Object.keys||function(e){return se(e,pe)},je=y.f,Le=function(e){return function(t){for(var n,r=g(t),o=De(r),u=o.length,i=0,c=[];u>i;)n=o[i++],s&&!je.call(r,n)||c.push(e?[n,r[n]]:r[n]);return c}},Ae={entries:Le(!0),values:Le(!1)}.values;Se({target:"Object",stat:!0},{values:function(e){return Ae(e)}});ee.Object.values;var Re=!!Object.getOwnPropertySymbols&&!d(function(){return!String(Symbol())}),Me=f.Symbol,ke=P("wks"),He=s?Object.defineProperties:function(e,t){A(e);for(var n,r=De(t),o=r.length,u=0;o>u;)M.f(e,n=r[u++],t[n]);return e},Pe=ne("document","documentElement"),Ce=F("IE_PROTO"),xe=function(){},Ge=function(){var e,t=S("iframe"),n=pe.length;for(t.style.display="none",Pe.appendChild(t),t.src=String("javascript:"),(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),Ge=e.F;n--;)delete Ge.prototype[pe[n]];return Ge()},Be=Object.create||function(e,t){var n;return null!==e?(xe.prototype=A(e),n=new xe,xe.prototype=null,n[Ce]=e):n=Ge(),void 0===t?n:He(n,t)};q[Ce]=!0;var Ye,Ke=ke[Ye="unscopables"]||(ke[Ye]=Re&&Me[Ye]||(Re?Me:K)("Symbol."+Ye)),Ue=Array.prototype;null==Ue[Ke]&&k(Ue,Ke,Be(null));var Fe,qe=fe.includes;Se({target:"Array",proto:!0},{includes:function(e){return qe(this,e,arguments.length>1?arguments[1]:void 0)}}),Fe="includes",Ue[Ke][Fe]=!0;var Ve,ze,Qe,We=function(e,t,n){if(function(e){if("function"!=typeof e)throw TypeError(String(e)+" is not a function")}(e),void 0===t)return e;switch(n){case 0:return function(){return e.call(t)};case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,o){return e.call(t,n,r,o)}}return function(){return e.apply(t,arguments)}},Je=Function.call;Ve="includes",We(Je,f["Array"].prototype[Ve],ze);!function(e){e.DOCUMENT="document",e.PARAGRAPH="paragraph",e.HEADING_1="heading-1",e.HEADING_2="heading-2",e.HEADING_3="heading-3",e.HEADING_4="heading-4",e.HEADING_5="heading-5",e.HEADING_6="heading-6",e.OL_LIST="ordered-list",e.UL_LIST="unordered-list",e.LIST_ITEM="list-item",e.HR="hr",e.QUOTE="blockquote",e.EMBEDDED_ENTRY="embedded-entry-block",e.EMBEDDED_ASSET="embedded-asset-block"}(Qe||(Qe={}));var Xe,Ze=Qe;!function(e){e.HYPERLINK="hyperlink",e.ENTRY_HYPERLINK="entry-hyperlink",e.ASSET_HYPERLINK="asset-hyperlink",e.EMBEDDED_ENTRY="embedded-entry-inline"}(Xe||(Xe={}));var $e,et=Xe,tt=[Ze.PARAGRAPH,Ze.HEADING_1,Ze.HEADING_2,Ze.HEADING_3,Ze.HEADING_4,Ze.HEADING_5,Ze.HEADING_6,Ze.OL_LIST,Ze.UL_LIST,Ze.HR,Ze.QUOTE,Ze.EMBEDDED_ENTRY,Ze.EMBEDDED_ASSET],nt=[Ze.HR,Ze.EMBEDDED_ENTRY,Ze.EMBEDDED_ASSET],rt=(($e={})[Ze.OL_LIST]=[Ze.LIST_ITEM],$e[Ze.UL_LIST]=[Ze.LIST_ITEM],$e[Ze.LIST_ITEM]=tt.slice(),$e[Ze.QUOTE]=[Ze.PARAGRAPH],$e);var ot=Object.freeze({isInline:function(e){return Object.values(et).includes(e.nodeType)},isBlock:function(e){return Object.values(Ze).includes(e.nodeType)},isText:function(e){return"text"===e.nodeType}});t.BLOCKS=Ze,t.CONTAINERS=rt,t.INLINES=et,t.MARKS={BOLD:"bold",ITALIC:"italic",UNDERLINE:"underline",CODE:"code"},t.TOP_LEVEL_BLOCKS=tt,t.VOID_BLOCKS=nt,t.helpers=ot});(a=l)&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")&&a.default;var f,d,s=l.BLOCKS,p=(l.CONTAINERS,l.INLINES),E=l.MARKS,y=(l.TOP_LEVEL_BLOCKS,l.VOID_BLOCKS,l.helpers);function m(e,t){return e.map(function(e,n){return r=h(e,t),u=n,o.isValidElement(r)&&null===r.key?o.cloneElement(r,{key:u}):r;var r,u})}function h(e,t){var n=t.renderNode,r=t.renderMark,o=t.renderText;if(y.isText(e))return e.marks.reduce(function(e,t){return r[t.type]?r[t.type](e):e},o?o(e.value):e.value);var i=m(e.content,t);return e.nodeType&&n[e.nodeType]?n[e.nodeType](e,i):u.createElement(u.Fragment,null,i)}var b=((f={})[s.DOCUMENT]=function(e,t){return t},f[s.PARAGRAPH]=function(e,t){return u.createElement("p",null,t)},f[s.HEADING_1]=function(e,t){return u.createElement("h1",null,t)},f[s.HEADING_2]=function(e,t){return u.createElement("h2",null,t)},f[s.HEADING_3]=function(e,t){return u.createElement("h3",null,t)},f[s.HEADING_4]=function(e,t){return u.createElement("h4",null,t)},f[s.HEADING_5]=function(e,t){return u.createElement("h5",null,t)},f[s.HEADING_6]=function(e,t){return u.createElement("h6",null,t)},f[s.EMBEDDED_ENTRY]=function(e,t){return u.createElement("div",null,t)},f[s.UL_LIST]=function(e,t){return u.createElement("ul",null,t)},f[s.OL_LIST]=function(e,t){return u.createElement("ol",null,t)},f[s.LIST_ITEM]=function(e,t){return u.createElement("li",null,t)},f[s.QUOTE]=function(e,t){return u.createElement("blockquote",null,t)},f[s.HR]=function(){return u.createElement("hr",null)},f[p.ASSET_HYPERLINK]=function(e){return g(p.ASSET_HYPERLINK,e)},f[p.ENTRY_HYPERLINK]=function(e){return g(p.ENTRY_HYPERLINK,e)},f[p.EMBEDDED_ENTRY]=function(e){return g(p.EMBEDDED_ENTRY,e)},f[p.HYPERLINK]=function(e,t){return u.createElement("a",{href:e.data.uri},t)},f),v=((d={})[E.BOLD]=function(e){return u.createElement("b",null,e)},d[E.ITALIC]=function(e){return u.createElement("i",null,e)},d[E.UNDERLINE]=function(e){return u.createElement("u",null,e)},d[E.CODE]=function(e){return u.createElement("code",null,e)},d);function g(e,t){return u.createElement("span",{key:t.data.target.sys.id},"type: ",t.nodeType," id: ",t.data.target.sys.id)}t.documentToReactComponents=function(e,t){return void 0===t&&(t={}),e?h(e,{renderNode:i({},b,t.renderNode),renderMark:i({},v,t.renderMark),renderText:t.renderText}):null}}).call(this,n(173))}}]);
//# sourceMappingURL=component---src-templates-meal-tsx-cb0ed9803970e024afe0.js.map