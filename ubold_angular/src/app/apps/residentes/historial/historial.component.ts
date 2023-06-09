import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { QRCodeComponent } from 'ngx-qrcode';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Residente, HistorialExpediente, Expediente } from '../../Models';
import { ServiceService } from 'src/app/apps/residentes/Service/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions, Column, TableCell } from 'pdfmake/interfaces';
import { saveAs } from 'file-saver';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-residentes-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.scss'],
})

export class HistorialComponent implements OnInit {

    pageTitle: BreadcrumbItem[] = [];
    expediente!: Residente;
    historialExpediente: HistorialExpediente[] = [];
    title = 'app';
    elementType = 'url';
    value = 'Techiediaries';
    docDefinition!: any;

    constructor(
        // private sanitizer: DomSanitizer,
        public activeModal: NgbModal,
        // private fb: FormBuilder,
        private service: ServiceService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.pageTitle = [{ label: 'Residentes', path: '/' }, { label: 'Historial', path: '/', active: true }];

        const expedienteData = JSON.parse(localStorage.getItem('expedienteData') || '');
        const historialData = JSON.parse(localStorage.getItem('historialData') || '');

        if (expedienteData && historialData) {
            this.expediente = expedienteData.data;
            this.historialExpediente = historialData.data;

            console.log('Expediente Data:', this.expediente);
            console.log('Historial Data:', this.historialExpediente);
        }
        console.log(this.expediente, 'expediente');
        console.log(this.historialExpediente, 'expediente');

        this.generatePdf();

    }

    // Function to convert image file to data URL
    getDataUrl = (url: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas to ensure transparency
                ctx?.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png'); // Preserve transparency by using PNG format
                resolve(dataURL);
            };
            img.onerror = reject;
            img.src = url;
        });
    };

    // private getPdfDownloadLink = (docDefinition: TDocumentDefinitions): Promise<string> => {
    //     return new Promise((resolve) => {
    //       const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    //       pdfDocGenerator.getBlob((blob) => {
    //         const dataUrl = URL.createObjectURL(blob);
    //         resolve(dataUrl);
    //       });
    //     });
    //   }

    generatePdf = async () => {
        const imageDataUrl = await this.getDataUrl(this.expediente.expe_Fotografia || 'https://i.ibb.co/Wn8HrLm/blank-profile-picture.jpg');
        const backgroundDataUrl = await this.getDataUrl('https://i.ibb.co/8YqvgZM/3.png');


        this.docDefinition =
        {

            background: {
                image: backgroundDataUrl,
                width: 595.28,
                height: 841.89,
                opacity: 0.5,
                fit: [800, 600],
                alignment: 'center',
                margin: [0, (841.89 - 600) / 2], // Adjust the top margin for vertical centering
            },
            content: [

                {
                    columns: [
                        {
                            width: 100,
                            height: 120,
                            image: imageDataUrl,
                            fit: [110, 120],
                        },
                        {
                            width: 250,
                            stack: [
                                {
                                    text: this.expediente.cent_Nombre,
                                    fontSize: 10,
                                    // width: 75,
                                    margin: [0, 0, 100, 0]// Add margin: [top, right, bottom, left]
                                },
                                {
                                    margin: [0, 5, 0, 0],
                                    text: `${this.expediente.resi_Nombres} ${this.expediente.resi_Apellidos}`,
                                    style: 'subheader',
                                },
                                {
                                    margin: [0, 7, 0, 0],
                                    text: [
                                        { text: 'Sexo: ', bold: true, style: 'subheader2' },
                                        { text: this.expediente.sexoDes, style: 'subheader2' },
                                    ]
                                },
                                {
                                    margin: [0, 7, 0, 0],
                                    text: [
                                        { text: 'Fecha de Nacimiento: ', bold: true, style: 'subheader2' },
                                        { text: moment(this.expediente.resi_Nacimiento).format('DD/MM/YYYY'), style: 'subheader2' },
                                    ]
                                },
                                {
                                    margin: [0, 7, 0, 0],
                                    text: [
                                        { text: 'Tipo de Sangre: ', bold: true, style: 'subheader2' },
                                        { text: this.expediente.tiposang_Nombre, style: 'subheader2' },
                                    ]
                                },
                                {
                                    margin: [0, 7, 0, 0],
                                    text: [
                                        { text: 'Enfermedades: ', bold: true, style: 'subheader2' },
                                        { text: this.expediente.resi_Enfermedades || 'Ninguna', style: 'subheader2' },
                                    ]
                                }
                            ]
                        },
                        // {
                        //     width: 75,
                        //     qr: this.value,
                        //     margin: [0, 7, 0, 0],
                        // }
                    ] as Column[],
                    columnGap: 20,
                },
                {
                    margin: [0, 35, 0, 20],
                    canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1, lineColor: '#cccccc' }],
                },
                {
                    columns: [
                        {
                            width: '100%',
                            stack: [
                                {
                                    table: {
                                        headerRows: 1,
                                        widths: ['5%', '15%', '50%', '30%'],
                                        body: [
                                            [
                                                { text: '#', bold: true, fontSize: 10, margin: [0, 5, 0, 5] },
                                                { text: 'Fecha', bold: true, fontSize: 10, margin: [0, 5, 0, 5] },
                                                { text: 'Observaciones', bold: true, fontSize: 10, margin: [0, 5, 0, 5] },
                                                { text: 'Empleado', bold: true, fontSize: 10, margin: [0, 5, 0, 5] },
                                            ],
                                            ...this.historialExpediente.map((historial, index) => [
                                                { text: index + 1, fillColor: undefined, fontSize: 10, margin: [0, 5, 0, 5] },
                                                { text: moment(historial.histexpe_FechaActualizacion).format('DD/MM/YY'), fillColor: undefined, fontSize: 10, margin: [0, 5, 0, 5] },
                                                { text: historial.histexpe_Observaciones, fillColor: undefined, fontSize: 10, margin: [0, 5, 0, 5] },
                                                { text: historial.empe_NombreCompleto, fillColor: undefined, fontSize: 10, margin: [0, 5, 0, 5] },
                                            ]),
                                        ],
                                        //   width: '100%', // Set the table width to 100%
                                    },
                                    layout: 'noBorders',
                                }

                            ]
                        }
                    ]
                }

            ],
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                },
                subheader: {
                    fontSize: 13,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                },
                subheader2: {
                    fontSize: 10,
                    italics: true
                }
            }
        };

        // const pdfDownloadLink = await this.getPdfDownloadLink(docDefinition);

        // Generate the QR code
        // this.qrcode.data = pdfDownloadLink;
        // this.qrcode.generate();

        const pdfDocGenerator = pdfMake.createPdf(this.docDefinition);
        pdfDocGenerator.getBlob(async (blob) => {
            const dataUrl = URL.createObjectURL(blob);

             /*IMPORTANTE */
             this.service.getPDFUpload(blob).subscribe(
                (response: any) => {
                  this.value = response.url;
                  this.expediente.expe_QRCode = response.url;
                },
                (error: any) => {
                  console.error(error);
                }
              );

            // console.log(savedFileURL);

            const iframe = document.createElement('iframe');
            iframe.src = dataUrl;
            iframe.style.width = '100%';
            iframe.style.height = '1250px';

            const pdfContainer = document.createElement('div');
            pdfContainer.style.textAlign = 'center';
            pdfContainer.appendChild(iframe);

            const historialContainer = document.getElementById('historialContainer');
            historialContainer?.appendChild(pdfContainer);

            // Trigger change detection to ensure the value is updated in the component
            this.changeDetectorRef.detectChanges();
        });

    }

    // onQRCodeScanned(value: string) {
    //     if (value === this.value) {
    //       this.downloadPDF();
    //     }
    //   }

    //   downloadPDF() {
    //     const pdfDocGenerator = pdfMake.createPdf(this.docDefinition);
    //     pdfDocGenerator.download('document.pdf');
    //   }
}

