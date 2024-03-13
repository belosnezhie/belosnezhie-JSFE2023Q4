import { BasicComponent } from '../components/BasicComponent';
import { loginPage } from '../components/loginPage/LoginPage';
import { mainPage } from '../components/mainPage/MainPage';
import { startPage } from '../components/startPage/StartPage';

export class PageState {
  currentPage: BasicComponent | undefined;
  pages: BasicComponent[] = [];
  parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.currentPage = undefined;
    this.parent = parent;
    this.pages.push(loginPage);
    this.pages.push(startPage);
    this.pages.push(mainPage);
  }

  public getCurrentPage() {
    return this.currentPage;
  }

  public setCurrentPage(currentPage: BasicComponent) {
    this.pages.forEach((page) => {
      page.removeChildren();
      page.removeComponent();
    });
    this.currentPage = currentPage;
    this.currentPage.render();
    this.parent.append(currentPage.component);
  }
}
