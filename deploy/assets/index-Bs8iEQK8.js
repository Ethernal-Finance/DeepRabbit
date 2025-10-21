(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var U;(function(o){o.assertEqual=i=>{};function e(i){}o.assertIs=e;function t(i){throw new Error}o.assertNever=t,o.arrayToEnum=i=>{const s={};for(const l of i)s[l]=l;return s},o.getValidEnumValues=i=>{const s=o.objectKeys(i).filter(c=>typeof i[i[c]]!="number"),l={};for(const c of s)l[c]=i[c];return o.objectValues(l)},o.objectValues=i=>o.objectKeys(i).map(function(s){return i[s]}),o.objectKeys=typeof Object.keys=="function"?i=>Object.keys(i):i=>{const s=[];for(const l in i)Object.prototype.hasOwnProperty.call(i,l)&&s.push(l);return s},o.find=(i,s)=>{for(const l of i)if(s(l))return l},o.isInteger=typeof Number.isInteger=="function"?i=>Number.isInteger(i):i=>typeof i=="number"&&Number.isFinite(i)&&Math.floor(i)===i;function n(i,s=" | "){return i.map(l=>typeof l=="string"?`'${l}'`:l).join(s)}o.joinValues=n,o.jsonStringifyReplacer=(i,s)=>typeof s=="bigint"?s.toString():s})(U||(U={}));var xn;(function(o){o.mergeShapes=(e,t)=>({...e,...t})})(xn||(xn={}));const C=U.arrayToEnum(["string","nan","number","integer","float","boolean","date","bigint","symbol","function","undefined","null","array","object","unknown","promise","void","never","map","set"]),pe=o=>{switch(typeof o){case"undefined":return C.undefined;case"string":return C.string;case"number":return Number.isNaN(o)?C.nan:C.number;case"boolean":return C.boolean;case"function":return C.function;case"bigint":return C.bigint;case"symbol":return C.symbol;case"object":return Array.isArray(o)?C.array:o===null?C.null:o.then&&typeof o.then=="function"&&o.catch&&typeof o.catch=="function"?C.promise:typeof Map<"u"&&o instanceof Map?C.map:typeof Set<"u"&&o instanceof Set?C.set:typeof Date<"u"&&o instanceof Date?C.date:C.object;default:return C.unknown}},x=U.arrayToEnum(["invalid_type","invalid_literal","custom","invalid_union","invalid_union_discriminator","invalid_enum_value","unrecognized_keys","invalid_arguments","invalid_return_type","invalid_date","invalid_string","too_small","too_big","invalid_intersection_types","not_multiple_of","not_finite"]);class ce extends Error{get errors(){return this.issues}constructor(e){super(),this.issues=[],this.addIssue=n=>{this.issues=[...this.issues,n]},this.addIssues=(n=[])=>{this.issues=[...this.issues,...n]};const t=new.target.prototype;Object.setPrototypeOf?Object.setPrototypeOf(this,t):this.__proto__=t,this.name="ZodError",this.issues=e}format(e){const t=e||function(s){return s.message},n={_errors:[]},i=s=>{for(const l of s.issues)if(l.code==="invalid_union")l.unionErrors.map(i);else if(l.code==="invalid_return_type")i(l.returnTypeError);else if(l.code==="invalid_arguments")i(l.argumentsError);else if(l.path.length===0)n._errors.push(t(l));else{let c=n,u=0;for(;u<l.path.length;){const d=l.path[u];u===l.path.length-1?(c[d]=c[d]||{_errors:[]},c[d]._errors.push(t(l))):c[d]=c[d]||{_errors:[]},c=c[d],u++}}};return i(this),n}static assert(e){if(!(e instanceof ce))throw new Error(`Not a ZodError: ${e}`)}toString(){return this.message}get message(){return JSON.stringify(this.issues,U.jsonStringifyReplacer,2)}get isEmpty(){return this.issues.length===0}flatten(e=t=>t.message){const t={},n=[];for(const i of this.issues)if(i.path.length>0){const s=i.path[0];t[s]=t[s]||[],t[s].push(e(i))}else n.push(e(i));return{formErrors:n,fieldErrors:t}}get formErrors(){return this.flatten()}}ce.create=o=>new ce(o);const qt=(o,e)=>{let t;switch(o.code){case x.invalid_type:o.received===C.undefined?t="Required":t=`Expected ${o.expected}, received ${o.received}`;break;case x.invalid_literal:t=`Invalid literal value, expected ${JSON.stringify(o.expected,U.jsonStringifyReplacer)}`;break;case x.unrecognized_keys:t=`Unrecognized key(s) in object: ${U.joinValues(o.keys,", ")}`;break;case x.invalid_union:t="Invalid input";break;case x.invalid_union_discriminator:t=`Invalid discriminator value. Expected ${U.joinValues(o.options)}`;break;case x.invalid_enum_value:t=`Invalid enum value. Expected ${U.joinValues(o.options)}, received '${o.received}'`;break;case x.invalid_arguments:t="Invalid function arguments";break;case x.invalid_return_type:t="Invalid function return type";break;case x.invalid_date:t="Invalid date";break;case x.invalid_string:typeof o.validation=="object"?"includes"in o.validation?(t=`Invalid input: must include "${o.validation.includes}"`,typeof o.validation.position=="number"&&(t=`${t} at one or more positions greater than or equal to ${o.validation.position}`)):"startsWith"in o.validation?t=`Invalid input: must start with "${o.validation.startsWith}"`:"endsWith"in o.validation?t=`Invalid input: must end with "${o.validation.endsWith}"`:U.assertNever(o.validation):o.validation!=="regex"?t=`Invalid ${o.validation}`:t="Invalid";break;case x.too_small:o.type==="array"?t=`Array must contain ${o.exact?"exactly":o.inclusive?"at least":"more than"} ${o.minimum} element(s)`:o.type==="string"?t=`String must contain ${o.exact?"exactly":o.inclusive?"at least":"over"} ${o.minimum} character(s)`:o.type==="number"?t=`Number must be ${o.exact?"exactly equal to ":o.inclusive?"greater than or equal to ":"greater than "}${o.minimum}`:o.type==="bigint"?t=`Number must be ${o.exact?"exactly equal to ":o.inclusive?"greater than or equal to ":"greater than "}${o.minimum}`:o.type==="date"?t=`Date must be ${o.exact?"exactly equal to ":o.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(o.minimum))}`:t="Invalid input";break;case x.too_big:o.type==="array"?t=`Array must contain ${o.exact?"exactly":o.inclusive?"at most":"less than"} ${o.maximum} element(s)`:o.type==="string"?t=`String must contain ${o.exact?"exactly":o.inclusive?"at most":"under"} ${o.maximum} character(s)`:o.type==="number"?t=`Number must be ${o.exact?"exactly":o.inclusive?"less than or equal to":"less than"} ${o.maximum}`:o.type==="bigint"?t=`BigInt must be ${o.exact?"exactly":o.inclusive?"less than or equal to":"less than"} ${o.maximum}`:o.type==="date"?t=`Date must be ${o.exact?"exactly":o.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(o.maximum))}`:t="Invalid input";break;case x.custom:t="Invalid input";break;case x.invalid_intersection_types:t="Intersection results could not be merged";break;case x.not_multiple_of:t=`Number must be a multiple of ${o.multipleOf}`;break;case x.not_finite:t="Number must be finite";break;default:t=e.defaultError,U.assertNever(o)}return{message:t}};let ts=qt;function ns(){return ts}const os=o=>{const{data:e,path:t,errorMaps:n,issueData:i}=o,s=[...t,...i.path||[]],l={...i,path:s};if(i.message!==void 0)return{...i,path:s,message:i.message};let c="";const u=n.filter(d=>!!d).slice().reverse();for(const d of u)c=d(l,{data:e,defaultError:c}).message;return{...i,path:s,message:c}};function b(o,e){const t=ns(),n=os({issueData:e,data:o.data,path:o.path,errorMaps:[o.common.contextualErrorMap,o.schemaErrorMap,t,t===qt?void 0:qt].filter(i=>!!i)});o.common.issues.push(n)}class K{constructor(){this.value="valid"}dirty(){this.value==="valid"&&(this.value="dirty")}abort(){this.value!=="aborted"&&(this.value="aborted")}static mergeArray(e,t){const n=[];for(const i of t){if(i.status==="aborted")return I;i.status==="dirty"&&e.dirty(),n.push(i.value)}return{status:e.value,value:n}}static async mergeObjectAsync(e,t){const n=[];for(const i of t){const s=await i.key,l=await i.value;n.push({key:s,value:l})}return K.mergeObjectSync(e,n)}static mergeObjectSync(e,t){const n={};for(const i of t){const{key:s,value:l}=i;if(s.status==="aborted"||l.status==="aborted")return I;s.status==="dirty"&&e.dirty(),l.status==="dirty"&&e.dirty(),s.value!=="__proto__"&&(typeof l.value<"u"||i.alwaysSet)&&(n[s.value]=l.value)}return{status:e.value,value:n}}}const I=Object.freeze({status:"aborted"}),Ye=o=>({status:"dirty",value:o}),Q=o=>({status:"valid",value:o}),bn=o=>o.status==="aborted",Cn=o=>o.status==="dirty",Le=o=>o.status==="valid",ft=o=>typeof Promise<"u"&&o instanceof Promise;var _;(function(o){o.errToObj=e=>typeof e=="string"?{message:e}:e||{},o.toString=e=>typeof e=="string"?e:e==null?void 0:e.message})(_||(_={}));class ae{constructor(e,t,n,i){this._cachedPath=[],this.parent=e,this.data=t,this._path=n,this._key=i}get path(){return this._cachedPath.length||(Array.isArray(this._key)?this._cachedPath.push(...this._path,...this._key):this._cachedPath.push(...this._path,this._key)),this._cachedPath}}const wn=(o,e)=>{if(Le(e))return{success:!0,data:e.value};if(!o.common.issues.length)throw new Error("Validation failed but no issues detected.");return{success:!1,get error(){if(this._error)return this._error;const t=new ce(o.common.issues);return this._error=t,this._error}}};function N(o){if(!o)return{};const{errorMap:e,invalid_type_error:t,required_error:n,description:i}=o;if(e&&(t||n))throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);return e?{errorMap:e,description:i}:{errorMap:(l,c)=>{const{message:u}=o;return l.code==="invalid_enum_value"?{message:u??c.defaultError}:typeof c.data>"u"?{message:u??n??c.defaultError}:l.code!=="invalid_type"?{message:c.defaultError}:{message:u??t??c.defaultError}},description:i}}class ${get description(){return this._def.description}_getType(e){return pe(e.data)}_getOrReturnCtx(e,t){return t||{common:e.parent.common,data:e.data,parsedType:pe(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}_processInputParams(e){return{status:new K,ctx:{common:e.parent.common,data:e.data,parsedType:pe(e.data),schemaErrorMap:this._def.errorMap,path:e.path,parent:e.parent}}}_parseSync(e){const t=this._parse(e);if(ft(t))throw new Error("Synchronous parse encountered promise.");return t}_parseAsync(e){const t=this._parse(e);return Promise.resolve(t)}parse(e,t){const n=this.safeParse(e,t);if(n.success)return n.data;throw n.error}safeParse(e,t){const n={common:{issues:[],async:(t==null?void 0:t.async)??!1,contextualErrorMap:t==null?void 0:t.errorMap},path:(t==null?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:pe(e)},i=this._parseSync({data:e,path:n.path,parent:n});return wn(n,i)}"~validate"(e){var n,i;const t={common:{issues:[],async:!!this["~standard"].async},path:[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:pe(e)};if(!this["~standard"].async)try{const s=this._parseSync({data:e,path:[],parent:t});return Le(s)?{value:s.value}:{issues:t.common.issues}}catch(s){(i=(n=s==null?void 0:s.message)==null?void 0:n.toLowerCase())!=null&&i.includes("encountered")&&(this["~standard"].async=!0),t.common={issues:[],async:!0}}return this._parseAsync({data:e,path:[],parent:t}).then(s=>Le(s)?{value:s.value}:{issues:t.common.issues})}async parseAsync(e,t){const n=await this.safeParseAsync(e,t);if(n.success)return n.data;throw n.error}async safeParseAsync(e,t){const n={common:{issues:[],contextualErrorMap:t==null?void 0:t.errorMap,async:!0},path:(t==null?void 0:t.path)||[],schemaErrorMap:this._def.errorMap,parent:null,data:e,parsedType:pe(e)},i=this._parse({data:e,path:n.path,parent:n}),s=await(ft(i)?i:Promise.resolve(i));return wn(n,s)}refine(e,t){const n=i=>typeof t=="string"||typeof t>"u"?{message:t}:typeof t=="function"?t(i):t;return this._refinement((i,s)=>{const l=e(i),c=()=>s.addIssue({code:x.custom,...n(i)});return typeof Promise<"u"&&l instanceof Promise?l.then(u=>u?!0:(c(),!1)):l?!0:(c(),!1)})}refinement(e,t){return this._refinement((n,i)=>e(n)?!0:(i.addIssue(typeof t=="function"?t(n,i):t),!1))}_refinement(e){return new Ve({schema:this,typeName:A.ZodEffects,effect:{type:"refinement",refinement:e}})}superRefine(e){return this._refinement(e)}constructor(e){this.spa=this.safeParseAsync,this._def=e,this.parse=this.parse.bind(this),this.safeParse=this.safeParse.bind(this),this.parseAsync=this.parseAsync.bind(this),this.safeParseAsync=this.safeParseAsync.bind(this),this.spa=this.spa.bind(this),this.refine=this.refine.bind(this),this.refinement=this.refinement.bind(this),this.superRefine=this.superRefine.bind(this),this.optional=this.optional.bind(this),this.nullable=this.nullable.bind(this),this.nullish=this.nullish.bind(this),this.array=this.array.bind(this),this.promise=this.promise.bind(this),this.or=this.or.bind(this),this.and=this.and.bind(this),this.transform=this.transform.bind(this),this.brand=this.brand.bind(this),this.default=this.default.bind(this),this.catch=this.catch.bind(this),this.describe=this.describe.bind(this),this.pipe=this.pipe.bind(this),this.readonly=this.readonly.bind(this),this.isNullable=this.isNullable.bind(this),this.isOptional=this.isOptional.bind(this),this["~standard"]={version:1,vendor:"zod",validate:t=>this["~validate"](t)}}optional(){return he.create(this,this._def)}nullable(){return Oe.create(this,this._def)}nullish(){return this.nullable().optional()}array(){return re.create(this)}promise(){return yt.create(this,this._def)}or(e){return mt.create([this,e],this._def)}and(e){return gt.create(this,e,this._def)}transform(e){return new Ve({...N(this._def),schema:this,typeName:A.ZodEffects,effect:{type:"transform",transform:e}})}default(e){const t=typeof e=="function"?e:()=>e;return new Jt({...N(this._def),innerType:this,defaultValue:t,typeName:A.ZodDefault})}brand(){return new Ss({typeName:A.ZodBranded,type:this,...N(this._def)})}catch(e){const t=typeof e=="function"?e:()=>e;return new Yt({...N(this._def),innerType:this,catchValue:t,typeName:A.ZodCatch})}describe(e){const t=this.constructor;return new t({...this._def,description:e})}pipe(e){return ln.create(this,e)}readonly(){return Kt.create(this)}isOptional(){return this.safeParse(void 0).success}isNullable(){return this.safeParse(null).success}}const is=/^c[^\s-]{8,}$/i,ss=/^[0-9a-z]+$/,rs=/^[0-9A-HJKMNP-TV-Z]{26}$/i,as=/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,ls=/^[a-z0-9_-]{21}$/i,cs=/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,ds=/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,us=/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,ps="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";let $t;const fs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,hs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,ms=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,gs=/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,vs=/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,ys=/^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,pi="((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",xs=new RegExp(`^${pi}$`);function fi(o){let e="[0-5]\\d";o.precision?e=`${e}\\.\\d{${o.precision}}`:o.precision==null&&(e=`${e}(\\.\\d+)?`);const t=o.precision?"+":"?";return`([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`}function bs(o){return new RegExp(`^${fi(o)}$`)}function Cs(o){let e=`${pi}T${fi(o)}`;const t=[];return t.push(o.local?"Z?":"Z"),o.offset&&t.push("([+-]\\d{2}:?\\d{2})"),e=`${e}(${t.join("|")})`,new RegExp(`^${e}$`)}function ws(o,e){return!!((e==="v4"||!e)&&fs.test(o)||(e==="v6"||!e)&&ms.test(o))}function _s(o,e){if(!cs.test(o))return!1;try{const[t]=o.split(".");if(!t)return!1;const n=t.replace(/-/g,"+").replace(/_/g,"/").padEnd(t.length+(4-t.length%4)%4,"="),i=JSON.parse(atob(n));return!(typeof i!="object"||i===null||"typ"in i&&(i==null?void 0:i.typ)!=="JWT"||!i.alg||e&&i.alg!==e)}catch{return!1}}function Ts(o,e){return!!((e==="v4"||!e)&&hs.test(o)||(e==="v6"||!e)&&gs.test(o))}class se extends ${_parse(e){if(this._def.coerce&&(e.data=String(e.data)),this._getType(e)!==C.string){const s=this._getOrReturnCtx(e);return b(s,{code:x.invalid_type,expected:C.string,received:s.parsedType}),I}const n=new K;let i;for(const s of this._def.checks)if(s.kind==="min")e.data.length<s.value&&(i=this._getOrReturnCtx(e,i),b(i,{code:x.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),n.dirty());else if(s.kind==="max")e.data.length>s.value&&(i=this._getOrReturnCtx(e,i),b(i,{code:x.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!1,message:s.message}),n.dirty());else if(s.kind==="length"){const l=e.data.length>s.value,c=e.data.length<s.value;(l||c)&&(i=this._getOrReturnCtx(e,i),l?b(i,{code:x.too_big,maximum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}):c&&b(i,{code:x.too_small,minimum:s.value,type:"string",inclusive:!0,exact:!0,message:s.message}),n.dirty())}else if(s.kind==="email")us.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"email",code:x.invalid_string,message:s.message}),n.dirty());else if(s.kind==="emoji")$t||($t=new RegExp(ps,"u")),$t.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"emoji",code:x.invalid_string,message:s.message}),n.dirty());else if(s.kind==="uuid")as.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"uuid",code:x.invalid_string,message:s.message}),n.dirty());else if(s.kind==="nanoid")ls.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"nanoid",code:x.invalid_string,message:s.message}),n.dirty());else if(s.kind==="cuid")is.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"cuid",code:x.invalid_string,message:s.message}),n.dirty());else if(s.kind==="cuid2")ss.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"cuid2",code:x.invalid_string,message:s.message}),n.dirty());else if(s.kind==="ulid")rs.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"ulid",code:x.invalid_string,message:s.message}),n.dirty());else if(s.kind==="url")try{new URL(e.data)}catch{i=this._getOrReturnCtx(e,i),b(i,{validation:"url",code:x.invalid_string,message:s.message}),n.dirty()}else s.kind==="regex"?(s.regex.lastIndex=0,s.regex.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"regex",code:x.invalid_string,message:s.message}),n.dirty())):s.kind==="trim"?e.data=e.data.trim():s.kind==="includes"?e.data.includes(s.value,s.position)||(i=this._getOrReturnCtx(e,i),b(i,{code:x.invalid_string,validation:{includes:s.value,position:s.position},message:s.message}),n.dirty()):s.kind==="toLowerCase"?e.data=e.data.toLowerCase():s.kind==="toUpperCase"?e.data=e.data.toUpperCase():s.kind==="startsWith"?e.data.startsWith(s.value)||(i=this._getOrReturnCtx(e,i),b(i,{code:x.invalid_string,validation:{startsWith:s.value},message:s.message}),n.dirty()):s.kind==="endsWith"?e.data.endsWith(s.value)||(i=this._getOrReturnCtx(e,i),b(i,{code:x.invalid_string,validation:{endsWith:s.value},message:s.message}),n.dirty()):s.kind==="datetime"?Cs(s).test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{code:x.invalid_string,validation:"datetime",message:s.message}),n.dirty()):s.kind==="date"?xs.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{code:x.invalid_string,validation:"date",message:s.message}),n.dirty()):s.kind==="time"?bs(s).test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{code:x.invalid_string,validation:"time",message:s.message}),n.dirty()):s.kind==="duration"?ds.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"duration",code:x.invalid_string,message:s.message}),n.dirty()):s.kind==="ip"?ws(e.data,s.version)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"ip",code:x.invalid_string,message:s.message}),n.dirty()):s.kind==="jwt"?_s(e.data,s.alg)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"jwt",code:x.invalid_string,message:s.message}),n.dirty()):s.kind==="cidr"?Ts(e.data,s.version)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"cidr",code:x.invalid_string,message:s.message}),n.dirty()):s.kind==="base64"?vs.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"base64",code:x.invalid_string,message:s.message}),n.dirty()):s.kind==="base64url"?ys.test(e.data)||(i=this._getOrReturnCtx(e,i),b(i,{validation:"base64url",code:x.invalid_string,message:s.message}),n.dirty()):U.assertNever(s);return{status:n.value,value:e.data}}_regex(e,t,n){return this.refinement(i=>e.test(i),{validation:t,code:x.invalid_string,..._.errToObj(n)})}_addCheck(e){return new se({...this._def,checks:[...this._def.checks,e]})}email(e){return this._addCheck({kind:"email",..._.errToObj(e)})}url(e){return this._addCheck({kind:"url",..._.errToObj(e)})}emoji(e){return this._addCheck({kind:"emoji",..._.errToObj(e)})}uuid(e){return this._addCheck({kind:"uuid",..._.errToObj(e)})}nanoid(e){return this._addCheck({kind:"nanoid",..._.errToObj(e)})}cuid(e){return this._addCheck({kind:"cuid",..._.errToObj(e)})}cuid2(e){return this._addCheck({kind:"cuid2",..._.errToObj(e)})}ulid(e){return this._addCheck({kind:"ulid",..._.errToObj(e)})}base64(e){return this._addCheck({kind:"base64",..._.errToObj(e)})}base64url(e){return this._addCheck({kind:"base64url",..._.errToObj(e)})}jwt(e){return this._addCheck({kind:"jwt",..._.errToObj(e)})}ip(e){return this._addCheck({kind:"ip",..._.errToObj(e)})}cidr(e){return this._addCheck({kind:"cidr",..._.errToObj(e)})}datetime(e){return typeof e=="string"?this._addCheck({kind:"datetime",precision:null,offset:!1,local:!1,message:e}):this._addCheck({kind:"datetime",precision:typeof(e==null?void 0:e.precision)>"u"?null:e==null?void 0:e.precision,offset:(e==null?void 0:e.offset)??!1,local:(e==null?void 0:e.local)??!1,..._.errToObj(e==null?void 0:e.message)})}date(e){return this._addCheck({kind:"date",message:e})}time(e){return typeof e=="string"?this._addCheck({kind:"time",precision:null,message:e}):this._addCheck({kind:"time",precision:typeof(e==null?void 0:e.precision)>"u"?null:e==null?void 0:e.precision,..._.errToObj(e==null?void 0:e.message)})}duration(e){return this._addCheck({kind:"duration",..._.errToObj(e)})}regex(e,t){return this._addCheck({kind:"regex",regex:e,..._.errToObj(t)})}includes(e,t){return this._addCheck({kind:"includes",value:e,position:t==null?void 0:t.position,..._.errToObj(t==null?void 0:t.message)})}startsWith(e,t){return this._addCheck({kind:"startsWith",value:e,..._.errToObj(t)})}endsWith(e,t){return this._addCheck({kind:"endsWith",value:e,..._.errToObj(t)})}min(e,t){return this._addCheck({kind:"min",value:e,..._.errToObj(t)})}max(e,t){return this._addCheck({kind:"max",value:e,..._.errToObj(t)})}length(e,t){return this._addCheck({kind:"length",value:e,..._.errToObj(t)})}nonempty(e){return this.min(1,_.errToObj(e))}trim(){return new se({...this._def,checks:[...this._def.checks,{kind:"trim"}]})}toLowerCase(){return new se({...this._def,checks:[...this._def.checks,{kind:"toLowerCase"}]})}toUpperCase(){return new se({...this._def,checks:[...this._def.checks,{kind:"toUpperCase"}]})}get isDatetime(){return!!this._def.checks.find(e=>e.kind==="datetime")}get isDate(){return!!this._def.checks.find(e=>e.kind==="date")}get isTime(){return!!this._def.checks.find(e=>e.kind==="time")}get isDuration(){return!!this._def.checks.find(e=>e.kind==="duration")}get isEmail(){return!!this._def.checks.find(e=>e.kind==="email")}get isURL(){return!!this._def.checks.find(e=>e.kind==="url")}get isEmoji(){return!!this._def.checks.find(e=>e.kind==="emoji")}get isUUID(){return!!this._def.checks.find(e=>e.kind==="uuid")}get isNANOID(){return!!this._def.checks.find(e=>e.kind==="nanoid")}get isCUID(){return!!this._def.checks.find(e=>e.kind==="cuid")}get isCUID2(){return!!this._def.checks.find(e=>e.kind==="cuid2")}get isULID(){return!!this._def.checks.find(e=>e.kind==="ulid")}get isIP(){return!!this._def.checks.find(e=>e.kind==="ip")}get isCIDR(){return!!this._def.checks.find(e=>e.kind==="cidr")}get isBase64(){return!!this._def.checks.find(e=>e.kind==="base64")}get isBase64url(){return!!this._def.checks.find(e=>e.kind==="base64url")}get minLength(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxLength(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}}se.create=o=>new se({checks:[],typeName:A.ZodString,coerce:(o==null?void 0:o.coerce)??!1,...N(o)});function Es(o,e){const t=(o.toString().split(".")[1]||"").length,n=(e.toString().split(".")[1]||"").length,i=t>n?t:n,s=Number.parseInt(o.toFixed(i).replace(".","")),l=Number.parseInt(e.toFixed(i).replace(".",""));return s%l/10**i}class Ee extends ${constructor(){super(...arguments),this.min=this.gte,this.max=this.lte,this.step=this.multipleOf}_parse(e){if(this._def.coerce&&(e.data=Number(e.data)),this._getType(e)!==C.number){const s=this._getOrReturnCtx(e);return b(s,{code:x.invalid_type,expected:C.number,received:s.parsedType}),I}let n;const i=new K;for(const s of this._def.checks)s.kind==="int"?U.isInteger(e.data)||(n=this._getOrReturnCtx(e,n),b(n,{code:x.invalid_type,expected:"integer",received:"float",message:s.message}),i.dirty()):s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(n=this._getOrReturnCtx(e,n),b(n,{code:x.too_small,minimum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),i.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(n=this._getOrReturnCtx(e,n),b(n,{code:x.too_big,maximum:s.value,type:"number",inclusive:s.inclusive,exact:!1,message:s.message}),i.dirty()):s.kind==="multipleOf"?Es(e.data,s.value)!==0&&(n=this._getOrReturnCtx(e,n),b(n,{code:x.not_multiple_of,multipleOf:s.value,message:s.message}),i.dirty()):s.kind==="finite"?Number.isFinite(e.data)||(n=this._getOrReturnCtx(e,n),b(n,{code:x.not_finite,message:s.message}),i.dirty()):U.assertNever(s);return{status:i.value,value:e.data}}gte(e,t){return this.setLimit("min",e,!0,_.toString(t))}gt(e,t){return this.setLimit("min",e,!1,_.toString(t))}lte(e,t){return this.setLimit("max",e,!0,_.toString(t))}lt(e,t){return this.setLimit("max",e,!1,_.toString(t))}setLimit(e,t,n,i){return new Ee({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:n,message:_.toString(i)}]})}_addCheck(e){return new Ee({...this._def,checks:[...this._def.checks,e]})}int(e){return this._addCheck({kind:"int",message:_.toString(e)})}positive(e){return this._addCheck({kind:"min",value:0,inclusive:!1,message:_.toString(e)})}negative(e){return this._addCheck({kind:"max",value:0,inclusive:!1,message:_.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:0,inclusive:!0,message:_.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:0,inclusive:!0,message:_.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:_.toString(t)})}finite(e){return this._addCheck({kind:"finite",message:_.toString(e)})}safe(e){return this._addCheck({kind:"min",inclusive:!0,value:Number.MIN_SAFE_INTEGER,message:_.toString(e)})._addCheck({kind:"max",inclusive:!0,value:Number.MAX_SAFE_INTEGER,message:_.toString(e)})}get minValue(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}get isInt(){return!!this._def.checks.find(e=>e.kind==="int"||e.kind==="multipleOf"&&U.isInteger(e.value))}get isFinite(){let e=null,t=null;for(const n of this._def.checks){if(n.kind==="finite"||n.kind==="int"||n.kind==="multipleOf")return!0;n.kind==="min"?(t===null||n.value>t)&&(t=n.value):n.kind==="max"&&(e===null||n.value<e)&&(e=n.value)}return Number.isFinite(t)&&Number.isFinite(e)}}Ee.create=o=>new Ee({checks:[],typeName:A.ZodNumber,coerce:(o==null?void 0:o.coerce)||!1,...N(o)});class Se extends ${constructor(){super(...arguments),this.min=this.gte,this.max=this.lte}_parse(e){if(this._def.coerce)try{e.data=BigInt(e.data)}catch{return this._getInvalidInput(e)}if(this._getType(e)!==C.bigint)return this._getInvalidInput(e);let n;const i=new K;for(const s of this._def.checks)s.kind==="min"?(s.inclusive?e.data<s.value:e.data<=s.value)&&(n=this._getOrReturnCtx(e,n),b(n,{code:x.too_small,type:"bigint",minimum:s.value,inclusive:s.inclusive,message:s.message}),i.dirty()):s.kind==="max"?(s.inclusive?e.data>s.value:e.data>=s.value)&&(n=this._getOrReturnCtx(e,n),b(n,{code:x.too_big,type:"bigint",maximum:s.value,inclusive:s.inclusive,message:s.message}),i.dirty()):s.kind==="multipleOf"?e.data%s.value!==BigInt(0)&&(n=this._getOrReturnCtx(e,n),b(n,{code:x.not_multiple_of,multipleOf:s.value,message:s.message}),i.dirty()):U.assertNever(s);return{status:i.value,value:e.data}}_getInvalidInput(e){const t=this._getOrReturnCtx(e);return b(t,{code:x.invalid_type,expected:C.bigint,received:t.parsedType}),I}gte(e,t){return this.setLimit("min",e,!0,_.toString(t))}gt(e,t){return this.setLimit("min",e,!1,_.toString(t))}lte(e,t){return this.setLimit("max",e,!0,_.toString(t))}lt(e,t){return this.setLimit("max",e,!1,_.toString(t))}setLimit(e,t,n,i){return new Se({...this._def,checks:[...this._def.checks,{kind:e,value:t,inclusive:n,message:_.toString(i)}]})}_addCheck(e){return new Se({...this._def,checks:[...this._def.checks,e]})}positive(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!1,message:_.toString(e)})}negative(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!1,message:_.toString(e)})}nonpositive(e){return this._addCheck({kind:"max",value:BigInt(0),inclusive:!0,message:_.toString(e)})}nonnegative(e){return this._addCheck({kind:"min",value:BigInt(0),inclusive:!0,message:_.toString(e)})}multipleOf(e,t){return this._addCheck({kind:"multipleOf",value:e,message:_.toString(t)})}get minValue(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e}get maxValue(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e}}Se.create=o=>new Se({checks:[],typeName:A.ZodBigInt,coerce:(o==null?void 0:o.coerce)??!1,...N(o)});class ht extends ${_parse(e){if(this._def.coerce&&(e.data=!!e.data),this._getType(e)!==C.boolean){const n=this._getOrReturnCtx(e);return b(n,{code:x.invalid_type,expected:C.boolean,received:n.parsedType}),I}return Q(e.data)}}ht.create=o=>new ht({typeName:A.ZodBoolean,coerce:(o==null?void 0:o.coerce)||!1,...N(o)});class Fe extends ${_parse(e){if(this._def.coerce&&(e.data=new Date(e.data)),this._getType(e)!==C.date){const s=this._getOrReturnCtx(e);return b(s,{code:x.invalid_type,expected:C.date,received:s.parsedType}),I}if(Number.isNaN(e.data.getTime())){const s=this._getOrReturnCtx(e);return b(s,{code:x.invalid_date}),I}const n=new K;let i;for(const s of this._def.checks)s.kind==="min"?e.data.getTime()<s.value&&(i=this._getOrReturnCtx(e,i),b(i,{code:x.too_small,message:s.message,inclusive:!0,exact:!1,minimum:s.value,type:"date"}),n.dirty()):s.kind==="max"?e.data.getTime()>s.value&&(i=this._getOrReturnCtx(e,i),b(i,{code:x.too_big,message:s.message,inclusive:!0,exact:!1,maximum:s.value,type:"date"}),n.dirty()):U.assertNever(s);return{status:n.value,value:new Date(e.data.getTime())}}_addCheck(e){return new Fe({...this._def,checks:[...this._def.checks,e]})}min(e,t){return this._addCheck({kind:"min",value:e.getTime(),message:_.toString(t)})}max(e,t){return this._addCheck({kind:"max",value:e.getTime(),message:_.toString(t)})}get minDate(){let e=null;for(const t of this._def.checks)t.kind==="min"&&(e===null||t.value>e)&&(e=t.value);return e!=null?new Date(e):null}get maxDate(){let e=null;for(const t of this._def.checks)t.kind==="max"&&(e===null||t.value<e)&&(e=t.value);return e!=null?new Date(e):null}}Fe.create=o=>new Fe({checks:[],coerce:(o==null?void 0:o.coerce)||!1,typeName:A.ZodDate,...N(o)});class _n extends ${_parse(e){if(this._getType(e)!==C.symbol){const n=this._getOrReturnCtx(e);return b(n,{code:x.invalid_type,expected:C.symbol,received:n.parsedType}),I}return Q(e.data)}}_n.create=o=>new _n({typeName:A.ZodSymbol,...N(o)});class Tn extends ${_parse(e){if(this._getType(e)!==C.undefined){const n=this._getOrReturnCtx(e);return b(n,{code:x.invalid_type,expected:C.undefined,received:n.parsedType}),I}return Q(e.data)}}Tn.create=o=>new Tn({typeName:A.ZodUndefined,...N(o)});class En extends ${_parse(e){if(this._getType(e)!==C.null){const n=this._getOrReturnCtx(e);return b(n,{code:x.invalid_type,expected:C.null,received:n.parsedType}),I}return Q(e.data)}}En.create=o=>new En({typeName:A.ZodNull,...N(o)});class Sn extends ${constructor(){super(...arguments),this._any=!0}_parse(e){return Q(e.data)}}Sn.create=o=>new Sn({typeName:A.ZodAny,...N(o)});class Ht extends ${constructor(){super(...arguments),this._unknown=!0}_parse(e){return Q(e.data)}}Ht.create=o=>new Ht({typeName:A.ZodUnknown,...N(o)});class ve extends ${_parse(e){const t=this._getOrReturnCtx(e);return b(t,{code:x.invalid_type,expected:C.never,received:t.parsedType}),I}}ve.create=o=>new ve({typeName:A.ZodNever,...N(o)});class Mn extends ${_parse(e){if(this._getType(e)!==C.undefined){const n=this._getOrReturnCtx(e);return b(n,{code:x.invalid_type,expected:C.void,received:n.parsedType}),I}return Q(e.data)}}Mn.create=o=>new Mn({typeName:A.ZodVoid,...N(o)});class re extends ${_parse(e){const{ctx:t,status:n}=this._processInputParams(e),i=this._def;if(t.parsedType!==C.array)return b(t,{code:x.invalid_type,expected:C.array,received:t.parsedType}),I;if(i.exactLength!==null){const l=t.data.length>i.exactLength.value,c=t.data.length<i.exactLength.value;(l||c)&&(b(t,{code:l?x.too_big:x.too_small,minimum:c?i.exactLength.value:void 0,maximum:l?i.exactLength.value:void 0,type:"array",inclusive:!0,exact:!0,message:i.exactLength.message}),n.dirty())}if(i.minLength!==null&&t.data.length<i.minLength.value&&(b(t,{code:x.too_small,minimum:i.minLength.value,type:"array",inclusive:!0,exact:!1,message:i.minLength.message}),n.dirty()),i.maxLength!==null&&t.data.length>i.maxLength.value&&(b(t,{code:x.too_big,maximum:i.maxLength.value,type:"array",inclusive:!0,exact:!1,message:i.maxLength.message}),n.dirty()),t.common.async)return Promise.all([...t.data].map((l,c)=>i.type._parseAsync(new ae(t,l,t.path,c)))).then(l=>K.mergeArray(n,l));const s=[...t.data].map((l,c)=>i.type._parseSync(new ae(t,l,t.path,c)));return K.mergeArray(n,s)}get element(){return this._def.type}min(e,t){return new re({...this._def,minLength:{value:e,message:_.toString(t)}})}max(e,t){return new re({...this._def,maxLength:{value:e,message:_.toString(t)}})}length(e,t){return new re({...this._def,exactLength:{value:e,message:_.toString(t)}})}nonempty(e){return this.min(1,e)}}re.create=(o,e)=>new re({type:o,minLength:null,maxLength:null,exactLength:null,typeName:A.ZodArray,...N(e)});function De(o){if(o instanceof z){const e={};for(const t in o.shape){const n=o.shape[t];e[t]=he.create(De(n))}return new z({...o._def,shape:()=>e})}else return o instanceof re?new re({...o._def,type:De(o.element)}):o instanceof he?he.create(De(o.unwrap())):o instanceof Oe?Oe.create(De(o.unwrap())):o instanceof Me?Me.create(o.items.map(e=>De(e))):o}class z extends ${constructor(){super(...arguments),this._cached=null,this.nonstrict=this.passthrough,this.augment=this.extend}_getCached(){if(this._cached!==null)return this._cached;const e=this._def.shape(),t=U.objectKeys(e);return this._cached={shape:e,keys:t},this._cached}_parse(e){if(this._getType(e)!==C.object){const d=this._getOrReturnCtx(e);return b(d,{code:x.invalid_type,expected:C.object,received:d.parsedType}),I}const{status:n,ctx:i}=this._processInputParams(e),{shape:s,keys:l}=this._getCached(),c=[];if(!(this._def.catchall instanceof ve&&this._def.unknownKeys==="strip"))for(const d in i.data)l.includes(d)||c.push(d);const u=[];for(const d of l){const p=s[d],f=i.data[d];u.push({key:{status:"valid",value:d},value:p._parse(new ae(i,f,i.path,d)),alwaysSet:d in i.data})}if(this._def.catchall instanceof ve){const d=this._def.unknownKeys;if(d==="passthrough")for(const p of c)u.push({key:{status:"valid",value:p},value:{status:"valid",value:i.data[p]}});else if(d==="strict")c.length>0&&(b(i,{code:x.unrecognized_keys,keys:c}),n.dirty());else if(d!=="strip")throw new Error("Internal ZodObject error: invalid unknownKeys value.")}else{const d=this._def.catchall;for(const p of c){const f=i.data[p];u.push({key:{status:"valid",value:p},value:d._parse(new ae(i,f,i.path,p)),alwaysSet:p in i.data})}}return i.common.async?Promise.resolve().then(async()=>{const d=[];for(const p of u){const f=await p.key,h=await p.value;d.push({key:f,value:h,alwaysSet:p.alwaysSet})}return d}).then(d=>K.mergeObjectSync(n,d)):K.mergeObjectSync(n,u)}get shape(){return this._def.shape()}strict(e){return _.errToObj,new z({...this._def,unknownKeys:"strict",...e!==void 0?{errorMap:(t,n)=>{var s,l;const i=((l=(s=this._def).errorMap)==null?void 0:l.call(s,t,n).message)??n.defaultError;return t.code==="unrecognized_keys"?{message:_.errToObj(e).message??i}:{message:i}}}:{}})}strip(){return new z({...this._def,unknownKeys:"strip"})}passthrough(){return new z({...this._def,unknownKeys:"passthrough"})}extend(e){return new z({...this._def,shape:()=>({...this._def.shape(),...e})})}merge(e){return new z({unknownKeys:e._def.unknownKeys,catchall:e._def.catchall,shape:()=>({...this._def.shape(),...e._def.shape()}),typeName:A.ZodObject})}setKey(e,t){return this.augment({[e]:t})}catchall(e){return new z({...this._def,catchall:e})}pick(e){const t={};for(const n of U.objectKeys(e))e[n]&&this.shape[n]&&(t[n]=this.shape[n]);return new z({...this._def,shape:()=>t})}omit(e){const t={};for(const n of U.objectKeys(this.shape))e[n]||(t[n]=this.shape[n]);return new z({...this._def,shape:()=>t})}deepPartial(){return De(this)}partial(e){const t={};for(const n of U.objectKeys(this.shape)){const i=this.shape[n];e&&!e[n]?t[n]=i:t[n]=i.optional()}return new z({...this._def,shape:()=>t})}required(e){const t={};for(const n of U.objectKeys(this.shape))if(e&&!e[n])t[n]=this.shape[n];else{let s=this.shape[n];for(;s instanceof he;)s=s._def.innerType;t[n]=s}return new z({...this._def,shape:()=>t})}keyof(){return hi(U.objectKeys(this.shape))}}z.create=(o,e)=>new z({shape:()=>o,unknownKeys:"strip",catchall:ve.create(),typeName:A.ZodObject,...N(e)});z.strictCreate=(o,e)=>new z({shape:()=>o,unknownKeys:"strict",catchall:ve.create(),typeName:A.ZodObject,...N(e)});z.lazycreate=(o,e)=>new z({shape:o,unknownKeys:"strip",catchall:ve.create(),typeName:A.ZodObject,...N(e)});class mt extends ${_parse(e){const{ctx:t}=this._processInputParams(e),n=this._def.options;function i(s){for(const c of s)if(c.result.status==="valid")return c.result;for(const c of s)if(c.result.status==="dirty")return t.common.issues.push(...c.ctx.common.issues),c.result;const l=s.map(c=>new ce(c.ctx.common.issues));return b(t,{code:x.invalid_union,unionErrors:l}),I}if(t.common.async)return Promise.all(n.map(async s=>{const l={...t,common:{...t.common,issues:[]},parent:null};return{result:await s._parseAsync({data:t.data,path:t.path,parent:l}),ctx:l}})).then(i);{let s;const l=[];for(const u of n){const d={...t,common:{...t.common,issues:[]},parent:null},p=u._parseSync({data:t.data,path:t.path,parent:d});if(p.status==="valid")return p;p.status==="dirty"&&!s&&(s={result:p,ctx:d}),d.common.issues.length&&l.push(d.common.issues)}if(s)return t.common.issues.push(...s.ctx.common.issues),s.result;const c=l.map(u=>new ce(u));return b(t,{code:x.invalid_union,unionErrors:c}),I}}get options(){return this._def.options}}mt.create=(o,e)=>new mt({options:o,typeName:A.ZodUnion,...N(e)});function zt(o,e){const t=pe(o),n=pe(e);if(o===e)return{valid:!0,data:o};if(t===C.object&&n===C.object){const i=U.objectKeys(e),s=U.objectKeys(o).filter(c=>i.indexOf(c)!==-1),l={...o,...e};for(const c of s){const u=zt(o[c],e[c]);if(!u.valid)return{valid:!1};l[c]=u.data}return{valid:!0,data:l}}else if(t===C.array&&n===C.array){if(o.length!==e.length)return{valid:!1};const i=[];for(let s=0;s<o.length;s++){const l=o[s],c=e[s],u=zt(l,c);if(!u.valid)return{valid:!1};i.push(u.data)}return{valid:!0,data:i}}else return t===C.date&&n===C.date&&+o==+e?{valid:!0,data:o}:{valid:!1}}class gt extends ${_parse(e){const{status:t,ctx:n}=this._processInputParams(e),i=(s,l)=>{if(bn(s)||bn(l))return I;const c=zt(s.value,l.value);return c.valid?((Cn(s)||Cn(l))&&t.dirty(),{status:t.value,value:c.data}):(b(n,{code:x.invalid_intersection_types}),I)};return n.common.async?Promise.all([this._def.left._parseAsync({data:n.data,path:n.path,parent:n}),this._def.right._parseAsync({data:n.data,path:n.path,parent:n})]).then(([s,l])=>i(s,l)):i(this._def.left._parseSync({data:n.data,path:n.path,parent:n}),this._def.right._parseSync({data:n.data,path:n.path,parent:n}))}}gt.create=(o,e,t)=>new gt({left:o,right:e,typeName:A.ZodIntersection,...N(t)});class Me extends ${_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==C.array)return b(n,{code:x.invalid_type,expected:C.array,received:n.parsedType}),I;if(n.data.length<this._def.items.length)return b(n,{code:x.too_small,minimum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),I;!this._def.rest&&n.data.length>this._def.items.length&&(b(n,{code:x.too_big,maximum:this._def.items.length,inclusive:!0,exact:!1,type:"array"}),t.dirty());const s=[...n.data].map((l,c)=>{const u=this._def.items[c]||this._def.rest;return u?u._parse(new ae(n,l,n.path,c)):null}).filter(l=>!!l);return n.common.async?Promise.all(s).then(l=>K.mergeArray(t,l)):K.mergeArray(t,s)}get items(){return this._def.items}rest(e){return new Me({...this._def,rest:e})}}Me.create=(o,e)=>{if(!Array.isArray(o))throw new Error("You must pass an array of schemas to z.tuple([ ... ])");return new Me({items:o,typeName:A.ZodTuple,rest:null,...N(e)})};class vt extends ${get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==C.object)return b(n,{code:x.invalid_type,expected:C.object,received:n.parsedType}),I;const i=[],s=this._def.keyType,l=this._def.valueType;for(const c in n.data)i.push({key:s._parse(new ae(n,c,n.path,c)),value:l._parse(new ae(n,n.data[c],n.path,c)),alwaysSet:c in n.data});return n.common.async?K.mergeObjectAsync(t,i):K.mergeObjectSync(t,i)}get element(){return this._def.valueType}static create(e,t,n){return t instanceof $?new vt({keyType:e,valueType:t,typeName:A.ZodRecord,...N(n)}):new vt({keyType:se.create(),valueType:e,typeName:A.ZodRecord,...N(t)})}}class An extends ${get keySchema(){return this._def.keyType}get valueSchema(){return this._def.valueType}_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==C.map)return b(n,{code:x.invalid_type,expected:C.map,received:n.parsedType}),I;const i=this._def.keyType,s=this._def.valueType,l=[...n.data.entries()].map(([c,u],d)=>({key:i._parse(new ae(n,c,n.path,[d,"key"])),value:s._parse(new ae(n,u,n.path,[d,"value"]))}));if(n.common.async){const c=new Map;return Promise.resolve().then(async()=>{for(const u of l){const d=await u.key,p=await u.value;if(d.status==="aborted"||p.status==="aborted")return I;(d.status==="dirty"||p.status==="dirty")&&t.dirty(),c.set(d.value,p.value)}return{status:t.value,value:c}})}else{const c=new Map;for(const u of l){const d=u.key,p=u.value;if(d.status==="aborted"||p.status==="aborted")return I;(d.status==="dirty"||p.status==="dirty")&&t.dirty(),c.set(d.value,p.value)}return{status:t.value,value:c}}}}An.create=(o,e,t)=>new An({valueType:e,keyType:o,typeName:A.ZodMap,...N(t)});class et extends ${_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.parsedType!==C.set)return b(n,{code:x.invalid_type,expected:C.set,received:n.parsedType}),I;const i=this._def;i.minSize!==null&&n.data.size<i.minSize.value&&(b(n,{code:x.too_small,minimum:i.minSize.value,type:"set",inclusive:!0,exact:!1,message:i.minSize.message}),t.dirty()),i.maxSize!==null&&n.data.size>i.maxSize.value&&(b(n,{code:x.too_big,maximum:i.maxSize.value,type:"set",inclusive:!0,exact:!1,message:i.maxSize.message}),t.dirty());const s=this._def.valueType;function l(u){const d=new Set;for(const p of u){if(p.status==="aborted")return I;p.status==="dirty"&&t.dirty(),d.add(p.value)}return{status:t.value,value:d}}const c=[...n.data.values()].map((u,d)=>s._parse(new ae(n,u,n.path,d)));return n.common.async?Promise.all(c).then(u=>l(u)):l(c)}min(e,t){return new et({...this._def,minSize:{value:e,message:_.toString(t)}})}max(e,t){return new et({...this._def,maxSize:{value:e,message:_.toString(t)}})}size(e,t){return this.min(e,t).max(e,t)}nonempty(e){return this.min(1,e)}}et.create=(o,e)=>new et({valueType:o,minSize:null,maxSize:null,typeName:A.ZodSet,...N(e)});class Wt extends ${get schema(){return this._def.getter()}_parse(e){const{ctx:t}=this._processInputParams(e);return this._def.getter()._parse({data:t.data,path:t.path,parent:t})}}Wt.create=(o,e)=>new Wt({getter:o,typeName:A.ZodLazy,...N(e)});class In extends ${_parse(e){if(e.data!==this._def.value){const t=this._getOrReturnCtx(e);return b(t,{received:t.data,code:x.invalid_literal,expected:this._def.value}),I}return{status:"valid",value:e.data}}get value(){return this._def.value}}In.create=(o,e)=>new In({value:o,typeName:A.ZodLiteral,...N(e)});function hi(o,e){return new Ue({values:o,typeName:A.ZodEnum,...N(e)})}class Ue extends ${_parse(e){if(typeof e.data!="string"){const t=this._getOrReturnCtx(e),n=this._def.values;return b(t,{expected:U.joinValues(n),received:t.parsedType,code:x.invalid_type}),I}if(this._cache||(this._cache=new Set(this._def.values)),!this._cache.has(e.data)){const t=this._getOrReturnCtx(e),n=this._def.values;return b(t,{received:t.data,code:x.invalid_enum_value,options:n}),I}return Q(e.data)}get options(){return this._def.values}get enum(){const e={};for(const t of this._def.values)e[t]=t;return e}get Values(){const e={};for(const t of this._def.values)e[t]=t;return e}get Enum(){const e={};for(const t of this._def.values)e[t]=t;return e}extract(e,t=this._def){return Ue.create(e,{...this._def,...t})}exclude(e,t=this._def){return Ue.create(this.options.filter(n=>!e.includes(n)),{...this._def,...t})}}Ue.create=hi;class kn extends ${_parse(e){const t=U.getValidEnumValues(this._def.values),n=this._getOrReturnCtx(e);if(n.parsedType!==C.string&&n.parsedType!==C.number){const i=U.objectValues(t);return b(n,{expected:U.joinValues(i),received:n.parsedType,code:x.invalid_type}),I}if(this._cache||(this._cache=new Set(U.getValidEnumValues(this._def.values))),!this._cache.has(e.data)){const i=U.objectValues(t);return b(n,{received:n.data,code:x.invalid_enum_value,options:i}),I}return Q(e.data)}get enum(){return this._def.values}}kn.create=(o,e)=>new kn({values:o,typeName:A.ZodNativeEnum,...N(e)});class yt extends ${unwrap(){return this._def.type}_parse(e){const{ctx:t}=this._processInputParams(e);if(t.parsedType!==C.promise&&t.common.async===!1)return b(t,{code:x.invalid_type,expected:C.promise,received:t.parsedType}),I;const n=t.parsedType===C.promise?t.data:Promise.resolve(t.data);return Q(n.then(i=>this._def.type.parseAsync(i,{path:t.path,errorMap:t.common.contextualErrorMap})))}}yt.create=(o,e)=>new yt({type:o,typeName:A.ZodPromise,...N(e)});class Ve extends ${innerType(){return this._def.schema}sourceType(){return this._def.schema._def.typeName===A.ZodEffects?this._def.schema.sourceType():this._def.schema}_parse(e){const{status:t,ctx:n}=this._processInputParams(e),i=this._def.effect||null,s={addIssue:l=>{b(n,l),l.fatal?t.abort():t.dirty()},get path(){return n.path}};if(s.addIssue=s.addIssue.bind(s),i.type==="preprocess"){const l=i.transform(n.data,s);if(n.common.async)return Promise.resolve(l).then(async c=>{if(t.value==="aborted")return I;const u=await this._def.schema._parseAsync({data:c,path:n.path,parent:n});return u.status==="aborted"?I:u.status==="dirty"||t.value==="dirty"?Ye(u.value):u});{if(t.value==="aborted")return I;const c=this._def.schema._parseSync({data:l,path:n.path,parent:n});return c.status==="aborted"?I:c.status==="dirty"||t.value==="dirty"?Ye(c.value):c}}if(i.type==="refinement"){const l=c=>{const u=i.refinement(c,s);if(n.common.async)return Promise.resolve(u);if(u instanceof Promise)throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");return c};if(n.common.async===!1){const c=this._def.schema._parseSync({data:n.data,path:n.path,parent:n});return c.status==="aborted"?I:(c.status==="dirty"&&t.dirty(),l(c.value),{status:t.value,value:c.value})}else return this._def.schema._parseAsync({data:n.data,path:n.path,parent:n}).then(c=>c.status==="aborted"?I:(c.status==="dirty"&&t.dirty(),l(c.value).then(()=>({status:t.value,value:c.value}))))}if(i.type==="transform")if(n.common.async===!1){const l=this._def.schema._parseSync({data:n.data,path:n.path,parent:n});if(!Le(l))return I;const c=i.transform(l.value,s);if(c instanceof Promise)throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");return{status:t.value,value:c}}else return this._def.schema._parseAsync({data:n.data,path:n.path,parent:n}).then(l=>Le(l)?Promise.resolve(i.transform(l.value,s)).then(c=>({status:t.value,value:c})):I);U.assertNever(i)}}Ve.create=(o,e,t)=>new Ve({schema:o,typeName:A.ZodEffects,effect:e,...N(t)});Ve.createWithPreprocess=(o,e,t)=>new Ve({schema:e,effect:{type:"preprocess",transform:o},typeName:A.ZodEffects,...N(t)});class he extends ${_parse(e){return this._getType(e)===C.undefined?Q(void 0):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}he.create=(o,e)=>new he({innerType:o,typeName:A.ZodOptional,...N(e)});class Oe extends ${_parse(e){return this._getType(e)===C.null?Q(null):this._def.innerType._parse(e)}unwrap(){return this._def.innerType}}Oe.create=(o,e)=>new Oe({innerType:o,typeName:A.ZodNullable,...N(e)});class Jt extends ${_parse(e){const{ctx:t}=this._processInputParams(e);let n=t.data;return t.parsedType===C.undefined&&(n=this._def.defaultValue()),this._def.innerType._parse({data:n,path:t.path,parent:t})}removeDefault(){return this._def.innerType}}Jt.create=(o,e)=>new Jt({innerType:o,typeName:A.ZodDefault,defaultValue:typeof e.default=="function"?e.default:()=>e.default,...N(e)});class Yt extends ${_parse(e){const{ctx:t}=this._processInputParams(e),n={...t,common:{...t.common,issues:[]}},i=this._def.innerType._parse({data:n.data,path:n.path,parent:{...n}});return ft(i)?i.then(s=>({status:"valid",value:s.status==="valid"?s.value:this._def.catchValue({get error(){return new ce(n.common.issues)},input:n.data})})):{status:"valid",value:i.status==="valid"?i.value:this._def.catchValue({get error(){return new ce(n.common.issues)},input:n.data})}}removeCatch(){return this._def.innerType}}Yt.create=(o,e)=>new Yt({innerType:o,typeName:A.ZodCatch,catchValue:typeof e.catch=="function"?e.catch:()=>e.catch,...N(e)});class Pn extends ${_parse(e){if(this._getType(e)!==C.nan){const n=this._getOrReturnCtx(e);return b(n,{code:x.invalid_type,expected:C.nan,received:n.parsedType}),I}return{status:"valid",value:e.data}}}Pn.create=o=>new Pn({typeName:A.ZodNaN,...N(o)});class Ss extends ${_parse(e){const{ctx:t}=this._processInputParams(e),n=t.data;return this._def.type._parse({data:n,path:t.path,parent:t})}unwrap(){return this._def.type}}class ln extends ${_parse(e){const{status:t,ctx:n}=this._processInputParams(e);if(n.common.async)return(async()=>{const s=await this._def.in._parseAsync({data:n.data,path:n.path,parent:n});return s.status==="aborted"?I:s.status==="dirty"?(t.dirty(),Ye(s.value)):this._def.out._parseAsync({data:s.value,path:n.path,parent:n})})();{const i=this._def.in._parseSync({data:n.data,path:n.path,parent:n});return i.status==="aborted"?I:i.status==="dirty"?(t.dirty(),{status:"dirty",value:i.value}):this._def.out._parseSync({data:i.value,path:n.path,parent:n})}}static create(e,t){return new ln({in:e,out:t,typeName:A.ZodPipeline})}}class Kt extends ${_parse(e){const t=this._def.innerType._parse(e),n=i=>(Le(i)&&(i.value=Object.freeze(i.value)),i);return ft(t)?t.then(i=>n(i)):n(t)}unwrap(){return this._def.innerType}}Kt.create=(o,e)=>new Kt({innerType:o,typeName:A.ZodReadonly,...N(e)});var A;(function(o){o.ZodString="ZodString",o.ZodNumber="ZodNumber",o.ZodNaN="ZodNaN",o.ZodBigInt="ZodBigInt",o.ZodBoolean="ZodBoolean",o.ZodDate="ZodDate",o.ZodSymbol="ZodSymbol",o.ZodUndefined="ZodUndefined",o.ZodNull="ZodNull",o.ZodAny="ZodAny",o.ZodUnknown="ZodUnknown",o.ZodNever="ZodNever",o.ZodVoid="ZodVoid",o.ZodArray="ZodArray",o.ZodObject="ZodObject",o.ZodUnion="ZodUnion",o.ZodDiscriminatedUnion="ZodDiscriminatedUnion",o.ZodIntersection="ZodIntersection",o.ZodTuple="ZodTuple",o.ZodRecord="ZodRecord",o.ZodMap="ZodMap",o.ZodSet="ZodSet",o.ZodFunction="ZodFunction",o.ZodLazy="ZodLazy",o.ZodLiteral="ZodLiteral",o.ZodEnum="ZodEnum",o.ZodEffects="ZodEffects",o.ZodNativeEnum="ZodNativeEnum",o.ZodOptional="ZodOptional",o.ZodNullable="ZodNullable",o.ZodDefault="ZodDefault",o.ZodCatch="ZodCatch",o.ZodPromise="ZodPromise",o.ZodBranded="ZodBranded",o.ZodPipeline="ZodPipeline",o.ZodReadonly="ZodReadonly"})(A||(A={}));const Ce=se.create,Rn=Ee.create;Se.create;const Ms=ht.create;Fe.create;const Dn=Ht.create;ve.create;const Ke=re.create,As=z.create,Is=mt.create;gt.create;Me.create;const ks=vt.create,Ps=Wt.create,Rs=Ue.create;yt.create;he.create;Oe.create;const Re={string:o=>se.create({...o,coerce:!0}),number:o=>Ee.create({...o,coerce:!0}),boolean:o=>ht.create({...o,coerce:!0}),bigint:o=>Se.create({...o,coerce:!0}),date:o=>Fe.create({...o,coerce:!0})};/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */let Ds,Ns;function $s(){return{geminiUrl:Ds,vertexUrl:Ns}}function Ls(o,e,t){var n,i,s;if(!(!((n=o.httpOptions)===null||n===void 0)&&n.baseUrl)){const l=$s();return o.vertexai?(i=l.vertexUrl)!==null&&i!==void 0?i:e:(s=l.geminiUrl)!==null&&s!==void 0?s:t}return o.httpOptions.baseUrl}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class it{}function S(o,e){const t=/\{([^}]+)\}/g;return o.replace(t,(n,i)=>{if(Object.prototype.hasOwnProperty.call(e,i)){const s=e[i];return s!=null?String(s):""}else throw new Error(`Key '${i}' not found in valueMap.`)})}function a(o,e,t){for(let s=0;s<e.length-1;s++){const l=e[s];if(l.endsWith("[]")){const c=l.slice(0,-2);if(!(c in o))if(Array.isArray(t))o[c]=Array.from({length:t.length},()=>({}));else throw new Error(`Value must be a list given an array path ${l}`);if(Array.isArray(o[c])){const u=o[c];if(Array.isArray(t))for(let d=0;d<u.length;d++){const p=u[d];a(p,e.slice(s+1),t[d])}else for(const d of u)a(d,e.slice(s+1),t)}return}else if(l.endsWith("[0]")){const c=l.slice(0,-3);c in o||(o[c]=[{}]);const u=o[c];a(u[0],e.slice(s+1),t);return}(!o[l]||typeof o[l]!="object")&&(o[l]={}),o=o[l]}const n=e[e.length-1],i=o[n];if(i!==void 0){if(!t||typeof t=="object"&&Object.keys(t).length===0||t===i)return;if(typeof i=="object"&&typeof t=="object"&&i!==null&&t!==null)Object.assign(i,t);else throw new Error(`Cannot set value for an existing key. Key: ${n}`)}else o[n]=t}function r(o,e){try{if(e.length===1&&e[0]==="_self")return o;for(let t=0;t<e.length;t++){if(typeof o!="object"||o===null)return;const n=e[t];if(n.endsWith("[]")){const i=n.slice(0,-2);if(i in o){const s=o[i];return Array.isArray(s)?s.map(l=>r(l,e.slice(t+1))):void 0}else return}else o=o[n]}return o}catch(t){if(t instanceof TypeError)return;throw t}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Nn;(function(o){o.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",o.OUTCOME_OK="OUTCOME_OK",o.OUTCOME_FAILED="OUTCOME_FAILED",o.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"})(Nn||(Nn={}));var $n;(function(o){o.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",o.PYTHON="PYTHON"})($n||($n={}));var Ln;(function(o){o.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",o.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",o.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",o.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",o.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",o.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(Ln||(Ln={}));var Fn;(function(o){o.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",o.SEVERITY="SEVERITY",o.PROBABILITY="PROBABILITY"})(Fn||(Fn={}));var Un;(function(o){o.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE",o.OFF="OFF"})(Un||(Un={}));var ie;(function(o){o.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",o.STRING="STRING",o.NUMBER="NUMBER",o.INTEGER="INTEGER",o.BOOLEAN="BOOLEAN",o.ARRAY="ARRAY",o.OBJECT="OBJECT"})(ie||(ie={}));var Vn;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.MODE_DYNAMIC="MODE_DYNAMIC"})(Vn||(Vn={}));var On;(function(o){o.AUTH_TYPE_UNSPECIFIED="AUTH_TYPE_UNSPECIFIED",o.NO_AUTH="NO_AUTH",o.API_KEY_AUTH="API_KEY_AUTH",o.HTTP_BASIC_AUTH="HTTP_BASIC_AUTH",o.GOOGLE_SERVICE_ACCOUNT_AUTH="GOOGLE_SERVICE_ACCOUNT_AUTH",o.OAUTH="OAUTH",o.OIDC_AUTH="OIDC_AUTH"})(On||(On={}));var Bn;(function(o){o.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",o.STOP="STOP",o.MAX_TOKENS="MAX_TOKENS",o.SAFETY="SAFETY",o.RECITATION="RECITATION",o.LANGUAGE="LANGUAGE",o.OTHER="OTHER",o.BLOCKLIST="BLOCKLIST",o.PROHIBITED_CONTENT="PROHIBITED_CONTENT",o.SPII="SPII",o.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",o.IMAGE_SAFETY="IMAGE_SAFETY"})(Bn||(Bn={}));var Gn;(function(o){o.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",o.NEGLIGIBLE="NEGLIGIBLE",o.LOW="LOW",o.MEDIUM="MEDIUM",o.HIGH="HIGH"})(Gn||(Gn={}));var qn;(function(o){o.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",o.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",o.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",o.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",o.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(qn||(qn={}));var Hn;(function(o){o.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",o.SAFETY="SAFETY",o.OTHER="OTHER",o.BLOCKLIST="BLOCKLIST",o.PROHIBITED_CONTENT="PROHIBITED_CONTENT"})(Hn||(Hn={}));var zn;(function(o){o.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",o.ON_DEMAND="ON_DEMAND",o.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"})(zn||(zn={}));var xt;(function(o){o.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",o.TEXT="TEXT",o.IMAGE="IMAGE",o.AUDIO="AUDIO"})(xt||(xt={}));var Wn;(function(o){o.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",o.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",o.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",o.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"})(Wn||(Wn={}));var Zt;(function(o){o.JOB_STATE_UNSPECIFIED="JOB_STATE_UNSPECIFIED",o.JOB_STATE_QUEUED="JOB_STATE_QUEUED",o.JOB_STATE_PENDING="JOB_STATE_PENDING",o.JOB_STATE_RUNNING="JOB_STATE_RUNNING",o.JOB_STATE_SUCCEEDED="JOB_STATE_SUCCEEDED",o.JOB_STATE_FAILED="JOB_STATE_FAILED",o.JOB_STATE_CANCELLING="JOB_STATE_CANCELLING",o.JOB_STATE_CANCELLED="JOB_STATE_CANCELLED",o.JOB_STATE_PAUSED="JOB_STATE_PAUSED",o.JOB_STATE_EXPIRED="JOB_STATE_EXPIRED",o.JOB_STATE_UPDATING="JOB_STATE_UPDATING",o.JOB_STATE_PARTIALLY_SUCCEEDED="JOB_STATE_PARTIALLY_SUCCEEDED"})(Zt||(Zt={}));var Jn;(function(o){o.ADAPTER_SIZE_UNSPECIFIED="ADAPTER_SIZE_UNSPECIFIED",o.ADAPTER_SIZE_ONE="ADAPTER_SIZE_ONE",o.ADAPTER_SIZE_TWO="ADAPTER_SIZE_TWO",o.ADAPTER_SIZE_FOUR="ADAPTER_SIZE_FOUR",o.ADAPTER_SIZE_EIGHT="ADAPTER_SIZE_EIGHT",o.ADAPTER_SIZE_SIXTEEN="ADAPTER_SIZE_SIXTEEN",o.ADAPTER_SIZE_THIRTY_TWO="ADAPTER_SIZE_THIRTY_TWO"})(Jn||(Jn={}));var Yn;(function(o){o.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",o.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",o.BALANCED="BALANCED",o.PRIORITIZE_COST="PRIORITIZE_COST"})(Yn||(Yn={}));var Kn;(function(o){o.UNSPECIFIED="UNSPECIFIED",o.BLOCKING="BLOCKING",o.NON_BLOCKING="NON_BLOCKING"})(Kn||(Kn={}));var Zn;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.MODE_DYNAMIC="MODE_DYNAMIC"})(Zn||(Zn={}));var Xn;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.AUTO="AUTO",o.ANY="ANY",o.NONE="NONE"})(Xn||(Xn={}));var Qn;(function(o){o.URL_RETRIEVAL_STATUS_UNSPECIFIED="URL_RETRIEVAL_STATUS_UNSPECIFIED",o.URL_RETRIEVAL_STATUS_SUCCESS="URL_RETRIEVAL_STATUS_SUCCESS",o.URL_RETRIEVAL_STATUS_ERROR="URL_RETRIEVAL_STATUS_ERROR"})(Qn||(Qn={}));var jn;(function(o){o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE"})(jn||(jn={}));var eo;(function(o){o.DONT_ALLOW="DONT_ALLOW",o.ALLOW_ADULT="ALLOW_ADULT",o.ALLOW_ALL="ALLOW_ALL"})(eo||(eo={}));var to;(function(o){o.auto="auto",o.en="en",o.ja="ja",o.ko="ko",o.hi="hi"})(to||(to={}));var no;(function(o){o.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",o.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",o.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",o.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",o.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"})(no||(no={}));var oo;(function(o){o.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",o.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",o.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",o.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"})(oo||(oo={}));var io;(function(o){o.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",o.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",o.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",o.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"})(io||(io={}));var so;(function(o){o.EDIT_MODE_DEFAULT="EDIT_MODE_DEFAULT",o.EDIT_MODE_INPAINT_REMOVAL="EDIT_MODE_INPAINT_REMOVAL",o.EDIT_MODE_INPAINT_INSERTION="EDIT_MODE_INPAINT_INSERTION",o.EDIT_MODE_OUTPAINT="EDIT_MODE_OUTPAINT",o.EDIT_MODE_CONTROLLED_EDITING="EDIT_MODE_CONTROLLED_EDITING",o.EDIT_MODE_STYLE="EDIT_MODE_STYLE",o.EDIT_MODE_BGSWAP="EDIT_MODE_BGSWAP",o.EDIT_MODE_PRODUCT_IMAGE="EDIT_MODE_PRODUCT_IMAGE"})(so||(so={}));var ro;(function(o){o.STATE_UNSPECIFIED="STATE_UNSPECIFIED",o.PROCESSING="PROCESSING",o.ACTIVE="ACTIVE",o.FAILED="FAILED"})(ro||(ro={}));var ao;(function(o){o.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",o.UPLOADED="UPLOADED",o.GENERATED="GENERATED"})(ao||(ao={}));var lo;(function(o){o.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",o.TEXT="TEXT",o.IMAGE="IMAGE",o.VIDEO="VIDEO",o.AUDIO="AUDIO",o.DOCUMENT="DOCUMENT"})(lo||(lo={}));var co;(function(o){o.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",o.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",o.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"})(co||(co={}));var uo;(function(o){o.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",o.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",o.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"})(uo||(uo={}));var po;(function(o){o.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",o.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",o.NO_INTERRUPTION="NO_INTERRUPTION"})(po||(po={}));var fo;(function(o){o.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",o.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",o.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"})(fo||(fo={}));var ho;(function(o){o.SCHEDULING_UNSPECIFIED="SCHEDULING_UNSPECIFIED",o.SILENT="SILENT",o.WHEN_IDLE="WHEN_IDLE",o.INTERRUPT="INTERRUPT"})(ho||(ho={}));var mo;(function(o){o.SCALE_UNSPECIFIED="SCALE_UNSPECIFIED",o.C_MAJOR_A_MINOR="C_MAJOR_A_MINOR",o.D_FLAT_MAJOR_B_FLAT_MINOR="D_FLAT_MAJOR_B_FLAT_MINOR",o.D_MAJOR_B_MINOR="D_MAJOR_B_MINOR",o.E_FLAT_MAJOR_C_MINOR="E_FLAT_MAJOR_C_MINOR",o.E_MAJOR_D_FLAT_MINOR="E_MAJOR_D_FLAT_MINOR",o.F_MAJOR_D_MINOR="F_MAJOR_D_MINOR",o.G_FLAT_MAJOR_E_FLAT_MINOR="G_FLAT_MAJOR_E_FLAT_MINOR",o.G_MAJOR_E_MINOR="G_MAJOR_E_MINOR",o.A_FLAT_MAJOR_F_MINOR="A_FLAT_MAJOR_F_MINOR",o.A_MAJOR_G_FLAT_MINOR="A_MAJOR_G_FLAT_MINOR",o.B_FLAT_MAJOR_G_MINOR="B_FLAT_MAJOR_G_MINOR",o.B_MAJOR_A_FLAT_MINOR="B_MAJOR_A_FLAT_MINOR"})(mo||(mo={}));var go;(function(o){o.MUSIC_GENERATION_MODE_UNSPECIFIED="MUSIC_GENERATION_MODE_UNSPECIFIED",o.QUALITY="QUALITY",o.DIVERSITY="DIVERSITY"})(go||(go={}));var $e;(function(o){o.PLAYBACK_CONTROL_UNSPECIFIED="PLAYBACK_CONTROL_UNSPECIFIED",o.PLAY="PLAY",o.PAUSE="PAUSE",o.STOP="STOP",o.RESET_CONTEXT="RESET_CONTEXT"})($e||($e={}));class We{get text(){var e,t,n,i,s,l,c,u;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let d="",p=!1;const f=[];for(const h of(u=(c=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)!==null&&u!==void 0?u:[]){for(const[m,g]of Object.entries(h))m!=="text"&&m!=="thought"&&(g!==null||g!==void 0)&&f.push(m);if(typeof h.text=="string"){if(typeof h.thought=="boolean"&&h.thought)continue;p=!0,d+=h.text}}return f.length>0&&console.warn(`there are non-text parts ${f} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),p?d:void 0}get data(){var e,t,n,i,s,l,c,u;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning data from the first one.");let d="";const p=[];for(const f of(u=(c=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)!==null&&u!==void 0?u:[]){for(const[h,m]of Object.entries(f))h!=="inlineData"&&(m!==null||m!==void 0)&&p.push(h);f.inlineData&&typeof f.inlineData.data=="string"&&(d+=atob(f.inlineData.data))}return p.length>0&&console.warn(`there are non-data parts ${p} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),d.length>0?btoa(d):void 0}get functionCalls(){var e,t,n,i,s,l,c,u;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const d=(u=(c=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(p=>p.functionCall).map(p=>p.functionCall).filter(p=>p!==void 0);if((d==null?void 0:d.length)!==0)return d}get executableCode(){var e,t,n,i,s,l,c,u,d;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const p=(u=(c=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(f=>f.executableCode).map(f=>f.executableCode).filter(f=>f!==void 0);if((p==null?void 0:p.length)!==0)return(d=p==null?void 0:p[0])===null||d===void 0?void 0:d.code}get codeExecutionResult(){var e,t,n,i,s,l,c,u,d;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const p=(u=(c=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||c===void 0?void 0:c.parts)===null||u===void 0?void 0:u.filter(f=>f.codeExecutionResult).map(f=>f.codeExecutionResult).filter(f=>f!==void 0);if((p==null?void 0:p.length)!==0)return(d=p==null?void 0:p[0])===null||d===void 0?void 0:d.output}}class vo{}class yo{}class Fs{}class Us{}class xo{}class bo{}class Co{}class Vs{}class wo{}class _o{}class To{}class Os{}class Xt{constructor(e){const t={};for(const n of e.headers.entries())t[n[0]]=n[1];this.headers=t,this.responseInternal=e}json(){return this.responseInternal.json()}}class Bs{}class Gs{}class qs{get text(){var e,t,n;let i="",s=!1;const l=[];for(const c of(n=(t=(e=this.serverContent)===null||e===void 0?void 0:e.modelTurn)===null||t===void 0?void 0:t.parts)!==null&&n!==void 0?n:[]){for(const[u,d]of Object.entries(c))u!=="text"&&u!=="thought"&&d!==null&&l.push(u);if(typeof c.text=="string"){if(typeof c.thought=="boolean"&&c.thought)continue;s=!0,i+=c.text}}return l.length>0&&console.warn(`there are non-text parts ${l} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),s?i:void 0}get data(){var e,t,n;let i="";const s=[];for(const l of(n=(t=(e=this.serverContent)===null||e===void 0?void 0:e.modelTurn)===null||t===void 0?void 0:t.parts)!==null&&n!==void 0?n:[]){for(const[c,u]of Object.entries(l))c!=="inlineData"&&u!==null&&s.push(c);l.inlineData&&typeof l.inlineData.data=="string"&&(i+=atob(l.inlineData.data))}return s.length>0&&console.warn(`there are non-data parts ${s} in the response, returning concatenation of all data parts. Please refer to the non data parts for a full response from model.`),i.length>0?btoa(i):void 0}}class Hs{get audioChunk(){if(this.serverContent&&this.serverContent.audioChunks&&this.serverContent.audioChunks.length>0)return this.serverContent.audioChunks[0]}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function q(o,e){if(!e||typeof e!="string")throw new Error("model is required and must be a string");if(o.isVertexAI()){if(e.startsWith("publishers/")||e.startsWith("projects/")||e.startsWith("models/"))return e;if(e.indexOf("/")>=0){const t=e.split("/",2);return`publishers/${t[0]}/models/${t[1]}`}else return`publishers/google/models/${e}`}else return e.startsWith("models/")||e.startsWith("tunedModels/")?e:`models/${e}`}function mi(o,e){const t=q(o,e);return t?t.startsWith("publishers/")&&o.isVertexAI()?`projects/${o.getProject()}/locations/${o.getLocation()}/${t}`:t.startsWith("models/")&&o.isVertexAI()?`projects/${o.getProject()}/locations/${o.getLocation()}/publishers/google/${t}`:t:""}function gi(o,e){return Array.isArray(e)?e.map(t=>bt(o,t)):[bt(o,e)]}function bt(o,e){if(typeof e=="object"&&e!==null)return e;throw new Error(`Could not parse input as Blob. Unsupported blob type: ${typeof e}`)}function zs(o,e){const t=bt(o,e);if(t.mimeType&&t.mimeType.startsWith("image/"))return t;throw new Error(`Unsupported mime type: ${t.mimeType}`)}function Ws(o,e){const t=bt(o,e);if(t.mimeType&&t.mimeType.startsWith("audio/"))return t;throw new Error(`Unsupported mime type: ${t.mimeType}`)}function Eo(o,e){if(e==null)throw new Error("PartUnion is required");if(typeof e=="object")return e;if(typeof e=="string")return{text:e};throw new Error(`Unsupported part type: ${typeof e}`)}function vi(o,e){if(e==null||Array.isArray(e)&&e.length===0)throw new Error("PartListUnion is required");return Array.isArray(e)?e.map(t=>Eo(o,t)):[Eo(o,e)]}function Qt(o){return o!=null&&typeof o=="object"&&"parts"in o&&Array.isArray(o.parts)}function So(o){return o!=null&&typeof o=="object"&&"functionCall"in o}function Mo(o){return o!=null&&typeof o=="object"&&"functionResponse"in o}function Z(o,e){if(e==null)throw new Error("ContentUnion is required");return Qt(e)?e:{role:"user",parts:vi(o,e)}}function yi(o,e){if(!e)return[];if(o.isVertexAI()&&Array.isArray(e))return e.flatMap(t=>{const n=Z(o,t);return n.parts&&n.parts.length>0&&n.parts[0].text!==void 0?[n.parts[0].text]:[]});if(o.isVertexAI()){const t=Z(o,e);return t.parts&&t.parts.length>0&&t.parts[0].text!==void 0?[t.parts[0].text]:[]}return Array.isArray(e)?e.map(t=>Z(o,t)):[Z(o,e)]}function ee(o,e){if(e==null||Array.isArray(e)&&e.length===0)throw new Error("contents are required");if(!Array.isArray(e)){if(So(e)||Mo(e))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[Z(o,e)]}const t=[],n=[],i=Qt(e[0]);for(const s of e){const l=Qt(s);if(l!=i)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(l)t.push(s);else{if(So(s)||Mo(s))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");n.push(s)}}return i||t.push({role:"user",parts:vi(o,n)}),t}const Ao=Rs(["string","number","integer","object","array","boolean","null"]),Js=Is([Ao,Ke(Ao)]);function Ys(o=!0){const e=Ps(()=>{const t=As({type:Js.optional(),format:Ce().optional(),title:Ce().optional(),description:Ce().optional(),default:Dn().optional(),items:e.optional(),minItems:Re.string().optional(),maxItems:Re.string().optional(),enum:Ke(Dn()).optional(),properties:ks(Ce(),e).optional(),required:Ke(Ce()).optional(),minProperties:Re.string().optional(),maxProperties:Re.string().optional(),propertyOrdering:Ke(Ce()).optional(),minimum:Rn().optional(),maximum:Rn().optional(),minLength:Re.string().optional(),maxLength:Re.string().optional(),pattern:Ce().optional(),anyOf:Ke(e).optional(),additionalProperties:Ms().optional()});return o?t.strict():t});return e}function Ks(o,e){o.includes("null")&&(e.nullable=!0);const t=o.filter(n=>n!=="null");if(t.length===1)e.type=Object.keys(ie).includes(t[0].toUpperCase())?ie[t[0].toUpperCase()]:ie.TYPE_UNSPECIFIED;else{e.anyOf=[];for(const n of t)e.anyOf.push({type:Object.keys(ie).includes(n.toUpperCase())?ie[n.toUpperCase()]:ie.TYPE_UNSPECIFIED})}}function Ze(o){const e={},t=["items"],n=["anyOf"],i=["properties"];if(o.type&&o.anyOf)throw new Error("type and anyOf cannot be both populated.");const s=o.anyOf;s!=null&&s.length==2&&(s[0].type==="null"?(e.nullable=!0,o=s[1]):s[1].type==="null"&&(e.nullable=!0,o=s[0])),o.type instanceof Array&&Ks(o.type,e);for(const[l,c]of Object.entries(o))if(c!=null)if(l=="type"){if(c==="null")throw new Error("type: null can not be the only possible type for the field.");if(c instanceof Array)continue;e.type=Object.keys(ie).includes(c.toUpperCase())?c.toUpperCase():ie.TYPE_UNSPECIFIED}else if(t.includes(l))e[l]=Ze(c);else if(n.includes(l)){const u=[];for(const d of c){if(d.type=="null"){e.nullable=!0;continue}u.push(Ze(d))}e[l]=u}else if(i.includes(l)){const u={};for(const[d,p]of Object.entries(c))u[d]=Ze(p);e[l]=u}else{if(l==="additionalProperties")continue;e[l]=c}return e}function Ct(o,e){if(Object.keys(e).includes("$schema")){delete e.$schema;const t=Ys().parse(e);return Ze(t)}else return Ze(e)}function xi(o,e){if(typeof e=="object")return e;if(typeof e=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:e}}};throw new Error(`Unsupported speechConfig type: ${typeof e}`)}function bi(o,e){if("multiSpeakerVoiceConfig"in e)throw new Error("multiSpeakerVoiceConfig is not supported in the live API.");return e}function Mt(o,e){if(e.functionDeclarations)for(const t of e.functionDeclarations)t.parameters&&(t.parameters=Ct(o,t.parameters)),t.response&&(t.response=Ct(o,t.response));return e}function At(o,e){if(e==null)throw new Error("tools is required");if(!Array.isArray(e))throw new Error("tools is required and must be an array of Tools");const t=[];for(const n of e)t.push(n);return t}function Zs(o,e,t,n=1){const i=!e.startsWith(`${t}/`)&&e.split("/").length===n;return o.isVertexAI()?e.startsWith("projects/")?e:e.startsWith("locations/")?`projects/${o.getProject()}/${e}`:e.startsWith(`${t}/`)?`projects/${o.getProject()}/locations/${o.getLocation()}/${e}`:i?`projects/${o.getProject()}/locations/${o.getLocation()}/${t}/${e}`:e:i?`${t}/${e}`:e}function xe(o,e){if(typeof e!="string")throw new Error("name must be a string");return Zs(o,e,"cachedContents")}function Ci(o,e){switch(e){case"STATE_UNSPECIFIED":return"JOB_STATE_UNSPECIFIED";case"CREATING":return"JOB_STATE_RUNNING";case"ACTIVE":return"JOB_STATE_SUCCEEDED";case"FAILED":return"JOB_STATE_FAILED";default:return e}}function be(o,e){if(typeof e!="string")throw new Error("fromImageBytes must be a string");return e}function Xs(o){return o!=null&&typeof o=="object"&&"name"in o}function Qs(o){return o!=null&&typeof o=="object"&&"video"in o}function js(o){return o!=null&&typeof o=="object"&&"uri"in o}function wi(o,e){var t;let n;if(Xs(e)&&(n=e.name),!(js(e)&&(n=e.uri,n===void 0))&&!(Qs(e)&&(n=(t=e.video)===null||t===void 0?void 0:t.uri,n===void 0))){if(typeof e=="string"&&(n=e),n===void 0)throw new Error("Could not extract file name from the provided input.");if(n.startsWith("https://")){const s=n.split("files/")[1].match(/[a-z0-9]+/);if(s===null)throw new Error(`Could not extract file name from URI ${n}`);n=s[0]}else n.startsWith("files/")&&(n=n.split("files/")[1]);return n}}function _i(o,e){let t;return o.isVertexAI()?t=e?"publishers/google/models":"models":t=e?"models":"tunedModels",t}function Ti(o,e){for(const t of["models","tunedModels","publisherModels"])if(er(e,t))return e[t];return[]}function er(o,e){return o!==null&&typeof o=="object"&&e in o}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function tr(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function nr(o,e){const t={};if(r(e,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=r(e,["data"]);n!=null&&a(t,["data"],n);const i=r(e,["mimeType"]);return i!=null&&a(t,["mimeType"],i),t}function or(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],tr(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],nr(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function Io(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>or(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function ir(o,e){const t={},n=r(e,["behavior"]);n!=null&&a(t,["behavior"],n);const i=r(e,["description"]);i!=null&&a(t,["description"],i);const s=r(e,["name"]);s!=null&&a(t,["name"],s);const l=r(e,["parameters"]);l!=null&&a(t,["parameters"],l);const c=r(e,["response"]);return c!=null&&a(t,["response"],c),t}function sr(o,e){const t={},n=r(e,["startTime"]);n!=null&&a(t,["startTime"],n);const i=r(e,["endTime"]);return i!=null&&a(t,["endTime"],i),t}function rr(o,e){const t={},n=r(e,["timeRangeFilter"]);return n!=null&&a(t,["timeRangeFilter"],sr(o,n)),t}function ar(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["dynamicThreshold"]);return i!=null&&a(t,["dynamicThreshold"],i),t}function lr(o,e){const t={},n=r(e,["dynamicRetrievalConfig"]);return n!=null&&a(t,["dynamicRetrievalConfig"],ar(o,n)),t}function cr(){return{}}function dr(o,e){const t={},n=r(e,["functionDeclarations"]);if(n!=null){let u=n;Array.isArray(u)&&(u=u.map(d=>ir(o,d))),a(t,["functionDeclarations"],u)}if(r(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=r(e,["googleSearch"]);i!=null&&a(t,["googleSearch"],rr(o,i));const s=r(e,["googleSearchRetrieval"]);if(s!=null&&a(t,["googleSearchRetrieval"],lr(o,s)),r(e,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");if(r(e,["googleMaps"])!==void 0)throw new Error("googleMaps parameter is not supported in Gemini API.");r(e,["urlContext"])!=null&&a(t,["urlContext"],cr());const c=r(e,["codeExecution"]);return c!=null&&a(t,["codeExecution"],c),t}function ur(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["allowedFunctionNames"]);return i!=null&&a(t,["allowedFunctionNames"],i),t}function pr(o,e){const t={},n=r(e,["latitude"]);n!=null&&a(t,["latitude"],n);const i=r(e,["longitude"]);return i!=null&&a(t,["longitude"],i),t}function fr(o,e){const t={},n=r(e,["latLng"]);return n!=null&&a(t,["latLng"],pr(o,n)),t}function hr(o,e){const t={},n=r(e,["functionCallingConfig"]);n!=null&&a(t,["functionCallingConfig"],ur(o,n));const i=r(e,["retrievalConfig"]);return i!=null&&a(t,["retrievalConfig"],fr(o,i)),t}function mr(o,e,t){const n={},i=r(e,["ttl"]);t!==void 0&&i!=null&&a(t,["ttl"],i);const s=r(e,["expireTime"]);t!==void 0&&s!=null&&a(t,["expireTime"],s);const l=r(e,["displayName"]);t!==void 0&&l!=null&&a(t,["displayName"],l);const c=r(e,["contents"]);if(t!==void 0&&c!=null){let f=ee(o,c);Array.isArray(f)&&(f=f.map(h=>Io(o,h))),a(t,["contents"],f)}const u=r(e,["systemInstruction"]);t!==void 0&&u!=null&&a(t,["systemInstruction"],Io(o,Z(o,u)));const d=r(e,["tools"]);if(t!==void 0&&d!=null){let f=d;Array.isArray(f)&&(f=f.map(h=>dr(o,h))),a(t,["tools"],f)}const p=r(e,["toolConfig"]);if(t!==void 0&&p!=null&&a(t,["toolConfig"],hr(o,p)),r(e,["kmsKeyName"])!==void 0)throw new Error("kmsKeyName parameter is not supported in Gemini API.");return n}function gr(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["model"],mi(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],mr(o,i,t)),t}function vr(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],xe(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function yr(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],xe(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function xr(o,e,t){const n={},i=r(e,["ttl"]);t!==void 0&&i!=null&&a(t,["ttl"],i);const s=r(e,["expireTime"]);return t!==void 0&&s!=null&&a(t,["expireTime"],s),n}function br(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],xe(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],xr(o,i,t)),t}function Cr(o,e,t){const n={},i=r(e,["pageSize"]);t!==void 0&&i!=null&&a(t,["_query","pageSize"],i);const s=r(e,["pageToken"]);return t!==void 0&&s!=null&&a(t,["_query","pageToken"],s),n}function wr(o,e){const t={},n=r(e,["config"]);return n!=null&&a(t,["config"],Cr(o,n,t)),t}function _r(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function Tr(o,e){const t={},n=r(e,["displayName"]);n!=null&&a(t,["displayName"],n);const i=r(e,["data"]);i!=null&&a(t,["data"],i);const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function Er(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],_r(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],Tr(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function ko(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Er(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function Sr(o,e){const t={};if(r(e,["behavior"])!==void 0)throw new Error("behavior parameter is not supported in Vertex AI.");const n=r(e,["description"]);n!=null&&a(t,["description"],n);const i=r(e,["name"]);i!=null&&a(t,["name"],i);const s=r(e,["parameters"]);s!=null&&a(t,["parameters"],s);const l=r(e,["response"]);return l!=null&&a(t,["response"],l),t}function Mr(o,e){const t={},n=r(e,["startTime"]);n!=null&&a(t,["startTime"],n);const i=r(e,["endTime"]);return i!=null&&a(t,["endTime"],i),t}function Ar(o,e){const t={},n=r(e,["timeRangeFilter"]);return n!=null&&a(t,["timeRangeFilter"],Mr(o,n)),t}function Ir(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["dynamicThreshold"]);return i!=null&&a(t,["dynamicThreshold"],i),t}function kr(o,e){const t={},n=r(e,["dynamicRetrievalConfig"]);return n!=null&&a(t,["dynamicRetrievalConfig"],Ir(o,n)),t}function Pr(){return{}}function Rr(o,e){const t={},n=r(e,["apiKeyString"]);return n!=null&&a(t,["apiKeyString"],n),t}function Dr(o,e){const t={},n=r(e,["apiKeyConfig"]);n!=null&&a(t,["apiKeyConfig"],Rr(o,n));const i=r(e,["authType"]);i!=null&&a(t,["authType"],i);const s=r(e,["googleServiceAccountConfig"]);s!=null&&a(t,["googleServiceAccountConfig"],s);const l=r(e,["httpBasicAuthConfig"]);l!=null&&a(t,["httpBasicAuthConfig"],l);const c=r(e,["oauthConfig"]);c!=null&&a(t,["oauthConfig"],c);const u=r(e,["oidcConfig"]);return u!=null&&a(t,["oidcConfig"],u),t}function Nr(o,e){const t={},n=r(e,["authConfig"]);return n!=null&&a(t,["authConfig"],Dr(o,n)),t}function $r(o,e){const t={},n=r(e,["functionDeclarations"]);if(n!=null){let p=n;Array.isArray(p)&&(p=p.map(f=>Sr(o,f))),a(t,["functionDeclarations"],p)}const i=r(e,["retrieval"]);i!=null&&a(t,["retrieval"],i);const s=r(e,["googleSearch"]);s!=null&&a(t,["googleSearch"],Ar(o,s));const l=r(e,["googleSearchRetrieval"]);l!=null&&a(t,["googleSearchRetrieval"],kr(o,l)),r(e,["enterpriseWebSearch"])!=null&&a(t,["enterpriseWebSearch"],Pr());const u=r(e,["googleMaps"]);if(u!=null&&a(t,["googleMaps"],Nr(o,u)),r(e,["urlContext"])!==void 0)throw new Error("urlContext parameter is not supported in Vertex AI.");const d=r(e,["codeExecution"]);return d!=null&&a(t,["codeExecution"],d),t}function Lr(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["allowedFunctionNames"]);return i!=null&&a(t,["allowedFunctionNames"],i),t}function Fr(o,e){const t={},n=r(e,["latitude"]);n!=null&&a(t,["latitude"],n);const i=r(e,["longitude"]);return i!=null&&a(t,["longitude"],i),t}function Ur(o,e){const t={},n=r(e,["latLng"]);return n!=null&&a(t,["latLng"],Fr(o,n)),t}function Vr(o,e){const t={},n=r(e,["functionCallingConfig"]);n!=null&&a(t,["functionCallingConfig"],Lr(o,n));const i=r(e,["retrievalConfig"]);return i!=null&&a(t,["retrievalConfig"],Ur(o,i)),t}function Or(o,e,t){const n={},i=r(e,["ttl"]);t!==void 0&&i!=null&&a(t,["ttl"],i);const s=r(e,["expireTime"]);t!==void 0&&s!=null&&a(t,["expireTime"],s);const l=r(e,["displayName"]);t!==void 0&&l!=null&&a(t,["displayName"],l);const c=r(e,["contents"]);if(t!==void 0&&c!=null){let h=ee(o,c);Array.isArray(h)&&(h=h.map(m=>ko(o,m))),a(t,["contents"],h)}const u=r(e,["systemInstruction"]);t!==void 0&&u!=null&&a(t,["systemInstruction"],ko(o,Z(o,u)));const d=r(e,["tools"]);if(t!==void 0&&d!=null){let h=d;Array.isArray(h)&&(h=h.map(m=>$r(o,m))),a(t,["tools"],h)}const p=r(e,["toolConfig"]);t!==void 0&&p!=null&&a(t,["toolConfig"],Vr(o,p));const f=r(e,["kmsKeyName"]);return t!==void 0&&f!=null&&a(t,["encryption_spec","kmsKeyName"],f),n}function Br(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["model"],mi(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],Or(o,i,t)),t}function Gr(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],xe(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function qr(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],xe(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function Hr(o,e,t){const n={},i=r(e,["ttl"]);t!==void 0&&i!=null&&a(t,["ttl"],i);const s=r(e,["expireTime"]);return t!==void 0&&s!=null&&a(t,["expireTime"],s),n}function zr(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],xe(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],Hr(o,i,t)),t}function Wr(o,e,t){const n={},i=r(e,["pageSize"]);t!==void 0&&i!=null&&a(t,["_query","pageSize"],i);const s=r(e,["pageToken"]);return t!==void 0&&s!=null&&a(t,["_query","pageToken"],s),n}function Jr(o,e){const t={},n=r(e,["config"]);return n!=null&&a(t,["config"],Wr(o,n,t)),t}function lt(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["displayName"]);i!=null&&a(t,["displayName"],i);const s=r(e,["model"]);s!=null&&a(t,["model"],s);const l=r(e,["createTime"]);l!=null&&a(t,["createTime"],l);const c=r(e,["updateTime"]);c!=null&&a(t,["updateTime"],c);const u=r(e,["expireTime"]);u!=null&&a(t,["expireTime"],u);const d=r(e,["usageMetadata"]);return d!=null&&a(t,["usageMetadata"],d),t}function Yr(){return{}}function Kr(o,e){const t={},n=r(e,["nextPageToken"]);n!=null&&a(t,["nextPageToken"],n);const i=r(e,["cachedContents"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(l=>lt(o,l))),a(t,["cachedContents"],s)}return t}function ct(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["displayName"]);i!=null&&a(t,["displayName"],i);const s=r(e,["model"]);s!=null&&a(t,["model"],s);const l=r(e,["createTime"]);l!=null&&a(t,["createTime"],l);const c=r(e,["updateTime"]);c!=null&&a(t,["updateTime"],c);const u=r(e,["expireTime"]);u!=null&&a(t,["expireTime"],u);const d=r(e,["usageMetadata"]);return d!=null&&a(t,["usageMetadata"],d),t}function Zr(){return{}}function Xr(o,e){const t={},n=r(e,["nextPageToken"]);n!=null&&a(t,["nextPageToken"],n);const i=r(e,["cachedContents"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(l=>ct(o,l))),a(t,["cachedContents"],s)}return t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Be;(function(o){o.PAGED_ITEM_BATCH_JOBS="batchJobs",o.PAGED_ITEM_MODELS="models",o.PAGED_ITEM_TUNING_JOBS="tuningJobs",o.PAGED_ITEM_FILES="files",o.PAGED_ITEM_CACHED_CONTENTS="cachedContents"})(Be||(Be={}));class It{constructor(e,t,n,i){this.pageInternal=[],this.paramsInternal={},this.requestInternal=t,this.init(e,n,i)}init(e,t,n){var i,s;this.nameInternal=e,this.pageInternal=t[this.nameInternal]||[],this.idxInternal=0;let l={config:{}};n?typeof n=="object"?l=Object.assign({},n):l=n:l={config:{}},l.config&&(l.config.pageToken=t.nextPageToken),this.paramsInternal=l,this.pageInternalSize=(s=(i=l.config)===null||i===void 0?void 0:i.pageSize)!==null&&s!==void 0?s:this.pageInternal.length}initNextPage(e){this.init(this.nameInternal,e,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(e){return this.pageInternal[e]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const e=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:e,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const e=await this.requestInternal(this.params);return this.initNextPage(e),this.page}hasNextPage(){var e;return((e=this.params.config)===null||e===void 0?void 0:e.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Qr extends it{constructor(e){super(),this.apiClient=e,this.list=async(t={})=>new It(Be.PAGED_ITEM_CACHED_CONTENTS,n=>this.listInternal(n),await this.listInternal(t),t)}async create(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Br(this.apiClient,e);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ct(this.apiClient,p))}else{const d=gr(this.apiClient,e);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>lt(this.apiClient,p))}}async get(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Gr(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ct(this.apiClient,p))}else{const d=vr(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>lt(this.apiClient,p))}}async delete(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=qr(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(()=>{const p=Zr(),f=new _o;return Object.assign(f,p),f})}else{const d=yr(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(()=>{const p=Yr(),f=new _o;return Object.assign(f,p),f})}}async update(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=zr(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>ct(this.apiClient,p))}else{const d=br(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>lt(this.apiClient,p))}}async listInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Jr(this.apiClient,e);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Xr(this.apiClient,p),h=new To;return Object.assign(h,f),h})}else{const d=wr(this.apiClient,e);return c=S("cachedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Kr(this.apiClient,p),h=new To;return Object.assign(h,f),h})}}}function Po(o){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&o[e],n=0;if(t)return t.call(o);if(o&&typeof o.length=="number")return{next:function(){return o&&n>=o.length&&(o=void 0),{value:o&&o[n++],done:!o}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function H(o){return this instanceof H?(this.v=o,this):new H(o)}function Xe(o,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t.apply(o,e||[]),i,s=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),c("next"),c("throw"),c("return",l),i[Symbol.asyncIterator]=function(){return this},i;function l(m){return function(g){return Promise.resolve(g).then(m,f)}}function c(m,g){n[m]&&(i[m]=function(v){return new Promise(function(y,T){s.push([m,v,y,T])>1||u(m,v)})},g&&(i[m]=g(i[m])))}function u(m,g){try{d(n[m](g))}catch(v){h(s[0][3],v)}}function d(m){m.value instanceof H?Promise.resolve(m.value.v).then(p,f):h(s[0][2],m)}function p(m){u("next",m)}function f(m){u("throw",m)}function h(m,g){m(g),s.shift(),s.length&&u(s[0][0],s[0][1])}}function dt(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=o[Symbol.asyncIterator],t;return e?e.call(o):(o=typeof Po=="function"?Po(o):o[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(s){t[s]=o[s]&&function(l){return new Promise(function(c,u){l=o[s](l),i(c,u,l.done,l.value)})}}function i(s,l,c,u){Promise.resolve(u).then(function(d){s({value:d,done:c})},l)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function jr(o){var e;if(o.candidates==null||o.candidates.length===0)return!1;const t=(e=o.candidates[0])===null||e===void 0?void 0:e.content;return t===void 0?!1:Ei(t)}function Ei(o){if(o.parts===void 0||o.parts.length===0)return!1;for(const e of o.parts)if(e===void 0||Object.keys(e).length===0||!e.thought&&e.text!==void 0&&e.text==="")return!1;return!0}function ea(o){if(o.length!==0){for(const e of o)if(e.role!=="user"&&e.role!=="model")throw new Error(`Role must be user or model, but got ${e.role}.`)}}function Ro(o){if(o===void 0||o.length===0)return[];const e=[],t=o.length;let n=0;for(;n<t;)if(o[n].role==="user")e.push(o[n]),n++;else{const i=[];let s=!0;for(;n<t&&o[n].role==="model";)i.push(o[n]),s&&!Ei(o[n])&&(s=!1),n++;s?e.push(...i):e.pop()}return e}class ta{constructor(e,t){this.modelsModule=e,this.apiClient=t}create(e){return new na(this.apiClient,this.modelsModule,e.model,e.config,structuredClone(e.history))}}class na{constructor(e,t,n,i={},s=[]){this.apiClient=e,this.modelsModule=t,this.model=n,this.config=i,this.history=s,this.sendPromise=Promise.resolve(),ea(s)}async sendMessage(e){var t;await this.sendPromise;const n=Z(this.apiClient,e.message),i=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(n),config:(t=e.config)!==null&&t!==void 0?t:this.config});return this.sendPromise=(async()=>{var s,l,c;const u=await i,d=(l=(s=u.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content,p=u.automaticFunctionCallingHistory,f=this.getHistory(!0).length;let h=[];p!=null&&(h=(c=p.slice(f))!==null&&c!==void 0?c:[]);const m=d?[d]:[];this.recordHistory(n,m,h)})(),await this.sendPromise,i}async sendMessageStream(e){var t;await this.sendPromise;const n=Z(this.apiClient,e.message),i=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(n),config:(t=e.config)!==null&&t!==void 0?t:this.config});this.sendPromise=i.then(()=>{}).catch(()=>{});const s=await i;return this.processStreamResponse(s,n)}getHistory(e=!1){const t=e?Ro(this.history):this.history;return structuredClone(t)}processStreamResponse(e,t){var n,i;return Xe(this,arguments,function*(){var l,c,u,d;const p=[];try{for(var f=!0,h=dt(e),m;m=yield H(h.next()),l=m.done,!l;f=!0){d=m.value,f=!1;const g=d;if(jr(g)){const v=(i=(n=g.candidates)===null||n===void 0?void 0:n[0])===null||i===void 0?void 0:i.content;v!==void 0&&p.push(v)}yield yield H(g)}}catch(g){c={error:g}}finally{try{!f&&!l&&(u=h.return)&&(yield H(u.call(h)))}finally{if(c)throw c.error}}this.recordHistory(t,p)})}recordHistory(e,t,n){let i=[];t.length>0&&t.every(s=>s.role!==void 0)?i=t:i.push({role:"model",parts:[]}),n&&n.length>0?this.history.push(...Ro(n)):this.history.push(e),this.history.push(...i)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function oa(o,e,t){const n={},i=r(e,["pageSize"]);t!==void 0&&i!=null&&a(t,["_query","pageSize"],i);const s=r(e,["pageToken"]);return t!==void 0&&s!=null&&a(t,["_query","pageToken"],s),n}function ia(o,e){const t={},n=r(e,["config"]);return n!=null&&a(t,["config"],oa(o,n,t)),t}function sa(o,e){const t={},n=r(e,["details"]);n!=null&&a(t,["details"],n);const i=r(e,["message"]);i!=null&&a(t,["message"],i);const s=r(e,["code"]);return s!=null&&a(t,["code"],s),t}function ra(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["displayName"]);i!=null&&a(t,["displayName"],i);const s=r(e,["mimeType"]);s!=null&&a(t,["mimeType"],s);const l=r(e,["sizeBytes"]);l!=null&&a(t,["sizeBytes"],l);const c=r(e,["createTime"]);c!=null&&a(t,["createTime"],c);const u=r(e,["expirationTime"]);u!=null&&a(t,["expirationTime"],u);const d=r(e,["updateTime"]);d!=null&&a(t,["updateTime"],d);const p=r(e,["sha256Hash"]);p!=null&&a(t,["sha256Hash"],p);const f=r(e,["uri"]);f!=null&&a(t,["uri"],f);const h=r(e,["downloadUri"]);h!=null&&a(t,["downloadUri"],h);const m=r(e,["state"]);m!=null&&a(t,["state"],m);const g=r(e,["source"]);g!=null&&a(t,["source"],g);const v=r(e,["videoMetadata"]);v!=null&&a(t,["videoMetadata"],v);const y=r(e,["error"]);return y!=null&&a(t,["error"],sa(o,y)),t}function aa(o,e){const t={},n=r(e,["file"]);n!=null&&a(t,["file"],ra(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function la(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","file"],wi(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function ca(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","file"],wi(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function da(o,e){const t={},n=r(e,["details"]);n!=null&&a(t,["details"],n);const i=r(e,["message"]);i!=null&&a(t,["message"],i);const s=r(e,["code"]);return s!=null&&a(t,["code"],s),t}function jt(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["displayName"]);i!=null&&a(t,["displayName"],i);const s=r(e,["mimeType"]);s!=null&&a(t,["mimeType"],s);const l=r(e,["sizeBytes"]);l!=null&&a(t,["sizeBytes"],l);const c=r(e,["createTime"]);c!=null&&a(t,["createTime"],c);const u=r(e,["expirationTime"]);u!=null&&a(t,["expirationTime"],u);const d=r(e,["updateTime"]);d!=null&&a(t,["updateTime"],d);const p=r(e,["sha256Hash"]);p!=null&&a(t,["sha256Hash"],p);const f=r(e,["uri"]);f!=null&&a(t,["uri"],f);const h=r(e,["downloadUri"]);h!=null&&a(t,["downloadUri"],h);const m=r(e,["state"]);m!=null&&a(t,["state"],m);const g=r(e,["source"]);g!=null&&a(t,["source"],g);const v=r(e,["videoMetadata"]);v!=null&&a(t,["videoMetadata"],v);const y=r(e,["error"]);return y!=null&&a(t,["error"],da(o,y)),t}function ua(o,e){const t={},n=r(e,["nextPageToken"]);n!=null&&a(t,["nextPageToken"],n);const i=r(e,["files"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(l=>jt(o,l))),a(t,["files"],s)}return t}function pa(){return{}}function fa(){return{}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ha extends it{constructor(e){super(),this.apiClient=e,this.list=async(t={})=>new It(Be.PAGED_ITEM_FILES,n=>this.listInternal(n),await this.listInternal(t),t)}async upload(e){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(e.file,e.config).then(t=>jt(this.apiClient,t))}async download(e){await this.apiClient.downloadFile(e)}async listInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=ia(this.apiClient,e);return s=S("files",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>{const d=ua(this.apiClient,u),p=new Os;return Object.assign(p,d),p})}}async createInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=aa(this.apiClient,e);return s=S("upload/v1beta/files",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(()=>{const u=pa(),d=new Bs;return Object.assign(d,u),d})}}async get(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=la(this.apiClient,e);return s=S("files/{file}",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>jt(this.apiClient,u))}}async delete(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=ca(this.apiClient,e);return s=S("files/{file}",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"DELETE",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(()=>{const u=fa(),d=new Gs;return Object.assign(d,u),d})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ma(o,e){const t={},n=r(e,["voiceName"]);return n!=null&&a(t,["voiceName"],n),t}function ga(o,e){const t={},n=r(e,["voiceName"]);return n!=null&&a(t,["voiceName"],n),t}function Si(o,e){const t={},n=r(e,["prebuiltVoiceConfig"]);return n!=null&&a(t,["prebuiltVoiceConfig"],ma(o,n)),t}function va(o,e){const t={},n=r(e,["prebuiltVoiceConfig"]);return n!=null&&a(t,["prebuiltVoiceConfig"],ga(o,n)),t}function ya(o,e){const t={},n=r(e,["speaker"]);n!=null&&a(t,["speaker"],n);const i=r(e,["voiceConfig"]);return i!=null&&a(t,["voiceConfig"],Si(o,i)),t}function xa(o,e){const t={},n=r(e,["speakerVoiceConfigs"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>ya(o,s))),a(t,["speakerVoiceConfigs"],i)}return t}function ba(o,e){const t={},n=r(e,["voiceConfig"]);n!=null&&a(t,["voiceConfig"],Si(o,n));const i=r(e,["multiSpeakerVoiceConfig"]);i!=null&&a(t,["multiSpeakerVoiceConfig"],xa(o,i));const s=r(e,["languageCode"]);return s!=null&&a(t,["languageCode"],s),t}function Ca(o,e){const t={},n=r(e,["voiceConfig"]);if(n!=null&&a(t,["voiceConfig"],va(o,n)),r(e,["multiSpeakerVoiceConfig"])!==void 0)throw new Error("multiSpeakerVoiceConfig parameter is not supported in Vertex AI.");const i=r(e,["languageCode"]);return i!=null&&a(t,["languageCode"],i),t}function wa(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function _a(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function Ta(o,e){const t={};if(r(e,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=r(e,["data"]);n!=null&&a(t,["data"],n);const i=r(e,["mimeType"]);return i!=null&&a(t,["mimeType"],i),t}function Ea(o,e){const t={},n=r(e,["displayName"]);n!=null&&a(t,["displayName"],n);const i=r(e,["data"]);i!=null&&a(t,["data"],i);const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function Sa(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],wa(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],Ta(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function Ma(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],_a(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],Ea(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function Aa(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Sa(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function Ia(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Ma(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function ka(o,e){const t={},n=r(e,["behavior"]);n!=null&&a(t,["behavior"],n);const i=r(e,["description"]);i!=null&&a(t,["description"],i);const s=r(e,["name"]);s!=null&&a(t,["name"],s);const l=r(e,["parameters"]);l!=null&&a(t,["parameters"],l);const c=r(e,["response"]);return c!=null&&a(t,["response"],c),t}function Pa(o,e){const t={};if(r(e,["behavior"])!==void 0)throw new Error("behavior parameter is not supported in Vertex AI.");const n=r(e,["description"]);n!=null&&a(t,["description"],n);const i=r(e,["name"]);i!=null&&a(t,["name"],i);const s=r(e,["parameters"]);s!=null&&a(t,["parameters"],s);const l=r(e,["response"]);return l!=null&&a(t,["response"],l),t}function Ra(o,e){const t={},n=r(e,["startTime"]);n!=null&&a(t,["startTime"],n);const i=r(e,["endTime"]);return i!=null&&a(t,["endTime"],i),t}function Da(o,e){const t={},n=r(e,["startTime"]);n!=null&&a(t,["startTime"],n);const i=r(e,["endTime"]);return i!=null&&a(t,["endTime"],i),t}function Na(o,e){const t={},n=r(e,["timeRangeFilter"]);return n!=null&&a(t,["timeRangeFilter"],Ra(o,n)),t}function $a(o,e){const t={},n=r(e,["timeRangeFilter"]);return n!=null&&a(t,["timeRangeFilter"],Da(o,n)),t}function La(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["dynamicThreshold"]);return i!=null&&a(t,["dynamicThreshold"],i),t}function Fa(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["dynamicThreshold"]);return i!=null&&a(t,["dynamicThreshold"],i),t}function Ua(o,e){const t={},n=r(e,["dynamicRetrievalConfig"]);return n!=null&&a(t,["dynamicRetrievalConfig"],La(o,n)),t}function Va(o,e){const t={},n=r(e,["dynamicRetrievalConfig"]);return n!=null&&a(t,["dynamicRetrievalConfig"],Fa(o,n)),t}function Oa(){return{}}function Ba(o,e){const t={},n=r(e,["apiKeyString"]);return n!=null&&a(t,["apiKeyString"],n),t}function Ga(o,e){const t={},n=r(e,["apiKeyConfig"]);n!=null&&a(t,["apiKeyConfig"],Ba(o,n));const i=r(e,["authType"]);i!=null&&a(t,["authType"],i);const s=r(e,["googleServiceAccountConfig"]);s!=null&&a(t,["googleServiceAccountConfig"],s);const l=r(e,["httpBasicAuthConfig"]);l!=null&&a(t,["httpBasicAuthConfig"],l);const c=r(e,["oauthConfig"]);c!=null&&a(t,["oauthConfig"],c);const u=r(e,["oidcConfig"]);return u!=null&&a(t,["oidcConfig"],u),t}function qa(o,e){const t={},n=r(e,["authConfig"]);return n!=null&&a(t,["authConfig"],Ga(o,n)),t}function Ha(){return{}}function za(o,e){const t={},n=r(e,["functionDeclarations"]);if(n!=null){let u=n;Array.isArray(u)&&(u=u.map(d=>ka(o,d))),a(t,["functionDeclarations"],u)}if(r(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=r(e,["googleSearch"]);i!=null&&a(t,["googleSearch"],Na(o,i));const s=r(e,["googleSearchRetrieval"]);if(s!=null&&a(t,["googleSearchRetrieval"],Ua(o,s)),r(e,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");if(r(e,["googleMaps"])!==void 0)throw new Error("googleMaps parameter is not supported in Gemini API.");r(e,["urlContext"])!=null&&a(t,["urlContext"],Ha());const c=r(e,["codeExecution"]);return c!=null&&a(t,["codeExecution"],c),t}function Wa(o,e){const t={},n=r(e,["functionDeclarations"]);if(n!=null){let p=n;Array.isArray(p)&&(p=p.map(f=>Pa(o,f))),a(t,["functionDeclarations"],p)}const i=r(e,["retrieval"]);i!=null&&a(t,["retrieval"],i);const s=r(e,["googleSearch"]);s!=null&&a(t,["googleSearch"],$a(o,s));const l=r(e,["googleSearchRetrieval"]);l!=null&&a(t,["googleSearchRetrieval"],Va(o,l)),r(e,["enterpriseWebSearch"])!=null&&a(t,["enterpriseWebSearch"],Oa());const u=r(e,["googleMaps"]);if(u!=null&&a(t,["googleMaps"],qa(o,u)),r(e,["urlContext"])!==void 0)throw new Error("urlContext parameter is not supported in Vertex AI.");const d=r(e,["codeExecution"]);return d!=null&&a(t,["codeExecution"],d),t}function Ja(o,e){const t={},n=r(e,["handle"]);if(n!=null&&a(t,["handle"],n),r(e,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return t}function Ya(o,e){const t={},n=r(e,["handle"]);n!=null&&a(t,["handle"],n);const i=r(e,["transparent"]);return i!=null&&a(t,["transparent"],i),t}function Do(){return{}}function No(){return{}}function Ka(o,e){const t={},n=r(e,["disabled"]);n!=null&&a(t,["disabled"],n);const i=r(e,["startOfSpeechSensitivity"]);i!=null&&a(t,["startOfSpeechSensitivity"],i);const s=r(e,["endOfSpeechSensitivity"]);s!=null&&a(t,["endOfSpeechSensitivity"],s);const l=r(e,["prefixPaddingMs"]);l!=null&&a(t,["prefixPaddingMs"],l);const c=r(e,["silenceDurationMs"]);return c!=null&&a(t,["silenceDurationMs"],c),t}function Za(o,e){const t={},n=r(e,["disabled"]);n!=null&&a(t,["disabled"],n);const i=r(e,["startOfSpeechSensitivity"]);i!=null&&a(t,["startOfSpeechSensitivity"],i);const s=r(e,["endOfSpeechSensitivity"]);s!=null&&a(t,["endOfSpeechSensitivity"],s);const l=r(e,["prefixPaddingMs"]);l!=null&&a(t,["prefixPaddingMs"],l);const c=r(e,["silenceDurationMs"]);return c!=null&&a(t,["silenceDurationMs"],c),t}function Xa(o,e){const t={},n=r(e,["automaticActivityDetection"]);n!=null&&a(t,["automaticActivityDetection"],Ka(o,n));const i=r(e,["activityHandling"]);i!=null&&a(t,["activityHandling"],i);const s=r(e,["turnCoverage"]);return s!=null&&a(t,["turnCoverage"],s),t}function Qa(o,e){const t={},n=r(e,["automaticActivityDetection"]);n!=null&&a(t,["automaticActivityDetection"],Za(o,n));const i=r(e,["activityHandling"]);i!=null&&a(t,["activityHandling"],i);const s=r(e,["turnCoverage"]);return s!=null&&a(t,["turnCoverage"],s),t}function ja(o,e){const t={},n=r(e,["targetTokens"]);return n!=null&&a(t,["targetTokens"],n),t}function el(o,e){const t={},n=r(e,["targetTokens"]);return n!=null&&a(t,["targetTokens"],n),t}function tl(o,e){const t={},n=r(e,["triggerTokens"]);n!=null&&a(t,["triggerTokens"],n);const i=r(e,["slidingWindow"]);return i!=null&&a(t,["slidingWindow"],ja(o,i)),t}function nl(o,e){const t={},n=r(e,["triggerTokens"]);n!=null&&a(t,["triggerTokens"],n);const i=r(e,["slidingWindow"]);return i!=null&&a(t,["slidingWindow"],el(o,i)),t}function ol(o,e){const t={},n=r(e,["proactiveAudio"]);return n!=null&&a(t,["proactiveAudio"],n),t}function il(o,e){const t={},n=r(e,["proactiveAudio"]);return n!=null&&a(t,["proactiveAudio"],n),t}function sl(o,e,t){const n={},i=r(e,["generationConfig"]);t!==void 0&&i!=null&&a(t,["setup","generationConfig"],i);const s=r(e,["responseModalities"]);t!==void 0&&s!=null&&a(t,["setup","generationConfig","responseModalities"],s);const l=r(e,["temperature"]);t!==void 0&&l!=null&&a(t,["setup","generationConfig","temperature"],l);const c=r(e,["topP"]);t!==void 0&&c!=null&&a(t,["setup","generationConfig","topP"],c);const u=r(e,["topK"]);t!==void 0&&u!=null&&a(t,["setup","generationConfig","topK"],u);const d=r(e,["maxOutputTokens"]);t!==void 0&&d!=null&&a(t,["setup","generationConfig","maxOutputTokens"],d);const p=r(e,["mediaResolution"]);t!==void 0&&p!=null&&a(t,["setup","generationConfig","mediaResolution"],p);const f=r(e,["seed"]);t!==void 0&&f!=null&&a(t,["setup","generationConfig","seed"],f);const h=r(e,["speechConfig"]);t!==void 0&&h!=null&&a(t,["setup","generationConfig","speechConfig"],ba(o,bi(o,h)));const m=r(e,["enableAffectiveDialog"]);t!==void 0&&m!=null&&a(t,["setup","generationConfig","enableAffectiveDialog"],m);const g=r(e,["systemInstruction"]);t!==void 0&&g!=null&&a(t,["setup","systemInstruction"],Aa(o,Z(o,g)));const v=r(e,["tools"]);if(t!==void 0&&v!=null){let G=At(o,v);Array.isArray(G)&&(G=G.map(O=>za(o,Mt(o,O)))),a(t,["setup","tools"],G)}const y=r(e,["sessionResumption"]);t!==void 0&&y!=null&&a(t,["setup","sessionResumption"],Ja(o,y));const T=r(e,["inputAudioTranscription"]);t!==void 0&&T!=null&&a(t,["setup","inputAudioTranscription"],Do());const P=r(e,["outputAudioTranscription"]);t!==void 0&&P!=null&&a(t,["setup","outputAudioTranscription"],Do());const M=r(e,["realtimeInputConfig"]);t!==void 0&&M!=null&&a(t,["setup","realtimeInputConfig"],Xa(o,M));const D=r(e,["contextWindowCompression"]);t!==void 0&&D!=null&&a(t,["setup","contextWindowCompression"],tl(o,D));const V=r(e,["proactivity"]);return t!==void 0&&V!=null&&a(t,["setup","proactivity"],ol(o,V)),n}function rl(o,e,t){const n={},i=r(e,["generationConfig"]);t!==void 0&&i!=null&&a(t,["setup","generationConfig"],i);const s=r(e,["responseModalities"]);t!==void 0&&s!=null&&a(t,["setup","generationConfig","responseModalities"],s);const l=r(e,["temperature"]);t!==void 0&&l!=null&&a(t,["setup","generationConfig","temperature"],l);const c=r(e,["topP"]);t!==void 0&&c!=null&&a(t,["setup","generationConfig","topP"],c);const u=r(e,["topK"]);t!==void 0&&u!=null&&a(t,["setup","generationConfig","topK"],u);const d=r(e,["maxOutputTokens"]);t!==void 0&&d!=null&&a(t,["setup","generationConfig","maxOutputTokens"],d);const p=r(e,["mediaResolution"]);t!==void 0&&p!=null&&a(t,["setup","generationConfig","mediaResolution"],p);const f=r(e,["seed"]);t!==void 0&&f!=null&&a(t,["setup","generationConfig","seed"],f);const h=r(e,["speechConfig"]);t!==void 0&&h!=null&&a(t,["setup","generationConfig","speechConfig"],Ca(o,bi(o,h)));const m=r(e,["enableAffectiveDialog"]);t!==void 0&&m!=null&&a(t,["setup","generationConfig","enableAffectiveDialog"],m);const g=r(e,["systemInstruction"]);t!==void 0&&g!=null&&a(t,["setup","systemInstruction"],Ia(o,Z(o,g)));const v=r(e,["tools"]);if(t!==void 0&&v!=null){let G=At(o,v);Array.isArray(G)&&(G=G.map(O=>Wa(o,Mt(o,O)))),a(t,["setup","tools"],G)}const y=r(e,["sessionResumption"]);t!==void 0&&y!=null&&a(t,["setup","sessionResumption"],Ya(o,y));const T=r(e,["inputAudioTranscription"]);t!==void 0&&T!=null&&a(t,["setup","inputAudioTranscription"],No());const P=r(e,["outputAudioTranscription"]);t!==void 0&&P!=null&&a(t,["setup","outputAudioTranscription"],No());const M=r(e,["realtimeInputConfig"]);t!==void 0&&M!=null&&a(t,["setup","realtimeInputConfig"],Qa(o,M));const D=r(e,["contextWindowCompression"]);t!==void 0&&D!=null&&a(t,["setup","contextWindowCompression"],nl(o,D));const V=r(e,["proactivity"]);return t!==void 0&&V!=null&&a(t,["setup","proactivity"],il(o,V)),n}function al(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["setup","model"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],sl(o,i,t)),t}function ll(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["setup","model"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],rl(o,i,t)),t}function cl(){return{}}function dl(){return{}}function ul(){return{}}function pl(){return{}}function fl(o,e){const t={},n=r(e,["media"]);n!=null&&a(t,["mediaChunks"],gi(o,n));const i=r(e,["audio"]);i!=null&&a(t,["audio"],Ws(o,i));const s=r(e,["audioStreamEnd"]);s!=null&&a(t,["audioStreamEnd"],s);const l=r(e,["video"]);l!=null&&a(t,["video"],zs(o,l));const c=r(e,["text"]);return c!=null&&a(t,["text"],c),r(e,["activityStart"])!=null&&a(t,["activityStart"],cl()),r(e,["activityEnd"])!=null&&a(t,["activityEnd"],ul()),t}function hl(o,e){const t={},n=r(e,["media"]);if(n!=null&&a(t,["mediaChunks"],gi(o,n)),r(e,["audio"])!==void 0)throw new Error("audio parameter is not supported in Vertex AI.");const i=r(e,["audioStreamEnd"]);if(i!=null&&a(t,["audioStreamEnd"],i),r(e,["video"])!==void 0)throw new Error("video parameter is not supported in Vertex AI.");if(r(e,["text"])!==void 0)throw new Error("text parameter is not supported in Vertex AI.");return r(e,["activityStart"])!=null&&a(t,["activityStart"],dl()),r(e,["activityEnd"])!=null&&a(t,["activityEnd"],pl()),t}function Mi(o,e){const t={},n=r(e,["text"]);n!=null&&a(t,["text"],n);const i=r(e,["weight"]);return i!=null&&a(t,["weight"],i),t}function ml(o,e){const t={},n=r(e,["weightedPrompts"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Mi(o,s))),a(t,["weightedPrompts"],i)}return t}function Ai(o,e){const t={},n=r(e,["temperature"]);n!=null&&a(t,["temperature"],n);const i=r(e,["topK"]);i!=null&&a(t,["topK"],i);const s=r(e,["seed"]);s!=null&&a(t,["seed"],s);const l=r(e,["guidance"]);l!=null&&a(t,["guidance"],l);const c=r(e,["bpm"]);c!=null&&a(t,["bpm"],c);const u=r(e,["density"]);u!=null&&a(t,["density"],u);const d=r(e,["brightness"]);d!=null&&a(t,["brightness"],d);const p=r(e,["scale"]);p!=null&&a(t,["scale"],p);const f=r(e,["muteBass"]);f!=null&&a(t,["muteBass"],f);const h=r(e,["muteDrums"]);h!=null&&a(t,["muteDrums"],h);const m=r(e,["onlyBassAndDrums"]);m!=null&&a(t,["onlyBassAndDrums"],m);const g=r(e,["musicGenerationMode"]);return g!=null&&a(t,["musicGenerationMode"],g),t}function gl(o,e){const t={},n=r(e,["musicGenerationConfig"]);return n!=null&&a(t,["musicGenerationConfig"],Ai(o,n)),t}function Ii(o,e){const t={},n=r(e,["model"]);return n!=null&&a(t,["model"],n),t}function ki(o,e){const t={},n=r(e,["weightedPrompts"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Mi(o,s))),a(t,["weightedPrompts"],i)}return t}function en(o,e){const t={},n=r(e,["setup"]);n!=null&&a(t,["setup"],Ii(o,n));const i=r(e,["clientContent"]);i!=null&&a(t,["clientContent"],ki(o,i));const s=r(e,["musicGenerationConfig"]);s!=null&&a(t,["musicGenerationConfig"],Ai(o,s));const l=r(e,["playbackControl"]);return l!=null&&a(t,["playbackControl"],l),t}function vl(){return{}}function yl(){return{}}function xl(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function bl(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function Cl(o,e){const t={},n=r(e,["data"]);n!=null&&a(t,["data"],n);const i=r(e,["mimeType"]);return i!=null&&a(t,["mimeType"],i),t}function wl(o,e){const t={},n=r(e,["displayName"]);n!=null&&a(t,["displayName"],n);const i=r(e,["data"]);i!=null&&a(t,["data"],i);const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function _l(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],xl(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],Cl(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function Tl(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],bl(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],wl(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function El(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>_l(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function Sl(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Tl(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function $o(o,e){const t={},n=r(e,["text"]);n!=null&&a(t,["text"],n);const i=r(e,["finished"]);return i!=null&&a(t,["finished"],i),t}function Lo(o,e){const t={},n=r(e,["text"]);n!=null&&a(t,["text"],n);const i=r(e,["finished"]);return i!=null&&a(t,["finished"],i),t}function Ml(o,e){const t={},n=r(e,["retrievedUrl"]);n!=null&&a(t,["retrievedUrl"],n);const i=r(e,["urlRetrievalStatus"]);return i!=null&&a(t,["urlRetrievalStatus"],i),t}function Al(o,e){const t={},n=r(e,["urlMetadata"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Ml(o,s))),a(t,["urlMetadata"],i)}return t}function Il(o,e){const t={},n=r(e,["modelTurn"]);n!=null&&a(t,["modelTurn"],El(o,n));const i=r(e,["turnComplete"]);i!=null&&a(t,["turnComplete"],i);const s=r(e,["interrupted"]);s!=null&&a(t,["interrupted"],s);const l=r(e,["groundingMetadata"]);l!=null&&a(t,["groundingMetadata"],l);const c=r(e,["generationComplete"]);c!=null&&a(t,["generationComplete"],c);const u=r(e,["inputTranscription"]);u!=null&&a(t,["inputTranscription"],$o(o,u));const d=r(e,["outputTranscription"]);d!=null&&a(t,["outputTranscription"],$o(o,d));const p=r(e,["urlContextMetadata"]);return p!=null&&a(t,["urlContextMetadata"],Al(o,p)),t}function kl(o,e){const t={},n=r(e,["modelTurn"]);n!=null&&a(t,["modelTurn"],Sl(o,n));const i=r(e,["turnComplete"]);i!=null&&a(t,["turnComplete"],i);const s=r(e,["interrupted"]);s!=null&&a(t,["interrupted"],s);const l=r(e,["groundingMetadata"]);l!=null&&a(t,["groundingMetadata"],l);const c=r(e,["generationComplete"]);c!=null&&a(t,["generationComplete"],c);const u=r(e,["inputTranscription"]);u!=null&&a(t,["inputTranscription"],Lo(o,u));const d=r(e,["outputTranscription"]);return d!=null&&a(t,["outputTranscription"],Lo(o,d)),t}function Pl(o,e){const t={},n=r(e,["id"]);n!=null&&a(t,["id"],n);const i=r(e,["args"]);i!=null&&a(t,["args"],i);const s=r(e,["name"]);return s!=null&&a(t,["name"],s),t}function Rl(o,e){const t={},n=r(e,["args"]);n!=null&&a(t,["args"],n);const i=r(e,["name"]);return i!=null&&a(t,["name"],i),t}function Dl(o,e){const t={},n=r(e,["functionCalls"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Pl(o,s))),a(t,["functionCalls"],i)}return t}function Nl(o,e){const t={},n=r(e,["functionCalls"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Rl(o,s))),a(t,["functionCalls"],i)}return t}function $l(o,e){const t={},n=r(e,["ids"]);return n!=null&&a(t,["ids"],n),t}function Ll(o,e){const t={},n=r(e,["ids"]);return n!=null&&a(t,["ids"],n),t}function rt(o,e){const t={},n=r(e,["modality"]);n!=null&&a(t,["modality"],n);const i=r(e,["tokenCount"]);return i!=null&&a(t,["tokenCount"],i),t}function at(o,e){const t={},n=r(e,["modality"]);n!=null&&a(t,["modality"],n);const i=r(e,["tokenCount"]);return i!=null&&a(t,["tokenCount"],i),t}function Fl(o,e){const t={},n=r(e,["promptTokenCount"]);n!=null&&a(t,["promptTokenCount"],n);const i=r(e,["cachedContentTokenCount"]);i!=null&&a(t,["cachedContentTokenCount"],i);const s=r(e,["responseTokenCount"]);s!=null&&a(t,["responseTokenCount"],s);const l=r(e,["toolUsePromptTokenCount"]);l!=null&&a(t,["toolUsePromptTokenCount"],l);const c=r(e,["thoughtsTokenCount"]);c!=null&&a(t,["thoughtsTokenCount"],c);const u=r(e,["totalTokenCount"]);u!=null&&a(t,["totalTokenCount"],u);const d=r(e,["promptTokensDetails"]);if(d!=null){let m=d;Array.isArray(m)&&(m=m.map(g=>rt(o,g))),a(t,["promptTokensDetails"],m)}const p=r(e,["cacheTokensDetails"]);if(p!=null){let m=p;Array.isArray(m)&&(m=m.map(g=>rt(o,g))),a(t,["cacheTokensDetails"],m)}const f=r(e,["responseTokensDetails"]);if(f!=null){let m=f;Array.isArray(m)&&(m=m.map(g=>rt(o,g))),a(t,["responseTokensDetails"],m)}const h=r(e,["toolUsePromptTokensDetails"]);if(h!=null){let m=h;Array.isArray(m)&&(m=m.map(g=>rt(o,g))),a(t,["toolUsePromptTokensDetails"],m)}return t}function Ul(o,e){const t={},n=r(e,["promptTokenCount"]);n!=null&&a(t,["promptTokenCount"],n);const i=r(e,["cachedContentTokenCount"]);i!=null&&a(t,["cachedContentTokenCount"],i);const s=r(e,["candidatesTokenCount"]);s!=null&&a(t,["responseTokenCount"],s);const l=r(e,["toolUsePromptTokenCount"]);l!=null&&a(t,["toolUsePromptTokenCount"],l);const c=r(e,["thoughtsTokenCount"]);c!=null&&a(t,["thoughtsTokenCount"],c);const u=r(e,["totalTokenCount"]);u!=null&&a(t,["totalTokenCount"],u);const d=r(e,["promptTokensDetails"]);if(d!=null){let g=d;Array.isArray(g)&&(g=g.map(v=>at(o,v))),a(t,["promptTokensDetails"],g)}const p=r(e,["cacheTokensDetails"]);if(p!=null){let g=p;Array.isArray(g)&&(g=g.map(v=>at(o,v))),a(t,["cacheTokensDetails"],g)}const f=r(e,["candidatesTokensDetails"]);if(f!=null){let g=f;Array.isArray(g)&&(g=g.map(v=>at(o,v))),a(t,["responseTokensDetails"],g)}const h=r(e,["toolUsePromptTokensDetails"]);if(h!=null){let g=h;Array.isArray(g)&&(g=g.map(v=>at(o,v))),a(t,["toolUsePromptTokensDetails"],g)}const m=r(e,["trafficType"]);return m!=null&&a(t,["trafficType"],m),t}function Vl(o,e){const t={},n=r(e,["timeLeft"]);return n!=null&&a(t,["timeLeft"],n),t}function Ol(o,e){const t={},n=r(e,["timeLeft"]);return n!=null&&a(t,["timeLeft"],n),t}function Bl(o,e){const t={},n=r(e,["newHandle"]);n!=null&&a(t,["newHandle"],n);const i=r(e,["resumable"]);i!=null&&a(t,["resumable"],i);const s=r(e,["lastConsumedClientMessageIndex"]);return s!=null&&a(t,["lastConsumedClientMessageIndex"],s),t}function Gl(o,e){const t={},n=r(e,["newHandle"]);n!=null&&a(t,["newHandle"],n);const i=r(e,["resumable"]);i!=null&&a(t,["resumable"],i);const s=r(e,["lastConsumedClientMessageIndex"]);return s!=null&&a(t,["lastConsumedClientMessageIndex"],s),t}function ql(o,e){const t={};r(e,["setupComplete"])!=null&&a(t,["setupComplete"],vl());const i=r(e,["serverContent"]);i!=null&&a(t,["serverContent"],Il(o,i));const s=r(e,["toolCall"]);s!=null&&a(t,["toolCall"],Dl(o,s));const l=r(e,["toolCallCancellation"]);l!=null&&a(t,["toolCallCancellation"],$l(o,l));const c=r(e,["usageMetadata"]);c!=null&&a(t,["usageMetadata"],Fl(o,c));const u=r(e,["goAway"]);u!=null&&a(t,["goAway"],Vl(o,u));const d=r(e,["sessionResumptionUpdate"]);return d!=null&&a(t,["sessionResumptionUpdate"],Bl(o,d)),t}function Hl(o,e){const t={};r(e,["setupComplete"])!=null&&a(t,["setupComplete"],yl());const i=r(e,["serverContent"]);i!=null&&a(t,["serverContent"],kl(o,i));const s=r(e,["toolCall"]);s!=null&&a(t,["toolCall"],Nl(o,s));const l=r(e,["toolCallCancellation"]);l!=null&&a(t,["toolCallCancellation"],Ll(o,l));const c=r(e,["usageMetadata"]);c!=null&&a(t,["usageMetadata"],Ul(o,c));const u=r(e,["goAway"]);u!=null&&a(t,["goAway"],Ol(o,u));const d=r(e,["sessionResumptionUpdate"]);return d!=null&&a(t,["sessionResumptionUpdate"],Gl(o,d)),t}function zl(){return{}}function Wl(o,e){const t={},n=r(e,["text"]);n!=null&&a(t,["text"],n);const i=r(e,["weight"]);return i!=null&&a(t,["weight"],i),t}function Jl(o,e){const t={},n=r(e,["weightedPrompts"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Wl(o,s))),a(t,["weightedPrompts"],i)}return t}function Yl(o,e){const t={},n=r(e,["temperature"]);n!=null&&a(t,["temperature"],n);const i=r(e,["topK"]);i!=null&&a(t,["topK"],i);const s=r(e,["seed"]);s!=null&&a(t,["seed"],s);const l=r(e,["guidance"]);l!=null&&a(t,["guidance"],l);const c=r(e,["bpm"]);c!=null&&a(t,["bpm"],c);const u=r(e,["density"]);u!=null&&a(t,["density"],u);const d=r(e,["brightness"]);d!=null&&a(t,["brightness"],d);const p=r(e,["scale"]);p!=null&&a(t,["scale"],p);const f=r(e,["muteBass"]);f!=null&&a(t,["muteBass"],f);const h=r(e,["muteDrums"]);h!=null&&a(t,["muteDrums"],h);const m=r(e,["onlyBassAndDrums"]);m!=null&&a(t,["onlyBassAndDrums"],m);const g=r(e,["musicGenerationMode"]);return g!=null&&a(t,["musicGenerationMode"],g),t}function Kl(o,e){const t={},n=r(e,["clientContent"]);n!=null&&a(t,["clientContent"],Jl(o,n));const i=r(e,["musicGenerationConfig"]);return i!=null&&a(t,["musicGenerationConfig"],Yl(o,i)),t}function Zl(o,e){const t={},n=r(e,["data"]);n!=null&&a(t,["data"],n);const i=r(e,["mimeType"]);i!=null&&a(t,["mimeType"],i);const s=r(e,["sourceMetadata"]);return s!=null&&a(t,["sourceMetadata"],Kl(o,s)),t}function Xl(o,e){const t={},n=r(e,["audioChunks"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Zl(o,s))),a(t,["audioChunks"],i)}return t}function Ql(o,e){const t={},n=r(e,["text"]);n!=null&&a(t,["text"],n);const i=r(e,["filteredReason"]);return i!=null&&a(t,["filteredReason"],i),t}function jl(o,e){const t={};r(e,["setupComplete"])!=null&&a(t,["setupComplete"],zl());const i=r(e,["serverContent"]);i!=null&&a(t,["serverContent"],Xl(o,i));const s=r(e,["filteredPrompt"]);return s!=null&&a(t,["filteredPrompt"],Ql(o,s)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function ec(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function tc(o,e){const t={};if(r(e,["displayName"])!==void 0)throw new Error("displayName parameter is not supported in Gemini API.");const n=r(e,["data"]);n!=null&&a(t,["data"],n);const i=r(e,["mimeType"]);return i!=null&&a(t,["mimeType"],i),t}function nc(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],ec(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],tc(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function kt(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>nc(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function oc(o,e){const t={};if(r(e,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=r(e,["category"]);n!=null&&a(t,["category"],n);const i=r(e,["threshold"]);return i!=null&&a(t,["threshold"],i),t}function ic(o,e){const t={},n=r(e,["behavior"]);n!=null&&a(t,["behavior"],n);const i=r(e,["description"]);i!=null&&a(t,["description"],i);const s=r(e,["name"]);s!=null&&a(t,["name"],s);const l=r(e,["parameters"]);l!=null&&a(t,["parameters"],l);const c=r(e,["response"]);return c!=null&&a(t,["response"],c),t}function sc(o,e){const t={},n=r(e,["startTime"]);n!=null&&a(t,["startTime"],n);const i=r(e,["endTime"]);return i!=null&&a(t,["endTime"],i),t}function rc(o,e){const t={},n=r(e,["timeRangeFilter"]);return n!=null&&a(t,["timeRangeFilter"],sc(o,n)),t}function ac(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["dynamicThreshold"]);return i!=null&&a(t,["dynamicThreshold"],i),t}function lc(o,e){const t={},n=r(e,["dynamicRetrievalConfig"]);return n!=null&&a(t,["dynamicRetrievalConfig"],ac(o,n)),t}function cc(){return{}}function dc(o,e){const t={},n=r(e,["functionDeclarations"]);if(n!=null){let u=n;Array.isArray(u)&&(u=u.map(d=>ic(o,d))),a(t,["functionDeclarations"],u)}if(r(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");const i=r(e,["googleSearch"]);i!=null&&a(t,["googleSearch"],rc(o,i));const s=r(e,["googleSearchRetrieval"]);if(s!=null&&a(t,["googleSearchRetrieval"],lc(o,s)),r(e,["enterpriseWebSearch"])!==void 0)throw new Error("enterpriseWebSearch parameter is not supported in Gemini API.");if(r(e,["googleMaps"])!==void 0)throw new Error("googleMaps parameter is not supported in Gemini API.");r(e,["urlContext"])!=null&&a(t,["urlContext"],cc());const c=r(e,["codeExecution"]);return c!=null&&a(t,["codeExecution"],c),t}function uc(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["allowedFunctionNames"]);return i!=null&&a(t,["allowedFunctionNames"],i),t}function pc(o,e){const t={},n=r(e,["latitude"]);n!=null&&a(t,["latitude"],n);const i=r(e,["longitude"]);return i!=null&&a(t,["longitude"],i),t}function fc(o,e){const t={},n=r(e,["latLng"]);return n!=null&&a(t,["latLng"],pc(o,n)),t}function hc(o,e){const t={},n=r(e,["functionCallingConfig"]);n!=null&&a(t,["functionCallingConfig"],uc(o,n));const i=r(e,["retrievalConfig"]);return i!=null&&a(t,["retrievalConfig"],fc(o,i)),t}function mc(o,e){const t={},n=r(e,["voiceName"]);return n!=null&&a(t,["voiceName"],n),t}function Pi(o,e){const t={},n=r(e,["prebuiltVoiceConfig"]);return n!=null&&a(t,["prebuiltVoiceConfig"],mc(o,n)),t}function gc(o,e){const t={},n=r(e,["speaker"]);n!=null&&a(t,["speaker"],n);const i=r(e,["voiceConfig"]);return i!=null&&a(t,["voiceConfig"],Pi(o,i)),t}function vc(o,e){const t={},n=r(e,["speakerVoiceConfigs"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>gc(o,s))),a(t,["speakerVoiceConfigs"],i)}return t}function yc(o,e){const t={},n=r(e,["voiceConfig"]);n!=null&&a(t,["voiceConfig"],Pi(o,n));const i=r(e,["multiSpeakerVoiceConfig"]);i!=null&&a(t,["multiSpeakerVoiceConfig"],vc(o,i));const s=r(e,["languageCode"]);return s!=null&&a(t,["languageCode"],s),t}function xc(o,e){const t={},n=r(e,["includeThoughts"]);n!=null&&a(t,["includeThoughts"],n);const i=r(e,["thinkingBudget"]);return i!=null&&a(t,["thinkingBudget"],i),t}function bc(o,e,t){const n={},i=r(e,["systemInstruction"]);t!==void 0&&i!=null&&a(t,["systemInstruction"],kt(o,Z(o,i)));const s=r(e,["temperature"]);s!=null&&a(n,["temperature"],s);const l=r(e,["topP"]);l!=null&&a(n,["topP"],l);const c=r(e,["topK"]);c!=null&&a(n,["topK"],c);const u=r(e,["candidateCount"]);u!=null&&a(n,["candidateCount"],u);const d=r(e,["maxOutputTokens"]);d!=null&&a(n,["maxOutputTokens"],d);const p=r(e,["stopSequences"]);p!=null&&a(n,["stopSequences"],p);const f=r(e,["responseLogprobs"]);f!=null&&a(n,["responseLogprobs"],f);const h=r(e,["logprobs"]);h!=null&&a(n,["logprobs"],h);const m=r(e,["presencePenalty"]);m!=null&&a(n,["presencePenalty"],m);const g=r(e,["frequencyPenalty"]);g!=null&&a(n,["frequencyPenalty"],g);const v=r(e,["seed"]);v!=null&&a(n,["seed"],v);const y=r(e,["responseMimeType"]);y!=null&&a(n,["responseMimeType"],y);const T=r(e,["responseSchema"]);if(T!=null&&a(n,["responseSchema"],Ct(o,T)),r(e,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(r(e,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const P=r(e,["safetySettings"]);if(t!==void 0&&P!=null){let B=P;Array.isArray(B)&&(B=B.map(oe=>oc(o,oe))),a(t,["safetySettings"],B)}const M=r(e,["tools"]);if(t!==void 0&&M!=null){let B=At(o,M);Array.isArray(B)&&(B=B.map(oe=>dc(o,Mt(o,oe)))),a(t,["tools"],B)}const D=r(e,["toolConfig"]);if(t!==void 0&&D!=null&&a(t,["toolConfig"],hc(o,D)),r(e,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const V=r(e,["cachedContent"]);t!==void 0&&V!=null&&a(t,["cachedContent"],xe(o,V));const G=r(e,["responseModalities"]);G!=null&&a(n,["responseModalities"],G);const O=r(e,["mediaResolution"]);O!=null&&a(n,["mediaResolution"],O);const j=r(e,["speechConfig"]);if(j!=null&&a(n,["speechConfig"],yc(o,xi(o,j))),r(e,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const F=r(e,["thinkingConfig"]);return F!=null&&a(n,["thinkingConfig"],xc(o,F)),n}function Fo(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["contents"]);if(i!=null){let l=ee(o,i);Array.isArray(l)&&(l=l.map(c=>kt(o,c))),a(t,["contents"],l)}const s=r(e,["config"]);return s!=null&&a(t,["generationConfig"],bc(o,s,t)),t}function Cc(o,e,t){const n={},i=r(e,["taskType"]);t!==void 0&&i!=null&&a(t,["requests[]","taskType"],i);const s=r(e,["title"]);t!==void 0&&s!=null&&a(t,["requests[]","title"],s);const l=r(e,["outputDimensionality"]);if(t!==void 0&&l!=null&&a(t,["requests[]","outputDimensionality"],l),r(e,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(r(e,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return n}function wc(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["contents"]);i!=null&&a(t,["requests[]","content"],yi(o,i));const s=r(e,["config"]);s!=null&&a(t,["config"],Cc(o,s,t));const l=r(e,["model"]);return l!==void 0&&a(t,["requests[]","model"],q(o,l)),t}function _c(o,e,t){const n={};if(r(e,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(r(e,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const i=r(e,["numberOfImages"]);t!==void 0&&i!=null&&a(t,["parameters","sampleCount"],i);const s=r(e,["aspectRatio"]);t!==void 0&&s!=null&&a(t,["parameters","aspectRatio"],s);const l=r(e,["guidanceScale"]);if(t!==void 0&&l!=null&&a(t,["parameters","guidanceScale"],l),r(e,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const c=r(e,["safetyFilterLevel"]);t!==void 0&&c!=null&&a(t,["parameters","safetySetting"],c);const u=r(e,["personGeneration"]);t!==void 0&&u!=null&&a(t,["parameters","personGeneration"],u);const d=r(e,["includeSafetyAttributes"]);t!==void 0&&d!=null&&a(t,["parameters","includeSafetyAttributes"],d);const p=r(e,["includeRaiReason"]);t!==void 0&&p!=null&&a(t,["parameters","includeRaiReason"],p);const f=r(e,["language"]);t!==void 0&&f!=null&&a(t,["parameters","language"],f);const h=r(e,["outputMimeType"]);t!==void 0&&h!=null&&a(t,["parameters","outputOptions","mimeType"],h);const m=r(e,["outputCompressionQuality"]);if(t!==void 0&&m!=null&&a(t,["parameters","outputOptions","compressionQuality"],m),r(e,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(r(e,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function Tc(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["prompt"]);i!=null&&a(t,["instances[0]","prompt"],i);const s=r(e,["config"]);return s!=null&&a(t,["config"],_c(o,s,t)),t}function Ec(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","name"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function Sc(o,e,t){const n={},i=r(e,["pageSize"]);t!==void 0&&i!=null&&a(t,["_query","pageSize"],i);const s=r(e,["pageToken"]);t!==void 0&&s!=null&&a(t,["_query","pageToken"],s);const l=r(e,["filter"]);t!==void 0&&l!=null&&a(t,["_query","filter"],l);const c=r(e,["queryBase"]);return t!==void 0&&c!=null&&a(t,["_url","models_url"],_i(o,c)),n}function Mc(o,e){const t={},n=r(e,["config"]);return n!=null&&a(t,["config"],Sc(o,n,t)),t}function Ac(o,e,t){const n={},i=r(e,["displayName"]);t!==void 0&&i!=null&&a(t,["displayName"],i);const s=r(e,["description"]);t!==void 0&&s!=null&&a(t,["description"],s);const l=r(e,["defaultCheckpointId"]);return t!==void 0&&l!=null&&a(t,["defaultCheckpointId"],l),n}function Ic(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","name"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],Ac(o,i,t)),t}function kc(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","name"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function Pc(o,e){const t={};if(r(e,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(r(e,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(r(e,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return t}function Rc(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["contents"]);if(i!=null){let l=ee(o,i);Array.isArray(l)&&(l=l.map(c=>kt(o,c))),a(t,["contents"],l)}const s=r(e,["config"]);return s!=null&&a(t,["config"],Pc(o,s)),t}function Dc(o,e){const t={};if(r(e,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=r(e,["imageBytes"]);n!=null&&a(t,["bytesBase64Encoded"],be(o,n));const i=r(e,["mimeType"]);return i!=null&&a(t,["mimeType"],i),t}function Nc(o,e,t){const n={},i=r(e,["numberOfVideos"]);if(t!==void 0&&i!=null&&a(t,["parameters","sampleCount"],i),r(e,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(r(e,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const s=r(e,["durationSeconds"]);if(t!==void 0&&s!=null&&a(t,["parameters","durationSeconds"],s),r(e,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const l=r(e,["aspectRatio"]);if(t!==void 0&&l!=null&&a(t,["parameters","aspectRatio"],l),r(e,["resolution"])!==void 0)throw new Error("resolution parameter is not supported in Gemini API.");const c=r(e,["personGeneration"]);if(t!==void 0&&c!=null&&a(t,["parameters","personGeneration"],c),r(e,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const u=r(e,["negativePrompt"]);if(t!==void 0&&u!=null&&a(t,["parameters","negativePrompt"],u),r(e,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function $c(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["prompt"]);i!=null&&a(t,["instances[0]","prompt"],i);const s=r(e,["image"]);s!=null&&a(t,["instances[0]","image"],Dc(o,s));const l=r(e,["config"]);return l!=null&&a(t,["config"],Nc(o,l,t)),t}function Lc(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function Fc(o,e){const t={},n=r(e,["displayName"]);n!=null&&a(t,["displayName"],n);const i=r(e,["data"]);i!=null&&a(t,["data"],i);const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function Uc(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],Lc(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],Fc(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function ze(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Uc(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function Vc(o,e){const t={},n=r(e,["featureSelectionPreference"]);return n!=null&&a(t,["featureSelectionPreference"],n),t}function Oc(o,e){const t={},n=r(e,["method"]);n!=null&&a(t,["method"],n);const i=r(e,["category"]);i!=null&&a(t,["category"],i);const s=r(e,["threshold"]);return s!=null&&a(t,["threshold"],s),t}function Bc(o,e){const t={};if(r(e,["behavior"])!==void 0)throw new Error("behavior parameter is not supported in Vertex AI.");const n=r(e,["description"]);n!=null&&a(t,["description"],n);const i=r(e,["name"]);i!=null&&a(t,["name"],i);const s=r(e,["parameters"]);s!=null&&a(t,["parameters"],s);const l=r(e,["response"]);return l!=null&&a(t,["response"],l),t}function Gc(o,e){const t={},n=r(e,["startTime"]);n!=null&&a(t,["startTime"],n);const i=r(e,["endTime"]);return i!=null&&a(t,["endTime"],i),t}function qc(o,e){const t={},n=r(e,["timeRangeFilter"]);return n!=null&&a(t,["timeRangeFilter"],Gc(o,n)),t}function Hc(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["dynamicThreshold"]);return i!=null&&a(t,["dynamicThreshold"],i),t}function zc(o,e){const t={},n=r(e,["dynamicRetrievalConfig"]);return n!=null&&a(t,["dynamicRetrievalConfig"],Hc(o,n)),t}function Wc(){return{}}function Jc(o,e){const t={},n=r(e,["apiKeyString"]);return n!=null&&a(t,["apiKeyString"],n),t}function Yc(o,e){const t={},n=r(e,["apiKeyConfig"]);n!=null&&a(t,["apiKeyConfig"],Jc(o,n));const i=r(e,["authType"]);i!=null&&a(t,["authType"],i);const s=r(e,["googleServiceAccountConfig"]);s!=null&&a(t,["googleServiceAccountConfig"],s);const l=r(e,["httpBasicAuthConfig"]);l!=null&&a(t,["httpBasicAuthConfig"],l);const c=r(e,["oauthConfig"]);c!=null&&a(t,["oauthConfig"],c);const u=r(e,["oidcConfig"]);return u!=null&&a(t,["oidcConfig"],u),t}function Kc(o,e){const t={},n=r(e,["authConfig"]);return n!=null&&a(t,["authConfig"],Yc(o,n)),t}function Ri(o,e){const t={},n=r(e,["functionDeclarations"]);if(n!=null){let p=n;Array.isArray(p)&&(p=p.map(f=>Bc(o,f))),a(t,["functionDeclarations"],p)}const i=r(e,["retrieval"]);i!=null&&a(t,["retrieval"],i);const s=r(e,["googleSearch"]);s!=null&&a(t,["googleSearch"],qc(o,s));const l=r(e,["googleSearchRetrieval"]);l!=null&&a(t,["googleSearchRetrieval"],zc(o,l)),r(e,["enterpriseWebSearch"])!=null&&a(t,["enterpriseWebSearch"],Wc());const u=r(e,["googleMaps"]);if(u!=null&&a(t,["googleMaps"],Kc(o,u)),r(e,["urlContext"])!==void 0)throw new Error("urlContext parameter is not supported in Vertex AI.");const d=r(e,["codeExecution"]);return d!=null&&a(t,["codeExecution"],d),t}function Zc(o,e){const t={},n=r(e,["mode"]);n!=null&&a(t,["mode"],n);const i=r(e,["allowedFunctionNames"]);return i!=null&&a(t,["allowedFunctionNames"],i),t}function Xc(o,e){const t={},n=r(e,["latitude"]);n!=null&&a(t,["latitude"],n);const i=r(e,["longitude"]);return i!=null&&a(t,["longitude"],i),t}function Qc(o,e){const t={},n=r(e,["latLng"]);return n!=null&&a(t,["latLng"],Xc(o,n)),t}function jc(o,e){const t={},n=r(e,["functionCallingConfig"]);n!=null&&a(t,["functionCallingConfig"],Zc(o,n));const i=r(e,["retrievalConfig"]);return i!=null&&a(t,["retrievalConfig"],Qc(o,i)),t}function ed(o,e){const t={},n=r(e,["voiceName"]);return n!=null&&a(t,["voiceName"],n),t}function td(o,e){const t={},n=r(e,["prebuiltVoiceConfig"]);return n!=null&&a(t,["prebuiltVoiceConfig"],ed(o,n)),t}function nd(o,e){const t={},n=r(e,["voiceConfig"]);if(n!=null&&a(t,["voiceConfig"],td(o,n)),r(e,["multiSpeakerVoiceConfig"])!==void 0)throw new Error("multiSpeakerVoiceConfig parameter is not supported in Vertex AI.");const i=r(e,["languageCode"]);return i!=null&&a(t,["languageCode"],i),t}function od(o,e){const t={},n=r(e,["includeThoughts"]);n!=null&&a(t,["includeThoughts"],n);const i=r(e,["thinkingBudget"]);return i!=null&&a(t,["thinkingBudget"],i),t}function id(o,e,t){const n={},i=r(e,["systemInstruction"]);t!==void 0&&i!=null&&a(t,["systemInstruction"],ze(o,Z(o,i)));const s=r(e,["temperature"]);s!=null&&a(n,["temperature"],s);const l=r(e,["topP"]);l!=null&&a(n,["topP"],l);const c=r(e,["topK"]);c!=null&&a(n,["topK"],c);const u=r(e,["candidateCount"]);u!=null&&a(n,["candidateCount"],u);const d=r(e,["maxOutputTokens"]);d!=null&&a(n,["maxOutputTokens"],d);const p=r(e,["stopSequences"]);p!=null&&a(n,["stopSequences"],p);const f=r(e,["responseLogprobs"]);f!=null&&a(n,["responseLogprobs"],f);const h=r(e,["logprobs"]);h!=null&&a(n,["logprobs"],h);const m=r(e,["presencePenalty"]);m!=null&&a(n,["presencePenalty"],m);const g=r(e,["frequencyPenalty"]);g!=null&&a(n,["frequencyPenalty"],g);const v=r(e,["seed"]);v!=null&&a(n,["seed"],v);const y=r(e,["responseMimeType"]);y!=null&&a(n,["responseMimeType"],y);const T=r(e,["responseSchema"]);T!=null&&a(n,["responseSchema"],Ct(o,T));const P=r(e,["routingConfig"]);P!=null&&a(n,["routingConfig"],P);const M=r(e,["modelSelectionConfig"]);M!=null&&a(n,["modelConfig"],Vc(o,M));const D=r(e,["safetySettings"]);if(t!==void 0&&D!=null){let le=D;Array.isArray(le)&&(le=le.map(Nt=>Oc(o,Nt))),a(t,["safetySettings"],le)}const V=r(e,["tools"]);if(t!==void 0&&V!=null){let le=At(o,V);Array.isArray(le)&&(le=le.map(Nt=>Ri(o,Mt(o,Nt)))),a(t,["tools"],le)}const G=r(e,["toolConfig"]);t!==void 0&&G!=null&&a(t,["toolConfig"],jc(o,G));const O=r(e,["labels"]);t!==void 0&&O!=null&&a(t,["labels"],O);const j=r(e,["cachedContent"]);t!==void 0&&j!=null&&a(t,["cachedContent"],xe(o,j));const F=r(e,["responseModalities"]);F!=null&&a(n,["responseModalities"],F);const B=r(e,["mediaResolution"]);B!=null&&a(n,["mediaResolution"],B);const oe=r(e,["speechConfig"]);oe!=null&&a(n,["speechConfig"],nd(o,xi(o,oe)));const vn=r(e,["audioTimestamp"]);vn!=null&&a(n,["audioTimestamp"],vn);const yn=r(e,["thinkingConfig"]);return yn!=null&&a(n,["thinkingConfig"],od(o,yn)),n}function Uo(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["contents"]);if(i!=null){let l=ee(o,i);Array.isArray(l)&&(l=l.map(c=>ze(o,c))),a(t,["contents"],l)}const s=r(e,["config"]);return s!=null&&a(t,["generationConfig"],id(o,s,t)),t}function sd(o,e,t){const n={},i=r(e,["taskType"]);t!==void 0&&i!=null&&a(t,["instances[]","task_type"],i);const s=r(e,["title"]);t!==void 0&&s!=null&&a(t,["instances[]","title"],s);const l=r(e,["outputDimensionality"]);t!==void 0&&l!=null&&a(t,["parameters","outputDimensionality"],l);const c=r(e,["mimeType"]);t!==void 0&&c!=null&&a(t,["instances[]","mimeType"],c);const u=r(e,["autoTruncate"]);return t!==void 0&&u!=null&&a(t,["parameters","autoTruncate"],u),n}function rd(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["contents"]);i!=null&&a(t,["instances[]","content"],yi(o,i));const s=r(e,["config"]);return s!=null&&a(t,["config"],sd(o,s,t)),t}function ad(o,e,t){const n={},i=r(e,["outputGcsUri"]);t!==void 0&&i!=null&&a(t,["parameters","storageUri"],i);const s=r(e,["negativePrompt"]);t!==void 0&&s!=null&&a(t,["parameters","negativePrompt"],s);const l=r(e,["numberOfImages"]);t!==void 0&&l!=null&&a(t,["parameters","sampleCount"],l);const c=r(e,["aspectRatio"]);t!==void 0&&c!=null&&a(t,["parameters","aspectRatio"],c);const u=r(e,["guidanceScale"]);t!==void 0&&u!=null&&a(t,["parameters","guidanceScale"],u);const d=r(e,["seed"]);t!==void 0&&d!=null&&a(t,["parameters","seed"],d);const p=r(e,["safetyFilterLevel"]);t!==void 0&&p!=null&&a(t,["parameters","safetySetting"],p);const f=r(e,["personGeneration"]);t!==void 0&&f!=null&&a(t,["parameters","personGeneration"],f);const h=r(e,["includeSafetyAttributes"]);t!==void 0&&h!=null&&a(t,["parameters","includeSafetyAttributes"],h);const m=r(e,["includeRaiReason"]);t!==void 0&&m!=null&&a(t,["parameters","includeRaiReason"],m);const g=r(e,["language"]);t!==void 0&&g!=null&&a(t,["parameters","language"],g);const v=r(e,["outputMimeType"]);t!==void 0&&v!=null&&a(t,["parameters","outputOptions","mimeType"],v);const y=r(e,["outputCompressionQuality"]);t!==void 0&&y!=null&&a(t,["parameters","outputOptions","compressionQuality"],y);const T=r(e,["addWatermark"]);t!==void 0&&T!=null&&a(t,["parameters","addWatermark"],T);const P=r(e,["enhancePrompt"]);return t!==void 0&&P!=null&&a(t,["parameters","enhancePrompt"],P),n}function ld(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["prompt"]);i!=null&&a(t,["instances[0]","prompt"],i);const s=r(e,["config"]);return s!=null&&a(t,["config"],ad(o,s,t)),t}function cn(o,e){const t={},n=r(e,["gcsUri"]);n!=null&&a(t,["gcsUri"],n);const i=r(e,["imageBytes"]);i!=null&&a(t,["bytesBase64Encoded"],be(o,i));const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function cd(o,e){const t={},n=r(e,["maskMode"]);n!=null&&a(t,["maskMode"],n);const i=r(e,["segmentationClasses"]);i!=null&&a(t,["maskClasses"],i);const s=r(e,["maskDilation"]);return s!=null&&a(t,["dilation"],s),t}function dd(o,e){const t={},n=r(e,["controlType"]);n!=null&&a(t,["controlType"],n);const i=r(e,["enableControlImageComputation"]);return i!=null&&a(t,["computeControl"],i),t}function ud(o,e){const t={},n=r(e,["styleDescription"]);return n!=null&&a(t,["styleDescription"],n),t}function pd(o,e){const t={},n=r(e,["subjectType"]);n!=null&&a(t,["subjectType"],n);const i=r(e,["subjectDescription"]);return i!=null&&a(t,["subjectDescription"],i),t}function fd(o,e){const t={},n=r(e,["referenceImage"]);n!=null&&a(t,["referenceImage"],cn(o,n));const i=r(e,["referenceId"]);i!=null&&a(t,["referenceId"],i);const s=r(e,["referenceType"]);s!=null&&a(t,["referenceType"],s);const l=r(e,["maskImageConfig"]);l!=null&&a(t,["maskImageConfig"],cd(o,l));const c=r(e,["controlImageConfig"]);c!=null&&a(t,["controlImageConfig"],dd(o,c));const u=r(e,["styleImageConfig"]);u!=null&&a(t,["styleImageConfig"],ud(o,u));const d=r(e,["subjectImageConfig"]);return d!=null&&a(t,["subjectImageConfig"],pd(o,d)),t}function hd(o,e,t){const n={},i=r(e,["outputGcsUri"]);t!==void 0&&i!=null&&a(t,["parameters","storageUri"],i);const s=r(e,["negativePrompt"]);t!==void 0&&s!=null&&a(t,["parameters","negativePrompt"],s);const l=r(e,["numberOfImages"]);t!==void 0&&l!=null&&a(t,["parameters","sampleCount"],l);const c=r(e,["aspectRatio"]);t!==void 0&&c!=null&&a(t,["parameters","aspectRatio"],c);const u=r(e,["guidanceScale"]);t!==void 0&&u!=null&&a(t,["parameters","guidanceScale"],u);const d=r(e,["seed"]);t!==void 0&&d!=null&&a(t,["parameters","seed"],d);const p=r(e,["safetyFilterLevel"]);t!==void 0&&p!=null&&a(t,["parameters","safetySetting"],p);const f=r(e,["personGeneration"]);t!==void 0&&f!=null&&a(t,["parameters","personGeneration"],f);const h=r(e,["includeSafetyAttributes"]);t!==void 0&&h!=null&&a(t,["parameters","includeSafetyAttributes"],h);const m=r(e,["includeRaiReason"]);t!==void 0&&m!=null&&a(t,["parameters","includeRaiReason"],m);const g=r(e,["language"]);t!==void 0&&g!=null&&a(t,["parameters","language"],g);const v=r(e,["outputMimeType"]);t!==void 0&&v!=null&&a(t,["parameters","outputOptions","mimeType"],v);const y=r(e,["outputCompressionQuality"]);t!==void 0&&y!=null&&a(t,["parameters","outputOptions","compressionQuality"],y);const T=r(e,["editMode"]);t!==void 0&&T!=null&&a(t,["parameters","editMode"],T);const P=r(e,["baseSteps"]);return t!==void 0&&P!=null&&a(t,["parameters","editConfig","baseSteps"],P),n}function md(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["prompt"]);i!=null&&a(t,["instances[0]","prompt"],i);const s=r(e,["referenceImages"]);if(s!=null){let c=s;Array.isArray(c)&&(c=c.map(u=>fd(o,u))),a(t,["instances[0]","referenceImages"],c)}const l=r(e,["config"]);return l!=null&&a(t,["config"],hd(o,l,t)),t}function gd(o,e,t){const n={},i=r(e,["includeRaiReason"]);t!==void 0&&i!=null&&a(t,["parameters","includeRaiReason"],i);const s=r(e,["outputMimeType"]);t!==void 0&&s!=null&&a(t,["parameters","outputOptions","mimeType"],s);const l=r(e,["outputCompressionQuality"]);t!==void 0&&l!=null&&a(t,["parameters","outputOptions","compressionQuality"],l);const c=r(e,["numberOfImages"]);t!==void 0&&c!=null&&a(t,["parameters","sampleCount"],c);const u=r(e,["mode"]);return t!==void 0&&u!=null&&a(t,["parameters","mode"],u),n}function vd(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["image"]);i!=null&&a(t,["instances[0]","image"],cn(o,i));const s=r(e,["upscaleFactor"]);s!=null&&a(t,["parameters","upscaleConfig","upscaleFactor"],s);const l=r(e,["config"]);return l!=null&&a(t,["config"],gd(o,l,t)),t}function yd(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","name"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function xd(o,e,t){const n={},i=r(e,["pageSize"]);t!==void 0&&i!=null&&a(t,["_query","pageSize"],i);const s=r(e,["pageToken"]);t!==void 0&&s!=null&&a(t,["_query","pageToken"],s);const l=r(e,["filter"]);t!==void 0&&l!=null&&a(t,["_query","filter"],l);const c=r(e,["queryBase"]);return t!==void 0&&c!=null&&a(t,["_url","models_url"],_i(o,c)),n}function bd(o,e){const t={},n=r(e,["config"]);return n!=null&&a(t,["config"],xd(o,n,t)),t}function Cd(o,e,t){const n={},i=r(e,["displayName"]);t!==void 0&&i!=null&&a(t,["displayName"],i);const s=r(e,["description"]);t!==void 0&&s!=null&&a(t,["description"],s);const l=r(e,["defaultCheckpointId"]);return t!==void 0&&l!=null&&a(t,["defaultCheckpointId"],l),n}function wd(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],Cd(o,i,t)),t}function _d(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","name"],q(o,n));const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function Td(o,e,t){const n={},i=r(e,["systemInstruction"]);t!==void 0&&i!=null&&a(t,["systemInstruction"],ze(o,Z(o,i)));const s=r(e,["tools"]);if(t!==void 0&&s!=null){let c=s;Array.isArray(c)&&(c=c.map(u=>Ri(o,u))),a(t,["tools"],c)}const l=r(e,["generationConfig"]);return t!==void 0&&l!=null&&a(t,["generationConfig"],l),n}function Ed(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["contents"]);if(i!=null){let l=ee(o,i);Array.isArray(l)&&(l=l.map(c=>ze(o,c))),a(t,["contents"],l)}const s=r(e,["config"]);return s!=null&&a(t,["config"],Td(o,s,t)),t}function Sd(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["contents"]);if(i!=null){let l=ee(o,i);Array.isArray(l)&&(l=l.map(c=>ze(o,c))),a(t,["contents"],l)}const s=r(e,["config"]);return s!=null&&a(t,["config"],s),t}function Md(o,e,t){const n={},i=r(e,["numberOfVideos"]);t!==void 0&&i!=null&&a(t,["parameters","sampleCount"],i);const s=r(e,["outputGcsUri"]);t!==void 0&&s!=null&&a(t,["parameters","storageUri"],s);const l=r(e,["fps"]);t!==void 0&&l!=null&&a(t,["parameters","fps"],l);const c=r(e,["durationSeconds"]);t!==void 0&&c!=null&&a(t,["parameters","durationSeconds"],c);const u=r(e,["seed"]);t!==void 0&&u!=null&&a(t,["parameters","seed"],u);const d=r(e,["aspectRatio"]);t!==void 0&&d!=null&&a(t,["parameters","aspectRatio"],d);const p=r(e,["resolution"]);t!==void 0&&p!=null&&a(t,["parameters","resolution"],p);const f=r(e,["personGeneration"]);t!==void 0&&f!=null&&a(t,["parameters","personGeneration"],f);const h=r(e,["pubsubTopic"]);t!==void 0&&h!=null&&a(t,["parameters","pubsubTopic"],h);const m=r(e,["negativePrompt"]);t!==void 0&&m!=null&&a(t,["parameters","negativePrompt"],m);const g=r(e,["enhancePrompt"]);return t!==void 0&&g!=null&&a(t,["parameters","enhancePrompt"],g),n}function Ad(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["_url","model"],q(o,n));const i=r(e,["prompt"]);i!=null&&a(t,["instances[0]","prompt"],i);const s=r(e,["image"]);s!=null&&a(t,["instances[0]","image"],cn(o,s));const l=r(e,["config"]);return l!=null&&a(t,["config"],Md(o,l,t)),t}function Id(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function kd(o,e){const t={},n=r(e,["data"]);n!=null&&a(t,["data"],n);const i=r(e,["mimeType"]);return i!=null&&a(t,["mimeType"],i),t}function Pd(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],Id(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],kd(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function Rd(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Pd(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function Dd(o,e){const t={},n=r(e,["citationSources"]);return n!=null&&a(t,["citations"],n),t}function Nd(o,e){const t={},n=r(e,["retrievedUrl"]);n!=null&&a(t,["retrievedUrl"],n);const i=r(e,["urlRetrievalStatus"]);return i!=null&&a(t,["urlRetrievalStatus"],i),t}function $d(o,e){const t={},n=r(e,["urlMetadata"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>Nd(o,s))),a(t,["urlMetadata"],i)}return t}function Ld(o,e){const t={},n=r(e,["content"]);n!=null&&a(t,["content"],Rd(o,n));const i=r(e,["citationMetadata"]);i!=null&&a(t,["citationMetadata"],Dd(o,i));const s=r(e,["tokenCount"]);s!=null&&a(t,["tokenCount"],s);const l=r(e,["finishReason"]);l!=null&&a(t,["finishReason"],l);const c=r(e,["urlContextMetadata"]);c!=null&&a(t,["urlContextMetadata"],$d(o,c));const u=r(e,["avgLogprobs"]);u!=null&&a(t,["avgLogprobs"],u);const d=r(e,["groundingMetadata"]);d!=null&&a(t,["groundingMetadata"],d);const p=r(e,["index"]);p!=null&&a(t,["index"],p);const f=r(e,["logprobsResult"]);f!=null&&a(t,["logprobsResult"],f);const h=r(e,["safetyRatings"]);return h!=null&&a(t,["safetyRatings"],h),t}function Vo(o,e){const t={},n=r(e,["candidates"]);if(n!=null){let c=n;Array.isArray(c)&&(c=c.map(u=>Ld(o,u))),a(t,["candidates"],c)}const i=r(e,["modelVersion"]);i!=null&&a(t,["modelVersion"],i);const s=r(e,["promptFeedback"]);s!=null&&a(t,["promptFeedback"],s);const l=r(e,["usageMetadata"]);return l!=null&&a(t,["usageMetadata"],l),t}function Fd(o,e){const t={},n=r(e,["values"]);return n!=null&&a(t,["values"],n),t}function Ud(){return{}}function Vd(o,e){const t={},n=r(e,["embeddings"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Fd(o,l))),a(t,["embeddings"],s)}return r(e,["metadata"])!=null&&a(t,["metadata"],Ud()),t}function Od(o,e){const t={},n=r(e,["bytesBase64Encoded"]);n!=null&&a(t,["imageBytes"],be(o,n));const i=r(e,["mimeType"]);return i!=null&&a(t,["mimeType"],i),t}function Di(o,e){const t={},n=r(e,["safetyAttributes","categories"]);n!=null&&a(t,["categories"],n);const i=r(e,["safetyAttributes","scores"]);i!=null&&a(t,["scores"],i);const s=r(e,["contentType"]);return s!=null&&a(t,["contentType"],s),t}function Bd(o,e){const t={},n=r(e,["_self"]);n!=null&&a(t,["image"],Od(o,n));const i=r(e,["raiFilteredReason"]);i!=null&&a(t,["raiFilteredReason"],i);const s=r(e,["_self"]);return s!=null&&a(t,["safetyAttributes"],Di(o,s)),t}function Gd(o,e){const t={},n=r(e,["predictions"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>Bd(o,l))),a(t,["generatedImages"],s)}const i=r(e,["positivePromptSafetyAttributes"]);return i!=null&&a(t,["positivePromptSafetyAttributes"],Di(o,i)),t}function qd(o,e){const t={},n=r(e,["baseModel"]);n!=null&&a(t,["baseModel"],n);const i=r(e,["createTime"]);i!=null&&a(t,["createTime"],i);const s=r(e,["updateTime"]);return s!=null&&a(t,["updateTime"],s),t}function tn(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["displayName"]);i!=null&&a(t,["displayName"],i);const s=r(e,["description"]);s!=null&&a(t,["description"],s);const l=r(e,["version"]);l!=null&&a(t,["version"],l);const c=r(e,["_self"]);c!=null&&a(t,["tunedModelInfo"],qd(o,c));const u=r(e,["inputTokenLimit"]);u!=null&&a(t,["inputTokenLimit"],u);const d=r(e,["outputTokenLimit"]);d!=null&&a(t,["outputTokenLimit"],d);const p=r(e,["supportedGenerationMethods"]);return p!=null&&a(t,["supportedActions"],p),t}function Hd(o,e){const t={},n=r(e,["nextPageToken"]);n!=null&&a(t,["nextPageToken"],n);const i=r(e,["_self"]);if(i!=null){let s=Ti(o,i);Array.isArray(s)&&(s=s.map(l=>tn(o,l))),a(t,["models"],s)}return t}function zd(){return{}}function Wd(o,e){const t={},n=r(e,["totalTokens"]);n!=null&&a(t,["totalTokens"],n);const i=r(e,["cachedContentTokenCount"]);return i!=null&&a(t,["cachedContentTokenCount"],i),t}function Jd(o,e){const t={},n=r(e,["video","uri"]);n!=null&&a(t,["uri"],n);const i=r(e,["video","encodedVideo"]);i!=null&&a(t,["videoBytes"],be(o,i));const s=r(e,["encoding"]);return s!=null&&a(t,["mimeType"],s),t}function Yd(o,e){const t={},n=r(e,["_self"]);return n!=null&&a(t,["video"],Jd(o,n)),t}function Kd(o,e){const t={},n=r(e,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>Yd(o,c))),a(t,["generatedVideos"],l)}const i=r(e,["raiMediaFilteredCount"]);i!=null&&a(t,["raiMediaFilteredCount"],i);const s=r(e,["raiMediaFilteredReasons"]);return s!=null&&a(t,["raiMediaFilteredReasons"],s),t}function Zd(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["metadata"]);i!=null&&a(t,["metadata"],i);const s=r(e,["done"]);s!=null&&a(t,["done"],s);const l=r(e,["error"]);l!=null&&a(t,["error"],l);const c=r(e,["response","generateVideoResponse"]);return c!=null&&a(t,["response"],Kd(o,c)),t}function Xd(o,e){const t={},n=r(e,["fps"]);n!=null&&a(t,["fps"],n);const i=r(e,["endOffset"]);i!=null&&a(t,["endOffset"],i);const s=r(e,["startOffset"]);return s!=null&&a(t,["startOffset"],s),t}function Qd(o,e){const t={},n=r(e,["displayName"]);n!=null&&a(t,["displayName"],n);const i=r(e,["data"]);i!=null&&a(t,["data"],i);const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function jd(o,e){const t={},n=r(e,["videoMetadata"]);n!=null&&a(t,["videoMetadata"],Xd(o,n));const i=r(e,["thought"]);i!=null&&a(t,["thought"],i);const s=r(e,["inlineData"]);s!=null&&a(t,["inlineData"],Qd(o,s));const l=r(e,["codeExecutionResult"]);l!=null&&a(t,["codeExecutionResult"],l);const c=r(e,["executableCode"]);c!=null&&a(t,["executableCode"],c);const u=r(e,["fileData"]);u!=null&&a(t,["fileData"],u);const d=r(e,["functionCall"]);d!=null&&a(t,["functionCall"],d);const p=r(e,["functionResponse"]);p!=null&&a(t,["functionResponse"],p);const f=r(e,["text"]);return f!=null&&a(t,["text"],f),t}function eu(o,e){const t={},n=r(e,["parts"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>jd(o,l))),a(t,["parts"],s)}const i=r(e,["role"]);return i!=null&&a(t,["role"],i),t}function tu(o,e){const t={},n=r(e,["citations"]);return n!=null&&a(t,["citations"],n),t}function nu(o,e){const t={},n=r(e,["content"]);n!=null&&a(t,["content"],eu(o,n));const i=r(e,["citationMetadata"]);i!=null&&a(t,["citationMetadata"],tu(o,i));const s=r(e,["finishMessage"]);s!=null&&a(t,["finishMessage"],s);const l=r(e,["finishReason"]);l!=null&&a(t,["finishReason"],l);const c=r(e,["avgLogprobs"]);c!=null&&a(t,["avgLogprobs"],c);const u=r(e,["groundingMetadata"]);u!=null&&a(t,["groundingMetadata"],u);const d=r(e,["index"]);d!=null&&a(t,["index"],d);const p=r(e,["logprobsResult"]);p!=null&&a(t,["logprobsResult"],p);const f=r(e,["safetyRatings"]);return f!=null&&a(t,["safetyRatings"],f),t}function Oo(o,e){const t={},n=r(e,["candidates"]);if(n!=null){let d=n;Array.isArray(d)&&(d=d.map(p=>nu(o,p))),a(t,["candidates"],d)}const i=r(e,["createTime"]);i!=null&&a(t,["createTime"],i);const s=r(e,["responseId"]);s!=null&&a(t,["responseId"],s);const l=r(e,["modelVersion"]);l!=null&&a(t,["modelVersion"],l);const c=r(e,["promptFeedback"]);c!=null&&a(t,["promptFeedback"],c);const u=r(e,["usageMetadata"]);return u!=null&&a(t,["usageMetadata"],u),t}function ou(o,e){const t={},n=r(e,["truncated"]);n!=null&&a(t,["truncated"],n);const i=r(e,["token_count"]);return i!=null&&a(t,["tokenCount"],i),t}function iu(o,e){const t={},n=r(e,["values"]);n!=null&&a(t,["values"],n);const i=r(e,["statistics"]);return i!=null&&a(t,["statistics"],ou(o,i)),t}function su(o,e){const t={},n=r(e,["billableCharacterCount"]);return n!=null&&a(t,["billableCharacterCount"],n),t}function ru(o,e){const t={},n=r(e,["predictions[]","embeddings"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>iu(o,l))),a(t,["embeddings"],s)}const i=r(e,["metadata"]);return i!=null&&a(t,["metadata"],su(o,i)),t}function au(o,e){const t={},n=r(e,["gcsUri"]);n!=null&&a(t,["gcsUri"],n);const i=r(e,["bytesBase64Encoded"]);i!=null&&a(t,["imageBytes"],be(o,i));const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function Ni(o,e){const t={},n=r(e,["safetyAttributes","categories"]);n!=null&&a(t,["categories"],n);const i=r(e,["safetyAttributes","scores"]);i!=null&&a(t,["scores"],i);const s=r(e,["contentType"]);return s!=null&&a(t,["contentType"],s),t}function dn(o,e){const t={},n=r(e,["_self"]);n!=null&&a(t,["image"],au(o,n));const i=r(e,["raiFilteredReason"]);i!=null&&a(t,["raiFilteredReason"],i);const s=r(e,["_self"]);s!=null&&a(t,["safetyAttributes"],Ni(o,s));const l=r(e,["prompt"]);return l!=null&&a(t,["enhancedPrompt"],l),t}function lu(o,e){const t={},n=r(e,["predictions"]);if(n!=null){let s=n;Array.isArray(s)&&(s=s.map(l=>dn(o,l))),a(t,["generatedImages"],s)}const i=r(e,["positivePromptSafetyAttributes"]);return i!=null&&a(t,["positivePromptSafetyAttributes"],Ni(o,i)),t}function cu(o,e){const t={},n=r(e,["predictions"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>dn(o,s))),a(t,["generatedImages"],i)}return t}function du(o,e){const t={},n=r(e,["predictions"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>dn(o,s))),a(t,["generatedImages"],i)}return t}function uu(o,e){const t={},n=r(e,["endpoint"]);n!=null&&a(t,["name"],n);const i=r(e,["deployedModelId"]);return i!=null&&a(t,["deployedModelId"],i),t}function pu(o,e){const t={},n=r(e,["labels","google-vertex-llm-tuning-base-model-id"]);n!=null&&a(t,["baseModel"],n);const i=r(e,["createTime"]);i!=null&&a(t,["createTime"],i);const s=r(e,["updateTime"]);return s!=null&&a(t,["updateTime"],s),t}function fu(o,e){const t={},n=r(e,["checkpointId"]);n!=null&&a(t,["checkpointId"],n);const i=r(e,["epoch"]);i!=null&&a(t,["epoch"],i);const s=r(e,["step"]);return s!=null&&a(t,["step"],s),t}function nn(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["displayName"]);i!=null&&a(t,["displayName"],i);const s=r(e,["description"]);s!=null&&a(t,["description"],s);const l=r(e,["versionId"]);l!=null&&a(t,["version"],l);const c=r(e,["deployedModels"]);if(c!=null){let h=c;Array.isArray(h)&&(h=h.map(m=>uu(o,m))),a(t,["endpoints"],h)}const u=r(e,["labels"]);u!=null&&a(t,["labels"],u);const d=r(e,["_self"]);d!=null&&a(t,["tunedModelInfo"],pu(o,d));const p=r(e,["defaultCheckpointId"]);p!=null&&a(t,["defaultCheckpointId"],p);const f=r(e,["checkpoints"]);if(f!=null){let h=f;Array.isArray(h)&&(h=h.map(m=>fu(o,m))),a(t,["checkpoints"],h)}return t}function hu(o,e){const t={},n=r(e,["nextPageToken"]);n!=null&&a(t,["nextPageToken"],n);const i=r(e,["_self"]);if(i!=null){let s=Ti(o,i);Array.isArray(s)&&(s=s.map(l=>nn(o,l))),a(t,["models"],s)}return t}function mu(){return{}}function gu(o,e){const t={},n=r(e,["totalTokens"]);return n!=null&&a(t,["totalTokens"],n),t}function vu(o,e){const t={},n=r(e,["tokensInfo"]);return n!=null&&a(t,["tokensInfo"],n),t}function yu(o,e){const t={},n=r(e,["gcsUri"]);n!=null&&a(t,["uri"],n);const i=r(e,["bytesBase64Encoded"]);i!=null&&a(t,["videoBytes"],be(o,i));const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function xu(o,e){const t={},n=r(e,["_self"]);return n!=null&&a(t,["video"],yu(o,n)),t}function bu(o,e){const t={},n=r(e,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>xu(o,c))),a(t,["generatedVideos"],l)}const i=r(e,["raiMediaFilteredCount"]);i!=null&&a(t,["raiMediaFilteredCount"],i);const s=r(e,["raiMediaFilteredReasons"]);return s!=null&&a(t,["raiMediaFilteredReasons"],s),t}function Cu(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["metadata"]);i!=null&&a(t,["metadata"],i);const s=r(e,["done"]);s!=null&&a(t,["done"],s);const l=r(e,["error"]);l!=null&&a(t,["error"],l);const c=r(e,["response"]);return c!=null&&a(t,["response"],bu(o,c)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const wu="Content-Type",_u="X-Server-Timeout",Tu="User-Agent",on="x-goog-api-client",Eu="1.0.0",Su=`google-genai-sdk/${Eu}`,Mu="v1beta1",Au="v1beta",Bo=/^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;class $i extends Error{constructor(e,t){t?super(e,{cause:t}):super(e,{cause:new Error().stack}),this.message=e,this.name="ClientError"}}class sn extends Error{constructor(e,t){t?super(e,{cause:t}):super(e,{cause:new Error().stack}),this.message=e,this.name="ServerError"}}class Iu{constructor(e){var t,n;this.clientOptions=Object.assign(Object.assign({},e),{project:e.project,location:e.location,apiKey:e.apiKey,vertexai:e.vertexai});const i={};this.clientOptions.vertexai?(i.apiVersion=(t=this.clientOptions.apiVersion)!==null&&t!==void 0?t:Mu,i.baseUrl=this.baseUrlFromProjectLocation(),this.normalizeAuthParameters()):(i.apiVersion=(n=this.clientOptions.apiVersion)!==null&&n!==void 0?n:Au,i.baseUrl="https://generativelanguage.googleapis.com/"),i.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=i,e.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(i,e.httpOptions))}baseUrlFromProjectLocation(){return this.clientOptions.project&&this.clientOptions.location&&this.clientOptions.location!=="global"?`https://${this.clientOptions.location}-aiplatform.googleapis.com/`:"https://aiplatform.googleapis.com/"}normalizeAuthParameters(){if(this.clientOptions.project&&this.clientOptions.location){this.clientOptions.apiKey=void 0;return}this.clientOptions.project=void 0,this.clientOptions.location=void 0}isVertexAI(){var e;return(e=this.clientOptions.vertexai)!==null&&e!==void 0?e:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(e){if(!e||e.baseUrl===void 0||e.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const n=[e.baseUrl.endsWith("/")?e.baseUrl.slice(0,-1):e.baseUrl];return e.apiVersion&&e.apiVersion!==""&&n.push(e.apiVersion),n.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const e=this.getBaseUrl(),t=new URL(e);return t.protocol=t.protocol=="http:"?"ws":"wss",t.toString()}setBaseUrl(e){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=e;else throw new Error("HTTP options are not correctly set.")}constructUrl(e,t,n){const i=[this.getRequestUrlInternal(t)];return n&&i.push(this.getBaseResourcePath()),e!==""&&i.push(e),new URL(`${i.join("/")}`)}shouldPrependVertexProjectPath(e){return!(this.clientOptions.apiKey||!this.clientOptions.vertexai||e.path.startsWith("projects/")||e.httpMethod==="GET"&&e.path.startsWith("publishers/google/models"))}async request(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e),i=this.constructUrl(e.path,t,n);if(e.queryParams)for(const[l,c]of Object.entries(e.queryParams))i.searchParams.append(l,String(c));let s={};if(e.httpMethod==="GET"){if(e.body&&e.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else s.body=e.body;return s=await this.includeExtraHttpOptionsToRequestInit(s,t,e.abortSignal),this.unaryApiCall(i,s,e.httpMethod)}patchHttpOptions(e,t){const n=JSON.parse(JSON.stringify(e));for(const[i,s]of Object.entries(t))typeof s=="object"?n[i]=Object.assign(Object.assign({},n[i]),s):s!==void 0&&(n[i]=s);return n}async requestStream(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e),i=this.constructUrl(e.path,t,n);(!i.searchParams.has("alt")||i.searchParams.get("alt")!=="sse")&&i.searchParams.set("alt","sse");let s={};return s.body=e.body,s=await this.includeExtraHttpOptionsToRequestInit(s,t,e.abortSignal),this.streamApiCall(i,s,e.httpMethod)}async includeExtraHttpOptionsToRequestInit(e,t,n){if(t&&t.timeout||n){const i=new AbortController,s=i.signal;t.timeout&&(t==null?void 0:t.timeout)>0&&setTimeout(()=>i.abort(),t.timeout),n&&n.addEventListener("abort",()=>{i.abort()}),e.signal=s}return e.headers=await this.getHeadersInternal(t),e}async unaryApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async i=>(await Go(i),new Xt(i))).catch(i=>{throw i instanceof Error?i:new Error(JSON.stringify(i))})}async streamApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async i=>(await Go(i),this.processStreamResponse(i))).catch(i=>{throw i instanceof Error?i:new Error(JSON.stringify(i))})}processStreamResponse(e){var t;return Xe(this,arguments,function*(){const i=(t=e==null?void 0:e.body)===null||t===void 0?void 0:t.getReader(),s=new TextDecoder("utf-8");if(!i)throw new Error("Response body is empty");try{let l="";for(;;){const{done:c,value:u}=yield H(i.read());if(c){if(l.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const d=s.decode(u);try{const f=JSON.parse(d);if("error"in f){const h=JSON.parse(JSON.stringify(f.error)),m=h.status,g=h.code,v=`got status: ${m}. ${JSON.stringify(f)}`;if(g>=400&&g<500)throw new $i(v);if(g>=500&&g<600)throw new sn(v)}}catch(f){const h=f;if(h.name==="ClientError"||h.name==="ServerError")throw f}l+=d;let p=l.match(Bo);for(;p;){const f=p[1];try{const h=new Response(f,{headers:e==null?void 0:e.headers,status:e==null?void 0:e.status,statusText:e==null?void 0:e.statusText});yield yield H(new Xt(h)),l=l.slice(p[0].length),p=l.match(Bo)}catch(h){throw new Error(`exception parsing stream chunk ${f}. ${h}`)}}}}finally{i.releaseLock()}})}async apiCall(e,t){return fetch(e,t).catch(n=>{throw new Error(`exception ${n} sending request`)})}getDefaultHeaders(){const e={},t=Su+" "+this.clientOptions.userAgentExtra;return e[Tu]=t,e[on]=t,e[wu]="application/json",e}async getHeadersInternal(e){const t=new Headers;if(e&&e.headers){for(const[n,i]of Object.entries(e.headers))t.append(n,i);e.timeout&&e.timeout>0&&t.append(_u,String(Math.ceil(e.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(t),t}async uploadFile(e,t){var n;const i={};t!=null&&(i.mimeType=t.mimeType,i.name=t.name,i.displayName=t.displayName),i.name&&!i.name.startsWith("files/")&&(i.name=`files/${i.name}`);const s=this.clientOptions.uploader,l=await s.stat(e);i.sizeBytes=String(l.size);const c=(n=t==null?void 0:t.mimeType)!==null&&n!==void 0?n:l.type;if(c===void 0||c==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");i.mimeType=c;const u=await this.fetchUploadUrl(i,t);return s.upload(e,u,this)}async downloadFile(e){await this.clientOptions.downloader.download(e,this)}async fetchUploadUrl(e,t){var n;let i={};t!=null&&t.httpOptions?i=t.httpOptions:i={apiVersion:"",headers:{"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${e.sizeBytes}`,"X-Goog-Upload-Header-Content-Type":`${e.mimeType}`}};const s={file:e},l=await this.request({path:S("upload/v1beta/files",s._url),body:JSON.stringify(s),httpMethod:"POST",httpOptions:i});if(!l||!(l!=null&&l.headers))throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const c=(n=l==null?void 0:l.headers)===null||n===void 0?void 0:n["x-goog-upload-url"];if(c===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return c}}async function Go(o){var e;if(o===void 0)throw new sn("response is undefined");if(!o.ok){const t=o.status,n=o.statusText;let i;!((e=o.headers.get("content-type"))===null||e===void 0)&&e.includes("application/json")?i=await o.json():i={error:{message:await o.text(),code:o.status,status:o.statusText}};const s=`got status: ${t} ${n}. ${JSON.stringify(i)}`;throw t>=400&&t<500?new $i(s):t>=500&&t<600?new sn(s):new Error(s)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const qo="mcp_used/unknown";function Li(o){for(const e of o)if(un(e)||typeof e=="object"&&"inputSchema"in e)return!0;return!1}function Fi(o){var e;const t=(e=o[on])!==null&&e!==void 0?e:"";t.includes(qo)||(o[on]=(t+` ${qo}`).trimStart())}function ku(o){var e,t,n;return(n=(t=(e=o.config)===null||e===void 0?void 0:e.tools)===null||t===void 0?void 0:t.some(i=>un(i)))!==null&&n!==void 0?n:!1}function Pu(o){var e,t,n;return(n=(t=(e=o.config)===null||e===void 0?void 0:e.tools)===null||t===void 0?void 0:t.some(i=>!un(i)))!==null&&n!==void 0?n:!1}function un(o){return o!==null&&typeof o=="object"&&"tool"in o&&"callTool"in o}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */async function Ru(o,e,t){const n=new Hs;let i;t.data instanceof Blob?i=JSON.parse(await t.data.text()):i=JSON.parse(t.data);const s=jl(o,i);Object.assign(n,s),e(n)}class Du{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n}async connect(e){var t,n;if(this.apiClient.isVertexAI())throw new Error("Live music is not supported for Vertex AI.");console.warn("Live music generation is experimental and may change in future versions.");const i=this.apiClient.getWebsocketBaseUrl(),s=this.apiClient.getApiVersion(),l=Lu(this.apiClient.getDefaultHeaders()),c=this.apiClient.getApiKey(),u=`${i}/ws/google.ai.generativelanguage.${s}.GenerativeService.BidiGenerateMusic?key=${c}`;let d=()=>{};const p=new Promise(M=>{d=M}),f=e.callbacks,h=function(){d({})},m=this.apiClient,g={onopen:h,onmessage:M=>{Ru(m,f.onmessage,M)},onerror:(t=f==null?void 0:f.onerror)!==null&&t!==void 0?t:function(M){},onclose:(n=f==null?void 0:f.onclose)!==null&&n!==void 0?n:function(M){}},v=this.webSocketFactory.create(u,$u(l),g);v.connect(),await p;const y=q(this.apiClient,e.model),T=Ii(this.apiClient,{model:y}),P=en(this.apiClient,{setup:T});return v.send(JSON.stringify(P)),new Nu(v,this.apiClient)}}class Nu{constructor(e,t){this.conn=e,this.apiClient=t}async setWeightedPrompts(e){if(!e.weightedPrompts||Object.keys(e.weightedPrompts).length===0)throw new Error("Weighted prompts must be set and contain at least one entry.");const t=ml(this.apiClient,e),n=ki(this.apiClient,t);this.conn.send(JSON.stringify({clientContent:n}))}async setMusicGenerationConfig(e){e.musicGenerationConfig||(e.musicGenerationConfig={});const t=gl(this.apiClient,e),n=en(this.apiClient,t);this.conn.send(JSON.stringify(n))}sendPlaybackControl(e){const t=en(this.apiClient,{playbackControl:e});this.conn.send(JSON.stringify(t))}play(){this.sendPlaybackControl($e.PLAY)}pause(){this.sendPlaybackControl($e.PAUSE)}stop(){this.sendPlaybackControl($e.STOP)}resetContext(){this.sendPlaybackControl($e.RESET_CONTEXT)}close(){this.conn.close()}}function $u(o){const e={};return o.forEach((t,n)=>{e[n]=t}),e}function Lu(o){const e=new Headers;for(const[t,n]of Object.entries(o))e.append(t,n);return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Fu="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function Uu(o,e,t){const n=new qs;let i;if(t.data instanceof Blob?i=JSON.parse(await t.data.text()):i=JSON.parse(t.data),o.isVertexAI()){const s=Hl(o,i);Object.assign(n,s)}else{const s=ql(o,i);Object.assign(n,s)}e(n)}class Vu{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n,this.music=new Du(this.apiClient,this.auth,this.webSocketFactory)}async connect(e){var t,n,i,s,l,c;const u=this.apiClient.getWebsocketBaseUrl(),d=this.apiClient.getApiVersion();let p;const f=this.apiClient.getDefaultHeaders();e.config&&e.config.tools&&Li(e.config.tools)&&Fi(f);const h=qu(f);if(this.apiClient.isVertexAI())p=`${u}/ws/google.cloud.aiplatform.${d}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(h);else{const F=this.apiClient.getApiKey();p=`${u}/ws/google.ai.generativelanguage.${d}.GenerativeService.BidiGenerateContent?key=${F}`}let m=()=>{};const g=new Promise(F=>{m=F}),v=e.callbacks,y=function(){var F;(F=v==null?void 0:v.onopen)===null||F===void 0||F.call(v),m({})},T=this.apiClient,P={onopen:y,onmessage:F=>{Uu(T,v.onmessage,F)},onerror:(t=v==null?void 0:v.onerror)!==null&&t!==void 0?t:function(F){},onclose:(n=v==null?void 0:v.onclose)!==null&&n!==void 0?n:function(F){}},M=this.webSocketFactory.create(p,Gu(h),P);M.connect(),await g;let D=q(this.apiClient,e.model);if(this.apiClient.isVertexAI()&&D.startsWith("publishers/")){const F=this.apiClient.getProject(),B=this.apiClient.getLocation();D=`projects/${F}/locations/${B}/`+D}let V={};this.apiClient.isVertexAI()&&((i=e.config)===null||i===void 0?void 0:i.responseModalities)===void 0&&(e.config===void 0?e.config={responseModalities:[xt.AUDIO]}:e.config.responseModalities=[xt.AUDIO]),!((s=e.config)===null||s===void 0)&&s.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const G=(c=(l=e.config)===null||l===void 0?void 0:l.tools)!==null&&c!==void 0?c:[],O=[];for(const F of G)if(this.isCallableTool(F)){const B=F;O.push(await B.tool())}else O.push(F);O.length>0&&(e.config.tools=O);const j={model:D,config:e.config,callbacks:e.callbacks};return this.apiClient.isVertexAI()?V=ll(this.apiClient,j):V=al(this.apiClient,j),delete V.config,M.send(JSON.stringify(V)),new Bu(M,this.apiClient)}isCallableTool(e){return"callTool"in e&&typeof e.callTool=="function"}}const Ou={turnComplete:!0};class Bu{constructor(e,t){this.conn=e,this.apiClient=t}tLiveClientContent(e,t){if(t.turns!==null&&t.turns!==void 0){let n=[];try{n=ee(e,t.turns),e.isVertexAI()?n=n.map(i=>ze(e,i)):n=n.map(i=>kt(e,i))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof t.turns}'`)}return{clientContent:{turns:n,turnComplete:t.turnComplete}}}return{clientContent:{turnComplete:t.turnComplete}}}tLiveClienttToolResponse(e,t){let n=[];if(t.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(t.functionResponses)?n=t.functionResponses:n=[t.functionResponses],n.length===0)throw new Error("functionResponses is required.");for(const s of n){if(typeof s!="object"||s===null||!("name"in s)||!("response"in s))throw new Error(`Could not parse function response, type '${typeof s}'.`);if(!e.isVertexAI()&&!("id"in s))throw new Error(Fu)}return{toolResponse:{functionResponses:n}}}sendClientContent(e){e=Object.assign(Object.assign({},Ou),e);const t=this.tLiveClientContent(this.apiClient,e);this.conn.send(JSON.stringify(t))}sendRealtimeInput(e){let t={};this.apiClient.isVertexAI()?t={realtimeInput:hl(this.apiClient,e)}:t={realtimeInput:fl(this.apiClient,e)},this.conn.send(JSON.stringify(t))}sendToolResponse(e){if(e.functionResponses==null)throw new Error("Tool response parameters are required.");const t=this.tLiveClienttToolResponse(this.apiClient,e);this.conn.send(JSON.stringify(t))}close(){this.conn.close()}}function Gu(o){const e={};return o.forEach((t,n)=>{e[n]=t}),e}function qu(o){const e=new Headers;for(const[t,n]of Object.entries(o))e.append(t,n);return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Ho=10;function zo(o){var e,t,n;if(!((e=o==null?void 0:o.automaticFunctionCalling)===null||e===void 0)&&e.disable)return!0;let i=!1;for(const l of(t=o==null?void 0:o.tools)!==null&&t!==void 0?t:[])if(ut(l)){i=!0;break}if(!i)return!0;const s=(n=o==null?void 0:o.automaticFunctionCalling)===null||n===void 0?void 0:n.maximumRemoteCalls;return s&&(s<0||!Number.isInteger(s))||s==0?(console.warn("Invalid maximumRemoteCalls value provided for automatic function calling. Disabled automatic function calling. Please provide a valid integer value greater than 0. maximumRemoteCalls provided:",s),!0):!1}function ut(o){return"callTool"in o&&typeof o.callTool=="function"}function Wo(o){var e;return!(!((e=o==null?void 0:o.automaticFunctionCalling)===null||e===void 0)&&e.ignoreCallHistory)}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Hu extends it{constructor(e){super(),this.apiClient=e,this.generateContent=async t=>{var n,i,s,l,c;const u=await this.processParamsForMcpUsage(t);if(!ku(t)||zo(t.config))return await this.generateContentInternal(u);if(Pu(t))throw new Error("Automatic function calling with CallableTools and Tools is not yet supported.");let d,p;const f=ee(this.apiClient,u.contents),h=(s=(i=(n=u.config)===null||n===void 0?void 0:n.automaticFunctionCalling)===null||i===void 0?void 0:i.maximumRemoteCalls)!==null&&s!==void 0?s:Ho;let m=0;for(;m<h&&(d=await this.generateContentInternal(u),!(!d.functionCalls||d.functionCalls.length===0));){const g=d.candidates[0].content,v=[];for(const y of(c=(l=t.config)===null||l===void 0?void 0:l.tools)!==null&&c!==void 0?c:[])if(ut(y)){const P=await y.callTool(d.functionCalls);v.push(...P)}m++,p={role:"user",parts:v},u.contents=ee(this.apiClient,u.contents),u.contents.push(g),u.contents.push(p),Wo(u.config)&&(f.push(g),f.push(p))}return Wo(u.config)&&(d.automaticFunctionCallingHistory=f),d},this.generateContentStream=async t=>{if(zo(t.config)){const n=await this.processParamsForMcpUsage(t);return await this.generateContentStreamInternal(n)}else return await this.processAfcStream(t)},this.generateImages=async t=>await this.generateImagesInternal(t).then(n=>{var i;let s;const l=[];if(n!=null&&n.generatedImages)for(const u of n.generatedImages)u&&(u!=null&&u.safetyAttributes)&&((i=u==null?void 0:u.safetyAttributes)===null||i===void 0?void 0:i.contentType)==="Positive Prompt"?s=u==null?void 0:u.safetyAttributes:l.push(u);let c;return s?c={generatedImages:l,positivePromptSafetyAttributes:s}:c={generatedImages:l},c}),this.list=async t=>{var n;const l={config:Object.assign(Object.assign({},{queryBase:!0}),t==null?void 0:t.config)};if(this.apiClient.isVertexAI()&&!l.config.queryBase){if(!((n=l.config)===null||n===void 0)&&n.filter)throw new Error("Filtering tuned models list for Vertex AI is not currently supported");l.config.filter="labels.tune-type:*"}return new It(Be.PAGED_ITEM_MODELS,c=>this.listInternal(c),await this.listInternal(l),l)},this.editImage=async t=>{const n={model:t.model,prompt:t.prompt,referenceImages:[],config:t.config};return t.referenceImages&&t.referenceImages&&(n.referenceImages=t.referenceImages.map(i=>i.toReferenceImageAPI())),await this.editImageInternal(n)},this.upscaleImage=async t=>{let n={numberOfImages:1,mode:"upscale"};t.config&&(n=Object.assign(Object.assign({},n),t.config));const i={model:t.model,image:t.image,upscaleFactor:t.upscaleFactor,config:n};return await this.upscaleImageInternal(i)}}async processParamsForMcpUsage(e){var t,n,i;const s=(t=e.config)===null||t===void 0?void 0:t.tools;if(!s)return e;const l=await Promise.all(s.map(async u=>ut(u)?await u.tool():u)),c={model:e.model,contents:e.contents,config:Object.assign(Object.assign({},e.config),{tools:l})};if(c.config.tools=l,e.config&&e.config.tools&&Li(e.config.tools)){const u=(i=(n=e.config.httpOptions)===null||n===void 0?void 0:n.headers)!==null&&i!==void 0?i:{};let d=Object.assign({},u);Object.keys(d).length===0&&(d=this.apiClient.getDefaultHeaders()),Fi(d),c.config.httpOptions=Object.assign(Object.assign({},e.config.httpOptions),{headers:d})}return c}async initAfcToolsMap(e){var t,n,i;const s=new Map;for(const l of(n=(t=e.config)===null||t===void 0?void 0:t.tools)!==null&&n!==void 0?n:[])if(ut(l)){const c=l,u=await c.tool();for(const d of(i=u.functionDeclarations)!==null&&i!==void 0?i:[]){if(!d.name)throw new Error("Function declaration name is required.");if(s.has(d.name))throw new Error(`Duplicate tool declaration name: ${d.name}`);s.set(d.name,c)}}return s}async processAfcStream(e){var t,n,i;const s=(i=(n=(t=e.config)===null||t===void 0?void 0:t.automaticFunctionCalling)===null||n===void 0?void 0:n.maximumRemoteCalls)!==null&&i!==void 0?i:Ho;let l=!1,c=0;const u=await this.initAfcToolsMap(e);return function(d,p,f){var h,m;return Xe(this,arguments,function*(){for(var g,v,y,T;c<s;){l&&(c++,l=!1);const V=yield H(d.processParamsForMcpUsage(f)),G=yield H(d.generateContentStreamInternal(V)),O=[],j=[];try{for(var P=!0,M=(v=void 0,dt(G)),D;D=yield H(M.next()),g=D.done,!g;P=!0){T=D.value,P=!1;const F=T;if(yield yield H(F),F.candidates&&(!((h=F.candidates[0])===null||h===void 0)&&h.content)){j.push(F.candidates[0].content);for(const B of(m=F.candidates[0].content.parts)!==null&&m!==void 0?m:[])if(c<s&&B.functionCall){if(!B.functionCall.name)throw new Error("Function call name was not returned by the model.");if(p.has(B.functionCall.name)){const oe=yield H(p.get(B.functionCall.name).callTool([B.functionCall]));O.push(...oe)}else throw new Error(`Automatic function calling was requested, but not all the tools the model used implement the CallableTool interface. Available tools: ${p.keys()}, mising tool: ${B.functionCall.name}`)}}}}catch(F){v={error:F}}finally{try{!P&&!g&&(y=M.return)&&(yield H(y.call(M)))}finally{if(v)throw v.error}}if(O.length>0){l=!0;const F=new We;F.candidates=[{content:{role:"user",parts:O}}],yield yield H(F);const B=[];B.push(...j),B.push({role:"user",parts:O});const oe=ee(d.apiClient,f.contents).concat(B);f.contents=oe}else break}})}(this,u,e)}async generateContentInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Uo(this.apiClient,e);return c=S("{model}:generateContent",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Oo(this.apiClient,p),h=new We;return Object.assign(h,f),h})}else{const d=Fo(this.apiClient,e);return c=S("{model}:generateContent",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Vo(this.apiClient,p),h=new We;return Object.assign(h,f),h})}}async generateContentStreamInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Uo(this.apiClient,e);c=S("{model}:streamGenerateContent?alt=sse",d._url),u=d._query,delete d.config,delete d._url,delete d._query;const p=this.apiClient;return l=p.requestStream({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}),l.then(function(f){return Xe(this,arguments,function*(){var h,m,g,v;try{for(var y=!0,T=dt(f),P;P=yield H(T.next()),h=P.done,!h;y=!0){v=P.value,y=!1;const D=Oo(p,yield H(v.json())),V=new We;Object.assign(V,D),yield yield H(V)}}catch(M){m={error:M}}finally{try{!y&&!h&&(g=T.return)&&(yield H(g.call(T)))}finally{if(m)throw m.error}}})})}else{const d=Fo(this.apiClient,e);c=S("{model}:streamGenerateContent?alt=sse",d._url),u=d._query,delete d.config,delete d._url,delete d._query;const p=this.apiClient;return l=p.requestStream({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}),l.then(function(f){return Xe(this,arguments,function*(){var h,m,g,v;try{for(var y=!0,T=dt(f),P;P=yield H(T.next()),h=P.done,!h;y=!0){v=P.value,y=!1;const D=Vo(p,yield H(v.json())),V=new We;Object.assign(V,D),yield yield H(V)}}catch(M){m={error:M}}finally{try{!y&&!h&&(g=T.return)&&(yield H(g.call(T)))}finally{if(m)throw m.error}}})})}}async embedContent(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=rd(this.apiClient,e);return c=S("{model}:predict",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=ru(this.apiClient,p),h=new vo;return Object.assign(h,f),h})}else{const d=wc(this.apiClient,e);return c=S("{model}:batchEmbedContents",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Vd(this.apiClient,p),h=new vo;return Object.assign(h,f),h})}}async generateImagesInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=ld(this.apiClient,e);return c=S("{model}:predict",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=lu(this.apiClient,p),h=new yo;return Object.assign(h,f),h})}else{const d=Tc(this.apiClient,e);return c=S("{model}:predict",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Gd(this.apiClient,p),h=new yo;return Object.assign(h,f),h})}}async editImageInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const c=md(this.apiClient,e);return s=S("{model}:predict",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>{const d=cu(this.apiClient,u),p=new Fs;return Object.assign(p,d),p})}else throw new Error("This method is only supported by the Vertex AI.")}async upscaleImageInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const c=vd(this.apiClient,e);return s=S("{model}:predict",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>{const d=du(this.apiClient,u),p=new Us;return Object.assign(p,d),p})}else throw new Error("This method is only supported by the Vertex AI.")}async get(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=yd(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>nn(this.apiClient,p))}else{const d=Ec(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>tn(this.apiClient,p))}}async listInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=bd(this.apiClient,e);return c=S("{models_url}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=hu(this.apiClient,p),h=new xo;return Object.assign(h,f),h})}else{const d=Mc(this.apiClient,e);return c=S("{models_url}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Hd(this.apiClient,p),h=new xo;return Object.assign(h,f),h})}}async update(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=wd(this.apiClient,e);return c=S("{model}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>nn(this.apiClient,p))}else{const d=Ic(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"PATCH",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>tn(this.apiClient,p))}}async delete(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=_d(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(()=>{const p=mu(),f=new bo;return Object.assign(f,p),f})}else{const d=kc(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"DELETE",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(()=>{const p=zd(),f=new bo;return Object.assign(f,p),f})}}async countTokens(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Ed(this.apiClient,e);return c=S("{model}:countTokens",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=gu(this.apiClient,p),h=new Co;return Object.assign(h,f),h})}else{const d=Rc(this.apiClient,e);return c=S("{model}:countTokens",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Wd(this.apiClient,p),h=new Co;return Object.assign(h,f),h})}}async computeTokens(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const c=Sd(this.apiClient,e);return s=S("{model}:computeTokens",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>{const d=vu(this.apiClient,u),p=new Vs;return Object.assign(p,d),p})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideos(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Ad(this.apiClient,e);return c=S("{model}:predictLongRunning",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>Cu(this.apiClient,p))}else{const d=$c(this.apiClient,e);return c=S("{model}:predictLongRunning",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"POST",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>Zd(this.apiClient,p))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function zu(o,e){const t={},n=r(e,["operationName"]);n!=null&&a(t,["_url","operationName"],n);const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function Wu(o,e){const t={},n=r(e,["operationName"]);n!=null&&a(t,["_url","operationName"],n);const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function Ju(o,e){const t={},n=r(e,["operationName"]);n!=null&&a(t,["operationName"],n);const i=r(e,["resourceName"]);i!=null&&a(t,["_url","resourceName"],i);const s=r(e,["config"]);return s!=null&&a(t,["config"],s),t}function Yu(o,e){const t={},n=r(e,["video","uri"]);n!=null&&a(t,["uri"],n);const i=r(e,["video","encodedVideo"]);i!=null&&a(t,["videoBytes"],be(o,i));const s=r(e,["encoding"]);return s!=null&&a(t,["mimeType"],s),t}function Ku(o,e){const t={},n=r(e,["_self"]);return n!=null&&a(t,["video"],Yu(o,n)),t}function Zu(o,e){const t={},n=r(e,["generatedSamples"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>Ku(o,c))),a(t,["generatedVideos"],l)}const i=r(e,["raiMediaFilteredCount"]);i!=null&&a(t,["raiMediaFilteredCount"],i);const s=r(e,["raiMediaFilteredReasons"]);return s!=null&&a(t,["raiMediaFilteredReasons"],s),t}function Xu(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["metadata"]);i!=null&&a(t,["metadata"],i);const s=r(e,["done"]);s!=null&&a(t,["done"],s);const l=r(e,["error"]);l!=null&&a(t,["error"],l);const c=r(e,["response","generateVideoResponse"]);return c!=null&&a(t,["response"],Zu(o,c)),t}function Qu(o,e){const t={},n=r(e,["gcsUri"]);n!=null&&a(t,["uri"],n);const i=r(e,["bytesBase64Encoded"]);i!=null&&a(t,["videoBytes"],be(o,i));const s=r(e,["mimeType"]);return s!=null&&a(t,["mimeType"],s),t}function ju(o,e){const t={},n=r(e,["_self"]);return n!=null&&a(t,["video"],Qu(o,n)),t}function ep(o,e){const t={},n=r(e,["videos"]);if(n!=null){let l=n;Array.isArray(l)&&(l=l.map(c=>ju(o,c))),a(t,["generatedVideos"],l)}const i=r(e,["raiMediaFilteredCount"]);i!=null&&a(t,["raiMediaFilteredCount"],i);const s=r(e,["raiMediaFilteredReasons"]);return s!=null&&a(t,["raiMediaFilteredReasons"],s),t}function Jo(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["metadata"]);i!=null&&a(t,["metadata"],i);const s=r(e,["done"]);s!=null&&a(t,["done"],s);const l=r(e,["error"]);l!=null&&a(t,["error"],l);const c=r(e,["response"]);return c!=null&&a(t,["response"],ep(o,c)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class tp extends it{constructor(e){super(),this.apiClient=e}async getVideosOperation(e){const t=e.operation,n=e.config;if(t.name===void 0||t.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const i=t.name.split("/operations/")[0];let s;return n&&"httpOptions"in n&&(s=n.httpOptions),this.fetchPredictVideosOperationInternal({operationName:t.name,resourceName:i,config:{httpOptions:s}})}else return this.getVideosOperationInternal({operationName:t.name,config:n})}async getVideosOperationInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=Wu(this.apiClient,e);return c=S("{operationName}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>Jo(this.apiClient,p))}else{const d=zu(this.apiClient,e);return c=S("{operationName}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>Xu(this.apiClient,p))}}async fetchPredictVideosOperationInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const c=Ju(this.apiClient,e);return s=S("{resourceName}:fetchPredictOperation",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>Jo(this.apiClient,u))}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function np(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],n);const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function op(o,e,t){const n={},i=r(e,["pageSize"]);t!==void 0&&i!=null&&a(t,["_query","pageSize"],i);const s=r(e,["pageToken"]);t!==void 0&&s!=null&&a(t,["_query","pageToken"],s);const l=r(e,["filter"]);return t!==void 0&&l!=null&&a(t,["_query","filter"],l),n}function ip(o,e){const t={},n=r(e,["config"]);return n!=null&&a(t,["config"],op(o,n,t)),t}function sp(o,e){const t={},n=r(e,["textInput"]);n!=null&&a(t,["textInput"],n);const i=r(e,["output"]);return i!=null&&a(t,["output"],i),t}function rp(o,e){const t={};if(r(e,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=r(e,["examples"]);if(n!=null){let i=n;Array.isArray(i)&&(i=i.map(s=>sp(o,s))),a(t,["examples","examples"],i)}return t}function ap(o,e,t){const n={};if(r(e,["validationDataset"])!==void 0)throw new Error("validationDataset parameter is not supported in Gemini API.");const i=r(e,["tunedModelDisplayName"]);if(t!==void 0&&i!=null&&a(t,["displayName"],i),r(e,["description"])!==void 0)throw new Error("description parameter is not supported in Gemini API.");const s=r(e,["epochCount"]);t!==void 0&&s!=null&&a(t,["tuningTask","hyperparameters","epochCount"],s);const l=r(e,["learningRateMultiplier"]);if(l!=null&&a(n,["tuningTask","hyperparameters","learningRateMultiplier"],l),r(e,["exportLastCheckpointOnly"])!==void 0)throw new Error("exportLastCheckpointOnly parameter is not supported in Gemini API.");if(r(e,["adapterSize"])!==void 0)throw new Error("adapterSize parameter is not supported in Gemini API.");const c=r(e,["batchSize"]);t!==void 0&&c!=null&&a(t,["tuningTask","hyperparameters","batchSize"],c);const u=r(e,["learningRate"]);return t!==void 0&&u!=null&&a(t,["tuningTask","hyperparameters","learningRate"],u),n}function lp(o,e){const t={},n=r(e,["baseModel"]);n!=null&&a(t,["baseModel"],n);const i=r(e,["trainingDataset"]);i!=null&&a(t,["tuningTask","trainingData"],rp(o,i));const s=r(e,["config"]);return s!=null&&a(t,["config"],ap(o,s,t)),t}function cp(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["_url","name"],n);const i=r(e,["config"]);return i!=null&&a(t,["config"],i),t}function dp(o,e,t){const n={},i=r(e,["pageSize"]);t!==void 0&&i!=null&&a(t,["_query","pageSize"],i);const s=r(e,["pageToken"]);t!==void 0&&s!=null&&a(t,["_query","pageToken"],s);const l=r(e,["filter"]);return t!==void 0&&l!=null&&a(t,["_query","filter"],l),n}function up(o,e){const t={},n=r(e,["config"]);return n!=null&&a(t,["config"],dp(o,n,t)),t}function pp(o,e,t){const n={},i=r(e,["gcsUri"]);if(t!==void 0&&i!=null&&a(t,["supervisedTuningSpec","trainingDatasetUri"],i),r(e,["examples"])!==void 0)throw new Error("examples parameter is not supported in Vertex AI.");return n}function fp(o,e){const t={},n=r(e,["gcsUri"]);return n!=null&&a(t,["validationDatasetUri"],n),t}function hp(o,e,t){const n={},i=r(e,["validationDataset"]);t!==void 0&&i!=null&&a(t,["supervisedTuningSpec"],fp(o,i));const s=r(e,["tunedModelDisplayName"]);t!==void 0&&s!=null&&a(t,["tunedModelDisplayName"],s);const l=r(e,["description"]);t!==void 0&&l!=null&&a(t,["description"],l);const c=r(e,["epochCount"]);t!==void 0&&c!=null&&a(t,["supervisedTuningSpec","hyperParameters","epochCount"],c);const u=r(e,["learningRateMultiplier"]);t!==void 0&&u!=null&&a(t,["supervisedTuningSpec","hyperParameters","learningRateMultiplier"],u);const d=r(e,["exportLastCheckpointOnly"]);t!==void 0&&d!=null&&a(t,["supervisedTuningSpec","exportLastCheckpointOnly"],d);const p=r(e,["adapterSize"]);if(t!==void 0&&p!=null&&a(t,["supervisedTuningSpec","hyperParameters","adapterSize"],p),r(e,["batchSize"])!==void 0)throw new Error("batchSize parameter is not supported in Vertex AI.");if(r(e,["learningRate"])!==void 0)throw new Error("learningRate parameter is not supported in Vertex AI.");return n}function mp(o,e){const t={},n=r(e,["baseModel"]);n!=null&&a(t,["baseModel"],n);const i=r(e,["trainingDataset"]);i!=null&&a(t,["supervisedTuningSpec","trainingDatasetUri"],pp(o,i,t));const s=r(e,["config"]);return s!=null&&a(t,["config"],hp(o,s,t)),t}function gp(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["model"],n);const i=r(e,["name"]);return i!=null&&a(t,["endpoint"],i),t}function Ui(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["state"]);i!=null&&a(t,["state"],Ci(o,i));const s=r(e,["createTime"]);s!=null&&a(t,["createTime"],s);const l=r(e,["tuningTask","startTime"]);l!=null&&a(t,["startTime"],l);const c=r(e,["tuningTask","completeTime"]);c!=null&&a(t,["endTime"],c);const u=r(e,["updateTime"]);u!=null&&a(t,["updateTime"],u);const d=r(e,["description"]);d!=null&&a(t,["description"],d);const p=r(e,["baseModel"]);p!=null&&a(t,["baseModel"],p);const f=r(e,["_self"]);f!=null&&a(t,["tunedModel"],gp(o,f));const h=r(e,["distillationSpec"]);h!=null&&a(t,["distillationSpec"],h);const m=r(e,["experiment"]);m!=null&&a(t,["experiment"],m);const g=r(e,["labels"]);g!=null&&a(t,["labels"],g);const v=r(e,["pipelineJob"]);v!=null&&a(t,["pipelineJob"],v);const y=r(e,["tunedModelDisplayName"]);return y!=null&&a(t,["tunedModelDisplayName"],y),t}function vp(o,e){const t={},n=r(e,["nextPageToken"]);n!=null&&a(t,["nextPageToken"],n);const i=r(e,["tunedModels"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(l=>Ui(o,l))),a(t,["tuningJobs"],s)}return t}function yp(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["metadata"]);i!=null&&a(t,["metadata"],i);const s=r(e,["done"]);s!=null&&a(t,["done"],s);const l=r(e,["error"]);return l!=null&&a(t,["error"],l),t}function xp(o,e){const t={},n=r(e,["checkpointId"]);n!=null&&a(t,["checkpointId"],n);const i=r(e,["epoch"]);i!=null&&a(t,["epoch"],i);const s=r(e,["step"]);s!=null&&a(t,["step"],s);const l=r(e,["endpoint"]);return l!=null&&a(t,["endpoint"],l),t}function bp(o,e){const t={},n=r(e,["model"]);n!=null&&a(t,["model"],n);const i=r(e,["endpoint"]);i!=null&&a(t,["endpoint"],i);const s=r(e,["checkpoints"]);if(s!=null){let l=s;Array.isArray(l)&&(l=l.map(c=>xp(o,c))),a(t,["checkpoints"],l)}return t}function rn(o,e){const t={},n=r(e,["name"]);n!=null&&a(t,["name"],n);const i=r(e,["state"]);i!=null&&a(t,["state"],Ci(o,i));const s=r(e,["createTime"]);s!=null&&a(t,["createTime"],s);const l=r(e,["startTime"]);l!=null&&a(t,["startTime"],l);const c=r(e,["endTime"]);c!=null&&a(t,["endTime"],c);const u=r(e,["updateTime"]);u!=null&&a(t,["updateTime"],u);const d=r(e,["error"]);d!=null&&a(t,["error"],d);const p=r(e,["description"]);p!=null&&a(t,["description"],p);const f=r(e,["baseModel"]);f!=null&&a(t,["baseModel"],f);const h=r(e,["tunedModel"]);h!=null&&a(t,["tunedModel"],bp(o,h));const m=r(e,["supervisedTuningSpec"]);m!=null&&a(t,["supervisedTuningSpec"],m);const g=r(e,["tuningDataStats"]);g!=null&&a(t,["tuningDataStats"],g);const v=r(e,["encryptionSpec"]);v!=null&&a(t,["encryptionSpec"],v);const y=r(e,["partnerModelTuningSpec"]);y!=null&&a(t,["partnerModelTuningSpec"],y);const T=r(e,["distillationSpec"]);T!=null&&a(t,["distillationSpec"],T);const P=r(e,["experiment"]);P!=null&&a(t,["experiment"],P);const M=r(e,["labels"]);M!=null&&a(t,["labels"],M);const D=r(e,["pipelineJob"]);D!=null&&a(t,["pipelineJob"],D);const V=r(e,["tunedModelDisplayName"]);return V!=null&&a(t,["tunedModelDisplayName"],V),t}function Cp(o,e){const t={},n=r(e,["nextPageToken"]);n!=null&&a(t,["nextPageToken"],n);const i=r(e,["tuningJobs"]);if(i!=null){let s=i;Array.isArray(s)&&(s=s.map(l=>rn(o,l))),a(t,["tuningJobs"],s)}return t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class wp extends it{constructor(e){super(),this.apiClient=e,this.get=async t=>await this.getInternal(t),this.list=async(t={})=>new It(Be.PAGED_ITEM_TUNING_JOBS,n=>this.listInternal(n),await this.listInternal(t),t),this.tune=async t=>{if(this.apiClient.isVertexAI())return await this.tuneInternal(t);{const n=await this.tuneMldevInternal(t);let i="";return n.metadata!==void 0&&n.metadata.tunedModel!==void 0?i=n.metadata.tunedModel:n.name!==void 0&&n.name.includes("/operations/")&&(i=n.name.split("/operations/")[0]),{name:i,state:Zt.JOB_STATE_QUEUED}}}}async getInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=cp(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>rn(this.apiClient,p))}else{const d=np(this.apiClient,e);return c=S("{name}",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>Ui(this.apiClient,p))}}async listInternal(e){var t,n,i,s;let l,c="",u={};if(this.apiClient.isVertexAI()){const d=up(this.apiClient,e);return c=S("tuningJobs",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(p=>p.json()),l.then(p=>{const f=Cp(this.apiClient,p),h=new wo;return Object.assign(h,f),h})}else{const d=ip(this.apiClient,e);return c=S("tunedModels",d._url),u=d._query,delete d.config,delete d._url,delete d._query,l=this.apiClient.request({path:c,queryParams:u,body:JSON.stringify(d),httpMethod:"GET",httpOptions:(i=e.config)===null||i===void 0?void 0:i.httpOptions,abortSignal:(s=e.config)===null||s===void 0?void 0:s.abortSignal}).then(p=>p.json()),l.then(p=>{const f=vp(this.apiClient,p),h=new wo;return Object.assign(h,f),h})}}async tuneInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const c=mp(this.apiClient,e);return s=S("tuningJobs",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>rn(this.apiClient,u))}else throw new Error("This method is only supported by the Vertex AI.")}async tuneMldevInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const c=lp(this.apiClient,e);return s=S("tunedModels",c._url),l=c._query,delete c.config,delete c._url,delete c._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(c),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions,abortSignal:(n=e.config)===null||n===void 0?void 0:n.abortSignal}).then(u=>u.json()),i.then(u=>yp(this.apiClient,u))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class _p{async download(e,t){throw new Error("Download to file is not supported in the browser, please use a browser compliant download like an <a> tag.")}}const Tp=1024*1024*8,Ep=3,Sp=1e3,Mp=2,Lt="x-goog-upload-status";async function Ap(o,e,t){var n,i,s;let l=0,c=0,u=new Xt(new Response),d="upload";for(l=o.size;c<l;){const f=Math.min(Tp,l-c),h=o.slice(c,c+f);c+f>=l&&(d+=", finalize");let m=0,g=Sp;for(;m<Ep&&(u=await t.request({path:"",body:h,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:e,headers:{"X-Goog-Upload-Command":d,"X-Goog-Upload-Offset":String(c),"Content-Length":String(f)}}}),!(!((n=u==null?void 0:u.headers)===null||n===void 0)&&n[Lt]));)m++,await kp(g),g=g*Mp;if(c+=f,((i=u==null?void 0:u.headers)===null||i===void 0?void 0:i[Lt])!=="active")break;if(l<=c)throw new Error("All content has been uploaded, but the upload status is not finalized.")}const p=await(u==null?void 0:u.json());if(((s=u==null?void 0:u.headers)===null||s===void 0?void 0:s[Lt])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return p.file}async function Ip(o){return{size:o.size,type:o.type}}function kp(o){return new Promise(e=>setTimeout(e,o))}class Pp{async upload(e,t,n){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Ap(e,t,n)}async stat(e){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Ip(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Rp{create(e,t,n){return new Dp(e,t,n)}}class Dp{constructor(e,t,n){this.url=e,this.headers=t,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(e){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.send(e)}close(){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.close()}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Yo="x-goog-api-key";class Np{constructor(e){this.apiKey=e}async addAuthHeaders(e){e.get(Yo)===null&&e.append(Yo,this.apiKey)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const $p="gl-node/";class Lp{constructor(e){var t;if(e.apiKey==null)throw new Error("An API Key must be set when running in a browser");if(e.project||e.location)throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");this.vertexai=(t=e.vertexai)!==null&&t!==void 0?t:!1,this.apiKey=e.apiKey;const n=Ls(e,void 0,void 0);n&&(e.httpOptions?e.httpOptions.baseUrl=n:e.httpOptions={baseUrl:n}),this.apiVersion=e.apiVersion;const i=new Np(this.apiKey);this.apiClient=new Iu({auth:i,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:e.httpOptions,userAgentExtra:$p+"web",uploader:new Pp,downloader:new _p}),this.models=new Hu(this.apiClient),this.live=new Vu(this.apiClient,i,new Rp),this.chats=new ta(this.models,this.apiClient),this.caches=new Qr(this.apiClient),this.files=new ha(this.apiClient),this.operations=new tp(this.apiClient),this.tunings=new wp(this.apiClient)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=globalThis,pn=pt.ShadowRoot&&(pt.ShadyCSS===void 0||pt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fn=Symbol(),Ko=new WeakMap;let Vi=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==fn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(pn&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=Ko.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ko.set(t,e))}return e}toString(){return this.cssText}};const Fp=o=>new Vi(typeof o=="string"?o:o+"",void 0,fn),te=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((n,i,s)=>n+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[s+1],o[0]);return new Vi(t,o,fn)},Up=(o,e)=>{if(pn)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),i=pt.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,o.appendChild(n)}},Zo=pn?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return Fp(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Vp,defineProperty:Op,getOwnPropertyDescriptor:Bp,getOwnPropertyNames:Gp,getOwnPropertySymbols:qp,getPrototypeOf:Hp}=Object,me=globalThis,Xo=me.trustedTypes,zp=Xo?Xo.emptyScript:"",Ft=me.reactiveElementPolyfillSupport,Qe=(o,e)=>o,wt={toAttribute(o,e){switch(e){case Boolean:o=o?zp:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},hn=(o,e)=>!Vp(o,e),Qo={attribute:!0,type:String,converter:wt,reflect:!1,useDefault:!1,hasChanged:hn};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),me.litPropertyMetadata??(me.litPropertyMetadata=new WeakMap);let Ne=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Qo){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&Op(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:s}=Bp(this.prototype,e)??{get(){return this[t]},set(l){this[t]=l}};return{get:i,set(l){const c=i==null?void 0:i.call(this);s==null||s.call(this,l),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Qo}static _$Ei(){if(this.hasOwnProperty(Qe("elementProperties")))return;const e=Hp(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Qe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Qe("properties"))){const t=this.properties,n=[...Gp(t),...qp(t)];for(const i of n)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)t.unshift(Zo(i))}else e!==void 0&&t.push(Zo(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Up(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var n;return(n=t.hostConnected)==null?void 0:n.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var n;return(n=t.hostDisconnected)==null?void 0:n.call(t)})}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){var s;const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const l=(((s=n.converter)==null?void 0:s.toAttribute)!==void 0?n.converter:wt).toAttribute(t,n.type);this._$Em=e,l==null?this.removeAttribute(i):this.setAttribute(i,l),this._$Em=null}}_$AK(e,t){var s,l;const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const c=n.getPropertyOptions(i),u=typeof c.converter=="function"?{fromAttribute:c.converter}:((s=c.converter)==null?void 0:s.fromAttribute)!==void 0?c.converter:wt;this._$Em=i;const d=u.fromAttribute(t,c.type);this[i]=d??((l=this._$Ej)==null?void 0:l.get(i))??d,this._$Em=null}}requestUpdate(e,t,n){var i;if(e!==void 0){const s=this.constructor,l=this[e];if(n??(n=s.getPropertyOptions(e)),!((n.hasChanged??hn)(l,t)||n.useDefault&&n.reflect&&l===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(s._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},l){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,l??t??this[e]),s!==!0||l!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,l]of this._$Ep)this[s]=l;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,l]of i){const{wrapped:c}=l,u=this[s];c!==!0||this._$AL.has(s)||u===void 0||this.C(s,void 0,l,u)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(n=this._$EO)==null||n.forEach(i=>{var s;return(s=i.hostUpdate)==null?void 0:s.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(n=>{var i;return(i=n.hostUpdated)==null?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};Ne.elementStyles=[],Ne.shadowRootOptions={mode:"open"},Ne[Qe("elementProperties")]=new Map,Ne[Qe("finalized")]=new Map,Ft==null||Ft({ReactiveElement:Ne}),(me.reactiveElementVersions??(me.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const je=globalThis,_t=je.trustedTypes,jo=_t?_t.createPolicy("lit-html",{createHTML:o=>o}):void 0,Oi="$lit$",fe=`lit$${Math.random().toFixed(9).slice(2)}$`,Bi="?"+fe,Wp=`<${Bi}>`,Ae=document,tt=()=>Ae.createComment(""),nt=o=>o===null||typeof o!="object"&&typeof o!="function",mn=Array.isArray,Jp=o=>mn(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Ut=`[ 	
\f\r]`,Je=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ei=/-->/g,ti=/>/g,we=RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ni=/'/g,oi=/"/g,Gi=/^(?:script|style|textarea|title)$/i,qi=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),w=qi(1),Vt=qi(2),ye=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),ii=new WeakMap,_e=Ae.createTreeWalker(Ae,129);function Hi(o,e){if(!mn(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return jo!==void 0?jo.createHTML(e):e}const Yp=(o,e)=>{const t=o.length-1,n=[];let i,s=e===2?"<svg>":e===3?"<math>":"",l=Je;for(let c=0;c<t;c++){const u=o[c];let d,p,f=-1,h=0;for(;h<u.length&&(l.lastIndex=h,p=l.exec(u),p!==null);)h=l.lastIndex,l===Je?p[1]==="!--"?l=ei:p[1]!==void 0?l=ti:p[2]!==void 0?(Gi.test(p[2])&&(i=RegExp("</"+p[2],"g")),l=we):p[3]!==void 0&&(l=we):l===we?p[0]===">"?(l=i??Je,f=-1):p[1]===void 0?f=-2:(f=l.lastIndex-p[2].length,d=p[1],l=p[3]===void 0?we:p[3]==='"'?oi:ni):l===oi||l===ni?l=we:l===ei||l===ti?l=Je:(l=we,i=void 0);const m=l===we&&o[c+1].startsWith("/>")?" ":"";s+=l===Je?u+Wp:f>=0?(n.push(d),u.slice(0,f)+Oi+u.slice(f)+fe+m):u+fe+(f===-2?c:m)}return[Hi(o,s+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class ot{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,l=0;const c=e.length-1,u=this.parts,[d,p]=Yp(e,t);if(this.el=ot.createElement(d,n),_e.currentNode=this.el.content,t===2||t===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=_e.nextNode())!==null&&u.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const f of i.getAttributeNames())if(f.endsWith(Oi)){const h=p[l++],m=i.getAttribute(f).split(fe),g=/([.?@])?(.*)/.exec(h);u.push({type:1,index:s,name:g[2],strings:m,ctor:g[1]==="."?Zp:g[1]==="?"?Xp:g[1]==="@"?Qp:Pt}),i.removeAttribute(f)}else f.startsWith(fe)&&(u.push({type:6,index:s}),i.removeAttribute(f));if(Gi.test(i.tagName)){const f=i.textContent.split(fe),h=f.length-1;if(h>0){i.textContent=_t?_t.emptyScript:"";for(let m=0;m<h;m++)i.append(f[m],tt()),_e.nextNode(),u.push({type:2,index:++s});i.append(f[h],tt())}}}else if(i.nodeType===8)if(i.data===Bi)u.push({type:2,index:s});else{let f=-1;for(;(f=i.data.indexOf(fe,f+1))!==-1;)u.push({type:7,index:s}),f+=fe.length-1}s++}}static createElement(e,t){const n=Ae.createElement("template");return n.innerHTML=e,n}}function Ge(o,e,t=o,n){var l,c;if(e===ye)return e;let i=n!==void 0?(l=t._$Co)==null?void 0:l[n]:t._$Cl;const s=nt(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==s&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,t,n)),n!==void 0?(t._$Co??(t._$Co=[]))[n]=i:t._$Cl=i),i!==void 0&&(e=Ge(o,i._$AS(o,e.values),i,n)),e}class Kp{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=((e==null?void 0:e.creationScope)??Ae).importNode(t,!0);_e.currentNode=i;let s=_e.nextNode(),l=0,c=0,u=n[0];for(;u!==void 0;){if(l===u.index){let d;u.type===2?d=new st(s,s.nextSibling,this,e):u.type===1?d=new u.ctor(s,u.name,u.strings,this,e):u.type===6&&(d=new jp(s,this,e)),this._$AV.push(d),u=n[++c]}l!==(u==null?void 0:u.index)&&(s=_e.nextNode(),l++)}return _e.currentNode=Ae,i}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class st{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ge(this,e,t),nt(e)?e===W||e==null||e===""?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==ye&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Jp(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&nt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ae.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ot.createElement(Hi(n.h,n.h[0]),this.options)),n);if(((s=this._$AH)==null?void 0:s._$AD)===i)this._$AH.p(t);else{const l=new Kp(i,this),c=l.u(this.options);l.p(t),this.T(c),this._$AH=l}}_$AC(e){let t=ii.get(e.strings);return t===void 0&&ii.set(e.strings,t=new ot(e)),t}k(e){mn(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const s of e)i===t.length?t.push(n=new st(this.O(tt()),this.O(tt()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,t);e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Pt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=W}_$AI(e,t=this,n,i){const s=this.strings;let l=!1;if(s===void 0)e=Ge(this,e,t,0),l=!nt(e)||e!==this._$AH&&e!==ye,l&&(this._$AH=e);else{const c=e;let u,d;for(e=s[0],u=0;u<s.length-1;u++)d=Ge(this,c[n+u],t,u),d===ye&&(d=this._$AH[u]),l||(l=!nt(d)||d!==this._$AH[u]),d===W?e=W:e!==W&&(e+=(d??"")+s[u+1]),this._$AH[u]=d}l&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Zp extends Pt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class Xp extends Pt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class Qp extends Pt{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=Ge(this,e,t,0)??W)===ye)return;const n=this._$AH,i=e===W&&n!==W||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==W&&(n===W||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class jp{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ge(this,e)}}const Ot=je.litHtmlPolyfillSupport;Ot==null||Ot(ot,st),(je.litHtmlVersions??(je.litHtmlVersions=[])).push("3.3.1");const ef=(o,e,t)=>{const n=(t==null?void 0:t.renderBefore)??e;let i=n._$litPart$;if(i===void 0){const s=(t==null?void 0:t.renderBefore)??null;n._$litPart$=i=new st(e.insertBefore(tt(),s),s,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Te=globalThis;let Y=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ef(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ye}};var ui;Y._$litElement$=!0,Y.finalized=!0,(ui=Te.litElementHydrateSupport)==null||ui.call(Te,{LitElement:Y});const Bt=Te.litElementPolyfillSupport;Bt==null||Bt({LitElement:Y});(Te.litElementVersions??(Te.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tf={attribute:!0,type:String,converter:wt,reflect:!1,hasChanged:hn},nf=(o=tf,e,t)=>{const{kind:n,metadata:i}=t;let s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),n==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(t.name,o),n==="accessor"){const{name:l}=t;return{set(c){const u=e.get.call(this);e.set.call(this,c),this.requestUpdate(l,u,o)},init(c){return c!==void 0&&this.C(l,void 0,o,c),c}}}if(n==="setter"){const{name:l}=t;return function(c){const u=this[l];e.call(this,c),this.requestUpdate(l,u,o)}}throw Error("Unsupported decorator location: "+n)};function L(o){return(e,t)=>typeof t=="object"?nf(o,e,t):((n,i,s)=>{const l=i.hasOwnProperty(s);return i.constructor.createProperty(s,n),l?Object.getOwnPropertyDescriptor(i,s):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(o){return L({...o,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const of=(o,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(o,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function zi(o,e){return(t,n,i)=>{const s=l=>{var c;return((c=l.renderRoot)==null?void 0:c.querySelector(o))??null};return of(t,n,{get(){return s(this)}})}}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/function Wi(o,e){let t=-1/0,n;return(...i)=>{const s=Date.now();return s-t>=e&&(n=o(...i),t=s),n}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ji={ATTRIBUTE:1},Yi=o=>(...e)=>({_$litDirective$:o,values:e});let Ki=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zi=Yi(class extends Ki{constructor(o){var e;if(super(o),o.type!==Ji.ATTRIBUTE||o.name!=="class"||((e=o.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var n,i;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!((n=this.nt)!=null&&n.has(s))&&this.st.add(s);return this.render(e)}const t=o.element.classList;for(const s of this.st)s in e||(t.remove(s),this.st.delete(s));for(const s in e){const l=!!e[s];l===this.st.has(s)||(i=this.nt)!=null&&i.has(s)||(l?(t.add(s),this.st.add(s)):(t.remove(s),this.st.delete(s)))}return ye}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xi="important",sf=" !"+Xi,Gt=Yi(class extends Ki{constructor(o){var e;if(super(o),o.type!==Ji.ATTRIBUTE||o.name!=="style"||((e=o.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((e,t)=>{const n=o[t];return n==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(o,[e]){const{style:t}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const n of this.ft)e[n]==null&&(this.ft.delete(n),n.includes("-")?t.removeProperty(n):t[n]=null);for(const n in e){const i=e[n];if(i!=null){this.ft.add(n);const s=typeof i=="string"&&i.endsWith(sf);n.includes("-")||s?t.setProperty(n,s?i.slice(0,-11):i,s?Xi:""):t[n]=i}}return ye}});var rf=Object.defineProperty,af=Object.getOwnPropertyDescriptor,Rt=(o,e,t,n)=>{for(var i=n>1?void 0:n?af(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&rf(e,t,i),i};let qe=class extends Y{constructor(){super(),this.value=0,this.color="#000",this.audioLevel=0,this.isDragging=!1,this.dragStartX=0,this.dragStartValue=0,this.handlePointerDown=this.handlePointerDown.bind(this),this.handlePointerMove=this.handlePointerMove.bind(this),this.handlePointerUp=this.handlePointerUp.bind(this),this.handleWheel=this.handleWheel.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}updated(o){o.has("value")&&console.log("WeightSlider value updated to:",this.value)}handlePointerDown(o){o.preventDefault(),this.isDragging=!0,this.dragStartX=o.clientX,this.dragStartValue=this.value,document.body.classList.add("dragging"),this.setPointerCapture&&this.setPointerCapture(o.pointerId),window.addEventListener("pointermove",this.handlePointerMove),window.addEventListener("pointerup",this.handlePointerUp)}handlePointerMove(o){if(!this.isDragging)return;const e=o.clientX-this.dragStartX,t=window.innerWidth<=768?.005:.01,n=this.dragStartValue+e*t;this.setValue(Math.max(0,Math.min(2,n)))}handlePointerUp(){this.isDragging=!1,window.removeEventListener("pointermove",this.handlePointerMove),window.removeEventListener("pointerup",this.handlePointerUp),document.body.classList.remove("dragging")}handleWheel(o){o.preventDefault();const e=o.deltaX||o.deltaY,t=this.value+e*-.0025;this.setValue(Math.max(0,Math.min(2,t)))}handleKeyDown(o){let e=0;if((o.key==="ArrowRight"||o.key==="ArrowUp")&&(e=.1),(o.key==="ArrowLeft"||o.key==="ArrowDown")&&(e=-.1),e!==0){o.preventDefault();const t=Math.max(0,Math.min(2,this.value+e));this.setValue(t)}}setValue(o){this.value=o,this.dispatchEvent(new CustomEvent("input",{detail:this.value}))}getSliderFillWidth(){return`${this.value/2*100}%`}getSliderThumbPosition(){return`${this.value/2*100}%`}getAudioBars(){if(this.audioLevel===0)return[0,0,0,0,0];const e=Math.max(3,this.audioLevel*25);return[e*.6,e*.8,e,e*.7,e*.5]}getTickMarks(){const o=[];for(let e=0;e<=10;e++){const t=e/10*100,n=e%2===0;o.push(w`
        <div class="tick-mark ${n?"major":""}" style="left: ${t}%"></div>
        ${n?w`<div class="value-marker" style="left: ${t}%">${(e/10*2).toFixed(1)}</div>`:""}
      `)}return o}render(){const o=this.getSliderFillWidth(),e=this.getSliderThumbPosition(),t=this.getAudioBars(),n=Gt({width:o,background:this.color}),i=Gt({left:e}),s=Gt({background:this.color,opacity:this.value>0?"0.2":"0"});return w`
      <div class="slider-container"
           role="slider"
           tabindex="0"
           aria-label="Style weight"
           aria-valuemin="0"
           aria-valuemax="2"
           aria-valuenow=${this.value.toFixed(2)}
           @pointerdown=${this.handlePointerDown}
           @wheel=${this.handleWheel}
           @keydown=${this.handleKeyDown}>
        
        <div class="value-display">
          ${this.value.toFixed(2)}
        </div>
        
        <div class="slider-track">
          <div class="track-inner">
            <div class="tick-marks">
              ${this.getTickMarks()}
            </div>
            <div class="slider-fill" style=${n}></div>
            <div class="slider-thumb" style=${i}></div>
          </div>
        </div>
        
        <div class="audio-visualizer" style="color: ${this.color}">
          ${t.map(l=>w`
            <div class="audio-bar" style="height: ${l}px"></div>
          `)}
        </div>

        <div class="halo-effect ${this.value>0?"active":""}" style=${s}></div>
      </div>
    `}};qe.styles=te`
    :host {
      cursor: pointer;
      position: relative;
      width: 100%;
      height: 140px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      touch-action: none;
    }

    .slider-container {
      position: relative;
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .slider-track {
      position: relative;
      width: 100%;
      height: 14px;
      background: linear-gradient(to bottom, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%);
      border-radius: 7px;
      box-shadow: 
        inset 0 3px 6px rgba(0, 0, 0, 0.8), 
        0 2px 4px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      overflow: hidden;
      border: 2px solid #333;
      position: relative;
      z-index: 1;
    }

    .track-inner {
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0;
    }
    
    .slider-track::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        rgba(0, 255, 136, 0.1) 0%, 
        transparent 20%, 
        transparent 80%, 
        rgba(0, 255, 136, 0.1) 100%);
      opacity: 0.3;
    }

    .slider-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      border-radius: 7px;
      transition: width 0.1s ease;
      box-shadow: 
        inset 0 2px 4px rgba(255, 255, 255, 0.2),
        0 0 20px currentColor;
      background: linear-gradient(135deg, currentColor 0%, rgba(255, 255, 255, 0.8) 100%);
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .slider-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.3) 50%, 
        transparent 100%);
      animation: shimmer 2s ease-in-out infinite;
    }
    
    @keyframes shimmer {
      0%, 100% { transform: translateX(-100%); }
      50% { transform: translateX(100%); }
    }

    .slider-thumb {
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #444 0%, #333 50%, #222 100%);
      border: 3px solid #555;
      border-radius: 50%;
      box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.8), 
        inset 0 2px 4px rgba(255, 255, 255, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.1);
      cursor: grab;
      transition: all 0.2s ease;
      z-index: 2;
      display: none; /* hide thumb visually */
    }
    
    .slider-thumb::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, #666 0%, #444 100%);
      border-radius: 50%;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
    }

    .slider-thumb:hover {
      transform: translateY(-50%) scale(1.15);
      box-shadow: 
        0 6px 20px rgba(0, 0, 0, 0.9), 
        inset 0 2px 4px rgba(255, 255, 255, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.2);
      border-color: #777;
    }

    .slider-thumb:active {
      cursor: grabbing;
      transform: translateY(-50%) scale(1.05);
      box-shadow: 
        0 3px 10px rgba(0, 0, 0, 1), 
        inset 0 2px 4px rgba(255, 255, 255, 0.1);
    }

    .value-display {
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
      color: #00ff88;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: 20;
      border: 2px solid #333;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      letter-spacing: 0.5px;
    }
    
    .value-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%);
      opacity: 0.6;
    }

    .slider-container:hover .value-display {
      opacity: 1;
      transform: translateX(-50%) translateY(-5px);
    }

    .audio-visualizer {
      position: absolute;
      top: -52px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 30px;
      display: flex;
      align-items: end;
      justify-content: center;
      gap: 4px;
    }

    .audio-bar {
      width: 5px;
      background: currentColor;
      border-radius: 3px;
      transition: height 0.1s ease;
      box-shadow: 0 0 8px currentColor;
      position: relative;
    }
    
    .audio-bar::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(180deg, 
        rgba(255, 255, 255, 0.8) 0%, 
        currentColor 50%, 
        rgba(0, 0, 0, 0.3) 100%);
      border-radius: 3px;
    }

    

    .halo-effect {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 140px;
      height: 140px;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      z-index: -1;
      background: radial-gradient(circle, currentColor 0%, transparent 70%);
    }

    .halo-effect.active {
      opacity: 0.15;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.25; }
    }

    /* Professional DAW-style tick marks */
    .tick-marks {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
    }

    .tick-mark {
      position: absolute;
      top: 50%;
      width: 1px;
      height: 10px;
      background: #444;
      transform: translateY(-50%);
      transition: all 0.2s ease;
    }
    
    .tick-mark:hover {
      background: #666;
      height: 12px;
    }

    .tick-mark.major {
      height: 14px;
      background: #666;
      width: 2px;
    }
    
    .tick-mark.major:hover {
      background: #888;
      height: 16px;
    }

    /* Value markers */
    .value-marker {
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10px;
      color: #666;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      transition: all 0.2s ease;
    }
    
    .value-marker:hover {
      color: #888;
      transform: translateX(-50%) scale(1.1);
    }

    @media (max-width: 768px) {
      :host { 
        height: 100px; 
        touch-action: none;
      }
      .slider-container { 
        height: 70px; 
      }
      .slider-track { 
        height: 12px; 
        border-width: 1px;
      }
      .slider-thumb { 
        width: 28px; 
        height: 28px; 
        border-width: 2px;
        display: block; /* show thumb on mobile for better UX */
        left: 0%;
        transform: translate(-50%, -50%);
      }
      .value-display { 
        font-size: 11px; 
        padding: 6px 10px; 
        top: -35px;
      }
      .audio-visualizer { 
        width: 50px; 
        height: 24px; 
        top: -45px;
      }
      .audio-bar { 
        width: 4px; 
      }
      
      /* Better touch interaction */
      .slider-container:active .slider-thumb {
        transform: translateY(-50%) scale(1.1);
        box-shadow: 
          0 6px 20px rgba(0, 0, 0, 0.9), 
          inset 0 2px 4px rgba(255, 255, 255, 0.3),
          0 0 0 1px rgba(255, 255, 255, 0.2);
      }
    }
    
    @media (max-width: 480px) {
      :host { 
        height: 90px; 
      }
      .slider-container { 
        height: 65px; 
      }
      .slider-track { 
        height: 10px; 
      }
      .slider-thumb { 
        width: 26px; 
        height: 26px; 
        left: 0%;
        transform: translate(-50%, -50%);
      }
      .value-display { 
        font-size: 10px; 
        padding: 5px 8px; 
        top: -32px;
      }
      .audio-visualizer { 
        width: 45px; 
        height: 22px; 
        top: -42px;
      }
      .audio-bar { 
        width: 3px; 
      }
    }
  `;Rt([L({type:Number})],qe.prototype,"value",2);Rt([L({type:String})],qe.prototype,"color",2);Rt([L({type:Number})],qe.prototype,"audioLevel",2);qe=Rt([ne("weight-slider")],qe);var lf=Object.defineProperty,cf=Object.getOwnPropertyDescriptor,X=(o,e,t,n)=>{for(var i=n>1?void 0:n?cf(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&lf(e,t,i),i};let J=class extends Y{constructor(){super(...arguments),this.promptId="",this.text="",this.weight=0,this.color="",this.filtered=!1,this.cc=0,this.channel=0,this.learnMode=!1,this.showCC=!1,this.midiDispatcher=null,this.audioLevel=0}connectedCallback(){var o;super.connectedCallback(),(o=this.midiDispatcher)==null||o.addEventListener("cc-message",e=>{const t=e,{channel:n,cc:i,value:s}=t.detail;this.learnMode?(this.cc=i,this.channel=n,this.learnMode=!1,this.dispatchPromptChange()):i===this.cc&&(this.weight=s/127*2,this.dispatchPromptChange())})}firstUpdated(){this.textInput.setAttribute("contenteditable","plaintext-only"),this.textInput.textContent=this.text,this.lastValidText=this.text}update(o){o.has("showCC")&&!this.showCC&&(this.learnMode=!1),o.has("text")&&this.textInput&&(this.textInput.textContent=this.text),super.update(o)}dispatchPromptChange(){this.dispatchEvent(new CustomEvent("prompt-changed",{detail:{promptId:this.promptId,text:this.text,weight:this.weight,cc:this.cc,color:this.color}}))}onKeyDown(o){o.key==="Enter"&&(o.preventDefault(),this.textInput.blur()),o.key==="Escape"&&(o.preventDefault(),this.resetText(),this.textInput.blur())}resetText(){this.text=this.lastValidText,this.textInput.textContent=this.lastValidText}async updateText(){var e;const o=(e=this.textInput.textContent)==null?void 0:e.trim();o?(this.text=o,this.lastValidText=o):this.resetText(),this.dispatchPromptChange(),this.textInput.scrollLeft=0}onFocus(){const o=window.getSelection();if(!o)return;const e=document.createRange();e.selectNodeContents(this.textInput),o.removeAllRanges(),o.addRange(e)}updateWeight(){this.weight=this.weightInput.value,this.dispatchPromptChange()}toggleLearnMode(){this.learnMode=!this.learnMode}render(){const o=Zi({prompt:!0,"learn-mode":this.learnMode,"show-cc":this.showCC});return w`<div class=${o}>
      <div class="prompt-indicator ${this.weight>0?"active":""}" style="color: ${this.color}"></div>
      
      <weight-slider
        id="weight"
        value=${this.weight}
        color=${this.filtered?"#888":this.color}
        audioLevel=${this.filtered?0:this.audioLevel}
        @input=${this.updateWeight}></weight-slider>
      
      <span
        id="text"
        spellcheck="false"
        @focus=${this.onFocus}
        @keydown=${this.onKeyDown}
        @blur=${this.updateText}></span>
      
      <div id="midi" @click=${this.toggleLearnMode}>
        ${this.learnMode?"Learn":`CC:${this.cc}`}
      </div>
    </div>`}};J.styles=te`
    .prompt {
      width: 95%;
      height: 95%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(26, 26, 46, 0.6);
      border-radius: 16px;
      padding: 0.6rem;
      border: 1px solid rgba(41, 242, 198, 0.2);
      backdrop-filter: blur(20px);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      margin: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .prompt::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    .prompt:hover::before {
      opacity: 1;
    }
    
    .prompt:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(41, 242, 198, 0.2);
      border-color: rgba(41, 242, 198, 0.4);
    }
    
    weight-slider {
      width: 80%;
      flex-shrink: 0;
      margin-bottom: 0.5rem;
    }
    
    #midi {
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      text-align: center;
      font-size: 0.75rem;
      border: 1px solid rgba(41, 242, 198, 0.3);
      border-radius: 8px;
      padding: 0.25rem 0.5rem;
      color: rgba(224, 224, 224, 0.8);
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      cursor: pointer;
      visibility: hidden;
      user-select: none;
      margin-top: 0.5rem;
      transition: all 0.3s ease;
      font-weight: 500;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      
      .learn-mode & {
        color: #fbbf24;
        border-color: #fbbf24;
        background: rgba(251, 191, 36, 0.2);
        animation: pulse 1.5s ease-in-out infinite;
      }
      
      .show-cc & {
        visibility: visible;
      }
      
      &:hover {
        background: rgba(41, 242, 198, 0.1);
        border-color: rgba(41, 242, 198, 0.6);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(41, 242, 198, 0.2);
      }
    }
    
    #text {
      font-weight: 600;
      font-size: 0.9rem;
      max-width: 100%;
      min-width: 60px;
      padding: 0.5rem 0.75rem;
      margin: 0.5rem 0;
      flex-shrink: 0;
      border-radius: 8px;
      text-align: center;
      white-space: pre;
      overflow: hidden;
      border: 1px solid rgba(41, 242, 198, 0.2);
      outline: none;
      -webkit-font-smoothing: antialiased;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      color: #e0e0e0;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      
      &:not(:focus) {
        text-overflow: ellipsis;
      }
      
      &:focus {
        border-color: rgba(41, 242, 198, 0.6);
        background: rgba(26, 26, 46, 0.8);
        box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2);
      }
    }
    
    :host([filtered]) {
      weight-slider { 
        opacity: 0.5;
      }
      
      #text {
        background: rgba(220, 38, 38, 0.8);
        border-color: rgba(220, 38, 38, 0.6);
        color: #fff;
        position: relative;
        z-index: 1;
      }
      
      .prompt::after {
        content: 'FILTERED';
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(220, 38, 38, 0.9);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.6rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }
    
    .prompt-indicator {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }
    
    .prompt-indicator.active {
      background: currentColor;
      box-shadow: 0 0 10px currentColor;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.1); }
    }
    
    @media only screen and (max-width: 768px) {
      .prompt {
        width: 92%;
        height: 92%;
        padding: 0.5rem;
        border-radius: 12px;
      }
      
      #text {
        font-size: 0.8rem;
        padding: 0.4rem 0.6rem;
      }
      
      #midi {
        font-size: 0.7rem;
        padding: 0.2rem 0.4rem;
      }
      
      weight-slider {
        width: 70%;
      }
    }
  `;X([L({type:String})],J.prototype,"promptId",2);X([L({type:String})],J.prototype,"text",2);X([L({type:Number})],J.prototype,"weight",2);X([L({type:String})],J.prototype,"color",2);X([L({type:Boolean,reflect:!0})],J.prototype,"filtered",2);X([L({type:Number})],J.prototype,"cc",2);X([L({type:Number})],J.prototype,"channel",2);X([L({type:Boolean})],J.prototype,"learnMode",2);X([L({type:Boolean})],J.prototype,"showCC",2);X([zi("weight-slider")],J.prototype,"weightInput",2);X([zi("#text")],J.prototype,"textInput",2);X([L({type:Object})],J.prototype,"midiDispatcher",2);X([L({type:Number})],J.prototype,"audioLevel",2);J=X([ne("prompt-controller")],J);var df=Object.defineProperty,uf=Object.getOwnPropertyDescriptor,Qi=(o,e,t,n)=>{for(var i=n>1?void 0:n?uf(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&df(e,t,i),i};let Tt=class extends Y{constructor(){super(...arguments),this.playbackState="stopped"}renderIcon(){const e="0 0 24 24";return this.playbackState==="playing"?Vt`<svg viewBox=${e} fill="currentColor">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      </svg>`:this.playbackState==="loading"?Vt`<svg viewBox=${e} fill="none" stroke="currentColor">
        <circle class="loader" cx="12" cy="12" r="10" stroke-width="2"/>
      </svg>`:Vt`<svg viewBox=${e} fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>`}render(){const o=this.playbackState==="playing"?"playing":"",e=this.playbackState==="playing"?"Pause":"Play";return w`
      <button
        class="button-container ${o}"
        type="button"
        aria-label="${e}"
        aria-pressed="${this.playbackState==="playing"}">
        <div class="icon-container">
          ${this.renderIcon()}
        </div>
        <div class="status-indicator ${this.playbackState==="playing"?"playing":""}"></div>
      </button>
    `}};Tt.styles=te`
    :host {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 48px;
    }
    
    :host(:hover) .button-container {
      transform: scale(1.05);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
    }
    
    .button-container {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 3px solid #444;
      background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0f0f0f 100%);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 1.56, 0.32, 0.99);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-shadow: 
        0 6px 20px rgba(0, 0, 0, 0.6), 
        inset 0 2px 4px rgba(255, 255, 255, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    }
    
    .button-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #29F2C6 0%, #0FC9A7 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .button-container:hover::before {
      opacity: 0.15;
    }
    
    .button-container.playing {
      border-color: #29F2C6;
      box-shadow: 
        0 6px 30px rgba(41, 242, 198, 0.4), 
        inset 0 2px 4px rgba(255, 255, 255, 0.2),
        0 0 0 1px rgba(41, 242, 198, 0.3);
      animation: playingPulse 2s ease-in-out infinite;
    }
    
    @keyframes playingPulse {
      0%, 100% { 
        box-shadow: 
          0 6px 30px rgba(41, 242, 198, 0.4), 
          inset 0 2px 4px rgba(255, 255, 255, 0.2),
          0 0 0 1px rgba(41, 242, 198, 0.3);
      }
      50% { 
        box-shadow: 
          0 8px 40px rgba(41, 242, 198, 0.6), 
          inset 0 2px 4px rgba(255, 255, 255, 0.3),
          0 0 0 2px rgba(41, 242, 198, 0.5);
      }
    }
    
    .button-container.playing::before {
      opacity: 0.25;
    }
    
    .icon-container {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 65%;
      height: 65%;
      color: #e0e0e0;
      transition: all 0.3s ease;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
    }
    
    .icon-container svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.8));
    }
    
    .button-container.playing .icon-container {
      color: #29F2C6;
      filter: drop-shadow(0 0 15px rgba(41, 242, 198, 0.8));
    }
    
    .loader {
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      animation: spin linear 1s infinite;
      transform-origin: center;
      transform-box: fill-box;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(41, 242, 198, 0.4);
      transform: scale(0);
      animation: ripple 0.8s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .status-indicator {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: linear-gradient(135deg, #29F2C6 0%, #0FC9A7 100%);
      border: 3px solid #1a1a1a;
      opacity: 0;
      transition: opacity 0.3s ease;
      box-shadow: 0 4px 15px rgba(41, 242, 198, 0.6);
    }
    
    .status-indicator.playing {
      opacity: 1;
      animation: statusPulse 2s ease-in-out infinite;
    }
    
    @keyframes statusPulse {
      0%, 100% { 
        transform: scale(1); 
        box-shadow: 0 4px 15px rgba(41, 242, 198, 0.6);
      }
      50% { 
        transform: scale(1.2); 
        box-shadow: 0 6px 25px rgba(41, 242, 198, 0.8);
      }
    }
    
    /* Professional DAW-style button states */
    .button-container:active {
      transform: scale(0.98);
      box-shadow: 
        0 3px 12px rgba(0, 0, 0, 0.8), 
        inset 0 2px 4px rgba(255, 255, 255, 0.05);
    }
    
    .button-container:focus {
      outline: none;
      border-color: #29F2C6;
      box-shadow: 
        0 0 0 4px rgba(41, 242, 198, 0.3),
        0 6px 20px rgba(0, 0, 0, 0.6);
    }
    
    /* Enhanced hover effects */
    .button-container::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 100%);
      transition: left 0.6s ease;
    }
    
    .button-container:hover::after {
      left: 100%;
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
      :host {
        width: 44px;
        height: 44px;
        touch-action: manipulation;
      }
      
      .button-container {
        border-width: 2px;
        border-radius: 8px;
      }
      
      .button-container:active {
        transform: scale(0.95);
      }
      
      .status-indicator {
        width: 16px;
        height: 16px;
        top: -8px;
        right: -8px;
        border-width: 2px;
      }
    }
    
    @media (max-width: 480px) {
      :host {
        width: 40px;
        height: 40px;
      }
      
      .status-indicator {
        width: 14px;
        height: 14px;
        top: -7px;
        right: -7px;
      }
    }
  `;Qi([L({type:String})],Tt.prototype,"playbackState",2);Tt=Qi([ne("play-pause-button")],Tt);var pf=Object.defineProperty,ff=Object.getOwnPropertyDescriptor,ke=(o,e,t,n)=>{for(var i=n>1?void 0:n?ff(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&pf(e,t,i),i};let de=class extends Y{constructor(){super(...arguments),this.currentTime=0,this.duration=120,this.bpm=120,this.timeSignature=4,this.zoom=1,this.isPlaying=!1}getMeasures(){const o=[],e=this.timeSignature,t=60/this.bpm,n=e*t;for(let i=0;i<=Math.ceil(this.duration/n);i++){const s=i*n/this.duration*100;o.push({position:s,number:i+1,isMajor:i%4===0})}return o}getBeats(){const o=[],e=60/this.bpm;for(let t=0;t<=Math.ceil(this.duration/e);t++){const n=t*e/this.duration*100;o.push({position:n,isStrong:t%this.timeSignature===0})}return o}formatTime(o){const e=Math.floor(o/60),t=Math.floor(o%60),n=Math.floor(o%1*30);return`${e.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`}getPlayheadPosition(){return`${this.currentTime/this.duration*100}%`}render(){const o=this.getMeasures(),e=this.getBeats(),t=this.getPlayheadPosition();return w`
      <div class="timeline-container">
        <!-- Measure Ruler -->
        <div class="measure-ruler">
          ${o.map(n=>w`
            <div class="measure-marker ${n.isMajor?"major":""}" style="left: ${n.position}%">
              ${n.isMajor?w`<span class="measure-label">${n.number}</span>`:""}
            </div>
          `)}
        </div>
        
        <!-- Beat Ruler -->
        <div class="beat-ruler">
          ${e.map(n=>w`
            <div class="beat-marker ${n.isStrong?"strong":"weak"}" style="left: ${n.position}%"></div>
          `)}
        </div>
        
        <!-- Playhead -->
        <div class="playhead" style="left: ${t}"></div>
        
        <!-- Grid Snap Lines -->
        <div class="grid-snap">
          ${e.map(n=>w`
            <div class="snap-line ${n.isStrong?"active":""}" style="left: ${n.position}%"></div>
          `)}
        </div>
        
        <!-- Time Display -->
        <div class="time-display">
          ${this.formatTime(this.currentTime)}
        </div>
        
        <!-- Tempo Display -->
        <div class="tempo-display">
          ${this.bpm} BPM
        </div>
      </div>
    `}};de.styles=te`
    :host {
      display: block;
      width: 100%;
      height: 50px;
      background: linear-gradient(180deg, var(--panel-2) 0%, var(--bg) 100%);
      border-bottom: 2px solid var(--border);
      position: relative;
      overflow: hidden;
    }
    
    .timeline-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .measure-ruler {
      height: 25px;
      background: linear-gradient(180deg, var(--panel) 0%, var(--panel-2) 100%);
      border-bottom: 2px solid var(--border);
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 25px;
    }
    
    .beat-ruler {
      height: 25px;
      background: linear-gradient(180deg, #222 0%, var(--panel-2) 100%);
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 25px;
    }
    
    .measure-marker {
      position: absolute;
      height: 100%;
      width: 1px;
      background: #555;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 3px;
      transition: all 0.2s ease;
    }
    
    .measure-marker:hover {
      background: #777;
      width: 2px;
    }
    
    .measure-marker.major {
      background: #777;
      width: 2px;
    }
    
    .measure-marker.major:hover {
      background: #999;
      width: 3px;
    }
    
    .measure-label {
      font-size: 11px;
      color: var(--muted);
      font-weight: 700;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      transform: rotate(-45deg);
      transform-origin: center;
      white-space: nowrap;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      transition: all 0.2s ease;
    }
    
    .measure-marker:hover .measure-label {
      color: #ccc;
      transform: rotate(-45deg) scale(1.1);
    }
    
    .beat-marker {
      position: absolute;
      height: 100%;
      width: 1px;
      background: #333;
      transition: all 0.2s ease;
    }
    
    .beat-marker:hover {
      background: #555;
      width: 2px;
    }
    
    .beat-marker.strong {
      background: #555;
      width: 1px;
    }
    
    .beat-marker.strong:hover {
      background: #777;
      width: 2px;
    }
    
    .beat-marker.weak {
      background: #222;
      width: 1px;
    }
    
    .beat-marker.weak:hover {
      background: #444;
      width: 2px;
    }
    
    .playhead {
      position: absolute;
      top: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(180deg, var(--brand) 0%, var(--brand-2) 100%);
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.8);
      z-index: 10;
      transition: left 0.1s ease;
      position: relative;
    }
    
    .playhead::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(0, 255, 136, 0.3) 50%, 
        transparent 100%);
      animation: playheadGlow 2s ease-in-out infinite;
    }
    
    @keyframes playheadGlow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    
    .playhead::after {
      content: '';
      position: absolute;
      top: 0;
      left: -4px;
      width: 10px;
      height: 10px;
      background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
      border-radius: 50%;
      box-shadow: 0 0 15px rgba(0, 255, 136, 0.9);
      border: 2px solid #0f0f0f;
    }
    
    .time-display {
      position: absolute;
      top: 3px;
      right: 25px;
      background: linear-gradient(135deg, var(--panel-2) 0%, var(--bg) 100%);
      color: var(--brand);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      border: 2px solid var(--border);
      z-index: 20;
      text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      letter-spacing: 0.5px;
    }
    
    .time-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #00ff88 50%, transparent 100%);
      opacity: 0.6;
    }
    
    .tempo-display {
      position: absolute;
      top: 3px;
      left: 25px;
      background: linear-gradient(135deg, var(--panel-2) 0%, var(--bg) 100%);
      color: var(--muted);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      border: 2px solid var(--border);
      z-index: 20;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
      letter-spacing: 0.5px;
    }
    
    .tempo-display::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #aaa 50%, transparent 100%);
      opacity: 0.4;
    }
    
    .grid-snap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .snap-line {
      position: absolute;
      height: 100%;
      width: 1px;
      background: rgba(0, 255, 136, 0.15);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .snap-line.active {
      opacity: 1;
      background: rgba(0, 255, 136, 0.25);
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }
    
    /* Grid overlay for better visual reference */
    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: 
        linear-gradient(90deg, rgba(0, 255, 136, 0.02) 1px, transparent 1px),
        linear-gradient(180deg, rgba(0, 255, 136, 0.02) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.3;
    }
  `;ke([L({type:Number})],de.prototype,"currentTime",2);ke([L({type:Number})],de.prototype,"duration",2);ke([L({type:Number})],de.prototype,"bpm",2);ke([L({type:Number})],de.prototype,"timeSignature",2);ke([L({type:Number})],de.prototype,"zoom",2);ke([L({type:Boolean})],de.prototype,"isPlaying",2);de=ke([ne("timeline-ruler")],de);var hf=Object.defineProperty,mf=Object.getOwnPropertyDescriptor,ji=(o,e,t,n)=>{for(var i=n>1?void 0:n?mf(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&hf(e,t,i),i};let Et=class extends Y{constructor(){super(...arguments),this.open=!1,this.close=()=>this.dispatchEvent(new CustomEvent("close"))}render(){return this.open?w`
      <div class="backdrop" @click=${this.close}></div>
      <div class="sheet" @click=${o=>o.stopPropagation()}>
        <div class="head">
          <div class="brand">Music Maker — Quick Guide</div>
          <button class="close" @click=${this.close}>Close</button>
        </div>
        <div class="content">
          <h3>Getting Started</h3>
          <ul>
            <li>Toggle between <strong>Styles</strong> and <strong>Instruments</strong> in the left panel</li>
            <li>Click styles/instruments to add them to your grid (max slots shown in toolbar)</li>
            <li>Press <strong>Play</strong> to start your music. Adjust grid sliders to blend elements</li>
            <li>Higher slider values = more prominent in your mix</li>
          </ul>

          <h3>Mobile Experience</h3>
          <ul>
            <li>Use the <strong>bottom navigation bar</strong> for all controls</li>
            <li><strong>Center Play Button</strong>: Start/stop your music</li>
            <li><strong>Evolve Button</strong>: Auto-evolution controls</li>
            <li><strong>Menu Button</strong>: Access all features</li>
            <li><strong>Settings Button</strong>: Generator settings</li>
            <li><strong>Record Button</strong>: Recording controls</li>
          </ul>

          <h3>Auto-Evolve</h3>
          <ul>
            <li>Enable <strong>EVOLVE</strong> for automatic musical variation</li>
            <li><strong>Rate</strong>: How often changes occur (8s, 16s, 32s, 64s)</li>
            <li><strong>Depth</strong>: How much variation (Subtle, Light, Medium, Bold)</li>
            <li>Creates dynamic, ever-changing performances</li>
          </ul>

          <h3>Scenes & Morphing</h3>
          <ul>
            <li><strong>Save Scene</strong>: Capture current mix and grid settings</li>
            <li><strong>Recall Scene</strong>: Morph to saved settings over time</li>
            <li><strong>Morph Time</strong>: Choose transition speed (1s, 2s, 4s, 8s)</li>
            <li>Perfect for live performances and smooth transitions</li>
          </ul>

          <h3>MIDI Control</h3>
          <ul>
            <li>Click <strong>"Click to learn"</strong> on grid slots, then turn MIDI knobs</li>
            <li>Map instrument sliders via their "Click to learn" buttons</li>
            <li>Desktop: Konami code (↑↑↓↓←→←→) unlocks CC48–55 presets</li>
            <li>Real-time control for live performances</li>
          </ul>

          <h3>Recording & Export</h3>
          <ul>
            <li><strong>Record Button</strong>: Start/stop recording your performance</li>
            <li><strong>Export</strong>: Download your music as WAV or MP3</li>
            <li>Capture your creative moments and share them</li>
          </ul>

          <h3>Pro Tips</h3>
          <ul>
            <li>Use <strong>Active Only</strong> filter to focus on current elements</li>
            <li>Search styles/instruments for quick access</li>
            <li>Keep drums/bass steady while morphing leads for tight blends</li>
            <li>Combine Auto-Evolve with Scenes for dynamic performances</li>
          </ul>

          <h3>Troubleshooting</h3>
          <ul>
            <li><strong>No sound</strong>: Ensure grid sliders are above zero, then press Play</li>
            <li><strong>Connection issues</strong>: App auto-reconnects; music resumes after brief pause</li>
            <li><strong>Mobile zoom</strong>: Fixed with proper input sizing</li>
            <li><strong>Performance</strong>: Close unused popups for better responsiveness</li>
          </ul>
        </div>
      </div>
    `:w``}};Et.styles=te`
    :host { position: fixed; inset: 0; display: block; z-index: 2000; }
    .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.6); }
    .sheet {
      position: absolute; right: 0; top: 0; bottom: 0; width: min(520px, 100%);
      background: var(--panel-2, #151515);
      border-left: 1px solid var(--border, #262626);
      box-shadow: -20px 0 60px rgba(0,0,0,0.5);
      display: flex; flex-direction: column;
    }
    .head { display:flex; align-items:center; justify-content:space-between; padding:16px 18px; border-bottom:1px solid var(--border, #262626); }
    .brand { display:flex; align-items:center; gap:10px; color: var(--text, #e5e5e5); font-weight: 900; letter-spacing: .5px; }
    .close { background: transparent; border: 1px solid var(--border, #262626); color: var(--text, #e5e5e5); border-radius: 6px; padding: 6px 10px; cursor: pointer; }
    .content { padding: 16px 18px; overflow: auto; }
    h3 { margin: 16px 0 8px; color: var(--brand, #29F2C6); }
    ul { margin: 0 0 12px 20px; }
    li { margin: 6px 0; line-height: 1.5; color: var(--text, #e5e5e5); }
    .kbd { display:inline-block; padding:2px 6px; border:1px solid var(--border,#262626); border-radius:4px; background: var(--panel,#111); font-size: 12px; }
  `;ji([L({type:Boolean,reflect:!0})],Et.prototype,"open",2);Et=ji([ne("help-panel")],Et);var gf=Object.defineProperty,vf=Object.getOwnPropertyDescriptor,es=(o,e,t,n)=>{for(var i=n>1?void 0:n?vf(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&gf(e,t,i),i};let St=class extends Y{constructor(){super(...arguments),this.step=0,this.steps=[{title:"Welcome to DeepRabbit",text:"Your AI-powered music creation studio. Toggle between Styles and Instruments in the left panel to build your sound."},{title:"Create Your Mix",text:"Select styles and instruments, then adjust their weights in the grid. Higher values = more prominent in your mix."},{title:"Mobile Navigation",text:"On mobile, use the bottom navigation bar. The center play button starts your music, while other buttons access features."},{title:"Auto-Evolve Magic",text:"Enable EVOLVE for automatic musical variation. Set the rate (how often) and depth (how much) for dynamic performances."},{title:"Scenes & Recording",text:"Save Scenes to capture perfect moments, then morph between them. Use Record to capture your performances."}]}next(){this.step<this.steps.length-1?this.step++:this.finish()}prev(){this.step>0&&this.step--}skip(){this.finish()}finish(){this.dispatchEvent(new CustomEvent("finish"))}render(){const o=this.steps[this.step];return w`
      <div class="backdrop"></div>
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="onboard-title" aria-live="polite">
        <h2 id="onboard-title">${o.title}</h2>
        <p>${o.text}</p>
        <div class="actions">
          ${this.step>0?w`<button @click=${this.prev} aria-label="Previous step">Back</button>`:""}
          ${this.step<this.steps.length-1?w`
            <button @click=${this.skip} aria-label="Skip tutorial">Skip</button>
            <button @click=${this.next} aria-label="Next step">Next</button>
          `:w`<button @click=${this.finish} aria-label="Finish tutorial">Finish</button>`}
        </div>
      </div>
    `}};St.styles=te`
    :host { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; }
    .backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.7); }
    .sheet {
      position: relative;
      background: var(--panel-2, #151515);
      border: 1px solid var(--border, #262626);
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
      padding: 24px;
      width: 90%;
      max-width: 400px;
      color: var(--text, #e5e5e5);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    h2 { margin: 0; font-size: 20px; color: var(--brand, #29F2C6); }
    p { margin: 0; line-height: 1.4; }
    .actions { display: flex; justify-content: space-between; gap: 10px; }
    button { flex: 1; padding: 10px 14px; border: 1px solid var(--border, #262626); border-radius: 6px; background: var(--panel, #111); color: var(--text, #e5e5e5); cursor: pointer; }
    button:hover { background: var(--panel-2, #151515); }
    @media (max-width: 480px) {
      .sheet { width: 95%; padding: 20px; }
      h2 { font-size: 18px; }
    }
  `;es([R()],St.prototype,"step",2);St=es([ne("onboarding-tutorial")],St);/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/class yf extends EventTarget{constructor(){super(...arguments),this.access=null,this.activeMidiInputId=null}async getMidiAccess(){if(this.access)return[...this.access.inputs.keys()];if(!navigator.requestMIDIAccess)throw new Error("Your browser does not support the Web MIDI API. For a list of compatible browsers, see https://caniuse.com/midi");if(this.access=await navigator.requestMIDIAccess({sysex:!1}).catch(t=>t),this.access===null)throw new Error("Unable to acquire MIDI access.");const e=[...this.access.inputs.keys()];e.length>0&&this.activeMidiInputId===null&&(this.activeMidiInputId=e[0]);for(const t of this.access.inputs.values())t.onmidimessage=n=>{if(t.id!==this.activeMidiInputId)return;const{data:i}=n;if(!i){console.error("MIDI message has no data");return}const s=i[0],l=s&15;if(!((s&240)===176))return;const d={cc:i[1],value:i[2],channel:l};this.dispatchEvent(new CustomEvent("cc-message",{detail:d}))};return e}getDeviceName(e){if(!this.access)return null;const t=this.access.inputs.get(e);return t?t.name:null}}var xf=Object.getOwnPropertyDescriptor,bf=(o,e,t,n)=>{for(var i=n>1?void 0:n?xf(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=l(i)||i);return i};let an=class extends Y{render(){return w`<slot></slot>`}};an.styles=te`
    :host { display: inline-block; }
  `;an=bf([ne("require-pro")],an);class Cf{constructor(){this.baseUrl="https://deeprabbit.net/api"}async makeRequest(e,t={}){const n=`${this.baseUrl}${e}`,i={headers:{"Content-Type":"application/json"},credentials:"include"},s={...i,...t,headers:{...i.headers,...t.headers}};try{const l=await fetch(n,s);if(!l.ok){const c=await l.json();throw new Error(c.error||`HTTP ${l.status}`)}return await l.json()}catch(l){throw console.error(`API request failed for ${e}:`,l),l}}async register(e,t){return this.makeRequest("/auth/register",{method:"POST",body:JSON.stringify({email:e,password:t})})}async login(e,t){return this.makeRequest("/auth/login",{method:"POST",body:JSON.stringify({email:e,password:t})})}async logout(){return this.makeRequest("/auth/logout",{method:"POST"})}async refreshToken(){return this.makeRequest("/auth/refresh",{method:"POST"})}async getCurrentUser(){return this.makeRequest("/auth/me")}async isAuthenticated(){try{return await this.getCurrentUser(),!0}catch{return!1}}async healthCheck(){return this.makeRequest("/health")}}const Ie=new Cf;var wf=Object.defineProperty,_f=Object.getOwnPropertyDescriptor,Pe=(o,e,t,n)=>{for(var i=n>1?void 0:n?_f(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&wf(e,t,i),i};let ue=class extends Y{constructor(){super(...arguments),this.isOpen=!1,this.mode="login",this.email="",this.password="",this.isLoading=!1,this.error=""}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeydown.bind(this))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleKeydown.bind(this))}handleKeydown(o){o.key==="Escape"&&this.isOpen&&this.close()}async handleSubmit(o){if(o.preventDefault(),!this.email||!this.password){this.error="Please fill in all fields";return}this.isLoading=!0,this.error="";try{let e;this.mode==="login"?e=await Ie.login(this.email,this.password):e=await Ie.register(this.email,this.password),this.dispatchEvent(new CustomEvent("auth-success",{detail:{user:e.user,mode:this.mode},bubbles:!0})),this.close()}catch(e){this.error=e.message||"Authentication failed"}finally{this.isLoading=!1}}switchMode(){this.mode=this.mode==="login"?"register":"login",this.error="",this.email="",this.password=""}close(){this.isOpen=!1,this.error="",this.email="",this.password=""}render(){return this.isOpen?w`
      <div class="modal-overlay" @click=${o=>o.target===o.currentTarget&&this.close()}>
        <div class="modal-content">
          <button class="close-button" @click=${this.close}>×</button>
          
          <div class="modal-header">
            <h2 class="modal-title">
              ${this.mode==="login"?"Welcome Back":"Create Account"}
            </h2>
            <p class="modal-subtitle">
              ${this.mode==="login"?"Sign in to continue creating music":"Join DeepRabbit and start creating music"}
            </p>
          </div>

          <form @submit=${this.handleSubmit}>
            <div class="form-group">
              <label class="form-label" for="email">Email</label>
              <input
                id="email"
                type="email"
                class="form-input"
                placeholder="your@email.com"
                .value=${this.email}
                @input=${o=>this.email=o.target.value}
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input
                id="password"
                type="password"
                class="form-input"
                placeholder="••••••••"
                .value=${this.password}
                @input=${o=>this.password=o.target.value}
                required
              />
            </div>

            ${this.error?w`<div class="error-message">${this.error}</div>`:""}

            <button 
              type="submit" 
              class="submit-button"
              ?disabled=${this.isLoading}
            >
              ${this.isLoading?"Please wait...":this.mode==="login"?"Sign In":"Create Account"}
            </button>
          </form>

          <div class="mode-switch">
            ${this.mode==="login"?w`Don't have an account? <span class="mode-link" @click=${this.switchMode}>Sign up</span>`:w`Already have an account? <span class="mode-link" @click=${this.switchMode}>Sign in</span>`}
          </div>
        </div>
      </div>
    `:w``}};ue.styles=te`
    :host {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-radius: 16px;
      padding: 2rem;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .modal-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #fff;
      margin: 0 0 0.5rem 0;
    }

    .modal-subtitle {
      color: #a0a0a0;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      color: #fff;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 1rem;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #9900ff;
      box-shadow: 0 0 0 3px rgba(153, 0, 255, 0.1);
    }

    .form-input::placeholder {
      color: #666;
    }

    .error-message {
      color: #ff6b6b;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      text-align: center;
    }

    .submit-button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #9900ff 0%, #5200ff 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-bottom: 1rem;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(153, 0, 255, 0.3);
    }

    .submit-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .mode-switch {
      text-align: center;
      color: #a0a0a0;
      font-size: 0.9rem;
    }

    .mode-link {
      color: #9900ff;
      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
    }

    .mode-link:hover {
      text-decoration: underline;
    }

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: #a0a0a0;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    .hidden {
      display: none;
    }
  `;Pe([L({type:Boolean})],ue.prototype,"isOpen",2);Pe([L({type:String})],ue.prototype,"mode",2);Pe([R()],ue.prototype,"email",2);Pe([R()],ue.prototype,"password",2);Pe([R()],ue.prototype,"isLoading",2);Pe([R()],ue.prototype,"error",2);ue=Pe([ne("auth-modal")],ue);var Tf=Object.defineProperty,Ef=Object.getOwnPropertyDescriptor,Dt=(o,e,t,n)=>{for(var i=n>1?void 0:n?Ef(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&Tf(e,t,i),i};let He=class extends Y{constructor(){super(...arguments),this.user=null,this.isOpen=!1,this.isLoading=!1}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.handleOutsideClick.bind(this))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.handleOutsideClick.bind(this))}handleOutsideClick(o){var e;this.isOpen&&!((e=this.shadowRoot)!=null&&e.contains(o.target))&&(this.isOpen=!1)}toggleDropdown(){this.isOpen=!this.isOpen}async handleLogout(){this.isLoading=!0;try{await Ie.logout(),this.dispatchEvent(new CustomEvent("auth-logout",{bubbles:!0})),this.isOpen=!1}catch(o){console.error("Logout failed:",o)}finally{this.isLoading=!1}}getUserInitials(){var o;return(o=this.user)!=null&&o.email?this.user.email.charAt(0).toUpperCase():"?"}render(){return this.user?w`
      <div class="dropdown">
        <button class="profile-button" @click=${this.toggleDropdown}>
          <div class="user-avatar">${this.getUserInitials()}</div>
          ${this.user.email}
        </button>

        <div class="dropdown-menu ${this.isOpen?"":"hidden"}">
          <div class="user-info">
            <div class="user-name">${this.user.email}</div>
            <div class="user-email">Member since ${new Date(this.user.created_at).toLocaleDateString()}</div>
          </div>
          
          <div class="dropdown-divider"></div>
          
          <button 
            class="dropdown-item logout-button"
            @click=${this.handleLogout}
            ?disabled=${this.isLoading}
          >
            ${this.isLoading?"Signing out...":"Sign Out"}
          </button>
        </div>
      </div>
    `:w``}};He.styles=te`
    :host {
      display: block;
    }

    .profile-button {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 0.5rem 1rem;
      color: #fff;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .profile-button:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: linear-gradient(135deg, #9900ff 0%, #5200ff 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 600;
      color: white;
    }

    .dropdown {
      position: relative;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 0.5rem 0;
      min-width: 200px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 1000;
    }

    .dropdown-item {
      display: block;
      width: 100%;
      padding: 0.75rem 1rem;
      color: #fff;
      text-decoration: none;
      font-size: 0.9rem;
      transition: background 0.2s ease;
      border: none;
      background: none;
      cursor: pointer;
      text-align: left;
    }

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .dropdown-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0.5rem 0;
    }

    .user-info {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .user-name {
      font-weight: 600;
      color: #fff;
      margin-bottom: 0.25rem;
    }

    .user-email {
      font-size: 0.8rem;
      color: #a0a0a0;
    }

    .logout-button {
      color: #ff6b6b;
    }

    .logout-button:hover {
      background: rgba(255, 107, 107, 0.1);
    }

    .hidden {
      display: none;
    }
  `;Dt([L({type:Object})],He.prototype,"user",2);Dt([R()],He.prototype,"isOpen",2);Dt([R()],He.prototype,"isLoading",2);He=Dt([ne("user-profile")],He);var Sf=Object.defineProperty,Mf=Object.getOwnPropertyDescriptor,k=(o,e,t,n)=>{for(var i=n>1?void 0:n?Mf(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&Sf(e,t,i),i};let E=class extends Y{constructor(o){var e;if(super(),this.maxSelectedPrompts=8,this.recorder=null,this.showExportMenu=!1,this.userId="",this.userEmail="",this.currentUser=null,this.showAuthModal=!1,this.showTutorial=!1,this.isRecording=!1,this.autoEvolveEnabled=!1,this.autoEvolveRateSec=16,this.autoEvolveDepth=.15,this.evolveTimer=null,this.styleSearchQuery="",this.selectedOrder=[],this.showAllPrompts=!1,this.isMobile=!1,this.showMobileMenu=!1,this.showEvolveMenu=!1,this.showSettingsMenu=!1,this.showRecordMenu=!1,this.leftPanelMode="styles",this.showActiveOnly=!1,this.SELECTED_ORDER_STORAGE_KEY="pdjmidi_selected_order",this.PROMPT_WEIGHTS_STORAGE_KEY="pdjmidi_prompt_weights",this.STYLE_COUNT_STORAGE_KEY="pdjmidi_style_count",this.SHOW_ALL_GRID_STORAGE_KEY="pdjmidi_show_all",this.SCENES_STORAGE_KEY="pdjmidi_scenes",this.showMidi=!1,this.playbackState="stopped",this.audioLevel=0,this.currentTime=0,this.midiInputIds=[],this.activeMidiInputId=null,this.learningPromptId=null,this.learningInstrumentId=null,this.selectedPromptIds=new Set,this.selectedInstrumentId=null,this.learningSlotIndex=null,this.slotCcMap=new Map,this.SLOT_CC_STORAGE_KEY="pdjmidi_slot_cc_mappings",this.PROMPT_CC_STORAGE_KEY="pdjmidi_prompt_cc_mappings",this.INSTR_CC_STORAGE_KEY="pdjmidi_instrument_cc_mappings",this.scenes=[],this.showScenesMenu=!1,this.sceneMorphSec=4,this.genLoopBars=8,this.genVariation=1.2,this.genGenreContrast=1.2,this.genMix="balanced",this.konamiUnlocked=!1,this.konamiIndex=0,this.konamiSeq=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight"],this.showHelp=!1,this.filteredPrompts=new Set,this.filteredInstruments=new Set,this.makeBackground=Wi(()=>{const t=l=>Math.min(Math.max(l,0),1),s=[];return[...this.prompts.values()].forEach((l,c)=>{const u=t(l.weight/.5)*.6,d=Math.round(u*255).toString(16).padStart(2,"0"),p=l.weight/2,f=c%4/3,h=Math.floor(c/4)/3,m=`radial-gradient(circle at ${f*100}% ${h*100}%, ${l.color}${d} 0px, ${l.color}00 ${p*100}%)`;s.push(m)}),s.join(", ")},30),this.saveScene=()=>{const t={};this.prompts.forEach((s,l)=>{t[l]=s.weight||0});const n=this.scenes.length+1,i={id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,name:`Scene ${n}`,weights:t,selectedOrder:[...this.selectedOrder]};this.scenes=[...this.scenes,i],this.persistScenes(),this.showScenesMenu=!0},this.deleteScene=t=>{this.scenes=this.scenes.filter(n=>n.id!==t),this.persistScenes()},this.renameScene=t=>{var i;const n=prompt("Rename scene to:",((i=this.scenes.find(s=>s.id===t))==null?void 0:i.name)||"Scene");n&&(this.scenes=this.scenes.map(s=>s.id===t?{...s,name:n}:s),this.persistScenes())},this.recallScene=t=>{const n=this.scenes.find(d=>d.id===t);if(!n)return;this.selectedOrder=[...n.selectedOrder],this.selectedPromptIds=new Set(this.selectedOrder);const i={};this.prompts.forEach((d,p)=>{i[p]=d.weight||0});const s=n.weights,l=Math.max(.1,this.sceneMorphSec)*1e3,c=performance.now(),u=()=>{const d=performance.now(),p=Math.min(1,(d-c)/l),f=p,h=new Map(this.prompts);let m=!1;h.forEach((g,v)=>{const y=i[v]??0,T=s[v]??0,P=y+(T-y)*f;Math.abs((g.weight||0)-P)>.001&&(g.weight=Math.max(0,Math.min(2,P)),h.set(v,g),m=!0)}),m&&(this.prompts=h,this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts}))),p<1?requestAnimationFrame(u):this.savePromptWeights()};requestAnimationFrame(u),this.showScenesMenu=!1},this.resetAll=()=>{this.selectedOrder=[],this.selectedPromptIds=new Set;const t=new Map(this.prompts);t.forEach(n=>{n.weight!==0&&(n.weight=0)}),this.prompts=t,this.saveSelectedOrder(),this.savePromptWeights(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts}))},this.toggleShowAll=()=>{this.showAllPrompts=!this.showAllPrompts,this.saveShowAll(),this.showAllPrompts||this.resetWeightsForNonDisplayedPrompts(),this.requestUpdate()},this.randomizeGrid=()=>{const t=[...this.prompts.keys()],n=Math.min(this.maxSelectedPrompts,t.length);for(let l=t.length-1;l>0;l--){const c=Math.floor(Math.random()*(l+1));[t[l],t[c]]=[t[c],t[l]]}const i=t.slice(0,n);this.selectedOrder=i,this.selectedPromptIds=new Set(this.selectedOrder);const s=new Map(this.prompts);i.forEach(l=>{const c=s.get(l);c&&(c.weight=Math.random()*1.9+.1,s.set(l,c))}),this.prompts=s,this.resetWeightsForNonDisplayedPrompts(),this.saveSelectedOrder(),this.savePromptWeights(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})),this.requestUpdate()},this.presetSlotCcMap=()=>{const t=this.selectedOrder.map(i=>this.prompts.get(i)).filter(i=>!!i).slice(0,this.maxSelectedPrompts),n=new Map;for(let i=0;i<t.length;i++){const s=48+i%8;n.set(i,s)}this.slotCcMap=n,this.saveSlotMappings(),this.requestUpdate()},this.handleApplySuggestedStyles=t=>{const{styles:n}=t.detail;console.log("Applying suggested styles:",n);const i=new Map(this.prompts),s=[...this.selectedOrder];n.forEach(l=>{const c=Array.from(this.prompts.values()).find(u=>u.text.toLowerCase().includes(l.toLowerCase())||l.toLowerCase().includes(u.text.toLowerCase()));c&&!this.selectedPromptIds.has(c.promptId)&&s.length<this.maxSelectedPrompts&&(s.push(c.promptId),c.weight=Math.random()*1.5+.5,i.set(c.promptId,c))}),s.length>this.selectedOrder.length&&(this.selectedOrder=s,this.selectedPromptIds=new Set(this.selectedOrder),this.prompts=i,this.saveSelectedOrder(),this.savePromptWeights(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})),this.dispatchEvent(new CustomEvent("error",{detail:`Added ${n.length} suggested styles to your grid!`})))},this.prompts=o,this.instruments=new Map([["piano",{promptId:"piano",text:"Piano",weight:0,color:"#FFEAA7",cc:0}],["rhodes-piano",{promptId:"rhodes-piano",text:"Rhodes Piano",weight:0,color:"#DDA0DD",cc:0}],["harpsichord",{promptId:"harpsichord",text:"Harpsichord",weight:0,color:"#C19A6B",cc:0}],["celesta",{promptId:"celesta",text:"Celesta",weight:0,color:"#F0E68C",cc:0}],["guitar",{promptId:"guitar",text:"Guitar",weight:0,color:"#4ECDC4",cc:0}],["electric-guitar",{promptId:"electric-guitar",text:"Electric Guitar",weight:0,color:"#FF6B6B",cc:0}],["acoustic-guitar",{promptId:"acoustic-guitar",text:"Acoustic Guitar",weight:0,color:"#4ECDC4",cc:0}],["classical-guitar",{promptId:"classical-guitar",text:"Classical Guitar",weight:0,color:"#8FBC8F",cc:0}],["bass-guitar",{promptId:"bass-guitar",text:"Bass Guitar",weight:0,color:"#45B7D1",cc:0}],["ukulele",{promptId:"ukulele",text:"Ukulele",weight:0,color:"#FFA07A",cc:0}],["banjo",{promptId:"banjo",text:"Banjo",weight:0,color:"#DAA520",cc:0}],["mandolin",{promptId:"mandolin",text:"Mandolin",weight:0,color:"#CD853F",cc:0}],["bass",{promptId:"bass",text:"Bass",weight:0,color:"#96CEB4",cc:0}],["electric-bass",{promptId:"electric-bass",text:"Electric Bass",weight:0,color:"#45B7D1",cc:0}],["acoustic-bass",{promptId:"acoustic-bass",text:"Acoustic Bass",weight:0,color:"#96CEB4",cc:0}],["double-bass",{promptId:"double-bass",text:"Double Bass",weight:0,color:"#8B4513",cc:0}],["fretless-bass",{promptId:"fretless-bass",text:"Fretless Bass",weight:0,color:"#2E8B57",cc:0}],["drums",{promptId:"drums",text:"Drums",weight:0,color:"#FFB347",cc:0}],["live-drums",{promptId:"live-drums",text:"Live Drums",weight:0,color:"#98D8C8",cc:0}],["electronic-drums",{promptId:"electronic-drums",text:"Electronic Drums",weight:0,color:"#FF6347",cc:0}],["snare-drum",{promptId:"snare-drum",text:"Snare Drum",weight:0,color:"#DC143C",cc:0}],["kick-drum",{promptId:"kick-drum",text:"Kick Drum",weight:0,color:"#8B0000",cc:0}],["hi-hat",{promptId:"hi-hat",text:"Hi-Hat",weight:0,color:"#C0C0C0",cc:0}],["crash-cymbal",{promptId:"crash-cymbal",text:"Crash Cymbal",weight:0,color:"#D3D3D3",cc:0}],["ride-cymbal",{promptId:"ride-cymbal",text:"Ride Cymbal",weight:0,color:"#A9A9A9",cc:0}],["tambourine",{promptId:"tambourine",text:"Tambourine",weight:0,color:"#FFD700",cc:0}],["shaker",{promptId:"shaker",text:"Shaker",weight:0,color:"#F4A460",cc:0}],["conga",{promptId:"conga",text:"Conga",weight:0,color:"#8B4513",cc:0}],["bongo",{promptId:"bongo",text:"Bongo",weight:0,color:"#A0522D",cc:0}],["timpani",{promptId:"timpani",text:"Timpani",weight:0,color:"#8B4513",cc:0}],["marimba",{promptId:"marimba",text:"Marimba",weight:0,color:"#DEB887",cc:0}],["xylophone",{promptId:"xylophone",text:"Xylophone",weight:0,color:"#F5DEB3",cc:0}],["vibraphone",{promptId:"vibraphone",text:"Vibraphone",weight:0,color:"#E6E6FA",cc:0}],["glockenspiel",{promptId:"glockenspiel",text:"Glockenspiel",weight:0,color:"#FFE4E1",cc:0}],["strings",{promptId:"strings",text:"Strings",weight:0,color:"#9900FF",cc:0}],["violin",{promptId:"violin",text:"Violin",weight:0,color:"#5200FF",cc:0}],["viola",{promptId:"viola",text:"Viola",weight:0,color:"#6A0DAD",cc:0}],["cello",{promptId:"cello",text:"Cello",weight:0,color:"#FF25F6",cc:0}],["double-bass-string",{promptId:"double-bass-string",text:"Double Bass",weight:0,color:"#8B4513",cc:0}],["harp",{promptId:"harp",text:"Harp",weight:0,color:"#FFB6C1",cc:0}],["sitar",{promptId:"sitar",text:"Sitar",weight:0,color:"#FF8C00",cc:0}],["erhu",{promptId:"erhu",text:"Erhu",weight:0,color:"#FF4500",cc:0}],["trumpet",{promptId:"trumpet",text:"Trumpet",weight:0,color:"#FFDD28",cc:0}],["trombone",{promptId:"trombone",text:"Trombone",weight:0,color:"#FFA500",cc:0}],["french-horn",{promptId:"french-horn",text:"French Horn",weight:0,color:"#FF7F50",cc:0}],["tuba",{promptId:"tuba",text:"Tuba",weight:0,color:"#CD853F",cc:0}],["cornet",{promptId:"cornet",text:"Cornet",weight:0,color:"#DAA520",cc:0}],["flugelhorn",{promptId:"flugelhorn",text:"Flugelhorn",weight:0,color:"#B8860B",cc:0}],["flute",{promptId:"flute",text:"Flute",weight:0,color:"#3DFFAB",cc:0}],["piccolo",{promptId:"piccolo",text:"Piccolo",weight:0,color:"#98FB98",cc:0}],["clarinet",{promptId:"clarinet",text:"Clarinet",weight:0,color:"#87CEEB",cc:0}],["bass-clarinet",{promptId:"bass-clarinet",text:"Bass Clarinet",weight:0,color:"#4682B4",cc:0}],["oboe",{promptId:"oboe",text:"Oboe",weight:0,color:"#DDA0DD",cc:0}],["english-horn",{promptId:"english-horn",text:"English Horn",weight:0,color:"#DA70D6",cc:0}],["bassoon",{promptId:"bassoon",text:"Bassoon",weight:0,color:"#8B008B",cc:0}],["contrabassoon",{promptId:"contrabassoon",text:"Contrabassoon",weight:0,color:"#4B0082",cc:0}],["recorder",{promptId:"recorder",text:"Recorder",weight:0,color:"#32CD32",cc:0}],["pan-flute",{promptId:"pan-flute",text:"Pan Flute",weight:0,color:"#00FF7F",cc:0}],["saxophone",{promptId:"saxophone",text:"Saxophone",weight:0,color:"#2AF6DE",cc:0}],["alto-sax",{promptId:"alto-sax",text:"Alto Sax",weight:0,color:"#00CED1",cc:0}],["tenor-sax",{promptId:"tenor-sax",text:"Tenor Sax",weight:0,color:"#20B2AA",cc:0}],["baritone-sax",{promptId:"baritone-sax",text:"Baritone Sax",weight:0,color:"#008B8B",cc:0}],["soprano-sax",{promptId:"soprano-sax",text:"Soprano Sax",weight:0,color:"#00FFFF",cc:0}],["organ",{promptId:"organ",text:"Organ",weight:0,color:"#D9B2FF",cc:0}],["pipe-organ",{promptId:"pipe-organ",text:"Pipe Organ",weight:0,color:"#9370DB",cc:0}],["hammond-organ",{promptId:"hammond-organ",text:"Hammond Organ",weight:0,color:"#8A2BE2",cc:0}],["accordion",{promptId:"accordion",text:"Accordion",weight:0,color:"#FF69B4",cc:0}],["concertina",{promptId:"concertina",text:"Concertina",weight:0,color:"#FF1493",cc:0}],["synth",{promptId:"synth",text:"Synth",weight:0,color:"#DDA0DD",cc:0}],["analog-synth",{promptId:"analog-synth",text:"Analog Synth",weight:0,color:"#BA55D3",cc:0}],["digital-synth",{promptId:"digital-synth",text:"Digital Synth",weight:0,color:"#9370DB",cc:0}],["pad-synth",{promptId:"pad-synth",text:"Pad Synth",weight:0,color:"#8A2BE2",cc:0}],["lead-synth",{promptId:"lead-synth",text:"Lead Synth",weight:0,color:"#7B68EE",cc:0}],["bass-synth",{promptId:"bass-synth",text:"Bass Synth",weight:0,color:"#6A5ACD",cc:0}],["arp-synth",{promptId:"arp-synth",text:"Arp Synth",weight:0,color:"#483D8B",cc:0}],["sequencer",{promptId:"sequencer",text:"Sequencer",weight:0,color:"#4169E1",cc:0}],["harmonica",{promptId:"harmonica",text:"Harmonica",weight:0,color:"#D8FF3E",cc:0}],["kazoo",{promptId:"kazoo",text:"Kazoo",weight:0,color:"#FFFF00",cc:0}],["whistle",{promptId:"whistle",text:"Whistle",weight:0,color:"#ADFF2F",cc:0}],["ocarina",{promptId:"ocarina",text:"Ocarina",weight:0,color:"#9ACD32",cc:0}],["didgeridoo",{promptId:"didgeridoo",text:"Didgeridoo",weight:0,color:"#556B2F",cc:0}],["kalimba",{promptId:"kalimba",text:"Kalimba",weight:0,color:"#6B8E23",cc:0}],["steel-drum",{promptId:"steel-drum",text:"Steel Drum",weight:0,color:"#FFD700",cc:0}],["tabla",{promptId:"tabla",text:"Tabla",weight:0,color:"#CD853F",cc:0}],["djembe",{promptId:"djembe",text:"Djembe",weight:0,color:"#8B4513",cc:0}],["cajon",{promptId:"cajon",text:"Cajon",weight:0,color:"#A0522D",cc:0}],["vocals",{promptId:"vocals",text:"Vocals",weight:0,color:"#FF69B4",cc:0}],["choir",{promptId:"choir",text:"Choir",weight:0,color:"#FFB6C1",cc:0}],["backing-vocals",{promptId:"backing-vocals",text:"Backing Vocals",weight:0,color:"#FFC0CB",cc:0}],["vocal-harmony",{promptId:"vocal-harmony",text:"Vocal Harmony",weight:0,color:"#FFA0B4",cc:0}],["brass",{promptId:"brass",text:"Brass",weight:0,color:"#FFB347",cc:0}],["woodwind",{promptId:"woodwind",text:"Woodwind",weight:0,color:"#98D8C8",cc:0}],["percussion",{promptId:"percussion",text:"Percussion",weight:0,color:"#D2691E",cc:0}],["strings-section",{promptId:"strings-section",text:"Strings Section",weight:0,color:"#9370DB",cc:0}]]),this.midiDispatcher=new yf,this.midiDispatcher.addEventListener("cc-message",t=>{const n=t,{cc:i,value:s}=n.detail;if(this.learningSlotIndex!==null){this.slotCcMap=new Map(this.slotCcMap.set(this.learningSlotIndex,i)),this.learningSlotIndex=null,this.saveSlotMappings(),this.requestUpdate();return}if(this.slotCcMap.size>0){const l=this.selectedOrder.map(c=>this.prompts.get(c)).filter(c=>!!c).slice(0,this.maxSelectedPrompts);for(let c=0;c<l.length;c++){const u=this.slotCcMap.get(c);if(u&&u===i){const d=s/127*2;this.handleSliderChange(l[c].promptId,d)}}}if(this.learningPromptId){const l=this.prompts.get(this.learningPromptId);if(l){l.cc=i;const c=new Map(this.prompts);c.set(this.learningPromptId,l),this.prompts=c,this.learningPromptId=null,this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})),this.saveMidiMappings()}}else if(this.learningInstrumentId){const l=this.instruments.get(this.learningInstrumentId);if(l){l.cc=i;const c=new Map(this.instruments);c.set(this.learningInstrumentId,l),this.instruments=c,this.learningInstrumentId=null,this.requestUpdate(),this.dispatchEvent(new CustomEvent("instrument-changed",{detail:l})),this.saveMidiMappings()}}else{const l=s/127*2;let c=!1;this.prompts.forEach(u=>{u.cc>0&&u.cc===i&&(this.handleSliderChange(u.promptId,l),c=!0)}),this.instruments.forEach(u=>{u.cc>0&&u.cc===i&&this.handleInstrumentChange(u.promptId,l)}),c&&this.requestUpdate()}}),this.loadPromptWeights(),(e=this.loadStyleCount)==null||e.call(this),this.loadSelectedOrder(),this.selectedOrder.length===0){const t=[...this.prompts.values()].filter(n=>(n.weight??0)>.001).sort((n,i)=>(i.weight||0)-(n.weight||0));for(const n of t){if(this.selectedOrder.length>=this.maxSelectedPrompts)break;this.selectedOrder.push(n.promptId)}if(this.selectedOrder.length===0){const n=[...this.prompts.keys()];for(let c=n.length-1;c>0;c--){const u=Math.floor(Math.random()*(c+1));[n[c],n[u]]=[n[u],n[c]]}const i=Math.min(4,n.length),s=n.slice(0,i);this.selectedOrder=s;const l=new Map(this.prompts);s.forEach(c=>{const u=l.get(c);u&&(u.weight=Math.random()*1.9+.1,l.set(c,u))}),this.prompts=l,this.saveSelectedOrder(),this.savePromptWeights()}}this.selectedPromptIds=new Set(this.selectedOrder),this.loadMidiMappings(),this.loadSlotMappings(),this.loadShowAll(),this.loadScenes()}firstUpdated(){try{localStorage.getItem("deeprabbit_onboarded")||(this.showTutorial=!0)}catch{}}handleTutorialFinish(){this.showTutorial=!1;try{localStorage.setItem("deeprabbit_onboarded","1")}catch{}}connectedCallback(){super.connectedCallback(),this._onKeyDown=this._onKeyDown.bind(this),window.addEventListener("keydown",this._onKeyDown),this.mql=window.matchMedia("(max-width: 768px)");const o=()=>{var e;this.isMobile=!!((e=this.mql)!=null&&e.matches),this.isMobile||(this.showMobileMenu=!1),this.requestUpdate()};this.mql.addEventListener?this.mql.addEventListener("change",o):this.mql.addListener(o),o(),this.checkAuthStatus()}disconnectedCallback(){var o,e;if(window.removeEventListener("keydown",this._onKeyDown),this.mql){const t=()=>{};try{(e=(o=this.mql).removeEventListener)==null||e.call(o,"change",t)}catch{}}super.disconnectedCallback()}_onKeyDown(o){const e=o.key,t=this.konamiSeq[this.konamiIndex];e===t?(this.konamiIndex+=1,this.konamiIndex===this.konamiSeq.length&&(this.konamiUnlocked=!0,this.konamiIndex=0)):this.konamiIndex=e===this.konamiSeq[0]?1:0,o.key==="?"||o.key==="/"?(o.preventDefault(),this.toggleHelp()):o.key==="Escape"&&this.isMobile&&this.showMobileMenu&&(o.preventDefault(),this.showMobileMenu=!1,this.requestUpdate())}saveSlotMappings(){try{const o={};this.slotCcMap.forEach((e,t)=>{o[t.toString()]=e}),localStorage.setItem(this.SLOT_CC_STORAGE_KEY,JSON.stringify(o))}catch{}}loadSlotMappings(){try{const o=localStorage.getItem(this.SLOT_CC_STORAGE_KEY);if(!o)return;const e=JSON.parse(o),t=new Map;Object.entries(e).forEach(([n,i])=>t.set(Number(n),i)),this.slotCcMap=t}catch{}}saveMidiMappings(){try{const o={};this.prompts.forEach(t=>{t.cc&&t.cc>0&&(o[t.promptId]=t.cc)}),localStorage.setItem(this.PROMPT_CC_STORAGE_KEY,JSON.stringify(o));const e={};this.instruments.forEach(t=>{t.cc&&t.cc>0&&(e[t.promptId]=t.cc)}),localStorage.setItem(this.INSTR_CC_STORAGE_KEY,JSON.stringify(e))}catch{}}loadMidiMappings(){try{const o=localStorage.getItem(this.PROMPT_CC_STORAGE_KEY);if(o){const t=JSON.parse(o),n=new Map(this.prompts);Object.entries(t).forEach(([i,s])=>{const l=n.get(i);l&&(l.cc=s,n.set(i,l))}),this.prompts=n}const e=localStorage.getItem(this.INSTR_CC_STORAGE_KEY);if(e){const t=JSON.parse(e),n=new Map(this.instruments);Object.entries(t).forEach(([i,s])=>{const l=n.get(i);l&&(l.cc=s,n.set(i,l))}),this.instruments=n}}catch{}}goHome(){this.dispatchEvent(new CustomEvent("go-home"))}toggleHelp(){this.showHelp=!this.showHelp}toggleExportMenu(){this.showExportMenu=!this.showExportMenu}toggleScenesMenu(){this.showScenesMenu=!this.showScenesMenu}async exportWavOrMp3(o){this.dispatchEvent(new CustomEvent("export-audio",{detail:{kind:o}}))}handlePromptChanged(o){const{promptId:e,text:t,weight:n,cc:i}=o.detail,s=this.prompts.get(e);if(!s){console.error("prompt not found",e);return}s.text=t,s.weight=n,s.cc=i;const l=new Map(this.prompts);l.set(e,s),this.prompts=l,this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts}))}toggleShowMidi(){return this.setShowMidi(!this.showMidi)}async setShowMidi(o){if(this.showMidi=o,!!this.showMidi)try{const e=await this.midiDispatcher.getMidiAccess();this.midiInputIds=e,this.activeMidiInputId=this.midiDispatcher.activeMidiInputId}catch(e){this.showMidi=!1,this.dispatchEvent(new CustomEvent("error",{detail:e.message}))}}handleMidiInputChange(o){const t=o.target.value;this.activeMidiInputId=t,this.midiDispatcher.activeMidiInputId=t}playPause(){this.dispatchEvent(new CustomEvent("play-pause"))}toggleRecording(){this.dispatchEvent(new CustomEvent("toggle-recording"))}toggleAutoEvolve(){this.autoEvolveEnabled=!this.autoEvolveEnabled,this.autoEvolveEnabled?this.startAutoEvolve():this.stopAutoEvolve()}startAutoEvolve(){this.stopAutoEvolve();const o=()=>this.runAutoEvolveOnce();o(),this.evolveTimer=window.setInterval(o,this.autoEvolveRateSec*1e3)}loadScenes(){try{const o=localStorage.getItem(this.SCENES_STORAGE_KEY);if(!o)return;const e=JSON.parse(o);Array.isArray(e)&&(this.scenes=e)}catch{}}persistScenes(){try{localStorage.setItem(this.SCENES_STORAGE_KEY,JSON.stringify(this.scenes))}catch{}}stopAutoEvolve(){this.evolveTimer!==null&&(clearInterval(this.evolveTimer),this.evolveTimer=null)}runAutoEvolveOnce(){const o=this.selectedOrder.map(n=>this.prompts.get(n)).filter(n=>!!n).slice(0,this.maxSelectedPrompts);if(o.length===0)return;const e=new Map(this.prompts);let t=!1;for(const n of o){const i=Math.max(0,Math.min(1,this.autoEvolveDepth)),s=(Math.random()-.5)*.2*i,l=Math.max(0,Math.min(2,(n.weight||0)+s));Math.abs(l-n.weight)>.001&&(n.weight=l,e.set(n.promptId,n),t=!0)}if(Math.random()<.2){const n=[...this.prompts.keys()].filter(i=>!this.selectedOrder.includes(i));if(n.length>0){const i=n[Math.floor(Math.random()*n.length)],s=Math.floor(Math.random()*this.selectedOrder.length),l=[...this.selectedOrder];l[s]=i,this.selectedOrder=l,this.selectedPromptIds=new Set(this.selectedOrder),this.resetWeightsForNonDisplayedPrompts()}}t&&(this.prompts=e,this.savePromptWeights(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})))}addFilteredPrompt(o){this.filteredPrompts=new Set([...this.filteredPrompts,o])}handleSliderChange(o,e){console.log("handleSliderChange called with promptId:",o,"value:",e);const t=this.prompts.get(o);if(t){t.weight=e;const n=new Map(this.prompts);if(n.set(o,t),this.prompts=n,console.log("Slider changed for prompt:",o,"new weight:",e),console.log("Dispatching prompts-changed event with prompts:",this.prompts),this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})),this.savePromptWeights(),!this.selectedPromptIds.has(o)&&t.weight!==0){t.weight=0;const i=new Map(this.prompts);i.set(o,t),this.prompts=i,this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts}))}}else console.error("Prompt not found for ID:",o)}handleInstrumentChange(o,e){const t=this.instruments.get(o);if(t){t.weight=e;const n=new Map(this.instruments);if(n.set(o,t),this.instruments=n,this.requestUpdate(),this.dispatchEvent(new CustomEvent("instrument-changed",{detail:t})),e>0){if(this.selectedInstrumentId&&this.selectedInstrumentId!==o){const i=this.instruments.get(this.selectedInstrumentId);if(i){i.weight=0;const s=new Map(this.instruments);s.set(i.promptId,i),this.instruments=s,this.dispatchEvent(new CustomEvent("instrument-changed",{detail:i}))}}this.selectedInstrumentId=o}else this.selectedInstrumentId===o&&e===0&&(this.selectedInstrumentId=null)}}toggleStyleSelected(o){if(this.selectedPromptIds.has(o))this.selectedOrder=this.selectedOrder.filter(t=>t!==o),this.selectedPromptIds=new Set(this.selectedOrder);else{if(this.selectedPromptIds.size>=this.maxSelectedPrompts){this.dispatchEvent(new CustomEvent("error",{detail:`You can select up to ${this.maxSelectedPrompts} styles.`}));return}this.selectedOrder=[...this.selectedOrder,o],this.selectedPromptIds=new Set(this.selectedOrder);const t=this.prompts.get(o);if(t&&(!t.weight||t.weight===0)){t.weight=Math.random()*1.9+.1;const n=new Map(this.prompts);n.set(o,t),this.prompts=n,this.savePromptWeights(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts}))}}this.styleSearchQuery="",this.resetWeightsForNonDisplayedPrompts(),this.saveSelectedOrder()}resetWeightsForNonDisplayedPrompts(){let o=!1;const e=new Map(this.prompts);e.forEach((t,n)=>{!this.selectedPromptIds.has(n)&&t.weight!==0&&(t.weight=0,e.set(n,t),o=!0)}),o&&(this.prompts=e,this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})))}async ensureMidiAccess(){try{const o=await this.midiDispatcher.getMidiAccess();return this.midiInputIds=o,this.activeMidiInputId=this.midiDispatcher.activeMidiInputId,o.length===0?(this.dispatchEvent(new CustomEvent("error",{detail:"No MIDI devices found."})),!1):!0}catch(o){return this.dispatchEvent(new CustomEvent("error",{detail:o.message})),!1}}async toggleLearnMode(o){if(this.learningPromptId===o){this.learningPromptId=null;return}await this.ensureMidiAccess()&&(this.learningInstrumentId=null,this.learningPromptId=o)}async toggleSlotLearn(o){if(this.learningSlotIndex===o){this.learningSlotIndex=null;return}await this.ensureMidiAccess()&&(this.learningPromptId=null,this.learningInstrumentId=null,this.learningSlotIndex=o)}async toggleInstrumentLearnMode(o){if(this.learningInstrumentId===o){this.learningInstrumentId=null;return}await this.ensureMidiAccess()&&(this.learningPromptId=null,this.learningInstrumentId=o)}handleStyleSlotChange(o){const e=o.target,t=Number(e.value);[2,4,6,8,16].includes(t)&&(this.maxSelectedPrompts=t,this.selectedOrder.length>t&&(this.selectedOrder=this.selectedOrder.slice(0,t),this.selectedPromptIds=new Set(this.selectedOrder),this.resetWeightsForNonDisplayedPrompts()),this.saveStyleCount())}saveStyleCount(){try{localStorage.setItem(this.STYLE_COUNT_STORAGE_KEY,String(this.maxSelectedPrompts))}catch{}}loadStyleCount(){try{const o=localStorage.getItem(this.STYLE_COUNT_STORAGE_KEY);if(!o)return;const e=Number(o);[2,4,6,8,16].includes(e)&&(this.maxSelectedPrompts=e)}catch{}}toggleStyleMute(o){console.log("Toggle mute for style:",o),this.styleSearchQuery=""}isStyleMuted(o){return!1}async checkAuthStatus(){try{if(await Ie.isAuthenticated()){const e=await Ie.getCurrentUser();this.currentUser=e.user,this.userId=this.currentUser.id.toString(),this.userEmail=this.currentUser.email}else this.currentUser=null,this.userId="",this.userEmail=""}catch(o){console.log("Auth check failed:",o),this.currentUser=null,this.userId="",this.userEmail=""}}openAuthModal(){this.showAuthModal=!0}handleAuthSuccess(o){const{user:e}=o.detail;this.currentUser=e,this.userId=e.id.toString(),this.userEmail=e.email,this.showAuthModal=!1}handleAuthLogout(){this.currentUser=null,this.userId="",this.userEmail=""}render(){return w`
      <!-- DAW Header -->
      <header class="daw-header ${this.isMobile?"mobile-hidden":""}">
        ${this.isMobile&&!this.showMobileMenu?w`
          <div class="toolbar-left" style="justify-content: space-between; width:100%">
            <gf-brand></gf-brand>
            <div class="transport-controls compact">
              <play-pause-button .playbackState=${this.playbackState} @click=${this.playPause}></play-pause-button>
            </div>
          </div>
        `:w`
          <div class="toolbar-left">
            ${this.isMobile?w`<button class="toolbar-btn" @click=${()=>{this.showMobileMenu=!1}} title="Close menu">✕</button>`:""}
            <gf-brand></gf-brand>
            <div class="transport-controls">
              <play-pause-button .playbackState=${this.playbackState} @click=${this.playPause}></play-pause-button>
              <div class="status-indicator">
                <div class="status-dot ${this.playbackState==="playing"?"playing":""}"></div>
                <span>${this.playbackState==="playing"?"Playing":"Stopped"}</span>
              </div>
            </div>
          </div>
          
          <div class="toolbar-right">
            <!-- Desktop Menu Items -->
            ${this.isMobile?"":w`
              <!-- Core Actions -->
              <button class="toolbar-btn ${this.isRecording?"active":""}" @click=${this.toggleRecording} title="Record / Stop">⏺</button>
              <button class="toolbar-btn" @click=${this.resetAll} title="Reset all">♻</button>
              <button class="toolbar-btn" @click=${this.goHome} title="Return to Home">🏠</button>
              
              <!-- Generation -->
              <button class="toolbar-btn" @click=${this.randomizeGrid} title="Fill grid randomly">🎲</button>
              ${this.konamiUnlocked?w`<button class="toolbar-btn" @click=${this.presetSlotCcMap} title="Preset CC 48–55">CC48–55</button>`:""}
              
              <!-- Export -->
            <require-pro .userId=${this.userId} .email=${this.userEmail} inline>
                <button class="toolbar-btn" @click=${this.toggleExportMenu} title="Export">⬇</button>
            </require-pro>
              
              <!-- Settings -->
              <button class="toolbar-btn ${this.showSettingsMenu?"active":""}" @click=${()=>{this.showSettingsMenu=!this.showSettingsMenu}} title="Generator Settings">⚙</button>
              
              <!-- Scenes -->
              <button class="toolbar-btn" @click=${this.toggleScenesMenu} title="Scenes">🎬</button>
              
              <!-- Help -->
              <button class="toolbar-btn" @click=${this.toggleHelp} title="How to use">❓</button>
              
              <!-- Authentication -->
              ${this.currentUser?w`<user-profile .user=${this.currentUser} @auth-logout=${this.handleAuthLogout}></user-profile>`:w`<button class="toolbar-btn" @click=${this.openAuthModal} title="Sign In">👤</button>`}
            `}
            
          ${this.isMobile?"":w`
            <select class="midi-select" title="Style slots" @change=${this.handleStyleSlotChange} .value=${String(this.maxSelectedPrompts)}>
              ${[2,4,6,8,16].map(o=>w`<option value=${o}>${o} styles</option>`)}
            </select>
          `}
          ${this.isMobile?"":w`
            <button class="toolbar-btn ${this.showMidi?"active":""}" @click=${this.toggleShowMidi}>MIDI</button>
            ${this.showMidi?w`
              <select class="midi-select" @change=${this.handleMidiInputChange} .value=${this.activeMidiInputId||""}>
                <option value="">MIDI Input</option>
                ${this.midiInputIds.length>0?this.midiInputIds.map(o=>w`<option value=${o}>${this.midiDispatcher.getDeviceName(o)}</option>`):w`<option value="">No devices found</option>`}
              </select>
            `:""}
            
            <!-- EVOLVE Button -->
            <div style="position: relative;">
              <button class="toolbar-btn ${this.autoEvolveEnabled?"active":""}" @click=${()=>{this.toggleEvolveMenu()}} title="Auto-Evolve">EVOLVE</button>
              ${this.showEvolveMenu?w`
                <div class="evolve-submenu">
                  <div class="evolve-header">
                    <h4>Auto-Evolve</h4>
                    <button class="evolve-toggle ${this.autoEvolveEnabled?"active":""}" @click=${()=>{this.toggleAutoEvolve()}}>${this.autoEvolveEnabled?"ON":"OFF"}</button>
                  </div>
                  <div class="evolve-controls">
                    <div class="control-row">
                      <label>Rate</label>
                      <select class="midi-select" title="Evolve rate" @change=${o=>{this.autoEvolveRateSec=Number(o.target.value),this.autoEvolveEnabled&&this.startAutoEvolve()}} .value=${String(this.autoEvolveRateSec)}>
                        ${[8,16,32,64].map(o=>w`<option value=${o}>${o}s</option>`)}
                      </select>
                    </div>
                    <div class="control-row">
                      <label>Depth</label>
                      <select class="midi-select" title="Evolve depth" @change=${o=>{this.autoEvolveDepth=Number(o.target.value)}} .value=${String(this.autoEvolveDepth)}>
                        <option value="0.1">Subtle</option>
                        <option value="0.15">Light</option>
                        <option value="0.25">Medium</option>
                        <option value="0.4">Bold</option>
                      </select>
                    </div>
                  </div>
                </div>`:""}
            </div>
          `}
          </div>
        `}
      </header>

      <!-- Main DAW Layout -->
      <div class="daw-layout">
        <!-- Left Panel: Styles & Instruments -->
          <aside class="style-panel">
          <div class="panel-header">
            <div class="panel-toggle">
              <button class="toggle-btn ${this.leftPanelMode==="styles"?"active":""}" @click=${()=>{this.leftPanelMode="styles"}}>
                Styles
                ${this.leftPanelMode==="styles"?w`<span class="active-count">${this.getActiveStylesCount()}</span>`:""}
              </button>
              <button class="toggle-btn ${this.leftPanelMode==="instruments"?"active":""}" @click=${()=>{this.leftPanelMode="instruments"}}>
                Instruments
                ${this.leftPanelMode==="instruments"?w`<span class="active-count">${this.getActiveInstrumentsCount()}</span>`:""}
              </button>
            </div>
            
            <!-- Filter Controls -->
            <div class="filter-controls">
              <button class="filter-btn ${this.showActiveOnly?"active":""}" @click=${this.toggleShowActiveOnly}>
                ${this.showActiveOnly?"Show All":"Show Active Only"}
              </button>
            </div>
            
            <div class="search-container">
              <div class="search-input-wrapper">
                <input 
                  class="search-input" 
                  type="text" 
                  placeholder=${this.leftPanelMode==="styles"?"Search styles...":"Search instruments..."} 
                  aria-label=${this.leftPanelMode==="styles"?"Search styles":"Search instruments"} 
                  @input=${o=>{this.styleSearchQuery=o.target.value.toLowerCase()}} 
                  .value=${this.styleSearchQuery} 
                />
                <div class="search-icon">🔍</div>
              </div>
            </div>
          </div>
          <div class="style-list" role="listbox" aria-multiselectable="true" style="${this.isMobile?"max-height: 216px;":""}">
            ${this.leftPanelMode==="styles"?this.renderStyleList():this.renderInstrumentList()}
          </div>
        </aside>

        <!-- Center: Main Workspace -->
        <main class="workspace ${this.isMobile?"mobile-full":""}">
          ${this.isMobile?"":w`
            <timeline-ruler 
              .currentTime=${this.currentTime||0}
              .duration=${120}
              .bpm=${120}
              .timeSignature=${4}
              .isPlaying=${this.playbackState==="playing"}>
            </timeline-ruler>
          `}
          
          <!-- Timeline/Grid Area -->
          <div class="timeline-area">
            ${this.isMobile?"":w`
              <div class="timeline-header">
                <h3>deeprabbit — Fresh tracks. Forged by AI.</h3>
              </div>
            `}
            <div class="grid-container">
              ${this.renderPrompts()}
            </div>
          </div>
        </main>

      <!-- Bottom Navigation Bar -->
      ${this.isMobile?w`
        <div class="bottom-nav">
          <!-- Evolve Button -->
          <div class="nav-item">
            <button class="nav-btn ${this.autoEvolveEnabled?"active":""}" @click=${()=>{this.toggleEvolveMenu()}} title="Auto-Evolve">
              <div class="nav-icon">🔄</div>
              <div class="nav-label">Evolve</div>
            </button>
          </div>
          
          <!-- Menu Button -->
          <div class="nav-item">
            <button class="nav-btn" @click=${()=>{this.toggleMobileMenu()}} title="Menu">
              <div class="nav-icon">☰</div>
              <div class="nav-label">Menu</div>
            </button>
          </div>
          
          <!-- Play Button (Center) -->
          <div class="nav-item nav-center">
            <button class="nav-btn nav-play ${this.playbackState==="playing"?"playing":""}" @click=${this.playPause} title="Play / Pause">
              <div class="nav-icon">${this.playbackState==="playing"?"⏸":"▶"}</div>
            </button>
          </div>
          
          <!-- Settings Button -->
          <div class="nav-item">
            <button class="nav-btn ${this.showSettingsMenu?"active":""}" @click=${()=>{this.toggleSettingsMenu()}} title="Settings">
              <div class="nav-icon">⚙</div>
              <div class="nav-label">Settings</div>
            </button>
          </div>
          
          <!-- Record Button -->
          <div class="nav-item">
            <button class="nav-btn ${this.isRecording?"active":""}" @click=${()=>{this.toggleRecordMenu()}} title="Record">
              <div class="nav-icon">⏺</div>
              <div class="nav-label">Record</div>
            </button>
          </div>
        </div>
        
        <!-- Bottom Sheet Menus -->
        ${this.showEvolveMenu?w`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${()=>{this.showEvolveMenu=!1}}></div>
            <div class="bottom-sheet-header">
              <h3>Auto-Evolve</h3>
              <button class="bottom-sheet-close" @click=${()=>{this.showEvolveMenu=!1}}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <div class="sheet-section">
                <h4>Controls</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn ${this.autoEvolveEnabled?"active":""}" @click=${()=>{this.toggleAutoEvolve()}}>
                    <div class="sheet-btn-icon">${this.autoEvolveEnabled?"🔄":"⏸"}</div>
                    <div class="sheet-btn-label">${this.autoEvolveEnabled?"ON":"OFF"}</div>
                  </button>
                </div>
              </div>
              <div class="sheet-section">
                <h4>Settings</h4>
                <div class="control-row">
                  <label class="control-label">Rate</label>
                  <select class="control-input" @change=${o=>{this.autoEvolveRateSec=Number(o.target.value),this.autoEvolveEnabled&&this.startAutoEvolve()}} .value=${String(this.autoEvolveRateSec)}>
                    ${[8,16,32,64].map(o=>w`<option value=${o}>${o}s</option>`)}
                  </select>
                </div>
                <div class="control-row">
                  <label class="control-label">Depth</label>
                  <select class="control-input" @change=${o=>{this.autoEvolveDepth=Number(o.target.value)}} .value=${String(this.autoEvolveDepth)}>
                    <option value="0.1">Subtle</option>
                    <option value="0.15">Light</option>
                    <option value="0.25">Medium</option>
                    <option value="0.4">Bold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        `:""}
        
        ${this.showMobileMenu?w`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${()=>{this.showMobileMenu=!1}}></div>
            <div class="bottom-sheet-header">
              <h3>Menu</h3>
              <button class="bottom-sheet-close" @click=${()=>{this.showMobileMenu=!1}}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <!-- Core Actions -->
              <div class="sheet-section">
                <h4>Core Actions</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn ${this.isRecording?"active":""}" @click=${()=>{this.toggleRecording(),this.showMobileMenu=!1}}>
                    <div class="sheet-btn-icon">⏺</div>
                    <div class="sheet-btn-label">Record</div>
                  </button>
                  <button class="sheet-btn" @click=${()=>{this.resetAll(),this.showMobileMenu=!1}}>
                    <div class="sheet-btn-icon">♻</div>
                    <div class="sheet-btn-label">Reset</div>
                  </button>
                  <button class="sheet-btn" @click=${()=>{this.goHome(),this.showMobileMenu=!1}}>
                    <div class="sheet-btn-icon">🏠</div>
                    <div class="sheet-btn-label">Home</div>
                  </button>
                </div>
              </div>
              
              <!-- Generation -->
              <div class="sheet-section">
                <h4>Generation</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn" @click=${()=>{this.randomizeGrid(),this.showMobileMenu=!1}}>
                    <div class="sheet-btn-icon">🎲</div>
                    <div class="sheet-btn-label">Randomize</div>
                  </button>
                </div>
              </div>
              
              <!-- Export -->
              <require-pro .userId=${this.userId} .email=${this.userEmail} inline>
                <div class="sheet-section">
                  <h4>Export</h4>
                  <div class="sheet-grid">
                    <button class="sheet-btn" @click=${()=>{this.exportWavOrMp3("wav"),this.showMobileMenu=!1}}>
                      <div class="sheet-btn-icon">⬇</div>
                      <div class="sheet-btn-label">Export WAV</div>
                    </button>
                    <button class="sheet-btn" @click=${()=>{this.exportWavOrMp3("mp3"),this.showMobileMenu=!1}}>
                      <div class="sheet-btn-icon">⬇</div>
                      <div class="sheet-btn-label">Export MP3</div>
                    </button>
                  </div>
                </div>
              </require-pro>
              
              <!-- Scenes -->
              <div class="sheet-section">
                <h4>Scenes</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn" @click=${()=>{this.saveScene()}}>
                    <div class="sheet-btn-icon">💾</div>
                    <div class="sheet-btn-label">Save Scene</div>
                  </button>
                </div>
                <div class="scenes-list">
                  ${this.scenes.length===0?w`<div class="no-scenes">No scenes yet</div>`:""}
                  ${this.scenes.map(o=>w`
                    <div class="scene-item">
                      <button class="scene-btn" @click=${()=>{this.recallScene(o.id),this.showMobileMenu=!1}}>${o.name}</button>
                      <div class="scene-actions">
                        <button class="scene-action-btn" @click=${()=>{this.renameScene(o.id)}}>✎</button>
                        <button class="scene-action-btn" @click=${()=>{this.deleteScene(o.id)}}>🗑</button>
                      </div>
                    </div>
                  `)}
                </div>
              </div>
              
              <!-- Help -->
              <div class="sheet-section">
                <h4>Help</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn" @click=${()=>{this.toggleHelp(),this.showMobileMenu=!1}}>
                    <div class="sheet-btn-icon">❓</div>
                    <div class="sheet-btn-label">Help</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `:""}
        
        ${this.showSettingsMenu?w`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${()=>{this.showSettingsMenu=!1}}></div>
            <div class="bottom-sheet-header">
              <h3>Settings</h3>
              <button class="bottom-sheet-close" @click=${()=>{this.showSettingsMenu=!1}}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <div class="sheet-section">
                <h4>Generator Settings</h4>
                <div class="control-row">
                  <label class="control-label">Loop bars</label>
                  <input class="control-input" type="number" min="4" max="32" step="4" .value=${String(this.genLoopBars)} @change=${o=>this.updateGenSetting("loopBars",Number(o.target.value))} />
                </div>
                <div class="control-row">
                  <label class="control-label">Variation</label>
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <input class="control-range" type="range" min="0" max="2" step="0.1" .value=${String(this.genVariation)} @input=${o=>this.updateGenSetting("variation",Number(o.target.value))} />
                    <span style="color: #29F2C6; font-size: 12px; font-weight: 600; min-width: 30px; text-align: center;">${this.genVariation.toFixed(1)}</span>
                  </div>
                </div>
                <div class="control-row">
                  <label class="control-label">Genre contrast</label>
                  <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <input class="control-range" type="range" min="0" max="2" step="0.1" .value=${String(this.genGenreContrast)} @input=${o=>this.updateGenSetting("genreContrast",Number(o.target.value))} />
                    <span style="color: #29F2C6; font-size: 12px; font-weight: 600; min-width: 30px; text-align: center;">${this.genGenreContrast.toFixed(1)}</span>
                  </div>
                </div>
                <div class="control-row">
                  <label class="control-label">Mix</label>
                  <select class="control-input" .value=${this.genMix} @change=${o=>this.updateGenSetting("mix",o.target.value)}>
                    <option value="background">Background</option>
                    <option value="balanced">Balanced</option>
                    <option value="energetic">Energetic</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        `:""}
        
        ${this.showRecordMenu?w`
          <div class="bottom-sheet open">
            <div class="bottom-sheet-handle" @click=${()=>{this.showRecordMenu=!1}}></div>
            <div class="bottom-sheet-header">
              <h3>Record</h3>
              <button class="bottom-sheet-close" @click=${()=>{this.showRecordMenu=!1}}>✕</button>
            </div>
            <div class="bottom-sheet-content">
              <div class="sheet-section">
                <h4>Recording Controls</h4>
                <div class="sheet-grid">
                  <button class="sheet-btn ${this.isRecording?"active":""}" @click=${()=>{this.toggleRecording(),this.showRecordMenu=!1}}>
                    <div class="sheet-btn-icon">${this.isRecording?"⏸":"⏺"}</div>
                    <div class="sheet-btn-label">${this.isRecording?"Stop":"Start"}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `:""}
      `:""}

        
      </div>
      ${this.showHelp?w`<help-panel open @close=${this.toggleHelp}></help-panel>`:""}
      ${this.showTutorial?w`<onboarding-tutorial @finish=${this.handleTutorialFinish}></onboarding-tutorial>`:""}
      
      <!-- Authentication Modal -->
      <auth-modal 
        ?isOpen=${this.showAuthModal} 
        @auth-success=${this.handleAuthSuccess}
      ></auth-modal>
    `}renderPrompts(){const o=this.isMobile?!1:this.showAllPrompts,e=o?[...this.prompts.values()]:this.selectedOrder.map(t=>this.prompts.get(t)).filter(t=>!!t).slice(0,this.maxSelectedPrompts);if(!o){const t=new Set(e.map(s=>s.promptId)),n=new Map(this.prompts);let i=!1;n.forEach((s,l)=>{!t.has(l)&&(s.weight??0)>0&&(s.weight=0,n.set(l,s),i=!0)}),i&&(this.prompts=n,this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})))}return e.map((t,n)=>{const i=this.filteredPrompts.has(t.text),s=t.weight>0;return w`<div class="slider-row ${s?"blending":""}">
        <button class="slot-close" title="Remove from grid" aria-label="Remove ${t.text} from grid" @click=${l=>{l.stopPropagation(),this.removePromptFromGrid(t.promptId)}}>✕</button>
        <div class="slider-label">${t.text}</div>
        <div class="slider-control">
          <weight-slider
            .value=${t.weight}
            color=${i?"#888":t.color}
            audioLevel=${i?0:this.audioLevel}
            @input=${l=>this.handleSliderChange(t.promptId,l.detail)}></weight-slider>
          ${this.isMobile?"":w`
            <button type="button" class="midi-info ${this.learningSlotIndex===n?"active":""}"
              @click=${()=>this.toggleSlotLearn(n)}
              aria-label=${this.learningSlotIndex===n?"Mapping in progress, turn a knob":this.slotCcMap.has(n)?`Mapped to CC ${this.slotCcMap.get(n)}. Click to remap`:"Click to learn MIDI mapping"}>
              ${this.learningSlotIndex===n?"Learning… turn a knob":this.slotCcMap.has(n)?`CC:${this.slotCcMap.get(n)}`:"Click to learn"}
            </button>
          `}
        </div>
      </div>`})}removePromptFromGrid(o){this.selectedOrder=this.selectedOrder.filter(t=>t!==o),this.selectedPromptIds=new Set(this.selectedOrder);const e=this.prompts.get(o);if(e&&(e.weight??0)!==0){e.weight=0;const t=new Map(this.prompts);t.set(o,e),this.prompts=t,this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})),this.savePromptWeights()}this.saveSelectedOrder(),this.requestUpdate()}saveSelectedOrder(){try{localStorage.setItem(this.SELECTED_ORDER_STORAGE_KEY,JSON.stringify(this.selectedOrder))}catch{}}loadSelectedOrder(){try{const o=localStorage.getItem(this.SELECTED_ORDER_STORAGE_KEY);if(!o)return;const e=JSON.parse(o);this.selectedOrder=e.filter(t=>this.prompts.has(t))}catch{}}savePromptWeights(){try{const o={};this.prompts.forEach((e,t)=>{o[t]=e.weight||0}),localStorage.setItem(this.PROMPT_WEIGHTS_STORAGE_KEY,JSON.stringify(o))}catch{}}loadPromptWeights(){try{const o=localStorage.getItem(this.PROMPT_WEIGHTS_STORAGE_KEY);if(!o)return;const e=JSON.parse(o),t=new Map(this.prompts);Object.entries(e).forEach(([n,i])=>{const s=t.get(n);s&&(s.weight=i,t.set(n,s))}),this.prompts=t}catch{}}saveShowAll(){try{localStorage.setItem(this.SHOW_ALL_GRID_STORAGE_KEY,this.showAllPrompts?"1":"0")}catch{}}loadShowAll(){try{const o=localStorage.getItem(this.SHOW_ALL_GRID_STORAGE_KEY);this.showAllPrompts=o==="1"}catch{}}renderInstruments(){return[...this.instruments.values()].map(o=>{const e=this.filteredInstruments.has(o.text),t=this.selectedInstrumentId===o.promptId;return w`<div class="instrument-slider ${t?"active":""}">
        <div class="instrument-label">${o.text}</div>
        <weight-slider
          .value=${o.weight}
          color=${e?"#888":o.color}
          audioLevel=${e?0:this.audioLevel}
          @input=${n=>this.handleInstrumentChange(o.promptId,n.detail)}></weight-slider>
        <button type="button" class="midi-info ${this.learningInstrumentId===o.promptId?"active":""}"
          @click=${()=>this.toggleInstrumentLearnMode(o.promptId)}
          aria-label=${this.learningInstrumentId===o.promptId?"Mapping in progress, turn a knob":o.cc>0?`Mapped to CC ${o.cc}. Click to remap`:"Click to learn MIDI mapping"}>
          ${this.learningInstrumentId===o.promptId?"Learning… turn a knob":o.cc>0?`CC:${o.cc}`:"Click to learn"}
        </button>
      </div>`})}renderStyleList(){const o=this.styleSearchQuery.trim();let e=[...this.prompts.values()];return o&&(e=e.filter(t=>t.text.toLowerCase().includes(o))),this.showActiveOnly&&(e=e.filter(t=>this.selectedOrder.includes(t.promptId))),e.map(t=>{const n=this.filteredPrompts.has(t.text),i=this.selectedPromptIds.has(t.promptId);return w`<div class="style-item ${n?"filtered":""} ${i?"active":""}"
        role="option"
        tabindex="0"
        aria-selected=${i}
        aria-label="${i?"Deselect":"Select"} style ${t.text}"
        @click=${()=>this.toggleStyleSelected(t.promptId)}
        @keydown=${s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),this.toggleStyleSelected(t.promptId))}}>
        <div class="style-color" style="background-color: ${t.color}"></div>
        <div class="style-name">${t.text}</div>
        <button type="button" class="style-mute" @click=${s=>{s.stopPropagation(),this.toggleStyleMute(t.promptId)}} aria-label="${this.isStyleMuted(t.promptId)?"Unmute style":"Mute style"} ${t.text}">
          ${this.isStyleMuted(t.promptId)?"🔇":"🔊"}
        </button>
      </div>`})}renderInstrumentList(){const o=this.styleSearchQuery.trim();let e=[...this.instruments.values()];return o&&(e=e.filter(t=>t.text.toLowerCase().includes(o))),this.showActiveOnly&&(e=e.filter(t=>this.selectedOrder.includes(t.promptId))),e.map(t=>{const n=this.filteredInstruments.has(t.text),i=this.selectedInstrumentId===t.promptId,s=this.selectedOrder.includes(t.promptId);return w`<div class="style-item ${n?"filtered":""} ${i?"active":""}"
        role="option"
        tabindex="0"
        aria-selected=${i}
        aria-label="${i?"Deselect":"Select"} instrument ${t.text}"
        @click=${()=>this.toggleInstrumentSelection(t.promptId)}
        @keydown=${l=>{(l.key==="Enter"||l.key===" ")&&(l.preventDefault(),this.toggleInstrumentSelection(t.promptId))}}>
        <div class="style-color" style="background-color: ${t.color}"></div>
        <div class="style-name">${t.text}</div>
        <button type="button" class="style-mute" @click=${l=>{l.stopPropagation(),this.toggleInstrumentMute(t.promptId)}} aria-label="${s?"Remove from grid":"Add to grid"} ${t.text}">
          ${s?"✓":"+"}
        </button>
      </div>`})}toggleInstrumentSelection(o){this.selectedInstrumentId===o?this.selectedInstrumentId="":this.selectedInstrumentId=o,this.styleSearchQuery=""}getActiveInstrumentsCount(){return[...this.instruments.values()].filter(o=>this.selectedOrder.includes(o.promptId)).length}getActiveStylesCount(){return[...this.prompts.values()].filter(o=>this.selectedOrder.includes(o.promptId)).length}toggleShowActiveOnly(){this.showActiveOnly=!this.showActiveOnly}toggleEvolveMenu(){this.showEvolveMenu=!this.showEvolveMenu,this.showEvolveMenu&&(this.showMobileMenu=!1,this.showSettingsMenu=!1,this.showRecordMenu=!1)}toggleMobileMenu(){this.showMobileMenu=!this.showMobileMenu,this.showMobileMenu&&(this.showEvolveMenu=!1,this.showSettingsMenu=!1,this.showRecordMenu=!1)}toggleSettingsMenu(){this.showSettingsMenu=!this.showSettingsMenu,this.showSettingsMenu&&(this.showEvolveMenu=!1,this.showMobileMenu=!1,this.showRecordMenu=!1)}toggleRecordMenu(){this.showRecordMenu=!this.showRecordMenu,this.showRecordMenu&&(this.showEvolveMenu=!1,this.showMobileMenu=!1,this.showSettingsMenu=!1)}toggleInstrumentMute(o){const e=this.instruments.get(o);e&&(this.selectedOrder.includes(o)?(this.selectedOrder=this.selectedOrder.filter(t=>t!==o),e.weight=0):this.selectedOrder.length<this.maxSelectedPrompts&&(this.selectedOrder.push(o),e.weight=.5),this.styleSearchQuery="",this.selectedPromptIds=new Set(this.selectedOrder),this.saveSelectedOrder(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("prompts-changed",{detail:this.prompts})))}renderMixerTracks(){return null}updateGenSetting(o,e){o==="loopBars"&&(this.genLoopBars=e),o==="variation"&&(this.genVariation=e),o==="genreContrast"&&(this.genGenreContrast=e),o==="mix"&&(this.genMix=e),this.dispatchEvent(new CustomEvent("generator-settings-changed",{detail:{loopBars:this.genLoopBars,variation:this.genVariation,genreContrast:this.genGenreContrast,mix:this.genMix}}))}};E.styles=te`
    :host {
      height: 100vh;
      height: 100dvh; /* mobile-safe */
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      color: #e0e0e0;
      overflow: hidden;
      user-select: none;
      position: relative;
    }

    :host::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(41, 242, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(41, 242, 198, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
      pointer-events: none;
      z-index: -1;
    }
    
    /* Professional DAW Header */
    .daw-header {
      height: 70px;
      background: rgba(26, 26, 46, 0.8);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(41, 242, 198, 0.2);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      position: relative;
    }
    
    .daw-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(41, 242, 198, 0.6) 50%, transparent 100%);
      opacity: 0.8;
    }
    
    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    
    .app-title {
      color: #29F2C6;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 0 20px rgba(41, 242, 198, 0.5);
      position: relative;
    }
    
    
    .transport-controls {
      display: flex;
      align-items: center;
      gap: 20px;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      padding: 12px 20px;
      border-radius: 12px;
      border: 1px solid rgba(41, 242, 198, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }
    
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12px;
      color: #aaa;
      font-weight: 500;
    }
    
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #555;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .status-dot.playing {
      background: #29F2C6;
      box-shadow: 0 0 15px rgba(41, 242, 198, 0.8);
      animation: pulse 2s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }
    
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .toolbar-btn {
      background: rgba(26, 26, 46, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 10px 18px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .toolbar-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }
    
    .toolbar-btn:hover::before {
      left: 100%;
    }
    
    .toolbar-btn:hover {
      background: rgba(26, 26, 46, 0.9);
      border-color: rgba(41, 242, 198, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    
    .toolbar-btn.active {
      background: linear-gradient(135deg, rgba(41, 242, 198, 0.8) 0%, rgba(15, 201, 167, 0.8) 100%);
      color: #000;
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 0 20px rgba(41, 242, 198, 0.4);
    }
    
    .midi-select {
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      outline: none;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .midi-select:focus {
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2);
    }

    /* Panel Toggle Styles */
    .panel-toggle {
      display: flex;
      background: rgba(26, 26, 46, 0.4);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      padding: 4px;
      border: 1px solid rgba(41, 242, 198, 0.2);
      margin-bottom: 15px;
    }

    .toggle-btn {
      flex: 1;
      background: transparent;
      border: none;
      color: rgba(224, 224, 224, 0.7);
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .toggle-btn:hover {
      color: rgba(41, 242, 198, 0.8);
      background: rgba(41, 242, 198, 0.1);
    }

    .toggle-btn.active {
      background: rgba(41, 242, 198, 0.8);
      color: #000;
      box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
    }

    .active-count {
      background: rgba(41, 242, 198, 0.9);
      color: #000;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 6px;
      min-width: 16px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    }

    /* Filter Controls */
    .filter-controls {
      margin-bottom: 12px;
      display: flex;
      gap: 8px;
    }

    .filter-btn {
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: rgba(224, 224, 224, 0.8);
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .filter-btn:hover {
      background: rgba(26, 26, 46, 0.8);
      border-color: rgba(41, 242, 198, 0.4);
      color: rgba(41, 242, 198, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .filter-btn.active {
      background: rgba(41, 242, 198, 0.8);
      border-color: rgba(41, 242, 198, 0.6);
      color: #000;
      box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2), 0 2px 8px rgba(41, 242, 198, 0.3);
    }

    /* Search Container Styles */
    .search-container {
      width: 100%;
    }

    .search-input-wrapper {
      position: relative;
      width: 100%;
    }

    .search-input {
      width: 100%;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 10px 40px 10px 12px;
      border-radius: 8px;
      font-size: 12px;
      outline: none;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .search-input:focus {
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2);
    }

    .search-input::placeholder {
      color: rgba(224, 224, 224, 0.5);
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(41, 242, 198, 0.6);
      font-size: 14px;
      pointer-events: none;
    }
    
    /* Main DAW Layout */
    .daw-layout {
      display: flex;
      flex: 1;
      height: calc(100vh - 70px);
      height: calc(100dvh - 70px); /* mobile-safe */
      min-height: 0; /* allow children to shrink and enable inner scroll areas */
      align-items: stretch; /* ensure children fill height */
      overflow: hidden;
      background: #0f0f0f;
    }
    
    /* Left Panel - Style List */
    .style-panel {
      width: 300px;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(20px);
      border-right: 1px solid rgba(41, 242, 198, 0.2);
      display: flex;
      flex-direction: column;
      min-height: 0; /* critical for nested flex scroll */
      height: 100%; /* take full height of layout */
      flex: 0 0 300px; /* fix width in flex row */
      overflow: hidden;
      position: relative;
      box-shadow: 4px 0 16px rgba(0, 0, 0, 0.2);
    }
    
    .style-panel::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 100%;
      background: linear-gradient(180deg, transparent 0%, rgba(41, 242, 198, 0.6) 50%, transparent 100%);
      opacity: 0.5;
    }
    
    .panel-header {
      background: rgba(26, 26, 46, 0.8);
      backdrop-filter: blur(15px);
      padding: 18px 25px;
      border-bottom: 1px solid rgba(41, 242, 198, 0.2);
      position: relative;
      flex-shrink: 0; /* prevent header from stealing space */
    }
    
    .panel-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(41, 242, 198, 0.6) 50%, transparent 100%);
      opacity: 0.6;
    }
    
    .panel-header h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #29F2C6;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .style-list {
      flex: 1 1 0;
      min-height: 0; /* ensure list can become scroll container */
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      padding: 15px 0;
      scroll-snap-type: y mandatory;
    }
    
    .style-item {
      display: flex;
      align-items: center;
      padding: 15px 25px;
      border-bottom: 1px solid rgba(41, 242, 198, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      scroll-snap-align: start;
      background: rgba(26, 26, 46, 0.3);
      backdrop-filter: blur(10px);
      margin: 4px 8px;
      border-radius: 8px;
      border: 1px solid rgba(41, 242, 198, 0.1);
    }
    
    .style-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: transparent;
      transition: all 0.3s ease;
      border-radius: 8px 0 0 8px;
    }
    
    .style-item:hover {
      background: rgba(41, 242, 198, 0.1);
      border-color: rgba(41, 242, 198, 0.3);
      transform: translateX(4px);
      box-shadow: 0 4px 16px rgba(41, 242, 198, 0.2);
    }
    
    .style-item:hover::before {
      background: rgba(41, 242, 198, 0.8);
      box-shadow: 0 0 10px rgba(41, 242, 198, 0.5);
    }
    
    .style-item.filtered {
      opacity: 0.4;
      background: rgba(255, 68, 68, 0.1);
      border-color: rgba(255, 68, 68, 0.3);
    }
    
    .style-item.active {
      background: rgba(41, 242, 198, 0.15);
      border-color: rgba(41, 242, 198, 0.4);
      box-shadow: 0 4px 16px rgba(41, 242, 198, 0.3);
    }
    
    .style-color {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      margin-right: 15px;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .style-name {
      flex: 1;
      font-size: 12px;
      font-weight: 600;
      color: #e0e0e0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .style-mute {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.3s ease;
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      font-size: 12px;
      color: rgba(41, 242, 198, 0.8);
    }
    
    .style-mute:hover {
      background: rgba(41, 242, 198, 0.2);
      border-color: rgba(41, 242, 198, 0.4);
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
    }
    
    /* Center Workspace */
    .workspace {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: rgba(26, 26, 46, 0.3);
      backdrop-filter: blur(10px);
      min-height: 0; /* enable inner scroll */
      overflow: hidden;
      position: relative;
    }
    
    .workspace::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(41, 242, 198, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(41, 242, 198, 0.03) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .timeline-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0; /* enable grid-container to scroll */
      overflow: hidden;
    }
    
    .timeline-header {
      background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
      padding: 18px 25px;
      border-bottom: 2px solid #333;
      position: relative;
    }
    
    .timeline-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, #29F2C6 50%, transparent 100%);
      opacity: 0.4;
    }
    
    .timeline-header h3 {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #29F2C6;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .grid-container {
      flex: 1;
      padding: 25px;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 25px;
      align-content: start;
    }
    
    .slider-row {
      background: rgba(26, 26, 46, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      border-radius: 12px;
      padding: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      transition: all 0.3s ease;
      position: relative;
      overflow: visible;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    .slider-row.blending {
      border-color: rgba(41, 242, 198, 0.6);
      box-shadow: 0 8px 32px rgba(41, 242, 198, 0.3);
    }

    .slot-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 1px solid rgba(41, 242, 198, 0.3);
      background: rgba(26, 26, 46, 0.8);
      backdrop-filter: blur(10px);
      color: rgba(224, 224, 224, 0.7);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: all 0.3s ease;
    }

    .slot-close:hover {
      background: rgba(41, 242, 198, 0.2);
      color: rgba(41, 242, 198, 1);
      border-color: rgba(41, 242, 198, 0.6);
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
    }
    
    .slider-row::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent 0%, rgba(41, 242, 198, 0.8) 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 12px 12px 0 0;
    }
    
    .slider-row:hover {
      border-color: rgba(41, 242, 198, 0.4);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(41, 242, 198, 0.2);
      transform: translateY(-4px);
    }
    
    .slider-row:hover::before {
      opacity: 1;
    }
    
    .slider-label {
      color: #e0e0e0;
      font-weight: 700;
      font-size: 14px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .slider-control {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      /* Provide space for slider overlays (labels/visualizer) */
      padding-bottom: 40px;
    }
    
    weight-slider {
      width: 100%;
      max-width: 200px;
    }
    
    .midi-info {
      background: rgba(26, 26, 46, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      border-radius: 8px;
      padding: 10px 18px;
      font-size: 11px;
      color: rgba(224, 224, 224, 0.8);
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      min-width: 90px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
    
    .midi-info:hover {
      background: rgba(26, 26, 46, 0.9);
      border-color: rgba(41, 242, 198, 0.4);
      color: rgba(41, 242, 198, 1);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }

    .midi-info.active {
      background: rgba(41, 242, 198, 0.2);
      border-color: rgba(41, 242, 198, 0.6);
      color: rgba(41, 242, 198, 1);
      box-shadow: 0 0 0 3px rgba(41, 242, 198, 0.2), 0 0 20px rgba(41, 242, 198, 0.2);
    }
    
    /* EVOLVE Submenu Styles */
    .evolve-submenu {
      position: absolute;
      right: 0;
      top: 100%;
      background: rgba(26, 26, 46, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(41, 242, 198, 0.3);
      border-radius: 12px;
      padding: 20px;
      margin-top: 8px;
      min-width: 280px;
      z-index: 1002;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    }
    
    .evolve-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(41, 242, 198, 0.2);
    }
    
    .evolve-header h4 {
      margin: 0;
      color: #29F2C6;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
    }
    
    .evolve-toggle {
      background: rgba(26, 26, 46, 0.7);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(41, 242, 198, 0.2);
      color: #e0e0e0;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .evolve-toggle:hover {
      background: rgba(26, 26, 46, 0.9);
      border-color: rgba(41, 242, 198, 0.4);
      color: rgba(41, 242, 198, 1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .evolve-toggle.active {
      background: rgba(41, 242, 198, 0.8);
      border-color: rgba(41, 242, 198, 0.6);
      color: #000;
      box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2), 0 2px 8px rgba(41, 242, 198, 0.3);
    }
    
    .evolve-controls {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .control-row {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      align-items: center;
    }
    
    .control-row label {
      color: #e0e0e0;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      min-width: 50px;
    }
    
    /* Right Panel - Mixer */
    
    .instruments-list {
      border-top: 2px solid #333;
      padding: 15px 0;
    }
    
    .instrument-slider {
      padding: 18px 25px;
      border-bottom: 1px solid #222;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
      transition: all 0.2s ease;
    }
    
    .instrument-slider:hover {
      background: rgba(41, 242, 198, 0.05);
    }
    
    .instrument-slider.filtered {
      opacity: 0.4;
      background: rgba(255, 0, 0, 0.1);
    }
    .instrument-slider.active {
      background: linear-gradient(90deg, rgba(41, 242, 198, 0.08) 0%, transparent 100%);
      border-left: 3px solid #29F2C6;
    }
    
    .instrument-label {
      font-size: 12px;
      color: #e0e0e0;
      font-weight: 600;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    /* Professional Scrollbars */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    
    ::-webkit-scrollbar-track {
      background: #0f0f0f;
      border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #333 0%, #222 100%);
      border-radius: 5px;
      border: 1px solid #444;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(180deg, #444 0%, #333 100%);
    }
    
    ::-webkit-scrollbar-corner {
      background: #0f0f0f;
    }
    
    /* Responsive Design */
    @media (max-width: 1400px) {
      .style-panel {
        width: 260px;
      }
      
      .mixer-panel {
        width: 300px;
      }
      
      .grid-container {
        grid-template-columns: repeat(4, minmax(200px, 1fr));
        gap: 20px;
        padding: 20px;
      }
    }
    
    @media (max-width: 768px) {
      :host {
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
      }
      
      /* Prevent mobile zoom on input focus */
      input, select, textarea {
        font-size: 16px !important;
        transform: scale(1) !important;
      }
      
      /* Prevent zoom on focus */
      * {
        -webkit-text-size-adjust: 100%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Allow text selection in inputs */
      input, textarea {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
      }
      
      .daw-header.mobile-hidden {
        display: none;
      }
      
      .daw-layout {
        flex-direction: column;
        height: calc(100vh - 70px);
        height: calc(100dvh - 70px);
        overflow: hidden;
        padding-bottom: 80px; /* Space for bottom nav */
      }
      
      .daw-layout.mobile-full,
      .workspace.mobile-full {
        height: 100vh;
        height: 100dvh;
      }
      
      .slot-close { 
        width: 32px; 
        height: 32px; 
        font-size: 14px;
        top: 6px;
        right: 6px;
      }
      
      .toolbar-right { 
        display: flex; 
        align-items: center;
        gap: 20px;
      }
      
      /* Mobile Menu Header */
      .mobile-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(41, 242, 198, 0.2);
      }
      
      .mobile-menu-header h3 {
        margin: 0;
        color: #29F2C6;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .close-btn {
        background: rgba(41, 242, 198, 0.8);
        border: none;
        color: #000;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
      }
      
      .close-btn:hover {
        background: rgba(41, 242, 198, 1);
        transform: scale(1.05);
      }
      
      /* Mobile Button Groups */
      .mobile-btn-group {
        background: rgba(26, 26, 46, 0.6);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .mobile-controls {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 8px;
        align-items: center;
        margin-top: 10px;
      }
      
      .mobile-controls label {
        color: #e0e0e0;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Mobile Submenu Styles */
      .mobile-submenu {
        background: rgba(26, 26, 46, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(41, 242, 198, 0.3);
        border-radius: 8px;
        padding: 12px;
        margin-top: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      }
      
      .submenu-btn {
        display: block;
        width: 100%;
        background: rgba(26, 26, 46, 0.7);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        color: #e0e0e0;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        font-weight: 600;
        transition: all 0.3s ease;
        margin-bottom: 6px;
        text-align: left;
      }
      
      .submenu-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
      }
      
      .submenu-btn:last-child {
        margin-bottom: 0;
      }
      
      /* Settings Submenu */
      .settings-submenu {
        min-width: 280px;
      }
      
      .settings-grid {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 8px;
        align-items: center;
      }
      
      .settings-grid label {
        color: #e0e0e0;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Scenes Submenu */
      .scenes-submenu {
        min-width: 250px;
      }
      
      .scene-controls {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        align-items: center;
      }
      
      .scenes-list {
        max-height: 200px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      
      .scene-item {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 6px;
      }
      
      .scene-btn {
        flex: 1;
        background: rgba(26, 26, 46, 0.7);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        color: #e0e0e0;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 11px;
        font-weight: 600;
        transition: all 0.3s ease;
        text-align: left;
      }
      
      .scene-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
      }
      
      .scene-action-btn {
        background: rgba(26, 26, 46, 0.7);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        color: #e0e0e0;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 10px;
        transition: all 0.3s ease;
      }
      
      .scene-action-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
      }
      
      .no-scenes {
        color: rgba(224, 224, 224, 0.6);
        font-size: 11px;
        padding: 8px;
        text-align: center;
        font-style: italic;
      }
      
      /* Evolve Controls */
      .evolve-controls {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 8px;
        align-items: center;
        margin-top: 10px;
      }
      
      .evolve-controls label {
        color: #e0e0e0;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      /* Bottom Navigation Bar */
      .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.95);
        backdrop-filter: blur(20px);
        border-top: 2px solid rgba(41, 242, 198, 0.3);
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 12px 0;
        z-index: 1002;
        box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.4);
        min-height: 80px;
      }
      
      /* Bottom Sheet Menu System */
      .bottom-sheet {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(26, 26, 46, 0.98);
        backdrop-filter: blur(20px);
        border-top: 2px solid rgba(41, 242, 198, 0.4);
        border-radius: 20px 20px 0 0;
        z-index: 1003;
        transform: translateY(100%);
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.5);
      }
      
      .bottom-sheet.open {
        transform: translateY(0);
      }
      
      .bottom-sheet-handle {
        width: 40px;
        height: 4px;
        background: rgba(41, 242, 198, 0.6);
        border-radius: 2px;
        margin: 12px auto 8px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .bottom-sheet-handle:hover {
        background: rgba(41, 242, 198, 0.8);
        transform: scaleX(1.2);
      }
      
      .bottom-sheet-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px 16px;
        border-bottom: 1px solid rgba(41, 242, 198, 0.2);
        margin-bottom: 20px;
      }
      
      .bottom-sheet-header h3 {
        margin: 0;
        color: #29F2C6;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-shadow: 0 0 10px rgba(41, 242, 198, 0.3);
      }
      
      .bottom-sheet-close {
        background: rgba(41, 242, 198, 0.8);
        border: none;
        color: #000;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.3);
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .bottom-sheet-close:hover {
        background: rgba(41, 242, 198, 1);
        transform: scale(1.05);
      }
      
      .bottom-sheet-content {
        padding: 0 20px 20px;
        max-height: calc(80vh - 120px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      
      .sheet-section {
        margin-bottom: 24px;
      }
      
      .sheet-section:last-child {
        margin-bottom: 0;
      }
      
      .sheet-section h4 {
        margin: 0 0 12px 0;
        color: #29F2C6;
        font-size: 14px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding-left: 4px;
      }
      
      .sheet-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }
      
      .sheet-btn {
        background: rgba(26, 26, 46, 0.8);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 12px;
        color: #e0e0e0;
        padding: 16px 12px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        min-height: 80px;
        justify-content: center;
        touch-action: manipulation;
        position: relative;
        overflow: hidden;
      }
      
      .sheet-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
      }
      
      .sheet-btn:hover::before {
        left: 100%;
      }
      
      .sheet-btn:hover {
        background: rgba(26, 26, 46, 0.9);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(41, 242, 198, 0.2);
      }
      
      .sheet-btn.active {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.6);
        color: rgba(41, 242, 198, 1);
        box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2);
      }
      
      .sheet-btn-icon {
        font-size: 20px;
        line-height: 1;
      }
      
      .sheet-btn-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.2;
      }
      
      /* Control Rows for Settings */
      .control-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid rgba(41, 242, 198, 0.1);
      }
      
      .control-row:last-child {
        border-bottom: none;
      }
      
      .control-label {
        color: #e0e0e0;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        min-width: 80px;
        flex-shrink: 0;
      }
      
      .control-input {
        flex: 1;
        background: rgba(26, 26, 46, 0.8);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 8px;
        color: #e0e0e0;
        padding: 8px 12px;
        font-size: 12px;
        transition: all 0.3s ease;
        min-height: 44px;
      }
      
      .control-input:focus {
        border-color: rgba(41, 242, 198, 0.5);
        outline: none;
        box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.1);
      }
      
      .control-range {
        flex: 1;
        height: 8px;
        background: linear-gradient(to right, rgba(41, 242, 198, 0.3) 0%, rgba(41, 242, 198, 0.3) 50%, rgba(26, 26, 46, 0.8) 50%, rgba(26, 26, 46, 0.8) 100%);
        border-radius: 4px;
        outline: none;
        -webkit-appearance: none;
        appearance: none;
        position: relative;
        border: 1px solid rgba(41, 242, 198, 0.4);
      }
      
      .control-range::-webkit-slider-track {
        height: 8px;
        background: transparent;
        border-radius: 4px;
        border: none;
        -webkit-appearance: none;
      }
      
      .control-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        background: #29F2C6;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.4);
        transition: all 0.3s ease;
        border: 3px solid rgba(26, 26, 46, 0.9);
        margin-top: -8px;
      }
      
      .control-range::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 16px rgba(41, 242, 198, 0.6);
      }
      
      .control-range::-moz-range-track {
        height: 8px;
        background: rgba(26, 26, 46, 0.8);
        border-radius: 4px;
        border: 1px solid rgba(41, 242, 198, 0.4);
      }
      
      .control-range::-moz-range-thumb {
        width: 24px;
        height: 24px;
        background: #29F2C6;
        border-radius: 50%;
        cursor: pointer;
        border: 3px solid rgba(26, 26, 46, 0.9);
        box-shadow: 0 2px 8px rgba(41, 242, 198, 0.4);
      }
      
      /* Scene List */
      .scenes-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 12px;
      }
      
      .scene-item {
        display: flex;
        align-items: center;
        gap: 12px;
        background: rgba(26, 26, 46, 0.6);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 8px;
        padding: 12px;
        transition: all 0.3s ease;
      }
      
      .scene-item:hover {
        background: rgba(26, 26, 46, 0.8);
        border-color: rgba(41, 242, 198, 0.4);
        transform: translateX(4px);
      }
      
      .scene-btn {
        flex: 1;
        background: none;
        border: none;
        color: #e0e0e0;
        font-size: 12px;
        font-weight: 500;
        text-align: left;
        cursor: pointer;
        padding: 4px 0;
        transition: color 0.3s ease;
      }
      
      .scene-btn:hover {
        color: rgba(41, 242, 198, 1);
      }
      
      .scene-actions {
        display: flex;
        gap: 6px;
      }
      
      .scene-action-btn {
        background: rgba(26, 26, 46, 0.8);
        border: 1px solid rgba(41, 242, 198, 0.2);
        border-radius: 6px;
        color: #e0e0e0;
        padding: 6px 8px;
        cursor: pointer;
        font-size: 10px;
        transition: all 0.3s ease;
        min-width: 32px;
        min-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .scene-action-btn:hover {
        background: rgba(41, 242, 198, 0.2);
        border-color: rgba(41, 242, 198, 0.4);
        color: rgba(41, 242, 198, 1);
        transform: scale(1.05);
      }
      
      .no-scenes {
        text-align: center;
        color: rgba(224, 224, 224, 0.6);
        font-size: 12px;
        font-style: italic;
        padding: 20px;
        background: rgba(26, 26, 46, 0.3);
        border-radius: 8px;
        border: 1px dashed rgba(41, 242, 198, 0.2);
      }
      
      .nav-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      
      .nav-item.nav-center {
        flex: 0 0 auto;
        margin: 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
      
      .nav-btn {
        background: transparent;
        border: none;
        color: #e0e0e0;
        padding: 12px 16px;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        min-width: 70px;
        min-height: 70px;
        justify-content: center;
        touch-action: manipulation;
        position: relative;
        overflow: hidden;
      }
      
      .nav-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s ease;
      }
      
      .nav-btn:hover::before {
        left: 100%;
      }
      
      .nav-btn:hover {
        background: rgba(41, 242, 198, 0.1);
        color: rgba(41, 242, 198, 1);
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(41, 242, 198, 0.2);
      }
      
      .nav-btn.active {
        background: rgba(41, 242, 198, 0.2);
        color: rgba(41, 242, 198, 1);
        box-shadow: 0 0 0 2px rgba(41, 242, 198, 0.2);
      }
      
      .nav-play {
        background: rgba(41, 242, 198, 0.8);
        color: #000;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        min-width: 70px;
        min-height: 70px;
        box-shadow: 0 6px 20px rgba(41, 242, 198, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: -15px 0; /* Extend above and below nav bar */
      }
      
      .nav-play:hover {
        background: rgba(41, 242, 198, 1);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(41, 242, 198, 0.5);
      }
      
      .nav-play.playing {
        background: rgba(255, 107, 107, 0.8);
        box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
      }
      
      .nav-play.playing:hover {
        background: rgba(255, 107, 107, 1);
        box-shadow: 0 8px 24px rgba(255, 107, 107, 0.5);
      }
      
      .nav-play .nav-icon {
        font-size: 28px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .nav-label {
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .nav-play .nav-label {
        display: none;
      }
      
      
      /* Responsive adjustments for bottom sheet */
      @media (max-width: 480px) {
        .nav-play {
          width: 65px;
          height: 65px;
          min-width: 65px;
          min-height: 65px;
          margin: -12px 0;
        }
        
        .nav-play .nav-icon {
          font-size: 26px;
        }
        
        .nav-item.nav-center {
          margin: 0 20px;
        }
        
        .nav-btn {
          min-width: 60px;
          min-height: 60px;
          padding: 10px 12px;
        }
        
        .bottom-sheet-content {
          padding: 0 16px 16px;
        }
        
        .sheet-grid {
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
        }
        
        .sheet-btn {
          min-height: 70px;
          padding: 12px 8px;
        }
      }
      
      @media (max-width: 360px) {
        .nav-btn {
          min-width: 55px;
          min-height: 55px;
          padding: 8px 10px;
        }
        
        .nav-item.nav-center {
          margin: 0 15px;
        }
        
        .sheet-grid {
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 8px;
        }
        
        .sheet-btn {
          min-height: 65px;
          padding: 10px 6px;
        }
        
        .sheet-btn-icon {
          font-size: 18px;
        }
        
        .sheet-btn-label {
          font-size: 10px;
        }
      }
      
      .transport-controls.compact { 
        padding: 8px 12px; 
        gap: 12px; 
        min-width: auto;
      }
      
      .slider-row { 
        padding: 15px; 
        gap: 15px; 
        min-height: 120px;
      }
      
      .slider-label { 
        font-size: 13px; 
        margin-bottom: 8px;
      }
      
      weight-slider { 
        max-width: 200px; 
        height: 100px;
      }
      
      .style-panel {
        width: 100%;
        height: auto;
        max-height: 50vh;
        overflow: hidden;
        border-right: none;
        border-bottom: 2px solid var(--border);
        flex-shrink: 0;
      }
      
      .style-list {
        max-height: calc(50vh - 80px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }
      
      .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 12px;
        padding: 12px;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
        flex: 1;
        overflow-y: auto;
      }
      
      .daw-header {
        height: auto;
        min-height: 70px;
        padding: 15px 20px;
        flex-direction: column;
        gap: 15px;
        position: sticky;
        top: 0;
        z-index: 1000;
        flex-shrink: 0;
      }
      
      .toolbar-left {
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
      
      .app-title {
        font-size: 16px;
        letter-spacing: 1px;
      }
      
      .toolbar-btn {
        padding: 10px 14px;
        font-size: 11px;
        min-height: 44px;
        min-width: 44px;
        touch-action: manipulation;
      }
      
      .midi-select {
        padding: 10px 12px;
        font-size: 11px;
        min-height: 44px;
        touch-action: manipulation;
      }
      
      /* Mobile menu button */
      .mobile-menu-btn {
        display: block;
        background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
        border: 1px solid #444;
        color: #e0e0e0;
        padding: 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        touch-action: manipulation;
      }
      
      .mobile-menu-btn:hover {
        background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
        border-color: #555;
        transform: translateY(-1px);
      }
    }

    @media (max-width: 480px) {
      .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 8px;
        padding: 8px;
      }

      .style-panel {
        max-height: 45vh;
      }
      
      .style-list {
        max-height: calc(45vh - 80px);
      }

      .slider-row { 
        padding: 12px; 
        gap: 12px; 
        min-height: 100px;
      }
      
      .slider-label { 
        font-size: 12px; 
        margin-bottom: 6px;
      }
      
      weight-slider { 
        max-width: 160px; 
        height: 80px;
      }
      
      .toolbar-btn, .midi-select {
        padding: 8px 10px;
        font-size: 10px;
        min-height: 40px;
        min-width: 40px;
      }
      
      .daw-header {
        padding: 12px 15px;
        gap: 12px;
      }
      
      .app-title {
        font-size: 14px;
      }
      
      .transport-controls.compact {
        padding: 6px 10px;
        gap: 8px;
      }
      
      .slot-close {
        width: 28px;
        height: 28px;
        font-size: 12px;
      }
    }
    
    /* Landscape mobile optimization */
    @media (max-width: 768px) and (orientation: landscape) {
      .style-panel {
        max-height: 40vh;
      }
      
      .style-list {
        max-height: calc(40vh - 80px);
      }
      
      .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 10px;
        padding: 10px;
      }
    }
    
    /* Ambient Animations */
    @keyframes ambientGlow {
      0%, 100% { 
        box-shadow: 0 0 20px rgba(41, 242, 198, 0.1),
                    0 0 40px rgba(41, 242, 198, 0.05);
      }
      50% { 
        box-shadow: 0 0 30px rgba(41, 242, 198, 0.15),
                    0 0 60px rgba(41, 242, 198, 0.08);
      }
    }
    
    @keyframes ambientFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }
    
    @keyframes ambientPulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }
    
    @keyframes ambientShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes ambientBreath {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    
    /* Apply ambient animations */
    .toolbar-btn:hover {
      animation: ambientFloat 2s ease-in-out infinite;
    }
    
    /* Nav button ambient effects - REMOVED */
    /* .nav-btn:hover {
      animation: ambientFloat 2s ease-in-out infinite;
    } */
    
    .play-pause-button:hover {
      animation: ambientBreath 3s ease-in-out infinite;
    }
    
    /* Nav play ambient effects - REMOVED */
    /* .nav-play:hover {
      animation: ambientGlow 2s ease-in-out infinite, ambientBreath 3s ease-in-out infinite;
    } */
    
    .active-count {
      animation: ambientPulse 2s ease-in-out infinite;
    }
    
    .status-dot.playing {
      animation: ambientPulse 1.5s ease-in-out infinite;
    }
    
    /* Subtle background animations */
    .daw-header {
      background: linear-gradient(135deg, 
        rgba(26, 26, 46, 0.95) 0%, 
        rgba(26, 26, 46, 0.98) 50%, 
        rgba(26, 26, 46, 0.95) 100%);
      background-size: 200% 200%;
      animation: ambientShimmer 8s ease-in-out infinite;
    }
    
    .bottom-nav {
      background: linear-gradient(135deg, 
        rgba(26, 26, 46, 0.95) 0%, 
        rgba(26, 26, 46, 0.98) 50%, 
        rgba(26, 26, 46, 0.95) 100%);
      background-size: 200% 200%;
      animation: ambientShimmer 10s ease-in-out infinite;
    }
    
    /* Grid item ambient effects */
    .grid-item:hover {
      animation: ambientFloat 1.5s ease-in-out infinite;
    }
    
    .grid-item.active {
      animation: ambientGlow 3s ease-in-out infinite;
    }
    
    /* Panel ambient effects */
    .style-panel, .instruments-panel {
      background: linear-gradient(135deg, 
        rgba(26, 26, 46, 0.8) 0%, 
        rgba(26, 26, 46, 0.9) 50%, 
        rgba(26, 26, 46, 0.8) 100%);
      background-size: 300% 300%;
      animation: ambientShimmer 12s ease-in-out infinite;
    }
    
    /* Popup ambient effects - REMOVED */
    /* .evolve-popup, .menu-popup, .settings-popup, .record-popup {
      animation: ambientFloat 0.3s ease-out;
    } */
    
    /* Slider ambient effects */
    weight-slider:hover {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Scene ambient effects */
    .scene-btn:hover {
      animation: ambientFloat 1s ease-in-out infinite;
    }
    
    /* Menu button ambient effects */
    .menu-btn:hover {
      animation: ambientFloat 1.2s ease-in-out infinite;
    }
    
    /* Search input ambient effects */
    .search-input:focus {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Toggle button ambient effects */
    .toggle-btn:hover {
      animation: ambientFloat 1.5s ease-in-out infinite;
    }
    
    .toggle-btn.active {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Filter button ambient effects */
    .filter-btn:hover {
      animation: ambientFloat 1.3s ease-in-out infinite;
    }
    
    .filter-btn.active {
      animation: ambientGlow 2.5s ease-in-out infinite;
    }
    
    /* Instrument/Style item ambient effects */
    .style-item:hover, .instrument-item:hover {
      animation: ambientFloat 1.2s ease-in-out infinite;
    }
    
    .style-item.selected, .instrument-item.selected {
      animation: ambientGlow 3s ease-in-out infinite;
    }
    
    /* Nav icon ambient effects - REMOVED */
    /* .nav-icon {
      animation: ambientFloat 3s ease-in-out infinite;
    } */
    
    /* Nav label ambient effects - REMOVED */
    /* .nav-label {
      animation: ambientFloat 3.5s ease-in-out infinite;
    } */
    
    /* Nav item ambient effects - REMOVED */
    /* .nav-item {
      animation: ambientFloat 4s ease-in-out infinite;
    }
    
    .nav-item:nth-child(1) {
      animation-delay: 0s;
    }
    
    .nav-item:nth-child(2) {
      animation-delay: 0.5s;
    }
    
    .nav-item:nth-child(3) {
      animation-delay: 1s;
    }
    
    .nav-item:nth-child(4) {
      animation-delay: 1.5s;
    }
    
    .nav-item:nth-child(5) {
      animation-delay: 2s;
    } */
    
    /* Hamburger ambient effects */
    .hamburger span {
      animation: ambientFloat 2s ease-in-out infinite;
    }
    
    .hamburger span:nth-child(1) {
      animation-delay: 0s;
    }
    
    .hamburger span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .hamburger span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    /* Brand ambient effects */
    gf-brand {
      animation: ambientFloat 4s ease-in-out infinite;
    }
    
    /* Status indicator ambient effects */
    .status-indicator:hover {
      animation: ambientFloat 2s ease-in-out infinite;
    }
    
    /* Transport controls ambient effects */
    .transport-controls:hover {
      animation: ambientFloat 2.5s ease-in-out infinite;
    }
    
    /* MIDI info ambient effects */
    .midi-info:hover {
      animation: ambientFloat 1.8s ease-in-out infinite;
    }
    
    .midi-info.active {
      animation: ambientGlow 2s ease-in-out infinite;
    }
    
    /* Handle ambient effects */
    .bottom-sheet-handle {
      animation: ambientPulse 3s ease-in-out infinite;
    }
    
    /* Backdrop ambient effects - REMOVED */
    /* .popup-backdrop {
      animation: ambientPulse 4s ease-in-out infinite;
    } */
    
    /* Content ambient effects - REMOVED */
    /* .popup-content {
      animation: ambientFloat 0.5s ease-out;
    } */
    
    /* Header ambient effects - REMOVED */
    /* .popup-header {
      animation: ambientFloat 0.3s ease-out;
    } */
    
    /* Section ambient effects - REMOVED */
    /* .menu-section {
      animation: ambientFloat 0.4s ease-out;
    }
    
    .menu-section:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .menu-section:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Button group ambient effects - REMOVED */
    /* .menu-buttons {
      animation: ambientFloat 0.6s ease-out;
    } */
    
    /* Settings grid ambient effects - REMOVED */
    /* .settings-grid {
      animation: ambientFloat 0.7s ease-out;
    } */
    
    /* Setting row ambient effects - REMOVED */
    /* .setting-row {
      animation: ambientFloat 0.8s ease-out;
    }
    
    .setting-row:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .setting-row:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Scenes list ambient effects - REMOVED */
    /* .scenes-list {
      animation: ambientFloat 0.9s ease-out;
    } */
    
    /* Scene item ambient effects - REMOVED */
    /* .scene-item {
      animation: ambientFloat 1s ease-out;
    }
    
    .scene-item:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .scene-item:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Control row ambient effects - REMOVED */
    /* .control-row {
      animation: ambientFloat 1.1s ease-out;
    }
    
    .control-row:nth-child(odd) {
      animation-delay: 0.1s;
    }
    
    .control-row:nth-child(even) {
      animation-delay: 0.2s;
    } */
    
    /* Popup controls ambient effects - REMOVED */
    /* .popup-controls {
      animation: ambientFloat 1.2s ease-out;
    } */
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;k([R()],E.prototype,"maxSelectedPrompts",2);k([R()],E.prototype,"showExportMenu",2);k([L({type:String})],E.prototype,"userId",2);k([L({type:String})],E.prototype,"userEmail",2);k([L({type:Object})],E.prototype,"currentUser",2);k([R()],E.prototype,"showAuthModal",2);k([R()],E.prototype,"showTutorial",2);k([R()],E.prototype,"isRecording",2);k([R()],E.prototype,"autoEvolveEnabled",2);k([R()],E.prototype,"autoEvolveRateSec",2);k([R()],E.prototype,"autoEvolveDepth",2);k([R()],E.prototype,"styleSearchQuery",2);k([R()],E.prototype,"selectedOrder",2);k([R()],E.prototype,"showAllPrompts",2);k([R()],E.prototype,"isMobile",2);k([R()],E.prototype,"showMobileMenu",2);k([R()],E.prototype,"showEvolveMenu",2);k([R()],E.prototype,"showSettingsMenu",2);k([R()],E.prototype,"showRecordMenu",2);k([R()],E.prototype,"leftPanelMode",2);k([R()],E.prototype,"showActiveOnly",2);k([L({type:Boolean})],E.prototype,"showMidi",2);k([L({type:String})],E.prototype,"playbackState",2);k([R()],E.prototype,"audioLevel",2);k([R()],E.prototype,"currentTime",2);k([R()],E.prototype,"midiInputIds",2);k([R()],E.prototype,"activeMidiInputId",2);k([R()],E.prototype,"learningPromptId",2);k([R()],E.prototype,"learningInstrumentId",2);k([R()],E.prototype,"selectedPromptIds",2);k([R()],E.prototype,"selectedInstrumentId",2);k([R()],E.prototype,"learningSlotIndex",2);k([R()],E.prototype,"slotCcMap",2);k([R()],E.prototype,"scenes",2);k([R()],E.prototype,"showScenesMenu",2);k([R()],E.prototype,"sceneMorphSec",2);k([R()],E.prototype,"genLoopBars",2);k([R()],E.prototype,"genVariation",2);k([R()],E.prototype,"genGenreContrast",2);k([R()],E.prototype,"genMix",2);k([R()],E.prototype,"konamiUnlocked",2);k([R()],E.prototype,"showHelp",2);k([L({type:Object})],E.prototype,"filteredPrompts",2);k([L({type:Object})],E.prototype,"filteredInstruments",2);E=k([ne("prompt-dj-midi")],E);var Af=Object.defineProperty,If=Object.getOwnPropertyDescriptor,gn=(o,e,t,n)=>{for(var i=n>1?void 0:n?If(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&Af(e,t,i),i};let ge=class extends Y{constructor(){super(...arguments),this.message="",this.showing=!1,this.hideTimer=null}renderMessageWithLinks(){const o=/(https?:\/\/[^\s]+)/g;return this.message.split(o).map((t,n)=>n%2===0?t:w`<a href=${t} target="_blank" rel="noopener">${t}</a>`)}render(){return this.showing?w`<div class=${Zi({showing:this.showing,toast:!0})}>
      <div class="message">${this.renderMessageWithLinks()}</div>
      <button @click=${this.hide}>✕</button>
    </div>`:w``}show(o){this.showing=!0,this.message=o,this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null),this.hideTimer=window.setTimeout(()=>this.hide(),4e3)}hide(){this.showing=!1,this.hideTimer&&(clearTimeout(this.hideTimer),this.hideTimer=null),setTimeout(()=>{this.message=""},300)}};ge.styles=te`
    .toast {
      line-height: 1.6;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      width: min(500px, 90vw);
      transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      text-wrap: pretty;
      backdrop-filter: blur(12px);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      z-index: 1000;
    }
    
    .toast::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .toast:hover::before {
      opacity: 1;
    }
    
    .message {
      flex: 1;
      font-weight: 500;
    }
    
    button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    
    button:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      transform: scale(1.1);
    }
    
    .toast:not(.showing) {
      transition-duration: 0.6s;
      transform: translateY(200%);
      opacity: 0;
    }
    
    .toast.showing {
      animation: slideIn 0.4s ease-out;
    }
    
    @keyframes slideIn {
      from {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
    
    a {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }
    
    a:hover {
      color: #93c5fd;
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .toast {
        bottom: 10px;
        right: 10px;
        padding: 0.875rem 1rem;
        border-radius: 10px;
        width: calc(100vw - 20px);
      }
      .toast:not(.showing) { transform: translateY(100%); }
      .toast.showing { animation: slideInMobile 0.4s ease-out; }
      @keyframes slideInMobile {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    }
  `;gn([L({type:String})],ge.prototype,"message",2);gn([L({type:Boolean})],ge.prototype,"showing",2);ge=gn([ne("toast-message")],ge);/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/function kf(o){const e=atob(o),t=e.length,n=new Uint8Array(t);for(let i=0;i<t;i++)n[i]=e.charCodeAt(i);return n}async function Pf(o,e,t=48e3,n=2){try{e.state==="suspended"&&await e.resume(),console.log("Audio data info:",{length:o.length,byteOffset:o.byteOffset,byteLength:o.byteLength,firstBytes:Array.from(o.slice(0,16)).map(l=>l.toString(16).padStart(2,"0")).join(" "),audioContextState:e.state});const i=Array.from(o.slice(0,4));if(!(i[0]===82&&i[1]===73&&i[2]===70&&i[3]===70||i[0]===255&&(i[1]===251||i[1]===250)||i[0]===79&&i[1]===103&&i[2]===103&&i[3]===83)&&o.length>0){console.log("Raw PCM audio data detected, creating AudioBuffer directly");const l=o.length/(n*2),c=e.createBuffer(n,l,t),u=new DataView(o.buffer,o.byteOffset,o.byteLength);for(let d=0;d<n;d++){const p=c.getChannelData(d);for(let f=0;f<l;f++){const h=u.getInt16((f*n+d)*2,!0);p[f]=h/32768}}return console.log("Successfully created AudioBuffer from raw PCM data:",{channels:c.numberOfChannels,length:c.length,sampleRate:c.sampleRate,duration:c.duration}),c}return await e.decodeAudioData(o.buffer.slice(o.byteOffset,o.byteOffset+o.byteLength))}catch(i){return console.warn("Failed to decode audio data:",i),console.warn("Audio data length:",o.length,"bytes"),e.createBuffer(n,t*.1,t)}}function si(o){const e=o.createDynamicsCompressor();return e.threshold.value=-3,e.knee.value=0,e.ratio.value=20,e.attack.value=.003,e.release.value=.1,e}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/class Rf extends EventTarget{constructor(e,t){super(),this.session=null,this.sessionPromise=null,this.connectionError=!0,this.filteredPrompts=new Set,this.nextStartTime=0,this.bufferTime=2,this.extraDestination=null,this.masterLimiter=null,this.playbackState="stopped",this.settings={loopBars:8,variation:1.2,genreContrast:1.2,mix:"balanced"},this.reconnecting=!1,this.retryAttempt=0,this.reconnectTimer=null,this.shouldAutoResume=!1,this.interstitialActive=!1,this.adGain=null,this.adOscillators=[],this.ttsUtterance=null,this.setWeightedPrompts=Wi(async n=>{if(console.log("LiveMusicHelper.setWeightedPrompts called with:",n),this.prompts=n,this.activePrompts.length===0){console.log("No active prompts, pausing"),this.dispatchEvent(new CustomEvent("error",{detail:"There needs to be one active prompt to play."})),this.pause();return}if(console.log("Active prompts:",this.activePrompts),!this.session){console.log("No session yet, storing prompts for later");return}try{const i=this.activePrompts,s=i.length>0?[...i,{promptId:"meta",text:this.buildMetaPrompt(),color:"#ffffff",cc:0,weight:.35}]:i;console.log("Setting weighted prompts on session:",s),await this.session.setWeightedPrompts({weightedPrompts:s}),console.log("Successfully set weighted prompts on session")}catch(i){console.error("Error setting weighted prompts:",i),this.dispatchEvent(new CustomEvent("error",{detail:i.message})),this.pause()}},200),this.ai=e,this.model=t,this.prompts=new Map,this.audioContext=new AudioContext({sampleRate:48e3}),this.outputNode=this.audioContext.createGain(),this.recordTap=this.audioContext.createGain()}getSession(){return this.sessionPromise||(this.sessionPromise=this.connect()),this.sessionPromise}async connect(){return this.sessionPromise=this.ai.live.music.connect({model:this.model,callbacks:{onmessage:async e=>{var t;e.setupComplete&&(this.connectionError=!1),e.filteredPrompt&&(this.filteredPrompts=new Set([...this.filteredPrompts,e.filteredPrompt.text]),this.dispatchEvent(new CustomEvent("filtered-prompt",{detail:e.filteredPrompt}))),(t=e.serverContent)!=null&&t.audioChunks&&await this.processAudioChunks(e.serverContent.audioChunks)},onerror:()=>{this.handleTransportClosed("error")},onclose:()=>{this.handleTransportClosed("closed")}}}),this.sessionPromise}handleTransportClosed(e){if(this.connectionError=!0,!this.shouldAutoResume){this.setPlaybackState("paused");return}this.setPlaybackState("loading"),this.nextStartTime=0,this.session=null,this.sessionPromise=null,this.beginReconnect(),this.playInterstitial(),this.retryAttempt===0&&this.dispatchEvent(new CustomEvent("error",{detail:"Connection lost. Reconnecting…"}))}beginReconnect(){if(this.reconnecting)return;this.reconnecting=!0,this.retryAttempt=0;const e=async()=>{try{await this.connect(),this.session=await this.sessionPromise,await this.audioContext.resume(),this.masterLimiter||(this.masterLimiter=si(this.audioContext),this.outputNode.connect(this.masterLimiter),this.masterLimiter.connect(this.audioContext.destination),this.extraDestination&&this.outputNode.connect(this.extraDestination),this.outputNode.connect(this.recordTap)),await this.setWeightedPrompts(this.prompts),this.session.play(),this.stopInterstitial(),this.reconnecting=!1,this.reconnectTimer&&(clearTimeout(this.reconnectTimer),this.reconnectTimer=null);return}catch{this.retryAttempt+=1;const n=[500,1e3,2e3,4e3,8e3,8e3],i=n[Math.min(this.retryAttempt,n.length-1)];this.reconnectTimer=window.setTimeout(e,i)}};e()}setPlaybackState(e){this.playbackState=e,this.dispatchEvent(new CustomEvent("playback-state-changed",{detail:e}))}async processAudioChunks(e){var t,n,i;if(!(this.playbackState==="paused"||this.playbackState==="stopped"))try{console.log("Processing audio chunks:",{chunkCount:e.length,firstChunkDataLength:((n=(t=e[0])==null?void 0:t.data)==null?void 0:n.length)||0,firstChunkDataType:typeof((i=e[0])==null?void 0:i.data)});const s=await Pf(kf(e[0].data),this.audioContext,48e3,2),l=this.audioContext.createBufferSource();if(l.buffer=s,l.connect(this.outputNode),this.nextStartTime===0&&(this.nextStartTime=this.audioContext.currentTime+this.bufferTime,setTimeout(()=>{this.setPlaybackState("playing")},this.bufferTime*1e3)),this.nextStartTime<this.audioContext.currentTime){this.setPlaybackState("loading"),this.nextStartTime=0;return}l.start(this.nextStartTime),this.nextStartTime+=s.duration}catch(s){console.warn("Failed to process audio chunk:",s)}}get activePrompts(){return Array.from(this.prompts.values()).filter(e=>!this.filteredPrompts.has(e.text)&&(e.weight??0)>.001)}setGeneratorSettings(e){this.settings={...this.settings,...e},this.session&&this.setWeightedPrompts(this.prompts)}buildMetaPrompt(){const e=this.settings,t=e.mix==="background"?"subtle, sit-behind mix levels":e.mix==="energetic"?"forward, punchy mix with higher dynamics":"balanced, modern mix",n=Math.max(4,Math.min(32,Math.round(e.loopBars))),i=Math.round(Math.max(0,Math.min(2,e.variation))/2*100),s=Math.round(Math.max(0,Math.min(2,e.genreContrast))/2*100);return["Meta controls:",`- Phrase structure: loop-safe ${n}-bar chunks; evolve motifs every ${n} bars.`,`- Variation: ${i}% phrase and drum fill variation; avoid copy-paste repetition.`,`- Genre contrast: ${s}% stronger genre-defining rhythm, sound design, and harmony when styles change.`,`- ${t}.`,"- Keep stems exposed (drums, bass, chords, lead, fx) and align changes to bar boundaries."].join(" ")}async play(){this.setPlaybackState("loading"),this.shouldAutoResume=!0,this.session=await this.getSession(),await this.setWeightedPrompts(this.prompts),this.audioContext.resume(),this.session.play(),this.masterLimiter=si(this.audioContext),this.outputNode.connect(this.masterLimiter),this.masterLimiter.connect(this.audioContext.destination),this.extraDestination&&this.outputNode.connect(this.extraDestination),this.outputNode.connect(this.recordTap),this.outputNode.gain.setValueAtTime(0,this.audioContext.currentTime),this.outputNode.gain.linearRampToValueAtTime(1,this.audioContext.currentTime+.1)}pause(){this.session&&this.session.pause(),this.setPlaybackState("paused"),this.shouldAutoResume=!1,this.outputNode.gain.setValueAtTime(1,this.audioContext.currentTime),this.outputNode.gain.linearRampToValueAtTime(0,this.audioContext.currentTime+.1),this.nextStartTime=0,this.outputNode=this.audioContext.createGain(),this.stopInterstitial()}stop(){this.session&&this.session.stop(),this.setPlaybackState("stopped"),this.shouldAutoResume=!1,this.outputNode.gain.setValueAtTime(0,this.audioContext.currentTime),this.outputNode.gain.linearRampToValueAtTime(1,this.audioContext.currentTime+.1),this.nextStartTime=0,this.session=null,this.sessionPromise=null,this.stopInterstitial()}playInterstitial(){if(this.interstitialActive)return;this.interstitialActive=!0,this.adGain=this.audioContext.createGain(),this.adGain.gain.setValueAtTime(0,this.audioContext.currentTime),this.adGain.gain.linearRampToValueAtTime(.2,this.audioContext.currentTime+.15);const e=this.masterLimiter??this.audioContext.destination;this.adGain.connect(e);const t=this.audioContext.currentTime,n=(u,d,p)=>{const f=this.audioContext.createGain();f.gain.setValueAtTime(0,d),f.gain.linearRampToValueAtTime(.35,d+.03),f.gain.linearRampToValueAtTime(0,d+p),u.connect(f).connect(this.adGain)},i=(u,d,p)=>{const f=this.audioContext.createOscillator();f.type="sine",f.frequency.setValueAtTime(u,t+d),n(f,t+d,p),f.start(t+d),f.stop(t+d+p+.05),this.adOscillators.push(f)},s=[261.63,311.13,392,523.25];for(let u=0;u<16;u++){const d=s[u%s.length]*(u%8===0?.5:1);i(d,u*.35,.28)}const l=["Thanks for listening to deeprabbit dot net.","DeepRabbit: fresh tracks, forged by A I. Thanks for tuning in.","We'll be back in a beat. Thanks for listening to deeprabbit dot net.","The Rabbit's Got A Bomb.","The Rabbit's goes deep this way."],c=l[Math.floor(Math.random()*l.length)];try{const u=window==null?void 0:window.speechSynthesis;if(u){this.ttsUtterance=new SpeechSynthesisUtterance(c);const d=u.getVoices();if(d&&d.length>0){const p=d.filter(h=>!/default/i.test(h.name)),f=(p.length?p:d)[Math.floor(Math.random()*(p.length?p.length:d.length))];this.ttsUtterance.voice=f}this.ttsUtterance.rate=1,this.ttsUtterance.pitch=1,u.speak(this.ttsUtterance)}}catch{}}stopInterstitial(){if(!this.interstitialActive)return;this.interstitialActive=!1;try{const t=window==null?void 0:window.speechSynthesis;t&&t.speaking&&t.cancel(),this.ttsUtterance=null}catch{}const e=this.audioContext.currentTime;if(this.adGain){try{this.adGain.gain.cancelScheduledValues(e)}catch{}this.adGain.gain.setValueAtTime(this.adGain.gain.value,e),this.adGain.gain.linearRampToValueAtTime(0,e+.15),setTimeout(()=>{var t;try{(t=this.adGain)==null||t.disconnect()}catch{}this.adGain=null},200)}this.adOscillators.forEach(t=>{try{t.stop(),t.disconnect()}catch{}}),this.adOscillators=[]}async playPause(){switch(this.playbackState){case"playing":return this.pause();case"paused":case"stopped":return this.play();case"loading":return this.stop()}}}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/class Df extends EventTarget{constructor(e){super(),this.rafId=null,this.start=this.loop,this.node=e.createAnalyser(),this.node.smoothingTimeConstant=0,this.freqData=new Uint8Array(this.node.frequencyBinCount),this.loop=this.loop.bind(this)}getCurrentLevel(){return this.node.getByteFrequencyData(this.freqData),this.freqData.reduce((t,n)=>t+n,0)/this.freqData.length/255}loop(){this.rafId=requestAnimationFrame(this.loop);const e=this.getCurrentLevel();this.dispatchEvent(new CustomEvent("audio-level-changed",{detail:e}))}stop(){this.rafId&&cancelAnimationFrame(this.rafId)}}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */class ri{constructor(e,t,n="audio/webm;codecs=opus",i=!1){this.mediaDest=null,this.recorder=null,this.chunks=[],this.audioWorkletNode=null,this.pcmLeft=[],this.pcmRight=[],this.wavBuffer=null,this.workletLoaded=!1,this.audioContext=e,this.tapNode=t,this.mimeType=MediaRecorder.isTypeSupported(n)?n:"audio/webm",this.asMp3=i}async loadAudioWorklet(){if(!this.workletLoaded){if(!this.audioContext.audioWorklet)throw new Error("AudioWorklet not supported in this browser");try{await this.audioContext.audioWorklet.addModule("/audio-recorder-processor.js"),this.workletLoaded=!0,console.log("AudioWorklet loaded successfully")}catch(e){throw console.error("Failed to load AudioWorklet:",e),new Error(`AudioWorklet failed to load: ${e instanceof Error?e.message:"Unknown error"}`)}}}async start(){if(this.asMp3){if(this.audioWorkletNode)return;try{await this.loadAudioWorklet(),this.audioWorkletNode=new AudioWorkletNode(this.audioContext,"audio-recorder-processor"),this.audioWorkletNode.port.onmessage=e=>{const{type:t,leftChannel:n,rightChannel:i}=e.data;t==="data"&&(this.pcmLeft=n||[],this.pcmRight=i||[])},this.pcmLeft=[],this.pcmRight=[],this.tapNode.connect(this.audioWorkletNode),this.audioWorkletNode.connect(this.audioContext.destination),this.audioWorkletNode.port.postMessage({type:"start"})}catch(e){console.error("Failed to start AudioWorklet recording:",e),console.warn("Falling back to legacy ScriptProcessorNode recording"),this.startLegacyRecording()}return}this.recorder||(this.mediaDest=this.audioContext.createMediaStreamDestination(),this.tapNode.connect(this.mediaDest),this.recorder=new MediaRecorder(this.mediaDest.stream,{mimeType:this.mimeType}),this.chunks=[],this.recorder.ondataavailable=e=>{e.data&&e.data.size>0&&this.chunks.push(e.data)},this.recorder.start())}startLegacyRecording(){console.warn("Using deprecated ScriptProcessorNode as fallback. AudioWorklet not available.");const e=4096,t=2,n=this.audioContext.createScriptProcessor(e,t,t);this.pcmLeft=[],this.pcmRight=[],n.onaudioprocess=i=>{const s=i.inputBuffer,l=new Float32Array(s.getChannelData(0)),c=s.numberOfChannels>1?new Float32Array(s.getChannelData(1)):new Float32Array(l);this.pcmLeft.push(l),this.pcmRight.push(c),this.wavBuffer=s},this.tapNode.connect(n),n.connect(this.audioContext.destination),this.scriptNode=n}async stop(){if(this.asMp3){if(this.audioWorkletNode){this.audioWorkletNode.port.postMessage({type:"stop"}),await new Promise(u=>setTimeout(u,100));try{this.tapNode.disconnect(this.audioWorkletNode)}catch{}try{this.audioWorkletNode.disconnect()}catch{}this.audioWorkletNode=null}else if(this.scriptNode){const u=this.scriptNode;try{this.tapNode.disconnect(u)}catch{}try{u.disconnect()}catch{}u.onaudioprocess=null,this.scriptNode=null}else throw new Error("Recorder not started");const i=ai(this.pcmLeft),s=ai(this.pcmRight);this.pcmLeft=[],this.pcmRight=[];const l=await $f();return Nf(i,s,this.audioContext.sampleRate,l)}if(!this.recorder)throw new Error("Recorder not started");const e=this.recorder,t=this.mediaDest,n=new Promise(i=>{e.onstop=()=>i()});e.stop(),await n;try{this.tapNode.disconnect(t)}catch{}return this.recorder=null,this.mediaDest=null,new Blob(this.chunks,{type:this.mimeType})}}function ai(o){let e=0;for(const i of o)e+=i.length;const t=new Float32Array(e);let n=0;for(const i of o)t.set(i,n),n+=i.length;return t}function Nf(o,e,t,n){const i=n.Mp3Encoder||n.default&&n.default.Mp3Encoder;if(!i)throw new Error("MP3 encoder not available");const s=new i(2,t,128),l=1152,c=[];let u=0;const d=Math.min(o.length,e.length);for(;u<d;){const f=li(o.subarray(u,u+l)),h=li(e.subarray(u,u+l)),m=s.encodeBuffer(f,h);m.length>0&&c.push(m),u+=l}const p=s.flush();return p.length>0&&c.push(p),new Blob(c,{type:"audio/mpeg"})}function li(o){const e=new Int16Array(o.length);for(let t=0;t<o.length;t++){let n=Math.max(-1,Math.min(1,o[t]));e[t]=n<0?n*32768:n*32767}return e}async function $f(){const o=window;return o.lamejs?o.lamejs:new Promise((e,t)=>{const n=document.createElement("script");n.src="https://unpkg.com/lamejs@1.2.0/lame.min.js",n.onload=()=>e(window.lamejs),n.onerror=i=>t(new Error("Failed to load MP3 encoder")),document.head.appendChild(n)})}function ci(o){const e=o.numberOfChannels,t=o.sampleRate,n=o.length,i=2,s=e*i,l=n*s,c=44,u=c+l,d=new ArrayBuffer(u),p=new DataView(d);function f(v,y){for(let T=0;T<y.length;T++)p.setUint8(v+T,y.charCodeAt(T))}let h=0;f(h,"RIFF"),h+=4,p.setUint32(h,u-8,!0),h+=4,f(h,"WAVE"),h+=4,f(h,"fmt "),h+=4,p.setUint32(h,16,!0),h+=4,p.setUint16(h,1,!0),h+=2,p.setUint16(h,e,!0),h+=2,p.setUint32(h,t,!0),h+=4,p.setUint32(h,t*s,!0),h+=4,p.setUint16(h,s,!0),h+=2,p.setUint16(h,i*8,!0),h+=2,f(h,"data"),h+=4,p.setUint32(h,l,!0),h+=4;const m=[];for(let v=0;v<e;v++)m[v]=o.getChannelData(v);let g=c;for(let v=0;v<n;v++)for(let y=0;y<e;y++){let T=m[y][v];T=Math.max(-1,Math.min(1,T)),p.setInt16(g,T<0?T*32768:T*32767,!0),g+=2}return new Blob([d],{type:"audio/wav"})}/**
 * @fileoverview deeprabbit — AI-driven live music performance with MIDI control
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */const Lf=new Lp({apiKey:"AIzaSyBhSTd6I9FPus_va06FjeC9N6gaDSanwMQ",apiVersion:"v1alpha"}),Ff="lyria-realtime-exp";(function(){const o=window.localStorage;o&&Object.defineProperty(window,"localStorage",{value:{getItem:function(t){try{return o.getItem(t)}catch(n){return console.warn("localStorage.getItem blocked:",n),null}},setItem:function(t,n){try{o.setItem(t,n)}catch(i){console.warn("localStorage.setItem blocked:",i)}},removeItem:function(t){try{o.removeItem(t)}catch(n){console.warn("localStorage.removeItem blocked:",n)}},clear:function(){try{o.clear()}catch(t){console.warn("localStorage.clear blocked:",t)}},get length(){try{return o.length}catch(t){return console.warn("localStorage.length blocked:",t),0}},key:function(t){try{return o.key(t)}catch(n){return console.warn("localStorage.key blocked:",n),null}}},writable:!1,configurable:!1})})();function Uf(){window.addEventListener("error",o=>{if(o.message&&o.message.includes("localStorage"))return console.warn("localStorage access blocked:",o.message),o.preventDefault(),!1}),window.addEventListener("unhandledrejection",o=>{if(o.reason&&o.reason.message&&o.reason.message.includes("localStorage"))return console.warn("localStorage promise rejection:",o.reason.message),o.preventDefault(),!1}),Vf()}async function Vf(){let o="",e="",t=null,n=!1;const i=new URLSearchParams(window.location.search);(i.get("auth")==="true"||i.get("login")==="true")&&(n=!0);try{await Ie.isAuthenticated()&&(t=(await Ie.getCurrentUser()).user,o=t.id.toString(),e=t.email)}catch(g){console.log("User not authenticated:",g)}const s=Of(),l=new E(s);l.userId=o,l.userEmail=e,l.currentUser=t,n&&!t&&(l.showAuthModal=!0),document.body.appendChild(l);const c=new ge;document.body.appendChild(c);const u=new Rf(Lf,Ff);u.setWeightedPrompts(s);const d={loopBars:8,variation:1.2,genreContrast:1.2,mix:"balanced"};u.setGeneratorSettings(d);let p=null,f=null;const h=new Df(u.audioContext);u.extraDestination=h.node,l.addEventListener("prompts-changed",g=>{const y=g.detail;console.log("Main app received prompts-changed event:",y),u.setWeightedPrompts(y)}),l.addEventListener("play-pause",()=>{u.playPause()}),l.addEventListener("toggle-recording",async()=>{try{if(!p)p=new ri(u.audioContext,u.recordTap,"audio/webm;codecs=opus",!0),await p.start(),l.isRecording=!0;else{const g=await p.stop();p=null,l.isRecording=!1,f=g;const v=URL.createObjectURL(g),y=document.createElement("a");y.href=v;const T=new Date().toISOString().replace(/[:.]/g,"-"),P=g.type==="audio/mpeg";y.download=`deeprabbit-${T}.${P?"mp3":"webm"}`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(v)}}catch(g){console.error(g);const v=new ge;document.body.appendChild(v),v.show(g.message||"Recording error")}}),l.addEventListener("export-audio",async g=>{const v=g.detail;try{const y=new Date().toISOString().replace(/[:.]/g,"-");if(f){if(v.kind==="mp3"){const M=URL.createObjectURL(f),D=document.createElement("a");D.href=M,D.download=`deeprabbit-${y}.mp3`,document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(M)}else{const M=await f.arrayBuffer(),D=await u.audioContext.decodeAudioData(M.slice(0)),V=ci(D),G=URL.createObjectURL(V),O=document.createElement("a");O.href=G,O.download=`deeprabbit-${y}.wav`,document.body.appendChild(O),O.click(),document.body.removeChild(O),URL.revokeObjectURL(G)}return}const T=new ri(u.audioContext,u.recordTap,"audio/webm;codecs=opus",!0);await T.start(),await new Promise(M=>setTimeout(M,1500));const P=await T.stop();if(v.kind==="mp3"){const M=URL.createObjectURL(P),D=document.createElement("a");D.href=M,D.download=`deeprabbit-${y}.mp3`,document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(M)}else{const M=await P.arrayBuffer(),D=await u.audioContext.decodeAudioData(M.slice(0)),V=ci(D),G=URL.createObjectURL(V),O=document.createElement("a");O.href=G,O.download=`deeprabbit-${y}.wav`,document.body.appendChild(O),O.click(),document.body.removeChild(O),URL.revokeObjectURL(G)}}catch(y){const T=new ge;document.body.appendChild(T),T.show((y==null?void 0:y.message)||"Export failed")}}),u.addEventListener("playback-state-changed",g=>{const y=g.detail;l.playbackState=y,y==="playing"?h.start():h.stop()}),l.addEventListener("generator-settings-changed",g=>{const v=g.detail;u.setGeneratorSettings(v)}),u.addEventListener("filtered-prompt",g=>{const y=g.detail;c.show(y.filteredReason),l.addFilteredPrompt(y.text)});const m=g=>{const y=g.detail;c.show(y)};u.addEventListener("error",m),l.addEventListener("error",m),h.addEventListener("audio-level-changed",g=>{const y=g.detail;l.audioLevel=y})}function Of(){const o=new Map;for(let e=0;e<di.length;e++){const t=`prompt-${e}`,n=di[e],{text:i,color:s}=n;o.set(t,{promptId:t,text:i,weight:0,cc:0,color:s})}return o}const di=[{color:"#9900ff",text:"Bossa Nova"},{color:"#5200ff",text:"Chillwave"},{color:"#ff25f6",text:"Drum and Bass"},{color:"#2af6de",text:"Post Punk"},{color:"#ffdd28",text:"Shoegaze"},{color:"#2af6de",text:"Funk"},{color:"#9900ff",text:"Chiptune"},{color:"#d8ff3e",text:"Sparkling Arpeggios"},{color:"#d9b2ff",text:"Staccato Rhythms"},{color:"#3dffab",text:"Punchy Kick"},{color:"#ffdd28",text:"Dubstep"},{color:"#ff25f6",text:"K Pop"},{color:"#d8ff3e",text:"Neo Soul"},{color:"#5200ff",text:"Trip Hop"},{color:"#d9b2ff",text:"Thrash"},{color:"#ff6b6b",text:"Rock"},{color:"#4ecdc4",text:"Classic Rock"},{color:"#45b7d1",text:"Alternative Rock"},{color:"#96ceb4",text:"Indie Rock"},{color:"#ffeaa7",text:"Blues Rock"},{color:"#dda0dd",text:"Folk Rock"},{color:"#ffb347",text:"Acoustic Rock"},{color:"#ff6b6b",text:"Jazz"},{color:"#4ecdc4",text:"R&B"},{color:"#45b7d1",text:"Hip Hop"},{color:"#96ceb4",text:"House"},{color:"#ffeaa7",text:"Techno"},{color:"#dda0dd",text:"Ambient"},{color:"#ffb347",text:"Classical"},{color:"#98d8c8",text:"Reggae"},{color:"#9900ff",text:"Afrobeat"},{color:"#5200ff",text:"Lo-Fi"},{color:"#ff25f6",text:"Trap"},{color:"#2af6de",text:"Blues"},{color:"#ffdd28",text:"Country"},{color:"#3dffab",text:"Latin Pop"},{color:"#d8ff3e",text:"Salsa"},{color:"#d9b2ff",text:"Samba"},{color:"#ff6b6b",text:"Trance"},{color:"#4ecdc4",text:"Future Bass"},{color:"#45b7d1",text:"Melodic Techno"},{color:"#96ceb4",text:"Progressive House"},{color:"#ffeaa7",text:"UK Garage"},{color:"#dda0dd",text:"Psytrance"},{color:"#ffb347",text:"Hardstyle"},{color:"#98d8c8",text:"Vaporwave"},{color:"#9900ff",text:"Synthwave"},{color:"#5200ff",text:"City Pop"},{color:"#ff25f6",text:"Disco"},{color:"#2af6de",text:"Soul"},{color:"#ffdd28",text:"Motown"},{color:"#3dffab",text:"Bluegrass"},{color:"#d8ff3e",text:"Flamenco"},{color:"#d9b2ff",text:"Reggaeton"},{color:"#ff6b6b",text:"Drill"},{color:"#4ecdc4",text:"Grime"},{color:"#45b7d1",text:"Industrial"},{color:"#96ceb4",text:"IDM"},{color:"#ffeaa7",text:"Glitch"},{color:"#dda0dd",text:"Minimal"},{color:"#ffb347",text:"Electro"},{color:"#98d8c8",text:"Breakbeat"},{color:"#9900ff",text:"Jungle"},{color:"#5200ff",text:"Liquid DnB"},{color:"#ff25f6",text:"Neurofunk"},{color:"#2af6de",text:"Future Garage"},{color:"#ffdd28",text:"Chillstep"},{color:"#3dffab",text:"Synth Pop"},{color:"#d8ff3e",text:"Indie Rock"},{color:"#d9b2ff",text:"Alternative Rock"},{color:"#ff6b6b",text:"Progressive Rock"},{color:"#4ecdc4",text:"Math Rock"},{color:"#45b7d1",text:"Post Rock"},{color:"#96ceb4",text:"Cinematic"},{color:"#ffeaa7",text:"Trailer Music"},{color:"#dda0dd",text:"Epic Orchestral"},{color:"#ffb347",text:"Dark Ambient"},{color:"#98d8c8",text:"Drone"},{color:"#9900ff",text:"Hyperpop"},{color:"#5200ff",text:"Glitch Hop"},{color:"#ff25f6",text:"Boom Bap"},{color:"#2af6de",text:"Trap Soul"},{color:"#ffdd28",text:"Cloud Rap"},{color:"#3dffab",text:"Afro House"},{color:"#d8ff3e",text:"Amapiano"},{color:"#d9b2ff",text:"Gqom"},{color:"#ff6b6b",text:"Dancehall"},{color:"#4ecdc4",text:"Ska"},{color:"#45b7d1",text:"Dub"},{color:"#96ceb4",text:"Moombahton"},{color:"#ffeaa7",text:"Cumbia"},{color:"#dda0dd",text:"Bachata"},{color:"#ffb347",text:"Merengue"},{color:"#98d8c8",text:"Zouk"},{color:"#9900ff",text:"Kizomba"},{color:"#5200ff",text:"Uplifting Trance"},{color:"#ff25f6",text:"Tech Trance"},{color:"#2af6de",text:"Hard Trance"},{color:"#ffdd28",text:"Big Room"},{color:"#3dffab",text:"Deep House"},{color:"#d8ff3e",text:"Tech House"},{color:"#d9b2ff",text:"Hard Techno"},{color:"#ff6b6b",text:"Microhouse"},{color:"#4ecdc4",text:"Electro Swing"},{color:"#45b7d1",text:"Bollywood"},{color:"#96ceb4",text:"Celtic Folk"},{color:"#ffeaa7",text:"Americana"},{color:"#c19a6b",text:"Western"},{color:"#dda0dd",text:"Delta Blues"},{color:"#ffb347",text:"Chicago Blues"},{color:"#98d8c8",text:"Smooth Jazz"},{color:"#9900ff",text:"Bebop"},{color:"#5200ff",text:"Swing"},{color:"#ff25f6",text:"Latin Jazz"},{color:"#2af6de",text:"Baroque"},{color:"#ffdd28",text:"Orchestral Suite"},{color:"#3dffab",text:"Choir"},{color:"#d8ff3e",text:"Gregorian"},{color:"#d9b2ff",text:"Middle Eastern"},{color:"#ff6b6b",text:"Japanese Instrumental"},{color:"#ff6b6b",text:"Phonk"},{color:"#4ecdc4",text:"Jersey Club"},{color:"#45b7d1",text:"Baile Funk"},{color:"#96ceb4",text:"UK Drill"},{color:"#ffeaa7",text:"Footwork"},{color:"#dda0dd",text:"Juke"},{color:"#ffb347",text:"Future Rave"},{color:"#98d8c8",text:"Afro Tech"},{color:"#9900ff",text:"French House"},{color:"#5200ff",text:"Nu Disco"},{color:"#ff25f6",text:"Italo Disco"},{color:"#2af6de",text:"G-House"},{color:"#ffdd28",text:"Hardwave"},{color:"#3dffab",text:"Eurodance"},{color:"#d8ff3e",text:"Liquid Funk"},{color:"#d9b2ff",text:"Dub Techno"},{color:"#ff6b6b",text:"Breakcore"},{color:"#4ecdc4",text:"Drill & Bass"},{color:"#45b7d1",text:"Organic House"},{color:"#96ceb4",text:"Melodic House"},{color:"#ffeaa7",text:"Detroit Techno"},{color:"#dda0dd",text:"Minimal Techno"},{color:"#ffb347",text:"Lo-Fi House"},{color:"#98d8c8",text:"Ambient Dub"},{color:"#9900ff",text:"Vapor Trap"},{color:"#5200ff",text:"Dream Pop"},{color:"#ff25f6",text:"Indie Pop"},{color:"#2af6de",text:"Midwest Emo"},{color:"#ffdd28",text:"Kawaii Future Bass"},{color:"#3dffab",text:"UK Funky"},{color:"#d8ff3e",text:"Kuduro"},{color:"#d9b2ff",text:"Batida"},{color:"#c19a6b",text:"Neoclassical"},{color:"#ff6b6b",text:"Dark Trap"},{color:"#4ecdc4",text:"Afro Trap"},{color:"#DC143C",text:"Crack Music"},{color:"#FFD700",text:"Quacking Synth Stabs"},{color:"#45b7d1",text:"Dungeon Synth"},{color:"#8B0000",text:"Horror Score"},{color:"#4A0E4E",text:"Gothic Horror"},{color:"#2F1B14",text:"Haunted House"},{color:"#8B4513",text:"Witchcraft"},{color:"#2F4F4F",text:"Zombie Apocalypse"},{color:"#800080",text:"Vampire Ball"},{color:"#556B2F",text:"Werewolf Howl"},{color:"#DC143C",text:"Slasher Film"},{color:"#483D8B",text:"Ghostly Whispers"},{color:"#8B008B",text:"Dark Ritual"},{color:"#B22222",text:"Demonic Chant"},{color:"#2E8B57",text:"Cursed Forest"},{color:"#FF6347",text:"Pumpkin Patch"},{color:"#FF8C00",text:"Halloween Party"},{color:"#9932CC",text:"Witch's Brew"},{color:"#8B0000",text:"Blood Moon"},{color:"#696969",text:"Graveyard Shift"},{color:"#FFD700",text:"Spooky Jazz"},{color:"#e84a5f",text:"Christmas"}];Uf();
