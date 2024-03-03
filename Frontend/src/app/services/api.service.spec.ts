import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { users } from '../interfaces/user.inteface';
import { expectedUsers } from './testdata/users';

describe('ApiService', () => {
  let service: ApiService;
  let testingController : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ApiService);
    testingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets user by Id', ()=>{
    let id = '206ff9b5-5413-4f20-b343-501285fcf0a3' // pass userId
    service.getOneUserDetails(id).subscribe((user:any)=>{
      expect(user).toBeTruthy()
      expect(user.name).toBeTruthy('Duncan')
    })

    const mockReq = testingController.expectOne(`http:localhost:4100/user/${id}`)
    mockReq.flush(expectedUsers[0])
    expect(mockReq.request.method).toBe('GET')
  })

  it('registers a user', ()=>{
    let mockUser ={
      userId: "206ff9b5-5413-4f20-b343-501285fcf0a3",
      firstname: "johannes",
      lastname: "johannes",
      email: "johannes@gmail.com",
      password: "johannes"
    }

    service.createUser(mockUser).subscribe(res=>{
      expect(res.message).toEqual('Account created successfully')
    })

    const mockReq = testingController.expectOne('http://localhost:4100/users')
    expect(mockReq.request.method).toEqual('POST')
    expect(mockReq.request.body).toBe(mockUser)
    mockReq.flush({"message": "Account created successfully"})
  })
});
