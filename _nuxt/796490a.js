(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{510:function(n,o,t){"use strict";t.r(o);var e=t(508),r=t(506),d=t(505),c={name:"CalendarPage",data:function(){return{mentalConditionNumber:0,bodyConditionNumber:0}},methods:{onClickBodyCondition:function(n){this.bodyConditionNumber=n===this.bodyConditionNumber?0:n},onClickMentalCondition:function(n){this.mentalConditionNumber=n===this.mentalConditionNumber?0:n},confirmCondition:function(){console.log("mentalConditionNumber: ".concat(this.mentalConditionNumber)),console.log("bodyConditionNumber: ".concat(this.bodyConditionNumber)),this.$router.push("/")}}},l=t(94),component=Object(l.a)(c,(function(){var n=this,o=n._self._c;return o(d.a,[o(r.a,{staticClass:"text-center"},[o(e.a,{ref:"calendar",attrs:{events:n.events,"event-color":n.getEventColor},on:{change:n.getEvents}})],1)],1)}),[],!1,null,null,null);o.default=component.exports}}]);