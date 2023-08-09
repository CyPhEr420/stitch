import { useState } from 'react';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss';
import { createUserDocumentFromAuth, signInUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.components';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields()
        } catch (err) {
            resetFormFields()

            switch (err.code) {
                case 'auth/wrong-password':
                    alert("Email or password is incorrect ")
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email")
                    break;
                default:
                    console.log(err.message);
                    break;
            }
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocumentFromAuth(user)
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    onChange={handleChange}
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                />
                <FormInput
                    onChange={handleChange}
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type='button' onClick={logGoogleUser} buttonType={"google"} >Googgle signIn</Button>
                </div>

            </form>

        </div>
    )
}

export default SignInForm