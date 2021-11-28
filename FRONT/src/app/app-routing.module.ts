import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./error/error.component";
import { KanbanComponent } from "./kanban/kanban.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'kanban-board', canActivate: [AuthGuard], component: KanbanComponent },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
