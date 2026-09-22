(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function H_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Rg={exports:{}},hc={},bg={exports:{}},tt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mo=Symbol.for("react.element"),V_=Symbol.for("react.portal"),G_=Symbol.for("react.fragment"),W_=Symbol.for("react.strict_mode"),X_=Symbol.for("react.profiler"),Y_=Symbol.for("react.provider"),j_=Symbol.for("react.context"),q_=Symbol.for("react.forward_ref"),$_=Symbol.for("react.suspense"),K_=Symbol.for("react.memo"),Z_=Symbol.for("react.lazy"),np=Symbol.iterator;function J_(t){return t===null||typeof t!="object"?null:(t=np&&t[np]||t["@@iterator"],typeof t=="function"?t:null)}var Pg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Lg=Object.assign,Ng={};function Zs(t,e,n){this.props=t,this.context=e,this.refs=Ng,this.updater=n||Pg}Zs.prototype.isReactComponent={};Zs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Zs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Dg(){}Dg.prototype=Zs.prototype;function Df(t,e,n){this.props=t,this.context=e,this.refs=Ng,this.updater=n||Pg}var If=Df.prototype=new Dg;If.constructor=Df;Lg(If,Zs.prototype);If.isPureReactComponent=!0;var ip=Array.isArray,Ig=Object.prototype.hasOwnProperty,Uf={current:null},Ug={key:!0,ref:!0,__self:!0,__source:!0};function Fg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Ig.call(e,i)&&!Ug.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:mo,type:t,key:s,ref:a,props:r,_owner:Uf.current}}function Q_(t,e){return{$$typeof:mo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Ff(t){return typeof t=="object"&&t!==null&&t.$$typeof===mo}function ex(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var rp=/\/+/g;function Uc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?ex(""+t.key):e.toString(36)}function _l(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case mo:case V_:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Uc(a,0):i,ip(r)?(n="",t!=null&&(n=t.replace(rp,"$&/")+"/"),_l(r,e,n,"",function(c){return c})):r!=null&&(Ff(r)&&(r=Q_(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(rp,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",ip(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Uc(s,o);a+=_l(s,e,n,l,r)}else if(l=J_(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Uc(s,o++),a+=_l(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function Ro(t,e,n){if(t==null)return t;var i=[],r=0;return _l(t,i,"","",function(s){return e.call(n,s,r++)}),i}function tx(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var pn={current:null},xl={transition:null},nx={ReactCurrentDispatcher:pn,ReactCurrentBatchConfig:xl,ReactCurrentOwner:Uf};function Og(){throw Error("act(...) is not supported in production builds of React.")}tt.Children={map:Ro,forEach:function(t,e,n){Ro(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ro(t,function(){e++}),e},toArray:function(t){return Ro(t,function(e){return e})||[]},only:function(t){if(!Ff(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};tt.Component=Zs;tt.Fragment=G_;tt.Profiler=X_;tt.PureComponent=Df;tt.StrictMode=W_;tt.Suspense=$_;tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nx;tt.act=Og;tt.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Lg({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Uf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Ig.call(e,l)&&!Ug.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:mo,type:t.type,key:r,ref:s,props:i,_owner:a}};tt.createContext=function(t){return t={$$typeof:j_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Y_,_context:t},t.Consumer=t};tt.createElement=Fg;tt.createFactory=function(t){var e=Fg.bind(null,t);return e.type=t,e};tt.createRef=function(){return{current:null}};tt.forwardRef=function(t){return{$$typeof:q_,render:t}};tt.isValidElement=Ff;tt.lazy=function(t){return{$$typeof:Z_,_payload:{_status:-1,_result:t},_init:tx}};tt.memo=function(t,e){return{$$typeof:K_,type:t,compare:e===void 0?null:e}};tt.startTransition=function(t){var e=xl.transition;xl.transition={};try{t()}finally{xl.transition=e}};tt.unstable_act=Og;tt.useCallback=function(t,e){return pn.current.useCallback(t,e)};tt.useContext=function(t){return pn.current.useContext(t)};tt.useDebugValue=function(){};tt.useDeferredValue=function(t){return pn.current.useDeferredValue(t)};tt.useEffect=function(t,e){return pn.current.useEffect(t,e)};tt.useId=function(){return pn.current.useId()};tt.useImperativeHandle=function(t,e,n){return pn.current.useImperativeHandle(t,e,n)};tt.useInsertionEffect=function(t,e){return pn.current.useInsertionEffect(t,e)};tt.useLayoutEffect=function(t,e){return pn.current.useLayoutEffect(t,e)};tt.useMemo=function(t,e){return pn.current.useMemo(t,e)};tt.useReducer=function(t,e,n){return pn.current.useReducer(t,e,n)};tt.useRef=function(t){return pn.current.useRef(t)};tt.useState=function(t){return pn.current.useState(t)};tt.useSyncExternalStore=function(t,e,n){return pn.current.useSyncExternalStore(t,e,n)};tt.useTransition=function(){return pn.current.useTransition()};tt.version="18.3.1";bg.exports=tt;var ke=bg.exports;const ix=H_(ke);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rx=ke,sx=Symbol.for("react.element"),ax=Symbol.for("react.fragment"),ox=Object.prototype.hasOwnProperty,lx=rx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,cx={key:!0,ref:!0,__self:!0,__source:!0};function Bg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)ox.call(e,i)&&!cx.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:sx,type:t,key:s,ref:a,props:r,_owner:lx.current}}hc.Fragment=ax;hc.jsx=Bg;hc.jsxs=Bg;Rg.exports=hc;var A=Rg.exports,Ku={},kg={exports:{}},In={},zg={exports:{}},Hg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(H,k){var W=H.length;H.push(k);e:for(;0<W;){var ee=W-1>>>1,ve=H[ee];if(0<r(ve,k))H[ee]=k,H[W]=ve,W=ee;else break e}}function n(H){return H.length===0?null:H[0]}function i(H){if(H.length===0)return null;var k=H[0],W=H.pop();if(W!==k){H[0]=W;e:for(var ee=0,ve=H.length,de=ve>>>1;ee<de;){var We=2*(ee+1)-1,q=H[We],ie=We+1,B=H[ie];if(0>r(q,W))ie<ve&&0>r(B,q)?(H[ee]=B,H[ie]=W,ee=ie):(H[ee]=q,H[We]=W,ee=We);else if(ie<ve&&0>r(B,W))H[ee]=B,H[ie]=W,ee=ie;else break e}}return k}function r(H,k){var W=H.sortIndex-k.sortIndex;return W!==0?W:H.id-k.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],u=1,h=null,d=3,p=!1,v=!1,E=!1,g=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(H){for(var k=n(c);k!==null;){if(k.callback===null)i(c);else if(k.startTime<=H)i(c),k.sortIndex=k.expirationTime,e(l,k);else break;k=n(c)}}function S(H){if(E=!1,y(H),!v)if(n(l)!==null)v=!0,te(T);else{var k=n(c);k!==null&&j(S,k.startTime-H)}}function T(H,k){v=!1,E&&(E=!1,f(m),m=-1),p=!0;var W=d;try{for(y(k),h=n(l);h!==null&&(!(h.expirationTime>k)||H&&!N());){var ee=h.callback;if(typeof ee=="function"){h.callback=null,d=h.priorityLevel;var ve=ee(h.expirationTime<=k);k=t.unstable_now(),typeof ve=="function"?h.callback=ve:h===n(l)&&i(l),y(k)}else i(l);h=n(l)}if(h!==null)var de=!0;else{var We=n(c);We!==null&&j(S,We.startTime-k),de=!1}return de}finally{h=null,d=W,p=!1}}var w=!1,C=null,m=-1,R=5,L=-1;function N(){return!(t.unstable_now()-L<R)}function F(){if(C!==null){var H=t.unstable_now();L=H;var k=!0;try{k=C(!0,H)}finally{k?Y():(w=!1,C=null)}}else w=!1}var Y;if(typeof _=="function")Y=function(){_(F)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,G=D.port2;D.port1.onmessage=F,Y=function(){G.postMessage(null)}}else Y=function(){g(F,0)};function te(H){C=H,w||(w=!0,Y())}function j(H,k){m=g(function(){H(t.unstable_now())},k)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(H){H.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,te(T))},t.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<H?Math.floor(1e3/H):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(H){switch(d){case 1:case 2:case 3:var k=3;break;default:k=d}var W=d;d=k;try{return H()}finally{d=W}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(H,k){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var W=d;d=H;try{return k()}finally{d=W}},t.unstable_scheduleCallback=function(H,k,W){var ee=t.unstable_now();switch(typeof W=="object"&&W!==null?(W=W.delay,W=typeof W=="number"&&0<W?ee+W:ee):W=ee,H){case 1:var ve=-1;break;case 2:ve=250;break;case 5:ve=1073741823;break;case 4:ve=1e4;break;default:ve=5e3}return ve=W+ve,H={id:u++,callback:k,priorityLevel:H,startTime:W,expirationTime:ve,sortIndex:-1},W>ee?(H.sortIndex=W,e(c,H),n(l)===null&&H===n(c)&&(E?(f(m),m=-1):E=!0,j(S,W-ee))):(H.sortIndex=ve,e(l,H),v||p||(v=!0,te(T))),H},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(H){var k=d;return function(){var W=d;d=k;try{return H.apply(this,arguments)}finally{d=W}}}})(Hg);zg.exports=Hg;var ux=zg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dx=ke,Dn=ux;function pe(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Vg=new Set,Ya={};function qr(t,e){zs(t,e),zs(t+"Capture",e)}function zs(t,e){for(Ya[t]=e,t=0;t<e.length;t++)Vg.add(e[t])}var ki=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Zu=Object.prototype.hasOwnProperty,fx=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,sp={},ap={};function hx(t){return Zu.call(ap,t)?!0:Zu.call(sp,t)?!1:fx.test(t)?ap[t]=!0:(sp[t]=!0,!1)}function px(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function mx(t,e,n,i){if(e===null||typeof e>"u"||px(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function mn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Jt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Jt[t]=new mn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Jt[e]=new mn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Jt[t]=new mn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Jt[t]=new mn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Jt[t]=new mn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Jt[t]=new mn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Jt[t]=new mn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Jt[t]=new mn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Jt[t]=new mn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Of=/[\-:]([a-z])/g;function Bf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Of,Bf);Jt[e]=new mn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Of,Bf);Jt[e]=new mn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Of,Bf);Jt[e]=new mn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Jt[t]=new mn(t,1,!1,t.toLowerCase(),null,!1,!1)});Jt.xlinkHref=new mn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Jt[t]=new mn(t,1,!1,t.toLowerCase(),null,!0,!0)});function kf(t,e,n,i){var r=Jt.hasOwnProperty(e)?Jt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(mx(e,n,r,i)&&(n=null),i||r===null?hx(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Wi=dx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,bo=Symbol.for("react.element"),xs=Symbol.for("react.portal"),Ss=Symbol.for("react.fragment"),zf=Symbol.for("react.strict_mode"),Ju=Symbol.for("react.profiler"),Gg=Symbol.for("react.provider"),Wg=Symbol.for("react.context"),Hf=Symbol.for("react.forward_ref"),Qu=Symbol.for("react.suspense"),ed=Symbol.for("react.suspense_list"),Vf=Symbol.for("react.memo"),tr=Symbol.for("react.lazy"),Xg=Symbol.for("react.offscreen"),op=Symbol.iterator;function ra(t){return t===null||typeof t!="object"?null:(t=op&&t[op]||t["@@iterator"],typeof t=="function"?t:null)}var Ct=Object.assign,Fc;function Ta(t){if(Fc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Fc=e&&e[1]||""}return`
`+Fc+t}var Oc=!1;function Bc(t,e){if(!t||Oc)return"";Oc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{Oc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ta(t):""}function gx(t){switch(t.tag){case 5:return Ta(t.type);case 16:return Ta("Lazy");case 13:return Ta("Suspense");case 19:return Ta("SuspenseList");case 0:case 2:case 15:return t=Bc(t.type,!1),t;case 11:return t=Bc(t.type.render,!1),t;case 1:return t=Bc(t.type,!0),t;default:return""}}function td(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ss:return"Fragment";case xs:return"Portal";case Ju:return"Profiler";case zf:return"StrictMode";case Qu:return"Suspense";case ed:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Wg:return(t.displayName||"Context")+".Consumer";case Gg:return(t._context.displayName||"Context")+".Provider";case Hf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Vf:return e=t.displayName||null,e!==null?e:td(t.type)||"Memo";case tr:e=t._payload,t=t._init;try{return td(t(e))}catch{}}return null}function vx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return td(e);case 8:return e===zf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function _r(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Yg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function _x(t){var e=Yg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Po(t){t._valueTracker||(t._valueTracker=_x(t))}function jg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Yg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Ul(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function nd(t,e){var n=e.checked;return Ct({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function lp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=_r(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function qg(t,e){e=e.checked,e!=null&&kf(t,"checked",e,!1)}function id(t,e){qg(t,e);var n=_r(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?rd(t,e.type,n):e.hasOwnProperty("defaultValue")&&rd(t,e.type,_r(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function cp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function rd(t,e,n){(e!=="number"||Ul(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Aa=Array.isArray;function Ns(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+_r(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function sd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(pe(91));return Ct({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function up(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(pe(92));if(Aa(n)){if(1<n.length)throw Error(pe(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:_r(n)}}function $g(t,e){var n=_r(e.value),i=_r(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function dp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Kg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ad(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Kg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Lo,Zg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Lo=Lo||document.createElement("div"),Lo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Lo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ja(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Na={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},xx=["Webkit","ms","Moz","O"];Object.keys(Na).forEach(function(t){xx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Na[e]=Na[t]})});function Jg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Na.hasOwnProperty(t)&&Na[t]?(""+e).trim():e+"px"}function Qg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Jg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Sx=Ct({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function od(t,e){if(e){if(Sx[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(pe(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(pe(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(pe(61))}if(e.style!=null&&typeof e.style!="object")throw Error(pe(62))}}function ld(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var cd=null;function Gf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ud=null,Ds=null,Is=null;function fp(t){if(t=_o(t)){if(typeof ud!="function")throw Error(pe(280));var e=t.stateNode;e&&(e=_c(e),ud(t.stateNode,t.type,e))}}function e0(t){Ds?Is?Is.push(t):Is=[t]:Ds=t}function t0(){if(Ds){var t=Ds,e=Is;if(Is=Ds=null,fp(t),e)for(t=0;t<e.length;t++)fp(e[t])}}function n0(t,e){return t(e)}function i0(){}var kc=!1;function r0(t,e,n){if(kc)return t(e,n);kc=!0;try{return n0(t,e,n)}finally{kc=!1,(Ds!==null||Is!==null)&&(i0(),t0())}}function qa(t,e){var n=t.stateNode;if(n===null)return null;var i=_c(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(pe(231,e,typeof n));return n}var dd=!1;if(ki)try{var sa={};Object.defineProperty(sa,"passive",{get:function(){dd=!0}}),window.addEventListener("test",sa,sa),window.removeEventListener("test",sa,sa)}catch{dd=!1}function yx(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var Da=!1,Fl=null,Ol=!1,fd=null,Mx={onError:function(t){Da=!0,Fl=t}};function Ex(t,e,n,i,r,s,a,o,l){Da=!1,Fl=null,yx.apply(Mx,arguments)}function wx(t,e,n,i,r,s,a,o,l){if(Ex.apply(this,arguments),Da){if(Da){var c=Fl;Da=!1,Fl=null}else throw Error(pe(198));Ol||(Ol=!0,fd=c)}}function $r(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function s0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function hp(t){if($r(t)!==t)throw Error(pe(188))}function Tx(t){var e=t.alternate;if(!e){if(e=$r(t),e===null)throw Error(pe(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return hp(r),t;if(s===i)return hp(r),e;s=s.sibling}throw Error(pe(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(pe(189))}}if(n.alternate!==i)throw Error(pe(190))}if(n.tag!==3)throw Error(pe(188));return n.stateNode.current===n?t:e}function a0(t){return t=Tx(t),t!==null?o0(t):null}function o0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=o0(t);if(e!==null)return e;t=t.sibling}return null}var l0=Dn.unstable_scheduleCallback,pp=Dn.unstable_cancelCallback,Ax=Dn.unstable_shouldYield,Cx=Dn.unstable_requestPaint,Nt=Dn.unstable_now,Rx=Dn.unstable_getCurrentPriorityLevel,Wf=Dn.unstable_ImmediatePriority,c0=Dn.unstable_UserBlockingPriority,Bl=Dn.unstable_NormalPriority,bx=Dn.unstable_LowPriority,u0=Dn.unstable_IdlePriority,pc=null,vi=null;function Px(t){if(vi&&typeof vi.onCommitFiberRoot=="function")try{vi.onCommitFiberRoot(pc,t,void 0,(t.current.flags&128)===128)}catch{}}var si=Math.clz32?Math.clz32:Dx,Lx=Math.log,Nx=Math.LN2;function Dx(t){return t>>>=0,t===0?32:31-(Lx(t)/Nx|0)|0}var No=64,Do=4194304;function Ca(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function kl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Ca(o):(s&=a,s!==0&&(i=Ca(s)))}else a=n&~r,a!==0?i=Ca(a):s!==0&&(i=Ca(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-si(e),r=1<<n,i|=t[n],e&=~r;return i}function Ix(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ux(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-si(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=Ix(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function hd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function d0(){var t=No;return No<<=1,!(No&4194240)&&(No=64),t}function zc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function go(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-si(e),t[e]=n}function Fx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-si(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Xf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-si(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ft=0;function f0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var h0,Yf,p0,m0,g0,pd=!1,Io=[],cr=null,ur=null,dr=null,$a=new Map,Ka=new Map,rr=[],Ox="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function mp(t,e){switch(t){case"focusin":case"focusout":cr=null;break;case"dragenter":case"dragleave":ur=null;break;case"mouseover":case"mouseout":dr=null;break;case"pointerover":case"pointerout":$a.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ka.delete(e.pointerId)}}function aa(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=_o(e),e!==null&&Yf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Bx(t,e,n,i,r){switch(e){case"focusin":return cr=aa(cr,t,e,n,i,r),!0;case"dragenter":return ur=aa(ur,t,e,n,i,r),!0;case"mouseover":return dr=aa(dr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return $a.set(s,aa($a.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ka.set(s,aa(Ka.get(s)||null,t,e,n,i,r)),!0}return!1}function v0(t){var e=Dr(t.target);if(e!==null){var n=$r(e);if(n!==null){if(e=n.tag,e===13){if(e=s0(n),e!==null){t.blockedOn=e,g0(t.priority,function(){p0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Sl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=md(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);cd=i,n.target.dispatchEvent(i),cd=null}else return e=_o(n),e!==null&&Yf(e),t.blockedOn=n,!1;e.shift()}return!0}function gp(t,e,n){Sl(t)&&n.delete(e)}function kx(){pd=!1,cr!==null&&Sl(cr)&&(cr=null),ur!==null&&Sl(ur)&&(ur=null),dr!==null&&Sl(dr)&&(dr=null),$a.forEach(gp),Ka.forEach(gp)}function oa(t,e){t.blockedOn===e&&(t.blockedOn=null,pd||(pd=!0,Dn.unstable_scheduleCallback(Dn.unstable_NormalPriority,kx)))}function Za(t){function e(r){return oa(r,t)}if(0<Io.length){oa(Io[0],t);for(var n=1;n<Io.length;n++){var i=Io[n];i.blockedOn===t&&(i.blockedOn=null)}}for(cr!==null&&oa(cr,t),ur!==null&&oa(ur,t),dr!==null&&oa(dr,t),$a.forEach(e),Ka.forEach(e),n=0;n<rr.length;n++)i=rr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<rr.length&&(n=rr[0],n.blockedOn===null);)v0(n),n.blockedOn===null&&rr.shift()}var Us=Wi.ReactCurrentBatchConfig,zl=!0;function zx(t,e,n,i){var r=ft,s=Us.transition;Us.transition=null;try{ft=1,jf(t,e,n,i)}finally{ft=r,Us.transition=s}}function Hx(t,e,n,i){var r=ft,s=Us.transition;Us.transition=null;try{ft=4,jf(t,e,n,i)}finally{ft=r,Us.transition=s}}function jf(t,e,n,i){if(zl){var r=md(t,e,n,i);if(r===null)Kc(t,e,i,Hl,n),mp(t,i);else if(Bx(r,t,e,n,i))i.stopPropagation();else if(mp(t,i),e&4&&-1<Ox.indexOf(t)){for(;r!==null;){var s=_o(r);if(s!==null&&h0(s),s=md(t,e,n,i),s===null&&Kc(t,e,i,Hl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Kc(t,e,i,null,n)}}var Hl=null;function md(t,e,n,i){if(Hl=null,t=Gf(i),t=Dr(t),t!==null)if(e=$r(t),e===null)t=null;else if(n=e.tag,n===13){if(t=s0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Hl=t,null}function _0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Rx()){case Wf:return 1;case c0:return 4;case Bl:case bx:return 16;case u0:return 536870912;default:return 16}default:return 16}}var or=null,qf=null,yl=null;function x0(){if(yl)return yl;var t,e=qf,n=e.length,i,r="value"in or?or.value:or.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return yl=r.slice(t,1<i?1-i:void 0)}function Ml(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Uo(){return!0}function vp(){return!1}function Un(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Uo:vp,this.isPropagationStopped=vp,this}return Ct(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Uo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Uo)},persist:function(){},isPersistent:Uo}),e}var Js={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$f=Un(Js),vo=Ct({},Js,{view:0,detail:0}),Vx=Un(vo),Hc,Vc,la,mc=Ct({},vo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==la&&(la&&t.type==="mousemove"?(Hc=t.screenX-la.screenX,Vc=t.screenY-la.screenY):Vc=Hc=0,la=t),Hc)},movementY:function(t){return"movementY"in t?t.movementY:Vc}}),_p=Un(mc),Gx=Ct({},mc,{dataTransfer:0}),Wx=Un(Gx),Xx=Ct({},vo,{relatedTarget:0}),Gc=Un(Xx),Yx=Ct({},Js,{animationName:0,elapsedTime:0,pseudoElement:0}),jx=Un(Yx),qx=Ct({},Js,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),$x=Un(qx),Kx=Ct({},Js,{data:0}),xp=Un(Kx),Zx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Jx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Qx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function eS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Qx[t])?!!e[t]:!1}function Kf(){return eS}var tS=Ct({},vo,{key:function(t){if(t.key){var e=Zx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ml(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Jx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kf,charCode:function(t){return t.type==="keypress"?Ml(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ml(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),nS=Un(tS),iS=Ct({},mc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Sp=Un(iS),rS=Ct({},vo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kf}),sS=Un(rS),aS=Ct({},Js,{propertyName:0,elapsedTime:0,pseudoElement:0}),oS=Un(aS),lS=Ct({},mc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),cS=Un(lS),uS=[9,13,27,32],Zf=ki&&"CompositionEvent"in window,Ia=null;ki&&"documentMode"in document&&(Ia=document.documentMode);var dS=ki&&"TextEvent"in window&&!Ia,S0=ki&&(!Zf||Ia&&8<Ia&&11>=Ia),yp=" ",Mp=!1;function y0(t,e){switch(t){case"keyup":return uS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function M0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ys=!1;function fS(t,e){switch(t){case"compositionend":return M0(e);case"keypress":return e.which!==32?null:(Mp=!0,yp);case"textInput":return t=e.data,t===yp&&Mp?null:t;default:return null}}function hS(t,e){if(ys)return t==="compositionend"||!Zf&&y0(t,e)?(t=x0(),yl=qf=or=null,ys=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return S0&&e.locale!=="ko"?null:e.data;default:return null}}var pS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ep(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!pS[t.type]:e==="textarea"}function E0(t,e,n,i){e0(i),e=Vl(e,"onChange"),0<e.length&&(n=new $f("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Ua=null,Ja=null;function mS(t){I0(t,0)}function gc(t){var e=ws(t);if(jg(e))return t}function gS(t,e){if(t==="change")return e}var w0=!1;if(ki){var Wc;if(ki){var Xc="oninput"in document;if(!Xc){var wp=document.createElement("div");wp.setAttribute("oninput","return;"),Xc=typeof wp.oninput=="function"}Wc=Xc}else Wc=!1;w0=Wc&&(!document.documentMode||9<document.documentMode)}function Tp(){Ua&&(Ua.detachEvent("onpropertychange",T0),Ja=Ua=null)}function T0(t){if(t.propertyName==="value"&&gc(Ja)){var e=[];E0(e,Ja,t,Gf(t)),r0(mS,e)}}function vS(t,e,n){t==="focusin"?(Tp(),Ua=e,Ja=n,Ua.attachEvent("onpropertychange",T0)):t==="focusout"&&Tp()}function _S(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return gc(Ja)}function xS(t,e){if(t==="click")return gc(e)}function SS(t,e){if(t==="input"||t==="change")return gc(e)}function yS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var li=typeof Object.is=="function"?Object.is:yS;function Qa(t,e){if(li(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Zu.call(e,r)||!li(t[r],e[r]))return!1}return!0}function Ap(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Cp(t,e){var n=Ap(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ap(n)}}function A0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?A0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function C0(){for(var t=window,e=Ul();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ul(t.document)}return e}function Jf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function MS(t){var e=C0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&A0(n.ownerDocument.documentElement,n)){if(i!==null&&Jf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Cp(n,s);var a=Cp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ES=ki&&"documentMode"in document&&11>=document.documentMode,Ms=null,gd=null,Fa=null,vd=!1;function Rp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;vd||Ms==null||Ms!==Ul(i)||(i=Ms,"selectionStart"in i&&Jf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Fa&&Qa(Fa,i)||(Fa=i,i=Vl(gd,"onSelect"),0<i.length&&(e=new $f("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Ms)))}function Fo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Es={animationend:Fo("Animation","AnimationEnd"),animationiteration:Fo("Animation","AnimationIteration"),animationstart:Fo("Animation","AnimationStart"),transitionend:Fo("Transition","TransitionEnd")},Yc={},R0={};ki&&(R0=document.createElement("div").style,"AnimationEvent"in window||(delete Es.animationend.animation,delete Es.animationiteration.animation,delete Es.animationstart.animation),"TransitionEvent"in window||delete Es.transitionend.transition);function vc(t){if(Yc[t])return Yc[t];if(!Es[t])return t;var e=Es[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in R0)return Yc[t]=e[n];return t}var b0=vc("animationend"),P0=vc("animationiteration"),L0=vc("animationstart"),N0=vc("transitionend"),D0=new Map,bp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yr(t,e){D0.set(t,e),qr(e,[t])}for(var jc=0;jc<bp.length;jc++){var qc=bp[jc],wS=qc.toLowerCase(),TS=qc[0].toUpperCase()+qc.slice(1);yr(wS,"on"+TS)}yr(b0,"onAnimationEnd");yr(P0,"onAnimationIteration");yr(L0,"onAnimationStart");yr("dblclick","onDoubleClick");yr("focusin","onFocus");yr("focusout","onBlur");yr(N0,"onTransitionEnd");zs("onMouseEnter",["mouseout","mouseover"]);zs("onMouseLeave",["mouseout","mouseover"]);zs("onPointerEnter",["pointerout","pointerover"]);zs("onPointerLeave",["pointerout","pointerover"]);qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ra="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),AS=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ra));function Pp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,wx(i,e,void 0,t),t.currentTarget=null}function I0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Pp(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Pp(r,o,c),s=l}}}if(Ol)throw t=fd,Ol=!1,fd=null,t}function St(t,e){var n=e[Md];n===void 0&&(n=e[Md]=new Set);var i=t+"__bubble";n.has(i)||(U0(e,t,2,!1),n.add(i))}function $c(t,e,n){var i=0;e&&(i|=4),U0(n,t,i,e)}var Oo="_reactListening"+Math.random().toString(36).slice(2);function eo(t){if(!t[Oo]){t[Oo]=!0,Vg.forEach(function(n){n!=="selectionchange"&&(AS.has(n)||$c(n,!1,t),$c(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Oo]||(e[Oo]=!0,$c("selectionchange",!1,e))}}function U0(t,e,n,i){switch(_0(e)){case 1:var r=zx;break;case 4:r=Hx;break;default:r=jf}n=r.bind(null,e,n,t),r=void 0,!dd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Kc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Dr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}r0(function(){var c=s,u=Gf(n),h=[];e:{var d=D0.get(t);if(d!==void 0){var p=$f,v=t;switch(t){case"keypress":if(Ml(n)===0)break e;case"keydown":case"keyup":p=nS;break;case"focusin":v="focus",p=Gc;break;case"focusout":v="blur",p=Gc;break;case"beforeblur":case"afterblur":p=Gc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=_p;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Wx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=sS;break;case b0:case P0:case L0:p=jx;break;case N0:p=oS;break;case"scroll":p=Vx;break;case"wheel":p=cS;break;case"copy":case"cut":case"paste":p=$x;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Sp}var E=(e&4)!==0,g=!E&&t==="scroll",f=E?d!==null?d+"Capture":null:d;E=[];for(var _=c,y;_!==null;){y=_;var S=y.stateNode;if(y.tag===5&&S!==null&&(y=S,f!==null&&(S=qa(_,f),S!=null&&E.push(to(_,S,y)))),g)break;_=_.return}0<E.length&&(d=new p(d,v,null,n,u),h.push({event:d,listeners:E}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==cd&&(v=n.relatedTarget||n.fromElement)&&(Dr(v)||v[zi]))break e;if((p||d)&&(d=u.window===u?u:(d=u.ownerDocument)?d.defaultView||d.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?Dr(v):null,v!==null&&(g=$r(v),v!==g||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(E=_p,S="onMouseLeave",f="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(E=Sp,S="onPointerLeave",f="onPointerEnter",_="pointer"),g=p==null?d:ws(p),y=v==null?d:ws(v),d=new E(S,_+"leave",p,n,u),d.target=g,d.relatedTarget=y,S=null,Dr(u)===c&&(E=new E(f,_+"enter",v,n,u),E.target=y,E.relatedTarget=g,S=E),g=S,p&&v)t:{for(E=p,f=v,_=0,y=E;y;y=ns(y))_++;for(y=0,S=f;S;S=ns(S))y++;for(;0<_-y;)E=ns(E),_--;for(;0<y-_;)f=ns(f),y--;for(;_--;){if(E===f||f!==null&&E===f.alternate)break t;E=ns(E),f=ns(f)}E=null}else E=null;p!==null&&Lp(h,d,p,E,!1),v!==null&&g!==null&&Lp(h,g,v,E,!0)}}e:{if(d=c?ws(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var T=gS;else if(Ep(d))if(w0)T=SS;else{T=_S;var w=vS}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(T=xS);if(T&&(T=T(t,c))){E0(h,T,n,u);break e}w&&w(t,d,c),t==="focusout"&&(w=d._wrapperState)&&w.controlled&&d.type==="number"&&rd(d,"number",d.value)}switch(w=c?ws(c):window,t){case"focusin":(Ep(w)||w.contentEditable==="true")&&(Ms=w,gd=c,Fa=null);break;case"focusout":Fa=gd=Ms=null;break;case"mousedown":vd=!0;break;case"contextmenu":case"mouseup":case"dragend":vd=!1,Rp(h,n,u);break;case"selectionchange":if(ES)break;case"keydown":case"keyup":Rp(h,n,u)}var C;if(Zf)e:{switch(t){case"compositionstart":var m="onCompositionStart";break e;case"compositionend":m="onCompositionEnd";break e;case"compositionupdate":m="onCompositionUpdate";break e}m=void 0}else ys?y0(t,n)&&(m="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(m="onCompositionStart");m&&(S0&&n.locale!=="ko"&&(ys||m!=="onCompositionStart"?m==="onCompositionEnd"&&ys&&(C=x0()):(or=u,qf="value"in or?or.value:or.textContent,ys=!0)),w=Vl(c,m),0<w.length&&(m=new xp(m,t,null,n,u),h.push({event:m,listeners:w}),C?m.data=C:(C=M0(n),C!==null&&(m.data=C)))),(C=dS?fS(t,n):hS(t,n))&&(c=Vl(c,"onBeforeInput"),0<c.length&&(u=new xp("onBeforeInput","beforeinput",null,n,u),h.push({event:u,listeners:c}),u.data=C))}I0(h,e)})}function to(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Vl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=qa(t,n),s!=null&&i.unshift(to(t,s,r)),s=qa(t,e),s!=null&&i.push(to(t,s,r))),t=t.return}return i}function ns(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Lp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=qa(n,s),l!=null&&a.unshift(to(n,l,o))):r||(l=qa(n,s),l!=null&&a.push(to(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var CS=/\r\n?/g,RS=/\u0000|\uFFFD/g;function Np(t){return(typeof t=="string"?t:""+t).replace(CS,`
`).replace(RS,"")}function Bo(t,e,n){if(e=Np(e),Np(t)!==e&&n)throw Error(pe(425))}function Gl(){}var _d=null,xd=null;function Sd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var yd=typeof setTimeout=="function"?setTimeout:void 0,bS=typeof clearTimeout=="function"?clearTimeout:void 0,Dp=typeof Promise=="function"?Promise:void 0,PS=typeof queueMicrotask=="function"?queueMicrotask:typeof Dp<"u"?function(t){return Dp.resolve(null).then(t).catch(LS)}:yd;function LS(t){setTimeout(function(){throw t})}function Zc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Za(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Za(e)}function fr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Ip(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Qs=Math.random().toString(36).slice(2),mi="__reactFiber$"+Qs,no="__reactProps$"+Qs,zi="__reactContainer$"+Qs,Md="__reactEvents$"+Qs,NS="__reactListeners$"+Qs,DS="__reactHandles$"+Qs;function Dr(t){var e=t[mi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[zi]||n[mi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Ip(t);t!==null;){if(n=t[mi])return n;t=Ip(t)}return e}t=n,n=t.parentNode}return null}function _o(t){return t=t[mi]||t[zi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ws(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(pe(33))}function _c(t){return t[no]||null}var Ed=[],Ts=-1;function Mr(t){return{current:t}}function yt(t){0>Ts||(t.current=Ed[Ts],Ed[Ts]=null,Ts--)}function vt(t,e){Ts++,Ed[Ts]=t.current,t.current=e}var xr={},on=Mr(xr),yn=Mr(!1),zr=xr;function Hs(t,e){var n=t.type.contextTypes;if(!n)return xr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Mn(t){return t=t.childContextTypes,t!=null}function Wl(){yt(yn),yt(on)}function Up(t,e,n){if(on.current!==xr)throw Error(pe(168));vt(on,e),vt(yn,n)}function F0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(pe(108,vx(t)||"Unknown",r));return Ct({},n,i)}function Xl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||xr,zr=on.current,vt(on,t),vt(yn,yn.current),!0}function Fp(t,e,n){var i=t.stateNode;if(!i)throw Error(pe(169));n?(t=F0(t,e,zr),i.__reactInternalMemoizedMergedChildContext=t,yt(yn),yt(on),vt(on,t)):yt(yn),vt(yn,n)}var Li=null,xc=!1,Jc=!1;function O0(t){Li===null?Li=[t]:Li.push(t)}function IS(t){xc=!0,O0(t)}function Er(){if(!Jc&&Li!==null){Jc=!0;var t=0,e=ft;try{var n=Li;for(ft=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Li=null,xc=!1}catch(r){throw Li!==null&&(Li=Li.slice(t+1)),l0(Wf,Er),r}finally{ft=e,Jc=!1}}return null}var As=[],Cs=0,Yl=null,jl=0,kn=[],zn=0,Hr=null,Di=1,Ii="";function Lr(t,e){As[Cs++]=jl,As[Cs++]=Yl,Yl=t,jl=e}function B0(t,e,n){kn[zn++]=Di,kn[zn++]=Ii,kn[zn++]=Hr,Hr=t;var i=Di;t=Ii;var r=32-si(i)-1;i&=~(1<<r),n+=1;var s=32-si(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Di=1<<32-si(e)+r|n<<r|i,Ii=s+t}else Di=1<<s|n<<r|i,Ii=t}function Qf(t){t.return!==null&&(Lr(t,1),B0(t,1,0))}function eh(t){for(;t===Yl;)Yl=As[--Cs],As[Cs]=null,jl=As[--Cs],As[Cs]=null;for(;t===Hr;)Hr=kn[--zn],kn[zn]=null,Ii=kn[--zn],kn[zn]=null,Di=kn[--zn],kn[zn]=null}var Nn=null,Ln=null,Et=!1,ei=null;function k0(t,e){var n=Hn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Op(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Nn=t,Ln=fr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Nn=t,Ln=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Hr!==null?{id:Di,overflow:Ii}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Hn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Nn=t,Ln=null,!0):!1;default:return!1}}function wd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Td(t){if(Et){var e=Ln;if(e){var n=e;if(!Op(t,e)){if(wd(t))throw Error(pe(418));e=fr(n.nextSibling);var i=Nn;e&&Op(t,e)?k0(i,n):(t.flags=t.flags&-4097|2,Et=!1,Nn=t)}}else{if(wd(t))throw Error(pe(418));t.flags=t.flags&-4097|2,Et=!1,Nn=t}}}function Bp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Nn=t}function ko(t){if(t!==Nn)return!1;if(!Et)return Bp(t),Et=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Sd(t.type,t.memoizedProps)),e&&(e=Ln)){if(wd(t))throw z0(),Error(pe(418));for(;e;)k0(t,e),e=fr(e.nextSibling)}if(Bp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(pe(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Ln=fr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Ln=null}}else Ln=Nn?fr(t.stateNode.nextSibling):null;return!0}function z0(){for(var t=Ln;t;)t=fr(t.nextSibling)}function Vs(){Ln=Nn=null,Et=!1}function th(t){ei===null?ei=[t]:ei.push(t)}var US=Wi.ReactCurrentBatchConfig;function ca(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(pe(309));var i=n.stateNode}if(!i)throw Error(pe(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(pe(284));if(!n._owner)throw Error(pe(290,t))}return t}function zo(t,e){throw t=Object.prototype.toString.call(e),Error(pe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function kp(t){var e=t._init;return e(t._payload)}function H0(t){function e(f,_){if(t){var y=f.deletions;y===null?(f.deletions=[_],f.flags|=16):y.push(_)}}function n(f,_){if(!t)return null;for(;_!==null;)e(f,_),_=_.sibling;return null}function i(f,_){for(f=new Map;_!==null;)_.key!==null?f.set(_.key,_):f.set(_.index,_),_=_.sibling;return f}function r(f,_){return f=gr(f,_),f.index=0,f.sibling=null,f}function s(f,_,y){return f.index=y,t?(y=f.alternate,y!==null?(y=y.index,y<_?(f.flags|=2,_):y):(f.flags|=2,_)):(f.flags|=1048576,_)}function a(f){return t&&f.alternate===null&&(f.flags|=2),f}function o(f,_,y,S){return _===null||_.tag!==6?(_=su(y,f.mode,S),_.return=f,_):(_=r(_,y),_.return=f,_)}function l(f,_,y,S){var T=y.type;return T===Ss?u(f,_,y.props.children,S,y.key):_!==null&&(_.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===tr&&kp(T)===_.type)?(S=r(_,y.props),S.ref=ca(f,_,y),S.return=f,S):(S=bl(y.type,y.key,y.props,null,f.mode,S),S.ref=ca(f,_,y),S.return=f,S)}function c(f,_,y,S){return _===null||_.tag!==4||_.stateNode.containerInfo!==y.containerInfo||_.stateNode.implementation!==y.implementation?(_=au(y,f.mode,S),_.return=f,_):(_=r(_,y.children||[]),_.return=f,_)}function u(f,_,y,S,T){return _===null||_.tag!==7?(_=kr(y,f.mode,S,T),_.return=f,_):(_=r(_,y),_.return=f,_)}function h(f,_,y){if(typeof _=="string"&&_!==""||typeof _=="number")return _=su(""+_,f.mode,y),_.return=f,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case bo:return y=bl(_.type,_.key,_.props,null,f.mode,y),y.ref=ca(f,null,_),y.return=f,y;case xs:return _=au(_,f.mode,y),_.return=f,_;case tr:var S=_._init;return h(f,S(_._payload),y)}if(Aa(_)||ra(_))return _=kr(_,f.mode,y,null),_.return=f,_;zo(f,_)}return null}function d(f,_,y,S){var T=_!==null?_.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return T!==null?null:o(f,_,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case bo:return y.key===T?l(f,_,y,S):null;case xs:return y.key===T?c(f,_,y,S):null;case tr:return T=y._init,d(f,_,T(y._payload),S)}if(Aa(y)||ra(y))return T!==null?null:u(f,_,y,S,null);zo(f,y)}return null}function p(f,_,y,S,T){if(typeof S=="string"&&S!==""||typeof S=="number")return f=f.get(y)||null,o(_,f,""+S,T);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case bo:return f=f.get(S.key===null?y:S.key)||null,l(_,f,S,T);case xs:return f=f.get(S.key===null?y:S.key)||null,c(_,f,S,T);case tr:var w=S._init;return p(f,_,y,w(S._payload),T)}if(Aa(S)||ra(S))return f=f.get(y)||null,u(_,f,S,T,null);zo(_,S)}return null}function v(f,_,y,S){for(var T=null,w=null,C=_,m=_=0,R=null;C!==null&&m<y.length;m++){C.index>m?(R=C,C=null):R=C.sibling;var L=d(f,C,y[m],S);if(L===null){C===null&&(C=R);break}t&&C&&L.alternate===null&&e(f,C),_=s(L,_,m),w===null?T=L:w.sibling=L,w=L,C=R}if(m===y.length)return n(f,C),Et&&Lr(f,m),T;if(C===null){for(;m<y.length;m++)C=h(f,y[m],S),C!==null&&(_=s(C,_,m),w===null?T=C:w.sibling=C,w=C);return Et&&Lr(f,m),T}for(C=i(f,C);m<y.length;m++)R=p(C,f,m,y[m],S),R!==null&&(t&&R.alternate!==null&&C.delete(R.key===null?m:R.key),_=s(R,_,m),w===null?T=R:w.sibling=R,w=R);return t&&C.forEach(function(N){return e(f,N)}),Et&&Lr(f,m),T}function E(f,_,y,S){var T=ra(y);if(typeof T!="function")throw Error(pe(150));if(y=T.call(y),y==null)throw Error(pe(151));for(var w=T=null,C=_,m=_=0,R=null,L=y.next();C!==null&&!L.done;m++,L=y.next()){C.index>m?(R=C,C=null):R=C.sibling;var N=d(f,C,L.value,S);if(N===null){C===null&&(C=R);break}t&&C&&N.alternate===null&&e(f,C),_=s(N,_,m),w===null?T=N:w.sibling=N,w=N,C=R}if(L.done)return n(f,C),Et&&Lr(f,m),T;if(C===null){for(;!L.done;m++,L=y.next())L=h(f,L.value,S),L!==null&&(_=s(L,_,m),w===null?T=L:w.sibling=L,w=L);return Et&&Lr(f,m),T}for(C=i(f,C);!L.done;m++,L=y.next())L=p(C,f,m,L.value,S),L!==null&&(t&&L.alternate!==null&&C.delete(L.key===null?m:L.key),_=s(L,_,m),w===null?T=L:w.sibling=L,w=L);return t&&C.forEach(function(F){return e(f,F)}),Et&&Lr(f,m),T}function g(f,_,y,S){if(typeof y=="object"&&y!==null&&y.type===Ss&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case bo:e:{for(var T=y.key,w=_;w!==null;){if(w.key===T){if(T=y.type,T===Ss){if(w.tag===7){n(f,w.sibling),_=r(w,y.props.children),_.return=f,f=_;break e}}else if(w.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===tr&&kp(T)===w.type){n(f,w.sibling),_=r(w,y.props),_.ref=ca(f,w,y),_.return=f,f=_;break e}n(f,w);break}else e(f,w);w=w.sibling}y.type===Ss?(_=kr(y.props.children,f.mode,S,y.key),_.return=f,f=_):(S=bl(y.type,y.key,y.props,null,f.mode,S),S.ref=ca(f,_,y),S.return=f,f=S)}return a(f);case xs:e:{for(w=y.key;_!==null;){if(_.key===w)if(_.tag===4&&_.stateNode.containerInfo===y.containerInfo&&_.stateNode.implementation===y.implementation){n(f,_.sibling),_=r(_,y.children||[]),_.return=f,f=_;break e}else{n(f,_);break}else e(f,_);_=_.sibling}_=au(y,f.mode,S),_.return=f,f=_}return a(f);case tr:return w=y._init,g(f,_,w(y._payload),S)}if(Aa(y))return v(f,_,y,S);if(ra(y))return E(f,_,y,S);zo(f,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,_!==null&&_.tag===6?(n(f,_.sibling),_=r(_,y),_.return=f,f=_):(n(f,_),_=su(y,f.mode,S),_.return=f,f=_),a(f)):n(f,_)}return g}var Gs=H0(!0),V0=H0(!1),ql=Mr(null),$l=null,Rs=null,nh=null;function ih(){nh=Rs=$l=null}function rh(t){var e=ql.current;yt(ql),t._currentValue=e}function Ad(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Fs(t,e){$l=t,nh=Rs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Sn=!0),t.firstContext=null)}function Wn(t){var e=t._currentValue;if(nh!==t)if(t={context:t,memoizedValue:e,next:null},Rs===null){if($l===null)throw Error(pe(308));Rs=t,$l.dependencies={lanes:0,firstContext:t}}else Rs=Rs.next=t;return e}var Ir=null;function sh(t){Ir===null?Ir=[t]:Ir.push(t)}function G0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,sh(e)):(n.next=r.next,r.next=n),e.interleaved=n,Hi(t,i)}function Hi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var nr=!1;function ah(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function W0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Fi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function hr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,st&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Hi(t,n)}return r=i.interleaved,r===null?(e.next=e,sh(i)):(e.next=r.next,r.next=e),i.interleaved=e,Hi(t,n)}function El(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Xf(t,n)}}function zp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Kl(t,e,n,i){var r=t.updateQueue;nr=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var u=t.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==a&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;a=0,u=c=l=null,o=s;do{var d=o.lane,p=o.eventTime;if((i&d)===d){u!==null&&(u=u.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var v=t,E=o;switch(d=e,p=n,E.tag){case 1:if(v=E.payload,typeof v=="function"){h=v.call(p,h,d);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=E.payload,d=typeof v=="function"?v.call(p,h,d):v,d==null)break e;h=Ct({},h,d);break e;case 2:nr=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[o]:d.push(o))}else p={eventTime:p,lane:d,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=p,l=h):u=u.next=p,a|=d;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;d=o,o=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(u===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Gr|=a,t.lanes=a,t.memoizedState=h}}function Hp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(pe(191,r));r.call(i)}}}var xo={},_i=Mr(xo),io=Mr(xo),ro=Mr(xo);function Ur(t){if(t===xo)throw Error(pe(174));return t}function oh(t,e){switch(vt(ro,e),vt(io,t),vt(_i,xo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ad(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=ad(e,t)}yt(_i),vt(_i,e)}function Ws(){yt(_i),yt(io),yt(ro)}function X0(t){Ur(ro.current);var e=Ur(_i.current),n=ad(e,t.type);e!==n&&(vt(io,t),vt(_i,n))}function lh(t){io.current===t&&(yt(_i),yt(io))}var wt=Mr(0);function Zl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Qc=[];function ch(){for(var t=0;t<Qc.length;t++)Qc[t]._workInProgressVersionPrimary=null;Qc.length=0}var wl=Wi.ReactCurrentDispatcher,eu=Wi.ReactCurrentBatchConfig,Vr=0,At=null,kt=null,Xt=null,Jl=!1,Oa=!1,so=0,FS=0;function en(){throw Error(pe(321))}function uh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!li(t[n],e[n]))return!1;return!0}function dh(t,e,n,i,r,s){if(Vr=s,At=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,wl.current=t===null||t.memoizedState===null?zS:HS,t=n(i,r),Oa){s=0;do{if(Oa=!1,so=0,25<=s)throw Error(pe(301));s+=1,Xt=kt=null,e.updateQueue=null,wl.current=VS,t=n(i,r)}while(Oa)}if(wl.current=Ql,e=kt!==null&&kt.next!==null,Vr=0,Xt=kt=At=null,Jl=!1,e)throw Error(pe(300));return t}function fh(){var t=so!==0;return so=0,t}function hi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xt===null?At.memoizedState=Xt=t:Xt=Xt.next=t,Xt}function Xn(){if(kt===null){var t=At.alternate;t=t!==null?t.memoizedState:null}else t=kt.next;var e=Xt===null?At.memoizedState:Xt.next;if(e!==null)Xt=e,kt=t;else{if(t===null)throw Error(pe(310));kt=t,t={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},Xt===null?At.memoizedState=Xt=t:Xt=Xt.next=t}return Xt}function ao(t,e){return typeof e=="function"?e(t):e}function tu(t){var e=Xn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=kt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var u=c.lane;if((Vr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=h,a=i):l=l.next=h,At.lanes|=u,Gr|=u}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,li(i,e.memoizedState)||(Sn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,At.lanes|=s,Gr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function nu(t){var e=Xn(),n=e.queue;if(n===null)throw Error(pe(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);li(s,e.memoizedState)||(Sn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Y0(){}function j0(t,e){var n=At,i=Xn(),r=e(),s=!li(i.memoizedState,r);if(s&&(i.memoizedState=r,Sn=!0),i=i.queue,hh(K0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Xt!==null&&Xt.memoizedState.tag&1){if(n.flags|=2048,oo(9,$0.bind(null,n,i,r,e),void 0,null),Yt===null)throw Error(pe(349));Vr&30||q0(n,e,r)}return r}function q0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function $0(t,e,n,i){e.value=n,e.getSnapshot=i,Z0(e)&&J0(t)}function K0(t,e,n){return n(function(){Z0(e)&&J0(t)})}function Z0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!li(t,n)}catch{return!0}}function J0(t){var e=Hi(t,1);e!==null&&ai(e,t,1,-1)}function Vp(t){var e=hi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ao,lastRenderedState:t},e.queue=t,t=t.dispatch=kS.bind(null,At,t),[e.memoizedState,t]}function oo(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=At.updateQueue,e===null?(e={lastEffect:null,stores:null},At.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Q0(){return Xn().memoizedState}function Tl(t,e,n,i){var r=hi();At.flags|=t,r.memoizedState=oo(1|e,n,void 0,i===void 0?null:i)}function Sc(t,e,n,i){var r=Xn();i=i===void 0?null:i;var s=void 0;if(kt!==null){var a=kt.memoizedState;if(s=a.destroy,i!==null&&uh(i,a.deps)){r.memoizedState=oo(e,n,s,i);return}}At.flags|=t,r.memoizedState=oo(1|e,n,s,i)}function Gp(t,e){return Tl(8390656,8,t,e)}function hh(t,e){return Sc(2048,8,t,e)}function ev(t,e){return Sc(4,2,t,e)}function tv(t,e){return Sc(4,4,t,e)}function nv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function iv(t,e,n){return n=n!=null?n.concat([t]):null,Sc(4,4,nv.bind(null,e,t),n)}function ph(){}function rv(t,e){var n=Xn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&uh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function sv(t,e){var n=Xn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&uh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function av(t,e,n){return Vr&21?(li(n,e)||(n=d0(),At.lanes|=n,Gr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Sn=!0),t.memoizedState=n)}function OS(t,e){var n=ft;ft=n!==0&&4>n?n:4,t(!0);var i=eu.transition;eu.transition={};try{t(!1),e()}finally{ft=n,eu.transition=i}}function ov(){return Xn().memoizedState}function BS(t,e,n){var i=mr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},lv(t))cv(e,n);else if(n=G0(t,e,n,i),n!==null){var r=dn();ai(n,t,i,r),uv(n,e,i)}}function kS(t,e,n){var i=mr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(lv(t))cv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,li(o,a)){var l=e.interleaved;l===null?(r.next=r,sh(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=G0(t,e,r,i),n!==null&&(r=dn(),ai(n,t,i,r),uv(n,e,i))}}function lv(t){var e=t.alternate;return t===At||e!==null&&e===At}function cv(t,e){Oa=Jl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function uv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Xf(t,n)}}var Ql={readContext:Wn,useCallback:en,useContext:en,useEffect:en,useImperativeHandle:en,useInsertionEffect:en,useLayoutEffect:en,useMemo:en,useReducer:en,useRef:en,useState:en,useDebugValue:en,useDeferredValue:en,useTransition:en,useMutableSource:en,useSyncExternalStore:en,useId:en,unstable_isNewReconciler:!1},zS={readContext:Wn,useCallback:function(t,e){return hi().memoizedState=[t,e===void 0?null:e],t},useContext:Wn,useEffect:Gp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Tl(4194308,4,nv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Tl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Tl(4,2,t,e)},useMemo:function(t,e){var n=hi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=hi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=BS.bind(null,At,t),[i.memoizedState,t]},useRef:function(t){var e=hi();return t={current:t},e.memoizedState=t},useState:Vp,useDebugValue:ph,useDeferredValue:function(t){return hi().memoizedState=t},useTransition:function(){var t=Vp(!1),e=t[0];return t=OS.bind(null,t[1]),hi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=At,r=hi();if(Et){if(n===void 0)throw Error(pe(407));n=n()}else{if(n=e(),Yt===null)throw Error(pe(349));Vr&30||q0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Gp(K0.bind(null,i,s,t),[t]),i.flags|=2048,oo(9,$0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=hi(),e=Yt.identifierPrefix;if(Et){var n=Ii,i=Di;n=(i&~(1<<32-si(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=so++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=FS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},HS={readContext:Wn,useCallback:rv,useContext:Wn,useEffect:hh,useImperativeHandle:iv,useInsertionEffect:ev,useLayoutEffect:tv,useMemo:sv,useReducer:tu,useRef:Q0,useState:function(){return tu(ao)},useDebugValue:ph,useDeferredValue:function(t){var e=Xn();return av(e,kt.memoizedState,t)},useTransition:function(){var t=tu(ao)[0],e=Xn().memoizedState;return[t,e]},useMutableSource:Y0,useSyncExternalStore:j0,useId:ov,unstable_isNewReconciler:!1},VS={readContext:Wn,useCallback:rv,useContext:Wn,useEffect:hh,useImperativeHandle:iv,useInsertionEffect:ev,useLayoutEffect:tv,useMemo:sv,useReducer:nu,useRef:Q0,useState:function(){return nu(ao)},useDebugValue:ph,useDeferredValue:function(t){var e=Xn();return kt===null?e.memoizedState=t:av(e,kt.memoizedState,t)},useTransition:function(){var t=nu(ao)[0],e=Xn().memoizedState;return[t,e]},useMutableSource:Y0,useSyncExternalStore:j0,useId:ov,unstable_isNewReconciler:!1};function Jn(t,e){if(t&&t.defaultProps){e=Ct({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Cd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Ct({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var yc={isMounted:function(t){return(t=t._reactInternals)?$r(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=dn(),r=mr(t),s=Fi(i,r);s.payload=e,n!=null&&(s.callback=n),e=hr(t,s,r),e!==null&&(ai(e,t,r,i),El(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=dn(),r=mr(t),s=Fi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=hr(t,s,r),e!==null&&(ai(e,t,r,i),El(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=dn(),i=mr(t),r=Fi(n,i);r.tag=2,e!=null&&(r.callback=e),e=hr(t,r,i),e!==null&&(ai(e,t,i,n),El(e,t,i))}};function Wp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Qa(n,i)||!Qa(r,s):!0}function dv(t,e,n){var i=!1,r=xr,s=e.contextType;return typeof s=="object"&&s!==null?s=Wn(s):(r=Mn(e)?zr:on.current,i=e.contextTypes,s=(i=i!=null)?Hs(t,r):xr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=yc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Xp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&yc.enqueueReplaceState(e,e.state,null)}function Rd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},ah(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Wn(s):(s=Mn(e)?zr:on.current,r.context=Hs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Cd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&yc.enqueueReplaceState(r,r.state,null),Kl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Xs(t,e){try{var n="",i=e;do n+=gx(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function iu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function bd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var GS=typeof WeakMap=="function"?WeakMap:Map;function fv(t,e,n){n=Fi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){tc||(tc=!0,kd=i),bd(t,e)},n}function hv(t,e,n){n=Fi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){bd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){bd(t,e),typeof i!="function"&&(pr===null?pr=new Set([this]):pr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Yp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new GS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=iy.bind(null,t,e,n),e.then(t,t))}function jp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function qp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Fi(-1,1),e.tag=2,hr(n,e,1))),n.lanes|=1),t)}var WS=Wi.ReactCurrentOwner,Sn=!1;function un(t,e,n,i){e.child=t===null?V0(e,null,n,i):Gs(e,t.child,n,i)}function $p(t,e,n,i,r){n=n.render;var s=e.ref;return Fs(e,r),i=dh(t,e,n,i,s,r),n=fh(),t!==null&&!Sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(Et&&n&&Qf(e),e.flags|=1,un(t,e,i,r),e.child)}function Kp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Mh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,pv(t,e,s,i,r)):(t=bl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Qa,n(a,i)&&t.ref===e.ref)return Vi(t,e,r)}return e.flags|=1,t=gr(s,i),t.ref=e.ref,t.return=e,e.child=t}function pv(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Qa(s,i)&&t.ref===e.ref)if(Sn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Sn=!0);else return e.lanes=t.lanes,Vi(t,e,r)}return Pd(t,e,n,i,r)}function mv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},vt(Ps,Rn),Rn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,vt(Ps,Rn),Rn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,vt(Ps,Rn),Rn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,vt(Ps,Rn),Rn|=i;return un(t,e,r,n),e.child}function gv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Pd(t,e,n,i,r){var s=Mn(n)?zr:on.current;return s=Hs(e,s),Fs(e,r),n=dh(t,e,n,i,s,r),i=fh(),t!==null&&!Sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(Et&&i&&Qf(e),e.flags|=1,un(t,e,n,r),e.child)}function Zp(t,e,n,i,r){if(Mn(n)){var s=!0;Xl(e)}else s=!1;if(Fs(e,r),e.stateNode===null)Al(t,e),dv(e,n,i),Rd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Wn(c):(c=Mn(n)?zr:on.current,c=Hs(e,c));var u=n.getDerivedStateFromProps,h=typeof u=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&Xp(e,a,i,c),nr=!1;var d=e.memoizedState;a.state=d,Kl(e,i,a,r),l=e.memoizedState,o!==i||d!==l||yn.current||nr?(typeof u=="function"&&(Cd(e,n,u,i),l=e.memoizedState),(o=nr||Wp(e,n,o,i,d,l,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,W0(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Jn(e.type,o),a.props=c,h=e.pendingProps,d=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Wn(l):(l=Mn(n)?zr:on.current,l=Hs(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||d!==l)&&Xp(e,a,i,l),nr=!1,d=e.memoizedState,a.state=d,Kl(e,i,a,r);var v=e.memoizedState;o!==h||d!==v||yn.current||nr?(typeof p=="function"&&(Cd(e,n,p,i),v=e.memoizedState),(c=nr||Wp(e,n,c,i,d,v,l)||!1)?(u||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,v,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,v,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),a.props=i,a.state=v,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return Ld(t,e,n,i,s,r)}function Ld(t,e,n,i,r,s){gv(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Fp(e,n,!1),Vi(t,e,s);i=e.stateNode,WS.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Gs(e,t.child,null,s),e.child=Gs(e,null,o,s)):un(t,e,o,s),e.memoizedState=i.state,r&&Fp(e,n,!0),e.child}function vv(t){var e=t.stateNode;e.pendingContext?Up(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Up(t,e.context,!1),oh(t,e.containerInfo)}function Jp(t,e,n,i,r){return Vs(),th(r),e.flags|=256,un(t,e,n,i),e.child}var Nd={dehydrated:null,treeContext:null,retryLane:0};function Dd(t){return{baseLanes:t,cachePool:null,transitions:null}}function _v(t,e,n){var i=e.pendingProps,r=wt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),vt(wt,r&1),t===null)return Td(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=wc(a,i,0,null),t=kr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Dd(n),e.memoizedState=Nd,t):mh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return XS(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=gr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=gr(o,s):(s=kr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Dd(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Nd,i}return s=t.child,t=s.sibling,i=gr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function mh(t,e){return e=wc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ho(t,e,n,i){return i!==null&&th(i),Gs(e,t.child,null,n),t=mh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function XS(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=iu(Error(pe(422))),Ho(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=wc({mode:"visible",children:i.children},r,0,null),s=kr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Gs(e,t.child,null,a),e.child.memoizedState=Dd(a),e.memoizedState=Nd,s);if(!(e.mode&1))return Ho(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(pe(419)),i=iu(s,i,void 0),Ho(t,e,a,i)}if(o=(a&t.childLanes)!==0,Sn||o){if(i=Yt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Hi(t,r),ai(i,t,r,-1))}return yh(),i=iu(Error(pe(421))),Ho(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=ry.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Ln=fr(r.nextSibling),Nn=e,Et=!0,ei=null,t!==null&&(kn[zn++]=Di,kn[zn++]=Ii,kn[zn++]=Hr,Di=t.id,Ii=t.overflow,Hr=e),e=mh(e,i.children),e.flags|=4096,e)}function Qp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Ad(t.return,e,n)}function ru(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function xv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(un(t,e,i.children,n),i=wt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Qp(t,n,e);else if(t.tag===19)Qp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(vt(wt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Zl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),ru(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Zl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}ru(e,!0,n,null,s);break;case"together":ru(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Al(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Vi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Gr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(pe(153));if(e.child!==null){for(t=e.child,n=gr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=gr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function YS(t,e,n){switch(e.tag){case 3:vv(e),Vs();break;case 5:X0(e);break;case 1:Mn(e.type)&&Xl(e);break;case 4:oh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;vt(ql,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(vt(wt,wt.current&1),e.flags|=128,null):n&e.child.childLanes?_v(t,e,n):(vt(wt,wt.current&1),t=Vi(t,e,n),t!==null?t.sibling:null);vt(wt,wt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return xv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),vt(wt,wt.current),i)break;return null;case 22:case 23:return e.lanes=0,mv(t,e,n)}return Vi(t,e,n)}var Sv,Id,yv,Mv;Sv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Id=function(){};yv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Ur(_i.current);var s=null;switch(n){case"input":r=nd(t,r),i=nd(t,i),s=[];break;case"select":r=Ct({},r,{value:void 0}),i=Ct({},i,{value:void 0}),s=[];break;case"textarea":r=sd(t,r),i=sd(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Gl)}od(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ya.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ya.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&St("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Mv=function(t,e,n,i){n!==i&&(e.flags|=4)};function ua(t,e){if(!Et)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function tn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function jS(t,e,n){var i=e.pendingProps;switch(eh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return tn(e),null;case 1:return Mn(e.type)&&Wl(),tn(e),null;case 3:return i=e.stateNode,Ws(),yt(yn),yt(on),ch(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ko(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ei!==null&&(Vd(ei),ei=null))),Id(t,e),tn(e),null;case 5:lh(e);var r=Ur(ro.current);if(n=e.type,t!==null&&e.stateNode!=null)yv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(pe(166));return tn(e),null}if(t=Ur(_i.current),ko(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[mi]=e,i[no]=s,t=(e.mode&1)!==0,n){case"dialog":St("cancel",i),St("close",i);break;case"iframe":case"object":case"embed":St("load",i);break;case"video":case"audio":for(r=0;r<Ra.length;r++)St(Ra[r],i);break;case"source":St("error",i);break;case"img":case"image":case"link":St("error",i),St("load",i);break;case"details":St("toggle",i);break;case"input":lp(i,s),St("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},St("invalid",i);break;case"textarea":up(i,s),St("invalid",i)}od(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Bo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Bo(i.textContent,o,t),r=["children",""+o]):Ya.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&St("scroll",i)}switch(n){case"input":Po(i),cp(i,s,!0);break;case"textarea":Po(i),dp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Gl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Kg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[mi]=e,t[no]=i,Sv(t,e,!1,!1),e.stateNode=t;e:{switch(a=ld(n,i),n){case"dialog":St("cancel",t),St("close",t),r=i;break;case"iframe":case"object":case"embed":St("load",t),r=i;break;case"video":case"audio":for(r=0;r<Ra.length;r++)St(Ra[r],t);r=i;break;case"source":St("error",t),r=i;break;case"img":case"image":case"link":St("error",t),St("load",t),r=i;break;case"details":St("toggle",t),r=i;break;case"input":lp(t,i),r=nd(t,i),St("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Ct({},i,{value:void 0}),St("invalid",t);break;case"textarea":up(t,i),r=sd(t,i),St("invalid",t);break;default:r=i}od(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Qg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Zg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&ja(t,l):typeof l=="number"&&ja(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ya.hasOwnProperty(s)?l!=null&&s==="onScroll"&&St("scroll",t):l!=null&&kf(t,s,l,a))}switch(n){case"input":Po(t),cp(t,i,!1);break;case"textarea":Po(t),dp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+_r(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ns(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ns(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Gl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return tn(e),null;case 6:if(t&&e.stateNode!=null)Mv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(pe(166));if(n=Ur(ro.current),Ur(_i.current),ko(e)){if(i=e.stateNode,n=e.memoizedProps,i[mi]=e,(s=i.nodeValue!==n)&&(t=Nn,t!==null))switch(t.tag){case 3:Bo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Bo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[mi]=e,e.stateNode=i}return tn(e),null;case 13:if(yt(wt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Et&&Ln!==null&&e.mode&1&&!(e.flags&128))z0(),Vs(),e.flags|=98560,s=!1;else if(s=ko(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(pe(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(pe(317));s[mi]=e}else Vs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;tn(e),s=!1}else ei!==null&&(Vd(ei),ei=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||wt.current&1?zt===0&&(zt=3):yh())),e.updateQueue!==null&&(e.flags|=4),tn(e),null);case 4:return Ws(),Id(t,e),t===null&&eo(e.stateNode.containerInfo),tn(e),null;case 10:return rh(e.type._context),tn(e),null;case 17:return Mn(e.type)&&Wl(),tn(e),null;case 19:if(yt(wt),s=e.memoizedState,s===null)return tn(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)ua(s,!1);else{if(zt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Zl(t),a!==null){for(e.flags|=128,ua(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return vt(wt,wt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Nt()>Ys&&(e.flags|=128,i=!0,ua(s,!1),e.lanes=4194304)}else{if(!i)if(t=Zl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ua(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!Et)return tn(e),null}else 2*Nt()-s.renderingStartTime>Ys&&n!==1073741824&&(e.flags|=128,i=!0,ua(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Nt(),e.sibling=null,n=wt.current,vt(wt,i?n&1|2:n&1),e):(tn(e),null);case 22:case 23:return Sh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Rn&1073741824&&(tn(e),e.subtreeFlags&6&&(e.flags|=8192)):tn(e),null;case 24:return null;case 25:return null}throw Error(pe(156,e.tag))}function qS(t,e){switch(eh(e),e.tag){case 1:return Mn(e.type)&&Wl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ws(),yt(yn),yt(on),ch(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return lh(e),null;case 13:if(yt(wt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(pe(340));Vs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(wt),null;case 4:return Ws(),null;case 10:return rh(e.type._context),null;case 22:case 23:return Sh(),null;case 24:return null;default:return null}}var Vo=!1,sn=!1,$S=typeof WeakSet=="function"?WeakSet:Set,Pe=null;function bs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){bt(t,e,i)}else n.current=null}function Ud(t,e,n){try{n()}catch(i){bt(t,e,i)}}var em=!1;function KS(t,e){if(_d=zl,t=C0(),Jf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,u=0,h=t,d=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(o=a+r),h!==s||i!==0&&h.nodeType!==3||(l=a+i),h.nodeType===3&&(a+=h.nodeValue.length),(p=h.firstChild)!==null;)d=h,h=p;for(;;){if(h===t)break t;if(d===n&&++c===r&&(o=a),d===s&&++u===i&&(l=a),(p=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(xd={focusedElem:t,selectionRange:n},zl=!1,Pe=e;Pe!==null;)if(e=Pe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Pe=t;else for(;Pe!==null;){e=Pe;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var E=v.memoizedProps,g=v.memoizedState,f=e.stateNode,_=f.getSnapshotBeforeUpdate(e.elementType===e.type?E:Jn(e.type,E),g);f.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(pe(163))}}catch(S){bt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,Pe=t;break}Pe=e.return}return v=em,em=!1,v}function Ba(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Ud(e,n,s)}r=r.next}while(r!==i)}}function Mc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Fd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Ev(t){var e=t.alternate;e!==null&&(t.alternate=null,Ev(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[mi],delete e[no],delete e[Md],delete e[NS],delete e[DS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function wv(t){return t.tag===5||t.tag===3||t.tag===4}function tm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||wv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Od(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Gl));else if(i!==4&&(t=t.child,t!==null))for(Od(t,e,n),t=t.sibling;t!==null;)Od(t,e,n),t=t.sibling}function Bd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Bd(t,e,n),t=t.sibling;t!==null;)Bd(t,e,n),t=t.sibling}var jt=null,Qn=!1;function qi(t,e,n){for(n=n.child;n!==null;)Tv(t,e,n),n=n.sibling}function Tv(t,e,n){if(vi&&typeof vi.onCommitFiberUnmount=="function")try{vi.onCommitFiberUnmount(pc,n)}catch{}switch(n.tag){case 5:sn||bs(n,e);case 6:var i=jt,r=Qn;jt=null,qi(t,e,n),jt=i,Qn=r,jt!==null&&(Qn?(t=jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):jt.removeChild(n.stateNode));break;case 18:jt!==null&&(Qn?(t=jt,n=n.stateNode,t.nodeType===8?Zc(t.parentNode,n):t.nodeType===1&&Zc(t,n),Za(t)):Zc(jt,n.stateNode));break;case 4:i=jt,r=Qn,jt=n.stateNode.containerInfo,Qn=!0,qi(t,e,n),jt=i,Qn=r;break;case 0:case 11:case 14:case 15:if(!sn&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Ud(n,e,a),r=r.next}while(r!==i)}qi(t,e,n);break;case 1:if(!sn&&(bs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){bt(n,e,o)}qi(t,e,n);break;case 21:qi(t,e,n);break;case 22:n.mode&1?(sn=(i=sn)||n.memoizedState!==null,qi(t,e,n),sn=i):qi(t,e,n);break;default:qi(t,e,n)}}function nm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new $S),e.forEach(function(i){var r=sy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function qn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:jt=o.stateNode,Qn=!1;break e;case 3:jt=o.stateNode.containerInfo,Qn=!0;break e;case 4:jt=o.stateNode.containerInfo,Qn=!0;break e}o=o.return}if(jt===null)throw Error(pe(160));Tv(s,a,r),jt=null,Qn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){bt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Av(e,t),e=e.sibling}function Av(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(qn(e,t),ui(t),i&4){try{Ba(3,t,t.return),Mc(3,t)}catch(E){bt(t,t.return,E)}try{Ba(5,t,t.return)}catch(E){bt(t,t.return,E)}}break;case 1:qn(e,t),ui(t),i&512&&n!==null&&bs(n,n.return);break;case 5:if(qn(e,t),ui(t),i&512&&n!==null&&bs(n,n.return),t.flags&32){var r=t.stateNode;try{ja(r,"")}catch(E){bt(t,t.return,E)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&qg(r,s),ld(o,a);var c=ld(o,s);for(a=0;a<l.length;a+=2){var u=l[a],h=l[a+1];u==="style"?Qg(r,h):u==="dangerouslySetInnerHTML"?Zg(r,h):u==="children"?ja(r,h):kf(r,u,h,c)}switch(o){case"input":id(r,s);break;case"textarea":$g(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Ns(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?Ns(r,!!s.multiple,s.defaultValue,!0):Ns(r,!!s.multiple,s.multiple?[]:"",!1))}r[no]=s}catch(E){bt(t,t.return,E)}}break;case 6:if(qn(e,t),ui(t),i&4){if(t.stateNode===null)throw Error(pe(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(E){bt(t,t.return,E)}}break;case 3:if(qn(e,t),ui(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Za(e.containerInfo)}catch(E){bt(t,t.return,E)}break;case 4:qn(e,t),ui(t);break;case 13:qn(e,t),ui(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(_h=Nt())),i&4&&nm(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(sn=(c=sn)||u,qn(e,t),sn=c):qn(e,t),ui(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(Pe=t,u=t.child;u!==null;){for(h=Pe=u;Pe!==null;){switch(d=Pe,p=d.child,d.tag){case 0:case 11:case 14:case 15:Ba(4,d,d.return);break;case 1:bs(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(E){bt(i,n,E)}}break;case 5:bs(d,d.return);break;case 22:if(d.memoizedState!==null){rm(h);continue}}p!==null?(p.return=d,Pe=p):rm(h)}u=u.sibling}e:for(u=null,h=t;;){if(h.tag===5){if(u===null){u=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Jg("display",a))}catch(E){bt(t,t.return,E)}}}else if(h.tag===6){if(u===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(E){bt(t,t.return,E)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:qn(e,t),ui(t),i&4&&nm(t);break;case 21:break;default:qn(e,t),ui(t)}}function ui(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(wv(n)){var i=n;break e}n=n.return}throw Error(pe(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(ja(r,""),i.flags&=-33);var s=tm(t);Bd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=tm(t);Od(t,o,a);break;default:throw Error(pe(161))}}catch(l){bt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function ZS(t,e,n){Pe=t,Cv(t)}function Cv(t,e,n){for(var i=(t.mode&1)!==0;Pe!==null;){var r=Pe,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Vo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||sn;o=Vo;var c=sn;if(Vo=a,(sn=l)&&!c)for(Pe=r;Pe!==null;)a=Pe,l=a.child,a.tag===22&&a.memoizedState!==null?sm(r):l!==null?(l.return=a,Pe=l):sm(r);for(;s!==null;)Pe=s,Cv(s),s=s.sibling;Pe=r,Vo=o,sn=c}im(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Pe=s):im(t)}}function im(t){for(;Pe!==null;){var e=Pe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:sn||Mc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!sn)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Jn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Hp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Hp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var h=u.dehydrated;h!==null&&Za(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(pe(163))}sn||e.flags&512&&Fd(e)}catch(d){bt(e,e.return,d)}}if(e===t){Pe=null;break}if(n=e.sibling,n!==null){n.return=e.return,Pe=n;break}Pe=e.return}}function rm(t){for(;Pe!==null;){var e=Pe;if(e===t){Pe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Pe=n;break}Pe=e.return}}function sm(t){for(;Pe!==null;){var e=Pe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Mc(4,e)}catch(l){bt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){bt(e,r,l)}}var s=e.return;try{Fd(e)}catch(l){bt(e,s,l)}break;case 5:var a=e.return;try{Fd(e)}catch(l){bt(e,a,l)}}}catch(l){bt(e,e.return,l)}if(e===t){Pe=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Pe=o;break}Pe=e.return}}var JS=Math.ceil,ec=Wi.ReactCurrentDispatcher,gh=Wi.ReactCurrentOwner,Vn=Wi.ReactCurrentBatchConfig,st=0,Yt=null,Ot=null,Kt=0,Rn=0,Ps=Mr(0),zt=0,lo=null,Gr=0,Ec=0,vh=0,ka=null,xn=null,_h=0,Ys=1/0,Pi=null,tc=!1,kd=null,pr=null,Go=!1,lr=null,nc=0,za=0,zd=null,Cl=-1,Rl=0;function dn(){return st&6?Nt():Cl!==-1?Cl:Cl=Nt()}function mr(t){return t.mode&1?st&2&&Kt!==0?Kt&-Kt:US.transition!==null?(Rl===0&&(Rl=d0()),Rl):(t=ft,t!==0||(t=window.event,t=t===void 0?16:_0(t.type)),t):1}function ai(t,e,n,i){if(50<za)throw za=0,zd=null,Error(pe(185));go(t,n,i),(!(st&2)||t!==Yt)&&(t===Yt&&(!(st&2)&&(Ec|=n),zt===4&&sr(t,Kt)),En(t,i),n===1&&st===0&&!(e.mode&1)&&(Ys=Nt()+500,xc&&Er()))}function En(t,e){var n=t.callbackNode;Ux(t,e);var i=kl(t,t===Yt?Kt:0);if(i===0)n!==null&&pp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&pp(n),e===1)t.tag===0?IS(am.bind(null,t)):O0(am.bind(null,t)),PS(function(){!(st&6)&&Er()}),n=null;else{switch(f0(i)){case 1:n=Wf;break;case 4:n=c0;break;case 16:n=Bl;break;case 536870912:n=u0;break;default:n=Bl}n=Uv(n,Rv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Rv(t,e){if(Cl=-1,Rl=0,st&6)throw Error(pe(327));var n=t.callbackNode;if(Os()&&t.callbackNode!==n)return null;var i=kl(t,t===Yt?Kt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=ic(t,i);else{e=i;var r=st;st|=2;var s=Pv();(Yt!==t||Kt!==e)&&(Pi=null,Ys=Nt()+500,Br(t,e));do try{ty();break}catch(o){bv(t,o)}while(!0);ih(),ec.current=s,st=r,Ot!==null?e=0:(Yt=null,Kt=0,e=zt)}if(e!==0){if(e===2&&(r=hd(t),r!==0&&(i=r,e=Hd(t,r))),e===1)throw n=lo,Br(t,0),sr(t,i),En(t,Nt()),n;if(e===6)sr(t,i);else{if(r=t.current.alternate,!(i&30)&&!QS(r)&&(e=ic(t,i),e===2&&(s=hd(t),s!==0&&(i=s,e=Hd(t,s))),e===1))throw n=lo,Br(t,0),sr(t,i),En(t,Nt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(pe(345));case 2:Nr(t,xn,Pi);break;case 3:if(sr(t,i),(i&130023424)===i&&(e=_h+500-Nt(),10<e)){if(kl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){dn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=yd(Nr.bind(null,t,xn,Pi),e);break}Nr(t,xn,Pi);break;case 4:if(sr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-si(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Nt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*JS(i/1960))-i,10<i){t.timeoutHandle=yd(Nr.bind(null,t,xn,Pi),i);break}Nr(t,xn,Pi);break;case 5:Nr(t,xn,Pi);break;default:throw Error(pe(329))}}}return En(t,Nt()),t.callbackNode===n?Rv.bind(null,t):null}function Hd(t,e){var n=ka;return t.current.memoizedState.isDehydrated&&(Br(t,e).flags|=256),t=ic(t,e),t!==2&&(e=xn,xn=n,e!==null&&Vd(e)),t}function Vd(t){xn===null?xn=t:xn.push.apply(xn,t)}function QS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!li(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function sr(t,e){for(e&=~vh,e&=~Ec,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-si(e),i=1<<n;t[n]=-1,e&=~i}}function am(t){if(st&6)throw Error(pe(327));Os();var e=kl(t,0);if(!(e&1))return En(t,Nt()),null;var n=ic(t,e);if(t.tag!==0&&n===2){var i=hd(t);i!==0&&(e=i,n=Hd(t,i))}if(n===1)throw n=lo,Br(t,0),sr(t,e),En(t,Nt()),n;if(n===6)throw Error(pe(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Nr(t,xn,Pi),En(t,Nt()),null}function xh(t,e){var n=st;st|=1;try{return t(e)}finally{st=n,st===0&&(Ys=Nt()+500,xc&&Er())}}function Wr(t){lr!==null&&lr.tag===0&&!(st&6)&&Os();var e=st;st|=1;var n=Vn.transition,i=ft;try{if(Vn.transition=null,ft=1,t)return t()}finally{ft=i,Vn.transition=n,st=e,!(st&6)&&Er()}}function Sh(){Rn=Ps.current,yt(Ps)}function Br(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,bS(n)),Ot!==null)for(n=Ot.return;n!==null;){var i=n;switch(eh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Wl();break;case 3:Ws(),yt(yn),yt(on),ch();break;case 5:lh(i);break;case 4:Ws();break;case 13:yt(wt);break;case 19:yt(wt);break;case 10:rh(i.type._context);break;case 22:case 23:Sh()}n=n.return}if(Yt=t,Ot=t=gr(t.current,null),Kt=Rn=e,zt=0,lo=null,vh=Ec=Gr=0,xn=ka=null,Ir!==null){for(e=0;e<Ir.length;e++)if(n=Ir[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Ir=null}return t}function bv(t,e){do{var n=Ot;try{if(ih(),wl.current=Ql,Jl){for(var i=At.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Jl=!1}if(Vr=0,Xt=kt=At=null,Oa=!1,so=0,gh.current=null,n===null||n.return===null){zt=1,lo=e,Ot=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Kt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=o,h=u.tag;if(!(u.mode&1)&&(h===0||h===11||h===15)){var d=u.alternate;d?(u.updateQueue=d.updateQueue,u.memoizedState=d.memoizedState,u.lanes=d.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=jp(a);if(p!==null){p.flags&=-257,qp(p,a,o,s,e),p.mode&1&&Yp(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var E=new Set;E.add(l),e.updateQueue=E}else v.add(l);break e}else{if(!(e&1)){Yp(s,c,e),yh();break e}l=Error(pe(426))}}else if(Et&&o.mode&1){var g=jp(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),qp(g,a,o,s,e),th(Xs(l,o));break e}}s=l=Xs(l,o),zt!==4&&(zt=2),ka===null?ka=[s]:ka.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var f=fv(s,l,e);zp(s,f);break e;case 1:o=l;var _=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(pr===null||!pr.has(y)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=hv(s,o,e);zp(s,S);break e}}s=s.return}while(s!==null)}Nv(n)}catch(T){e=T,Ot===n&&n!==null&&(Ot=n=n.return);continue}break}while(!0)}function Pv(){var t=ec.current;return ec.current=Ql,t===null?Ql:t}function yh(){(zt===0||zt===3||zt===2)&&(zt=4),Yt===null||!(Gr&268435455)&&!(Ec&268435455)||sr(Yt,Kt)}function ic(t,e){var n=st;st|=2;var i=Pv();(Yt!==t||Kt!==e)&&(Pi=null,Br(t,e));do try{ey();break}catch(r){bv(t,r)}while(!0);if(ih(),st=n,ec.current=i,Ot!==null)throw Error(pe(261));return Yt=null,Kt=0,zt}function ey(){for(;Ot!==null;)Lv(Ot)}function ty(){for(;Ot!==null&&!Ax();)Lv(Ot)}function Lv(t){var e=Iv(t.alternate,t,Rn);t.memoizedProps=t.pendingProps,e===null?Nv(t):Ot=e,gh.current=null}function Nv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=qS(n,e),n!==null){n.flags&=32767,Ot=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{zt=6,Ot=null;return}}else if(n=jS(n,e,Rn),n!==null){Ot=n;return}if(e=e.sibling,e!==null){Ot=e;return}Ot=e=t}while(e!==null);zt===0&&(zt=5)}function Nr(t,e,n){var i=ft,r=Vn.transition;try{Vn.transition=null,ft=1,ny(t,e,n,i)}finally{Vn.transition=r,ft=i}return null}function ny(t,e,n,i){do Os();while(lr!==null);if(st&6)throw Error(pe(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(pe(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Fx(t,s),t===Yt&&(Ot=Yt=null,Kt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Go||(Go=!0,Uv(Bl,function(){return Os(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Vn.transition,Vn.transition=null;var a=ft;ft=1;var o=st;st|=4,gh.current=null,KS(t,n),Av(n,t),MS(xd),zl=!!_d,xd=_d=null,t.current=n,ZS(n),Cx(),st=o,ft=a,Vn.transition=s}else t.current=n;if(Go&&(Go=!1,lr=t,nc=r),s=t.pendingLanes,s===0&&(pr=null),Px(n.stateNode),En(t,Nt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(tc)throw tc=!1,t=kd,kd=null,t;return nc&1&&t.tag!==0&&Os(),s=t.pendingLanes,s&1?t===zd?za++:(za=0,zd=t):za=0,Er(),null}function Os(){if(lr!==null){var t=f0(nc),e=Vn.transition,n=ft;try{if(Vn.transition=null,ft=16>t?16:t,lr===null)var i=!1;else{if(t=lr,lr=null,nc=0,st&6)throw Error(pe(331));var r=st;for(st|=4,Pe=t.current;Pe!==null;){var s=Pe,a=s.child;if(Pe.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Pe=c;Pe!==null;){var u=Pe;switch(u.tag){case 0:case 11:case 15:Ba(8,u,s)}var h=u.child;if(h!==null)h.return=u,Pe=h;else for(;Pe!==null;){u=Pe;var d=u.sibling,p=u.return;if(Ev(u),u===c){Pe=null;break}if(d!==null){d.return=p,Pe=d;break}Pe=p}}}var v=s.alternate;if(v!==null){var E=v.child;if(E!==null){v.child=null;do{var g=E.sibling;E.sibling=null,E=g}while(E!==null)}}Pe=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Pe=a;else e:for(;Pe!==null;){if(s=Pe,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ba(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,Pe=f;break e}Pe=s.return}}var _=t.current;for(Pe=_;Pe!==null;){a=Pe;var y=a.child;if(a.subtreeFlags&2064&&y!==null)y.return=a,Pe=y;else e:for(a=_;Pe!==null;){if(o=Pe,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Mc(9,o)}}catch(T){bt(o,o.return,T)}if(o===a){Pe=null;break e}var S=o.sibling;if(S!==null){S.return=o.return,Pe=S;break e}Pe=o.return}}if(st=r,Er(),vi&&typeof vi.onPostCommitFiberRoot=="function")try{vi.onPostCommitFiberRoot(pc,t)}catch{}i=!0}return i}finally{ft=n,Vn.transition=e}}return!1}function om(t,e,n){e=Xs(n,e),e=fv(t,e,1),t=hr(t,e,1),e=dn(),t!==null&&(go(t,1,e),En(t,e))}function bt(t,e,n){if(t.tag===3)om(t,t,n);else for(;e!==null;){if(e.tag===3){om(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(pr===null||!pr.has(i))){t=Xs(n,t),t=hv(e,t,1),e=hr(e,t,1),t=dn(),e!==null&&(go(e,1,t),En(e,t));break}}e=e.return}}function iy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=dn(),t.pingedLanes|=t.suspendedLanes&n,Yt===t&&(Kt&n)===n&&(zt===4||zt===3&&(Kt&130023424)===Kt&&500>Nt()-_h?Br(t,0):vh|=n),En(t,e)}function Dv(t,e){e===0&&(t.mode&1?(e=Do,Do<<=1,!(Do&130023424)&&(Do=4194304)):e=1);var n=dn();t=Hi(t,e),t!==null&&(go(t,e,n),En(t,n))}function ry(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Dv(t,n)}function sy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(pe(314))}i!==null&&i.delete(e),Dv(t,n)}var Iv;Iv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||yn.current)Sn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Sn=!1,YS(t,e,n);Sn=!!(t.flags&131072)}else Sn=!1,Et&&e.flags&1048576&&B0(e,jl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Al(t,e),t=e.pendingProps;var r=Hs(e,on.current);Fs(e,n),r=dh(null,e,i,t,r,n);var s=fh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Mn(i)?(s=!0,Xl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,ah(e),r.updater=yc,e.stateNode=r,r._reactInternals=e,Rd(e,i,t,n),e=Ld(null,e,i,!0,s,n)):(e.tag=0,Et&&s&&Qf(e),un(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Al(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=oy(i),t=Jn(i,t),r){case 0:e=Pd(null,e,i,t,n);break e;case 1:e=Zp(null,e,i,t,n);break e;case 11:e=$p(null,e,i,t,n);break e;case 14:e=Kp(null,e,i,Jn(i.type,t),n);break e}throw Error(pe(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Jn(i,r),Pd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Jn(i,r),Zp(t,e,i,r,n);case 3:e:{if(vv(e),t===null)throw Error(pe(387));i=e.pendingProps,s=e.memoizedState,r=s.element,W0(t,e),Kl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Xs(Error(pe(423)),e),e=Jp(t,e,i,n,r);break e}else if(i!==r){r=Xs(Error(pe(424)),e),e=Jp(t,e,i,n,r);break e}else for(Ln=fr(e.stateNode.containerInfo.firstChild),Nn=e,Et=!0,ei=null,n=V0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Vs(),i===r){e=Vi(t,e,n);break e}un(t,e,i,n)}e=e.child}return e;case 5:return X0(e),t===null&&Td(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Sd(i,r)?a=null:s!==null&&Sd(i,s)&&(e.flags|=32),gv(t,e),un(t,e,a,n),e.child;case 6:return t===null&&Td(e),null;case 13:return _v(t,e,n);case 4:return oh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Gs(e,null,i,n):un(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Jn(i,r),$p(t,e,i,r,n);case 7:return un(t,e,e.pendingProps,n),e.child;case 8:return un(t,e,e.pendingProps.children,n),e.child;case 12:return un(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,vt(ql,i._currentValue),i._currentValue=a,s!==null)if(li(s.value,a)){if(s.children===r.children&&!yn.current){e=Vi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Fi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Ad(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(pe(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Ad(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}un(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Fs(e,n),r=Wn(r),i=i(r),e.flags|=1,un(t,e,i,n),e.child;case 14:return i=e.type,r=Jn(i,e.pendingProps),r=Jn(i.type,r),Kp(t,e,i,r,n);case 15:return pv(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Jn(i,r),Al(t,e),e.tag=1,Mn(i)?(t=!0,Xl(e)):t=!1,Fs(e,n),dv(e,i,r),Rd(e,i,r,n),Ld(null,e,i,!0,t,n);case 19:return xv(t,e,n);case 22:return mv(t,e,n)}throw Error(pe(156,e.tag))};function Uv(t,e){return l0(t,e)}function ay(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Hn(t,e,n,i){return new ay(t,e,n,i)}function Mh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function oy(t){if(typeof t=="function")return Mh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Hf)return 11;if(t===Vf)return 14}return 2}function gr(t,e){var n=t.alternate;return n===null?(n=Hn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function bl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Mh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Ss:return kr(n.children,r,s,e);case zf:a=8,r|=8;break;case Ju:return t=Hn(12,n,e,r|2),t.elementType=Ju,t.lanes=s,t;case Qu:return t=Hn(13,n,e,r),t.elementType=Qu,t.lanes=s,t;case ed:return t=Hn(19,n,e,r),t.elementType=ed,t.lanes=s,t;case Xg:return wc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Gg:a=10;break e;case Wg:a=9;break e;case Hf:a=11;break e;case Vf:a=14;break e;case tr:a=16,i=null;break e}throw Error(pe(130,t==null?t:typeof t,""))}return e=Hn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function kr(t,e,n,i){return t=Hn(7,t,i,e),t.lanes=n,t}function wc(t,e,n,i){return t=Hn(22,t,i,e),t.elementType=Xg,t.lanes=n,t.stateNode={isHidden:!1},t}function su(t,e,n){return t=Hn(6,t,null,e),t.lanes=n,t}function au(t,e,n){return e=Hn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ly(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zc(0),this.expirationTimes=zc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Eh(t,e,n,i,r,s,a,o,l){return t=new ly(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Hn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ah(s),t}function cy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:xs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Fv(t){if(!t)return xr;t=t._reactInternals;e:{if($r(t)!==t||t.tag!==1)throw Error(pe(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(pe(171))}if(t.tag===1){var n=t.type;if(Mn(n))return F0(t,n,e)}return e}function Ov(t,e,n,i,r,s,a,o,l){return t=Eh(n,i,!0,t,r,s,a,o,l),t.context=Fv(null),n=t.current,i=dn(),r=mr(n),s=Fi(i,r),s.callback=e??null,hr(n,s,r),t.current.lanes=r,go(t,r,i),En(t,i),t}function Tc(t,e,n,i){var r=e.current,s=dn(),a=mr(r);return n=Fv(n),e.context===null?e.context=n:e.pendingContext=n,e=Fi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=hr(r,e,a),t!==null&&(ai(t,r,a,s),El(t,r,a)),a}function rc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function lm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function wh(t,e){lm(t,e),(t=t.alternate)&&lm(t,e)}function uy(){return null}var Bv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Th(t){this._internalRoot=t}Ac.prototype.render=Th.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(pe(409));Tc(t,e,null,null)};Ac.prototype.unmount=Th.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Wr(function(){Tc(null,t,null,null)}),e[zi]=null}};function Ac(t){this._internalRoot=t}Ac.prototype.unstable_scheduleHydration=function(t){if(t){var e=m0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<rr.length&&e!==0&&e<rr[n].priority;n++);rr.splice(n,0,t),n===0&&v0(t)}};function Ah(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Cc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function cm(){}function dy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=rc(a);s.call(c)}}var a=Ov(e,i,t,0,null,!1,!1,"",cm);return t._reactRootContainer=a,t[zi]=a.current,eo(t.nodeType===8?t.parentNode:t),Wr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=rc(l);o.call(c)}}var l=Eh(t,0,!1,null,null,!1,!1,"",cm);return t._reactRootContainer=l,t[zi]=l.current,eo(t.nodeType===8?t.parentNode:t),Wr(function(){Tc(e,l,n,i)}),l}function Rc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=rc(a);o.call(l)}}Tc(e,a,t,r)}else a=dy(n,e,t,r,i);return rc(a)}h0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ca(e.pendingLanes);n!==0&&(Xf(e,n|1),En(e,Nt()),!(st&6)&&(Ys=Nt()+500,Er()))}break;case 13:Wr(function(){var i=Hi(t,1);if(i!==null){var r=dn();ai(i,t,1,r)}}),wh(t,1)}};Yf=function(t){if(t.tag===13){var e=Hi(t,134217728);if(e!==null){var n=dn();ai(e,t,134217728,n)}wh(t,134217728)}};p0=function(t){if(t.tag===13){var e=mr(t),n=Hi(t,e);if(n!==null){var i=dn();ai(n,t,e,i)}wh(t,e)}};m0=function(){return ft};g0=function(t,e){var n=ft;try{return ft=t,e()}finally{ft=n}};ud=function(t,e,n){switch(e){case"input":if(id(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=_c(i);if(!r)throw Error(pe(90));jg(i),id(i,r)}}}break;case"textarea":$g(t,n);break;case"select":e=n.value,e!=null&&Ns(t,!!n.multiple,e,!1)}};n0=xh;i0=Wr;var fy={usingClientEntryPoint:!1,Events:[_o,ws,_c,e0,t0,xh]},da={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},hy={bundleType:da.bundleType,version:da.version,rendererPackageName:da.rendererPackageName,rendererConfig:da.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Wi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=a0(t),t===null?null:t.stateNode},findFiberByHostInstance:da.findFiberByHostInstance||uy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Wo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Wo.isDisabled&&Wo.supportsFiber)try{pc=Wo.inject(hy),vi=Wo}catch{}}In.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=fy;In.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ah(e))throw Error(pe(200));return cy(t,e,null,n)};In.createRoot=function(t,e){if(!Ah(t))throw Error(pe(299));var n=!1,i="",r=Bv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Eh(t,1,!1,null,null,n,!1,i,r),t[zi]=e.current,eo(t.nodeType===8?t.parentNode:t),new Th(e)};In.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(pe(188)):(t=Object.keys(t).join(","),Error(pe(268,t)));return t=a0(e),t=t===null?null:t.stateNode,t};In.flushSync=function(t){return Wr(t)};In.hydrate=function(t,e,n){if(!Cc(e))throw Error(pe(200));return Rc(null,t,e,!0,n)};In.hydrateRoot=function(t,e,n){if(!Ah(t))throw Error(pe(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=Bv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=Ov(e,null,t,1,n??null,r,!1,s,a),t[zi]=e.current,eo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Ac(e)};In.render=function(t,e,n){if(!Cc(e))throw Error(pe(200));return Rc(null,t,e,!1,n)};In.unmountComponentAtNode=function(t){if(!Cc(t))throw Error(pe(40));return t._reactRootContainer?(Wr(function(){Rc(null,null,t,!1,function(){t._reactRootContainer=null,t[zi]=null})}),!0):!1};In.unstable_batchedUpdates=xh;In.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Cc(n))throw Error(pe(200));if(t==null||t._reactInternals===void 0)throw Error(pe(38));return Rc(t,e,n,!1,i)};In.version="18.3.1-next-f1338f8080-20240426";function kv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kv)}catch(t){console.error(t)}}kv(),kg.exports=In;var py=kg.exports,um=py;Ku.createRoot=um.createRoot,Ku.hydrateRoot=um.hydrateRoot;const my=[{id:"learning",en:"Learning",th:"การเรียนการสอน",icon:"book",color:"#a78bfa"},{id:"space",en:"Space Usage",th:"การใช้พื้นที่",icon:"grid",color:"#818cf8"},{id:"activity",en:"Student Activity",th:"กิจกรรมนักศึกษา",icon:"users",color:"#c084fc"},{id:"resources",en:"Resources",th:"ทรัพยากร / บริการ",icon:"layers",color:"#38bdf8"},{id:"environment",en:"Environment",th:"สภาพแวดล้อม",icon:"leaf",color:"#34d399"},{id:"energy",en:"Energy",th:"พลังงาน",icon:"bolt",color:"#fbbf24"}];Object.fromEntries(my.map(t=>[t.id,t]));const gy=[{id:"morning",th:"เช้า",en:"Morning",icon:"sun-up",center:9.5,half:1.5,concurrency:.34,becauseTh:"สอดคล้องกับคาบเรียนแรกและช่วงที่นักศึกษาทยอยเข้าคณะ"},{id:"midday",th:"กลางวัน",en:"Day",icon:"sun",center:12,half:2,concurrency:.38,becauseTh:"สอดคล้องกับช่วงพักกลางวันและการเปลี่ยนคาบเรียนติดกัน"},{id:"evening",th:"เย็น",en:"Evening",icon:"moon",center:16.5,half:1.5,concurrency:.32,becauseTh:"สอดคล้องกับคาบบ่ายท้ายวันและการรวมกลุ่มทำงานส่ง"},{id:"event",th:"ช่วงกิจกรรมพิเศษ",en:"Event",icon:"calendar",center:14,half:2.5,concurrency:.46,becauseTh:"สอดคล้องกับวันที่มีกิจกรรมคณะซ้อนกับตารางเรียนปกติ"},{id:"unsure",th:"ไม่แน่ใจ",en:"Not sure",icon:"question",center:12,half:2,concurrency:.38,becauseTh:"เป็นช่วงที่ตารางสอนของคณะหนาที่สุดจากข้อมูลที่กรอกมา"}],dm=Object.fromEntries(gy.map(t=>[t.id,t])),zv=[{id:"students",th:"จำนวนนักศึกษา +15%",icon:"users",people:1.15,activity:1,usable:1},{id:"activity",th:"กิจกรรม +20%",icon:"calendar",people:1,activity:1.2,usable:1},{id:"closed",th:"พื้นที่บางส่วนใช้งานไม่ได้",icon:"alert",people:1,activity:1,usable:.85},{id:"event",th:"วันจัดกิจกรรมพิเศษ",icon:"star",people:1.12,activity:1.15,usable:1},{id:"custom",th:"กำหนดเอง",icon:"grid",people:1.1,activity:1.1,usable:1}],vy=Object.fromEntries(zv.map(t=>[t.id,t])),Xo=[{id:"class",th:"ห้องเรียน",color:"#60a5fa",demandShare:.42,capacityShare:.52,offset:-.5},{id:"group",th:"พื้นที่ทำงานกลุ่ม",color:"#34d399",demandShare:.26,capacityShare:.18,offset:.8},{id:"event",th:"พื้นที่กิจกรรม",color:"#fbbf24",demandShare:.18,capacityShare:.17,offset:1.6},{id:"lounge",th:"พื้นที่พักผ่อน",color:"#f472b6",demandShare:.14,capacityShare:.13,offset:.2}],fm=8,hm=18,_y=.5,xy=2.2,Sy=2.9,yy=32,My=2.3,Ey=.77,ou=[[0,[56,132,248]],[.35,[45,212,191]],[.6,[250,204,21]],[.8,[249,115,22]],[1,[239,68,68]]];function wy(t){const e=Math.min(1,Math.max(0,t));for(let n=1;n<ou.length;n++){const[i,r]=ou[n-1],[s,a]=ou[n];if(e>s)continue;const o=s===i?0:(e-i)/(s-i),l=r.map((c,u)=>Math.round(c+(a[u]-c)*o));return`rgb(${l[0]}, ${l[1]}, ${l[2]})`}return"rgb(239, 68, 68)"}const fa=11,lu=5.5,wi=3,Mt=12,Cn=4,Yo=.12,Hv=4,pm=[0,1,3,2,0,1,3,0,2],jo=t=>t%Cn===Cn-1,qo=t=>Math.floor(t/Cn);function Vv(t){return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function mm(t,e,n){const i=[],r=(h,d,p,v)=>i.push({dx:h,dy:d,r:p,l:v});if(t===2){const h=-e*.42;for(let d=0;d<3;d++)r((d-1)*e*.46+(n()-.5)*e*.16,h+(n()-.5)*e*.2,e*(.5+n()*.12),0);return r(e*.3,h+e*.2,e*.42,1),r(-e*.32,h-e*.22,e*.3,2),{trunk:0,puffs:i}}const s=t===1,a=s?e*.85:e*.55,o=-(a+e*(s?.95:.72)),l=s?e*.3:e*.52,c=s?e*.62:e*.3,u=s?5:7;for(let h=0;h<u;h++){const d=h/u*Math.PI*2+n()*.5;r(Math.cos(d)*l*(.6+n()*.5),Math.sin(d)*c*(.6+n()*.5),e*(s?.52:.6)*(.85+n()*.3),0)}return r(0,0,e*(s?.6:.68),0),r(e*.34,e*(s?.42:.3),e*(s?.42:.5),1),r(-e*.3,-e*(s?.5:.36),e*(s?.34:.42),2),r(-e*.05,-e*(s?.78:.56),e*.26,2),{trunk:a,puffs:i.map(h=>({...h,dy:h.dy+o}))}}const{LOTS:Ty,GROVES:Ay}=(()=>{const t=Vv(20260921),e=new Set,n=[],i=[],r=(a,o)=>a+":"+o,s=(a,o)=>a<Mt&&o<Mt&&!jo(a)&&!jo(o)&&!e.has(r(a,o));for(let a=0;a<Mt;a++)for(let o=0;o<Mt;o++){if(jo(o)||jo(a)){if(t()<.26){const c=3.8+t()*1.5,u=t()<.28?1:t()<.2?2:0;i.push({gx:o+.5,gy:a+.5,r:c,tone:t()*3|0,...mm(u,c,t)})}continue}if(e.has(r(o,a)))continue;const l=t();if(l<.64){let c=1,u=1;t()<.3&&s(o+1,a)?(c=2,e.add(r(o+1,a))):t()<.3&&s(o,a+1)&&(u=2,e.add(r(o,a+1)));const h=1+Math.floor(t()*Hv);n.push({gx:o,gy:a,w:c,d:u,lv:h,tone:t()*4|0,cap:h>=2&&t()<.55,capX:t(),capY:t()})}else if(l<.77){const c=4.4+t()*2,u=t()<.32?1:t()<.18?2:0;i.push({gx:o+.5,gy:a+.5,r:c,tone:t()*3|0,...mm(u,c,t)})}e.add(r(o,a))}return{LOTS:n,GROVES:i}})(),Cy=1.5,cu=.34,Ry=.5,Tr=(t,e,n)=>Math.min(n,Math.max(e,t)),uu=(t,e)=>Number.isFinite(t)&&t>0?t:e,ha=t=>{const e=Math.floor(t),n=Math.round((t-e)*60);return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`},du=(t,e)=>{const n=t-e,i=n<0?xy:Sy;return Math.exp(-(n*n)/(2*i*i))};function gm(t){const e=dm[t.peak]??dm.midday,n=t.focus.length?t.focus:["learning","space"],i=O=>n.includes(O),r=Math.max(uu(t.students,2500),1),s=Math.max(Math.round(uu(t.rooms,35)),1),a=Math.max(Math.round(uu(t.activities,80)),1),o=vy[t.scenario]??zv[0],l=`${ha(e.center-e.half)} – ${ha(e.center+e.half)}`,c=Math.round(r*e.concurrency),u=s*yy,h=Tr(a/(s*My),.6,1.8),d=Math.round(c/u*h*100),p=Xo.map(O=>({k:O,load:d/100*(O.demandShare/O.capacityShare)})),v=Math.max(...p.map(O=>O.load),.01),E=p.map(({k:O,load:se})=>{const ce=Tr(se/v,.12,1);return{th:O.th,load:ce,color:O.color,heatColor:wy(ce),rooms:Math.max(1,Math.round(s*O.capacityShare))}}),g=p.reduce((O,se)=>se.load>O.load?se:O),f=g.k.th,_=O=>Tr(p[O].load/Cy,.05,1),y=Mt*fa,S=Hv*wi+lu,T={w:Math.round(2*Mt*fa),h:Math.round(S+2*Mt*lu)},w=(O,se)=>Math.round((y+(O-se)*fa)*10)/10,C=(O,se,ce=0)=>Math.round((S+(O+se)*lu-ce)*10)/10,m=(O,se,ce=0)=>`${w(O,se)},${C(O,se,ce)}`,R=[m(0,0),m(Mt,0),m(Mt,Mt),m(0,Mt)].join(" "),L=[];for(let O=Cn-1;O<Mt;O+=Cn)L.push(O);const N=.2,F=O=>L.some(se=>O>=se-.05&&O<=se+1.05),Y=[],D=[],G=[],te=[];for(const O of L){Y.push([m(O,0),m(O+1,0),m(O+1,Mt),m(O,Mt)].join(" ")),Y.push([m(0,O),m(Mt,O),m(Mt,O+1),m(0,O+1)].join(" "));const se=O+N,ce=O+1-N;D.push([m(se,0),m(ce,0),m(ce,Mt),m(se,Mt)].join(" ")),D.push([m(0,se),m(Mt,se),m(Mt,ce),m(0,ce)].join(" "));const P=O+.5-.035,ae=O+.5+.035;for(let $=0;$<Mt;$+=.7){const ge=Math.min($+.34,Mt);F($)||F(ge)||(G.push([m(P,$),m(ae,$),m(ae,ge),m(P,ge)].join(" ")),G.push([m($,P),m($,ae),m(ge,ae),m(ge,P)].join(" ")))}}const j=4,H=(O,se)=>{const ce=1-N*2;return[se+N+ce*(O+.18)/j,se+N+ce*(O+.72)/j]};for(const O of L)for(const se of L){if(se-.42>0)for(let ce=0;ce<j;ce++){const[P,ae]=H(ce,O);te.push([m(P,se-.42),m(ae,se-.42),m(ae,se-.16),m(P,se-.16)].join(" "))}if(O-.42>0)for(let ce=0;ce<j;ce++){const[P,ae]=H(ce,se);te.push([m(O-.42,P),m(O-.42,ae),m(O-.16,ae),m(O-.16,P)].join(" "))}}const k=(O,se)=>pm[qo(se)*3+qo(O)]??0,W=(O,se)=>{const ce=(Mt-1)/2,P=1-(Math.abs(O-ce)+Math.abs(se-ce))/(Mt*1.1);return Tr(_(k(O,se))*(.82+.18*P),.05,1)},ee=[],ve=(O,se,ce,P,ae,$)=>({top:[m(O,se,ae+$),m(ce,se,ae+$),m(ce,P,ae+$),m(O,P,ae+$)].join(" "),right:[m(ce,se,ae+$),m(ce,P,ae+$),m(ce,P,ae),m(ce,se,ae)].join(" "),left:[m(ce,P,ae+$),m(O,P,ae+$),m(O,P,ae),m(ce,P,ae)].join(" ")});for(const O of Ty){const se=O.gx+Yo,ce=O.gy+Yo,P=O.gx+O.w-Yo,ae=O.gy+O.d-Yo,$=O.lv*wi,ge=($e,Ke)=>{const Dt=[],Bt=Math.max(1,Math.round($e*2.4)),wo=$e/Bt;for(let Jr=0;Jr<O.lv;Jr++){const To=Jr*wi+wi*.32,ia=Jr*wi+wi*.74;for(let Qr=0;Qr<Bt;Qr++)Dt.push(Ke(wo*(Qr+.26),wo*(Qr+.74),To,ia))}return Dt},xe=O.cap?.26:0,le=se+(P-se-xe)*O.capX,Le=ce+(ae-ce-xe)*O.capY,Ce=.07;ee.push({t:"b",d:O.gx+O.gy,lv:O.lv,tone:O.tone,district:qo(O.gy)*3+qo(O.gx),gx:se,gy:ce,gw:P-se,gd:ae-ce,heat:Math.round(W(O.gx,O.gy)*100)/100,kindTh:Xo[k(O.gx,O.gy)].th,faceTop:[m(se,ce,$),m(P,ce,$),m(P,ae,$),m(se,ae,$)].join(" "),faceRight:[m(P,ce,$),m(P,ae,$),m(P,ae),m(P,ce)].join(" "),faceLeft:[m(P,ae,$),m(se,ae,$),m(se,ae),m(P,ae)].join(" "),roofIn:[m(se+Ce,ce+Ce,$),m(P-Ce,ce+Ce,$),m(P-Ce,ae-Ce,$),m(se+Ce,ae-Ce,$)].join(" "),winLeft:ge(P-se,($e,Ke,Dt,Bt)=>[m(se+$e,ae,Bt),m(se+Ke,ae,Bt),m(se+Ke,ae,Dt),m(se+$e,ae,Dt)].join(" ")),winRight:ge(ae-ce,($e,Ke,Dt,Bt)=>[m(P,ce+$e,Bt),m(P,ce+Ke,Bt),m(P,ce+Ke,Dt),m(P,ce+$e,Dt)].join(" ")),roofBox:O.cap?ve(le,Le,le+xe,Le+xe,$,wi*.6):null})}for(const O of Ay){const se=w(O.gx,O.gy),ce=C(O.gx,O.gy),P=$=>Math.round($*10)/10,ae=O.r*.17;ee.push({t:"g",d:O.gx+O.gy,gx:O.gx,gy:O.gy,gr:Math.round(O.r/fa*1e3)/1e3,tone:O.tone,x:se,y:ce,r:P(O.r),trunk:P(O.trunk),trunkPts:O.trunk?[`${P(se-ae)},${P(ce)}`,`${P(se+ae)},${P(ce)}`,`${P(se+ae*.62)},${P(ce-O.trunk)}`,`${P(se-ae*.62)},${P(ce-O.trunk)}`].join(" "):"",puffs:O.puffs.map($=>({cx:P(se+$.dx),cy:P(ce+$.dy),r:P($.r),l:$.l}))})}ee.sort((O,se)=>O.d-se.d);const de=pm.map((O,se)=>W(se%3*Cn+1,(se/3|0)*Cn+1)),We=Math.min(...de),q=Math.max(...de),ie=q-We<.02?0:We+Ry*(q-We),B=Math.max(cu,ie),X=O=>O>=.78?"Hot":O>=.52?"Warm":"Mild",ue=[],_e=Vv(4127);de.forEach((O,se)=>{if(O<B)return;const ce=Tr((O-cu)/(1-cu),0,1),P=se%3*Cn+1,ae=(se/3|0)*Cn+1,$=[],ge=(xe,le,Le,Ce)=>{const $e=Math.round(Le*fa*10)/10;$.push({x:w(xe,le),y:C(xe,le,wi*.9),rx:$e,ry:Math.round($e*.58*10)/10,opacity:Math.round(Ce*100)/100})};ge(P,ae,1.5+ce*.5,.94+ce*.06);for(let xe=0;xe<4;xe++){const le=xe/4*Math.PI*2+_e()*1.4,Le=.5+_e()*.75;ge(P+Math.cos(le)*Le,ae+Math.sin(le)*Le,.6+_e()*.5,.62+ce*.3)}ue.push({tier:X(O),delay:-Math.round(se*.53*100)/100,blobs:$})});const fe=de.reduce((O,se,ce)=>se>de[O]?ce:O,0),Ue={x:w(fe%3*Cn+1,(fe/3|0)*Cn+1),y:C(fe%3*Cn+1,(fe/3|0)*Cn+1,wi*.9)},Ze={x:Math.round(Ue.x/T.w*1e3)/10,y:Math.round(Ue.y/T.h*1e3)/10},Be=[];for(let O=fm;O<=hm+1e-9;O+=_y)Be.push({at:Math.round(O*10)/10,value:Math.round(du(O,e.center)*1e3)/1e3,label:Number.isInteger(O)&&O%2===0?`${O}:00`:""});const he=t.nowHour??e.center,Ve=Tr(Math.round(he),fm,Math.floor(hm)),Ie=ha(Ve),He=du(Ve,e.center)>=.7?`${f}กำลังถูกใช้หนักที่สุด ${e.becauseTh} ขณะที่พื้นที่ประเภทอื่นยังรับได้อีก`:`ยังไม่ถึงช่วงที่ความต้องการสูงที่สุด (${l}) ตอนนี้ยังจัดพื้นที่ได้คล่อง`,_t=d>=85?`ความต้องการพื้นที่กำลังสูงเกินสิ่งที่คณะมี โดยกระจุกที่${f}ในช่วง ${l}`:"ความต้องการพื้นที่ที่ไม่ได้สูงทั้งคณะ แต่กำลังกระจุกตัวในบางพื้นที่และบางช่วงเวลา",ct=[{icon:"calendar",th:"ตารางเรียน",en:"Class Schedule",color:"#a78bfa"},{icon:"users",th:"การเคลื่อนย้ายนักศึกษา",en:"Student Movement",color:"#c084fc"},{icon:"building",th:"ความต้องการพื้นที่",en:"Space Demand",color:"#818cf8"},{icon:"layers",th:"การใช้ทรัพยากร",en:"Resource Usage",color:"#38bdf8"}],Rt="ช่วงเปลี่ยนคาบเรียนทำให้ความต้องการพื้นที่กระจุกตัวในบางพื้นที่ และประเภทกิจกรรมมากกว่า Capacity โดยรวมของคณะ"+(i("resources")?" ทรัพยากรและบริการจึงถูกเรียกใช้พร้อมกันในเวลาเดียว":"")+(i("energy")?" และดันค่าไฟให้ขึ้นเป็นยอดแหลมแทนที่จะเรียบทั้งวัน":""),U=t.custom,Gt=o.id==="custom"&&U?1+U.people/100:o.people,ot=o.id==="custom"&&U?1+U.activity/100:o.activity,b=1+Ey*h,x=Math.pow(Gt,b)*ot/o.usable,V=Math.round((x-1)*100),J=Xo.map(O=>{const se=O.demandShare/O.capacityShare;return{th:O.th,color:O.color,points:Be.map(ce=>({at:ce.at,value:Math.round(Tr(du(ce.at,e.center+O.offset)*(d/100)*se*x,0,3)*1e3)/1e3}))}}),me=J[Xo.indexOf(g.k)].points.filter(O=>O.value>=1),Se=me.length?me[0].at:e.center-e.half,re=me.length?me[me.length-1].at:e.center+e.half,oe=`เกิด Pressure ก่อนใน${f} (${ha(Se)} – ${ha(re)})`,ye="กระจายความต้องการใช้พื้นที่ ก่อนการเพิ่ม Capacity",Fe=`ความต้องการใช้พื้นที่เชื่อมโยงกับช่วงเวลาเรียนและประเภทกิจกรรม มากกว่า Capacity โดยรวม — ${f}เต็มก่อนทั้งที่พื้นที่รวมของคณะยังเหลือ`,Ee="ปรับตาราง การใช้พื้นที่ และการจัดกิจกรรมให้กระจายตัวมากขึ้น"+(i("activity")?" โดยเลื่อนกิจกรรมนักศึกษาออกจากช่วงเปลี่ยนคาบ":"")+(i("learning")?" และสลับคาบที่ใช้พื้นที่ประเภทเดียวกันให้ไม่ชนกัน":"");return{students:r,rooms:s,activities:a,peakWindow:l,peakGuessed:e.id==="unsure",insightTh:_t,peakConcurrent:c,spaceLoadPct:d,zones:E,campusItems:ee,campusGround:R,campusStreets:Y,campusRoads:D,campusLanes:G,campusCrossings:te,campusRing:Ue,campusBox:T,campusHot:Ze,campusHeat:ue,hours:Be,nowHour:Ve,nowLabel:Ie,nowTh:He,relations:ct,mayHappenTh:Rt,simDeltaPct:V,series:J,pressureFrom:Se,pressureTo:re,pressureTh:oe,tightKindTh:f,recTitleTh:ye,whyTh:Fe,actionTh:Ee,impactTh:"ลดความหนาแน่นในช่วง Peak ทำให้พื้นที่ที่มีอยู่มีประสิทธิภาพ รองรับกิจกรรมได้มากขึ้น โดยยังไม่ต้องเพิ่มพื้นที่ทันที"}}const is={students:2500,rooms:35,activities:80,focus:["learning","space"],peak:"midday",scenario:"today"},fu=(t,e)=>{const n=Number(t);return Number.isFinite(n)&&n>0?n:e},by=(t,e)=>{if(!t)return e;const n=String(t).split(",").filter(Boolean);return n.length?n:e};function Py(t){const e=new URLSearchParams(t||"");return{cameFromOrganize:[...e.keys()].length>0,org:e.get("o")||"faculty",input:{students:fu(e.get("p"),is.students),rooms:fu(e.get("c"),is.rooms),activities:fu(e.get("ac"),is.activities),focus:by(e.get("ff"),is.focus),peak:e.get("fk")||is.peak,scenario:e.get("fs")||is.scenario}}}function Ly(t){const e=new URLSearchParams(t||"");return e.set("step","3"),e.get("o")||e.set("o","faculty"),`/MomaySurpriseOrganizeV2?${e}`}const vm=4,So=t=>({gx:t%3*vm+1.5,gy:Math.floor(t/3)*vm+1.5});function Ny(t){const e=t.hours.map(n=>n.at);return{min:Math.ceil(Math.min(...e)),max:Math.floor(Math.max(...e))}}const ea={gx:5.5,gy:10.5},Gv=45,Wv=80;function Xv(t,e){const n=Math.abs(e.gx-t.gx)+Math.abs(e.gy-t.gy),i=Math.round(n*Gv/10)*10;return{meters:i,minutes:Math.max(1,Math.round(i/Wv))}}const Yv=[{id:"learn",en:"LEARN",th:"ไปเรียน",icon:"cap",askTh:"คุณมีคาบเรียนช่วงนี้ใช่ไหม",leadTh:"คุณกำลังจะไปเรียน"},{id:"study",en:"STUDY",th:"หาที่อ่าน/ทำงาน",icon:"book",askTh:"อยากได้ที่เงียบ ๆ นั่งได้ยาว ๆ",leadTh:"คุณต้องการหาที่ STUDY"},{id:"collab",en:"COLLABORATE",th:"ทำงานกลุ่ม",icon:"users",askTh:"มากันหลายคน ต้องคุยกันได้",leadTh:"คุณต้องการที่ทำงานกลุ่ม"},{id:"meet",en:"MEET",th:"พบอาจารย์/บริการ",icon:"chat",askTh:"ติดต่ออาจารย์หรืองานธุรการ",leadTh:"คุณต้องการพบอาจารย์หรือใช้บริการ"},{id:"activity",en:"ACTIVITY",th:"กิจกรรมคณะ",icon:"star",askTh:"มาร่วมกิจกรรมหรือหาที่จัดงาน",leadTh:"คุณกำลังมองหากิจกรรม"},{id:"explore",en:"EXPLORE",th:"ดูสิ่งที่เกิดขึ้นในคณะ",icon:"compass",askTh:"ยังไม่มีอะไรเจาะจง ขอดูรอบ ๆ ก่อน",leadTh:"คุณกำลังสำรวจคณะ"}],pa=Object.fromEntries(Yv.map(t=>[t.id,t])),Dy=[{id:"lecture3",shortTh:"อาคารเรียน 3",th:"อาคารเรียนรวม 3",district:0},{id:"student",shortTh:"อาคารกิจกรรม",th:"อาคารกิจกรรมนักศึกษา",district:1},{id:"garden",shortTh:"สวนพักผ่อน",th:"พื้นที่สีเขียวด้านข้างคณะ",district:2},{id:"plaza",shortTh:"ลานกิจกรรม",th:"ลานกิจกรรมคณะ",district:3},{id:"social",shortTh:"อาคารคณะ",th:"อาคารคณะสังคมศาสตร์",district:4},{id:"library",shortTh:"หอสมุด",th:"หอสมุด มน.",district:5},{id:"research",shortTh:"อาคารวิจัย",th:"อาคารวิจัยและบัณฑิตศึกษา",district:6},{id:"lab",shortTh:"อาคารปฏิบัติการ",th:"อาคารปฏิบัติการ",district:7},{id:"canteen",shortTh:"ศูนย์อาหาร",th:"ศูนย์อาหารคณะ",district:8}],jv=Object.fromEntries(Dy.map(t=>[t.id,t])),Iy=[{id:"read",th:"โซนพื้นที่อ่าน",building:"social",kind:1,seats:120,quiet:.85,outdoor:!1,tone:"warm",amenities:["seat","plug","wifi","light","silent","wc"],photo:"library-open",fits:{study:1,learn:.3,collab:.45,meet:.35,activity:.1,explore:.6},suitTh:["อ่านหนังสือ","ทำงานเดี่ยว","ทำงานกลุ่มเล็ก"],noteTh:"เงียบ เหมาะสำหรับทำงาน"},{id:"facclass",th:"ห้องเรียนคณะ",building:"social",kind:0,seats:90,quiet:.4,outdoor:!1,tone:"cool",amenities:["seat","plug","wifi","screen","wc"],fits:{learn:.9,meet:.5,study:.3,collab:.3,activity:.2,explore:.35},suitTh:["เข้าเรียน","ติวกลุ่ม"],noteTh:"ว่างช่วงพักคาบ"},{id:"cowork",th:"Co-Working Zone",building:"student",kind:1,seats:90,quiet:.45,outdoor:!1,tone:"cool",amenities:["seat","plug","wifi","board"],photo:"meeting",fits:{collab:1,study:.65,learn:.2,meet:.35,activity:.45,explore:.7},suitTh:["ทำงานกลุ่ม","ระดมความคิด","ประชุมย่อย"],noteTh:"มีปลั๊กไฟ คุยกันได้"},{id:"club",th:"ห้องชมรม",building:"student",kind:2,seats:70,quiet:.3,outdoor:!1,tone:"violet",amenities:["seat","wifi","board"],photo:"meeting",fits:{activity:.9,collab:.6,explore:.65,meet:.3,study:.15,learn:.1},suitTh:["กิจกรรมชมรม","ซ้อมงาน"],noteTh:"ใช้จัดกิจกรรมชมรม"},{id:"outdoor",th:"พื้นที่ Outdoor",building:"garden",kind:3,seats:60,quiet:.5,outdoor:!0,tone:"green",amenities:["seat","wifi","green"],photo:"garden",fits:{study:.55,collab:.7,explore:.9,activity:.5,learn:.1,meet:.15},suitTh:["นั่งพัก","ทำงานกลุ่ม","คุยเล่น"],noteTh:"อากาศดี บรรยากาศธรรมชาติ"},{id:"plazamain",th:"ลานกิจกรรมกลาง",building:"plaza",kind:2,seats:300,quiet:.15,outdoor:!0,tone:"green",amenities:["seat","wifi","green","stage"],photo:"garden",fits:{activity:1,explore:.85,collab:.4,study:.15,learn:.1,meet:.2},suitTh:["ร่วมกิจกรรม","ชมงาน"],noteTh:"มีงานกิจกรรม"},{id:"hall",th:"ห้องบรรยายรวม",building:"lecture3",kind:0,seats:180,quiet:.35,outdoor:!1,tone:"cool",amenities:["seat","plug","wifi","screen","wc"],fits:{learn:1,meet:.45,study:.3,collab:.25,activity:.3,explore:.4},suitTh:["เข้าเรียน","ฟังบรรยาย"],noteTh:"ห้องเรียนหลักของคณะ"},{id:"libquiet",th:"โซนอ่านเงียบ",building:"library",kind:1,seats:240,quiet:.95,outdoor:!1,tone:"warm",amenities:["seat","plug","wifi","silent","book","wc"],photo:"library-read",fits:{study:.95,learn:.35,collab:.2,meet:.15,activity:.05,explore:.5},suitTh:["อ่านหนังสือ","ค้นคว้า"],noteTh:"มีที่นั่งเพียงพอ"},{id:"libgroup",th:"โซนค้นคว้ากลุ่ม",building:"library",kind:1,seats:60,quiet:.55,outdoor:!1,tone:"warm",amenities:["seat","plug","wifi","board","book"],photo:"meeting",fits:{collab:.85,study:.7,learn:.3,meet:.35,activity:.1,explore:.45},suitTh:["ทำงานกลุ่ม","ค้นคว้า"],noteTh:"จองล่วงหน้าได้"},{id:"quiet",th:"Quiet Zone",building:"research",kind:1,seats:48,quiet:1,outdoor:!1,tone:"violet",amenities:["seat","plug","wifi","silent"],photo:"library-open",fits:{study:1,learn:.15,collab:.1,meet:.2,activity:.05,explore:.35},suitTh:["อ่านหนังสือ","ทำงานเดี่ยว"],noteTh:"คนน้อย เหมาะสำหรับอ่าน"},{id:"computer",th:"ห้องคอมพิวเตอร์",building:"lab",kind:0,seats:110,quiet:.6,outdoor:!1,tone:"violet",amenities:["seat","plug","wifi","screen"],fits:{learn:.7,study:.7,collab:.55,meet:.2,activity:.1,explore:.4},suitTh:["ใช้คอมพิวเตอร์","ทำงานเดี่ยว"],noteTh:"มีเครื่องคอมพิวเตอร์ให้ใช้"},{id:"office",th:"สำนักงานคณะ",building:"social",kind:0,seats:24,quiet:.7,outdoor:!1,tone:"violet",photo:"office",amenities:["seat","wifi","desk","wc"],suitTh:["ติดต่องานทะเบียน","นัดพบอาจารย์","ยื่นเอกสาร"],fits:{meet:1,learn:.15,study:.2,collab:.15,activity:.1,explore:.35},noteTh:"งานทะเบียนและธุรการ เปิดถึง 16:30 น."},{id:"canteenmain",th:"โซนนั่งรับประทาน",building:"canteen",kind:3,seats:200,quiet:.2,outdoor:!1,tone:"warm",amenities:["seat","wifi","plug","wc"],fits:{explore:.8,collab:.6,activity:.65,study:.3,meet:.35,learn:.1},suitTh:["พักกินข้าว","นั่งคุย"],noteTh:"ช่วงพักเที่ยงคนแน่นที่สุด"}],Pt=t=>jv[t.building],Uy=["ห้องเรียน","พื้นที่ทำงานกลุ่ม","พื้นที่กิจกรรม","พื้นที่พักผ่อน"],js=Iy,_m={seat:{th:"ที่นั่ง",icon:"seat"},wc:{th:"ห้องน้ำใกล้เคียง",icon:"wc"},plug:{th:"ปลั๊กไฟ",icon:"plug"},wifi:{th:"Wi-Fi",icon:"wifi"},light:{th:"แสงสว่างเหมาะสม",icon:"sun"},silent:{th:"โซนเงียบ",icon:"silent"},board:{th:"ไวท์บอร์ด",icon:"board"},green:{th:"พื้นที่สีเขียว",icon:"leaf"},book:{th:"หนังสืออ้างอิง",icon:"book"},screen:{th:"จอฉายภาพ",icon:"screen"},stage:{th:"เวทีกิจกรรม",icon:"star"},desk:{th:"เคาน์เตอร์บริการ",icon:"desk"}};function qs(t,e,n){const i=e.kind,r=t.series[i];if(!r||!r.points.length)return 0;const a=r.points.reduce((h,d)=>Math.abs(d.at-n)<Math.abs(h.at-n)?d:h,r.points[0]).value,o=So(Pt(e).district),l=5.5,c=1-(Math.abs(o.gx-l)+Math.abs(o.gy-l))/13.2,u=a*(.82+.18*c)*(1-e.quiet*.3);return Math.min(1,Math.max(0,u))}const Ch=(t,e)=>Math.max(0,Math.round(t.seats*(1-e)));function vr(t){return t<.35?{th:"ไม่หนาแน่น",tone:"ok"}:t<.7?{th:"ปานกลาง",tone:"mid"}:{th:"หนาแน่น",tone:"hot"}}function Fy(t,e,n){const i=e==="activity"||e==="explore";return js.map(r=>{const s=qs(t,r,n),a=Xv(ea,So(Pt(r).district)),o=r.fits[e]??0,l=i?s:1-s,c=1-Math.min(1,a.minutes/12),u=e==="study"?r.quiet:0,h=o*1+l*.55+c*.3+u*.25;return{space:r,load:s,walk:a,fit:o,score:h,free:Ch(r,s),crowd:vr(s)}}).filter(r=>r.fit>.12).sort((r,s)=>s.score-r.score)}function Oy(t,e){const{space:n,load:i,walk:r}=t,s=[];return s.push({ok:i<.7,th:i<.35?"คนไม่หนาแน่น":i<.7?"คนปานกลาง ยังหาที่นั่งได้":"ตอนนี้คนค่อนข้างแน่น"}),s.push({ok:t.free>8,th:t.free>8?`มีที่นั่งเพียงพอ (ว่างราว ${t.free} ที่)`:`ที่นั่งเหลือน้อย (ราว ${t.free} ที่)`}),e==="study"?s.push({ok:n.quiet>=.7,th:n.quiet>=.7?"เงียบ เหมาะสำหรับทำงาน":"มีเสียงรบกวนบ้าง"}):e==="collab"?s.push({ok:n.quiet<.7,th:n.quiet<.7?"คุยกันได้ ไม่รบกวนใคร":"เป็นโซนเงียบ คุยกันไม่สะดวก"}):e==="activity"?s.push({ok:i>.4,th:i>.4?"มีคนร่วมกิจกรรมอยู่แล้ว":"ตอนนี้ยังเงียบ กิจกรรมน่าจะยังไม่เริ่ม"}):s.push({ok:!0,th:n.noteTh}),s.push({ok:r.minutes<=7,th:r.minutes<=7?`เดินถึงใน ${r.minutes} นาที`:`ต้องเดิน ${r.minutes} นาที (${r.meters} เมตร)`}),s}const sc=[3.5,7.5,11.5],xm=t=>sc.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e,sc[0]);function By(t,e){const n=l=>{const c=[];for(const u of l){const h=c[c.length-1];(!h||Math.abs(h.gx-u.gx)>.02||Math.abs(h.gy-u.gy)>.02)&&c.push(u)}return c},i=l=>sc.some(c=>Math.abs(c-l)<.02),r=l=>l.slice(1).reduce((c,u,h)=>{const d=l[h],p=Math.abs(u.gx-d.gx),v=Math.abs(u.gy-d.gy),E=p<.02&&i(d.gx)||v<.02&&i(d.gy);return c+(p+v)*(E?1:6)},0),s=l=>sc.flatMap(c=>[{axis:"x",at:{gx:c,gy:l.gy}},{axis:"y",at:{gx:l.gx,gy:c}}]),a=(l,c,u,h)=>{if(u!==h)return u==="x"?[{gx:l.gx,gy:c.gy}]:[{gx:c.gx,gy:l.gy}];if(u==="x"&&Math.abs(l.gx-c.gx)<.02)return[];if(u==="y"&&Math.abs(l.gy-c.gy)<.02)return[];if(u==="x"){const p=xm((l.gy+c.gy)/2);return[{gx:l.gx,gy:p},{gx:c.gx,gy:p}]}const d=xm((l.gx+c.gx)/2);return[{gx:d,gy:l.gy},{gx:d,gy:c.gy}]};let o=[t,e];for(const l of s(t))for(const c of s(e)){const u=n([t,l.at,...a(l.at,c.at,l.axis,c.axis),c.at,e]);r(u)<r(o)&&(o=u)}return o}const ky=t=>t.slice(1).reduce((e,n,i)=>e+Math.abs(n.gx-t[i].gx)+Math.abs(n.gy-t[i].gy),0);function zy(t){const e=So(Pt(t).district),n=By(ea,e),i=ky(n),r=Math.round(i*Gv/10)*10,s=Math.max(1,Math.round(r/Wv)),a=["ออกจากทางออกปัจจุบัน เดินไปทางถนนหน้าคณะ","เดินตามถนนไปทางอาคารคณะ","เลี้ยวที่สี่แยกกลางคณะ",`เดินตามถนนไปทาง${Pt(t).th}`,`เข้า${Pt(t).th}`,`ถึง${t.th}`],o=n.slice(1).map((c,u)=>{const h=n[u],d=Math.abs(c.gx-h.gx)+Math.abs(c.gy-h.gy);return{at:c,d,th:a[Math.min(u,a.length-1)]}});let l=0;return o.forEach((c,u)=>{c.min=u===o.length-1?Math.max(1,s-l):Math.max(1,Math.round(c.d/i*s)),l+=c.min}),{total:{meters:r,minutes:s},points:n,legs:o}}function Hy(t){return[{th:"เสวนา: สังคมและเมืองน่าอยู่",whenTh:"13:00 – 15:00",whereTh:"ห้องประชุมคณะ ชั้น 1",district:3},{th:"ชมรม Debate",whenTh:"16:00 – 18:00",whereTh:"ลานกิจกรรมหน้าอาคาร",district:3},{th:`ช่วงพีคของคณะ ${t.peakWindow}`,whenTh:t.peakWindow,whereTh:"ทั้งคณะ — เผื่อเวลาเดินทางเพิ่ม",district:4}]}function Vy(t,e){const n=t.hours.filter(s=>s.at>e),i=n.length?n.reduce((s,a)=>a.value<s.value?a:s,n[0]):null,r=[];return i&&r.push({icon:"clock",tone:"time",th:`ช่วง ${i.label} มักจะเป็นช่วงที่พื้นที่ว่างขึ้น`}),r.push({icon:"users",tone:"plan",th:"ถ้ามีการทำงานกลุ่ม แนะนำจองห้องล่วงหน้าผ่านงานธุรการคณะ"}),r.push({icon:"leaf",tone:"green",th:"ต้องการบรรยากาศธรรมชาติ ลองพื้นที่ Outdoor ด้านหน้าอาคาร"}),r}function Gy(t,e){const n=t.hours.find(r=>r.at===e),i=n?n.value:.4;return{crowd:vr(Math.min(1,i)),tempC:Math.round(28+Math.sin((e-6)/12*Math.PI)*5),pm25:Math.round(14+Math.cos((e-4)/14*Math.PI)*6),mock:!0}}const Yn=t=>t.photo?`./zones/${t.photo}.jpg`:null;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rh="186",Wy=0,Sm=1,Xy=2,Ha=1,Yy=2,ba=3,Xr=0,wn=1,Ni=2,Oi=0,Va=1,ym=2,Mm=3,Em=4,jy=5,_s=100,qy=101,$y=102,Ky=103,Zy=104,Jy=200,Qy=201,eM=202,tM=203,qv=204,$v=205,nM=206,iM=207,rM=208,sM=209,aM=210,oM=211,lM=212,cM=213,uM=214,Gd=0,Wd=1,Xd=2,co=3,Yd=4,jd=5,qd=6,$d=7,Kv=0,dM=1,fM=2,xi=0,Zv=1,Jv=2,Qv=3,e_=4,t_=5,n_=6,i_=7,r_=300,Yr=301,$s=302,hu=303,pu=304,bc=306,Kd=1e3,Ui=1001,Zd=1002,$t=1003,hM=1004,$o=1005,an=1006,mu=1007,Fr=1008,Pn=1009,s_=1010,a_=1011,uo=1012,bh=1013,Si=1014,ii=1015,yi=1016,Ph=1017,Lh=1018,fo=1020,o_=35902,l_=35899,c_=1021,u_=1022,ri=1023,Gi=1026,Or=1027,Nh=1028,Dh=1029,jr=1030,Ih=1031,Uh=1033,Pl=33776,Ll=33777,Nl=33778,Dl=33779,Jd=35840,Qd=35841,ef=35842,tf=35843,nf=36196,rf=37492,sf=37496,af=37488,of=37489,ac=37490,lf=37491,cf=37808,uf=37809,df=37810,ff=37811,hf=37812,pf=37813,mf=37814,gf=37815,vf=37816,_f=37817,xf=37818,Sf=37819,yf=37820,Mf=37821,Ef=36492,wf=36494,Tf=36495,Af=36283,Cf=36284,oc=36285,Rf=36286,pM=3200,bf=0,mM=1,ar="",bn="srgb",lc="srgb-linear",cc="linear",ut="srgb",gu=7680,gM=519,vM=512,_M=513,xM=514,Fh=515,SM=516,yM=517,Oh=518,MM=519,EM=35044,wM=35048,wm="300 es",gi=2e3,ho=2001;function TM(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function uc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function AM(){const t=uc("canvas");return t.style.display="block",t}const Tm={};function Am(...t){const e="THREE."+t.shift();console.log(e,...t)}function d_(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ge(...t){t=d_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function at(...t){t=d_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Bs(...t){const e=t.join(" ");e in Tm||(Tm[e]=!0,Ge(...t))}function CM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const RM={[Gd]:Wd,[Xd]:qd,[Yd]:$d,[co]:jd,[Wd]:Gd,[qd]:Xd,[$d]:Yd,[jd]:co};class Kr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vu=Math.PI/180,Pf=180/Math.PI;function yo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[t&255]+nn[t>>8&255]+nn[t>>16&255]+nn[t>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[n&63|128]+nn[n>>8&255]+"-"+nn[n>>16&255]+nn[n>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function et(t,e,n){return Math.max(e,Math.min(n,t))}function bM(t,e){return(t%e+e)%e}function _u(t,e,n){return(1-n)*t+n*e}function ma(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:case Uint8ClampedArray:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Vh=class Vh{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=et(this.x,e.x,n.x),this.y=et(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=et(this.x,e,n),this.y=et(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Vh.prototype.isVector2=!0;let ze=Vh;class ta{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],h=i[r+3],d=s[a+0],p=s[a+1],v=s[a+2],E=s[a+3];if(h!==E||l!==d||c!==p||u!==v){let g=l*d+c*p+u*v+h*E;g<0&&(d=-d,p=-p,v=-v,E=-E,g=-g);let f=1-o;if(g<.9995){const _=Math.acos(g),y=Math.sin(_);f=Math.sin(f*_)/y,o=Math.sin(o*_)/y,l=l*f+d*o,c=c*f+p*o,u=u*f+v*o,h=h*f+E*o}else{l=l*f+d*o,c=c*f+p*o,u=u*f+v*o,h=h*f+E*o;const _=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=_,c*=_,u*=_,h*=_}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],h=s[a],d=s[a+1],p=s[a+2],v=s[a+3];return e[n]=o*v+u*h+l*p-c*d,e[n+1]=l*v+u*d+c*h-o*p,e[n+2]=c*v+u*p+o*d-l*h,e[n+3]=u*v-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),h=o(s/2),d=l(i/2),p=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"YXZ":this._x=d*u*h+c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"ZXY":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h-d*p*v;break;case"ZYX":this._x=d*u*h-c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h+d*p*v;break;case"YZX":this._x=d*u*h+c*p*v,this._y=c*p*h+d*u*v,this._z=c*u*v-d*p*h,this._w=c*u*h-d*p*v;break;case"XZY":this._x=d*u*h-c*p*v,this._y=c*p*h-d*u*v,this._z=c*u*v+d*p*h,this._w=c*u*h+d*p*v;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],u=n[6],h=n[10],d=i+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,n=Math.sin(n*c)/u,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Gh=class Gh{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Cm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Cm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*n-s*r),h=2*(s*i-a*n);return this.x=n+l*c+a*h-o*u,this.y=i+l*u+o*c-s*h,this.z=r+l*h+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=et(this.x,e.x,n.x),this.y=et(this.y,e.y,n.y),this.z=et(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=et(this.x,e,n),this.y=et(this.y,e,n),this.z=et(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xu.copy(this).projectOnVector(e),this.sub(xu)}reflect(e){return this.sub(xu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Gh.prototype.isVector3=!0;let z=Gh;const xu=new z,Cm=new ta,Wh=class Wh{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],p=i[5],v=i[8],E=r[0],g=r[3],f=r[6],_=r[1],y=r[4],S=r[7],T=r[2],w=r[5],C=r[8];return s[0]=a*E+o*_+l*T,s[3]=a*g+o*y+l*w,s[6]=a*f+o*S+l*C,s[1]=c*E+u*_+h*T,s[4]=c*g+u*y+h*w,s[7]=c*f+u*S+h*C,s[2]=d*E+p*_+v*T,s[5]=d*g+p*y+v*w,s[8]=d*f+p*S+v*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return n*a*u-n*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*s,p=c*s-a*l,v=n*h+i*d+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/v;return e[0]=h*E,e[1]=(r*c-u*i)*E,e[2]=(o*i-r*a)*E,e[3]=d*E,e[4]=(u*n-r*l)*E,e[5]=(r*s-o*n)*E,e[6]=p*E,e[7]=(i*l-c*n)*E,e[8]=(a*n-i*s)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return Bs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Su.makeScale(e,n)),this}rotate(e){return Bs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Su.makeRotation(-e)),this}translate(e,n){return Bs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Su.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Wh.prototype.isMatrix3=!0;let Xe=Wh;const Su=new Xe,Rm=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bm=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function PM(){const t={enabled:!0,workingColorSpace:lc,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=Bi(r.r),r.g=Bi(r.g),r.b=Bi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=ks(r.r),r.g=ks(r.g),r.b=ks(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ar?cc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Bs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Bs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[lc]:{primaries:e,whitePoint:i,transfer:cc,toXYZ:Rm,fromXYZ:bm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:bn},outputColorSpaceConfig:{drawingBufferColorSpace:bn}},[bn]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:Rm,fromXYZ:bm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:bn}}}),t}const nt=PM();function Bi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ks(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let rs;class LM{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{rs===void 0&&(rs=uc("canvas")),rs.width=e.width,rs.height=e.height;const r=rs.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=rs}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=uc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Bi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Bi(n[i]/255)*255):n[i]=Bi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let NM=0;class Bh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:NM++}),this.uuid=yo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(yu(r[a].image)):s.push(yu(r[a]))}else s=yu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function yu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?LM.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let DM=0;const Mu=new z;class fn extends Kr{constructor(e=fn.DEFAULT_IMAGE,n=fn.DEFAULT_MAPPING,i=Ui,r=Ui,s=an,a=Fr,o=ri,l=Pn,c=fn.DEFAULT_ANISOTROPY,u=ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:DM++}),this.uuid=yo(),this.name="",this.source=new Bh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mu).x}get height(){return this.source.getSize(Mu).y}get depth(){return this.source.getSize(Mu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ge(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ge(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==r_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Kd:e.x=e.x-Math.floor(e.x);break;case Ui:e.x=e.x<0?0:1;break;case Zd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Kd:e.y=e.y-Math.floor(e.y);break;case Ui:e.y=e.y<0?0:1;break;case Zd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=r_;fn.DEFAULT_ANISOTROPY=1;const Xh=class Xh{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],v=l[9],E=l[2],g=l[6],f=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-E)<.01&&Math.abs(v-g)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+E)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(c+1)/2,S=(p+1)/2,T=(f+1)/2,w=(u+d)/4,C=(h+E)/4,m=(v+g)/4;return y>S&&y>T?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=w/i,s=C/i):S>T?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=w/r,s=m/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=C/s,r=m/s),this.set(i,r,s,n),this}let _=Math.sqrt((g-v)*(g-v)+(h-E)*(h-E)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(g-v)/_,this.y=(h-E)/_,this.z=(d-u)/_,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=et(this.x,e.x,n.x),this.y=et(this.y,e.y,n.y),this.z=et(this.z,e.z,n.z),this.w=et(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=et(this.x,e,n),this.y=et(this.y,e,n),this.z=et(this.z,e,n),this.w=et(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Xh.prototype.isVector4=!0;let Tt=Xh;class IM extends Kr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Tt(0,0,e,n),this.scissorTest=!1,this.viewport=new Tt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new fn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:an,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Bh(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const n=e.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends IM{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class f_ extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class UM extends fn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const fc=class fc{constructor(e,n,i,r,s,a,o,l,c,u,h,d,p,v,E,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,u,h,d,p,v,E,g)}set(e,n,i,r,s,a,o,l,c,u,h,d,p,v,E,g){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=v,f[11]=E,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/ss.setFromMatrixColumn(e,0).length(),s=1/ss.setFromMatrixColumn(e,1).length(),a=1/ss.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*h,v=o*u,E=o*h;n[0]=l*u,n[4]=-l*h,n[8]=c,n[1]=p+v*c,n[5]=d-E*c,n[9]=-o*l,n[2]=E-d*c,n[6]=v+p*c,n[10]=a*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,v=c*u,E=c*h;n[0]=d+E*o,n[4]=v*o-p,n[8]=a*c,n[1]=a*h,n[5]=a*u,n[9]=-o,n[2]=p*o-v,n[6]=E+d*o,n[10]=a*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,v=c*u,E=c*h;n[0]=d-E*o,n[4]=-a*h,n[8]=v+p*o,n[1]=p+v*o,n[5]=a*u,n[9]=E-d*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const d=a*u,p=a*h,v=o*u,E=o*h;n[0]=l*u,n[4]=v*c-p,n[8]=d*c+E,n[1]=l*h,n[5]=E*c+d,n[9]=p*c-v,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,v=o*l,E=o*c;n[0]=l*u,n[4]=E-d*h,n[8]=v*h+p,n[1]=h,n[5]=a*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*h+v,n[10]=d-E*h}else if(e.order==="XZY"){const d=a*l,p=a*c,v=o*l,E=o*c;n[0]=l*u,n[4]=-h,n[8]=c*u,n[1]=d*h+E,n[5]=a*u,n[9]=p*h-v,n[2]=v*h-p,n[6]=o*u,n[10]=E*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(FM,e,OM)}lookAt(e,n,i){const r=this.elements;return Tn.subVectors(e,n),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),$i.crossVectors(i,Tn),$i.lengthSq()===0&&(Math.abs(i.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),$i.crossVectors(i,Tn)),$i.normalize(),Ko.crossVectors(Tn,$i),r[0]=$i.x,r[4]=Ko.x,r[8]=Tn.x,r[1]=$i.y,r[5]=Ko.y,r[9]=Tn.y,r[2]=$i.z,r[6]=Ko.z,r[10]=Tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],p=i[13],v=i[2],E=i[6],g=i[10],f=i[14],_=i[3],y=i[7],S=i[11],T=i[15],w=r[0],C=r[4],m=r[8],R=r[12],L=r[1],N=r[5],F=r[9],Y=r[13],D=r[2],G=r[6],te=r[10],j=r[14],H=r[3],k=r[7],W=r[11],ee=r[15];return s[0]=a*w+o*L+l*D+c*H,s[4]=a*C+o*N+l*G+c*k,s[8]=a*m+o*F+l*te+c*W,s[12]=a*R+o*Y+l*j+c*ee,s[1]=u*w+h*L+d*D+p*H,s[5]=u*C+h*N+d*G+p*k,s[9]=u*m+h*F+d*te+p*W,s[13]=u*R+h*Y+d*j+p*ee,s[2]=v*w+E*L+g*D+f*H,s[6]=v*C+E*N+g*G+f*k,s[10]=v*m+E*F+g*te+f*W,s[14]=v*R+E*Y+g*j+f*ee,s[3]=_*w+y*L+S*D+T*H,s[7]=_*C+y*N+S*G+T*k,s[11]=_*m+y*F+S*te+T*W,s[15]=_*R+y*Y+S*j+T*ee,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],v=e[3],E=e[7],g=e[11],f=e[15],_=l*p-c*d,y=o*p-c*h,S=o*d-l*h,T=a*p-c*u,w=a*d-l*u,C=a*h-o*u;return n*(E*_-g*y+f*S)-i*(v*_-g*T+f*w)+r*(v*y-E*T+f*C)-s*(v*S-E*w+g*C)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return n*(a*u-o*c)-i*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],v=e[12],E=e[13],g=e[14],f=e[15],_=n*o-i*a,y=n*l-r*a,S=n*c-s*a,T=i*l-r*o,w=i*c-s*o,C=r*c-s*l,m=u*E-h*v,R=u*g-d*v,L=u*f-p*v,N=h*g-d*E,F=h*f-p*E,Y=d*f-p*g,D=_*Y-y*F+S*N+T*L-w*R+C*m;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/D;return e[0]=(o*Y-l*F+c*N)*G,e[1]=(r*F-i*Y-s*N)*G,e[2]=(E*C-g*w+f*T)*G,e[3]=(d*w-h*C-p*T)*G,e[4]=(l*L-a*Y-c*R)*G,e[5]=(n*Y-r*L+s*R)*G,e[6]=(g*S-v*C-f*y)*G,e[7]=(u*C-d*S+p*y)*G,e[8]=(a*F-o*L+c*m)*G,e[9]=(i*L-n*F-s*m)*G,e[10]=(v*w-E*S+f*_)*G,e[11]=(h*S-u*w-p*_)*G,e[12]=(o*R-a*N-l*m)*G,e[13]=(n*N-i*R+r*m)*G,e[14]=(E*y-v*T-g*_)*G,e[15]=(u*T-h*y+d*_)*G,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,u=a+a,h=o+o,d=s*c,p=s*u,v=s*h,E=a*u,g=a*h,f=o*h,_=l*c,y=l*u,S=l*h,T=i.x,w=i.y,C=i.z;return r[0]=(1-(E+f))*T,r[1]=(p+S)*T,r[2]=(v-y)*T,r[3]=0,r[4]=(p-S)*w,r[5]=(1-(d+f))*w,r[6]=(g+_)*w,r[7]=0,r[8]=(v+y)*C,r[9]=(g-_)*C,r[10]=(1-(d+E))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let a=ss.set(r[0],r[1],r[2]).length();const o=ss.set(r[4],r[5],r[6]).length(),l=ss.set(r[8],r[9],r[10]).length();s<0&&(a=-a),$n.copy(this);const c=1/a,u=1/o,h=1/l;return $n.elements[0]*=c,$n.elements[1]*=c,$n.elements[2]*=c,$n.elements[4]*=u,$n.elements[5]*=u,$n.elements[6]*=u,$n.elements[8]*=h,$n.elements[9]*=h,$n.elements[10]*=h,n.setFromRotationMatrix($n),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=gi,l=!1){const c=this.elements,u=2*s/(n-e),h=2*s/(i-r),d=(n+e)/(n-e),p=(i+r)/(i-r);let v,E;if(l)v=s/(a-s),E=a*s/(a-s);else if(o===gi)v=-(a+s)/(a-s),E=-2*a*s/(a-s);else if(o===ho)v=-a/(a-s),E=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=gi,l=!1){const c=this.elements,u=2/(n-e),h=2/(i-r),d=-(n+e)/(n-e),p=-(i+r)/(i-r);let v,E;if(l)v=1/(a-s),E=a/(a-s);else if(o===gi)v=-2/(a-s),E=-(a+s)/(a-s);else if(o===ho)v=-1/(a-s),E=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};fc.prototype.isMatrix4=!0;let mt=fc;const ss=new z,$n=new mt,FM=new z(0,0,0),OM=new z(1,1,1),$i=new z,Ko=new z,Tn=new z,Pm=new mt,Lm=new ta;class Sr{constructor(e=0,n=0,i=0,r=Sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],h=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Pm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Lm.setFromEuler(this),this.setFromQuaternion(Lm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sr.DEFAULT_ORDER="XYZ";class h_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let BM=0;const Nm=new z,as=new ta,Ti=new mt,Zo=new z,ga=new z,kM=new z,zM=new ta,Dm=new z(1,0,0),Im=new z(0,1,0),Um=new z(0,0,1),Fm={type:"added"},HM={type:"removed"},os={type:"childadded",child:null},Eu={type:"childremoved",child:null};class Zt extends Kr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:BM++}),this.uuid=yo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zt.DEFAULT_UP.clone();const e=new z,n=new Sr,i=new ta,r=new z(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new mt},normalMatrix:{value:new Xe}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new h_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return as.setFromAxisAngle(e,n),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,n){return as.setFromAxisAngle(e,n),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(Dm,e)}rotateY(e){return this.rotateOnAxis(Im,e)}rotateZ(e){return this.rotateOnAxis(Um,e)}translateOnAxis(e,n){return Nm.copy(e).applyQuaternion(this.quaternion),this.position.add(Nm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Dm,e)}translateY(e){return this.translateOnAxis(Im,e)}translateZ(e){return this.translateOnAxis(Um,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Zo.copy(e):Zo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(ga,Zo,this.up):Ti.lookAt(Zo,ga,this.up),this.quaternion.setFromRotationMatrix(Ti),r&&(Ti.extractRotation(r.matrixWorld),as.setFromRotationMatrix(Ti),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fm),os.child=e,this.dispatchEvent(os),os.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(HM),Eu.child=e,this.dispatchEvent(Eu),Eu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fm),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,e,kM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ga,zM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Zt.DEFAULT_UP=new z(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Pa extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const VM={type:"move"};class wu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const E of e.hand.values()){const g=n.getJointPose(E,i),f=this._getHandJoint(c,E);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&d>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(VM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Pa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const p_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Jo={h:0,s:0,l:0};function Tu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class it{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=nt.workingColorSpace){return this.r=e,this.g=n,this.b=i,nt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=nt.workingColorSpace){if(e=bM(e,1),n=et(n,0,1),i=et(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Tu(a,s,e+1/3),this.g=Tu(a,s,e),this.b=Tu(a,s,e-1/3)}return nt.colorSpaceToWorking(this,r),this}setStyle(e,n=bn){function i(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=bn){const i=p_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bn){return nt.workingToColorSpace(rn.copy(this),e),Math.round(et(rn.r*255,0,255))*65536+Math.round(et(rn.g*255,0,255))*256+Math.round(et(rn.b*255,0,255))}getHexString(e=bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=nt.workingColorSpace){nt.workingToColorSpace(rn.copy(this),n);const i=rn.r,r=rn.g,s=rn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=nt.workingColorSpace){return nt.workingToColorSpace(rn.copy(this),n),e.r=rn.r,e.g=rn.g,e.b=rn.b,e}getStyle(e=bn){nt.workingToColorSpace(rn.copy(this),e);const n=rn.r,i=rn.g,r=rn.b;return e!==bn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+n,Ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ki),e.getHSL(Jo);const i=_u(Ki.h,Jo.h,n),r=_u(Ki.s,Jo.s,n),s=_u(Ki.l,Jo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new it;it.NAMES=p_;class GM extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sr,this.environmentIntensity=1,this.environmentRotation=new Sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Kn=new z,Ai=new z,Au=new z,Ci=new z,ls=new z,cs=new z,Om=new z,Cu=new z,Ru=new z,bu=new z,Pu=new Tt,Lu=new Tt,Nu=new Tt;class ni{constructor(e=new z,n=new z,i=new z){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Kn.subVectors(e,n),r.cross(Kn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Kn.subVectors(r,n),Ai.subVectors(i,n),Au.subVectors(e,n);const a=Kn.dot(Kn),o=Kn.dot(Ai),l=Kn.dot(Au),c=Ai.dot(Ai),u=Ai.dot(Au),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(c*l-o*u)*d,v=(a*u-o*l)*d;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,Ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ci.x),l.addScaledVector(a,Ci.y),l.addScaledVector(o,Ci.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Pu.setScalar(0),Lu.setScalar(0),Nu.setScalar(0),Pu.fromBufferAttribute(e,n),Lu.fromBufferAttribute(e,i),Nu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Pu,s.x),a.addScaledVector(Lu,s.y),a.addScaledVector(Nu,s.z),a}static isFrontFacing(e,n,i,r){return Kn.subVectors(i,n),Ai.subVectors(e,n),Kn.cross(Ai).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kn.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),Kn.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ni.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ni.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;ls.subVectors(r,i),cs.subVectors(s,i),Cu.subVectors(e,i);const l=ls.dot(Cu),c=cs.dot(Cu);if(l<=0&&c<=0)return n.copy(i);Ru.subVectors(e,r);const u=ls.dot(Ru),h=cs.dot(Ru);if(u>=0&&h<=u)return n.copy(r);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),n.copy(i).addScaledVector(ls,a);bu.subVectors(e,s);const p=ls.dot(bu),v=cs.dot(bu);if(v>=0&&p<=v)return n.copy(s);const E=p*c-l*v;if(E<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(cs,o);const g=u*v-p*h;if(g<=0&&h-u>=0&&p-v>=0)return Om.subVectors(s,r),o=(h-u)/(h-u+(p-v)),n.copy(r).addScaledVector(Om,o);const f=1/(g+E+d);return a=E*f,o=d*f,n.copy(i).addScaledVector(ls,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Zr{constructor(e=new z(1/0,1/0,1/0),n=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Zn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Zn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Zn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zn):Zn.fromBufferAttribute(s,a),Zn.applyMatrix4(e.matrixWorld),this.expandByPoint(Zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qo.copy(i.boundingBox)),Qo.applyMatrix4(e.matrixWorld),this.union(Qo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zn),Zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(va),el.subVectors(this.max,va),us.subVectors(e.a,va),ds.subVectors(e.b,va),fs.subVectors(e.c,va),Zi.subVectors(ds,us),Ji.subVectors(fs,ds),Ar.subVectors(us,fs);let n=[0,-Zi.z,Zi.y,0,-Ji.z,Ji.y,0,-Ar.z,Ar.y,Zi.z,0,-Zi.x,Ji.z,0,-Ji.x,Ar.z,0,-Ar.x,-Zi.y,Zi.x,0,-Ji.y,Ji.x,0,-Ar.y,Ar.x,0];return!Du(n,us,ds,fs,el)||(n=[1,0,0,0,1,0,0,0,1],!Du(n,us,ds,fs,el))?!1:(tl.crossVectors(Zi,Ji),n=[tl.x,tl.y,tl.z],Du(n,us,ds,fs,el))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ri=[new z,new z,new z,new z,new z,new z,new z,new z],Zn=new z,Qo=new Zr,us=new z,ds=new z,fs=new z,Zi=new z,Ji=new z,Ar=new z,va=new z,el=new z,tl=new z,Cr=new z;function Du(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Cr.fromArray(t,s);const o=r.x*Math.abs(Cr.x)+r.y*Math.abs(Cr.y)+r.z*Math.abs(Cr.z),l=e.dot(Cr),c=n.dot(Cr),u=i.dot(Cr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Ut=new z,nl=new ze;let WM=0;class Gn extends Kr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:WM++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=EM,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)nl.fromBufferAttribute(this,n),nl.applyMatrix3(e),this.setXY(n,nl.x,nl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix3(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix4(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyNormalMatrix(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.transformDirection(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ma(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=gn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ma(n,this.array)),n}setX(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ma(n,this.array)),n}setY(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ma(n,this.array)),n}setZ(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ma(n,this.array)),n}setW(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array),s=gn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class m_ extends Gn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class g_ extends Gn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class hn extends Gn{constructor(e,n,i){super(new Float32Array(e),n,i)}}const XM=new Zr,_a=new z,Iu=new z;class Mo{constructor(e=new z,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):XM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_a.subVectors(e,this.center);const n=_a.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(_a,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Iu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_a.copy(e.center).add(Iu)),this.expandByPoint(_a.copy(e.center).sub(Iu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let YM=0;const On=new mt,Uu=new Zt,hs=new z,An=new Zr,xa=new Zr,Wt=new z;class jn extends Kr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:YM++}),this.uuid=yo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(TM(e)?g_:m_)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,n,i){return On.makeTranslation(e,n,i),this.applyMatrix4(On),this}scale(e,n,i){return On.makeScale(e,n,i),this.applyMatrix4(On),this}lookAt(e){return Uu.lookAt(e),Uu.updateMatrix(),this.applyMatrix4(Uu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new hn(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];An.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const i=this.boundingSphere.center;if(An.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];xa.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(An.min,xa.min),An.expandByPoint(Wt),Wt.addVectors(An.max,xa.max),An.expandByPoint(Wt)):(An.expandByPoint(xa.min),An.expandByPoint(xa.max))}An.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Wt.fromBufferAttribute(o,c),l&&(hs.fromBufferAttribute(e,c),Wt.add(hs)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Gn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let m=0;m<i.count;m++)o[m]=new z,l[m]=new z;const c=new z,u=new z,h=new z,d=new ze,p=new ze,v=new ze,E=new z,g=new z;function f(m,R,L){c.fromBufferAttribute(i,m),u.fromBufferAttribute(i,R),h.fromBufferAttribute(i,L),d.fromBufferAttribute(s,m),p.fromBufferAttribute(s,R),v.fromBufferAttribute(s,L),u.sub(c),h.sub(c),p.sub(d),v.sub(d);const N=1/(p.x*v.y-v.x*p.y);isFinite(N)&&(E.copy(u).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(N),g.copy(h).multiplyScalar(p.x).addScaledVector(u,-v.x).multiplyScalar(N),o[m].add(E),o[R].add(E),o[L].add(E),l[m].add(g),l[R].add(g),l[L].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let m=0,R=_.length;m<R;++m){const L=_[m],N=L.start,F=L.count;for(let Y=N,D=N+F;Y<D;Y+=3)f(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const y=new z,S=new z,T=new z,w=new z;function C(m){T.fromBufferAttribute(r,m),w.copy(T);const R=o[m];y.copy(R),y.sub(T.multiplyScalar(T.dot(R))).normalize(),S.crossVectors(w,R);const N=S.dot(l[m])<0?-1:1;a.setXYZW(m,y.x,y.y,y.z,N)}for(let m=0,R=_.length;m<R;++m){const L=_[m],N=L.start,F=L.count;for(let Y=N,D=N+F;Y<D;Y+=3)C(e.getX(Y+0)),C(e.getX(Y+1)),C(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Gn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new z,s=new z,a=new z,o=new z,l=new z,c=new z,u=new z,h=new z;if(e)for(let d=0,p=e.count;d<p;d+=3){const v=e.getX(d+0),E=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,E),a.fromBufferAttribute(n,g),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),a.fromBufferAttribute(n,d+2),u.subVectors(a,s),h.subVectors(r,s),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Wt.fromBufferAttribute(e,n),Wt.normalize(),e.setXYZ(n,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,v=0;for(let E=0,g=l.length;E<g;E++){o.isInterleavedBufferAttribute?p=l[E]*o.data.stride+o.offset:p=l[E]*u;for(let f=0;f<u;f++)d[v++]=c[p++]}return new Gn(d,u,h)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new jn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fu=new z,jM=new z,qM=new Xe;class ir{constructor(e=new z(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Fu.subVectors(i,n).cross(jM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Fu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||qM.getNormalMatrix(e),r=this.coplanarPoint(Fu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let $M=0;class Eo extends Kr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$M++}),this.uuid=yo(),this.name="",this.type="Material",this.blending=Va,this.side=Xr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qv,this.blendDst=$v,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=co,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gu,this.stencilZFail=gu,this.stencilZPass=gu,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ge(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ge(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new it().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ir().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const bi=new z,Ou=new z,il=new z,rl=new z;class KM{constructor(e=new z,n=new z(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=bi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,n),bi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Ou.copy(e).add(n).multiplyScalar(.5),il.copy(n).sub(e).normalize(),rl.copy(this.origin).sub(Ou);const s=e.distanceTo(n)*.5,a=-this.direction.dot(il),o=rl.dot(this.direction),l=-rl.dot(il),c=rl.lengthSq(),u=Math.abs(1-a*a);let h,d,p,v;if(u>0)if(h=a*l-o,d=a*o-l,v=s*u,h>=0)if(d>=-v)if(d<=v){const E=1/u;h*=E,d*=E,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-v?(h=Math.max(0,-(-a*s+o)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=v?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(a*s+o)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=a>0?-s:s,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Ou).addScaledVector(il,d),p}intersectSphere(e,n){if(e.radius<0)return null;bi.subVectors(e.center,this.origin);const i=bi.dot(this.direction),r=bi.dot(bi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,n,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=e.x-a.x,d=e.y-a.y,p=e.z-a.z,v=n.x-a.x,E=n.y-a.y,g=n.z-a.z,f=i.x-a.x,_=i.y-a.y,y=i.z-a.z,S=Math.abs(l),T=Math.abs(c),w=Math.abs(u);let C,m,R,L,N,F,Y,D,G,te,j,H;if(S>=T&&S>=w?(R=l,F=h,G=v,H=f,l>=0?(C=c,m=u,L=d,N=p,Y=E,D=g,te=_,j=y):(C=u,m=c,L=p,N=d,Y=g,D=E,te=y,j=_)):T>=w?(R=c,F=d,G=E,H=_,c>=0?(C=u,m=l,L=p,N=h,Y=g,D=v,te=y,j=f):(C=l,m=u,L=h,N=p,Y=v,D=g,te=f,j=y)):(R=u,F=p,G=g,H=y,u>=0?(C=l,m=c,L=h,N=d,Y=v,D=E,te=f,j=_):(C=c,m=l,L=d,N=h,Y=E,D=v,te=_,j=f)),R===0)return null;const k=C/R,W=m/R,ee=1/R,ve=L-k*F,de=N-W*F,We=Y-k*G,q=D-W*G,ie=te-k*H,B=j-W*H,X=ie*q-B*We,ue=ve*B-de*ie,_e=We*de-q*ve;if(r){if(X<0||ue<0||_e<0)return null}else if((X<0||ue<0||_e<0)&&(X>0||ue>0||_e>0))return null;const fe=X+ue+_e;if(fe===0)return null;const Ue=ee*(X*F+ue*G+_e*H);return(fe>0?Ue<0:Ue>0)?null:this.at(Ue/fe,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class v_ extends Eo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sr,this.combine=Kv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bm=new mt,Rr=new KM,sl=new Mo,km=new z,al=new z,ol=new z,ll=new z,Bu=new z,cl=new z,zm=new z,ul=new z;class dt extends Zt{constructor(e=new jn,n=new v_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){cl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],h=s[l];u!==0&&(Bu.fromBufferAttribute(h,e),a?cl.addScaledVector(Bu,u):cl.addScaledVector(Bu.sub(n),u))}n.add(cl)}return n}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),sl.copy(i.boundingSphere),sl.applyMatrix4(s),Rr.copy(e.ray).recast(e.near),!(sl.containsPoint(Rr.origin)===!1&&(Rr.intersectSphere(sl,km)===null||Rr.origin.distanceToSquared(km)>(e.far-e.near)**2))&&(Bm.copy(s).invert(),Rr.copy(e.ray).applyMatrix4(Bm),!(i.boundingBox!==null&&Rr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Rr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,E=d.length;v<E;v++){const g=d[v],f=a[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let S=_,T=y;S<T;S+=3){const w=o.getX(S),C=o.getX(S+1),m=o.getX(S+2);r=dl(this,f,e,i,c,u,h,w,C,m),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),E=Math.min(o.count,p.start+p.count);for(let g=v,f=E;g<f;g+=3){const _=o.getX(g),y=o.getX(g+1),S=o.getX(g+2);r=dl(this,a,e,i,c,u,h,_,y,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,E=d.length;v<E;v++){const g=d[v],f=a[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let S=_,T=y;S<T;S+=3){const w=S,C=S+1,m=S+2;r=dl(this,f,e,i,c,u,h,w,C,m),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),E=Math.min(l.count,p.start+p.count);for(let g=v,f=E;g<f;g+=3){const _=g,y=g+1,S=g+2;r=dl(this,a,e,i,c,u,h,_,y,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function ZM(t,e,n,i,r,s,a,o){let l;if(e.side===wn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Xr,o),l===null)return null;ul.copy(o),ul.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(ul);return c<n.near||c>n.far?null:{distance:c,point:ul.clone(),object:t}}function dl(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,al),t.getVertexPosition(l,ol),t.getVertexPosition(c,ll);const u=ZM(t,e,n,i,al,ol,ll,zm);if(u){const h=new z;ni.getBarycoord(zm,al,ol,ll,h),r&&(u.uv=ni.getInterpolatedAttribute(r,o,l,c,h,new ze)),s&&(u.uv1=ni.getInterpolatedAttribute(s,o,l,c,h,new ze)),a&&(u.normal=ni.getInterpolatedAttribute(a,o,l,c,h,new z),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new z,materialIndex:0};ni.getNormal(al,ol,ll,d.normal),u.face=d,u.barycoord=h}return u}class __ extends fn{constructor(e=null,n=1,i=1,r,s,a,o,l,c=$t,u=$t,h,d){super(null,a,o,l,c,u,r,s,h,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hm extends Gn{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ps=new mt,Vm=new mt,fl=[],Gm=new Zr,JM=new mt,Sa=new dt,ya=new Mo;class QM extends dt{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Hm(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,JM)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new Zr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,ps),Gm.copy(e.boundingBox).applyMatrix4(ps),this.boundingBox.union(Gm)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Mo),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,ps),ya.copy(e.boundingSphere).applyMatrix4(ps),this.boundingSphere.union(ya)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,a=e*s+1;for(let o=0;o<i.length;o++)i[o]=r[a+o]}raycast(e,n){const i=this.matrixWorld,r=this.count;if(Sa.geometry=this.geometry,Sa.material=this.material,Sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ya.copy(this.boundingSphere),ya.applyMatrix4(i),e.ray.intersectsSphere(ya)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,ps),Vm.multiplyMatrices(i,ps),Sa.matrixWorld=Vm,Sa.raycast(e,fl);for(let a=0,o=fl.length;a<o;a++){const l=fl[a];l.instanceId=s,l.object=this,n.push(l)}fl.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new Hm(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new __(new Float32Array(r*this.count),r,this.count,Nh,ii));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const br=new Mo,eE=new ze(.5,.5),hl=new z;class kh{constructor(e=new ir,n=new ir,i=new ir,r=new ir,s=new ir,a=new ir){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=gi,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],h=s[5],d=s[6],p=s[7],v=s[8],E=s[9],g=s[10],f=s[11],_=s[12],y=s[13],S=s[14],T=s[15];if(r[0].setComponents(c-a,p-u,f-v,T-_).normalize(),r[1].setComponents(c+a,p+u,f+v,T+_).normalize(),r[2].setComponents(c+o,p+h,f+E,T+y).normalize(),r[3].setComponents(c-o,p-h,f-E,T-y).normalize(),i)r[4].setComponents(l,d,g,S).normalize(),r[5].setComponents(c-l,p-d,f-g,T-S).normalize();else if(r[4].setComponents(c-l,p-d,f-g,T-S).normalize(),n===gi)r[5].setComponents(c+l,p+d,f+g,T+S).normalize();else if(n===ho)r[5].setComponents(l,d,g,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(br)}intersectsSprite(e){br.center.set(0,0,0);const n=eE.distanceTo(e.center);return br.radius=.7071067811865476+n,br.applyMatrix4(e.matrixWorld),this.intersectsSphere(br)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(hl.x=r.normal.x>0?e.max.x:e.min.x,hl.y=r.normal.y>0?e.max.y:e.min.y,hl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(hl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class x_ extends fn{constructor(e=[],n=Yr,i,r,s,a,o,l,c,u){super(e,n,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class po extends fn{constructor(e,n,i=Si,r,s,a,o=$t,l=$t,c,u=Gi,h=1){if(u!==Gi&&u!==Or)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:h};super(d,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return n.compareFunction=this.compareFunction,n}}class tE extends po{constructor(e,n=Si,i=Yr,r,s,a=$t,o=$t,l,c=Gi){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,n,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class S_ extends fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class qt extends jn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,p=0;v("z","y","x",-1,-1,i,n,e,a,s,0),v("z","y","x",1,-1,i,n,-e,a,s,1),v("x","z","y",1,1,e,i,n,r,a,2),v("x","z","y",1,-1,e,i,-n,r,a,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new hn(c,3)),this.setAttribute("normal",new hn(u,3)),this.setAttribute("uv",new hn(h,2));function v(E,g,f,_,y,S,T,w,C,m,R){const L=S/C,N=T/m,F=S/2,Y=T/2,D=w/2,G=C+1,te=m+1;let j=0,H=0;const k=new z;for(let W=0;W<te;W++){const ee=W*N-Y;for(let ve=0;ve<G;ve++){const de=ve*L-F;k[E]=de*_,k[g]=ee*y,k[f]=D,c.push(k.x,k.y,k.z),k[E]=0,k[g]=0,k[f]=w>0?1:-1,u.push(k.x,k.y,k.z),h.push(ve/C),h.push(1-W/m),j+=1}}for(let W=0;W<m;W++)for(let ee=0;ee<C;ee++){const ve=d+ee+G*W,de=d+ee+G*(W+1),We=d+(ee+1)+G*(W+1),q=d+(ee+1)+G*W;l.push(ve,de,q),l.push(de,We,q),H+=6}o.addGroup(p,H,R),p+=H,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ga extends jn{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],h=[],d=[],p=[];let v=0;const E=[],g=i/2;let f=0;_(),a===!1&&(e>0&&y(!0),n>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new hn(h,3)),this.setAttribute("normal",new hn(d,3)),this.setAttribute("uv",new hn(p,2));function _(){const S=new z,T=new z;let w=0;const C=(n-e)/i;for(let m=0;m<=s;m++){const R=[],L=m/s,N=L*(n-e)+e;for(let F=0;F<=r;F++){const Y=F/r,D=Y*l+o,G=Math.sin(D),te=Math.cos(D);T.x=N*G,T.y=-L*i+g,T.z=N*te,h.push(T.x,T.y,T.z),S.set(G,C,te).normalize(),d.push(S.x,S.y,S.z),p.push(Y,1-L),R.push(v++)}E.push(R)}for(let m=0;m<r;m++)for(let R=0;R<s;R++){const L=E[R][m],N=E[R+1][m],F=E[R+1][m+1],Y=E[R][m+1];(e>0||R!==0)&&(u.push(L,N,Y),w+=3),(n>0||R!==s-1)&&(u.push(N,F,Y),w+=3)}c.addGroup(f,w,0),f+=w}function y(S){const T=v,w=new ze,C=new z;let m=0;const R=S===!0?e:n,L=S===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,g*L,0),d.push(0,L,0),p.push(.5,.5),v++;const N=v;for(let F=0;F<=r;F++){const D=F/r*l+o,G=Math.cos(D),te=Math.sin(D);C.x=R*te,C.y=g*L,C.z=R*G,h.push(C.x,C.y,C.z),d.push(0,L,0),w.x=G*.5+.5,w.y=te*.5*L+.5,p.push(w.x,w.y),v++}for(let F=0;F<r;F++){const Y=T+F,D=N+F;S===!0?u.push(D,D+1,Y):u.push(D+1,D,Y),m+=3}c.addGroup(f,m,S===!0?1:2),f+=m}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ga(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ei{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ge("Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let r=0;const s=i.length;let a;n?a=n:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const u=i[r],d=i[r+1]-u,p=(a-u)/d;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=n||(a.isVector2?new ze:new z);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new z,r=[],s=[],a=[],o=new z,l=new mt;for(let p=0;p<=e;p++){const v=p/e;r[p]=this.getTangentAt(v,new z)}s[0]=new z,a[0]=new z;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(et(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,v))}a[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(et(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],p*v)),a[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class y_ extends Ei{constructor(e=0,n=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,n=new ze){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*u-p*h+this.aX,c=d*h+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class nE extends y_{constructor(e,n,i,r,s,a){super(e,n,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function zh(){let t=0,e=0,n=0,i=0;function r(s,a,o,l){t=s,e=o,n=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,h){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,p=(o-a)/u-(l-a)/(u+h)+(l-o)/h;d*=u,p*=u,r(a,o,d,p)},calc:function(s){const a=s*s,o=a*s;return t+e*s+n*a+i*o}}}const Wm=new z,Xm=new z,ku=new zh,zu=new zh,Hu=new zh;class iE extends Ei{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new z){const i=n,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Xm.subVectors(r[0],r[1]).add(r[0]),c=Xm);const h=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Wm.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Wm),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),p),E=Math.pow(h.distanceToSquared(d),p),g=Math.pow(d.distanceToSquared(u),p);E<1e-4&&(E=1),v<1e-4&&(v=E),g<1e-4&&(g=E),ku.initNonuniformCatmullRom(c.x,h.x,d.x,u.x,v,E,g),zu.initNonuniformCatmullRom(c.y,h.y,d.y,u.y,v,E,g),Hu.initNonuniformCatmullRom(c.z,h.z,d.z,u.z,v,E,g)}else this.curveType==="catmullrom"&&(ku.initCatmullRom(c.x,h.x,d.x,u.x,this.tension),zu.initCatmullRom(c.y,h.y,d.y,u.y,this.tension),Hu.initCatmullRom(c.z,h.z,d.z,u.z,this.tension));return i.set(ku.calc(l),zu.calc(l),Hu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new z().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ym(t,e,n,i,r){const s=(i-e)*.5,a=(r-n)*.5,o=t*t,l=t*o;return(2*n-2*i+s+a)*l+(-3*n+3*i-2*s-a)*o+s*t+n}function rE(t,e){const n=1-t;return n*n*e}function sE(t,e){return 2*(1-t)*t*e}function aE(t,e){return t*t*e}function Wa(t,e,n,i){return rE(t,e)+sE(t,n)+aE(t,i)}function oE(t,e){const n=1-t;return n*n*n*e}function lE(t,e){const n=1-t;return 3*n*n*t*e}function cE(t,e){return 3*(1-t)*t*t*e}function uE(t,e){return t*t*t*e}function Xa(t,e,n,i,r){return oE(t,e)+lE(t,n)+cE(t,i)+uE(t,r)}class dE extends Ei{constructor(e=new ze,n=new ze,i=new ze,r=new ze){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new ze){const i=n,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Xa(e,r.x,s.x,a.x,o.x),Xa(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fE extends Ei{constructor(e=new z,n=new z,i=new z,r=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new z){const i=n,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Xa(e,r.x,s.x,a.x,o.x),Xa(e,r.y,s.y,a.y,o.y),Xa(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hE extends Ei{constructor(e=new ze,n=new ze){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ze){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ze){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class M_ extends Ei{constructor(e=new z,n=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new z){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new z){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pE extends Ei{constructor(e=new ze,n=new ze,i=new ze){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ze){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(Wa(e,r.x,s.x,a.x),Wa(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mE extends Ei{constructor(e=new z,n=new z,i=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new z){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(Wa(e,r.x,s.x,a.x),Wa(e,r.y,s.y,a.y),Wa(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gE extends Ei{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ze){const i=n,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set(Ym(o,l.x,c.x,u.x,h.x),Ym(o,l.y,c.y,u.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new ze().fromArray(r))}return this}}var jm=Object.freeze({__proto__:null,ArcCurve:nE,CatmullRomCurve3:iE,CubicBezierCurve:dE,CubicBezierCurve3:fE,EllipseCurve:y_,LineCurve:hE,LineCurve3:M_,QuadraticBezierCurve:pE,QuadraticBezierCurve3:mE,SplineCurve:gE});class vE extends Ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jm[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new jm[r.type]().fromJSON(r))}return this}}class Pc extends jn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,h=e/o,d=n/l,p=[],v=[],E=[],g=[];for(let f=0;f<u;f++){const _=f*d-a;for(let y=0;y<c;y++){const S=y*h-s;v.push(S,-_,0),E.push(0,0,1),g.push(y/o),g.push(1-f/l)}}for(let f=0;f<l;f++)for(let _=0;_<o;_++){const y=_+c*f,S=_+c*(f+1),T=_+1+c*(f+1),w=_+1+c*f;p.push(y,S,w),p.push(S,T,w)}this.setIndex(p),this.setAttribute("position",new hn(v,3)),this.setAttribute("normal",new hn(E,3)),this.setAttribute("uv",new hn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pc(e.width,e.height,e.widthSegments,e.heightSegments)}}class dc extends jn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new z,d=new z,p=[],v=[],E=[],g=[];for(let f=0;f<=i;f++){const _=[],y=f/i,S=a+y*o,T=e*Math.cos(S),w=Math.sqrt(e*e-T*T);let C=0;f===0&&a===0?C=.5/n:f===i&&l===Math.PI&&(C=-.5/n);for(let m=0;m<=n;m++){const R=m/n,L=r+R*s;h.x=-w*Math.cos(L),h.y=T,h.z=w*Math.sin(L),v.push(h.x,h.y,h.z),d.copy(h).normalize(),E.push(d.x,d.y,d.z),g.push(R+C,1-y),_.push(c++)}u.push(_)}for(let f=0;f<i;f++)for(let _=0;_<n;_++){const y=u[f][_+1],S=u[f][_],T=u[f+1][_],w=u[f+1][_+1];(f!==0||a>0)&&p.push(y,S,w),(f!==i-1||l<Math.PI)&&p.push(S,T,w)}this.setIndex(p),this.setAttribute("position",new hn(v,3)),this.setAttribute("normal",new hn(E,3)),this.setAttribute("uv",new hn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dc(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Ks(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(qm(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(qm(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function cn(t){const e={};for(let n=0;n<t.length;n++){const i=Ks(t[n]);for(const r in i)e[r]=i[r]}return e}function qm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function _E(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function E_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const xE={clone:Ks,merge:cn};var SE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mi extends Eo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=SE,this.fragmentShader=yE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=_E(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new it().setHex(r.value);break;case"v2":this.uniforms[i].value=new ze().fromArray(r.value);break;case"v3":this.uniforms[i].value=new z().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Tt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Xe().fromArray(r.value);break;case"m4":this.uniforms[i].value=new mt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ME extends Mi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class vn extends Eo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=bf,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class EE extends Eo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wE extends Eo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class w_ extends Zt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=n}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class TE extends w_{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new it(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}toJSON(e){const n=super.toJSON(e);return n.object.groundColor=this.groundColor.getHex(),n}}const Vu=new mt,$m=new z,Km=new z;class AE{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new kh,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera;$m.setFromMatrixPosition(e.matrixWorld),n.position.copy($m),Km.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Km),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(e,n,i,r){Vu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Vu,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===ho||e.reversedDepth?n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),n.multiply(Vu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const pl=new z,ml=new ta,di=new z;class T_ extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(pl,ml,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pl,ml,di.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(pl,ml,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(pl,ml,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new z,Zm=new ze,Jm=new ze;class ti extends T_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Pf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pf*2*Math.atan(Math.tan(vu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,n){return this.getViewBounds(e,Zm,Jm),n.subVectors(Jm,Zm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(vu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Lc extends T_{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class CE extends AE{constructor(){super(new Lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class RE extends w_{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new CE}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const ms=-90,gs=1;class bE extends Zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ti(ms,gs,e,n);r.layers=this.layers,this.add(r);const s=new ti(ms,gs,e,n);s.layers=this.layers,this.add(s);const a=new ti(ms,gs,e,n);a.layers=this.layers,this.add(a);const o=new ti(ms,gs,e,n);o.layers=this.layers,this.add(o);const l=new ti(ms,gs,e,n);l.layers=this.layers,this.add(l);const c=new ti(ms,gs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===gi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ho)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(h,d,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class PE extends ti{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Yh=class Yh{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Yh.prototype.isMatrix2=!0;let Qm=Yh;function eg(t,e,n,i){const r=LE(i);switch(n){case c_:return t*e;case Nh:return t*e/r.components*r.byteLength;case Dh:return t*e/r.components*r.byteLength;case jr:return t*e*2/r.components*r.byteLength;case Ih:return t*e*2/r.components*r.byteLength;case u_:return t*e*3/r.components*r.byteLength;case ri:return t*e*4/r.components*r.byteLength;case Uh:return t*e*4/r.components*r.byteLength;case Pl:case Ll:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Nl:case Dl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Qd:case tf:return Math.max(t,16)*Math.max(e,8)/4;case Jd:case ef:return Math.max(t,8)*Math.max(e,8)/2;case nf:case rf:case af:case of:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case sf:case ac:case lf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case cf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case uf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case df:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case ff:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case hf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case pf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case mf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case gf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case vf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case _f:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case xf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Sf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case yf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Mf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Ef:case wf:case Tf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Af:case Cf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case oc:case Rf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function LE(t){switch(t){case Pn:case s_:return{byteLength:1,components:1};case uo:case a_:case yi:return{byteLength:2,components:1};case Ph:case Lh:return{byteLength:2,components:4};case Si:case bh:case ii:return{byteLength:4,components:1};case o_:case l_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rh}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function A_(){let t=null,e=!1,n=null,i=null;function r(s,a){i=t.requestAnimationFrame(r),n(s,a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function NE(t){const e=new WeakMap;function n(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,u);else{h.sort((p,v)=>p.start-v.start);let d=0;for(let p=1;p<h.length;p++){const v=h[d],E=h[p];E.start<=v.start+v.count+1?v.count=Math.max(v.count,E.start+E.count-v.start):(++d,h[d]=E)}h.length=d+1;for(let p=0,v=h.length;p<v;p++){const E=h[p];t.bufferSubData(c,E.start*u.BYTES_PER_ELEMENT,u,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var DE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,IE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,UE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,FE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,OE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,BE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,zE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,HE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,VE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,GE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,YE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,jE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$E=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,KE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ZE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,JE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,QE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,e1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,t1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,n1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,i1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,r1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,s1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,a1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,o1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,l1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,c1="gl_FragColor = linearToOutputTexel( gl_FragColor );",u1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,d1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,f1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,h1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,p1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,m1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,g1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,v1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,x1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,S1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,y1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,M1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,E1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,w1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,T1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,A1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,C1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,R1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,b1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,P1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,L1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,N1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,D1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,I1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,F1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,O1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,z1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,H1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,V1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,G1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,X1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,j1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,K1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Z1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,J1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ew=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,nw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,iw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,aw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ow=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,cw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,gw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_w=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,xw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ew=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ww=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Aw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Rw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Pw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Lw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Iw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Uw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ow=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Hw=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Vw=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Gw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ww=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xw=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yw=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,qw=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$w=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kw=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zw=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Jw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,lT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:DE,alphahash_pars_fragment:IE,alphamap_fragment:UE,alphamap_pars_fragment:FE,alphatest_fragment:OE,alphatest_pars_fragment:BE,aomap_fragment:kE,aomap_pars_fragment:zE,batching_pars_vertex:HE,batching_vertex:VE,begin_vertex:GE,beginnormal_vertex:WE,bsdfs:XE,iridescence_fragment:YE,bumpmap_pars_fragment:jE,clipping_planes_fragment:qE,clipping_planes_pars_fragment:$E,clipping_planes_pars_vertex:KE,clipping_planes_vertex:ZE,color_fragment:JE,color_pars_fragment:QE,color_pars_vertex:e1,color_vertex:t1,common:n1,cube_uv_reflection_fragment:i1,defaultnormal_vertex:r1,displacementmap_pars_vertex:s1,displacementmap_vertex:a1,emissivemap_fragment:o1,emissivemap_pars_fragment:l1,colorspace_fragment:c1,colorspace_pars_fragment:u1,envmap_fragment:d1,envmap_common_pars_fragment:f1,envmap_pars_fragment:h1,envmap_pars_vertex:p1,envmap_physical_pars_fragment:T1,envmap_vertex:m1,fog_vertex:g1,fog_pars_vertex:v1,fog_fragment:_1,fog_pars_fragment:x1,gradientmap_pars_fragment:S1,lightmap_pars_fragment:y1,lights_lambert_fragment:M1,lights_lambert_pars_fragment:E1,lights_pars_begin:w1,lights_toon_fragment:A1,lights_toon_pars_fragment:C1,lights_phong_fragment:R1,lights_phong_pars_fragment:b1,lights_physical_fragment:P1,lights_physical_pars_fragment:L1,lights_fragment_begin:N1,lights_fragment_maps:D1,lights_fragment_end:I1,lightprobes_pars_fragment:U1,logdepthbuf_fragment:F1,logdepthbuf_pars_fragment:O1,logdepthbuf_pars_vertex:B1,logdepthbuf_vertex:k1,map_fragment:z1,map_pars_fragment:H1,map_particle_fragment:V1,map_particle_pars_fragment:G1,metalnessmap_fragment:W1,metalnessmap_pars_fragment:X1,morphinstance_vertex:Y1,morphcolor_vertex:j1,morphnormal_vertex:q1,morphtarget_pars_vertex:$1,morphtarget_vertex:K1,normal_fragment_begin:Z1,normal_fragment_maps:J1,normal_pars_fragment:Q1,normal_pars_vertex:ew,normal_vertex:tw,normalmap_pars_fragment:nw,clearcoat_normal_fragment_begin:iw,clearcoat_normal_fragment_maps:rw,clearcoat_pars_fragment:sw,iridescence_pars_fragment:aw,opaque_fragment:ow,packing:lw,premultiplied_alpha_fragment:cw,project_vertex:uw,dithering_fragment:dw,dithering_pars_fragment:fw,roughnessmap_fragment:hw,roughnessmap_pars_fragment:pw,shadowmap_pars_fragment:mw,shadowmap_pars_vertex:gw,shadowmap_vertex:vw,shadowmask_pars_fragment:_w,skinbase_vertex:xw,skinning_pars_vertex:Sw,skinning_vertex:yw,skinnormal_vertex:Mw,specularmap_fragment:Ew,specularmap_pars_fragment:ww,tonemapping_fragment:Tw,tonemapping_pars_fragment:Aw,transmission_fragment:Cw,transmission_pars_fragment:Rw,uv_pars_fragment:bw,uv_pars_vertex:Pw,uv_vertex:Lw,worldpos_vertex:Nw,background_vert:Dw,background_frag:Iw,backgroundCube_vert:Uw,backgroundCube_frag:Fw,cube_vert:Ow,cube_frag:Bw,depth_vert:kw,depth_frag:zw,distance_vert:Hw,distance_frag:Vw,equirect_vert:Gw,equirect_frag:Ww,linedashed_vert:Xw,linedashed_frag:Yw,meshbasic_vert:jw,meshbasic_frag:qw,meshlambert_vert:$w,meshlambert_frag:Kw,meshmatcap_vert:Zw,meshmatcap_frag:Jw,meshnormal_vert:Qw,meshnormal_frag:eT,meshphong_vert:tT,meshphong_frag:nT,meshphysical_vert:iT,meshphysical_frag:rT,meshtoon_vert:sT,meshtoon_frag:aT,points_vert:oT,points_frag:lT,shadow_vert:cT,shadow_frag:uT,sprite_vert:dT,sprite_frag:fT},we={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},pi={basic:{uniforms:cn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:cn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:cn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:cn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:cn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new it(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:cn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:cn([we.points,we.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:cn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:cn([we.common,we.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:cn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:cn([we.sprite,we.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:cn([we.common,we.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:cn([we.lights,we.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};pi.physical={uniforms:cn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const gl={r:0,b:0,g:0},hT=new mt,C_=new Xe;C_.set(-1,0,0,0,1,0,0,0,1);function pT(t,e,n,i,r,s){const a=new it(0);let o=r===!0?0:1,l,c,u=null,h=0,d=null;function p(_){let y=_.isScene===!0?_.background:null;if(y&&y.isTexture){const S=_.backgroundBlurriness>0;y=e.get(y,S)}return y}function v(_){let y=!1;const S=p(_);S===null?g(a,o):S&&S.isColor&&(g(S,1),y=!0);const T=t.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(_,y){const S=p(y);S&&(S.isCubeTexture||S.mapping===bc)?(c===void 0&&(c=new dt(new qt(1,1,1),new Mi({name:"BackgroundCubeMaterial",uniforms:Ks(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(hT.makeRotationFromEuler(y.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(C_),c.material.toneMapped=nt.getTransfer(S.colorSpace)!==ut,(u!==S||h!==S.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,u=S,h=S.version,d=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new dt(new Pc(2,2),new Mi({name:"BackgroundMaterial",uniforms:Ks(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:Xr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=nt.getTransfer(S.colorSpace)!==ut,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||h!==S.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,u=S,h=S.version,d=t.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function g(_,y){_.getRGB(gl,E_(t)),n.buffers.color.setClear(gl.r,gl.g,gl.b,y,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),o=y,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,g(a,o)},render:v,addToRenderList:E,dispose:f}}function mT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(N,F,Y,D,G){let te=!1;const j=h(N,D,Y,F);s!==j&&(s=j,c(s.object)),te=p(N,D,Y,G),te&&v(N,D,Y,G),G!==null&&e.update(G,t.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,S(N,F,Y,D),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return t.createVertexArray()}function c(N){return t.bindVertexArray(N)}function u(N){return t.deleteVertexArray(N)}function h(N,F,Y,D){const G=D.wireframe===!0;let te=i[F.id];te===void 0&&(te={},i[F.id]=te);const j=N.isInstancedMesh===!0?N.id:0;let H=te[j];H===void 0&&(H={},te[j]=H);let k=H[Y.id];k===void 0&&(k={},H[Y.id]=k);let W=k[G];return W===void 0&&(W=d(l()),k[G]=W),W}function d(N){const F=[],Y=[],D=[];for(let G=0;G<n;G++)F[G]=0,Y[G]=0,D[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:Y,attributeDivisors:D,object:N,attributes:{},index:null}}function p(N,F,Y,D){const G=s.attributes,te=F.attributes;let j=0;const H=Y.getAttributes();for(const k in H)if(H[k].location>=0){const ee=G[k];let ve=te[k];if(ve===void 0&&(k==="instanceMatrix"&&N.instanceMatrix&&(ve=N.instanceMatrix),k==="instanceColor"&&N.instanceColor&&(ve=N.instanceColor)),ee===void 0||ee.attribute!==ve||ve&&ee.data!==ve.data)return!0;j++}return s.attributesNum!==j||s.index!==D}function v(N,F,Y,D){const G={},te=F.attributes;let j=0;const H=Y.getAttributes();for(const k in H)if(H[k].location>=0){let ee=te[k];ee===void 0&&(k==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),k==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor));const ve={};ve.attribute=ee,ee&&ee.data&&(ve.data=ee.data),G[k]=ve,j++}s.attributes=G,s.attributesNum=j,s.index=D}function E(){const N=s.newAttributes;for(let F=0,Y=N.length;F<Y;F++)N[F]=0}function g(N){f(N,0)}function f(N,F){const Y=s.newAttributes,D=s.enabledAttributes,G=s.attributeDivisors;Y[N]=1,D[N]===0&&(t.enableVertexAttribArray(N),D[N]=1),G[N]!==F&&(t.vertexAttribDivisor(N,F),G[N]=F)}function _(){const N=s.newAttributes,F=s.enabledAttributes;for(let Y=0,D=F.length;Y<D;Y++)F[Y]!==N[Y]&&(t.disableVertexAttribArray(Y),F[Y]=0)}function y(N,F,Y,D,G,te,j){j===!0?t.vertexAttribIPointer(N,F,Y,G,te):t.vertexAttribPointer(N,F,Y,D,G,te)}function S(N,F,Y,D){E();const G=D.attributes,te=Y.getAttributes(),j=F.defaultAttributeValues;for(const H in te){const k=te[H];if(k.location>=0){let W=G[H];if(W===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(W=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(W=N.instanceColor)),W!==void 0){const ee=W.normalized,ve=W.itemSize,de=e.get(W);if(de===void 0)continue;const We=de.buffer,q=de.type,ie=de.bytesPerElement,B=q===t.INT||q===t.UNSIGNED_INT||W.gpuType===bh;if(W.isInterleavedBufferAttribute){const X=W.data,ue=X.stride,_e=W.offset;if(X.isInstancedInterleavedBuffer){for(let fe=0;fe<k.locationSize;fe++)f(k.location+fe,X.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let fe=0;fe<k.locationSize;fe++)g(k.location+fe);t.bindBuffer(t.ARRAY_BUFFER,We);for(let fe=0;fe<k.locationSize;fe++)y(k.location+fe,ve/k.locationSize,q,ee,ue*ie,(_e+ve/k.locationSize*fe)*ie,B)}else{if(W.isInstancedBufferAttribute){for(let X=0;X<k.locationSize;X++)f(k.location+X,W.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let X=0;X<k.locationSize;X++)g(k.location+X);t.bindBuffer(t.ARRAY_BUFFER,We);for(let X=0;X<k.locationSize;X++)y(k.location+X,ve/k.locationSize,q,ee,ve*ie,ve/k.locationSize*X*ie,B)}}else if(j!==void 0){const ee=j[H];if(ee!==void 0)switch(ee.length){case 2:t.vertexAttrib2fv(k.location,ee);break;case 3:t.vertexAttrib3fv(k.location,ee);break;case 4:t.vertexAttrib4fv(k.location,ee);break;default:t.vertexAttrib1fv(k.location,ee)}}}}_()}function T(){R();for(const N in i){const F=i[N];for(const Y in F){const D=F[Y];for(const G in D){const te=D[G];for(const j in te)u(te[j].object),delete te[j];delete D[G]}}delete i[N]}}function w(N){if(i[N.id]===void 0)return;const F=i[N.id];for(const Y in F){const D=F[Y];for(const G in D){const te=D[G];for(const j in te)u(te[j].object),delete te[j];delete D[G]}}delete i[N.id]}function C(N){for(const F in i){const Y=i[F];for(const D in Y){const G=Y[D];if(G[N.id]===void 0)continue;const te=G[N.id];for(const j in te)u(te[j].object),delete te[j];delete G[N.id]}}}function m(N){for(const F in i){const Y=i[F],D=N.isInstancedMesh===!0?N.id:0,G=Y[D];if(G!==void 0){for(const te in G){const j=G[te];for(const H in j)u(j[H].object),delete j[H];delete G[te]}delete Y[D],Object.keys(Y).length===0&&delete i[F]}}}function R(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:R,resetDefaultState:L,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:m,releaseStatesOfProgram:C,initAttributes:E,enableAttribute:g,disableUnusedAttributes:_}}function gT(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,u){u!==0&&(t.drawArraysInstanced(i,l,c,u),n.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let p=0;p<u;p++)d+=c[p];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function vT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==ri&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const m=C===yi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Pn&&C!==ii&&!m&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(Ge("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),y=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),T=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:v,maxTextureSize:E,maxCubemapSize:g,maxAttributes:f,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:S,maxSamples:T,samples:w}}function _T(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new ir,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){n=u(h,d,0)},this.setState=function(h,d,p){const v=h.clippingPlanes,E=h.clipIntersection,g=h.clipShadows,f=t.get(h);if(!r||v===null||v.length===0||s&&!g)s?u(null):c();else{const _=s?0:i,y=_*4;let S=f.clippingState||null;l.value=S,S=u(v,d,y,p);for(let T=0;T!==y;++T)S[T]=n[T];f.clippingState=S,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,p,v){const E=h!==null?h.length:0;let g=null;if(E!==0){if(g=l.value,v!==!0||g===null){const f=p+E*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<f)&&(g=new Float32Array(f));for(let y=0,S=p;y!==E;++y,S+=4)a.copy(h[y]).applyMatrix4(_,o),a.normal.toArray(g,S),g[S+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,g}}const Ls=4,xT=6,ST=20,yT=256,Ma=new Lc,tg=new it;let Gu=null,Wu=0,Xu=0,Yu=!1;const MT=new z,Pr=new z;class ng{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=MT}=s;Gu=this._renderer.getRenderTarget(),Wu=this._renderer.getActiveCubeFace(),Xu=this._renderer.getActiveMipmapLevel(),Yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Gu,Wu,Xu),this._renderer.xr.enabled=Yu,e.scissorTest=!1,vs(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Yr||e.mapping===$s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gu=this._renderer.getRenderTarget(),Wu=this._renderer.getActiveCubeFace(),Xu=this._renderer.getActiveMipmapLevel(),Yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:an,minFilter:an,generateMipmaps:!1,type:yi,format:ri,colorSpace:lc,depthBuffer:!1},r=ig(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ig(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ET(s)),this._blurMaterial=TT(s,e,n),this._ggxMaterial=wT(s,e,n)}return r}_compileMaterial(e){const n=new dt(new jn,e);this._renderer.compile(n,Ma)}_sceneToCubeUV(e,n,i,r,s){const l=new ti(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(tg),h.toneMapping=xi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new dt(new qt,new v_({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,g=E.material;let f=!1;const _=e.background;_?_.isColor&&(g.color.copy(_),e.background=null,f=!0):(g.color.copy(tg),f=!0);for(let y=0;y<6;y++){const S=y%3;S===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[y],s.y,s.z)):S===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[y]));const T=this._cubeSize;vs(r,S*T,y>2?T:0,T,T),h.setRenderTarget(r),f&&h.render(E,l),h.render(e,l)}h.toneMapping=p,h.autoClear=d,e.background=_}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Yr||e.mapping===$s;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rg());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;vs(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,Ma)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=c*1.25,p=h*d,{_lodMax:v}=this,E=this._sizeLods[i],g=3*E*(i>v-Ls?i-v+Ls:0),f=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=v-n,vs(s,g,f,3*E,2*E),r.setRenderTarget(s),r.render(o,Ma),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=v-i,vs(e,g,f,3*E,2*E),r.setRenderTarget(e),r.render(o,Ma)}_blur(e,n,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,n,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,n,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],h=3*u*(r>this._lodMax-Ls?r-this._lodMax+Ls:0),d=4*(this._cubeSize-u);vs(n,h,d,3*u,2*u),a.setRenderTarget(n),a.render(l,Ma)}}function ET(t){const e=[],n=[];let i=t;const r=t-Ls+1+xT;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,d=6,p=3,v=new Float32Array(p*d*h),E=new Float32Array(p*d*h);for(let f=0;f<h;f++){const _=f%3*2/3-1,y=f>2?0:-1,S=[_,y,0,_+2/3,y,0,_+2/3,y+1,0,_,y,0,_+2/3,y+1,0,_,y+1,0];v.set(S,p*d*f);for(let T=0;T<d;T++){const w=u[T*2]*2-1,C=u[T*2+1]*2-1;f===0?Pr.set(1,C,w):f===1?Pr.set(-w,1,-C):f===2?Pr.set(-w,C,1):f===3?Pr.set(-1,C,-w):f===4?Pr.set(-w,-1,C):Pr.set(w,C,-1),Pr.toArray(E,(f*d+T)*p)}}const g=new jn;g.setAttribute("position",new Gn(v,p)),g.setAttribute("outputDirection",new Gn(E,p)),n.push(new dt(g,null)),i>Ls&&i--}return{lodMeshes:n,sizeLods:e}}function ig(t,e,n){const i=new oi(t,e,n);return i.texture.mapping=bc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vs(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function wT(t,e,n){return new Mi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function TT(t,e,n){return new Mi({name:"SphericalGaussianBlur",defines:{SAMPLES:ST,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Nc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function rg(){return new Mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function sg(){return new Mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Nc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class R_ extends oi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new x_(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new qt(5,5,5),s=new Mi({name:"CubemapFromEquirect",uniforms:Ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:wn,blending:Oi});s.uniforms.tEquirect.value=n;const a=new dt(r,s),o=n.minFilter;return n.minFilter===Fr&&(n.minFilter=an),new bE(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function AT(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===hu||p===pu)if(e.has(d)){const v=e.get(d).texture;return o(v,d.mapping)}else{const v=d.image;if(v&&v.height>0){const E=new R_(v.height);return E.fromEquirectangularTexture(t,d),e.set(d,E),d.addEventListener("dispose",c),o(E.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,v=p===hu||p===pu,E=p===Yr||p===$s;if(v||E){let g=n.get(d);const f=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return i===null&&(i=new ng(t)),g=v?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,n.set(d,g),g.texture;if(g!==void 0)return g.texture;{const _=d.image;return v&&_&&_.height>0||E&&_&&l(_)?(i===null&&(i=new ng(t)),g=v?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,n.set(d,g),d.addEventListener("dispose",u),g.texture):null}}}return d}function o(d,p){return p===hu?d.mapping=Yr:p===pu&&(d.mapping=$s),d}function l(d){let p=0;const v=6;for(let E=0;E<v;E++)d[E]!==void 0&&p++;return p===v}function c(d){const p=d.target;p.removeEventListener("dispose",c);const v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const v=n.get(p);v!==void 0&&(n.delete(p),v.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function CT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Bs("WebGLRenderer: "+i+" extension not supported."),r}}}function RT(t,e,n,i){const r={},s=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const v in d.attributes)e.remove(d.attributes[v]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function o(h,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,n.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],t.ARRAY_BUFFER)}function c(h){const d=[],p=h.index,v=h.attributes.position;let E=0;if(v===void 0)return;if(p!==null){const _=p.array;E=p.version;for(let y=0,S=_.length;y<S;y+=3){const T=_[y+0],w=_[y+1],C=_[y+2];d.push(T,w,w,C,C,T)}}else{const _=v.array;E=v.version;for(let y=0,S=_.length/3-1;y<S;y+=3){const T=y+0,w=y+1,C=y+2;d.push(T,w,w,C,C,T)}}const g=new(v.count>=65535?g_:m_)(d,1);g.version=E;const f=s.get(h);f&&e.remove(f),s.set(h,g)}function u(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function bT(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,d){t.drawElements(i,d,s,h*a),n.update(d,i,1)}function c(h,d,p){p!==0&&(t.drawElementsInstanced(i,d,s,h*a,p),n.update(d,i,p))}function u(h,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,p);let E=0;for(let g=0;g<p;g++)E+=d[g];n.update(E,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function PT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:at("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function LT(t,e,n){const i=new WeakMap,r=new Tt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let L=function(){m.dispose(),i.delete(o),o.removeEventListener("dispose",L)};var p=L;d!==void 0&&d.texture.dispose();const v=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let S=0;v===!0&&(S=1),E===!0&&(S=2),g===!0&&(S=3);let T=o.attributes.position.count*S,w=1;T>e.maxTextureSize&&(w=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const C=new Float32Array(T*w*4*h),m=new f_(C,T,w,h);m.type=ii,m.needsUpdate=!0;const R=S*4;for(let N=0;N<h;N++){const F=f[N],Y=_[N],D=y[N],G=T*w*4*N;for(let te=0;te<F.count;te++){const j=te*R;v===!0&&(r.fromBufferAttribute(F,te),C[G+j+0]=r.x,C[G+j+1]=r.y,C[G+j+2]=r.z,C[G+j+3]=0),E===!0&&(r.fromBufferAttribute(Y,te),C[G+j+4]=r.x,C[G+j+5]=r.y,C[G+j+6]=r.z,C[G+j+7]=0),g===!0&&(r.fromBufferAttribute(D,te),C[G+j+8]=r.x,C[G+j+9]=r.y,C[G+j+10]=r.z,C[G+j+11]=D.itemSize===4?r.w:1)}}d={count:h,texture:m,size:new ze(T,w)},i.set(o,d),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let v=0;for(let g=0;g<c.length;g++)v+=c[g];const E=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function NT(t,e,n,i,r){let s=new WeakMap;function a(c){const u=r.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return d}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:a,dispose:o}}const DT={[Zv]:"LINEAR_TONE_MAPPING",[Jv]:"REINHARD_TONE_MAPPING",[Qv]:"CINEON_TONE_MAPPING",[e_]:"ACES_FILMIC_TONE_MAPPING",[n_]:"AGX_TONE_MAPPING",[i_]:"NEUTRAL_TONE_MAPPING",[t_]:"CUSTOM_TONE_MAPPING"};function IT(t,e,n,i,r,s){const a=new oi(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new jn;c.setAttribute("position",new hn([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new hn([0,2,0,0,2,0],2));const u=new ME({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new dt(c,u),d=new Lc(-1,1,1,-1,0,1);let p=null,v=null,E=!1,g,f=null,_=[],y=!1;this.setSize=function(S,T){a.setSize(S,T),o!==null&&o.setSize(S,T),l!==null&&l.setSize(S,T);for(let w=0;w<_.length;w++){const C=_[w];C.setSize&&C.setSize(S,T)}},this.setEffects=function(S){_=S,y=_.length>0&&_[0].isRenderPass===!0;const T=a.width,w=a.height;_.length>0&&o===null&&(o=new oi(T,w,{type:yi,depthBuffer:!1,stencilBuffer:!1}),l=new oi(T,w,{type:yi,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<_.length;C++){const m=_[C];m.setSize&&m.setSize(T,w)}},this.begin=function(S,T){if(E||S.toneMapping===xi&&_.length===0)return!1;if(f=T,T!==null){const w=T.width,C=T.height;(a.width!==w||a.height!==C)&&this.setSize(w,C)}return y===!1&&S.setRenderTarget(a),g=S.toneMapping,S.toneMapping=xi,!0},this.hasRenderPass=function(){return y},this.end=function(S,T){S.toneMapping=g,E=!0;let w=a,C=o;for(let m=0;m<_.length;m++){const R=_[m];R.enabled!==!1&&(R.render(S,C,w,T),R.needsSwap!==!1&&(w=C,C=C===o?l:o))}if(p!==S.outputColorSpace||v!==S.toneMapping){p=S.outputColorSpace,v=S.toneMapping,u.defines={},nt.getTransfer(p)===ut&&(u.defines.SRGB_TRANSFER="");const m=DT[v];m&&(u.defines[m]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,S.setRenderTarget(f),S.render(h,d),f=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}const b_=new fn,Lf=new po(1,1),P_=new f_,L_=new UM,N_=new x_,ag=[],og=[],lg=new Float32Array(16),cg=new Float32Array(9),ug=new Float32Array(4);function na(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=ag[r];if(s===void 0&&(s=new Float32Array(r),ag[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Ht(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Vt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Dc(t,e){let n=og[e];n===void 0&&(n=new Int32Array(e),og[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function UT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function FT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2fv(this.addr,e),Vt(n,e)}}function OT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ht(n,e))return;t.uniform3fv(this.addr,e),Vt(n,e)}}function BT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4fv(this.addr,e),Vt(n,e)}}function kT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Vt(n,e)}else{if(Ht(n,i))return;ug.set(i),t.uniformMatrix2fv(this.addr,!1,ug),Vt(n,i)}}function zT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Vt(n,e)}else{if(Ht(n,i))return;cg.set(i),t.uniformMatrix3fv(this.addr,!1,cg),Vt(n,i)}}function HT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Vt(n,e)}else{if(Ht(n,i))return;lg.set(i),t.uniformMatrix4fv(this.addr,!1,lg),Vt(n,i)}}function VT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function GT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2iv(this.addr,e),Vt(n,e)}}function WT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;t.uniform3iv(this.addr,e),Vt(n,e)}}function XT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4iv(this.addr,e),Vt(n,e)}}function YT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function jT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2uiv(this.addr,e),Vt(n,e)}}function qT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;t.uniform3uiv(this.addr,e),Vt(n,e)}}function $T(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4uiv(this.addr,e),Vt(n,e)}}function KT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Lf.compareFunction=n.isReversedDepthBuffer()?Oh:Fh,s=Lf):s=b_,n.setTexture2D(e||s,r)}function ZT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||L_,r)}function JT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||N_,r)}function QT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||P_,r)}function eA(t){switch(t){case 5126:return UT;case 35664:return FT;case 35665:return OT;case 35666:return BT;case 35674:return kT;case 35675:return zT;case 35676:return HT;case 5124:case 35670:return VT;case 35667:case 35671:return GT;case 35668:case 35672:return WT;case 35669:case 35673:return XT;case 5125:return YT;case 36294:return jT;case 36295:return qT;case 36296:return $T;case 35678:case 36198:case 36298:case 36306:case 35682:return KT;case 35679:case 36299:case 36307:return ZT;case 35680:case 36300:case 36308:case 36293:return JT;case 36289:case 36303:case 36311:case 36292:return QT}}function tA(t,e){t.uniform1fv(this.addr,e)}function nA(t,e){const n=na(e,this.size,2);t.uniform2fv(this.addr,n)}function iA(t,e){const n=na(e,this.size,3);t.uniform3fv(this.addr,n)}function rA(t,e){const n=na(e,this.size,4);t.uniform4fv(this.addr,n)}function sA(t,e){const n=na(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function aA(t,e){const n=na(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function oA(t,e){const n=na(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function lA(t,e){t.uniform1iv(this.addr,e)}function cA(t,e){t.uniform2iv(this.addr,e)}function uA(t,e){t.uniform3iv(this.addr,e)}function dA(t,e){t.uniform4iv(this.addr,e)}function fA(t,e){t.uniform1uiv(this.addr,e)}function hA(t,e){t.uniform2uiv(this.addr,e)}function pA(t,e){t.uniform3uiv(this.addr,e)}function mA(t,e){t.uniform4uiv(this.addr,e)}function gA(t,e,n){const i=this.cache,r=e.length,s=Dc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=Lf:a=b_;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function vA(t,e,n){const i=this.cache,r=e.length,s=Dc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||L_,s[a])}function _A(t,e,n){const i=this.cache,r=e.length,s=Dc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||N_,s[a])}function xA(t,e,n){const i=this.cache,r=e.length,s=Dc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||P_,s[a])}function SA(t){switch(t){case 5126:return tA;case 35664:return nA;case 35665:return iA;case 35666:return rA;case 35674:return sA;case 35675:return aA;case 35676:return oA;case 5124:case 35670:return lA;case 35667:case 35671:return cA;case 35668:case 35672:return uA;case 35669:case 35673:return dA;case 5125:return fA;case 36294:return hA;case 36295:return pA;case 36296:return mA;case 35678:case 36198:case 36298:case 36306:case 35682:return gA;case 35679:case 36299:case 36307:return vA;case 35680:case 36300:case 36308:case 36293:return _A;case 36289:case 36303:case 36311:case 36292:return xA}}class yA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=eA(n.type)}}class MA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=SA(n.type)}}class EA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const ju=/(\w+)(\])?(\[|\.)?/g;function dg(t,e){t.seq.push(e),t.map[e.id]=e}function wA(t,e,n){const i=t.name,r=i.length;for(ju.lastIndex=0;;){const s=ju.exec(i),a=ju.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){dg(n,c===void 0?new yA(o,t,e):new MA(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new EA(o),dg(n,h)),n=h}}}class Il{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);wA(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function fg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const TA=37297;let AA=0;function CA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const hg=new Xe;function RA(t){nt._getMatrix(hg,nt.workingColorSpace,t);const e=`mat3( ${hg.elements.map(n=>n.toFixed(4))} )`;switch(nt.getTransfer(t)){case cc:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function pg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+CA(t.getShaderSource(e),o)}else return s}function bA(t,e){const n=RA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const PA={[Zv]:"Linear",[Jv]:"Reinhard",[Qv]:"Cineon",[e_]:"ACESFilmic",[n_]:"AgX",[i_]:"Neutral",[t_]:"Custom"};function LA(t,e){const n=PA[e];return n===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const vl=new z;function NA(){nt.getLuminanceCoefficients(vl);const t=vl.x.toFixed(4),e=vl.y.toFixed(4),n=vl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function DA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(La).join(`
`)}function IA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function UA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function La(t){return t!==""}function mg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const FA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nf(t){return t.replace(FA,BA)}const OA=new Map;function BA(t,e){let n=je[e];if(n===void 0){const i=OA.get(e);if(i!==void 0)n=je[i],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Nf(n)}const kA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vg(t){return t.replace(kA,zA)}function zA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function _g(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const HA={[Ha]:"SHADOWMAP_TYPE_PCF",[ba]:"SHADOWMAP_TYPE_VSM"};function VA(t){return HA[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const GA={[Yr]:"ENVMAP_TYPE_CUBE",[$s]:"ENVMAP_TYPE_CUBE",[bc]:"ENVMAP_TYPE_CUBE_UV"};function WA(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":GA[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const XA={[$s]:"ENVMAP_MODE_REFRACTION"};function YA(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":XA[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const jA={[Kv]:"ENVMAP_BLENDING_MULTIPLY",[dM]:"ENVMAP_BLENDING_MIX",[fM]:"ENVMAP_BLENDING_ADD"};function qA(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":jA[t.combine]||"ENVMAP_BLENDING_NONE"}function $A(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function KA(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=VA(n),c=WA(n),u=YA(n),h=qA(n),d=$A(n),p=DA(n),v=IA(s),E=r.createProgram();let g,f,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(La).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(La).join(`
`),f.length>0&&(f+=`
`)):(g=[_g(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(La).join(`
`),f=[_g(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==xi?"#define TONE_MAPPING":"",n.toneMapping!==xi?je.tonemapping_pars_fragment:"",n.toneMapping!==xi?LA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,bA("linearToOutputTexel",n.outputColorSpace),NA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(La).join(`
`)),a=Nf(a),a=mg(a,n),a=gg(a,n),o=Nf(o),o=mg(o,n),o=gg(o,n),a=vg(a),o=vg(o),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",n.glslVersion===wm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===wm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=_+g+a,S=_+f+o,T=fg(r,r.VERTEX_SHADER,y),w=fg(r,r.FRAGMENT_SHADER,S);r.attachShader(E,T),r.attachShader(E,w),n.index0AttributeName!==void 0?r.bindAttribLocation(E,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function C(N){if(t.debug.checkShaderErrors){const F=r.getProgramInfoLog(E)||"",Y=r.getShaderInfoLog(T)||"",D=r.getShaderInfoLog(w)||"",G=F.trim(),te=Y.trim(),j=D.trim();let H=!0,k=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(H=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,E,T,w);else{const W=pg(r,T,"vertex"),ee=pg(r,w,"fragment");at("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+G+`
`+W+`
`+ee)}else G!==""?Ge("WebGLProgram: Program Info Log:",G):(te===""||j==="")&&(k=!1);k&&(N.diagnostics={runnable:H,programLog:G,vertexShader:{log:te,prefix:g},fragmentShader:{log:j,prefix:f}})}r.deleteShader(T),r.deleteShader(w),m=new Il(r,E),R=UA(r,E)}let m;this.getUniforms=function(){return m===void 0&&C(this),m};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let L=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(E,TA)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=AA++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=T,this.fragmentShader=w,this}let ZA=0;class JA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new QA(e),n.set(e,i)),i}}class QA{constructor(e){this.id=ZA++,this.code=e,this.usedTimes=0}}function eC(t){return t===jr||t===ac||t===oc}function tC(t,e,n,i,r,s){const a=new h_,o=new JA,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return l.add(m),m===0?"uv":`uv${m}`}function E(m,R,L,N,F,Y){const D=N.fog,G=F.geometry,te=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?N.environment:null,j=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,H=e.get(m.envMap||te,j),k=H&&H.mapping===bc?H.image.height:null,W=p[m.type];m.precision!==null&&(d=i.getMaxPrecision(m.precision),d!==m.precision&&Ge("WebGLProgram.getParameters:",m.precision,"not supported, using",d,"instead."));const ee=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ve=ee!==void 0?ee.length:0;let de=0;G.morphAttributes.position!==void 0&&(de=1),G.morphAttributes.normal!==void 0&&(de=2),G.morphAttributes.color!==void 0&&(de=3);let We,q,ie,B;if(W){const $e=pi[W];We=$e.vertexShader,q=$e.fragmentShader}else{We=m.vertexShader,q=m.fragmentShader;const $e=o.getVertexShaderStage(m),Ke=o.getFragmentShaderStage(m);o.update(m,$e,Ke),ie=$e.id,B=Ke.id}const X=t.getRenderTarget(),ue=t.state.buffers.depth.getReversed(),_e=F.isInstancedMesh===!0,fe=F.isBatchedMesh===!0,Ue=!!m.map,Ze=!!m.matcap,Be=!!H,he=!!m.aoMap,Ve=!!m.lightMap,Ie=!!m.bumpMap&&m.wireframe===!1,qe=!!m.normalMap,He=!!m.displacementMap,_t=!!m.emissiveMap,ct=!!m.metalnessMap,Rt=!!m.roughnessMap,U=m.anisotropy>0,Gt=m.clearcoat>0,ot=m.dispersion>0,b=m.retroreflectivity>0,x=m.iridescence>0,V=m.sheen>0,J=m.transmission>0,ne=U&&!!m.anisotropyMap,me=Gt&&!!m.clearcoatMap,Se=Gt&&!!m.clearcoatNormalMap,re=Gt&&!!m.clearcoatRoughnessMap,oe=x&&!!m.iridescenceMap,ye=x&&!!m.iridescenceThicknessMap,Fe=V&&!!m.sheenColorMap,Ee=V&&!!m.sheenRoughnessMap,Me=!!m.specularMap,O=!!m.specularColorMap,se=!!m.specularIntensityMap,ce=J&&!!m.transmissionMap,P=J&&!!m.thicknessMap,ae=!!m.gradientMap,$=!!m.alphaMap,ge=m.alphaTest>0,xe=!!m.alphaHash,le=!!m.extensions;let Le=xi;m.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Le=t.toneMapping);const Ce={shaderID:W,shaderType:m.type,shaderName:m.name,vertexShader:We,fragmentShader:q,defines:m.defines,customVertexShaderID:ie,customFragmentShaderID:B,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:d,batching:fe,batchingColor:fe&&F._colorsTexture!==null,instancing:_e,instancingColor:_e&&F.instanceColor!==null,instancingMorph:_e&&F.morphTexture!==null,outputColorSpace:X===null?t.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:Ue,matcap:Ze,envMap:Be,envMapMode:Be&&H.mapping,envMapCubeUVHeight:k,aoMap:he,lightMap:Ve,bumpMap:Ie,normalMap:qe,displacementMap:He,emissiveMap:_t,normalMapObjectSpace:qe&&m.normalMapType===mM,normalMapTangentSpace:qe&&m.normalMapType===bf,packedNormalMap:qe&&m.normalMapType===bf&&eC(m.normalMap.format),metalnessMap:ct,roughnessMap:Rt,anisotropy:U,anisotropyMap:ne,clearcoat:Gt,clearcoatMap:me,clearcoatNormalMap:Se,clearcoatRoughnessMap:re,dispersion:ot,retroreflection:b,iridescence:x,iridescenceMap:oe,iridescenceThicknessMap:ye,sheen:V,sheenColorMap:Fe,sheenRoughnessMap:Ee,specularMap:Me,specularColorMap:O,specularIntensityMap:se,transmission:J,transmissionMap:ce,thicknessMap:P,gradientMap:ae,opaque:m.transparent===!1&&m.blending===Va&&m.alphaToCoverage===!1,alphaMap:$,alphaTest:ge,alphaHash:xe,combine:m.combine,mapUv:Ue&&v(m.map.channel),aoMapUv:he&&v(m.aoMap.channel),lightMapUv:Ve&&v(m.lightMap.channel),bumpMapUv:Ie&&v(m.bumpMap.channel),normalMapUv:qe&&v(m.normalMap.channel),displacementMapUv:He&&v(m.displacementMap.channel),emissiveMapUv:_t&&v(m.emissiveMap.channel),metalnessMapUv:ct&&v(m.metalnessMap.channel),roughnessMapUv:Rt&&v(m.roughnessMap.channel),anisotropyMapUv:ne&&v(m.anisotropyMap.channel),clearcoatMapUv:me&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:Se&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(m.sheenRoughnessMap.channel),specularMapUv:Me&&v(m.specularMap.channel),specularColorMapUv:O&&v(m.specularColorMap.channel),specularIntensityMapUv:se&&v(m.specularIntensityMap.channel),transmissionMapUv:ce&&v(m.transmissionMap.channel),thicknessMapUv:P&&v(m.thicknessMap.channel),alphaMapUv:$&&v(m.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(qe||U),vertexNormals:!!G.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!G.attributes.uv&&(Ue||$),fog:!!D,useFog:m.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||G.attributes.normal===void 0&&qe===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ue,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:de,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:m.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:Le,decodeVideoTexture:Ue&&m.map.isVideoTexture===!0&&nt.getTransfer(m.map.colorSpace)===ut,decodeVideoTextureEmissive:_t&&m.emissiveMap.isVideoTexture===!0&&nt.getTransfer(m.emissiveMap.colorSpace)===ut,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Ni,flipSided:m.side===wn,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:le&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&m.extensions.multiDraw===!0||fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(m){const R=[];if(m.shaderID?R.push(m.shaderID):(R.push(m.customVertexShaderID),R.push(m.customFragmentShaderID)),m.defines!==void 0)for(const L in m.defines)R.push(L),R.push(m.defines[L]);return m.isRawShaderMaterial===!1&&(f(R,m),_(R,m),R.push(t.outputColorSpace)),R.push(m.customProgramCacheKey),R.join()}function f(m,R){m.push(R.precision),m.push(R.outputColorSpace),m.push(R.envMapMode),m.push(R.envMapCubeUVHeight),m.push(R.mapUv),m.push(R.alphaMapUv),m.push(R.lightMapUv),m.push(R.aoMapUv),m.push(R.bumpMapUv),m.push(R.normalMapUv),m.push(R.displacementMapUv),m.push(R.emissiveMapUv),m.push(R.metalnessMapUv),m.push(R.roughnessMapUv),m.push(R.anisotropyMapUv),m.push(R.clearcoatMapUv),m.push(R.clearcoatNormalMapUv),m.push(R.clearcoatRoughnessMapUv),m.push(R.iridescenceMapUv),m.push(R.iridescenceThicknessMapUv),m.push(R.sheenColorMapUv),m.push(R.sheenRoughnessMapUv),m.push(R.specularMapUv),m.push(R.specularColorMapUv),m.push(R.specularIntensityMapUv),m.push(R.transmissionMapUv),m.push(R.thicknessMapUv),m.push(R.combine),m.push(R.fogExp2),m.push(R.sizeAttenuation),m.push(R.morphTargetsCount),m.push(R.morphAttributeCount),m.push(R.numSunLights),m.push(R.numDirLights),m.push(R.numPointLights),m.push(R.numSpotLights),m.push(R.numSpotLightMaps),m.push(R.numHemiLights),m.push(R.numRectAreaLights),m.push(R.numSunLightShadows),m.push(R.numDirLightShadows),m.push(R.numPointLightShadows),m.push(R.numSpotLightShadows),m.push(R.numSpotLightShadowsWithMaps),m.push(R.numLightProbes),m.push(R.shadowMapType),m.push(R.toneMapping),m.push(R.numClippingPlanes),m.push(R.numClipIntersection),m.push(R.depthPacking)}function _(m,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.retroreflection&&a.enable(24),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),m.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),m.push(a.mask)}function y(m){const R=p[m.type];let L;if(R){const N=pi[R];L=xE.clone(N.uniforms)}else L=m.uniforms;return L}function S(m,R){let L=u.get(R);return L!==void 0?++L.usedTimes:(L=new KA(t,R,m,r),c.push(L),u.set(R,L)),L}function T(m){if(--m.usedTimes===0){const R=c.indexOf(m);c[R]=c[c.length-1],c.pop(),u.delete(m.cacheKey),m.destroy()}}function w(m){o.remove(m)}function C(){o.dispose()}return{getParameters:E,getProgramCacheKey:g,getUniforms:y,acquireProgram:S,releaseProgram:T,releaseShaderCache:w,programs:c,dispose:C}}function nC(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function iC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function xg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Sg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,v,E,g,f){let _=t[e];return _===void 0?(_={id:d.id,object:d,geometry:p,material:v,materialVariant:a(d),groupOrder:E,renderOrder:d.renderOrder,z:g,group:f},t[e]=_):(_.id=d.id,_.object=d,_.geometry=p,_.material=v,_.materialVariant=a(d),_.groupOrder=E,_.renderOrder=d.renderOrder,_.z=g,_.group=f),e++,_}function l(d,p,v,E,g,f,_){_.reversedDepth===!0&&(g=-g);const y=o(d,p,v,E,g,f);v.transmission>0?i.push(y):v.transparent===!0?r.push(y):n.push(y)}function c(d,p,v,E,g,f){const _=o(d,p,v,E,g,f);v.transmission>0?i.unshift(_):v.transparent===!0?r.unshift(_):n.unshift(_)}function u(d,p){n.length>1&&n.sort(d||iC),i.length>1&&i.sort(p||xg),r.length>1&&r.sort(p||xg)}function h(){for(let d=e,p=t.length;d<p;d++){const v=t[d];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:u}}function rC(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Sg,t.set(i,[a])):r>=s.length?(a=new Sg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function sC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new z,color:new it};break;case"SpotLight":n={position:new z,direction:new z,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new z,color:new it,distance:0,decay:0};break;case"HemisphereLight":n={direction:new z,skyColor:new it,groundColor:new it};break;case"RectAreaLight":n={color:new it,position:new z,halfWidth:new z,halfHeight:new z};break}return t[e.id]=n,n}}}function aC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let oC=0;function lC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function cC(t){const e=new sC,n=aC(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const r=new z,s=new mt,a=new mt;function o(c){let u=0,h=0,d=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let p=0,v=0,E=0,g=0,f=0,_=0,y=0,S=0,T=0,w=0,C=0,m=0,R=0,L=0;c.sort(lC);for(let F=0,Y=c.length;F<Y;F++){const D=c[F],G=D.color,te=D.intensity,j=D.distance;let H=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===jr?H=D.shadow.map.texture:H=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=G.r*te,h+=G.g*te,d+=G.b*te;else if(D.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(D.sh.coefficients[k],te);L++}else if(D.isSunLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,ee=n.get(D);ee.shadowIntensity=W.intensity,ee.shadowBias=W.bias,ee.shadowNormalBias=W.normalBias,ee.shadowRadius=W.radius,ee.shadowMapSize.copy(W.mapSize).multiply(W.getFrameExtents()),i.sunShadow[v]=ee,i.sunShadowMap[v]=H;const ve=W.getViewportCount();for(let de=0;de<ve;de++)i.sunShadowMatrix[E+de]=W.getMatrix(de),i.sunShadowCascade[E+de]=W._cascadeData[de];E+=ve,v++}i.sun[p]=k,p++}else if(D.isDirectionalLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,ee=n.get(D);ee.shadowIntensity=W.intensity,ee.shadowBias=W.bias,ee.shadowNormalBias=W.normalBias,ee.shadowRadius=W.radius,ee.shadowMapSize=W.mapSize,i.directionalShadow[g]=ee,i.directionalShadowMap[g]=H,i.directionalShadowMatrix[g]=D.shadow.matrix,T++}i.directional[g]=k,g++}else if(D.isSpotLight){const k=e.get(D);k.position.setFromMatrixPosition(D.matrixWorld),k.color.copy(G).multiplyScalar(te),k.distance=j,k.coneCos=Math.cos(D.angle),k.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),k.decay=D.decay,i.spot[_]=k;const W=D.shadow;if(D.map&&(i.spotLightMap[m]=D.map,m++,W.updateMatrices(D),D.castShadow&&R++),i.spotLightMatrix[_]=W.matrix,D.castShadow){const ee=n.get(D);ee.shadowIntensity=W.intensity,ee.shadowBias=W.bias,ee.shadowNormalBias=W.normalBias,ee.shadowRadius=W.radius,ee.shadowMapSize=W.mapSize,i.spotShadow[_]=ee,i.spotShadowMap[_]=H,C++}_++}else if(D.isRectAreaLight){const k=e.get(D);k.color.copy(G).multiplyScalar(te),k.halfWidth.set(D.width*.5,0,0),k.halfHeight.set(0,D.height*.5,0),i.rectArea[y]=k,y++}else if(D.isPointLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),k.distance=D.distance,k.decay=D.decay,D.castShadow){const W=D.shadow,ee=n.get(D);ee.shadowIntensity=W.intensity,ee.shadowBias=W.bias,ee.shadowNormalBias=W.normalBias,ee.shadowRadius=W.radius,ee.shadowMapSize=W.mapSize,ee.shadowCameraNear=W.camera.near,ee.shadowCameraFar=W.camera.far,i.pointShadow[f]=ee,i.pointShadowMap[f]=H,i.pointShadowMatrix[f]=D.shadow.matrix,w++}i.point[f]=k,f++}else if(D.isHemisphereLight){const k=e.get(D);k.skyColor.copy(D.color).multiplyScalar(te),k.groundColor.copy(D.groundColor).multiplyScalar(te),i.hemi[S]=k,S++}}y>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const N=i.hash;(N.sunLength!==p||N.directionalLength!==g||N.pointLength!==f||N.spotLength!==_||N.rectAreaLength!==y||N.hemiLength!==S||N.numSunShadows!==v||N.numDirectionalShadows!==T||N.numPointShadows!==w||N.numSpotShadows!==C||N.numSpotMaps!==m||N.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=g,i.spot.length=_,i.rectArea.length=y,i.point.length=f,i.hemi.length=S,i.sunShadow.length=v,i.sunShadowMap.length=v,i.sunShadowMatrix.length=E,i.sunShadowCascade.length=E,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+m-R,i.spotLightMap.length=m,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=L,N.sunLength=p,N.directionalLength=g,N.pointLength=f,N.spotLength=_,N.rectAreaLength=y,N.hemiLength=S,N.numSunShadows=v,N.numDirectionalShadows=T,N.numPointShadows=w,N.numSpotShadows=C,N.numSpotMaps=m,N.numLightProbes=L,i.version=oC++)}function l(c,u){let h=0,d=0,p=0,v=0,E=0,g=0;const f=u.matrixWorldInverse;for(let _=0,y=c.length;_<y;_++){const S=c[_];if(S.isSunLight){const T=i.sun[h];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),h++}else if(S.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),d++}else if(S.isSpotLight){const T=i.spot[v];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(f),v++}else if(S.isRectAreaLight){const T=i.rectArea[E];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),a.identity(),s.copy(S.matrixWorld),s.premultiply(f),a.extractRotation(s),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),E++}else if(S.isPointLight){const T=i.point[p];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(f),p++}else if(S.isHemisphereLight){const T=i.hemi[g];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(f),g++}}}return{setup:o,setupView:l,state:i}}function yg(t){const e=new cC(t),n=[],i=[],r=[];function s(d){h.camera=d,n.length=0,i.length=0,r.length=0}function a(d){n.push(d)}function o(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(n)}function u(d){e.setupView(n,d)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function uC(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new yg(t),e.set(r,[o])):s>=a.length?(o=new yg(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const dC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,hC=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],pC=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Mg=new mt,Ea=new z,qu=new z;function mC(t,e,n){let i=new kh;const r=new ze,s=new ze,a=new Tt,o=new EE,l=new wE,c={},u=n.maxTextureSize,h={[Xr]:wn,[wn]:Xr,[Ni]:Ni},d=new Mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:dC,fragmentShader:fC}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const v=new jn;v.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new dt(v,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ha;let f=this.type;this.render=function(w,C,m){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===Yy&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ha);const R=t.getRenderTarget(),L=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),F=t.state;F.setBlending(Oi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Y=f!==this.type;Y&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(G=>G.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,G=w.length;D<G;D++){const te=w[D],j=te.shadow;if(j===void 0){Ge("WebGLShadowMap:",te,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;r.copy(j.mapSize);const H=j.getFrameExtents();r.multiply(H),s.copy(j.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/H.x),r.x=s.x*H.x,j.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/H.y),r.y=s.y*H.y,j.mapSize.y=s.y));const k=t.state.buffers.depth.getReversed();if(j.camera._reversedDepth=k,j.map===null||Y===!0){if(j.map!==null&&(j.map.depthTexture!==null&&(j.map.depthTexture.dispose(),j.map.depthTexture=null),j.map.dispose()),this.type===ba){if(te.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}j.map=new oi(r.x,r.y,{format:jr,type:yi,minFilter:an,magFilter:an,generateMipmaps:!1}),j.map.texture.name=te.name+".shadowMap",j.map.depthTexture=new po(r.x,r.y,ii),j.map.depthTexture.name=te.name+".shadowMapDepth",j.map.depthTexture.format=Gi,j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=$t,j.map.depthTexture.magFilter=$t}else te.isPointLight?(j.map=new R_(r.x),j.map.depthTexture=new tE(r.x,Si)):(j.map=new oi(r.x,r.y),j.map.depthTexture=new po(r.x,r.y,Si)),j.map.depthTexture.name=te.name+".shadowMap",j.map.depthTexture.format=Gi,this.type===Ha?(j.map.depthTexture.compareFunction=k?Oh:Fh,j.map.depthTexture.minFilter=an,j.map.depthTexture.magFilter=an):(j.map.depthTexture.compareFunction=null,j.map.depthTexture.minFilter=$t,j.map.depthTexture.magFilter=$t);j.camera.updateProjectionMatrix()}j.map.isWebGLCubeRenderTarget!==!0&&(j.map.width!==r.x||j.map.height!==r.y)&&j.map.setSize(r.x,r.y);const W=j.map.isWebGLCubeRenderTarget?6:j.getViewportCount();te.isPointLight!==!0&&j.updateMatrices(te,m);for(let ee=0;ee<W;ee++){const ve=j.getCamera(ee);if(te.isPointLight){const de=j.camera,We=j.matrix,q=te.distance||de.far;q!==de.far&&(de.far=q,de.updateProjectionMatrix()),Ea.setFromMatrixPosition(te.matrixWorld),de.position.copy(Ea),qu.copy(de.position),qu.add(hC[ee]),de.up.copy(pC[ee]),de.lookAt(qu),de.updateMatrixWorld(),We.makeTranslation(-Ea.x,-Ea.y,-Ea.z),Mg.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),j._frustum.setFromProjectionMatrix(Mg,de.coordinateSystem,de.reversedDepth)}if(j.map.isWebGLCubeRenderTarget)t.setRenderTarget(j.map,ee),t.clear();else{ee===0&&(t.setRenderTarget(j.map),t.clear());const de=j.getViewport(ee);a.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),F.viewport(a)}i=j.getFrustum(ee),S(C,m,ve,te,this.type)}j.isPointLightShadow!==!0&&this.type===ba&&_(j,m),j.needsUpdate=!1}f=this.type,g.needsUpdate=!1,t.setRenderTarget(R,L,N)};function _(w,C){const m=e.update(E);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new oi(r.x,r.y,{format:jr,type:yi}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(C,null,m,d,E,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(C,null,m,p,E,null)}function y(w,C,m,R){let L=null;const N=m.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)L=N;else if(L=m.isPointLight===!0?l:o,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=L.uuid,Y=C.uuid;let D=c[F];D===void 0&&(D={},c[F]=D);let G=D[Y];G===void 0&&(G=L.clone(),D[Y]=G,C.addEventListener("dispose",T)),L=G}if(L.visible=C.visible,L.wireframe=C.wireframe,R===ba?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:h[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,m.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const F=t.properties.get(L);F.light=m}return L}function S(w,C,m,R,L){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===ba)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,w.matrixWorld);const Y=e.update(w),D=w.material;if(Array.isArray(D)){const G=Y.groups;for(let te=0,j=G.length;te<j;te++){const H=G[te],k=D[H.materialIndex];if(k&&k.visible){const W=y(w,k,R,L);w.onBeforeShadow(t,w,C,m,Y,W,H),t.renderBufferDirect(m,null,Y,W,w,H),w.onAfterShadow(t,w,C,m,Y,W,H)}}}else if(D.visible){const G=y(w,D,R,L);w.onBeforeShadow(t,w,C,m,Y,G,null),t.renderBufferDirect(m,null,Y,G,w,null),w.onAfterShadow(t,w,C,m,Y,G,null)}}const F=w.children;for(let Y=0,D=F.length;Y<D;Y++)S(F[Y],C,m,R,L)}function T(w){w.target.removeEventListener("dispose",T);for(const m in c){const R=c[m],L=w.target.uuid;L in R&&(R[L].dispose(),delete R[L])}}}function gC(t,e){function n(){let P=!1;const ae=new Tt;let $=null;const ge=new Tt(0,0,0,0);return{setMask:function(xe){$!==xe&&!P&&(t.colorMask(xe,xe,xe,xe),$=xe)},setLocked:function(xe){P=xe},setClear:function(xe,le,Le,Ce,$e){$e===!0&&(xe*=Ce,le*=Ce,Le*=Ce),ae.set(xe,le,Le,Ce),ge.equals(ae)===!1&&(t.clearColor(xe,le,Le,Ce),ge.copy(ae))},reset:function(){P=!1,$=null,ge.set(-1,0,0,0)}}}function i(){let P=!1,ae=!1,$=null,ge=null,xe=null;return{setReversed:function(le){if(ae!==le){const Le=e.get("EXT_clip_control");le?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ae=le;const Ce=xe;xe=null,this.setClear(Ce)}},getReversed:function(){return ae},setTest:function(le){le?X(t.DEPTH_TEST):ue(t.DEPTH_TEST)},setMask:function(le){$!==le&&!P&&(t.depthMask(le),$=le)},setFunc:function(le){if(ae&&(le=RM[le]),ge!==le){switch(le){case Gd:t.depthFunc(t.NEVER);break;case Wd:t.depthFunc(t.ALWAYS);break;case Xd:t.depthFunc(t.LESS);break;case co:t.depthFunc(t.LEQUAL);break;case Yd:t.depthFunc(t.EQUAL);break;case jd:t.depthFunc(t.GEQUAL);break;case qd:t.depthFunc(t.GREATER);break;case $d:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ge=le}},setLocked:function(le){P=le},setClear:function(le){xe!==le&&(xe=le,ae&&(le=1-le),t.clearDepth(le))},reset:function(){P=!1,$=null,ge=null,xe=null,ae=!1}}}function r(){let P=!1,ae=null,$=null,ge=null,xe=null,le=null,Le=null,Ce=null,$e=null;return{setTest:function(Ke){P||(Ke?X(t.STENCIL_TEST):ue(t.STENCIL_TEST))},setMask:function(Ke){ae!==Ke&&!P&&(t.stencilMask(Ke),ae=Ke)},setFunc:function(Ke,Dt,Bt){($!==Ke||ge!==Dt||xe!==Bt)&&(t.stencilFunc(Ke,Dt,Bt),$=Ke,ge=Dt,xe=Bt)},setOp:function(Ke,Dt,Bt){(le!==Ke||Le!==Dt||Ce!==Bt)&&(t.stencilOp(Ke,Dt,Bt),le=Ke,Le=Dt,Ce=Bt)},setLocked:function(Ke){P=Ke},setClear:function(Ke){$e!==Ke&&(t.clearStencil(Ke),$e=Ke)},reset:function(){P=!1,ae=null,$=null,ge=null,xe=null,le=null,Le=null,Ce=null,$e=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},h={},d={},p=new WeakMap,v=[],E=null,g=!1,f=null,_=null,y=null,S=null,T=null,w=null,C=null,m=new it(0,0,0),R=0,L=!1,N=null,F=null,Y=null,D=null,G=null;const te=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,H=0;const k=t.getParameter(t.VERSION);k.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(k)[1]),j=H>=1):k.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),j=H>=2);let W=null,ee={};const ve=t.getParameter(t.SCISSOR_BOX),de=t.getParameter(t.VIEWPORT),We=new Tt().fromArray(ve),q=new Tt().fromArray(de);function ie(P,ae,$,ge){const xe=new Uint8Array(4),le=t.createTexture();t.bindTexture(P,le),t.texParameteri(P,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(P,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Le=0;Le<$;Le++)P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY?t.texImage3D(ae,0,t.RGBA,1,1,ge,0,t.RGBA,t.UNSIGNED_BYTE,xe):t.texImage2D(ae+Le,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,xe);return le}const B={};B[t.TEXTURE_2D]=ie(t.TEXTURE_2D,t.TEXTURE_2D,1),B[t.TEXTURE_CUBE_MAP]=ie(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[t.TEXTURE_2D_ARRAY]=ie(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),B[t.TEXTURE_3D]=ie(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),X(t.DEPTH_TEST),a.setFunc(co),Ie(!1),qe(Sm),X(t.CULL_FACE),he(Oi);function X(P){u[P]!==!0&&(t.enable(P),u[P]=!0)}function ue(P){u[P]!==!1&&(t.disable(P),u[P]=!1)}function _e(P,ae){return d[P]!==ae?(t.bindFramebuffer(P,ae),d[P]=ae,P===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=ae),P===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=ae),!0):!1}function fe(P,ae){let $=v,ge=!1;if(P){$=p.get(ae),$===void 0&&($=[],p.set(ae,$));const xe=P.textures;if($.length!==xe.length||$[0]!==t.COLOR_ATTACHMENT0){for(let le=0,Le=xe.length;le<Le;le++)$[le]=t.COLOR_ATTACHMENT0+le;$.length=xe.length,ge=!0}}else $[0]!==t.BACK&&($[0]=t.BACK,ge=!0);ge&&t.drawBuffers($)}function Ue(P){return E!==P?(t.useProgram(P),E=P,!0):!1}const Ze={[_s]:t.FUNC_ADD,[qy]:t.FUNC_SUBTRACT,[$y]:t.FUNC_REVERSE_SUBTRACT};Ze[Ky]=t.MIN,Ze[Zy]=t.MAX;const Be={[Jy]:t.ZERO,[Qy]:t.ONE,[eM]:t.SRC_COLOR,[qv]:t.SRC_ALPHA,[aM]:t.SRC_ALPHA_SATURATE,[rM]:t.DST_COLOR,[nM]:t.DST_ALPHA,[tM]:t.ONE_MINUS_SRC_COLOR,[$v]:t.ONE_MINUS_SRC_ALPHA,[sM]:t.ONE_MINUS_DST_COLOR,[iM]:t.ONE_MINUS_DST_ALPHA,[oM]:t.CONSTANT_COLOR,[lM]:t.ONE_MINUS_CONSTANT_COLOR,[cM]:t.CONSTANT_ALPHA,[uM]:t.ONE_MINUS_CONSTANT_ALPHA};function he(P,ae,$,ge,xe,le,Le,Ce,$e,Ke){if(P===Oi){g===!0&&(ue(t.BLEND),g=!1);return}if(g===!1&&(X(t.BLEND),g=!0),P!==jy){if(P!==f||Ke!==L){if((_!==_s||T!==_s)&&(t.blendEquation(t.FUNC_ADD),_=_s,T=_s),Ke)switch(P){case Va:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ym:t.blendFunc(t.ONE,t.ONE);break;case Mm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Em:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:at("WebGLState: Invalid blending: ",P);break}else switch(P){case Va:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ym:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Mm:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Em:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",P);break}y=null,S=null,w=null,C=null,m.set(0,0,0),R=0,f=P,L=Ke}return}xe=xe||ae,le=le||$,Le=Le||ge,(ae!==_||xe!==T)&&(t.blendEquationSeparate(Ze[ae],Ze[xe]),_=ae,T=xe),($!==y||ge!==S||le!==w||Le!==C)&&(t.blendFuncSeparate(Be[$],Be[ge],Be[le],Be[Le]),y=$,S=ge,w=le,C=Le),(Ce.equals(m)===!1||$e!==R)&&(t.blendColor(Ce.r,Ce.g,Ce.b,$e),m.copy(Ce),R=$e),f=P,L=!1}function Ve(P,ae){P.side===Ni?ue(t.CULL_FACE):X(t.CULL_FACE);let $=P.side===wn;ae&&($=!$),Ie($),P.blending===Va&&P.transparent===!1?he(Oi):he(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const ge=P.stencilWrite;o.setTest(ge),ge&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),_t(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?X(t.SAMPLE_ALPHA_TO_COVERAGE):ue(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(P){N!==P&&(P?t.frontFace(t.CW):t.frontFace(t.CCW),N=P)}function qe(P){P!==Wy?(X(t.CULL_FACE),P!==F&&(P===Sm?t.cullFace(t.BACK):P===Xy?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ue(t.CULL_FACE),F=P}function He(P){P!==Y&&(j&&t.lineWidth(P),Y=P)}function _t(P,ae,$){P?(X(t.POLYGON_OFFSET_FILL),(D!==ae||G!==$)&&(D=ae,G=$,a.getReversed()&&(ae=-ae),t.polygonOffset(ae,$))):ue(t.POLYGON_OFFSET_FILL)}function ct(P){P?X(t.SCISSOR_TEST):ue(t.SCISSOR_TEST)}function Rt(P){P===void 0&&(P=t.TEXTURE0+te-1),W!==P&&(t.activeTexture(P),W=P)}function U(P,ae,$){$===void 0&&(W===null?$=t.TEXTURE0+te-1:$=W);let ge=ee[$];ge===void 0&&(ge={type:void 0,texture:void 0},ee[$]=ge),(ge.type!==P||ge.texture!==ae)&&(W!==$&&(t.activeTexture($),W=$),t.bindTexture(P,ae||B[P]),ge.type=P,ge.texture=ae)}function Gt(){const P=ee[W];P!==void 0&&P.type!==void 0&&(t.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ot(){try{t.compressedTexImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function b(){try{t.compressedTexImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function x(){try{t.texSubImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function V(){try{t.texSubImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function J(){try{t.compressedTexSubImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function ne(){try{t.compressedTexSubImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function me(){try{t.texStorage2D(...arguments)}catch(P){at("WebGLState:",P)}}function Se(){try{t.texStorage3D(...arguments)}catch(P){at("WebGLState:",P)}}function re(){try{t.texImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function oe(){try{t.texImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function ye(P){return h[P]!==void 0?h[P]:t.getParameter(P)}function Fe(P,ae){h[P]!==ae&&(t.pixelStorei(P,ae),h[P]=ae)}function Ee(P){We.equals(P)===!1&&(t.scissor(P.x,P.y,P.z,P.w),We.copy(P))}function Me(P){q.equals(P)===!1&&(t.viewport(P.x,P.y,P.z,P.w),q.copy(P))}function O(P,ae){let $=c.get(ae);$===void 0&&($=new WeakMap,c.set(ae,$));let ge=$.get(P);ge===void 0&&(ge=t.getUniformBlockIndex(ae,P.name),$.set(P,ge))}function se(P,ae){const ge=c.get(ae).get(P);l.get(ae)!==ge&&(t.uniformBlockBinding(ae,ge,P.__bindingPointIndex),l.set(ae,ge))}function ce(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),u={},h={},W=null,ee={},d={},p=new WeakMap,v=[],E=null,g=!1,f=null,_=null,y=null,S=null,T=null,w=null,C=null,m=new it(0,0,0),R=0,L=!1,N=null,F=null,Y=null,D=null,G=null,We.set(0,0,t.canvas.width,t.canvas.height),q.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:X,disable:ue,bindFramebuffer:_e,drawBuffers:fe,useProgram:Ue,setBlending:he,setMaterial:Ve,setFlipSided:Ie,setCullFace:qe,setLineWidth:He,setPolygonOffset:_t,setScissorTest:ct,activeTexture:Rt,bindTexture:U,unbindTexture:Gt,compressedTexImage2D:ot,compressedTexImage3D:b,texImage2D:re,texImage3D:oe,pixelStorei:Fe,getParameter:ye,updateUBOMapping:O,uniformBlockBinding:se,texStorage2D:me,texStorage3D:Se,texSubImage2D:x,texSubImage3D:V,compressedTexSubImage2D:J,compressedTexSubImage3D:ne,scissor:Ee,viewport:Me,reset:ce}}function vC(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,u=new WeakMap,h=new Set;let d;const p=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(b,x){return v?new OffscreenCanvas(b,x):uc("canvas")}function g(b,x,V){let J=1;const ne=ot(b);if((ne.width>V||ne.height>V)&&(J=V/Math.max(ne.width,ne.height)),J<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const me=Math.floor(J*ne.width),Se=Math.floor(J*ne.height);d===void 0&&(d=E(me,Se));const re=x?E(me,Se):d;return re.width=me,re.height=Se,re.getContext("2d").drawImage(b,0,0,me,Se),Ge("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+me+"x"+Se+")."),re}else return"data"in b&&Ge("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),b;return b}function f(b){return b.generateMipmaps}function _(b){t.generateMipmap(b)}function y(b){return b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?t.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(b,x,V,J,ne,me=!1){if(b!==null){if(t[b]!==void 0)return t[b];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Se;J&&(Se=e.get("EXT_texture_norm16"),Se||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=x;if(x===t.RED&&(V===t.FLOAT&&(re=t.R32F),V===t.HALF_FLOAT&&(re=t.R16F),V===t.UNSIGNED_BYTE&&(re=t.R8),V===t.UNSIGNED_SHORT&&Se&&(re=Se.R16_EXT),V===t.SHORT&&Se&&(re=Se.R16_SNORM_EXT)),x===t.RED_INTEGER&&(V===t.UNSIGNED_BYTE&&(re=t.R8UI),V===t.UNSIGNED_SHORT&&(re=t.R16UI),V===t.UNSIGNED_INT&&(re=t.R32UI),V===t.BYTE&&(re=t.R8I),V===t.SHORT&&(re=t.R16I),V===t.INT&&(re=t.R32I)),x===t.RG&&(V===t.FLOAT&&(re=t.RG32F),V===t.HALF_FLOAT&&(re=t.RG16F),V===t.UNSIGNED_BYTE&&(re=t.RG8),V===t.UNSIGNED_SHORT&&Se&&(re=Se.RG16_EXT),V===t.SHORT&&Se&&(re=Se.RG16_SNORM_EXT)),x===t.RG_INTEGER&&(V===t.UNSIGNED_BYTE&&(re=t.RG8UI),V===t.UNSIGNED_SHORT&&(re=t.RG16UI),V===t.UNSIGNED_INT&&(re=t.RG32UI),V===t.BYTE&&(re=t.RG8I),V===t.SHORT&&(re=t.RG16I),V===t.INT&&(re=t.RG32I)),x===t.RGB_INTEGER&&(V===t.UNSIGNED_BYTE&&(re=t.RGB8UI),V===t.UNSIGNED_SHORT&&(re=t.RGB16UI),V===t.UNSIGNED_INT&&(re=t.RGB32UI),V===t.BYTE&&(re=t.RGB8I),V===t.SHORT&&(re=t.RGB16I),V===t.INT&&(re=t.RGB32I)),x===t.RGBA_INTEGER&&(V===t.UNSIGNED_BYTE&&(re=t.RGBA8UI),V===t.UNSIGNED_SHORT&&(re=t.RGBA16UI),V===t.UNSIGNED_INT&&(re=t.RGBA32UI),V===t.BYTE&&(re=t.RGBA8I),V===t.SHORT&&(re=t.RGBA16I),V===t.INT&&(re=t.RGBA32I)),x===t.RGB&&(V===t.UNSIGNED_SHORT&&Se&&(re=Se.RGB16_EXT),V===t.SHORT&&Se&&(re=Se.RGB16_SNORM_EXT),V===t.UNSIGNED_INT_5_9_9_9_REV&&(re=t.RGB9_E5),V===t.UNSIGNED_INT_10F_11F_11F_REV&&(re=t.R11F_G11F_B10F)),x===t.RGBA){const oe=me?cc:nt.getTransfer(ne);V===t.FLOAT&&(re=t.RGBA32F),V===t.HALF_FLOAT&&(re=t.RGBA16F),V===t.UNSIGNED_BYTE&&(re=oe===ut?t.SRGB8_ALPHA8:t.RGBA8),V===t.UNSIGNED_SHORT&&Se&&(re=Se.RGBA16_EXT),V===t.SHORT&&Se&&(re=Se.RGBA16_SNORM_EXT),V===t.UNSIGNED_SHORT_4_4_4_4&&(re=t.RGBA4),V===t.UNSIGNED_SHORT_5_5_5_1&&(re=t.RGB5_A1)}return(re===t.R16F||re===t.R32F||re===t.RG16F||re===t.RG32F||re===t.RGBA16F||re===t.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function T(b,x){let V;return b?x===null||x===Si||x===fo?V=t.DEPTH24_STENCIL8:x===ii?V=t.DEPTH32F_STENCIL8:x===uo&&(V=t.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Si||x===fo?V=t.DEPTH_COMPONENT24:x===ii?V=t.DEPTH_COMPONENT32F:x===uo&&(V=t.DEPTH_COMPONENT16),V}function w(b,x){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==$t&&b.minFilter!==an?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function C(b){const x=b.target;x.removeEventListener("dispose",C),R(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&h.delete(x)}function m(b){const x=b.target;x.removeEventListener("dispose",m),N(x)}function R(b){const x=i.get(b);if(x.__webglInit===void 0)return;const V=b.source,J=p.get(V);if(J){const ne=J[x.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&L(b),Object.keys(J).length===0&&p.delete(V)}i.remove(b)}function L(b){const x=i.get(b);t.deleteTexture(x.__webglTexture);const V=b.source,J=p.get(V);delete J[x.__cacheKey],a.memory.textures--}function N(b){const x=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(x.__webglFramebuffer[J]))for(let ne=0;ne<x.__webglFramebuffer[J].length;ne++)t.deleteFramebuffer(x.__webglFramebuffer[J][ne]);else t.deleteFramebuffer(x.__webglFramebuffer[J]);x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer[J])}else{if(Array.isArray(x.__webglFramebuffer))for(let J=0;J<x.__webglFramebuffer.length;J++)t.deleteFramebuffer(x.__webglFramebuffer[J]);else t.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&t.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let J=0;J<x.__webglColorRenderbuffer.length;J++)x.__webglColorRenderbuffer[J]&&t.deleteRenderbuffer(x.__webglColorRenderbuffer[J]);x.__webglDepthRenderbuffer&&t.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const V=b.textures;for(let J=0,ne=V.length;J<ne;J++){const me=i.get(V[J]);me.__webglTexture&&(t.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(V[J])}i.remove(b)}let F=0;function Y(){F=0}function D(){return F}function G(b){F=b}function te(){const b=F;return b>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+r.maxTextures),F+=1,b}function j(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function H(b,x){const V=i.get(b);if(b.isVideoTexture&&U(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&V.__version!==b.version){const J=b.image;if(J===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{ue(V,b,x);return}}else b.isExternalTexture&&(V.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,V.__webglTexture,t.TEXTURE0+x)}function k(b,x){const V=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){ue(V,b,x);return}else b.isExternalTexture&&(V.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,V.__webglTexture,t.TEXTURE0+x)}function W(b,x){const V=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){ue(V,b,x);return}n.bindTexture(t.TEXTURE_3D,V.__webglTexture,t.TEXTURE0+x)}function ee(b,x){const V=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&V.__version!==b.version){_e(V,b,x);return}n.bindTexture(t.TEXTURE_CUBE_MAP,V.__webglTexture,t.TEXTURE0+x)}const ve={[Kd]:t.REPEAT,[Ui]:t.CLAMP_TO_EDGE,[Zd]:t.MIRRORED_REPEAT},de={[$t]:t.NEAREST,[hM]:t.NEAREST_MIPMAP_NEAREST,[$o]:t.NEAREST_MIPMAP_LINEAR,[an]:t.LINEAR,[mu]:t.LINEAR_MIPMAP_NEAREST,[Fr]:t.LINEAR_MIPMAP_LINEAR},We={[vM]:t.NEVER,[MM]:t.ALWAYS,[_M]:t.LESS,[Fh]:t.LEQUAL,[xM]:t.EQUAL,[Oh]:t.GEQUAL,[SM]:t.GREATER,[yM]:t.NOTEQUAL};function q(b,x){if(x.type===ii&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===an||x.magFilter===mu||x.magFilter===$o||x.magFilter===Fr||x.minFilter===an||x.minFilter===mu||x.minFilter===$o||x.minFilter===Fr)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,ve[x.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,ve[x.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,ve[x.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,de[x.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,de[x.minFilter]),x.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,We[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===$t||x.minFilter!==$o&&x.minFilter!==Fr||x.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function ie(b,x){let V=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",C));const J=x.source;let ne=p.get(J);ne===void 0&&(ne={},p.set(J,ne));const me=j(x);if(me!==b.__cacheKey){ne[me]===void 0&&(ne[me]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ne[me].usedTimes++;const Se=ne[b.__cacheKey];Se!==void 0&&(ne[b.__cacheKey].usedTimes--,Se.usedTimes===0&&L(x)),b.__cacheKey=me,b.__webglTexture=ne[me].texture}return V}function B(b,x,V){return Math.floor(Math.floor(b/V)/x)}function X(b,x,V,J){const me=b.updateRanges;if(me.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,x.width,x.height,V,J,x.data);else{me.sort((Fe,Ee)=>Fe.start-Ee.start);let Se=0;for(let Fe=1;Fe<me.length;Fe++){const Ee=me[Se],Me=me[Fe],O=Ee.start+Ee.count,se=B(Me.start,x.width,4),ce=B(Ee.start,x.width,4);Me.start<=O+1&&se===ce&&B(Me.start+Me.count-1,x.width,4)===se?Ee.count=Math.max(Ee.count,Me.start+Me.count-Ee.start):(++Se,me[Se]=Me)}me.length=Se+1;const re=n.getParameter(t.UNPACK_ROW_LENGTH),oe=n.getParameter(t.UNPACK_SKIP_PIXELS),ye=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,x.width);for(let Fe=0,Ee=me.length;Fe<Ee;Fe++){const Me=me[Fe],O=Math.floor(Me.start/4),se=Math.ceil(Me.count/4),ce=O%x.width,P=Math.floor(O/x.width),ae=se,$=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,ce),n.pixelStorei(t.UNPACK_SKIP_ROWS,P),n.texSubImage2D(t.TEXTURE_2D,0,ce,P,ae,$,V,J,x.data)}b.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,re),n.pixelStorei(t.UNPACK_SKIP_PIXELS,oe),n.pixelStorei(t.UNPACK_SKIP_ROWS,ye)}}function ue(b,x,V){let J=t.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(J=t.TEXTURE_2D_ARRAY),x.isData3DTexture&&(J=t.TEXTURE_3D);const ne=ie(b,x),me=x.source;n.bindTexture(J,b.__webglTexture,t.TEXTURE0+V);const Se=i.get(me);if(me.version!==Se.__version||ne===!0){if(n.activeTexture(t.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const $=nt.getPrimaries(nt.workingColorSpace),ge=x.colorSpace===ar?null:nt.getPrimaries(x.colorSpace),xe=x.colorSpace===ar||$===ge?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe)}n.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment);let oe=g(x.image,!1,r.maxTextureSize);oe=Gt(x,oe);const ye=s.convert(x.format,x.colorSpace),Fe=s.convert(x.type);let Ee=S(x.internalFormat,ye,Fe,x.normalized,x.colorSpace,x.isVideoTexture);q(J,x);let Me;const O=x.mipmaps,se=x.isVideoTexture!==!0,ce=Se.__version===void 0||ne===!0,P=me.dataReady,ae=w(x,oe);if(x.isDepthTexture)Ee=T(x.format===Or,x.type),ce&&(se?n.texStorage2D(t.TEXTURE_2D,1,Ee,oe.width,oe.height):n.texImage2D(t.TEXTURE_2D,0,Ee,oe.width,oe.height,0,ye,Fe,null));else if(x.isDataTexture)if(O.length>0){se&&ce&&n.texStorage2D(t.TEXTURE_2D,ae,Ee,O[0].width,O[0].height);for(let $=0,ge=O.length;$<ge;$++)Me=O[$],se?P&&n.texSubImage2D(t.TEXTURE_2D,$,0,0,Me.width,Me.height,ye,Fe,Me.data):n.texImage2D(t.TEXTURE_2D,$,Ee,Me.width,Me.height,0,ye,Fe,Me.data);x.generateMipmaps=!1}else se?(ce&&n.texStorage2D(t.TEXTURE_2D,ae,Ee,oe.width,oe.height),P&&X(x,oe,ye,Fe)):n.texImage2D(t.TEXTURE_2D,0,Ee,oe.width,oe.height,0,ye,Fe,oe.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){se&&ce&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ae,Ee,O[0].width,O[0].height,oe.depth);for(let $=0,ge=O.length;$<ge;$++)if(Me=O[$],x.format!==ri)if(ye!==null)if(se){if(P)if(x.layerUpdates.size>0){const xe=eg(Me.width,Me.height,x.format,x.type);for(const le of x.layerUpdates){const Le=Me.data.subarray(le*xe/Me.data.BYTES_PER_ELEMENT,(le+1)*xe/Me.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,le,Me.width,Me.height,1,ye,Le)}}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,Me.width,Me.height,oe.depth,ye,Me.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,$,Ee,Me.width,Me.height,oe.depth,0,Me.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else se?P&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,Me.width,Me.height,oe.depth,ye,Fe,Me.data):n.texImage3D(t.TEXTURE_2D_ARRAY,$,Ee,Me.width,Me.height,oe.depth,0,ye,Fe,Me.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{se&&ce&&n.texStorage2D(t.TEXTURE_2D,ae,Ee,O[0].width,O[0].height);for(let $=0,ge=O.length;$<ge;$++)Me=O[$],x.format!==ri?ye!==null?se?P&&n.compressedTexSubImage2D(t.TEXTURE_2D,$,0,0,Me.width,Me.height,ye,Me.data):n.compressedTexImage2D(t.TEXTURE_2D,$,Ee,Me.width,Me.height,0,Me.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?P&&n.texSubImage2D(t.TEXTURE_2D,$,0,0,Me.width,Me.height,ye,Fe,Me.data):n.texImage2D(t.TEXTURE_2D,$,Ee,Me.width,Me.height,0,ye,Fe,Me.data)}else if(x.isDataArrayTexture)if(se){if(ce&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ae,Ee,oe.width,oe.height,oe.depth),P)if(x.layerUpdates.size>0){const $=eg(oe.width,oe.height,x.format,x.type);for(const ge of x.layerUpdates){const xe=oe.data.subarray(ge*$/oe.data.BYTES_PER_ELEMENT,(ge+1)*$/oe.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ge,oe.width,oe.height,1,ye,Fe,xe)}x.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,ye,Fe,oe.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Ee,oe.width,oe.height,oe.depth,0,ye,Fe,oe.data);else if(x.isData3DTexture)se?(ce&&n.texStorage3D(t.TEXTURE_3D,ae,Ee,oe.width,oe.height,oe.depth),P&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,ye,Fe,oe.data)):n.texImage3D(t.TEXTURE_3D,0,Ee,oe.width,oe.height,oe.depth,0,ye,Fe,oe.data);else if(x.isFramebufferTexture){if(ce)if(se)n.texStorage2D(t.TEXTURE_2D,ae,Ee,oe.width,oe.height);else{let $=oe.width,ge=oe.height;for(let xe=0;xe<ae;xe++)n.texImage2D(t.TEXTURE_2D,xe,Ee,$,ge,0,ye,Fe,null),$>>=1,ge>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in t){const $=t.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),oe.parentNode!==$){$.appendChild(oe),h.add(x),$.onpaint=ge=>{const xe=ge.changedElements;for(const le of h)xe.includes(le.image)&&(le.needsUpdate=!0)},$.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,oe);else{const xe=t.RGBA,le=t.RGBA,Le=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,xe,le,Le,oe)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(O.length>0){if(se&&ce){const $=ot(O[0]);n.texStorage2D(t.TEXTURE_2D,ae,Ee,$.width,$.height)}for(let $=0,ge=O.length;$<ge;$++)Me=O[$],se?P&&n.texSubImage2D(t.TEXTURE_2D,$,0,0,ye,Fe,Me):n.texImage2D(t.TEXTURE_2D,$,Ee,ye,Fe,Me);x.generateMipmaps=!1}else if(se){if(ce){const $=ot(oe);n.texStorage2D(t.TEXTURE_2D,ae,Ee,$.width,$.height)}P&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ye,Fe,oe)}else n.texImage2D(t.TEXTURE_2D,0,Ee,ye,Fe,oe);f(x)&&_(J),Se.__version=me.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function _e(b,x,V){if(x.image.length!==6)return;const J=ie(b,x),ne=x.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+V);const me=i.get(ne);if(ne.version!==me.__version||J===!0){n.activeTexture(t.TEXTURE0+V);const Se=nt.getPrimaries(nt.workingColorSpace),re=x.colorSpace===ar?null:nt.getPrimaries(x.colorSpace),oe=x.colorSpace===ar||Se===re?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const ye=x.isCompressedTexture||x.image[0].isCompressedTexture,Fe=x.image[0]&&x.image[0].isDataTexture,Ee=[];for(let le=0;le<6;le++)!ye&&!Fe?Ee[le]=g(x.image[le],!0,r.maxCubemapSize):Ee[le]=Fe?x.image[le].image:x.image[le],Ee[le]=Gt(x,Ee[le]);const Me=Ee[0],O=s.convert(x.format,x.colorSpace),se=s.convert(x.type),ce=S(x.internalFormat,O,se,x.normalized,x.colorSpace),P=x.isVideoTexture!==!0,ae=me.__version===void 0||J===!0,$=ne.dataReady;let ge=w(x,Me);q(t.TEXTURE_CUBE_MAP,x);let xe;if(ye){P&&ae&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ge,ce,Me.width,Me.height);for(let le=0;le<6;le++){xe=Ee[le].mipmaps;for(let Le=0;Le<xe.length;Le++){const Ce=xe[Le];x.format!==ri?O!==null?P?$&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le,0,0,Ce.width,Ce.height,O,Ce.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le,ce,Ce.width,Ce.height,0,Ce.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?$&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le,0,0,Ce.width,Ce.height,O,se,Ce.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le,ce,Ce.width,Ce.height,0,O,se,Ce.data)}}}else{if(xe=x.mipmaps,P&&ae){xe.length>0&&ge++;const le=ot(Ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ge,ce,le.width,le.height)}for(let le=0;le<6;le++)if(Fe){P?$&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Ee[le].width,Ee[le].height,O,se,Ee[le].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ce,Ee[le].width,Ee[le].height,0,O,se,Ee[le].data);for(let Le=0;Le<xe.length;Le++){const $e=xe[Le].image[le].image;P?$&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le+1,0,0,$e.width,$e.height,O,se,$e.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le+1,ce,$e.width,$e.height,0,O,se,$e.data)}}else{P?$&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,O,se,Ee[le]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ce,O,se,Ee[le]);for(let Le=0;Le<xe.length;Le++){const Ce=xe[Le];P?$&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le+1,0,0,O,se,Ce.image[le]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Le+1,ce,O,se,Ce.image[le])}}}f(x)&&_(t.TEXTURE_CUBE_MAP),me.__version=ne.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function fe(b,x,V,J,ne,me){const Se=s.convert(V.format,V.colorSpace),re=s.convert(V.type),oe=S(V.internalFormat,Se,re,V.normalized,V.colorSpace),ye=i.get(x),Fe=i.get(V);if(Fe.__renderTarget=x,!ye.__hasExternalTextures){const Ee=Math.max(1,x.width>>me),Me=Math.max(1,x.height>>me);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,me,oe,Ee,Me,x.depth,0,Se,re,null):n.texImage2D(ne,me,oe,Ee,Me,0,Se,re,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),Rt(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,J,ne,Fe.__webglTexture,0,ct(x)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,J,ne,Fe.__webglTexture,me),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ue(b,x,V){if(t.bindRenderbuffer(t.RENDERBUFFER,b),x.depthBuffer){const J=x.depthTexture,ne=J&&J.isDepthTexture?J.type:null,me=T(x.stencilBuffer,ne),Se=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Rt(x)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ct(x),me,x.width,x.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,ct(x),me,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,me,x.width,x.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,b)}else{const J=x.textures;for(let ne=0;ne<J.length;ne++){const me=J[ne],Se=s.convert(me.format,me.colorSpace),re=s.convert(me.type),oe=S(me.internalFormat,Se,re,me.normalized,me.colorSpace);Rt(x)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ct(x),oe,x.width,x.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,ct(x),oe,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,oe,x.width,x.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ze(b,x,V){const J=x.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=i.get(x.depthTexture);if(ne.__renderTarget=x,(!ne.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),ne.__webglTexture===void 0){ne.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),q(t.TEXTURE_CUBE_MAP,x.depthTexture);const ye=s.convert(x.depthTexture.format),Fe=s.convert(x.depthTexture.type);let Ee;x.depthTexture.format===Gi?Ee=t.DEPTH_COMPONENT24:x.depthTexture.format===Or&&(Ee=t.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,Ee,x.width,x.height,0,ye,Fe,null)}}else H(x.depthTexture,0);const me=ne.__webglTexture,Se=ct(x),re=J?t.TEXTURE_CUBE_MAP_POSITIVE_X+V:t.TEXTURE_2D,oe=x.depthTexture.format===Or?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(x.depthTexture.format===Gi)Rt(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,oe,re,me,0,Se):t.framebufferTexture2D(t.FRAMEBUFFER,oe,re,me,0);else if(x.depthTexture.format===Or)Rt(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,oe,re,me,0,Se):t.framebufferTexture2D(t.FRAMEBUFFER,oe,re,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Be(b){const x=i.get(b),V=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const J=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),J){const ne=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,J.removeEventListener("dispose",ne)};J.addEventListener("dispose",ne),x.__depthDisposeCallback=ne}x.__boundDepthTexture=J}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let J=0;J<6;J++)Ze(x.__webglFramebuffer[J],b,J);else{const J=b.texture.mipmaps;J&&J.length>0?Ze(x.__webglFramebuffer[0],b,0):Ze(x.__webglFramebuffer,b,0)}else if(V){x.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[J]),x.__webglDepthbuffer[J]===void 0)x.__webglDepthbuffer[J]=t.createRenderbuffer(),Ue(x.__webglDepthbuffer[J],b,!1);else{const ne=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=x.__webglDepthbuffer[J];t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,me)}}else{const J=b.texture.mipmaps;if(J&&J.length>0?n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=t.createRenderbuffer(),Ue(x.__webglDepthbuffer,b,!1);else{const ne=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=x.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,me)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function he(b,x,V){const J=i.get(b);x!==void 0&&fe(J.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),V!==void 0&&Be(b)}function Ve(b){const x=b.texture,V=i.get(b),J=i.get(x);b.addEventListener("dispose",m);const ne=b.textures,me=b.isWebGLCubeRenderTarget===!0,Se=ne.length>1;if(Se||(J.__webglTexture===void 0&&(J.__webglTexture=t.createTexture()),J.__version=x.version,a.memory.textures++),me){V.__webglFramebuffer=[];for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[re]=[];for(let oe=0;oe<x.mipmaps.length;oe++)V.__webglFramebuffer[re][oe]=t.createFramebuffer()}else V.__webglFramebuffer[re]=t.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let re=0;re<x.mipmaps.length;re++)V.__webglFramebuffer[re]=t.createFramebuffer()}else V.__webglFramebuffer=t.createFramebuffer();if(Se)for(let re=0,oe=ne.length;re<oe;re++){const ye=i.get(ne[re]);ye.__webglTexture===void 0&&(ye.__webglTexture=t.createTexture(),a.memory.textures++)}if(b.samples>0&&Rt(b)===!1){V.__webglMultisampledFramebuffer=t.createFramebuffer(),V.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let re=0;re<ne.length;re++){const oe=ne[re];V.__webglColorRenderbuffer[re]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,V.__webglColorRenderbuffer[re]);const ye=s.convert(oe.format,oe.colorSpace),Fe=s.convert(oe.type),Ee=S(oe.internalFormat,ye,Fe,oe.normalized,oe.colorSpace,b.isXRRenderTarget===!0),Me=ct(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,Me,Ee,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.RENDERBUFFER,V.__webglColorRenderbuffer[re])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=t.createRenderbuffer(),Ue(V.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(me){n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture),q(t.TEXTURE_CUBE_MAP,x);for(let re=0;re<6;re++)if(x.mipmaps&&x.mipmaps.length>0)for(let oe=0;oe<x.mipmaps.length;oe++)fe(V.__webglFramebuffer[re][oe],b,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+re,oe);else fe(V.__webglFramebuffer[re],b,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);f(x)&&_(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let re=0,oe=ne.length;re<oe;re++){const ye=ne[re],Fe=i.get(ye);let Ee=t.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Ee=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Ee,Fe.__webglTexture),q(Ee,ye),fe(V.__webglFramebuffer,b,ye,t.COLOR_ATTACHMENT0+re,Ee,0),f(ye)&&_(Ee)}n.unbindTexture()}else{let re=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(re=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(re,J.__webglTexture),q(re,x),x.mipmaps&&x.mipmaps.length>0)for(let oe=0;oe<x.mipmaps.length;oe++)fe(V.__webglFramebuffer[oe],b,x,t.COLOR_ATTACHMENT0,re,oe);else fe(V.__webglFramebuffer,b,x,t.COLOR_ATTACHMENT0,re,0);f(x)&&_(re),n.unbindTexture()}b.depthBuffer&&Be(b)}function Ie(b){const x=b.textures;for(let V=0,J=x.length;V<J;V++){const ne=x[V];if(f(ne)){const me=y(b),Se=i.get(ne).__webglTexture;n.bindTexture(me,Se),_(me),n.unbindTexture()}}}const qe=[],He=[];function _t(b){if(b.samples>0){if(Rt(b)===!1){const x=b.textures,V=b.width,J=b.height;let ne=t.COLOR_BUFFER_BIT;const me=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(b),re=x.length>1;if(re)for(let ye=0;ye<x.length;ye++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const oe=b.texture.mipmaps;oe&&oe.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ye=0;ye<x.length;ye++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),re){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const Fe=i.get(x[ye]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Fe,0)}t.blitFramebuffer(0,0,V,J,0,0,V,J,ne,t.NEAREST),l===!0&&(qe.length=0,He.length=0,qe.push(t.COLOR_ATTACHMENT0+ye),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(qe.push(me),He.push(me),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,He)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,qe))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),re)for(let ye=0;ye<x.length;ye++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const Fe=i.get(x[ye]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,Fe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){const x=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[x])}}}function ct(b){return Math.min(r.maxSamples,b.samples)}function Rt(b){const x=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function U(b){const x=a.render.frame;u.get(b)!==x&&(u.set(b,x),b.update())}function Gt(b,x){const V=b.colorSpace,J=b.format,ne=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||V!==lc&&V!==ar&&(nt.getTransfer(V)===ut?(J!==ri||ne!==Pn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",V)),x}function ot(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=te,this.resetTextureUnits=Y,this.getTextureUnits=D,this.setTextureUnits=G,this.setTexture2D=H,this.setTexture2DArray=k,this.setTexture3D=W,this.setTextureCube=ee,this.rebindTextures=he,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=Rt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function _C(t,e){function n(i,r=ar){let s;const a=nt.getTransfer(r);if(i===Pn)return t.UNSIGNED_BYTE;if(i===Ph)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Lh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===o_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===l_)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===s_)return t.BYTE;if(i===a_)return t.SHORT;if(i===uo)return t.UNSIGNED_SHORT;if(i===bh)return t.INT;if(i===Si)return t.UNSIGNED_INT;if(i===ii)return t.FLOAT;if(i===yi)return t.HALF_FLOAT;if(i===c_)return t.ALPHA;if(i===u_)return t.RGB;if(i===ri)return t.RGBA;if(i===Gi)return t.DEPTH_COMPONENT;if(i===Or)return t.DEPTH_STENCIL;if(i===Nh)return t.RED;if(i===Dh)return t.RED_INTEGER;if(i===jr)return t.RG;if(i===Ih)return t.RG_INTEGER;if(i===Uh)return t.RGBA_INTEGER;if(i===Pl||i===Ll||i===Nl||i===Dl)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Pl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ll)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Nl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Dl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Pl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ll)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Nl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Dl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Jd||i===Qd||i===ef||i===tf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Jd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ef)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===tf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===nf||i===rf||i===sf||i===af||i===of||i===ac||i===lf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===nf||i===rf)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===sf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===af)return s.COMPRESSED_R11_EAC;if(i===of)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ac)return s.COMPRESSED_RG11_EAC;if(i===lf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===cf||i===uf||i===df||i===ff||i===hf||i===pf||i===mf||i===gf||i===vf||i===_f||i===xf||i===Sf||i===yf||i===Mf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===cf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===uf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===df)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ff)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===hf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===pf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===mf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===gf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_f)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===xf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ef||i===wf||i===Tf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ef)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Tf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Af||i===Cf||i===oc||i===Rf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Af)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Cf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===oc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const xC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new S_(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Mi({vertexShader:xC,fragmentShader:SC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new dt(new Pc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class MC extends Kr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,v=null;const E=typeof XRWebGLBinding<"u",g=new yC,f={},_=n.getContextAttributes();let y=null,S=null;const T=[],w=[],C=new ze;let m=null,R=null;const L=new ti;L.viewport=new Tt;const N=new ti;N.viewport=new Tt;const F=[L,N],Y=new PE;let D=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let X=T[B];return X===void 0&&(X=new wu,T[B]=X),X.getTargetRaySpace()},this.getControllerGrip=function(B){let X=T[B];return X===void 0&&(X=new wu,T[B]=X),X.getGripSpace()},this.getHand=function(B){let X=T[B];return X===void 0&&(X=new wu,T[B]=X),X.getHandSpace()};function te(B){const X=w.indexOf(B.inputSource);if(X===-1)return;const ue=T[X];ue!==void 0&&(ue.update(B.inputSource,B.frame,c||a),ue.dispatchEvent({type:B.type,data:B.inputSource}))}function j(){r.removeEventListener("select",te),r.removeEventListener("selectstart",te),r.removeEventListener("selectend",te),r.removeEventListener("squeeze",te),r.removeEventListener("squeezestart",te),r.removeEventListener("squeezeend",te),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",H);for(let B=0;B<T.length;B++){const X=w[B];X!==null&&(w[B]=null,T[B].disconnect(X))}D=null,G=null,g.reset();for(const B in f)delete f[B];if(e.setRenderTarget(y),p=null,d=null,h=null,r=null,S=null,ie.stop(),i.isPresenting=!1,e.setPixelRatio(m),e.setSize(C.width,C.height,!1),R!==null){const B=R.camera;B.fov=R.fov,B.zoom=R.zoom,B.updateProjectionMatrix(),R=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){s=B,i.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,i.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&E&&(h=new XRWebGLBinding(r,n)),h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(B){if(r=B,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",te),r.addEventListener("selectstart",te),r.addEventListener("selectend",te),r.addEventListener("squeeze",te),r.addEventListener("squeezestart",te),r.addEventListener("squeezeend",te),r.addEventListener("end",j),r.addEventListener("inputsourceschange",H),_.xrCompatible!==!0&&await n.makeXRCompatible(),m=e.getPixelRatio(),e.getSize(C),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,_e=null,fe=null;_.depth&&(fe=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ue=_.stencil?Or:Gi,_e=_.stencil?fo:Si);const Ue={colorFormat:n.RGBA8,depthFormat:fe,scaleFactor:s};h=this.getBinding(),d=h.createProjectionLayer(Ue),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new oi(d.textureWidth,d.textureHeight,{format:ri,type:Pn,depthTexture:new po(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const ue={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ue),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new oi(p.framebufferWidth,p.framebufferHeight,{format:ri,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ie.setContext(r),ie.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(B){for(let X=0;X<B.removed.length;X++){const ue=B.removed[X],_e=w.indexOf(ue);_e>=0&&(w[_e]=null,T[_e].disconnect(ue))}for(let X=0;X<B.added.length;X++){const ue=B.added[X];let _e=w.indexOf(ue);if(_e===-1){for(let Ue=0;Ue<T.length;Ue++)if(Ue>=w.length){w.push(ue),_e=Ue;break}else if(w[Ue]===null){w[Ue]=ue,_e=Ue;break}if(_e===-1)break}const fe=T[_e];fe&&fe.connect(ue)}}const k=new z,W=new z;function ee(B,X,ue){k.setFromMatrixPosition(X.matrixWorld),W.setFromMatrixPosition(ue.matrixWorld);const _e=k.distanceTo(W),fe=X.projectionMatrix.elements,Ue=ue.projectionMatrix.elements,Ze=fe[14]/(fe[10]-1),Be=fe[14]/(fe[10]+1),he=(fe[9]+1)/fe[5],Ve=(fe[9]-1)/fe[5],Ie=(fe[8]-1)/fe[0],qe=(Ue[8]+1)/Ue[0],He=Ze*Ie,_t=Ze*qe,ct=_e/(-Ie+qe),Rt=ct*-Ie;if(X.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(Rt),B.translateZ(ct),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),fe[10]===-1)B.projectionMatrix.copy(X.projectionMatrix),B.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const U=Ze+ct,Gt=Be+ct,ot=He-Rt,b=_t+(_e-Rt),x=he*Be/Gt*U,V=Ve*Be/Gt*U;B.projectionMatrix.makePerspective(ot,b,x,V,U,Gt),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function ve(B,X){X===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(X.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(r===null)return;let X=B.near,ue=B.far;g.texture!==null&&(g.depthNear>0&&(X=g.depthNear),g.depthFar>0&&(ue=g.depthFar)),Y.near=N.near=L.near=X,Y.far=N.far=L.far=ue,(D!==Y.near||G!==Y.far)&&(r.updateRenderState({depthNear:Y.near,depthFar:Y.far}),D=Y.near,G=Y.far),Y.layers.mask=B.layers.mask|6,L.layers.mask=Y.layers.mask&-5,N.layers.mask=Y.layers.mask&-3;const _e=B.parent,fe=Y.cameras;ve(Y,_e);for(let Ue=0;Ue<fe.length;Ue++)ve(fe[Ue],_e);fe.length===2?ee(Y,L,N):Y.projectionMatrix.copy(L.projectionMatrix),R===null&&B.isPerspectiveCamera&&(R={camera:B,fov:B.fov,zoom:B.zoom}),de(B,Y,_e)};function de(B,X,ue){ue===null?B.matrix.copy(X.matrixWorld):(B.matrix.copy(ue.matrixWorld),B.matrix.invert(),B.matrix.multiply(X.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(X.projectionMatrix),B.projectionMatrixInverse.copy(X.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Pf*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(B){l=B,d!==null&&(d.fixedFoveation=B),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=B)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(Y)},this.getCameraTexture=function(B){return f[B]};let We=null;function q(B,X){if(u=X.getViewerPose(c||a),v=X,u!==null){const ue=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let _e=!1;ue.length!==Y.cameras.length&&(Y.cameras.length=0,_e=!0);for(let Be=0;Be<ue.length;Be++){const he=ue[Be];let Ve=null;if(p!==null)Ve=p.getViewport(he);else{const qe=h.getViewSubImage(d,he);Ve=qe.viewport,Be===0&&(e.setRenderTargetTextures(S,qe.colorTexture,qe.depthStencilTexture),e.setRenderTarget(S))}let Ie=F[Be];Ie===void 0&&(Ie=new ti,Ie.layers.enable(Be),Ie.viewport=new Tt,F[Be]=Ie),Ie.matrix.fromArray(he.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(he.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),Be===0&&(Y.matrix.copy(Ie.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),_e===!0&&Y.cameras.push(Ie)}const fe=r.enabledFeatures;if(fe&&fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){h=i.getBinding();const Be=h.getDepthInformation(ue[0]);Be&&Be.isValid&&Be.texture&&g.init(Be,r.renderState)}if(fe&&fe.includes("camera-access")&&E){e.state.unbindTexture(),h=i.getBinding();for(let Be=0;Be<ue.length;Be++){const he=ue[Be].camera;if(he){let Ve=f[he];Ve||(Ve=new S_,f[he]=Ve);const Ie=h.getCameraImage(he);Ve.sourceTexture=Ie}}}}for(let ue=0;ue<T.length;ue++){const _e=w[ue],fe=T[ue];_e!==null&&fe!==void 0&&fe.update(_e,X,c||a)}We&&We(B,X),X.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:X}),v=null}const ie=new A_;ie.setAnimationLoop(q),this.setAnimationLoop=function(B){We=B},this.dispose=function(){}}}const EC=new mt,D_=new Xe;D_.set(-1,0,0,0,1,0,0,0,1);function wC(t,e){function n(g,f){g.matrixAutoUpdate===!0&&g.updateMatrix(),f.value.copy(g.matrix)}function i(g,f){f.color.getRGB(g.fogColor.value,E_(t)),f.isFog?(g.fogNear.value=f.near,g.fogFar.value=f.far):f.isFogExp2&&(g.fogDensity.value=f.density)}function r(g,f,_,y,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(g,f):f.isMeshLambertMaterial?(s(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(g,f),h(g,f)):f.isMeshPhongMaterial?(s(g,f),u(g,f),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(g,f),d(g,f),f.isMeshPhysicalMaterial&&p(g,f,S)):f.isMeshMatcapMaterial?(s(g,f),v(g,f)):f.isMeshDepthMaterial?s(g,f):f.isMeshDistanceMaterial?(s(g,f),E(g,f)):f.isMeshNormalMaterial?s(g,f):f.isLineBasicMaterial?(a(g,f),f.isLineDashedMaterial&&o(g,f)):f.isPointsMaterial?l(g,f,_,y):f.isSpriteMaterial?c(g,f):f.isShadowMaterial?(g.color.value.copy(f.color),g.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(g,f){g.opacity.value=f.opacity,f.color&&g.diffuse.value.copy(f.color),f.emissive&&g.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.bumpMap&&(g.bumpMap.value=f.bumpMap,n(f.bumpMap,g.bumpMapTransform),g.bumpScale.value=f.bumpScale,f.side===wn&&(g.bumpScale.value*=-1)),f.normalMap&&(g.normalMap.value=f.normalMap,n(f.normalMap,g.normalMapTransform),g.normalScale.value.copy(f.normalScale),f.side===wn&&g.normalScale.value.negate()),f.displacementMap&&(g.displacementMap.value=f.displacementMap,n(f.displacementMap,g.displacementMapTransform),g.displacementScale.value=f.displacementScale,g.displacementBias.value=f.displacementBias),f.emissiveMap&&(g.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,g.emissiveMapTransform)),f.specularMap&&(g.specularMap.value=f.specularMap,n(f.specularMap,g.specularMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest);const _=e.get(f),y=_.envMap,S=_.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(EC.makeRotationFromEuler(S)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(D_),g.reflectivity.value=f.reflectivity,g.ior.value=f.ior,g.refractionRatio.value=f.refractionRatio),f.lightMap&&(g.lightMap.value=f.lightMap,g.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,g.lightMapTransform)),f.aoMap&&(g.aoMap.value=f.aoMap,g.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,g.aoMapTransform))}function a(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform))}function o(g,f){g.dashSize.value=f.dashSize,g.totalSize.value=f.dashSize+f.gapSize,g.scale.value=f.scale}function l(g,f,_,y){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.size.value=f.size*_,g.scale.value=y*.5,f.map&&(g.map.value=f.map,n(f.map,g.uvTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function c(g,f){g.diffuse.value.copy(f.color),g.opacity.value=f.opacity,g.rotation.value=f.rotation,f.map&&(g.map.value=f.map,n(f.map,g.mapTransform)),f.alphaMap&&(g.alphaMap.value=f.alphaMap,n(f.alphaMap,g.alphaMapTransform)),f.alphaTest>0&&(g.alphaTest.value=f.alphaTest)}function u(g,f){g.specular.value.copy(f.specular),g.shininess.value=Math.max(f.shininess,1e-4)}function h(g,f){f.gradientMap&&(g.gradientMap.value=f.gradientMap)}function d(g,f){g.metalness.value=f.metalness,f.metalnessMap&&(g.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,g.metalnessMapTransform)),g.roughness.value=f.roughness,f.roughnessMap&&(g.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,g.roughnessMapTransform)),f.envMap&&(g.envMapIntensity.value=f.envMapIntensity)}function p(g,f,_){g.ior.value=f.ior,f.sheen>0&&(g.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),g.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(g.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,g.sheenColorMapTransform)),f.sheenRoughnessMap&&(g.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,g.sheenRoughnessMapTransform))),f.clearcoat>0&&(g.clearcoat.value=f.clearcoat,g.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(g.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,g.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(g.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===wn&&g.clearcoatNormalScale.value.negate())),f.dispersion>0&&(g.dispersion.value=f.dispersion),f.retroreflectivity>0&&(g.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(g.iridescence.value=f.iridescence,g.iridescenceIOR.value=f.iridescenceIOR,g.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(g.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,g.iridescenceMapTransform)),f.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),f.transmission>0&&(g.transmission.value=f.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),f.transmissionMap&&(g.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,g.transmissionMapTransform)),g.thickness.value=f.thickness,f.thicknessMap&&(g.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=f.attenuationDistance,g.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(g.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(g.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=f.specularIntensity,g.specularColor.value.copy(f.specularColor),f.specularColorMap&&(g.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,g.specularColorMapTransform)),f.specularIntensityMap&&(g.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,f){f.matcap&&(g.matcap.value=f.matcap)}function E(g,f){const _=e.get(f).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function TC(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,T){const w=T.program;i.uniformBlockBinding(S,w)}function c(S,T){let w=r[S.id];w===void 0&&(g(S),w=u(S),r[S.id]=w,S.addEventListener("dispose",_));const C=T.program;i.updateUBOMapping(S,C);const m=e.render.frame;s[S.id]!==m&&(d(S),s[S.id]=m)}function u(S){const T=h();S.__bindingPointIndex=T;const w=t.createBuffer(),C=S.__size,m=S.usage;return t.bindBuffer(t.UNIFORM_BUFFER,w),t.bufferData(t.UNIFORM_BUFFER,C,m),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,T,w),w}function h(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const T=r[S.id],w=S.uniforms,C=S.__cache;t.bindBuffer(t.UNIFORM_BUFFER,T);for(let m=0,R=w.length;m<R;m++){const L=w[m];if(Array.isArray(L))for(let N=0,F=L.length;N<F;N++)p(L[N],m,N,C);else p(L,m,0,C)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(S,T,w,C){if(E(S,T,w,C)===!0){const m=S.__offset,R=S.value;if(Array.isArray(R)){let L=0;for(let N=0;N<R.length;N++){const F=R[N],Y=f(F);v(F,S.__data,L),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(R,S.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,m,S.__data)}}function v(S,T,w){typeof S=="number"||typeof S=="boolean"?T[0]=S:S.isMatrix3?(T[0]=S.elements[0],T[1]=S.elements[1],T[2]=S.elements[2],T[3]=0,T[4]=S.elements[3],T[5]=S.elements[4],T[6]=S.elements[5],T[7]=0,T[8]=S.elements[6],T[9]=S.elements[7],T[10]=S.elements[8],T[11]=0):ArrayBuffer.isView(S)?T.set(new S.constructor(S.buffer,S.byteOffset,T.length)):S.toArray(T,w)}function E(S,T,w,C){const m=S.value,R=T+"_"+w;if(C[R]===void 0)return typeof m=="number"||typeof m=="boolean"?C[R]=m:ArrayBuffer.isView(m)?C[R]=m.slice():C[R]=m.clone(),!0;{const L=C[R];if(typeof m=="number"||typeof m=="boolean"){if(L!==m)return C[R]=m,!0}else{if(ArrayBuffer.isView(m))return!0;if(L.equals(m)===!1)return L.copy(m),!0}}return!1}function g(S){const T=S.uniforms;let w=0;const C=16;for(let R=0,L=T.length;R<L;R++){const N=Array.isArray(T[R])?T[R]:[T[R]];for(let F=0,Y=N.length;F<Y;F++){const D=N[F],G=Array.isArray(D.value)?D.value:[D.value];for(let te=0,j=G.length;te<j;te++){const H=G[te],k=f(H),W=w%C,ee=W%k.boundary,ve=W+ee;w+=ee,ve!==0&&C-ve<k.storage&&(w+=C-ve),D.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=k.storage}}}const m=w%C;return m>0&&(w+=C-m),S.__size=w,S.__cache={},this}function f(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(T.boundary=16,T.storage=S.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",S),T}function _(S){const T=S.target;T.removeEventListener("dispose",_);const w=a.indexOf(T.__bindingPointIndex);a.splice(w,1),t.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function y(){for(const S in r)t.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:y}}const AC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fi=null;function CC(){return fi===null&&(fi=new __(AC,16,16,jr,yi),fi.name="DFG_LUT",fi.minFilter=an,fi.magFilter=an,fi.wrapS=Ui,fi.wrapT=Ui,fi.generateMipmaps=!1,fi.needsUpdate=!0),fi}class RC{constructor(e={}){const{canvas:n=AM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Pn}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=a;const E=p,g=new Set([Uh,Ih,Dh]),f=new Set([Pn,Si,uo,fo,Ph,Lh]),_=new Uint32Array(4),y=new Int32Array(4),S=new z;let T=null,w=null;const C=[],m=[];let R=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let N=!1,F=null,Y=null,D=null,G=null;this._outputColorSpace=bn;let te=0,j=0,H=null,k=-1,W=null;const ee=new Tt,ve=new Tt;let de=null;const We=new it(0);let q=0,ie=n.width,B=n.height,X=1,ue=null,_e=null;const fe=new Tt(0,0,ie,B),Ue=new Tt(0,0,ie,B);let Ze=!1;const Be=new kh;let he=!1,Ve=!1;const Ie=new mt,qe=new z,He=new Tt,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function Rt(){return H===null?X:1}let U=i;function Gt(M,I){return n.getContext(M,I)}let ot,b,x,V,J,ne,me,Se,re,oe,ye,Fe,Ee,Me,O,se,ce,P,ae,$,ge,xe,le;try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Rh}`),n.addEventListener("webglcontextlost",$e,!1),n.addEventListener("webglcontextrestored",Ke,!1),n.addEventListener("webglcontextcreationerror",Dt,!1),U===null){const I="webgl2";if(U=Gt(I,M),U===null)throw Gt(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(M){throw n.removeEventListener("webglcontextlost",$e,!1),n.removeEventListener("webglcontextrestored",Ke,!1),n.removeEventListener("webglcontextcreationerror",Dt,!1),at("WebGLRenderer: "+M.message),M}function Le(){ot=new CT(U),ot.init(),ge=new _C(U,ot),b=new vT(U,ot,e,ge),x=new gC(U,ot),b.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),Y=U.createFramebuffer(),D=U.createFramebuffer(),G=U.createFramebuffer(),V=new PT(U),J=new nC,ne=new vC(U,ot,x,J,b,ge,V),me=new AT(L),Se=new NE(U),xe=new mT(U,Se),re=new RT(U,Se,V,xe),oe=new NT(U,re,Se,xe,V),P=new LT(U,b,ne),O=new _T(J),ye=new tC(L,me,ot,b,xe,O),Fe=new wC(L,J),Ee=new rC,Me=new uC(ot),ce=new pT(L,me,x,oe,v,l),se=new mC(L,oe,b),le=new TC(U,V,b,x),ae=new gT(U,ot,V),$=new bT(U,ot,V),V.programs=ye.programs,L.capabilities=b,L.extensions=ot,L.properties=J,L.renderLists=Ee,L.shadowMap=se,L.state=x,L.info=V}E!==Pn&&(R=new IT(E,n.width,n.height,o,r,s));const Ce=new MC(L,U);this.xr=Ce,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=ot.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ot.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(M){M!==void 0&&(X=M,this.setSize(ie,B,!1))},this.getSize=function(M){return M.set(ie,B)},this.setSize=function(M,I,Q=!0){if(Ce.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=M,B=I,n.width=Math.floor(M*X),n.height=Math.floor(I*X),Q===!0&&(n.style.width=M+"px",n.style.height=I+"px"),R!==null&&R.setSize(n.width,n.height),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(ie*X,B*X).floor()},this.setDrawingBufferSize=function(M,I,Q){ie=M,B=I,X=Q,n.width=Math.floor(M*Q),n.height=Math.floor(I*Q),this.setViewport(0,0,M,I)},this.setEffects=function(M){if(E===Pn){at("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let I=0;I<M.length;I++)if(M[I].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(ee)},this.getViewport=function(M){return M.copy(fe)},this.setViewport=function(M,I,Q,K){M.isVector4?fe.set(M.x,M.y,M.z,M.w):fe.set(M,I,Q,K),x.viewport(ee.copy(fe).multiplyScalar(X).round())},this.getScissor=function(M){return M.copy(Ue)},this.setScissor=function(M,I,Q,K){M.isVector4?Ue.set(M.x,M.y,M.z,M.w):Ue.set(M,I,Q,K),x.scissor(ve.copy(Ue).multiplyScalar(X).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(M){x.setScissorTest(Ze=M)},this.setOpaqueSort=function(M){ue=M},this.setTransparentSort=function(M){_e=M},this.getClearColor=function(M){return M.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor(...arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,Q=!0){let K=0;if(M){let Z=!1;if(H!==null){const Ae=H.texture.format;Z=g.has(Ae)}if(Z){const Ae=H.texture.type,be=f.has(Ae),Te=ce.getClearColor(),Ne=ce.getClearAlpha(),Oe=Te.r,Ye=Te.g,Je=Te.b;be?(_[0]=Oe,_[1]=Ye,_[2]=Je,_[3]=Ne,U.clearBufferuiv(U.COLOR,0,_)):(y[0]=Oe,y[1]=Ye,y[2]=Je,y[3]=Ne,U.clearBufferiv(U.COLOR,0,y))}else K|=U.COLOR_BUFFER_BIT}I&&(K|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(K|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&U.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){n.removeEventListener("webglcontextlost",$e,!1),n.removeEventListener("webglcontextrestored",Ke,!1),n.removeEventListener("webglcontextcreationerror",Dt,!1),ce.dispose(),Ee.dispose(),Me.dispose(),J.dispose(),me.dispose(),oe.dispose(),xe.dispose(),le.dispose(),ye.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",jh),Ce.removeEventListener("sessionend",qh),wr.stop()};function $e(M){M.preventDefault(),Am("WebGLRenderer: Context Lost."),N=!0}function Ke(){Am("WebGLRenderer: Context Restored."),N=!1;const M=V.autoReset,I=se.enabled,Q=se.autoUpdate,K=se.needsUpdate,Z=se.type;Le(),V.autoReset=M,se.enabled=I,se.autoUpdate=Q,se.needsUpdate=K,se.type=Z}function Dt(M){at("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Bt(M){const I=M.target;I.removeEventListener("dispose",Bt),wo(I)}function wo(M){Jr(M),J.remove(M)}function Jr(M){const I=J.get(M).programs;I!==void 0&&(I.forEach(function(Q){ye.releaseProgram(Q)}),M.isShaderMaterial&&ye.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,Q,K,Z,Ae){I===null&&(I=_t);const be=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Te=B_(M,I,Q,K,Z);x.setMaterial(K,be);let Ne=Q.index,Oe=1;if(K.wireframe===!0){if(Ne=re.getWireframeAttribute(Q),Ne===void 0)return;Oe=2}const Ye=Q.drawRange,Je=Q.attributes.position;let De=Ye.start*Oe,lt=(Ye.start+Ye.count)*Oe;Ae!==null&&(De=Math.max(De,Ae.start*Oe),lt=Math.min(lt,(Ae.start+Ae.count)*Oe)),Ne!==null?(De=Math.max(De,0),lt=Math.min(lt,Ne.count)):Je!=null&&(De=Math.max(De,0),lt=Math.min(lt,Je.count));const It=lt-De;if(It<0||It===1/0)return;xe.setup(Z,K,Te,Q,Ne);let xt,pt=ae;if(Ne!==null&&(xt=Se.get(Ne),pt=$,pt.setIndex(xt)),Z.isMesh)K.wireframe===!0?(x.setLineWidth(K.wireframeLinewidth*Rt()),pt.setMode(U.LINES)):pt.setMode(U.TRIANGLES);else if(Z.isLine){let Qt=K.linewidth;Qt===void 0&&(Qt=1),x.setLineWidth(Qt*Rt()),Z.isLineSegments?pt.setMode(U.LINES):Z.isLineLoop?pt.setMode(U.LINE_LOOP):pt.setMode(U.LINE_STRIP)}else Z.isPoints?pt.setMode(U.POINTS):Z.isSprite&&pt.setMode(U.TRIANGLES);if(Z.isBatchedMesh)if(ot.get("WEBGL_multi_draw"))pt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Qt=Z._multiDrawStarts,Re=Z._multiDrawCounts,ln=Z._multiDrawCount,rt=Ne?Se.get(Ne).bytesPerElement:1,Fn=J.get(K).currentProgram.getUniforms();for(let ci=0;ci<ln;ci++)Fn.setValue(U,"_gl_DrawID",ci),pt.render(Qt[ci]/rt,Re[ci])}else if(Z.isInstancedMesh)pt.renderInstances(De,It,Z.count);else if(Q.isInstancedBufferGeometry){const Qt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Re=Math.min(Q.instanceCount,Qt);pt.renderInstances(De,It,Re)}else pt.render(De,It)};function To(M,I,Q,K){F!==null&&M.isNodeMaterial&&F.setObject(K,M),he===!0&&O.setState(M,Q,!1),M.transparent===!0&&M.side===Ni&&M.forceSinglePass===!1?(M.side=wn,M.needsUpdate=!0,Co(M,I,K),M.side=Xr,M.needsUpdate=!0,Co(M,I,K),M.side=Ni):Co(M,I,K)}this.compile=function(M,I,Q=null){Q===null&&(Q=M),F!==null&&F.renderStart(M,I,Q),w=Me.get(Q),w.init(I),m.push(w),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(I.layers)&&(w.pushLight(Z),Z.castShadow&&w.pushShadow(Z))}),M!==Q&&M.traverseVisible(function(Z){Z.isLight&&Z.layers.test(I.layers)&&(w.pushLight(Z),Z.castShadow&&w.pushShadow(Z))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),Ve=this.localClippingEnabled,he=O.init(this.clippingPlanes,Ve),he===!0&&O.setGlobalState(this.clippingPlanes,I),F!==null&&se.render(w.state.shadowsArray,Q,I);const K=new Set;return M.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Ae=Z.material;if(Ae)if(Array.isArray(Ae))for(let be=0;be<Ae.length;be++){const Te=Ae[be];To(Te,Q,I,Z),K.add(Te)}else To(Ae,Q,I,Z),K.add(Ae)}),w=m.pop(),F!==null&&F.renderEnd(),K},this.compileAsync=function(M,I,Q=null){const K=this.compile(M,I,Q);return new Promise(Z=>{function Ae(){if(K.forEach(function(be){const Ne=J.get(be).currentProgram;(Ne===void 0||Ne.isReady())&&K.delete(be)}),K.size===0){Z(M);return}setTimeout(Ae,10)}ot.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let ia=null;function Qr(M){ia&&ia(M)}function jh(){wr.stop()}function qh(){wr.start()}const wr=new A_;wr.setAnimationLoop(Qr),typeof self<"u"&&wr.setContext(self),this.setAnimationLoop=function(M){ia=M,Ce.setAnimationLoop(M),M===null?wr.stop():wr.start()},Ce.addEventListener("sessionstart",jh),Ce.addEventListener("sessionend",qh),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(M,I);const Q=Ce.enabled===!0&&Ce.isPresenting===!0,K=R!==null&&(H===null||Q)&&R.begin(L,H);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(I),I=Ce.getCamera()),M.isScene===!0&&M.onBeforeRender(L,M,I,H),w=Me.get(M,m.length),w.init(I),w.state.textureUnits=ne.getTextureUnits(),m.push(w),Ie.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Be.setFromProjectionMatrix(Ie,gi,I.reversedDepth),Ve=this.localClippingEnabled,he=O.init(this.clippingPlanes,Ve),T=Ee.get(M,C.length),T.init(),C.push(T),Ce.enabled===!0&&Ce.isPresenting===!0){const be=L.xr.getDepthSensingMesh();be!==null&&Ic(be,I,-1/0,L.sortObjects)}Ic(M,I,0,L.sortObjects),T.finish(),F!==null&&F.updateLights(w.state.lightsArray),L.sortObjects===!0&&T.sort(ue,_e),ct=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,ct&&ce.addToRenderList(T,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),he===!0&&O.beginShadows();const Z=w.state.shadowsArray;if(se.render(Z,M,I),he===!0&&O.endShadows(),(K&&R.hasRenderPass())===!1){const be=T.opaque,Te=T.transmissive;if(w.setupLights(),I.isArrayCamera){const Ne=I.cameras;if(Te.length>0)for(let Oe=0,Ye=Ne.length;Oe<Ye;Oe++){const Je=Ne[Oe];Kh(be,Te,M,Je)}ct&&ce.render(M);for(let Oe=0,Ye=Ne.length;Oe<Ye;Oe++){const Je=Ne[Oe];$h(T,M,Je,Je.viewport)}}else Te.length>0&&Kh(be,Te,M,I),ct&&ce.render(M),$h(T,M,I)}H!==null&&j===0&&(ne.updateMultisampleRenderTarget(H),ne.updateRenderTargetMipmap(H)),K&&R.end(L),M.isScene===!0&&M.onAfterRender(L,M,I),xe.resetDefaultState(),k=-1,W=null,m.pop(),m.length>0?(w=m[m.length-1],ne.setTextureUnits(w.state.textureUnits),he===!0&&O.setGlobalState(L.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,F!==null&&F.renderEnd()};function Ic(M,I,Q,K){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)Q=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLightProbeGrid)w.pushLightProbeGrid(M);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Be)){K&&He.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ie);const be=oe.update(M),Te=M.material;Te.visible&&T.push(M,be,Te,Q,He.z,null,I)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Be))){const be=oe.update(M),Te=M.material;if(K&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),He.copy(M.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),He.copy(be.boundingSphere.center)),He.applyMatrix4(M.matrixWorld).applyMatrix4(Ie)),Array.isArray(Te)){const Ne=be.groups;for(let Oe=0,Ye=Ne.length;Oe<Ye;Oe++){const Je=Ne[Oe],De=Te[Je.materialIndex];De&&De.visible&&T.push(M,be,De,Q,He.z,Je,I)}}else Te.visible&&T.push(M,be,Te,Q,He.z,null,I)}}const Ae=M.children;for(let be=0,Te=Ae.length;be<Te;be++)Ic(Ae[be],I,Q,K)}function $h(M,I,Q,K){const{opaque:Z,transmissive:Ae,transparent:be}=M;w.setupLightsView(Q),he===!0&&O.setGlobalState(L.clippingPlanes,Q),K&&x.viewport(ee.copy(K)),Z.length>0&&Ao(Z,I,Q),Ae.length>0&&Ao(Ae,I,Q),be.length>0&&Ao(be,I,Q),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Kh(M,I,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[K.id]===void 0){const De=ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[K.id]=new oi(1,1,{generateMipmaps:!0,type:De?yi:Pn,minFilter:Fr,samples:Math.max(4,b.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const Ae=w.state.transmissionRenderTarget[K.id],be=K.viewport||ee;Ae.setSize(be.z*L.transmissionResolutionScale,be.w*L.transmissionResolutionScale);const Te=L.getRenderTarget(),Ne=L.getActiveCubeFace(),Oe=L.getActiveMipmapLevel();L.setRenderTarget(Ae),L.getClearColor(We),q=L.getClearAlpha(),q<1&&L.setClearColor(16777215,.5),L.clear(),ct&&ce.render(Q);const Ye=L.toneMapping;L.toneMapping=xi;const Je=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),w.setupLightsView(K),he===!0&&O.setGlobalState(L.clippingPlanes,K),Ao(M,Q,K),ne.updateMultisampleRenderTarget(Ae),ne.updateRenderTargetMipmap(Ae),ot.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let lt=0,It=I.length;lt<It;lt++){const xt=I[lt],{object:pt,geometry:Qt,material:Re,group:ln}=xt;if(Re.side===Ni&&pt.layers.test(K.layers)){const rt=Re.side;Re.side=wn,Re.needsUpdate=!0,Zh(pt,Q,K,Qt,Re,ln),Re.side=rt,Re.needsUpdate=!0,De=!0}}De===!0&&(ne.updateMultisampleRenderTarget(Ae),ne.updateRenderTargetMipmap(Ae))}L.setRenderTarget(Te,Ne,Oe),L.setClearColor(We,q),Je!==void 0&&(K.viewport=Je),L.toneMapping=Ye}function Ao(M,I,Q){const K=I.isScene===!0?I.overrideMaterial:null;for(let Z=0,Ae=M.length;Z<Ae;Z++){const be=M[Z],{object:Te,geometry:Ne,group:Oe}=be;let Ye=be.material;Ye.allowOverride===!0&&K!==null&&(Ye=K),Te.layers.test(Q.layers)&&Zh(Te,I,Q,Ne,Ye,Oe)}}function Zh(M,I,Q,K,Z,Ae){F!==null&&Z.isNodeMaterial&&F.setObject(M,Z),M.onBeforeRender(L,I,Q,K,Z,Ae),M.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),Z.onBeforeRender(L,I,Q,K,M,Ae),Z.transparent===!0&&Z.side===Ni&&Z.forceSinglePass===!1?(Z.side=wn,Z.needsUpdate=!0,L.renderBufferDirect(Q,I,K,Z,M,Ae),Z.side=Xr,Z.needsUpdate=!0,L.renderBufferDirect(Q,I,K,Z,M,Ae),Z.side=Ni):L.renderBufferDirect(Q,I,K,Z,M,Ae),M.onAfterRender(L,I,Q,K,Z,Ae)}function Co(M,I,Q){I.isScene!==!0&&(I=_t);const K=J.get(M),Z=w.state.lights,Ae=w.state.shadowsArray,be=Z.state.version,Te=ye.getParameters(M,Z.state,Ae,I,Q,w.state.lightProbeGridArray),Ne=ye.getProgramCacheKey(Te);let Oe=K.programs;K.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,K.fog=I.fog;const Ye=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;K.envMap=me.get(M.envMap||K.environment,Ye),K.envMapRotation=K.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Oe===void 0&&(M.addEventListener("dispose",Bt),Oe=new Map,K.programs=Oe);let Je=Oe.get(Ne);if(Je!==void 0){if(K.currentProgram===Je&&K.lightsStateVersion===be)return Qh(M,Te),Je}else Te.uniforms=ye.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,Q,Te),M.onBeforeCompile(Te,L),Je=ye.acquireProgram(Te,Ne),Oe.set(Ne,Je),K.uniforms=Te.uniforms;const De=K.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(De.clippingPlanes=O.uniform),Qh(M,Te),K.needsLights=z_(M),K.lightsStateVersion=be,K.needsLights&&(De.ambientLightColor.value=Z.state.ambient,De.lightProbe.value=Z.state.probe,De.sunLights.value=Z.state.sun,De.sunLightShadows.value=Z.state.sunShadow,De.directionalLights.value=Z.state.directional,De.directionalLightShadows.value=Z.state.directionalShadow,De.spotLights.value=Z.state.spot,De.spotLightShadows.value=Z.state.spotShadow,De.rectAreaLights.value=Z.state.rectArea,De.ltc_1.value=Z.state.rectAreaLTC1,De.ltc_2.value=Z.state.rectAreaLTC2,De.pointLights.value=Z.state.point,De.pointLightShadows.value=Z.state.pointShadow,De.hemisphereLights.value=Z.state.hemi,De.sunShadowMatrix.value=Z.state.sunShadowMatrix,De.sunShadowCascade.value=Z.state.sunShadowCascade,De.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,De.spotLightMatrix.value=Z.state.spotLightMatrix,De.spotLightMap.value=Z.state.spotLightMap,De.pointShadowMatrix.value=Z.state.pointShadowMatrix),K.lightProbeGrid=w.state.lightProbeGridArray.length>0,K.currentProgram=Je,K.uniformsList=null,Je}function Jh(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=Il.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function Qh(M,I){const Q=J.get(M);Q.outputColorSpace=I.outputColorSpace,Q.batching=I.batching,Q.batchingColor=I.batchingColor,Q.instancing=I.instancing,Q.instancingColor=I.instancingColor,Q.instancingMorph=I.instancingMorph,Q.skinning=I.skinning,Q.morphTargets=I.morphTargets,Q.morphNormals=I.morphNormals,Q.morphColors=I.morphColors,Q.morphTargetsCount=I.morphTargetsCount,Q.numClippingPlanes=I.numClippingPlanes,Q.numIntersection=I.numClipIntersection,Q.vertexAlphas=I.vertexAlphas,Q.vertexTangents=I.vertexTangents,Q.toneMapping=I.toneMapping}function O_(M,I){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(I.matrixWorld);for(let Q=0,K=M.length;Q<K;Q++){const Z=M[Q];if(Z.texture!==null&&Z.boundingBox.containsPoint(S))return Z}return null}function B_(M,I,Q,K,Z){I.isScene!==!0&&(I=_t),ne.resetTextureUnits();const Ae=I.fog,be=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?I.environment:null,Te=H===null?L.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:nt.workingColorSpace,Ne=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Oe=me.get(K.envMap||be,Ne),Ye=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Je=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),De=!!Q.morphAttributes.position,lt=!!Q.morphAttributes.normal,It=!!Q.morphAttributes.color;let xt=xi;K.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(xt=L.toneMapping);const pt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Qt=pt!==void 0?pt.length:0,Re=J.get(K),ln=w.state.lights;if(he===!0&&(Ve===!0||M!==W)){const gt=M===W&&K.id===k;O.setState(K,M,gt)}let rt=!1;K.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==ln.state.version||Re.outputColorSpace!==Te||Z.isBatchedMesh&&Re.batching===!1||!Z.isBatchedMesh&&Re.batching===!0||Z.isBatchedMesh&&Re.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Re.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Re.instancing===!1||!Z.isInstancedMesh&&Re.instancing===!0||Z.isSkinnedMesh&&Re.skinning===!1||!Z.isSkinnedMesh&&Re.skinning===!0||Z.isInstancedMesh&&Re.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Re.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Re.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Re.instancingMorph===!1&&Z.morphTexture!==null||Re.envMap!==Oe||K.fog===!0&&Re.fog!==Ae||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==O.numPlanes||Re.numIntersection!==O.numIntersection)||Re.vertexAlphas!==Ye||Re.vertexTangents!==Je||Re.morphTargets!==De||Re.morphNormals!==lt||Re.morphColors!==It||Re.toneMapping!==xt||Re.morphTargetsCount!==Qt||!!Re.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(rt=!0):(rt=!0,Re.__version=K.version);let Fn=Re.currentProgram;rt===!0&&(Fn=Co(K,I,Z),F&&K.isNodeMaterial&&F.onUpdateProgram(K,Fn,Re));let ci=!1,Xi=!1,es=!1;const ht=Fn.getUniforms(),Lt=Re.uniforms;if(x.useProgram(Fn.program)&&(ci=!0,Xi=!0,es=!0),K.id!==k&&(k=K.id,Xi=!0),Re.needsLights){const gt=O_(w.state.lightProbeGridArray,Z);Re.lightProbeGrid!==gt&&(Re.lightProbeGrid=gt,Xi=!0)}if(ci||W!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ht.setValue(U,"projectionMatrix",M.projectionMatrix),ht.setValue(U,"viewMatrix",M.matrixWorldInverse);const ji=ht.map.cameraPosition;ji!==void 0&&ji.setValue(U,qe.setFromMatrixPosition(M.matrixWorld)),b.logarithmicDepthBuffer&&ht.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ht.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),W!==M&&(W=M,Xi=!0,es=!0)}if(Re.needsLights&&(ln.state.sunShadowMap.length>0&&ht.setValue(U,"sunShadowMap",ln.state.sunShadowMap,ne),ln.state.directionalShadowMap.length>0&&ht.setValue(U,"directionalShadowMap",ln.state.directionalShadowMap,ne),ln.state.spotShadowMap.length>0&&ht.setValue(U,"spotShadowMap",ln.state.spotShadowMap,ne),ln.state.pointShadowMap.length>0&&ht.setValue(U,"pointShadowMap",ln.state.pointShadowMap,ne)),Z.isSkinnedMesh){ht.setOptional(U,Z,"bindMatrix"),ht.setOptional(U,Z,"bindMatrixInverse");const gt=Z.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),ht.setValue(U,"boneTexture",gt.boneTexture,ne))}Z.isBatchedMesh&&(ht.setOptional(U,Z,"batchingTexture"),ht.setValue(U,"batchingTexture",Z._matricesTexture,ne),ht.setOptional(U,Z,"batchingIdTexture"),ht.setValue(U,"batchingIdTexture",Z._indirectTexture,ne),ht.setOptional(U,Z,"batchingColorTexture"),Z._colorsTexture!==null&&ht.setValue(U,"batchingColorTexture",Z._colorsTexture,ne));const Yi=Q.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&P.update(Z,Q,Fn),(Xi||Re.receiveShadow!==Z.receiveShadow)&&(Re.receiveShadow=Z.receiveShadow,ht.setValue(U,"receiveShadow",Z.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&I.environment!==null&&(Lt.envMapIntensity.value=I.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=CC()),Xi){if(ht.setValue(U,"toneMappingExposure",L.toneMappingExposure),Re.needsLights&&k_(Lt,es),Ae&&K.fog===!0&&Fe.refreshFogUniforms(Lt,Ae),Fe.refreshMaterialUniforms(Lt,K,X,B,w.state.transmissionRenderTarget[M.id]),Re.needsLights&&Re.lightProbeGrid){const gt=Re.lightProbeGrid;Lt.probesSH.value=gt.texture,Lt.probesMin.value.copy(gt.boundingBox.min),Lt.probesMax.value.copy(gt.boundingBox.max),Lt.probesResolution.value.copy(gt.resolution)}Il.upload(U,Jh(Re),Lt,ne)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Il.upload(U,Jh(Re),Lt,ne),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ht.setValue(U,"center",Z.center),ht.setValue(U,"modelViewMatrix",Z.modelViewMatrix),ht.setValue(U,"normalMatrix",Z.normalMatrix),ht.setValue(U,"modelMatrix",Z.matrixWorld),K.uniformsGroups!==void 0){const gt=K.uniformsGroups;for(let ji=0,ts=gt.length;ji<ts;ji++){const tp=gt[ji];le.update(tp,Fn),le.bind(tp,Fn)}}return Fn}function k_(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.sunLights.needsUpdate=I,M.sunLightShadows.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function z_(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(M,I,Q){const K=J.get(M);K.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),J.get(M.texture).__webglTexture=I,J.get(M.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Q,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const Q=J.get(M);Q.__webglFramebuffer=I,Q.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,Q=0){H=M,te=I,j=Q;let K=null,Z=!1,Ae=!1;if(M){const Te=J.get(M);if(Te.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(U.FRAMEBUFFER,Te.__webglFramebuffer),ee.copy(M.viewport),ve.copy(M.scissor),de=M.scissorTest,x.viewport(ee),x.scissor(ve),x.setScissorTest(de),k=-1;return}else if(Te.__webglFramebuffer===void 0)ne.setupRenderTarget(M);else if(Te.__hasExternalTextures)ne.rebindTextures(M,J.get(M.texture).__webglTexture,J.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ye=M.depthTexture;if(Te.__boundDepthTexture!==Ye){if(Ye!==null&&J.has(Ye)&&(M.width!==Ye.image.width||M.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(M)}}const Ne=M.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Ae=!0);const Oe=J.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Oe[I])?K=Oe[I][Q]:K=Oe[I],Z=!0):M.samples>0&&ne.useMultisampledRTT(M)===!1?K=J.get(M).__webglMultisampledFramebuffer:Array.isArray(Oe)?K=Oe[Q]:K=Oe,ee.copy(M.viewport),ve.copy(M.scissor),de=M.scissorTest}else ee.copy(fe).multiplyScalar(X).floor(),ve.copy(Ue).multiplyScalar(X).floor(),de=Ze;if(Q!==0&&(K=Y),x.bindFramebuffer(U.FRAMEBUFFER,K)&&x.drawBuffers(M,K),x.viewport(ee),x.scissor(ve),x.setScissorTest(de),Z){const Te=J.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,Te.__webglTexture,Q)}else if(Ae){const Te=I;for(let Ne=0;Ne<M.textures.length;Ne++){const Oe=J.get(M.textures[Ne]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ne,Oe.__webglTexture,Q,Te)}}else if(M!==null&&Q!==0){const Te=J.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Te.__webglTexture,Q)}k=-1};function ep(M){const I=J.get(M);return(I.__readFormat!==M.format||I.__readType!==M.type)&&(I.__readFormat=M.format,I.__readType=M.type,I.__formatReadable=b.textureFormatReadable(M.format),I.__typeReadable=b.textureTypeReadable(M.type)),I}this.readRenderTargetPixels=function(M,I,Q,K,Z,Ae,be,Te=0){if(!(M&&M.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ne=Ne[be]),Ne){x.bindFramebuffer(U.FRAMEBUFFER,Ne);try{const Oe=M.textures[Te],Ye=Oe.format,Je=Oe.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Te);const De=ep(Oe);if(De.__formatReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-K&&Q>=0&&Q<=M.height-Z&&U.readPixels(I,Q,K,Z,ge.convert(Ye),ge.convert(Je),Ae)}finally{const Oe=H!==null?J.get(H).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(M,I,Q,K,Z,Ae,be,Te=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ne=Ne[be]),Ne)if(I>=0&&I<=M.width-K&&Q>=0&&Q<=M.height-Z){x.bindFramebuffer(U.FRAMEBUFFER,Ne);const Oe=M.textures[Te],Ye=Oe.format,Je=Oe.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Te);const De=ep(Oe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const lt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,lt),U.bufferData(U.PIXEL_PACK_BUFFER,Ae.byteLength,U.STREAM_READ),U.readPixels(I,Q,K,Z,ge.convert(Ye),ge.convert(Je),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const It=H!==null?J.get(H).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,It);const xt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await CM(U,xt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,lt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ae),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(lt),U.deleteSync(xt),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,Q=0){const K=Math.pow(2,-Q),Z=Math.floor(M.image.width*K),Ae=Math.floor(M.image.height*K),be=I!==null?I.x:0,Te=I!==null?I.y:0;ne.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,Q,0,0,be,Te,Z,Ae),x.unbindTexture()},this.copyTextureToTexture=function(M,I,Q=null,K=null,Z=0,Ae=0){let be,Te,Ne,Oe,Ye,Je,De,lt,It;const xt=M.isCompressedTexture?M.mipmaps[Ae]:M.image;if(Q!==null)be=Q.max.x-Q.min.x,Te=Q.max.y-Q.min.y,Ne=Q.isBox3?Q.max.z-Q.min.z:1,Oe=Q.min.x,Ye=Q.min.y,Je=Q.isBox3?Q.min.z:0;else{const Lt=Math.pow(2,-Z);be=Math.floor(xt.width*Lt),Te=Math.floor(xt.height*Lt),M.isDataArrayTexture?Ne=xt.depth:M.isData3DTexture?Ne=Math.floor(xt.depth*Lt):Ne=1,Oe=0,Ye=0,Je=0}K!==null?(De=K.x,lt=K.y,It=K.z):(De=0,lt=0,It=0);const pt=ge.convert(I.format),Qt=ge.convert(I.type);let Re;I.isData3DTexture?(ne.setTexture3D(I,0),Re=U.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(ne.setTexture2DArray(I,0),Re=U.TEXTURE_2D_ARRAY):(ne.setTexture2D(I,0),Re=U.TEXTURE_2D),x.activeTexture(U.TEXTURE0),x.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,I.flipY),x.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),x.pixelStorei(U.UNPACK_ALIGNMENT,I.unpackAlignment);const ln=x.getParameter(U.UNPACK_ROW_LENGTH),rt=x.getParameter(U.UNPACK_IMAGE_HEIGHT),Fn=x.getParameter(U.UNPACK_SKIP_PIXELS),ci=x.getParameter(U.UNPACK_SKIP_ROWS),Xi=x.getParameter(U.UNPACK_SKIP_IMAGES);x.pixelStorei(U.UNPACK_ROW_LENGTH,xt.width),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,xt.height),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Oe),x.pixelStorei(U.UNPACK_SKIP_ROWS,Ye),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Je);const es=M.isDataArrayTexture||M.isData3DTexture,ht=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const Lt=J.get(M),Yi=J.get(I),gt=J.get(Lt.__renderTarget),ji=J.get(Yi.__renderTarget);x.bindFramebuffer(U.READ_FRAMEBUFFER,gt.__webglFramebuffer),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,ji.__webglFramebuffer);for(let ts=0;ts<Ne;ts++)es&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,J.get(M).__webglTexture,Z,Je+ts),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,J.get(I).__webglTexture,Ae,It+ts)),U.blitFramebuffer(Oe,Ye,be,Te,De,lt,be,Te,U.DEPTH_BUFFER_BIT,U.NEAREST);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(Z!==0||M.isRenderTargetTexture||J.has(M)){const Lt=J.get(M),Yi=J.get(I);x.bindFramebuffer(U.READ_FRAMEBUFFER,D),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,G);for(let gt=0;gt<Ne;gt++)es?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Lt.__webglTexture,Z,Je+gt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Lt.__webglTexture,Z),ht?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Yi.__webglTexture,Ae,It+gt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Yi.__webglTexture,Ae),Z!==0?U.blitFramebuffer(Oe,Ye,be,Te,De,lt,be,Te,U.COLOR_BUFFER_BIT,U.NEAREST):ht?U.copyTexSubImage3D(Re,Ae,De,lt,It+gt,Oe,Ye,be,Te):U.copyTexSubImage2D(Re,Ae,De,lt,Oe,Ye,be,Te);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ht?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(Re,Ae,De,lt,It,be,Te,Ne,pt,Qt,xt.data):I.isCompressedArrayTexture?U.compressedTexSubImage3D(Re,Ae,De,lt,It,be,Te,Ne,pt,xt.data):U.texSubImage3D(Re,Ae,De,lt,It,be,Te,Ne,pt,Qt,xt):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ae,De,lt,be,Te,pt,Qt,xt.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ae,De,lt,xt.width,xt.height,pt,xt.data):U.texSubImage2D(U.TEXTURE_2D,Ae,De,lt,be,Te,pt,Qt,xt);x.pixelStorei(U.UNPACK_ROW_LENGTH,ln),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,rt),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Fn),x.pixelStorei(U.UNPACK_SKIP_ROWS,ci),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Xi),Ae===0&&I.generateMipmaps&&U.generateMipmap(Re),x.unbindTexture()},this.initRenderTarget=function(M){J.get(M).__webglFramebuffer===void 0&&ne.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ne.setTextureCube(M,0):M.isData3DTexture?ne.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ne.setTexture2DArray(M,0):ne.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){te=0,j=0,H=null,x.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),n.unpackColorSpace=nt._getUnpackColorSpace()}}function bC(t,e=!1){const n=t[0].index!==null,i=new Set(Object.keys(t[0].attributes)),r=new Set(Object.keys(t[0].morphAttributes)),s={},a={},o=t[0].morphTargetsRelative,l=new jn;let c=0;for(let u=0;u<t.length;++u){const h=t[u];let d=0;if(n!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in h.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(h.attributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(o!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in h.morphAttributes){if(!r.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(h.morphAttributes[p])}if(e){let p;if(n)p=h.index.count;else if(h.attributes.position!==void 0)p=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,u),c+=p}}if(n){let u=0;const h=[];for(let d=0;d<t.length;++d){const p=t[d].index;for(let v=0;v<p.count;++v)h.push(p.getX(v)+u);u+=t[d].attributes.position.count}l.setIndex(h)}for(const u in s){const h=Eg(s[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,h)}for(const u in a){const h=a[u][0].length;if(h!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<h;++d){const p=[];for(let E=0;E<a[u].length;++E)p.push(a[u][E][d]);const v=Eg(p);if(!v)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(v)}}}return l}function Eg(t){let e,n,i,r=-1,s=0;for(let c=0;c<t.length;++c){const u=t[c];if(e===void 0&&(e=u.array.constructor),e!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(n===void 0&&(n=u.itemSize),n!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=u.normalized),i!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(r===-1&&(r=u.gpuType),r!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=u.count*n}const a=new e(s),o=new Gn(a,n,i);let l=0;for(let c=0;c<t.length;++c){const u=t[c];if(u.isInterleavedBufferAttribute){const h=l/n;for(let d=0,p=u.count;d<p;d++)for(let v=0;v<n;v++){const E=u.getComponent(d,v);o.setComponent(d+h,v,E)}}else a.set(u.array,l);l+=u.count*n}return r!==void 0&&(o.gpuType=r),o}const _n=12,er=.42,Bn=4,wg={hot:{body:16175058,roof:16639977},mid:{body:16052974,roof:16645370},ok:{body:15988472,roof:16645886},sel:{body:13286901,roof:14998783},none:{body:15922680,roof:16645630}},Ft=t=>t-_n/2;function PC(){let t=90210;const e=()=>{t=t+1831565813|0;let r=Math.imul(t^t>>>15,1|t);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296},n=[],i=10;for(let r=-i;r<_n+i;r++)for(let s=-i;s<_n+i;s++){if(r>=0&&r<_n&&s>=0&&s<_n||(r%Bn+Bn)%Bn===Bn-1||(s%Bn+Bn)%Bn===Bn-1||e()>.55)continue;const l=e()<.24?2:1;n.push({gx:r+.14,gy:s+.14,gw:l-.28,gd:.72,lv:1+Math.floor(e()*4),tone:e()*3|0})}return n}const LC=PC(),NC=49,DC=45,Tg=24,IC=.1,UC=.1,FC=.34;function Ag(t,e){const n=t*Math.PI/180,i=e*Math.PI/180,r=Math.cos(n)*Tg;return[Math.sin(i)*r,Math.sin(n)*Tg,Math.cos(i)*r]}function Hh({report:t,pins:e=[],activeId:n=null,districtTone:i={},route:r=null,you:s=null,onPick:a,full:o=!1,height:l=230,tilt:c=NC,turn:u=DC,headroom:h=0}){const d=ke.useRef(null),p=ke.useRef(null),[v,E]=ke.useState({}),g=ke.useRef({x:0,y:0}),[f,_]=ke.useState({x:0,y:0});return ke.useEffect(()=>{var We;const y=d.current;if(!y)return;const S=new GM;S.background=null;const T=window.devicePixelRatio||1,w=new RC({antialias:T<1.5,alpha:!0,powerPreference:"low-power"});w.setPixelRatio(Math.min(T,1.5)),w.shadowMap.enabled=!0,w.shadowMap.type=Ha,w.shadowMap.autoUpdate=!1,w.shadowMap.needsUpdate=!0,w.outputColorSpace=bn,y.appendChild(w.domElement);const C=new Lc(-1,1,1,-1,.1,100);C.position.set(...Ag(c,u)),C.lookAt(0,0,0),S.add(new TE(16777215,13226720,2.1));const m=new RE(16774888,2.4);m.position.set(9,16,7),m.castShadow=!0,m.shadow.mapSize.set(1024,1024);const R=m.shadow.camera;R.left=-12,R.right=12,R.top=12,R.bottom=-12,R.near=1,R.far=46,m.shadow.bias=-.0012,m.shadow.normalBias=.02,S.add(m);const L=new Pa;S.add(L),p.current={scene:S,renderer:w,camera:C,root:L,host:y},p.current.project=(q,ie,B=0)=>{const X=new z(Ft(q),B,Ft(ie)).project(C);return{left:(X.x*.5+.5)*100,top:(-X.y*.5+.5)*100}};const N=()=>{const q=y.clientWidth||320,ie=l;w.setSize(q,ie);const{cw:B,ch:X}=p.current.fit||{cw:9,ch:6},ue=p.current.shift||{x:0,y:0},_e=q/ie,fe=Math.max(B,X*_e),Ue=fe/_e,Ze=fe*2/q,Be=Ue*2/ie,he=_n*.5,Ve=_n*.34,Ie=Math.max(0,(he-fe)/Ze),qe=Math.max(0,(Ve-Ue)/Be),He=g.current;He.x=Math.max(-Ie,Math.min(Ie,He.x)),He.y=Math.max(-qe,Math.min(qe,He.y));const _t={x:ue.x-He.x*Ze,y:ue.y+He.y*Be};p.current.wpp={x:Ze,y:Be},C.left=-fe+_t.x,C.right=fe+_t.x,C.top=Ue+_t.y,C.bottom=-Ue+_t.y,C.updateProjectionMatrix(),w.render(S,C)};p.current.resize=N;const F=(We=window.matchMedia)==null?void 0:We.call(window,"(prefers-reduced-motion: reduce)");let Y=0,D=0;const G=1e3/15,te=q=>{var B;Y=requestAnimationFrame(te);const ie=(B=p.current)==null?void 0:B.dots;!ie||F!=null&&F.matches||document.hidden||q-D<G||(D=q,ie.phase+=.11,ie.place(ie.phase),w.render(S,C))};Y=requestAnimationFrame(te),p.current.stopLoop=()=>cancelAnimationFrame(Y);const j=()=>{D=0};document.addEventListener("visibilitychange",j),p.current.stopVis=()=>document.removeEventListener("visibilitychange",j);const H=new ResizeObserver(N);H.observe(y);let k=!1,W=null;const ee=q=>{var ie,B,X;(B=(ie=q.target).closest)!=null&&B.call(ie,".p3, .p3drop, .p3dot")||(k=!0,W={x:q.clientX,y:q.clientY},(X=y.setPointerCapture)==null||X.call(y,q.pointerId),y.classList.add("is-dragging"))},ve=q=>{var X,ue;if(!k||!W)return;const ie=q.clientX-W.x,B=q.clientY-W.y;W={x:q.clientX,y:q.clientY},g.current={x:g.current.x+ie,y:g.current.y+B},(ue=(X=p.current)==null?void 0:X.resize)==null||ue.call(X),_({...g.current})},de=q=>{var ie;k=!1,W=null,(ie=y.releasePointerCapture)==null||ie.call(y,q.pointerId),y.classList.remove("is-dragging")};return y.addEventListener("pointerdown",ee),y.addEventListener("pointermove",ve),y.addEventListener("pointerup",de),y.addEventListener("pointercancel",de),()=>{var q,ie,B,X,ue;(ie=(q=p.current)==null?void 0:q.stopLoop)==null||ie.call(q),(X=(B=p.current)==null?void 0:B.stopVis)==null||X.call(B),y.removeEventListener("pointerdown",ee),y.removeEventListener("pointermove",ve),y.removeEventListener("pointerup",de),y.removeEventListener("pointercancel",de),H.disconnect(),w.dispose(),(ue=w.forceContextLoss)==null||ue.call(w),w.domElement.parentNode&&w.domElement.parentNode.removeChild(w.domElement),S.traverse(_e=>{_e.geometry&&_e.geometry.dispose(),_e.material&&(Array.isArray(_e.material)?_e.material:[_e.material]).forEach(fe=>fe.dispose())}),p.current=null}},[l]),ke.useEffect(()=>{var We;const y=p.current;if(!y)return;const{root:S,renderer:T,scene:w,camera:C}=y;for(C.position.set(...Ag(c,u)),C.lookAt(0,0,0),C.updateMatrixWorld(),g.current={x:0,y:0},_({x:0,y:0});S.children.length;){const q=S.children.pop();(We=q.traverse)==null||We.call(q,ie=>{ie.geometry&&ie.geometry.dispose(),ie.material&&(Array.isArray(ie.material)?ie.material:[ie.material]).forEach(B=>B.dispose())})}const m=new dt(new qt(_n*4,.3,_n*4),new vn({color:16054266,roughness:.95}));m.position.y=-.15,m.receiveShadow=!0,S.add(m);const R=new vn({color:14478552,roughness:1});for(let q=0;q<3;q++)for(let ie=0;ie<3;ie++){const B=new dt(new qt(2.9,.03,2.9),R);B.position.set(Ft(q*Bn+1.5),.015,Ft(ie*Bn+1.5)),B.receiveShadow=!0,S.add(B)}const L=new vn({color:14278375,roughness:1}),N=new vn({color:16054010,roughness:1}),F=_n*3;for(let q=Bn-1;q<_n;q+=Bn){const ie=new dt(new qt(.62,.02,F),L);ie.position.set(Ft(q+.5),.01,0),ie.receiveShadow=!0,S.add(ie);const B=new dt(new qt(F,.02,.62),L);B.position.set(0,.01,Ft(q+.5)),B.receiveShadow=!0,S.add(B);for(let X=.4;X<_n;X+=.9){const ue=new dt(new qt(.05,.02,.34),N);ue.position.set(Ft(q+.5),.025,Ft(X)),S.add(ue);const _e=new dt(new qt(.34,.02,.05),N);_e.position.set(Ft(X),.025,Ft(q+.5)),S.add(_e)}}const Y=[15330802,15002095,15659509].map(q=>new vn({color:q,roughness:.9}));LC.forEach(q=>{const ie=q.lv*er,B=new dt(new qt(q.gw,ie,q.gd),Y[q.tone%Y.length]);B.position.set(Ft(q.gx+q.gw/2),ie/2,Ft(q.gy+q.gd/2)),B.castShadow=!0,B.receiveShadow=!0,S.add(B)});const D=new vn({color:9675707,roughness:.4,metalness:.1});t.campusItems.forEach(q=>{if(q.t!=="b")return;const ie=wg[i[q.district]]||wg.none,B=q.lv*er,X=new dt(new qt(q.gw,B,q.gd),new vn({color:ie.body,roughness:.82}));X.position.set(Ft(q.gx+q.gw/2),B/2,Ft(q.gy+q.gd/2)),X.castShadow=!0,X.receiveShadow=!0,S.add(X);const ue=new dt(new qt(q.gw*.88,.05,q.gd*.88),new vn({color:ie.roof,roughness:.9}));if(ue.position.set(X.position.x,B+.025,X.position.z),ue.castShadow=!0,S.add(ue),q.roofBox){const _e=new dt(new qt(.24,.22,.24),new vn({color:ie.roof,roughness:.9}));_e.position.set(X.position.x+q.gw*.18,B+.16,X.position.z+q.gd*.14),_e.castShadow=!0,S.add(_e)}for(let _e=0;_e<q.lv;_e++){const fe=_e*er+er*.55,Ue=new dt(new qt(q.gw*.72,er*.34,.02),D);Ue.position.set(X.position.x,fe,X.position.z+q.gd/2+.005),S.add(Ue);const Ze=new dt(new qt(.02,er*.34,q.gd*.72),D);Ze.position.set(X.position.x+q.gw/2+.005,fe,X.position.z),S.add(Ze)}});const G=new vn({color:9071178,roughness:1}),te=[6537064,5087830,7916918].map(q=>new vn({color:q,roughness:.95}));if(t.campusItems.forEach(q=>{if(q.t!=="g")return;const ie=q.gr*.5,B=Ft(q.gx),X=Ft(q.gy),ue=new dt(new Ga(ie*.13,ie*.17,ie*1.2,6),G);ue.position.set(B,ie*.6,X),ue.castShadow=!0,S.add(ue);const _e=te[q.tone%te.length];[[0,ie*1.5,0,ie*.82],[ie*.42,ie*1.24,ie*.2,ie*.56],[-ie*.36,ie*1.3,-ie*.26,ie*.5],[ie*.05,ie*1.95,-ie*.1,ie*.44]].forEach(([fe,Ue,Ze,Be])=>{const he=new dt(new dc(Be,10,8),_e);he.position.set(B+fe,Ue,X+Ze),he.castShadow=!0,S.add(he)})}),r&&r.points&&r.points.length>1){const q=r.points.map(he=>new z(Ft(he.gx),IC,Ft(he.gy))),ie=new vE;for(let he=0;he<q.length-1;he++)ie.add(new M_(q[he],q[he+1]));const B=ie.getLength(),X=Math.max(2,Math.round(B/FC)),ue=new QM(new dc(UC,12,10),new vn({color:7162623,emissive:2758016,emissiveIntensity:.3,roughness:.42}),X);ue.castShadow=!0,ue.userData.keep=!0,ue.instanceMatrix.setUsage(wM),S.add(ue);const _e=new mt,fe=new z,Ue=he=>{for(let Ve=0;Ve<X;Ve++){const Ie=(Ve+he)%X/X;ie.getPointAt(Math.min(.9999,Math.max(0,Ie)),fe),_e.makeTranslation(fe.x,fe.y,fe.z),ue.setMatrixAt(Ve,_e)}ue.instanceMatrix.needsUpdate=!0};Ue(0),y.dots={place:Ue,phase:0};const Ze=new dt(new Ga(.34,.34,.06,20),new vn({color:16777215,roughness:.5}));Ze.position.copy(q[0]),S.add(Ze);const Be=new dt(new Ga(.19,.19,.09,16),new vn({color:7162623,roughness:.4}));Be.position.copy(q[0]).setY(.11),S.add(Be)}else y.dots=null;if(r){const q=[],ie=[];C.updateMatrixWorld();const B=new z,X=(Ie,qe,He=0)=>{B.set(Ft(Ie),He,Ft(qe)).applyMatrix4(C.matrixWorldInverse),q.push(B.x),ie.push(B.y)};(r.points||r.legs.map(Ie=>Ie.at)).forEach(Ie=>X(Ie.gx,Ie.gy));const ue=r.points||r.legs.map(Ie=>Ie.at),_e=ue[ue.length-1];_e&&X(_e.gx,_e.gy,5*er+1),s&&X(s.gx,s.gy);const fe=1.8,Ue=1.4,Ze=Math.max(3,(Math.max(...q)-Math.min(...q))/2+fe),Be=Math.max(2.4,(Math.max(...ie)-Math.min(...ie))/2+Ue);y.fit={cw:Ze,ch:Be};const he=(Math.max(...q)+Math.min(...q))/2,Ve=(Math.max(...ie)+Math.min(...ie))/2;y.shift={x:he,y:Ve}}else{const q=o?.92:.42;y.fit={cw:_n*.74*q,ch:_n*.5*q},y.shift={x:0,y:0}}BC(S),y.resize(),T.shadowMap.needsUpdate=!0,T.render(w,C);const j={};e.forEach(q=>{const ie=So(q.district),B=t.campusItems.reduce((X,ue)=>ue.t==="b"&&ue.district===q.district?Math.max(X,ue.lv):X,1);j[q.id]={label:y.project(ie.gx,ie.gy,B*er+.45),dot:y.project(ie.gx,ie.gy,.1)}}),s&&(j.__you={label:y.project(s.gx,s.gy,2.6),dot:y.project(s.gx,s.gy,.15)});const H=q=>({w:q,h:7.2}),k=q=>{const ie=Math.max((q.label||"").length,(q.sub||"").length);return Math.min(46,9+ie*2.6)},W=[];s&&j.__you&&W.push({id:"__you",at:j.__you.label,w:24}),e.filter(q=>q.showLabel&&j[q.id]).slice().sort((q,ie)=>q.id===n?-1:ie.id===n?1:0).forEach(q=>W.push({id:q.id,at:j[q.id].label,w:k(q)}));const ve=[],de=new Set;W.forEach(q=>{const ie=H(q.w);let B=q.at.top;const X=q.at.left;let ue=0;const _e=()=>ve.some(fe=>Math.abs(fe.left-X)<(fe.w+ie.w)/2+1&&Math.abs(fe.top-B)<ie.h+.6);for(;_e()&&ue<14;)B-=ie.h*.85,ue++;if(_e()||B<Math.max(5,h)){de.add(q.id);return}ve.push({left:X,top:B,w:ie.w}),j[q.id]={...j[q.id],label:{left:X,top:B}}}),j.__hidden=de,E(j)},[t,i,r,o,e,s,c,u,n,h]),A.jsx("div",{className:"c3d",ref:d,style:{height:l},children:A.jsx("div",{className:"c3d__pan",style:{transform:`translate(${f.x}px, ${f.y}px)`},children:A.jsx(OC,{pins:e,activeId:n,you:s,onPick:a,proj:v})})})}function OC({pins:t,activeId:e,you:n,onPick:i,proj:r}){var s;return A.jsxs("div",{className:"c3d__pins",children:[n&&r.__you&&!((s=r.__hidden)!=null&&s.has("__you"))&&A.jsxs(A.Fragment,{children:[A.jsx("span",{className:"p3drop p3drop--you",style:wa(r.__you.dot||r.__you.label),children:A.jsx(Cg,{})}),A.jsx("span",{className:"p3 p3--you",style:wa(r.__you.label),children:"ตำแหน่งของคุณ"})]}),t.map(a=>{var l;const o=r[a.id];return o?!a.showLabel||(l=r.__hidden)!=null&&l.has(a.id)?A.jsx("button",{type:"button",className:"p3dot p3dot--"+a.tone,style:wa(o.dot),onClick:i?()=>i(a.id):void 0,"aria-label":a.label},a.id):A.jsxs(ke.Fragment,{children:[A.jsx("button",{type:"button",className:"p3drop p3drop--"+a.tone+(a.id===e?" is-on":""),style:wa(o.dot),onClick:i?()=>i(a.id):void 0,"aria-label":a.label,children:A.jsx(Cg,{})}),A.jsxs("button",{type:"button",className:"p3 p3--card p3--"+a.tone+(a.id===e?" is-on":""),style:wa(o.label),onClick:i?()=>i(a.id):void 0,children:[A.jsx("b",{children:a.label}),A.jsx("small",{className:"p3--"+a.tone,children:a.sub})]})]},a.id):null})]})}const wa=t=>({left:Math.min(Math.max(t.left,13),87)+"%",top:Math.min(Math.max(t.top,9),92)+"%"});function BC(t){const e=new Map,n=[];t.updateMatrixWorld(!0),t.traverse(i=>{var a,o;if(!i.isMesh||i.isInstancedMesh||Array.isArray(i.material)||!((o=(a=i.geometry)==null?void 0:a.attributes)!=null&&o.position)||i.userData.keep)return;const r=i.material.uuid+"|"+(i.castShadow?1:0)+(i.receiveShadow?1:0);e.has(r)||e.set(r,{mat:i.material,cast:i.castShadow,recv:i.receiveShadow,geos:[]});const s=i.geometry.clone();s.applyMatrix4(i.matrixWorld);for(const l of Object.keys(s.attributes))l!=="position"&&l!=="normal"&&l!=="uv"&&s.deleteAttribute(l);if(!s.attributes.uv){const l=s.attributes.position.count;s.setAttribute("uv",new Gn(new Float32Array(l*2),2))}e.get(r).geos.push(s),n.push(i)}),n.forEach(i=>{var r;return(r=i.parent)==null?void 0:r.remove(i)}),e.forEach(({mat:i,cast:r,recv:s,geos:a})=>{if(!a.length)return;let o;try{o=a.length===1?a[0]:bC(a,!1)}catch{o=null}if(!o){a.forEach(c=>{const u=new dt(c,i);u.castShadow=r,u.receiveShadow=s,t.add(u)});return}a.length>1&&a.forEach(c=>c.dispose());const l=new dt(o,i);l.castShadow=r,l.receiveShadow=s,t.add(l)})}function Cg(){return A.jsxs("svg",{viewBox:"0 0 24 34",width:"18",height:"26","aria-hidden":"true",children:[A.jsx("path",{d:"M12 33C12 33 22 21.5 22 13A10 10 0 0 0 2 13C2 21.5 12 33 12 33Z",className:"p3drop__body"}),A.jsx("circle",{cx:"12",cy:"13",r:"4.2",className:"p3drop__eye"})]})}const kC={cap:"M3 9l9-4 9 4-9 4-9-4zm3 5v3c0 1.1 2.7 2 6 2s6-.9 6-2v-3",book:"M5 4h9a3 3 0 013 3v13H8a3 3 0 01-3-3V4zm0 0v13M17 7h2",users:"M9 11a3 3 0 100-6 3 3 0 000 6zm7 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 19c0-2.8 2.7-4.5 6-4.5s6 1.7 6 4.5M17 14.5c2.4.3 4 1.9 4 4.5",chat:"M4 5h16v11H9l-5 4V5z",star:"M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8L12 4z",compass:"M12 21a9 9 0 100-18 9 9 0 000 18zm3.5-12.5l-2 5-5 2 2-5 5-2z",seat:"M6 10V6a2 2 0 012-2h8a2 2 0 012 2v4M4 10h16v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5zm3 8v2m10-2v2",plug:"M9 3v6m6-6v6M6 9h12v3a6 6 0 01-6 6 6 6 0 01-6-6V9zm6 12v-3",wifi:"M3 9a15 15 0 0118 0M6.5 12.5a10 10 0 0111 0M10 16a5 5 0 014 0M12 19.5h.01",sun:"M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",silent:"M4 9v6h4l5 4V5L8 9H4zm14-1a6 6 0 010 8M20 3L4 21",board:"M4 4h16v11H4V4zm5 15l3-4 3 4M12 4V2",leaf:"M20 4C10 4 4 9 4 16c0 2 .6 3.4.6 3.4S9 12 20 9c0 0-3 8-11 9",screen:"M3 5h18v11H3V5zm6 15h6m-3-4v4",desk:"M3 10h18M5 10V6h14v4M6 10v9m12-9v9M9 14h6",clock:"M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3.5 2",pin:"M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",walk:"M13 5a1.6 1.6 0 100-3.2A1.6 1.6 0 0013 5zm-1.5 3l-3 3 1 5m2-8l3 2 2.5-1M11.5 8L10 21m3.5-8l2.5 8",back:"M15 5l-7 7 7 7",next:"M9 5l7 7-7 7",heart:"M12 20s-7-4.4-7-9.2A4.1 4.1 0 0112 8a4.1 4.1 0 017 2.8C19 15.6 12 20 12 20z",search:"M11 18a7 7 0 100-14 7 7 0 000 14zm5.5-1.5L21 21",temp:"M12 14V4a2 2 0 10-4 0v10a4 4 0 104 0z",dust:"M5 8h14M4 12h16M6 16h12M8 20h8",crowd:"M8 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm8 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 19c0-2.5 2.2-4 5-4s5 1.5 5 4m3-4c2.6.2 4 1.7 4 4",check:"M4 12.5l5 5L20 6.5",alert:"M12 8v5m0 3h.01M12 3l9 16H3l9-16z",grid:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z",wc:"M7 4a1.6 1.6 0 100 3.2A1.6 1.6 0 007 4zm10 0a1.6 1.6 0 100 3.2A1.6 1.6 0 0017 4zM4.6 20l.9-6H3.8l1.3-4.4A1.6 1.6 0 016.6 8.5h.8a1.6 1.6 0 011.5 1.1L10.2 14H8.5l.9 6H4.6zM13.8 20V9.8A1.3 1.3 0 0115 8.5h4a1.3 1.3 0 011.2 1.3V20h-6.4z",layers:"M12 3l9 5-9 5-9-5 9-5zm9 9l-9 5-9-5m18 4l-9 5-9-5"};function Qe({name:t,size:e=18,className:n=""}){const i=kC[t];return i?A.jsx("svg",{className:"ic "+n,width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:A.jsx("path",{d:i})}):null}Object.fromEntries(js.map(t=>[t.id,t]));function zC(){const t=ke.useMemo(()=>Py(window.location.search),[]),e=ke.useMemo(()=>Ny(gm(t.input)),[t]),n=ke.useMemo(()=>new Date().getHours(),[]),i=Math.min(e.max,Math.max(e.min,n)),r=n<e.min||n>e.max,[s,a]=ke.useState(i),o=ke.useMemo(()=>gm({...t.input,nowHour:s}),[t,s]),{view:l,go:c,back:u,canBack:h,loading:d}=ZC("intent"),p=ke.useRef(null),[v,E]=ke.useState(null),g=ke.useCallback(he=>{p.current=he,E(he)},[]);ke.useEffect(()=>{p.current&&(p.current.scrollTop=0)},[l]);const[f,_]=ke.useState(null),[y,S]=ke.useState(null),[T,w]=ke.useState("overview"),[C,m]=ke.useState(!1),[R,L]=ke.useState(null),N=I_(),F=F_(116,Math.round(N*.56)),D=U_(v)||Math.max(320,N-210),G=D,te=D,j=ke.useMemo(()=>new URLSearchParams(window.location.search).get("tune")==="1",[]),[H,k]=ke.useState(49),[W,ee]=ke.useState(45),ve=ke.useMemo(()=>f?Fy(o,f,s):[],[o,f,s]),de=ve.find(he=>he.space.id===y)||ve[0]||null,We=ve.filter(he=>he.space.id!==(de==null?void 0:de.space.id)).slice(0,3),q=ke.useMemo(()=>Gy(o,s),[o,s]),ie=ke.useMemo(()=>de?zy(de.space):null,[de]),B=ke.useMemo(()=>Hy(o),[o]),X=ke.useMemo(()=>Vy(o,s),[o,s]),ue=ke.useMemo(()=>{const he={},Ve={};return js.forEach(Ie=>{const qe=Pt(Ie).district,He=qs(o,Ie,s);(Ve[qe]===void 0||He>Ve[qe])&&(Ve[qe]=He)}),Object.entries(Ve).forEach(([Ie,qe])=>{he[Ie]=vr(qe).tone}),de&&(he[Pt(de.space).district]="sel"),he},[o,s,de]),_e=ke.useMemo(()=>{const he=f?ve:js.map(He=>({space:He,load:qs(o,He,s)})),Ve=new Map;he.forEach((He,_t)=>{const ct=Pt(He.space);Ve.has(ct.id)||Ve.set(ct.id,{b:ct,load:He.load,order:_t})});const Ie=[...Ve.values()].sort((He,_t)=>He.order-_t.order),qe=new Set(Ie.slice(0,3).map(He=>He.b.id));return de&&qe.add(Pt(de.space).id),Ie.map(He=>({id:He.b.id,district:He.b.district,label:He.b.shortTh,sub:vr(He.load??0).th,tone:vr(He.load??0).tone,showLabel:qe.has(He.b.id)}))},[f,ve,o,s,de]),fe={intent:0,context:1,building:2,recommend:2,detail:3,route:4,extra:5},Ue=6,Ze={intent:f?()=>c("context"):null,context:de?()=>c("recommend"):null,building:()=>c("detail"),recommend:()=>c("detail"),detail:()=>c("route"),route:()=>c("extra"),extra:null},Be=f&&A.jsxs("span",{className:"pill",children:[A.jsx(Qe,{name:pa[f].icon,size:13}),pa[f].en]});return A.jsxs("div",{className:"app",children:[A.jsx(WC,{survey:t,onBack:()=>window.location.href=Ly(window.location.search)}),A.jsxs("main",{className:"screen"+(d?" is-loading":""),ref:g,children:[l==="intent"&&A.jsxs(A.Fragment,{children:[A.jsxs("div",{className:"hello",children:[A.jsx("p",{children:"สวัสดี"}),A.jsx("h1",{children:"วันนี้คุณมาที่คณะเพื่ออะไร?"})]}),A.jsx("div",{className:"intents",children:Yv.map(he=>A.jsxs("button",{type:"button",className:"intent"+(f===he.id?" is-on":""),onClick:()=>{_(he.id),S(null),c("context")},children:[A.jsx("span",{className:"intent__ic",children:A.jsx(Qe,{name:he.icon,size:20})}),A.jsx("b",{children:he.en}),A.jsx("small",{children:he.th})]},he.id))}),A.jsxs("div",{className:"bot",children:[A.jsx("span",{className:"bot__ic",children:A.jsx(Qe,{name:"star",size:18})}),A.jsxs("p",{children:[A.jsx("b",{children:"MOMAY ช่วยคุณได้"}),"บอกสิ่งที่คุณต้องการ แล้ว MOMAY จะหาตัวเลือกที่เหมาะที่สุดให้คุณแบบเรียลไทม์"]})]})]}),l==="context"&&f&&A.jsxs("div",{className:"mapscreen",children:[A.jsxs("div",{className:"vhead vhead--over",children:[A.jsxs("button",{type:"button",className:"pill pill--tap",onClick:u,children:[A.jsx(Qe,{name:pa[f].icon,size:13}),pa[f].en,A.jsx(Qe,{name:"back",size:11})]}),A.jsx("h1",{children:pa[f].leadTh})]}),A.jsx("div",{className:"mapwrap mapwrap--fill",children:A.jsx(Hh,{report:o,pins:_e,activeId:de?Pt(de.space).id:null,districtTone:ue,full:C,you:ea,onPick:he=>{L(he),c("building")},height:G,tilt:H,turn:W,headroom:15})}),A.jsxs("div",{className:"sheet"+(F.open?" is-open":""),style:{height:F.h},children:[A.jsxs("div",{className:"sheet__head",ref:F.ref,role:"button","aria-expanded":F.open,children:[A.jsx("i",{className:"sheet__grab"}),A.jsxs("span",{className:"route__sum",children:[A.jsx(Qe,{name:"clock",size:16}),A.jsxs("span",{children:[A.jsxs("b",{children:[String(s).padStart(2,"0"),":00 น. · คน",q.crowd.th]}),A.jsx("small",{children:F.open?"แตะอาคารบนผังเพื่อดูโซนข้างใน":"แตะเพื่อดูสภาพและเปลี่ยนเวลา"})]})]}),A.jsx(Qe,{name:"back",size:15,className:"sheet__chev"})]}),A.jsxs("div",{className:"sheet__body",children:[A.jsx(XC,{hour:s,realHour:i,range:e,outside:r,clock:n,onChange:a,report:o}),A.jsx("h4",{className:"subhead",children:"สภาพตอนนี้"}),A.jsx(YC,{cond:q,report:o}),A.jsxs("button",{type:"button",className:"seeall",onClick:()=>m(he=>!he),children:[C?"ย่อผังกลับ":"ดูภาพรวมพื้นที่ทั้งหมด",A.jsx(Qe,{name:"next",size:13})]})]})]})]}),l==="building"&&R&&A.jsx(HC,{buildingId:R,report:o,hour:s,intent:f,onOpen:he=>{S(he),c("detail")}}),l==="recommend"&&de&&A.jsxs(A.Fragment,{children:[A.jsxs("div",{className:"vhead",children:[Be,A.jsx("h1",{children:"MOMAY แนะนำพื้นที่ที่เหมาะกับคุณตอนนี้"}),A.jsx("p",{children:"จากความหนาแน่น · สภาพแวดล้อม · ความใกล้ และเวลาที่คุณมี"})]}),A.jsx(jC,{pick:de,intent:f,onOpen:()=>c("detail"),onRoute:()=>c("route")}),A.jsx("h4",{className:"subhead",children:"ตัวเลือกอื่น ๆ ที่เหมาะกับคุณ"}),A.jsx("div",{className:"alts",children:We.map(he=>A.jsxs("button",{type:"button",className:"alt",onClick:()=>{S(he.space.id),c("detail")},children:[A.jsx("span",{className:"alt__art art--"+he.space.tone,children:Yn(he.space)&&A.jsx("img",{src:Yn(he.space),alt:"",loading:"lazy"})}),A.jsxs("span",{className:"alt__txt",children:[A.jsx("b",{children:he.space.th}),A.jsx("small",{children:Pt(he.space).th}),A.jsxs("span",{className:"chip chip--"+he.crowd.tone,children:[A.jsx(Qe,{name:"crowd",size:12}),"คน",he.crowd.th," · ",he.space.noteTh]})]}),A.jsxs("span",{className:"alt__walk",children:[A.jsx(Qe,{name:"walk",size:14}),he.walk.minutes," นาที"]})]},he.space.id))})]}),l==="detail"&&de&&A.jsxs(A.Fragment,{children:[A.jsx(qC,{pick:de,report:o,hour:s,tab:T,onTab:w,onBack:u}),A.jsxs("button",{type:"button",className:"btn",onClick:()=>c("route"),children:["ดูเส้นทางไปที่นี่",A.jsx(Qe,{name:"next",size:16})]})]}),l==="route"&&de&&A.jsx(A.Fragment,{children:A.jsx($C,{report:o,pick:de,route:ie,districtTone:ue,mapH:te,tilt:H,turn:W,onBack:u})}),l==="extra"&&de&&A.jsxs(A.Fragment,{children:[A.jsx("div",{className:"vhead",children:A.jsx("h1",{children:"สิ่งที่คุณอาจสนใจเพิ่มเติม"})}),A.jsx(KC,{events:B,tips:X,report:o,hour:s,onPick:he=>{S(he),c("detail")},currentId:de.space.id})]})]},l),j&&A.jsxs("div",{className:"tune",children:[A.jsxs("label",{children:["ก้ม ",A.jsxs("b",{children:[H,"°"]}),A.jsx("input",{type:"range",min:"20",max:"88",value:H,onChange:he=>k(+he.target.value)})]}),A.jsxs("label",{children:["หัน ",A.jsxs("b",{children:[W,"°"]}),A.jsx("input",{type:"range",min:"0",max:"90",value:W,onChange:he=>ee(+he.target.value)})]}),A.jsx("span",{children:"เจอมุมที่ชอบแล้วบอกตัวเลขมา"})]}),A.jsx(GC,{step:fe[l]??0,total:Ue,onBack:h?u:null,onNext:Ze[l]})]})}function HC({buildingId:t,report:e,hour:n,intent:i,onOpen:r}){var c;const s=jv[t],a=js.filter(u=>u.building===t).map(u=>{const h=qs(e,u,n);return{z:u,load:h,free:Ch(u,h),crowd:vr(h),walk:Xv(ea,So(s.district)),fit:i?u.fits[i]??0:0}}).sort((u,h)=>h.fit-u.fit||u.load-h.load),o=a.reduce((u,h)=>Math.max(u,h.load),0),l=vr(o);return A.jsxs(A.Fragment,{children:[A.jsxs("div",{className:"vhead",children:[A.jsx("h1",{children:s.th}),A.jsxs("p",{children:["ในอาคารนี้มี ",a.length," โซน · ตอนนี้โดยรวม",A.jsxs("b",{className:"txt--"+l.tone,children:[" ",l.th]})," · เดิน ",(c=a[0])==null?void 0:c.walk.minutes," นาที"]})]}),A.jsx("div",{className:"alts",children:a.map(u=>A.jsxs("button",{type:"button",className:"alt",onClick:()=>r(u.z.id),children:[A.jsx("span",{className:"alt__art art--"+u.z.tone,children:Yn(u.z)&&A.jsx("img",{src:Yn(u.z),alt:"",loading:"lazy"})}),A.jsxs("span",{className:"alt__txt",children:[A.jsx("b",{children:u.z.th}),A.jsx("small",{children:Uy[u.z.kind]}),A.jsxs("span",{className:"chip chip--"+u.crowd.tone,children:[A.jsx(Qe,{name:"seat",size:12}),"คน",u.crowd.th," · ว่าง ",u.free," ที่"]})]}),A.jsx("span",{className:"alt__walk",children:A.jsx(Qe,{name:"next",size:14})})]},u.z.id))})]})}function VC({report:t,pick:e,route:n,districtTone:i,tilt:r,turn:s,onClose:a}){const[o,l]=ke.useState(()=>typeof window<"u"?window.innerHeight-96:600);return ke.useEffect(()=>{const c=h=>h.key==="Escape"&&a(),u=()=>l(window.innerHeight-96);return window.addEventListener("keydown",c),window.addEventListener("resize",u),()=>{window.removeEventListener("keydown",c),window.removeEventListener("resize",u)}},[a]),A.jsxs("div",{className:"mapfull",role:"dialog","aria-label":"ผังเส้นทางไป "+e.space.th,children:[A.jsxs("div",{className:"mapfull__bar",children:[A.jsxs("b",{children:["เส้นทางไป ",e.space.th]}),A.jsx("button",{type:"button",className:"route__ic",onClick:a,"aria-label":"ปิด",children:A.jsx(Qe,{name:"back",size:15})})]}),A.jsx(Hh,{report:t,pins:[{id:Pt(e.space).id,district:Pt(e.space).district,label:e.space.th,tone:"go",showLabel:!0}],activeId:Pt(e.space).id,route:n,you:ea,districtTone:{...i,[Pt(e.space).district]:"sel"},height:o,tilt:r,turn:s}),A.jsx("p",{className:"mapfull__hint",children:"ลากเพื่อเลื่อนผัง · กด Esc หรือปุ่มมุมบนเพื่อปิด"})]})}function GC({step:t,total:e,onBack:n,onNext:i}){return A.jsxs("div",{className:"nav",children:[n?A.jsx("button",{type:"button",className:"nav__back",onClick:n,"aria-label":"ย้อนกลับ",children:A.jsx(Qe,{name:"back",size:16})}):A.jsx("span",{}),A.jsx("span",{className:"nav__dots",children:Array.from({length:e},(r,s)=>s).map(r=>A.jsx("i",{className:r===t?"is-on":void 0},r))}),A.jsx("span",{className:"nav__gap"})]})}function WC({survey:t,onBack:e}){return A.jsxs("header",{className:"hd",children:[A.jsxs("div",{className:"hd__bar",children:[A.jsxs("div",{className:"hd__brand",children:[A.jsx("img",{className:"hd__logo",src:"./MOMAY_logo.png",alt:"MOMAY ENLIGHTENMENT"}),A.jsx("b",{children:"STUDENT"})]}),A.jsx("button",{type:"button",className:"hd__ic","aria-label":"ค้นหาพื้นที่",children:A.jsx(Qe,{name:"search",size:18})}),A.jsx("button",{type:"button",className:"hd__av",onClick:e,title:"ดูมุมมองของคณะ",children:A.jsx(Qe,{name:"users",size:16})})]}),!t.cameFromOrganize&&A.jsx("p",{className:"hd__note",children:"กำลังใช้ข้อมูลตัวอย่าง — เปิดจากหน้า MOMAY Surprise (คณะ) เพื่อดูผลจากตัวเลขที่คุณกรอกเอง"})]})}function XC({hour:t,realHour:e,range:n,outside:i,clock:r,onChange:s,report:a}){const[o,l]=ke.useState(i),u=new Date().toLocaleDateString("th-TH",{weekday:"long",day:"numeric",month:"short"}),h=d=>String(d).padStart(2,"0")+":00";return A.jsxs("div",{className:"tbar",children:[A.jsxs("div",{className:"tbar__now",children:[A.jsx(Qe,{name:"clock",size:16}),A.jsxs("span",{children:["วันนี้ ",u," · ",A.jsxs("b",{children:[h(t)," น."]})]}),A.jsx("button",{type:"button",className:"tbar__reset",onClick:()=>l(d=>!d),children:o?"เสร็จแล้ว":"เปลี่ยนเวลา"})]}),o&&A.jsxs(A.Fragment,{children:[A.jsx("input",{className:"tbar__range",type:"range",min:n.min,max:n.max,step:1,value:t,onChange:d=>s(Number(d.target.value)),"aria-label":"เลือกเวลาที่จะดู"}),A.jsxs("div",{className:"tbar__scale",children:[A.jsx("span",{children:h(n.min)}),A.jsxs("span",{children:["ช่วงพีคของคณะ ",a.peakWindow]}),A.jsx("span",{children:h(n.max)})]}),t!==e&&A.jsx("button",{type:"button",className:"tbar__back",onClick:()=>s(e),children:"กลับมาที่เวลาตอนนี้"})]}),i&&A.jsxs("p",{className:"tbar__outside",children:["ตอนนี้ ",h(r)," น. อยู่นอกเวลาทำการของคณะ (",h(n.min),"–",h(n.max)," น.) — กำลังแสดงภาพของ ",h(e)," น. เลื่อนเพื่อดูเวลาอื่นได้"]})]})}function YC({cond:t,report:e}){const n=t.pm25<=25?"ดี":t.pm25<=50?"ปานกลาง":"แย่";return A.jsxs("div",{className:"cond",children:[A.jsxs("div",{className:"cond__row",children:[A.jsx($u,{icon:"crowd",label:"คนในคณะ",value:t.crowd.th,tone:t.crowd.tone}),A.jsx($u,{icon:"temp",label:"อุณหภูมิ",value:`${t.tempC}°C`,tone:"warm"}),A.jsx($u,{icon:"leaf",label:"PM2.5",value:`${t.pm25} ${n}`,tone:"ok"})]}),A.jsxs("p",{className:"cond__note",children:["ความหนาแน่นมาจากข้อมูลชุดเดียวกับหน้าคณะ (ความต้องการพื้นที่ ",e.spaceLoadPct,"% ของที่มี) · อุณหภูมิและ PM2.5 เป็นข้อมูลจำลอง ยังไม่ได้ต่อเซ็นเซอร์จริง"]})]})}function $u({icon:t,label:e,value:n,tone:i}){return A.jsxs("div",{className:"stat",children:[A.jsx("span",{className:"stat__ic stat__ic--"+(i||"none"),children:A.jsx(Qe,{name:t,size:15})}),A.jsxs("span",{className:"stat__txt",children:[A.jsx("small",{children:e}),A.jsx("b",{children:n})]})]})}function jC({pick:t,intent:e,onOpen:n,onRoute:i}){const r=Oy(t,e);return A.jsxs("article",{className:"best",children:[A.jsxs("div",{className:"best__art art--"+t.space.tone,children:[Yn(t.space)&&A.jsx("img",{src:Yn(t.space),alt:"",loading:"lazy",decoding:"async"}),A.jsx("span",{className:"best__tag",children:"แนะนำที่สุด"}),A.jsx("button",{type:"button",className:"best__fav","aria-label":"บันทึกไว้",children:A.jsx(Qe,{name:"heart",size:15})})]}),A.jsxs("div",{className:"best__body",children:[A.jsxs("div",{className:"best__top",children:[A.jsxs("div",{children:[A.jsx("h3",{children:t.space.th}),A.jsx("p",{className:"best__where",children:Pt(t.space).th})]}),A.jsxs("span",{className:"best__walk",children:[A.jsxs("b",{children:[t.walk.minutes," นาที"]}),A.jsxs("small",{children:["(",t.walk.meters," เมตร)"]})]})]}),A.jsxs("div",{className:"best__meta",children:[A.jsxs("span",{className:"chip chip--"+t.crowd.tone,children:[A.jsx(Qe,{name:"crowd",size:12}),t.crowd.th," ",Math.round(t.load*100),"%"]}),A.jsxs("span",{className:"chip",children:[A.jsx(Qe,{name:"seat",size:12}),"ว่าง ",t.free," ที่"]})]}),A.jsx("ul",{className:"reasons",children:r.map((s,a)=>A.jsxs("li",{className:s.ok?"is-ok":"is-warn",children:[A.jsx(Qe,{name:s.ok?"check":"alert",size:14}),s.th]},a))}),A.jsx("button",{type:"button",className:"btn btn--ghost",onClick:n,children:"ดูรายละเอียดก่อน"}),A.jsxs("button",{type:"button",className:"btn",onClick:i,children:["ดูเส้นทางไปที่นี่",A.jsx(Qe,{name:"next",size:16})]})]})]})}function qC({pick:t,report:e,hour:n,tab:i,onTab:r,onBack:s}){const{space:a}=t,o=e.hours.map(c=>({at:c.at,label:c.label,value:qs(e,a,c.at)})),l=Math.max(...o.map(c=>c.value),.01);return A.jsxs("div",{className:"detail",children:[A.jsxs("div",{className:"detail__art art--"+a.tone,children:[Yn(a)&&A.jsx("img",{src:Yn(a),alt:"",decoding:"async"}),A.jsx("button",{type:"button",className:"art__ic art__ic--l",onClick:s,"aria-label":"ย้อนกลับ",children:A.jsx(Qe,{name:"back",size:15})}),A.jsx("button",{type:"button",className:"art__ic art__ic--r","aria-label":"บันทึกไว้",children:A.jsx(Qe,{name:"heart",size:15})}),A.jsx("span",{className:"detail__count",children:a.outdoor?"พื้นที่กลางแจ้ง":"พื้นที่ในอาคาร"})]}),A.jsx("h3",{children:a.th}),A.jsx("p",{className:"best__where",children:Pt(a).th}),A.jsx("div",{className:"tabs",children:[["overview","ภาพรวม"],["load","ความหนาแน่น"],["amen","สิ่งอำนวยความสะดวก"]].map(([c,u])=>A.jsx("button",{type:"button",className:"tab"+(i===c?" is-on":""),onClick:()=>r(c),children:u},c))}),A.jsxs("div",{className:"panes",children:[A.jsxs("div",{className:"pane"+(i==="overview"?" is-on":""),children:[A.jsx("p",{className:"pane__lead",children:a.noteTh}),A.jsxs("div",{className:"kv",children:[A.jsxs("div",{children:[A.jsx("small",{children:"ที่นั่งทั้งหมด"}),A.jsxs("b",{children:[a.seats," ที่"]})]}),A.jsxs("div",{children:[A.jsx("small",{children:"ว่างตอนนี้"}),A.jsxs("b",{children:[t.free," ที่"]})]}),A.jsxs("div",{children:[A.jsx("small",{children:"ระดับเสียง"}),A.jsx("b",{children:a.quiet>=.8?"เงียบมาก":a.quiet>=.5?"เงียบปานกลาง":"คุยกันได้"})]}),A.jsxs("div",{children:[A.jsx("small",{children:"ระยะเดิน"}),A.jsxs("b",{children:[t.walk.minutes," นาที · ",t.walk.meters," ม."]})]})]}),A.jsx("h4",{className:"subhead",children:"เหมาะสำหรับ"}),A.jsx("div",{className:"tagrow",children:a.suitTh.map(c=>A.jsx("span",{className:"tag",children:c},c))})]}),A.jsxs("div",{className:"pane"+(i==="load"?" is-on":""),children:[A.jsx("p",{className:"pane__lead",children:"ความหนาแน่นตอนนี้"}),A.jsxs("div",{className:"nowbig nowbig--"+t.crowd.tone,children:[A.jsx("b",{children:t.crowd.th}),A.jsxs("span",{children:[Math.round(t.load*100),"%"]})]}),A.jsx("div",{className:"chart",children:o.map(c=>A.jsx("div",{className:"bar"+(c.at===n?" is-now":""),style:{"--v":Math.max(.04,c.value/l)},title:`${c.label} · ${Math.round(c.value*100)}%`,children:A.jsx("i",{})},c.at))}),A.jsx("div",{className:"chart__axis",children:o.filter((c,u)=>u%3===0).map(c=>A.jsx("span",{children:c.at},c.at))}),A.jsxs("div",{className:"legend",children:[A.jsx("span",{className:"dot dot--ok"}),"ไม่หนาแน่น",A.jsx("span",{className:"dot dot--mid"}),"ปานกลาง",A.jsx("span",{className:"dot dot--hot"}),"หนาแน่น"]})]}),A.jsx("div",{className:"pane"+(i==="amen"?" is-on":""),children:A.jsx("div",{className:"amen",children:a.amenities.map(c=>A.jsxs("div",{className:"amen__it",children:[A.jsx(Qe,{name:_m[c].icon,size:17}),A.jsx("span",{children:_m[c].th})]},c))})})]})]})}function $C({report:t,pick:e,route:n,districtTone:i,mapH:r,tilt:s,turn:a,onBack:o}){const[l,c]=ke.useState(!1),u=I_(),h=F_(132,Math.round(u*.62)),[d,p]=ke.useState(null),v=U_(d),E=h.open;return A.jsxs("div",{className:"route",children:[A.jsxs("div",{className:"route__hd",ref:p,children:[A.jsx("button",{type:"button",className:"route__ic",onClick:o,"aria-label":"ย้อนกลับ",children:A.jsx(Qe,{name:"back",size:15})}),A.jsxs("b",{children:["เส้นทางไป ",e.space.th]}),A.jsx("button",{type:"button",className:"route__ic",onClick:()=>c(!0),"aria-label":"ขยายผังเต็มจอ",children:A.jsx(Qe,{name:"grid",size:15})})]}),A.jsxs("div",{className:"mapwrap mapwrap--route",role:"button",tabIndex:0,onClick:()=>c(!0),onKeyDown:g=>(g.key==="Enter"||g.key===" ")&&c(!0),children:[A.jsx(Hh,{report:t,pins:[{id:Pt(e.space).id,district:Pt(e.space).district,label:e.space.th,tone:"go",showLabel:!0}],activeId:Pt(e.space).id,route:n,you:ea,districtTone:{...i,[Pt(e.space).district]:"sel"},height:Math.max(300,r-v),tilt:s,turn:a}),A.jsxs("span",{className:"mapwrap__zoom",children:[A.jsx(Qe,{name:"search",size:13}),"แตะเพื่อขยาย"]})]}),l&&A.jsx(VC,{report:t,pick:e,route:n,districtTone:i,tilt:s,turn:a,onClose:()=>c(!1)}),A.jsxs("div",{className:"sheet"+(E?" is-open":""),style:{height:h.h},children:[A.jsxs("div",{className:"sheet__head",ref:h.ref,role:"button","aria-expanded":E,children:[A.jsx("i",{className:"sheet__grab"}),A.jsxs("span",{className:"route__sum",children:[A.jsx(Qe,{name:"walk",size:16}),A.jsxs("span",{children:[A.jsxs("b",{children:[n.total.minutes," นาที (",n.total.meters," เมตร)"]}),A.jsx("small",{children:E?"เส้นทางเดินในคณะ":`${n.legs.length} ขั้นตอน · แตะเพื่อดู`})]})]}),A.jsx(Qe,{name:"back",size:15,className:"sheet__chev"})]}),A.jsx("div",{className:"sheet__body",children:A.jsx("ol",{className:"legs",children:n.legs.map((g,f)=>A.jsxs("li",{children:[A.jsx("span",{className:"legs__th art--"+e.space.tone,children:Yn(e.space)&&A.jsx("img",{src:Yn(e.space),alt:"",loading:"lazy"})}),A.jsx("span",{className:"legs__t",children:g.th}),A.jsxs("span",{className:"legs__m",children:[g.min," นาที"]})]},f))})}),A.jsxs("button",{type:"button",className:"btn",children:["เริ่มนำทาง",A.jsx(Qe,{name:"next",size:16})]})]})]})}function KC({events:t,tips:e,report:n,hour:i,onPick:r,currentId:s}){const a=js.filter(o=>o.id!==s).map(o=>{const l=qs(n,o,i);return{space:o,load:l,free:Ch(o,l),crowd:vr(l)}}).sort((o,l)=>o.load-l.load).slice(0,3);return A.jsxs("div",{className:"extra",children:[A.jsxs("h4",{className:"subhead",children:["กิจกรรมในคณะวันนี้",A.jsx("a",{href:"#events",children:"ดูทั้งหมด"})]}),A.jsx("ul",{className:"events",children:t.map((o,l)=>A.jsxs("li",{children:[A.jsx("span",{className:"events__ic",children:A.jsx(Qe,{name:"pin",size:14})}),A.jsxs("div",{children:[A.jsx("b",{children:o.th}),A.jsxs("small",{children:[o.whenTh," · ",o.whereTh]})]})]},l))}),A.jsxs("h4",{className:"subhead",children:["พื้นที่ใกล้เคียงที่คุณอาจสนใจ",A.jsx("a",{href:"#nearby",children:"ดูทั้งหมด"})]}),A.jsx("div",{className:"alts",children:a.map(o=>A.jsxs("button",{type:"button",className:"alt",onClick:()=>r(o.space.id),children:[A.jsx("span",{className:"alt__art art--"+o.space.tone,children:Yn(o.space)&&A.jsx("img",{src:Yn(o.space),alt:"",loading:"lazy"})}),A.jsxs("span",{className:"alt__txt",children:[A.jsx("b",{children:o.space.th}),A.jsx("small",{children:Pt(o.space).th}),A.jsxs("span",{className:"chip chip--"+o.crowd.tone,children:[A.jsx(Qe,{name:"seat",size:12}),"ว่าง ",o.free," ที่"]})]}),A.jsx("span",{className:"alt__walk",children:A.jsx(Qe,{name:"next",size:14})})]},o.space.id))}),A.jsx("h4",{className:"subhead",children:"เคล็ดลับจาก MOMAY"}),A.jsx("ul",{className:"tips",children:e.map((o,l)=>A.jsxs("li",{className:"tip tip--"+o.tone,children:[A.jsx(Qe,{name:o.icon,size:16}),A.jsx("span",{children:o.th})]},l))})]})}function ZC(t){const e=()=>window.location.hash.replace(/^#\/?/,"")||t,[n,i]=ke.useState(e),[r,s]=ke.useState(!1);return ke.useEffect(()=>{const a=()=>{const o=e();i(l=>l===o?l:(s(!0),setTimeout(()=>s(!1),170),o))};return window.addEventListener("hashchange",a),window.location.hash||window.location.replace("#/"+t),()=>window.removeEventListener("hashchange",a)},[t]),{view:n,loading:r,canBack:n!==t,go:a=>{window.location.hash="#/"+a},back:()=>window.history.back()}}function I_(){const t=()=>{var i;return typeof window>"u"?800:Math.round(((i=window.visualViewport)==null?void 0:i.height)||window.innerHeight)},[e,n]=ke.useState(t);return ke.useEffect(()=>{var s;const i=()=>n(t());window.addEventListener("resize",i),(s=window.visualViewport)==null||s.addEventListener("resize",i);const r=()=>setTimeout(i,250);return window.addEventListener("orientationchange",r),i(),()=>{var a;window.removeEventListener("resize",i),(a=window.visualViewport)==null||a.removeEventListener("resize",i),window.removeEventListener("orientationchange",r)}},[]),e}function U_(t){const[e,n]=ke.useState(0);return ke.useEffect(()=>{if(!t)return;const i=()=>n(t.clientHeight);i();const r=new ResizeObserver(i);return r.observe(t),()=>r.disconnect()},[t]),e}function F_(t,e){const[n,i]=ke.useState(t),[r,s]=ke.useState(null),a=ke.useCallback(c=>s(c),[]),o=ke.useRef(null),l=ke.useRef(t);return l.current=n,ke.useEffect(()=>i(c=>Math.min(Math.max(c,t),e)),[t,e]),ke.useEffect(()=>{const c=r;if(!c)return;const u=p=>{var v;o.current={y:p.clientY,h0:l.current,moved:0},(v=c.setPointerCapture)==null||v.call(c,p.pointerId)},h=p=>{const v=o.current;if(!v)return;const E=v.y-p.clientY;v.moved=Math.max(v.moved,Math.abs(E)),i(Math.min(e,Math.max(t,v.h0+E)))},d=p=>{var E;const v=o.current;if(o.current=null,(E=c.releasePointerCapture)==null||E.call(c,p.pointerId),!!v){if(v.moved<6){i(g=>g>(t+e)/2?t:e);return}i(g=>g>(t+e)/2?e:t)}};return c.addEventListener("pointerdown",u),c.addEventListener("pointermove",h),c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d),()=>{c.removeEventListener("pointerdown",u),c.removeEventListener("pointermove",h),c.removeEventListener("pointerup",d),c.removeEventListener("pointercancel",d)}},[t,e,r]),{h:n,ref:a,open:n>(t+e)/2,dragging:!!o.current}}Ku.createRoot(document.getElementById("root")).render(A.jsx(ix.StrictMode,{children:A.jsx(zC,{})}));
