import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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

  @Input()
  fileList: Array<File> = [];

  private appStore: Store<AppState>;

  constructor() { }

  ngOnInit() {
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedFiles: Array<File> = Object.keys(event.dataTransfer.files).map(key => event.dataTransfer.files[key]);
    this.fileList = this.fileList
    ? [...this.fileList, ...droppedFiles] : droppedFiles;
    console.log('-----------', this.fileList);
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  uploadAllFiles(event: Event) {
    event.preventDefault();
    const uploadingFiles = Object.assign([], this.fileList.filter(file => file instanceof File));
    this.uploadAll.emit(uploadingFiles);
  }

}
