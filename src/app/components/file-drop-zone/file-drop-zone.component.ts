import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState} from '../../models/app-state';

@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss']
})
export class FileDropZoneComponent implements OnInit {

  @Output()
  uploadAll: EventEmitter<File[]> = new EventEmitter<File[]>();

  private appStore: Store<AppState>;
  fileList: Array<File>;

  constructor() { }

  ngOnInit() {}

  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedFiles: Array<File> = Object.keys(event.dataTransfer.files).map(key => event.dataTransfer.files[key]);
    this.fileList = this.fileList
    ? [...this.fileList, ...droppedFiles] : droppedFiles;
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  uploadAllFiles(event: Event) {
    event.preventDefault();
    this.uploadAll.emit(this.fileList);
  }

}
