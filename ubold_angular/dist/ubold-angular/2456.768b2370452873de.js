"use strict";(self.webpackChunkubold_angular=self.webpackChunkubold_angular||[]).push([[2456],{32456:(b,v,i)=>{i.r(v),i.d(v,{DetailsModule:()=>_});var n=i(69808),d=i(52382),c=i(59182),s=i(41095),f=i(29095),p=i(4521),o=i(59746),e=i(5e3),m=i(22313),u=i(39475);function S(a,r){if(1&a&&(e.\u0275\u0275elementStart(0,"div",78),e.\u0275\u0275element(1,"input",79),e.\u0275\u0275elementStart(2,"label",80),e.\u0275\u0275text(3),e.\u0275\u0275elementEnd()()),2&a){const t=r.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275propertyInterpolate1("id","checklist",t.id,""),e.\u0275\u0275advance(1),e.\u0275\u0275propertyInterpolate1("for","checklist",t.id,""),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",t.title," ")}}function E(a,r){if(1&a&&(e.\u0275\u0275elementStart(0,"div",88)(1,"a",89),e.\u0275\u0275element(2,"img",90),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"div",24)(4,"h5",82),e.\u0275\u0275text(5),e.\u0275\u0275elementStart(6,"small",83),e.\u0275\u0275text(7),e.\u0275\u0275elementEnd()(),e.\u0275\u0275text(8),e.\u0275\u0275element(9,"br"),e.\u0275\u0275elementStart(10,"a",84),e.\u0275\u0275element(11,"i",85),e.\u0275\u0275text(12," Reply "),e.\u0275\u0275elementEnd()()()),2&a){const t=r.$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275property("src",t.author_avatar,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(t.author),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.posted_on),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",t.text," ")}}function k(a,r){if(1&a&&(e.\u0275\u0275elementContainerStart(0),e.\u0275\u0275template(1,E,13,4,"div",87),e.\u0275\u0275elementContainerEnd()),2&a){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275property("ngForOf",t.replies)}}function T(a,r){if(1&a&&(e.\u0275\u0275elementContainerStart(0),e.\u0275\u0275elementStart(1,"div",22),e.\u0275\u0275element(2,"img",81),e.\u0275\u0275elementStart(3,"div",24)(4,"h5",82),e.\u0275\u0275text(5),e.\u0275\u0275elementStart(6,"small",83),e.\u0275\u0275text(7),e.\u0275\u0275elementEnd()(),e.\u0275\u0275text(8),e.\u0275\u0275element(9,"br"),e.\u0275\u0275elementStart(10,"a",84),e.\u0275\u0275element(11,"i",85),e.\u0275\u0275text(12," Reply"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(13,k,2,1,"ng-container",86),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementContainerEnd()),2&a){const t=r.$implicit,l=r.index;e.\u0275\u0275advance(1),e.\u0275\u0275classProp("mt-3",l>0),e.\u0275\u0275advance(1),e.\u0275\u0275property("src",t.author_avatar,e.\u0275\u0275sanitizeUrl)("alt",t.author),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(t.author),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(t.posted_on),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",t.text," "),e.\u0275\u0275advance(5),e.\u0275\u0275property("ngIf",t.replies)}}function y(a,r){if(1&a&&(e.\u0275\u0275elementStart(0,"div",91)(1,"div",75)(2,"div",65)(3,"div",66)(4,"div",67)(5,"div",68)(6,"span",69),e.\u0275\u0275text(7," ZIP "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(8,"div",70)(9,"a",71),e.\u0275\u0275text(10),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(11,"p",72),e.\u0275\u0275text(12),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(13,"div",67)(14,"a",92),e.\u0275\u0275element(15,"i",74),e.\u0275\u0275elementEnd()()()()()()),2&a){const t=r.$implicit,l=e.\u0275\u0275nextContext();e.\u0275\u0275advance(10),e.\u0275\u0275textInterpolate(t.name),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(l.getSize(t))}}const D=[{path:"",component:(()=>{class a{constructor(t){this.sanitizer=t,this.pageTitle=[],this.files=[]}ngOnInit(){this.pageTitle=[{label:"Tasks",path:"/"},{label:"Task Detail",path:"/",active:!0}],this.selectedTask=o.ep[0]}onSelect(t){this.files.push(...t.addedFiles)}onRemove(t){this.files.splice(this.files.indexOf(t),1)}getSize(t){const l=t.size;if(0===l)return"0 Bytes";const x=Math.floor(Math.log(l)/Math.log(1024));return parseFloat((l/Math.pow(1024,x)).toFixed(2))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][x]}getPreviewUrl(t){return this.sanitizer.bypassSecurityTrustResourceUrl(encodeURI(URL.createObjectURL(t)))}}return a.\u0275fac=function(t){return new(t||a)(e.\u0275\u0275directiveInject(m.DomSanitizer))},a.\u0275cmp=e.\u0275\u0275defineComponent({type:a,selectors:[["app-task-details"]],decls:167,vars:14,consts:[["title","Task Detail",3,"breadcrumbItems"],[1,"row"],[1,"col-xl-8","col-lg-7"],[1,"card","d-block"],[1,"card-body"],["ngbDropdown","",1,"float-end"],["href","javascript:void(0);","id","taskDetailDropdown","aria-expanded","false","ngbDropdownToggle","",1,"arrow-none","text-muted"],[1,"mdi","mdi-dots-horizontal","font-18"],["ngbDropdownMenu","","aria-labelledby","taskDetailDropdown",1,"dropdown-menu-end"],["ngbDropdownItem","",3,"routerLink"],[1,"mdi","mdi-attachment","me-1"],[1,"mdi","mdi-pencil-outline","me-1"],[1,"mdi","mdi-content-copy","me-1"],[1,"dropdown-divider"],["ngbDropdownItem","",1,"text-danger",3,"routerLink"],[1,"mdi","mdi-delete-outline","me-1"],[1,"form-check","float-start"],["type","checkbox","id","completedCheck",1,"form-check-input",3,"change"],["for","completedCheck",1,"form-check-label"],[1,"clearfix"],[1,"col-md-4"],[1,"mt-2","mb-1","text-muted"],[1,"d-flex","align-items-start"],["height","24",1,"rounded-circle","me-2",3,"src","alt"],[1,"w-100"],[1,"mt-1","font-size-14"],[1,"mdi","mdi-briefcase-check-outline","font-18","text-success","me-1"],[1,"mdi","mdi-calendar-month-outline","font-18","text-success","me-1"],[1,"mt-3"],[1,"text-muted","mb-4"],[1,"mt-4","mb-2"],["class","form-check mt-1",4,"ngFor","ngForOf"],[1,"card"],[1,"float-end"],[1,"form-select","form-select-sm"],["selected",""],["value","1"],["value","2"],["value","3"],[1,"mb-4","mt-0","font-16"],[1,"clerfix"],[4,"ngFor","ngForOf"],[1,"text-center","mt-2"],["href","javascript:void(0);",1,"text-danger"],[1,"mdi","mdi-spin","mdi-loading","me-1"],[1,"border","rounded","mt-4"],[1,"comment-area-box"],["rows","3","placeholder","Your comment...",1,"form-control","border-0","resize-none"],[1,"p-2","bg-light","d-flex","justify-content-between","align-items-center"],["href","javascript:void(0)",1,"btn","btn-sm","px-1","btn-light"],[1,"mdi","mdi-upload"],[1,"mdi","mdi-at"],["type","submit",1,"btn","btn-sm","btn-success"],[1,"uil","uil-message","me-1"],[1,"col-xl-4","col-lg-5"],["href","javascript:void(0)","ngbDropdownToggle","",1,"arrow-none","text-muted"],["ngbDropdownMenu","",1,"dropdown-menu-end"],["href","javascript:void(0);","ngbDropdownItem",""],["href","javascript:void(0);","ngbDropdownItem","",1,"text-danger"],[1,"card-title","font-16","mb-3"],["accept","image/jpeg,image/jpg,image/png,image/gif",1,"dropzone",3,"change"],[1,"h3","text-muted","dripicons-cloud-upload"],["id","file-previews",1,"dropzone-previews","mt-3"],["id","uploadPreviewTemplate",4,"ngFor","ngForOf"],[1,"card","my-1","shadow-none","border"],[1,"p-2"],[1,"row","align-items-center"],[1,"col-auto"],[1,"avatar-sm"],[1,"avatar-title","badge-soft-primary","text-primary","rounded"],[1,"col","ps-0"],["href","javascript:void(0);",1,"text-muted","fw-bold"],[1,"mb-0"],["href","javascript:void(0);",1,"btn","btn-link","btn-lg","text-muted"],[1,"dripicons-download"],[1,"card","mb-1","shadow-none","border"],[1,"card","mb-0","shadow-none","border"],[1,"avatar-title","bg-secondary","rounded"],[1,"form-check","mt-1"],["type","checkbox",1,"form-check-input",3,"id"],[1,"form-check-label","strikethrough",3,"for"],["height","32",1,"me-2","rounded-circle",3,"src","alt"],[1,"mt-0"],[1,"text-muted","float-end"],["href","javascript: void(0);",1,"text-muted","font-13","d-inline-block","mt-2"],[1,"mdi","mdi-reply"],[4,"ngIf"],["class","d-flex mt-3",4,"ngFor","ngForOf"],[1,"d-flex","mt-3"],["href","javascript:void(0)",1,"pe-2"],["alt","Generic placeholder image","height","32",1,"rounded-circle",3,"src"],["id","uploadPreviewTemplate"],["href","javascript:void(0)",1,"btn","btn-link","font-16","text-muted"]],template:function(t,l){1&t&&(e.\u0275\u0275element(0,"app-page-title",0),e.\u0275\u0275elementStart(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"a",6),e.\u0275\u0275element(7,"i",7),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(8,"div",8)(9,"a",9),e.\u0275\u0275element(10,"i",10),e.\u0275\u0275text(11,"Attachment "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(12,"a",9),e.\u0275\u0275element(13,"i",11),e.\u0275\u0275text(14,"Edit "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(15,"a",9),e.\u0275\u0275element(16,"i",12),e.\u0275\u0275text(17,"Mark as Duplicate "),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(18,"div",13),e.\u0275\u0275elementStart(19,"a",14),e.\u0275\u0275element(20,"i",15),e.\u0275\u0275text(21,"Delete "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(22,"div",16)(23,"input",17),e.\u0275\u0275listener("change",function(){return l.selectedTask.completed=!l.selectedTask.completed}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(24,"label",18),e.\u0275\u0275text(25," Mark as completed "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(26,"div",19),e.\u0275\u0275elementStart(27,"h4"),e.\u0275\u0275text(28),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(29,"div",1)(30,"div",20)(31,"p",21),e.\u0275\u0275text(32,"Assigned To"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(33,"div",22),e.\u0275\u0275element(34,"img",23),e.\u0275\u0275elementStart(35,"div",24)(36,"h5",25),e.\u0275\u0275text(37),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(38,"div",20)(39,"p",21),e.\u0275\u0275text(40,"Project Name"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(41,"div",22),e.\u0275\u0275element(42,"i",26),e.\u0275\u0275elementStart(43,"div",24)(44,"h5",25),e.\u0275\u0275text(45," Examron Envirenment "),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(46,"div",20)(47,"p",21),e.\u0275\u0275text(48,"Due Date"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(49,"div",22),e.\u0275\u0275element(50,"i",27),e.\u0275\u0275elementStart(51,"div",24)(52,"h5",25),e.\u0275\u0275text(53),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(54,"h5",28),e.\u0275\u0275text(55,"Overview:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(56,"p",29),e.\u0275\u0275text(57," This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up. "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(58,"h5",30),e.\u0275\u0275text(59,"Checklists/Sub-tasks"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(60,S,4,3,"div",31),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(61,"div",32)(62,"div",4)(63,"div",33)(64,"select",34)(65,"option",35),e.\u0275\u0275text(66,"Recent"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(67,"option",36),e.\u0275\u0275text(68,"Most Helpful"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(69,"option",37),e.\u0275\u0275text(70,"High to Low"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(71,"option",38),e.\u0275\u0275text(72,"Low to High"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(73,"h4",39),e.\u0275\u0275text(74),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(75,"div",40),e.\u0275\u0275template(76,T,14,8,"ng-container",41),e.\u0275\u0275elementStart(77,"div",42)(78,"a",43),e.\u0275\u0275element(79,"i",44),e.\u0275\u0275text(80," Load more "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(81,"div",45)(82,"form",46),e.\u0275\u0275element(83,"textarea",47),e.\u0275\u0275elementStart(84,"div",48)(85,"div")(86,"a",49),e.\u0275\u0275element(87,"i",50),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(88,"a",49),e.\u0275\u0275element(89,"i",51),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(90,"button",52),e.\u0275\u0275element(91,"i",53),e.\u0275\u0275text(92,"Submit"),e.\u0275\u0275elementEnd()()()()()()(),e.\u0275\u0275elementStart(93,"div",54)(94,"div",32)(95,"div",4)(96,"div",5)(97,"a",55),e.\u0275\u0275element(98,"i",7),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(99,"div",56)(100,"a",57),e.\u0275\u0275element(101,"i",10),e.\u0275\u0275text(102,"Attachment "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(103,"a",57),e.\u0275\u0275element(104,"i",11),e.\u0275\u0275text(105,"Edit "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(106,"a",57),e.\u0275\u0275element(107,"i",12),e.\u0275\u0275text(108,"Mark as Duplicate "),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(109,"div",13),e.\u0275\u0275elementStart(110,"a",58),e.\u0275\u0275element(111,"i",15),e.\u0275\u0275text(112,"Delete "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(113,"h5",59),e.\u0275\u0275text(114,"Attachments"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(115,"ngx-dropzone",60),e.\u0275\u0275listener("change",function(h){return l.onSelect(h)}),e.\u0275\u0275elementStart(116,"ngx-dropzone-label"),e.\u0275\u0275element(117,"i",61),e.\u0275\u0275elementStart(118,"h4"),e.\u0275\u0275text(119,"Drop files here or click to upload."),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(120,"div",62),e.\u0275\u0275template(121,y,16,2,"div",63),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(122,"div",64)(123,"div",65)(124,"div",66)(125,"div",67)(126,"div",68)(127,"span",69),e.\u0275\u0275text(128," JPG "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(129,"div",70)(130,"a",71),e.\u0275\u0275text(131,"Ubold-sketch-design.zip"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(132,"p",72),e.\u0275\u0275text(133,"2.3 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(134,"div",67)(135,"a",73),e.\u0275\u0275element(136,"i",74),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(137,"div",75)(138,"div",65)(139,"div",66)(140,"div",67)(141,"div",68)(142,"span",69),e.\u0275\u0275text(143," JPG "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(144,"div",70)(145,"a",71),e.\u0275\u0275text(146,"Dashboard-design.jpg"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(147,"p",72),e.\u0275\u0275text(148,"3.25 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(149,"div",67)(150,"a",73),e.\u0275\u0275element(151,"i",74),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(152,"div",76)(153,"div",65)(154,"div",66)(155,"div",67)(156,"div",68)(157,"span",77),e.\u0275\u0275text(158," .MP4 "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(159,"div",70)(160,"a",71),e.\u0275\u0275text(161,"Admin-bug-report.mp4"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(162,"p",72),e.\u0275\u0275text(163,"7.05 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(164,"div",67)(165,"a",73),e.\u0275\u0275element(166,"i",74),e.\u0275\u0275elementEnd()()()()()()()()()),2&t&&(e.\u0275\u0275property("breadcrumbItems",l.pageTitle),e.\u0275\u0275advance(9),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(4),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(9),e.\u0275\u0275textInterpolate(l.selectedTask.title),e.\u0275\u0275advance(6),e.\u0275\u0275property("src",l.selectedTask.assignee_avatar,e.\u0275\u0275sanitizeUrl)("alt",l.selectedTask.assigned_to),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1(" ",l.selectedTask.assigned_to," "),e.\u0275\u0275advance(16),e.\u0275\u0275textInterpolate1(" ",l.selectedTask.due_date," "),e.\u0275\u0275advance(7),e.\u0275\u0275property("ngForOf",l.selectedTask.checklists),e.\u0275\u0275advance(14),e.\u0275\u0275textInterpolate1("Comments (",null==l.selectedTask.comments?null:l.selectedTask.comments.length,")"),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngForOf",l.selectedTask.comments),e.\u0275\u0275advance(45),e.\u0275\u0275property("ngForOf",l.files))},directives:[u.T,c.jt,c.iD,c.Vi,p.yS,c.TH,n.NgForOf,d.YN,d.Kr,n.NgIf,d._Y,d.JL,d.F,s._f,s.NP],styles:[""]}),a})()}];let I=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[[p.Bz.forChild(D)],p.Bz]}),a})(),_=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[[n.CommonModule,d.u5,s.bB,c.XC,f.p,I]]}),a})()},39475:(b,v,i)=>{i.d(v,{T:()=>p});var n=i(5e3),d=i(69808);function c(o,e){if(1&o&&(n.\u0275\u0275elementStart(0,"li",5)(1,"a",11),n.\u0275\u0275text(2),n.\u0275\u0275elementEnd()()),2&o){const m=n.\u0275\u0275nextContext().$implicit;n.\u0275\u0275advance(2),n.\u0275\u0275textInterpolate(m.label)}}function s(o,e){if(1&o&&(n.\u0275\u0275elementStart(0,"li",12)(1,"a",13),n.\u0275\u0275text(2),n.\u0275\u0275elementEnd()()),2&o){const m=n.\u0275\u0275nextContext().$implicit;n.\u0275\u0275advance(2),n.\u0275\u0275textInterpolate(m.label)}}function f(o,e){if(1&o&&(n.\u0275\u0275elementContainerStart(0),n.\u0275\u0275template(1,c,3,1,"li",9),n.\u0275\u0275template(2,s,3,1,"li",10),n.\u0275\u0275elementContainerEnd()),2&o){const m=e.$implicit;n.\u0275\u0275advance(1),n.\u0275\u0275property("ngIf",!m.active),n.\u0275\u0275advance(1),n.\u0275\u0275property("ngIf",m.active)}}let p=(()=>{class o{constructor(){this.breadcrumbItems=[],this.title=""}ngOnInit(){}}return o.\u0275fac=function(m){return new(m||o)},o.\u0275cmp=n.\u0275\u0275defineComponent({type:o,selectors:[["app-page-title"]],inputs:{breadcrumbItems:"breadcrumbItems",title:"title"},decls:11,vars:2,consts:[[1,"row"],[1,"col-12"],[1,"page-title-box"],[1,"page-title-right"],[1,"breadcrumb","m-0"],[1,"breadcrumb-item"],["href","javascript: void(0);"],[4,"ngFor","ngForOf"],[1,"page-title"],["class","breadcrumb-item",4,"ngIf"],["class","breadcrumb-item active",4,"ngIf"],["href","javascript: void(0);","routerLink","[item.path]"],[1,"breadcrumb-item","active"],["routerLink","[item.path]"]],template:function(m,u){1&m&&(n.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"ol",4)(5,"li",5)(6,"a",6),n.\u0275\u0275text(7,"UBold"),n.\u0275\u0275elementEnd()(),n.\u0275\u0275template(8,f,3,2,"ng-container",7),n.\u0275\u0275elementEnd()(),n.\u0275\u0275elementStart(9,"h4",8),n.\u0275\u0275text(10),n.\u0275\u0275elementEnd()()()()),2&m&&(n.\u0275\u0275advance(8),n.\u0275\u0275property("ngForOf",u.breadcrumbItems),n.\u0275\u0275advance(2),n.\u0275\u0275textInterpolate(u.title))},directives:[d.NgForOf,d.NgIf],styles:[""]}),o})()}}]);