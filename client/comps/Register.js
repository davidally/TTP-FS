import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import fetch from 'isomorphic-unfetch';

class Register extends React.Component {
    constructor(props){
        super(props);

        this.userSchema = yup.object().shape({
            email: yup
              .string()
              .email('That email is not valid.')
              .required('A valid email is required.'),
            pass: yup
              .string('Password must use characters.')
              .min(5, 'Password must be 5 characters or longer.')
              .required('A valid password is required.')
          }),
        this.formikStyles = {
            field: {
                width: "100%",
                margin: "15px 0"
            }
        }
    }

    render(){
        return (
            <div>
                    <h1>REGISTER</h1>
                    <p className="form-caption">Sign up for an account today to start viewing and saving stocks.</p>

                    <Formik
                        initialValues={{ 
                            name: '',
                            email: '',
                            pass: ''
                        }}
                        onSubmit={(values, actions) => {
                            // Send registration data to server for processing
                            setTimeout( () => {
                                fetch('/api/user/register', {
                                    method: 'post',
                                    headers: {
                                        'Accept': 'application/json, text/plain, */*',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(values)
                                }).then((res) => {
                                    res.status == 201 ? this.props.redirect() : ''
                                })
                                .catch(err => {
                                    console.log(err)
                                    actions.setErrors({
                                        generalError: "Something went wrong when registering..."
                                    })
                                })

                                actions.setSubmitting(false);
                            }, 1500);
                        }}
                        validationSchema={this.userSchema}
                    >
                        {
                            formikProps => (
                                <Form className="auth-form">
                                    <ErrorMessage name="generalError" render={msg => <small className="error-alert">{msg}</small>}/><br/>
                                    <Field 
                                        type="text" 
                                        name="name"
                                        placeholder="Name"
                                        onChange={formikProps.handleChange("name")}
                                        style={this.formikStyles.field}
                                    />
                                    <Field 
                                        type="email" 
                                        name="email"
                                        placeholder="Email"
                                        onChange={formikProps.handleChange("email")}
                                        style={this.formikStyles.field}
                                    />
                                    <ErrorMessage name="email" render={msg => <small className="error-alert">{msg}</small>}/><br/>

                                    <Field 
                                        type="password" 
                                        name="password"
                                        placeholder="Password"
                                        onChange={formikProps.handleChange("pass")}
                                        style={this.formikStyles.field}
                                    />
                                    <ErrorMessage name="password" render={msg => <small>{msg}</small>}/><br/>

                                    <small><a onClick={this.props.redirect}>Already have an account? Log in.</a></small><br/>

                                    <button type="submit" disabled={formikProps.isSubmitting} className="btn alt">
                                        Submit
                                    </button>
                                </Form>
                            )
                        }
                    </Formik>

                <style jsx>{`

                    h1 {
                        font-size: 60px;
                        margin-bottom: 20px;
                        width: 100%;
                        text-align: center;
                    }

                    .auth-form {
                        margin-top: 20px;
                    }
                `}</style>
            </div>
        );
    }
}

export default Register;