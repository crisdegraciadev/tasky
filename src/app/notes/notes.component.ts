import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from './ui/note-card/note-card.component';
import { NoteAddFormComponent } from './ui/note-add-form/note-add-form.component';
import { NoteGalleryComponent } from './ui/note-gallery/note-gallery.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NoteAddFormComponent, NoteCardComponent, NoteGalleryComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {}
