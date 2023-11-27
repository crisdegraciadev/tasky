import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '@shared/types/note';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {
  @Input() note!: Note;
}
