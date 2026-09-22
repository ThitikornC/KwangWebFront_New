(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function U_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var yg={exports:{}},cc={},Mg={exports:{}},Qe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var uo=Symbol.for("react.element"),F_=Symbol.for("react.portal"),O_=Symbol.for("react.fragment"),B_=Symbol.for("react.strict_mode"),k_=Symbol.for("react.profiler"),z_=Symbol.for("react.provider"),H_=Symbol.for("react.context"),V_=Symbol.for("react.forward_ref"),G_=Symbol.for("react.suspense"),W_=Symbol.for("react.memo"),X_=Symbol.for("react.lazy"),ep=Symbol.iterator;function Y_(t){return t===null||typeof t!="object"?null:(t=ep&&t[ep]||t["@@iterator"],typeof t=="function"?t:null)}var Eg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},wg=Object.assign,Tg={};function $s(t,e,n){this.props=t,this.context=e,this.refs=Tg,this.updater=n||Eg}$s.prototype.isReactComponent={};$s.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};$s.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Ag(){}Ag.prototype=$s.prototype;function bf(t,e,n){this.props=t,this.context=e,this.refs=Tg,this.updater=n||Eg}var Pf=bf.prototype=new Ag;Pf.constructor=bf;wg(Pf,$s.prototype);Pf.isPureReactComponent=!0;var tp=Array.isArray,Cg=Object.prototype.hasOwnProperty,Lf={current:null},Rg={key:!0,ref:!0,__self:!0,__source:!0};function bg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Cg.call(e,i)&&!Rg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:uo,type:t,key:s,ref:a,props:r,_owner:Lf.current}}function j_(t,e){return{$$typeof:uo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Nf(t){return typeof t=="object"&&t!==null&&t.$$typeof===uo}function q_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var np=/\/+/g;function Lc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?q_(""+t.key):e.toString(36)}function pl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case uo:case F_:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Lc(a,0):i,tp(r)?(n="",t!=null&&(n=t.replace(np,"$&/")+"/"),pl(r,e,n,"",function(c){return c})):r!=null&&(Nf(r)&&(r=j_(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(np,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",tp(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Lc(s,o);a+=pl(s,e,n,l,r)}else if(l=Y_(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Lc(s,o++),a+=pl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function wo(t,e,n){if(t==null)return t;var i=[],r=0;return pl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function $_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var pn={current:null},ml={transition:null},K_={ReactCurrentDispatcher:pn,ReactCurrentBatchConfig:ml,ReactCurrentOwner:Lf};function Pg(){throw Error("act(...) is not supported in production builds of React.")}Qe.Children={map:wo,forEach:function(t,e,n){wo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return wo(t,function(){e++}),e},toArray:function(t){return wo(t,function(e){return e})||[]},only:function(t){if(!Nf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Qe.Component=$s;Qe.Fragment=O_;Qe.Profiler=k_;Qe.PureComponent=bf;Qe.StrictMode=B_;Qe.Suspense=G_;Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=K_;Qe.act=Pg;Qe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=wg({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=Lf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Cg.call(e,l)&&!Rg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:uo,type:t.type,key:r,ref:s,props:i,_owner:a}};Qe.createContext=function(t){return t={$$typeof:H_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:z_,_context:t},t.Consumer=t};Qe.createElement=bg;Qe.createFactory=function(t){var e=bg.bind(null,t);return e.type=t,e};Qe.createRef=function(){return{current:null}};Qe.forwardRef=function(t){return{$$typeof:V_,render:t}};Qe.isValidElement=Nf;Qe.lazy=function(t){return{$$typeof:X_,_payload:{_status:-1,_result:t},_init:$_}};Qe.memo=function(t,e){return{$$typeof:W_,type:t,compare:e===void 0?null:e}};Qe.startTransition=function(t){var e=ml.transition;ml.transition={};try{t()}finally{ml.transition=e}};Qe.unstable_act=Pg;Qe.useCallback=function(t,e){return pn.current.useCallback(t,e)};Qe.useContext=function(t){return pn.current.useContext(t)};Qe.useDebugValue=function(){};Qe.useDeferredValue=function(t){return pn.current.useDeferredValue(t)};Qe.useEffect=function(t,e){return pn.current.useEffect(t,e)};Qe.useId=function(){return pn.current.useId()};Qe.useImperativeHandle=function(t,e,n){return pn.current.useImperativeHandle(t,e,n)};Qe.useInsertionEffect=function(t,e){return pn.current.useInsertionEffect(t,e)};Qe.useLayoutEffect=function(t,e){return pn.current.useLayoutEffect(t,e)};Qe.useMemo=function(t,e){return pn.current.useMemo(t,e)};Qe.useReducer=function(t,e,n){return pn.current.useReducer(t,e,n)};Qe.useRef=function(t){return pn.current.useRef(t)};Qe.useState=function(t){return pn.current.useState(t)};Qe.useSyncExternalStore=function(t,e,n){return pn.current.useSyncExternalStore(t,e,n)};Qe.useTransition=function(){return pn.current.useTransition()};Qe.version="18.3.1";Mg.exports=Qe;var ke=Mg.exports;const Z_=U_(ke);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J_=ke,Q_=Symbol.for("react.element"),ex=Symbol.for("react.fragment"),tx=Object.prototype.hasOwnProperty,nx=J_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ix={key:!0,ref:!0,__self:!0,__source:!0};function Lg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)tx.call(e,i)&&!ix.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Q_,type:t,key:s,ref:a,props:r,_owner:nx.current}}cc.Fragment=ex;cc.jsx=Lg;cc.jsxs=Lg;yg.exports=cc;var A=yg.exports,Yu={},Ng={exports:{}},In={},Dg={exports:{}},Ig={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(H,k){var X=H.length;H.push(k);e:for(;0<X;){var q=X-1>>>1,de=H[q];if(0<r(de,k))H[q]=k,H[X]=de,X=q;else break e}}function n(H){return H.length===0?null:H[0]}function i(H){if(H.length===0)return null;var k=H[0],X=H.pop();if(X!==k){H[0]=X;e:for(var q=0,de=H.length,ce=de>>>1;q<ce;){var Oe=2*(q+1)-1,Q=H[Oe],le=Oe+1,z=H[le];if(0>r(Q,X))le<de&&0>r(z,Q)?(H[q]=z,H[le]=X,q=le):(H[q]=Q,H[Oe]=X,q=Oe);else if(le<de&&0>r(z,X))H[q]=z,H[le]=X,q=le;else break e}}return k}function r(H,k){var X=H.sortIndex-k.sortIndex;return X!==0?X:H.id-k.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],f=1,h=null,u=3,p=!1,v=!1,w=!1,g=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(H){for(var k=n(c);k!==null;){if(k.callback===null)i(c);else if(k.startTime<=H)i(c),k.sortIndex=k.expirationTime,e(l,k);else break;k=n(c)}}function x(H){if(w=!1,y(H),!v)if(n(l)!==null)v=!0,te(E);else{var k=n(c);k!==null&&Y(x,k.startTime-H)}}function E(H,k){v=!1,w&&(w=!1,d(m),m=-1),p=!0;var X=u;try{for(y(k),h=n(l);h!==null&&(!(h.expirationTime>k)||H&&!N());){var q=h.callback;if(typeof q=="function"){h.callback=null,u=h.priorityLevel;var de=q(h.expirationTime<=k);k=t.unstable_now(),typeof de=="function"?h.callback=de:h===n(l)&&i(l),y(k)}else i(l);h=n(l)}if(h!==null)var ce=!0;else{var Oe=n(c);Oe!==null&&Y(x,Oe.startTime-k),ce=!1}return ce}finally{h=null,u=X,p=!1}}var T=!1,C=null,m=-1,R=5,L=-1;function N(){return!(t.unstable_now()-L<R)}function F(){if(C!==null){var H=t.unstable_now();L=H;var k=!0;try{k=C(!0,H)}finally{k?W():(T=!1,C=null)}}else T=!1}var W;if(typeof _=="function")W=function(){_(F)};else if(typeof MessageChannel<"u"){var D=new MessageChannel,G=D.port2;D.port1.onmessage=F,W=function(){G.postMessage(null)}}else W=function(){g(F,0)};function te(H){C=H,T||(T=!0,W())}function Y(H,k){m=g(function(){H(t.unstable_now())},k)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(H){H.callback=null},t.unstable_continueExecution=function(){v||p||(v=!0,te(E))},t.unstable_forceFrameRate=function(H){0>H||125<H?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):R=0<H?Math.floor(1e3/H):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(H){switch(u){case 1:case 2:case 3:var k=3;break;default:k=u}var X=u;u=k;try{return H()}finally{u=X}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(H,k){switch(H){case 1:case 2:case 3:case 4:case 5:break;default:H=3}var X=u;u=H;try{return k()}finally{u=X}},t.unstable_scheduleCallback=function(H,k,X){var q=t.unstable_now();switch(typeof X=="object"&&X!==null?(X=X.delay,X=typeof X=="number"&&0<X?q+X:q):X=q,H){case 1:var de=-1;break;case 2:de=250;break;case 5:de=1073741823;break;case 4:de=1e4;break;default:de=5e3}return de=X+de,H={id:f++,callback:k,priorityLevel:H,startTime:X,expirationTime:de,sortIndex:-1},X>q?(H.sortIndex=X,e(c,H),n(l)===null&&H===n(c)&&(w?(d(m),m=-1):w=!0,Y(x,X-q))):(H.sortIndex=de,e(l,H),v||p||(v=!0,te(E))),H},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(H){var k=u;return function(){var X=u;u=k;try{return H.apply(this,arguments)}finally{u=X}}}})(Ig);Dg.exports=Ig;var rx=Dg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sx=ke,Dn=rx;function he(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ug=new Set,Va={};function qr(t,e){Bs(t,e),Bs(t+"Capture",e)}function Bs(t,e){for(Va[t]=e,t=0;t<e.length;t++)Ug.add(e[t])}var ki=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ju=Object.prototype.hasOwnProperty,ax=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ip={},rp={};function ox(t){return ju.call(rp,t)?!0:ju.call(ip,t)?!1:ax.test(t)?rp[t]=!0:(ip[t]=!0,!1)}function lx(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function cx(t,e,n,i){if(e===null||typeof e>"u"||lx(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function mn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Qt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Qt[t]=new mn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Qt[e]=new mn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Qt[t]=new mn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Qt[t]=new mn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Qt[t]=new mn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Qt[t]=new mn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Qt[t]=new mn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Qt[t]=new mn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Qt[t]=new mn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Df=/[\-:]([a-z])/g;function If(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Df,If);Qt[e]=new mn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Df,If);Qt[e]=new mn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Df,If);Qt[e]=new mn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Qt[t]=new mn(t,1,!1,t.toLowerCase(),null,!1,!1)});Qt.xlinkHref=new mn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Qt[t]=new mn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Uf(t,e,n,i){var r=Qt.hasOwnProperty(e)?Qt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(cx(e,n,r,i)&&(n=null),i||r===null?ox(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Wi=sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,To=Symbol.for("react.element"),vs=Symbol.for("react.portal"),_s=Symbol.for("react.fragment"),Ff=Symbol.for("react.strict_mode"),qu=Symbol.for("react.profiler"),Fg=Symbol.for("react.provider"),Og=Symbol.for("react.context"),Of=Symbol.for("react.forward_ref"),$u=Symbol.for("react.suspense"),Ku=Symbol.for("react.suspense_list"),Bf=Symbol.for("react.memo"),tr=Symbol.for("react.lazy"),Bg=Symbol.for("react.offscreen"),sp=Symbol.iterator;function na(t){return t===null||typeof t!="object"?null:(t=sp&&t[sp]||t["@@iterator"],typeof t=="function"?t:null)}var At=Object.assign,Nc;function ya(t){if(Nc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Nc=e&&e[1]||""}return`
`+Nc+t}var Dc=!1;function Ic(t,e){if(!t||Dc)return"";Dc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{Dc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ya(t):""}function ux(t){switch(t.tag){case 5:return ya(t.type);case 16:return ya("Lazy");case 13:return ya("Suspense");case 19:return ya("SuspenseList");case 0:case 2:case 15:return t=Ic(t.type,!1),t;case 11:return t=Ic(t.type.render,!1),t;case 1:return t=Ic(t.type,!0),t;default:return""}}function Zu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case _s:return"Fragment";case vs:return"Portal";case qu:return"Profiler";case Ff:return"StrictMode";case $u:return"Suspense";case Ku:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Og:return(t.displayName||"Context")+".Consumer";case Fg:return(t._context.displayName||"Context")+".Provider";case Of:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Bf:return e=t.displayName||null,e!==null?e:Zu(t.type)||"Memo";case tr:e=t._payload,t=t._init;try{return Zu(t(e))}catch{}}return null}function dx(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Zu(e);case 8:return e===Ff?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function _r(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function kg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function fx(t){var e=kg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ao(t){t._valueTracker||(t._valueTracker=fx(t))}function zg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=kg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Ll(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ju(t,e){var n=e.checked;return At({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function ap(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=_r(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Hg(t,e){e=e.checked,e!=null&&Uf(t,"checked",e,!1)}function Qu(t,e){Hg(t,e);var n=_r(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?ed(t,e.type,n):e.hasOwnProperty("defaultValue")&&ed(t,e.type,_r(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function op(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function ed(t,e,n){(e!=="number"||Ll(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ma=Array.isArray;function Ps(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+_r(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function td(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(he(91));return At({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function lp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(he(92));if(Ma(n)){if(1<n.length)throw Error(he(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:_r(n)}}function Vg(t,e){var n=_r(e.value),i=_r(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function cp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Gg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function nd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Gg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Co,Wg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Co=Co||document.createElement("div"),Co.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Co.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ga(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ra={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},hx=["Webkit","ms","Moz","O"];Object.keys(Ra).forEach(function(t){hx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ra[e]=Ra[t]})});function Xg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ra.hasOwnProperty(t)&&Ra[t]?(""+e).trim():e+"px"}function Yg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Xg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var px=At({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function id(t,e){if(e){if(px[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(he(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(he(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(he(61))}if(e.style!=null&&typeof e.style!="object")throw Error(he(62))}}function rd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var sd=null;function kf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ad=null,Ls=null,Ns=null;function up(t){if(t=po(t)){if(typeof ad!="function")throw Error(he(280));var e=t.stateNode;e&&(e=pc(e),ad(t.stateNode,t.type,e))}}function jg(t){Ls?Ns?Ns.push(t):Ns=[t]:Ls=t}function qg(){if(Ls){var t=Ls,e=Ns;if(Ns=Ls=null,up(t),e)for(t=0;t<e.length;t++)up(e[t])}}function $g(t,e){return t(e)}function Kg(){}var Uc=!1;function Zg(t,e,n){if(Uc)return t(e,n);Uc=!0;try{return $g(t,e,n)}finally{Uc=!1,(Ls!==null||Ns!==null)&&(Kg(),qg())}}function Wa(t,e){var n=t.stateNode;if(n===null)return null;var i=pc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(he(231,e,typeof n));return n}var od=!1;if(ki)try{var ia={};Object.defineProperty(ia,"passive",{get:function(){od=!0}}),window.addEventListener("test",ia,ia),window.removeEventListener("test",ia,ia)}catch{od=!1}function mx(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var ba=!1,Nl=null,Dl=!1,ld=null,gx={onError:function(t){ba=!0,Nl=t}};function vx(t,e,n,i,r,s,a,o,l){ba=!1,Nl=null,mx.apply(gx,arguments)}function _x(t,e,n,i,r,s,a,o,l){if(vx.apply(this,arguments),ba){if(ba){var c=Nl;ba=!1,Nl=null}else throw Error(he(198));Dl||(Dl=!0,ld=c)}}function $r(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Jg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function dp(t){if($r(t)!==t)throw Error(he(188))}function xx(t){var e=t.alternate;if(!e){if(e=$r(t),e===null)throw Error(he(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return dp(r),t;if(s===i)return dp(r),e;s=s.sibling}throw Error(he(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(he(189))}}if(n.alternate!==i)throw Error(he(190))}if(n.tag!==3)throw Error(he(188));return n.stateNode.current===n?t:e}function Qg(t){return t=xx(t),t!==null?e0(t):null}function e0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=e0(t);if(e!==null)return e;t=t.sibling}return null}var t0=Dn.unstable_scheduleCallback,fp=Dn.unstable_cancelCallback,Sx=Dn.unstable_shouldYield,yx=Dn.unstable_requestPaint,Lt=Dn.unstable_now,Mx=Dn.unstable_getCurrentPriorityLevel,zf=Dn.unstable_ImmediatePriority,n0=Dn.unstable_UserBlockingPriority,Il=Dn.unstable_NormalPriority,Ex=Dn.unstable_LowPriority,i0=Dn.unstable_IdlePriority,uc=null,vi=null;function wx(t){if(vi&&typeof vi.onCommitFiberRoot=="function")try{vi.onCommitFiberRoot(uc,t,void 0,(t.current.flags&128)===128)}catch{}}var ii=Math.clz32?Math.clz32:Cx,Tx=Math.log,Ax=Math.LN2;function Cx(t){return t>>>=0,t===0?32:31-(Tx(t)/Ax|0)|0}var Ro=64,bo=4194304;function Ea(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ul(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Ea(o):(s&=a,s!==0&&(i=Ea(s)))}else a=n&~r,a!==0?i=Ea(a):s!==0&&(i=Ea(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ii(e),r=1<<n,i|=t[n],e&=~r;return i}function Rx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function bx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-ii(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=Rx(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function cd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function r0(){var t=Ro;return Ro<<=1,!(Ro&4194240)&&(Ro=64),t}function Fc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function fo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ii(e),t[e]=n}function Px(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ii(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Hf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ii(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var dt=0;function s0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var a0,Vf,o0,l0,c0,ud=!1,Po=[],cr=null,ur=null,dr=null,Xa=new Map,Ya=new Map,rr=[],Lx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function hp(t,e){switch(t){case"focusin":case"focusout":cr=null;break;case"dragenter":case"dragleave":ur=null;break;case"mouseover":case"mouseout":dr=null;break;case"pointerover":case"pointerout":Xa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ya.delete(e.pointerId)}}function ra(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=po(e),e!==null&&Vf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Nx(t,e,n,i,r){switch(e){case"focusin":return cr=ra(cr,t,e,n,i,r),!0;case"dragenter":return ur=ra(ur,t,e,n,i,r),!0;case"mouseover":return dr=ra(dr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Xa.set(s,ra(Xa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ya.set(s,ra(Ya.get(s)||null,t,e,n,i,r)),!0}return!1}function u0(t){var e=Dr(t.target);if(e!==null){var n=$r(e);if(n!==null){if(e=n.tag,e===13){if(e=Jg(n),e!==null){t.blockedOn=e,c0(t.priority,function(){o0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function gl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=dd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);sd=i,n.target.dispatchEvent(i),sd=null}else return e=po(n),e!==null&&Vf(e),t.blockedOn=n,!1;e.shift()}return!0}function pp(t,e,n){gl(t)&&n.delete(e)}function Dx(){ud=!1,cr!==null&&gl(cr)&&(cr=null),ur!==null&&gl(ur)&&(ur=null),dr!==null&&gl(dr)&&(dr=null),Xa.forEach(pp),Ya.forEach(pp)}function sa(t,e){t.blockedOn===e&&(t.blockedOn=null,ud||(ud=!0,Dn.unstable_scheduleCallback(Dn.unstable_NormalPriority,Dx)))}function ja(t){function e(r){return sa(r,t)}if(0<Po.length){sa(Po[0],t);for(var n=1;n<Po.length;n++){var i=Po[n];i.blockedOn===t&&(i.blockedOn=null)}}for(cr!==null&&sa(cr,t),ur!==null&&sa(ur,t),dr!==null&&sa(dr,t),Xa.forEach(e),Ya.forEach(e),n=0;n<rr.length;n++)i=rr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<rr.length&&(n=rr[0],n.blockedOn===null);)u0(n),n.blockedOn===null&&rr.shift()}var Ds=Wi.ReactCurrentBatchConfig,Fl=!0;function Ix(t,e,n,i){var r=dt,s=Ds.transition;Ds.transition=null;try{dt=1,Gf(t,e,n,i)}finally{dt=r,Ds.transition=s}}function Ux(t,e,n,i){var r=dt,s=Ds.transition;Ds.transition=null;try{dt=4,Gf(t,e,n,i)}finally{dt=r,Ds.transition=s}}function Gf(t,e,n,i){if(Fl){var r=dd(t,e,n,i);if(r===null)Yc(t,e,i,Ol,n),hp(t,i);else if(Nx(r,t,e,n,i))i.stopPropagation();else if(hp(t,i),e&4&&-1<Lx.indexOf(t)){for(;r!==null;){var s=po(r);if(s!==null&&a0(s),s=dd(t,e,n,i),s===null&&Yc(t,e,i,Ol,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Yc(t,e,i,null,n)}}var Ol=null;function dd(t,e,n,i){if(Ol=null,t=kf(i),t=Dr(t),t!==null)if(e=$r(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Jg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ol=t,null}function d0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Mx()){case zf:return 1;case n0:return 4;case Il:case Ex:return 16;case i0:return 536870912;default:return 16}default:return 16}}var or=null,Wf=null,vl=null;function f0(){if(vl)return vl;var t,e=Wf,n=e.length,i,r="value"in or?or.value:or.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return vl=r.slice(t,1<i?1-i:void 0)}function _l(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Lo(){return!0}function mp(){return!1}function Un(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Lo:mp,this.isPropagationStopped=mp,this}return At(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Lo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Lo)},persist:function(){},isPersistent:Lo}),e}var Ks={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xf=Un(Ks),ho=At({},Ks,{view:0,detail:0}),Fx=Un(ho),Oc,Bc,aa,dc=At({},ho,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Yf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==aa&&(aa&&t.type==="mousemove"?(Oc=t.screenX-aa.screenX,Bc=t.screenY-aa.screenY):Bc=Oc=0,aa=t),Oc)},movementY:function(t){return"movementY"in t?t.movementY:Bc}}),gp=Un(dc),Ox=At({},dc,{dataTransfer:0}),Bx=Un(Ox),kx=At({},ho,{relatedTarget:0}),kc=Un(kx),zx=At({},Ks,{animationName:0,elapsedTime:0,pseudoElement:0}),Hx=Un(zx),Vx=At({},Ks,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Gx=Un(Vx),Wx=At({},Ks,{data:0}),vp=Un(Wx),Xx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Yx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=jx[t])?!!e[t]:!1}function Yf(){return qx}var $x=At({},ho,{key:function(t){if(t.key){var e=Xx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=_l(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Yx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Yf,charCode:function(t){return t.type==="keypress"?_l(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?_l(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Kx=Un($x),Zx=At({},dc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_p=Un(Zx),Jx=At({},ho,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Yf}),Qx=Un(Jx),eS=At({},Ks,{propertyName:0,elapsedTime:0,pseudoElement:0}),tS=Un(eS),nS=At({},dc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),iS=Un(nS),rS=[9,13,27,32],jf=ki&&"CompositionEvent"in window,Pa=null;ki&&"documentMode"in document&&(Pa=document.documentMode);var sS=ki&&"TextEvent"in window&&!Pa,h0=ki&&(!jf||Pa&&8<Pa&&11>=Pa),xp=" ",Sp=!1;function p0(t,e){switch(t){case"keyup":return rS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function m0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var xs=!1;function aS(t,e){switch(t){case"compositionend":return m0(e);case"keypress":return e.which!==32?null:(Sp=!0,xp);case"textInput":return t=e.data,t===xp&&Sp?null:t;default:return null}}function oS(t,e){if(xs)return t==="compositionend"||!jf&&p0(t,e)?(t=f0(),vl=Wf=or=null,xs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return h0&&e.locale!=="ko"?null:e.data;default:return null}}var lS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function yp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!lS[t.type]:e==="textarea"}function g0(t,e,n,i){jg(i),e=Bl(e,"onChange"),0<e.length&&(n=new Xf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var La=null,qa=null;function cS(t){C0(t,0)}function fc(t){var e=Ms(t);if(zg(e))return t}function uS(t,e){if(t==="change")return e}var v0=!1;if(ki){var zc;if(ki){var Hc="oninput"in document;if(!Hc){var Mp=document.createElement("div");Mp.setAttribute("oninput","return;"),Hc=typeof Mp.oninput=="function"}zc=Hc}else zc=!1;v0=zc&&(!document.documentMode||9<document.documentMode)}function Ep(){La&&(La.detachEvent("onpropertychange",_0),qa=La=null)}function _0(t){if(t.propertyName==="value"&&fc(qa)){var e=[];g0(e,qa,t,kf(t)),Zg(cS,e)}}function dS(t,e,n){t==="focusin"?(Ep(),La=e,qa=n,La.attachEvent("onpropertychange",_0)):t==="focusout"&&Ep()}function fS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return fc(qa)}function hS(t,e){if(t==="click")return fc(e)}function pS(t,e){if(t==="input"||t==="change")return fc(e)}function mS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ai=typeof Object.is=="function"?Object.is:mS;function $a(t,e){if(ai(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!ju.call(e,r)||!ai(t[r],e[r]))return!1}return!0}function wp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Tp(t,e){var n=wp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=wp(n)}}function x0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?x0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function S0(){for(var t=window,e=Ll();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ll(t.document)}return e}function qf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function gS(t){var e=S0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&x0(n.ownerDocument.documentElement,n)){if(i!==null&&qf(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Tp(n,s);var a=Tp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var vS=ki&&"documentMode"in document&&11>=document.documentMode,Ss=null,fd=null,Na=null,hd=!1;function Ap(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;hd||Ss==null||Ss!==Ll(i)||(i=Ss,"selectionStart"in i&&qf(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Na&&$a(Na,i)||(Na=i,i=Bl(fd,"onSelect"),0<i.length&&(e=new Xf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Ss)))}function No(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ys={animationend:No("Animation","AnimationEnd"),animationiteration:No("Animation","AnimationIteration"),animationstart:No("Animation","AnimationStart"),transitionend:No("Transition","TransitionEnd")},Vc={},y0={};ki&&(y0=document.createElement("div").style,"AnimationEvent"in window||(delete ys.animationend.animation,delete ys.animationiteration.animation,delete ys.animationstart.animation),"TransitionEvent"in window||delete ys.transitionend.transition);function hc(t){if(Vc[t])return Vc[t];if(!ys[t])return t;var e=ys[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in y0)return Vc[t]=e[n];return t}var M0=hc("animationend"),E0=hc("animationiteration"),w0=hc("animationstart"),T0=hc("transitionend"),A0=new Map,Cp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yr(t,e){A0.set(t,e),qr(e,[t])}for(var Gc=0;Gc<Cp.length;Gc++){var Wc=Cp[Gc],_S=Wc.toLowerCase(),xS=Wc[0].toUpperCase()+Wc.slice(1);yr(_S,"on"+xS)}yr(M0,"onAnimationEnd");yr(E0,"onAnimationIteration");yr(w0,"onAnimationStart");yr("dblclick","onDoubleClick");yr("focusin","onFocus");yr("focusout","onBlur");yr(T0,"onTransitionEnd");Bs("onMouseEnter",["mouseout","mouseover"]);Bs("onMouseLeave",["mouseout","mouseover"]);Bs("onPointerEnter",["pointerout","pointerover"]);Bs("onPointerLeave",["pointerout","pointerover"]);qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var wa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),SS=new Set("cancel close invalid load scroll toggle".split(" ").concat(wa));function Rp(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,_x(i,e,void 0,t),t.currentTarget=null}function C0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Rp(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Rp(r,o,c),s=l}}}if(Dl)throw t=ld,Dl=!1,ld=null,t}function _t(t,e){var n=e[_d];n===void 0&&(n=e[_d]=new Set);var i=t+"__bubble";n.has(i)||(R0(e,t,2,!1),n.add(i))}function Xc(t,e,n){var i=0;e&&(i|=4),R0(n,t,i,e)}var Do="_reactListening"+Math.random().toString(36).slice(2);function Ka(t){if(!t[Do]){t[Do]=!0,Ug.forEach(function(n){n!=="selectionchange"&&(SS.has(n)||Xc(n,!1,t),Xc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Do]||(e[Do]=!0,Xc("selectionchange",!1,e))}}function R0(t,e,n,i){switch(d0(e)){case 1:var r=Ix;break;case 4:r=Ux;break;default:r=Gf}n=r.bind(null,e,n,t),r=void 0,!od||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Yc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Dr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Zg(function(){var c=s,f=kf(n),h=[];e:{var u=A0.get(t);if(u!==void 0){var p=Xf,v=t;switch(t){case"keypress":if(_l(n)===0)break e;case"keydown":case"keyup":p=Kx;break;case"focusin":v="focus",p=kc;break;case"focusout":v="blur",p=kc;break;case"beforeblur":case"afterblur":p=kc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=gp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Bx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Qx;break;case M0:case E0:case w0:p=Hx;break;case T0:p=tS;break;case"scroll":p=Fx;break;case"wheel":p=iS;break;case"copy":case"cut":case"paste":p=Gx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=_p}var w=(e&4)!==0,g=!w&&t==="scroll",d=w?u!==null?u+"Capture":null:u;w=[];for(var _=c,y;_!==null;){y=_;var x=y.stateNode;if(y.tag===5&&x!==null&&(y=x,d!==null&&(x=Wa(_,d),x!=null&&w.push(Za(_,x,y)))),g)break;_=_.return}0<w.length&&(u=new p(u,v,null,n,f),h.push({event:u,listeners:w}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==sd&&(v=n.relatedTarget||n.fromElement)&&(Dr(v)||v[zi]))break e;if((p||u)&&(u=f.window===f?f:(u=f.ownerDocument)?u.defaultView||u.parentWindow:window,p?(v=n.relatedTarget||n.toElement,p=c,v=v?Dr(v):null,v!==null&&(g=$r(v),v!==g||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(w=gp,x="onMouseLeave",d="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(w=_p,x="onPointerLeave",d="onPointerEnter",_="pointer"),g=p==null?u:Ms(p),y=v==null?u:Ms(v),u=new w(x,_+"leave",p,n,f),u.target=g,u.relatedTarget=y,x=null,Dr(f)===c&&(w=new w(d,_+"enter",v,n,f),w.target=y,w.relatedTarget=g,x=w),g=x,p&&v)t:{for(w=p,d=v,_=0,y=w;y;y=ts(y))_++;for(y=0,x=d;x;x=ts(x))y++;for(;0<_-y;)w=ts(w),_--;for(;0<y-_;)d=ts(d),y--;for(;_--;){if(w===d||d!==null&&w===d.alternate)break t;w=ts(w),d=ts(d)}w=null}else w=null;p!==null&&bp(h,u,p,w,!1),v!==null&&g!==null&&bp(h,g,v,w,!0)}}e:{if(u=c?Ms(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var E=uS;else if(yp(u))if(v0)E=pS;else{E=fS;var T=dS}else(p=u.nodeName)&&p.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(E=hS);if(E&&(E=E(t,c))){g0(h,E,n,f);break e}T&&T(t,u,c),t==="focusout"&&(T=u._wrapperState)&&T.controlled&&u.type==="number"&&ed(u,"number",u.value)}switch(T=c?Ms(c):window,t){case"focusin":(yp(T)||T.contentEditable==="true")&&(Ss=T,fd=c,Na=null);break;case"focusout":Na=fd=Ss=null;break;case"mousedown":hd=!0;break;case"contextmenu":case"mouseup":case"dragend":hd=!1,Ap(h,n,f);break;case"selectionchange":if(vS)break;case"keydown":case"keyup":Ap(h,n,f)}var C;if(jf)e:{switch(t){case"compositionstart":var m="onCompositionStart";break e;case"compositionend":m="onCompositionEnd";break e;case"compositionupdate":m="onCompositionUpdate";break e}m=void 0}else xs?p0(t,n)&&(m="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(m="onCompositionStart");m&&(h0&&n.locale!=="ko"&&(xs||m!=="onCompositionStart"?m==="onCompositionEnd"&&xs&&(C=f0()):(or=f,Wf="value"in or?or.value:or.textContent,xs=!0)),T=Bl(c,m),0<T.length&&(m=new vp(m,t,null,n,f),h.push({event:m,listeners:T}),C?m.data=C:(C=m0(n),C!==null&&(m.data=C)))),(C=sS?aS(t,n):oS(t,n))&&(c=Bl(c,"onBeforeInput"),0<c.length&&(f=new vp("onBeforeInput","beforeinput",null,n,f),h.push({event:f,listeners:c}),f.data=C))}C0(h,e)})}function Za(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Bl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Wa(t,n),s!=null&&i.unshift(Za(t,s,r)),s=Wa(t,e),s!=null&&i.push(Za(t,s,r))),t=t.return}return i}function ts(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function bp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Wa(n,s),l!=null&&a.unshift(Za(n,l,o))):r||(l=Wa(n,s),l!=null&&a.push(Za(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var yS=/\r\n?/g,MS=/\u0000|\uFFFD/g;function Pp(t){return(typeof t=="string"?t:""+t).replace(yS,`
`).replace(MS,"")}function Io(t,e,n){if(e=Pp(e),Pp(t)!==e&&n)throw Error(he(425))}function kl(){}var pd=null,md=null;function gd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var vd=typeof setTimeout=="function"?setTimeout:void 0,ES=typeof clearTimeout=="function"?clearTimeout:void 0,Lp=typeof Promise=="function"?Promise:void 0,wS=typeof queueMicrotask=="function"?queueMicrotask:typeof Lp<"u"?function(t){return Lp.resolve(null).then(t).catch(TS)}:vd;function TS(t){setTimeout(function(){throw t})}function jc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),ja(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);ja(e)}function fr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Np(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Zs=Math.random().toString(36).slice(2),hi="__reactFiber$"+Zs,Ja="__reactProps$"+Zs,zi="__reactContainer$"+Zs,_d="__reactEvents$"+Zs,AS="__reactListeners$"+Zs,CS="__reactHandles$"+Zs;function Dr(t){var e=t[hi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[zi]||n[hi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Np(t);t!==null;){if(n=t[hi])return n;t=Np(t)}return e}t=n,n=t.parentNode}return null}function po(t){return t=t[hi]||t[zi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ms(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(he(33))}function pc(t){return t[Ja]||null}var xd=[],Es=-1;function Mr(t){return{current:t}}function xt(t){0>Es||(t.current=xd[Es],xd[Es]=null,Es--)}function gt(t,e){Es++,xd[Es]=t.current,t.current=e}var xr={},cn=Mr(xr),Mn=Mr(!1),zr=xr;function ks(t,e){var n=t.type.contextTypes;if(!n)return xr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function En(t){return t=t.childContextTypes,t!=null}function zl(){xt(Mn),xt(cn)}function Dp(t,e,n){if(cn.current!==xr)throw Error(he(168));gt(cn,e),gt(Mn,n)}function b0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(he(108,dx(t)||"Unknown",r));return At({},n,i)}function Hl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||xr,zr=cn.current,gt(cn,t),gt(Mn,Mn.current),!0}function Ip(t,e,n){var i=t.stateNode;if(!i)throw Error(he(169));n?(t=b0(t,e,zr),i.__reactInternalMemoizedMergedChildContext=t,xt(Mn),xt(cn),gt(cn,t)):xt(Mn),gt(Mn,n)}var Li=null,mc=!1,qc=!1;function P0(t){Li===null?Li=[t]:Li.push(t)}function RS(t){mc=!0,P0(t)}function Er(){if(!qc&&Li!==null){qc=!0;var t=0,e=dt;try{var n=Li;for(dt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Li=null,mc=!1}catch(r){throw Li!==null&&(Li=Li.slice(t+1)),t0(zf,Er),r}finally{dt=e,qc=!1}}return null}var ws=[],Ts=0,Vl=null,Gl=0,kn=[],zn=0,Hr=null,Di=1,Ii="";function Lr(t,e){ws[Ts++]=Gl,ws[Ts++]=Vl,Vl=t,Gl=e}function L0(t,e,n){kn[zn++]=Di,kn[zn++]=Ii,kn[zn++]=Hr,Hr=t;var i=Di;t=Ii;var r=32-ii(i)-1;i&=~(1<<r),n+=1;var s=32-ii(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Di=1<<32-ii(e)+r|n<<r|i,Ii=s+t}else Di=1<<s|n<<r|i,Ii=t}function $f(t){t.return!==null&&(Lr(t,1),L0(t,1,0))}function Kf(t){for(;t===Vl;)Vl=ws[--Ts],ws[Ts]=null,Gl=ws[--Ts],ws[Ts]=null;for(;t===Hr;)Hr=kn[--zn],kn[zn]=null,Ii=kn[--zn],kn[zn]=null,Di=kn[--zn],kn[zn]=null}var Nn=null,Ln=null,yt=!1,Qn=null;function N0(t,e){var n=Hn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Up(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Nn=t,Ln=fr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Nn=t,Ln=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Hr!==null?{id:Di,overflow:Ii}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Hn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Nn=t,Ln=null,!0):!1;default:return!1}}function Sd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function yd(t){if(yt){var e=Ln;if(e){var n=e;if(!Up(t,e)){if(Sd(t))throw Error(he(418));e=fr(n.nextSibling);var i=Nn;e&&Up(t,e)?N0(i,n):(t.flags=t.flags&-4097|2,yt=!1,Nn=t)}}else{if(Sd(t))throw Error(he(418));t.flags=t.flags&-4097|2,yt=!1,Nn=t}}}function Fp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Nn=t}function Uo(t){if(t!==Nn)return!1;if(!yt)return Fp(t),yt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!gd(t.type,t.memoizedProps)),e&&(e=Ln)){if(Sd(t))throw D0(),Error(he(418));for(;e;)N0(t,e),e=fr(e.nextSibling)}if(Fp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(he(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Ln=fr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Ln=null}}else Ln=Nn?fr(t.stateNode.nextSibling):null;return!0}function D0(){for(var t=Ln;t;)t=fr(t.nextSibling)}function zs(){Ln=Nn=null,yt=!1}function Zf(t){Qn===null?Qn=[t]:Qn.push(t)}var bS=Wi.ReactCurrentBatchConfig;function oa(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(he(309));var i=n.stateNode}if(!i)throw Error(he(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(he(284));if(!n._owner)throw Error(he(290,t))}return t}function Fo(t,e){throw t=Object.prototype.toString.call(e),Error(he(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Op(t){var e=t._init;return e(t._payload)}function I0(t){function e(d,_){if(t){var y=d.deletions;y===null?(d.deletions=[_],d.flags|=16):y.push(_)}}function n(d,_){if(!t)return null;for(;_!==null;)e(d,_),_=_.sibling;return null}function i(d,_){for(d=new Map;_!==null;)_.key!==null?d.set(_.key,_):d.set(_.index,_),_=_.sibling;return d}function r(d,_){return d=gr(d,_),d.index=0,d.sibling=null,d}function s(d,_,y){return d.index=y,t?(y=d.alternate,y!==null?(y=y.index,y<_?(d.flags|=2,_):y):(d.flags|=2,_)):(d.flags|=1048576,_)}function a(d){return t&&d.alternate===null&&(d.flags|=2),d}function o(d,_,y,x){return _===null||_.tag!==6?(_=tu(y,d.mode,x),_.return=d,_):(_=r(_,y),_.return=d,_)}function l(d,_,y,x){var E=y.type;return E===_s?f(d,_,y.props.children,x,y.key):_!==null&&(_.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===tr&&Op(E)===_.type)?(x=r(_,y.props),x.ref=oa(d,_,y),x.return=d,x):(x=Tl(y.type,y.key,y.props,null,d.mode,x),x.ref=oa(d,_,y),x.return=d,x)}function c(d,_,y,x){return _===null||_.tag!==4||_.stateNode.containerInfo!==y.containerInfo||_.stateNode.implementation!==y.implementation?(_=nu(y,d.mode,x),_.return=d,_):(_=r(_,y.children||[]),_.return=d,_)}function f(d,_,y,x,E){return _===null||_.tag!==7?(_=kr(y,d.mode,x,E),_.return=d,_):(_=r(_,y),_.return=d,_)}function h(d,_,y){if(typeof _=="string"&&_!==""||typeof _=="number")return _=tu(""+_,d.mode,y),_.return=d,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case To:return y=Tl(_.type,_.key,_.props,null,d.mode,y),y.ref=oa(d,null,_),y.return=d,y;case vs:return _=nu(_,d.mode,y),_.return=d,_;case tr:var x=_._init;return h(d,x(_._payload),y)}if(Ma(_)||na(_))return _=kr(_,d.mode,y,null),_.return=d,_;Fo(d,_)}return null}function u(d,_,y,x){var E=_!==null?_.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return E!==null?null:o(d,_,""+y,x);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case To:return y.key===E?l(d,_,y,x):null;case vs:return y.key===E?c(d,_,y,x):null;case tr:return E=y._init,u(d,_,E(y._payload),x)}if(Ma(y)||na(y))return E!==null?null:f(d,_,y,x,null);Fo(d,y)}return null}function p(d,_,y,x,E){if(typeof x=="string"&&x!==""||typeof x=="number")return d=d.get(y)||null,o(_,d,""+x,E);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case To:return d=d.get(x.key===null?y:x.key)||null,l(_,d,x,E);case vs:return d=d.get(x.key===null?y:x.key)||null,c(_,d,x,E);case tr:var T=x._init;return p(d,_,y,T(x._payload),E)}if(Ma(x)||na(x))return d=d.get(y)||null,f(_,d,x,E,null);Fo(_,x)}return null}function v(d,_,y,x){for(var E=null,T=null,C=_,m=_=0,R=null;C!==null&&m<y.length;m++){C.index>m?(R=C,C=null):R=C.sibling;var L=u(d,C,y[m],x);if(L===null){C===null&&(C=R);break}t&&C&&L.alternate===null&&e(d,C),_=s(L,_,m),T===null?E=L:T.sibling=L,T=L,C=R}if(m===y.length)return n(d,C),yt&&Lr(d,m),E;if(C===null){for(;m<y.length;m++)C=h(d,y[m],x),C!==null&&(_=s(C,_,m),T===null?E=C:T.sibling=C,T=C);return yt&&Lr(d,m),E}for(C=i(d,C);m<y.length;m++)R=p(C,d,m,y[m],x),R!==null&&(t&&R.alternate!==null&&C.delete(R.key===null?m:R.key),_=s(R,_,m),T===null?E=R:T.sibling=R,T=R);return t&&C.forEach(function(N){return e(d,N)}),yt&&Lr(d,m),E}function w(d,_,y,x){var E=na(y);if(typeof E!="function")throw Error(he(150));if(y=E.call(y),y==null)throw Error(he(151));for(var T=E=null,C=_,m=_=0,R=null,L=y.next();C!==null&&!L.done;m++,L=y.next()){C.index>m?(R=C,C=null):R=C.sibling;var N=u(d,C,L.value,x);if(N===null){C===null&&(C=R);break}t&&C&&N.alternate===null&&e(d,C),_=s(N,_,m),T===null?E=N:T.sibling=N,T=N,C=R}if(L.done)return n(d,C),yt&&Lr(d,m),E;if(C===null){for(;!L.done;m++,L=y.next())L=h(d,L.value,x),L!==null&&(_=s(L,_,m),T===null?E=L:T.sibling=L,T=L);return yt&&Lr(d,m),E}for(C=i(d,C);!L.done;m++,L=y.next())L=p(C,d,m,L.value,x),L!==null&&(t&&L.alternate!==null&&C.delete(L.key===null?m:L.key),_=s(L,_,m),T===null?E=L:T.sibling=L,T=L);return t&&C.forEach(function(F){return e(d,F)}),yt&&Lr(d,m),E}function g(d,_,y,x){if(typeof y=="object"&&y!==null&&y.type===_s&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case To:e:{for(var E=y.key,T=_;T!==null;){if(T.key===E){if(E=y.type,E===_s){if(T.tag===7){n(d,T.sibling),_=r(T,y.props.children),_.return=d,d=_;break e}}else if(T.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===tr&&Op(E)===T.type){n(d,T.sibling),_=r(T,y.props),_.ref=oa(d,T,y),_.return=d,d=_;break e}n(d,T);break}else e(d,T);T=T.sibling}y.type===_s?(_=kr(y.props.children,d.mode,x,y.key),_.return=d,d=_):(x=Tl(y.type,y.key,y.props,null,d.mode,x),x.ref=oa(d,_,y),x.return=d,d=x)}return a(d);case vs:e:{for(T=y.key;_!==null;){if(_.key===T)if(_.tag===4&&_.stateNode.containerInfo===y.containerInfo&&_.stateNode.implementation===y.implementation){n(d,_.sibling),_=r(_,y.children||[]),_.return=d,d=_;break e}else{n(d,_);break}else e(d,_);_=_.sibling}_=nu(y,d.mode,x),_.return=d,d=_}return a(d);case tr:return T=y._init,g(d,_,T(y._payload),x)}if(Ma(y))return v(d,_,y,x);if(na(y))return w(d,_,y,x);Fo(d,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,_!==null&&_.tag===6?(n(d,_.sibling),_=r(_,y),_.return=d,d=_):(n(d,_),_=tu(y,d.mode,x),_.return=d,d=_),a(d)):n(d,_)}return g}var Hs=I0(!0),U0=I0(!1),Wl=Mr(null),Xl=null,As=null,Jf=null;function Qf(){Jf=As=Xl=null}function eh(t){var e=Wl.current;xt(Wl),t._currentValue=e}function Md(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Is(t,e){Xl=t,Jf=As=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(yn=!0),t.firstContext=null)}function Gn(t){var e=t._currentValue;if(Jf!==t)if(t={context:t,memoizedValue:e,next:null},As===null){if(Xl===null)throw Error(he(308));As=t,Xl.dependencies={lanes:0,firstContext:t}}else As=As.next=t;return e}var Ir=null;function th(t){Ir===null?Ir=[t]:Ir.push(t)}function F0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,th(e)):(n.next=r.next,r.next=n),e.interleaved=n,Hi(t,i)}function Hi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var nr=!1;function nh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function O0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ui(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function hr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,st&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Hi(t,n)}return r=i.interleaved,r===null?(e.next=e,th(i)):(e.next=r.next,r.next=e),i.interleaved=e,Hi(t,n)}function xl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Hf(t,n)}}function Bp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Yl(t,e,n,i){var r=t.updateQueue;nr=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==a&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;a=0,f=c=l=null,o=s;do{var u=o.lane,p=o.eventTime;if((i&u)===u){f!==null&&(f=f.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var v=t,w=o;switch(u=e,p=n,w.tag){case 1:if(v=w.payload,typeof v=="function"){h=v.call(p,h,u);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=w.payload,u=typeof v=="function"?v.call(p,h,u):v,u==null)break e;h=At({},h,u);break e;case 2:nr=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,u=r.effects,u===null?r.effects=[o]:u.push(o))}else p={eventTime:p,lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=p,l=h):f=f.next=p,a|=u;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;u=o,o=u.next,u.next=null,r.lastBaseUpdate=u,r.shared.pending=null}}while(!0);if(f===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Gr|=a,t.lanes=a,t.memoizedState=h}}function kp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(he(191,r));r.call(i)}}}var mo={},_i=Mr(mo),Qa=Mr(mo),eo=Mr(mo);function Ur(t){if(t===mo)throw Error(he(174));return t}function ih(t,e){switch(gt(eo,e),gt(Qa,t),gt(_i,mo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:nd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=nd(e,t)}xt(_i),gt(_i,e)}function Vs(){xt(_i),xt(Qa),xt(eo)}function B0(t){Ur(eo.current);var e=Ur(_i.current),n=nd(e,t.type);e!==n&&(gt(Qa,t),gt(_i,n))}function rh(t){Qa.current===t&&(xt(_i),xt(Qa))}var Mt=Mr(0);function jl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var $c=[];function sh(){for(var t=0;t<$c.length;t++)$c[t]._workInProgressVersionPrimary=null;$c.length=0}var Sl=Wi.ReactCurrentDispatcher,Kc=Wi.ReactCurrentBatchConfig,Vr=0,wt=null,kt=null,Xt=null,ql=!1,Da=!1,to=0,PS=0;function tn(){throw Error(he(321))}function ah(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ai(t[n],e[n]))return!1;return!0}function oh(t,e,n,i,r,s){if(Vr=s,wt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Sl.current=t===null||t.memoizedState===null?IS:US,t=n(i,r),Da){s=0;do{if(Da=!1,to=0,25<=s)throw Error(he(301));s+=1,Xt=kt=null,e.updateQueue=null,Sl.current=FS,t=n(i,r)}while(Da)}if(Sl.current=$l,e=kt!==null&&kt.next!==null,Vr=0,Xt=kt=wt=null,ql=!1,e)throw Error(he(300));return t}function lh(){var t=to!==0;return to=0,t}function di(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Xt===null?wt.memoizedState=Xt=t:Xt=Xt.next=t,Xt}function Wn(){if(kt===null){var t=wt.alternate;t=t!==null?t.memoizedState:null}else t=kt.next;var e=Xt===null?wt.memoizedState:Xt.next;if(e!==null)Xt=e,kt=t;else{if(t===null)throw Error(he(310));kt=t,t={memoizedState:kt.memoizedState,baseState:kt.baseState,baseQueue:kt.baseQueue,queue:kt.queue,next:null},Xt===null?wt.memoizedState=Xt=t:Xt=Xt.next=t}return Xt}function no(t,e){return typeof e=="function"?e(t):e}function Zc(t){var e=Wn(),n=e.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=t;var i=kt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var f=c.lane;if((Vr&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=h,a=i):l=l.next=h,wt.lanes|=f,Gr|=f}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,ai(i,e.memoizedState)||(yn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,wt.lanes|=s,Gr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Jc(t){var e=Wn(),n=e.queue;if(n===null)throw Error(he(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);ai(s,e.memoizedState)||(yn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function k0(){}function z0(t,e){var n=wt,i=Wn(),r=e(),s=!ai(i.memoizedState,r);if(s&&(i.memoizedState=r,yn=!0),i=i.queue,ch(G0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Xt!==null&&Xt.memoizedState.tag&1){if(n.flags|=2048,io(9,V0.bind(null,n,i,r,e),void 0,null),Yt===null)throw Error(he(349));Vr&30||H0(n,e,r)}return r}function H0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function V0(t,e,n,i){e.value=n,e.getSnapshot=i,W0(e)&&X0(t)}function G0(t,e,n){return n(function(){W0(e)&&X0(t)})}function W0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ai(t,n)}catch{return!0}}function X0(t){var e=Hi(t,1);e!==null&&ri(e,t,1,-1)}function zp(t){var e=di();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:no,lastRenderedState:t},e.queue=t,t=t.dispatch=DS.bind(null,wt,t),[e.memoizedState,t]}function io(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=wt.updateQueue,e===null?(e={lastEffect:null,stores:null},wt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Y0(){return Wn().memoizedState}function yl(t,e,n,i){var r=di();wt.flags|=t,r.memoizedState=io(1|e,n,void 0,i===void 0?null:i)}function gc(t,e,n,i){var r=Wn();i=i===void 0?null:i;var s=void 0;if(kt!==null){var a=kt.memoizedState;if(s=a.destroy,i!==null&&ah(i,a.deps)){r.memoizedState=io(e,n,s,i);return}}wt.flags|=t,r.memoizedState=io(1|e,n,s,i)}function Hp(t,e){return yl(8390656,8,t,e)}function ch(t,e){return gc(2048,8,t,e)}function j0(t,e){return gc(4,2,t,e)}function q0(t,e){return gc(4,4,t,e)}function $0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function K0(t,e,n){return n=n!=null?n.concat([t]):null,gc(4,4,$0.bind(null,e,t),n)}function uh(){}function Z0(t,e){var n=Wn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&ah(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function J0(t,e){var n=Wn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&ah(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Q0(t,e,n){return Vr&21?(ai(n,e)||(n=r0(),wt.lanes|=n,Gr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,yn=!0),t.memoizedState=n)}function LS(t,e){var n=dt;dt=n!==0&&4>n?n:4,t(!0);var i=Kc.transition;Kc.transition={};try{t(!1),e()}finally{dt=n,Kc.transition=i}}function ev(){return Wn().memoizedState}function NS(t,e,n){var i=mr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},tv(t))nv(e,n);else if(n=F0(t,e,n,i),n!==null){var r=hn();ri(n,t,i,r),iv(n,e,i)}}function DS(t,e,n){var i=mr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(tv(t))nv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,ai(o,a)){var l=e.interleaved;l===null?(r.next=r,th(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=F0(t,e,r,i),n!==null&&(r=hn(),ri(n,t,i,r),iv(n,e,i))}}function tv(t){var e=t.alternate;return t===wt||e!==null&&e===wt}function nv(t,e){Da=ql=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function iv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Hf(t,n)}}var $l={readContext:Gn,useCallback:tn,useContext:tn,useEffect:tn,useImperativeHandle:tn,useInsertionEffect:tn,useLayoutEffect:tn,useMemo:tn,useReducer:tn,useRef:tn,useState:tn,useDebugValue:tn,useDeferredValue:tn,useTransition:tn,useMutableSource:tn,useSyncExternalStore:tn,useId:tn,unstable_isNewReconciler:!1},IS={readContext:Gn,useCallback:function(t,e){return di().memoizedState=[t,e===void 0?null:e],t},useContext:Gn,useEffect:Hp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,yl(4194308,4,$0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return yl(4194308,4,t,e)},useInsertionEffect:function(t,e){return yl(4,2,t,e)},useMemo:function(t,e){var n=di();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=di();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=NS.bind(null,wt,t),[i.memoizedState,t]},useRef:function(t){var e=di();return t={current:t},e.memoizedState=t},useState:zp,useDebugValue:uh,useDeferredValue:function(t){return di().memoizedState=t},useTransition:function(){var t=zp(!1),e=t[0];return t=LS.bind(null,t[1]),di().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=wt,r=di();if(yt){if(n===void 0)throw Error(he(407));n=n()}else{if(n=e(),Yt===null)throw Error(he(349));Vr&30||H0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Hp(G0.bind(null,i,s,t),[t]),i.flags|=2048,io(9,V0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=di(),e=Yt.identifierPrefix;if(yt){var n=Ii,i=Di;n=(i&~(1<<32-ii(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=to++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=PS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},US={readContext:Gn,useCallback:Z0,useContext:Gn,useEffect:ch,useImperativeHandle:K0,useInsertionEffect:j0,useLayoutEffect:q0,useMemo:J0,useReducer:Zc,useRef:Y0,useState:function(){return Zc(no)},useDebugValue:uh,useDeferredValue:function(t){var e=Wn();return Q0(e,kt.memoizedState,t)},useTransition:function(){var t=Zc(no)[0],e=Wn().memoizedState;return[t,e]},useMutableSource:k0,useSyncExternalStore:z0,useId:ev,unstable_isNewReconciler:!1},FS={readContext:Gn,useCallback:Z0,useContext:Gn,useEffect:ch,useImperativeHandle:K0,useInsertionEffect:j0,useLayoutEffect:q0,useMemo:J0,useReducer:Jc,useRef:Y0,useState:function(){return Jc(no)},useDebugValue:uh,useDeferredValue:function(t){var e=Wn();return kt===null?e.memoizedState=t:Q0(e,kt.memoizedState,t)},useTransition:function(){var t=Jc(no)[0],e=Wn().memoizedState;return[t,e]},useMutableSource:k0,useSyncExternalStore:z0,useId:ev,unstable_isNewReconciler:!1};function Zn(t,e){if(t&&t.defaultProps){e=At({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Ed(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:At({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var vc={isMounted:function(t){return(t=t._reactInternals)?$r(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=hn(),r=mr(t),s=Ui(i,r);s.payload=e,n!=null&&(s.callback=n),e=hr(t,s,r),e!==null&&(ri(e,t,r,i),xl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=hn(),r=mr(t),s=Ui(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=hr(t,s,r),e!==null&&(ri(e,t,r,i),xl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=hn(),i=mr(t),r=Ui(n,i);r.tag=2,e!=null&&(r.callback=e),e=hr(t,r,i),e!==null&&(ri(e,t,i,n),xl(e,t,i))}};function Vp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!$a(n,i)||!$a(r,s):!0}function rv(t,e,n){var i=!1,r=xr,s=e.contextType;return typeof s=="object"&&s!==null?s=Gn(s):(r=En(e)?zr:cn.current,i=e.contextTypes,s=(i=i!=null)?ks(t,r):xr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=vc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Gp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&vc.enqueueReplaceState(e,e.state,null)}function wd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},nh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Gn(s):(s=En(e)?zr:cn.current,r.context=ks(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Ed(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&vc.enqueueReplaceState(r,r.state,null),Yl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Gs(t,e){try{var n="",i=e;do n+=ux(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Qc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Td(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var OS=typeof WeakMap=="function"?WeakMap:Map;function sv(t,e,n){n=Ui(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Zl||(Zl=!0,Ud=i),Td(t,e)},n}function av(t,e,n){n=Ui(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Td(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Td(t,e),typeof i!="function"&&(pr===null?pr=new Set([this]):pr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Wp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new OS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=ZS.bind(null,t,e,n),e.then(t,t))}function Xp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Yp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ui(-1,1),e.tag=2,hr(n,e,1))),n.lanes|=1),t)}var BS=Wi.ReactCurrentOwner,yn=!1;function fn(t,e,n,i){e.child=t===null?U0(e,null,n,i):Hs(e,t.child,n,i)}function jp(t,e,n,i,r){n=n.render;var s=e.ref;return Is(e,r),i=oh(t,e,n,i,s,r),n=lh(),t!==null&&!yn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(yt&&n&&$f(e),e.flags|=1,fn(t,e,i,r),e.child)}function qp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!_h(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,ov(t,e,s,i,r)):(t=Tl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:$a,n(a,i)&&t.ref===e.ref)return Vi(t,e,r)}return e.flags|=1,t=gr(s,i),t.ref=e.ref,t.return=e,e.child=t}function ov(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if($a(s,i)&&t.ref===e.ref)if(yn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(yn=!0);else return e.lanes=t.lanes,Vi(t,e,r)}return Ad(t,e,n,i,r)}function lv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},gt(Rs,bn),bn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,gt(Rs,bn),bn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,gt(Rs,bn),bn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,gt(Rs,bn),bn|=i;return fn(t,e,r,n),e.child}function cv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Ad(t,e,n,i,r){var s=En(n)?zr:cn.current;return s=ks(e,s),Is(e,r),n=oh(t,e,n,i,s,r),i=lh(),t!==null&&!yn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Vi(t,e,r)):(yt&&i&&$f(e),e.flags|=1,fn(t,e,n,r),e.child)}function $p(t,e,n,i,r){if(En(n)){var s=!0;Hl(e)}else s=!1;if(Is(e,r),e.stateNode===null)Ml(t,e),rv(e,n,i),wd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Gn(c):(c=En(n)?zr:cn.current,c=ks(e,c));var f=n.getDerivedStateFromProps,h=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&Gp(e,a,i,c),nr=!1;var u=e.memoizedState;a.state=u,Yl(e,i,a,r),l=e.memoizedState,o!==i||u!==l||Mn.current||nr?(typeof f=="function"&&(Ed(e,n,f,i),l=e.memoizedState),(o=nr||Vp(e,n,o,i,u,l,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,O0(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Zn(e.type,o),a.props=c,h=e.pendingProps,u=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Gn(l):(l=En(n)?zr:cn.current,l=ks(e,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||u!==l)&&Gp(e,a,i,l),nr=!1,u=e.memoizedState,a.state=u,Yl(e,i,a,r);var v=e.memoizedState;o!==h||u!==v||Mn.current||nr?(typeof p=="function"&&(Ed(e,n,p,i),v=e.memoizedState),(c=nr||Vp(e,n,c,i,u,v,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,v,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,v,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),a.props=i,a.state=v,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return Cd(t,e,n,i,s,r)}function Cd(t,e,n,i,r,s){cv(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Ip(e,n,!1),Vi(t,e,s);i=e.stateNode,BS.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Hs(e,t.child,null,s),e.child=Hs(e,null,o,s)):fn(t,e,o,s),e.memoizedState=i.state,r&&Ip(e,n,!0),e.child}function uv(t){var e=t.stateNode;e.pendingContext?Dp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Dp(t,e.context,!1),ih(t,e.containerInfo)}function Kp(t,e,n,i,r){return zs(),Zf(r),e.flags|=256,fn(t,e,n,i),e.child}var Rd={dehydrated:null,treeContext:null,retryLane:0};function bd(t){return{baseLanes:t,cachePool:null,transitions:null}}function dv(t,e,n){var i=e.pendingProps,r=Mt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),gt(Mt,r&1),t===null)return yd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Sc(a,i,0,null),t=kr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=bd(n),e.memoizedState=Rd,t):dh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return kS(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=gr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=gr(o,s):(s=kr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?bd(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Rd,i}return s=t.child,t=s.sibling,i=gr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function dh(t,e){return e=Sc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Oo(t,e,n,i){return i!==null&&Zf(i),Hs(e,t.child,null,n),t=dh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function kS(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Qc(Error(he(422))),Oo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Sc({mode:"visible",children:i.children},r,0,null),s=kr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Hs(e,t.child,null,a),e.child.memoizedState=bd(a),e.memoizedState=Rd,s);if(!(e.mode&1))return Oo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(he(419)),i=Qc(s,i,void 0),Oo(t,e,a,i)}if(o=(a&t.childLanes)!==0,yn||o){if(i=Yt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Hi(t,r),ri(i,t,r,-1))}return vh(),i=Qc(Error(he(421))),Oo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=JS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Ln=fr(r.nextSibling),Nn=e,yt=!0,Qn=null,t!==null&&(kn[zn++]=Di,kn[zn++]=Ii,kn[zn++]=Hr,Di=t.id,Ii=t.overflow,Hr=e),e=dh(e,i.children),e.flags|=4096,e)}function Zp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Md(t.return,e,n)}function eu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function fv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(fn(t,e,i.children,n),i=Mt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Zp(t,n,e);else if(t.tag===19)Zp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(gt(Mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&jl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),eu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&jl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}eu(e,!0,n,null,s);break;case"together":eu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ml(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Vi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Gr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(he(153));if(e.child!==null){for(t=e.child,n=gr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=gr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function zS(t,e,n){switch(e.tag){case 3:uv(e),zs();break;case 5:B0(e);break;case 1:En(e.type)&&Hl(e);break;case 4:ih(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;gt(Wl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(gt(Mt,Mt.current&1),e.flags|=128,null):n&e.child.childLanes?dv(t,e,n):(gt(Mt,Mt.current&1),t=Vi(t,e,n),t!==null?t.sibling:null);gt(Mt,Mt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return fv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),gt(Mt,Mt.current),i)break;return null;case 22:case 23:return e.lanes=0,lv(t,e,n)}return Vi(t,e,n)}var hv,Pd,pv,mv;hv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Pd=function(){};pv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Ur(_i.current);var s=null;switch(n){case"input":r=Ju(t,r),i=Ju(t,i),s=[];break;case"select":r=At({},r,{value:void 0}),i=At({},i,{value:void 0}),s=[];break;case"textarea":r=td(t,r),i=td(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=kl)}id(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Va.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Va.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&_t("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};mv=function(t,e,n,i){n!==i&&(e.flags|=4)};function la(t,e){if(!yt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function nn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function HS(t,e,n){var i=e.pendingProps;switch(Kf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nn(e),null;case 1:return En(e.type)&&zl(),nn(e),null;case 3:return i=e.stateNode,Vs(),xt(Mn),xt(cn),sh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Uo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Qn!==null&&(Bd(Qn),Qn=null))),Pd(t,e),nn(e),null;case 5:rh(e);var r=Ur(eo.current);if(n=e.type,t!==null&&e.stateNode!=null)pv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(he(166));return nn(e),null}if(t=Ur(_i.current),Uo(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[hi]=e,i[Ja]=s,t=(e.mode&1)!==0,n){case"dialog":_t("cancel",i),_t("close",i);break;case"iframe":case"object":case"embed":_t("load",i);break;case"video":case"audio":for(r=0;r<wa.length;r++)_t(wa[r],i);break;case"source":_t("error",i);break;case"img":case"image":case"link":_t("error",i),_t("load",i);break;case"details":_t("toggle",i);break;case"input":ap(i,s),_t("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},_t("invalid",i);break;case"textarea":lp(i,s),_t("invalid",i)}id(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&Io(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&Io(i.textContent,o,t),r=["children",""+o]):Va.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&_t("scroll",i)}switch(n){case"input":Ao(i),op(i,s,!0);break;case"textarea":Ao(i),cp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=kl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Gg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[hi]=e,t[Ja]=i,hv(t,e,!1,!1),e.stateNode=t;e:{switch(a=rd(n,i),n){case"dialog":_t("cancel",t),_t("close",t),r=i;break;case"iframe":case"object":case"embed":_t("load",t),r=i;break;case"video":case"audio":for(r=0;r<wa.length;r++)_t(wa[r],t);r=i;break;case"source":_t("error",t),r=i;break;case"img":case"image":case"link":_t("error",t),_t("load",t),r=i;break;case"details":_t("toggle",t),r=i;break;case"input":ap(t,i),r=Ju(t,i),_t("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=At({},i,{value:void 0}),_t("invalid",t);break;case"textarea":lp(t,i),r=td(t,i),_t("invalid",t);break;default:r=i}id(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Yg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Wg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ga(t,l):typeof l=="number"&&Ga(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Va.hasOwnProperty(s)?l!=null&&s==="onScroll"&&_t("scroll",t):l!=null&&Uf(t,s,l,a))}switch(n){case"input":Ao(t),op(t,i,!1);break;case"textarea":Ao(t),cp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+_r(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Ps(t,!!i.multiple,s,!1):i.defaultValue!=null&&Ps(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=kl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return nn(e),null;case 6:if(t&&e.stateNode!=null)mv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(he(166));if(n=Ur(eo.current),Ur(_i.current),Uo(e)){if(i=e.stateNode,n=e.memoizedProps,i[hi]=e,(s=i.nodeValue!==n)&&(t=Nn,t!==null))switch(t.tag){case 3:Io(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Io(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[hi]=e,e.stateNode=i}return nn(e),null;case 13:if(xt(Mt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(yt&&Ln!==null&&e.mode&1&&!(e.flags&128))D0(),zs(),e.flags|=98560,s=!1;else if(s=Uo(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(he(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(he(317));s[hi]=e}else zs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;nn(e),s=!1}else Qn!==null&&(Bd(Qn),Qn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Mt.current&1?zt===0&&(zt=3):vh())),e.updateQueue!==null&&(e.flags|=4),nn(e),null);case 4:return Vs(),Pd(t,e),t===null&&Ka(e.stateNode.containerInfo),nn(e),null;case 10:return eh(e.type._context),nn(e),null;case 17:return En(e.type)&&zl(),nn(e),null;case 19:if(xt(Mt),s=e.memoizedState,s===null)return nn(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)la(s,!1);else{if(zt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=jl(t),a!==null){for(e.flags|=128,la(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return gt(Mt,Mt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Lt()>Ws&&(e.flags|=128,i=!0,la(s,!1),e.lanes=4194304)}else{if(!i)if(t=jl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),la(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!yt)return nn(e),null}else 2*Lt()-s.renderingStartTime>Ws&&n!==1073741824&&(e.flags|=128,i=!0,la(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Lt(),e.sibling=null,n=Mt.current,gt(Mt,i?n&1|2:n&1),e):(nn(e),null);case 22:case 23:return gh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?bn&1073741824&&(nn(e),e.subtreeFlags&6&&(e.flags|=8192)):nn(e),null;case 24:return null;case 25:return null}throw Error(he(156,e.tag))}function VS(t,e){switch(Kf(e),e.tag){case 1:return En(e.type)&&zl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Vs(),xt(Mn),xt(cn),sh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return rh(e),null;case 13:if(xt(Mt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(he(340));zs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return xt(Mt),null;case 4:return Vs(),null;case 10:return eh(e.type._context),null;case 22:case 23:return gh(),null;case 24:return null;default:return null}}var Bo=!1,an=!1,GS=typeof WeakSet=="function"?WeakSet:Set,Pe=null;function Cs(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Rt(t,e,i)}else n.current=null}function Ld(t,e,n){try{n()}catch(i){Rt(t,e,i)}}var Jp=!1;function WS(t,e){if(pd=Fl,t=S0(),qf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,f=0,h=t,u=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(o=a+r),h!==s||i!==0&&h.nodeType!==3||(l=a+i),h.nodeType===3&&(a+=h.nodeValue.length),(p=h.firstChild)!==null;)u=h,h=p;for(;;){if(h===t)break t;if(u===n&&++c===r&&(o=a),u===s&&++f===i&&(l=a),(p=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(md={focusedElem:t,selectionRange:n},Fl=!1,Pe=e;Pe!==null;)if(e=Pe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Pe=t;else for(;Pe!==null;){e=Pe;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var w=v.memoizedProps,g=v.memoizedState,d=e.stateNode,_=d.getSnapshotBeforeUpdate(e.elementType===e.type?w:Zn(e.type,w),g);d.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(he(163))}}catch(x){Rt(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,Pe=t;break}Pe=e.return}return v=Jp,Jp=!1,v}function Ia(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Ld(e,n,s)}r=r.next}while(r!==i)}}function _c(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Nd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function gv(t){var e=t.alternate;e!==null&&(t.alternate=null,gv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[hi],delete e[Ja],delete e[_d],delete e[AS],delete e[CS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function vv(t){return t.tag===5||t.tag===3||t.tag===4}function Qp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||vv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Dd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=kl));else if(i!==4&&(t=t.child,t!==null))for(Dd(t,e,n),t=t.sibling;t!==null;)Dd(t,e,n),t=t.sibling}function Id(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Id(t,e,n),t=t.sibling;t!==null;)Id(t,e,n),t=t.sibling}var qt=null,Jn=!1;function qi(t,e,n){for(n=n.child;n!==null;)_v(t,e,n),n=n.sibling}function _v(t,e,n){if(vi&&typeof vi.onCommitFiberUnmount=="function")try{vi.onCommitFiberUnmount(uc,n)}catch{}switch(n.tag){case 5:an||Cs(n,e);case 6:var i=qt,r=Jn;qt=null,qi(t,e,n),qt=i,Jn=r,qt!==null&&(Jn?(t=qt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):qt.removeChild(n.stateNode));break;case 18:qt!==null&&(Jn?(t=qt,n=n.stateNode,t.nodeType===8?jc(t.parentNode,n):t.nodeType===1&&jc(t,n),ja(t)):jc(qt,n.stateNode));break;case 4:i=qt,r=Jn,qt=n.stateNode.containerInfo,Jn=!0,qi(t,e,n),qt=i,Jn=r;break;case 0:case 11:case 14:case 15:if(!an&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Ld(n,e,a),r=r.next}while(r!==i)}qi(t,e,n);break;case 1:if(!an&&(Cs(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Rt(n,e,o)}qi(t,e,n);break;case 21:qi(t,e,n);break;case 22:n.mode&1?(an=(i=an)||n.memoizedState!==null,qi(t,e,n),an=i):qi(t,e,n);break;default:qi(t,e,n)}}function em(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new GS),e.forEach(function(i){var r=QS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:qt=o.stateNode,Jn=!1;break e;case 3:qt=o.stateNode.containerInfo,Jn=!0;break e;case 4:qt=o.stateNode.containerInfo,Jn=!0;break e}o=o.return}if(qt===null)throw Error(he(160));_v(s,a,r),qt=null,Jn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Rt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)xv(e,t),e=e.sibling}function xv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(jn(e,t),li(t),i&4){try{Ia(3,t,t.return),_c(3,t)}catch(w){Rt(t,t.return,w)}try{Ia(5,t,t.return)}catch(w){Rt(t,t.return,w)}}break;case 1:jn(e,t),li(t),i&512&&n!==null&&Cs(n,n.return);break;case 5:if(jn(e,t),li(t),i&512&&n!==null&&Cs(n,n.return),t.flags&32){var r=t.stateNode;try{Ga(r,"")}catch(w){Rt(t,t.return,w)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Hg(r,s),rd(o,a);var c=rd(o,s);for(a=0;a<l.length;a+=2){var f=l[a],h=l[a+1];f==="style"?Yg(r,h):f==="dangerouslySetInnerHTML"?Wg(r,h):f==="children"?Ga(r,h):Uf(r,f,h,c)}switch(o){case"input":Qu(r,s);break;case"textarea":Vg(r,s);break;case"select":var u=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Ps(r,!!s.multiple,p,!1):u!==!!s.multiple&&(s.defaultValue!=null?Ps(r,!!s.multiple,s.defaultValue,!0):Ps(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ja]=s}catch(w){Rt(t,t.return,w)}}break;case 6:if(jn(e,t),li(t),i&4){if(t.stateNode===null)throw Error(he(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(w){Rt(t,t.return,w)}}break;case 3:if(jn(e,t),li(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ja(e.containerInfo)}catch(w){Rt(t,t.return,w)}break;case 4:jn(e,t),li(t);break;case 13:jn(e,t),li(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(ph=Lt())),i&4&&em(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(an=(c=an)||f,jn(e,t),an=c):jn(e,t),li(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(Pe=t,f=t.child;f!==null;){for(h=Pe=f;Pe!==null;){switch(u=Pe,p=u.child,u.tag){case 0:case 11:case 14:case 15:Ia(4,u,u.return);break;case 1:Cs(u,u.return);var v=u.stateNode;if(typeof v.componentWillUnmount=="function"){i=u,n=u.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(w){Rt(i,n,w)}}break;case 5:Cs(u,u.return);break;case 22:if(u.memoizedState!==null){nm(h);continue}}p!==null?(p.return=u,Pe=p):nm(h)}f=f.sibling}e:for(f=null,h=t;;){if(h.tag===5){if(f===null){f=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Xg("display",a))}catch(w){Rt(t,t.return,w)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(w){Rt(t,t.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:jn(e,t),li(t),i&4&&em(t);break;case 21:break;default:jn(e,t),li(t)}}function li(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(vv(n)){var i=n;break e}n=n.return}throw Error(he(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ga(r,""),i.flags&=-33);var s=Qp(t);Id(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Qp(t);Dd(t,o,a);break;default:throw Error(he(161))}}catch(l){Rt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function XS(t,e,n){Pe=t,Sv(t)}function Sv(t,e,n){for(var i=(t.mode&1)!==0;Pe!==null;){var r=Pe,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Bo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||an;o=Bo;var c=an;if(Bo=a,(an=l)&&!c)for(Pe=r;Pe!==null;)a=Pe,l=a.child,a.tag===22&&a.memoizedState!==null?im(r):l!==null?(l.return=a,Pe=l):im(r);for(;s!==null;)Pe=s,Sv(s),s=s.sibling;Pe=r,Bo=o,an=c}tm(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Pe=s):tm(t)}}function tm(t){for(;Pe!==null;){var e=Pe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:an||_c(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!an)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Zn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&kp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}kp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&ja(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(he(163))}an||e.flags&512&&Nd(e)}catch(u){Rt(e,e.return,u)}}if(e===t){Pe=null;break}if(n=e.sibling,n!==null){n.return=e.return,Pe=n;break}Pe=e.return}}function nm(t){for(;Pe!==null;){var e=Pe;if(e===t){Pe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Pe=n;break}Pe=e.return}}function im(t){for(;Pe!==null;){var e=Pe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{_c(4,e)}catch(l){Rt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Rt(e,r,l)}}var s=e.return;try{Nd(e)}catch(l){Rt(e,s,l)}break;case 5:var a=e.return;try{Nd(e)}catch(l){Rt(e,a,l)}}}catch(l){Rt(e,e.return,l)}if(e===t){Pe=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Pe=o;break}Pe=e.return}}var YS=Math.ceil,Kl=Wi.ReactCurrentDispatcher,fh=Wi.ReactCurrentOwner,Vn=Wi.ReactCurrentBatchConfig,st=0,Yt=null,Ot=null,Zt=0,bn=0,Rs=Mr(0),zt=0,ro=null,Gr=0,xc=0,hh=0,Ua=null,Sn=null,ph=0,Ws=1/0,Pi=null,Zl=!1,Ud=null,pr=null,ko=!1,lr=null,Jl=0,Fa=0,Fd=null,El=-1,wl=0;function hn(){return st&6?Lt():El!==-1?El:El=Lt()}function mr(t){return t.mode&1?st&2&&Zt!==0?Zt&-Zt:bS.transition!==null?(wl===0&&(wl=r0()),wl):(t=dt,t!==0||(t=window.event,t=t===void 0?16:d0(t.type)),t):1}function ri(t,e,n,i){if(50<Fa)throw Fa=0,Fd=null,Error(he(185));fo(t,n,i),(!(st&2)||t!==Yt)&&(t===Yt&&(!(st&2)&&(xc|=n),zt===4&&sr(t,Zt)),wn(t,i),n===1&&st===0&&!(e.mode&1)&&(Ws=Lt()+500,mc&&Er()))}function wn(t,e){var n=t.callbackNode;bx(t,e);var i=Ul(t,t===Yt?Zt:0);if(i===0)n!==null&&fp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&fp(n),e===1)t.tag===0?RS(rm.bind(null,t)):P0(rm.bind(null,t)),wS(function(){!(st&6)&&Er()}),n=null;else{switch(s0(i)){case 1:n=zf;break;case 4:n=n0;break;case 16:n=Il;break;case 536870912:n=i0;break;default:n=Il}n=Rv(n,yv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function yv(t,e){if(El=-1,wl=0,st&6)throw Error(he(327));var n=t.callbackNode;if(Us()&&t.callbackNode!==n)return null;var i=Ul(t,t===Yt?Zt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Ql(t,i);else{e=i;var r=st;st|=2;var s=Ev();(Yt!==t||Zt!==e)&&(Pi=null,Ws=Lt()+500,Br(t,e));do try{$S();break}catch(o){Mv(t,o)}while(!0);Qf(),Kl.current=s,st=r,Ot!==null?e=0:(Yt=null,Zt=0,e=zt)}if(e!==0){if(e===2&&(r=cd(t),r!==0&&(i=r,e=Od(t,r))),e===1)throw n=ro,Br(t,0),sr(t,i),wn(t,Lt()),n;if(e===6)sr(t,i);else{if(r=t.current.alternate,!(i&30)&&!jS(r)&&(e=Ql(t,i),e===2&&(s=cd(t),s!==0&&(i=s,e=Od(t,s))),e===1))throw n=ro,Br(t,0),sr(t,i),wn(t,Lt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(he(345));case 2:Nr(t,Sn,Pi);break;case 3:if(sr(t,i),(i&130023424)===i&&(e=ph+500-Lt(),10<e)){if(Ul(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){hn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=vd(Nr.bind(null,t,Sn,Pi),e);break}Nr(t,Sn,Pi);break;case 4:if(sr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-ii(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Lt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*YS(i/1960))-i,10<i){t.timeoutHandle=vd(Nr.bind(null,t,Sn,Pi),i);break}Nr(t,Sn,Pi);break;case 5:Nr(t,Sn,Pi);break;default:throw Error(he(329))}}}return wn(t,Lt()),t.callbackNode===n?yv.bind(null,t):null}function Od(t,e){var n=Ua;return t.current.memoizedState.isDehydrated&&(Br(t,e).flags|=256),t=Ql(t,e),t!==2&&(e=Sn,Sn=n,e!==null&&Bd(e)),t}function Bd(t){Sn===null?Sn=t:Sn.push.apply(Sn,t)}function jS(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ai(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function sr(t,e){for(e&=~hh,e&=~xc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ii(e),i=1<<n;t[n]=-1,e&=~i}}function rm(t){if(st&6)throw Error(he(327));Us();var e=Ul(t,0);if(!(e&1))return wn(t,Lt()),null;var n=Ql(t,e);if(t.tag!==0&&n===2){var i=cd(t);i!==0&&(e=i,n=Od(t,i))}if(n===1)throw n=ro,Br(t,0),sr(t,e),wn(t,Lt()),n;if(n===6)throw Error(he(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Nr(t,Sn,Pi),wn(t,Lt()),null}function mh(t,e){var n=st;st|=1;try{return t(e)}finally{st=n,st===0&&(Ws=Lt()+500,mc&&Er())}}function Wr(t){lr!==null&&lr.tag===0&&!(st&6)&&Us();var e=st;st|=1;var n=Vn.transition,i=dt;try{if(Vn.transition=null,dt=1,t)return t()}finally{dt=i,Vn.transition=n,st=e,!(st&6)&&Er()}}function gh(){bn=Rs.current,xt(Rs)}function Br(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,ES(n)),Ot!==null)for(n=Ot.return;n!==null;){var i=n;switch(Kf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&zl();break;case 3:Vs(),xt(Mn),xt(cn),sh();break;case 5:rh(i);break;case 4:Vs();break;case 13:xt(Mt);break;case 19:xt(Mt);break;case 10:eh(i.type._context);break;case 22:case 23:gh()}n=n.return}if(Yt=t,Ot=t=gr(t.current,null),Zt=bn=e,zt=0,ro=null,hh=xc=Gr=0,Sn=Ua=null,Ir!==null){for(e=0;e<Ir.length;e++)if(n=Ir[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Ir=null}return t}function Mv(t,e){do{var n=Ot;try{if(Qf(),Sl.current=$l,ql){for(var i=wt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}ql=!1}if(Vr=0,Xt=kt=wt=null,Da=!1,to=0,fh.current=null,n===null||n.return===null){zt=1,ro=e,Ot=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Zt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=o,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var u=f.alternate;u?(f.updateQueue=u.updateQueue,f.memoizedState=u.memoizedState,f.lanes=u.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=Xp(a);if(p!==null){p.flags&=-257,Yp(p,a,o,s,e),p.mode&1&&Wp(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var w=new Set;w.add(l),e.updateQueue=w}else v.add(l);break e}else{if(!(e&1)){Wp(s,c,e),vh();break e}l=Error(he(426))}}else if(yt&&o.mode&1){var g=Xp(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Yp(g,a,o,s,e),Zf(Gs(l,o));break e}}s=l=Gs(l,o),zt!==4&&(zt=2),Ua===null?Ua=[s]:Ua.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=sv(s,l,e);Bp(s,d);break e;case 1:o=l;var _=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(pr===null||!pr.has(y)))){s.flags|=65536,e&=-e,s.lanes|=e;var x=av(s,o,e);Bp(s,x);break e}}s=s.return}while(s!==null)}Tv(n)}catch(E){e=E,Ot===n&&n!==null&&(Ot=n=n.return);continue}break}while(!0)}function Ev(){var t=Kl.current;return Kl.current=$l,t===null?$l:t}function vh(){(zt===0||zt===3||zt===2)&&(zt=4),Yt===null||!(Gr&268435455)&&!(xc&268435455)||sr(Yt,Zt)}function Ql(t,e){var n=st;st|=2;var i=Ev();(Yt!==t||Zt!==e)&&(Pi=null,Br(t,e));do try{qS();break}catch(r){Mv(t,r)}while(!0);if(Qf(),st=n,Kl.current=i,Ot!==null)throw Error(he(261));return Yt=null,Zt=0,zt}function qS(){for(;Ot!==null;)wv(Ot)}function $S(){for(;Ot!==null&&!Sx();)wv(Ot)}function wv(t){var e=Cv(t.alternate,t,bn);t.memoizedProps=t.pendingProps,e===null?Tv(t):Ot=e,fh.current=null}function Tv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=VS(n,e),n!==null){n.flags&=32767,Ot=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{zt=6,Ot=null;return}}else if(n=HS(n,e,bn),n!==null){Ot=n;return}if(e=e.sibling,e!==null){Ot=e;return}Ot=e=t}while(e!==null);zt===0&&(zt=5)}function Nr(t,e,n){var i=dt,r=Vn.transition;try{Vn.transition=null,dt=1,KS(t,e,n,i)}finally{Vn.transition=r,dt=i}return null}function KS(t,e,n,i){do Us();while(lr!==null);if(st&6)throw Error(he(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(he(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(Px(t,s),t===Yt&&(Ot=Yt=null,Zt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ko||(ko=!0,Rv(Il,function(){return Us(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Vn.transition,Vn.transition=null;var a=dt;dt=1;var o=st;st|=4,fh.current=null,WS(t,n),xv(n,t),gS(md),Fl=!!pd,md=pd=null,t.current=n,XS(n),yx(),st=o,dt=a,Vn.transition=s}else t.current=n;if(ko&&(ko=!1,lr=t,Jl=r),s=t.pendingLanes,s===0&&(pr=null),wx(n.stateNode),wn(t,Lt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Zl)throw Zl=!1,t=Ud,Ud=null,t;return Jl&1&&t.tag!==0&&Us(),s=t.pendingLanes,s&1?t===Fd?Fa++:(Fa=0,Fd=t):Fa=0,Er(),null}function Us(){if(lr!==null){var t=s0(Jl),e=Vn.transition,n=dt;try{if(Vn.transition=null,dt=16>t?16:t,lr===null)var i=!1;else{if(t=lr,lr=null,Jl=0,st&6)throw Error(he(331));var r=st;for(st|=4,Pe=t.current;Pe!==null;){var s=Pe,a=s.child;if(Pe.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Pe=c;Pe!==null;){var f=Pe;switch(f.tag){case 0:case 11:case 15:Ia(8,f,s)}var h=f.child;if(h!==null)h.return=f,Pe=h;else for(;Pe!==null;){f=Pe;var u=f.sibling,p=f.return;if(gv(f),f===c){Pe=null;break}if(u!==null){u.return=p,Pe=u;break}Pe=p}}}var v=s.alternate;if(v!==null){var w=v.child;if(w!==null){v.child=null;do{var g=w.sibling;w.sibling=null,w=g}while(w!==null)}}Pe=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Pe=a;else e:for(;Pe!==null;){if(s=Pe,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ia(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Pe=d;break e}Pe=s.return}}var _=t.current;for(Pe=_;Pe!==null;){a=Pe;var y=a.child;if(a.subtreeFlags&2064&&y!==null)y.return=a,Pe=y;else e:for(a=_;Pe!==null;){if(o=Pe,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:_c(9,o)}}catch(E){Rt(o,o.return,E)}if(o===a){Pe=null;break e}var x=o.sibling;if(x!==null){x.return=o.return,Pe=x;break e}Pe=o.return}}if(st=r,Er(),vi&&typeof vi.onPostCommitFiberRoot=="function")try{vi.onPostCommitFiberRoot(uc,t)}catch{}i=!0}return i}finally{dt=n,Vn.transition=e}}return!1}function sm(t,e,n){e=Gs(n,e),e=sv(t,e,1),t=hr(t,e,1),e=hn(),t!==null&&(fo(t,1,e),wn(t,e))}function Rt(t,e,n){if(t.tag===3)sm(t,t,n);else for(;e!==null;){if(e.tag===3){sm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(pr===null||!pr.has(i))){t=Gs(n,t),t=av(e,t,1),e=hr(e,t,1),t=hn(),e!==null&&(fo(e,1,t),wn(e,t));break}}e=e.return}}function ZS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=hn(),t.pingedLanes|=t.suspendedLanes&n,Yt===t&&(Zt&n)===n&&(zt===4||zt===3&&(Zt&130023424)===Zt&&500>Lt()-ph?Br(t,0):hh|=n),wn(t,e)}function Av(t,e){e===0&&(t.mode&1?(e=bo,bo<<=1,!(bo&130023424)&&(bo=4194304)):e=1);var n=hn();t=Hi(t,e),t!==null&&(fo(t,e,n),wn(t,n))}function JS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Av(t,n)}function QS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(he(314))}i!==null&&i.delete(e),Av(t,n)}var Cv;Cv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Mn.current)yn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return yn=!1,zS(t,e,n);yn=!!(t.flags&131072)}else yn=!1,yt&&e.flags&1048576&&L0(e,Gl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Ml(t,e),t=e.pendingProps;var r=ks(e,cn.current);Is(e,n),r=oh(null,e,i,t,r,n);var s=lh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,En(i)?(s=!0,Hl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,nh(e),r.updater=vc,e.stateNode=r,r._reactInternals=e,wd(e,i,t,n),e=Cd(null,e,i,!0,s,n)):(e.tag=0,yt&&s&&$f(e),fn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Ml(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=ty(i),t=Zn(i,t),r){case 0:e=Ad(null,e,i,t,n);break e;case 1:e=$p(null,e,i,t,n);break e;case 11:e=jp(null,e,i,t,n);break e;case 14:e=qp(null,e,i,Zn(i.type,t),n);break e}throw Error(he(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),Ad(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),$p(t,e,i,r,n);case 3:e:{if(uv(e),t===null)throw Error(he(387));i=e.pendingProps,s=e.memoizedState,r=s.element,O0(t,e),Yl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Gs(Error(he(423)),e),e=Kp(t,e,i,n,r);break e}else if(i!==r){r=Gs(Error(he(424)),e),e=Kp(t,e,i,n,r);break e}else for(Ln=fr(e.stateNode.containerInfo.firstChild),Nn=e,yt=!0,Qn=null,n=U0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zs(),i===r){e=Vi(t,e,n);break e}fn(t,e,i,n)}e=e.child}return e;case 5:return B0(e),t===null&&yd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,gd(i,r)?a=null:s!==null&&gd(i,s)&&(e.flags|=32),cv(t,e),fn(t,e,a,n),e.child;case 6:return t===null&&yd(e),null;case 13:return dv(t,e,n);case 4:return ih(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Hs(e,null,i,n):fn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),jp(t,e,i,r,n);case 7:return fn(t,e,e.pendingProps,n),e.child;case 8:return fn(t,e,e.pendingProps.children,n),e.child;case 12:return fn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,gt(Wl,i._currentValue),i._currentValue=a,s!==null)if(ai(s.value,a)){if(s.children===r.children&&!Mn.current){e=Vi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ui(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Md(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(he(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Md(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}fn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Is(e,n),r=Gn(r),i=i(r),e.flags|=1,fn(t,e,i,n),e.child;case 14:return i=e.type,r=Zn(i,e.pendingProps),r=Zn(i.type,r),qp(t,e,i,r,n);case 15:return ov(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Zn(i,r),Ml(t,e),e.tag=1,En(i)?(t=!0,Hl(e)):t=!1,Is(e,n),rv(e,i,r),wd(e,i,r,n),Cd(null,e,i,!0,t,n);case 19:return fv(t,e,n);case 22:return lv(t,e,n)}throw Error(he(156,e.tag))};function Rv(t,e){return t0(t,e)}function ey(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Hn(t,e,n,i){return new ey(t,e,n,i)}function _h(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ty(t){if(typeof t=="function")return _h(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Of)return 11;if(t===Bf)return 14}return 2}function gr(t,e){var n=t.alternate;return n===null?(n=Hn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Tl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")_h(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case _s:return kr(n.children,r,s,e);case Ff:a=8,r|=8;break;case qu:return t=Hn(12,n,e,r|2),t.elementType=qu,t.lanes=s,t;case $u:return t=Hn(13,n,e,r),t.elementType=$u,t.lanes=s,t;case Ku:return t=Hn(19,n,e,r),t.elementType=Ku,t.lanes=s,t;case Bg:return Sc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Fg:a=10;break e;case Og:a=9;break e;case Of:a=11;break e;case Bf:a=14;break e;case tr:a=16,i=null;break e}throw Error(he(130,t==null?t:typeof t,""))}return e=Hn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function kr(t,e,n,i){return t=Hn(7,t,i,e),t.lanes=n,t}function Sc(t,e,n,i){return t=Hn(22,t,i,e),t.elementType=Bg,t.lanes=n,t.stateNode={isHidden:!1},t}function tu(t,e,n){return t=Hn(6,t,null,e),t.lanes=n,t}function nu(t,e,n){return e=Hn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function ny(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Fc(0),this.expirationTimes=Fc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Fc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function xh(t,e,n,i,r,s,a,o,l){return t=new ny(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Hn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},nh(s),t}function iy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:vs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function bv(t){if(!t)return xr;t=t._reactInternals;e:{if($r(t)!==t||t.tag!==1)throw Error(he(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(En(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(he(171))}if(t.tag===1){var n=t.type;if(En(n))return b0(t,n,e)}return e}function Pv(t,e,n,i,r,s,a,o,l){return t=xh(n,i,!0,t,r,s,a,o,l),t.context=bv(null),n=t.current,i=hn(),r=mr(n),s=Ui(i,r),s.callback=e??null,hr(n,s,r),t.current.lanes=r,fo(t,r,i),wn(t,i),t}function yc(t,e,n,i){var r=e.current,s=hn(),a=mr(r);return n=bv(n),e.context===null?e.context=n:e.pendingContext=n,e=Ui(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=hr(r,e,a),t!==null&&(ri(t,r,a,s),xl(t,r,a)),a}function ec(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function am(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Sh(t,e){am(t,e),(t=t.alternate)&&am(t,e)}function ry(){return null}var Lv=typeof reportError=="function"?reportError:function(t){console.error(t)};function yh(t){this._internalRoot=t}Mc.prototype.render=yh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(he(409));yc(t,e,null,null)};Mc.prototype.unmount=yh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Wr(function(){yc(null,t,null,null)}),e[zi]=null}};function Mc(t){this._internalRoot=t}Mc.prototype.unstable_scheduleHydration=function(t){if(t){var e=l0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<rr.length&&e!==0&&e<rr[n].priority;n++);rr.splice(n,0,t),n===0&&u0(t)}};function Mh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ec(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function om(){}function sy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=ec(a);s.call(c)}}var a=Pv(e,i,t,0,null,!1,!1,"",om);return t._reactRootContainer=a,t[zi]=a.current,Ka(t.nodeType===8?t.parentNode:t),Wr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=ec(l);o.call(c)}}var l=xh(t,0,!1,null,null,!1,!1,"",om);return t._reactRootContainer=l,t[zi]=l.current,Ka(t.nodeType===8?t.parentNode:t),Wr(function(){yc(e,l,n,i)}),l}function wc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=ec(a);o.call(l)}}yc(e,a,t,r)}else a=sy(n,e,t,r,i);return ec(a)}a0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ea(e.pendingLanes);n!==0&&(Hf(e,n|1),wn(e,Lt()),!(st&6)&&(Ws=Lt()+500,Er()))}break;case 13:Wr(function(){var i=Hi(t,1);if(i!==null){var r=hn();ri(i,t,1,r)}}),Sh(t,1)}};Vf=function(t){if(t.tag===13){var e=Hi(t,134217728);if(e!==null){var n=hn();ri(e,t,134217728,n)}Sh(t,134217728)}};o0=function(t){if(t.tag===13){var e=mr(t),n=Hi(t,e);if(n!==null){var i=hn();ri(n,t,e,i)}Sh(t,e)}};l0=function(){return dt};c0=function(t,e){var n=dt;try{return dt=t,e()}finally{dt=n}};ad=function(t,e,n){switch(e){case"input":if(Qu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=pc(i);if(!r)throw Error(he(90));zg(i),Qu(i,r)}}}break;case"textarea":Vg(t,n);break;case"select":e=n.value,e!=null&&Ps(t,!!n.multiple,e,!1)}};$g=mh;Kg=Wr;var ay={usingClientEntryPoint:!1,Events:[po,Ms,pc,jg,qg,mh]},ca={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},oy={bundleType:ca.bundleType,version:ca.version,rendererPackageName:ca.rendererPackageName,rendererConfig:ca.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Wi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Qg(t),t===null?null:t.stateNode},findFiberByHostInstance:ca.findFiberByHostInstance||ry,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zo.isDisabled&&zo.supportsFiber)try{uc=zo.inject(oy),vi=zo}catch{}}In.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ay;In.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Mh(e))throw Error(he(200));return iy(t,e,null,n)};In.createRoot=function(t,e){if(!Mh(t))throw Error(he(299));var n=!1,i="",r=Lv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=xh(t,1,!1,null,null,n,!1,i,r),t[zi]=e.current,Ka(t.nodeType===8?t.parentNode:t),new yh(e)};In.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(he(188)):(t=Object.keys(t).join(","),Error(he(268,t)));return t=Qg(e),t=t===null?null:t.stateNode,t};In.flushSync=function(t){return Wr(t)};In.hydrate=function(t,e,n){if(!Ec(e))throw Error(he(200));return wc(null,t,e,!0,n)};In.hydrateRoot=function(t,e,n){if(!Mh(t))throw Error(he(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=Lv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=Pv(e,null,t,1,n??null,r,!1,s,a),t[zi]=e.current,Ka(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Mc(e)};In.render=function(t,e,n){if(!Ec(e))throw Error(he(200));return wc(null,t,e,!1,n)};In.unmountComponentAtNode=function(t){if(!Ec(t))throw Error(he(40));return t._reactRootContainer?(Wr(function(){wc(null,null,t,!1,function(){t._reactRootContainer=null,t[zi]=null})}),!0):!1};In.unstable_batchedUpdates=mh;In.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Ec(n))throw Error(he(200));if(t==null||t._reactInternals===void 0)throw Error(he(38));return wc(t,e,n,!1,i)};In.version="18.3.1-next-f1338f8080-20240426";function Nv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Nv)}catch(t){console.error(t)}}Nv(),Ng.exports=In;var ly=Ng.exports,lm=ly;Yu.createRoot=lm.createRoot,Yu.hydrateRoot=lm.hydrateRoot;const cy=[{id:"learning",en:"Learning",th:"การเรียนการสอน",icon:"book",color:"#a78bfa"},{id:"space",en:"Space Usage",th:"การใช้พื้นที่",icon:"grid",color:"#818cf8"},{id:"activity",en:"Student Activity",th:"กิจกรรมนักศึกษา",icon:"users",color:"#c084fc"},{id:"resources",en:"Resources",th:"ทรัพยากร / บริการ",icon:"layers",color:"#38bdf8"},{id:"environment",en:"Environment",th:"สภาพแวดล้อม",icon:"leaf",color:"#34d399"},{id:"energy",en:"Energy",th:"พลังงาน",icon:"bolt",color:"#fbbf24"}];Object.fromEntries(cy.map(t=>[t.id,t]));const uy=[{id:"morning",th:"เช้า",en:"Morning",icon:"sun-up",center:9.5,half:1.5,concurrency:.34,becauseTh:"สอดคล้องกับคาบเรียนแรกและช่วงที่นักศึกษาทยอยเข้าคณะ"},{id:"midday",th:"กลางวัน",en:"Day",icon:"sun",center:12,half:2,concurrency:.38,becauseTh:"สอดคล้องกับช่วงพักกลางวันและการเปลี่ยนคาบเรียนติดกัน"},{id:"evening",th:"เย็น",en:"Evening",icon:"moon",center:16.5,half:1.5,concurrency:.32,becauseTh:"สอดคล้องกับคาบบ่ายท้ายวันและการรวมกลุ่มทำงานส่ง"},{id:"event",th:"ช่วงกิจกรรมพิเศษ",en:"Event",icon:"calendar",center:14,half:2.5,concurrency:.46,becauseTh:"สอดคล้องกับวันที่มีกิจกรรมคณะซ้อนกับตารางเรียนปกติ"},{id:"unsure",th:"ไม่แน่ใจ",en:"Not sure",icon:"question",center:12,half:2,concurrency:.38,becauseTh:"เป็นช่วงที่ตารางสอนของคณะหนาที่สุดจากข้อมูลที่กรอกมา"}],cm=Object.fromEntries(uy.map(t=>[t.id,t])),Dv=[{id:"students",th:"จำนวนนักศึกษา +15%",icon:"users",people:1.15,activity:1,usable:1},{id:"activity",th:"กิจกรรม +20%",icon:"calendar",people:1,activity:1.2,usable:1},{id:"closed",th:"พื้นที่บางส่วนใช้งานไม่ได้",icon:"alert",people:1,activity:1,usable:.85},{id:"event",th:"วันจัดกิจกรรมพิเศษ",icon:"star",people:1.12,activity:1.15,usable:1},{id:"custom",th:"กำหนดเอง",icon:"grid",people:1.1,activity:1.1,usable:1}],dy=Object.fromEntries(Dv.map(t=>[t.id,t])),Ho=[{id:"class",th:"ห้องเรียน",color:"#60a5fa",demandShare:.42,capacityShare:.52,offset:-.5},{id:"group",th:"พื้นที่ทำงานกลุ่ม",color:"#34d399",demandShare:.26,capacityShare:.18,offset:.8},{id:"event",th:"พื้นที่กิจกรรม",color:"#fbbf24",demandShare:.18,capacityShare:.17,offset:1.6},{id:"lounge",th:"พื้นที่พักผ่อน",color:"#f472b6",demandShare:.14,capacityShare:.13,offset:.2}],um=8,dm=18,fy=.5,hy=2.2,py=2.9,my=32,gy=2.3,vy=.77,iu=[[0,[56,132,248]],[.35,[45,212,191]],[.6,[250,204,21]],[.8,[249,115,22]],[1,[239,68,68]]];function _y(t){const e=Math.min(1,Math.max(0,t));for(let n=1;n<iu.length;n++){const[i,r]=iu[n-1],[s,a]=iu[n];if(e>s)continue;const o=s===i?0:(e-i)/(s-i),l=r.map((c,f)=>Math.round(c+(a[f]-c)*o));return`rgb(${l[0]}, ${l[1]}, ${l[2]})`}return"rgb(239, 68, 68)"}const ua=11,ru=5.5,wi=3,St=12,Rn=4,Vo=.12,Iv=4,fm=[0,1,3,2,0,1,3,0,2],Go=t=>t%Rn===Rn-1,Wo=t=>Math.floor(t/Rn);function Uv(t){return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function hm(t,e,n){const i=[],r=(h,u,p,v)=>i.push({dx:h,dy:u,r:p,l:v});if(t===2){const h=-e*.42;for(let u=0;u<3;u++)r((u-1)*e*.46+(n()-.5)*e*.16,h+(n()-.5)*e*.2,e*(.5+n()*.12),0);return r(e*.3,h+e*.2,e*.42,1),r(-e*.32,h-e*.22,e*.3,2),{trunk:0,puffs:i}}const s=t===1,a=s?e*.85:e*.55,o=-(a+e*(s?.95:.72)),l=s?e*.3:e*.52,c=s?e*.62:e*.3,f=s?5:7;for(let h=0;h<f;h++){const u=h/f*Math.PI*2+n()*.5;r(Math.cos(u)*l*(.6+n()*.5),Math.sin(u)*c*(.6+n()*.5),e*(s?.52:.6)*(.85+n()*.3),0)}return r(0,0,e*(s?.6:.68),0),r(e*.34,e*(s?.42:.3),e*(s?.42:.5),1),r(-e*.3,-e*(s?.5:.36),e*(s?.34:.42),2),r(-e*.05,-e*(s?.78:.56),e*.26,2),{trunk:a,puffs:i.map(h=>({...h,dy:h.dy+o}))}}const{LOTS:xy,GROVES:Sy}=(()=>{const t=Uv(20260921),e=new Set,n=[],i=[],r=(a,o)=>a+":"+o,s=(a,o)=>a<St&&o<St&&!Go(a)&&!Go(o)&&!e.has(r(a,o));for(let a=0;a<St;a++)for(let o=0;o<St;o++){if(Go(o)||Go(a)){if(t()<.26){const c=3.8+t()*1.5,f=t()<.28?1:t()<.2?2:0;i.push({gx:o+.5,gy:a+.5,r:c,tone:t()*3|0,...hm(f,c,t)})}continue}if(e.has(r(o,a)))continue;const l=t();if(l<.64){let c=1,f=1;t()<.3&&s(o+1,a)?(c=2,e.add(r(o+1,a))):t()<.3&&s(o,a+1)&&(f=2,e.add(r(o,a+1)));const h=1+Math.floor(t()*Iv);n.push({gx:o,gy:a,w:c,d:f,lv:h,tone:t()*4|0,cap:h>=2&&t()<.55,capX:t(),capY:t()})}else if(l<.77){const c=4.4+t()*2,f=t()<.32?1:t()<.18?2:0;i.push({gx:o+.5,gy:a+.5,r:c,tone:t()*3|0,...hm(f,c,t)})}e.add(r(o,a))}return{LOTS:n,GROVES:i}})(),yy=1.5,su=.34,My=.5,Tr=(t,e,n)=>Math.min(n,Math.max(e,t)),au=(t,e)=>Number.isFinite(t)&&t>0?t:e,da=t=>{const e=Math.floor(t),n=Math.round((t-e)*60);return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`},ou=(t,e)=>{const n=t-e,i=n<0?hy:py;return Math.exp(-(n*n)/(2*i*i))};function pm(t){const e=cm[t.peak]??cm.midday,n=t.focus.length?t.focus:["learning","space"],i=O=>n.includes(O),r=Math.max(au(t.students,2500),1),s=Math.max(Math.round(au(t.rooms,35)),1),a=Math.max(Math.round(au(t.activities,80)),1),o=dy[t.scenario]??Dv[0],l=`${da(e.center-e.half)} – ${da(e.center+e.half)}`,c=Math.round(r*e.concurrency),f=s*my,h=Tr(a/(s*gy),.6,1.8),u=Math.round(c/f*h*100),p=Ho.map(O=>({k:O,load:u/100*(O.demandShare/O.capacityShare)})),v=Math.max(...p.map(O=>O.load),.01),w=p.map(({k:O,load:re})=>{const ue=Tr(re/v,.12,1);return{th:O.th,load:ue,color:O.color,heatColor:_y(ue),rooms:Math.max(1,Math.round(s*O.capacityShare))}}),g=p.reduce((O,re)=>re.load>O.load?re:O),d=g.k.th,_=O=>Tr(p[O].load/yy,.05,1),y=St*ua,x=Iv*wi+ru,E={w:Math.round(2*St*ua),h:Math.round(x+2*St*ru)},T=(O,re)=>Math.round((y+(O-re)*ua)*10)/10,C=(O,re,ue=0)=>Math.round((x+(O+re)*ru-ue)*10)/10,m=(O,re,ue=0)=>`${T(O,re)},${C(O,re,ue)}`,R=[m(0,0),m(St,0),m(St,St),m(0,St)].join(" "),L=[];for(let O=Rn-1;O<St;O+=Rn)L.push(O);const N=.2,F=O=>L.some(re=>O>=re-.05&&O<=re+1.05),W=[],D=[],G=[],te=[];for(const O of L){W.push([m(O,0),m(O+1,0),m(O+1,St),m(O,St)].join(" ")),W.push([m(0,O),m(St,O),m(St,O+1),m(0,O+1)].join(" "));const re=O+N,ue=O+1-N;D.push([m(re,0),m(ue,0),m(ue,St),m(re,St)].join(" ")),D.push([m(0,re),m(St,re),m(St,ue),m(0,ue)].join(" "));const P=O+.5-.035,se=O+.5+.035;for(let j=0;j<St;j+=.7){const ve=Math.min(j+.34,St);F(j)||F(ve)||(G.push([m(P,j),m(se,j),m(se,ve),m(P,ve)].join(" ")),G.push([m(j,P),m(j,se),m(ve,se),m(ve,P)].join(" ")))}}const Y=4,H=(O,re)=>{const ue=1-N*2;return[re+N+ue*(O+.18)/Y,re+N+ue*(O+.72)/Y]};for(const O of L)for(const re of L){if(re-.42>0)for(let ue=0;ue<Y;ue++){const[P,se]=H(ue,O);te.push([m(P,re-.42),m(se,re-.42),m(se,re-.16),m(P,re-.16)].join(" "))}if(O-.42>0)for(let ue=0;ue<Y;ue++){const[P,se]=H(ue,re);te.push([m(O-.42,P),m(O-.42,se),m(O-.16,se),m(O-.16,P)].join(" "))}}const k=(O,re)=>fm[Wo(re)*3+Wo(O)]??0,X=(O,re)=>{const ue=(St-1)/2,P=1-(Math.abs(O-ue)+Math.abs(re-ue))/(St*1.1);return Tr(_(k(O,re))*(.82+.18*P),.05,1)},q=[],de=(O,re,ue,P,se,j)=>({top:[m(O,re,se+j),m(ue,re,se+j),m(ue,P,se+j),m(O,P,se+j)].join(" "),right:[m(ue,re,se+j),m(ue,P,se+j),m(ue,P,se),m(ue,re,se)].join(" "),left:[m(ue,P,se+j),m(O,P,se+j),m(O,P,se),m(ue,P,se)].join(" ")});for(const O of xy){const re=O.gx+Vo,ue=O.gy+Vo,P=O.gx+O.w-Vo,se=O.gy+O.d-Vo,j=O.lv*wi,ve=(qe,$e)=>{const Dt=[],Bt=Math.max(1,Math.round(qe*2.4)),So=qe/Bt;for(let Zr=0;Zr<O.lv;Zr++){const yo=Zr*wi+wi*.32,ta=Zr*wi+wi*.74;for(let Jr=0;Jr<Bt;Jr++)Dt.push($e(So*(Jr+.26),So*(Jr+.74),yo,ta))}return Dt},_e=O.cap?.26:0,oe=re+(P-re-_e)*O.capX,Le=ue+(se-ue-_e)*O.capY,Ce=.07;q.push({t:"b",d:O.gx+O.gy,lv:O.lv,tone:O.tone,district:Wo(O.gy)*3+Wo(O.gx),gx:re,gy:ue,gw:P-re,gd:se-ue,heat:Math.round(X(O.gx,O.gy)*100)/100,kindTh:Ho[k(O.gx,O.gy)].th,faceTop:[m(re,ue,j),m(P,ue,j),m(P,se,j),m(re,se,j)].join(" "),faceRight:[m(P,ue,j),m(P,se,j),m(P,se),m(P,ue)].join(" "),faceLeft:[m(P,se,j),m(re,se,j),m(re,se),m(P,se)].join(" "),roofIn:[m(re+Ce,ue+Ce,j),m(P-Ce,ue+Ce,j),m(P-Ce,se-Ce,j),m(re+Ce,se-Ce,j)].join(" "),winLeft:ve(P-re,(qe,$e,Dt,Bt)=>[m(re+qe,se,Bt),m(re+$e,se,Bt),m(re+$e,se,Dt),m(re+qe,se,Dt)].join(" ")),winRight:ve(se-ue,(qe,$e,Dt,Bt)=>[m(P,ue+qe,Bt),m(P,ue+$e,Bt),m(P,ue+$e,Dt),m(P,ue+qe,Dt)].join(" ")),roofBox:O.cap?de(oe,Le,oe+_e,Le+_e,j,wi*.6):null})}for(const O of Sy){const re=T(O.gx,O.gy),ue=C(O.gx,O.gy),P=j=>Math.round(j*10)/10,se=O.r*.17;q.push({t:"g",d:O.gx+O.gy,gx:O.gx,gy:O.gy,gr:Math.round(O.r/ua*1e3)/1e3,tone:O.tone,x:re,y:ue,r:P(O.r),trunk:P(O.trunk),trunkPts:O.trunk?[`${P(re-se)},${P(ue)}`,`${P(re+se)},${P(ue)}`,`${P(re+se*.62)},${P(ue-O.trunk)}`,`${P(re-se*.62)},${P(ue-O.trunk)}`].join(" "):"",puffs:O.puffs.map(j=>({cx:P(re+j.dx),cy:P(ue+j.dy),r:P(j.r),l:j.l}))})}q.sort((O,re)=>O.d-re.d);const ce=fm.map((O,re)=>X(re%3*Rn+1,(re/3|0)*Rn+1)),Oe=Math.min(...ce),Q=Math.max(...ce),le=Q-Oe<.02?0:Oe+My*(Q-Oe),z=Math.max(su,le),Z=O=>O>=.78?"Hot":O>=.52?"Warm":"Mild",fe=[],Me=Uv(4127);ce.forEach((O,re)=>{if(O<z)return;const ue=Tr((O-su)/(1-su),0,1),P=re%3*Rn+1,se=(re/3|0)*Rn+1,j=[],ve=(_e,oe,Le,Ce)=>{const qe=Math.round(Le*ua*10)/10;j.push({x:T(_e,oe),y:C(_e,oe,wi*.9),rx:qe,ry:Math.round(qe*.58*10)/10,opacity:Math.round(Ce*100)/100})};ve(P,se,1.5+ue*.5,.94+ue*.06);for(let _e=0;_e<4;_e++){const oe=_e/4*Math.PI*2+Me()*1.4,Le=.5+Me()*.75;ve(P+Math.cos(oe)*Le,se+Math.sin(oe)*Le,.6+Me()*.5,.62+ue*.3)}fe.push({tier:Z(O),delay:-Math.round(re*.53*100)/100,blobs:j})});const ge=ce.reduce((O,re,ue)=>re>ce[O]?ue:O,0),Ie={x:T(ge%3*Rn+1,(ge/3|0)*Rn+1),y:C(ge%3*Rn+1,(ge/3|0)*Rn+1,wi*.9)},it={x:Math.round(Ie.x/E.w*1e3)/10,y:Math.round(Ie.y/E.h*1e3)/10},He=[];for(let O=um;O<=dm+1e-9;O+=fy)He.push({at:Math.round(O*10)/10,value:Math.round(ou(O,e.center)*1e3)/1e3,label:Number.isInteger(O)&&O%2===0?`${O}:00`:""});const pe=t.nowHour??e.center,Ge=Tr(Math.round(pe),um,Math.floor(dm)),Be=da(Ge),Xe=ou(Ge,e.center)>=.7?`${d}กำลังถูกใช้หนักที่สุด ${e.becauseTh} ขณะที่พื้นที่ประเภทอื่นยังรับได้อีก`:`ยังไม่ถึงช่วงที่ความต้องการสูงที่สุด (${l}) ตอนนี้ยังจัดพื้นที่ได้คล่อง`,Nt=u>=85?`ความต้องการพื้นที่กำลังสูงเกินสิ่งที่คณะมี โดยกระจุกที่${d}ในช่วง ${l}`:"ความต้องการพื้นที่ที่ไม่ได้สูงทั้งคณะ แต่กำลังกระจุกตัวในบางพื้นที่และบางช่วงเวลา",ct=[{icon:"calendar",th:"ตารางเรียน",en:"Class Schedule",color:"#a78bfa"},{icon:"users",th:"การเคลื่อนย้ายนักศึกษา",en:"Student Movement",color:"#c084fc"},{icon:"building",th:"ความต้องการพื้นที่",en:"Space Demand",color:"#818cf8"},{icon:"layers",th:"การใช้ทรัพยากร",en:"Resource Usage",color:"#38bdf8"}],Ct="ช่วงเปลี่ยนคาบเรียนทำให้ความต้องการพื้นที่กระจุกตัวในบางพื้นที่ และประเภทกิจกรรมมากกว่า Capacity โดยรวมของคณะ"+(i("resources")?" ทรัพยากรและบริการจึงถูกเรียกใช้พร้อมกันในเวลาเดียว":"")+(i("energy")?" และดันค่าไฟให้ขึ้นเป็นยอดแหลมแทนที่จะเรียบทั้งวัน":""),U=t.custom,Gt=o.id==="custom"&&U?1+U.people/100:o.people,ot=o.id==="custom"&&U?1+U.activity/100:o.activity,b=1+vy*h,S=Math.pow(Gt,b)*ot/o.usable,V=Math.round((S-1)*100),J=Ho.map(O=>{const re=O.demandShare/O.capacityShare;return{th:O.th,color:O.color,points:He.map(ue=>({at:ue.at,value:Math.round(Tr(ou(ue.at,e.center+O.offset)*(u/100)*re*S,0,3)*1e3)/1e3}))}}),me=J[Ho.indexOf(g.k)].points.filter(O=>O.value>=1),xe=me.length?me[0].at:e.center-e.half,ie=me.length?me[me.length-1].at:e.center+e.half,ae=`เกิด Pressure ก่อนใน${d} (${da(xe)} – ${da(ie)})`,Se="กระจายความต้องการใช้พื้นที่ ก่อนการเพิ่ม Capacity",Ue=`ความต้องการใช้พื้นที่เชื่อมโยงกับช่วงเวลาเรียนและประเภทกิจกรรม มากกว่า Capacity โดยรวม — ${d}เต็มก่อนทั้งที่พื้นที่รวมของคณะยังเหลือ`,Ee="ปรับตาราง การใช้พื้นที่ และการจัดกิจกรรมให้กระจายตัวมากขึ้น"+(i("activity")?" โดยเลื่อนกิจกรรมนักศึกษาออกจากช่วงเปลี่ยนคาบ":"")+(i("learning")?" และสลับคาบที่ใช้พื้นที่ประเภทเดียวกันให้ไม่ชนกัน":"");return{students:r,rooms:s,activities:a,peakWindow:l,peakGuessed:e.id==="unsure",insightTh:Nt,peakConcurrent:c,spaceLoadPct:u,zones:w,campusItems:q,campusGround:R,campusStreets:W,campusRoads:D,campusLanes:G,campusCrossings:te,campusRing:Ie,campusBox:E,campusHot:it,campusHeat:fe,hours:He,nowHour:Ge,nowLabel:Be,nowTh:Xe,relations:ct,mayHappenTh:Ct,simDeltaPct:V,series:J,pressureFrom:xe,pressureTo:ie,pressureTh:ae,tightKindTh:d,recTitleTh:Se,whyTh:Ue,actionTh:Ee,impactTh:"ลดความหนาแน่นในช่วง Peak ทำให้พื้นที่ที่มีอยู่มีประสิทธิภาพ รองรับกิจกรรมได้มากขึ้น โดยยังไม่ต้องเพิ่มพื้นที่ทันที"}}const ns={students:2500,rooms:35,activities:80,focus:["learning","space"],peak:"midday",scenario:"today"},lu=(t,e)=>{const n=Number(t);return Number.isFinite(n)&&n>0?n:e},Ey=(t,e)=>{if(!t)return e;const n=String(t).split(",").filter(Boolean);return n.length?n:e};function wy(t){const e=new URLSearchParams(t||"");return{cameFromOrganize:[...e.keys()].length>0,org:e.get("o")||"faculty",input:{students:lu(e.get("p"),ns.students),rooms:lu(e.get("c"),ns.rooms),activities:lu(e.get("ac"),ns.activities),focus:Ey(e.get("ff"),ns.focus),peak:e.get("fk")||ns.peak,scenario:e.get("fs")||ns.scenario}}}function Ty(t){const e=new URLSearchParams(t||"");return e.set("step","3"),e.get("o")||e.set("o","faculty"),`/MomaySurpriseOrganizeV2?${e}`}const mm=4,go=t=>({gx:t%3*mm+1.5,gy:Math.floor(t/3)*mm+1.5});function Ay(t){const e=t.hours.map(n=>n.at);return{min:Math.ceil(Math.min(...e)),max:Math.floor(Math.max(...e))}}const Js={gx:5.5,gy:10.5},Fv=45,Ov=80;function Bv(t,e){const n=Math.abs(e.gx-t.gx)+Math.abs(e.gy-t.gy),i=Math.round(n*Fv/10)*10;return{meters:i,minutes:Math.max(1,Math.round(i/Ov))}}const kv=[{id:"learn",en:"LEARN",th:"ไปเรียน",icon:"cap",askTh:"คุณมีคาบเรียนช่วงนี้ใช่ไหม",leadTh:"คุณกำลังจะไปเรียน"},{id:"study",en:"STUDY",th:"หาที่อ่าน/ทำงาน",icon:"book",askTh:"อยากได้ที่เงียบ ๆ นั่งได้ยาว ๆ",leadTh:"คุณต้องการหาที่ STUDY"},{id:"collab",en:"COLLABORATE",th:"ทำงานกลุ่ม",icon:"users",askTh:"มากันหลายคน ต้องคุยกันได้",leadTh:"คุณต้องการที่ทำงานกลุ่ม"},{id:"meet",en:"MEET",th:"พบอาจารย์/บริการ",icon:"chat",askTh:"ติดต่ออาจารย์หรืองานธุรการ",leadTh:"คุณต้องการพบอาจารย์หรือใช้บริการ"},{id:"activity",en:"ACTIVITY",th:"กิจกรรมคณะ",icon:"star",askTh:"มาร่วมกิจกรรมหรือหาที่จัดงาน",leadTh:"คุณกำลังมองหากิจกรรม"},{id:"explore",en:"EXPLORE",th:"ดูสิ่งที่เกิดขึ้นในคณะ",icon:"compass",askTh:"ยังไม่มีอะไรเจาะจง ขอดูรอบ ๆ ก่อน",leadTh:"คุณกำลังสำรวจคณะ"}],fa=Object.fromEntries(kv.map(t=>[t.id,t])),Cy=[{id:"lecture3",shortTh:"อาคารเรียน 3",th:"อาคารเรียนรวม 3",district:0},{id:"student",shortTh:"อาคารกิจกรรม",th:"อาคารกิจกรรมนักศึกษา",district:1},{id:"garden",shortTh:"สวนพักผ่อน",th:"พื้นที่สีเขียวด้านข้างคณะ",district:2},{id:"plaza",shortTh:"ลานกิจกรรม",th:"ลานกิจกรรมคณะ",district:3},{id:"social",shortTh:"อาคารคณะ",th:"อาคารคณะสังคมศาสตร์",district:4},{id:"library",shortTh:"หอสมุด",th:"หอสมุด มน.",district:5},{id:"research",shortTh:"อาคารวิจัย",th:"อาคารวิจัยและบัณฑิตศึกษา",district:6},{id:"lab",shortTh:"อาคารปฏิบัติการ",th:"อาคารปฏิบัติการ",district:7},{id:"canteen",shortTh:"ศูนย์อาหาร",th:"ศูนย์อาหารคณะ",district:8}],zv=Object.fromEntries(Cy.map(t=>[t.id,t])),Ry=[{id:"read",th:"โซนพื้นที่อ่าน",building:"social",kind:1,seats:120,quiet:.85,outdoor:!1,tone:"warm",amenities:["seat","plug","wifi","light","silent","wc"],photo:"library-open",fits:{study:1,learn:.3,collab:.45,meet:.35,activity:.1,explore:.6},suitTh:["อ่านหนังสือ","ทำงานเดี่ยว","ทำงานกลุ่มเล็ก"],noteTh:"เงียบ เหมาะสำหรับทำงาน"},{id:"facclass",th:"ห้องเรียนคณะ",building:"social",kind:0,seats:90,quiet:.4,outdoor:!1,tone:"cool",amenities:["seat","plug","wifi","screen","wc"],fits:{learn:.9,meet:.5,study:.3,collab:.3,activity:.2,explore:.35},suitTh:["เข้าเรียน","ติวกลุ่ม"],noteTh:"ว่างช่วงพักคาบ"},{id:"cowork",th:"Co-Working Zone",building:"student",kind:1,seats:90,quiet:.45,outdoor:!1,tone:"cool",amenities:["seat","plug","wifi","board"],photo:"meeting",fits:{collab:1,study:.65,learn:.2,meet:.35,activity:.45,explore:.7},suitTh:["ทำงานกลุ่ม","ระดมความคิด","ประชุมย่อย"],noteTh:"มีปลั๊กไฟ คุยกันได้"},{id:"club",th:"ห้องชมรม",building:"student",kind:2,seats:70,quiet:.3,outdoor:!1,tone:"violet",amenities:["seat","wifi","board"],photo:"meeting",fits:{activity:.9,collab:.6,explore:.65,meet:.3,study:.15,learn:.1},suitTh:["กิจกรรมชมรม","ซ้อมงาน"],noteTh:"ใช้จัดกิจกรรมชมรม"},{id:"outdoor",th:"พื้นที่ Outdoor",building:"garden",kind:3,seats:60,quiet:.5,outdoor:!0,tone:"green",amenities:["seat","wifi","green"],photo:"garden",fits:{study:.55,collab:.7,explore:.9,activity:.5,learn:.1,meet:.15},suitTh:["นั่งพัก","ทำงานกลุ่ม","คุยเล่น"],noteTh:"อากาศดี บรรยากาศธรรมชาติ"},{id:"plazamain",th:"ลานกิจกรรมกลาง",building:"plaza",kind:2,seats:300,quiet:.15,outdoor:!0,tone:"green",amenities:["seat","wifi","green","stage"],photo:"garden",fits:{activity:1,explore:.85,collab:.4,study:.15,learn:.1,meet:.2},suitTh:["ร่วมกิจกรรม","ชมงาน"],noteTh:"มีงานกิจกรรม"},{id:"hall",th:"ห้องบรรยายรวม",building:"lecture3",kind:0,seats:180,quiet:.35,outdoor:!1,tone:"cool",amenities:["seat","plug","wifi","screen","wc"],fits:{learn:1,meet:.45,study:.3,collab:.25,activity:.3,explore:.4},suitTh:["เข้าเรียน","ฟังบรรยาย"],noteTh:"ห้องเรียนหลักของคณะ"},{id:"libquiet",th:"โซนอ่านเงียบ",building:"library",kind:1,seats:240,quiet:.95,outdoor:!1,tone:"warm",amenities:["seat","plug","wifi","silent","book","wc"],photo:"library-read",fits:{study:.95,learn:.35,collab:.2,meet:.15,activity:.05,explore:.5},suitTh:["อ่านหนังสือ","ค้นคว้า"],noteTh:"มีที่นั่งเพียงพอ"},{id:"libgroup",th:"โซนค้นคว้ากลุ่ม",building:"library",kind:1,seats:60,quiet:.55,outdoor:!1,tone:"warm",amenities:["seat","plug","wifi","board","book"],photo:"meeting",fits:{collab:.85,study:.7,learn:.3,meet:.35,activity:.1,explore:.45},suitTh:["ทำงานกลุ่ม","ค้นคว้า"],noteTh:"จองล่วงหน้าได้"},{id:"quiet",th:"Quiet Zone",building:"research",kind:1,seats:48,quiet:1,outdoor:!1,tone:"violet",amenities:["seat","plug","wifi","silent"],photo:"library-open",fits:{study:1,learn:.15,collab:.1,meet:.2,activity:.05,explore:.35},suitTh:["อ่านหนังสือ","ทำงานเดี่ยว"],noteTh:"คนน้อย เหมาะสำหรับอ่าน"},{id:"computer",th:"ห้องคอมพิวเตอร์",building:"lab",kind:0,seats:110,quiet:.6,outdoor:!1,tone:"violet",amenities:["seat","plug","wifi","screen"],fits:{learn:.7,study:.7,collab:.55,meet:.2,activity:.1,explore:.4},suitTh:["ใช้คอมพิวเตอร์","ทำงานเดี่ยว"],noteTh:"มีเครื่องคอมพิวเตอร์ให้ใช้"},{id:"office",th:"สำนักงานคณะ",building:"social",kind:0,seats:24,quiet:.7,outdoor:!1,tone:"violet",photo:"office",amenities:["seat","wifi","desk","wc"],suitTh:["ติดต่องานทะเบียน","นัดพบอาจารย์","ยื่นเอกสาร"],fits:{meet:1,learn:.15,study:.2,collab:.15,activity:.1,explore:.35},noteTh:"งานทะเบียนและธุรการ เปิดถึง 16:30 น."},{id:"canteenmain",th:"โซนนั่งรับประทาน",building:"canteen",kind:3,seats:200,quiet:.2,outdoor:!1,tone:"warm",amenities:["seat","wifi","plug","wc"],fits:{explore:.8,collab:.6,activity:.65,study:.3,meet:.35,learn:.1},suitTh:["พักกินข้าว","นั่งคุย"],noteTh:"ช่วงพักเที่ยงคนแน่นที่สุด"}],bt=t=>zv[t.building],by=["ห้องเรียน","พื้นที่ทำงานกลุ่ม","พื้นที่กิจกรรม","พื้นที่พักผ่อน"],Xs=Ry,gm={seat:{th:"ที่นั่ง",icon:"seat"},wc:{th:"ห้องน้ำใกล้เคียง",icon:"wc"},plug:{th:"ปลั๊กไฟ",icon:"plug"},wifi:{th:"Wi-Fi",icon:"wifi"},light:{th:"แสงสว่างเหมาะสม",icon:"sun"},silent:{th:"โซนเงียบ",icon:"silent"},board:{th:"ไวท์บอร์ด",icon:"board"},green:{th:"พื้นที่สีเขียว",icon:"leaf"},book:{th:"หนังสืออ้างอิง",icon:"book"},screen:{th:"จอฉายภาพ",icon:"screen"},stage:{th:"เวทีกิจกรรม",icon:"star"},desk:{th:"เคาน์เตอร์บริการ",icon:"desk"}};function Ys(t,e,n){const i=e.kind,r=t.series[i];if(!r||!r.points.length)return 0;const a=r.points.reduce((h,u)=>Math.abs(u.at-n)<Math.abs(h.at-n)?u:h,r.points[0]).value,o=go(bt(e).district),l=5.5,c=1-(Math.abs(o.gx-l)+Math.abs(o.gy-l))/13.2,f=a*(.82+.18*c)*(1-e.quiet*.3);return Math.min(1,Math.max(0,f))}const Eh=(t,e)=>Math.max(0,Math.round(t.seats*(1-e)));function vr(t){return t<.35?{th:"ไม่หนาแน่น",tone:"ok"}:t<.7?{th:"ปานกลาง",tone:"mid"}:{th:"หนาแน่น",tone:"hot"}}function Py(t,e,n){const i=e==="activity"||e==="explore";return Xs.map(r=>{const s=Ys(t,r,n),a=Bv(Js,go(bt(r).district)),o=r.fits[e]??0,l=i?s:1-s,c=1-Math.min(1,a.minutes/12),f=e==="study"?r.quiet:0,h=o*1+l*.55+c*.3+f*.25;return{space:r,load:s,walk:a,fit:o,score:h,free:Eh(r,s),crowd:vr(s)}}).filter(r=>r.fit>.12).sort((r,s)=>s.score-r.score)}function Ly(t,e){const{space:n,load:i,walk:r}=t,s=[];return s.push({ok:i<.7,th:i<.35?"คนไม่หนาแน่น":i<.7?"คนปานกลาง ยังหาที่นั่งได้":"ตอนนี้คนค่อนข้างแน่น"}),s.push({ok:t.free>8,th:t.free>8?`มีที่นั่งเพียงพอ (ว่างราว ${t.free} ที่)`:`ที่นั่งเหลือน้อย (ราว ${t.free} ที่)`}),e==="study"?s.push({ok:n.quiet>=.7,th:n.quiet>=.7?"เงียบ เหมาะสำหรับทำงาน":"มีเสียงรบกวนบ้าง"}):e==="collab"?s.push({ok:n.quiet<.7,th:n.quiet<.7?"คุยกันได้ ไม่รบกวนใคร":"เป็นโซนเงียบ คุยกันไม่สะดวก"}):e==="activity"?s.push({ok:i>.4,th:i>.4?"มีคนร่วมกิจกรรมอยู่แล้ว":"ตอนนี้ยังเงียบ กิจกรรมน่าจะยังไม่เริ่ม"}):s.push({ok:!0,th:n.noteTh}),s.push({ok:r.minutes<=7,th:r.minutes<=7?`เดินถึงใน ${r.minutes} นาที`:`ต้องเดิน ${r.minutes} นาที (${r.meters} เมตร)`}),s}const tc=[3.5,7.5,11.5],vm=t=>tc.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e,tc[0]);function Ny(t,e){const n=l=>{const c=[];for(const f of l){const h=c[c.length-1];(!h||Math.abs(h.gx-f.gx)>.02||Math.abs(h.gy-f.gy)>.02)&&c.push(f)}return c},i=l=>tc.some(c=>Math.abs(c-l)<.02),r=l=>l.slice(1).reduce((c,f,h)=>{const u=l[h],p=Math.abs(f.gx-u.gx),v=Math.abs(f.gy-u.gy),w=p<.02&&i(u.gx)||v<.02&&i(u.gy);return c+(p+v)*(w?1:6)},0),s=l=>tc.flatMap(c=>[{axis:"x",at:{gx:c,gy:l.gy}},{axis:"y",at:{gx:l.gx,gy:c}}]),a=(l,c,f,h)=>{if(f!==h)return f==="x"?[{gx:l.gx,gy:c.gy}]:[{gx:c.gx,gy:l.gy}];if(f==="x"&&Math.abs(l.gx-c.gx)<.02)return[];if(f==="y"&&Math.abs(l.gy-c.gy)<.02)return[];if(f==="x"){const p=vm((l.gy+c.gy)/2);return[{gx:l.gx,gy:p},{gx:c.gx,gy:p}]}const u=vm((l.gx+c.gx)/2);return[{gx:u,gy:l.gy},{gx:u,gy:c.gy}]};let o=[t,e];for(const l of s(t))for(const c of s(e)){const f=n([t,l.at,...a(l.at,c.at,l.axis,c.axis),c.at,e]);r(f)<r(o)&&(o=f)}return o}const Dy=t=>t.slice(1).reduce((e,n,i)=>e+Math.abs(n.gx-t[i].gx)+Math.abs(n.gy-t[i].gy),0);function Iy(t){const e=go(bt(t).district),n=Ny(Js,e),i=Dy(n),r=Math.round(i*Fv/10)*10,s=Math.max(1,Math.round(r/Ov)),a=["ออกจากทางออกปัจจุบัน เดินไปทางถนนหน้าคณะ","เดินตามถนนไปทางอาคารคณะ","เลี้ยวที่สี่แยกกลางคณะ",`เดินตามถนนไปทาง${bt(t).th}`,`เข้า${bt(t).th}`,`ถึง${t.th}`],o=n.slice(1).map((c,f)=>{const h=n[f],u=Math.abs(c.gx-h.gx)+Math.abs(c.gy-h.gy);return{at:c,d:u,th:a[Math.min(f,a.length-1)]}});let l=0;return o.forEach((c,f)=>{c.min=f===o.length-1?Math.max(1,s-l):Math.max(1,Math.round(c.d/i*s)),l+=c.min}),{total:{meters:r,minutes:s},points:n,legs:o}}function Uy(t){return[{th:"เสวนา: สังคมและเมืองน่าอยู่",whenTh:"13:00 – 15:00",whereTh:"ห้องประชุมคณะ ชั้น 1",district:3},{th:"ชมรม Debate",whenTh:"16:00 – 18:00",whereTh:"ลานกิจกรรมหน้าอาคาร",district:3},{th:`ช่วงพีคของคณะ ${t.peakWindow}`,whenTh:t.peakWindow,whereTh:"ทั้งคณะ — เผื่อเวลาเดินทางเพิ่ม",district:4}]}function Fy(t,e){const n=t.hours.filter(s=>s.at>e),i=n.length?n.reduce((s,a)=>a.value<s.value?a:s,n[0]):null,r=[];return i&&r.push({icon:"clock",tone:"time",th:`ช่วง ${i.label} มักจะเป็นช่วงที่พื้นที่ว่างขึ้น`}),r.push({icon:"users",tone:"plan",th:"ถ้ามีการทำงานกลุ่ม แนะนำจองห้องล่วงหน้าผ่านงานธุรการคณะ"}),r.push({icon:"leaf",tone:"green",th:"ต้องการบรรยากาศธรรมชาติ ลองพื้นที่ Outdoor ด้านหน้าอาคาร"}),r}function Oy(t,e){const n=t.hours.find(r=>r.at===e),i=n?n.value:.4;return{crowd:vr(Math.min(1,i)),tempC:Math.round(28+Math.sin((e-6)/12*Math.PI)*5),pm25:Math.round(14+Math.cos((e-4)/14*Math.PI)*6),mock:!0}}const Xn=t=>t.photo?`./zones/${t.photo}.jpg`:null;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wh="186",By=0,_m=1,ky=2,Oa=1,zy=2,Ta=3,Xr=0,Tn=1,Ni=2,Fi=0,Ba=1,xm=2,Sm=3,ym=4,Hy=5,gs=100,Vy=101,Gy=102,Wy=103,Xy=104,Yy=200,jy=201,qy=202,$y=203,Hv=204,Vv=205,Ky=206,Zy=207,Jy=208,Qy=209,eM=210,tM=211,nM=212,iM=213,rM=214,kd=0,zd=1,Hd=2,so=3,Vd=4,Gd=5,Wd=6,Xd=7,Gv=0,sM=1,aM=2,xi=0,Wv=1,Xv=2,Yv=3,jv=4,qv=5,$v=6,Kv=7,Zv=300,Yr=301,js=302,cu=303,uu=304,Tc=306,nc=1e3,pi=1001,Yd=1002,Kt=1003,oM=1004,Xo=1005,on=1006,du=1007,Fr=1008,Pn=1009,Jv=1010,Qv=1011,ao=1012,Th=1013,Si=1014,mi=1015,yi=1016,Ah=1017,Ch=1018,oo=1020,e_=35902,t_=35899,n_=1021,i_=1022,ni=1023,Gi=1026,Or=1027,r_=1028,Rh=1029,jr=1030,bh=1031,Ph=1033,Al=33776,Cl=33777,Rl=33778,bl=33779,jd=35840,qd=35841,$d=35842,Kd=35843,Zd=36196,Jd=37492,Qd=37496,ef=37488,tf=37489,ic=37490,nf=37491,rf=37808,sf=37809,af=37810,of=37811,lf=37812,cf=37813,uf=37814,df=37815,ff=37816,hf=37817,pf=37818,mf=37819,gf=37820,vf=37821,_f=36492,xf=36494,Sf=36495,yf=36283,Mf=36284,rc=36285,Ef=36286,lM=3200,wf=0,cM=1,ar="",xn="srgb",sc="srgb-linear",ac="linear",ut="srgb",fu=7680,uM=519,dM=512,fM=513,hM=514,Lh=515,pM=516,mM=517,Nh=518,gM=519,vM=35044,Mm="300 es",gi=2e3,lo=2001;function _M(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function oc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function xM(){const t=oc("canvas");return t.style.display="block",t}const Em={};function wm(...t){const e="THREE."+t.shift();console.log(e,...t)}function s_(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ve(...t){t=s_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function at(...t){t=s_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Fs(...t){const e=t.join(" ");e in Em||(Em[e]=!0,Ve(...t))}function SM(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const yM={[kd]:zd,[Hd]:Wd,[Vd]:Xd,[so]:Gd,[zd]:kd,[Wd]:Hd,[Xd]:Vd,[Gd]:so};class Kr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hu=Math.PI/180,Tf=180/Math.PI;function vo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(rn[t&255]+rn[t>>8&255]+rn[t>>16&255]+rn[t>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[n&63|128]+rn[n>>8&255]+"-"+rn[n>>16&255]+rn[n>>24&255]+rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]).toLowerCase()}function Je(t,e,n){return Math.max(e,Math.min(n,t))}function MM(t,e){return(t%e+e)%e}function pu(t,e,n){return(1-n)*t+n*e}function ha(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:case Uint8ClampedArray:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const zh=class zh{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Je(this.x,e.x,n.x),this.y=Je(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Je(this.x,e,n),this.y=Je(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};zh.prototype.isVector2=!0;let ze=zh;class Qs{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],f=i[r+2],h=i[r+3],u=s[a+0],p=s[a+1],v=s[a+2],w=s[a+3];if(h!==w||l!==u||c!==p||f!==v){let g=l*u+c*p+f*v+h*w;g<0&&(u=-u,p=-p,v=-v,w=-w,g=-g);let d=1-o;if(g<.9995){const _=Math.acos(g),y=Math.sin(_);d=Math.sin(d*_)/y,o=Math.sin(o*_)/y,l=l*d+u*o,c=c*d+p*o,f=f*d+v*o,h=h*d+w*o}else{l=l*d+u*o,c=c*d+p*o,f=f*d+v*o,h=h*d+w*o;const _=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=_,c*=_,f*=_,h*=_}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],f=i[r+3],h=s[a],u=s[a+1],p=s[a+2],v=s[a+3];return e[n]=o*v+f*h+l*p-c*u,e[n+1]=l*v+f*u+c*h-o*p,e[n+2]=c*v+f*p+o*u-l*h,e[n+3]=f*v-o*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(r/2),h=o(s/2),u=l(i/2),p=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=u*f*h+c*p*v,this._y=c*p*h-u*f*v,this._z=c*f*v+u*p*h,this._w=c*f*h-u*p*v;break;case"YXZ":this._x=u*f*h+c*p*v,this._y=c*p*h-u*f*v,this._z=c*f*v-u*p*h,this._w=c*f*h+u*p*v;break;case"ZXY":this._x=u*f*h-c*p*v,this._y=c*p*h+u*f*v,this._z=c*f*v+u*p*h,this._w=c*f*h-u*p*v;break;case"ZYX":this._x=u*f*h-c*p*v,this._y=c*p*h+u*f*v,this._z=c*f*v-u*p*h,this._w=c*f*h+u*p*v;break;case"YZX":this._x=u*f*h+c*p*v,this._y=c*p*h+u*f*v,this._z=c*f*v-u*p*h,this._w=c*f*h-u*p*v;break;case"XZY":this._x=u*f*h-c*p*v,this._y=c*p*h-u*f*v,this._z=c*f*v+u*p*h,this._w=c*f*h+u*p*v;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],f=n[6],h=n[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(f-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+a*o+r*c-s*l,this._y=r*f+a*l+s*o-i*c,this._z=s*f+a*c+i*l-r*o,this._w=a*f-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Hh=class Hh{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Tm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Tm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),f=2*(o*n-s*r),h=2*(s*i-a*n);return this.x=n+l*c+a*h-o*f,this.y=i+l*f+o*c-s*h,this.z=r+l*h+s*f-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Je(this.x,e.x,n.x),this.y=Je(this.y,e.y,n.y),this.z=Je(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Je(this.x,e,n),this.y=Je(this.y,e,n),this.z=Je(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return mu.copy(this).projectOnVector(e),this.sub(mu)}reflect(e){return this.sub(mu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Hh.prototype.isVector3=!0;let B=Hh;const mu=new B,Tm=new Qs,Vh=class Vh{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=a,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],f=i[4],h=i[7],u=i[2],p=i[5],v=i[8],w=r[0],g=r[3],d=r[6],_=r[1],y=r[4],x=r[7],E=r[2],T=r[5],C=r[8];return s[0]=a*w+o*_+l*E,s[3]=a*g+o*y+l*T,s[6]=a*d+o*x+l*C,s[1]=c*w+f*_+h*E,s[4]=c*g+f*y+h*T,s[7]=c*d+f*x+h*C,s[2]=u*w+p*_+v*E,s[5]=u*g+p*y+v*T,s[8]=u*d+p*x+v*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return n*a*f-n*o*c-i*s*f+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=f*a-o*c,u=o*l-f*s,p=c*s-a*l,v=n*h+i*u+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/v;return e[0]=h*w,e[1]=(r*c-f*i)*w,e[2]=(o*i-r*a)*w,e[3]=u*w,e[4]=(f*n-r*l)*w,e[5]=(r*s-o*n)*w,e[6]=p*w,e[7]=(i*l-c*n)*w,e[8]=(a*n-i*s)*w,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return Fs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(gu.makeScale(e,n)),this}rotate(e){return Fs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(gu.makeRotation(-e)),this}translate(e,n){return Fs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(gu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Vh.prototype.isMatrix3=!0;let We=Vh;const gu=new We,Am=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cm=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function EM(){const t={enabled:!0,workingColorSpace:sc,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ut&&(r.r=Oi(r.r),r.g=Oi(r.g),r.b=Oi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ut&&(r.r=Os(r.r),r.g=Os(r.g),r.b=Os(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ar?ac:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Fs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Fs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[sc]:{primaries:e,whitePoint:i,transfer:ac,toXYZ:Am,fromXYZ:Cm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:Am,fromXYZ:Cm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}}),t}const tt=EM();function Oi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Os(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let is;class wM{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{is===void 0&&(is=oc("canvas")),is.width=e.width,is.height=e.height;const r=is.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=is}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=oc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Oi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Oi(n[i]/255)*255):n[i]=Oi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let TM=0;class Dh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:TM++}),this.uuid=vo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(vu(r[a].image)):s.push(vu(r[a]))}else s=vu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function vu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?wM.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let AM=0;const _u=new B;class ln extends Kr{constructor(e=ln.DEFAULT_IMAGE,n=ln.DEFAULT_MAPPING,i=pi,r=pi,s=on,a=Fr,o=ni,l=Pn,c=ln.DEFAULT_ANISOTROPY,f=ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:AM++}),this.uuid=vo(),this.name="",this.source=new Dh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_u).x}get height(){return this.source.getSize(_u).y}get depth(){return this.source.getSize(_u).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ve(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nc:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Yd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nc:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Yd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=Zv;ln.DEFAULT_ANISOTROPY=1;const Gh=class Gh{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],h=l[8],u=l[1],p=l[5],v=l[9],w=l[2],g=l[6],d=l[10];if(Math.abs(f-u)<.01&&Math.abs(h-w)<.01&&Math.abs(v-g)<.01){if(Math.abs(f+u)<.1&&Math.abs(h+w)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(c+1)/2,x=(p+1)/2,E=(d+1)/2,T=(f+u)/4,C=(h+w)/4,m=(v+g)/4;return y>x&&y>E?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=T/i,s=C/i):x>E?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=T/r,s=m/r):E<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(E),i=C/s,r=m/s),this.set(i,r,s,n),this}let _=Math.sqrt((g-v)*(g-v)+(h-w)*(h-w)+(u-f)*(u-f));return Math.abs(_)<.001&&(_=1),this.x=(g-v)/_,this.y=(h-w)/_,this.z=(u-f)/_,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Je(this.x,e.x,n.x),this.y=Je(this.y,e.y,n.y),this.z=Je(this.z,e.z,n.z),this.w=Je(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Je(this.x,e,n),this.y=Je(this.y,e,n),this.z=Je(this.z,e,n),this.w=Je(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Gh.prototype.isVector4=!0;let Et=Gh;class CM extends Kr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Et(0,0,e,n),this.scissorTest=!1,this.viewport=new Et(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new ln(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:on,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Dh(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const n=e.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class si extends CM{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class a_ extends ln{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class RM extends ln{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const lc=class lc{constructor(e,n,i,r,s,a,o,l,c,f,h,u,p,v,w,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,f,h,u,p,v,w,g)}set(e,n,i,r,s,a,o,l,c,f,h,u,p,v,w,g){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=f,d[10]=h,d[14]=u,d[3]=p,d[7]=v,d[11]=w,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new lc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/rs.setFromMatrixColumn(e,0).length(),s=1/rs.setFromMatrixColumn(e,1).length(),a=1/rs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=a*f,p=a*h,v=o*f,w=o*h;n[0]=l*f,n[4]=-l*h,n[8]=c,n[1]=p+v*c,n[5]=u-w*c,n[9]=-o*l,n[2]=w-u*c,n[6]=v+p*c,n[10]=a*l}else if(e.order==="YXZ"){const u=l*f,p=l*h,v=c*f,w=c*h;n[0]=u+w*o,n[4]=v*o-p,n[8]=a*c,n[1]=a*h,n[5]=a*f,n[9]=-o,n[2]=p*o-v,n[6]=w+u*o,n[10]=a*l}else if(e.order==="ZXY"){const u=l*f,p=l*h,v=c*f,w=c*h;n[0]=u-w*o,n[4]=-a*h,n[8]=v+p*o,n[1]=p+v*o,n[5]=a*f,n[9]=w-u*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const u=a*f,p=a*h,v=o*f,w=o*h;n[0]=l*f,n[4]=v*c-p,n[8]=u*c+w,n[1]=l*h,n[5]=w*c+u,n[9]=p*c-v,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const u=a*l,p=a*c,v=o*l,w=o*c;n[0]=l*f,n[4]=w-u*h,n[8]=v*h+p,n[1]=h,n[5]=a*f,n[9]=-o*f,n[2]=-c*f,n[6]=p*h+v,n[10]=u-w*h}else if(e.order==="XZY"){const u=a*l,p=a*c,v=o*l,w=o*c;n[0]=l*f,n[4]=-h,n[8]=c*f,n[1]=u*h+w,n[5]=a*f,n[9]=p*h-v,n[2]=v*h-p,n[6]=o*f,n[10]=w*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bM,e,PM)}lookAt(e,n,i){const r=this.elements;return An.subVectors(e,n),An.lengthSq()===0&&(An.z=1),An.normalize(),$i.crossVectors(i,An),$i.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),$i.crossVectors(i,An)),$i.normalize(),Yo.crossVectors(An,$i),r[0]=$i.x,r[4]=Yo.x,r[8]=An.x,r[1]=$i.y,r[5]=Yo.y,r[9]=An.y,r[2]=$i.z,r[6]=Yo.z,r[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],f=i[1],h=i[5],u=i[9],p=i[13],v=i[2],w=i[6],g=i[10],d=i[14],_=i[3],y=i[7],x=i[11],E=i[15],T=r[0],C=r[4],m=r[8],R=r[12],L=r[1],N=r[5],F=r[9],W=r[13],D=r[2],G=r[6],te=r[10],Y=r[14],H=r[3],k=r[7],X=r[11],q=r[15];return s[0]=a*T+o*L+l*D+c*H,s[4]=a*C+o*N+l*G+c*k,s[8]=a*m+o*F+l*te+c*X,s[12]=a*R+o*W+l*Y+c*q,s[1]=f*T+h*L+u*D+p*H,s[5]=f*C+h*N+u*G+p*k,s[9]=f*m+h*F+u*te+p*X,s[13]=f*R+h*W+u*Y+p*q,s[2]=v*T+w*L+g*D+d*H,s[6]=v*C+w*N+g*G+d*k,s[10]=v*m+w*F+g*te+d*X,s[14]=v*R+w*W+g*Y+d*q,s[3]=_*T+y*L+x*D+E*H,s[7]=_*C+y*N+x*G+E*k,s[11]=_*m+y*F+x*te+E*X,s[15]=_*R+y*W+x*Y+E*q,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],f=e[2],h=e[6],u=e[10],p=e[14],v=e[3],w=e[7],g=e[11],d=e[15],_=l*p-c*u,y=o*p-c*h,x=o*u-l*h,E=a*p-c*f,T=a*u-l*f,C=a*h-o*f;return n*(w*_-g*y+d*x)-i*(v*_-g*E+d*T)+r*(v*y-w*E+d*C)-s*(v*x-w*T+g*C)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return n*(a*f-o*c)-i*(s*f-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=e[9],u=e[10],p=e[11],v=e[12],w=e[13],g=e[14],d=e[15],_=n*o-i*a,y=n*l-r*a,x=n*c-s*a,E=i*l-r*o,T=i*c-s*o,C=r*c-s*l,m=f*w-h*v,R=f*g-u*v,L=f*d-p*v,N=h*g-u*w,F=h*d-p*w,W=u*d-p*g,D=_*W-y*F+x*N+E*L-T*R+C*m;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/D;return e[0]=(o*W-l*F+c*N)*G,e[1]=(r*F-i*W-s*N)*G,e[2]=(w*C-g*T+d*E)*G,e[3]=(u*T-h*C-p*E)*G,e[4]=(l*L-a*W-c*R)*G,e[5]=(n*W-r*L+s*R)*G,e[6]=(g*x-v*C-d*y)*G,e[7]=(f*C-u*x+p*y)*G,e[8]=(a*F-o*L+c*m)*G,e[9]=(i*L-n*F-s*m)*G,e[10]=(v*T-w*x+d*_)*G,e[11]=(h*x-f*T-p*_)*G,e[12]=(o*R-a*N-l*m)*G,e[13]=(n*N-i*R+r*m)*G,e[14]=(w*y-v*E-g*_)*G,e[15]=(f*E-h*y+u*_)*G,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,f=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,f*o+i,f*l-r*a,0,c*l-r*o,f*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,f=a+a,h=o+o,u=s*c,p=s*f,v=s*h,w=a*f,g=a*h,d=o*h,_=l*c,y=l*f,x=l*h,E=i.x,T=i.y,C=i.z;return r[0]=(1-(w+d))*E,r[1]=(p+x)*E,r[2]=(v-y)*E,r[3]=0,r[4]=(p-x)*T,r[5]=(1-(u+d))*T,r[6]=(g+_)*T,r[7]=0,r[8]=(v+y)*C,r[9]=(g-_)*C,r[10]=(1-(u+w))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let a=rs.set(r[0],r[1],r[2]).length();const o=rs.set(r[4],r[5],r[6]).length(),l=rs.set(r[8],r[9],r[10]).length();s<0&&(a=-a),qn.copy(this);const c=1/a,f=1/o,h=1/l;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=f,qn.elements[5]*=f,qn.elements[6]*=f,qn.elements[8]*=h,qn.elements[9]*=h,qn.elements[10]*=h,n.setFromRotationMatrix(qn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=gi,l=!1){const c=this.elements,f=2*s/(n-e),h=2*s/(i-r),u=(n+e)/(n-e),p=(i+r)/(i-r);let v,w;if(l)v=s/(a-s),w=a*s/(a-s);else if(o===gi)v=-(a+s)/(a-s),w=-2*a*s/(a-s);else if(o===lo)v=-a/(a-s),w=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=w,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=gi,l=!1){const c=this.elements,f=2/(n-e),h=2/(i-r),u=-(n+e)/(n-e),p=-(i+r)/(i-r);let v,w;if(l)v=1/(a-s),w=a/(a-s);else if(o===gi)v=-2/(a-s),w=-(a+s)/(a-s);else if(o===lo)v=-1/(a-s),w=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=w,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};lc.prototype.isMatrix4=!0;let Tt=lc;const rs=new B,qn=new Tt,bM=new B(0,0,0),PM=new B(1,1,1),$i=new B,Yo=new B,An=new B,Rm=new Tt,bm=new Qs;class Sr{constructor(e=0,n=0,i=0,r=Sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],f=r[9],h=r[2],u=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Rm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return bm.setFromEuler(this),this.setFromQuaternion(bm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sr.DEFAULT_ORDER="XYZ";class o_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let LM=0;const Pm=new B,ss=new Qs,Ti=new Tt,jo=new B,pa=new B,NM=new B,DM=new Qs,Lm=new B(1,0,0),Nm=new B(0,1,0),Dm=new B(0,0,1),Im={type:"added"},IM={type:"removed"},as={type:"childadded",child:null},xu={type:"childremoved",child:null};class Jt extends Kr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:LM++}),this.uuid=vo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Jt.DEFAULT_UP.clone();const e=new B,n=new Sr,i=new Qs,r=new B(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Tt},normalMatrix:{value:new We}}),this.matrix=new Tt,this.matrixWorld=new Tt,this.matrixAutoUpdate=Jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new o_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ss.setFromAxisAngle(e,n),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,n){return ss.setFromAxisAngle(e,n),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(Lm,e)}rotateY(e){return this.rotateOnAxis(Nm,e)}rotateZ(e){return this.rotateOnAxis(Dm,e)}translateOnAxis(e,n){return Pm.copy(e).applyQuaternion(this.quaternion),this.position.add(Pm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Lm,e)}translateY(e){return this.translateOnAxis(Nm,e)}translateZ(e){return this.translateOnAxis(Dm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?jo.copy(e):jo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),pa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(pa,jo,this.up):Ti.lookAt(jo,pa,this.up),this.quaternion.setFromRotationMatrix(Ti),r&&(Ti.extractRotation(r.matrixWorld),ss.setFromRotationMatrix(Ti),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Im),as.child=e,this.dispatchEvent(as),as.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(IM),xu.child=e,this.dispatchEvent(xu),xu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Im),as.child=e,this.dispatchEvent(as),as.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pa,e,NM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pa,DM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),f=a(e.images),h=a(e.shapes),u=a(e.skeletons),p=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Jt.DEFAULT_UP=new B(0,1,0);Jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Aa extends Jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const UM={type:"move"};class Su{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Aa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Aa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Aa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const w of e.hand.values()){const g=n.getJointPose(w,i),d=this._getHandJoint(c,w);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=f.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&u>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(UM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Aa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const l_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},qo={h:0,s:0,l:0};function yu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class nt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=tt.workingColorSpace){if(e=MM(e,1),n=Je(n,0,1),i=Je(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=yu(a,s,e+1/3),this.g=yu(a,s,e),this.b=yu(a,s,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,n=xn){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=xn){const i=l_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}copyLinearToSRGB(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return tt.workingToColorSpace(sn.copy(this),e),Math.round(Je(sn.r*255,0,255))*65536+Math.round(Je(sn.g*255,0,255))*256+Math.round(Je(sn.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.workingToColorSpace(sn.copy(this),n);const i=sn.r,r=sn.g,s=sn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const f=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=f<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=tt.workingColorSpace){return tt.workingToColorSpace(sn.copy(this),n),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=xn){tt.workingToColorSpace(sn.copy(this),e);const n=sn.r,i=sn.g,r=sn.b;return e!==xn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+n,Ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ki),e.getHSL(qo);const i=pu(Ki.h,qo.h,n),r=pu(Ki.s,qo.s,n),s=pu(Ki.l,qo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new nt;nt.NAMES=l_;class FM extends Jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sr,this.environmentIntensity=1,this.environmentRotation=new Sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}}const $n=new B,Ai=new B,Mu=new B,Ci=new B,os=new B,ls=new B,Um=new B,Eu=new B,wu=new B,Tu=new B,Au=new Et,Cu=new Et,Ru=new Et;class ti{constructor(e=new B,n=new B,i=new B){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),$n.subVectors(e,n),r.cross($n);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){$n.subVectors(r,n),Ai.subVectors(i,n),Mu.subVectors(e,n);const a=$n.dot($n),o=$n.dot(Ai),l=$n.dot(Mu),c=Ai.dot(Ai),f=Ai.dot(Mu),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-o*f)*u,v=(a*f-o*l)*u;return s.set(1-p-v,v,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,Ci)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ci.x),l.addScaledVector(a,Ci.y),l.addScaledVector(o,Ci.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Au.setScalar(0),Cu.setScalar(0),Ru.setScalar(0),Au.fromBufferAttribute(e,n),Cu.fromBufferAttribute(e,i),Ru.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Au,s.x),a.addScaledVector(Cu,s.y),a.addScaledVector(Ru,s.z),a}static isFrontFacing(e,n,i,r){return $n.subVectors(i,n),Ai.subVectors(e,n),$n.cross(Ai).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),$n.cross(Ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ti.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ti.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ti.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ti.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ti.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;os.subVectors(r,i),ls.subVectors(s,i),Eu.subVectors(e,i);const l=os.dot(Eu),c=ls.dot(Eu);if(l<=0&&c<=0)return n.copy(i);wu.subVectors(e,r);const f=os.dot(wu),h=ls.dot(wu);if(f>=0&&h<=f)return n.copy(r);const u=l*h-f*c;if(u<=0&&l>=0&&f<=0)return a=l/(l-f),n.copy(i).addScaledVector(os,a);Tu.subVectors(e,s);const p=os.dot(Tu),v=ls.dot(Tu);if(v>=0&&p<=v)return n.copy(s);const w=p*c-l*v;if(w<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(ls,o);const g=f*v-p*h;if(g<=0&&h-f>=0&&p-v>=0)return Um.subVectors(s,r),o=(h-f)/(h-f+(p-v)),n.copy(r).addScaledVector(Um,o);const d=1/(g+w+u);return a=w*d,o=u*d,n.copy(i).addScaledVector(os,a).addScaledVector(ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class _o{constructor(e=new B(1/0,1/0,1/0),n=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Kn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Kn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Kn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kn):Kn.fromBufferAttribute(s,a),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$o.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),$o.copy(i.boundingBox)),$o.applyMatrix4(e.matrixWorld),this.union($o)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ma),Ko.subVectors(this.max,ma),cs.subVectors(e.a,ma),us.subVectors(e.b,ma),ds.subVectors(e.c,ma),Zi.subVectors(us,cs),Ji.subVectors(ds,us),Ar.subVectors(cs,ds);let n=[0,-Zi.z,Zi.y,0,-Ji.z,Ji.y,0,-Ar.z,Ar.y,Zi.z,0,-Zi.x,Ji.z,0,-Ji.x,Ar.z,0,-Ar.x,-Zi.y,Zi.x,0,-Ji.y,Ji.x,0,-Ar.y,Ar.x,0];return!bu(n,cs,us,ds,Ko)||(n=[1,0,0,0,1,0,0,0,1],!bu(n,cs,us,ds,Ko))?!1:(Zo.crossVectors(Zi,Ji),n=[Zo.x,Zo.y,Zo.z],bu(n,cs,us,ds,Ko))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ri=[new B,new B,new B,new B,new B,new B,new B,new B],Kn=new B,$o=new _o,cs=new B,us=new B,ds=new B,Zi=new B,Ji=new B,Ar=new B,ma=new B,Ko=new B,Zo=new B,Cr=new B;function bu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Cr.fromArray(t,s);const o=r.x*Math.abs(Cr.x)+r.y*Math.abs(Cr.y)+r.z*Math.abs(Cr.z),l=e.dot(Cr),c=n.dot(Cr),f=i.dot(Cr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const Ut=new B,Jo=new ze;let OM=0;class Bi extends Kr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:OM++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=vM,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Jo.fromBufferAttribute(this,n),Jo.applyMatrix3(e),this.setXY(n,Jo.x,Jo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix3(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix4(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyNormalMatrix(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.transformDirection(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ha(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=gn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ha(n,this.array)),n}setX(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ha(n,this.array)),n}setY(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ha(n,this.array)),n}setZ(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ha(n,this.array)),n}setW(e,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=gn(n,this.array),i=gn(i,this.array),r=gn(r,this.array),s=gn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class c_ extends Bi{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class u_ extends Bi{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class jt extends Bi{constructor(e,n,i){super(new Float32Array(e),n,i)}}const BM=new _o,ga=new B,Pu=new B;class Ih{constructor(e=new B,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):BM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ga.subVectors(e,this.center);const n=ga.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ga,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ga.copy(e.center).add(Pu)),this.expandByPoint(ga.copy(e.center).sub(Pu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let kM=0;const On=new Tt,Lu=new Jt,fs=new B,Cn=new _o,va=new _o,Wt=new B;class Yn extends Kr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kM++}),this.uuid=vo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_M(e)?u_:c_)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,n,i){return On.makeTranslation(e,n,i),this.applyMatrix4(On),this}scale(e,n,i){return On.makeScale(e,n,i),this.applyMatrix4(On),this}lookAt(e){return Lu.lookAt(e),Lu.updateMatrix(),this.applyMatrix4(Lu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new jt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _o);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ih);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];va.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(Cn.min,va.min),Cn.expandByPoint(Wt),Wt.addVectors(Cn.max,va.max),Cn.expandByPoint(Wt)):(Cn.expandByPoint(va.min),Cn.expandByPoint(va.max))}Cn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Wt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)Wt.fromBufferAttribute(o,c),l&&(fs.fromBufferAttribute(e,c),Wt.add(fs)),r=Math.max(r,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Bi(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let m=0;m<i.count;m++)o[m]=new B,l[m]=new B;const c=new B,f=new B,h=new B,u=new ze,p=new ze,v=new ze,w=new B,g=new B;function d(m,R,L){c.fromBufferAttribute(i,m),f.fromBufferAttribute(i,R),h.fromBufferAttribute(i,L),u.fromBufferAttribute(s,m),p.fromBufferAttribute(s,R),v.fromBufferAttribute(s,L),f.sub(c),h.sub(c),p.sub(u),v.sub(u);const N=1/(p.x*v.y-v.x*p.y);isFinite(N)&&(w.copy(f).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(N),g.copy(h).multiplyScalar(p.x).addScaledVector(f,-v.x).multiplyScalar(N),o[m].add(w),o[R].add(w),o[L].add(w),l[m].add(g),l[R].add(g),l[L].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let m=0,R=_.length;m<R;++m){const L=_[m],N=L.start,F=L.count;for(let W=N,D=N+F;W<D;W+=3)d(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const y=new B,x=new B,E=new B,T=new B;function C(m){E.fromBufferAttribute(r,m),T.copy(E);const R=o[m];y.copy(R),y.sub(E.multiplyScalar(E.dot(R))).normalize(),x.crossVectors(T,R);const N=x.dot(l[m])<0?-1:1;a.setXYZW(m,y.x,y.y,y.z,N)}for(let m=0,R=_.length;m<R;++m){const L=_[m],N=L.start,F=L.count;for(let W=N,D=N+F;W<D;W+=3)C(e.getX(W+0)),C(e.getX(W+1)),C(e.getX(W+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Bi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const r=new B,s=new B,a=new B,o=new B,l=new B,c=new B,f=new B,h=new B;if(e)for(let u=0,p=e.count;u<p;u+=3){const v=e.getX(u+0),w=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,w),a.fromBufferAttribute(n,g),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,w),c.fromBufferAttribute(i,g),o.add(f),l.add(f),c.add(f),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(w,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)r.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),a.fromBufferAttribute(n,u+2),f.subVectors(a,s),h.subVectors(r,s),f.cross(h),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Wt.fromBufferAttribute(e,n),Wt.normalize(),e.setXYZ(n,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,h=o.normalized,u=new c.constructor(l.length*f);let p=0,v=0;for(let w=0,g=l.length;w<g;w++){o.isInterleavedBufferAttribute?p=l[w]*o.data.stride+o.offset:p=l[w]*f;for(let d=0;d<f;d++)u[v++]=c[p++]}return new Bi(u,f,h)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Yn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,h=c.length;f<h;f++){const u=c[f],p=e(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let u=0,p=h.length;u<p;u++)f.push(h[u].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,f=a.length;c<f;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nu=new B,zM=new B,HM=new We;class ir{constructor(e=new B(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Nu.subVectors(i,n).cross(zM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Nu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||HM.getNormalMatrix(e),r=this.coplanarPoint(Nu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let VM=0;class xo extends Kr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:VM++}),this.uuid=vo(),this.name="",this.type="Material",this.blending=Ba,this.side=Xr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hv,this.blendDst=Vv,this.blendEquation=gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=so,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fu,this.stencilZFail=fu,this.stencilZPass=fu,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ve(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new nt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ir().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const bi=new B,Du=new B,Qo=new B,el=new B;class GM{constructor(e=new B,n=new B(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,bi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=bi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(bi.copy(this.origin).addScaledVector(this.direction,n),bi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Du.copy(e).add(n).multiplyScalar(.5),Qo.copy(n).sub(e).normalize(),el.copy(this.origin).sub(Du);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Qo),o=el.dot(this.direction),l=-el.dot(Qo),c=el.lengthSq(),f=Math.abs(1-a*a);let h,u,p,v;if(f>0)if(h=a*l-o,u=a*o-l,v=s*f,h>=0)if(u>=-v)if(u<=v){const w=1/f;h*=w,u*=w,p=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-v?(h=Math.max(0,-(-a*s+o)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=v?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(a*s+o)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=a>0?-s:s,h=Math.max(0,-(a*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Du).addScaledVector(Qo,u),p}intersectSphere(e,n){if(e.radius<0)return null;bi.subVectors(e.center,this.origin);const i=bi.dot(this.direction),r=bi.dot(bi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,r=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,r=(e.min.x-u.x)*c),f>=0?(s=(e.min.y-u.y)*f,a=(e.max.y-u.y)*f):(s=(e.max.y-u.y)*f,a=(e.min.y-u.y)*f),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,bi)!==null}intersectTriangle(e,n,i,r,s){const a=this.origin,o=this.direction,l=o.x,c=o.y,f=o.z,h=e.x-a.x,u=e.y-a.y,p=e.z-a.z,v=n.x-a.x,w=n.y-a.y,g=n.z-a.z,d=i.x-a.x,_=i.y-a.y,y=i.z-a.z,x=Math.abs(l),E=Math.abs(c),T=Math.abs(f);let C,m,R,L,N,F,W,D,G,te,Y,H;if(x>=E&&x>=T?(R=l,F=h,G=v,H=d,l>=0?(C=c,m=f,L=u,N=p,W=w,D=g,te=_,Y=y):(C=f,m=c,L=p,N=u,W=g,D=w,te=y,Y=_)):E>=T?(R=c,F=u,G=w,H=_,c>=0?(C=f,m=l,L=p,N=h,W=g,D=v,te=y,Y=d):(C=l,m=f,L=h,N=p,W=v,D=g,te=d,Y=y)):(R=f,F=p,G=g,H=y,f>=0?(C=l,m=c,L=h,N=u,W=v,D=w,te=d,Y=_):(C=c,m=l,L=u,N=h,W=w,D=v,te=_,Y=d)),R===0)return null;const k=C/R,X=m/R,q=1/R,de=L-k*F,ce=N-X*F,Oe=W-k*G,Q=D-X*G,le=te-k*H,z=Y-X*H,Z=le*Q-z*Oe,fe=de*z-ce*le,Me=Oe*ce-Q*de;if(r){if(Z<0||fe<0||Me<0)return null}else if((Z<0||fe<0||Me<0)&&(Z>0||fe>0||Me>0))return null;const ge=Z+fe+Me;if(ge===0)return null;const Ie=q*(Z*F+fe*G+Me*H);return(ge>0?Ie<0:Ie>0)?null:this.at(Ie/ge,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class d_ extends xo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sr,this.combine=Gv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Fm=new Tt,Rr=new GM,tl=new Ih,Om=new B,nl=new B,il=new B,rl=new B,Iu=new B,sl=new B,Bm=new B,al=new B;class mt extends Jt{constructor(e=new Yn,n=new d_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){sl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],h=s[l];f!==0&&(Iu.fromBufferAttribute(h,e),a?sl.addScaledVector(Iu,f):sl.addScaledVector(Iu.sub(n),f))}n.add(sl)}return n}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),tl.copy(i.boundingSphere),tl.applyMatrix4(s),Rr.copy(e.ray).recast(e.near),!(tl.containsPoint(Rr.origin)===!1&&(Rr.intersectSphere(tl,Om)===null||Rr.origin.distanceToSquared(Om)>(e.far-e.near)**2))&&(Fm.copy(s).invert(),Rr.copy(e.ray).applyMatrix4(Fm),!(i.boundingBox!==null&&Rr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Rr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,w=u.length;v<w;v++){const g=u[v],d=a[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let x=_,E=y;x<E;x+=3){const T=o.getX(x),C=o.getX(x+1),m=o.getX(x+2);r=ol(this,d,e,i,c,f,h,T,C,m),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),w=Math.min(o.count,p.start+p.count);for(let g=v,d=w;g<d;g+=3){const _=o.getX(g),y=o.getX(g+1),x=o.getX(g+2);r=ol(this,a,e,i,c,f,h,_,y,x),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,w=u.length;v<w;v++){const g=u[v],d=a[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let x=_,E=y;x<E;x+=3){const T=x,C=x+1,m=x+2;r=ol(this,d,e,i,c,f,h,T,C,m),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const v=Math.max(0,p.start),w=Math.min(l.count,p.start+p.count);for(let g=v,d=w;g<d;g+=3){const _=g,y=g+1,x=g+2;r=ol(this,a,e,i,c,f,h,_,y,x),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function WM(t,e,n,i,r,s,a,o){let l;if(e.side===Tn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Xr,o),l===null)return null;al.copy(o),al.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(al);return c<n.near||c>n.far?null:{distance:c,point:al.clone(),object:t}}function ol(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,nl),t.getVertexPosition(l,il),t.getVertexPosition(c,rl);const f=WM(t,e,n,i,nl,il,rl,Bm);if(f){const h=new B;ti.getBarycoord(Bm,nl,il,rl,h),r&&(f.uv=ti.getInterpolatedAttribute(r,o,l,c,h,new ze)),s&&(f.uv1=ti.getInterpolatedAttribute(s,o,l,c,h,new ze)),a&&(f.normal=ti.getInterpolatedAttribute(a,o,l,c,h,new B),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new B,materialIndex:0};ti.getNormal(nl,il,rl,u.normal),f.face=u,f.barycoord=h}return f}class XM extends ln{constructor(e=null,n=1,i=1,r,s,a,o,l,c=Kt,f=Kt,h,u){super(null,a,o,l,c,f,r,s,h,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const br=new Ih,YM=new ze(.5,.5),ll=new B;class Uh{constructor(e=new ir,n=new ir,i=new ir,r=new ir,s=new ir,a=new ir){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=gi,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],f=s[4],h=s[5],u=s[6],p=s[7],v=s[8],w=s[9],g=s[10],d=s[11],_=s[12],y=s[13],x=s[14],E=s[15];if(r[0].setComponents(c-a,p-f,d-v,E-_).normalize(),r[1].setComponents(c+a,p+f,d+v,E+_).normalize(),r[2].setComponents(c+o,p+h,d+w,E+y).normalize(),r[3].setComponents(c-o,p-h,d-w,E-y).normalize(),i)r[4].setComponents(l,u,g,x).normalize(),r[5].setComponents(c-l,p-u,d-g,E-x).normalize();else if(r[4].setComponents(c-l,p-u,d-g,E-x).normalize(),n===gi)r[5].setComponents(c+l,p+u,d+g,E+x).normalize();else if(n===lo)r[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),br.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(br)}intersectsSprite(e){br.center.set(0,0,0);const n=YM.distanceTo(e.center);return br.radius=.7071067811865476+n,br.applyMatrix4(e.matrixWorld),this.intersectsSphere(br)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ll.x=r.normal.x>0?e.max.x:e.min.x,ll.y=r.normal.y>0?e.max.y:e.min.y,ll.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ll)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class f_ extends ln{constructor(e=[],n=Yr,i,r,s,a,o,l,c,f){super(e,n,i,r,s,a,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jM extends ln{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class co extends ln{constructor(e,n,i=Si,r,s,a,o=Kt,l=Kt,c,f=Gi,h=1){if(f!==Gi&&f!==Or)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:h};super(u,r,s,a,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return n.compareFunction=this.compareFunction,n}}class qM extends co{constructor(e,n=Si,i=Yr,r,s,a=Kt,o=Kt,l,c=Gi){const f={width:e,height:e,depth:1},h=[f,f,f,f,f,f];super(e,e,n,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class h_ extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $t extends Yn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],f=[],h=[];let u=0,p=0;v("z","y","x",-1,-1,i,n,e,a,s,0),v("z","y","x",1,-1,i,n,-e,a,s,1),v("x","z","y",1,1,e,i,n,r,a,2),v("x","z","y",1,-1,e,i,-n,r,a,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(f,3)),this.setAttribute("uv",new jt(h,2));function v(w,g,d,_,y,x,E,T,C,m,R){const L=x/C,N=E/m,F=x/2,W=E/2,D=T/2,G=C+1,te=m+1;let Y=0,H=0;const k=new B;for(let X=0;X<te;X++){const q=X*N-W;for(let de=0;de<G;de++){const ce=de*L-F;k[w]=ce*_,k[g]=q*y,k[d]=D,c.push(k.x,k.y,k.z),k[w]=0,k[g]=0,k[d]=T>0?1:-1,f.push(k.x,k.y,k.z),h.push(de/C),h.push(1-X/m),Y+=1}}for(let X=0;X<m;X++)for(let q=0;q<C;q++){const de=u+q+G*X,ce=u+q+G*(X+1),Oe=u+(q+1)+G*(X+1),Q=u+(q+1)+G*X;l.push(de,ce,Q),l.push(ce,Oe,Q),H+=6}o.addGroup(p,H,R),p+=H,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $t(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ka extends Yn{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const f=[],h=[],u=[],p=[];let v=0;const w=[],g=i/2;let d=0;_(),a===!1&&(e>0&&y(!0),n>0&&y(!1)),this.setIndex(f),this.setAttribute("position",new jt(h,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(p,2));function _(){const x=new B,E=new B;let T=0;const C=(n-e)/i;for(let m=0;m<=s;m++){const R=[],L=m/s,N=L*(n-e)+e;for(let F=0;F<=r;F++){const W=F/r,D=W*l+o,G=Math.sin(D),te=Math.cos(D);E.x=N*G,E.y=-L*i+g,E.z=N*te,h.push(E.x,E.y,E.z),x.set(G,C,te).normalize(),u.push(x.x,x.y,x.z),p.push(W,1-L),R.push(v++)}w.push(R)}for(let m=0;m<r;m++)for(let R=0;R<s;R++){const L=w[R][m],N=w[R+1][m],F=w[R+1][m+1],W=w[R][m+1];(e>0||R!==0)&&(f.push(L,N,W),T+=3),(n>0||R!==s-1)&&(f.push(N,F,W),T+=3)}c.addGroup(d,T,0),d+=T}function y(x){const E=v,T=new ze,C=new B;let m=0;const R=x===!0?e:n,L=x===!0?1:-1;for(let F=1;F<=r;F++)h.push(0,g*L,0),u.push(0,L,0),p.push(.5,.5),v++;const N=v;for(let F=0;F<=r;F++){const D=F/r*l+o,G=Math.cos(D),te=Math.sin(D);C.x=R*te,C.y=g*L,C.z=R*G,h.push(C.x,C.y,C.z),u.push(0,L,0),T.x=G*.5+.5,T.y=te*.5*L+.5,p.push(T.x,T.y),v++}for(let F=0;F<r;F++){const W=E+F,D=N+F;x===!0?f.push(D,D+1,W):f.push(D+1,D,W),m+=3}c.addGroup(d,m,x===!0?1:2),d+=m}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ka(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ei{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ve("Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let r=0;const s=i.length;let a;n?a=n:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const f=i[r],u=i[r+1]-f,p=(a-f)/u;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=n||(a.isVector2?new ze:new B);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new B,r=[],s=[],a=[],o=new B,l=new Tt;for(let p=0;p<=e;p++){const v=p/e;r[p]=this.getTangentAt(v,new B)}s[0]=new B,a[0]=new B;let c=Number.MAX_VALUE;const f=Math.abs(r[0].x),h=Math.abs(r[0].y),u=Math.abs(r[0].z);f<=c&&(c=f,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(Je(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,v))}a[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(Je(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let v=1;v<=e;v++)s[v].applyMatrix4(l.makeRotationAxis(r[v],p*v)),a[v].crossVectors(r[v],s[v])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class p_ extends Ei{constructor(e=0,n=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,n=new ze){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const f=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*f-p*h+this.aX,c=u*h+p*f+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class $M extends p_{constructor(e,n,i,r,s,a){super(e,n,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Fh(){let t=0,e=0,n=0,i=0;function r(s,a,o,l){t=s,e=o,n=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,f,h){let u=(a-s)/c-(o-s)/(c+f)+(o-a)/f,p=(o-a)/f-(l-a)/(f+h)+(l-o)/h;u*=f,p*=f,r(a,o,u,p)},calc:function(s){const a=s*s,o=a*s;return t+e*s+n*a+i*o}}}const km=new B,zm=new B,Uu=new Fh,Fu=new Fh,Ou=new Fh;class KM extends Ei{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new B){const i=n,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,f;this.closed||o>0?c=r[(o-1)%s]:(zm.subVectors(r[0],r[1]).add(r[0]),c=zm);const h=r[o%s],u=r[(o+1)%s];if(this.closed||o+2<s?f=r[(o+2)%s]:(km.subVectors(r[s-1],r[s-2]).add(r[s-1]),f=km),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),p),w=Math.pow(h.distanceToSquared(u),p),g=Math.pow(u.distanceToSquared(f),p);w<1e-4&&(w=1),v<1e-4&&(v=w),g<1e-4&&(g=w),Uu.initNonuniformCatmullRom(c.x,h.x,u.x,f.x,v,w,g),Fu.initNonuniformCatmullRom(c.y,h.y,u.y,f.y,v,w,g),Ou.initNonuniformCatmullRom(c.z,h.z,u.z,f.z,v,w,g)}else this.curveType==="catmullrom"&&(Uu.initCatmullRom(c.x,h.x,u.x,f.x,this.tension),Fu.initCatmullRom(c.y,h.y,u.y,f.y,this.tension),Ou.initCatmullRom(c.z,h.z,u.z,f.z,this.tension));return i.set(Uu.calc(l),Fu.calc(l),Ou.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new B().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Hm(t,e,n,i,r){const s=(i-e)*.5,a=(r-n)*.5,o=t*t,l=t*o;return(2*n-2*i+s+a)*l+(-3*n+3*i-2*s-a)*o+s*t+n}function ZM(t,e){const n=1-t;return n*n*e}function JM(t,e){return 2*(1-t)*t*e}function QM(t,e){return t*t*e}function za(t,e,n,i){return ZM(t,e)+JM(t,n)+QM(t,i)}function eE(t,e){const n=1-t;return n*n*n*e}function tE(t,e){const n=1-t;return 3*n*n*t*e}function nE(t,e){return 3*(1-t)*t*t*e}function iE(t,e){return t*t*t*e}function Ha(t,e,n,i,r){return eE(t,e)+tE(t,n)+nE(t,i)+iE(t,r)}class rE extends Ei{constructor(e=new ze,n=new ze,i=new ze,r=new ze){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new ze){const i=n,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Ha(e,r.x,s.x,a.x,o.x),Ha(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class sE extends Ei{constructor(e=new B,n=new B,i=new B,r=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new B){const i=n,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Ha(e,r.x,s.x,a.x,o.x),Ha(e,r.y,s.y,a.y,o.y),Ha(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class aE extends Ei{constructor(e=new ze,n=new ze){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ze){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ze){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class m_ extends Ei{constructor(e=new B,n=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new B){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new B){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class oE extends Ei{constructor(e=new ze,n=new ze,i=new ze){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ze){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(za(e,r.x,s.x,a.x),za(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class g_ extends Ei{constructor(e=new B,n=new B,i=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new B){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(za(e,r.x,s.x,a.x),za(e,r.y,s.y,a.y),za(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lE extends Ei{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ze){const i=n,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],f=r[a>r.length-2?r.length-1:a+1],h=r[a>r.length-3?r.length-1:a+2];return i.set(Hm(o,l.x,c.x,f.x,h.x),Hm(o,l.y,c.y,f.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new ze().fromArray(r))}return this}}var Af=Object.freeze({__proto__:null,ArcCurve:$M,CatmullRomCurve3:KM,CubicBezierCurve:rE,CubicBezierCurve3:sE,EllipseCurve:p_,LineCurve:aE,LineCurve3:m_,QuadraticBezierCurve:oE,QuadraticBezierCurve3:g_,SplineCurve:lE});class cE extends Ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Af[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const f=l[c];i&&i.equals(f)||(n.push(f),i=f)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new Af[r.type]().fromJSON(r))}return this}}class Ac extends Yn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,f=l+1,h=e/o,u=n/l,p=[],v=[],w=[],g=[];for(let d=0;d<f;d++){const _=d*u-a;for(let y=0;y<c;y++){const x=y*h-s;v.push(x,-_,0),w.push(0,0,1),g.push(y/o),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<o;_++){const y=_+c*d,x=_+c*(d+1),E=_+1+c*(d+1),T=_+1+c*d;p.push(y,x,T),p.push(x,E,T)}this.setIndex(p),this.setAttribute("position",new jt(v,3)),this.setAttribute("normal",new jt(w,3)),this.setAttribute("uv",new jt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ac(e.width,e.height,e.widthSegments,e.heightSegments)}}class Oh extends Yn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const f=[],h=new B,u=new B,p=[],v=[],w=[],g=[];for(let d=0;d<=i;d++){const _=[],y=d/i,x=a+y*o,E=e*Math.cos(x),T=Math.sqrt(e*e-E*E);let C=0;d===0&&a===0?C=.5/n:d===i&&l===Math.PI&&(C=-.5/n);for(let m=0;m<=n;m++){const R=m/n,L=r+R*s;h.x=-T*Math.cos(L),h.y=E,h.z=T*Math.sin(L),v.push(h.x,h.y,h.z),u.copy(h).normalize(),w.push(u.x,u.y,u.z),g.push(R+C,1-y),_.push(c++)}f.push(_)}for(let d=0;d<i;d++)for(let _=0;_<n;_++){const y=f[d][_+1],x=f[d][_],E=f[d+1][_],T=f[d+1][_+1];(d!==0||a>0)&&p.push(y,x,T),(d!==i-1||l<Math.PI)&&p.push(x,E,T)}this.setIndex(p),this.setAttribute("position",new jt(v,3)),this.setAttribute("normal",new jt(w,3)),this.setAttribute("uv",new jt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Bh extends Yn{constructor(e=new g_(new B(-1,-1,0),new B(-1,1,0),new B(1,1,0)),n=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:n,radius:i,radialSegments:r,closed:s};const a=e.computeFrenetFrames(n,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new B,l=new B,c=new ze;let f=new B;const h=[],u=[],p=[],v=[];w(),this.setIndex(v),this.setAttribute("position",new jt(h,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(p,2));function w(){for(let y=0;y<n;y++)g(y);g(s===!1?n:0),_(),d()}function g(y){f=e.getPointAt(y/n,f);const x=a.normals[y],E=a.binormals[y];for(let T=0;T<=r;T++){const C=T/r*Math.PI*2,m=Math.sin(C),R=-Math.cos(C);l.x=R*x.x+m*E.x,l.y=R*x.y+m*E.y,l.z=R*x.z+m*E.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=f.x+i*l.x,o.y=f.y+i*l.y,o.z=f.z+i*l.z,h.push(o.x,o.y,o.z)}}function d(){for(let y=1;y<=n;y++)for(let x=1;x<=r;x++){const E=(r+1)*(y-1)+(x-1),T=(r+1)*y+(x-1),C=(r+1)*y+x,m=(r+1)*(y-1)+x;v.push(E,T,m),v.push(T,C,m)}}function _(){for(let y=0;y<=n;y++)for(let x=0;x<=r;x++)c.x=y/n,c.y=x/r,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Bh(new Af[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}function qs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Vm(r))r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Vm(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function dn(t){const e={};for(let n=0;n<t.length;n++){const i=qs(t[n]);for(const r in i)e[r]=i[r]}return e}function Vm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function uE(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function v_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const dE={clone:qs,merge:dn};var fE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mi extends xo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fE,this.fragmentShader=hE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qs(e.uniforms),this.uniformsGroups=uE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new nt().setHex(r.value);break;case"v2":this.uniforms[i].value=new ze().fromArray(r.value);break;case"v3":this.uniforms[i].value=new B().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Et().fromArray(r.value);break;case"m3":this.uniforms[i].value=new We().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Tt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class pE extends Mi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class vn extends xo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wf,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mE extends xo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class gE extends xo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class __ extends Jt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new nt(e),this.intensity=n}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}class vE extends __{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new nt(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}toJSON(e){const n=super.toJSON(e);return n.object.groundColor=this.groundColor.getHex(),n}}const Bu=new Tt,Gm=new B,Wm=new B;class _E{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new Tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Uh,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera;Gm.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gm),Wm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Wm),n.updateMatrixWorld(),this._updateMatrix(n,this.matrix,this._frustum)}_updateMatrix(e,n,i,r){Bu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Bu,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,l=r?r.x/s.x:0,c=r?r.y/s.y:0;e.coordinateSystem===lo||e.reversedDepth?n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):n.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),n.multiply(Bu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const cl=new B,ul=new Qs,ci=new B;class x_ extends Jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Tt,this.projectionMatrix=new Tt,this.projectionMatrixInverse=new Tt,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(cl,ul,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cl,ul,ci.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(cl,ul,ci),ci.x===1&&ci.y===1&&ci.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(cl,ul,ci.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new B,Xm=new ze,Ym=new ze;class ei extends x_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Tf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tf*2*Math.atan(Math.tan(hu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-e/Qi.z)}getViewSize(e,n){return this.getViewBounds(e,Xm,Ym),n.subVectors(Ym,Xm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(hu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Cc extends x_{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class xE extends _E{constructor(){super(new Cc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class SE extends __{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Jt.DEFAULT_UP),this.updateMatrix(),this.target=new Jt,this.shadow=new xE}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const hs=-90,ps=1;class yE extends Jt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new ei(hs,ps,e,n);r.layers=this.layers,this.add(r);const s=new ei(hs,ps,e,n);s.layers=this.layers,this.add(s);const a=new ei(hs,ps,e,n);a.layers=this.layers,this.add(a);const o=new ei(hs,ps,e,n);o.layers=this.layers,this.add(o);const l=new ei(hs,ps,e,n);l.layers=this.layers,this.add(l);const c=new ei(hs,ps,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===gi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===lo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,f]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=w,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(h,u,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class ME extends ei{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Wh=class Wh{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Wh.prototype.isMatrix2=!0;let jm=Wh;function qm(t,e,n,i){const r=EE(i);switch(n){case n_:return t*e;case r_:return t*e/r.components*r.byteLength;case Rh:return t*e/r.components*r.byteLength;case jr:return t*e*2/r.components*r.byteLength;case bh:return t*e*2/r.components*r.byteLength;case i_:return t*e*3/r.components*r.byteLength;case ni:return t*e*4/r.components*r.byteLength;case Ph:return t*e*4/r.components*r.byteLength;case Al:case Cl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Rl:case bl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case qd:case Kd:return Math.max(t,16)*Math.max(e,8)/4;case jd:case $d:return Math.max(t,8)*Math.max(e,8)/2;case Zd:case Jd:case ef:case tf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Qd:case ic:case nf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case rf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case sf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case af:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case of:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case lf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case cf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case uf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case df:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case ff:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case hf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case pf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case mf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case gf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case vf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case _f:case xf:case Sf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case yf:case Mf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case rc:case Ef:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function EE(t){switch(t){case Pn:case Jv:return{byteLength:1,components:1};case ao:case Qv:case yi:return{byteLength:2,components:1};case Ah:case Ch:return{byteLength:2,components:4};case Si:case Th:case mi:return{byteLength:4,components:1};case e_:case t_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wh}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function S_(){let t=null,e=!1,n=null,i=null;function r(s,a){i=t.requestAnimationFrame(r),n(s,a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function wE(t){const e=new WeakMap;function n(o,l){const c=o.array,f=o.usage,h=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const f=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,f);else{h.sort((p,v)=>p.start-v.start);let u=0;for(let p=1;p<h.length;p++){const v=h[u],w=h[p];w.start<=v.start+v.count+1?v.count=Math.max(v.count,w.start+w.count-v.start):(++u,h[u]=w)}h.length=u+1;for(let p=0,v=h.length;p<v;p++){const w=h[p];t.bufferSubData(c,w.start*f.BYTES_PER_ELEMENT,f,w.start,w.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var TE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,AE=`#ifdef USE_ALPHAHASH
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
#endif`,CE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,RE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,PE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,LE=`#ifdef USE_AOMAP
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
#endif`,NE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,DE=`#ifdef USE_BATCHING
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
#endif`,IE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,UE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,FE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,OE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,BE=`#ifdef USE_IRIDESCENCE
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
#endif`,kE=`#ifdef USE_BUMPMAP
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
#endif`,zE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,HE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,VE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,WE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,XE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,YE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,qE=`#define PI 3.141592653589793
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
} // validated`,$E=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,KE=`vec3 transformedNormal = objectNormal;
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
#endif`,ZE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,e1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,t1="gl_FragColor = linearToOutputTexel( gl_FragColor );",n1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,i1=`#ifdef USE_ENVMAP
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
#endif`,r1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,s1=`#ifdef USE_ENVMAP
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
#endif`,a1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,o1=`#ifdef USE_ENVMAP
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
#endif`,l1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,c1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,u1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,d1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,f1=`#ifdef USE_GRADIENTMAP
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
}`,h1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,p1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,m1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,g1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,v1=`#ifdef USE_ENVMAP
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
#endif`,_1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,y1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,M1=`PhysicalMaterial material;
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
#endif`,E1=`uniform sampler2D dfgLUT;
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
}`,w1=`
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
#endif`,T1=`#if defined( RE_IndirectDiffuse )
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
#endif`,A1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,C1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,R1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,b1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,N1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,U1=`#if defined( USE_POINTS_UV )
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
#endif`,F1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,O1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,B1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,k1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,z1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H1=`#ifdef USE_MORPHTARGETS
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
#endif`,V1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,G1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,W1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,X1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,q1=`#ifdef USE_NORMALMAP
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
#endif`,$1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,K1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Z1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,J1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Q1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ew=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ow=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,uw=`float getShadowMask() {
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
}`,dw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fw=`#ifdef USE_SKINNING
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
#endif`,hw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pw=`#ifdef USE_SKINNING
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
#endif`,mw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_w=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,xw=`#ifdef USE_TRANSMISSION
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
#endif`,Sw=`#ifdef USE_TRANSMISSION
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
#endif`,yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ew=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ww=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Aw=`uniform sampler2D t2D;
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
}`,Cw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lw=`#include <common>
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
}`,Nw=`#if DEPTH_PACKING == 3200
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
}`,Dw=`#define DISTANCE
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
}`,Iw=`#define DISTANCE
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
}`,Uw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ow=`uniform float scale;
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
}`,Bw=`uniform vec3 diffuse;
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
}`,kw=`#include <common>
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
}`,zw=`uniform vec3 diffuse;
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
}`,Hw=`#define LAMBERT
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
}`,Vw=`#define LAMBERT
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
}`,Gw=`#define MATCAP
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
}`,Ww=`#define MATCAP
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
}`,Xw=`#define NORMAL
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
}`,Yw=`#define NORMAL
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
}`,jw=`#define PHONG
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
}`,qw=`#define PHONG
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
}`,$w=`#define STANDARD
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
}`,Kw=`#define STANDARD
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
}`,Zw=`#define TOON
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
}`,Jw=`#define TOON
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
}`,Qw=`uniform float size;
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
}`,eT=`uniform vec3 diffuse;
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
}`,tT=`#include <common>
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
}`,nT=`uniform vec3 color;
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
}`,iT=`uniform float rotation;
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
}`,rT=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:TE,alphahash_pars_fragment:AE,alphamap_fragment:CE,alphamap_pars_fragment:RE,alphatest_fragment:bE,alphatest_pars_fragment:PE,aomap_fragment:LE,aomap_pars_fragment:NE,batching_pars_vertex:DE,batching_vertex:IE,begin_vertex:UE,beginnormal_vertex:FE,bsdfs:OE,iridescence_fragment:BE,bumpmap_pars_fragment:kE,clipping_planes_fragment:zE,clipping_planes_pars_fragment:HE,clipping_planes_pars_vertex:VE,clipping_planes_vertex:GE,color_fragment:WE,color_pars_fragment:XE,color_pars_vertex:YE,color_vertex:jE,common:qE,cube_uv_reflection_fragment:$E,defaultnormal_vertex:KE,displacementmap_pars_vertex:ZE,displacementmap_vertex:JE,emissivemap_fragment:QE,emissivemap_pars_fragment:e1,colorspace_fragment:t1,colorspace_pars_fragment:n1,envmap_fragment:i1,envmap_common_pars_fragment:r1,envmap_pars_fragment:s1,envmap_pars_vertex:a1,envmap_physical_pars_fragment:v1,envmap_vertex:o1,fog_vertex:l1,fog_pars_vertex:c1,fog_fragment:u1,fog_pars_fragment:d1,gradientmap_pars_fragment:f1,lightmap_pars_fragment:h1,lights_lambert_fragment:p1,lights_lambert_pars_fragment:m1,lights_pars_begin:g1,lights_toon_fragment:_1,lights_toon_pars_fragment:x1,lights_phong_fragment:S1,lights_phong_pars_fragment:y1,lights_physical_fragment:M1,lights_physical_pars_fragment:E1,lights_fragment_begin:w1,lights_fragment_maps:T1,lights_fragment_end:A1,lightprobes_pars_fragment:C1,logdepthbuf_fragment:R1,logdepthbuf_pars_fragment:b1,logdepthbuf_pars_vertex:P1,logdepthbuf_vertex:L1,map_fragment:N1,map_pars_fragment:D1,map_particle_fragment:I1,map_particle_pars_fragment:U1,metalnessmap_fragment:F1,metalnessmap_pars_fragment:O1,morphinstance_vertex:B1,morphcolor_vertex:k1,morphnormal_vertex:z1,morphtarget_pars_vertex:H1,morphtarget_vertex:V1,normal_fragment_begin:G1,normal_fragment_maps:W1,normal_pars_fragment:X1,normal_pars_vertex:Y1,normal_vertex:j1,normalmap_pars_fragment:q1,clearcoat_normal_fragment_begin:$1,clearcoat_normal_fragment_maps:K1,clearcoat_pars_fragment:Z1,iridescence_pars_fragment:J1,opaque_fragment:Q1,packing:ew,premultiplied_alpha_fragment:tw,project_vertex:nw,dithering_fragment:iw,dithering_pars_fragment:rw,roughnessmap_fragment:sw,roughnessmap_pars_fragment:aw,shadowmap_pars_fragment:ow,shadowmap_pars_vertex:lw,shadowmap_vertex:cw,shadowmask_pars_fragment:uw,skinbase_vertex:dw,skinning_pars_vertex:fw,skinning_vertex:hw,skinnormal_vertex:pw,specularmap_fragment:mw,specularmap_pars_fragment:gw,tonemapping_fragment:vw,tonemapping_pars_fragment:_w,transmission_fragment:xw,transmission_pars_fragment:Sw,uv_pars_fragment:yw,uv_pars_vertex:Mw,uv_vertex:Ew,worldpos_vertex:ww,background_vert:Tw,background_frag:Aw,backgroundCube_vert:Cw,backgroundCube_frag:Rw,cube_vert:bw,cube_frag:Pw,depth_vert:Lw,depth_frag:Nw,distance_vert:Dw,distance_frag:Iw,equirect_vert:Uw,equirect_frag:Fw,linedashed_vert:Ow,linedashed_frag:Bw,meshbasic_vert:kw,meshbasic_frag:zw,meshlambert_vert:Hw,meshlambert_frag:Vw,meshmatcap_vert:Gw,meshmatcap_frag:Ww,meshnormal_vert:Xw,meshnormal_frag:Yw,meshphong_vert:jw,meshphong_frag:qw,meshphysical_vert:$w,meshphysical_frag:Kw,meshtoon_vert:Zw,meshtoon_frag:Jw,points_vert:Qw,points_frag:eT,shadow_vert:tT,shadow_frag:nT,sprite_vert:iT,sprite_frag:rT},we={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},fi={basic:{uniforms:dn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:dn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new nt(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:dn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:dn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:dn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new nt(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:dn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:dn([we.points,we.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:dn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:dn([we.common,we.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:dn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:dn([we.sprite,we.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:dn([we.common,we.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:dn([we.lights,we.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};fi.physical={uniforms:dn([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const dl={r:0,b:0,g:0},sT=new Tt,y_=new We;y_.set(-1,0,0,0,1,0,0,0,1);function aT(t,e,n,i,r,s){const a=new nt(0);let o=r===!0?0:1,l,c,f=null,h=0,u=null;function p(_){let y=_.isScene===!0?_.background:null;if(y&&y.isTexture){const x=_.backgroundBlurriness>0;y=e.get(y,x)}return y}function v(_){let y=!1;const x=p(_);x===null?g(a,o):x&&x.isColor&&(g(x,1),y=!0);const E=t.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function w(_,y){const x=p(y);x&&(x.isCubeTexture||x.mapping===Tc)?(c===void 0&&(c=new mt(new $t(1,1,1),new Mi({name:"BackgroundCubeMaterial",uniforms:qs(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sT.makeRotationFromEuler(y.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(y_),c.material.toneMapped=tt.getTransfer(x.colorSpace)!==ut,(f!==x||h!==x.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,u=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new mt(new Ac(2,2),new Mi({name:"BackgroundMaterial",uniforms:qs(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Xr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=tt.getTransfer(x.colorSpace)!==ut,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,f=x,h=x.version,u=t.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function g(_,y){_.getRGB(dl,v_(t)),n.buffers.color.setClear(dl.r,dl.g,dl.b,y,s)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),o=y,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,g(a,o)},render:v,addToRenderList:w,dispose:d}}function oT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(N,F,W,D,G){let te=!1;const Y=h(N,D,W,F);s!==Y&&(s=Y,c(s.object)),te=p(N,D,W,G),te&&v(N,D,W,G),G!==null&&e.update(G,t.ELEMENT_ARRAY_BUFFER),(te||a)&&(a=!1,x(N,F,W,D),G!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return t.createVertexArray()}function c(N){return t.bindVertexArray(N)}function f(N){return t.deleteVertexArray(N)}function h(N,F,W,D){const G=D.wireframe===!0;let te=i[F.id];te===void 0&&(te={},i[F.id]=te);const Y=N.isInstancedMesh===!0?N.id:0;let H=te[Y];H===void 0&&(H={},te[Y]=H);let k=H[W.id];k===void 0&&(k={},H[W.id]=k);let X=k[G];return X===void 0&&(X=u(l()),k[G]=X),X}function u(N){const F=[],W=[],D=[];for(let G=0;G<n;G++)F[G]=0,W[G]=0,D[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:D,object:N,attributes:{},index:null}}function p(N,F,W,D){const G=s.attributes,te=F.attributes;let Y=0;const H=W.getAttributes();for(const k in H)if(H[k].location>=0){const q=G[k];let de=te[k];if(de===void 0&&(k==="instanceMatrix"&&N.instanceMatrix&&(de=N.instanceMatrix),k==="instanceColor"&&N.instanceColor&&(de=N.instanceColor)),q===void 0||q.attribute!==de||de&&q.data!==de.data)return!0;Y++}return s.attributesNum!==Y||s.index!==D}function v(N,F,W,D){const G={},te=F.attributes;let Y=0;const H=W.getAttributes();for(const k in H)if(H[k].location>=0){let q=te[k];q===void 0&&(k==="instanceMatrix"&&N.instanceMatrix&&(q=N.instanceMatrix),k==="instanceColor"&&N.instanceColor&&(q=N.instanceColor));const de={};de.attribute=q,q&&q.data&&(de.data=q.data),G[k]=de,Y++}s.attributes=G,s.attributesNum=Y,s.index=D}function w(){const N=s.newAttributes;for(let F=0,W=N.length;F<W;F++)N[F]=0}function g(N){d(N,0)}function d(N,F){const W=s.newAttributes,D=s.enabledAttributes,G=s.attributeDivisors;W[N]=1,D[N]===0&&(t.enableVertexAttribArray(N),D[N]=1),G[N]!==F&&(t.vertexAttribDivisor(N,F),G[N]=F)}function _(){const N=s.newAttributes,F=s.enabledAttributes;for(let W=0,D=F.length;W<D;W++)F[W]!==N[W]&&(t.disableVertexAttribArray(W),F[W]=0)}function y(N,F,W,D,G,te,Y){Y===!0?t.vertexAttribIPointer(N,F,W,G,te):t.vertexAttribPointer(N,F,W,D,G,te)}function x(N,F,W,D){w();const G=D.attributes,te=W.getAttributes(),Y=F.defaultAttributeValues;for(const H in te){const k=te[H];if(k.location>=0){let X=G[H];if(X===void 0&&(H==="instanceMatrix"&&N.instanceMatrix&&(X=N.instanceMatrix),H==="instanceColor"&&N.instanceColor&&(X=N.instanceColor)),X!==void 0){const q=X.normalized,de=X.itemSize,ce=e.get(X);if(ce===void 0)continue;const Oe=ce.buffer,Q=ce.type,le=ce.bytesPerElement,z=Q===t.INT||Q===t.UNSIGNED_INT||X.gpuType===Th;if(X.isInterleavedBufferAttribute){const Z=X.data,fe=Z.stride,Me=X.offset;if(Z.isInstancedInterleavedBuffer){for(let ge=0;ge<k.locationSize;ge++)d(k.location+ge,Z.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ge=0;ge<k.locationSize;ge++)g(k.location+ge);t.bindBuffer(t.ARRAY_BUFFER,Oe);for(let ge=0;ge<k.locationSize;ge++)y(k.location+ge,de/k.locationSize,Q,q,fe*le,(Me+de/k.locationSize*ge)*le,z)}else{if(X.isInstancedBufferAttribute){for(let Z=0;Z<k.locationSize;Z++)d(k.location+Z,X.meshPerAttribute);N.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Z=0;Z<k.locationSize;Z++)g(k.location+Z);t.bindBuffer(t.ARRAY_BUFFER,Oe);for(let Z=0;Z<k.locationSize;Z++)y(k.location+Z,de/k.locationSize,Q,q,de*le,de/k.locationSize*Z*le,z)}}else if(Y!==void 0){const q=Y[H];if(q!==void 0)switch(q.length){case 2:t.vertexAttrib2fv(k.location,q);break;case 3:t.vertexAttrib3fv(k.location,q);break;case 4:t.vertexAttrib4fv(k.location,q);break;default:t.vertexAttrib1fv(k.location,q)}}}}_()}function E(){R();for(const N in i){const F=i[N];for(const W in F){const D=F[W];for(const G in D){const te=D[G];for(const Y in te)f(te[Y].object),delete te[Y];delete D[G]}}delete i[N]}}function T(N){if(i[N.id]===void 0)return;const F=i[N.id];for(const W in F){const D=F[W];for(const G in D){const te=D[G];for(const Y in te)f(te[Y].object),delete te[Y];delete D[G]}}delete i[N.id]}function C(N){for(const F in i){const W=i[F];for(const D in W){const G=W[D];if(G[N.id]===void 0)continue;const te=G[N.id];for(const Y in te)f(te[Y].object),delete te[Y];delete G[N.id]}}}function m(N){for(const F in i){const W=i[F],D=N.isInstancedMesh===!0?N.id:0,G=W[D];if(G!==void 0){for(const te in G){const Y=G[te];for(const H in Y)f(Y[H].object),delete Y[H];delete G[te]}delete W[D],Object.keys(W).length===0&&delete i[F]}}}function R(){L(),a=!0,s!==r&&(s=r,c(s.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:R,resetDefaultState:L,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:m,releaseStatesOfProgram:C,initAttributes:w,enableAttribute:g,disableUnusedAttributes:_}}function lT(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,f){f!==0&&(t.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let u=0;for(let p=0;p<f;p++)u+=c[p];n.update(u,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function cT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==ni&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const m=C===yi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Pn&&C!==mi&&!m&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE))}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(Ve("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),y=t.getParameter(t.MAX_VARYING_VECTORS),x=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),E=t.getParameter(t.MAX_SAMPLES),T=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:v,maxTextureSize:w,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:x,maxSamples:E,samples:T}}function uT(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new ir,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||r;return r=u,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=f(h,u,0)},this.setState=function(h,u,p){const v=h.clippingPlanes,w=h.clipIntersection,g=h.clipShadows,d=t.get(h);if(!r||v===null||v.length===0||s&&!g)s?f(null):c();else{const _=s?0:i,y=_*4;let x=d.clippingState||null;l.value=x,x=f(v,u,y,p);for(let E=0;E!==y;++E)x[E]=n[E];d.clippingState=x,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,u,p,v){const w=h!==null?h.length:0;let g=null;if(w!==0){if(g=l.value,v!==!0||g===null){const d=p+w*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<d)&&(g=new Float32Array(d));for(let y=0,x=p;y!==w;++y,x+=4)a.copy(h[y]).applyMatrix4(_,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,g}}const bs=4,dT=6,fT=20,hT=256,_a=new Cc,$m=new nt;let ku=null,zu=0,Hu=0,Vu=!1;const pT=new B,Pr=new B;class Km{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=pT}=s;ku=this._renderer.getRenderTarget(),zu=this._renderer.getActiveCubeFace(),Hu=this._renderer.getActiveMipmapLevel(),Vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ku,zu,Hu),this._renderer.xr.enabled=Vu,e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Yr||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ku=this._renderer.getRenderTarget(),zu=this._renderer.getActiveCubeFace(),Hu=this._renderer.getActiveMipmapLevel(),Vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:on,minFilter:on,generateMipmaps:!1,type:yi,format:ni,colorSpace:sc,depthBuffer:!1},r=Zm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zm(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=mT(s)),this._blurMaterial=vT(s,e,n),this._ggxMaterial=gT(s,e,n)}return r}_compileMaterial(e){const n=new mt(new Yn,e);this._renderer.compile(n,_a)}_sceneToCubeUV(e,n,i,r,s){const l=new ei(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor($m),h.toneMapping=xi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mt(new $t,new d_({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1})));const w=this._backgroundBox,g=w.material;let d=!1;const _=e.background;_?_.isColor&&(g.color.copy(_),e.background=null,d=!0):(g.color.copy($m),d=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[y],s.y,s.z)):x===1?(l.up.set(0,0,c[y]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[y],s.z)):(l.up.set(0,c[y],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[y]));const E=this._cubeSize;ms(r,x*E,y>2?E:0,E,E),h.setRenderTarget(r),d&&h.render(w,l),h.render(e,l)}h.toneMapping=p,h.autoClear=u,e.background=_}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Yr||e.mapping===js;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ms(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,_a)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-f*f),u=c*1.25,p=h*u,{_lodMax:v}=this,w=this._sizeLods[i],g=3*w*(i>v-bs?i-v+bs:0),d=4*(this._cubeSize-w);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=v-n,ms(s,g,d,3*w,2*w),r.setRenderTarget(s),r.render(o,_a),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=v-i,ms(e,g,d,3*w,2*w),r.setRenderTarget(e),r.render(o,_a)}_blur(e,n,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,n,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,n,i,r,s){const a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[r];l.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=s,c.mipInt.value=this._lodMax-i;const f=this._sizeLods[r],h=3*f*(r>this._lodMax-bs?r-this._lodMax+bs:0),u=4*(this._cubeSize-f);ms(n,h,u,3*f,2*f),a.setRenderTarget(n),a.render(l,_a)}}function mT(t){const e=[],n=[];let i=t;const r=t-bs+1+dT;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),l=-o,c=1+o,f=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,u=6,p=3,v=new Float32Array(p*u*h),w=new Float32Array(p*u*h);for(let d=0;d<h;d++){const _=d%3*2/3-1,y=d>2?0:-1,x=[_,y,0,_+2/3,y,0,_+2/3,y+1,0,_,y,0,_+2/3,y+1,0,_,y+1,0];v.set(x,p*u*d);for(let E=0;E<u;E++){const T=f[E*2]*2-1,C=f[E*2+1]*2-1;d===0?Pr.set(1,C,T):d===1?Pr.set(-T,1,-C):d===2?Pr.set(-T,C,1):d===3?Pr.set(-1,C,-T):d===4?Pr.set(-T,-1,C):Pr.set(T,C,-1),Pr.toArray(w,(d*u+E)*p)}}const g=new Yn;g.setAttribute("position",new Bi(v,p)),g.setAttribute("outputDirection",new Bi(w,p)),n.push(new mt(g,null)),i>bs&&i--}return{lodMeshes:n,sizeLods:e}}function Zm(t,e,n){const i=new si(t,e,n);return i.texture.mapping=Tc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ms(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function gT(t,e,n){return new Mi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Rc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function vT(t,e,n){return new Mi({name:"SphericalGaussianBlur",defines:{SAMPLES:fT,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Rc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Jm(){return new Mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Qm(){return new Mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Rc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class M_ extends si{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new f_(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new $t(5,5,5),s=new Mi({name:"CubemapFromEquirect",uniforms:qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Tn,blending:Fi});s.uniforms.tEquirect.value=n;const a=new mt(r,s),o=n.minFilter;return n.minFilter===Fr&&(n.minFilter=on),new yE(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function _T(t){let e=new WeakMap,n=new WeakMap,i=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===cu||p===uu)if(e.has(u)){const v=e.get(u).texture;return o(v,u.mapping)}else{const v=u.image;if(v&&v.height>0){const w=new M_(v.height);return w.fromEquirectangularTexture(t,u),e.set(u,w),u.addEventListener("dispose",c),o(w.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,v=p===cu||p===uu,w=p===Yr||p===js;if(v||w){let g=n.get(u);const d=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new Km(t)),g=v?i.fromEquirectangular(u,g):i.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),g.texture;if(g!==void 0)return g.texture;{const _=u.image;return v&&_&&_.height>0||w&&_&&l(_)?(i===null&&(i=new Km(t)),g=v?i.fromEquirectangular(u):i.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,n.set(u,g),u.addEventListener("dispose",f),g.texture):null}}}return u}function o(u,p){return p===cu?u.mapping=Yr:p===uu&&(u.mapping=js),u}function l(u){let p=0;const v=6;for(let w=0;w<v;w++)u[w]!==void 0&&p++;return p===v}function c(u){const p=u.target;p.removeEventListener("dispose",c);const v=e.get(p);v!==void 0&&(e.delete(p),v.dispose())}function f(u){const p=u.target;p.removeEventListener("dispose",f);const v=n.get(p);v!==void 0&&(n.delete(p),v.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function xT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Fs("WebGLRenderer: "+i+" extension not supported."),r}}}function ST(t,e,n,i){const r={},s=new WeakMap;function a(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const v in u.attributes)e.remove(u.attributes[v]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(h,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,v=h.attributes.position;let w=0;if(v===void 0)return;if(p!==null){const _=p.array;w=p.version;for(let y=0,x=_.length;y<x;y+=3){const E=_[y+0],T=_[y+1],C=_[y+2];u.push(E,T,T,C,C,E)}}else{const _=v.array;w=v.version;for(let y=0,x=_.length/3-1;y<x;y+=3){const E=y+0,T=y+1,C=y+2;u.push(E,T,T,C,C,E)}}const g=new(v.count>=65535?u_:c_)(u,1);g.version=w;const d=s.get(h);d&&e.remove(d),s.set(h,g)}function f(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:f}}function yT(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,u){t.drawElements(i,u,s,h*a),n.update(u,i,1)}function c(h,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,h*a,p),n.update(u,i,p))}function f(h,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let w=0;for(let g=0;g<p;g++)w+=u[g];n.update(w,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function MT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:at("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function ET(t,e,n){const i=new WeakMap,r=new Et;function s(a,o,l){const c=a.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=f!==void 0?f.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let L=function(){m.dispose(),i.delete(o),o.removeEventListener("dispose",L)};var p=L;u!==void 0&&u.texture.dispose();const v=o.morphAttributes.position!==void 0,w=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let x=0;v===!0&&(x=1),w===!0&&(x=2),g===!0&&(x=3);let E=o.attributes.position.count*x,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const C=new Float32Array(E*T*4*h),m=new a_(C,E,T,h);m.type=mi,m.needsUpdate=!0;const R=x*4;for(let N=0;N<h;N++){const F=d[N],W=_[N],D=y[N],G=E*T*4*N;for(let te=0;te<F.count;te++){const Y=te*R;v===!0&&(r.fromBufferAttribute(F,te),C[G+Y+0]=r.x,C[G+Y+1]=r.y,C[G+Y+2]=r.z,C[G+Y+3]=0),w===!0&&(r.fromBufferAttribute(W,te),C[G+Y+4]=r.x,C[G+Y+5]=r.y,C[G+Y+6]=r.z,C[G+Y+7]=0),g===!0&&(r.fromBufferAttribute(D,te),C[G+Y+8]=r.x,C[G+Y+9]=r.y,C[G+Y+10]=r.z,C[G+Y+11]=D.itemSize===4?r.w:1)}}u={count:h,texture:m,size:new ze(E,T)},i.set(o,u),o.addEventListener("dispose",L)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let v=0;for(let g=0;g<c.length;g++)v+=c[g];const w=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",w),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function wT(t,e,n,i,r){let s=new WeakMap;function a(c){const f=r.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==f&&(e.update(u),s.set(u,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==f&&(p.update(),s.set(p,f))}return u}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:a,dispose:o}}const TT={[Wv]:"LINEAR_TONE_MAPPING",[Xv]:"REINHARD_TONE_MAPPING",[Yv]:"CINEON_TONE_MAPPING",[jv]:"ACES_FILMIC_TONE_MAPPING",[$v]:"AGX_TONE_MAPPING",[Kv]:"NEUTRAL_TONE_MAPPING",[qv]:"CUSTOM_TONE_MAPPING"};function AT(t,e,n,i,r,s){const a=new si(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null;const c=new Yn;c.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new jt([0,2,0,0,2,0],2));const f=new pE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new mt(c,f),u=new Cc(-1,1,1,-1,0,1);let p=null,v=null,w=!1,g,d=null,_=[],y=!1;this.setSize=function(x,E){a.setSize(x,E),o!==null&&o.setSize(x,E),l!==null&&l.setSize(x,E);for(let T=0;T<_.length;T++){const C=_[T];C.setSize&&C.setSize(x,E)}},this.setEffects=function(x){_=x,y=_.length>0&&_[0].isRenderPass===!0;const E=a.width,T=a.height;_.length>0&&o===null&&(o=new si(E,T,{type:yi,depthBuffer:!1,stencilBuffer:!1}),l=new si(E,T,{type:yi,depthBuffer:!1,stencilBuffer:!1}));for(let C=0;C<_.length;C++){const m=_[C];m.setSize&&m.setSize(E,T)}},this.begin=function(x,E){if(w||x.toneMapping===xi&&_.length===0)return!1;if(d=E,E!==null){const T=E.width,C=E.height;(a.width!==T||a.height!==C)&&this.setSize(T,C)}return y===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=xi,!0},this.hasRenderPass=function(){return y},this.end=function(x,E){x.toneMapping=g,w=!0;let T=a,C=o;for(let m=0;m<_.length;m++){const R=_[m];R.enabled!==!1&&(R.render(x,C,T,E),R.needsSwap!==!1&&(T=C,C=C===o?l:o))}if(p!==x.outputColorSpace||v!==x.toneMapping){p=x.outputColorSpace,v=x.toneMapping,f.defines={},tt.getTransfer(p)===ut&&(f.defines.SRGB_TRANSFER="");const m=TT[v];m&&(f.defines[m]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=T.texture,x.setRenderTarget(d),x.render(h,u),d=null,w=!1},this.isCompositing=function(){return w},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),f.dispose()}}const E_=new ln,Cf=new co(1,1),w_=new a_,T_=new RM,A_=new f_,eg=[],tg=[],ng=new Float32Array(16),ig=new Float32Array(9),rg=new Float32Array(4);function ea(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=eg[r];if(s===void 0&&(s=new Float32Array(r),eg[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Ht(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Vt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function bc(t,e){let n=tg[e];n===void 0&&(n=new Int32Array(e),tg[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function CT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function RT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2fv(this.addr,e),Vt(n,e)}}function bT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ht(n,e))return;t.uniform3fv(this.addr,e),Vt(n,e)}}function PT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4fv(this.addr,e),Vt(n,e)}}function LT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Vt(n,e)}else{if(Ht(n,i))return;rg.set(i),t.uniformMatrix2fv(this.addr,!1,rg),Vt(n,i)}}function NT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Vt(n,e)}else{if(Ht(n,i))return;ig.set(i),t.uniformMatrix3fv(this.addr,!1,ig),Vt(n,i)}}function DT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ht(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Vt(n,e)}else{if(Ht(n,i))return;ng.set(i),t.uniformMatrix4fv(this.addr,!1,ng),Vt(n,i)}}function IT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function UT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2iv(this.addr,e),Vt(n,e)}}function FT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;t.uniform3iv(this.addr,e),Vt(n,e)}}function OT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4iv(this.addr,e),Vt(n,e)}}function BT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function kT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ht(n,e))return;t.uniform2uiv(this.addr,e),Vt(n,e)}}function zT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ht(n,e))return;t.uniform3uiv(this.addr,e),Vt(n,e)}}function HT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ht(n,e))return;t.uniform4uiv(this.addr,e),Vt(n,e)}}function VT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Cf.compareFunction=n.isReversedDepthBuffer()?Nh:Lh,s=Cf):s=E_,n.setTexture2D(e||s,r)}function GT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||T_,r)}function WT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||A_,r)}function XT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||w_,r)}function YT(t){switch(t){case 5126:return CT;case 35664:return RT;case 35665:return bT;case 35666:return PT;case 35674:return LT;case 35675:return NT;case 35676:return DT;case 5124:case 35670:return IT;case 35667:case 35671:return UT;case 35668:case 35672:return FT;case 35669:case 35673:return OT;case 5125:return BT;case 36294:return kT;case 36295:return zT;case 36296:return HT;case 35678:case 36198:case 36298:case 36306:case 35682:return VT;case 35679:case 36299:case 36307:return GT;case 35680:case 36300:case 36308:case 36293:return WT;case 36289:case 36303:case 36311:case 36292:return XT}}function jT(t,e){t.uniform1fv(this.addr,e)}function qT(t,e){const n=ea(e,this.size,2);t.uniform2fv(this.addr,n)}function $T(t,e){const n=ea(e,this.size,3);t.uniform3fv(this.addr,n)}function KT(t,e){const n=ea(e,this.size,4);t.uniform4fv(this.addr,n)}function ZT(t,e){const n=ea(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function JT(t,e){const n=ea(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function QT(t,e){const n=ea(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function eA(t,e){t.uniform1iv(this.addr,e)}function tA(t,e){t.uniform2iv(this.addr,e)}function nA(t,e){t.uniform3iv(this.addr,e)}function iA(t,e){t.uniform4iv(this.addr,e)}function rA(t,e){t.uniform1uiv(this.addr,e)}function sA(t,e){t.uniform2uiv(this.addr,e)}function aA(t,e){t.uniform3uiv(this.addr,e)}function oA(t,e){t.uniform4uiv(this.addr,e)}function lA(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=Cf:a=E_;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function cA(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||T_,s[a])}function uA(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||A_,s[a])}function dA(t,e,n){const i=this.cache,r=e.length,s=bc(n,r);Ht(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||w_,s[a])}function fA(t){switch(t){case 5126:return jT;case 35664:return qT;case 35665:return $T;case 35666:return KT;case 35674:return ZT;case 35675:return JT;case 35676:return QT;case 5124:case 35670:return eA;case 35667:case 35671:return tA;case 35668:case 35672:return nA;case 35669:case 35673:return iA;case 5125:return rA;case 36294:return sA;case 36295:return aA;case 36296:return oA;case 35678:case 36198:case 36298:case 36306:case 35682:return lA;case 35679:case 36299:case 36307:return cA;case 35680:case 36300:case 36308:case 36293:return uA;case 36289:case 36303:case 36311:case 36292:return dA}}class hA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=YT(n.type)}}class pA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=fA(n.type)}}class mA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Gu=/(\w+)(\])?(\[|\.)?/g;function sg(t,e){t.seq.push(e),t.map[e.id]=e}function gA(t,e,n){const i=t.name,r=i.length;for(Gu.lastIndex=0;;){const s=Gu.exec(i),a=Gu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){sg(n,c===void 0?new hA(o,t,e):new pA(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new mA(o),sg(n,h)),n=h}}}class Pl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);gA(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function ag(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const vA=37297;let _A=0;function xA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const og=new We;function SA(t){tt._getMatrix(og,tt.workingColorSpace,t);const e=`mat3( ${og.elements.map(n=>n.toFixed(4))} )`;switch(tt.getTransfer(t)){case ac:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function lg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+xA(t.getShaderSource(e),o)}else return s}function yA(t,e){const n=SA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const MA={[Wv]:"Linear",[Xv]:"Reinhard",[Yv]:"Cineon",[jv]:"ACESFilmic",[$v]:"AgX",[Kv]:"Neutral",[qv]:"Custom"};function EA(t,e){const n=MA[e];return n===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const fl=new B;function wA(){tt.getLuminanceCoefficients(fl);const t=fl.x.toFixed(4),e=fl.y.toFixed(4),n=fl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function TA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ca).join(`
`)}function AA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function CA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ca(t){return t!==""}function cg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ug(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const RA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rf(t){return t.replace(RA,PA)}const bA=new Map;function PA(t,e){let n=je[e];if(n===void 0){const i=bA.get(e);if(i!==void 0)n=je[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Rf(n)}const LA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dg(t){return t.replace(LA,NA)}function NA(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function fg(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const DA={[Oa]:"SHADOWMAP_TYPE_PCF",[Ta]:"SHADOWMAP_TYPE_VSM"};function IA(t){return DA[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const UA={[Yr]:"ENVMAP_TYPE_CUBE",[js]:"ENVMAP_TYPE_CUBE",[Tc]:"ENVMAP_TYPE_CUBE_UV"};function FA(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":UA[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const OA={[js]:"ENVMAP_MODE_REFRACTION"};function BA(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":OA[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const kA={[Gv]:"ENVMAP_BLENDING_MULTIPLY",[sM]:"ENVMAP_BLENDING_MIX",[aM]:"ENVMAP_BLENDING_ADD"};function zA(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":kA[t.combine]||"ENVMAP_BLENDING_NONE"}function HA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function VA(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=IA(n),c=FA(n),f=BA(n),h=zA(n),u=HA(n),p=TA(n),v=AA(s),w=r.createProgram();let g,d,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ca).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ca).join(`
`),d.length>0&&(d+=`
`)):(g=[fg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ca).join(`
`),d=[fg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==xi?"#define TONE_MAPPING":"",n.toneMapping!==xi?je.tonemapping_pars_fragment:"",n.toneMapping!==xi?EA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,yA("linearToOutputTexel",n.outputColorSpace),wA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ca).join(`
`)),a=Rf(a),a=cg(a,n),a=ug(a,n),o=Rf(o),o=cg(o,n),o=ug(o,n),a=dg(a),o=dg(o),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",n.glslVersion===Mm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Mm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=_+g+a,x=_+d+o,E=ag(r,r.VERTEX_SHADER,y),T=ag(r,r.FRAGMENT_SHADER,x);r.attachShader(w,E),r.attachShader(w,T),n.index0AttributeName!==void 0?r.bindAttribLocation(w,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function C(N){if(t.debug.checkShaderErrors){const F=r.getProgramInfoLog(w)||"",W=r.getShaderInfoLog(E)||"",D=r.getShaderInfoLog(T)||"",G=F.trim(),te=W.trim(),Y=D.trim();let H=!0,k=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(H=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,w,E,T);else{const X=lg(r,E,"vertex"),q=lg(r,T,"fragment");at("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+G+`
`+X+`
`+q)}else G!==""?Ve("WebGLProgram: Program Info Log:",G):(te===""||Y==="")&&(k=!1);k&&(N.diagnostics={runnable:H,programLog:G,vertexShader:{log:te,prefix:g},fragmentShader:{log:Y,prefix:d}})}r.deleteShader(E),r.deleteShader(T),m=new Pl(r,w),R=CA(r,w)}let m;this.getUniforms=function(){return m===void 0&&C(this),m};let R;this.getAttributes=function(){return R===void 0&&C(this),R};let L=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(w,vA)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=_A++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=E,this.fragmentShader=T,this}let GA=0;class WA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new XA(e),n.set(e,i)),i}}class XA{constructor(e){this.id=GA++,this.code=e,this.usedTimes=0}}function YA(t){return t===jr||t===ic||t===rc}function jA(t,e,n,i,r,s){const a=new o_,o=new WA,l=new Set,c=[],f=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return l.add(m),m===0?"uv":`uv${m}`}function w(m,R,L,N,F,W){const D=N.fog,G=F.geometry,te=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?N.environment:null,Y=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,H=e.get(m.envMap||te,Y),k=H&&H.mapping===Tc?H.image.height:null,X=p[m.type];m.precision!==null&&(u=i.getMaxPrecision(m.precision),u!==m.precision&&Ve("WebGLProgram.getParameters:",m.precision,"not supported, using",u,"instead."));const q=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,de=q!==void 0?q.length:0;let ce=0;G.morphAttributes.position!==void 0&&(ce=1),G.morphAttributes.normal!==void 0&&(ce=2),G.morphAttributes.color!==void 0&&(ce=3);let Oe,Q,le,z;if(X){const qe=fi[X];Oe=qe.vertexShader,Q=qe.fragmentShader}else{Oe=m.vertexShader,Q=m.fragmentShader;const qe=o.getVertexShaderStage(m),$e=o.getFragmentShaderStage(m);o.update(m,qe,$e),le=qe.id,z=$e.id}const Z=t.getRenderTarget(),fe=t.state.buffers.depth.getReversed(),Me=F.isInstancedMesh===!0,ge=F.isBatchedMesh===!0,Ie=!!m.map,it=!!m.matcap,He=!!H,pe=!!m.aoMap,Ge=!!m.lightMap,Be=!!m.bumpMap&&m.wireframe===!1,et=!!m.normalMap,Xe=!!m.displacementMap,Nt=!!m.emissiveMap,ct=!!m.metalnessMap,Ct=!!m.roughnessMap,U=m.anisotropy>0,Gt=m.clearcoat>0,ot=m.dispersion>0,b=m.retroreflectivity>0,S=m.iridescence>0,V=m.sheen>0,J=m.transmission>0,ne=U&&!!m.anisotropyMap,me=Gt&&!!m.clearcoatMap,xe=Gt&&!!m.clearcoatNormalMap,ie=Gt&&!!m.clearcoatRoughnessMap,ae=S&&!!m.iridescenceMap,Se=S&&!!m.iridescenceThicknessMap,Ue=V&&!!m.sheenColorMap,Ee=V&&!!m.sheenRoughnessMap,ye=!!m.specularMap,O=!!m.specularColorMap,re=!!m.specularIntensityMap,ue=J&&!!m.transmissionMap,P=J&&!!m.thicknessMap,se=!!m.gradientMap,j=!!m.alphaMap,ve=m.alphaTest>0,_e=!!m.alphaHash,oe=!!m.extensions;let Le=xi;m.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Le=t.toneMapping);const Ce={shaderID:X,shaderType:m.type,shaderName:m.name,vertexShader:Oe,fragmentShader:Q,defines:m.defines,customVertexShaderID:le,customFragmentShaderID:z,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:u,batching:ge,batchingColor:ge&&F._colorsTexture!==null,instancing:Me,instancingColor:Me&&F.instanceColor!==null,instancingMorph:Me&&F.morphTexture!==null,outputColorSpace:Z===null?t.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:Ie,matcap:it,envMap:He,envMapMode:He&&H.mapping,envMapCubeUVHeight:k,aoMap:pe,lightMap:Ge,bumpMap:Be,normalMap:et,displacementMap:Xe,emissiveMap:Nt,normalMapObjectSpace:et&&m.normalMapType===cM,normalMapTangentSpace:et&&m.normalMapType===wf,packedNormalMap:et&&m.normalMapType===wf&&YA(m.normalMap.format),metalnessMap:ct,roughnessMap:Ct,anisotropy:U,anisotropyMap:ne,clearcoat:Gt,clearcoatMap:me,clearcoatNormalMap:xe,clearcoatRoughnessMap:ie,dispersion:ot,retroreflection:b,iridescence:S,iridescenceMap:ae,iridescenceThicknessMap:Se,sheen:V,sheenColorMap:Ue,sheenRoughnessMap:Ee,specularMap:ye,specularColorMap:O,specularIntensityMap:re,transmission:J,transmissionMap:ue,thicknessMap:P,gradientMap:se,opaque:m.transparent===!1&&m.blending===Ba&&m.alphaToCoverage===!1,alphaMap:j,alphaTest:ve,alphaHash:_e,combine:m.combine,mapUv:Ie&&v(m.map.channel),aoMapUv:pe&&v(m.aoMap.channel),lightMapUv:Ge&&v(m.lightMap.channel),bumpMapUv:Be&&v(m.bumpMap.channel),normalMapUv:et&&v(m.normalMap.channel),displacementMapUv:Xe&&v(m.displacementMap.channel),emissiveMapUv:Nt&&v(m.emissiveMap.channel),metalnessMapUv:ct&&v(m.metalnessMap.channel),roughnessMapUv:Ct&&v(m.roughnessMap.channel),anisotropyMapUv:ne&&v(m.anisotropyMap.channel),clearcoatMapUv:me&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:xe&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:ae&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:Ue&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(m.sheenRoughnessMap.channel),specularMapUv:ye&&v(m.specularMap.channel),specularColorMapUv:O&&v(m.specularColorMap.channel),specularIntensityMapUv:re&&v(m.specularIntensityMap.channel),transmissionMapUv:ue&&v(m.transmissionMap.channel),thicknessMapUv:P&&v(m.thicknessMap.channel),alphaMapUv:j&&v(m.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(et||U),vertexNormals:!!G.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!G.attributes.uv&&(Ie||j),fog:!!D,useFog:m.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||G.attributes.normal===void 0&&et===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:fe,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:ce,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:W.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:m.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:Le,decodeVideoTexture:Ie&&m.map.isVideoTexture===!0&&tt.getTransfer(m.map.colorSpace)===ut,decodeVideoTextureEmissive:Nt&&m.emissiveMap.isVideoTexture===!0&&tt.getTransfer(m.emissiveMap.colorSpace)===ut,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Ni,flipSided:m.side===Tn,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:oe&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&m.extensions.multiDraw===!0||ge)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(m){const R=[];if(m.shaderID?R.push(m.shaderID):(R.push(m.customVertexShaderID),R.push(m.customFragmentShaderID)),m.defines!==void 0)for(const L in m.defines)R.push(L),R.push(m.defines[L]);return m.isRawShaderMaterial===!1&&(d(R,m),_(R,m),R.push(t.outputColorSpace)),R.push(m.customProgramCacheKey),R.join()}function d(m,R){m.push(R.precision),m.push(R.outputColorSpace),m.push(R.envMapMode),m.push(R.envMapCubeUVHeight),m.push(R.mapUv),m.push(R.alphaMapUv),m.push(R.lightMapUv),m.push(R.aoMapUv),m.push(R.bumpMapUv),m.push(R.normalMapUv),m.push(R.displacementMapUv),m.push(R.emissiveMapUv),m.push(R.metalnessMapUv),m.push(R.roughnessMapUv),m.push(R.anisotropyMapUv),m.push(R.clearcoatMapUv),m.push(R.clearcoatNormalMapUv),m.push(R.clearcoatRoughnessMapUv),m.push(R.iridescenceMapUv),m.push(R.iridescenceThicknessMapUv),m.push(R.sheenColorMapUv),m.push(R.sheenRoughnessMapUv),m.push(R.specularMapUv),m.push(R.specularColorMapUv),m.push(R.specularIntensityMapUv),m.push(R.transmissionMapUv),m.push(R.thicknessMapUv),m.push(R.combine),m.push(R.fogExp2),m.push(R.sizeAttenuation),m.push(R.morphTargetsCount),m.push(R.morphAttributeCount),m.push(R.numSunLights),m.push(R.numDirLights),m.push(R.numPointLights),m.push(R.numSpotLights),m.push(R.numSpotLightMaps),m.push(R.numHemiLights),m.push(R.numRectAreaLights),m.push(R.numSunLightShadows),m.push(R.numDirLightShadows),m.push(R.numPointLightShadows),m.push(R.numSpotLightShadows),m.push(R.numSpotLightShadowsWithMaps),m.push(R.numLightProbes),m.push(R.shadowMapType),m.push(R.toneMapping),m.push(R.numClippingPlanes),m.push(R.numClipIntersection),m.push(R.depthPacking)}function _(m,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.retroreflection&&a.enable(24),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),m.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),m.push(a.mask)}function y(m){const R=p[m.type];let L;if(R){const N=fi[R];L=dE.clone(N.uniforms)}else L=m.uniforms;return L}function x(m,R){let L=f.get(R);return L!==void 0?++L.usedTimes:(L=new VA(t,R,m,r),c.push(L),f.set(R,L)),L}function E(m){if(--m.usedTimes===0){const R=c.indexOf(m);c[R]=c[c.length-1],c.pop(),f.delete(m.cacheKey),m.destroy()}}function T(m){o.remove(m)}function C(){o.dispose()}return{getParameters:w,getProgramCacheKey:g,getUniforms:y,acquireProgram:x,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:C}}function qA(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function $A(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function hg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function pg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,v,w,g,d){let _=t[e];return _===void 0?(_={id:u.id,object:u,geometry:p,material:v,materialVariant:a(u),groupOrder:w,renderOrder:u.renderOrder,z:g,group:d},t[e]=_):(_.id=u.id,_.object=u,_.geometry=p,_.material=v,_.materialVariant=a(u),_.groupOrder=w,_.renderOrder=u.renderOrder,_.z=g,_.group=d),e++,_}function l(u,p,v,w,g,d,_){_.reversedDepth===!0&&(g=-g);const y=o(u,p,v,w,g,d);v.transmission>0?i.push(y):v.transparent===!0?r.push(y):n.push(y)}function c(u,p,v,w,g,d){const _=o(u,p,v,w,g,d);v.transmission>0?i.unshift(_):v.transparent===!0?r.unshift(_):n.unshift(_)}function f(u,p){n.length>1&&n.sort(u||$A),i.length>1&&i.sort(p||hg),r.length>1&&r.sort(p||hg)}function h(){for(let u=e,p=t.length;u<p;u++){const v=t[u];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:f}}function KA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new pg,t.set(i,[a])):r>=s.length?(a=new pg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function ZA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={direction:new B,color:new nt};break;case"SpotLight":n={position:new B,direction:new B,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new B,color:new nt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new B,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":n={color:new nt,position:new B,halfWidth:new B,halfHeight:new B};break}return t[e.id]=n,n}}}function JA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let QA=0;function eC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function tC(t){const e=new ZA,n=JA(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const r=new B,s=new Tt,a=new Tt;function o(c){let f=0,h=0,u=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let p=0,v=0,w=0,g=0,d=0,_=0,y=0,x=0,E=0,T=0,C=0,m=0,R=0,L=0;c.sort(eC);for(let F=0,W=c.length;F<W;F++){const D=c[F],G=D.color,te=D.intensity,Y=D.distance;let H=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===jr?H=D.shadow.map.texture:H=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=G.r*te,h+=G.g*te,u+=G.b*te;else if(D.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(D.sh.coefficients[k],te);L++}else if(D.isSunLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const X=D.shadow,q=n.get(D);q.shadowIntensity=X.intensity,q.shadowBias=X.bias,q.shadowNormalBias=X.normalBias,q.shadowRadius=X.radius,q.shadowMapSize.copy(X.mapSize).multiply(X.getFrameExtents()),i.sunShadow[v]=q,i.sunShadowMap[v]=H;const de=X.getViewportCount();for(let ce=0;ce<de;ce++)i.sunShadowMatrix[w+ce]=X.getMatrix(ce),i.sunShadowCascade[w+ce]=X._cascadeData[ce];w+=de,v++}i.sun[p]=k,p++}else if(D.isDirectionalLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const X=D.shadow,q=n.get(D);q.shadowIntensity=X.intensity,q.shadowBias=X.bias,q.shadowNormalBias=X.normalBias,q.shadowRadius=X.radius,q.shadowMapSize=X.mapSize,i.directionalShadow[g]=q,i.directionalShadowMap[g]=H,i.directionalShadowMatrix[g]=D.shadow.matrix,E++}i.directional[g]=k,g++}else if(D.isSpotLight){const k=e.get(D);k.position.setFromMatrixPosition(D.matrixWorld),k.color.copy(G).multiplyScalar(te),k.distance=Y,k.coneCos=Math.cos(D.angle),k.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),k.decay=D.decay,i.spot[_]=k;const X=D.shadow;if(D.map&&(i.spotLightMap[m]=D.map,m++,X.updateMatrices(D),D.castShadow&&R++),i.spotLightMatrix[_]=X.matrix,D.castShadow){const q=n.get(D);q.shadowIntensity=X.intensity,q.shadowBias=X.bias,q.shadowNormalBias=X.normalBias,q.shadowRadius=X.radius,q.shadowMapSize=X.mapSize,i.spotShadow[_]=q,i.spotShadowMap[_]=H,C++}_++}else if(D.isRectAreaLight){const k=e.get(D);k.color.copy(G).multiplyScalar(te),k.halfWidth.set(D.width*.5,0,0),k.halfHeight.set(0,D.height*.5,0),i.rectArea[y]=k,y++}else if(D.isPointLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),k.distance=D.distance,k.decay=D.decay,D.castShadow){const X=D.shadow,q=n.get(D);q.shadowIntensity=X.intensity,q.shadowBias=X.bias,q.shadowNormalBias=X.normalBias,q.shadowRadius=X.radius,q.shadowMapSize=X.mapSize,q.shadowCameraNear=X.camera.near,q.shadowCameraFar=X.camera.far,i.pointShadow[d]=q,i.pointShadowMap[d]=H,i.pointShadowMatrix[d]=D.shadow.matrix,T++}i.point[d]=k,d++}else if(D.isHemisphereLight){const k=e.get(D);k.skyColor.copy(D.color).multiplyScalar(te),k.groundColor.copy(D.groundColor).multiplyScalar(te),i.hemi[x]=k,x++}}y>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=u;const N=i.hash;(N.sunLength!==p||N.directionalLength!==g||N.pointLength!==d||N.spotLength!==_||N.rectAreaLength!==y||N.hemiLength!==x||N.numSunShadows!==v||N.numDirectionalShadows!==E||N.numPointShadows!==T||N.numSpotShadows!==C||N.numSpotMaps!==m||N.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=g,i.spot.length=_,i.rectArea.length=y,i.point.length=d,i.hemi.length=x,i.sunShadow.length=v,i.sunShadowMap.length=v,i.sunShadowMatrix.length=w,i.sunShadowCascade.length=w,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=C,i.spotShadowMap.length=C,i.spotLightMatrix.length=C+m-R,i.spotLightMap.length=m,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=L,N.sunLength=p,N.directionalLength=g,N.pointLength=d,N.spotLength=_,N.rectAreaLength=y,N.hemiLength=x,N.numSunShadows=v,N.numDirectionalShadows=E,N.numPointShadows=T,N.numSpotShadows=C,N.numSpotMaps=m,N.numLightProbes=L,i.version=QA++)}function l(c,f){let h=0,u=0,p=0,v=0,w=0,g=0;const d=f.matrixWorldInverse;for(let _=0,y=c.length;_<y;_++){const x=c[_];if(x.isSunLight){const E=i.sun[h];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(d),h++}else if(x.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(d),u++}else if(x.isSpotLight){const E=i.spot[v];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(d),E.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(d),v++}else if(x.isRectAreaLight){const E=i.rectArea[w];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(d),a.identity(),s.copy(x.matrixWorld),s.premultiply(d),a.extractRotation(s),E.halfWidth.set(x.width*.5,0,0),E.halfHeight.set(0,x.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),w++}else if(x.isPointLight){const E=i.point[p];E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(d),p++}else if(x.isHemisphereLight){const E=i.hemi[g];E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(d),g++}}}return{setup:o,setupView:l,state:i}}function mg(t){const e=new tC(t),n=[],i=[],r=[];function s(u){h.camera=u,n.length=0,i.length=0,r.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){r.push(u)}function c(){e.setup(n)}function f(u){e.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:f,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function nC(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new mg(t),e.set(r,[o])):s>=a.length?(o=new mg(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const iC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rC=`uniform sampler2D shadow_pass;
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
}`,sC=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],aC=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],gg=new Tt,xa=new B,Wu=new B;function oC(t,e,n){let i=new Uh;const r=new ze,s=new ze,a=new Et,o=new mE,l=new gE,c={},f=n.maxTextureSize,h={[Xr]:Tn,[Tn]:Xr,[Ni]:Ni},u=new Mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:iC,fragmentShader:rC}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const v=new Yn;v.setAttribute("position",new Bi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new mt(v,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oa;let d=this.type;this.render=function(T,C,m){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===zy&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Oa);const R=t.getRenderTarget(),L=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),F=t.state;F.setBlending(Fi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const W=d!==this.type;W&&C.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(G=>G.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,G=T.length;D<G;D++){const te=T[D],Y=te.shadow;if(Y===void 0){Ve("WebGLShadowMap:",te,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;r.copy(Y.mapSize);const H=Y.getFrameExtents();r.multiply(H),s.copy(Y.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/H.x),r.x=s.x*H.x,Y.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/H.y),r.y=s.y*H.y,Y.mapSize.y=s.y));const k=t.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=k,Y.map===null||W===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===Ta){if(te.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new si(r.x,r.y,{format:jr,type:yi,minFilter:on,magFilter:on,generateMipmaps:!1}),Y.map.texture.name=te.name+".shadowMap",Y.map.depthTexture=new co(r.x,r.y,mi),Y.map.depthTexture.name=te.name+".shadowMapDepth",Y.map.depthTexture.format=Gi,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Kt,Y.map.depthTexture.magFilter=Kt}else te.isPointLight?(Y.map=new M_(r.x),Y.map.depthTexture=new qM(r.x,Si)):(Y.map=new si(r.x,r.y),Y.map.depthTexture=new co(r.x,r.y,Si)),Y.map.depthTexture.name=te.name+".shadowMap",Y.map.depthTexture.format=Gi,this.type===Oa?(Y.map.depthTexture.compareFunction=k?Nh:Lh,Y.map.depthTexture.minFilter=on,Y.map.depthTexture.magFilter=on):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Kt,Y.map.depthTexture.magFilter=Kt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==r.x||Y.map.height!==r.y)&&Y.map.setSize(r.x,r.y);const X=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();te.isPointLight!==!0&&Y.updateMatrices(te,m);for(let q=0;q<X;q++){const de=Y.getCamera(q);if(te.isPointLight){const ce=Y.camera,Oe=Y.matrix,Q=te.distance||ce.far;Q!==ce.far&&(ce.far=Q,ce.updateProjectionMatrix()),xa.setFromMatrixPosition(te.matrixWorld),ce.position.copy(xa),Wu.copy(ce.position),Wu.add(sC[q]),ce.up.copy(aC[q]),ce.lookAt(Wu),ce.updateMatrixWorld(),Oe.makeTranslation(-xa.x,-xa.y,-xa.z),gg.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(gg,ce.coordinateSystem,ce.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)t.setRenderTarget(Y.map,q),t.clear();else{q===0&&(t.setRenderTarget(Y.map),t.clear());const ce=Y.getViewport(q);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),F.viewport(a)}i=Y.getFrustum(q),x(C,m,de,te,this.type)}Y.isPointLightShadow!==!0&&this.type===Ta&&_(Y,m),Y.needsUpdate=!1}d=this.type,g.needsUpdate=!1,t.setRenderTarget(R,L,N)};function _(T,C){const m=e.update(w);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null?T.mapPass=new si(r.x,r.y,{format:jr,type:yi}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,t.setRenderTarget(T.mapPass),t.clear(),t.renderBufferDirect(C,null,m,u,w,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,t.setRenderTarget(T.map),t.clear(),t.renderBufferDirect(C,null,m,p,w,null)}function y(T,C,m,R){let L=null;const N=m.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)L=N;else if(L=m.isPointLight===!0?l:o,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=L.uuid,W=C.uuid;let D=c[F];D===void 0&&(D={},c[F]=D);let G=D[W];G===void 0&&(G=L.clone(),D[W]=G,C.addEventListener("dispose",E)),L=G}if(L.visible=C.visible,L.wireframe=C.wireframe,R===Ta?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:h[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,m.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const F=t.properties.get(L);F.light=m}return L}function x(T,C,m,R,L){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===Ta)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,T.matrixWorld);const W=e.update(T),D=T.material;if(Array.isArray(D)){const G=W.groups;for(let te=0,Y=G.length;te<Y;te++){const H=G[te],k=D[H.materialIndex];if(k&&k.visible){const X=y(T,k,R,L);T.onBeforeShadow(t,T,C,m,W,X,H),t.renderBufferDirect(m,null,W,X,T,H),T.onAfterShadow(t,T,C,m,W,X,H)}}}else if(D.visible){const G=y(T,D,R,L);T.onBeforeShadow(t,T,C,m,W,G,null),t.renderBufferDirect(m,null,W,G,T,null),T.onAfterShadow(t,T,C,m,W,G,null)}}const F=T.children;for(let W=0,D=F.length;W<D;W++)x(F[W],C,m,R,L)}function E(T){T.target.removeEventListener("dispose",E);for(const m in c){const R=c[m],L=T.target.uuid;L in R&&(R[L].dispose(),delete R[L])}}}function lC(t,e){function n(){let P=!1;const se=new Et;let j=null;const ve=new Et(0,0,0,0);return{setMask:function(_e){j!==_e&&!P&&(t.colorMask(_e,_e,_e,_e),j=_e)},setLocked:function(_e){P=_e},setClear:function(_e,oe,Le,Ce,qe){qe===!0&&(_e*=Ce,oe*=Ce,Le*=Ce),se.set(_e,oe,Le,Ce),ve.equals(se)===!1&&(t.clearColor(_e,oe,Le,Ce),ve.copy(se))},reset:function(){P=!1,j=null,ve.set(-1,0,0,0)}}}function i(){let P=!1,se=!1,j=null,ve=null,_e=null;return{setReversed:function(oe){if(se!==oe){const Le=e.get("EXT_clip_control");oe?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),se=oe;const Ce=_e;_e=null,this.setClear(Ce)}},getReversed:function(){return se},setTest:function(oe){oe?Z(t.DEPTH_TEST):fe(t.DEPTH_TEST)},setMask:function(oe){j!==oe&&!P&&(t.depthMask(oe),j=oe)},setFunc:function(oe){if(se&&(oe=yM[oe]),ve!==oe){switch(oe){case kd:t.depthFunc(t.NEVER);break;case zd:t.depthFunc(t.ALWAYS);break;case Hd:t.depthFunc(t.LESS);break;case so:t.depthFunc(t.LEQUAL);break;case Vd:t.depthFunc(t.EQUAL);break;case Gd:t.depthFunc(t.GEQUAL);break;case Wd:t.depthFunc(t.GREATER);break;case Xd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ve=oe}},setLocked:function(oe){P=oe},setClear:function(oe){_e!==oe&&(_e=oe,se&&(oe=1-oe),t.clearDepth(oe))},reset:function(){P=!1,j=null,ve=null,_e=null,se=!1}}}function r(){let P=!1,se=null,j=null,ve=null,_e=null,oe=null,Le=null,Ce=null,qe=null;return{setTest:function($e){P||($e?Z(t.STENCIL_TEST):fe(t.STENCIL_TEST))},setMask:function($e){se!==$e&&!P&&(t.stencilMask($e),se=$e)},setFunc:function($e,Dt,Bt){(j!==$e||ve!==Dt||_e!==Bt)&&(t.stencilFunc($e,Dt,Bt),j=$e,ve=Dt,_e=Bt)},setOp:function($e,Dt,Bt){(oe!==$e||Le!==Dt||Ce!==Bt)&&(t.stencilOp($e,Dt,Bt),oe=$e,Le=Dt,Ce=Bt)},setLocked:function($e){P=$e},setClear:function($e){qe!==$e&&(t.clearStencil($e),qe=$e)},reset:function(){P=!1,se=null,j=null,ve=null,_e=null,oe=null,Le=null,Ce=null,qe=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let f={},h={},u={},p=new WeakMap,v=[],w=null,g=!1,d=null,_=null,y=null,x=null,E=null,T=null,C=null,m=new nt(0,0,0),R=0,L=!1,N=null,F=null,W=null,D=null,G=null;const te=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,H=0;const k=t.getParameter(t.VERSION);k.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(k)[1]),Y=H>=1):k.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),Y=H>=2);let X=null,q={};const de=t.getParameter(t.SCISSOR_BOX),ce=t.getParameter(t.VIEWPORT),Oe=new Et().fromArray(de),Q=new Et().fromArray(ce);function le(P,se,j,ve){const _e=new Uint8Array(4),oe=t.createTexture();t.bindTexture(P,oe),t.texParameteri(P,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(P,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Le=0;Le<j;Le++)P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY?t.texImage3D(se,0,t.RGBA,1,1,ve,0,t.RGBA,t.UNSIGNED_BYTE,_e):t.texImage2D(se+Le,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,_e);return oe}const z={};z[t.TEXTURE_2D]=le(t.TEXTURE_2D,t.TEXTURE_2D,1),z[t.TEXTURE_CUBE_MAP]=le(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[t.TEXTURE_2D_ARRAY]=le(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),z[t.TEXTURE_3D]=le(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(t.DEPTH_TEST),a.setFunc(so),Be(!1),et(_m),Z(t.CULL_FACE),pe(Fi);function Z(P){f[P]!==!0&&(t.enable(P),f[P]=!0)}function fe(P){f[P]!==!1&&(t.disable(P),f[P]=!1)}function Me(P,se){return u[P]!==se?(t.bindFramebuffer(P,se),u[P]=se,P===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=se),P===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=se),!0):!1}function ge(P,se){let j=v,ve=!1;if(P){j=p.get(se),j===void 0&&(j=[],p.set(se,j));const _e=P.textures;if(j.length!==_e.length||j[0]!==t.COLOR_ATTACHMENT0){for(let oe=0,Le=_e.length;oe<Le;oe++)j[oe]=t.COLOR_ATTACHMENT0+oe;j.length=_e.length,ve=!0}}else j[0]!==t.BACK&&(j[0]=t.BACK,ve=!0);ve&&t.drawBuffers(j)}function Ie(P){return w!==P?(t.useProgram(P),w=P,!0):!1}const it={[gs]:t.FUNC_ADD,[Vy]:t.FUNC_SUBTRACT,[Gy]:t.FUNC_REVERSE_SUBTRACT};it[Wy]=t.MIN,it[Xy]=t.MAX;const He={[Yy]:t.ZERO,[jy]:t.ONE,[qy]:t.SRC_COLOR,[Hv]:t.SRC_ALPHA,[eM]:t.SRC_ALPHA_SATURATE,[Jy]:t.DST_COLOR,[Ky]:t.DST_ALPHA,[$y]:t.ONE_MINUS_SRC_COLOR,[Vv]:t.ONE_MINUS_SRC_ALPHA,[Qy]:t.ONE_MINUS_DST_COLOR,[Zy]:t.ONE_MINUS_DST_ALPHA,[tM]:t.CONSTANT_COLOR,[nM]:t.ONE_MINUS_CONSTANT_COLOR,[iM]:t.CONSTANT_ALPHA,[rM]:t.ONE_MINUS_CONSTANT_ALPHA};function pe(P,se,j,ve,_e,oe,Le,Ce,qe,$e){if(P===Fi){g===!0&&(fe(t.BLEND),g=!1);return}if(g===!1&&(Z(t.BLEND),g=!0),P!==Hy){if(P!==d||$e!==L){if((_!==gs||E!==gs)&&(t.blendEquation(t.FUNC_ADD),_=gs,E=gs),$e)switch(P){case Ba:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case xm:t.blendFunc(t.ONE,t.ONE);break;case Sm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case ym:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:at("WebGLState: Invalid blending: ",P);break}else switch(P){case Ba:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case xm:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Sm:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ym:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",P);break}y=null,x=null,T=null,C=null,m.set(0,0,0),R=0,d=P,L=$e}return}_e=_e||se,oe=oe||j,Le=Le||ve,(se!==_||_e!==E)&&(t.blendEquationSeparate(it[se],it[_e]),_=se,E=_e),(j!==y||ve!==x||oe!==T||Le!==C)&&(t.blendFuncSeparate(He[j],He[ve],He[oe],He[Le]),y=j,x=ve,T=oe,C=Le),(Ce.equals(m)===!1||qe!==R)&&(t.blendColor(Ce.r,Ce.g,Ce.b,qe),m.copy(Ce),R=qe),d=P,L=!1}function Ge(P,se){P.side===Ni?fe(t.CULL_FACE):Z(t.CULL_FACE);let j=P.side===Tn;se&&(j=!j),Be(j),P.blending===Ba&&P.transparent===!1?pe(Fi):pe(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const ve=P.stencilWrite;o.setTest(ve),ve&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Nt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Z(t.SAMPLE_ALPHA_TO_COVERAGE):fe(t.SAMPLE_ALPHA_TO_COVERAGE)}function Be(P){N!==P&&(P?t.frontFace(t.CW):t.frontFace(t.CCW),N=P)}function et(P){P!==By?(Z(t.CULL_FACE),P!==F&&(P===_m?t.cullFace(t.BACK):P===ky?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):fe(t.CULL_FACE),F=P}function Xe(P){P!==W&&(Y&&t.lineWidth(P),W=P)}function Nt(P,se,j){P?(Z(t.POLYGON_OFFSET_FILL),(D!==se||G!==j)&&(D=se,G=j,a.getReversed()&&(se=-se),t.polygonOffset(se,j))):fe(t.POLYGON_OFFSET_FILL)}function ct(P){P?Z(t.SCISSOR_TEST):fe(t.SCISSOR_TEST)}function Ct(P){P===void 0&&(P=t.TEXTURE0+te-1),X!==P&&(t.activeTexture(P),X=P)}function U(P,se,j){j===void 0&&(X===null?j=t.TEXTURE0+te-1:j=X);let ve=q[j];ve===void 0&&(ve={type:void 0,texture:void 0},q[j]=ve),(ve.type!==P||ve.texture!==se)&&(X!==j&&(t.activeTexture(j),X=j),t.bindTexture(P,se||z[P]),ve.type=P,ve.texture=se)}function Gt(){const P=q[X];P!==void 0&&P.type!==void 0&&(t.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function ot(){try{t.compressedTexImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function b(){try{t.compressedTexImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function S(){try{t.texSubImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function V(){try{t.texSubImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function J(){try{t.compressedTexSubImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function ne(){try{t.compressedTexSubImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function me(){try{t.texStorage2D(...arguments)}catch(P){at("WebGLState:",P)}}function xe(){try{t.texStorage3D(...arguments)}catch(P){at("WebGLState:",P)}}function ie(){try{t.texImage2D(...arguments)}catch(P){at("WebGLState:",P)}}function ae(){try{t.texImage3D(...arguments)}catch(P){at("WebGLState:",P)}}function Se(P){return h[P]!==void 0?h[P]:t.getParameter(P)}function Ue(P,se){h[P]!==se&&(t.pixelStorei(P,se),h[P]=se)}function Ee(P){Oe.equals(P)===!1&&(t.scissor(P.x,P.y,P.z,P.w),Oe.copy(P))}function ye(P){Q.equals(P)===!1&&(t.viewport(P.x,P.y,P.z,P.w),Q.copy(P))}function O(P,se){let j=c.get(se);j===void 0&&(j=new WeakMap,c.set(se,j));let ve=j.get(P);ve===void 0&&(ve=t.getUniformBlockIndex(se,P.name),j.set(P,ve))}function re(P,se){const ve=c.get(se).get(P);l.get(se)!==ve&&(t.uniformBlockBinding(se,ve,P.__bindingPointIndex),l.set(se,ve))}function ue(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},h={},X=null,q={},u={},p=new WeakMap,v=[],w=null,g=!1,d=null,_=null,y=null,x=null,E=null,T=null,C=null,m=new nt(0,0,0),R=0,L=!1,N=null,F=null,W=null,D=null,G=null,Oe.set(0,0,t.canvas.width,t.canvas.height),Q.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Z,disable:fe,bindFramebuffer:Me,drawBuffers:ge,useProgram:Ie,setBlending:pe,setMaterial:Ge,setFlipSided:Be,setCullFace:et,setLineWidth:Xe,setPolygonOffset:Nt,setScissorTest:ct,activeTexture:Ct,bindTexture:U,unbindTexture:Gt,compressedTexImage2D:ot,compressedTexImage3D:b,texImage2D:ie,texImage3D:ae,pixelStorei:Ue,getParameter:Se,updateUBOMapping:O,uniformBlockBinding:re,texStorage2D:me,texStorage3D:xe,texSubImage2D:S,texSubImage3D:V,compressedTexSubImage2D:J,compressedTexSubImage3D:ne,scissor:Ee,viewport:ye,reset:ue}}function cC(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,f=new WeakMap,h=new Set;let u;const p=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(b,S){return v?new OffscreenCanvas(b,S):oc("canvas")}function g(b,S,V){let J=1;const ne=ot(b);if((ne.width>V||ne.height>V)&&(J=V/Math.max(ne.width,ne.height)),J<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const me=Math.floor(J*ne.width),xe=Math.floor(J*ne.height);u===void 0&&(u=w(me,xe));const ie=S?w(me,xe):u;return ie.width=me,ie.height=xe,ie.getContext("2d").drawImage(b,0,0,me,xe),Ve("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+me+"x"+xe+")."),ie}else return"data"in b&&Ve("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),b;return b}function d(b){return b.generateMipmaps}function _(b){t.generateMipmap(b)}function y(b){return b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?t.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(b,S,V,J,ne,me=!1){if(b!==null){if(t[b]!==void 0)return t[b];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let xe;J&&(xe=e.get("EXT_texture_norm16"),xe||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=S;if(S===t.RED&&(V===t.FLOAT&&(ie=t.R32F),V===t.HALF_FLOAT&&(ie=t.R16F),V===t.UNSIGNED_BYTE&&(ie=t.R8),V===t.UNSIGNED_SHORT&&xe&&(ie=xe.R16_EXT),V===t.SHORT&&xe&&(ie=xe.R16_SNORM_EXT)),S===t.RED_INTEGER&&(V===t.UNSIGNED_BYTE&&(ie=t.R8UI),V===t.UNSIGNED_SHORT&&(ie=t.R16UI),V===t.UNSIGNED_INT&&(ie=t.R32UI),V===t.BYTE&&(ie=t.R8I),V===t.SHORT&&(ie=t.R16I),V===t.INT&&(ie=t.R32I)),S===t.RG&&(V===t.FLOAT&&(ie=t.RG32F),V===t.HALF_FLOAT&&(ie=t.RG16F),V===t.UNSIGNED_BYTE&&(ie=t.RG8),V===t.UNSIGNED_SHORT&&xe&&(ie=xe.RG16_EXT),V===t.SHORT&&xe&&(ie=xe.RG16_SNORM_EXT)),S===t.RG_INTEGER&&(V===t.UNSIGNED_BYTE&&(ie=t.RG8UI),V===t.UNSIGNED_SHORT&&(ie=t.RG16UI),V===t.UNSIGNED_INT&&(ie=t.RG32UI),V===t.BYTE&&(ie=t.RG8I),V===t.SHORT&&(ie=t.RG16I),V===t.INT&&(ie=t.RG32I)),S===t.RGB_INTEGER&&(V===t.UNSIGNED_BYTE&&(ie=t.RGB8UI),V===t.UNSIGNED_SHORT&&(ie=t.RGB16UI),V===t.UNSIGNED_INT&&(ie=t.RGB32UI),V===t.BYTE&&(ie=t.RGB8I),V===t.SHORT&&(ie=t.RGB16I),V===t.INT&&(ie=t.RGB32I)),S===t.RGBA_INTEGER&&(V===t.UNSIGNED_BYTE&&(ie=t.RGBA8UI),V===t.UNSIGNED_SHORT&&(ie=t.RGBA16UI),V===t.UNSIGNED_INT&&(ie=t.RGBA32UI),V===t.BYTE&&(ie=t.RGBA8I),V===t.SHORT&&(ie=t.RGBA16I),V===t.INT&&(ie=t.RGBA32I)),S===t.RGB&&(V===t.UNSIGNED_SHORT&&xe&&(ie=xe.RGB16_EXT),V===t.SHORT&&xe&&(ie=xe.RGB16_SNORM_EXT),V===t.UNSIGNED_INT_5_9_9_9_REV&&(ie=t.RGB9_E5),V===t.UNSIGNED_INT_10F_11F_11F_REV&&(ie=t.R11F_G11F_B10F)),S===t.RGBA){const ae=me?ac:tt.getTransfer(ne);V===t.FLOAT&&(ie=t.RGBA32F),V===t.HALF_FLOAT&&(ie=t.RGBA16F),V===t.UNSIGNED_BYTE&&(ie=ae===ut?t.SRGB8_ALPHA8:t.RGBA8),V===t.UNSIGNED_SHORT&&xe&&(ie=xe.RGBA16_EXT),V===t.SHORT&&xe&&(ie=xe.RGBA16_SNORM_EXT),V===t.UNSIGNED_SHORT_4_4_4_4&&(ie=t.RGBA4),V===t.UNSIGNED_SHORT_5_5_5_1&&(ie=t.RGB5_A1)}return(ie===t.R16F||ie===t.R32F||ie===t.RG16F||ie===t.RG32F||ie===t.RGBA16F||ie===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function E(b,S){let V;return b?S===null||S===Si||S===oo?V=t.DEPTH24_STENCIL8:S===mi?V=t.DEPTH32F_STENCIL8:S===ao&&(V=t.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Si||S===oo?V=t.DEPTH_COMPONENT24:S===mi?V=t.DEPTH_COMPONENT32F:S===ao&&(V=t.DEPTH_COMPONENT16),V}function T(b,S){return d(b)===!0||b.isFramebufferTexture&&b.minFilter!==Kt&&b.minFilter!==on?Math.log2(Math.max(S.width,S.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?S.mipmaps.length:1}function C(b){const S=b.target;S.removeEventListener("dispose",C),R(S),S.isVideoTexture&&f.delete(S),S.isHTMLTexture&&h.delete(S)}function m(b){const S=b.target;S.removeEventListener("dispose",m),N(S)}function R(b){const S=i.get(b);if(S.__webglInit===void 0)return;const V=b.source,J=p.get(V);if(J){const ne=J[S.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&L(b),Object.keys(J).length===0&&p.delete(V)}i.remove(b)}function L(b){const S=i.get(b);t.deleteTexture(S.__webglTexture);const V=b.source,J=p.get(V);delete J[S.__cacheKey],a.memory.textures--}function N(b){const S=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(S.__webglFramebuffer[J]))for(let ne=0;ne<S.__webglFramebuffer[J].length;ne++)t.deleteFramebuffer(S.__webglFramebuffer[J][ne]);else t.deleteFramebuffer(S.__webglFramebuffer[J]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[J])}else{if(Array.isArray(S.__webglFramebuffer))for(let J=0;J<S.__webglFramebuffer.length;J++)t.deleteFramebuffer(S.__webglFramebuffer[J]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let J=0;J<S.__webglColorRenderbuffer.length;J++)S.__webglColorRenderbuffer[J]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[J]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const V=b.textures;for(let J=0,ne=V.length;J<ne;J++){const me=i.get(V[J]);me.__webglTexture&&(t.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(V[J])}i.remove(b)}let F=0;function W(){F=0}function D(){return F}function G(b){F=b}function te(){const b=F;return b>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+r.maxTextures),F+=1,b}function Y(b){const S=[];return S.push(b.wrapS),S.push(b.wrapT),S.push(b.wrapR||0),S.push(b.magFilter),S.push(b.minFilter),S.push(b.anisotropy),S.push(b.internalFormat),S.push(b.format),S.push(b.type),S.push(b.generateMipmaps),S.push(b.premultiplyAlpha),S.push(b.flipY),S.push(b.unpackAlignment),S.push(b.colorSpace),S.join()}function H(b,S){const V=i.get(b);if(b.isVideoTexture&&U(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&V.__version!==b.version){const J=b.image;if(J===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{fe(V,b,S);return}}else b.isExternalTexture&&(V.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,V.__webglTexture,t.TEXTURE0+S)}function k(b,S){const V=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){fe(V,b,S);return}else b.isExternalTexture&&(V.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,V.__webglTexture,t.TEXTURE0+S)}function X(b,S){const V=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&V.__version!==b.version){fe(V,b,S);return}n.bindTexture(t.TEXTURE_3D,V.__webglTexture,t.TEXTURE0+S)}function q(b,S){const V=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&V.__version!==b.version){Me(V,b,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,V.__webglTexture,t.TEXTURE0+S)}const de={[nc]:t.REPEAT,[pi]:t.CLAMP_TO_EDGE,[Yd]:t.MIRRORED_REPEAT},ce={[Kt]:t.NEAREST,[oM]:t.NEAREST_MIPMAP_NEAREST,[Xo]:t.NEAREST_MIPMAP_LINEAR,[on]:t.LINEAR,[du]:t.LINEAR_MIPMAP_NEAREST,[Fr]:t.LINEAR_MIPMAP_LINEAR},Oe={[dM]:t.NEVER,[gM]:t.ALWAYS,[fM]:t.LESS,[Lh]:t.LEQUAL,[hM]:t.EQUAL,[Nh]:t.GEQUAL,[pM]:t.GREATER,[mM]:t.NOTEQUAL};function Q(b,S){if(S.type===mi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===on||S.magFilter===du||S.magFilter===Xo||S.magFilter===Fr||S.minFilter===on||S.minFilter===du||S.minFilter===Xo||S.minFilter===Fr)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,de[S.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,de[S.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,de[S.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,ce[S.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,ce[S.minFilter]),S.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,Oe[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Kt||S.minFilter!==Xo&&S.minFilter!==Fr||S.type===mi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function le(b,S){let V=!1;b.__webglInit===void 0&&(b.__webglInit=!0,S.addEventListener("dispose",C));const J=S.source;let ne=p.get(J);ne===void 0&&(ne={},p.set(J,ne));const me=Y(S);if(me!==b.__cacheKey){ne[me]===void 0&&(ne[me]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,V=!0),ne[me].usedTimes++;const xe=ne[b.__cacheKey];xe!==void 0&&(ne[b.__cacheKey].usedTimes--,xe.usedTimes===0&&L(S)),b.__cacheKey=me,b.__webglTexture=ne[me].texture}return V}function z(b,S,V){return Math.floor(Math.floor(b/V)/S)}function Z(b,S,V,J){const me=b.updateRanges;if(me.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,V,J,S.data);else{me.sort((Ue,Ee)=>Ue.start-Ee.start);let xe=0;for(let Ue=1;Ue<me.length;Ue++){const Ee=me[xe],ye=me[Ue],O=Ee.start+Ee.count,re=z(ye.start,S.width,4),ue=z(Ee.start,S.width,4);ye.start<=O+1&&re===ue&&z(ye.start+ye.count-1,S.width,4)===re?Ee.count=Math.max(Ee.count,ye.start+ye.count-Ee.start):(++xe,me[xe]=ye)}me.length=xe+1;const ie=n.getParameter(t.UNPACK_ROW_LENGTH),ae=n.getParameter(t.UNPACK_SKIP_PIXELS),Se=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let Ue=0,Ee=me.length;Ue<Ee;Ue++){const ye=me[Ue],O=Math.floor(ye.start/4),re=Math.ceil(ye.count/4),ue=O%S.width,P=Math.floor(O/S.width),se=re,j=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,ue),n.pixelStorei(t.UNPACK_SKIP_ROWS,P),n.texSubImage2D(t.TEXTURE_2D,0,ue,P,se,j,V,J,S.data)}b.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,ie),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ae),n.pixelStorei(t.UNPACK_SKIP_ROWS,Se)}}function fe(b,S,V){let J=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(J=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(J=t.TEXTURE_3D);const ne=le(b,S),me=S.source;n.bindTexture(J,b.__webglTexture,t.TEXTURE0+V);const xe=i.get(me);if(me.version!==xe.__version||ne===!0){if(n.activeTexture(t.TEXTURE0+V),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const j=tt.getPrimaries(tt.workingColorSpace),ve=S.colorSpace===ar?null:tt.getPrimaries(S.colorSpace),_e=S.colorSpace===ar||j===ve?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment);let ae=g(S.image,!1,r.maxTextureSize);ae=Gt(S,ae);const Se=s.convert(S.format,S.colorSpace),Ue=s.convert(S.type);let Ee=x(S.internalFormat,Se,Ue,S.normalized,S.colorSpace,S.isVideoTexture);Q(J,S);let ye;const O=S.mipmaps,re=S.isVideoTexture!==!0,ue=xe.__version===void 0||ne===!0,P=me.dataReady,se=T(S,ae);if(S.isDepthTexture)Ee=E(S.format===Or,S.type),ue&&(re?n.texStorage2D(t.TEXTURE_2D,1,Ee,ae.width,ae.height):n.texImage2D(t.TEXTURE_2D,0,Ee,ae.width,ae.height,0,Se,Ue,null));else if(S.isDataTexture)if(O.length>0){re&&ue&&n.texStorage2D(t.TEXTURE_2D,se,Ee,O[0].width,O[0].height);for(let j=0,ve=O.length;j<ve;j++)ye=O[j],re?P&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,ye.width,ye.height,Se,Ue,ye.data):n.texImage2D(t.TEXTURE_2D,j,Ee,ye.width,ye.height,0,Se,Ue,ye.data);S.generateMipmaps=!1}else re?(ue&&n.texStorage2D(t.TEXTURE_2D,se,Ee,ae.width,ae.height),P&&Z(S,ae,Se,Ue)):n.texImage2D(t.TEXTURE_2D,0,Ee,ae.width,ae.height,0,Se,Ue,ae.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){re&&ue&&n.texStorage3D(t.TEXTURE_2D_ARRAY,se,Ee,O[0].width,O[0].height,ae.depth);for(let j=0,ve=O.length;j<ve;j++)if(ye=O[j],S.format!==ni)if(Se!==null)if(re){if(P)if(S.layerUpdates.size>0){const _e=qm(ye.width,ye.height,S.format,S.type);for(const oe of S.layerUpdates){const Le=ye.data.subarray(oe*_e/ye.data.BYTES_PER_ELEMENT,(oe+1)*_e/ye.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,oe,ye.width,ye.height,1,Se,Le)}}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,0,ye.width,ye.height,ae.depth,Se,ye.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,j,Ee,ye.width,ye.height,ae.depth,0,ye.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?P&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,j,0,0,0,ye.width,ye.height,ae.depth,Se,Ue,ye.data):n.texImage3D(t.TEXTURE_2D_ARRAY,j,Ee,ye.width,ye.height,ae.depth,0,Se,Ue,ye.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{re&&ue&&n.texStorage2D(t.TEXTURE_2D,se,Ee,O[0].width,O[0].height);for(let j=0,ve=O.length;j<ve;j++)ye=O[j],S.format!==ni?Se!==null?re?P&&n.compressedTexSubImage2D(t.TEXTURE_2D,j,0,0,ye.width,ye.height,Se,ye.data):n.compressedTexImage2D(t.TEXTURE_2D,j,Ee,ye.width,ye.height,0,ye.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?P&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,ye.width,ye.height,Se,Ue,ye.data):n.texImage2D(t.TEXTURE_2D,j,Ee,ye.width,ye.height,0,Se,Ue,ye.data)}else if(S.isDataArrayTexture)if(re){if(ue&&n.texStorage3D(t.TEXTURE_2D_ARRAY,se,Ee,ae.width,ae.height,ae.depth),P)if(S.layerUpdates.size>0){const j=qm(ae.width,ae.height,S.format,S.type);for(const ve of S.layerUpdates){const _e=ae.data.subarray(ve*j/ae.data.BYTES_PER_ELEMENT,(ve+1)*j/ae.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ve,ae.width,ae.height,1,Se,Ue,_e)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,Se,Ue,ae.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Ee,ae.width,ae.height,ae.depth,0,Se,Ue,ae.data);else if(S.isData3DTexture)re?(ue&&n.texStorage3D(t.TEXTURE_3D,se,Ee,ae.width,ae.height,ae.depth),P&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,Se,Ue,ae.data)):n.texImage3D(t.TEXTURE_3D,0,Ee,ae.width,ae.height,ae.depth,0,Se,Ue,ae.data);else if(S.isFramebufferTexture){if(ue)if(re)n.texStorage2D(t.TEXTURE_2D,se,Ee,ae.width,ae.height);else{let j=ae.width,ve=ae.height;for(let _e=0;_e<se;_e++)n.texImage2D(t.TEXTURE_2D,_e,Ee,j,ve,0,Se,Ue,null),j>>=1,ve>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in t){const j=t.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),ae.parentNode!==j){j.appendChild(ae),h.add(S),j.onpaint=ve=>{const _e=ve.changedElements;for(const oe of h)_e.includes(oe.image)&&(oe.needsUpdate=!0)},j.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,ae);else{const _e=t.RGBA,oe=t.RGBA,Le=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,_e,oe,Le,ae)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(O.length>0){if(re&&ue){const j=ot(O[0]);n.texStorage2D(t.TEXTURE_2D,se,Ee,j.width,j.height)}for(let j=0,ve=O.length;j<ve;j++)ye=O[j],re?P&&n.texSubImage2D(t.TEXTURE_2D,j,0,0,Se,Ue,ye):n.texImage2D(t.TEXTURE_2D,j,Ee,Se,Ue,ye);S.generateMipmaps=!1}else if(re){if(ue){const j=ot(ae);n.texStorage2D(t.TEXTURE_2D,se,Ee,j.width,j.height)}P&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Se,Ue,ae)}else n.texImage2D(t.TEXTURE_2D,0,Ee,Se,Ue,ae);d(S)&&_(J),xe.__version=me.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function Me(b,S,V){if(S.image.length!==6)return;const J=le(b,S),ne=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+V);const me=i.get(ne);if(ne.version!==me.__version||J===!0){n.activeTexture(t.TEXTURE0+V);const xe=tt.getPrimaries(tt.workingColorSpace),ie=S.colorSpace===ar?null:tt.getPrimaries(S.colorSpace),ae=S.colorSpace===ar||xe===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);const Se=S.isCompressedTexture||S.image[0].isCompressedTexture,Ue=S.image[0]&&S.image[0].isDataTexture,Ee=[];for(let oe=0;oe<6;oe++)!Se&&!Ue?Ee[oe]=g(S.image[oe],!0,r.maxCubemapSize):Ee[oe]=Ue?S.image[oe].image:S.image[oe],Ee[oe]=Gt(S,Ee[oe]);const ye=Ee[0],O=s.convert(S.format,S.colorSpace),re=s.convert(S.type),ue=x(S.internalFormat,O,re,S.normalized,S.colorSpace),P=S.isVideoTexture!==!0,se=me.__version===void 0||J===!0,j=ne.dataReady;let ve=T(S,ye);Q(t.TEXTURE_CUBE_MAP,S);let _e;if(Se){P&&se&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ve,ue,ye.width,ye.height);for(let oe=0;oe<6;oe++){_e=Ee[oe].mipmaps;for(let Le=0;Le<_e.length;Le++){const Ce=_e[Le];S.format!==ni?O!==null?P?j&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Ce.width,Ce.height,O,Ce.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,ue,Ce.width,Ce.height,0,Ce.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?j&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,0,0,Ce.width,Ce.height,O,re,Ce.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le,ue,Ce.width,Ce.height,0,O,re,Ce.data)}}}else{if(_e=S.mipmaps,P&&se){_e.length>0&&ve++;const oe=ot(Ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ve,ue,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Ue){P?j&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ee[oe].width,Ee[oe].height,O,re,Ee[oe].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ue,Ee[oe].width,Ee[oe].height,0,O,re,Ee[oe].data);for(let Le=0;Le<_e.length;Le++){const qe=_e[Le].image[oe].image;P?j&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,qe.width,qe.height,O,re,qe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,ue,qe.width,qe.height,0,O,re,qe.data)}}else{P?j&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,O,re,Ee[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ue,O,re,Ee[oe]);for(let Le=0;Le<_e.length;Le++){const Ce=_e[Le];P?j&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,0,0,O,re,Ce.image[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Le+1,ue,O,re,Ce.image[oe])}}}d(S)&&_(t.TEXTURE_CUBE_MAP),me.__version=ne.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function ge(b,S,V,J,ne,me){const xe=s.convert(V.format,V.colorSpace),ie=s.convert(V.type),ae=x(V.internalFormat,xe,ie,V.normalized,V.colorSpace),Se=i.get(S),Ue=i.get(V);if(Ue.__renderTarget=S,!Se.__hasExternalTextures){const Ee=Math.max(1,S.width>>me),ye=Math.max(1,S.height>>me);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,me,ae,Ee,ye,S.depth,0,xe,ie,null):n.texImage2D(ne,me,ae,Ee,ye,0,xe,ie,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),Ct(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,J,ne,Ue.__webglTexture,0,ct(S)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,J,ne,Ue.__webglTexture,me),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ie(b,S,V){if(t.bindRenderbuffer(t.RENDERBUFFER,b),S.depthBuffer){const J=S.depthTexture,ne=J&&J.isDepthTexture?J.type:null,me=E(S.stencilBuffer,ne),xe=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Ct(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ct(S),me,S.width,S.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,ct(S),me,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,me,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,xe,t.RENDERBUFFER,b)}else{const J=S.textures;for(let ne=0;ne<J.length;ne++){const me=J[ne],xe=s.convert(me.format,me.colorSpace),ie=s.convert(me.type),ae=x(me.internalFormat,xe,ie,me.normalized,me.colorSpace);Ct(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ct(S),ae,S.width,S.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,ct(S),ae,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,ae,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function it(b,S,V){const J=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ne=i.get(S.depthTexture);if(ne.__renderTarget=S,(!ne.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J){if(ne.__webglInit===void 0&&(ne.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),ne.__webglTexture===void 0){ne.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,ne.__webglTexture),Q(t.TEXTURE_CUBE_MAP,S.depthTexture);const Se=s.convert(S.depthTexture.format),Ue=s.convert(S.depthTexture.type);let Ee;S.depthTexture.format===Gi?Ee=t.DEPTH_COMPONENT24:S.depthTexture.format===Or&&(Ee=t.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,Ee,S.width,S.height,0,Se,Ue,null)}}else H(S.depthTexture,0);const me=ne.__webglTexture,xe=ct(S),ie=J?t.TEXTURE_CUBE_MAP_POSITIVE_X+V:t.TEXTURE_2D,ae=S.depthTexture.format===Or?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(S.depthTexture.format===Gi)Ct(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ae,ie,me,0,xe):t.framebufferTexture2D(t.FRAMEBUFFER,ae,ie,me,0);else if(S.depthTexture.format===Or)Ct(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ae,ie,me,0,xe):t.framebufferTexture2D(t.FRAMEBUFFER,ae,ie,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function He(b){const S=i.get(b),V=b.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==b.depthTexture){const J=b.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),J){const ne=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,J.removeEventListener("dispose",ne)};J.addEventListener("dispose",ne),S.__depthDisposeCallback=ne}S.__boundDepthTexture=J}if(b.depthTexture&&!S.__autoAllocateDepthBuffer)if(V)for(let J=0;J<6;J++)it(S.__webglFramebuffer[J],b,J);else{const J=b.texture.mipmaps;J&&J.length>0?it(S.__webglFramebuffer[0],b,0):it(S.__webglFramebuffer,b,0)}else if(V){S.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[J]),S.__webglDepthbuffer[J]===void 0)S.__webglDepthbuffer[J]=t.createRenderbuffer(),Ie(S.__webglDepthbuffer[J],b,!1);else{const ne=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=S.__webglDepthbuffer[J];t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,me)}}else{const J=b.texture.mipmaps;if(J&&J.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),Ie(S.__webglDepthbuffer,b,!1);else{const ne=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,me)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function pe(b,S,V){const J=i.get(b);S!==void 0&&ge(J.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),V!==void 0&&He(b)}function Ge(b){const S=b.texture,V=i.get(b),J=i.get(S);b.addEventListener("dispose",m);const ne=b.textures,me=b.isWebGLCubeRenderTarget===!0,xe=ne.length>1;if(xe||(J.__webglTexture===void 0&&(J.__webglTexture=t.createTexture()),J.__version=S.version,a.memory.textures++),me){V.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer[ie]=[];for(let ae=0;ae<S.mipmaps.length;ae++)V.__webglFramebuffer[ie][ae]=t.createFramebuffer()}else V.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){V.__webglFramebuffer=[];for(let ie=0;ie<S.mipmaps.length;ie++)V.__webglFramebuffer[ie]=t.createFramebuffer()}else V.__webglFramebuffer=t.createFramebuffer();if(xe)for(let ie=0,ae=ne.length;ie<ae;ie++){const Se=i.get(ne[ie]);Se.__webglTexture===void 0&&(Se.__webglTexture=t.createTexture(),a.memory.textures++)}if(b.samples>0&&Ct(b)===!1){V.__webglMultisampledFramebuffer=t.createFramebuffer(),V.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ie=0;ie<ne.length;ie++){const ae=ne[ie];V.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,V.__webglColorRenderbuffer[ie]);const Se=s.convert(ae.format,ae.colorSpace),Ue=s.convert(ae.type),Ee=x(ae.internalFormat,Se,Ue,ae.normalized,ae.colorSpace,b.isXRRenderTarget===!0),ye=ct(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,ye,Ee,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,V.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(V.__webglDepthRenderbuffer=t.createRenderbuffer(),Ie(V.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(me){n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture),Q(t.TEXTURE_CUBE_MAP,S);for(let ie=0;ie<6;ie++)if(S.mipmaps&&S.mipmaps.length>0)for(let ae=0;ae<S.mipmaps.length;ae++)ge(V.__webglFramebuffer[ie][ae],b,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ae);else ge(V.__webglFramebuffer[ie],b,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);d(S)&&_(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(xe){for(let ie=0,ae=ne.length;ie<ae;ie++){const Se=ne[ie],Ue=i.get(Se);let Ee=t.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Ee=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Ee,Ue.__webglTexture),Q(Ee,Se),ge(V.__webglFramebuffer,b,Se,t.COLOR_ATTACHMENT0+ie,Ee,0),d(Se)&&_(Ee)}n.unbindTexture()}else{let ie=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ie=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,J.__webglTexture),Q(ie,S),S.mipmaps&&S.mipmaps.length>0)for(let ae=0;ae<S.mipmaps.length;ae++)ge(V.__webglFramebuffer[ae],b,S,t.COLOR_ATTACHMENT0,ie,ae);else ge(V.__webglFramebuffer,b,S,t.COLOR_ATTACHMENT0,ie,0);d(S)&&_(ie),n.unbindTexture()}b.depthBuffer&&He(b)}function Be(b){const S=b.textures;for(let V=0,J=S.length;V<J;V++){const ne=S[V];if(d(ne)){const me=y(b),xe=i.get(ne).__webglTexture;n.bindTexture(me,xe),_(me),n.unbindTexture()}}}const et=[],Xe=[];function Nt(b){if(b.samples>0){if(Ct(b)===!1){const S=b.textures,V=b.width,J=b.height;let ne=t.COLOR_BUFFER_BIT;const me=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,xe=i.get(b),ie=S.length>1;if(ie)for(let Se=0;Se<S.length;Se++)n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const ae=b.texture.mipmaps;ae&&ae.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Se=0;Se<S.length;Se++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,xe.__webglColorRenderbuffer[Se]);const Ue=i.get(S[Se]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ue,0)}t.blitFramebuffer(0,0,V,J,0,0,V,J,ne,t.NEAREST),l===!0&&(et.length=0,Xe.length=0,et.push(t.COLOR_ATTACHMENT0+Se),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(et.push(me),Xe.push(me),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Xe)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,et))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let Se=0;Se<S.length;Se++){n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,xe.__webglColorRenderbuffer[Se]);const Ue=i.get(S[Se]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,Ue,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){const S=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function ct(b){return Math.min(r.maxSamples,b.samples)}function Ct(b){const S=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function U(b){const S=a.render.frame;f.get(b)!==S&&(f.set(b,S),b.update())}function Gt(b,S){const V=b.colorSpace,J=b.format,ne=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||V!==sc&&V!==ar&&(tt.getTransfer(V)===ut?(J!==ni||ne!==Pn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",V)),S}function ot(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=te,this.resetTextureUnits=W,this.getTextureUnits=D,this.setTextureUnits=G,this.setTexture2D=H,this.setTexture2DArray=k,this.setTexture3D=X,this.setTextureCube=q,this.rebindTextures=pe,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=Be,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function uC(t,e){function n(i,r=ar){let s;const a=tt.getTransfer(r);if(i===Pn)return t.UNSIGNED_BYTE;if(i===Ah)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Ch)return t.UNSIGNED_SHORT_5_5_5_1;if(i===e_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===t_)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jv)return t.BYTE;if(i===Qv)return t.SHORT;if(i===ao)return t.UNSIGNED_SHORT;if(i===Th)return t.INT;if(i===Si)return t.UNSIGNED_INT;if(i===mi)return t.FLOAT;if(i===yi)return t.HALF_FLOAT;if(i===n_)return t.ALPHA;if(i===i_)return t.RGB;if(i===ni)return t.RGBA;if(i===Gi)return t.DEPTH_COMPONENT;if(i===Or)return t.DEPTH_STENCIL;if(i===r_)return t.RED;if(i===Rh)return t.RED_INTEGER;if(i===jr)return t.RG;if(i===bh)return t.RG_INTEGER;if(i===Ph)return t.RGBA_INTEGER;if(i===Al||i===Cl||i===Rl||i===bl)if(a===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Al)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Rl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Al)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Rl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===bl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jd||i===qd||i===$d||i===Kd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===jd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$d)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Kd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zd||i===Jd||i===Qd||i===ef||i===tf||i===ic||i===nf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Zd||i===Jd)return a===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Qd)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===ef)return s.COMPRESSED_R11_EAC;if(i===tf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ic)return s.COMPRESSED_RG11_EAC;if(i===nf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===rf||i===sf||i===af||i===of||i===lf||i===cf||i===uf||i===df||i===ff||i===hf||i===pf||i===mf||i===gf||i===vf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===rf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===af)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===of)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===lf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===uf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===df)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ff)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===hf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===mf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vf)return a===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===_f||i===xf||i===Sf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===_f)return a===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Sf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===yf||i===Mf||i===rc||i===Ef)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===yf)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Mf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===rc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ef)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===oo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const dC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fC=`
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

}`;class hC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new h_(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Mi({vertexShader:dC,fragmentShader:fC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new mt(new Ac(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pC extends Kr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,f=null,h=null,u=null,p=null,v=null;const w=typeof XRWebGLBinding<"u",g=new hC,d={},_=n.getContextAttributes();let y=null,x=null;const E=[],T=[],C=new ze;let m=null,R=null;const L=new ei;L.viewport=new Et;const N=new ei;N.viewport=new Et;const F=[L,N],W=new ME;let D=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let Z=E[z];return Z===void 0&&(Z=new Su,E[z]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(z){let Z=E[z];return Z===void 0&&(Z=new Su,E[z]=Z),Z.getGripSpace()},this.getHand=function(z){let Z=E[z];return Z===void 0&&(Z=new Su,E[z]=Z),Z.getHandSpace()};function te(z){const Z=T.indexOf(z.inputSource);if(Z===-1)return;const fe=E[Z];fe!==void 0&&(fe.update(z.inputSource,z.frame,c||a),fe.dispatchEvent({type:z.type,data:z.inputSource}))}function Y(){r.removeEventListener("select",te),r.removeEventListener("selectstart",te),r.removeEventListener("selectend",te),r.removeEventListener("squeeze",te),r.removeEventListener("squeezestart",te),r.removeEventListener("squeezeend",te),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",H);for(let z=0;z<E.length;z++){const Z=T[z];Z!==null&&(T[z]=null,E[z].disconnect(Z))}D=null,G=null,g.reset();for(const z in d)delete d[z];if(e.setRenderTarget(y),p=null,u=null,h=null,r=null,x=null,le.stop(),i.isPresenting=!1,e.setPixelRatio(m),e.setSize(C.width,C.height,!1),R!==null){const z=R.camera;z.fov=R.fov,z.zoom=R.zoom,z.updateProjectionMatrix(),R=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){s=z,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&w&&(h=new XRWebGLBinding(r,n)),h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",te),r.addEventListener("selectstart",te),r.addEventListener("selectend",te),r.addEventListener("squeeze",te),r.addEventListener("squeezestart",te),r.addEventListener("squeezeend",te),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",H),_.xrCompatible!==!0&&await n.makeXRCompatible(),m=e.getPixelRatio(),e.getSize(C),w&&"createProjectionLayer"in XRWebGLBinding.prototype){let fe=null,Me=null,ge=null;_.depth&&(ge=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,fe=_.stencil?Or:Gi,Me=_.stencil?oo:Si);const Ie={colorFormat:n.RGBA8,depthFormat:ge,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Ie),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new si(u.textureWidth,u.textureHeight,{format:ni,type:Pn,depthTexture:new co(u.textureWidth,u.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const fe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,fe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new si(p.framebufferWidth,p.framebufferHeight,{format:ni,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function H(z){for(let Z=0;Z<z.removed.length;Z++){const fe=z.removed[Z],Me=T.indexOf(fe);Me>=0&&(T[Me]=null,E[Me].disconnect(fe))}for(let Z=0;Z<z.added.length;Z++){const fe=z.added[Z];let Me=T.indexOf(fe);if(Me===-1){for(let Ie=0;Ie<E.length;Ie++)if(Ie>=T.length){T.push(fe),Me=Ie;break}else if(T[Ie]===null){T[Ie]=fe,Me=Ie;break}if(Me===-1)break}const ge=E[Me];ge&&ge.connect(fe)}}const k=new B,X=new B;function q(z,Z,fe){k.setFromMatrixPosition(Z.matrixWorld),X.setFromMatrixPosition(fe.matrixWorld);const Me=k.distanceTo(X),ge=Z.projectionMatrix.elements,Ie=fe.projectionMatrix.elements,it=ge[14]/(ge[10]-1),He=ge[14]/(ge[10]+1),pe=(ge[9]+1)/ge[5],Ge=(ge[9]-1)/ge[5],Be=(ge[8]-1)/ge[0],et=(Ie[8]+1)/Ie[0],Xe=it*Be,Nt=it*et,ct=Me/(-Be+et),Ct=ct*-Be;if(Z.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ct),z.translateZ(ct),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),ge[10]===-1)z.projectionMatrix.copy(Z.projectionMatrix),z.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const U=it+ct,Gt=He+ct,ot=Xe-Ct,b=Nt+(Me-Ct),S=pe*He/Gt*U,V=Ge*He/Gt*U;z.projectionMatrix.makePerspective(ot,b,S,V,U,Gt),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function de(z,Z){Z===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(Z.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let Z=z.near,fe=z.far;g.texture!==null&&(g.depthNear>0&&(Z=g.depthNear),g.depthFar>0&&(fe=g.depthFar)),W.near=N.near=L.near=Z,W.far=N.far=L.far=fe,(D!==W.near||G!==W.far)&&(r.updateRenderState({depthNear:W.near,depthFar:W.far}),D=W.near,G=W.far),W.layers.mask=z.layers.mask|6,L.layers.mask=W.layers.mask&-5,N.layers.mask=W.layers.mask&-3;const Me=z.parent,ge=W.cameras;de(W,Me);for(let Ie=0;Ie<ge.length;Ie++)de(ge[Ie],Me);ge.length===2?q(W,L,N):W.projectionMatrix.copy(L.projectionMatrix),R===null&&z.isPerspectiveCamera&&(R={camera:z,fov:z.fov,zoom:z.zoom}),ce(z,W,Me)};function ce(z,Z,fe){fe===null?z.matrix.copy(Z.matrixWorld):(z.matrix.copy(fe.matrixWorld),z.matrix.invert(),z.matrix.multiply(Z.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(Z.projectionMatrix),z.projectionMatrixInverse.copy(Z.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=Tf*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(z){l=z,u!==null&&(u.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(W)},this.getCameraTexture=function(z){return d[z]};let Oe=null;function Q(z,Z){if(f=Z.getViewerPose(c||a),v=Z,f!==null){const fe=f.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let Me=!1;fe.length!==W.cameras.length&&(W.cameras.length=0,Me=!0);for(let He=0;He<fe.length;He++){const pe=fe[He];let Ge=null;if(p!==null)Ge=p.getViewport(pe);else{const et=h.getViewSubImage(u,pe);Ge=et.viewport,He===0&&(e.setRenderTargetTextures(x,et.colorTexture,et.depthStencilTexture),e.setRenderTarget(x))}let Be=F[He];Be===void 0&&(Be=new ei,Be.layers.enable(He),Be.viewport=new Et,F[He]=Be),Be.matrix.fromArray(pe.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(pe.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),He===0&&(W.matrix.copy(Be.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Me===!0&&W.cameras.push(Be)}const ge=r.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&w){h=i.getBinding();const He=h.getDepthInformation(fe[0]);He&&He.isValid&&He.texture&&g.init(He,r.renderState)}if(ge&&ge.includes("camera-access")&&w){e.state.unbindTexture(),h=i.getBinding();for(let He=0;He<fe.length;He++){const pe=fe[He].camera;if(pe){let Ge=d[pe];Ge||(Ge=new h_,d[pe]=Ge);const Be=h.getCameraImage(pe);Ge.sourceTexture=Be}}}}for(let fe=0;fe<E.length;fe++){const Me=T[fe],ge=E[fe];Me!==null&&ge!==void 0&&ge.update(Me,Z,c||a)}Oe&&Oe(z,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),v=null}const le=new S_;le.setAnimationLoop(Q),this.setAnimationLoop=function(z){Oe=z},this.dispose=function(){}}}const mC=new Tt,C_=new We;C_.set(-1,0,0,0,1,0,0,0,1);function gC(t,e){function n(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function i(g,d){d.color.getRGB(g.fogColor.value,v_(t)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function r(g,d,_,y,x){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(g,d):d.isMeshLambertMaterial?(s(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(g,d),h(g,d)):d.isMeshPhongMaterial?(s(g,d),f(g,d),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(g,d),u(g,d),d.isMeshPhysicalMaterial&&p(g,d,x)):d.isMeshMatcapMaterial?(s(g,d),v(g,d)):d.isMeshDepthMaterial?s(g,d):d.isMeshDistanceMaterial?(s(g,d),w(g,d)):d.isMeshNormalMaterial?s(g,d):d.isLineBasicMaterial?(a(g,d),d.isLineDashedMaterial&&o(g,d)):d.isPointsMaterial?l(g,d,_,y):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,n(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===Tn&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,n(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===Tn&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,n(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,n(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const _=e.get(d),y=_.envMap,x=_.envMapRotation;y&&(g.envMap.value=y,g.envMapRotation.value.setFromMatrix4(mC.makeRotationFromEuler(x)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(C_),g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,g.aoMapTransform))}function a(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform))}function o(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,_,y){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*_,g.scale.value=y*.5,d.map&&(g.map.value=d.map,n(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,n(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,n(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function f(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function h(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function u(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function p(g,d,_){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Tn&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.retroreflectivity>0&&(g.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,d){d.matcap&&(g.matcap.value=d.matcap)}function w(g,d){const _=e.get(d).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function vC(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,E){const T=E.program;i.uniformBlockBinding(x,T)}function c(x,E){let T=r[x.id];T===void 0&&(g(x),T=f(x),r[x.id]=T,x.addEventListener("dispose",_));const C=E.program;i.updateUBOMapping(x,C);const m=e.render.frame;s[x.id]!==m&&(u(x),s[x.id]=m)}function f(x){const E=h();x.__bindingPointIndex=E;const T=t.createBuffer(),C=x.__size,m=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,T),t.bufferData(t.UNIFORM_BUFFER,C,m),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,E,T),T}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const E=r[x.id],T=x.uniforms,C=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,E);for(let m=0,R=T.length;m<R;m++){const L=T[m];if(Array.isArray(L))for(let N=0,F=L.length;N<F;N++)p(L[N],m,N,C);else p(L,m,0,C)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(x,E,T,C){if(w(x,E,T,C)===!0){const m=x.__offset,R=x.value;if(Array.isArray(R)){let L=0;for(let N=0;N<R.length;N++){const F=R[N],W=d(F);v(F,x.__data,L),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(L+=W.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(R,x.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,m,x.__data)}}function v(x,E,T){typeof x=="number"||typeof x=="boolean"?E[0]=x:x.isMatrix3?(E[0]=x.elements[0],E[1]=x.elements[1],E[2]=x.elements[2],E[3]=0,E[4]=x.elements[3],E[5]=x.elements[4],E[6]=x.elements[5],E[7]=0,E[8]=x.elements[6],E[9]=x.elements[7],E[10]=x.elements[8],E[11]=0):ArrayBuffer.isView(x)?E.set(new x.constructor(x.buffer,x.byteOffset,E.length)):x.toArray(E,T)}function w(x,E,T,C){const m=x.value,R=E+"_"+T;if(C[R]===void 0)return typeof m=="number"||typeof m=="boolean"?C[R]=m:ArrayBuffer.isView(m)?C[R]=m.slice():C[R]=m.clone(),!0;{const L=C[R];if(typeof m=="number"||typeof m=="boolean"){if(L!==m)return C[R]=m,!0}else{if(ArrayBuffer.isView(m))return!0;if(L.equals(m)===!1)return L.copy(m),!0}}return!1}function g(x){const E=x.uniforms;let T=0;const C=16;for(let R=0,L=E.length;R<L;R++){const N=Array.isArray(E[R])?E[R]:[E[R]];for(let F=0,W=N.length;F<W;F++){const D=N[F],G=Array.isArray(D.value)?D.value:[D.value];for(let te=0,Y=G.length;te<Y;te++){const H=G[te],k=d(H),X=T%C,q=X%k.boundary,de=X+q;T+=q,de!==0&&C-de<k.storage&&(T+=C-de),D.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=T,T+=k.storage}}}const m=T%C;return m>0&&(T+=C-m),x.__size=T,x.__cache={},this}function d(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(E.boundary=16,E.storage=x.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",x),E}function _(x){const E=x.target;E.removeEventListener("dispose",_);const T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),t.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function y(){for(const x in r)t.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:l,update:c,dispose:y}}const _C=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ui=null;function xC(){return ui===null&&(ui=new XM(_C,16,16,jr,yi),ui.name="DFG_LUT",ui.minFilter=on,ui.magFilter=on,ui.wrapS=pi,ui.wrapT=pi,ui.generateMipmaps=!1,ui.needsUpdate=!0),ui}class SC{constructor(e={}){const{canvas:n=xM(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Pn}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=a;const w=p,g=new Set([Ph,bh,Rh]),d=new Set([Pn,Si,ao,oo,Ah,Ch]),_=new Uint32Array(4),y=new Int32Array(4),x=new B;let E=null,T=null;const C=[],m=[];let R=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let N=!1,F=null,W=null,D=null,G=null;this._outputColorSpace=xn;let te=0,Y=0,H=null,k=-1,X=null;const q=new Et,de=new Et;let ce=null;const Oe=new nt(0);let Q=0,le=n.width,z=n.height,Z=1,fe=null,Me=null;const ge=new Et(0,0,le,z),Ie=new Et(0,0,le,z);let it=!1;const He=new Uh;let pe=!1,Ge=!1;const Be=new Tt,et=new B,Xe=new Et,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function Ct(){return H===null?Z:1}let U=i;function Gt(M,I){return n.getContext(M,I)}let ot,b,S,V,J,ne,me,xe,ie,ae,Se,Ue,Ee,ye,O,re,ue,P,se,j,ve,_e,oe;try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${wh}`),n.addEventListener("webglcontextlost",qe,!1),n.addEventListener("webglcontextrestored",$e,!1),n.addEventListener("webglcontextcreationerror",Dt,!1),U===null){const I="webgl2";if(U=Gt(I,M),U===null)throw Gt(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(M){throw n.removeEventListener("webglcontextlost",qe,!1),n.removeEventListener("webglcontextrestored",$e,!1),n.removeEventListener("webglcontextcreationerror",Dt,!1),at("WebGLRenderer: "+M.message),M}function Le(){ot=new xT(U),ot.init(),ve=new uC(U,ot),b=new cT(U,ot,e,ve),S=new lC(U,ot),b.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),W=U.createFramebuffer(),D=U.createFramebuffer(),G=U.createFramebuffer(),V=new MT(U),J=new qA,ne=new cC(U,ot,S,J,b,ve,V),me=new _T(L),xe=new wE(U),_e=new oT(U,xe),ie=new ST(U,xe,V,_e),ae=new wT(U,ie,xe,_e,V),P=new ET(U,b,ne),O=new uT(J),Se=new jA(L,me,ot,b,_e,O),Ue=new gC(L,J),Ee=new KA,ye=new nC(ot),ue=new aT(L,me,S,ae,v,l),re=new oC(L,ae,b),oe=new vC(U,V,b,S),se=new lT(U,ot,V),j=new yT(U,ot,V),V.programs=Se.programs,L.capabilities=b,L.extensions=ot,L.properties=J,L.renderLists=Ee,L.shadowMap=re,L.state=S,L.info=V}w!==Pn&&(R=new AT(w,n.width,n.height,o,r,s));const Ce=new pC(L,U);this.xr=Ce,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=ot.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ot.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(M){M!==void 0&&(Z=M,this.setSize(le,z,!1))},this.getSize=function(M){return M.set(le,z)},this.setSize=function(M,I,ee=!0){if(Ce.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}le=M,z=I,n.width=Math.floor(M*Z),n.height=Math.floor(I*Z),ee===!0&&(n.style.width=M+"px",n.style.height=I+"px"),R!==null&&R.setSize(n.width,n.height),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(le*Z,z*Z).floor()},this.setDrawingBufferSize=function(M,I,ee){le=M,z=I,Z=ee,n.width=Math.floor(M*ee),n.height=Math.floor(I*ee),this.setViewport(0,0,M,I)},this.setEffects=function(M){if(w===Pn){at("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let I=0;I<M.length;I++)if(M[I].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(q)},this.getViewport=function(M){return M.copy(ge)},this.setViewport=function(M,I,ee,$){M.isVector4?ge.set(M.x,M.y,M.z,M.w):ge.set(M,I,ee,$),S.viewport(q.copy(ge).multiplyScalar(Z).round())},this.getScissor=function(M){return M.copy(Ie)},this.setScissor=function(M,I,ee,$){M.isVector4?Ie.set(M.x,M.y,M.z,M.w):Ie.set(M,I,ee,$),S.scissor(de.copy(Ie).multiplyScalar(Z).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(M){S.setScissorTest(it=M)},this.setOpaqueSort=function(M){fe=M},this.setTransparentSort=function(M){Me=M},this.getClearColor=function(M){return M.copy(ue.getClearColor())},this.setClearColor=function(){ue.setClearColor(...arguments)},this.getClearAlpha=function(){return ue.getClearAlpha()},this.setClearAlpha=function(){ue.setClearAlpha(...arguments)},this.clear=function(M=!0,I=!0,ee=!0){let $=0;if(M){let K=!1;if(H!==null){const Ae=H.texture.format;K=g.has(Ae)}if(K){const Ae=H.texture.type,be=d.has(Ae),Te=ue.getClearColor(),Ne=ue.getClearAlpha(),Fe=Te.r,Ye=Te.g,Ke=Te.b;be?(_[0]=Fe,_[1]=Ye,_[2]=Ke,_[3]=Ne,U.clearBufferuiv(U.COLOR,0,_)):(y[0]=Fe,y[1]=Ye,y[2]=Ke,y[3]=Ne,U.clearBufferiv(U.COLOR,0,y))}else $|=U.COLOR_BUFFER_BIT}I&&($|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&($|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&U.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){n.removeEventListener("webglcontextlost",qe,!1),n.removeEventListener("webglcontextrestored",$e,!1),n.removeEventListener("webglcontextcreationerror",Dt,!1),ue.dispose(),Ee.dispose(),ye.dispose(),J.dispose(),me.dispose(),ae.dispose(),_e.dispose(),oe.dispose(),Se.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Xh),Ce.removeEventListener("sessionend",Yh),wr.stop()};function qe(M){M.preventDefault(),wm("WebGLRenderer: Context Lost."),N=!0}function $e(){wm("WebGLRenderer: Context Restored."),N=!1;const M=V.autoReset,I=re.enabled,ee=re.autoUpdate,$=re.needsUpdate,K=re.type;Le(),V.autoReset=M,re.enabled=I,re.autoUpdate=ee,re.needsUpdate=$,re.type=K}function Dt(M){at("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Bt(M){const I=M.target;I.removeEventListener("dispose",Bt),So(I)}function So(M){Zr(M),J.remove(M)}function Zr(M){const I=J.get(M).programs;I!==void 0&&(I.forEach(function(ee){Se.releaseProgram(ee)}),M.isShaderMaterial&&Se.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,ee,$,K,Ae){I===null&&(I=Nt);const be=K.isMesh&&K.matrixWorld.determinantAffine()<0,Te=N_(M,I,ee,$,K);S.setMaterial($,be);let Ne=ee.index,Fe=1;if($.wireframe===!0){if(Ne=ie.getWireframeAttribute(ee),Ne===void 0)return;Fe=2}const Ye=ee.drawRange,Ke=ee.attributes.position;let De=Ye.start*Fe,lt=(Ye.start+Ye.count)*Fe;Ae!==null&&(De=Math.max(De,Ae.start*Fe),lt=Math.min(lt,(Ae.start+Ae.count)*Fe)),Ne!==null?(De=Math.max(De,0),lt=Math.min(lt,Ne.count)):Ke!=null&&(De=Math.max(De,0),lt=Math.min(lt,Ke.count));const It=lt-De;if(It<0||It===1/0)return;_e.setup(K,$,Te,ee,Ne);let vt,ht=se;if(Ne!==null&&(vt=xe.get(Ne),ht=j,ht.setIndex(vt)),K.isMesh)$.wireframe===!0?(S.setLineWidth($.wireframeLinewidth*Ct()),ht.setMode(U.LINES)):ht.setMode(U.TRIANGLES);else if(K.isLine){let en=$.linewidth;en===void 0&&(en=1),S.setLineWidth(en*Ct()),K.isLineSegments?ht.setMode(U.LINES):K.isLineLoop?ht.setMode(U.LINE_LOOP):ht.setMode(U.LINE_STRIP)}else K.isPoints?ht.setMode(U.POINTS):K.isSprite&&ht.setMode(U.TRIANGLES);if(K.isBatchedMesh)if(ot.get("WEBGL_multi_draw"))ht.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const en=K._multiDrawStarts,Re=K._multiDrawCounts,un=K._multiDrawCount,rt=Ne?xe.get(Ne).bytesPerElement:1,Fn=J.get($).currentProgram.getUniforms();for(let oi=0;oi<un;oi++)Fn.setValue(U,"_gl_DrawID",oi),ht.render(en[oi]/rt,Re[oi])}else if(K.isInstancedMesh)ht.renderInstances(De,It,K.count);else if(ee.isInstancedBufferGeometry){const en=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Re=Math.min(ee.instanceCount,en);ht.renderInstances(De,It,Re)}else ht.render(De,It)};function yo(M,I,ee,$){F!==null&&M.isNodeMaterial&&F.setObject($,M),pe===!0&&O.setState(M,ee,!1),M.transparent===!0&&M.side===Ni&&M.forceSinglePass===!1?(M.side=Tn,M.needsUpdate=!0,Eo(M,I,$),M.side=Xr,M.needsUpdate=!0,Eo(M,I,$),M.side=Ni):Eo(M,I,$)}this.compile=function(M,I,ee=null){ee===null&&(ee=M),F!==null&&F.renderStart(M,I,ee),T=ye.get(ee),T.init(I),m.push(T),ee.traverseVisible(function(K){K.isLight&&K.layers.test(I.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),M!==ee&&M.traverseVisible(function(K){K.isLight&&K.layers.test(I.layers)&&(T.pushLight(K),K.castShadow&&T.pushShadow(K))}),T.setupLights(),F!==null&&F.updateLights(T.state.lightsArray),Ge=this.localClippingEnabled,pe=O.init(this.clippingPlanes,Ge),pe===!0&&O.setGlobalState(this.clippingPlanes,I),F!==null&&re.render(T.state.shadowsArray,ee,I);const $=new Set;return M.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ae=K.material;if(Ae)if(Array.isArray(Ae))for(let be=0;be<Ae.length;be++){const Te=Ae[be];yo(Te,ee,I,K),$.add(Te)}else yo(Ae,ee,I,K),$.add(Ae)}),T=m.pop(),F!==null&&F.renderEnd(),$},this.compileAsync=function(M,I,ee=null){const $=this.compile(M,I,ee);return new Promise(K=>{function Ae(){if($.forEach(function(be){const Ne=J.get(be).currentProgram;(Ne===void 0||Ne.isReady())&&$.delete(be)}),$.size===0){K(M);return}setTimeout(Ae,10)}ot.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let ta=null;function Jr(M){ta&&ta(M)}function Xh(){wr.stop()}function Yh(){wr.start()}const wr=new S_;wr.setAnimationLoop(Jr),typeof self<"u"&&wr.setContext(self),this.setAnimationLoop=function(M){ta=M,Ce.setAnimationLoop(M),M===null?wr.stop():wr.start()},Ce.addEventListener("sessionstart",Xh),Ce.addEventListener("sessionend",Yh),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(M,I);const ee=Ce.enabled===!0&&Ce.isPresenting===!0,$=R!==null&&(H===null||ee)&&R.begin(L,H);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(I),I=Ce.getCamera()),M.isScene===!0&&M.onBeforeRender(L,M,I,H),T=ye.get(M,m.length),T.init(I),T.state.textureUnits=ne.getTextureUnits(),m.push(T),Be.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),He.setFromProjectionMatrix(Be,gi,I.reversedDepth),Ge=this.localClippingEnabled,pe=O.init(this.clippingPlanes,Ge),E=Ee.get(M,C.length),E.init(),C.push(E),Ce.enabled===!0&&Ce.isPresenting===!0){const be=L.xr.getDepthSensingMesh();be!==null&&Pc(be,I,-1/0,L.sortObjects)}Pc(M,I,0,L.sortObjects),E.finish(),F!==null&&F.updateLights(T.state.lightsArray),L.sortObjects===!0&&E.sort(fe,Me),ct=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,ct&&ue.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&O.beginShadows();const K=T.state.shadowsArray;if(re.render(K,M,I),pe===!0&&O.endShadows(),($&&R.hasRenderPass())===!1){const be=E.opaque,Te=E.transmissive;if(T.setupLights(),I.isArrayCamera){const Ne=I.cameras;if(Te.length>0)for(let Fe=0,Ye=Ne.length;Fe<Ye;Fe++){const Ke=Ne[Fe];qh(be,Te,M,Ke)}ct&&ue.render(M);for(let Fe=0,Ye=Ne.length;Fe<Ye;Fe++){const Ke=Ne[Fe];jh(E,M,Ke,Ke.viewport)}}else Te.length>0&&qh(be,Te,M,I),ct&&ue.render(M),jh(E,M,I)}H!==null&&Y===0&&(ne.updateMultisampleRenderTarget(H),ne.updateRenderTargetMipmap(H)),$&&R.end(L),M.isScene===!0&&M.onAfterRender(L,M,I),_e.resetDefaultState(),k=-1,X=null,m.pop(),m.length>0?(T=m[m.length-1],ne.setTextureUnits(T.state.textureUnits),pe===!0&&O.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?E=C[C.length-1]:E=null,F!==null&&F.renderEnd()};function Pc(M,I,ee,$){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)ee=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLightProbeGrid)T.pushLightProbeGrid(M);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(He)){$&&Xe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Be);const be=ae.update(M),Te=M.material;Te.visible&&E.push(M,be,Te,ee,Xe.z,null,I)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(He))){const be=ae.update(M),Te=M.material;if($&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Xe.copy(M.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Xe.copy(be.boundingSphere.center)),Xe.applyMatrix4(M.matrixWorld).applyMatrix4(Be)),Array.isArray(Te)){const Ne=be.groups;for(let Fe=0,Ye=Ne.length;Fe<Ye;Fe++){const Ke=Ne[Fe],De=Te[Ke.materialIndex];De&&De.visible&&E.push(M,be,De,ee,Xe.z,Ke,I)}}else Te.visible&&E.push(M,be,Te,ee,Xe.z,null,I)}}const Ae=M.children;for(let be=0,Te=Ae.length;be<Te;be++)Pc(Ae[be],I,ee,$)}function jh(M,I,ee,$){const{opaque:K,transmissive:Ae,transparent:be}=M;T.setupLightsView(ee),pe===!0&&O.setGlobalState(L.clippingPlanes,ee),$&&S.viewport(q.copy($)),K.length>0&&Mo(K,I,ee),Ae.length>0&&Mo(Ae,I,ee),be.length>0&&Mo(be,I,ee),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function qh(M,I,ee,$){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[$.id]===void 0){const De=ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[$.id]=new si(1,1,{generateMipmaps:!0,type:De?yi:Pn,minFilter:Fr,samples:Math.max(4,b.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const Ae=T.state.transmissionRenderTarget[$.id],be=$.viewport||q;Ae.setSize(be.z*L.transmissionResolutionScale,be.w*L.transmissionResolutionScale);const Te=L.getRenderTarget(),Ne=L.getActiveCubeFace(),Fe=L.getActiveMipmapLevel();L.setRenderTarget(Ae),L.getClearColor(Oe),Q=L.getClearAlpha(),Q<1&&L.setClearColor(16777215,.5),L.clear(),ct&&ue.render(ee);const Ye=L.toneMapping;L.toneMapping=xi;const Ke=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),T.setupLightsView($),pe===!0&&O.setGlobalState(L.clippingPlanes,$),Mo(M,ee,$),ne.updateMultisampleRenderTarget(Ae),ne.updateRenderTargetMipmap(Ae),ot.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let lt=0,It=I.length;lt<It;lt++){const vt=I[lt],{object:ht,geometry:en,material:Re,group:un}=vt;if(Re.side===Ni&&ht.layers.test($.layers)){const rt=Re.side;Re.side=Tn,Re.needsUpdate=!0,$h(ht,ee,$,en,Re,un),Re.side=rt,Re.needsUpdate=!0,De=!0}}De===!0&&(ne.updateMultisampleRenderTarget(Ae),ne.updateRenderTargetMipmap(Ae))}L.setRenderTarget(Te,Ne,Fe),L.setClearColor(Oe,Q),Ke!==void 0&&($.viewport=Ke),L.toneMapping=Ye}function Mo(M,I,ee){const $=I.isScene===!0?I.overrideMaterial:null;for(let K=0,Ae=M.length;K<Ae;K++){const be=M[K],{object:Te,geometry:Ne,group:Fe}=be;let Ye=be.material;Ye.allowOverride===!0&&$!==null&&(Ye=$),Te.layers.test(ee.layers)&&$h(Te,I,ee,Ne,Ye,Fe)}}function $h(M,I,ee,$,K,Ae){F!==null&&K.isNodeMaterial&&F.setObject(M,K),M.onBeforeRender(L,I,ee,$,K,Ae),M.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),K.onBeforeRender(L,I,ee,$,M,Ae),K.transparent===!0&&K.side===Ni&&K.forceSinglePass===!1?(K.side=Tn,K.needsUpdate=!0,L.renderBufferDirect(ee,I,$,K,M,Ae),K.side=Xr,K.needsUpdate=!0,L.renderBufferDirect(ee,I,$,K,M,Ae),K.side=Ni):L.renderBufferDirect(ee,I,$,K,M,Ae),M.onAfterRender(L,I,ee,$,K,Ae)}function Eo(M,I,ee){I.isScene!==!0&&(I=Nt);const $=J.get(M),K=T.state.lights,Ae=T.state.shadowsArray,be=K.state.version,Te=Se.getParameters(M,K.state,Ae,I,ee,T.state.lightProbeGridArray),Ne=Se.getProgramCacheKey(Te);let Fe=$.programs;$.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?I.environment:null,$.fog=I.fog;const Ye=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;$.envMap=me.get(M.envMap||$.environment,Ye),$.envMapRotation=$.environment!==null&&M.envMap===null?I.environmentRotation:M.envMapRotation,Fe===void 0&&(M.addEventListener("dispose",Bt),Fe=new Map,$.programs=Fe);let Ke=Fe.get(Ne);if(Ke!==void 0){if($.currentProgram===Ke&&$.lightsStateVersion===be)return Zh(M,Te),Ke}else Te.uniforms=Se.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,ee,Te),M.onBeforeCompile(Te,L),Ke=Se.acquireProgram(Te,Ne),Fe.set(Ne,Ke),$.uniforms=Te.uniforms;const De=$.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(De.clippingPlanes=O.uniform),Zh(M,Te),$.needsLights=I_(M),$.lightsStateVersion=be,$.needsLights&&(De.ambientLightColor.value=K.state.ambient,De.lightProbe.value=K.state.probe,De.sunLights.value=K.state.sun,De.sunLightShadows.value=K.state.sunShadow,De.directionalLights.value=K.state.directional,De.directionalLightShadows.value=K.state.directionalShadow,De.spotLights.value=K.state.spot,De.spotLightShadows.value=K.state.spotShadow,De.rectAreaLights.value=K.state.rectArea,De.ltc_1.value=K.state.rectAreaLTC1,De.ltc_2.value=K.state.rectAreaLTC2,De.pointLights.value=K.state.point,De.pointLightShadows.value=K.state.pointShadow,De.hemisphereLights.value=K.state.hemi,De.sunShadowMatrix.value=K.state.sunShadowMatrix,De.sunShadowCascade.value=K.state.sunShadowCascade,De.directionalShadowMatrix.value=K.state.directionalShadowMatrix,De.spotLightMatrix.value=K.state.spotLightMatrix,De.spotLightMap.value=K.state.spotLightMap,De.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=T.state.lightProbeGridArray.length>0,$.currentProgram=Ke,$.uniformsList=null,Ke}function Kh(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=Pl.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function Zh(M,I){const ee=J.get(M);ee.outputColorSpace=I.outputColorSpace,ee.batching=I.batching,ee.batchingColor=I.batchingColor,ee.instancing=I.instancing,ee.instancingColor=I.instancingColor,ee.instancingMorph=I.instancingMorph,ee.skinning=I.skinning,ee.morphTargets=I.morphTargets,ee.morphNormals=I.morphNormals,ee.morphColors=I.morphColors,ee.morphTargetsCount=I.morphTargetsCount,ee.numClippingPlanes=I.numClippingPlanes,ee.numIntersection=I.numClipIntersection,ee.vertexAlphas=I.vertexAlphas,ee.vertexTangents=I.vertexTangents,ee.toneMapping=I.toneMapping}function L_(M,I){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;x.setFromMatrixPosition(I.matrixWorld);for(let ee=0,$=M.length;ee<$;ee++){const K=M[ee];if(K.texture!==null&&K.boundingBox.containsPoint(x))return K}return null}function N_(M,I,ee,$,K){I.isScene!==!0&&(I=Nt),ne.resetTextureUnits();const Ae=I.fog,be=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?I.environment:null,Te=H===null?L.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:tt.workingColorSpace,Ne=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Fe=me.get($.envMap||be,Ne),Ye=$.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,Ke=!!ee.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),De=!!ee.morphAttributes.position,lt=!!ee.morphAttributes.normal,It=!!ee.morphAttributes.color;let vt=xi;$.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(vt=L.toneMapping);const ht=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,en=ht!==void 0?ht.length:0,Re=J.get($),un=T.state.lights;if(pe===!0&&(Ge===!0||M!==X)){const pt=M===X&&$.id===k;O.setState($,M,pt)}let rt=!1;$.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==un.state.version||Re.outputColorSpace!==Te||K.isBatchedMesh&&Re.batching===!1||!K.isBatchedMesh&&Re.batching===!0||K.isBatchedMesh&&Re.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Re.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Re.instancing===!1||!K.isInstancedMesh&&Re.instancing===!0||K.isSkinnedMesh&&Re.skinning===!1||!K.isSkinnedMesh&&Re.skinning===!0||K.isInstancedMesh&&Re.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Re.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Re.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Re.instancingMorph===!1&&K.morphTexture!==null||Re.envMap!==Fe||$.fog===!0&&Re.fog!==Ae||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==O.numPlanes||Re.numIntersection!==O.numIntersection)||Re.vertexAlphas!==Ye||Re.vertexTangents!==Ke||Re.morphTargets!==De||Re.morphNormals!==lt||Re.morphColors!==It||Re.toneMapping!==vt||Re.morphTargetsCount!==en||!!Re.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(rt=!0):(rt=!0,Re.__version=$.version);let Fn=Re.currentProgram;rt===!0&&(Fn=Eo($,I,K),F&&$.isNodeMaterial&&F.onUpdateProgram($,Fn,Re));let oi=!1,Xi=!1,Qr=!1;const ft=Fn.getUniforms(),Pt=Re.uniforms;if(S.useProgram(Fn.program)&&(oi=!0,Xi=!0,Qr=!0),$.id!==k&&(k=$.id,Xi=!0),Re.needsLights){const pt=L_(T.state.lightProbeGridArray,K);Re.lightProbeGrid!==pt&&(Re.lightProbeGrid=pt,Xi=!0)}if(oi||X!==M){S.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ft.setValue(U,"projectionMatrix",M.projectionMatrix),ft.setValue(U,"viewMatrix",M.matrixWorldInverse);const ji=ft.map.cameraPosition;ji!==void 0&&ji.setValue(U,et.setFromMatrixPosition(M.matrixWorld)),b.logarithmicDepthBuffer&&ft.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ft.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),X!==M&&(X=M,Xi=!0,Qr=!0)}if(Re.needsLights&&(un.state.sunShadowMap.length>0&&ft.setValue(U,"sunShadowMap",un.state.sunShadowMap,ne),un.state.directionalShadowMap.length>0&&ft.setValue(U,"directionalShadowMap",un.state.directionalShadowMap,ne),un.state.spotShadowMap.length>0&&ft.setValue(U,"spotShadowMap",un.state.spotShadowMap,ne),un.state.pointShadowMap.length>0&&ft.setValue(U,"pointShadowMap",un.state.pointShadowMap,ne)),K.isSkinnedMesh){ft.setOptional(U,K,"bindMatrix"),ft.setOptional(U,K,"bindMatrixInverse");const pt=K.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ft.setValue(U,"boneTexture",pt.boneTexture,ne))}K.isBatchedMesh&&(ft.setOptional(U,K,"batchingTexture"),ft.setValue(U,"batchingTexture",K._matricesTexture,ne),ft.setOptional(U,K,"batchingIdTexture"),ft.setValue(U,"batchingIdTexture",K._indirectTexture,ne),ft.setOptional(U,K,"batchingColorTexture"),K._colorsTexture!==null&&ft.setValue(U,"batchingColorTexture",K._colorsTexture,ne));const Yi=ee.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&P.update(K,ee,Fn),(Xi||Re.receiveShadow!==K.receiveShadow)&&(Re.receiveShadow=K.receiveShadow,ft.setValue(U,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&I.environment!==null&&(Pt.envMapIntensity.value=I.environmentIntensity),Pt.dfgLUT!==void 0&&(Pt.dfgLUT.value=xC()),Xi){if(ft.setValue(U,"toneMappingExposure",L.toneMappingExposure),Re.needsLights&&D_(Pt,Qr),Ae&&$.fog===!0&&Ue.refreshFogUniforms(Pt,Ae),Ue.refreshMaterialUniforms(Pt,$,Z,z,T.state.transmissionRenderTarget[M.id]),Re.needsLights&&Re.lightProbeGrid){const pt=Re.lightProbeGrid;Pt.probesSH.value=pt.texture,Pt.probesMin.value.copy(pt.boundingBox.min),Pt.probesMax.value.copy(pt.boundingBox.max),Pt.probesResolution.value.copy(pt.resolution)}Pl.upload(U,Kh(Re),Pt,ne)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Pl.upload(U,Kh(Re),Pt,ne),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ft.setValue(U,"center",K.center),ft.setValue(U,"modelViewMatrix",K.modelViewMatrix),ft.setValue(U,"normalMatrix",K.normalMatrix),ft.setValue(U,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){const pt=$.uniformsGroups;for(let ji=0,es=pt.length;ji<es;ji++){const Qh=pt[ji];oe.update(Qh,Fn),oe.bind(Qh,Fn)}}return Fn}function D_(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.sunLights.needsUpdate=I,M.sunLightShadows.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function I_(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return te},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(M,I,ee){const $=J.get(M);$.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),J.get(M.texture).__webglTexture=I,J.get(M.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ee,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,I){const ee=J.get(M);ee.__webglFramebuffer=I,ee.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,ee=0){H=M,te=I,Y=ee;let $=null,K=!1,Ae=!1;if(M){const Te=J.get(M);if(Te.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(U.FRAMEBUFFER,Te.__webglFramebuffer),q.copy(M.viewport),de.copy(M.scissor),ce=M.scissorTest,S.viewport(q),S.scissor(de),S.setScissorTest(ce),k=-1;return}else if(Te.__webglFramebuffer===void 0)ne.setupRenderTarget(M);else if(Te.__hasExternalTextures)ne.rebindTextures(M,J.get(M.texture).__webglTexture,J.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ye=M.depthTexture;if(Te.__boundDepthTexture!==Ye){if(Ye!==null&&J.has(Ye)&&(M.width!==Ye.image.width||M.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(M)}}const Ne=M.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(Ae=!0);const Fe=J.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Fe[I])?$=Fe[I][ee]:$=Fe[I],K=!0):M.samples>0&&ne.useMultisampledRTT(M)===!1?$=J.get(M).__webglMultisampledFramebuffer:Array.isArray(Fe)?$=Fe[ee]:$=Fe,q.copy(M.viewport),de.copy(M.scissor),ce=M.scissorTest}else q.copy(ge).multiplyScalar(Z).floor(),de.copy(Ie).multiplyScalar(Z).floor(),ce=it;if(ee!==0&&($=W),S.bindFramebuffer(U.FRAMEBUFFER,$)&&S.drawBuffers(M,$),S.viewport(q),S.scissor(de),S.setScissorTest(ce),K){const Te=J.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+I,Te.__webglTexture,ee)}else if(Ae){const Te=I;for(let Ne=0;Ne<M.textures.length;Ne++){const Fe=J.get(M.textures[Ne]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ne,Fe.__webglTexture,ee,Te)}}else if(M!==null&&ee!==0){const Te=J.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Te.__webglTexture,ee)}k=-1};function Jh(M){const I=J.get(M);return(I.__readFormat!==M.format||I.__readType!==M.type)&&(I.__readFormat=M.format,I.__readType=M.type,I.__formatReadable=b.textureFormatReadable(M.format),I.__typeReadable=b.textureTypeReadable(M.type)),I}this.readRenderTargetPixels=function(M,I,ee,$,K,Ae,be,Te=0){if(!(M&&M.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ne=Ne[be]),Ne){S.bindFramebuffer(U.FRAMEBUFFER,Ne);try{const Fe=M.textures[Te],Ye=Fe.format,Ke=Fe.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Te);const De=Jh(Fe);if(De.__formatReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-$&&ee>=0&&ee<=M.height-K&&U.readPixels(I,ee,$,K,ve.convert(Ye),ve.convert(Ke),Ae)}finally{const Fe=H!==null?J.get(H).__webglFramebuffer:null;S.bindFramebuffer(U.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(M,I,ee,$,K,Ae,be,Te=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ne=J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&be!==void 0&&(Ne=Ne[be]),Ne)if(I>=0&&I<=M.width-$&&ee>=0&&ee<=M.height-K){S.bindFramebuffer(U.FRAMEBUFFER,Ne);const Fe=M.textures[Te],Ye=Fe.format,Ke=Fe.type;M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Te);const De=Jh(Fe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const lt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,lt),U.bufferData(U.PIXEL_PACK_BUFFER,Ae.byteLength,U.STREAM_READ),U.readPixels(I,ee,$,K,ve.convert(Ye),ve.convert(Ke),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const It=H!==null?J.get(H).__webglFramebuffer:null;S.bindFramebuffer(U.FRAMEBUFFER,It);const vt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await SM(U,vt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,lt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Ae),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(lt),U.deleteSync(vt),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,I=null,ee=0){const $=Math.pow(2,-ee),K=Math.floor(M.image.width*$),Ae=Math.floor(M.image.height*$),be=I!==null?I.x:0,Te=I!==null?I.y:0;ne.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,ee,0,0,be,Te,K,Ae),S.unbindTexture()},this.copyTextureToTexture=function(M,I,ee=null,$=null,K=0,Ae=0){let be,Te,Ne,Fe,Ye,Ke,De,lt,It;const vt=M.isCompressedTexture?M.mipmaps[Ae]:M.image;if(ee!==null)be=ee.max.x-ee.min.x,Te=ee.max.y-ee.min.y,Ne=ee.isBox3?ee.max.z-ee.min.z:1,Fe=ee.min.x,Ye=ee.min.y,Ke=ee.isBox3?ee.min.z:0;else{const Pt=Math.pow(2,-K);be=Math.floor(vt.width*Pt),Te=Math.floor(vt.height*Pt),M.isDataArrayTexture?Ne=vt.depth:M.isData3DTexture?Ne=Math.floor(vt.depth*Pt):Ne=1,Fe=0,Ye=0,Ke=0}$!==null?(De=$.x,lt=$.y,It=$.z):(De=0,lt=0,It=0);const ht=ve.convert(I.format),en=ve.convert(I.type);let Re;I.isData3DTexture?(ne.setTexture3D(I,0),Re=U.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(ne.setTexture2DArray(I,0),Re=U.TEXTURE_2D_ARRAY):(ne.setTexture2D(I,0),Re=U.TEXTURE_2D),S.activeTexture(U.TEXTURE0),S.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,I.flipY),S.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),S.pixelStorei(U.UNPACK_ALIGNMENT,I.unpackAlignment);const un=S.getParameter(U.UNPACK_ROW_LENGTH),rt=S.getParameter(U.UNPACK_IMAGE_HEIGHT),Fn=S.getParameter(U.UNPACK_SKIP_PIXELS),oi=S.getParameter(U.UNPACK_SKIP_ROWS),Xi=S.getParameter(U.UNPACK_SKIP_IMAGES);S.pixelStorei(U.UNPACK_ROW_LENGTH,vt.width),S.pixelStorei(U.UNPACK_IMAGE_HEIGHT,vt.height),S.pixelStorei(U.UNPACK_SKIP_PIXELS,Fe),S.pixelStorei(U.UNPACK_SKIP_ROWS,Ye),S.pixelStorei(U.UNPACK_SKIP_IMAGES,Ke);const Qr=M.isDataArrayTexture||M.isData3DTexture,ft=I.isDataArrayTexture||I.isData3DTexture;if(M.isDepthTexture){const Pt=J.get(M),Yi=J.get(I),pt=J.get(Pt.__renderTarget),ji=J.get(Yi.__renderTarget);S.bindFramebuffer(U.READ_FRAMEBUFFER,pt.__webglFramebuffer),S.bindFramebuffer(U.DRAW_FRAMEBUFFER,ji.__webglFramebuffer);for(let es=0;es<Ne;es++)Qr&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,J.get(M).__webglTexture,K,Ke+es),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,J.get(I).__webglTexture,Ae,It+es)),U.blitFramebuffer(Fe,Ye,be,Te,De,lt,be,Te,U.DEPTH_BUFFER_BIT,U.NEAREST);S.bindFramebuffer(U.READ_FRAMEBUFFER,null),S.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(K!==0||M.isRenderTargetTexture||J.has(M)){const Pt=J.get(M),Yi=J.get(I);S.bindFramebuffer(U.READ_FRAMEBUFFER,D),S.bindFramebuffer(U.DRAW_FRAMEBUFFER,G);for(let pt=0;pt<Ne;pt++)Qr?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pt.__webglTexture,K,Ke+pt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Pt.__webglTexture,K),ft?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Yi.__webglTexture,Ae,It+pt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Yi.__webglTexture,Ae),K!==0?U.blitFramebuffer(Fe,Ye,be,Te,De,lt,be,Te,U.COLOR_BUFFER_BIT,U.NEAREST):ft?U.copyTexSubImage3D(Re,Ae,De,lt,It+pt,Fe,Ye,be,Te):U.copyTexSubImage2D(Re,Ae,De,lt,Fe,Ye,be,Te);S.bindFramebuffer(U.READ_FRAMEBUFFER,null),S.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ft?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(Re,Ae,De,lt,It,be,Te,Ne,ht,en,vt.data):I.isCompressedArrayTexture?U.compressedTexSubImage3D(Re,Ae,De,lt,It,be,Te,Ne,ht,vt.data):U.texSubImage3D(Re,Ae,De,lt,It,be,Te,Ne,ht,en,vt):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Ae,De,lt,be,Te,ht,en,vt.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Ae,De,lt,vt.width,vt.height,ht,vt.data):U.texSubImage2D(U.TEXTURE_2D,Ae,De,lt,be,Te,ht,en,vt);S.pixelStorei(U.UNPACK_ROW_LENGTH,un),S.pixelStorei(U.UNPACK_IMAGE_HEIGHT,rt),S.pixelStorei(U.UNPACK_SKIP_PIXELS,Fn),S.pixelStorei(U.UNPACK_SKIP_ROWS,oi),S.pixelStorei(U.UNPACK_SKIP_IMAGES,Xi),Ae===0&&I.generateMipmaps&&U.generateMipmap(Re),S.unbindTexture()},this.initRenderTarget=function(M){J.get(M).__webglFramebuffer===void 0&&ne.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ne.setTextureCube(M,0):M.isData3DTexture?ne.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ne.setTexture2DArray(M,0):ne.setTexture2D(M,0),S.unbindTexture()},this.resetState=function(){te=0,Y=0,H=null,S.reset(),_e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),n.unpackColorSpace=tt._getUnpackColorSpace()}}const _n=12,er=.42,Bn=4,vg={hot:{body:16175058,roof:16639977},mid:{body:16052974,roof:16645370},ok:{body:15988472,roof:16645886},sel:{body:13286901,roof:14998783},none:{body:15922680,roof:16645630}},Ft=t=>t-_n/2;function yC(){let t=90210;const e=()=>{t=t+1831565813|0;let r=Math.imul(t^t>>>15,1|t);return r=r+Math.imul(r^r>>>7,61|r)^r,((r^r>>>14)>>>0)/4294967296},n=[],i=10;for(let r=-i;r<_n+i;r++)for(let s=-i;s<_n+i;s++){if(r>=0&&r<_n&&s>=0&&s<_n||(r%Bn+Bn)%Bn===Bn-1||(s%Bn+Bn)%Bn===Bn-1||e()>.55)continue;const l=e()<.24?2:1;n.push({gx:r+.14,gy:s+.14,gw:l-.28,gd:.72,lv:1+Math.floor(e()*4),tone:e()*3|0})}return n}const MC=yC(),EC=49,wC=45,_g=24;function xg(t,e){const n=t*Math.PI/180,i=e*Math.PI/180,r=Math.cos(n)*_g;return[Math.sin(i)*r,Math.sin(n)*_g,Math.cos(i)*r]}function kh({report:t,pins:e=[],activeId:n=null,districtTone:i={},route:r=null,you:s=null,onPick:a,full:o=!1,height:l=230,tilt:c=EC,turn:f=wC,headroom:h=0}){const u=ke.useRef(null),p=ke.useRef(null),[v,w]=ke.useState({}),g=ke.useRef({x:0,y:0}),[d,_]=ke.useState({x:0,y:0});return ke.useEffect(()=>{var X;const y=u.current;if(!y)return;const x=new FM;x.background=null;const E=new SC({antialias:!0,alpha:!0});E.setPixelRatio(Math.min(window.devicePixelRatio,2)),E.shadowMap.enabled=!0,E.shadowMap.type=Oa,E.outputColorSpace=xn,y.appendChild(E.domElement);const T=new Cc(-1,1,1,-1,.1,100);T.position.set(...xg(c,f)),T.lookAt(0,0,0),x.add(new vE(16777215,13226720,2.1));const C=new SE(16774888,2.4);C.position.set(9,16,7),C.castShadow=!0,C.shadow.mapSize.set(2048,2048);const m=C.shadow.camera;m.left=-12,m.right=12,m.top=12,m.bottom=-12,m.near=1,m.far=46,C.shadow.bias=-.0012,C.shadow.normalBias=.02,x.add(C);const R=new Aa;x.add(R),p.current={scene:x,renderer:E,camera:T,root:R,host:y},p.current.project=(q,de,ce=0)=>{const Oe=new B(Ft(q),ce,Ft(de)).project(T);return{left:(Oe.x*.5+.5)*100,top:(-Oe.y*.5+.5)*100}};const L=()=>{const q=y.clientWidth||320,de=l;E.setSize(q,de);const{cw:ce,ch:Oe}=p.current.fit||{cw:9,ch:6},Q=p.current.shift||{x:0,y:0},le=q/de,z=Math.max(ce,Oe*le),Z=z/le,fe=z*2/q,Me=Z*2/de,ge=_n*.5,Ie=_n*.34,it=Math.max(0,(ge-z)/fe),He=Math.max(0,(Ie-Z)/Me),pe=g.current;pe.x=Math.max(-it,Math.min(it,pe.x)),pe.y=Math.max(-He,Math.min(He,pe.y));const Ge={x:Q.x-pe.x*fe,y:Q.y+pe.y*Me};p.current.wpp={x:fe,y:Me},T.left=-z+Ge.x,T.right=z+Ge.x,T.top=Z+Ge.y,T.bottom=-Z+Ge.y,T.updateProjectionMatrix(),E.render(x,T)};p.current.resize=L;const N=(X=window.matchMedia)==null?void 0:X.call(window,"(prefers-reduced-motion: reduce)");let F=0;const W=()=>{var de;const q=(de=p.current)==null?void 0:de.flow;q&&!(N!=null&&N.matches)&&(q.offset.x-=.006,E.render(x,T)),F=requestAnimationFrame(W)};F=requestAnimationFrame(W),p.current.stopLoop=()=>cancelAnimationFrame(F);const D=new ResizeObserver(L);D.observe(y);let G=!1,te=null;const Y=q=>{var de,ce,Oe;(ce=(de=q.target).closest)!=null&&ce.call(de,".p3, .p3drop, .p3dot")||(G=!0,te={x:q.clientX,y:q.clientY},(Oe=y.setPointerCapture)==null||Oe.call(y,q.pointerId),y.classList.add("is-dragging"))},H=q=>{var Oe,Q;if(!G||!te)return;const de=q.clientX-te.x,ce=q.clientY-te.y;te={x:q.clientX,y:q.clientY},g.current={x:g.current.x+de,y:g.current.y+ce},(Q=(Oe=p.current)==null?void 0:Oe.resize)==null||Q.call(Oe),_({...g.current})},k=q=>{var de;G=!1,te=null,(de=y.releasePointerCapture)==null||de.call(y,q.pointerId),y.classList.remove("is-dragging")};return y.addEventListener("pointerdown",Y),y.addEventListener("pointermove",H),y.addEventListener("pointerup",k),y.addEventListener("pointercancel",k),()=>{var q,de;(de=(q=p.current)==null?void 0:q.stopLoop)==null||de.call(q),y.removeEventListener("pointerdown",Y),y.removeEventListener("pointermove",H),y.removeEventListener("pointerup",k),y.removeEventListener("pointercancel",k),D.disconnect(),E.dispose(),E.domElement.parentNode&&E.domElement.parentNode.removeChild(E.domElement),x.traverse(ce=>{ce.geometry&&ce.geometry.dispose(),ce.material&&(Array.isArray(ce.material)?ce.material:[ce.material]).forEach(Oe=>Oe.dispose())}),p.current=null}},[l]),ke.useEffect(()=>{var Oe;const y=p.current;if(!y)return;const{root:x,renderer:E,scene:T,camera:C}=y;for(C.position.set(...xg(c,f)),C.lookAt(0,0,0),C.updateMatrixWorld(),g.current={x:0,y:0},_({x:0,y:0});x.children.length;){const Q=x.children.pop();(Oe=Q.traverse)==null||Oe.call(Q,le=>{le.geometry&&le.geometry.dispose(),le.material&&(Array.isArray(le.material)?le.material:[le.material]).forEach(z=>z.dispose())})}const m=new mt(new $t(_n*4,.3,_n*4),new vn({color:16054266,roughness:.95}));m.position.y=-.15,m.receiveShadow=!0,x.add(m);const R=new vn({color:14478552,roughness:1});for(let Q=0;Q<3;Q++)for(let le=0;le<3;le++){const z=new mt(new $t(2.9,.03,2.9),R);z.position.set(Ft(Q*Bn+1.5),.015,Ft(le*Bn+1.5)),z.receiveShadow=!0,x.add(z)}const L=new vn({color:14278375,roughness:1}),N=new vn({color:16054010,roughness:1}),F=_n*3;for(let Q=Bn-1;Q<_n;Q+=Bn){const le=new mt(new $t(.62,.02,F),L);le.position.set(Ft(Q+.5),.01,0),le.receiveShadow=!0,x.add(le);const z=new mt(new $t(F,.02,.62),L);z.position.set(0,.01,Ft(Q+.5)),z.receiveShadow=!0,x.add(z);for(let Z=.4;Z<_n;Z+=.9){const fe=new mt(new $t(.05,.02,.34),N);fe.position.set(Ft(Q+.5),.025,Ft(Z)),x.add(fe);const Me=new mt(new $t(.34,.02,.05),N);Me.position.set(Ft(Z),.025,Ft(Q+.5)),x.add(Me)}}const W=[15330802,15002095,15659509].map(Q=>new vn({color:Q,roughness:.9}));MC.forEach(Q=>{const le=Q.lv*er,z=new mt(new $t(Q.gw,le,Q.gd),W[Q.tone%W.length]);z.position.set(Ft(Q.gx+Q.gw/2),le/2,Ft(Q.gy+Q.gd/2)),z.castShadow=!0,z.receiveShadow=!0,x.add(z)});const D=new vn({color:9675707,roughness:.4,metalness:.1});t.campusItems.forEach(Q=>{if(Q.t!=="b")return;const le=vg[i[Q.district]]||vg.none,z=Q.lv*er,Z=new mt(new $t(Q.gw,z,Q.gd),new vn({color:le.body,roughness:.82}));Z.position.set(Ft(Q.gx+Q.gw/2),z/2,Ft(Q.gy+Q.gd/2)),Z.castShadow=!0,Z.receiveShadow=!0,x.add(Z);const fe=new mt(new $t(Q.gw*.88,.05,Q.gd*.88),new vn({color:le.roof,roughness:.9}));if(fe.position.set(Z.position.x,z+.025,Z.position.z),fe.castShadow=!0,x.add(fe),Q.roofBox){const Me=new mt(new $t(.24,.22,.24),new vn({color:le.roof,roughness:.9}));Me.position.set(Z.position.x+Q.gw*.18,z+.16,Z.position.z+Q.gd*.14),Me.castShadow=!0,x.add(Me)}for(let Me=0;Me<Q.lv;Me++){const ge=Me*er+er*.55,Ie=new mt(new $t(Q.gw*.72,er*.34,.02),D);Ie.position.set(Z.position.x,ge,Z.position.z+Q.gd/2+.005),x.add(Ie);const it=new mt(new $t(.02,er*.34,Q.gd*.72),D);it.position.set(Z.position.x+Q.gw/2+.005,ge,Z.position.z),x.add(it)}});const G=new vn({color:9071178,roughness:1}),te=[6537064,5087830,7916918].map(Q=>new vn({color:Q,roughness:.95}));if(t.campusItems.forEach(Q=>{if(Q.t!=="g")return;const le=Q.gr*.5,z=Ft(Q.gx),Z=Ft(Q.gy),fe=new mt(new ka(le*.13,le*.17,le*1.2,6),G);fe.position.set(z,le*.6,Z),fe.castShadow=!0,x.add(fe);const Me=te[Q.tone%te.length];[[0,le*1.5,0,le*.82],[le*.42,le*1.24,le*.2,le*.56],[-le*.36,le*1.3,-le*.26,le*.5],[le*.05,le*1.95,-le*.1,le*.44]].forEach(([ge,Ie,it,He])=>{const pe=new mt(new Oh(He,10,8),Me);pe.position.set(z+ge,Ie,Z+it),pe.castShadow=!0,x.add(pe)})}),r&&r.points&&r.points.length>1){const Q=r.points.map(Ie=>new B(Ft(Ie.gx),.09,Ft(Ie.gy))),le=new cE;for(let Ie=0;Ie<Q.length-1;Ie++)le.add(new m_(Q[Ie],Q[Ie+1]));const z=le.getLength(),Z=AC();Z.repeat.set(Math.max(2,Math.round(z*1.6)),1);const fe=new mt(new Bh(le,Math.max(24,Q.length*12),.15,8,!1),new vn({map:Z,color:16777215,emissive:2758016,emissiveIntensity:.28,roughness:.45}));fe.castShadow=!0,x.add(fe),y.flow=Z;const Me=new mt(new ka(.34,.34,.06,20),new vn({color:16777215,roughness:.5}));Me.position.copy(Q[0]),x.add(Me);const ge=new mt(new ka(.19,.19,.09,16),new vn({color:7162623,roughness:.4}));ge.position.copy(Q[0]).setY(.11),x.add(ge)}else y.flow=null;if(r){const Q=[],le=[];C.updateMatrixWorld();const z=new B,Z=(Be,et,Xe=0)=>{z.set(Ft(Be),Xe,Ft(et)).applyMatrix4(C.matrixWorldInverse),Q.push(z.x),le.push(z.y)};(r.points||r.legs.map(Be=>Be.at)).forEach(Be=>Z(Be.gx,Be.gy));const fe=r.points||r.legs.map(Be=>Be.at),Me=fe[fe.length-1];Me&&Z(Me.gx,Me.gy,5*er+1),s&&Z(s.gx,s.gy);const ge=1.8,Ie=1.4,it=Math.max(3,(Math.max(...Q)-Math.min(...Q))/2+ge),He=Math.max(2.4,(Math.max(...le)-Math.min(...le))/2+Ie);y.fit={cw:it,ch:He};const pe=(Math.max(...Q)+Math.min(...Q))/2,Ge=(Math.max(...le)+Math.min(...le))/2;y.shift={x:pe,y:Ge}}else{const Q=o?.92:.42;y.fit={cw:_n*.74*Q,ch:_n*.5*Q},y.shift={x:0,y:0}}y.resize(),E.render(T,C);const Y={};e.forEach(Q=>{const le=go(Q.district),z=t.campusItems.reduce((Z,fe)=>fe.t==="b"&&fe.district===Q.district?Math.max(Z,fe.lv):Z,1);Y[Q.id]={label:y.project(le.gx,le.gy,z*er+.45),dot:y.project(le.gx,le.gy,.1)}}),s&&(Y.__you={label:y.project(s.gx,s.gy,2.6),dot:y.project(s.gx,s.gy,.15)});const H=Q=>({w:Q,h:7.2}),k=Q=>{const le=Math.max((Q.label||"").length,(Q.sub||"").length);return Math.min(46,9+le*2.6)},X=[];s&&Y.__you&&X.push({id:"__you",at:Y.__you.label,w:24}),e.filter(Q=>Q.showLabel&&Y[Q.id]).slice().sort((Q,le)=>Q.id===n?-1:le.id===n?1:0).forEach(Q=>X.push({id:Q.id,at:Y[Q.id].label,w:k(Q)}));const de=[],ce=new Set;X.forEach(Q=>{const le=H(Q.w);let z=Q.at.top;const Z=Q.at.left;let fe=0;const Me=()=>de.some(ge=>Math.abs(ge.left-Z)<(ge.w+le.w)/2+1&&Math.abs(ge.top-z)<le.h+.6);for(;Me()&&fe<14;)z-=le.h*.85,fe++;if(Me()||z<Math.max(5,h)){ce.add(Q.id);return}de.push({left:Z,top:z,w:le.w}),Y[Q.id]={...Y[Q.id],label:{left:Z,top:z}}}),Y.__hidden=ce,w(Y)},[t,i,r,o,e,s,c,f,n,h]),A.jsx("div",{className:"c3d",ref:u,style:{height:l},children:A.jsx("div",{className:"c3d__pan",style:{transform:`translate(${d.x}px, ${d.y}px)`},children:A.jsx(TC,{pins:e,activeId:n,you:s,onPick:a,proj:v})})})}function TC({pins:t,activeId:e,you:n,onPick:i,proj:r}){var s;return A.jsxs("div",{className:"c3d__pins",children:[n&&r.__you&&!((s=r.__hidden)!=null&&s.has("__you"))&&A.jsxs(A.Fragment,{children:[A.jsx("span",{className:"p3drop p3drop--you",style:Sa(r.__you.dot||r.__you.label),children:A.jsx(Sg,{})}),A.jsx("span",{className:"p3 p3--you",style:Sa(r.__you.label),children:"ตำแหน่งของคุณ"})]}),t.map(a=>{var l;const o=r[a.id];return o?!a.showLabel||(l=r.__hidden)!=null&&l.has(a.id)?A.jsx("button",{type:"button",className:"p3dot p3dot--"+a.tone,style:Sa(o.dot),onClick:i?()=>i(a.id):void 0,"aria-label":a.label},a.id):A.jsxs(ke.Fragment,{children:[A.jsx("button",{type:"button",className:"p3drop p3drop--"+a.tone+(a.id===e?" is-on":""),style:Sa(o.dot),onClick:i?()=>i(a.id):void 0,"aria-label":a.label,children:A.jsx(Sg,{})}),A.jsxs("button",{type:"button",className:"p3 p3--card p3--"+a.tone+(a.id===e?" is-on":""),style:Sa(o.label),onClick:i?()=>i(a.id):void 0,children:[A.jsx("b",{children:a.label}),A.jsx("small",{className:"p3--"+a.tone,children:a.sub})]})]},a.id):null})]})}const Sa=t=>({left:Math.min(Math.max(t.left,13),87)+"%",top:Math.min(Math.max(t.top,9),92)+"%"});function Sg(){return A.jsxs("svg",{viewBox:"0 0 24 34",width:"18",height:"26","aria-hidden":"true",children:[A.jsx("path",{d:"M12 33C12 33 22 21.5 22 13A10 10 0 0 0 2 13C2 21.5 12 33 12 33Z",className:"p3drop__body"}),A.jsx("circle",{cx:"12",cy:"13",r:"4.2",className:"p3drop__eye"})]})}let hl=null;function AC(){if(!hl){const e=document.createElement("canvas");e.width=64,e.height=32;const n=e.getContext("2d");n.fillStyle="#6d4aff",n.fillRect(0,0,64,32),n.fillStyle="#ffffff",n.beginPath(),n.moveTo(14,6),n.lineTo(38,16),n.lineTo(14,26),n.lineTo(22,16),n.closePath(),n.fill(),hl=new jM(e),hl.colorSpace=xn}const t=hl.clone();return t.needsUpdate=!0,t.wrapS=nc,t.wrapT=pi,t}const CC={cap:"M3 9l9-4 9 4-9 4-9-4zm3 5v3c0 1.1 2.7 2 6 2s6-.9 6-2v-3",book:"M5 4h9a3 3 0 013 3v13H8a3 3 0 01-3-3V4zm0 0v13M17 7h2",users:"M9 11a3 3 0 100-6 3 3 0 000 6zm7 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 19c0-2.8 2.7-4.5 6-4.5s6 1.7 6 4.5M17 14.5c2.4.3 4 1.9 4 4.5",chat:"M4 5h16v11H9l-5 4V5z",star:"M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8L12 4z",compass:"M12 21a9 9 0 100-18 9 9 0 000 18zm3.5-12.5l-2 5-5 2 2-5 5-2z",seat:"M6 10V6a2 2 0 012-2h8a2 2 0 012 2v4M4 10h16v5a3 3 0 01-3 3H7a3 3 0 01-3-3v-5zm3 8v2m10-2v2",plug:"M9 3v6m6-6v6M6 9h12v3a6 6 0 01-6 6 6 6 0 01-6-6V9zm6 12v-3",wifi:"M3 9a15 15 0 0118 0M6.5 12.5a10 10 0 0111 0M10 16a5 5 0 014 0M12 19.5h.01",sun:"M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",silent:"M4 9v6h4l5 4V5L8 9H4zm14-1a6 6 0 010 8M20 3L4 21",board:"M4 4h16v11H4V4zm5 15l3-4 3 4M12 4V2",leaf:"M20 4C10 4 4 9 4 16c0 2 .6 3.4.6 3.4S9 12 20 9c0 0-3 8-11 9",screen:"M3 5h18v11H3V5zm6 15h6m-3-4v4",desk:"M3 10h18M5 10V6h14v4M6 10v9m12-9v9M9 14h6",clock:"M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v5l3.5 2",pin:"M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",walk:"M13 5a1.6 1.6 0 100-3.2A1.6 1.6 0 0013 5zm-1.5 3l-3 3 1 5m2-8l3 2 2.5-1M11.5 8L10 21m3.5-8l2.5 8",back:"M15 5l-7 7 7 7",next:"M9 5l7 7-7 7",heart:"M12 20s-7-4.4-7-9.2A4.1 4.1 0 0112 8a4.1 4.1 0 017 2.8C19 15.6 12 20 12 20z",search:"M11 18a7 7 0 100-14 7 7 0 000 14zm5.5-1.5L21 21",temp:"M12 14V4a2 2 0 10-4 0v10a4 4 0 104 0z",dust:"M5 8h14M4 12h16M6 16h12M8 20h8",crowd:"M8 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm8 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 19c0-2.5 2.2-4 5-4s5 1.5 5 4m3-4c2.6.2 4 1.7 4 4",check:"M4 12.5l5 5L20 6.5",alert:"M12 8v5m0 3h.01M12 3l9 16H3l9-16z",grid:"M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z",wc:"M7 4a1.6 1.6 0 100 3.2A1.6 1.6 0 007 4zm10 0a1.6 1.6 0 100 3.2A1.6 1.6 0 0017 4zM4.6 20l.9-6H3.8l1.3-4.4A1.6 1.6 0 016.6 8.5h.8a1.6 1.6 0 011.5 1.1L10.2 14H8.5l.9 6H4.6zM13.8 20V9.8A1.3 1.3 0 0115 8.5h4a1.3 1.3 0 011.2 1.3V20h-6.4z",layers:"M12 3l9 5-9 5-9-5 9-5zm9 9l-9 5-9-5m18 4l-9 5-9-5"};function Ze({name:t,size:e=18,className:n=""}){const i=CC[t];return i?A.jsx("svg",{className:"ic "+n,width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:A.jsx("path",{d:i})}):null}Object.fromEntries(Xs.map(t=>[t.id,t]));function RC(){const t=ke.useMemo(()=>wy(window.location.search),[]),e=ke.useMemo(()=>Ay(pm(t.input)),[t]),n=ke.useMemo(()=>new Date().getHours(),[]),i=Math.min(e.max,Math.max(e.min,n)),r=n<e.min||n>e.max,[s,a]=ke.useState(i),o=ke.useMemo(()=>pm({...t.input,nowHour:s}),[t,s]),{view:l,go:c,back:f,canBack:h,loading:u}=kC("intent"),p=ke.useRef(null),[v,w]=ke.useState(null),g=ke.useCallback(pe=>{p.current=pe,w(pe)},[]);ke.useEffect(()=>{p.current&&(p.current.scrollTop=0)},[l]);const[d,_]=ke.useState(null),[y,x]=ke.useState(null),[E,T]=ke.useState("overview"),[C,m]=ke.useState(!1),[R,L]=ke.useState(null),N=R_(),F=P_(116,Math.round(N*.56)),D=b_(v)||Math.max(320,N-210),G=D,te=D,Y=ke.useMemo(()=>new URLSearchParams(window.location.search).get("tune")==="1",[]),[H,k]=ke.useState(49),[X,q]=ke.useState(45),de=ke.useMemo(()=>d?Py(o,d,s):[],[o,d,s]),ce=de.find(pe=>pe.space.id===y)||de[0]||null,Oe=de.filter(pe=>pe.space.id!==(ce==null?void 0:ce.space.id)).slice(0,3),Q=ke.useMemo(()=>Oy(o,s),[o,s]),le=ke.useMemo(()=>ce?Iy(ce.space):null,[ce]),z=ke.useMemo(()=>Uy(o),[o]),Z=ke.useMemo(()=>Fy(o,s),[o,s]),fe=ke.useMemo(()=>{const pe={},Ge={};return Xs.forEach(Be=>{const et=bt(Be).district,Xe=Ys(o,Be,s);(Ge[et]===void 0||Xe>Ge[et])&&(Ge[et]=Xe)}),Object.entries(Ge).forEach(([Be,et])=>{pe[Be]=vr(et).tone}),ce&&(pe[bt(ce.space).district]="sel"),pe},[o,s,ce]),Me=ke.useMemo(()=>{const pe=d?de:Xs.map(Xe=>({space:Xe,load:Ys(o,Xe,s)})),Ge=new Map;pe.forEach((Xe,Nt)=>{const ct=bt(Xe.space);Ge.has(ct.id)||Ge.set(ct.id,{b:ct,load:Xe.load,order:Nt})});const Be=[...Ge.values()].sort((Xe,Nt)=>Xe.order-Nt.order),et=new Set(Be.slice(0,3).map(Xe=>Xe.b.id));return ce&&et.add(bt(ce.space).id),Be.map(Xe=>({id:Xe.b.id,district:Xe.b.district,label:Xe.b.shortTh,sub:vr(Xe.load??0).th,tone:vr(Xe.load??0).tone,showLabel:et.has(Xe.b.id)}))},[d,de,o,s,ce]),ge={intent:0,context:1,building:2,recommend:2,detail:3,route:4,extra:5},Ie=6,it={intent:d?()=>c("context"):null,context:ce?()=>c("recommend"):null,building:()=>c("detail"),recommend:()=>c("detail"),detail:()=>c("route"),route:()=>c("extra"),extra:null},He=d&&A.jsxs("span",{className:"pill",children:[A.jsx(Ze,{name:fa[d].icon,size:13}),fa[d].en]});return A.jsxs("div",{className:"app",children:[A.jsx(NC,{survey:t,onBack:()=>window.location.href=Ty(window.location.search)}),A.jsxs("main",{className:"screen"+(u?" is-loading":""),ref:g,children:[l==="intent"&&A.jsxs(A.Fragment,{children:[A.jsxs("div",{className:"hello",children:[A.jsx("p",{children:"สวัสดี"}),A.jsx("h1",{children:"วันนี้คุณมาที่คณะเพื่ออะไร?"})]}),A.jsx("div",{className:"intents",children:kv.map(pe=>A.jsxs("button",{type:"button",className:"intent"+(d===pe.id?" is-on":""),onClick:()=>{_(pe.id),x(null),c("context")},children:[A.jsx("span",{className:"intent__ic",children:A.jsx(Ze,{name:pe.icon,size:20})}),A.jsx("b",{children:pe.en}),A.jsx("small",{children:pe.th})]},pe.id))}),A.jsxs("div",{className:"bot",children:[A.jsx("span",{className:"bot__ic",children:A.jsx(Ze,{name:"star",size:18})}),A.jsxs("p",{children:[A.jsx("b",{children:"MOMAY ช่วยคุณได้"}),"บอกสิ่งที่คุณต้องการ แล้ว MOMAY จะหาตัวเลือกที่เหมาะที่สุดให้คุณแบบเรียลไทม์"]})]})]}),l==="context"&&d&&A.jsxs("div",{className:"mapscreen",children:[A.jsxs("div",{className:"vhead vhead--over",children:[A.jsxs("button",{type:"button",className:"pill pill--tap",onClick:f,children:[A.jsx(Ze,{name:fa[d].icon,size:13}),fa[d].en,A.jsx(Ze,{name:"back",size:11})]}),A.jsx("h1",{children:fa[d].leadTh})]}),A.jsx("div",{className:"mapwrap mapwrap--fill",children:A.jsx(kh,{report:o,pins:Me,activeId:ce?bt(ce.space).id:null,districtTone:fe,full:C,you:Js,onPick:pe=>{L(pe),c("building")},height:G,tilt:H,turn:X,headroom:15})}),A.jsxs("div",{className:"sheet"+(F.open?" is-open":""),style:{height:F.h},children:[A.jsxs("div",{className:"sheet__head",ref:F.ref,role:"button","aria-expanded":F.open,children:[A.jsx("i",{className:"sheet__grab"}),A.jsxs("span",{className:"route__sum",children:[A.jsx(Ze,{name:"clock",size:16}),A.jsxs("span",{children:[A.jsxs("b",{children:[String(s).padStart(2,"0"),":00 น. · คน",Q.crowd.th]}),A.jsx("small",{children:F.open?"แตะอาคารบนผังเพื่อดูโซนข้างใน":"แตะเพื่อดูสภาพและเปลี่ยนเวลา"})]})]}),A.jsx(Ze,{name:"back",size:15,className:"sheet__chev"})]}),A.jsxs("div",{className:"sheet__body",children:[A.jsx(DC,{hour:s,realHour:i,range:e,outside:r,clock:n,onChange:a,report:o}),A.jsx("h4",{className:"subhead",children:"สภาพตอนนี้"}),A.jsx(IC,{cond:Q,report:o}),A.jsxs("button",{type:"button",className:"seeall",onClick:()=>m(pe=>!pe),children:[C?"ย่อผังกลับ":"ดูภาพรวมพื้นที่ทั้งหมด",A.jsx(Ze,{name:"next",size:13})]})]})]})]}),l==="building"&&R&&A.jsx(bC,{buildingId:R,report:o,hour:s,intent:d,onOpen:pe=>{x(pe),c("detail")}}),l==="recommend"&&ce&&A.jsxs(A.Fragment,{children:[A.jsxs("div",{className:"vhead",children:[He,A.jsx("h1",{children:"MOMAY แนะนำพื้นที่ที่เหมาะกับคุณตอนนี้"}),A.jsx("p",{children:"จากความหนาแน่น · สภาพแวดล้อม · ความใกล้ และเวลาที่คุณมี"})]}),A.jsx(UC,{pick:ce,intent:d,onOpen:()=>c("detail"),onRoute:()=>c("route")}),A.jsx("h4",{className:"subhead",children:"ตัวเลือกอื่น ๆ ที่เหมาะกับคุณ"}),A.jsx("div",{className:"alts",children:Oe.map(pe=>A.jsxs("button",{type:"button",className:"alt",onClick:()=>{x(pe.space.id),c("detail")},children:[A.jsx("span",{className:"alt__art art--"+pe.space.tone,children:Xn(pe.space)&&A.jsx("img",{src:Xn(pe.space),alt:"",loading:"lazy"})}),A.jsxs("span",{className:"alt__txt",children:[A.jsx("b",{children:pe.space.th}),A.jsx("small",{children:bt(pe.space).th}),A.jsxs("span",{className:"chip chip--"+pe.crowd.tone,children:[A.jsx(Ze,{name:"crowd",size:12}),"คน",pe.crowd.th," · ",pe.space.noteTh]})]}),A.jsxs("span",{className:"alt__walk",children:[A.jsx(Ze,{name:"walk",size:14}),pe.walk.minutes," นาที"]})]},pe.space.id))})]}),l==="detail"&&ce&&A.jsxs(A.Fragment,{children:[A.jsx(FC,{pick:ce,report:o,hour:s,tab:E,onTab:T,onBack:f}),A.jsxs("button",{type:"button",className:"btn",onClick:()=>c("route"),children:["ดูเส้นทางไปที่นี่",A.jsx(Ze,{name:"next",size:16})]})]}),l==="route"&&ce&&A.jsx(A.Fragment,{children:A.jsx(OC,{report:o,pick:ce,route:le,districtTone:fe,mapH:te,tilt:H,turn:X,onBack:f})}),l==="extra"&&ce&&A.jsxs(A.Fragment,{children:[A.jsx("div",{className:"vhead",children:A.jsx("h1",{children:"สิ่งที่คุณอาจสนใจเพิ่มเติม"})}),A.jsx(BC,{events:z,tips:Z,report:o,hour:s,onPick:pe=>{x(pe),c("detail")},currentId:ce.space.id})]})]},l),Y&&A.jsxs("div",{className:"tune",children:[A.jsxs("label",{children:["ก้ม ",A.jsxs("b",{children:[H,"°"]}),A.jsx("input",{type:"range",min:"20",max:"88",value:H,onChange:pe=>k(+pe.target.value)})]}),A.jsxs("label",{children:["หัน ",A.jsxs("b",{children:[X,"°"]}),A.jsx("input",{type:"range",min:"0",max:"90",value:X,onChange:pe=>q(+pe.target.value)})]}),A.jsx("span",{children:"เจอมุมที่ชอบแล้วบอกตัวเลขมา"})]}),A.jsx(LC,{step:ge[l]??0,total:Ie,onBack:h?f:null,onNext:it[l]})]})}function bC({buildingId:t,report:e,hour:n,intent:i,onOpen:r}){var c;const s=zv[t],a=Xs.filter(f=>f.building===t).map(f=>{const h=Ys(e,f,n);return{z:f,load:h,free:Eh(f,h),crowd:vr(h),walk:Bv(Js,go(s.district)),fit:i?f.fits[i]??0:0}}).sort((f,h)=>h.fit-f.fit||f.load-h.load),o=a.reduce((f,h)=>Math.max(f,h.load),0),l=vr(o);return A.jsxs(A.Fragment,{children:[A.jsxs("div",{className:"vhead",children:[A.jsx("h1",{children:s.th}),A.jsxs("p",{children:["ในอาคารนี้มี ",a.length," โซน · ตอนนี้โดยรวม",A.jsxs("b",{className:"txt--"+l.tone,children:[" ",l.th]})," · เดิน ",(c=a[0])==null?void 0:c.walk.minutes," นาที"]})]}),A.jsx("div",{className:"alts",children:a.map(f=>A.jsxs("button",{type:"button",className:"alt",onClick:()=>r(f.z.id),children:[A.jsx("span",{className:"alt__art art--"+f.z.tone,children:Xn(f.z)&&A.jsx("img",{src:Xn(f.z),alt:"",loading:"lazy"})}),A.jsxs("span",{className:"alt__txt",children:[A.jsx("b",{children:f.z.th}),A.jsx("small",{children:by[f.z.kind]}),A.jsxs("span",{className:"chip chip--"+f.crowd.tone,children:[A.jsx(Ze,{name:"seat",size:12}),"คน",f.crowd.th," · ว่าง ",f.free," ที่"]})]}),A.jsx("span",{className:"alt__walk",children:A.jsx(Ze,{name:"next",size:14})})]},f.z.id))})]})}function PC({report:t,pick:e,route:n,districtTone:i,tilt:r,turn:s,onClose:a}){const[o,l]=ke.useState(()=>typeof window<"u"?window.innerHeight-96:600);return ke.useEffect(()=>{const c=h=>h.key==="Escape"&&a(),f=()=>l(window.innerHeight-96);return window.addEventListener("keydown",c),window.addEventListener("resize",f),()=>{window.removeEventListener("keydown",c),window.removeEventListener("resize",f)}},[a]),A.jsxs("div",{className:"mapfull",role:"dialog","aria-label":"ผังเส้นทางไป "+e.space.th,children:[A.jsxs("div",{className:"mapfull__bar",children:[A.jsxs("b",{children:["เส้นทางไป ",e.space.th]}),A.jsx("button",{type:"button",className:"route__ic",onClick:a,"aria-label":"ปิด",children:A.jsx(Ze,{name:"back",size:15})})]}),A.jsx(kh,{report:t,pins:[{id:bt(e.space).id,district:bt(e.space).district,label:e.space.th,tone:"go",showLabel:!0}],activeId:bt(e.space).id,route:n,you:Js,districtTone:{...i,[bt(e.space).district]:"sel"},height:o,tilt:r,turn:s}),A.jsx("p",{className:"mapfull__hint",children:"ลากเพื่อเลื่อนผัง · กด Esc หรือปุ่มมุมบนเพื่อปิด"})]})}function LC({step:t,total:e,onBack:n,onNext:i}){return A.jsxs("div",{className:"nav",children:[n?A.jsx("button",{type:"button",className:"nav__back",onClick:n,"aria-label":"ย้อนกลับ",children:A.jsx(Ze,{name:"back",size:16})}):A.jsx("span",{}),A.jsx("span",{className:"nav__dots",children:Array.from({length:e},(r,s)=>s).map(r=>A.jsx("i",{className:r===t?"is-on":void 0},r))}),A.jsx("span",{className:"nav__gap"})]})}function NC({survey:t,onBack:e}){return A.jsxs("header",{className:"hd",children:[A.jsxs("div",{className:"hd__bar",children:[A.jsxs("div",{className:"hd__brand",children:[A.jsx("img",{className:"hd__logo",src:"./MOMAY_logo.png",alt:"MOMAY ENLIGHTENMENT"}),A.jsx("b",{children:"STUDENT"})]}),A.jsx("button",{type:"button",className:"hd__ic","aria-label":"ค้นหาพื้นที่",children:A.jsx(Ze,{name:"search",size:18})}),A.jsx("button",{type:"button",className:"hd__av",onClick:e,title:"ดูมุมมองของคณะ",children:A.jsx(Ze,{name:"users",size:16})})]}),!t.cameFromOrganize&&A.jsx("p",{className:"hd__note",children:"กำลังใช้ข้อมูลตัวอย่าง — เปิดจากหน้า MOMAY Surprise (คณะ) เพื่อดูผลจากตัวเลขที่คุณกรอกเอง"})]})}function DC({hour:t,realHour:e,range:n,outside:i,clock:r,onChange:s,report:a}){const[o,l]=ke.useState(i),f=new Date().toLocaleDateString("th-TH",{weekday:"long",day:"numeric",month:"short"}),h=u=>String(u).padStart(2,"0")+":00";return A.jsxs("div",{className:"tbar",children:[A.jsxs("div",{className:"tbar__now",children:[A.jsx(Ze,{name:"clock",size:16}),A.jsxs("span",{children:["วันนี้ ",f," · ",A.jsxs("b",{children:[h(t)," น."]})]}),A.jsx("button",{type:"button",className:"tbar__reset",onClick:()=>l(u=>!u),children:o?"เสร็จแล้ว":"เปลี่ยนเวลา"})]}),o&&A.jsxs(A.Fragment,{children:[A.jsx("input",{className:"tbar__range",type:"range",min:n.min,max:n.max,step:1,value:t,onChange:u=>s(Number(u.target.value)),"aria-label":"เลือกเวลาที่จะดู"}),A.jsxs("div",{className:"tbar__scale",children:[A.jsx("span",{children:h(n.min)}),A.jsxs("span",{children:["ช่วงพีคของคณะ ",a.peakWindow]}),A.jsx("span",{children:h(n.max)})]}),t!==e&&A.jsx("button",{type:"button",className:"tbar__back",onClick:()=>s(e),children:"กลับมาที่เวลาตอนนี้"})]}),i&&A.jsxs("p",{className:"tbar__outside",children:["ตอนนี้ ",h(r)," น. อยู่นอกเวลาทำการของคณะ (",h(n.min),"–",h(n.max)," น.) — กำลังแสดงภาพของ ",h(e)," น. เลื่อนเพื่อดูเวลาอื่นได้"]})]})}function IC({cond:t,report:e}){const n=t.pm25<=25?"ดี":t.pm25<=50?"ปานกลาง":"แย่";return A.jsxs("div",{className:"cond",children:[A.jsxs("div",{className:"cond__row",children:[A.jsx(Xu,{icon:"crowd",label:"คนในคณะ",value:t.crowd.th,tone:t.crowd.tone}),A.jsx(Xu,{icon:"temp",label:"อุณหภูมิ",value:`${t.tempC}°C`,tone:"warm"}),A.jsx(Xu,{icon:"leaf",label:"PM2.5",value:`${t.pm25} ${n}`,tone:"ok"})]}),A.jsxs("p",{className:"cond__note",children:["ความหนาแน่นมาจากข้อมูลชุดเดียวกับหน้าคณะ (ความต้องการพื้นที่ ",e.spaceLoadPct,"% ของที่มี) · อุณหภูมิและ PM2.5 เป็นข้อมูลจำลอง ยังไม่ได้ต่อเซ็นเซอร์จริง"]})]})}function Xu({icon:t,label:e,value:n,tone:i}){return A.jsxs("div",{className:"stat",children:[A.jsx("span",{className:"stat__ic stat__ic--"+(i||"none"),children:A.jsx(Ze,{name:t,size:15})}),A.jsxs("span",{className:"stat__txt",children:[A.jsx("small",{children:e}),A.jsx("b",{children:n})]})]})}function UC({pick:t,intent:e,onOpen:n,onRoute:i}){const r=Ly(t,e);return A.jsxs("article",{className:"best",children:[A.jsxs("div",{className:"best__art art--"+t.space.tone,children:[Xn(t.space)&&A.jsx("img",{src:Xn(t.space),alt:"",loading:"lazy",decoding:"async"}),A.jsx("span",{className:"best__tag",children:"แนะนำที่สุด"}),A.jsx("button",{type:"button",className:"best__fav","aria-label":"บันทึกไว้",children:A.jsx(Ze,{name:"heart",size:15})})]}),A.jsxs("div",{className:"best__body",children:[A.jsxs("div",{className:"best__top",children:[A.jsxs("div",{children:[A.jsx("h3",{children:t.space.th}),A.jsx("p",{className:"best__where",children:bt(t.space).th})]}),A.jsxs("span",{className:"best__walk",children:[A.jsxs("b",{children:[t.walk.minutes," นาที"]}),A.jsxs("small",{children:["(",t.walk.meters," เมตร)"]})]})]}),A.jsxs("div",{className:"best__meta",children:[A.jsxs("span",{className:"chip chip--"+t.crowd.tone,children:[A.jsx(Ze,{name:"crowd",size:12}),t.crowd.th," ",Math.round(t.load*100),"%"]}),A.jsxs("span",{className:"chip",children:[A.jsx(Ze,{name:"seat",size:12}),"ว่าง ",t.free," ที่"]})]}),A.jsx("ul",{className:"reasons",children:r.map((s,a)=>A.jsxs("li",{className:s.ok?"is-ok":"is-warn",children:[A.jsx(Ze,{name:s.ok?"check":"alert",size:14}),s.th]},a))}),A.jsx("button",{type:"button",className:"btn btn--ghost",onClick:n,children:"ดูรายละเอียดก่อน"}),A.jsxs("button",{type:"button",className:"btn",onClick:i,children:["ดูเส้นทางไปที่นี่",A.jsx(Ze,{name:"next",size:16})]})]})]})}function FC({pick:t,report:e,hour:n,tab:i,onTab:r,onBack:s}){const{space:a}=t,o=e.hours.map(c=>({at:c.at,label:c.label,value:Ys(e,a,c.at)})),l=Math.max(...o.map(c=>c.value),.01);return A.jsxs("div",{className:"detail",children:[A.jsxs("div",{className:"detail__art art--"+a.tone,children:[Xn(a)&&A.jsx("img",{src:Xn(a),alt:"",decoding:"async"}),A.jsx("button",{type:"button",className:"art__ic art__ic--l",onClick:s,"aria-label":"ย้อนกลับ",children:A.jsx(Ze,{name:"back",size:15})}),A.jsx("button",{type:"button",className:"art__ic art__ic--r","aria-label":"บันทึกไว้",children:A.jsx(Ze,{name:"heart",size:15})}),A.jsx("span",{className:"detail__count",children:a.outdoor?"พื้นที่กลางแจ้ง":"พื้นที่ในอาคาร"})]}),A.jsx("h3",{children:a.th}),A.jsx("p",{className:"best__where",children:bt(a).th}),A.jsx("div",{className:"tabs",children:[["overview","ภาพรวม"],["load","ความหนาแน่น"],["amen","สิ่งอำนวยความสะดวก"]].map(([c,f])=>A.jsx("button",{type:"button",className:"tab"+(i===c?" is-on":""),onClick:()=>r(c),children:f},c))}),A.jsxs("div",{className:"panes",children:[A.jsxs("div",{className:"pane"+(i==="overview"?" is-on":""),children:[A.jsx("p",{className:"pane__lead",children:a.noteTh}),A.jsxs("div",{className:"kv",children:[A.jsxs("div",{children:[A.jsx("small",{children:"ที่นั่งทั้งหมด"}),A.jsxs("b",{children:[a.seats," ที่"]})]}),A.jsxs("div",{children:[A.jsx("small",{children:"ว่างตอนนี้"}),A.jsxs("b",{children:[t.free," ที่"]})]}),A.jsxs("div",{children:[A.jsx("small",{children:"ระดับเสียง"}),A.jsx("b",{children:a.quiet>=.8?"เงียบมาก":a.quiet>=.5?"เงียบปานกลาง":"คุยกันได้"})]}),A.jsxs("div",{children:[A.jsx("small",{children:"ระยะเดิน"}),A.jsxs("b",{children:[t.walk.minutes," นาที · ",t.walk.meters," ม."]})]})]}),A.jsx("h4",{className:"subhead",children:"เหมาะสำหรับ"}),A.jsx("div",{className:"tagrow",children:a.suitTh.map(c=>A.jsx("span",{className:"tag",children:c},c))})]}),A.jsxs("div",{className:"pane"+(i==="load"?" is-on":""),children:[A.jsx("p",{className:"pane__lead",children:"ความหนาแน่นตอนนี้"}),A.jsxs("div",{className:"nowbig nowbig--"+t.crowd.tone,children:[A.jsx("b",{children:t.crowd.th}),A.jsxs("span",{children:[Math.round(t.load*100),"%"]})]}),A.jsx("div",{className:"chart",children:o.map(c=>A.jsx("div",{className:"bar"+(c.at===n?" is-now":""),style:{"--v":Math.max(.04,c.value/l)},title:`${c.label} · ${Math.round(c.value*100)}%`,children:A.jsx("i",{})},c.at))}),A.jsx("div",{className:"chart__axis",children:o.filter((c,f)=>f%3===0).map(c=>A.jsx("span",{children:c.at},c.at))}),A.jsxs("div",{className:"legend",children:[A.jsx("span",{className:"dot dot--ok"}),"ไม่หนาแน่น",A.jsx("span",{className:"dot dot--mid"}),"ปานกลาง",A.jsx("span",{className:"dot dot--hot"}),"หนาแน่น"]})]}),A.jsx("div",{className:"pane"+(i==="amen"?" is-on":""),children:A.jsx("div",{className:"amen",children:a.amenities.map(c=>A.jsxs("div",{className:"amen__it",children:[A.jsx(Ze,{name:gm[c].icon,size:17}),A.jsx("span",{children:gm[c].th})]},c))})})]})]})}function OC({report:t,pick:e,route:n,districtTone:i,mapH:r,tilt:s,turn:a,onBack:o}){const[l,c]=ke.useState(!1),f=R_(),h=P_(132,Math.round(f*.62)),[u,p]=ke.useState(null),v=b_(u),w=h.open;return A.jsxs("div",{className:"route",children:[A.jsxs("div",{className:"route__hd",ref:p,children:[A.jsx("button",{type:"button",className:"route__ic",onClick:o,"aria-label":"ย้อนกลับ",children:A.jsx(Ze,{name:"back",size:15})}),A.jsxs("b",{children:["เส้นทางไป ",e.space.th]}),A.jsx("button",{type:"button",className:"route__ic",onClick:()=>c(!0),"aria-label":"ขยายผังเต็มจอ",children:A.jsx(Ze,{name:"grid",size:15})})]}),A.jsxs("div",{className:"mapwrap mapwrap--route",role:"button",tabIndex:0,onClick:()=>c(!0),onKeyDown:g=>(g.key==="Enter"||g.key===" ")&&c(!0),children:[A.jsx(kh,{report:t,pins:[{id:bt(e.space).id,district:bt(e.space).district,label:e.space.th,tone:"go",showLabel:!0}],activeId:bt(e.space).id,route:n,you:Js,districtTone:{...i,[bt(e.space).district]:"sel"},height:Math.max(300,r-v),tilt:s,turn:a}),A.jsxs("span",{className:"mapwrap__zoom",children:[A.jsx(Ze,{name:"search",size:13}),"แตะเพื่อขยาย"]})]}),l&&A.jsx(PC,{report:t,pick:e,route:n,districtTone:i,tilt:s,turn:a,onClose:()=>c(!1)}),A.jsxs("div",{className:"sheet"+(w?" is-open":""),style:{height:h.h},children:[A.jsxs("div",{className:"sheet__head",ref:h.ref,role:"button","aria-expanded":w,children:[A.jsx("i",{className:"sheet__grab"}),A.jsxs("span",{className:"route__sum",children:[A.jsx(Ze,{name:"walk",size:16}),A.jsxs("span",{children:[A.jsxs("b",{children:[n.total.minutes," นาที (",n.total.meters," เมตร)"]}),A.jsx("small",{children:w?"เส้นทางเดินในคณะ":`${n.legs.length} ขั้นตอน · แตะเพื่อดู`})]})]}),A.jsx(Ze,{name:"back",size:15,className:"sheet__chev"})]}),A.jsx("div",{className:"sheet__body",children:A.jsx("ol",{className:"legs",children:n.legs.map((g,d)=>A.jsxs("li",{children:[A.jsx("span",{className:"legs__th art--"+e.space.tone,children:Xn(e.space)&&A.jsx("img",{src:Xn(e.space),alt:"",loading:"lazy"})}),A.jsx("span",{className:"legs__t",children:g.th}),A.jsxs("span",{className:"legs__m",children:[g.min," นาที"]})]},d))})}),A.jsxs("button",{type:"button",className:"btn",children:["เริ่มนำทาง",A.jsx(Ze,{name:"next",size:16})]})]})]})}function BC({events:t,tips:e,report:n,hour:i,onPick:r,currentId:s}){const a=Xs.filter(o=>o.id!==s).map(o=>{const l=Ys(n,o,i);return{space:o,load:l,free:Eh(o,l),crowd:vr(l)}}).sort((o,l)=>o.load-l.load).slice(0,3);return A.jsxs("div",{className:"extra",children:[A.jsxs("h4",{className:"subhead",children:["กิจกรรมในคณะวันนี้",A.jsx("a",{href:"#events",children:"ดูทั้งหมด"})]}),A.jsx("ul",{className:"events",children:t.map((o,l)=>A.jsxs("li",{children:[A.jsx("span",{className:"events__ic",children:A.jsx(Ze,{name:"pin",size:14})}),A.jsxs("div",{children:[A.jsx("b",{children:o.th}),A.jsxs("small",{children:[o.whenTh," · ",o.whereTh]})]})]},l))}),A.jsxs("h4",{className:"subhead",children:["พื้นที่ใกล้เคียงที่คุณอาจสนใจ",A.jsx("a",{href:"#nearby",children:"ดูทั้งหมด"})]}),A.jsx("div",{className:"alts",children:a.map(o=>A.jsxs("button",{type:"button",className:"alt",onClick:()=>r(o.space.id),children:[A.jsx("span",{className:"alt__art art--"+o.space.tone,children:Xn(o.space)&&A.jsx("img",{src:Xn(o.space),alt:"",loading:"lazy"})}),A.jsxs("span",{className:"alt__txt",children:[A.jsx("b",{children:o.space.th}),A.jsx("small",{children:bt(o.space).th}),A.jsxs("span",{className:"chip chip--"+o.crowd.tone,children:[A.jsx(Ze,{name:"seat",size:12}),"ว่าง ",o.free," ที่"]})]}),A.jsx("span",{className:"alt__walk",children:A.jsx(Ze,{name:"next",size:14})})]},o.space.id))}),A.jsx("h4",{className:"subhead",children:"เคล็ดลับจาก MOMAY"}),A.jsx("ul",{className:"tips",children:e.map((o,l)=>A.jsxs("li",{className:"tip tip--"+o.tone,children:[A.jsx(Ze,{name:o.icon,size:16}),A.jsx("span",{children:o.th})]},l))})]})}function kC(t){const e=()=>window.location.hash.replace(/^#\/?/,"")||t,[n,i]=ke.useState(e),[r,s]=ke.useState(!1);return ke.useEffect(()=>{const a=()=>{const o=e();i(l=>l===o?l:(s(!0),setTimeout(()=>s(!1),170),o))};return window.addEventListener("hashchange",a),window.location.hash||window.location.replace("#/"+t),()=>window.removeEventListener("hashchange",a)},[t]),{view:n,loading:r,canBack:n!==t,go:a=>{window.location.hash="#/"+a},back:()=>window.history.back()}}function R_(){const t=()=>{var i;return typeof window>"u"?800:Math.round(((i=window.visualViewport)==null?void 0:i.height)||window.innerHeight)},[e,n]=ke.useState(t);return ke.useEffect(()=>{var s;const i=()=>n(t());window.addEventListener("resize",i),(s=window.visualViewport)==null||s.addEventListener("resize",i);const r=()=>setTimeout(i,250);return window.addEventListener("orientationchange",r),i(),()=>{var a;window.removeEventListener("resize",i),(a=window.visualViewport)==null||a.removeEventListener("resize",i),window.removeEventListener("orientationchange",r)}},[]),e}function b_(t){const[e,n]=ke.useState(0);return ke.useEffect(()=>{if(!t)return;const i=()=>n(t.clientHeight);i();const r=new ResizeObserver(i);return r.observe(t),()=>r.disconnect()},[t]),e}function P_(t,e){const[n,i]=ke.useState(t),[r,s]=ke.useState(null),a=ke.useCallback(c=>s(c),[]),o=ke.useRef(null),l=ke.useRef(t);return l.current=n,ke.useEffect(()=>i(c=>Math.min(Math.max(c,t),e)),[t,e]),ke.useEffect(()=>{const c=r;if(!c)return;const f=p=>{var v;o.current={y:p.clientY,h0:l.current,moved:0},(v=c.setPointerCapture)==null||v.call(c,p.pointerId)},h=p=>{const v=o.current;if(!v)return;const w=v.y-p.clientY;v.moved=Math.max(v.moved,Math.abs(w)),i(Math.min(e,Math.max(t,v.h0+w)))},u=p=>{var w;const v=o.current;if(o.current=null,(w=c.releasePointerCapture)==null||w.call(c,p.pointerId),!!v){if(v.moved<6){i(g=>g>(t+e)/2?t:e);return}i(g=>g>(t+e)/2?e:t)}};return c.addEventListener("pointerdown",f),c.addEventListener("pointermove",h),c.addEventListener("pointerup",u),c.addEventListener("pointercancel",u),()=>{c.removeEventListener("pointerdown",f),c.removeEventListener("pointermove",h),c.removeEventListener("pointerup",u),c.removeEventListener("pointercancel",u)}},[t,e,r]),{h:n,ref:a,open:n>(t+e)/2,dragging:!!o.current}}Yu.createRoot(document.getElementById("root")).render(A.jsx(Z_.StrictMode,{children:A.jsx(RC,{})}));
