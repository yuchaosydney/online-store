import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import * as fromService from '../../services';

import * as fromModel from '../../models/index';

@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss']
})
export class FileDropZoneComponent implements OnInit {

  fileList: Array<fromModel.UploadFile> = [];

  @Input()
  existingFiles: String[] = [];

  @Output() uploadFilesSuccess: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() uploadFiles: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fileService: fromService.FileService) {}

  ngOnInit() {}

  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedFiles: Array<fromModel.UploadFile> = Object.keys(event.dataTransfer.files).map(key => event.dataTransfer.files[key]);
    droppedFiles.forEach(file => file.id = Math.random().toString(36).substr(2, 9));
    this.uploadAllFiles(droppedFiles);
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  private uploadAllFiles(files: fromModel.UploadFile[]) {
    this.uploadFiles.emit('');
    this.fileService.uploadFiles(files).subscribe((uploadedFiles: string[]) => {
      this.uploadFilesSuccess.emit(uploadedFiles);
    });
  }
}
