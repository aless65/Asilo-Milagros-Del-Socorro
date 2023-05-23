"use strict";(self.webpackChunkubold_angular=self.webpackChunkubold_angular||[]).push([[5362],{25362:(T,h,s)=>{s.r(h),s.d(h,{ListModule:()=>D});var v=s(69808),o=s(52382),c=s(59182),b=s(1413),f=s(29095),m=s(4521),e=s(5e3),g=s(22313),S=s(40520);let y=(()=>{class i{constructor(t){this.http=t,this.Url="http://asilomilagrosdelsocorro.somee.com/api/"}getResidentes(){return this.http.get(`${this.Url}Residentes/Listado`)}}return i.\u0275fac=function(t){return new(t||i)(e.\u0275\u0275inject(S.eN))},i.\u0275prov=e.\u0275\u0275defineInjectable({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var L=s(39475),I=s(59699);const x=["advancedTable"],C=["content"],R=[{path:"",component:(()=>{class i{constructor(t,n,a,r,d){this.sanitizer=t,this.activeModal=n,this.fb=a,this.service=r,this.route=d,this.pageTitle=[],this.residentes=[],this.columns=[]}ngOnInit(){this.pageTitle=[{label:"Residentes",path:"/"},{label:"Listado",path:"/",active:!0}],this._fetchData(),this.initAdvancedTableData(),this.selectedResidente=this.residentes[0],this.newContact=this.fb.group({name:["",o.kI.required],email:["",[o.kI.required,o.kI.email]],phone:["",o.kI.required],location:["",o.kI.required]})}get form1(){return this.newContact.controls}openCreate(){this.route.navigate(["apps/residentes/create"])}_fetchData(){this.service.getResidentes().subscribe(t=>{this.residentes=t.data,console.log(this.residentes),this.selectedResidente=this.residentes[0],this.age=this.calculateAge(this.selectedResidente.resi_Nacimiento||"")})}calculateAge(t){if(!t)return null;const n=new Date,a=new Date(t);return n.getFullYear()-a.getFullYear()}initAdvancedTableData(){this.columns=[{name:"name",label:"Nombres",formatter:this.residenteNameFormatter.bind(this)},{name:"resi_Identidad",label:"Identidad",formatter:t=>t.resi_Identidad},{name:"resi_Nacimiento",label:"Nacimiento",formatter:t=>new Date(t.resi_Nacimiento||"").toLocaleDateString()},{name:"sexoDes",label:"Sexo",formatter:t=>t.sexoDes},{name:"Action",label:"Acciones",width:82,formatter:this.residenteActionFormatter.bind(this),sort:!1}]}handleTableLoad(t){document.querySelectorAll(".residente").forEach(n=>{n.addEventListener("click",()=>{this.selectedResidente=this.residentes[Number(n.id)-1],this.age=this.calculateAge(this.selectedResidente.resi_Nacimiento||"")})}),document.querySelectorAll(".action-icon").forEach(n=>{n.addEventListener("click",()=>{console.log("le dio"),console.log(this.residentes)})})}residenteNameFormatter(t){return this.sanitizer.bypassSecurityTrustHtml(`\n      <div class="table-user">\n      <img src="${t.expe_Fotografia}" alt="table-user" class="me-2 rounded-circle">\n       <a href="javascript:void(0);" class="residente text-body fw-semibold" id="${t.resi_Id}">${t.resi_Nombres} ${t.resi_Apellidos}</a>\n       </div>\n      `)}residenteActionFormatter(){return this.sanitizer.bypassSecurityTrustHtml(' <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-square-edit-outline"></i></a>\n        <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>')}matches(t,n){var a,r,d,u,p;return(null===(a=t.resi_Apellidos)||void 0===a?void 0:a.toLowerCase().includes(n))||(null===(r=t.resi_Nombres)||void 0===r?void 0:r.toLowerCase().includes(n))||(null===(d=t.resi_FechaIngreso)||void 0===d?void 0:d.toLowerCase().includes(n))||(null===(u=t.resi_Identidad)||void 0===u?void 0:u.toLowerCase().includes(n))||(null===(p=t.resi_Sexo)||void 0===p?void 0:p.toLocaleLowerCase().includes(n))}searchData(t){if(""===t)this._fetchData();else{let n=this.residentes;n=n.filter(a=>this.matches(a,t)),this.residentes=n}}}return i.\u0275fac=function(t){return new(t||i)(e.\u0275\u0275directiveInject(g.DomSanitizer),e.\u0275\u0275directiveInject(c.FF),e.\u0275\u0275directiveInject(o.qu),e.\u0275\u0275directiveInject(y),e.\u0275\u0275directiveInject(m.F0))},i.\u0275cmp=e.\u0275\u0275defineComponent({type:i,selectors:[["app-residentes-list"]],viewQuery:function(t,n){if(1&t&&(e.\u0275\u0275viewQuery(x,5),e.\u0275\u0275viewQuery(C,7)),2&t){let a;e.\u0275\u0275queryRefresh(a=e.\u0275\u0275loadQuery())&&(n.advancedTable=a.first),e.\u0275\u0275queryRefresh(a=e.\u0275\u0275loadQuery())&&(n.content=a.first)}},decls:48,vars:18,consts:[["title","Residentes",3,"breadcrumbItems"],[1,"row"],[1,"col-lg-8"],[1,"card"],[1,"card-body"],[1,"row","justify-content-between","mb-2"],[1,"col-12"],["type","button",1,"btn","btn-success","waves-effect","waves-light","mb-2","float-end"],[1,"mdi","mdi-cog"],["type","button",1,"btn","btn-danger","waves-effect","waves-light","mb-2",3,"click"],["tableClasses","table-centered table-nowrap table-hover",3,"tableData","columns","pagination","isSearchable","hasRowSelection","isSortable","handleTableLoad","search"],["advancedTable",""],[1,"col-lg-4"],[1,"d-flex","align-items-start","mb-3"],["alt","Generic placeholder image",1,"d-flex","me-3","rounded-circle","avatar-lg",3,"src"],[1,"w-100"],[1,"mt-0","mb-1"],[1,"text-muted"],[1,"mdi","mdi-office-building"],["href","javascript: void(0);",1,"btn","btn-xs","btn-info","me-1"],[1,"mb-3","mt-4","text-uppercase","bg-light","p-2"],[1,"mdi","mdi-account-circle","me-1"],[1,""],[1,"font-13","text-muted","text-uppercase"],[1,"mb-3"],[1,"font-13","text-muted","text-uppercase","mb-1"]],template:function(t,n){1&t&&(e.\u0275\u0275element(0,"app-page-title",0),e.\u0275\u0275elementStart(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6)(7,"div")(8,"button",7),e.\u0275\u0275element(9,"i",8),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"button",9),e.\u0275\u0275listener("click",function(){return n.openCreate()}),e.\u0275\u0275text(11,"Agregar"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(12,"app-advanced-table",10,11),e.\u0275\u0275listener("handleTableLoad",function(r){return n.handleTableLoad(r)})("search",function(r){return n.searchData(r)}),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(14,"div",12)(15,"div",3)(16,"div",4)(17,"div",13),e.\u0275\u0275element(18,"img",14),e.\u0275\u0275elementStart(19,"div",15)(20,"h4",16),e.\u0275\u0275text(21),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(22,"p",17),e.\u0275\u0275text(23),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(24,"p",17),e.\u0275\u0275element(25,"i",18),e.\u0275\u0275text(26),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(27,"a",19),e.\u0275\u0275text(28,"Ver Historial"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(29,"h5",20),e.\u0275\u0275element(30,"i",21),e.\u0275\u0275text(31," Informaci\xf3n Del Expediente"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(32,"div",22)(33,"h4",23),e.\u0275\u0275text(34,"Tipo de Sangre :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(35,"p",24),e.\u0275\u0275text(36),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(37,"h4",25),e.\u0275\u0275text(38,"Edad :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(39,"p",24),e.\u0275\u0275text(40),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(41,"h4",25),e.\u0275\u0275text(42,"Enfermedades :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(43,"h4",25),e.\u0275\u0275text(44,"Apertura del expediente :"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(45,"p",24),e.\u0275\u0275text(46),e.\u0275\u0275pipe(47,"date"),e.\u0275\u0275elementEnd()()()()()()),2&t&&(e.\u0275\u0275property("breadcrumbItems",n.pageTitle),e.\u0275\u0275advance(12),e.\u0275\u0275property("tableData",n.residentes)("columns",n.columns)("pagination",!0)("isSearchable",!0)("hasRowSelection",!1)("isSortable",!1),e.\u0275\u0275advance(6),e.\u0275\u0275property("src",n.selectedResidente.expe_Fotografia,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate2("",n.selectedResidente.resi_Nombres," ",n.selectedResidente.resi_Apellidos,""),e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(n.selectedResidente.sexoDes),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(n.selectedResidente.cent_Nombre),e.\u0275\u0275advance(10),e.\u0275\u0275textInterpolate(n.selectedResidente.tiposang_Nombre),e.\u0275\u0275advance(4),e.\u0275\u0275textInterpolate(n.age),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate(e.\u0275\u0275pipeBind2(47,15,n.selectedResidente.expe_FechaApertura,"dd/MM/yyyy")))},directives:[L.T,I.j],pipes:[v.DatePipe],styles:[""]}),i})()}];let E=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.\u0275\u0275defineNgModule({type:i}),i.\u0275inj=e.\u0275\u0275defineInjector({imports:[[m.Bz.forChild(R)],m.Bz]}),i})(),D=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.\u0275\u0275defineNgModule({type:i}),i.\u0275inj=e.\u0275\u0275defineInjector({imports:[[v.CommonModule,o.u5,o.UX,c.bz,b.$,f.p,E,c.jF]]}),i})()}}]);