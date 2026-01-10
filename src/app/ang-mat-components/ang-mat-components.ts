import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-ang-mat-components',
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ang-mat-components.html',
  styleUrl: './ang-mat-components.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AngMatComponents {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  readonly task = signal<Task>({
    name: 'Parent task',
    completed: false,
    subtasks: [
      {name: 'Child task 1', completed: false},
      {name: 'Child task 2', completed: false},
      {name: 'Child task 3', completed: false},
    ],
  });

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return {...task};
    });
  }

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  template: `<span class="example-pizza-party" matSnackBarLabel>
  Pizza party!!!
</span>
  <span matSnackBarActions>
  <button matButton matSnackBarAction (click)="snackBarRef.dismissWithAction()">🍕</button>
</span>

  `,
  styles: `
    :host {
      display: flex;
    }

    .example-pizza-party {
      color: hotpink;
    }
  `,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Install Angular</h2>
  <mat-dialog-content class="mat-typography">
    <h3>Develop across all platforms</h3>
    <p>Learn one way to build applications with Angular and reuse your code and abilities to build
      apps for any deployment target. For web, mobile web, native mobile and native desktop.</p>

    <h3>Speed &amp; Performance</h3>
    <p>Achieve the maximum speed possible on the Web Platform today, and take it further, via Web
      Workers and server-side rendering. Angular puts you in control over scalability. Meet huge
      data requirements by building data models on RxJS, Immutable.js or another push-model.</p>

    <h3>Incredible tooling</h3>
    <p>Build features quickly with simple, declarative templates. Extend the template language with
      your own components and use a wide array of existing components. Get immediate Angular-specific
      help and feedback with nearly every IDE and editor. All this comes together so you can focus
      on building amazing apps rather than trying to make the code work.</p>

    <h3>Loved by millions</h3>
    <p>From prototype through global deployment, Angular delivers the productivity and scalable
      infrastructure that supports Google's largest applications.</p>

    <h3>What is Angular?</h3>

    <p>Angular is a platform that makes it easy to build applications with the web. Angular
      combines declarative templates, dependency injection, end to end tooling, and integrated
      best practices to solve development challenges. Angular empowers developers to build
      applications that live on the web, mobile, or the desktop</p>

    <h3>Architecture overview</h3>

    <p>Angular is a platform and framework for building client applications in HTML and TypeScript.
      Angular is itself written in TypeScript. It implements core and optional functionality as a
      set of TypeScript libraries that you import into your apps.</p>

    <p>The basic building blocks of an Angular application are NgModules, which provide a compilation
      context for components. NgModules collect related code into functional sets; an Angular app is
      defined by a set of NgModules. An app always has at least a root module that enables
      bootstrapping, and typically has many more feature modules.</p>

    <p>Components define views, which are sets of screen elements that Angular can choose among and
      modify according to your program logic and data. Every app has at least a root component.</p>

    <p>Components use services, which provide specific functionality not directly related to views.
      Service providers can be injected into components as dependencies, making your code modular,
      reusable, and efficient.</p>

    <p>Both components and services are simply classes, with decorators that mark their type and
      provide metadata that tells Angular how to use them.</p>

    <p>The metadata for a component class associates it with a template that defines a view. A
      template combines ordinary HTML with Angular directives and binding markup that allow Angular
      to modify the HTML before rendering it for display.</p>

    <p>The metadata for a service class provides the information Angular needs to make it available
      to components through Dependency Injection (DI).</p>

    <p>An app's components typically define many views, arranged hierarchically. Angular provides
      the Router service to help you define navigation paths among views. The router provides
      sophisticated in-browser navigational capabilities.</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button matButton mat-dialog-close>Cancel</button>
    <button matButton [mat-dialog-close]="true" cdkFocusInitial>Install</button>
  </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {}
