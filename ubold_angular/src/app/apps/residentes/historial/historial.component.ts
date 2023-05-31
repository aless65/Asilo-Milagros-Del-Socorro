import { Component, OnInit, } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Residente } from '../../Models';
// import { CRMCUSTOMERS } from '../../crm/shared/data';
import { ServiceService } from 'src/app/apps/residentes/Service/service.service';
import { Router } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-residentes-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.scss'],
})

export class HistorialComponent implements OnInit {

    pageTitle: BreadcrumbItem[] = [];

    constructor(
        // private sanitizer: DomSanitizer,
        public activeModal: NgbModal,
        // private fb: FormBuilder,
        private service: ServiceService,
        private route: Router
    ) { }

    ngOnInit(): void {
        this.pageTitle = [{ label: 'Residentes', path: '/' }, { label: 'Historial', path: '/', active: true }];
        this.generatePDF();
    }

    generatePDF() {
        let docDefinition = {
            header: 'C#Corner PDF Header',
            content: 'Sample PDF generated with Angular and PDFMake for C#Corner Blog'
        };

        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBlob((blob) => {
            const dataUrl = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            iframe.src = dataUrl;
            iframe.style.width = '100%';
            iframe.style.height = '1250px';

            const pdfContainer = document.createElement('div');
            pdfContainer.style.textAlign = 'center';
            pdfContainer.appendChild(iframe);

            const historialContainer = document.getElementById('historialContainer');
            historialContainer?.appendChild(pdfContainer);
        });
    }

}
