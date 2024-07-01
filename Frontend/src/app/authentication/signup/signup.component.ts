import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import { ageValidator, passwordMatchValidator } from 'src/app/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registrationForm!: FormGroup;
  selectedFile!: File;
  hobbiesList: string[] = [
    'Gardening',
    'Painting',
    'Reading',
    'Dancing',
    'Singing',
  ];

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        full_name: [
          '',
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$"),
          ],
        ],
        user_name: [
          '',
          [Validators.required, Validators.pattern('^[a-z0-9_]{1,20}$')],
        ],
        role: ['', Validators.required],
        gender: ['', Validators.required],
        hobbies: this.fb.array([], Validators.required),
        dob: ['', [Validators.required, ageValidator]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        mobile_no: this.fb.array([
          this.fb.control('', [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/),
          ]),
        ]),
        addresses: this.fb.array([this.createAddress]),
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
          ],
        ],
        cPassword: ['', Validators.required],
        profile_pic: [''],
      },
      { validators: passwordMatchValidator }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  get mobileNumbers() {
    return this.registrationForm.get('mobile_no') as FormArray;
  }

  removeMobileNo(i: number) {
    if (this.mobileNumbers.length > 1) {
      this.mobileNumbers.removeAt(i);
    }
  }

  addMobileNo() {
    this.mobileNumbers.push(
      this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ])
    );
  }

  createAddress() {
    return this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

  get addressList(): FormArray {
    return this.registrationForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addressList.push(this.createAddress());
  }

  removeAddress(i: number) {
    if (this.addressList.length > 1) {
      this.addressList.removeAt(i);
    }
  }

  hasError(index: number, controlName: string, errorName: string): boolean {
    return (
      this.addressList.at(index).get(controlName)?.hasError(errorName) ?? false
    );
  }

  get hobbies(): FormArray {
    return this.registrationForm.get('hobbies') as FormArray;
  }

  onHobbyChange(event: any): void {
    const hobbies: FormArray = this.hobbies;
    if (event.target.checked) {
      hobbies.push(this.fb.control(event.target.value));
    } else {
      const index = hobbies.controls.findIndex(
        (x) => x.value === event.target.value
      );
      hobbies.removeAt(index);
    }
  }

  register() {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append(
        'full_name',
        this.registrationForm.get('full_name')?.value
      );
      formData.append(
        'user_name',
        this.registrationForm.get('user_name')?.value
      );
      formData.append('role', this.registrationForm.get('role')?.value);
      formData.append('gender', this.registrationForm.get('gender')?.value);
      this.registrationForm.get('hobbies')?.value.forEach((hobby: string) => {
        formData.append('hobbies', hobby);
      });
      formData.append('dob', this.registrationForm.get('dob')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      this.registrationForm
        .get('mobile_no')
        ?.value.forEach((number: string) => {
          formData.append('mobile_no', number);
        });
      formData.append('password', this.registrationForm.get('password')?.value);

      if (this.selectedFile) {
        formData.append('profile_pic', this.selectedFile);
      }

      this.userService.register(formData).subscribe({
        next: (response) => {
          console.log(response.data);
          Swal.fire({ text: response.message, icon: 'success' });
          this.registrationForm.reset();
        },
        error: (error) => {
          Swal.fire({ text: error.error.message, icon: 'error' });
        },
      });
    }
  }
}
