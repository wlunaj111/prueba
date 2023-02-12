import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
         // Create the form
         this.signUpForm = this._formBuilder.group({
            firstName       : ['', Validators.required],
            lastName        : ['', Validators.required],
            email           : ['', [Validators.required, Validators.email]],
            plainPassword   : ['', [Validators.required, Validators.minLength(4)]],
        }
    );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {

        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            console.error('form invalid');
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {
                    console.log('response',response);
                    console.log('response',response.status);


                     // Set the alert
                     this.alert = {
                        type   : 'error',
                        //message: 'Something went wrong, please try again.'
                        message: response.status
                    };

                    // Show the alert
                    this.showAlert = true;
                    // Navigate to the confirmation required page
                    this._router.navigateByUrl('/sign-in');
                },
                (response) => {
                    console.log('response error',response);

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    //this.signUpNgForm.resetForm();

                    //Message error in Spanish
                    // let message = 'Algo salió mal. Por favor, vuelva a intentarlo.';
                    // if (response.error.message == 'The user already has an account.'){
                    //     message = 'Ya existe un usuario con estos datos, por favor intente con otro correo.';
                    // }

                    let message = 'Upps!! algo salió mal. Compruebe su conexión y vuelva a intentarlo';
                    switch (response.error.message) {
                        case 'The user already has an account.': {
                            message = 'Ya existe un usuario con estos datos, por favor intente con otro correo.';
                          break;
                        }
                        case 'Register form error': {
                            message = 'A ocurrido un error en el registro. Asegúrese de que su correo sea válido';
                          break;
                        }
                      }

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        //message: 'Something went wrong, please try again.'
                        message: message
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
