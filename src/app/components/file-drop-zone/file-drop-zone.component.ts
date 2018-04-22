import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-drop-zone',
  templateUrl: './file-drop-zone.component.html',
  styleUrls: ['./file-drop-zone.component.scss']
})
export class FileDropZoneComponent implements OnInit {

  fileList: Array<File>;

  constructor() { }

  ngOnInit() {
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const droppedFiles: Array<File> = Object.keys(event.dataTransfer.files).map(key => event.dataTransfer.files[key]);
    this.fileList = this.fileList
    ? [...this.fileList, ...droppedFiles] : droppedFiles;
    console.log('------onDrop---------', this.fileList);
  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  uploadAll(event: Event) {
    event.preventDefault();
    console.log('-----uploadAll---------');
  }

}
