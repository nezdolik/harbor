import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GcComponent } from './gc.component';
import { SERVICE_CONFIG, IServiceConfig } from '../../service.config';
import { GcApiRepository, GcApiDefaultRepository} from './gc.api.repository';
import { GcRepoService } from './gc.service';
import { SharedModule } from "../../shared/shared.module";
import { ErrorHandler } from '../../error-handler/error-handler';
import { GcViewModelFactory } from './gc.viewmodel.factory';
import { GcUtility } from './gc.utility';
import { of } from 'rxjs';

describe('GcComponent', () => {
  let component: GcComponent;
  let fixture: ComponentFixture<GcComponent>;
  let gcRepoService: GcRepoService;
  let config: IServiceConfig = {
    systemInfoEndpoint: "/api/system/gc"
  };
  let mockSchedule = [];
  let mockJobs = [
    {
    id: 22222,
    schedule: null,
    job_status: 'string',
    creation_time: new Date(),
    update_time: new Date(),
    }
  ];
  let spySchedule: jasmine.Spy;
  let spyJobs: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ GcComponent ],
      providers: [
        { provide: GcApiRepository, useClass: GcApiDefaultRepository },
        { provide: SERVICE_CONFIG, useValue: config },
        GcRepoService,
        ErrorHandler,
        GcViewModelFactory,
        GcUtility
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcComponent);
    component = fixture.componentInstance;

    gcRepoService = fixture.debugElement.injector.get(GcRepoService);
    spySchedule = spyOn(gcRepoService, "getSchedule").and.returnValues(of(mockSchedule));
    spyJobs = spyOn(gcRepoService, "getJobs").and.returnValues(of(mockJobs));
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
