"use strict";(self.webpackChunkubold_angular=self.webpackChunkubold_angular||[]).push([[2024],{52024:(f,p,i)=>{i.r(p),i.d(p,{CheckoutModule:()=>P});var t=i(69808),v=i(47071),m=i(59182),d=i(29095),c=i(4521),e=i(5e3),o=i(39475),u=i(52382);const r=function(){return["../shopping-cart"]};let s=(()=>{class l{constructor(){}ngOnInit(){this.countries=[{label:"Afghanistan",value:"AF"},{label:"\xc5land Islands",value:"AX"},{label:"Albania",value:"AL"},{label:"Algeria",value:"DZ"},{label:"American Samoa",value:"AS"},{label:"AndorrA",value:"AD"},{label:"Angola",value:"AO"},{label:"Anguilla",value:"AI"},{label:"Antarctica",value:"AQ"},{label:"Antigua and Barbuda",value:"AG"},{label:"Argentina",value:"AR"},{label:"Armenia",value:"AM"},{label:"Aruba",value:"AW"},{label:"Australia",value:"AU"},{label:"Austria",value:"AT"},{label:"Azerbaijan",value:"AZ"},{label:"Bahamas",value:"BS"},{label:"Bahrain",value:"BH"},{label:"Bangladesh",value:"BD"},{label:"Barbados",value:"BB"},{label:"Belarus",value:"BY"},{label:"Belgium",value:"BE"},{label:"Belize",value:"BZ"},{label:"Benin",value:"BJ"},{label:"Bermuda",value:"BM"},{label:"Bhutan",value:"BT"},{label:"Bolivia",value:"BO"},{label:"Bosnia and Herzegovina",value:"BA"},{label:"Botswana",value:"BW"},{label:"Bouvet Island",value:"BV"},{label:"Brazil",value:"BR"},{label:"British Indian Ocean Territory",value:"IO"},{label:"Brunei Darussalam",value:"BN"},{label:"Bulgaria",value:"BG"},{label:"Burkina Faso",value:"BF"},{label:"Burundi",value:"BI"},{label:"Cambodia",value:"KH"},{label:"Cameroon",value:"CM"},{label:"Canada",value:"CA"},{label:"Cape Verde",value:"CV"},{label:"Cayman Islands",value:"KY"},{label:"Central African Republic",value:"CF"},{label:"Chad",value:"TD"},{label:"Chile",value:"CL"},{label:"China",value:"CN"},{label:"Christmas Island",value:"CX"},{label:"Cocos (Keeling) Islands",value:"CC"},{label:"Colombia",value:"CO"},{label:"Comoros",value:"KM"},{label:"Congo",value:"CG"},{label:"Congo, The Democratic Republic of the",value:"CD"},{label:"Cook Islands",value:"CK"},{label:"Costa Rica",value:"CR"},{label:"Cote D'Ivoire",value:"CI"},{label:"Croatia",value:"HR"},{label:"Cuba",value:"CU"},{label:"Cyprus",value:"CY"},{label:"Czech Republic",value:"CZ"},{label:"Denmark",value:"DK"},{label:"Djibouti",value:"DJ"},{label:"Dominica",value:"DM"},{label:"Dominican Republic",value:"DO"},{label:"Ecuador",value:"EC"},{label:"Egypt",value:"EG"},{label:"El Salvador",value:"SV"},{label:"Equatorial Guinea",value:"GQ"},{label:"Eritrea",value:"ER"},{label:"Estonia",value:"EE"},{label:"Ethiopia",value:"ET"},{label:"Falkland Islands (Malvinas)",value:"FK"},{label:"Faroe Islands",value:"FO"},{label:"Fiji",value:"FJ"},{label:"Finland",value:"FI"},{label:"France",value:"FR"},{label:"French Guiana",value:"GF"},{label:"French Polynesia",value:"PF"},{label:"French Southern Territories",value:"TF"},{label:"Gabon",value:"GA"},{label:"Gambia",value:"GM"},{label:"Georgia",value:"GE"},{label:"Germany",value:"DE"},{label:"Ghana",value:"GH"},{label:"Gibraltar",value:"GI"},{label:"Greece",value:"GR"},{label:"Greenland",value:"GL"},{label:"Grenada",value:"GD"},{label:"Guadeloupe",value:"GP"},{label:"Guam",value:"GU"},{label:"Guatemala",value:"GT"},{label:"Guernsey",value:"GG"},{label:"Guinea",value:"GN"},{label:"Guinea-Bissau",value:"GW"},{label:"Guyana",value:"GY"},{label:"Haiti",value:"HT"},{label:"Heard Island and Mcdonald Islands",value:"HM"},{label:"Holy See (Vatican City State)",value:"VA"},{label:"Honduras",value:"HN"},{label:"Hong Kong",value:"HK"},{label:"Hungary",value:"HU"},{label:"Iceland",value:"IS"},{label:"India",value:"IN"},{label:"Indonesia",value:"ID"},{label:"Iran, Islamic Republic Of",value:"IR"},{label:"Iraq",value:"IQ"},{label:"Ireland",value:"IE"},{label:"Isle of Man",value:"IM"},{label:"Israel",value:"IL"},{label:"Italy",value:"IT"},{label:"Jamaica",value:"JM"},{label:"Japan",value:"JP"},{label:"Jersey",value:"JE"},{label:"Jordan",value:"JO"},{label:"Kazakhstan",value:"KZ"},{label:"Kenya",value:"KE"},{label:"Kiribati",value:"KI"},{label:"Korea, Democratic People'S Republic of",value:"KP"},{label:"Korea, Republic of",value:"KR"},{label:"Kuwait",value:"KW"},{label:"Kyrgyzstan",value:"KG"},{label:"Lao People'S Democratic Republic",value:"LA"},{label:"Latvia",value:"LV"},{label:"Lebanon",value:"LB"},{label:"Lesotho",value:"LS"},{label:"Liberia",value:"LR"},{label:"Libyan Arab Jamahiriya",value:"LY"},{label:"Liechtenstein",value:"LI"},{label:"Lithuania",value:"LT"},{label:"Luxembourg",value:"LU"},{label:"Macao",value:"MO"},{label:"Macedonia, The Former Yugoslav Republic of",value:"MK"},{label:"Madagascar",value:"MG"},{label:"Malawi",value:"MW"},{label:"Malaysia",value:"MY"},{label:"Maldives",value:"MV"},{label:"Mali",value:"ML"},{label:"Malta",value:"MT"},{label:"Marshall Islands",value:"MH"},{label:"Martinique",value:"MQ"},{label:"Mauritania",value:"MR"},{label:"Mauritius",value:"MU"},{label:"Mayotte",value:"YT"},{label:"Mexico",value:"MX"},{label:"Micronesia, Federated States of",value:"FM"},{label:"Moldova, Republic of",value:"MD"},{label:"Monaco",value:"MC"},{label:"Mongolia",value:"MN"},{label:"Montserrat",value:"MS"},{label:"Morocco",value:"MA"},{label:"Mozambique",value:"MZ"},{label:"Myanmar",value:"MM"},{label:"Namibia",value:"NA"},{label:"Nauru",value:"NR"},{label:"Nepal",value:"NP"},{label:"Netherlands",value:"NL"},{label:"Netherlands Antilles",value:"AN"},{label:"New Caledonia",value:"NC"},{label:"New Zealand",value:"NZ"},{label:"Nicaragua",value:"NI"},{label:"Niger",value:"NE"},{label:"Nigeria",value:"NG"},{label:"Niue",value:"NU"},{label:"Norfolk Island",value:"NF"},{label:"Northern Mariana Islands",value:"MP"},{label:"Norway",value:"NO"},{label:"Oman",value:"OM"},{label:"Pakistan",value:"PK"},{label:"Palau",value:"PW"},{label:"Palestinian Territory, Occupied",value:"PS"},{label:"Panama",value:"PA"},{label:"Papua New Guinea",value:"PG"},{label:"Paraguay",value:"PY"},{label:"Peru",value:"PE"},{label:"Philippines",value:"PH"},{label:"Pitcairn",value:"PN"},{label:"Poland",value:"PL"},{label:"Portugal",value:"PT"},{label:"Puerto Rico",value:"PR"},{label:"Qatar",value:"QA"},{label:"Reunion",value:"RE"},{label:"Romania",value:"RO"},{label:"Russian Federation",value:"RU"},{label:"RWANDA",value:"RW"},{label:"Saint Helena",value:"SH"},{label:"Saint Kitts and Nevis",value:"KN"},{label:"Saint Lucia",value:"LC"},{label:"Saint Pierre and Miquelon",value:"PM"},{label:"Saint Vincent and the Grenadines",value:"VC"},{label:"Samoa",value:"WS"},{label:"San Marino",value:"SM"},{label:"Sao Tome and Principe",value:"ST"},{label:"Saudi Arabia",value:"SA"},{label:"Senegal",value:"SN"},{label:"Serbia and Montenegro",value:"CS"},{label:"Seychelles",value:"SC"},{label:"Sierra Leone",value:"SL"},{label:"Singapore",value:"SG"},{label:"Slovakia",value:"SK"},{label:"Slovenia",value:"SI"},{label:"Solomon Islands",value:"SB"},{label:"Somalia",value:"SO"},{label:"South Africa",value:"ZA"},{label:"South Georgia and the South Sandwich Islands",value:"GS"},{label:"Spain",value:"ES"},{label:"Sri Lanka",value:"LK"},{label:"Sudan",value:"SD"},{label:"Suriname",value:"SR"},{label:"Svalbard and Jan Mayen",value:"SJ"},{label:"Swaziland",value:"SZ"},{label:"Sweden",value:"SE"},{label:"Switzerland",value:"CH"},{label:"Syrian Arab Republic",value:"SY"},{label:"Taiwan, Province of China",value:"TW"},{label:"Tajikistan",value:"TJ"},{label:"Tanzania, United Republic of",value:"TZ"},{label:"Thailand",value:"TH"},{label:"Timor-Leste",value:"TL"},{label:"Togo",value:"TG"},{label:"Tokelau",value:"TK"},{label:"Tonga",value:"TO"},{label:"Trinidad and Tobago",value:"TT"},{label:"Tunisia",value:"TN"},{label:"Turkey",value:"TR"},{label:"Turkmenistan",value:"TM"},{label:"Turks and Caicos Islands",value:"TC"},{label:"Tuvalu",value:"TV"},{label:"Uganda",value:"UG"},{label:"Ukraine",value:"UA"},{label:"United Arab Emirates",value:"AE"},{label:"United Kingdom",value:"GB"},{label:"United States",value:"US"},{label:"United States Minor Outlying Islands",value:"UM"},{label:"Uruguay",value:"UY"},{label:"Uzbekistan",value:"UZ"},{label:"Vanuatu",value:"VU"},{label:"Venezuela",value:"VE"},{label:"Viet Nam",value:"VN"},{label:"Virgin Islands, British",value:"VG"},{label:"Virgin Islands, U.S.",value:"VI"},{label:"Wallis and Futuna",value:"WF"},{label:"Western Sahara",value:"EH"},{label:"Yemen",value:"YE"},{label:"Zambia",value:"ZM"},{label:"Zimbabwe",value:"ZW"}]}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["app-checkout-billing"]],decls:82,vars:3,consts:[[1,"header-title"],[1,"sub-header"],[1,"row"],[1,"col-md-6"],[1,"mb-3"],["for","billing-first-name",1,"form-label"],["type","text","placeholder","Enter your first name","id","billing-first-name",1,"form-control"],["for","billing-last-name",1,"form-label"],["type","text","placeholder","Enter your last name","id","billing-last-name",1,"form-control"],["for","billing-email-address",1,"form-label"],[1,"text-danger"],["type","email","placeholder","Enter your email","id","billing-email-address",1,"form-control"],["for","billing-phone",1,"form-label"],["type","text","placeholder","(xx) xxx xxxx xxx","id","billing-phone",1,"form-control"],[1,"col-12"],["for","billing-address",1,"form-label"],["type","text","placeholder","Enter full address","id","billing-address",1,"form-control"],[1,"col-md-4"],["for","billing-town-city",1,"form-label"],["type","text","placeholder","Enter your city name","id","billing-town-city",1,"form-control"],["for","billing-state",1,"form-label"],["type","text","placeholder","Enter your state","id","billing-state",1,"form-control"],["for","billing-zip-postal",1,"form-label"],["type","text","placeholder","Enter your zip code","id","billing-zip-postal",1,"form-control"],[1,"form-label"],["placeholder","Select Country","id","selec2-2",3,"data"],["country",""],[1,"form-check"],["type","checkbox","id","customCheck2",1,"form-check-input"],["for","customCheck2",1,"form-check-label"],[1,"my-3"],["for","example-textarea",1,"form-label"],["id","example-textarea","rows","3","placeholder","Write some note..",1,"form-control"],[1,"row","mt-4"],[1,"col-sm-6"],[1,"btn","btn-secondary",3,"routerLink"],[1,"mdi","mdi-arrow-left"],[1,"text-sm-end","mt-2","mt-sm-0"],["href","javacript:void(0)",1,"btn","btn-success"],[1,"mdi","mdi-truck-fast","me-1"]],template:function(a,b){1&a&&(e.\u0275\u0275elementStart(0,"div")(1,"h4",0),e.\u0275\u0275text(2,"Billing Information"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"p",1),e.\u0275\u0275text(4,"Fill the form below in order to send you the order's invoice."),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"form")(6,"div",2)(7,"div",3)(8,"div",4)(9,"label",5),e.\u0275\u0275text(10,"First Name"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(11,"input",6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(12,"div",3)(13,"div",4)(14,"label",7),e.\u0275\u0275text(15,"Last Name"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(16,"input",8),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(17,"div",2)(18,"div",3)(19,"div",4)(20,"label",9),e.\u0275\u0275text(21,"Email Address "),e.\u0275\u0275elementStart(22,"span",10),e.\u0275\u0275text(23,"*"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(24,"input",11),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(25,"div",3)(26,"div",4)(27,"label",12),e.\u0275\u0275text(28,"Phone "),e.\u0275\u0275elementStart(29,"span",10),e.\u0275\u0275text(30,"*"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(31,"input",13),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(32,"div",2)(33,"div",14)(34,"div",4)(35,"label",15),e.\u0275\u0275text(36,"Address"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(37,"input",16),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(38,"div",2)(39,"div",17)(40,"div",4)(41,"label",18),e.\u0275\u0275text(42,"Town / City"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(43,"input",19),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(44,"div",17)(45,"div",4)(46,"label",20),e.\u0275\u0275text(47,"State"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(48,"input",21),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(49,"div",17)(50,"div",4)(51,"label",22),e.\u0275\u0275text(52,"Zip Code"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(53,"input",23),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(54,"div",2)(55,"div",14)(56,"div",4)(57,"label",24),e.\u0275\u0275text(58,"Country"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(59,"select2",25,26),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(61,"div",2)(62,"div",14)(63,"div",4)(64,"div",27),e.\u0275\u0275element(65,"input",28),e.\u0275\u0275elementStart(66,"label",29),e.\u0275\u0275text(67,"Ship to different address ?"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(68,"div",30)(69,"label",31),e.\u0275\u0275text(70,"Order Notes:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(71,"textarea",32),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(72,"div",33)(73,"div",34)(74,"a",35),e.\u0275\u0275element(75,"i",36),e.\u0275\u0275text(76," Back to Shopping Cart "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(77,"div",34)(78,"div",37)(79,"a",38),e.\u0275\u0275element(80,"i",39),e.\u0275\u0275text(81," Proceed to Shipping "),e.\u0275\u0275elementEnd()()()()()()),2&a&&(e.\u0275\u0275advance(59),e.\u0275\u0275property("data",b.countries),e.\u0275\u0275advance(15),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(2,r)))},directives:[u._Y,u.JL,u.F,v.ub,c.yS],styles:[""]}),l})();const S=function(){return["../shopping-cart"]};let g=(()=>{class l{constructor(){}ngOnInit(){}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["app-checkout-shipping"]],decls:82,vars:2,consts:[[1,"header-title"],[1,"sub-header"],[1,"row"],[1,"col-md-6"],[1,"border","p-3","rounded","mb-3","mb-md-0"],[1,"float-end"],["href","javascript:void(0)"],[1,"mdi","mdi-square-edit-outline","text-muted","font-20"],[1,"form-check"],["type","radio","id","customRadio1","name","customRadio","checked","",1,"form-check-input"],["for","customRadio1",1,"form-check-label","font-16","fw-bold"],[1,"mt-3"],[1,"mb-2"],[1,"fw-semibold","me-2"],[1,"mb-0"],["type","radio","id","customRadio2","name","customRadio",1,"form-check-input"],["for","customRadio2",1,"form-check-label","font-16","fw-bold"],[1,"header-title","mt-4"],[1,"text-muted","mb-3"],[1,"col-md-12"],[1,"border","p-3","rounded","mb-3"],["type","radio","id","shippingMethodRadio1","name","shippingOptions","checked","",1,"form-check-input"],["for","shippingMethodRadio1",1,"form-check-label","font-16","fw-bold"],[1,"mb-0","ps-3","pt-1"],[1,"border","p-3","rounded"],["type","radio","id","shippingMethodRadio2","name","shippingOptions",1,"form-check-input"],["for","shippingMethodRadio2",1,"form-check-label","font-16","fw-bold"],[1,"row","mt-4"],[1,"col-sm-6"],[1,"btn","btn-secondary",3,"routerLink"],[1,"mdi","mdi-arrow-left"],[1,"text-sm-end","mt-2","mt-sm-0"],["href","javacript:void(0)",1,"btn","btn-success"],[1,"mdi","mdi-cash-multiple","me-1"]],template:function(a,b){1&a&&(e.\u0275\u0275elementStart(0,"div")(1,"h4",0),e.\u0275\u0275text(2,"Saved Address"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"p",1),e.\u0275\u0275text(4,"Fill the form below in order to send you the order's invoice."),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"div",2)(6,"div",3)(7,"div",4)(8,"div",5)(9,"a",6),e.\u0275\u0275element(10,"i",7),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(11,"div",8),e.\u0275\u0275element(12,"input",9),e.\u0275\u0275elementStart(13,"label",10),e.\u0275\u0275text(14,"Home"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(15,"h5",11),e.\u0275\u0275text(16,"Brent Rowe"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(17,"p",12)(18,"span",13),e.\u0275\u0275text(19,"Address:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(20," 3559 Roosevelt Wilson Lane San Bernardino, CA 92405"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(21,"p",12)(22,"span",13),e.\u0275\u0275text(23,"Phone:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(24," (123) 456-7890"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(25,"p",14)(26,"span",13),e.\u0275\u0275text(27,"Mobile:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(28," (+01) 12345 67890"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(29,"div",3)(30,"div",4)(31,"div",5)(32,"a",6),e.\u0275\u0275element(33,"i",7),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(34,"div",8),e.\u0275\u0275element(35,"input",15),e.\u0275\u0275elementStart(36,"label",16),e.\u0275\u0275text(37,"Office"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(38,"h5",11),e.\u0275\u0275text(39,"Brent Rowe"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(40,"p",12)(41,"span",13),e.\u0275\u0275text(42,"Address:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(43," 3559 Roosevelt Wilson Lane San Bernardino, CA 92405"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(44,"p",12)(45,"span",13),e.\u0275\u0275text(46,"Phone:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(47," (123) 456-7890"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(48,"p",14)(49,"span",13),e.\u0275\u0275text(50,"Mobile:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(51," (+01) 12345 67890"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(52,"h4",17),e.\u0275\u0275text(53,"Shipping Method"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(54,"p",18),e.\u0275\u0275text(55,"Fill the form below in order to send you the order's invoice."),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(56,"div",2)(57,"div",19)(58,"div",20)(59,"div",8),e.\u0275\u0275element(60,"input",21),e.\u0275\u0275elementStart(61,"label",22),e.\u0275\u0275text(62,"Standard Delivery - FREE"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(63,"p",23),e.\u0275\u0275text(64,"Estimated 5-7 days shipping (Duties and tax may be due upon delivery)"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(65,"div",24)(66,"div",8),e.\u0275\u0275element(67,"input",25),e.\u0275\u0275elementStart(68,"label",26),e.\u0275\u0275text(69,"Fast Delivery - $25"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(70,"p",23),e.\u0275\u0275text(71,"Estimated 1-2 days shipping (Duties and tax may be due upon delivery)"),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(72,"div",27)(73,"div",28)(74,"a",29),e.\u0275\u0275element(75,"i",30),e.\u0275\u0275text(76," Back to Shopping Cart "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(77,"div",28)(78,"div",31)(79,"a",32),e.\u0275\u0275element(80,"i",33),e.\u0275\u0275text(81," Continue to Payment "),e.\u0275\u0275elementEnd()()()()()),2&a&&(e.\u0275\u0275advance(74),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(1,S)))},directives:[c.yS],styles:[""]}),l})();const y=function(){return["../shopping-cart"]};let E=(()=>{class l{constructor(){}ngOnInit(){}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["app-checkout-payment"]],decls:64,vars:2,consts:[[1,"header-title"],[1,"sub-header"],[1,"border","p-3","mb-3","rounded"],[1,"float-end"],[1,"fab","fa-cc-paypal","font-24","text-primary"],[1,"form-check"],["type","radio","id","BillingOptRadio2","name","billingOptions",1,"form-check-input"],["for","BillingOptRadio2",1,"form-check-label","font-16","fw-bold"],[1,"mb-0","ps-3","pt-1"],[1,"far","fa-credit-card","font-24","text-primary"],["type","radio","id","BillingOptRadio1","name","billingOptions","checked","",1,"form-check-input"],["for","BillingOptRadio1",1,"form-check-label","font-16","fw-bold"],[1,"row","mt-4"],[1,"col-md-12"],[1,"mb-3"],["for","card-number",1,"form-label"],["type","text","id","card-number","data-toggle","input-mask","data-mask-format","0000 0000 0000 0000","placeholder","4242 4242 4242 4242",1,"form-control"],[1,"row"],[1,"col-md-6"],["for","card-name-on",1,"form-label"],["type","text","id","card-name-on","placeholder","Master Shreyu",1,"form-control"],[1,"col-md-3"],["for","card-expiry-date",1,"form-label"],["type","text","id","card-expiry-date","data-toggle","input-mask","data-mask-format","00/00","placeholder","MM/YY",1,"form-control"],["for","card-cvv",1,"form-label"],["type","text","id","card-cvv","data-toggle","input-mask","data-mask-format","000","placeholder","012",1,"form-control"],[1,"fas","fa-money-bill-alt","font-24","text-primary"],["type","radio","id","BillingOptRadio4","name","billingOptions",1,"form-check-input"],["for","BillingOptRadio4",1,"form-check-label","font-16","fw-bold"],[1,"col-sm-6"],[1,"btn","btn-secondary",3,"routerLink"],[1,"mdi","mdi-arrow-left"],[1,"text-sm-end","mt-2","mt-sm-0"],["href","javacript:void(0)",1,"btn","btn-success"],[1,"mdi","mdi-cash-multiple","me-1"]],template:function(a,b){1&a&&(e.\u0275\u0275elementStart(0,"div")(1,"h4",0),e.\u0275\u0275text(2,"Payment Selection"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"p",1),e.\u0275\u0275text(4,"Fill the form below in order to send you the order's invoice."),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(5,"div",2)(6,"div",3),e.\u0275\u0275element(7,"i",4),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(8,"div",5),e.\u0275\u0275element(9,"input",6),e.\u0275\u0275elementStart(10,"label",7),e.\u0275\u0275text(11,"Pay with Paypal"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(12,"p",8),e.\u0275\u0275text(13,"You will be redirected to PayPal website to complete your purchase securely."),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(14,"div",2)(15,"div",3),e.\u0275\u0275element(16,"i",9),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(17,"div",5),e.\u0275\u0275element(18,"input",10),e.\u0275\u0275elementStart(19,"label",11),e.\u0275\u0275text(20,"Credit / Debit Card"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(21,"p",8),e.\u0275\u0275text(22,"Safe money transfer using your bank account. We support Mastercard, Visa, Discover and Stripe."),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(23,"div",12)(24,"div",13)(25,"div",14)(26,"label",15),e.\u0275\u0275text(27,"Card Number"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(28,"input",16),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(29,"div",17)(30,"div",18)(31,"div",14)(32,"label",19),e.\u0275\u0275text(33,"Name on card"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(34,"input",20),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(35,"div",21)(36,"div",14)(37,"label",22),e.\u0275\u0275text(38,"Expiry date"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(39,"input",23),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(40,"div",21)(41,"div",14)(42,"label",24),e.\u0275\u0275text(43,"CVV code"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(44,"input",25),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(45,"div",2)(46,"div",3),e.\u0275\u0275element(47,"i",26),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(48,"div",5),e.\u0275\u0275element(49,"input",27),e.\u0275\u0275elementStart(50,"label",28),e.\u0275\u0275text(51,"Cash on Delivery"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(52,"p",8),e.\u0275\u0275text(53,"Pay with cash when your order is delivered."),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(54,"div",12)(55,"div",29)(56,"a",30),e.\u0275\u0275element(57,"i",31),e.\u0275\u0275text(58," Back to Shopping Cart "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(59,"div",29)(60,"div",32)(61,"a",33),e.\u0275\u0275element(62,"i",34),e.\u0275\u0275text(63," Complete Order "),e.\u0275\u0275elementEnd()()()()()),2&a&&(e.\u0275\u0275advance(56),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(1,y)))},directives:[c.yS],styles:[""]}),l})();var h=i(99591);function x(l,n){if(1&l&&(e.\u0275\u0275elementStart(0,"tr")(1,"td",9),e.\u0275\u0275element(2,"img",10),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"td")(4,"a",11),e.\u0275\u0275text(5),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(6,"br"),e.\u0275\u0275elementStart(7,"small"),e.\u0275\u0275text(8),e.\u0275\u0275pipe(9,"currency"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(10,"td",5),e.\u0275\u0275text(11),e.\u0275\u0275pipe(12,"currency"),e.\u0275\u0275elementEnd()()),2&l){const a=n.$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275property("src",a.image,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate(a.name),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate2("",a.qty," x ",e.\u0275\u0275pipeBind1(9,5,a.price),""),e.\u0275\u0275advance(3),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(12,7,a.qty*a.price)," ")}}let C=(()=>{class l{constructor(){this.cartItems=[],this.total=0}ngOnInit(){this._fetchData(),this.caluculateTotal()}_fetchData(){this.cartItems=[...h.To]}caluculateTotal(){for(const a of h.To)this.total=this.total+a.price*a.qty}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["app-checkout-order-summary"]],decls:27,vars:7,consts:[[1,"border","mt-4","rounded"],[1,"header-title","p-2","mb-0"],[1,"table-responsive"],[1,"table","table-centered","table-nowrap","mb-0"],[4,"ngFor","ngForOf"],[1,"text-end"],["colspan","2"],[1,"m-0"],[1,"text-end","fw-semibold"],[2,"width","90px"],["alt","product-img","title","product-img","height","48",1,"rounded",3,"src"],["href","javascript:void(0)",1,"text-body","fw-semibold"]],template:function(a,b){1&a&&(e.\u0275\u0275elementStart(0,"div",0)(1,"h4",1),e.\u0275\u0275text(2,"Order Summary"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"div",2)(4,"table",3)(5,"tbody"),e.\u0275\u0275template(6,x,13,9,"tr",4),e.\u0275\u0275elementStart(7,"tr",5)(8,"td",6)(9,"h6",7),e.\u0275\u0275text(10,"Sub Total:"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(11,"td",5),e.\u0275\u0275text(12),e.\u0275\u0275pipe(13,"currency"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(14,"tr",5)(15,"td",6)(16,"h6",7),e.\u0275\u0275text(17,"Shipping:"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(18,"td",5),e.\u0275\u0275text(19," FREE "),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(20,"tr",5)(21,"td",6)(22,"h5",7),e.\u0275\u0275text(23,"Total:"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(24,"td",8),e.\u0275\u0275text(25),e.\u0275\u0275pipe(26,"currency"),e.\u0275\u0275elementEnd()()()()()()),2&a&&(e.\u0275\u0275advance(6),e.\u0275\u0275property("ngForOf",b.cartItems),e.\u0275\u0275advance(6),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(13,3,b.total)," "),e.\u0275\u0275advance(13),e.\u0275\u0275textInterpolate1(" ",e.\u0275\u0275pipeBind1(26,5,b.total)," "))},directives:[t.NgForOf],pipes:[t.CurrencyPipe],styles:[""]}),l})();function M(l,n){1&l&&e.\u0275\u0275element(0,"app-checkout-billing")}function I(l,n){1&l&&e.\u0275\u0275element(0,"app-checkout-shipping")}function T(l,n){1&l&&e.\u0275\u0275element(0,"app-checkout-payment")}const k=[{path:"",component:(()=>{class l{constructor(){this.pageTitle=[]}ngOnInit(){this.pageTitle=[{label:"Ecommerce",path:"/"},{label:"Checkout",path:"/",active:!0}]}}return l.\u0275fac=function(a){return new(a||l)},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["app-ecommerce-checkout"]],decls:27,vars:2,consts:[["title","Checkout",3,"breadcrumbItems"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"card-body"],[1,"col-lg-4"],["ngbNav","",1,"nav-pills","flex-column","navtab-bg","nav-pills-tab","text-center"],["nav","ngbNav"],["ngbNavItem",""],["ngbNavLink","",1,"py-2"],[1,"mdi","mdi-account-circle","d-block","font-24"],["ngbNavContent",""],["ngbNavLink","",1,"mt-2","py-2"],[1,"mdi","mdi-truck-fast","d-block","font-24"],[1,"mdi","mdi-cash-multiple","d-block","font-24"],[1,"col-lg-8"],[1,"p-3",3,"ngbNavOutlet"]],template:function(a,b){if(1&a&&(e.\u0275\u0275element(0,"app-page-title",0),e.\u0275\u0275elementStart(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",1)(6,"div",5)(7,"ul",6,7)(9,"li",8)(10,"a",9),e.\u0275\u0275element(11,"i",10),e.\u0275\u0275text(12," Billing Info "),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(13,M,1,0,"ng-template",11),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(14,"li",8)(15,"a",12),e.\u0275\u0275element(16,"i",13),e.\u0275\u0275text(17," Shipping Info "),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(18,I,1,0,"ng-template",11),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(19,"li",8)(20,"a",12),e.\u0275\u0275element(21,"i",14),e.\u0275\u0275text(22," Payment Info "),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(23,T,1,0,"ng-template",11),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(24,"app-checkout-order-summary"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(25,"div",15),e.\u0275\u0275element(26,"div",16),e.\u0275\u0275elementEnd()()()()()()),2&a){const R=e.\u0275\u0275reference(8);e.\u0275\u0275property("breadcrumbItems",b.pageTitle),e.\u0275\u0275advance(26),e.\u0275\u0275property("ngbNavOutlet",R)}},directives:[o.T,m.Pz,m.nv,m.Vx,m.uN,s,g,E,C,m.tO],styles:[""]}),l})()}];let B=(()=>{class l{}return l.\u0275fac=function(a){return new(a||l)},l.\u0275mod=e.\u0275\u0275defineNgModule({type:l}),l.\u0275inj=e.\u0275\u0275defineInjector({imports:[[c.Bz.forChild(k)],c.Bz]}),l})(),P=(()=>{class l{}return l.\u0275fac=function(a){return new(a||l)},l.\u0275mod=e.\u0275\u0275defineNgModule({type:l}),l.\u0275inj=e.\u0275\u0275defineInjector({imports:[[t.CommonModule,m.Oz,v.ig,d.p,B]]}),l})()},39475:(f,p,i)=>{i.d(p,{T:()=>e});var t=i(5e3),v=i(69808);function m(o,u){if(1&o&&(t.\u0275\u0275elementStart(0,"li",5)(1,"a",11),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&o){const r=t.\u0275\u0275nextContext().$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(r.label)}}function d(o,u){if(1&o&&(t.\u0275\u0275elementStart(0,"li",12)(1,"a",13),t.\u0275\u0275text(2),t.\u0275\u0275elementEnd()()),2&o){const r=t.\u0275\u0275nextContext().$implicit;t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(r.label)}}function c(o,u){if(1&o&&(t.\u0275\u0275elementContainerStart(0),t.\u0275\u0275template(1,m,3,1,"li",9),t.\u0275\u0275template(2,d,3,1,"li",10),t.\u0275\u0275elementContainerEnd()),2&o){const r=u.$implicit;t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",!r.active),t.\u0275\u0275advance(1),t.\u0275\u0275property("ngIf",r.active)}}let e=(()=>{class o{constructor(){this.breadcrumbItems=[],this.title=""}ngOnInit(){}}return o.\u0275fac=function(r){return new(r||o)},o.\u0275cmp=t.\u0275\u0275defineComponent({type:o,selectors:[["app-page-title"]],inputs:{breadcrumbItems:"breadcrumbItems",title:"title"},decls:11,vars:2,consts:[[1,"row"],[1,"col-12"],[1,"page-title-box"],[1,"page-title-right"],[1,"breadcrumb","m-0"],[1,"breadcrumb-item"],["href","javascript: void(0);"],[4,"ngFor","ngForOf"],[1,"page-title"],["class","breadcrumb-item",4,"ngIf"],["class","breadcrumb-item active",4,"ngIf"],["href","javascript: void(0);","routerLink","[item.path]"],[1,"breadcrumb-item","active"],["routerLink","[item.path]"]],template:function(r,s){1&r&&(t.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"ol",4)(5,"li",5)(6,"a",6),t.\u0275\u0275text(7,"UBold"),t.\u0275\u0275elementEnd()(),t.\u0275\u0275template(8,c,3,2,"ng-container",7),t.\u0275\u0275elementEnd()(),t.\u0275\u0275elementStart(9,"h4",8),t.\u0275\u0275text(10),t.\u0275\u0275elementEnd()()()()),2&r&&(t.\u0275\u0275advance(8),t.\u0275\u0275property("ngForOf",s.breadcrumbItems),t.\u0275\u0275advance(2),t.\u0275\u0275textInterpolate(s.title))},directives:[v.NgForOf,v.NgIf],styles:[""]}),o})()},29095:(f,p,i)=>{i.d(p,{p:()=>m});var t=i(69808),v=i(5e3);let m=(()=>{class d{}return d.\u0275fac=function(e){return new(e||d)},d.\u0275mod=v.\u0275\u0275defineNgModule({type:d}),d.\u0275inj=v.\u0275\u0275defineInjector({imports:[[t.CommonModule]]}),d})()}}]);