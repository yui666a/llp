(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{744:function(t,e,n){"use strict";n.r(e);var r=n(494),o=n(496),d=n(495),c=n(25),l=(n(74),n(493)),m={name:"LoginPage",data:function(){return{id:"",password:""}},computed:{idText:{get:function(){return this.id},set:function(t){this.id=t}},passwordText:{get:function(){return this.password},set:function(t){this.password=t}}},methods:{submit:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var data,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data={type:"login",name:t.id,pw:t.password},e.next=3,t.$axios.$get(t.$GAS_API,{adapter:l,params:data});case 3:n=e.sent,console.log(n),localStorage.displayName=n.data.displayName,localStorage.id=n.data.id,localStorage.lineId=n.data.lineId,t.$router.push("/");case 9:case"end":return e.stop()}}),e)})))()}}},v=n(94),component=Object(v.a)(m,(function(){var t=this,e=t._self._c;return e(d.a,[e(o.a,{staticClass:"text-center"},[t._v("\n    Login\n    "),e("div",[t._v("\n      ID\n      "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.idText,expression:"idText"}],attrs:{type:"text"},domProps:{value:t.idText},on:{input:function(e){e.target.composing||(t.idText=e.target.value)}}})]),t._v(" "),e("div",[t._v("\n      パスワード\n      "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.passwordText,expression:"passwordText"}],attrs:{type:"text"},domProps:{value:t.passwordText},on:{input:function(e){e.target.composing||(t.passwordText=e.target.value)}}})]),t._v(" "),e(r.a,{attrs:{color:"primary"},on:{click:t.submit}},[t._v(" ログイン ")])],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);