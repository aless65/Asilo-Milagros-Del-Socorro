import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { EventService } from '../core/service/event.service';
import { LAYOUT_DETACHED, LAYOUT_HORIZONTAL, LAYOUT_TWO_COLUMN_MENU, LAYOUT_VERTICAL, LAYOUT_WIDTH_BOXED, LEFT_SIDEBAR_TYPE_CONDENSED, LEFT_SIDEBAR_TYPE_DEFAULT } from './shared/config/layout.model';
import { getLayoutConfig } from './shared/helper/utils';
import { LayoutConfig } from './shared/models/layout-config.model';
import { ServiceService } from '../layout/Service/service.service'; // Importa el servicio MenuService
import { MenuItem } from '../layout/shared/models/menu.model';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit, AfterViewInit {

  // layout related config
  layoutType!: string;
  layoutColor!: string;
  layoutConfig!: LayoutConfig;
  layoutWidth!: string;
  configuredDemo: string = "default";
  menuItems: MenuItem[] = []; // Array para almacenar los elementos del menú


  constructor(
    private eventService: EventService,
    private menuService: ServiceService // Inyecta el servicio MenuService
  ) {}

  ngOnInit(): void {
    // default settings
    this.configuredDemo = environment.demo;

    let isAdmin: boolean = false; // Asigna un valor por defecto a isAdmin
  let roleId: number = 2;

  // Lógica para determinar si el usuario es administrador y obtener el ID del rol del usuario
  // Asigna los valores correspondientes a las variables isAdmin y roleId

   // Llama al método getMenuItems del servicio MenuService para obtener los elementos del menú
  /* this.menuService.getMenuItems(isAdmin, roleId).subscribe(
    (menuItems: MenuItem[]) => {
      this.menuItems = menuItems;
    },
    (error: any) => {
      console.error('Error al obtener los elementos del menú:', error);
    }
  );*/

    // tslint:disable-next-line: max-line-length
    this.layoutType = this.configuredDemo === 'creative' ? LAYOUT_HORIZONTAL : (this.configuredDemo === 'modern' ? LAYOUT_DETACHED : (this.configuredDemo === 'saas' ? LAYOUT_TWO_COLUMN_MENU : LAYOUT_VERTICAL));
    this.setLayoutConfig();

    // listen to event and change the layout configuarations
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
      this.setLayoutConfig();
    });

    this.eventService.subscribe('changeLayoutColor', (color) => {
      setTimeout(() => {
        this.layoutColor = color;
      }, 20);
    });

    this.eventService.subscribe('changeLayoutWidth', (width) => {
      setTimeout(() => {
        this.layoutWidth = width;
        if (this.layoutWidth === LAYOUT_WIDTH_BOXED) {
          this.eventService.broadcast('changeLeftSidebarType', LEFT_SIDEBAR_TYPE_CONDENSED);
        } else {
          this.eventService.broadcast('changeLeftSidebarType', LEFT_SIDEBAR_TYPE_DEFAULT);
        }
      }, 20);
    });


    

    this.updateDimensions();

  }

  ngAfterViewInit(): void {
    document.body.classList.remove('authentication-bg', 'authentication-bg-pattern', 'auth-fluid-pages', 'pb-0');
  }

  /**
   * set layout config
   */
  setLayoutConfig(): void {
    this.layoutConfig = getLayoutConfig(this.layoutType);
    this.layoutWidth = this.layoutConfig.layoutWidth;
    this.layoutColor = this.layoutConfig.layoutColor;
  }

  /**
 * changes left sidebar type based on screen dimensions
 */
  updateDimensions(): void {
    if (this.layoutType !== LAYOUT_TWO_COLUMN_MENU) {
      if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
        this.eventService.broadcast('changeLeftSidebarType', LEFT_SIDEBAR_TYPE_CONDENSED);
      }
      else if (window.innerWidth > 1028) {
        this.eventService.broadcast('changeLeftSidebarType', LEFT_SIDEBAR_TYPE_DEFAULT);
      }
    }
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }

  /**
   * Check if the detached layout is requested
   */
  isDetachedLayoutRequested() {
    return this.layoutType === LAYOUT_DETACHED;
  }

  /**
   * Check if two column layout is requested
   */
  isTwoColumnMenuLayoutRequested() {
    return this.layoutType === LAYOUT_TWO_COLUMN_MENU;
  }



}
