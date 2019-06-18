import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const userSchema = yup.object().shape({
    email: yup
      .string()
      .email('This email is not valid.')
      .required('A valid email is required.'),
    pass: yup
      .string('Email not valid')
      .min(9, 'Password must be 9 characters or longer.')
      .required('A valid password is required.')
  });

class Authenticate extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        return (
            <div className="auth-container">
                    <h1>REGISTER/LOGIN</h1>

                    <Formik
                        initialValues={{ 
                            email: '',
                            pass: ''
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout( () => {
                                if (values.email === 'test@test.io') {
                                    actions.setErrors({
                                        email: 'Sorry but that email is already taken.'
                                    });
                                } else {
                                    actions.resetForm();
                                }
                                actions.setSubmitting(false);
                            }, 2000);
                        }}
                        validationSchema={userSchema}
                    >
                        {formikProps => (
                            <Form className="auth-form">
                                <Field 
                                    type="email" 
                                    name="email"
                                    placeholder="Email"
                                    onChange={formikProps.handleChange("email")}
                                />
                                <ErrorMessage name="email" render={msg => <small>{msg}</small>}/><br/>

                                <Field 
                                    type="password" 
                                    name="password"
                                    placeholder="Password"
                                    onChange={formikProps.handleChange("pass")}
                                />
                                <ErrorMessage name="password" render={msg => <small>{msg}</small>}/><br/>


                                <button type="submit" disabled={formikProps.isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>

                <style jsx>{`

                    h1 {
                        font-size: 50px;
                        margin-bottom: 20px;
                        width: 100%;
                        text-align: center;
                    }

                    .auth-container {
                        border: 1px solid grey;
                        border-radius: 5px;
                        box-shadow: -5px 5px 8px rgb(0, 0, 0, 0.2);
                        padding: 20px;
                        width: 600px;
                        margin: 0 auto;
                    }

                    small {
                        margin-left: 10px;
                        color: red;
                    }
                `}</style>
            </div>
        );
    }
}

export default Authenticate;