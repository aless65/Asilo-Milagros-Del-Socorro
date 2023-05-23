"use strict";(self.webpackChunkubold_angular=self.webpackChunkubold_angular||[]).push([[1593],{91593:(h,p,i)=>{i.r(p),i.d(p,{DetailModule:()=>S});var t=i(69808),c=i(84282),d=i(59182),u=i(81819),g=i(29095),s=i(4521),l=i(95459),e=i(5e3),o=i(39475),v=i(6086);function b(n,m){if(1&n&&(e.\u0275\u0275elementStart(0,"a",74),e.\u0275\u0275element(1,"img",75),e.\u0275\u0275elementEnd()),2&n){const r=m.$implicit;e.\u0275\u0275property("ngbTooltip",r.name),e.\u0275\u0275advance(1),e.\u0275\u0275property("src",r.image,e.\u0275\u0275sanitizeUrl)}}const f=[{path:"",component:(()=>{class n{constructor(r){this.route=r,this.pageTitle=[]}ngOnInit(){this.pageTitle=[{label:"Projects",path:"/"},{label:"Project Details",path:"/",active:!0}],this.route.queryParams.subscribe(r=>{this.selectedProject=r&&r.hasOwnProperty("id")?l.B.filter(a=>String(a.id)===r.id)[0]:l.B[0]}),this.initializeChartConfig()}initializeChartConfig(){this.projectChartOptions={type:"line",chartOptions:{maintainAspectRatio:!1,hover:{intersect:!0},plugins:{legend:{display:!1},tooltip:{intersect:!1},filler:{propagate:!1}},scales:{xAxes:{grid:{color:"rgba(0,0,0,0.05)"}},yAxes:{ticks:{stepSize:20},display:!0,grid:{color:"rgba(0,0,0,0)"}}}}}}}return n.\u0275fac=function(r){return new(r||n)(e.\u0275\u0275directiveInject(s.gz))},n.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-project-detail"]],decls:202,vars:29,consts:[["title","Project Details",3,"breadcrumbItems"],[1,"row"],[1,"col-md-6","col-xl-3"],["variant","primary","iconContainerClass"," rounded-circle bg-light","description","Total Tasks","icon","fe-list",3,"stats"],["variant","success","iconContainerClass","rounded-circle bg-light","description","Total Tasks Completed","icon","fe-check-square",3,"stats"],["variant","info","iconContainerClass","rounded-circle bg-light","description","Total Team Size","icon","fe-users",3,"stats"],["variant","warning","iconContainerClass","rounded-circle bg-light","description","Total Hours Spent","icon","fe-clock",3,"stats"],[1,"col-xl-8","col-lg-6"],[1,"card","d-block"],[1,"card-body"],["ngbDropdown","",1,"float-end"],["href","javascript:void(0)","ngbDropdownToggle","",1,"card-drop","arrow-none"],[1,"dripicons-dots-3"],["ngbDropdownMenu","",1,"dropdown-menu-end"],["ngbDropdownItem","",3,"routerLink"],[1,"mdi","mdi-pencil","me-1"],[1,"mdi","mdi-delete","me-1"],[1,"mdi","mdi-email-outline","me-1"],[1,"mdi","mdi-exit-to-app","me-1"],[1,"mt-0","font-20"],[1,"badge","mb-3"],[1,"text-muted","mb-2"],[1,"text-muted","mb-4"],[1,"mb-4"],[1,"text-uppercase"],["href","javascript:void(0)",1,"badge","badge-soft-primary","me-1"],[1,"col-md-4"],[1,"text-muted"],["id","tooltips-container"],["href","javascript:void(0);","class","d-inline-block","placement","top",3,"ngbTooltip",4,"ngFor","ngForOf"],[1,"card"],["href","javascript:void(0)","ngbDrobdownToggle","",1,"arrow-none","card-drop"],[1,"mt-0","mb-3"],["placeholder","Write message","id","example-textarea","rows","3",1,"form-control","form-control-light","mb-2"],[1,"text-end"],[1,"btn-group","mb-2"],["type","button",1,"btn","btn-link","btn-sm","text-muted","font-18"],[1,"dripicons-paperclip"],[1,"btn-group","mb-2","ms-2"],["type","button",1,"btn","btn-primary","btn-sm"],[1,"mt-2"],[1,"d-flex","align-items-start"],["src","../assets/images/users/user-3.jpg","alt","Generic placeholder image",1,"me-2","avatar-sm","rounded-circle"],[1,"w-100"],[1,"mt-0"],["href","javascript:void(0)",1,"text-reset"],[1,"text-muted","ms-1"],["href","javascript: void(0);",1,"text-muted","font-13","d-inline-block","mt-2"],[1,"mdi","mdi-reply"],[1,"d-flex","align-items-start","mt-3"],["href","javascript:void(0)",1,"pe-2"],["src","../assets/images/users/user-4.jpg","alt","Generic placeholder image",1,"avatar-sm","rounded-circle"],["src","../assets/images/users/user-2.jpg","alt","Generic placeholder image",1,"me-2","avatar-sm","rounded-circle"],["src","../assets/images/users/user-1.jpg","alt","Generic placeholder image","height","31",1,"rounded-circle"],["type","text","id","simpleinput","placeholder","Add comment",1,"form-control","form-control-sm","form-control-light"],[1,"text-center","mt-2"],["href","javascript:void(0);",1,"text-danger"],[1,"mdi","mdi-spin","mdi-loading","me-1","font-16"],[1,"col-lg-6","col-xl-4"],[1,"card-title","mb-3"],[1,"mt-3","chartjs-chart",2,"height","320px"],["id","progress-chart","baseChart","",3,"datasets","type","labels","options"],[1,"card","mb-1","shadow-none","border"],[1,"p-2"],[1,"row","align-items-center"],[1,"col-auto"],[1,"avatar-sm"],[1,"avatar-title","badge-soft-primary","text-primary","rounded"],[1,"col","ps-0"],["href","javascript:void(0);",1,"text-muted","fw-bold"],[1,"mb-0"],["href","javascript:void(0);",1,"btn","btn-link","btn-lg","text-muted"],[1,"dripicons-download"],[1,"card","mb-0","shadow-none","border"],["href","javascript:void(0);","placement","top",1,"d-inline-block",3,"ngbTooltip"],["alt","friend",1,"rounded-circle","img-thumbnail","avatar-sm",3,"src"]],template:function(r,a){1&r&&(e.\u0275\u0275element(0,"app-page-title",0),e.\u0275\u0275elementStart(1,"div",1)(2,"div",2),e.\u0275\u0275element(3,"app-widget-statistics-card4",3),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"div",2),e.\u0275\u0275element(5,"app-widget-statistics-card4",4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"div",2),e.\u0275\u0275element(7,"app-widget-statistics-card4",5),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(8,"div",2),e.\u0275\u0275element(9,"app-widget-statistics-card4",6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(10,"div",1)(11,"div",7)(12,"div",8)(13,"div",9)(14,"div",10)(15,"a",11),e.\u0275\u0275element(16,"i",12),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(17,"div",13)(18,"a",14),e.\u0275\u0275element(19,"i",15),e.\u0275\u0275text(20,"Edit"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(21,"a",14),e.\u0275\u0275element(22,"i",16),e.\u0275\u0275text(23,"Delete"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(24,"a",14),e.\u0275\u0275element(25,"i",17),e.\u0275\u0275text(26,"Invite"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(27,"a",14),e.\u0275\u0275element(28,"i",18),e.\u0275\u0275text(29,"Leave"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(30,"h3",19),e.\u0275\u0275text(31),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(32,"div",20),e.\u0275\u0275text(33),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(34,"h5"),e.\u0275\u0275text(35,"Project Overview:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(36,"p",21),e.\u0275\u0275text(37),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(38,"p",22),e.\u0275\u0275text(39," Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With supporting text below as a natural lead-in to additional contenposuere erat a ante. "),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(40,"div",23)(41,"h5"),e.\u0275\u0275text(42,"Tags"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(43,"div",24)(44,"a",25),e.\u0275\u0275text(45,"Html"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(46,"a",25),e.\u0275\u0275text(47,"Css"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(48,"a",25),e.\u0275\u0275text(49,"Bootstrap"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(50,"a",25),e.\u0275\u0275text(51,"JQuery"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(52,"div",1)(53,"div",26)(54,"div",23)(55,"h5"),e.\u0275\u0275text(56,"Start Date"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(57,"p"),e.\u0275\u0275text(58),e.\u0275\u0275elementStart(59,"small",27),e.\u0275\u0275text(60),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(61,"div",26)(62,"div",23)(63,"h5"),e.\u0275\u0275text(64,"End Date"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(65,"p"),e.\u0275\u0275text(66),e.\u0275\u0275elementStart(67,"small",27),e.\u0275\u0275text(68),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(69,"div",26)(70,"div",23)(71,"h5"),e.\u0275\u0275text(72,"Budget"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(73,"p"),e.\u0275\u0275text(74),e.\u0275\u0275pipe(75,"currency"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(76,"div",28)(77,"h5"),e.\u0275\u0275text(78,"Team Members:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(79,b,2,2,"a",29),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(80,"div",30)(81,"div",9)(82,"div",10)(83,"a",31),e.\u0275\u0275element(84,"i",12),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(85,"div",13)(86,"a",14),e.\u0275\u0275text(87,"Latest"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(88,"a",14),e.\u0275\u0275text(89,"Popular"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(90,"h4",32),e.\u0275\u0275text(91),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(92,"textarea",33),e.\u0275\u0275elementStart(93,"div",34)(94,"div",35)(95,"button",36),e.\u0275\u0275element(96,"i",37),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(97,"div",38)(98,"button",39),e.\u0275\u0275text(99,"Submit"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(100,"div",40)(101,"div",41),e.\u0275\u0275element(102,"img",42),e.\u0275\u0275elementStart(103,"div",43)(104,"h5",44)(105,"a",45),e.\u0275\u0275text(106,"Jeremy Tomlinson"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(107,"small",46),e.\u0275\u0275text(108,"3 hours ago"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275text(109," Nice work, makes me think of The Money Pit. "),e.\u0275\u0275element(110,"br"),e.\u0275\u0275elementStart(111,"a",47),e.\u0275\u0275element(112,"i",48),e.\u0275\u0275text(113," Reply"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(114,"div",49)(115,"a",50),e.\u0275\u0275element(116,"img",51),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(117,"div",43)(118,"h5",44)(119,"a",45),e.\u0275\u0275text(120,"Kathleen Thomas"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(121,"small",46),e.\u0275\u0275text(122,"1 hours ago"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275text(123," i'm in the middle of a timelapse animation myself! (Very different though.) Awesome stuff. "),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(124,"div",49),e.\u0275\u0275element(125,"img",52),e.\u0275\u0275elementStart(126,"div",43)(127,"h5",44)(128,"a",45),e.\u0275\u0275text(129,"Jonathan Tiner"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(130,"small",46),e.\u0275\u0275text(131,"1 day ago"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275text(132," The parallax is a little odd but O.o that house build is awesome!! "),e.\u0275\u0275element(133,"br"),e.\u0275\u0275elementStart(134,"a",47),e.\u0275\u0275element(135,"i",48),e.\u0275\u0275text(136," Reply"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(137,"div",49)(138,"a",50),e.\u0275\u0275element(139,"img",53),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(140,"div",43),e.\u0275\u0275element(141,"input",54),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(142,"div",55)(143,"a",56),e.\u0275\u0275element(144,"i",57),e.\u0275\u0275text(145," Load more "),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(146,"div",58)(147,"div",30)(148,"div",9)(149,"h5",59),e.\u0275\u0275text(150,"Progress"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(151,"div",60),e.\u0275\u0275element(152,"canvas",61),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(153,"div",30)(154,"div",9)(155,"h5",59),e.\u0275\u0275text(156,"Files"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(157,"div",62)(158,"div",63)(159,"div",64)(160,"div",65)(161,"div",66)(162,"span",67),e.\u0275\u0275text(163," ZIP "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(164,"div",68)(165,"a",69),e.\u0275\u0275text(166,"Ubold-sketch-design.zip"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(167,"p",70),e.\u0275\u0275text(168,"2.3 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(169,"div",65)(170,"a",71),e.\u0275\u0275element(171,"i",72),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(172,"div",62)(173,"div",63)(174,"div",64)(175,"div",65)(176,"div",66)(177,"span",67),e.\u0275\u0275text(178," JPG "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(179,"div",68)(180,"a",69),e.\u0275\u0275text(181,"Dashboard-design.jpg"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(182,"p",70),e.\u0275\u0275text(183,"3.25 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(184,"div",65)(185,"a",71),e.\u0275\u0275element(186,"i",72),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(187,"div",73)(188,"div",63)(189,"div",64)(190,"div",65)(191,"div",66)(192,"span",67),e.\u0275\u0275text(193," MP4 "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(194,"div",68)(195,"a",69),e.\u0275\u0275text(196,"Admin-bug-report.mp4"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(197,"p",70),e.\u0275\u0275text(198,"7.05 MB"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(199,"div",65)(200,"a",71),e.\u0275\u0275element(201,"i",72),e.\u0275\u0275elementEnd()()()()()()()()()),2&r&&(e.\u0275\u0275property("breadcrumbItems",a.pageTitle),e.\u0275\u0275advance(3),e.\u0275\u0275property("stats",a.selectedProject.totalTasks),e.\u0275\u0275advance(2),e.\u0275\u0275property("stats",a.selectedProject.totalTasksCompleted),e.\u0275\u0275advance(2),e.\u0275\u0275property("stats",a.selectedProject.totalTeamSize),e.\u0275\u0275advance(2),e.\u0275\u0275property("stats",412),e.\u0275\u0275advance(9),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1(" ",a.selectedProject.title," "),e.\u0275\u0275advance(1),e.\u0275\u0275classMap("Finished"===a.selectedProject.state?"bg-success":"bg-secondary text-light"),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",a.selectedProject.state,""),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate1(" ",a.selectedProject.shortDesc," "),e.\u0275\u0275advance(21),e.\u0275\u0275textInterpolate1("",a.selectedProject.startDate," "),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(a.selectedProject.startTime),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate1("",a.selectedProject.endDate," "),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(a.selectedProject.endTime),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind1(75,27,a.selectedProject.totalBudget)),e.\u0275\u0275advance(5),e.\u0275\u0275property("ngForOf",a.selectedProject.teamMembers),e.\u0275\u0275advance(7),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(2),e.\u0275\u0275property("routerLink","."),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1("Comments (",a.selectedProject.totalComments,")"),e.\u0275\u0275advance(61),e.\u0275\u0275property("datasets",a.selectedProject.progressData.datasets)("type",a.projectChartOptions.type)("labels",a.selectedProject.progressData.labels)("options",a.projectChartOptions.chartOptions))},directives:[o.T,v.F,d.jt,d.iD,d.Vi,s.yS,d.TH,t.NgForOf,d._L,c.jh],pipes:[t.CurrencyPipe],styles:[""]}),n})()}];let x=(()=>{class n{}return n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[s.Bz.forChild(f)],s.Bz]}),n})(),S=(()=>{class n{}return n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[t.CommonModule,d.HK,d.XC,c.vQ,u.y,g.p,x]]}),n})()},39475:(h,p,i)=>{i.d(p,{T:()=>s});var t=i(5e3),c=i(69808);function d(l,e){if(1&l&&(t.\u0275\u0275elementStart(0,"li",5)(1,"a",11),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&l){const o=t.\u0275\u0275nextContext().$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(o.label)}}function u(l,e){if(1&l&&(t.\u0275\u0275elementStart(0,"li",12)(1,"a",13),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&l){const o=t.\u0275\u0275nextContext().$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(o.label)}}function g(l,e){if(1&l&&(t.\u0275\u0275elementContainerStart(0),t.\u0275\u0275template(1,d,3,1,"li",9),t.\u0275\u0275template(2,u,3,1,"li",10),t.\u0275\u0275elementContainerEnd()),2&l){const o=e.$implicit;t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!o.active),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",o.active)}}let s=(()=>{class l{constructor(){this.breadcrumbItems=[],this.title=""}ngOnInit(){}}return l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=t.\u0275\u0275defineComponent({type:l,selectors:[["app-page-title"]],inputs:{breadcrumbItems:"breadcrumbItems",title:"title"},decls:11,vars:2,consts:[[1,"row"],[1,"col-12"],[1,"page-title-box"],[1,"page-title-right"],[1,"breadcrumb","m-0"],[1,"breadcrumb-item"],["href","javascript: void(0);"],[4,"ngFor","ngForOf"],[1,"page-title"],["class","breadcrumb-item",4,"ngIf"],["class","breadcrumb-item active",4,"ngIf"],["href","javascript: void(0);","routerLink","[item.path]"],[1,"breadcrumb-item","active"],["routerLink","[item.path]"]],template:function(o,v){1&o&&(t.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"ol",4)(5,"li",5)(6,"a",6),t.\u0275\u0275text(7,"UBold"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(8,g,3,2,"ng-container",7),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(9,"h4",8),t.\u0275\u0275text(10),t.\u0275\u0275elementEnd()()()()),2&o&&(t.\u0275\u0275advance(8),t.\u0275\u0275property("ngForOf",v.breadcrumbItems),t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(v.title))},directives:[c.NgForOf,c.NgIf],styles:[""]}),l})()}}]);