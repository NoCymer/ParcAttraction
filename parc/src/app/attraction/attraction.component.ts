import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AttractionService } from '../Service/attraction.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AttractionInterface } from '../Interface/attraction.interface';
import { MatCardModule } from '@angular/material/card';
import { ReviewService } from '../Service/review.service';
import { ReviewInterface } from '../Interface/review.interface';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'attraction',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './attraction.component.html',
  styleUrl: './attraction.component.scss'
})
export class AttractionComponent {
  public attractionId!: number;
  public attraction!: Observable<AttractionInterface>;
  public reviews!: Observable<ReviewInterface[]>;
  public newReview: Partial<ReviewInterface> = this.blankReview();

  constructor(
    public attractionService: AttractionService,
    public reviewService: ReviewService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.attractionId = this.route.snapshot.params['id'];
    this.attraction = this.attractionService.getAttraction(this.attractionId);
    this.reviews = this.reviewService.getAllReview(this.attractionId);
  }
  
  public reviewAverageScore(reviews: ReviewInterface[]) {
    return reviews.reduce((sum, num) => sum + num.rating, 0) / reviews.length;
  }

	private modalService = inject(NgbModal);

	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        this.submitReview();
        this.newReview = this.blankReview();
			},
		);
	}


  blankReview(): Partial<ReviewInterface> {
    return {
      name: "",
      surname: "",
      comment: "",
      rating: 0
    };
  }

  reviewDisplayName(review: ReviewInterface) {
    let isAnonymous = !review.surname || !review.name;
    return (isAnonymous ? "Anonymous" : `${review.name} ${review.surname}`)
  }

  submitReview() {
    console.log('Submitted Review:', this.newReview);
    // Here, you'd typically call reviewService to submit the review:
    // this.reviewService.addReview(this.newReview).subscribe();
    try{
      let review = this.newReview as ReviewInterface;
      
      this.reviewService.postReview(this.attractionId, review).subscribe({
        next: (response) => {
          console.log('Review posted successfully:', response);
          this.reviews = this.reviewService.getAllReview(this.attractionId);
        },
        error: (error) => {
          console.error('Error posting review:', error);
          // Optionally show an error message to the user
        }
      });
    }
    catch(e: any){ }
  }
}
