"use strict";(self.webpackChunkubold_angular=self.webpackChunkubold_angular||[]).push([[7508],{17508:(b,p,l)=>{l.r(p),l.d(p,{DetailsModule:()=>S});var t=l(69808),m=l(52382),u=l(29095),r=l(4521),v=l(42631),e=l(5e3),d=l(39475);function s(n,c){if(1&n&&(e.\u0275\u0275elementStart(0,"div",67),e.\u0275\u0275element(1,"img",68),e.\u0275\u0275elementStart(2,"div",22)(3,"h5",69),e.\u0275\u0275text(4),e.\u0275\u0275elementStart(5,"small",70),e.\u0275\u0275text(6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275text(7),e.\u0275\u0275element(8,"br"),e.\u0275\u0275elementStart(9,"a",71),e.\u0275\u0275element(10,"i",72),e.\u0275\u0275text(11," Reply"),e.\u0275\u0275elementEnd()()()),2&n){const i=c.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275property("src",i.avatar,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1("",i.name," "),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(i.time),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",i.text," ")}}const o=function(){return["../list"]},x=[{path:"",component:(()=>{class n{constructor(i){this.route=i,this.pageTitle=[]}ngOnInit(){this.pageTitle=[{label:"Tickets",path:"/"},{label:"Ticket Details",path:"/",active:!0}],this.route.queryParams.subscribe(i=>{this.selectedTicket=i&&i.hasOwnProperty("id")?v.S.filter(a=>String(a.id)===i.id)[0]:v.S[0]}),this._fetchData()}_fetchData(){this.ticketDetails={id:this.selectedTicket.id,title:this.selectedTicket.subject,type:"Payment",reported_by:{name:this.selectedTicket.requested_by.name,image:this.selectedTicket.requested_by.image},assigned_to:{name:"Thelma Fridley",image:this.selectedTicket.assignee},created_on:{date:"10 Feb 2020",time:"1:37 PM"},updated_on:{date:"15 Feb 2020",time:"4:09 PM"},overview:"This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up.",discussion:[{avatar:"assets/images/users/user-9.jpg",name:"Jonathan Andrews",text:"Nice work, makes me think of The Money Pit",time:"3 hours ago"},{avatar:"assets/images/users/user-5.jpg",name:"Thelma Fridley",text:"It would be very nice to have.",time:"5 hours ago"},{avatar:"assets/images/users/user-9.jpg",name:"Jonathan Andrews",text:"i'm in the middle of a timelapse animation myself!(Very different though.) Awesome stuff.",time:"1 day ago"}]}}}return n.\u0275fac=function(i){return new(i||n)(e.\u0275\u0275directiveInject(r.gz))},n.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-ticket-details"]],decls:170,vars:19,consts:[["title","Ticket Details",3,"breadcrumbItems"],[1,"row"],[1,"col-xl-8","col-lg-7"],[1,"card","d-block"],[1,"card-body"],[1,"float-sm-end","mb-2","mb-sm-0"],[1,"row","g-2"],[1,"col-auto"],[1,"btn","btn-sm","btn-link",3,"routerLink"],[1,"mdi","mdi-keyboard-backspace"],[1,"form-select","form-select-sm","form"],["selected",""],["value","1"],["value","2"],[1,"mb-3","mt-0","font-18"],[1,"clerfix"],[1,"col-md-4"],[1,"mt-2","mb-1"],[1,"mdi","mdi-ticket","font-18","text-success","me-1","align-middle"],[1,"col-md-6"],[1,"d-flex","align-items-start"],["height","24",1,"rounded-circle","me-2",3,"src","alt"],[1,"w-100"],[1,"text-muted"],[1,"mt-2","form-label"],[1,"form-select","form-select-sm",3,"ngModel","ngModelChange"],["status","ngModel"],["value","Open"],["value","Closed"],["value","Progress"],["priority","ngModel"],["value","Low"],["value","Medium"],["value","High"],[1,"mt-4","mb-1"],[1,"text-muted","mb-0"],[1,"card"],[1,"float-end"],[1,"form-select","form-select-sm"],[1,"mb-4","mt-0","font-16"],["class","d-flex align-items-start mt-3",4,"ngFor","ngForOf"],[1,"text-center","mt-2"],["href","javascript:void(0);",1,"text-danger"],[1,"mdi","mdi-spin","mdi-loading","me-1"],[1,"border","rounded","mt-4"],[1,"comment-area-box"],["rows","3","placeholder","Your message...",1,"form-control","border-0","resize-none"],[1,"p-2","bg-light","d-flex","justify-content-between","align-items-center"],["href","javascript:void(0)",1,"btn","btn-sm","px-1","btn-light"],[1,"mdi","mdi-upload"],[1,"mdi","mdi-at"],["type","submit",1,"btn","btn-sm","btn-success"],[1,"mdi","mdi-send","me-1"],[1,"col-xl-4","col-lg-5"],[1,"card-title","font-16","mb-3"],[1,"card","mb-1","shadow-none","border"],[1,"p-2"],[1,"row","align-items-center"],[1,"avatar-sm"],[1,"avatar-title","badge-soft-primary","text-primary","rounded"],[1,"col","ps-0"],["href","javascript:void(0);",1,"text-muted","fw-bold"],[1,"mb-0","font-12"],["href","javascript:void(0);",1,"btn","btn-link","font-16","text-muted"],[1,"dripicons-download"],[1,"card","mb-0","shadow-none","border"],[1,"avatar-title","bg-secondary","rounded"],[1,"d-flex","align-items-start","mt-3"],["alt","Generic placeholder image","height","32",1,"me-2","rounded-circle",3,"src"],[1,"mt-0","mb-1"],[1,"text-muted","float-end"],["href","javascript: void(0);",1,"text-muted","font-13","d-inline-block","mt-2"],[1,"mdi","mdi-reply"]],template:function(i,a){1&i&&(e.\u0275\u0275element(0,"app-page-title",0),e.\u0275\u0275elementStart(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"a",8),e.\u0275\u0275element(9,"i",9),e.\u0275\u0275text(10," Back"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(11,"div",7)(12,"select",10)(13,"option",11),e.\u0275\u0275text(14,"Watch"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(15,"option",12),e.\u0275\u0275text(16,"Remind me"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(17,"option",13),e.\u0275\u0275text(18,"Close"),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(19,"h4",14),e.\u0275\u0275text(20),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(21,"div",15),e.\u0275\u0275elementStart(22,"div",1)(23,"div",16)(24,"label",17),e.\u0275\u0275text(25,"Ticket Type :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(26,"p"),e.\u0275\u0275element(27,"i",18),e.\u0275\u0275text(28),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(29,"div",1)(30,"div",19)(31,"label",17),e.\u0275\u0275text(32,"Reported By :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(33,"div",20),e.\u0275\u0275element(34,"img",21),e.\u0275\u0275elementStart(35,"div",22)(36,"p"),e.\u0275\u0275text(37),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(38,"div",19)(39,"label",17),e.\u0275\u0275text(40,"Assigned To :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(41,"div",20),e.\u0275\u0275element(42,"img",21),e.\u0275\u0275elementStart(43,"div",22)(44,"p"),e.\u0275\u0275text(45),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(46,"div",1)(47,"div",19)(48,"label",17),e.\u0275\u0275text(49,"Created On :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(50,"p"),e.\u0275\u0275text(51),e.\u0275\u0275elementStart(52,"small",23),e.\u0275\u0275text(53),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(54,"div",19)(55,"label",17),e.\u0275\u0275text(56,"Updated On :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(57,"p"),e.\u0275\u0275text(58),e.\u0275\u0275elementStart(59,"small",23),e.\u0275\u0275text(60),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(61,"div",1)(62,"div",19)(63,"label",24),e.\u0275\u0275text(64,"Status :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(65,"div",1)(66,"div",7)(67,"select",25,26),e.\u0275\u0275listener("ngModelChange",function(f){return a.selectedTicket.status=f}),e.\u0275\u0275elementStart(69,"option",27),e.\u0275\u0275text(70,"Open"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(71,"option",28),e.\u0275\u0275text(72,"Close"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(73,"option",29),e.\u0275\u0275text(74,"In Progress"),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(75,"div",19)(76,"label",17),e.\u0275\u0275text(77,"Priority :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(78,"div",1)(79,"div",7)(80,"select",25,30),e.\u0275\u0275listener("ngModelChange",function(f){return a.selectedTicket.priority=f}),e.\u0275\u0275elementStart(82,"option",31),e.\u0275\u0275text(83,"Low"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(84,"option",32),e.\u0275\u0275text(85,"Medium"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(86,"option",33),e.\u0275\u0275text(87,"High"),e.\u0275\u0275elementEnd()()()()()(),e.\u0275\u0275elementStart(88,"label",34),e.\u0275\u0275text(89,"Overview :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(90,"p",35),e.\u0275\u0275text(91),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(92,"div",36)(93,"div",4)(94,"div",37)(95,"select",38)(96,"option",11),e.\u0275\u0275text(97,"Recent"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(98,"option",12),e.\u0275\u0275text(99,"Old"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(100,"h4",39),e.\u0275\u0275text(101,"Discussion (68)"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(102,"div",15),e.\u0275\u0275template(103,s,12,4,"div",40),e.\u0275\u0275elementStart(104,"div",41)(105,"a",42),e.\u0275\u0275element(106,"i",43),e.\u0275\u0275text(107," Load more "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(108,"div",44)(109,"form",45),e.\u0275\u0275element(110,"textarea",46),e.\u0275\u0275elementStart(111,"div",47)(112,"div")(113,"a",48),e.\u0275\u0275element(114,"i",49),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(115,"a",48),e.\u0275\u0275element(116,"i",50),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(117,"button",51),e.\u0275\u0275element(118,"i",52),e.\u0275\u0275text(119,"Submit"),e.\u0275\u0275elementEnd()()()()()()(),e.\u0275\u0275elementStart(120,"div",53)(121,"div",36)(122,"div",4)(123,"h5",54),e.\u0275\u0275text(124,"Attachments"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(125,"div",55)(126,"div",56)(127,"div",57)(128,"div",7)(129,"div",58)(130,"span",59),e.\u0275\u0275text(131," pdf "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(132,"div",60)(133,"a",61),e.\u0275\u0275text(134,"invoice-dec-2019.pdf"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(135,"p",62),e.\u0275\u0275text(136,"2.3 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(137,"div",7)(138,"a",63),e.\u0275\u0275element(139,"i",64),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(140,"div",55)(141,"div",56)(142,"div",57)(143,"div",7)(144,"div",58)(145,"span",59),e.\u0275\u0275text(146," doc "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(147,"div",60)(148,"a",61),e.\u0275\u0275text(149,"paypal-statement.docs"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(150,"p",62),e.\u0275\u0275text(151,"0.25 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(152,"div",7)(153,"a",63),e.\u0275\u0275element(154,"i",64),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(155,"div",65)(156,"div",56)(157,"div",57)(158,"div",7)(159,"div",58)(160,"span",66),e.\u0275\u0275text(161," pdf "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(162,"div",60)(163,"a",61),e.\u0275\u0275text(164,"visa-credit-card.pdf"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(165,"p",62),e.\u0275\u0275text(166,"1.05 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(167,"div",7)(168,"a",63),e.\u0275\u0275element(169,"i",64),e.\u0275\u0275elementEnd()()()()()()()()()),2&i&&(e.\u0275\u0275property("breadcrumbItems",a.pageTitle),e.\u0275\u0275advance(8),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(18,o)),e.\u0275\u0275advance(12),e.\u0275\u0275textInterpolate(a.ticketDetails.title),e.\u0275\u0275advance(8),e.\u0275\u0275textInterpolate1(" ",a.ticketDetails.type," "),e.\u0275\u0275advance(6),e.\u0275\u0275property("src",a.ticketDetails.reported_by.image,e.\u0275\u0275sanitizeUrl)("alt",a.ticketDetails.reported_by.name),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1(" ",a.ticketDetails.reported_by.name," "),e.\u0275\u0275advance(5),e.\u0275\u0275property("src",a.ticketDetails.assigned_to.image,e.\u0275\u0275sanitizeUrl)("alt",a.ticketDetails.assigned_to.name),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1(" ",a.ticketDetails.assigned_to.name," "),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate1("",a.ticketDetails.created_on.date," "),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(a.ticketDetails.created_on.time),e.\u0275\u0275advance(5),e.\u0275\u0275textInterpolate1("",a.ticketDetails.updated_on.date," "),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(a.ticketDetails.updated_on.time),e.\u0275\u0275advance(7),e.\u0275\u0275property("ngModel",a.selectedTicket.status),e.\u0275\u0275advance(13),e.\u0275\u0275property("ngModel",a.selectedTicket.priority),e.\u0275\u0275advance(11),e.\u0275\u0275textInterpolate1(" ",a.ticketDetails.overview," "),e.\u0275\u0275advance(12),e.\u0275\u0275property("ngForOf",a.ticketDetails.discussion))},directives:[d.T,r.yS,m.YN,m.Kr,m.EJ,m.JJ,m.On,t.NgForOf,m._Y,m.JL,m.F],styles:[""]}),n})()}];let h=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[r.Bz.forChild(x)],r.Bz]}),n})(),S=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[t.CommonModule,m.u5,u.p,h]]}),n})()},39475:(b,p,l)=>{l.d(p,{T:()=>e});var t=l(5e3),m=l(69808);function u(d,s){if(1&d&&(t.\u0275\u0275elementStart(0,"li",5)(1,"a",11),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&d){const o=t.\u0275\u0275nextContext().$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(o.label)}}function r(d,s){if(1&d&&(t.\u0275\u0275elementStart(0,"li",12)(1,"a",13),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&d){const o=t.\u0275\u0275nextContext().$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(o.label)}}function v(d,s){if(1&d&&(t.\u0275\u0275elementContainerStart(0),t.\u0275\u0275template(1,u,3,1,"li",9),t.\u0275\u0275template(2,r,3,1,"li",10),t.\u0275\u0275elementContainerEnd()),2&d){const o=s.$implicit;t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!o.active),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",o.active)}}let e=(()=>{class d{constructor(){this.breadcrumbItems=[],this.title=""}ngOnInit(){}}return d.\u0275fac=function(o){return new(o||d)},d.\u0275cmp=t.\u0275\u0275defineComponent({type:d,selectors:[["app-page-title"]],inputs:{breadcrumbItems:"breadcrumbItems",title:"title"},decls:11,vars:2,consts:[[1,"row"],[1,"col-12"],[1,"page-title-box"],[1,"page-title-right"],[1,"breadcrumb","m-0"],[1,"breadcrumb-item"],["href","javascript: void(0);"],[4,"ngFor","ngForOf"],[1,"page-title"],["class","breadcrumb-item",4,"ngIf"],["class","breadcrumb-item active",4,"ngIf"],["href","javascript: void(0);","routerLink","[item.path]"],[1,"breadcrumb-item","active"],["routerLink","[item.path]"]],template:function(o,g){1&o&&(t.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"ol",4)(5,"li",5)(6,"a",6),t.\u0275\u0275text(7,"UBold"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(8,v,3,2,"ng-container",7),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(9,"h4",8),t.\u0275\u0275text(10),t.\u0275\u0275elementEnd()()()()),2&o&&(t.\u0275\u0275advance(8),t.\u0275\u0275property("ngForOf",g.breadcrumbItems),t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(g.title))},directives:[m.NgForOf,m.NgIf],styles:[""]}),d})()},29095:(b,p,l)=>{l.d(p,{p:()=>u});var t=l(69808),m=l(5e3);let u=(()=>{class r{}return r.\u0275fac=function(e){return new(e||r)},r.\u0275mod=m.\u0275\u0275defineNgModule({type:r}),r.\u0275inj=m.\u0275\u0275defineInjector({imports:[[t.CommonModule]]}),r})()}}]);