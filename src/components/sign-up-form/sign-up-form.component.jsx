import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.components";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('password did not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            user.displayName = displayName;
            await createUserDocumentFromAuth(user)
            setFormFields(defaultFormFields)
        }
        catch (error) {
            console.log("Cound not login", error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }



    return (
        <div className="sign-up-container" >
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} >

                <FormInput
                    label='Display Name'
                    type="text"
                    required
                    name="displayName"
                    onChange={handleChange}
                    value={displayName} />


                <FormInput
                    label='Email'
                    type="email"
                    required name="email"
                    onChange={handleChange}
                    value={email} />

                <FormInput
                    label='Password'
                    type="password"
                    required name="password"
                    onChange={handleChange}
                    value={password} />


                <FormInput
                    label='Confirm Password'
                    type="password"
                    required name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword} />

                <Button type="submit">Sign Up</Button>

            </form>
        </div>
    )
}

export default SignUpForm