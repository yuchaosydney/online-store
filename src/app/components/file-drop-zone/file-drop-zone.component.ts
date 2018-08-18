import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import * as fromService from '../../services';

@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss']
})
export class FileDropZoneComponent implements OnInit {

  @Input()
  fileList: Array<File> = [];

  constructor(
    private fileService: fromService.FileService
  ) { }

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
    const uploadingFiles = Object.assign([], this.fileList.filter(file => file instanceof File));
    this.fileService.uploadFiles(uploadingFiles).subscribe(val => {
      console.log('------subscribe--------', val);
    });
  }
}
