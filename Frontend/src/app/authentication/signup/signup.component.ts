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
      },
      { validators: passwordMatchValidator }
    );
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

  register() {
    if (this.registrationForm.valid) {
      const { cPassword, ...finalData } = this.registrationForm.value;
      this.userService.register(finalData).subscribe({
        next: (response) => {
          Swal.fire({ text: response.message, icon: 'success' });
        },
        error: (error) => {
          Swal.fire({ text: error.error.message, icon: 'error' });
        },
      });
    }
  }
}
