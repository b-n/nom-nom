(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{174:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(205),o=a.n(l),r=a(282),d=a.n(r),c=a(195),s=a(178),p=a(214),u=a.n(p),m=a(175),g=(a(190),m.default.div.withConfig({displayName:"MealInspiration__Item",componentId:"q4k7kg-0"})(["width:250px;height:250px;flex:none;display:flex;position:relative;"])),f=Object(m.default)(function(e){return i.a.createElement(u.a,e)}).withConfig({displayName:"MealInspiration__HeroImage",componentId:"q4k7kg-1"})(["max-width:100%;max-height:100%;perspective:1px;"]),x=m.default.h1.withConfig({displayName:"MealInspiration__Title",componentId:"q4k7kg-2"})(["display:none;position:absolute;width:100%;color:white;bottom:2rem;margin:0;padding:0.25rem;background-color:rgba(0,0,0,0.6);",":hover &{display:block;}"],g),h=function(e){var t=e.meal,a=e.locale;return i.a.createElement(g,null,i.a.createElement(s.a,{to:"/"+a+"/meal/"+t.slug+"/"},i.a.createElement(f,{resolutions:t.heroImage.resolutions}),i.a.createElement(x,null,t.title)))},w=a(180);a.d(t,"pageQuery",function(){return v});var E=m.default.div.withConfig({displayName:"inspiration__Wrapper",componentId:"nt5eke-0"})(["display:flex;padding:20px;overflow-x:hidden;flex-wrap:wrap;background-color:#fff;max-width:1290px;@media (max-width:540px){max-width:290px;}@media (min-width:541px) and (max-width:790px){max-width:540px;}@media (min-width:791px) and (max-width:1040px){max-width:790px;}@media (min-width:1041px) and (max-width:1290px){max-width:1040px;}"]),v=(t.default=function(e){var t=e.location,a=e.pageContext,n=e.data,l=Object(w.getMessage)(a.locale),r=d.a.shuffle(n.allContentfulMeal.edges);return i.a.createElement(c.a,{location:t},i.a.createElement(o.a,{title:n.site.siteMetadata.title+" | "+l("INSPIRATION")}),i.a.createElement(E,null,r.map(function(e){var t=e.node;return i.a.createElement(h,{key:t.slug,meal:t,locale:a.locale})})))},"1159915829")},178:function(e,t,a){"use strict";var n=a(0),i=a.n(n),l=a(13),o=a.n(l),r=a(59),d=a.n(r);a.d(t,"a",function(){return d.a}),a.d(t,"b",function(){return r.navigate});a(179),i.a.createContext({});o.a.object,o.a.string.isRequired,o.a.func,o.a.func},179:function(e,t,a){var n;e.exports=(n=a(182))&&n.default||n},180:function(e,t,a){var n=a(231).default,i={"en-NZ":a(188),"nl-NL":a(189)},l={"en-NZ":a(210),"nl-NL":a(211)},o=function(e){return function(t){return i[e][t]}};e.exports={languages:[{locale:"en-NZ",label:"🇳🇿 English"},{locale:"nl-NL",label:"🇳🇱 Nederlands"}],defaultLocale:"en-NZ",getMessage:o,formatDateDistanceToNow:function(e,t){var a=o(e);return a("LAST_UPDATED")+" "+n(t,{locale:l[e]})+" "+a("AGO")}}},182:function(e,t,a){"use strict";a.r(t);a(23);var n=a(0),i=a.n(n),l=a(13),o=a.n(l),r=a(84),d=function(e){var t=e.location,a=e.pageResources;return a?i.a.createElement(r.a,Object.assign({location:t,pageResources:a},a.json)):null};d.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=d},187:function(e){e.exports={data:{site:{siteMetadata:{languages:[{locale:"en-NZ",label:"🇳🇿 English"},{locale:"nl-NL",label:"🇳🇱 Nederlands"}]}}}}},188:function(e,t){e.exports={LAST_UPDATED:"Last updated",AGO:"ago",VIEW:" View",LANGUAGE:"Language",HOME:"Home",INSPIRATION:"Inspiration"}},189:function(e,t){e.exports={LAST_UPDATED:"Laatst bijgewerkt",AGO:"geleden",VIEW:"Kijk",LANGUAGE:"Taal",HOME:"Start",INSPIRATION:"Inspiratie"}},195:function(e,t,a){"use strict";a(36);var n=a(0),i=a.n(n),l=a(178),o=a(175),r=a(187),d=a(180),c=o.default.div.withConfig({displayName:"LanguageSelector__Selector",componentId:"sc-14ykzzc-0"})(["font-size:1rem;width:150px;position:relative;display:flex;padding:10px;border:1px solid #333;& a{text-decoration:none;}&:hover{background-color:white;border-top:1px solid #333;border-left:1px solid #333;border-right:2px solid #000;}"]),s=o.default.span.withConfig({displayName:"LanguageSelector__SelectorLabel",componentId:"sc-14ykzzc-1"})(["width:100%;&::after{content:'\\25BC';margin-left:10px;float:right;}",":hover &::after{content:'\\25B2';}"],c),p=o.default.div.withConfig({displayName:"LanguageSelector__Items",componentId:"sc-14ykzzc-2"})(["display:none;position:absolute;margin-top:30px;background-color:white;width:150px;margin-left:-11px;z-index:99999;border-top:1px solid #EEE;border-left:1px solid #333;border-right:2px solid #000;border-bottom:2px solid #000;",":hover &{display:block;}"],c),u=o.default.div.withConfig({displayName:"LanguageSelector__Item",componentId:"sc-14ykzzc-3"})(["padding:10px;"]),m=function(e){var t=e.currentLocale,a=e.path,n=Object(d.getMessage)(t),o=r.data;return i.a.createElement(c,null,i.a.createElement(s,null,n("LANGUAGE")),i.a.createElement(p,null,o.site.siteMetadata.languages.map(function(e){var t=e.label,n=e.locale;return i.a.createElement(u,{key:n},i.a.createElement(l.a,{to:"/"+n+"/"+a},t))})))},g=(a(212),a(213),o.default.div.withConfig({displayName:"Layout__Container",componentId:"sc-1mluxn0-0"})(["display:flex;width:100%;justify-content:center;"])),f=o.default.nav.withConfig({displayName:"Layout__Navigation",componentId:"sc-1mluxn0-1"})(["display:flex;justify-content:space-between;height:20vh;max-height:100px;font-size:1.25rem;"]),x=o.default.div.withConfig({displayName:"Layout__NavigationItem",componentId:"sc-1mluxn0-2"})(["display:inline-flex;align-items:center;margin:0 1em;& a{text-decoration:none;}"]),h=o.default.div.withConfig({displayName:"Layout__NavigationSpacer",componentId:"sc-1mluxn0-3"})(["display:inline-flex;width:100%;"]),w={};t.a=function(e){var t=e.location,a=e.children,n=t.pathname.substring(1).split("/"),r=n.shift(),c=n.join("/"),s=Object(d.getMessage)(r);return i.a.createElement(o.ThemeProvider,{theme:w},i.a.createElement(i.a.Fragment,null,i.a.createElement(f,null,i.a.createElement(x,null,i.a.createElement(l.a,{to:"/"+r+"/"},s("HOME"))),i.a.createElement(x,null,i.a.createElement(l.a,{to:"/"+r+"/inspiration"},s("INSPIRATION"))),i.a.createElement(h,null),i.a.createElement(x,null,i.a.createElement(m,{currentLocale:r,path:c}))),i.a.createElement(g,null,a)))}}}]);
//# sourceMappingURL=component---src-templates-inspiration-js-af142da6a3e0497dc221.js.map