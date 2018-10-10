import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { FileDropZoneComponent } from './file-drop-zone.component';

import * as fromServices from '../../services';
import * as fromPublicService from '../../../services';

import { reducers } from '../../store/reducers';

describe('FileDropZoneComponent', () => {
  let component: FileDropZoneComponent;
  let fixture: ComponentFixture<FileDropZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('products', reducers)
      ],
      declarations: [ FileDropZoneComponent ],
      providers: [
        ...fromServices.services,
        ...fromPublicService.services
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
