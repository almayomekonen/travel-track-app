(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{72:function(e,t,a){"use strict";var i=a(0),n=a.n(i);a(73);t.a=e=>n.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)},73:function(e,t,a){},74:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var i=a(0);const n=(e,t)=>{switch(t.type){case"INPUT_CHANGE":let a=!0;for(const i in e.inputs)e.inputs[i]&&(a=i===t.inputId?a&&t.isValid:a&&e.inputs[i].isValid);return{...e,inputs:{...e.inputs,[t.inputId]:{value:t.value,isValid:t.isValid}},isValid:a};case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},l=(e,t)=>{const[a,l]=Object(i.useReducer)(n,{inputs:e,isValid:t});return[a,Object(i.useCallback)((e,t,a)=>{l({type:"INPUT_CHANGE",value:t,isValid:a,inputId:e})},[]),Object(i.useCallback)((e,t)=>{l({type:"SET_DATA",inputs:e,formIsValid:t})},[])]}},84:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),l=a(3),c=a(26),s=a(10),r=a(72),u=a(14),p=a(25),o=a(27),d=a(74),m=a(24),b=a(12);a(39);t.default=()=>{const e=Object(i.useContext)(b.a),{isLoading:t,error:a,sendRequest:v,clearError:E}=Object(m.a)(),[f,V]=Object(i.useState)(),h=Object(l.h)().placeId,j=Object(l.g)(),[y,O,T]=Object(d.a)({title:{value:"",isValid:!1},description:{value:"",isValid:!1}},!1);Object(i.useEffect)(()=>{(async()=>{try{const e=await v("".concat("https://travel-track-app-5259b35aa81a.herokuapp.com/api","/places/").concat(h));V(e.place),T({title:{value:e.place.title,isValid:!0},description:{value:e.place.description,isValid:!0}},!0)}catch(e){}})()},[v,h,T]);return t?n.a.createElement("div",{className:"center"},n.a.createElement(u.a,null)):f||a?n.a.createElement(n.a.Fragment,null,n.a.createElement(p.a,{error:a,onClear:E}),!t&&f&&n.a.createElement("form",{className:"place-form",onSubmit:async t=>{t.preventDefault();try{await v("".concat("https://travel-track-app-5259b35aa81a.herokuapp.com/api","/places/").concat(h),"PATCH",JSON.stringify({title:y.inputs.title.value,description:y.inputs.description.value}),{"Content-Type":"application/json",Authorization:"Bearer "+e.token}),j.push("/"+e.userId+"/places")}catch(a){}}},n.a.createElement(c.a,{id:"title",element:"input",type:"text",label:"Title",validators:[Object(o.c)()],errorText:"Please enter a valid title.",onInput:O,initialValue:f.title,initialValid:!0}),n.a.createElement(c.a,{id:"description",element:"textarea",label:"Description",validators:[Object(o.b)(5)],errorText:"Please enter a valid description (min. 5 characters).",onInput:O,initialValue:f.description,initialValid:!0}),n.a.createElement(s.a,{type:"submit",disabled:!y.isValid},"UPDATE PLACE"))):n.a.createElement("div",{className:"center"},n.a.createElement(r.a,null,n.a.createElement("h2",null,"Could not find place!")))}}}]);
//# sourceMappingURL=7.040c03a5.chunk.js.map