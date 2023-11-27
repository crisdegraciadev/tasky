import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteGalleryComponent } from './note-gallery.component';

describe('NoteGalleryComponent', () => {
  let component: NoteGalleryComponent;
  let fixture: ComponentFixture<NoteGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
