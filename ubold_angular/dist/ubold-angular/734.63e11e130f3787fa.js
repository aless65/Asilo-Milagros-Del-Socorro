"use strict";(self.webpackChunkubold_angular=self.webpackChunkubold_angular||[]).push([[734],{90734:(j,E,s)=>{s.r(E),s.d(E,{DashboardOneModule:()=>oe});var i=s(69808),l=s(52382),A=s(42115),r=s(59182),S=s(81819),d=s(4521);const U=[{id:1,avatar:"assets/images/users/user-2.jpg",name:"Tomaslau",currency:"BTC",balance:.00816117,orders:97036e-8},{id:2,avatar:"assets/images/users/user-3.jpg",name:"Erwin E. Brown",currency:"ETH",balance:3.16117008,orders:1.70360009},{id:3,avatar:"assets/images/users/user-4.jpg",name:"Margeret V. Ligon",currency:"EUR",balance:25.08,orders:12.58},{id:4,avatar:"assets/images/users/user-5.jpg",name:"Jose D. Delacruz",currency:"CNY",balance:82,orders:30.83},{id:5,avatar:"assets/images/users/user-6.jpg",name:"Luke J. Sain",currency:"BTC",balance:2.00816117,orders:1.00097036}],J=[{id:1,marketplaces:"Themes Market",date:new Date("Oct 15 2018"),payouts:5848.68,status:"Upcoming"},{id:2,marketplaces:"Freelance",date:new Date("Oct 12 2018"),payouts:1247.25,status:"Paid"},{id:3,marketplaces:"Share Holding",date:new Date("Oct 10 2018"),payouts:815.89,status:"Paid"},{id:4,marketplaces:"Envato's Affiliates",date:new Date("Oct 03 2018"),payouts:248.75,status:"Overdue"},{id:5,marketplaces:"Marketing Revenue",date:new Date("Sep 21, 2018"),payouts:978.21,status:"Upcoming"},{id:6,marketplaces:"Advertise Revenue",date:new Date("Sep 15, 2018"),payouts:358.1,status:"Paid"}];var e=s(5e3),V=s(86890),Y=s(35615);function W(n,o){if(1&n&&(e.\u0275\u0275elementStart(0,"div",79),e.\u0275\u0275element(1,"app-widget-statistics-card1",80),e.\u0275\u0275elementEnd()),2&n){const t=o.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275property("statisticsCardData",t)}}function K(n,o){if(1&n&&(e.\u0275\u0275elementStart(0,"div",81),e.\u0275\u0275element(1,"app-widget-chart-statistics",82),e.\u0275\u0275elementEnd()),2&n){const t=o.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275property("title",t.title)("icon",t.icon)("stats",t.stats)("variant",t.variant)}}function Q(n,o){if(1&n&&(e.\u0275\u0275elementStart(0,"tr")(1,"td",83),e.\u0275\u0275element(2,"img",84),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"td")(4,"h5",85),e.\u0275\u0275i18n(5,86),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"p",87)(7,"small"),e.\u0275\u0275i18n(8,88),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(9,"td"),e.\u0275\u0275element(10,"i"),e.\u0275\u0275pipe(11,"lowercase"),e.\u0275\u0275text(12),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(13,"td"),e.\u0275\u0275text(14),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(15,"td"),e.\u0275\u0275text(16),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(17,"td")(18,"a",89),e.\u0275\u0275element(19,"i",90),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(20,"a",91),e.\u0275\u0275element(21,"i",92),e.\u0275\u0275elementEnd()()()),2&n){const t=o.$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275property("src",t.avatar,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(3),e.\u0275\u0275i18nExp(t.name),e.\u0275\u0275i18nApply(5),e.\u0275\u0275advance(5),e.\u0275\u0275classMapInterpolate1("mdi mdi-currency-",e.\u0275\u0275pipeBind1(11,10,t.currency)," text-primary"),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate1(" ",t.currency," "),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate2(" ",t.balance," ",t.currency," "),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate2(" ",t.orders," ",t.currency," ")}}function Z(n,o){if(1&n&&(e.\u0275\u0275elementStart(0,"span",98),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&n){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(t.status)}}function q(n,o){if(1&n&&(e.\u0275\u0275elementStart(0,"span",99),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&n){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(t.status)}}function ee(n,o){if(1&n&&(e.\u0275\u0275elementStart(0,"span",100),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&n){const t=e.\u0275\u0275nextContext().$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(t.status)}}function te(n,o){if(1&n&&(e.\u0275\u0275elementStart(0,"tr")(1,"td")(2,"h5",85),e.\u0275\u0275i18n(3,93),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(4,"td"),e.\u0275\u0275text(5),e.\u0275\u0275pipe(6,"date"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"td"),e.\u0275\u0275text(8),e.\u0275\u0275pipe(9,"currency"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"td"),e.\u0275\u0275template(11,Z,2,1,"span",94),e.\u0275\u0275template(12,q,2,1,"span",95),e.\u0275\u0275template(13,ee,2,1,"span",96),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(14,"td")(15,"a",89),e.\u0275\u0275element(16,"i",97),e.\u0275\u0275elementEnd()()()),2&n){const t=o.$implicit;e.\u0275\u0275advance(3),e.\u0275\u0275i18nExp(t.marketplaces),e.\u0275\u0275i18nApply(3),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind2(6,6,t.date,"MMM dd, y")," "),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(9,9,t.payouts)," "),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngIf","Upcoming"===t.status),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf","Overdue"===t.status),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf","Paid"===t.status)}}let ne=(()=>{class n extends r.NG{constructor(){super(...arguments),this.month_list=["January","February","March","April","May","June","July","August","September","October","November","December"],this.DELIMITER=" "}parse(t){if(t){let _=t.split(this.DELIMITER);return{day:parseInt(_[1],10),month:this.month_list.indexOf(_[0]),year:parseInt(_[2],10)}}return null}format(t){return t?this.month_list[t.month-1]+this.DELIMITER+t.day+","+this.DELIMITER+t.year:""}}return n.\u0275fac=function(){let o;return function(_){return(o||(o=e.\u0275\u0275getInheritedFactory(n)))(_||n)}}(),n.\u0275prov=e.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})();const _e=[{path:"",component:(()=>{class n{constructor(t){this.calendar=t,this.statisticsCardData=[],this.chartStatisticsData=[],this.userBalanceData=[],this.revenueHistoryData=[]}ngOnInit(){this.date=this.calendar.getToday(),this._fetchStatisticsData(),this.initChart(),this._fetchUserBalanceData(),this._fetchRevenueHistoryData()}_fetchStatisticsData(){this.statisticsCardData=[{id:1,variant:"primary",description:"Total Revenue",icon:"fe-heart",stats:58967,options:{prefix:"$",duration:2}},{id:2,variant:"success",description:"Today's Sales",icon:"fe-shopping-cart",stats:127,options:{duration:2}},{id:3,variant:"info",description:"Conversion",icon:"fe-bar-chart-line",stats:.58,options:{decimalPlaces:2,duration:2,suffix:"%"}},{id:4,variant:"warning",description:"Today's Visits",icon:"fe-eye",stats:78.41,options:{decimalPlaces:2,duration:2,suffix:"k"}}]}initChart(){this._fetchChartStatistics(),this.revenuChart={series:[68],chart:{height:242,type:"radialBar"},plotOptions:{radialBar:{hollow:{size:"65%"}}},colors:["#f86262"],labels:["Revenue"]},this.salesAnalyticsChart={series:[{name:"Revenue",type:"column",data:[440,505,414,671,227,413,201,352,752,320,257,160]},{name:"Sales",type:"line",data:[23,42,35,27,43,22,17,31,22,22,12,16]}],chart:{height:378,type:"line",offsetY:10,toolbar:{show:!1}},stroke:{width:[2,3]},plotOptions:{bar:{columnWidth:"50%"}},colors:["#1abc9c","#4a81d4"],dataLabels:{enabled:!0,enabledOnSeries:[1]},labels:["01/01/2001","02/01/2001","03/01/2001","04/01/2001","05/01/2001","06/01/2001","07/01/2001","08/01/2001","09/01/2001","10/01/2001","11/01/2001","12/01/2001"],xaxis:{type:"datetime"},legend:{offsetY:7},grid:{padding:{bottom:20}},fill:{type:"gradient",gradient:{shade:"light",type:"horizontal",shadeIntensity:.25,gradientToColors:void 0,inverseColors:!0,opacityFrom:.75,opacityTo:.75,stops:[0,0,0]}},yaxis:[{title:{text:"Net Revenue"}},{opposite:!0,title:{text:"Number of Sales"}}]}}_fetchChartStatistics(){this.chartStatisticsData=[{title:"Target",stats:"$7.8k",icon:"fe-arrow-down",variant:"danger"},{title:"Last week",stats:"$1.4k",icon:"fe-arrow-up",variant:"success"},{title:"Last Month",stats:"$15k",icon:"fe-arrow-down",variant:"danger"}]}_fetchUserBalanceData(){this.userBalanceData=U}_fetchRevenueHistoryData(){this.revenueHistoryData=J}}return n.\u0275fac=function(t){return new(t||n)(e.\u0275\u0275directiveInject(r.vL))},n.\u0275cmp=e.\u0275\u0275defineComponent({type:n,selectors:[["app-dashboard-one"]],features:[e.\u0275\u0275ProvidersFeature([{provide:r.NG,useClass:ne}])],decls:126,vars:22,consts:function(){let o,t,_,D,c,O,R,N,g,m,p,u,P,C,M,T,f,B,H,h,$,y,v,G,b,I,L,X,x,F,w,z,k;return o=$localize`Dashboard`,t=$localize`Sales Report`,_=$localize`Export Report`,D=$localize`Profit`,c=$localize`Action`,O=$localize`Total Revenue`,R=$localize`Total sales made today`,N=$localize`Traditional heading elements are designed to work best in the meat of your page content.`,g=$localize`Today`,m=$localize`Weekly`,p=$localize`Monthly`,u=$localize`Sales Analytics`,P=$localize`Edit Report`,C=$localize`Export Report`,M=$localize`Action`,T=$localize`Top 5 Users Balances`,f=$localize`Profile`,B=$localize`Currency`,H=$localize`Balance`,h=$localize`Reserved in orders`,$=$localize`Action`,y=$localize`Edit Report`,v=$localize`Export Report`,G=$localize`Action`,b=$localize`Revenue History`,I=$localize`Marketplaces`,L=$localize`Date`,X=$localize`Payouts`,x=$localize`Status`,F=$localize`Action`,w=$localize`${"\ufffd0\ufffd"}:INTERPOLATION:`,z=$localize`Member Since 2017`,k=$localize`${"\ufffd0\ufffd"}:INTERPOLATION:`,[[1,"row"],[1,"col-12"],[1,"page-title-box"],[1,"page-title-right"],[1,"d-flex","align-items-center","mb-3"],[1,"input-group","input-group-sm"],["type","text","name","datepicker","id","dash-datepicker","ngbDatepicker","","autoClose","'outside'",1,"form-control","border",3,"ngModel","ngModelChange","click"],["datepicker","ngbDatepicker"],[1,"input-group-text","bg-blue","border-blue","text-white"],[1,"mdi","mdi-calendar-range"],["href","javascript: void(0);",1,"btn","btn-blue","btn-sm","ms-2"],[1,"mdi","mdi-autorenew"],["href","javascript: void(0);",1,"btn","btn-blue","btn-sm","ms-1"],[1,"mdi","mdi-filter-variant"],[1,"page-title"],o,["class","col-md-6 col-xl-3",4,"ngFor","ngForOf"],[1,"col-lg-4"],[1,"card"],[1,"card-body"],["ngbDropdown","",1,"float-end"],["href","javascript:void(0);","ngbDropdownToggle","",1,"arrow-none","card-drop"],[1,"mdi","mdi-dots-vertical"],["ngbDropdownMenu","",1,"dropdown-menu-end"],["href","javascript:void(0);","ngbDropdownItem",""],t,_,D,c,[1,"header-title","mb-0"],O,["dir","ltr",1,"widget-chart","text-center"],["id","total-revenue",1,"mt-0"],[1,"apex-charts",3,"series","chart","plotOptions","colors","labels"],[1,"text-muted","mt-0"],R,[1,"text-muted","w-75","mx-auto","sp-line-2"],N,[1,"row","mt-3"],["class","col-4",4,"ngFor","ngForOf"],[1,"col-lg-8"],[1,"card-body","pb-2"],[1,"float-end","d-none","d-md-inline-block"],[1,"btn-group","mb-2"],["type","button",1,"btn","btn-xs","btn-light"],g,m,["type","button",1,"btn","btn-xs","btn-secondary"],p,[1,"header-title","mb-3"],u,["dir","ltr"],["id","sales-analytics",1,"mt-4"],[1,"apex-charts",3,"series","chart","plotOptions","dataLabels","yaxis","legend","grid","fill","colors","labels","xaxis","stroke"],[1,"col-xl-6"],P,C,M,T,[1,"table-responsive"],[1,"table","table-borderless","table-hover","table-nowrap","table-centered","m-0"],[1,"table-light"],["colspan","2"],f,B,H,h,$,[4,"ngFor","ngForOf"],y,v,G,b,[1,"table","table-borderless","table-nowrap","table-hover","table-centered","m-0"],I,L,X,x,F,[1,"col-md-6","col-xl-3"],[3,"statisticsCardData"],[1,"col-4"],[3,"title","icon","stats","variant"],[2,"width","36px"],["alt","contact-img","title","contact-img",1,"rounded-circle","avatar-sm",3,"src"],[1,"m-0","fw-normal"],w,[1,"mb-0","text-muted"],z,["href","javascript: void(0);",1,"btn","btn-xs","btn-light"],[1,"mdi","mdi-plus"],["href","javascript: void(0);",1,"btn","btn-xs","btn-danger"],[1,"mdi","mdi-minus"],k,["class","badge bg-soft-warning text-warning",4,"ngIf"],["class","badge bg-soft-danger text-danger",4,"ngIf"],["class","badge bg-soft-success text-success",4,"ngIf"],[1,"mdi","mdi-pencil"],[1,"badge","bg-soft-warning","text-warning"],[1,"badge","bg-soft-danger","text-danger"],[1,"badge","bg-soft-success","text-success"]]},template:function(t,_){if(1&t){const D=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"form",4)(5,"div",5)(6,"input",6,7),e.\u0275\u0275listener("ngModelChange",function(O){return _.date=O})("click",function(){return e.\u0275\u0275restoreView(D),e.\u0275\u0275reference(7).toggle()}),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(8,"span",8),e.\u0275\u0275element(9,"i",9),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(10,"a",10),e.\u0275\u0275element(11,"i",11),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(12,"a",12),e.\u0275\u0275element(13,"i",13),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(14,"h4",14),e.\u0275\u0275i18n(15,15),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(16,"div",0),e.\u0275\u0275template(17,W,2,1,"div",16),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(18,"div",0)(19,"div",17)(20,"div",18)(21,"div",19)(22,"div",20)(23,"a",21),e.\u0275\u0275element(24,"i",22),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(25,"div",23)(26,"a",24),e.\u0275\u0275i18n(27,25),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(28,"a",24),e.\u0275\u0275i18n(29,26),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(30,"a",24),e.\u0275\u0275i18n(31,27),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(32,"a",24),e.\u0275\u0275i18n(33,28),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(34,"h4",29),e.\u0275\u0275i18n(35,30),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(36,"div",31)(37,"div",32),e.\u0275\u0275element(38,"apx-chart",33),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(39,"h5",34),e.\u0275\u0275i18n(40,35),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(41,"h2"),e.\u0275\u0275text(42,"$178"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(43,"p",36),e.\u0275\u0275i18n(44,37),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(45,"div",38),e.\u0275\u0275template(46,K,2,4,"div",39),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275elementStart(47,"div",40)(48,"div",18)(49,"div",41)(50,"div",42)(51,"div",43)(52,"button",44),e.\u0275\u0275i18n(53,45),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(54,"button",44),e.\u0275\u0275i18n(55,46),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(56,"button",47),e.\u0275\u0275i18n(57,48),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(58,"h4",49),e.\u0275\u0275i18n(59,50),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(60,"div",51)(61,"div",52),e.\u0275\u0275element(62,"apx-chart",53),e.\u0275\u0275elementEnd()()()()()(),e.\u0275\u0275elementStart(63,"div",0)(64,"div",54)(65,"div",18)(66,"div",19)(67,"div",20)(68,"a",21),e.\u0275\u0275element(69,"i",22),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(70,"div",23)(71,"a",24),e.\u0275\u0275i18n(72,55),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(73,"a",24),e.\u0275\u0275i18n(74,56),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(75,"a",24),e.\u0275\u0275i18n(76,57),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(77,"h4",49),e.\u0275\u0275i18n(78,58),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(79,"div",59)(80,"table",60)(81,"thead",61)(82,"tr")(83,"th",62),e.\u0275\u0275i18n(84,63),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(85,"th"),e.\u0275\u0275i18n(86,64),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(87,"th"),e.\u0275\u0275i18n(88,65),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(89,"th"),e.\u0275\u0275i18n(90,66),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(91,"th"),e.\u0275\u0275i18n(92,67),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(93,"tbody"),e.\u0275\u0275template(94,Q,22,12,"tr",68),e.\u0275\u0275elementEnd()()()()()(),e.\u0275\u0275elementStart(95,"div",54)(96,"div",18)(97,"div",19)(98,"div",20)(99,"a",21),e.\u0275\u0275element(100,"i",22),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(101,"div",23)(102,"a",24),e.\u0275\u0275i18n(103,69),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(104,"a",24),e.\u0275\u0275i18n(105,70),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(106,"a",24),e.\u0275\u0275i18n(107,71),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(108,"h4",49),e.\u0275\u0275i18n(109,72),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(110,"div",59)(111,"table",73)(112,"thead",61)(113,"tr")(114,"th"),e.\u0275\u0275i18n(115,74),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(116,"th"),e.\u0275\u0275i18n(117,75),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(118,"th"),e.\u0275\u0275i18n(119,76),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(120,"th"),e.\u0275\u0275i18n(121,77),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(122,"th"),e.\u0275\u0275i18n(123,78),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(124,"tbody"),e.\u0275\u0275template(125,te,17,11,"tr",68),e.\u0275\u0275elementEnd()()()()()()()}2&t&&(e.\u0275\u0275advance(6),e.\u0275\u0275property("ngModel",_.date),e.\u0275\u0275advance(11),e.\u0275\u0275property("ngForOf",_.statisticsCardData),e.\u0275\u0275advance(21),e.\u0275\u0275property("series",_.revenuChart.series)("chart",_.revenuChart.chart)("plotOptions",_.revenuChart.plotOptions)("colors",_.revenuChart.colors)("labels",_.revenuChart.labels),e.\u0275\u0275advance(8),e.\u0275\u0275property("ngForOf",_.chartStatisticsData),e.\u0275\u0275advance(16),e.\u0275\u0275property("series",_.salesAnalyticsChart.series)("chart",_.salesAnalyticsChart.chart)("plotOptions",_.salesAnalyticsChart.plotOptions)("dataLabels",_.salesAnalyticsChart.dataLabels)("yaxis",_.salesAnalyticsChart.yaxis)("legend",_.salesAnalyticsChart.legend)("grid",_.salesAnalyticsChart.grid)("fill",_.salesAnalyticsChart.fill)("colors",_.salesAnalyticsChart.colors)("labels",_.salesAnalyticsChart.labels)("xaxis",_.salesAnalyticsChart.xaxis)("stroke",_.salesAnalyticsChart.stroke),e.\u0275\u0275advance(32),e.\u0275\u0275property("ngForOf",_.userBalanceData),e.\u0275\u0275advance(31),e.\u0275\u0275property("ngForOf",_.revenueHistoryData))},directives:[l._Y,l.JL,l.F,r.J4,l.Fj,l.JJ,l.On,i.NgForOf,V.E,r.jt,r.iD,r.Vi,r.TH,A.x,Y.l,i.NgIf],pipes:[i.LowerCasePipe,i.DatePipe,i.CurrencyPipe],styles:[""]}),n})()}];let ae=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[d.Bz.forChild(_e)],d.Bz]}),n})(),oe=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=e.\u0275\u0275defineInjector({imports:[[i.CommonModule,l.u5,r.XC,r.M,A.X,S.y,ae]]}),n})()},35615:(j,E,s)=>{s.d(E,{l:()=>l});var i=s(5e3);let l=(()=>{class A{constructor(){}ngOnInit(){}}return A.\u0275fac=function(S){return new(S||A)},A.\u0275cmp=i.\u0275\u0275defineComponent({type:A,selectors:[["app-widget-chart-statistics"]],inputs:{title:"title",icon:"icon",stats:"stats",variant:"variant"},decls:5,vars:6,consts:[[1,"text-muted","font-15","mb-1","text-truncate"]],template:function(S,d){1&S&&(i.\u0275\u0275elementStart(0,"p",0),i.\u0275\u0275text(1),i.\u0275\u0275elementEnd(),i.\u0275\u0275elementStart(2,"h4"),i.\u0275\u0275element(3,"i"),i.\u0275\u0275text(4),i.\u0275\u0275elementEnd()),2&S&&(i.\u0275\u0275advance(1),i.\u0275\u0275textInterpolate(d.title),i.\u0275\u0275advance(2),i.\u0275\u0275classMapInterpolate2("",d.icon," text-",d.variant," me-1"),i.\u0275\u0275advance(1),i.\u0275\u0275textInterpolate(d.stats))},styles:[""]}),A})()}}]);