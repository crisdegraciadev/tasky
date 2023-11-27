import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'app-note-gallery',
  standalone: true,
  imports: [CommonModule, MatCardModule, NoteCardComponent],
  templateUrl: './note-gallery.component.html',
  styleUrl: './note-gallery.component.scss'
})
export class NoteGalleryComponent {
  notes = [
    {
      title: 'Note 1',
      description: 'This is a short description.'
    },
    {
      title: 'Note 2',
      description: 'This is a longer description with more content. It provides additional details about the note.'
    },
    {
      title: 'Note 3',
      description: 'A very brief description.'
    },
    {
      title: 'Note 4',
      description: 'A moderately long description that aims to give a good amount of information.'
    },
    {
      title: 'Note 5',
      description: 'This is a concise description.'
    },
    {
      title: 'Note 6',
      description: 'A lengthy description that explores various aspects of the note.'
    },
    {
      title: 'Note 7',
      description: 'A short and sweet description.'
    },
    {
      title: 'Note 8',
      description: 'An extremely detailed and lengthy description that covers every aspect of the note.'
    },
    {
      title: 'Note 9',
      description: 'This is a very short description.'
    },
    {
      title: 'Note 10',
      description: 'A somewhat brief description to provide key information.'
    }
  ];
}
