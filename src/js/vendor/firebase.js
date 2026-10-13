var Wi={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};var f=function(n,e){if(!n)throw Oe(e)},Oe=function(n){return new Error("Firebase Database ("+Wi.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};var uo=function(n){let e=[],t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},bl=function(n){let e=[],t=0,i=0;for(;t<n.length;){let r=n[t++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){let s=n[t++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){let s=n[t++],o=n[t++],a=n[t++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{let s=n[t++],o=n[t++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},_n={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<n.length;r+=3){let s=n[r],o=r+1<n.length,a=o?n[r+1]:0,c=r+2<n.length,l=c?n[r+2]:0,h=s>>2,u=(s&3)<<4|a>>4,d=(a&15)<<2|l>>6,p=l&63;c||(p=64,o||(d=64)),i.push(t[h],t[u],t[d],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(uo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):bl(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<n.length;){let s=t[n.charAt(r++)],a=r<n.length?t[n.charAt(r)]:0;++r;let l=r<n.length?t[n.charAt(r)]:64;++r;let u=r<n.length?t[n.charAt(r)]:64;if(++r,s==null||a==null||l==null||u==null)throw new Vi;let d=s<<2|a>>4;if(i.push(d),l!==64){let p=a<<4&240|l>>2;if(i.push(p),u!==64){let _=l<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Vi=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Hi=function(n){let e=uo(n);return _n.encodeByteArray(e,!0)},wt=function(n){return Hi(n).replace(/\./g,"")},Tt=function(n){try{return _n.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function ho(n){return fo(void 0,n)}function fo(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:let t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(let t in e)!e.hasOwnProperty(t)||!Sl(t)||(n[t]=fo(n[t],e[t]));return n}function Sl(n){return n!=="__proto__"}function Al(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Rl=()=>Al().__FIREBASE_DEFAULTS__,Nl=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Pl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Tt(n[1]);return e&&JSON.parse(e)},ji=()=>{try{return Rl()||Nl()||Pl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Gi=n=>{var e,t;return(t=(e=ji())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},po=n=>{let e=Gi(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},zi=()=>{var n;return(n=ji())===null||n===void 0?void 0:n.config},qi=n=>{var e;return(e=ji())===null||e===void 0?void 0:e[`_${n}`]};var F=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}};function _o(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},i=e||"demo-project",r=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[wt(JSON.stringify(t)),wt(JSON.stringify(o)),""].join(".")}function x(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ct(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(x())}function mo(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function go(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function mn(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vo(){let n=x();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Z(){return Wi.NODE_CLIENT===!0||Wi.NODE_ADMIN===!0}function yo(){try{return typeof indexedDB=="object"}catch{return!1}}function Io(){return new Promise((n,e)=>{try{let t=!0,i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var s;e(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var kl="FirebaseError",$=class n extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=kl,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ae.prototype.create)}},ae=class{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){let i=t[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?Ol(s,i):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new $(r,a,i)}};function Ol(n,e){return n.replace(Dl,(t,i)=>{let r=e[i];return r!=null?String(r):`<${i}?>`})}var Dl=/\{\$([^}]+)}/g;function Qe(n){return JSON.parse(n)}function P(n){return JSON.stringify(n)}var Eo=function(n){let e={},t={},i={},r="";try{let s=n.split(".");e=Qe(Tt(s[0])||""),t=Qe(Tt(s[1])||""),r=s[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:r}};var wo=function(n){let e=Eo(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},To=function(n){let e=Eo(n).claims;return typeof e=="object"&&e.admin===!0};function j(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function pe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Xe(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function bt(n,e,t){let i={};for(let r in n)Object.prototype.hasOwnProperty.call(n,r)&&(i[r]=e.call(t,n[r],r,n));return i}function Ze(n,e){if(n===e)return!0;let t=Object.keys(n),i=Object.keys(e);for(let r of t){if(!i.includes(r))return!1;let s=n[r],o=e[r];if(lo(s)&&lo(o)){if(!Ze(s,o))return!1}else if(s!==o)return!1}for(let r of i)if(!t.includes(r))return!1;return!0}function lo(n){return n!==null&&typeof n=="object"}function _e(n){let e=[];for(let[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function et(n){let e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){let[r,s]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(s)}}),e}function tt(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}var pn=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);let i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){let d=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(d<<1|d>>>31)&4294967295}let r=this.chain_[0],s=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,h;for(let u=0;u<80;u++){u<40?u<20?(l=a^s&(o^a),h=1518500249):(l=s^o^a,h=1859775393):u<60?(l=s&o|a&(s|o),h=2400959708):(l=s^o^a,h=3395469782);let d=(r<<5|r>>>27)+l+c+h+i[u]&4294967295;c=a,a=o,o=(s<<30|s>>>2)&4294967295,s=r,r=d}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);let i=t-this.blockSize,r=0,s=this.buf_,o=this.inbuf_;for(;r<t;){if(o===0)for(;r<=i;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<t;)if(s[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}else for(;r<t;)if(s[o]=e[r],++o,++r,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){let e=[],t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let r=0;r<5;r++)for(let s=24;s>=0;s-=8)e[i]=this.chain_[r]>>s&255,++i;return e}};function Co(n,e){let t=new Bi(n,e);return t.subscribe.bind(t)}var Bi=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let r;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Ll(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:i},r.next===void 0&&(r.next=Ui),r.error===void 0&&(r.error=Ui),r.complete===void 0&&(r.complete=Ui);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Ll(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ui(){}function De(n,e){return`${n} failed: ${e} argument `}var bo=function(n){let e=[],t=0;for(let i=0;i<n.length;i++){let r=n.charCodeAt(i);if(r>=55296&&r<=56319){let s=r-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");let o=n.charCodeAt(i)-56320;r=65536+(s<<10)+o}r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):r<65536?(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},St=function(n){let e=0;for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};var N_=4*60*60*1e3;function L(n){return n&&n._delegate?n._delegate:n}var G=class{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Le="[DEFAULT]";var gn=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let i=new F;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:t});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let i=this.normalizeInstanceIdentifier(e?.identifier),r=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ml(e))try{this.getOrInitializeService({instanceIdentifier:Le})}catch{}for(let[t,i]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=Le){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Le){return this.instances.has(e)}getOptions(e=Le){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:i,options:t});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);i===a&&o.resolve(r)}return r}onInit(e,t){var i;let r=this.normalizeInstanceIdentifier(t),s=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;s.add(e),this.onInitCallbacks.set(r,s);let o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let i=this.onInitCallbacks.get(t);if(i)for(let r of i)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:xl(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Le){return this.component?this.component.multipleInstances?e:Le:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function xl(n){return n===Le?void 0:n}function Ml(n){return n.instantiationMode==="EAGER"}var At=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new gn(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var Fl=[],C;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(C||(C={}));var Ul={debug:C.DEBUG,verbose:C.VERBOSE,info:C.INFO,warn:C.WARN,error:C.ERROR,silent:C.SILENT},Wl=C.INFO,Vl={[C.DEBUG]:"log",[C.VERBOSE]:"log",[C.INFO]:"info",[C.WARN]:"warn",[C.ERROR]:"error"},Bl=(n,e,...t)=>{if(e<n.logLevel)return;let i=new Date().toISOString(),r=Vl[e];if(r)console[r](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},me=class{constructor(e){this.name=e,this._logLevel=Wl,this._logHandler=Bl,this._userLogHandler=null,Fl.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in C))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ul[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,C.DEBUG,...e),this._logHandler(this,C.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,C.VERBOSE,...e),this._logHandler(this,C.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,C.INFO,...e),this._logHandler(this,C.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,C.WARN,...e),this._logHandler(this,C.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,C.ERROR,...e),this._logHandler(this,C.ERROR,...e)}};var Hl=(n,e)=>e.some(t=>n instanceof t),So,Ao;function jl(){return So||(So=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Gl(){return Ao||(Ao=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Ro=new WeakMap,Ki=new WeakMap,No=new WeakMap,$i=new WeakMap,Ji=new WeakMap;function zl(n){let e=new Promise((t,i)=>{let r=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ee(n.result)),r()},o=()=>{i(n.error),r()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Ro.set(t,n)}).catch(()=>{}),Ji.set(e,n),e}function ql(n){if(Ki.has(n))return;let e=new Promise((t,i)=>{let r=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),r()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});Ki.set(n,e)}var Yi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ki.get(n);if(e==="objectStoreNames")return n.objectStoreNames||No.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ee(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Po(n){Yi=n(Yi)}function $l(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let i=n.call(vn(this),e,...t);return No.set(i,e.sort?e.sort():[e]),ee(i)}:Gl().includes(n)?function(...e){return n.apply(vn(this),e),ee(Ro.get(this))}:function(...e){return ee(n.apply(vn(this),e))}}function Kl(n){return typeof n=="function"?$l(n):(n instanceof IDBTransaction&&ql(n),Hl(n,jl())?new Proxy(n,Yi):n)}function ee(n){if(n instanceof IDBRequest)return zl(n);if($i.has(n))return $i.get(n);let e=Kl(n);return e!==n&&($i.set(n,e),Ji.set(e,n)),e}var vn=n=>Ji.get(n);function Oo(n,e,{blocked:t,upgrade:i,blocking:r,terminated:s}={}){let o=indexedDB.open(n,e),a=ee(o);return i&&o.addEventListener("upgradeneeded",c=>{i(ee(o.result),c.oldVersion,c.newVersion,ee(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Yl=["get","getKey","getAll","getAllKeys","count"],Jl=["put","add","delete","clear"],Qi=new Map;function ko(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Qi.get(e))return Qi.get(e);let t=e.replace(/FromIndex$/,""),i=e!==t,r=Jl.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Yl.includes(t)))return;let s=async function(o,...a){let c=this.transaction(o,r?"readwrite":"readonly"),l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),r&&c.done]))[0]};return Qi.set(e,s),s}Po(n=>({...n,get:(e,t,i)=>ko(e,t)||n.get(e,t,i),has:(e,t)=>!!ko(e,t)||n.has(e,t)}));var Zi=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ql(t)){let i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}};function Ql(n){let e=n.getComponent();return e?.type==="VERSION"}var er="@firebase/app",Do="0.10.13";var ce=new me("@firebase/app"),Xl="@firebase/app-compat",Zl="@firebase/analytics-compat",eu="@firebase/analytics",tu="@firebase/app-check-compat",nu="@firebase/app-check",iu="@firebase/auth",ru="@firebase/auth-compat",su="@firebase/database",ou="@firebase/data-connect",au="@firebase/database-compat",cu="@firebase/functions",lu="@firebase/functions-compat",uu="@firebase/installations",hu="@firebase/installations-compat",du="@firebase/messaging",fu="@firebase/messaging-compat",pu="@firebase/performance",_u="@firebase/performance-compat",mu="@firebase/remote-config",gu="@firebase/remote-config-compat",vu="@firebase/storage",yu="@firebase/storage-compat",Iu="@firebase/firestore",Eu="@firebase/vertexai-preview",wu="@firebase/firestore-compat",Tu="firebase",Cu="10.14.1";var tr="[DEFAULT]",bu={[er]:"fire-core",[Xl]:"fire-core-compat",[eu]:"fire-analytics",[Zl]:"fire-analytics-compat",[nu]:"fire-app-check",[tu]:"fire-app-check-compat",[iu]:"fire-auth",[ru]:"fire-auth-compat",[su]:"fire-rtdb",[ou]:"fire-data-connect",[au]:"fire-rtdb-compat",[cu]:"fire-fn",[lu]:"fire-fn-compat",[uu]:"fire-iid",[hu]:"fire-iid-compat",[du]:"fire-fcm",[fu]:"fire-fcm-compat",[pu]:"fire-perf",[_u]:"fire-perf-compat",[mu]:"fire-rc",[gu]:"fire-rc-compat",[vu]:"fire-gcs",[yu]:"fire-gcs-compat",[Iu]:"fire-fst",[wu]:"fire-fst-compat",[Eu]:"fire-vertex","fire-js":"fire-js",[Tu]:"fire-js-all"};var yn=new Map,Su=new Map,nr=new Map;function Lo(n,e){try{n.container.addComponent(e)}catch(t){ce.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ve(n){let e=n.name;if(nr.has(e))return ce.debug(`There were multiple attempts to register component ${e}.`),!1;nr.set(e,n);for(let t of yn.values())Lo(t,n);for(let t of Su.values())Lo(t,n);return!0}function Nt(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function te(n){return n.settings!==void 0}var Au={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ge=new ae("app","Firebase",Au);var ir=class{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new G("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ge.create("app-deleted",{appName:this._name})}};var ye=Cu;function Uo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let i=Object.assign({name:tr,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw ge.create("bad-app-name",{appName:String(r)});if(t||(t=zi()),!t)throw ge.create("no-options");let s=yn.get(r);if(s){if(Ze(t,s.options)&&Ze(i,s.config))return s;throw ge.create("duplicate-app",{appName:r})}let o=new At(r);for(let c of nr.values())o.addComponent(c);let a=new ir(t,i,o);return yn.set(r,a),a}function In(n=tr){let e=yn.get(n);if(!e&&n===tr&&zi())return Uo();if(!e)throw ge.create("no-app",{appName:n});return e}function K(n,e,t){var i;let r=(i=bu[n])!==null&&i!==void 0?i:n;t&&(r+=`-${t}`);let s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ce.warn(a.join(" "));return}ve(new G(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var Ru="firebase-heartbeat-database",Nu=1,Rt="firebase-heartbeat-store",Xi=null;function Wo(){return Xi||(Xi=Oo(Ru,Nu,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Rt)}catch(t){console.warn(t)}}}}).catch(n=>{throw ge.create("idb-open",{originalErrorMessage:n.message})})),Xi}async function Pu(n){try{let t=(await Wo()).transaction(Rt),i=await t.objectStore(Rt).get(Vo(n));return await t.done,i}catch(e){if(e instanceof $)ce.warn(e.message);else{let t=ge.create("idb-get",{originalErrorMessage:e?.message});ce.warn(t.message)}}}async function xo(n,e){try{let i=(await Wo()).transaction(Rt,"readwrite");await i.objectStore(Rt).put(e,Vo(n)),await i.done}catch(t){if(t instanceof $)ce.warn(t.message);else{let i=ge.create("idb-set",{originalErrorMessage:t?.message});ce.warn(i.message)}}}function Vo(n){return`${n.name}!${n.options.appId}`}var ku=1024,Ou=30*24*60*60*1e3,rr=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new sr(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Mo();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let a=new Date(o.date).valueOf();return Date.now()-a<=Ou}),this._storage.overwrite(this._heartbeatsCache))}catch(i){ce.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Mo(),{heartbeatsToSend:i,unsentEntries:r}=Du(this._heartbeatsCache.heartbeats),s=wt(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return ce.warn(t),""}}};function Mo(){return new Date().toISOString().substring(0,10)}function Du(n,e=ku){let t=[],i=n.slice();for(let r of n){let s=t.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),Fo(t)>e){s.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),Fo(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}var sr=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yo()?Io().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await Pu(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let r=await this.read();return xo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let r=await this.read();return xo(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function Fo(n){return wt(JSON.stringify({version:2,heartbeats:n})).length}function Lu(n){ve(new G("platform-logger",e=>new Zi(e),"PRIVATE")),ve(new G("heartbeat",e=>new rr(e),"PRIVATE")),K(er,Do,n),K(er,Do,"esm2017"),K("fire-js","")}Lu("");var xu="firebase",Mu="10.14.1";K(xu,Mu,"app");function En(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,i=Object.getOwnPropertySymbols(n);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(n,i[r])&&(t[i[r]]=n[i[r]]);return t}function ra(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var sa=ra,oa=new ae("auth","Firebase",ra());var An=new me("@firebase/auth");function Fu(n,...e){An.logLevel<=C.WARN&&An.warn(`Auth (${ye}): ${n}`,...e)}function Tn(n,...e){An.logLevel<=C.ERROR&&An.error(`Auth (${ye}): ${n}`,...e)}function Y(n,...e){throw Sr(n,...e)}function ie(n,...e){return Sr(n,...e)}function aa(n,e,t){let i=Object.assign(Object.assign({},sa()),{[e]:t});return new ae("auth","Firebase",i).create(e,{appName:n.name})}function Ee(n){return aa(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Sr(n,...e){if(typeof n!="string"){let t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return oa.create(n,...e)}function m(n,e,...t){if(!n)throw Sr(e,...t)}function ne(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Tn(e),new Error(e)}function ue(n,e){n||ne(e)}function cr(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Uu(){return Bo()==="http:"||Bo()==="https:"}function Bo(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Wu(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Uu()||go()||"connection"in navigator)?navigator.onLine:!0}function Vu(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var xe=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,ue(t>e,"Short delay should be less than long delay!"),this.isMobile=Ct()||mn()}get(){return Wu()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Ar(n,e){ue(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Rn=class{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ne("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ne("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ne("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Bu={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Hu=new xe(3e4,6e4);function k(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function M(n,e,t,i,r={}){return ca(n,r,async()=>{let s={},o={};i&&(e==="GET"?o=i:s={body:JSON.stringify(i)});let a=_e(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);let l=Object.assign({method:e,headers:c},s);return mo()||(l.referrerPolicy="no-referrer"),Rn.fetch()(la(n,n.config.apiHost,t,a),l)})}async function ca(n,e,t){n._canInitEmulator=!1;let i=Object.assign(Object.assign({},Bu),e);try{let r=new lr(n),s=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Pt(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pt(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Pt(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Pt(n,"user-disabled",o);let h=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw aa(n,h,l);Y(n,h)}}catch(r){if(r instanceof $)throw r;Y(n,"network-request-failed",{message:String(r)})}}async function we(n,e,t,i,r={}){let s=await M(n,e,t,i,r);return"mfaPendingCredential"in s&&Y(n,"multi-factor-auth-required",{_serverResponse:s}),s}function la(n,e,t,i){let r=`${e}${t}?${i}`;return n.config.emulator?Ar(n.config,r):`${n.config.apiScheme}://${r}`}function ju(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var lr=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ie(this.auth,"network-request-failed")),Hu.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Pt(n,e,t){let i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);let r=ie(n,e,i);return r.customData._tokenResponse=t,r}function Ho(n){return n!==void 0&&n.enterprise!==void 0}var ur=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ju(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function Gu(n,e){return M(n,"GET","/v2/recaptchaConfig",k(n,e))}async function zu(n,e){return M(n,"POST","/v1/accounts:delete",e)}async function ua(n,e){return M(n,"POST","/v1/accounts:lookup",e)}function kt(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ha(n,e=!1){let t=L(n),i=await t.getIdToken(e),r=Rr(i);m(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");let s=typeof r.firebase=="object"?r.firebase:void 0,o=s?.sign_in_provider;return{claims:r,token:i,authTime:kt(or(r.auth_time)),issuedAtTime:kt(or(r.iat)),expirationTime:kt(or(r.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function or(n){return Number(n)*1e3}function Rr(n){let[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Tn("JWT malformed, contained fewer than 3 sections"),null;try{let r=Tt(t);return r?JSON.parse(r):(Tn("Failed to decode base64 JWT payload"),null)}catch(r){return Tn("Caught error parsing JWT payload as JSON",r?.toString()),null}}function jo(n){let e=Rr(n);return m(e,"internal-error"),m(typeof e.exp<"u","internal-error"),m(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function Dt(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof $&&qu(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function qu({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var hr=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;let r=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Lt=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=kt(this.lastLoginAt),this.creationTime=kt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Nn(n){var e;let t=n.auth,i=await n.getIdToken(),r=await Dt(n,ua(t,{idToken:i}));m(r?.users.length,t,"internal-error");let s=r.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?fa(s.providerUserInfo):[],a=$u(n.providerData,o),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!a?.length,h=c?l:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Lt(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,u)}async function da(n){let e=L(n);await Nn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $u(n,e){return[...n.filter(i=>!e.some(r=>r.providerId===i.providerId)),...e]}function fa(n){return n.map(e=>{var{providerId:t}=e,i=En(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}async function Ku(n,e){let t=await ca(n,{},async()=>{let i=_e({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:s}=n.config,o=la(n,r,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Rn.fetch()(o,{method:"POST",headers:a,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Yu(n,e){return M(n,"POST","/v2/accounts:revokeToken",k(n,e))}var Ot=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){m(e.idToken,"internal-error"),m(typeof e.idToken<"u","internal-error"),m(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):jo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){m(e.length!==0,"internal-error");let t=jo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(m(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:i,refreshToken:r,expiresIn:s}=await Ku(e,t);this.updateTokensAndExpiration(i,r,Number(s))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){let{refreshToken:i,accessToken:r,expirationTime:s}=t,o=new n;return i&&(m(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),r&&(m(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),s&&(m(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return ne("not implemented")}};function Ie(n,e){m(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var it=class n{constructor(e){var{uid:t,auth:i,stsTokenManager:r}=e,s=En(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new hr(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Lt(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Dt(this,this.stsTokenManager.getToken(this.auth,e));return m(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ha(this,e)}reload(){return da(this)}_assign(e){this!==e&&(m(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){m(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Nn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(te(this.auth.app))return Promise.reject(Ee(this.auth));let e=await this.getIdToken();return await Dt(this,zu(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,r,s,o,a,c,l,h;let u=(i=t.displayName)!==null&&i!==void 0?i:void 0,d=(r=t.email)!==null&&r!==void 0?r:void 0,p=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,_=(o=t.photoURL)!==null&&o!==void 0?o:void 0,E=(a=t.tenantId)!==null&&a!==void 0?a:void 0,N=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,oe=(l=t.createdAt)!==null&&l!==void 0?l:void 0,Pe=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:ke,emailVerified:fn,isAnonymous:ao,providerData:Mi,stsTokenManager:co}=t;m(ke&&co,e,"internal-error");let Tl=Ot.fromJSON(this.name,co);m(typeof ke=="string",e,"internal-error"),Ie(u,e.name),Ie(d,e.name),m(typeof fn=="boolean",e,"internal-error"),m(typeof ao=="boolean",e,"internal-error"),Ie(p,e.name),Ie(_,e.name),Ie(E,e.name),Ie(N,e.name),Ie(oe,e.name),Ie(Pe,e.name);let Fi=new n({uid:ke,auth:e,email:d,emailVerified:fn,displayName:u,isAnonymous:ao,photoURL:_,phoneNumber:p,tenantId:E,stsTokenManager:Tl,createdAt:oe,lastLoginAt:Pe});return Mi&&Array.isArray(Mi)&&(Fi.providerData=Mi.map(Cl=>Object.assign({},Cl))),N&&(Fi._redirectEventId=N),Fi}static async _fromIdTokenResponse(e,t,i=!1){let r=new Ot;r.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await Nn(s),s}static async _fromGetAccountInfoResponse(e,t,i){let r=t.users[0];m(r.localId!==void 0,"internal-error");let s=r.providerUserInfo!==void 0?fa(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!s?.length,a=new Ot;a.updateFromIdToken(i);let c=new n({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:s,metadata:new Lt(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!s?.length};return Object.assign(c,l),c}};var Go=new Map;function le(n){ue(n instanceof Function,"Expected a class definition");let e=Go.get(n);return e?(ue(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Go.set(n,e),e)}var Pn=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Pn.type="NONE";var dr=Pn;function Cn(n,e,t){return`firebase:${n}:${e}:${t}`}var kn=class n{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;let{config:r,name:s}=this.auth;this.fullUserKey=Cn(this.userKey,r.apiKey,s),this.fullPersistenceKey=Cn("persistence",r.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?it._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new n(le(dr),e,i);let r=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l),s=r[0]||le(dr),o=Cn(i,e.config.apiKey,e.name),a=null;for(let l of t)try{let h=await l._get(o);if(h){let u=it._fromJSON(e,h);l!==s&&(a=u),s=l;break}}catch{}let c=r.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new n(s,e,i):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new n(s,e,i))}};function zo(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ga(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(pa(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ya(e))return"Blackberry";if(Ia(e))return"Webos";if(_a(e))return"Safari";if((e.includes("chrome/")||ma(e))&&!e.includes("edge/"))return"Chrome";if(va(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function pa(n=x()){return/firefox\//i.test(n)}function _a(n=x()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ma(n=x()){return/crios\//i.test(n)}function ga(n=x()){return/iemobile/i.test(n)}function va(n=x()){return/android/i.test(n)}function ya(n=x()){return/blackberry/i.test(n)}function Ia(n=x()){return/webos/i.test(n)}function Nr(n=x()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Ju(n=x()){var e;return Nr(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Qu(){return vo()&&document.documentMode===10}function Ea(n=x()){return Nr(n)||va(n)||Ia(n)||ya(n)||/windows phone/i.test(n)||ga(n)}function wa(n,e=[]){let t;switch(n){case"Browser":t=zo(x());break;case"Worker":t=`${zo(x())}-${n}`;break;default:t=n}let i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ye}/${i}`}var fr=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let i=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(let r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}};async function Xu(n,e={}){return M(n,"GET","/v2/passwordPolicy",k(n,e))}var Zu=6,pr=class{constructor(e){var t,i,r,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Zu,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(r=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&r!==void 0?r:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,r,s,o,a;let c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(i=c.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(r=c.containsLowercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(a=c.containsNonAlphanumericCharacter)!==null&&a!==void 0?a:!0),c}validatePasswordLengthOptions(e,t){let i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,r,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var _r=class{constructor(e,t,i,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new On(this),this.idTokenSubscription=new On(this),this.beforeStateQueue=new fr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=oa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=le(t)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await kn.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ua(this,{idToken:e}),i=await it._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(te(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}let i=await this.assertedPersistence.getCurrentUser(),r=i,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,a=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return m(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Nn(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vu()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(te(this.app))return Promise.reject(Ee(this));let t=e?L(e):null;return t&&m(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&m(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return te(this.app)?Promise.reject(Ee(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return te(this.app)?Promise.reject(Ee(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(le(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Xu(this),t=new pr(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ae("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Yu(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&le(e)||this._popupRedirectResolver;m(t,this,"argument-error"),this.redirectPersistenceManager=await kn.create(this,[le(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,r){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(m(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let c=e.addObserver(t,i,r);return()=>{o=!0,c()}}else{let c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return m(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=wa(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);let r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Fu(`Error while retrieving App Check token: ${t.error}`),t?.token}};function st(n){return L(n)}var On=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Co(t=>this.observer=t)}get next(){return m(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Yn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eh(n){Yn=n}function Ta(n){return Yn.loadJS(n)}function th(){return Yn.recaptchaEnterpriseScript}function nh(){return Yn.gapiScript}function Ca(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var ih="recaptcha-enterprise",rh="NO_RECAPTCHA",mr=class{constructor(e){this.type=ih,this.auth=st(e)}async verify(e="verify",t=!1){async function i(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{Gu(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let l=new ur(c);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function r(s,o,a){let c=window.grecaptcha;Ho(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(rh)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{i(this.auth).then(a=>{if(!t&&Ho(window.grecaptcha))r(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=th();c.length!==0&&(c+=a),Ta(c).then(()=>{r(a,s,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}};async function qo(n,e,t,i=!1){let r=new mr(n),s;try{s=await r.verify(t)}catch{s=await r.verify(t,!0)}let o=Object.assign({},e);return i?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function $o(n,e,t,i){var r;if(!((r=n._getRecaptchaConfig())===null||r===void 0)&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await qo(n,e,t,t==="getOobCode");return i(n,s)}else return i(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await qo(n,e,t,t==="getOobCode");return i(n,o)}else return Promise.reject(s)})}function ba(n,e){let t=Nt(n,"auth");if(t.isInitialized()){let r=t.getImmediate(),s=t.getOptions();if(Ze(s,e??{}))return r;Y(r,"already-initialized")}return t.initialize({options:e})}function sh(n,e){let t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(le);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Sa(n,e,t){let i=st(n);m(i._canInitEmulator,i,"emulator-config-failed"),m(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");let r=!!t?.disableWarnings,s=Aa(e),{host:o,port:a}=oh(e),c=a===null?"":`:${a}`;i.config.emulator={url:`${s}//${o}${c}/`},i.settings.appVerificationDisabledForTesting=!0,i.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})}),r||ah()}function Aa(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function oh(n){let e=Aa(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let i=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){let s=r[1];return{host:s,port:Ko(i.substr(s.length+1))}}else{let[s,o]=i.split(":");return{host:s,port:Ko(o)}}}function Ko(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function ah(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Me=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ne("not implemented")}_getIdTokenResponse(e){return ne("not implemented")}_linkToIdToken(e,t){return ne("not implemented")}_getReauthenticationResolver(e){return ne("not implemented")}};async function ch(n,e){return M(n,"POST","/v1/accounts:signUp",e)}async function lh(n,e){return we(n,"POST","/v1/accounts:signInWithPassword",k(n,e))}async function uh(n,e){return we(n,"POST","/v1/accounts:signInWithEmailLink",k(n,e))}async function hh(n,e){return we(n,"POST","/v1/accounts:signInWithEmailLink",k(n,e))}var xt=class n extends Me{constructor(e,t,i,r=null){super("password",i),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new n(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return $o(e,t,"signInWithPassword",lh);case"emailLink":return uh(e,{email:this._email,oobCode:this._password});default:Y(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return $o(e,i,"signUpPassword",ch);case"emailLink":return hh(e,{idToken:t,email:this._email,oobCode:this._password});default:Y(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function nt(n,e){return we(n,"POST","/v1/accounts:signInWithIdp",k(n,e))}var dh="http://localhost",Fe=class n extends Me{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Y("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:r}=t,s=En(t,["providerId","signInMethod"]);if(!i||!r)return null;let o=new n(i,r);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return nt(e,t)}_linkToIdToken(e,t){let i=this.buildRequest();return i.idToken=t,nt(e,i)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,nt(e,t)}buildRequest(){let e={requestUri:dh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=_e(t)}return e}};async function fh(n,e){return M(n,"POST","/v1/accounts:sendVerificationCode",k(n,e))}async function ph(n,e){return we(n,"POST","/v1/accounts:signInWithPhoneNumber",k(n,e))}async function _h(n,e){let t=await we(n,"POST","/v1/accounts:signInWithPhoneNumber",k(n,e));if(t.temporaryProof)throw Pt(n,"account-exists-with-different-credential",t);return t}var mh={USER_NOT_FOUND:"user-not-found"};async function gh(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return we(n,"POST","/v1/accounts:signInWithPhoneNumber",k(n,t),mh)}var Mt=class n extends Me{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return ph(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return _h(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return gh(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:i,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:i,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:i,phoneNumber:r,temporaryProof:s}=e;return!i&&!t&&!r&&!s?null:new n({verificationId:t,verificationCode:i,phoneNumber:r,temporaryProof:s})}};function vh(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function yh(n){let e=et(tt(n)).link,t=e?et(tt(e)).deep_link_id:null,i=et(tt(n)).deep_link_id;return(i?et(tt(i)).link:null)||i||t||e||n}var Dn=class n{constructor(e){var t,i,r,s,o,a;let c=et(tt(e)),l=(t=c.apiKey)!==null&&t!==void 0?t:null,h=(i=c.oobCode)!==null&&i!==void 0?i:null,u=vh((r=c.mode)!==null&&r!==void 0?r:null);m(l&&h&&u,"argument-error"),this.apiKey=l,this.operation=u,this.code=h,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=c.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=c.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){let t=yh(e);try{return new n(t)}catch{return null}}};var rt=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return xt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let i=Dn.parseLink(t);return m(i,"argument-error"),xt._fromEmailAndCode(e,i.code,i.tenantId)}};rt.PROVIDER_ID="password";rt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";rt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Ln=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Ue=class extends Ln{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Ft=class n extends Ue{constructor(){super("facebook.com")}static credential(e){return Fe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Ft.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ft.PROVIDER_ID="facebook.com";var Ut=class n extends Ue{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Fe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return n.credential(t,i)}catch{return null}}};Ut.GOOGLE_SIGN_IN_METHOD="google.com";Ut.PROVIDER_ID="google.com";var Wt=class n extends Ue{constructor(){super("github.com")}static credential(e){return Fe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Wt.GITHUB_SIGN_IN_METHOD="github.com";Wt.PROVIDER_ID="github.com";var Vt=class n extends Ue{constructor(){super("twitter.com")}static credential(e,t){return Fe._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return n.credential(t,i)}catch{return null}}};Vt.TWITTER_SIGN_IN_METHOD="twitter.com";Vt.PROVIDER_ID="twitter.com";async function Ih(n,e){return we(n,"POST","/v1/accounts:signUp",k(n,e))}var We=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,r=!1){let s=await it._fromIdTokenResponse(e,i,r),o=Yo(i);return new n({user:s,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);let r=Yo(i);return new n({user:e,providerId:r,_tokenResponse:i,operationType:t})}};function Yo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}async function Ra(n){var e;if(te(n.app))return Promise.reject(Ee(n));let t=st(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new We({user:t.currentUser,providerId:null,operationType:"signIn"});let i=await Ih(t,{returnSecureToken:!0}),r=await We._fromIdTokenResponse(t,"signIn",i,!0);return await t._updateCurrentUser(r.user),r}var gr=class n extends ${constructor(e,t,i,r){var s;super(t.code,t.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,r){return new n(e,t,i,r)}};function Na(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?gr._fromErrorAndOperation(n,s,e,i):s})}async function Eh(n,e,t=!1){let i=await Dt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return We._forOperation(n,"link",i)}async function wh(n,e,t=!1){let{auth:i}=n;if(te(i.app))return Promise.reject(Ee(i));let r="reauthenticate";try{let s=await Dt(n,Na(i,r,e,n),t);m(s.idToken,i,"internal-error");let o=Rr(s.idToken);m(o,i,"internal-error");let{sub:a}=o;return m(n.uid===a,i,"user-mismatch"),We._forOperation(n,r,s)}catch(s){throw s?.code==="auth/user-not-found"&&Y(i,"user-mismatch"),s}}async function Th(n,e,t=!1){if(te(n.app))return Promise.reject(Ee(n));let i="signIn",r=await Na(n,i,e),s=await We._fromIdTokenResponse(n,i,r);return t||await n._updateCurrentUser(s.user),s}function Pa(n,e,t,i){return L(n).onIdTokenChanged(e,t,i)}function ka(n,e,t){return L(n).beforeAuthStateChanged(e,t)}function Ch(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:start",k(n,e))}function bh(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:finalize",k(n,e))}function Sh(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:start",k(n,e))}function Ah(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:finalize",k(n,e))}var xn="__sak";var Mn=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(xn,"1"),this.storage.removeItem(xn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Rh=1e3,Nh=10,Fn=class extends Mn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ea(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let i=this.storage.getItem(t),r=this.localCache[t];i!==r&&e(t,r,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let i=e.key;t?this.detachListener():this.stopPolling();let r=()=>{let o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},s=this.storage.getItem(i);Qu()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,Nh):r()}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let r of Array.from(i))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Rh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Fn.type="LOCAL";var Oa=Fn;var Un=class extends Mn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Un.type="SESSION";var Pr=Un;function Ph(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Wn=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;let i=new n(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:i,eventType:r,data:s}=t.data,o=this.handlersMap[r];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:r});let a=Array.from(o).map(async l=>l(t.origin,s)),c=await Ph(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:r,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Wn.receivers=[];function kr(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}var vr=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){let r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let l=kr("",20);r.port1.start();let h=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:r,onMessage(u){let d=u;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(h),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(d.data.response);break;default:clearTimeout(h),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function re(){return window}function kh(n){re().location.href=n}function Da(){return typeof re().WorkerGlobalScope<"u"&&typeof re().importScripts=="function"}async function Oh(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Dh(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Lh(){return Da()?self:null}var La="firebaseLocalStorageDb",xh=1,Vn="firebaseLocalStorage",xa="fbase_key",Ve=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Jn(n,e){return n.transaction([Vn],e?"readwrite":"readonly").objectStore(Vn)}function Mh(){let n=indexedDB.deleteDatabase(La);return new Ve(n).toPromise()}function yr(){let n=indexedDB.open(La,xh);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let i=n.result;try{i.createObjectStore(Vn,{keyPath:xa})}catch(r){t(r)}}),n.addEventListener("success",async()=>{let i=n.result;i.objectStoreNames.contains(Vn)?e(i):(i.close(),await Mh(),e(await yr()))})})}async function Jo(n,e,t){let i=Jn(n,!0).put({[xa]:e,value:t});return new Ve(i).toPromise()}async function Fh(n,e){let t=Jn(n,!1).get(e),i=await new Ve(t).toPromise();return i===void 0?null:i.value}function Qo(n,e){let t=Jn(n,!0).delete(e);return new Ve(t).toPromise()}var Uh=800,Wh=3,Bn=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await yr(),this.db)}async _withRetries(e){let t=0;for(;;)try{let i=await this._openDb();return await e(i)}catch(i){if(t++>Wh)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Da()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Wn._getInstance(Lh()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Oh(),!this.activeServiceWorker)return;this.sender=new vr(this.activeServiceWorker);let i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Dh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await yr();return await Jo(e,xn,"1"),await Qo(e,xn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Jo(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(i=>Fh(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Qo(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(r=>{let s=Jn(r,!1).getAll();return new Ve(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],i=new Set;if(e.length!==0)for(let{fbase_key:r,value:s}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(s)&&(this.notifyListeners(r,s),t.push(r));for(let r of Object.keys(this.localCache))this.localCache[r]&&!i.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let r of Array.from(i))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Uh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Bn.type="LOCAL";var Ma=Bn;function Vh(n,e){return M(n,"POST","/v2/accounts/mfaSignIn:start",k(n,e))}function Bh(n,e){return M(n,"POST","/v2/accounts/mfaSignIn:finalize",k(n,e))}function Hh(n,e){return M(n,"POST","/v2/accounts/mfaSignIn:finalize",k(n,e))}var im=Ca("rcb"),rm=new xe(3e4,6e4);var jh="recaptcha";async function Gh(n,e,t){var i;let r=await t.verify();try{m(typeof r=="string",n,"argument-error"),m(t.type===jh,n,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return m(o.type==="enroll",n,"internal-error"),(await Ch(n,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:r}})).phoneSessionInfo.sessionInfo;{m(o.type==="signin",n,"internal-error");let a=((i=s.multiFactorHint)===null||i===void 0?void 0:i.uid)||s.multiFactorUid;return m(a,n,"missing-multi-factor-info"),(await Vh(n,{mfaPendingCredential:o.credential,mfaEnrollmentId:a,phoneSignInInfo:{recaptchaToken:r}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await fh(n,{phoneNumber:s.phoneNumber,recaptchaToken:r});return o}}finally{t._reset()}}var Bt=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=st(e)}verifyPhoneNumber(e,t){return Gh(this.auth,e,L(t))}static credential(e,t){return Mt._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:i}=e;return t&&i?Mt._fromTokenResponse(t,i):null}};Bt.PROVIDER_ID="phone";Bt.PHONE_SIGN_IN_METHOD="phone";function zh(n,e){return e?le(e):(m(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Ht=class extends Me{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return nt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return nt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return nt(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function qh(n){return Th(n.auth,new Ht(n),n.bypassAuthState)}function $h(n){let{auth:e,user:t}=n;return m(t,e,"internal-error"),wh(t,new Ht(n),n.bypassAuthState)}async function Kh(n){let{auth:e,user:t}=n;return m(t,e,"internal-error"),Eh(t,new Ht(n),n.bypassAuthState)}var Hn=class{constructor(e,t,i,r,s=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:i,postBody:r,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:i,tenantId:s||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return qh;case"linkViaPopup":case"linkViaRedirect":return Kh;case"reauthViaPopup":case"reauthViaRedirect":return $h;default:Y(this.auth,"internal-error")}}resolve(e){ue(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ue(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var Yh=new xe(2e3,1e4);var Ir=class n extends Hn{constructor(e,t,i,r,s){super(e,t,r,s),this.provider=i,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return m(e,this.auth,"internal-error"),e}async onExecution(){ue(this.filter.length===1,"Popup operations only handle one event");let e=kr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ie(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Yh.get())};e()}};Ir.currentPopupAction=null;var Jh="pendingRedirect",bn=new Map,Er=class extends Hn{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=bn.get(this.auth._key());if(!e){try{let i=await Qh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}bn.set(this.auth._key(),e)}return this.bypassAuthState||bn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Qh(n,e){let t=ed(e),i=Zh(n);if(!await i._isAvailable())return!1;let r=await i._get(t)==="true";return await i._remove(t),r}function Xh(n,e){bn.set(n._key(),e)}function Zh(n){return le(n._redirectPersistence)}function ed(n){return Cn(Jh,n.config.apiKey,n.name)}async function td(n,e,t=!1){if(te(n.app))return Promise.reject(Ee(n));let i=st(n),r=zh(i,e),o=await new Er(i,r,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}var nd=10*60*1e3,wr=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!id(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Fa(e)){let r=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(ie(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=nd&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xo(e))}saveEventToCache(e){this.cachedEventUids.add(Xo(e)),this.lastProcessedEventTime=Date.now()}};function Xo(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Fa({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function id(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Fa(n);default:return!1}}async function rd(n,e={}){return M(n,"GET","/v1/projects",e)}var sd=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,od=/^https?/;async function ad(n){if(n.config.emulator)return;let{authorizedDomains:e}=await rd(n);for(let t of e)try{if(cd(t))return}catch{}Y(n,"unauthorized-domain")}function cd(n){let e=cr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!od.test(t))return!1;if(sd.test(n))return i===n;let r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(i)}var ld=new xe(3e4,6e4);function Zo(){let n=re().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ud(n){return new Promise((e,t)=>{var i,r,s;function o(){Zo(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Zo(),t(ie(n,"network-request-failed"))},timeout:ld.get()})}if(!((r=(i=re().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((s=re().gapi)===null||s===void 0)&&s.load)o();else{let a=Ca("iframefcb");return re()[a]=()=>{gapi.load?o():t(ie(n,"network-request-failed"))},Ta(`${nh()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw Sn=null,e})}var Sn=null;function hd(n){return Sn=Sn||ud(n),Sn}var dd=new xe(5e3,15e3),fd="__/auth/iframe",pd="emulator/auth/iframe",_d={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},md=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function gd(n){let e=n.config;m(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Ar(e,pd):`https://${n.config.authDomain}/${fd}`,i={apiKey:e.apiKey,appName:n.name,v:ye},r=md.get(n.config.apiHost);r&&(i.eid=r);let s=n._getFrameworks();return s.length&&(i.fw=s.join(",")),`${t}?${_e(i).slice(1)}`}async function vd(n){let e=await hd(n),t=re().gapi;return m(t,n,"internal-error"),e.open({where:document.body,url:gd(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:_d,dontclear:!0},i=>new Promise(async(r,s)=>{await i.restyle({setHideOnLeave:!1});let o=ie(n,"network-request-failed"),a=re().setTimeout(()=>{s(o)},dd.get());function c(){re().clearTimeout(a),r(i)}i.ping(c).then(c,()=>{s(o)})}))}var yd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Id=500,Ed=600,wd="_blank",Td="http://localhost",jn=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Cd(n,e,t,i=Id,r=Ed){let s=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString(),a="",c=Object.assign(Object.assign({},yd),{width:i.toString(),height:r.toString(),top:s,left:o}),l=x().toLowerCase();t&&(a=ma(l)?wd:t),pa(l)&&(e=e||Td,c.scrollbars="yes");let h=Object.entries(c).reduce((d,[p,_])=>`${d}${p}=${_},`,"");if(Ju(l)&&a!=="_self")return bd(e||"",a),new jn(null);let u=window.open(e||"",a,h);m(u,n,"popup-blocked");try{u.focus()}catch{}return new jn(u)}function bd(n,e){let t=document.createElement("a");t.href=n,t.target=e;let i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}var Sd="__/auth/handler",Ad="emulator/auth/handler",Rd=encodeURIComponent("fac");async function ea(n,e,t,i,r,s){m(n.config.authDomain,n,"auth-domain-config-required"),m(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:ye,eventId:r};if(e instanceof Ln){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Xe(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[h,u]of Object.entries(s||{}))o[h]=u}if(e instanceof Ue){let h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let h of Object.keys(a))a[h]===void 0&&delete a[h];let c=await n._getAppCheckToken(),l=c?`#${Rd}=${encodeURIComponent(c)}`:"";return`${Nd(n)}?${_e(a).slice(1)}${l}`}function Nd({config:n}){return n.emulator?Ar(n,Ad):`https://${n.authDomain}/${Sd}`}var ar="webStorageSupport",Tr=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Pr,this._completeRedirectFn=td,this._overrideRedirectResult=Xh}async _openPopup(e,t,i,r){var s;ue((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await ea(e,t,i,cr(),r);return Cd(e,o,kr())}async _openRedirect(e,t,i,r){await this._originValidation(e);let s=await ea(e,t,i,cr(),r);return kh(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:r,promise:s}=this.eventManagers[t];return r?Promise.resolve(r):(ue(s,"If manager is not set, promise should be"),s)}let i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){let t=await vd(e),i=new wr(e);return t.register("authEvent",r=>(m(r?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ar,{type:ar},r=>{var s;let o=(s=r?.[0])===null||s===void 0?void 0:s[ar];o!==void 0&&t(!!o),Y(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ad(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ea()||_a()||Nr()}},Ua=Tr,Gn=class{constructor(e){this.factorId=e}_process(e,t,i){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,i);case"signin":return this._finalizeSignIn(e,t.credential);default:return ne("unexpected MultiFactorSessionType")}}},Cr=class n extends Gn{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,i){return bh(e,{idToken:t,displayName:i,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Bh(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},zn=class{constructor(){}static assertion(e){return Cr._fromCredential(e)}};zn.FACTOR_ID="phone";var qn=class{static assertionForEnrollment(e,t){return $n._fromSecret(e,t)}static assertionForSignIn(e,t){return $n._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let i=e;m(typeof((t=i.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let r=await Sh(i.user.auth,{idToken:i.credential,totpEnrollmentInfo:{}});return Kn._fromStartTotpMfaEnrollmentResponse(r,i.user.auth)}};qn.FACTOR_ID="totp";var $n=class n extends Gn{constructor(e,t,i){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=i}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,i){return m(typeof this.secret<"u",e,"argument-error"),Ah(e,{idToken:t,displayName:i,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){m(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let i={verificationCode:this.otp};return Hh(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:i})}},Kn=class n{constructor(e,t,i,r,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=i,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var i;let r=!1;return(wn(e)||wn(t))&&(r=!0),r&&(wn(e)&&(e=((i=this.auth.currentUser)===null||i===void 0?void 0:i.email)||"unknownuser"),wn(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function wn(n){return typeof n>"u"||n?.length===0}var ta="@firebase/auth",na="1.7.9";var br=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){m(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Pd(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kd(n){ve(new G("auth",(e,{options:t})=>{let i=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;m(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});let c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:wa(n)},l=new _r(i,r,s,c);return sh(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),ve(new G("auth-internal",e=>{let t=st(e.getProvider("auth").getImmediate());return(i=>new br(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),K(ta,na,Pd(n)),K(ta,na,"esm2017")}var Od=5*60,Dd=qi("authIdTokenMaxAge")||Od,ia=null,Ld=n=>async e=>{let t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Dd)return;let r=t?.token;ia!==r&&(ia=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function Wa(n=In()){let e=Nt(n,"auth");if(e.isInitialized())return e.getImmediate();let t=ba(n,{popupRedirectResolver:Ua,persistence:[Ma,Oa,Pr]}),i=qi("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(i,location.origin);if(location.origin===s.origin){let o=Ld(s.toString());ka(t,o,()=>o(t.currentUser)),Pa(t,a=>o(a))}}let r=Gi("auth");return r&&Sa(t,`http://${r}`),t}function xd(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}eh({loadJS(n){return new Promise((e,t)=>{let i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=r=>{let s=ie("internal-error");s.customData=r,t(s)},i.type="text/javascript",i.charset="UTF-8",xd().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kd("Browser");var Va="@firebase/database",Ba="1.0.8";var Fs="";function Md(n){Fs=n}var Wr=class{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),P(t))}get(e){let t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Qe(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}};var Vr=class{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return j(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}};var yc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){let e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Wr(e)}}catch{}return new Vr},He=yc("localStorage"),Br=yc("sessionStorage");var ct=new me("@firebase/database"),Ic=function(){let n=1;return function(){return n++}}(),Ec=function(n){let e=bo(n),t=new pn;t.update(e);let i=t.digest();return _n.encodeByteArray(i)},on=function(...n){let e="";for(let t=0;t<n.length;t++){let i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=on.apply(null,i):typeof i=="object"?e+=P(i):e+=i,e+=" "}return e},Ge=null,Ha=!0,Fd=function(n,e){f(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(ct.logLevel=C.VERBOSE,Ge=ct.log.bind(ct),e&&Br.set("logging_enabled",!0)):typeof n=="function"?Ge=n:(Ge=null,Br.remove("logging_enabled"))},O=function(...n){if(Ha===!0&&(Ha=!1,Ge===null&&Br.get("logging_enabled")===!0&&Fd(!0)),Ge){let e=on.apply(null,n);Ge(e)}},an=function(n){return function(...e){O(n,...e)}},Hr=function(...n){let e="FIREBASE INTERNAL ERROR: "+on(...n);ct.error(e)},de=function(...n){let e=`FIREBASE FATAL ERROR: ${on(...n)}`;throw ct.error(e),new Error(e)},V=function(...n){let e="FIREBASE WARNING: "+on(...n);ct.warn(e)},Ud=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&V("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ci=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Wd=function(n){if(Z()||document.readyState==="complete")n();else{let e=!1,t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ut="[MIN_NAME]",ze="[MAX_NAME]",Ke=function(n,e){if(n===e)return 0;if(n===ut||e===ze)return-1;if(e===ut||n===ze)return 1;{let t=ja(n),i=ja(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Vd=function(n,e){return n===e?0:n<e?-1:1},jt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+P(e))},Us=function(n){if(typeof n!="object"||n===null)return P(n);let e=[];for(let i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=P(e[i]),t+=":",t+=Us(n[e[i]]);return t+="}",t},wc=function(n,e){let t=n.length;if(t<=e)return[n];let i=[];for(let r=0;r<t;r+=e)r+e>t?i.push(n.substring(r,t)):i.push(n.substring(r,r+e));return i};function D(n,e){for(let t in n)n.hasOwnProperty(t)&&e(t,n[t])}var Tc=function(n){f(!Ci(n),"Invalid JSON number");let e=11,t=52,i=(1<<e-1)-1,r,s,o,a,c;n===0?(s=0,o=0,r=1/n===-1/0?1:0):(r=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),s=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-i-t))));let l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(r?1:0),l.reverse();let h=l.join(""),u="";for(c=0;c<64;c+=8){let d=parseInt(h.substr(c,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},Bd=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Hd=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function jd(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");let i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}var Gd=new RegExp("^-?(0*)\\d{1,10}$"),zd=-2147483648,qd=2147483647,ja=function(n){if(Gd.test(n)){let e=Number(n);if(e>=zd&&e<=qd)return e}return null},vt=function(n){try{n()}catch(e){setTimeout(()=>{let t=e.stack||"";throw V("Exception was thrown by user callback.",t),e},Math.floor(0))}},$d=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},$t=function(n,e){let t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};var jr=class{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){V(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}};var Gr=class{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(O("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',V(e)}},Ce=class{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}};Ce.OWNER="owner";var Xn="5",Cc="v",bc="s",Sc="r",Ac="f",Rc=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Nc="ls",Pc="p",zr="ac",kc="websocket",Oc="long_polling";var Zn=class{constructor(e,t,i,r,s=!1,o="",a=!1,c=!1){this.secure=t,this.namespace=i,this.webSocketOnly=r,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=He.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&He.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){let e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}};function Kd(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Dc(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===kc)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Oc)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Kd(n)&&(t.ns=n.namespace);let r=[];return D(t,(s,o)=>{r.push(s+"="+o)}),i+r.join("&")}var qr=class{constructor(){this.counters_={}}incrementCounter(e,t=1){j(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return ho(this.counters_)}};var Or={},Dr={};function Ws(n){let e=n.toString();return Or[e]||(Or[e]=new qr),Or[e]}function Yd(n,e){let t=n.toString();return Dr[t]||(Dr[t]=e()),Dr[t]}var $r=class{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){let i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<i.length;++r)i[r]&&vt(()=>{this.onMessage_(i[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}};var Ga="start",Jd="close",Qd="pLPCommand",Xd="pRTLPCB",Lc="id",xc="pw",Mc="ser",Zd="cb",ef="seg",tf="ts",nf="d",rf="dframe",Fc=1870,Uc=30,sf=Fc-Uc,of=25e3,af=3e4,Kr=class n{constructor(e,t,i,r,s,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=an(e),this.stats_=Ws(t),this.urlFn=c=>(this.appCheckToken&&(c[zr]=this.appCheckToken),Dc(t,Oc,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new $r(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(af)),Wd(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Yr((...s)=>{let[o,a,c,l,h]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ga)this.id=a,this.password=c;else if(o===Jd)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{let[o,a]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);let i={};i[Ga]="t",i[Mc]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Zd]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Cc]=Xn,this.transportSessionId&&(i[bc]=this.transportSessionId),this.lastSessionId&&(i[Nc]=this.lastSessionId),this.applicationId&&(i[Pc]=this.applicationId),this.appCheckToken&&(i[zr]=this.appCheckToken),typeof location<"u"&&location.hostname&&Rc.test(location.hostname)&&(i[Sc]=Ac);let r=this.urlFn(i);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){n.forceAllow_=!0}static forceDisallow(){n.forceDisallow_=!0}static isAvailable(){return Z()?!1:n.forceAllow_?!0:!n.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Bd()&&!Hd()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){let t=P(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let i=Hi(t),r=wc(i,sf);for(let s=0;s<r.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if(Z())return;this.myDisconnFrame=document.createElement("iframe");let i={};i[rf]="t",i[Lc]=e,i[xc]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){let t=P(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}},Yr=class n{constructor(e,t,i,r){if(this.onDisconnect=i,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0,Z())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=Ic(),window[Qd+this.uniqueCallbackIdentifier]=e,window[Xd+this.uniqueCallbackIdentifier]=t,this.myIFrame=n.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');let o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){O("frame writing exception"),a.stack&&O(a.stack),O(a)}}}static createIFrame_(){let e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||O("No IE domain setting required")}catch{let i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));let e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;let e={};e[Lc]=this.myID,e[xc]=this.myPW,e[Mc]=this.currentSerial;let t=this.urlFn(e),i="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Uc+i.length<=Fc;){let o=this.pendingSegs.shift();i=i+"&"+ef+r+"="+o.seg+"&"+tf+r+"="+o.ts+"&"+nf+r+"="+o.d,r++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);let i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},r=setTimeout(i,Math.floor(of)),s=()=>{clearTimeout(r),i()};this.addTag(e,s)}addTag(e,t){Z()?this.doNodeLongPoll(e,t):setTimeout(()=>{try{if(!this.sendNewPolls)return;let i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){let r=i.readyState;(!r||r==="loaded"||r==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{O("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}};var cf=16384,lf=45e3,ei=null;typeof MozWebSocket<"u"?ei=MozWebSocket:typeof WebSocket<"u"&&(ei=WebSocket);var he=class n{constructor(e,t,i,r,s,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=r,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=an(this.connId),this.stats_=Ws(t),this.connURL=n.connectionURL_(t,o,a,r,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,r,s){let o={};return o[Cc]=Xn,!Z()&&typeof location<"u"&&location.hostname&&Rc.test(location.hostname)&&(o[Sc]=Ac),t&&(o[bc]=t),i&&(o[Nc]=i),r&&(o[zr]=r),s&&(o[Pc]=s),Dc(e,kc,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,He.set("previous_websocket_failure",!0);try{let i;if(Z()){let r=this.nodeAdmin?"AdminNode":"Node";i={headers:{"User-Agent":`Firebase/${Xn}/${Fs}/${process.platform}/${r}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(i.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(i.headers["X-Firebase-AppCheck"]=this.appCheckToken);let s=process.env,o=this.connURL.indexOf("wss://")===0?s.HTTPS_PROXY||s.https_proxy:s.HTTP_PROXY||s.http_proxy;o&&(i.proxy={origin:o})}this.mySock=new ei(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");let r=i.message||i.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");let r=i.message||i.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){n.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){let t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&ei!==null&&!n.forceDisallow_}static previouslyFailed(){return He.isInMemoryStorage||He.get("previous_websocket_failure")===!0}markConnectionHealthy(){He.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){let t=this.frames.join("");this.frames=null;let i=Qe(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){let t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;let t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{let i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();let t=P(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let i=wc(t,cf);i.length>1&&this.sendString_(String(i.length));for(let r=0;r<i.length;r++)this.sendString_(i[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(lf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}};he.responsesRequiredToBeHealthy=2;he.healthyTimeout=3e4;var ti=class n{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Kr,he]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){let t=he&&he.isAvailable(),i=t&&!he.previouslyFailed();if(e.webSocketOnly&&(t||V("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[he];else{let r=this.transports_=[];for(let s of n.ALL_TRANSPORTS)s&&s.isAvailable()&&r.push(s);n.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}};ti.globalTransportInitialized_=!1;var uf=6e4,hf=5e3,df=10*1024,ff=100*1024,Lr="t",za="d",pf="s",qa="r",_f="e",$a="o",Ka="a",Ya="n",Ja="p",mf="h",Jr=class{constructor(e,t,i,r,s,o,a,c,l,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=r,this.authToken_=s,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=an("c:"+this.id+":"),this.transportManager_=new ti(t),this.log_("Connection created"),this.start_()}start_(){let e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));let r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=$t(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ff?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>df?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){let t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Lr in e){let t=e[Lr];t===Ka?this.upgradeIfSecondaryHealthy_():t===qa?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===$a&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){let t=jt("t",e),i=jt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ja,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ka,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ya,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){let t=jt("t",e),i=jt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){let t=jt(Lr,e);if(za in e){let i=e[za];if(t===mf){let r=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(t===Ya){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===pf?this.onConnectionShutdown_(i):t===qa?this.onReset_(i):t===_f?Hr("Server Error: "+i):t===$a?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Hr("Unknown control packet command: "+t)}}onHandshake_(e){let t=e.ts,i=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Xn!==i&&V("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){let e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),$t(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(uf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):$t(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(hf))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ja,d:{}}}))}onSecondaryConnectionLost_(){let e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(He.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}};var ni=class{put(e,t,i,r){}merge(e,t,i,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}};var ii=class{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){let i=[...this.listeners_[e]];for(let r=0;r<i.length;r++)i[r].callback.apply(i[r].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});let r=this.getInitialEvent(e);r&&t.apply(i,r)}off(e,t,i){this.validateEventType_(e);let r=this.listeners_[e]||[];for(let s=0;s<r.length;s++)if(r[s].callback===t&&(!i||i===r[s].context)){r.splice(s,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}};var ri=class n extends ii{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ct()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new n}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}};var Qa=32,Xa=768,T=class{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[i]=this.pieces_[r],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}};function w(){return new T("")}function v(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Ae(n){return n.pieces_.length-n.pieceNum_}function b(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new T(n.pieces_,e)}function Vs(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function gf(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Qt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Wc(n){if(n.pieceNum_>=n.pieces_.length)return null;let e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new T(e,0)}function R(n,e){let t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof T)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{let i=e.split("/");for(let r=0;r<i.length;r++)i[r].length>0&&t.push(i[r])}return new T(t,0)}function y(n){return n.pieceNum_>=n.pieces_.length}function W(n,e){let t=v(n),i=v(e);if(t===null)return e;if(t===i)return W(b(n),b(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function vf(n,e){let t=Qt(n,0),i=Qt(e,0);for(let r=0;r<t.length&&r<i.length;r++){let s=Ke(t[r],i[r]);if(s!==0)return s}return t.length===i.length?0:t.length<i.length?-1:1}function Bs(n,e){if(Ae(n)!==Ae(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function z(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Ae(n)>Ae(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}var Qr=class{constructor(e,t){this.errorPrefix_=t,this.parts_=Qt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=St(this.parts_[i]);Vc(this)}};function yf(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=St(e),Vc(n)}function If(n){let e=n.parts_.pop();n.byteLength_-=St(e),n.parts_.length>0&&(n.byteLength_-=1)}function Vc(n){if(n.byteLength_>Xa)throw new Error(n.errorPrefix_+"has a key path longer than "+Xa+" bytes ("+n.byteLength_+").");if(n.parts_.length>Qa)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Qa+") or object contains a cycle "+Be(n))}function Be(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}var Xr=class n extends ii{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{let i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new n}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}};var Gt=1e3,Ef=60*5*1e3,Za=30*1e3,wf=1.3,Tf=3e4,Cf="server_kill",ec=3,qe=class n extends ni{constructor(e,t,i,r,s,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=r,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=n.nextPersistentConnectionId_++,this.log_=an("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Gt,this.maxReconnectDelay_=Ef,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c&&!Z())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Xr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ri.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){let r=++this.requestNumber_,s={r,a:e,b:t};this.log_(P(s)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),i&&(this.requestCBHash_[r]=i)}get(e){this.initConnection_();let t=new F,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{let a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;let s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,i,r){this.initConnection_();let s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");let a={onComplete:r,hashFn:t,query:e,tag:i};this.listens.get(o).set(s,a),this.connected_&&this.sendListen_(a)}sendGet_(e){let t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){let t=e.query,i=t._path.toString(),r=t._queryIdentifier;this.log_("Listen on "+i+" for "+r);let s={p:i},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,a=>{let c=a.d,l=a.s;n.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&j(e,"w")){let i=pe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){let r='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();V(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||To(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Za)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){let e=this.authToken_,t=wo(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,r=>{let s=r.s,o=r.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{let t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){let i=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+r),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,r)&&this.connected_&&this.sendUnlisten_(i,r,e._queryObject,t)}sendUnlisten_(e,t,i,r){this.log_("Unlisten on "+e+" for "+t);let s={p:e},o="n";r&&(s.q=i,s.t=r),this.sendRequest(o,s)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,r){let s={p:t,d:i};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,t,i,r){this.putInternal("p",e,t,i,r)}merge(e,t,i,r){this.putInternal("m",e,t,i,r)}putInternal(e,t,i,r,s){this.initConnection_();let o={p:t,d:i};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;let a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){let t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(s.s,s.d)})}reportStats(e){if(this.connected_){let t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){let s=i.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+P(e));let t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Hr("Unrecognized action received from server: "+P(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Gt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Gt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Tf&&(this.reconnectDelay_=Gt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());let e=new Date().getTime()-this.lastConnectionAttemptTime_,t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*wf)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;let e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+n.nextConnectionId_++,s=this.lastSessionId,o=!1,a=null,c=function(){a?a.close():(o=!0,i())},l=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:c,sendRequest:l};let h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{let[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?O("getToken() completed but was canceled"):(O("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,a=new Jr(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{V(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Cf)},s))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&V(u),c())}}}interrupt(e){O("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){O("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Xe(this.interruptReasons_)&&(this.reconnectDelay_=Gt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){let t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){let t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(s=>Us(s)).join("$"):i="default";let r=this.removeListen_(e,i);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,t){let i=new T(e).toString(),r;if(this.listens.has(i)){let s=this.listens.get(i);r=s.get(t),s.delete(t),s.size===0&&this.listens.delete(i)}else r=void 0;return r}onAuthRevoked_(e,t){O("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ec&&(this.reconnectDelay_=Za,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){O("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ec&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(let e of this.listens.values())for(let t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){let e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){let e={},t="js";Z()&&(this.repoInfo_.nodeAdmin?t="admin_node":t="node"),e["sdk."+t+"."+Fs.replace(/\./g,"-")]=1,Ct()?e["framework.cordova"]=1:mn()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){let e=ri.getInstance().currentlyOnline();return Xe(this.interruptReasons_)&&e}};qe.nextPersistentConnectionId_=0;qe.nextConnectionId_=0;var I=class n{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new n(e,t)}};var ht=class{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){let i=new I(ut,e),r=new I(ut,t);return this.compare(i,r)!==0}minPost(){return I.MIN}};var Qn,si=class extends ht{static get __EMPTY_NODE(){return Qn}static set __EMPTY_NODE(e){Qn=e}compare(e,t){return Ke(e.name,t.name)}isDefinedOn(e){throw Oe("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return I.MIN}maxPost(){return new I(ze,Qn)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new I(e,Qn)}toString(){return".key"}},lt=new si;var at=class{constructor(e,t,i,r,s=null){this.isReverse_=r,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}},U=class n{constructor(e,t,i,r,s){this.key=e,this.value=t,this.color=i??n.RED,this.left=r??q.EMPTY_NODE,this.right=s??q.EMPTY_NODE}copy(e,t,i,r,s){return new n(e??this.key,t??this.value,i??this.color,r??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let r=this,s=i(e,r.key);return s<0?r=r.copy(null,null,null,r.left.insert(e,t,i),null):s===0?r=r.copy(null,t,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,t,i)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,r;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return q.EMPTY_NODE;r=i.right.min_(),i=i.copy(r.key,r.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){let e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");let e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}};U.RED=!0;U.BLACK=!1;var Zr=class{copy(e,t,i,r,s){return this}insert(e,t,i){return new U(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}},q=class n{constructor(e,t=n.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new n(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,U.BLACK,null,null))}remove(e){return new n(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,U.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,r=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return r?r.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(r=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new at(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new at(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new at(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new at(this.root_,null,this.comparator_,!0,e)}};q.EMPTY_NODE=new Zr;function bf(n,e){return Ke(n.name,e.name)}function Hs(n,e){return Ke(n,e)}var es;function Sf(n){es=n}var Bc=function(n){return typeof n=="number"?"number:"+Tc(n):"string:"+n},Hc=function(n){if(n.isLeafNode()){let e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&j(e,".sv"),"Priority must be a string or number.")}else f(n===es||n.isEmpty(),"priority of unexpected type.");f(n===es||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};var tc,fe=class n{constructor(e,t=n.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Hc(this.priorityNode_)}static set __childrenNodeConstructor(e){tc=e}static get __childrenNodeConstructor(){return tc}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new n(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:n.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return y(e)?this:v(e)===".priority"?this.priorityNode_:n.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:n.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){let i=v(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||Ae(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,n.__childrenNodeConstructor.EMPTY_NODE.updateChild(b(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Bc(this.priorityNode_.val())+":");let t=typeof this.value_;e+=t+":",t==="number"?e+=Tc(this.value_):e+=this.value_,this.lazyHash_=Ec(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===n.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof n.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){let t=typeof e.value_,i=typeof this.value_,r=n.VALUE_TYPE_ORDER.indexOf(t),s=n.VALUE_TYPE_ORDER.indexOf(i);return f(r>=0,"Unknown leaf type: "+t),f(s>=0,"Unknown leaf type: "+i),r===s?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){let t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}};fe.VALUE_TYPE_ORDER=["object","boolean","number","string"];var jc,Gc;function Af(n){jc=n}function Rf(n){Gc=n}var ts=class extends ht{compare(e,t){let i=e.node.getPriority(),r=t.node.getPriority(),s=i.compareTo(r);return s===0?Ke(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return I.MIN}maxPost(){return new I(ze,new fe("[PRIORITY-POST]",Gc))}makePost(e,t){let i=jc(e);return new I(t,new fe("[PRIORITY-POST]",i))}toString(){return".priority"}},S=new ts;var Nf=Math.log(2),ns=class{constructor(e){let t=s=>parseInt(Math.log(s)/Nf,10),i=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;let r=i(this.count);this.bits_=e+1&r}nextBitIsOne(){let e=!(this.bits_&1<<this.current_);return this.current_--,e}},oi=function(n,e,t,i){n.sort(e);let r=function(c,l){let h=l-c,u,d;if(h===0)return null;if(h===1)return u=n[c],d=t?t(u):u,new U(d,u.node,U.BLACK,null,null);{let p=parseInt(h/2,10)+c,_=r(c,p),E=r(p+1,l);return u=n[p],d=t?t(u):u,new U(d,u.node,U.BLACK,_,E)}},s=function(c){let l=null,h=null,u=n.length,d=function(_,E){let N=u-_,oe=u;u-=_;let Pe=r(N+1,oe),ke=n[N],fn=t?t(ke):ke;p(new U(fn,ke.node,E,null,Pe))},p=function(_){l?(l.left=_,l=_):(h=_,l=_)};for(let _=0;_<c.count;++_){let E=c.nextBitIsOne(),N=Math.pow(2,c.count-(_+1));E?d(N,U.BLACK):(d(N,U.BLACK),d(N,U.RED))}return h},o=new ns(n.length),a=s(o);return new q(i||e,a)};var xr,ot={},dt=class n{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return f(ot&&S,"ChildrenNode.ts has not been loaded"),xr=xr||new n({".priority":ot},{".priority":S}),xr}get(e){let t=pe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof q?t:null}hasIndex(e){return j(this.indexSet_,e.toString())}addIndex(e,t){f(e!==lt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");let i=[],r=!1,s=t.getIterator(I.Wrap),o=s.getNext();for(;o;)r=r||e.isDefinedOn(o.node),i.push(o),o=s.getNext();let a;r?a=oi(i,e.getCompare()):a=ot;let c=e.toString(),l=Object.assign({},this.indexSet_);l[c]=e;let h=Object.assign({},this.indexes_);return h[c]=a,new n(h,l)}addToIndexes(e,t){let i=bt(this.indexes_,(r,s)=>{let o=pe(this.indexSet_,s);if(f(o,"Missing index implementation for "+s),r===ot)if(o.isDefinedOn(e.node)){let a=[],c=t.getIterator(I.Wrap),l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),oi(a,o.getCompare())}else return ot;else{let a=t.get(e.name),c=r;return a&&(c=c.remove(new I(e.name,a))),c.insert(e,e.node)}});return new n(i,this.indexSet_)}removeFromIndexes(e,t){let i=bt(this.indexes_,r=>{if(r===ot)return r;{let s=t.get(e.name);return s?r.remove(new I(e.name,s)):r}});return new n(i,this.indexSet_)}};var zt,g=class n{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Hc(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return zt||(zt=new n(new q(Hs),null,dt.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||zt}updatePriority(e){return this.children_.isEmpty()?this:new n(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{let t=this.children_.get(e);return t===null?zt:t}}getChild(e){let t=v(e);return t===null?this:this.getImmediateChild(t).getChild(b(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{let i=new I(e,t),r,s;t.isEmpty()?(r=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(i,this.children_)):(r=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(i,this.children_));let o=r.isEmpty()?zt:this.priorityNode_;return new n(r,o,s)}}updateChild(e,t){let i=v(e);if(i===null)return t;{f(v(e)!==".priority"||Ae(e)===1,".priority must be the last token in a path");let r=this.getImmediateChild(i).updateChild(b(e),t);return this.updateImmediateChild(i,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;let t={},i=0,r=0,s=!0;if(this.forEachChild(S,(o,a)=>{t[o]=a.val(e),i++,s&&n.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):s=!1}),!e&&s&&r<2*i){let o=[];for(let a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Bc(this.getPriority().val())+":"),this.forEachChild(S,(t,i)=>{let r=i.hash();r!==""&&(e+=":"+t+":"+r)}),this.lazyHash_=e===""?"":Ec(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){let r=this.resolveIndex_(i);if(r){let s=r.getPredecessorKey(new I(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){let t=this.resolveIndex_(e);if(t){let i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){let t=this.getFirstChildName(e);return t?new I(t,this.children_.get(t)):null}getLastChildName(e){let t=this.resolveIndex_(e);if(t){let i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){let t=this.getLastChildName(e);return t?new I(t,this.children_.get(t)):null}forEachChild(e,t){let i=this.resolveIndex_(e);return i?i.inorderTraversal(r=>t(r.name,r.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){let i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,r=>r);{let r=this.children_.getIteratorFrom(e.name,I.Wrap),s=r.peek();for(;s!=null&&t.compare(s,e)<0;)r.getNext(),s=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){let i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,r=>r);{let r=this.children_.getReverseIteratorFrom(e.name,I.Wrap),s=r.peek();for(;s!=null&&t.compare(s,e)>0;)r.getNext(),s=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===cn?-1:0}withIndex(e){if(e===lt||this.indexMap_.hasIndex(e))return this;{let t=this.indexMap_.addIndex(e,this.children_);return new n(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===lt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{let t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){let i=this.getIterator(S),r=t.getIterator(S),s=i.getNext(),o=r.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=i.getNext(),o=r.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===lt?null:this.indexMap_.get(e.toString())}};g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;var is=class extends g{constructor(){super(new q(Hs),g.EMPTY_NODE,dt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}},cn=new is;Object.defineProperties(I,{MIN:{value:new I(ut,g.EMPTY_NODE)},MAX:{value:new I(ze,cn)}});si.__EMPTY_NODE=g.EMPTY_NODE;fe.__childrenNodeConstructor=g;Sf(cn);Rf(cn);var Pf=!0;function A(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){let t=n;return new fe(t,A(e))}if(!(n instanceof Array)&&Pf){let t=[],i=!1;if(D(n,(o,a)=>{if(o.substring(0,1)!=="."){let c=A(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new I(o,c)))}}),t.length===0)return g.EMPTY_NODE;let s=oi(t,bf,o=>o.name,Hs);if(i){let o=oi(t,S.getCompare());return new g(s,A(e),new dt({".priority":o},{".priority":S}))}else return new g(s,A(e),dt.Default)}else{let t=g.EMPTY_NODE;return D(n,(i,r)=>{if(j(n,i)&&i.substring(0,1)!=="."){let s=A(r);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(i,s))}}),t.updatePriority(A(e))}}Af(A);var rs=class extends ht{constructor(e){super(),this.indexPath_=e,f(!y(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){let i=this.extractChild(e.node),r=this.extractChild(t.node),s=i.compareTo(r);return s===0?Ke(e.name,t.name):s}makePost(e,t){let i=A(e),r=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new I(t,r)}maxPost(){let e=g.EMPTY_NODE.updateChild(this.indexPath_,cn);return new I(ze,e)}toString(){return Qt(this.indexPath_,0).join("/")}};var ss=class extends ht{compare(e,t){let i=e.node.compareTo(t.node);return i===0?Ke(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return I.MIN}maxPost(){return I.MAX}makePost(e,t){let i=A(e);return new I(t,i)}toString(){return".value"}},kf=new ss;function zc(n){return{type:"value",snapshotNode:n}}function ft(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Xt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Zt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Of(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}var en=class{constructor(e){this.index_=e}updateChild(e,t,i,r,s,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");let a=e.getImmediateChild(t);return a.getChild(r).equals(i.getChild(r))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Xt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ft(t,i)):o.trackChildChange(Zt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(S,(r,s)=>{t.hasChild(r)||i.trackChildChange(Xt(r,s))}),t.isLeafNode()||t.forEachChild(S,(r,s)=>{if(e.hasChild(r)){let o=e.getImmediateChild(r);o.equals(s)||i.trackChildChange(Zt(r,s,o))}else i.trackChildChange(ft(r,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}};var ai=class n{constructor(e){this.indexedFilter_=new en(e.getIndex()),this.index_=e.getIndex(),this.startPost_=n.getStartPost_(e),this.endPost_=n.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){let t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,r,s,o){return this.matches(new I(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,r,s,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let r=t.withIndex(this.index_);r=r.updatePriority(g.EMPTY_NODE);let s=this;return t.forEachChild(S,(o,a)=>{s.matches(new I(o,a))||(r=r.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){let t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){let t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}};var os=class{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{let i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{let i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new ai(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,r,s,o){return this.rangedFilter_.matches(new I(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,r,s,o):this.fullLimitUpdateChild_(e,t,i,s,o)}updateFullNode(e,t,i){let r;if(t.isLeafNode()||t.isEmpty())r=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){r=g.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){let a=s.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=t.withIndex(this.index_),r=r.updatePriority(g.EMPTY_NODE);let s;this.reverse_?s=r.getReverseIterator(this.index_):s=r.getIterator(this.index_);let o=0;for(;s.hasNext();){let a=s.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,r,s){let o;if(this.reverse_){let u=this.index_.getCompare();o=(d,p)=>u(p,d)}else o=this.index_.getCompare();let a=e;f(a.numChildren()===this.limit_,"");let c=new I(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),h=this.rangedFilter_.matches(c);if(a.hasChild(t)){let u=a.getImmediateChild(t),d=r.getChildAfterChild(this.index_,l,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=r.getChildAfterChild(this.index_,d,this.reverse_);let p=d==null?1:o(d,c);if(h&&!i.isEmpty()&&p>=0)return s?.trackChildChange(Zt(t,i,u)),a.updateImmediateChild(t,i);{s?.trackChildChange(Xt(t,u));let E=a.updateImmediateChild(t,g.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(s?.trackChildChange(ft(d.name,d.node)),E.updateImmediateChild(d.name,d.node)):E}}else return i.isEmpty()?e:h&&o(l,c)>=0?(s!=null&&(s.trackChildChange(Xt(l.name,l.node)),s.trackChildChange(ft(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,g.EMPTY_NODE)):e}};var as=class n{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=S}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ut}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ze}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===S}copy(){let e=new n;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}};function Df(n){return n.loadsAllData()?new en(n.getIndex()):n.hasLimit()?new os(n):new ai(n)}function nc(n){let e={};if(n.isDefault())return e;let t;if(n.index_===S?t="$priority":n.index_===kf?t="$value":n.index_===lt?t="$key":(f(n.index_ instanceof rs,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=P(t),n.startSet_){let i=n.startAfterSet_?"startAfter":"startAt";e[i]=P(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+P(n.indexStartName_))}if(n.endSet_){let i=n.endBeforeSet_?"endBefore":"endAt";e[i]=P(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+P(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function ic(n){let e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==S&&(e.i=n.index_.toString()),e}var cs=class n extends ni{constructor(e,t,i,r){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=r,this.log_=an("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,r){let s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);let o=n.getListenId_(e,i),a={};this.listens_[o]=a;let c=nc(e._queryParams);this.restRequest_(s+".json",c,(l,h)=>{let u=h;if(l===404&&(u=null,l=null),l===null&&this.onDataUpdate_(s,u,!1,i),pe(this.listens_,o)===a){let d;l?l===401?d="permission_denied":d="rest_error:"+l:d="ok",r(d,null)}})}unlisten(e,t){let i=n.getListenId_(e,t);delete this.listens_[i]}get(e){let t=nc(e._queryParams),i=e._path.toString(),r=new F;return this.restRequest_(i+".json",t,(s,o)=>{let a=o;s===404&&(a=null,s=null),s===null?(this.onDataUpdate_(i,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,s])=>{r&&r.accessToken&&(t.auth=r.accessToken),s&&s.token&&(t.ac=s.token);let o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+_e(t);this.log_("Sending REST request for "+o);let a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Qe(a.responseText)}catch{V("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&V("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}};var ls=class{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}};function ci(){return{value:null,children:new Map}}function yt(n,e,t){if(y(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{let i=v(e);n.children.has(i)||n.children.set(i,ci());let r=n.children.get(i);e=b(e),yt(r,e,t)}}function us(n,e){if(y(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{let t=n.value;return n.value=null,t.forEachChild(S,(i,r)=>{yt(n,new T(i),r)}),us(n,e)}}else if(n.children.size>0){let t=v(e);return e=b(e),n.children.has(t)&&us(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function hs(n,e,t){n.value!==null?t(e,n.value):Lf(n,(i,r)=>{let s=new T(e.toString()+"/"+i);hs(r,s,t)})}function Lf(n,e){n.children.forEach((t,i)=>{e(i,t)})}var ds=class{constructor(e){this.collection_=e,this.last_=null}get(){let e=this.collection_.get(),t=Object.assign({},e);return this.last_&&D(this.last_,(i,r)=>{t[i]=t[i]-r}),this.last_=e,t}};var rc=10*1e3,xf=30*1e3,Mf=5*60*1e3,fs=class{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new ds(e);let i=rc+(xf-rc)*Math.random();$t(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){let e=this.statsListener_.get(),t={},i=!1;D(e,(r,s)=>{s>0&&j(this.statsToReport_,r)&&(t[r]=s,i=!0)}),i&&this.server_.reportStats(t),$t(this.reportStats_.bind(this),Math.floor(Math.random()*2*Mf))}};var J;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(J||(J={}));function js(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Gs(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function zs(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}var ps=class n{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=J.ACK_USER_WRITE,this.source=js()}operationForChild(e){if(y(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{let t=this.affectedTree.subtree(new T(e));return new n(w(),t,this.revert)}}else return f(v(this.path)===e,"operationForChild called for unrelated child."),new n(b(this.path),this.affectedTree,this.revert)}};var li=class n{constructor(e,t){this.source=e,this.path=t,this.type=J.LISTEN_COMPLETE}operationForChild(e){return y(this.path)?new n(this.source,w()):new n(this.source,b(this.path))}};var pt=class n{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=J.OVERWRITE}operationForChild(e){return y(this.path)?new n(this.source,w(),this.snap.getImmediateChild(e)):new n(this.source,b(this.path),this.snap)}};var tn=class n{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=J.MERGE}operationForChild(e){if(y(this.path)){let t=this.children.subtree(new T(e));return t.isEmpty()?null:t.value?new pt(this.source,w(),t.value):new n(this.source,w(),t)}else return f(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new n(this.source,b(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}};var se=class{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(y(e))return this.isFullyInitialized()&&!this.filtered_;let t=v(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}};var _s=class{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}};function Ff(n,e,t,i){let r=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(Of(o.childName,o.snapshotNode))}),qt(n,r,"child_removed",e,i,t),qt(n,r,"child_added",e,i,t),qt(n,r,"child_moved",s,i,t),qt(n,r,"child_changed",e,i,t),qt(n,r,"value",e,i,t),r}function qt(n,e,t,i,r,s){let o=i.filter(a=>a.type===t);o.sort((a,c)=>Wf(n,a,c)),o.forEach(a=>{let c=Uf(n,a,s);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function Uf(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Wf(n,e,t){if(e.childName==null||t.childName==null)throw Oe("Should only compare child_ events.");let i=new I(e.childName,e.snapshotNode),r=new I(t.childName,t.snapshotNode);return n.index_.compare(i,r)}function bi(n,e){return{eventCache:n,serverCache:e}}function Kt(n,e,t,i){return bi(new se(e,t,i),n.serverCache)}function qc(n,e,t,i){return bi(n.eventCache,new se(e,t,i))}function ui(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function $e(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}var Mr,Vf=()=>(Mr||(Mr=new q(Vd)),Mr),B=class n{constructor(e,t=Vf()){this.value=e,this.children=t}static fromObject(e){let t=new n(null);return D(e,(i,r)=>{t=t.set(new T(i),r)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:w(),value:this.value};if(y(e))return null;{let i=v(e),r=this.children.get(i);if(r!==null){let s=r.findRootMostMatchingPathAndValue(b(e),t);return s!=null?{path:R(new T(i),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(y(e))return this;{let t=v(e),i=this.children.get(t);return i!==null?i.subtree(b(e)):new n(null)}}set(e,t){if(y(e))return new n(t,this.children);{let i=v(e),s=(this.children.get(i)||new n(null)).set(b(e),t),o=this.children.insert(i,s);return new n(this.value,o)}}remove(e){if(y(e))return this.children.isEmpty()?new n(null):new n(null,this.children);{let t=v(e),i=this.children.get(t);if(i){let r=i.remove(b(e)),s;return r.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,r),this.value===null&&s.isEmpty()?new n(null):new n(this.value,s)}else return this}}get(e){if(y(e))return this.value;{let t=v(e),i=this.children.get(t);return i?i.get(b(e)):null}}setTree(e,t){if(y(e))return t;{let i=v(e),s=(this.children.get(i)||new n(null)).setTree(b(e),t),o;return s.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,s),new n(this.value,o)}}fold(e){return this.fold_(w(),e)}fold_(e,t){let i={};return this.children.inorderTraversal((r,s)=>{i[r]=s.fold_(R(e,r),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,w(),t)}findOnPath_(e,t,i){let r=this.value?i(t,this.value):!1;if(r)return r;if(y(e))return null;{let s=v(e),o=this.children.get(s);return o?o.findOnPath_(b(e),R(t,s),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,w(),t)}foreachOnPath_(e,t,i){if(y(e))return this;{this.value&&i(t,this.value);let r=v(e),s=this.children.get(r);return s?s.foreachOnPath_(b(e),R(t,r),i):new n(null)}}foreach(e){this.foreach_(w(),e)}foreach_(e,t){this.children.inorderTraversal((i,r)=>{r.foreach_(R(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}};var Q=class n{constructor(e){this.writeTree_=e}static empty(){return new n(new B(null))}};function Yt(n,e,t){if(y(e))return new Q(new B(t));{let i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){let r=i.path,s=i.value,o=W(r,e);return s=s.updateChild(o,t),new Q(n.writeTree_.set(r,s))}else{let r=new B(t),s=n.writeTree_.setTree(e,r);return new Q(s)}}}function ms(n,e,t){let i=n;return D(t,(r,s)=>{i=Yt(i,R(e,r),s)}),i}function sc(n,e){if(y(e))return Q.empty();{let t=n.writeTree_.setTree(e,new B(null));return new Q(t)}}function gs(n,e){return Ye(n,e)!=null}function Ye(n,e){let t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(W(t.path,e)):null}function oc(n){let e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(S,(i,r)=>{e.push(new I(i,r))}):n.writeTree_.children.inorderTraversal((i,r)=>{r.value!=null&&e.push(new I(i,r.value))}),e}function be(n,e){if(y(e))return n;{let t=Ye(n,e);return t!=null?new Q(new B(t)):new Q(n.writeTree_.subtree(e))}}function vs(n){return n.writeTree_.isEmpty()}function _t(n,e){return $c(w(),n.writeTree_,e)}function $c(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((r,s)=>{r===".priority"?(f(s.value!==null,"Priority writes must always be leaf nodes"),i=s.value):t=$c(R(n,r),s,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(R(n,".priority"),i)),t}}function Si(n,e){return Qc(e,n)}function Bf(n,e,t,i,r){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:r}),r&&(n.visibleWrites=Yt(n.visibleWrites,e,t)),n.lastWriteId=i}function Hf(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=ms(n.visibleWrites,e,t),n.lastWriteId=i}function jf(n,e){for(let t=0;t<n.allWrites.length;t++){let i=n.allWrites[t];if(i.writeId===e)return i}return null}function Gf(n,e){let t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");let i=n.allWrites[t];n.allWrites.splice(t,1);let r=i.visible,s=!1,o=n.allWrites.length-1;for(;r&&o>=0;){let a=n.allWrites[o];a.visible&&(o>=t&&zf(a,i.path)?r=!1:z(i.path,a.path)&&(s=!0)),o--}if(r){if(s)return qf(n),!0;if(i.snap)n.visibleWrites=sc(n.visibleWrites,i.path);else{let a=i.children;D(a,c=>{n.visibleWrites=sc(n.visibleWrites,R(i.path,c))})}return!0}else return!1}function zf(n,e){if(n.snap)return z(n.path,e);for(let t in n.children)if(n.children.hasOwnProperty(t)&&z(R(n.path,t),e))return!0;return!1}function qf(n){n.visibleWrites=Kc(n.allWrites,$f,w()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function $f(n){return n.visible}function Kc(n,e,t){let i=Q.empty();for(let r=0;r<n.length;++r){let s=n[r];if(e(s)){let o=s.path,a;if(s.snap)z(t,o)?(a=W(t,o),i=Yt(i,a,s.snap)):z(o,t)&&(a=W(o,t),i=Yt(i,w(),s.snap.getChild(a)));else if(s.children){if(z(t,o))a=W(t,o),i=ms(i,a,s.children);else if(z(o,t))if(a=W(o,t),y(a))i=ms(i,w(),s.children);else{let c=pe(s.children,v(a));if(c){let l=c.getChild(b(a));i=Yt(i,w(),l)}}}else throw Oe("WriteRecord should have .snap or .children")}}return i}function Yc(n,e,t,i,r){if(!i&&!r){let s=Ye(n.visibleWrites,e);if(s!=null)return s;{let o=be(n.visibleWrites,e);if(vs(o))return t;if(t==null&&!gs(o,w()))return null;{let a=t||g.EMPTY_NODE;return _t(o,a)}}}else{let s=be(n.visibleWrites,e);if(!r&&vs(s))return t;if(!r&&t==null&&!gs(s,w()))return null;{let o=function(l){return(l.visible||r)&&(!i||!~i.indexOf(l.writeId))&&(z(l.path,e)||z(e,l.path))},a=Kc(n.allWrites,o,e),c=t||g.EMPTY_NODE;return _t(a,c)}}}function Kf(n,e,t){let i=g.EMPTY_NODE,r=Ye(n.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(S,(s,o)=>{i=i.updateImmediateChild(s,o)}),i;if(t){let s=be(n.visibleWrites,e);return t.forEachChild(S,(o,a)=>{let c=_t(be(s,new T(o)),a);i=i.updateImmediateChild(o,c)}),oc(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{let s=be(n.visibleWrites,e);return oc(s).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Yf(n,e,t,i,r){f(i||r,"Either existingEventSnap or existingServerSnap must exist");let s=R(e,t);if(gs(n.visibleWrites,s))return null;{let o=be(n.visibleWrites,s);return vs(o)?r.getChild(t):_t(o,r.getChild(t))}}function Jf(n,e,t,i){let r=R(e,t),s=Ye(n.visibleWrites,r);if(s!=null)return s;if(i.isCompleteForChild(t)){let o=be(n.visibleWrites,r);return _t(o,i.getNode().getImmediateChild(t))}else return null}function Qf(n,e){return Ye(n.visibleWrites,e)}function Xf(n,e,t,i,r,s,o){let a,c=be(n.visibleWrites,e),l=Ye(c,w());if(l!=null)a=l;else if(t!=null)a=_t(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){let h=[],u=o.getCompare(),d=s?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o),p=d.getNext();for(;p&&h.length<r;)u(p,i)!==0&&h.push(p),p=d.getNext();return h}else return[]}function Zf(){return{visibleWrites:Q.empty(),allWrites:[],lastWriteId:-1}}function hi(n,e,t,i){return Yc(n.writeTree,n.treePath,e,t,i)}function qs(n,e){return Kf(n.writeTree,n.treePath,e)}function ac(n,e,t,i){return Yf(n.writeTree,n.treePath,e,t,i)}function di(n,e){return Qf(n.writeTree,R(n.treePath,e))}function ep(n,e,t,i,r,s){return Xf(n.writeTree,n.treePath,e,t,i,r,s)}function $s(n,e,t){return Jf(n.writeTree,n.treePath,e,t)}function Jc(n,e){return Qc(R(n.treePath,e),n.writeTree)}function Qc(n,e){return{treePath:n,writeTree:e}}var ys=class{constructor(){this.changeMap=new Map}trackChildChange(e){let t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");let r=this.changeMap.get(i);if(r){let s=r.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(i,Zt(i,e.snapshotNode,r.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(i,Xt(i,r.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(i,ft(i,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(i,Zt(i,e.snapshotNode,r.oldSnap));else throw Oe("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}};var Is=class{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}},Xc=new Is,nn=class{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){let t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{let i=this.optCompleteServerCache_!=null?new se(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return $s(this.writes_,e,i)}}getChildAfterChild(e,t,i){let r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:$e(this.viewCache_),s=ep(this.writes_,r,t,1,i,e);return s.length===0?null:s[0]}};function tp(n){return{filter:n}}function np(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function ip(n,e,t,i,r){let s=new ys,o,a;if(t.type===J.OVERWRITE){let l=t;l.source.fromUser?o=Es(n,e,l.path,l.snap,i,r,s):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!y(l.path),o=fi(n,e,l.path,l.snap,i,r,a,s))}else if(t.type===J.MERGE){let l=t;l.source.fromUser?o=sp(n,e,l.path,l.children,i,r,s):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ws(n,e,l.path,l.children,i,r,a,s))}else if(t.type===J.ACK_USER_WRITE){let l=t;l.revert?o=cp(n,e,l.path,i,r,s):o=op(n,e,l.path,l.affectedTree,i,r,s)}else if(t.type===J.LISTEN_COMPLETE)o=ap(n,e,t.path,i,s);else throw Oe("Unknown operation type: "+t.type);let c=s.getChanges();return rp(e,o,c),{viewCache:o,changes:c}}function rp(n,e,t){let i=e.eventCache;if(i.isFullyInitialized()){let r=i.getNode().isLeafNode()||i.getNode().isEmpty(),s=ui(n);(t.length>0||!n.eventCache.isFullyInitialized()||r&&!i.getNode().equals(s)||!i.getNode().getPriority().equals(s.getPriority()))&&t.push(zc(ui(e)))}}function Zc(n,e,t,i,r,s){let o=e.eventCache;if(di(i,t)!=null)return e;{let a,c;if(y(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){let l=$e(e),h=l instanceof g?l:g.EMPTY_NODE,u=qs(i,h);a=n.filter.updateFullNode(e.eventCache.getNode(),u,s)}else{let l=hi(i,$e(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{let l=v(t);if(l===".priority"){f(Ae(t)===1,"Can't have a priority with additional path components");let h=o.getNode();c=e.serverCache.getNode();let u=ac(i,t,h,c);u!=null?a=n.filter.updatePriority(h,u):a=o.getNode()}else{let h=b(t),u;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();let d=ac(i,t,o.getNode(),c);d!=null?u=o.getNode().getImmediateChild(l).updateChild(h,d):u=o.getNode().getImmediateChild(l)}else u=$s(i,l,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),l,u,h,r,s):a=o.getNode()}}return Kt(e,a,o.isFullyInitialized()||y(t),n.filter.filtersNodes())}}function fi(n,e,t,i,r,s,o,a){let c=e.serverCache,l,h=o?n.filter:n.filter.getIndexedFilter();if(y(t))l=h.updateFullNode(c.getNode(),i,null);else if(h.filtersNodes()&&!c.isFiltered()){let p=c.getNode().updateChild(t,i);l=h.updateFullNode(c.getNode(),p,null)}else{let p=v(t);if(!c.isCompleteForPath(t)&&Ae(t)>1)return e;let _=b(t),N=c.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?l=h.updatePriority(c.getNode(),N):l=h.updateChild(c.getNode(),p,N,_,Xc,null)}let u=qc(e,l,c.isFullyInitialized()||y(t),h.filtersNodes()),d=new nn(r,u,s);return Zc(n,u,t,r,d,a)}function Es(n,e,t,i,r,s,o){let a=e.eventCache,c,l,h=new nn(r,e,s);if(y(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Kt(e,l,!0,n.filter.filtersNodes());else{let u=v(t);if(u===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=Kt(e,l,a.isFullyInitialized(),a.isFiltered());else{let d=b(t),p=a.getNode().getImmediateChild(u),_;if(y(d))_=i;else{let E=h.getCompleteChild(u);E!=null?Vs(d)===".priority"&&E.getChild(Wc(d)).isEmpty()?_=E:_=E.updateChild(d,i):_=g.EMPTY_NODE}if(p.equals(_))c=e;else{let E=n.filter.updateChild(a.getNode(),u,_,d,h,o);c=Kt(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function cc(n,e){return n.eventCache.isCompleteForChild(e)}function sp(n,e,t,i,r,s,o){let a=e;return i.foreach((c,l)=>{let h=R(t,c);cc(e,v(h))&&(a=Es(n,a,h,l,r,s,o))}),i.foreach((c,l)=>{let h=R(t,c);cc(e,v(h))||(a=Es(n,a,h,l,r,s,o))}),a}function lc(n,e,t){return t.foreach((i,r)=>{e=e.updateChild(i,r)}),e}function ws(n,e,t,i,r,s,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;y(t)?l=i:l=new B(null).setTree(t,i);let h=e.serverCache.getNode();return l.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){let p=e.serverCache.getNode().getImmediateChild(u),_=lc(n,p,d);c=fi(n,c,new T(u),_,r,s,o,a)}}),l.children.inorderTraversal((u,d)=>{let p=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!p){let _=e.serverCache.getNode().getImmediateChild(u),E=lc(n,_,d);c=fi(n,c,new T(u),E,r,s,o,a)}}),c}function op(n,e,t,i,r,s,o){if(di(r,t)!=null)return e;let a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(y(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return fi(n,e,t,c.getNode().getChild(t),r,s,a,o);if(y(t)){let l=new B(null);return c.getNode().forEachChild(lt,(h,u)=>{l=l.set(new T(h),u)}),ws(n,e,t,l,r,s,a,o)}else return e}else{let l=new B(null);return i.foreach((h,u)=>{let d=R(t,h);c.isCompleteForPath(d)&&(l=l.set(h,c.getNode().getChild(d)))}),ws(n,e,t,l,r,s,a,o)}}function ap(n,e,t,i,r){let s=e.serverCache,o=qc(e,s.getNode(),s.isFullyInitialized()||y(t),s.isFiltered());return Zc(n,o,t,i,Xc,r)}function cp(n,e,t,i,r,s){let o;if(di(i,t)!=null)return e;{let a=new nn(i,e,r),c=e.eventCache.getNode(),l;if(y(t)||v(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=hi(i,$e(e));else{let u=e.serverCache.getNode();f(u instanceof g,"serverChildren would be complete if leaf node"),h=qs(i,u)}h=h,l=n.filter.updateFullNode(c,h,s)}else{let h=v(t),u=$s(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=c.getImmediateChild(h)),u!=null?l=n.filter.updateChild(c,h,u,b(t),a,s):e.eventCache.getNode().hasChild(h)?l=n.filter.updateChild(c,h,g.EMPTY_NODE,b(t),a,s):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=hi(i,$e(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||di(i,w())!=null,Kt(e,l,o,n.filter.filtersNodes())}}var Ts=class{constructor(e,t){this.query_=e,this.eventRegistrations_=[];let i=this.query_._queryParams,r=new en(i.getIndex()),s=Df(i);this.processor_=tp(s);let o=t.serverCache,a=t.eventCache,c=r.updateFullNode(g.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(g.EMPTY_NODE,a.getNode(),null),h=new se(c,o.isFullyInitialized(),r.filtersNodes()),u=new se(l,a.isFullyInitialized(),s.filtersNodes());this.viewCache_=bi(u,h),this.eventGenerator_=new _s(this.query_)}get query(){return this.query_}};function lp(n){return n.viewCache_.serverCache.getNode()}function up(n){return ui(n.viewCache_)}function hp(n,e){let t=$e(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!y(e)&&!t.getImmediateChild(v(e)).isEmpty())?t.getChild(e):null}function uc(n){return n.eventRegistrations_.length===0}function dp(n,e){n.eventRegistrations_.push(e)}function hc(n,e,t){let i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");let r=n.query._path;n.eventRegistrations_.forEach(s=>{let o=s.createCancelEvent(t,r);o&&i.push(o)})}if(e){let r=[];for(let s=0;s<n.eventRegistrations_.length;++s){let o=n.eventRegistrations_[s];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(n.eventRegistrations_.slice(s+1));break}}n.eventRegistrations_=r}else n.eventRegistrations_=[];return i}function dc(n,e,t,i){e.type===J.MERGE&&e.source.queryId!==null&&(f($e(n.viewCache_),"We should always have a full cache before handling merges"),f(ui(n.viewCache_),"Missing event cache, even though we have a server cache"));let r=n.viewCache_,s=ip(n.processor_,r,e,t,i);return np(n.processor_,s.viewCache),f(s.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,el(n,s.changes,s.viewCache.eventCache.getNode(),null)}function fp(n,e){let t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(S,(s,o)=>{i.push(ft(s,o))}),t.isFullyInitialized()&&i.push(zc(t.getNode())),el(n,i,t.getNode(),e)}function el(n,e,t,i){let r=i?[i]:n.eventRegistrations_;return Ff(n.eventGenerator_,e,t,r)}var pi,_i=class{constructor(){this.views=new Map}};function pp(n){f(!pi,"__referenceConstructor has already been defined"),pi=n}function _p(){return f(pi,"Reference.ts has not been loaded"),pi}function mp(n){return n.views.size===0}function Ks(n,e,t,i){let r=e.source.queryId;if(r!==null){let s=n.views.get(r);return f(s!=null,"SyncTree gave us an op for an invalid query."),dc(s,e,t,i)}else{let s=[];for(let o of n.views.values())s=s.concat(dc(o,e,t,i));return s}}function tl(n,e,t,i,r){let s=e._queryIdentifier,o=n.views.get(s);if(!o){let a=hi(t,r?i:null),c=!1;a?c=!0:i instanceof g?(a=qs(t,i),c=!1):(a=g.EMPTY_NODE,c=!1);let l=bi(new se(a,c,!1),new se(i,r,!1));return new Ts(e,l)}return o}function gp(n,e,t,i,r,s){let o=tl(n,e,i,r,s);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),dp(o,t),fp(o,t)}function vp(n,e,t,i){let r=e._queryIdentifier,s=[],o=[],a=Re(n);if(r==="default")for(let[c,l]of n.views.entries())o=o.concat(hc(l,t,i)),uc(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||s.push(l.query));else{let c=n.views.get(r);c&&(o=o.concat(hc(c,t,i)),uc(c)&&(n.views.delete(r),c.query._queryParams.loadsAllData()||s.push(c.query)))}return a&&!Re(n)&&s.push(new(_p())(e._repo,e._path)),{removed:s,events:o}}function nl(n){let e=[];for(let t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Se(n,e){let t=null;for(let i of n.views.values())t=t||hp(i,e);return t}function il(n,e){if(e._queryParams.loadsAllData())return Ai(n);{let i=e._queryIdentifier;return n.views.get(i)}}function rl(n,e){return il(n,e)!=null}function Re(n){return Ai(n)!=null}function Ai(n){for(let e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}var mi;function yp(n){f(!mi,"__referenceConstructor has already been defined"),mi=n}function Ip(){return f(mi,"Reference.ts has not been loaded"),mi}var Ep=1,gi=class{constructor(e){this.listenProvider_=e,this.syncPointTree_=new B(null),this.pendingWriteTree_=Zf(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}};function Ys(n,e,t,i,r){return Bf(n.pendingWriteTree_,e,t,i,r),r?It(n,new pt(js(),e,t)):[]}function wp(n,e,t,i){Hf(n.pendingWriteTree_,e,t,i);let r=B.fromObject(t);return It(n,new tn(js(),e,r))}function Te(n,e,t=!1){let i=jf(n.pendingWriteTree_,e);if(Gf(n.pendingWriteTree_,e)){let s=new B(null);return i.snap!=null?s=s.set(w(),!0):D(i.children,o=>{s=s.set(new T(o),!0)}),It(n,new ps(i.path,s,t))}else return[]}function ln(n,e,t){return It(n,new pt(Gs(),e,t))}function Tp(n,e,t){let i=B.fromObject(t);return It(n,new tn(Gs(),e,i))}function Cp(n,e){return It(n,new li(Gs(),e))}function bp(n,e,t){let i=Js(n,t);if(i){let r=Qs(i),s=r.path,o=r.queryId,a=W(s,e),c=new li(zs(o),a);return Xs(n,s,c)}else return[]}function vi(n,e,t,i,r=!1){let s=e._path,o=n.syncPointTree_.get(s),a=[];if(o&&(e._queryIdentifier==="default"||rl(o,e))){let c=vp(o,e,t,i);mp(o)&&(n.syncPointTree_=n.syncPointTree_.remove(s));let l=c.removed;if(a=c.events,!r){let h=l.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(s,(d,p)=>Re(p));if(h&&!u){let d=n.syncPointTree_.subtree(s);if(!d.isEmpty()){let p=Rp(d);for(let _=0;_<p.length;++_){let E=p[_],N=E.query,oe=cl(n,E);n.listenProvider_.startListening(Jt(N),rn(n,N),oe.hashFn,oe.onComplete)}}}!u&&l.length>0&&!i&&(h?n.listenProvider_.stopListening(Jt(e),null):l.forEach(d=>{let p=n.queryToTagMap.get(Ni(d));n.listenProvider_.stopListening(Jt(d),p)}))}Np(n,l)}return a}function sl(n,e,t,i){let r=Js(n,i);if(r!=null){let s=Qs(r),o=s.path,a=s.queryId,c=W(o,e),l=new pt(zs(a),c,t);return Xs(n,o,l)}else return[]}function Sp(n,e,t,i){let r=Js(n,i);if(r){let s=Qs(r),o=s.path,a=s.queryId,c=W(o,e),l=B.fromObject(t),h=new tn(zs(a),c,l);return Xs(n,o,h)}else return[]}function Cs(n,e,t,i=!1){let r=e._path,s=null,o=!1;n.syncPointTree_.foreachOnPath(r,(d,p)=>{let _=W(d,r);s=s||Se(p,_),o=o||Re(p)});let a=n.syncPointTree_.get(r);a?(o=o||Re(a),s=s||Se(a,w())):(a=new _i,n.syncPointTree_=n.syncPointTree_.set(r,a));let c;s!=null?c=!0:(c=!1,s=g.EMPTY_NODE,n.syncPointTree_.subtree(r).foreachChild((p,_)=>{let E=Se(_,w());E&&(s=s.updateImmediateChild(p,E))}));let l=rl(a,e);if(!l&&!e._queryParams.loadsAllData()){let d=Ni(e);f(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");let p=Pp();n.queryToTagMap.set(d,p),n.tagToQueryMap.set(p,d)}let h=Si(n.pendingWriteTree_,r),u=gp(a,e,t,h,s,c);if(!l&&!o&&!i){let d=il(a,e);u=u.concat(kp(n,e,d))}return u}function Ri(n,e,t){let r=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,a)=>{let c=W(o,e),l=Se(a,c);if(l)return l});return Yc(r,e,s,t,!0)}function Ap(n,e){let t=e._path,i=null;n.syncPointTree_.foreachOnPath(t,(l,h)=>{let u=W(l,t);i=i||Se(h,u)});let r=n.syncPointTree_.get(t);r?i=i||Se(r,w()):(r=new _i,n.syncPointTree_=n.syncPointTree_.set(t,r));let s=i!=null,o=s?new se(i,!0,!1):null,a=Si(n.pendingWriteTree_,e._path),c=tl(r,e,a,s?o.getNode():g.EMPTY_NODE,s);return up(c)}function It(n,e){return ol(e,n.syncPointTree_,null,Si(n.pendingWriteTree_,w()))}function ol(n,e,t,i){if(y(n.path))return al(n,e,t,i);{let r=e.get(w());t==null&&r!=null&&(t=Se(r,w()));let s=[],o=v(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){let l=t?t.getImmediateChild(o):null,h=Jc(i,o);s=s.concat(ol(a,c,l,h))}return r&&(s=s.concat(Ks(r,n,i,t))),s}}function al(n,e,t,i){let r=e.get(w());t==null&&r!=null&&(t=Se(r,w()));let s=[];return e.children.inorderTraversal((o,a)=>{let c=t?t.getImmediateChild(o):null,l=Jc(i,o),h=n.operationForChild(o);h&&(s=s.concat(al(h,a,c,l)))}),r&&(s=s.concat(Ks(r,n,i,t))),s}function cl(n,e){let t=e.query,i=rn(n,t);return{hashFn:()=>(lp(e)||g.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return i?bp(n,t._path,i):Cp(n,t._path);{let s=jd(r,t);return vi(n,t,null,s)}}}}function rn(n,e){let t=Ni(e);return n.queryToTagMap.get(t)}function Ni(n){return n._path.toString()+"$"+n._queryIdentifier}function Js(n,e){return n.tagToQueryMap.get(e)}function Qs(n){let e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new T(n.substr(0,e))}}function Xs(n,e,t){let i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");let r=Si(n.pendingWriteTree_,e);return Ks(i,t,r,null)}function Rp(n){return n.fold((e,t,i)=>{if(t&&Re(t))return[Ai(t)];{let r=[];return t&&(r=nl(t)),D(i,(s,o)=>{r=r.concat(o)}),r}})}function Jt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Ip())(n._repo,n._path):n}function Np(n,e){for(let t=0;t<e.length;++t){let i=e[t];if(!i._queryParams.loadsAllData()){let r=Ni(i),s=n.queryToTagMap.get(r);n.queryToTagMap.delete(r),n.tagToQueryMap.delete(s)}}}function Pp(){return Ep++}function kp(n,e,t){let i=e._path,r=rn(n,e),s=cl(n,t),o=n.listenProvider_.startListening(Jt(e),r,s.hashFn,s.onComplete),a=n.syncPointTree_.subtree(i);if(r)f(!Re(a.value),"If we're adding a query, it shouldn't be shadowed");else{let c=a.fold((l,h,u)=>{if(!y(l)&&h&&Re(h))return[Ai(h).query];{let d=[];return h&&(d=d.concat(nl(h).map(p=>p.query))),D(u,(p,_)=>{d=d.concat(_)}),d}});for(let l=0;l<c.length;++l){let h=c[l];n.listenProvider_.stopListening(Jt(h),rn(n,h))}}return o}var bs=class n{constructor(e){this.node_=e}getImmediateChild(e){let t=this.node_.getImmediateChild(e);return new n(t)}node(){return this.node_}},Ss=class n{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){let t=R(this.path_,e);return new n(this.syncTree_,t)}node(){return Ri(this.syncTree_,this.path_)}},Op=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},fc=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Dp(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Lp(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Dp=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Lp=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));let i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);let r=e.node();if(f(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return i;let o=r.getValue();return typeof o!="number"?i:o+i},ll=function(n,e,t,i){return eo(e,new Ss(t,n),i)},Zs=function(n,e,t){return eo(n,new bs(e),t)};function eo(n,e,t){let i=n.getPriority().val(),r=fc(i,e.getImmediateChild(".priority"),t),s;if(n.isLeafNode()){let o=n,a=fc(o.getValue(),e,t);return a!==o.getValue()||r!==o.getPriority().val()?new fe(a,A(r)):n}else{let o=n;return s=o,r!==o.getPriority().val()&&(s=s.updatePriority(new fe(r))),o.forEachChild(S,(a,c)=>{let l=eo(c,e.getImmediateChild(a),t);l!==c&&(s=s.updateImmediateChild(a,l))}),s}}var sn=class{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}};function Pi(n,e){let t=e instanceof T?e:new T(e),i=n,r=v(t);for(;r!==null;){let s=pe(i.node.children,r)||{children:{},childCount:0};i=new sn(r,i,s),t=b(t),r=v(t)}return i}function Je(n){return n.node.value}function to(n,e){n.node.value=e,As(n)}function ul(n){return n.node.childCount>0}function xp(n){return Je(n)===void 0&&!ul(n)}function ki(n,e){D(n.node.children,(t,i)=>{e(new sn(t,n,i))})}function hl(n,e,t,i){t&&!i&&e(n),ki(n,r=>{hl(r,e,!0,i)}),t&&i&&e(n)}function Mp(n,e,t){let i=t?n:n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function un(n){return new T(n.parent===null?n.name:un(n.parent)+"/"+n.name)}function As(n){n.parent!==null&&Fp(n.parent,n.name,n)}function Fp(n,e,t){let i=xp(t),r=j(n.node.children,e);i&&r?(delete n.node.children[e],n.node.childCount--,As(n)):!i&&!r&&(n.node.children[e]=t.node,n.node.childCount++,As(n))}var Up=/[\[\].#$\/\u0000-\u001F\u007F]/,Wp=/[\[\].#$\u0000-\u001F\u007F]/,Fr=10*1024*1024,no=function(n){return typeof n=="string"&&n.length!==0&&!Up.test(n)},dl=function(n){return typeof n=="string"&&n.length!==0&&!Wp.test(n)},Vp=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),dl(n)},io=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Ci(n)||n&&typeof n=="object"&&j(n,".sv")},Rs=function(n,e,t,i){i&&e===void 0||hn(De(n,"value"),e,t)},hn=function(n,e,t){let i=t instanceof T?new Qr(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Be(i));if(typeof e=="function")throw new Error(n+"contains a function "+Be(i)+" with contents = "+e.toString());if(Ci(e))throw new Error(n+"contains "+e.toString()+" "+Be(i));if(typeof e=="string"&&e.length>Fr/3&&St(e)>Fr)throw new Error(n+"contains a string greater than "+Fr+" utf8 bytes "+Be(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,s=!1;if(D(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!no(o)))throw new Error(n+" contains an invalid key ("+o+") "+Be(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);yf(i,o),hn(n,a,i),If(i)}),r&&s)throw new Error(n+' contains ".value" child '+Be(i)+" in addition to actual children.")}},Bp=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];let s=Qt(i);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!no(s[o]))throw new Error(n+"contains an invalid key ("+s[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(vf);let r=null;for(t=0;t<e.length;t++){if(i=e[t],r!==null&&z(r,i))throw new Error(n+"contains a path "+r.toString()+" that is ancestor of another path "+i.toString());r=i}},fl=function(n,e,t,i){if(i&&e===void 0)return;let r=De(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");let s=[];D(e,(o,a)=>{let c=new T(o);if(hn(r,a,R(t,c)),Vs(c)===".priority"&&!io(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(c)}),Bp(r,s)},Hp=function(n,e,t){if(!(t&&e===void 0)){if(Ci(e))throw new Error(De(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!io(e))throw new Error(De(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}};var pl=function(n,e,t,i){if(!(i&&t===void 0)&&!dl(t))throw new Error(De(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},jp=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),pl(n,e,t,i)},je=function(n,e){if(v(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Gp=function(n,e){let t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!no(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Vp(t))throw new Error(De(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};var Ns=class{constructor(){this.eventLists_=[],this.recursionDepth_=0}};function Oi(n,e){let t=null;for(let i=0;i<e.length;i++){let r=e[i],s=r.getPath();t!==null&&!Bs(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(r)}t&&n.eventLists_.push(t)}function _l(n,e,t){Oi(n,t),ml(n,i=>Bs(i,e))}function H(n,e,t){Oi(n,t),ml(n,i=>z(i,e)||z(e,i))}function ml(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){let r=n.eventLists_[i];if(r){let s=r.path;e(s)?(zp(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function zp(n){for(let e=0;e<n.events.length;e++){let t=n.events[e];if(t!==null){n.events[e]=null;let i=t.getEventRunner();Ge&&O("event: "+t.toString()),vt(i)}}}var qp="repo_interrupt",$p=25,Ps=class{constructor(e,t,i,r){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Ns,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ci(),this.transactionQueueTree_=new sn,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}};function Kp(n,e,t){if(n.stats_=Ws(n.repoInfo_),n.forceRestClient_||$d())n.server_=new cs(n.repoInfo_,(i,r,s,o)=>{pc(n,i,r,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>_c(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{P(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new qe(n.repoInfo_,e,(i,r,s,o)=>{pc(n,i,r,s,o)},i=>{_c(n,i)},i=>{Jp(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Yd(n.repoInfo_,()=>new fs(n.stats_,n.server_)),n.infoData_=new ls,n.infoSyncTree_=new gi({startListening:(i,r,s,o)=>{let a=[],c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=ln(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ro(n,"connected",!1),n.serverSyncTree_=new gi({startListening:(i,r,s,o)=>(n.server_.listen(i,s,r,(a,c)=>{let l=o(a,c);H(n.eventQueue_,i._path,l)}),[]),stopListening:(i,r)=>{n.server_.unlisten(i,r)}})}function Yp(n){let t=n.infoData_.getNode(new T(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function dn(n){return Op({timestamp:Yp(n)})}function pc(n,e,t,i,r){n.dataUpdateCount++;let s=new T(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(r)if(i){let c=bt(t,l=>A(l));o=Sp(n.serverSyncTree_,s,c,r)}else{let c=A(t);o=sl(n.serverSyncTree_,s,c,r)}else if(i){let c=bt(t,l=>A(l));o=Tp(n.serverSyncTree_,s,c)}else{let c=A(t);o=ln(n.serverSyncTree_,s,c)}let a=s;o.length>0&&(a=mt(n,s)),H(n.eventQueue_,a,o)}function _c(n,e){ro(n,"connected",e),e===!1&&e_(n)}function Jp(n,e){D(e,(t,i)=>{ro(n,t,i)})}function ro(n,e,t){let i=new T("/.info/"+e),r=A(t);n.infoData_.updateSnapshot(i,r);let s=ln(n.infoSyncTree_,i,r);H(n.eventQueue_,i,s)}function Di(n){return n.nextWriteId_++}function Qp(n,e,t){let i=Ap(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(r=>{let s=A(r).withIndex(e._queryParams.getIndex());Cs(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=ln(n.serverSyncTree_,e._path,s);else{let a=rn(n.serverSyncTree_,e);o=sl(n.serverSyncTree_,e._path,s,a)}return H(n.eventQueue_,e._path,o),vi(n.serverSyncTree_,e,t,null,!0),s},r=>(Et(n,"get for query "+P(e)+" failed: "+r),Promise.reject(new Error(r))))}function Xp(n,e,t,i,r){Et(n,"set",{path:e.toString(),value:t,priority:i});let s=dn(n),o=A(t,i),a=Ri(n.serverSyncTree_,e),c=Zs(o,a,s),l=Di(n),h=Ys(n.serverSyncTree_,e,c,l,!0);Oi(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(d,p)=>{let _=d==="ok";_||V("set at "+e+" failed: "+d);let E=Te(n.serverSyncTree_,l,!_);H(n.eventQueue_,e,E),Ne(n,r,d,p)});let u=oo(n,e);mt(n,u),H(n.eventQueue_,u,[])}function Zp(n,e,t,i){Et(n,"update",{path:e.toString(),value:t});let r=!0,s=dn(n),o={};if(D(t,(a,c)=>{r=!1,o[a]=ll(R(e,a),A(c),n.serverSyncTree_,s)}),r)O("update() called with empty data.  Don't do anything."),Ne(n,i,"ok",void 0);else{let a=Di(n),c=wp(n.serverSyncTree_,e,o,a);Oi(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,h)=>{let u=l==="ok";u||V("update at "+e+" failed: "+l);let d=Te(n.serverSyncTree_,a,!u),p=d.length>0?mt(n,e):e;H(n.eventQueue_,p,d),Ne(n,i,l,h)}),D(t,l=>{let h=oo(n,R(e,l));mt(n,h)}),H(n.eventQueue_,e,[])}}function e_(n){Et(n,"onDisconnectEvents");let e=dn(n),t=ci();hs(n.onDisconnect_,w(),(r,s)=>{let o=ll(r,s,n.serverSyncTree_,e);yt(t,r,o)});let i=[];hs(t,w(),(r,s)=>{i=i.concat(ln(n.serverSyncTree_,r,s));let o=oo(n,r);mt(n,o)}),n.onDisconnect_=ci(),H(n.eventQueue_,w(),i)}function t_(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,r)=>{i==="ok"&&us(n.onDisconnect_,e),Ne(n,t,i,r)})}function mc(n,e,t,i){let r=A(t);n.server_.onDisconnectPut(e.toString(),r.val(!0),(s,o)=>{s==="ok"&&yt(n.onDisconnect_,e,r),Ne(n,i,s,o)})}function n_(n,e,t,i,r){let s=A(t,i);n.server_.onDisconnectPut(e.toString(),s.val(!0),(o,a)=>{o==="ok"&&yt(n.onDisconnect_,e,s),Ne(n,r,o,a)})}function i_(n,e,t,i){if(Xe(t)){O("onDisconnect().update() called with empty data.  Don't do anything."),Ne(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(r,s)=>{r==="ok"&&D(t,(o,a)=>{let c=A(a);yt(n.onDisconnect_,R(e,o),c)}),Ne(n,i,r,s)})}function r_(n,e,t){let i;v(e._path)===".info"?i=Cs(n.infoSyncTree_,e,t):i=Cs(n.serverSyncTree_,e,t),_l(n.eventQueue_,e._path,i)}function gc(n,e,t){let i;v(e._path)===".info"?i=vi(n.infoSyncTree_,e,t):i=vi(n.serverSyncTree_,e,t),_l(n.eventQueue_,e._path,i)}function s_(n){n.persistentConnection_&&n.persistentConnection_.interrupt(qp)}function Et(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),O(t,...e)}function Ne(n,e,t,i){e&&vt(()=>{if(t==="ok")e(null);else{let r=(t||"error").toUpperCase(),s=r;i&&(s+=": "+i);let o=new Error(s);o.code=r,e(o)}})}function o_(n,e,t,i,r,s){Et(n,"transaction on "+e);let o={path:e,update:t,onComplete:i,status:null,order:Ic(),applyLocally:s,retryCount:0,unwatcher:r,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=so(n,e,void 0);o.currentInputSnapshot=a;let c=o.update(a.val());if(c===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{hn("transaction failed: Data returned ",c,o.path),o.status=0;let l=Pi(n.transactionQueueTree_,e),h=Je(l)||[];h.push(o),to(l,h);let u;typeof c=="object"&&c!==null&&j(c,".priority")?(u=pe(c,".priority"),f(io(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Ri(n.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();let d=dn(n),p=A(c,u),_=Zs(p,a,d);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=_,o.currentWriteId=Di(n);let E=Ys(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);H(n.eventQueue_,e,E),Li(n,n.transactionQueueTree_)}}function so(n,e,t){return Ri(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function Li(n,e=n.transactionQueueTree_){if(e||xi(n,e),Je(e)){let t=vl(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(r=>r.status===0)&&a_(n,un(e),t)}else ul(e)&&ki(e,t=>{Li(n,t)})}function a_(n,e,t){let i=t.map(l=>l.currentWriteId),r=so(n,e,i),s=r,o=r.hash();for(let l=0;l<t.length;l++){let h=t[l];f(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;let u=W(e,h.path);s=s.updateChild(u,h.currentOutputSnapshotRaw)}let a=s.val(!0),c=e;n.server_.put(c.toString(),a,l=>{Et(n,"transaction put response",{path:c.toString(),status:l});let h=[];if(l==="ok"){let u=[];for(let d=0;d<t.length;d++)t[d].status=2,h=h.concat(Te(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&u.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();xi(n,Pi(n.transactionQueueTree_,e)),Li(n,n.transactionQueueTree_),H(n.eventQueue_,e,h);for(let d=0;d<u.length;d++)vt(u[d])}else{if(l==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{V("transaction at "+c.toString()+" failed: "+l);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=l}mt(n,e)}},o)}function mt(n,e){let t=gl(n,e),i=un(t),r=vl(n,t);return c_(n,r,i),i}function c_(n,e,t){if(e.length===0)return;let i=[],r=[],o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){let c=e[a],l=W(t,c.path),h=!1,u;if(f(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)h=!0,u=c.abortReason,r=r.concat(Te(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=$p)h=!0,u="maxretry",r=r.concat(Te(n.serverSyncTree_,c.currentWriteId,!0));else{let d=so(n,c.path,o);c.currentInputSnapshot=d;let p=e[a].update(d.val());if(p!==void 0){hn("transaction failed: Data returned ",p,c.path);let _=A(p);typeof p=="object"&&p!=null&&j(p,".priority")||(_=_.updatePriority(d.getPriority()));let N=c.currentWriteId,oe=dn(n),Pe=Zs(_,d,oe);c.currentOutputSnapshotRaw=_,c.currentOutputSnapshotResolved=Pe,c.currentWriteId=Di(n),o.splice(o.indexOf(N),1),r=r.concat(Ys(n.serverSyncTree_,c.path,Pe,c.currentWriteId,c.applyLocally)),r=r.concat(Te(n.serverSyncTree_,N,!0))}else h=!0,u="nodata",r=r.concat(Te(n.serverSyncTree_,c.currentWriteId,!0))}H(n.eventQueue_,t,r),r=[],h&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}xi(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)vt(i[a]);Li(n,n.transactionQueueTree_)}function gl(n,e){let t,i=n.transactionQueueTree_;for(t=v(e);t!==null&&Je(i)===void 0;)i=Pi(i,t),e=b(e),t=v(e);return i}function vl(n,e){let t=[];return yl(n,e,t),t.sort((i,r)=>i.order-r.order),t}function yl(n,e,t){let i=Je(e);if(i)for(let r=0;r<i.length;r++)t.push(i[r]);ki(e,r=>{yl(n,r,t)})}function xi(n,e){let t=Je(e);if(t){let i=0;for(let r=0;r<t.length;r++)t[r].status!==2&&(t[i]=t[r],i++);t.length=i,to(e,t.length>0?t:void 0)}ki(e,i=>{xi(n,i)})}function oo(n,e){let t=un(gl(n,e)),i=Pi(n.transactionQueueTree_,e);return Mp(i,r=>{Ur(n,r)}),Ur(n,i),hl(i,r=>{Ur(n,r)}),t}function Ur(n,e){let t=Je(e);if(t){let i=[],r=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),r=r.concat(Te(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?to(e,void 0):t.length=s+1,H(n.eventQueue_,un(e),r);for(let o=0;o<i.length;o++)vt(i[o])}}function l_(n){let e="",t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let r=t[i];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function u_(n){let e={};n.charAt(0)==="?"&&(n=n.substring(1));for(let t of n.split("&")){if(t.length===0)continue;let i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):V(`Invalid query segment '${t}' in query '${n}'`)}return e}var vc=function(n,e){let t=h_(n),i=t.namespace;t.domain==="firebase.com"&&de(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&de("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Ud();let r=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Zn(t.host,t.secure,i,r,e,"",i!==t.subdomain),path:new T(t.pathString)}},h_=function(n){let e="",t="",i="",r="",s="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(r=l_(n.substring(h,u)));let d=u_(n.substring(Math.min(n.length,u)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;let p=e.slice(0,l);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{let _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),s=i}"ns"in d&&(s=d.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:r,namespace:s}};var yi=class{constructor(e,t,i,r){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=r}getPath(){let e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+P(this.snapshot.exportVal())}},Ii=class{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}};var Ei=class{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}};var ks=class{constructor(e,t){this._repo=e,this._path=t}cancel(){let e=new F;return t_(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){je("OnDisconnect.remove",this._path);let e=new F;return mc(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){je("OnDisconnect.set",this._path),Rs("OnDisconnect.set",e,this._path,!1);let t=new F;return mc(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){je("OnDisconnect.setWithPriority",this._path),Rs("OnDisconnect.setWithPriority",e,this._path,!1),Hp("OnDisconnect.setWithPriority",t,!1);let i=new F;return n_(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){je("OnDisconnect.update",this._path),fl("OnDisconnect.update",e,this._path,!1);let t=new F;return i_(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}};var Os=class n{constructor(e,t,i,r){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=r}get key(){return y(this._path)?null:Vs(this._path)}get ref(){return new X(this._repo,this._path)}get _queryIdentifier(){let e=ic(this._queryParams),t=Us(e);return t==="{}"?"default":t}get _queryObject(){return ic(this._queryParams)}isEqual(e){if(e=L(e),!(e instanceof n))return!1;let t=this._repo===e._repo,i=Bs(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return t&&i&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+gf(this._path)}};var X=class n extends Os{constructor(e,t){super(e,t,new as,!1)}get parent(){let e=Wc(this._path);return e===null?null:new n(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}},gt=class n{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){let t=new T(e),i=wi(this.ref,e);return new n(this._node.getChild(t),i,S)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,r)=>e(new n(r,wi(this.ref,i),S)))}hasChild(e){let t=new T(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function d_(n,e){return n=L(n),n._checkNotDeleted("ref"),e!==void 0?wi(n._root,e):n._root}function wi(n,e){return n=L(n),v(n._path)===null?jp("child","path",e,!1):pl("child","path",e,!1),new X(n._repo,R(n._path,e))}function f_(n){return n=L(n),new ks(n._repo,n._path)}function p_(n){return je("remove",n._path),Il(n,null)}function Il(n,e){n=L(n),je("set",n._path),Rs("set",e,n._path,!1);let t=new F;return Xp(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function __(n,e){fl("update",e,n._path,!1);let t=new F;return Zp(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function m_(n){n=L(n);let e=new Ei(()=>{}),t=new Ti(e);return Qp(n._repo,n,t).then(i=>new gt(i,new X(n._repo,n._path),n._queryParams.getIndex()))}var Ti=class n{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){let i=t._queryParams.getIndex();return new yi("value",this,new gt(e.snapshotNode,new X(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}matches(e){return e instanceof n?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}},Ds=class n{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ii(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");let i=wi(new X(t._repo,t._path),e.childName),r=t._queryParams.getIndex();return new yi(e.type,this,new gt(e.snapshotNode,i,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof n?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}};function g_(n,e,t,i,r){let s;if(typeof i=="object"&&(s=void 0,r=i),typeof i=="function"&&(s=i),r&&r.onlyOnce){let c=t,l=(h,u)=>{gc(n._repo,n,a),c(h,u)};l.userCallback=t.userCallback,l.context=t.context,t=l}let o=new Ei(t,s||void 0),a=e==="value"?new Ti(o):new Ds(e,o);return r_(n._repo,n,a),()=>gc(n._repo,n,a)}function El(n,e,t,i){return g_(n,"value",e,t,i)}pp(X);yp(X);var v_="FIREBASE_DATABASE_EMULATOR_HOST",Ls={},y_=!1;function I_(n,e,t,i){n.repoInfo_=new Zn(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function E_(n,e,t,i,r){let s=i||n.options.databaseURL;s===void 0&&(n.options.projectId||de("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),O("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=vc(s,r),a=o.repoInfo,c,l;typeof process<"u"&&process.env&&(l=process.env[v_]),l?(c=!0,s=`http://${l}?ns=${a.namespace}`,o=vc(s,r),a=o.repoInfo):c=!o.repoInfo.secure;let h=r&&c?new Ce(Ce.OWNER):new Gr(n.name,n.options,e);Gp("Invalid Firebase Database URL",o),y(o.path)||de("Database URL must point to the root of a Firebase Database (not including a child path).");let u=T_(a,n,h,new jr(n.name,t));return new xs(u,n)}function w_(n,e){let t=Ls[e];(!t||t[n.key]!==n)&&de(`Database ${e}(${n.repoInfo_}) has already been deleted.`),s_(n),delete t[n.key]}function T_(n,e,t,i){let r=Ls[e.name];r||(r={},Ls[e.name]=r);let s=r[n.toURLString()];return s&&de("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new Ps(n,y_,t,i),r[n.toURLString()]=s,s}var xs=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Kp(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new X(this._repo,w())),this._rootInternal}_delete(){return this._rootInternal!==null&&(w_(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&de("Cannot call "+e+" on a deleted database.")}};function C_(n=In(),e){let t=Nt(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){let i=po("database");i&&wl(t,...i)}return t}function wl(n,e,t,i={}){n=L(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&de("Cannot call useEmulator() after instance has already been initialized.");let r=n._repoInternal,s;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&de('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),s=new Ce(Ce.OWNER);else if(i.mockUserToken){let o=typeof i.mockUserToken=="string"?i.mockUserToken:_o(i.mockUserToken,n.app.options.projectId);s=new Ce(o)}I_(r,e,t,s)}function b_(n){Md(ye),ve(new G("database",(e,{instanceIdentifier:t})=>{let i=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return E_(i,r,s,t)},"PUBLIC").setMultipleInstances(!0)),K(Va,Ba,n),K(Va,Ba,"esm2017")}var S_={".sv":"timestamp"};function A_(){return S_}var Ms=class{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function R_(n,e,t){var i;if(n=L(n),je("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";let r=(i=t?.applyLocally)!==null&&i!==void 0?i:!0,s=new F,o=(c,l,h)=>{let u=null;c?s.reject(c):(u=new gt(h,new X(n._repo,n._path),S),s.resolve(new Ms(l,u)))},a=El(n,()=>{});return o_(n._repo,n._path,e,o,a,r),s.promise}qe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};qe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};b_();export{wl as connectDatabaseEmulator,m_ as get,Wa as getAuth,C_ as getDatabase,Uo as initializeApp,f_ as onDisconnect,El as onValue,d_ as ref,p_ as remove,R_ as runTransaction,A_ as serverTimestamp,Il as set,Ra as signInAnonymously,__ as update};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
