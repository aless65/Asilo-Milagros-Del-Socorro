import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/core/service/event.service';
import { AuthenticationService } from '../../../core/service/auth.service';
import { MENU_ITEMS } from '../config/menu-meta';
import { MenuItem } from '../models/menu.model';
import { findAllParent, findMenuItem } from '../helper/utils';
import feather from "feather-icons";
import { ServiceService } from 'src/app/layout/Service/service.service';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit, AfterViewInit {

  @Input() navClasses: string | undefined;
  @Input() includeUserProfile: boolean = false;
  hasTwoToneIcons: boolean = false;
  isInitialized: boolean = false;

  leftSidebarClass = 'sidebar-enable';
  activeMenuItems: string[] = [];

  loggedInUser: any = {};

  menuItems: MenuItem[] = [];

  constructor (
    // router: Router,
    private router: Router,
    private authService: AuthenticationService,
    private eventService: EventService,
    private menuService: ServiceService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenu(); //actiavtes menu
        this.hideMenu(); //hides leftbar on change of route
      }
    });


  }

  ngOnInit(): void {

    this.initMenu();
    this.loggedInUser = this.authService.currentUser();

    // const usuario = JSON.parse(localStorage.getItem('currentUser')!).data;
    let isAdmin: boolean = JSON.parse(localStorage.getItem('currentUser')!).data[0].usua_EsAdmin;
    let roleId: number =JSON.parse(localStorage.getItem('currentUser')!).data[0].role_Id;

    this.menuService.getMenuItems(isAdmin || false, roleId).subscribe(
      (response: any) => {
        console.log(response.data);
        const apiData = response.data;
        const MENU_ITEMS: MenuItem[] = [];

        for (const key in apiData) {
          const menuItemData = apiData[key];
          const menuItem: MenuItem = {
            key: menuItemData.pant_key,
            label: menuItemData.pant_Nombre,
            isTitle: !menuItemData.pant_Menu,
            icon: menuItemData.pant_Icon,
            link: menuItemData.pant_Url,
          };
          MENU_ITEMS.push(menuItem);
        }

        this.menuItems = MENU_ITEMS;

        // Validar el acceso a la pantalla actual
        // const currentUrl = window.location.pathname; // Obtener la URL actual
        // const menuItem = this.menuItems.find(item => item.link === currentUrl); // Buscar la pantalla en el menú

        // if (!menuItem) {
        //   // Si la pantalla actual no está en el menú, redirigir a una página de error
        //   this.router.navigate(['../dashboard-1']);
        // }

      },
      (error: any) => {
        console.error('Error al obtener los elementos del menú:', error);
      }

    );

    this.eventService.subscribe('toggleTwoToneIcons', (enable) => {
      this.hasTwoToneIcons = enable;
      if (this.hasTwoToneIcons) {
        document.body.setAttribute("data-sidebar-icon", "twotones");
      }
      else {
        document.body.removeAttribute("data-sidebar-icon");
      }
    });
  }

  ngOnChanges(): void {
    if (this.includeUserProfile) {
      document.body.setAttribute("data-sidebar-user", "true");
    }
    else {
      document.body.setAttribute("data-sidebar-user", "false");
    }
  }

  /**
   * On view init - activating menuitems
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu();
    });
    feather.replace();
  }

  /**
   * initialize menuitems
   */
  initMenu(): void {
    this.menuItems = this.menuItems;

  }

  /**
   * activates menu
   */
  _activateMenu(): void {
    const div = document.getElementById('side-menu');
    let matchingMenuItem = null;

    if (div) {
      let items: any = div.getElementsByClassName('side-nav-link-ref');
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-key');
        const activeMt = findMenuItem(this.menuItems, mid);
        if (activeMt) {

          const matchingObjs = [activeMt['key'], ...findAllParent(this.menuItems, activeMt)];

          this.activeMenuItems = matchingObjs;

          this.menuItems.forEach((menu: MenuItem) => {
            menu.collapsed = !matchingObjs.includes(menu.key!);
          });
        }
      }
    }
  }

  /**
   * toggles open menu
   * @param menuItem clicked menuitem
   * @param collapse collpase instance
   */
  toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
    collapse.toggle();
    let openMenuItems: string[];
    if (!menuItem.collapsed) {
      openMenuItems = ([menuItem['key'], ...findAllParent(this.menuItems, menuItem)]);
      this.menuItems.forEach((menu: MenuItem) => {
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true;
        }
      })
    }

  }


  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasSubmenu(menu: MenuItem): boolean {
    return menu.children ? true : false;
  }


  /**
   * Hides the menubar
   */
  hideMenu() {
    document.body.classList.remove('sidebar-enable');
  }

}