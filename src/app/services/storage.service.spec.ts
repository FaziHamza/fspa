import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set data in local storage', () => {
    service.setData('testKey', 'testValue');
    expect(window.localStorage.getItem('testKey')).toEqual('testValue');
  });

  it('should get data from local storage', () => {
    window.localStorage.setItem('testKey', 'testValue');
    const data = service.getData('testKey');
    expect(data).toEqual('testValue');
  });

  it('should return null if data does not exist in local storage', () => {
    const data = service.getData('nonExistentKey');
    expect(data).toBeNull();
  });
});
