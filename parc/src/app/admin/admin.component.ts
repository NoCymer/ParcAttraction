import { Component, TemplateRef } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, MatCardModule, FormsModule, TranslatePipe, TranslateDirective],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  public formulaireAttractions: FormGroup[] = [];
  public newAttraction: Partial<AttractionInterface> = this.blankAttraction();

  constructor(
    public attractionService: AttractionService,
    private translate: TranslateService,
    public formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public modalService: NgbModal,
  ) {}
  
  public attractions: Observable<AttractionInterface[]> = this.getAttractions();

  public onSubmit(attractionFormulaire: FormGroup) {
    console.log(attractionFormulaire)
    this.attractionService.postAttraction(attractionFormulaire.getRawValue()).subscribe(result => {
      attractionFormulaire.patchValue({attraction_id: result.result});
      this._snackBar.open(result.message, undefined, {
        duration: 1000
      });
    });
  }

  public addAttraction() {
    this.formulaireAttractions.push(
      new FormGroup({
        attraction_id: new FormControl(),
        nom: new FormControl("", [Validators.required]),
        description: new FormControl("", [Validators.required]),
        difficulte: new FormControl(),
        visible: new FormControl(true)
      })
    );
  }

  getAttractions(): Observable<AttractionInterface[]> {
    return this.attractionService.getAllAttraction().pipe(tap((attractions:AttractionInterface[]) => {
      this.formulaireAttractions = [];
      attractions.forEach(attraction => {
        this.formulaireAttractions.push(
          new FormGroup({
            attraction_id: new FormControl(attraction.attraction_id),
            nom: new FormControl(attraction.nom, [Validators.required]),
            description: new FormControl(attraction.description, [Validators.required]),
            difficulte: new FormControl(attraction.difficulte),
            visible: new FormControl(attraction.visible)
          })
        );
      });
    }));
  }

    open(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          console.log('se')
          this.submitAttraction();
          this.newAttraction = this.blankAttraction();
        },
      );
    }
    
    openDeleteModal(content: TemplateRef<any>, id: number) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.attractionService.deleteAttraction(id).subscribe(
            {
              next: (response) => {
                console.log('Attraction deleted successfully:', response);
                this.attractions = this.getAttractions();
              },
              error: (error) => {
                console.error('Error deleting:', error);
              }
            }
          )
        },
      );
    }
    
  

    submitAttraction() {
      try{
        let attraction = this.newAttraction as AttractionInterface;
        
        this.attractionService.postAttraction(attraction).subscribe({
          next: (response) => {
            console.log('Attraction posted successfully:', response);
            this.attractions = this.getAttractions();
          },
          error: (error) => {
            console.error('Error posting review:', error);
          }
        });
      }
      catch(e: any){ }
    }
  
    blankAttraction(): Partial<AttractionInterface> {
      return {
        nom: "",
        description: "",
        visible: false,
        difficulte: 0
      };
    }
}
