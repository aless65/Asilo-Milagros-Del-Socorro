"use strict";(self.webpackChunkubold_angular=self.webpackChunkubold_angular||[]).push([[9970],{89970:(N,m,d)=>{d.r(m),d.d(m,{ListModule:()=>M});var l=d(69808),s=d(52382),c=d(59182),u=d(1413),p=d(29095),f=d(4521),e=d(5e3),h=d(22313),b=d(40520);let v=(()=>{class a{constructor(t){this.http=t,this.Url="http://asilomilagrosdelsocorro.somee.com/api/"}getEnfermedades(){return this.http.get(`${this.Url}Enfermedades/Listado`)}addEnfermedades(t){return this.http.post(`${this.Url}Enfermedades/Insertar`,t)}editEnfermedades(t){return this.http.put(`${this.Url}Enfermedades/Editar`,t)}deleteEnfermedades(t){return this.http.put(`${this.Url}Enfermedades/Eliminar?id=${t}`,null)}}return a.\u0275fac=function(t){return new(t||a)(e.\u0275\u0275inject(b.eN))},a.\u0275prov=e.\u0275\u0275defineInjectable({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var _=d(39475),g=d(59699);const E=["advancedTable"],C=["content"],y=["deleteEnfermedadModal"];function L(a,o){1&a&&(e.\u0275\u0275elementStart(0,"div",24),e.\u0275\u0275text(1," Nombre requerido "),e.\u0275\u0275elementEnd())}const w=function(a){return{"is-invalid":a}};function S(a,o){if(1&a){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",11)(1,"h4",12),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"button",13),e.\u0275\u0275listener("click",function(){return e.\u0275\u0275restoreView(t).$implicit.dismiss("")}),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(4,"div",14)(5,"form",15,16),e.\u0275\u0275listener("ngSubmit",function(){return e.\u0275\u0275restoreView(t),e.\u0275\u0275nextContext().submitForm()}),e.\u0275\u0275elementStart(7,"div",17)(8,"label",18),e.\u0275\u0275text(9,"Nombre"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(10,"input",19),e.\u0275\u0275template(11,L,2,0,"div",20),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(12,"div",21),e.\u0275\u0275element(13,"button",22),e.\u0275\u0275elementStart(14,"button",23),e.\u0275\u0275listener("click",function(){return e.\u0275\u0275restoreView(t).$implicit.close("")}),e.\u0275\u0275text(15,"Cancelar"),e.\u0275\u0275elementEnd()()()()}if(2&a){const t=e.\u0275\u0275reference(6),n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate(n.esEditar?"Editar enfermedad":"Agregar enfermedad"),e.\u0275\u0275advance(3),e.\u0275\u0275property("formGroup",n.newEnfermedad),e.\u0275\u0275advance(5),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction1(5,w,t.submitted&&n.form1.name.invalid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",t.submitted&&n.form1.name.invalid),e.\u0275\u0275advance(2),e.\u0275\u0275property("innerText",n.esEditar?"Editar":"Agregar")}}function I(a,o){if(1&a){const t=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"div",11)(1,"h4",12),e.\u0275\u0275text(2,"Eliminar enfermedad"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"button",13),e.\u0275\u0275listener("click",function(){return e.\u0275\u0275restoreView(t).$implicit.dismiss("")}),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(4,"div",14)(5,"p"),e.\u0275\u0275text(6,"\xbfRealmente desea eliminar esta enfermedad?"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(7,"div",21)(8,"button",25),e.\u0275\u0275listener("click",function(){return e.\u0275\u0275restoreView(t),e.\u0275\u0275nextContext().deleteEnfermedad()}),e.\u0275\u0275text(9,"Eliminar"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"button",23),e.\u0275\u0275listener("click",function(){return e.\u0275\u0275restoreView(t).$implicit.close("")}),e.\u0275\u0275text(11,"Cancelar"),e.\u0275\u0275elementEnd()()()}}const x=[{path:"",component:(()=>{class a{constructor(t,n,r,i){this.sanitizer=t,this.activeModal=n,this.fb=r,this.service=i,this.pageTitle=[],this.enfermedades=[],this.columns=[]}ngOnInit(){this.pageTitle=[{label:"Inicio",path:"/"},{label:"Enfermedades",path:"/",active:!0}],this._fetchData(),this.initAdvancedTableData(),this.newEnfermedad=this.fb.group({name:["",s.kI.required]})}get form1(){return this.newEnfermedad.controls}openModal(t){"new"===t?(this.newEnfermedad.reset(),this.esEditar=!1):this.esEditar=!0,this.activeModal.open(this.content,{centered:!0})}openModalDelete(){this.activeModal.open(this.deleteEnfermedadModal,{centered:!0,windowClass:"delete-modal"})}deleteEnfermedad(){this.service.deleteEnfermedades(this.selectedEnfermedad.enfe_Id||0).subscribe(t=>{console.log("se pudo:",t),this._fetchData()},t=>{console.log("no se pudo:",t)}),this._fetchData(),this.activeModal.dismissAll("")}submitForm(){var t;if(this.newEnfermedad.invalid)return void console.log("pipi");const n={enfe_Id:(null===(t=this.selectedEnfermedad)||void 0===t?void 0:t.enfe_Id)||0,enfe_Nombre:this.newEnfermedad.value.name,enfe_UsuCreacion:1,enfe_UsuModificacion:1};this.esEditar?this.service.editEnfermedades(n).subscribe(r=>{console.log("se pudo:",r),this._fetchData()},r=>{console.log("no se pudo:",r)}):this.service.addEnfermedades(n).subscribe(r=>{console.log("se pudo:",r),this._fetchData()},r=>{console.log("no se pudo:",r)}),this.activeModal.dismissAll("")}_fetchData(){this.service.getEnfermedades().subscribe(t=>{this.enfermedades=t.data,console.log(this.enfermedades)})}initAdvancedTableData(){console.log(this.enfermedades),this.columns=[{name:"enfe_Id",label:"ID",formatter:t=>t.enfe_Id},{name:"enfe_Nombre",label:"Nombre",formatter:t=>t.enfe_Nombre},{name:"Action",label:"Acciones",width:82,formatter:this.enfermedadActionFormatter.bind(this)}]}handleTableLoad(t){document.querySelectorAll(".edit").forEach(n=>{n.addEventListener("click",()=>{const r=Number(n.id);this.selectedEnfermedad=this.enfermedades.find(i=>i.enfe_Id===r)||this.selectedEnfermedad,this.selectedEnfermedad&&(this.newEnfermedad=this.fb.group({name:[this.selectedEnfermedad.enfe_Nombre||"",s.kI.required]}),this.openModal("edit"))})}),document.querySelectorAll(".delete").forEach(n=>{n.addEventListener("click",()=>{const r=Number(n.id);this.selectedEnfermedad=this.enfermedades.find(i=>i.enfe_Id===r)||this.selectedEnfermedad,this.selectedEnfermedad&&(this.newEnfermedad=this.fb.group({name:[this.selectedEnfermedad.enfe_Nombre||"",s.kI.required]}),this.openModalDelete())})})}enfermedadNameFormatter(t){return this.sanitizer.bypassSecurityTrustHtml(`\n      <div class="table-user">\n      <a href="javascript:void(0);" class="customer text-body fw-semibold" id="${t.enfe_Id}">${t.enfe_Nombre}</a>\n      </div>\n      `)}enfermedadActionFormatter(t){return this.sanitizer.bypassSecurityTrustHtml(` <a href="javascript:void(0);" class="edit action-icon" id="${t.enfe_Id}"> <i class="mdi mdi-square-edit-outline" ></i></a>\n        <a href="javascript:void(0);" class="delete action-icon" id="${t.enfe_Id}"> <i class="mdi mdi-delete"></i></a>`)}matches(t,n){var r,i;return(null===(r=t.enfe_Id)||void 0===r?void 0:r.toString().includes(n))||(null===(i=t.enfe_Nombre)||void 0===i?void 0:i.toLowerCase().includes(n))}searchData(t){if(""===t)this._fetchData();else{let n=this.enfermedades;n=n.filter(r=>this.matches(r,t)),this.enfermedades=n}}}return a.\u0275fac=function(t){return new(t||a)(e.\u0275\u0275directiveInject(h.DomSanitizer),e.\u0275\u0275directiveInject(c.FF),e.\u0275\u0275directiveInject(s.qu),e.\u0275\u0275directiveInject(v))},a.\u0275cmp=e.\u0275\u0275defineComponent({type:a,selectors:[["app-enfermedades-list"]],viewQuery:function(t,n){if(1&t&&(e.\u0275\u0275viewQuery(E,5),e.\u0275\u0275viewQuery(C,7),e.\u0275\u0275viewQuery(y,7)),2&t){let r;e.\u0275\u0275queryRefresh(r=e.\u0275\u0275loadQuery())&&(n.advancedTable=r.first),e.\u0275\u0275queryRefresh(r=e.\u0275\u0275loadQuery())&&(n.content=r.first),e.\u0275\u0275queryRefresh(r=e.\u0275\u0275loadQuery())&&(n.deleteEnfermedadModal=r.first)}},decls:15,vars:7,consts:[["title","Enfermedades",3,"breadcrumbItems"],[1,"row"],[1,"card"],[1,"card-body"],[1,"row","justify-content-between","mb-2"],[1,"col-12"],["type","button",1,"btn","btn-danger","waves-effect","waves-light","mb-2",3,"click"],["tableClasses","table-centered table-nowrap table-hover",3,"tableData","columns","pagination","isSearchable","hasRowSelection","isSortable","handleTableLoad","search"],["advancedTable",""],["content",""],["deleteEnfermedadModal",""],[1,"modal-header","bg-light"],["id","myCenterModalLabel",1,"modal-title"],["type","button","aria-label","Close",1,"btn-close",3,"click"],[1,"modal-body","p-4"],[3,"formGroup","ngSubmit"],["addEnfermedad","ngForm"],[1,"mb-3"],["for","name",1,"form-label"],["type","text","id","name","placeholder","Nombre","required","","formControlName","name",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],[1,"text-end"],["type","submit",1,"btn","btn-success","waves-effect","waves-light","me-1",3,"innerText"],["type","button",1,"btn","btn-danger","waves-effect","waves-light",3,"click"],[1,"invalid-feedback"],["type","button",1,"btn","btn-success","waves-effect","waves-light","me-1",3,"click"]],template:function(t,n){1&t&&(e.\u0275\u0275element(0,"app-page-title",0),e.\u0275\u0275elementStart(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div")(7,"button",6),e.\u0275\u0275listener("click",function(){return n.openModal("new")}),e.\u0275\u0275text(8,"Agregar"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(9,"app-advanced-table",7,8),e.\u0275\u0275listener("handleTableLoad",function(i){return n.handleTableLoad(i)})("search",function(i){return n.searchData(i)}),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275template(11,S,16,7,"ng-template",null,9,e.\u0275\u0275templateRefExtractor),e.\u0275\u0275template(13,I,12,0,"ng-template",null,10,e.\u0275\u0275templateRefExtractor)),2&t&&(e.\u0275\u0275property("breadcrumbItems",n.pageTitle),e.\u0275\u0275advance(9),e.\u0275\u0275property("tableData",n.enfermedades)("columns",n.columns)("pagination",!0)("isSearchable",!0)("hasRowSelection",!1)("isSortable",!1))},directives:[_.T,g.j,s._Y,s.JL,s.sg,s.Fj,s.Q7,s.JJ,s.u,l.NgClass,l.NgIf],styles:[""]}),a})()}];let T=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[[f.Bz.forChild(x)],f.Bz]}),a})(),M=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[[l.CommonModule,s.u5,c.jF,u.$,p.p,T,s.UX,c.bz]]}),a})()}}]);