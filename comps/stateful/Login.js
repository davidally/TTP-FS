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

  const formikField = {
      width: "100%",
      margin: "15px 0"
  };

class Login extends React.Component {
    constructor(props){
        super(props);
    }

    moveToReg = () => {
        this.props.redirect();
    }


    render(){

        return (
            <div className="login-container">
                    <h1>LOGIN</h1>
                    <small className="form-caption">Sign up for an account today to start viewing and saving stocks.</small>

                    <Formik
                        initialValues={{ 
                            email: '',
                            pass: ''
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout( () => {
                                values.email === 'test@test.io' ? actions.setErrors({email: 'That email has been taken.'}) : actions.resetForm()
                                actions.setSubmitting(false);
                            }, 1500);
                        }}
                        validationSchema={userSchema}
                    >
                        {formikProps => (
                            <Form className="login-form">
                                <Field 
                                    type="email" 
                                    name="email"
                                    placeholder="Email"
                                    onChange={formikProps.handleChange("email")}
                                    style={formikField}
                                />
                                <ErrorMessage name="email" render={msg => <small className="error-alert">{msg}</small>}/><br/>

                                <Field 
                                    type="password" 
                                    name="password"
                                    placeholder="Password"
                                    onChange={formikProps.handleChange("pass")}
                                    style={formikField}
                                />
                                <ErrorMessage name="password" render={msg => <small>{msg}</small>}/><br/>

                                <small><a onClick={this.moveToReg}>Need an account? Register here.</a></small><br/>

                                <button type="submit" disabled={formikProps.isSubmitting} className="login-btn">
                                    Log In
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
                        color: rgb(22, 50, 92);
                    }

                    .login-container {
                        border: 1px solid grey;
                        border-radius: 5px;
                        box-shadow: -5px 5px 8px rgb(0, 0, 0, 0.2);
                        padding: 20px;
                        width: 600px;
                        margin: 0 auto;
                    }

                    .login-form {
                        margin-top: 20px;
                    }

                    .error-alert {
                        margin-left: 10px;
                        color: red;
                    }

                    .form-caption {
                        color: rgb(191, 67, 27);
                    }

                    .login-btn {
                        border: 2px solid #9e85fc;
                        border-radius: 4px;
                        padding: 10px 20px;
                        margin: 20px 0;
                        background-color: #f93e60;
                    }

                    .login-btn:hover {
                        background-color: rgba(0,0,0,0);
                        cursor: pointer;
                    }
                `}</style>
            </div>
        );
    }
}

export default Login;