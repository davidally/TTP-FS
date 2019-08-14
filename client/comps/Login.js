import Router from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import fetch from 'isomorphic-unfetch';


/**
 * @TODO Make this and register into containers in order to 
 * separate the Formik logic from the rest of the component.
 */
class Login extends React.Component {
    constructor(props){
        super(props);

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
                    <h1>LOGIN</h1>
                    <p className="form-caption">Sign up for an account today to start viewing and saving stocks.</p>

                    <Formik
                        initialValues={{ 
                            email: '',
                            pass: ''
                        }}
                        onSubmit={(values, actions) => {
                            setTimeout( () => {
                                // Post data to login route
                                fetch('/user/authenticate', {
                                    method: 'post',
                                    headers: {
                                        'Accept': 'application/json, */*',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(values)
                                })
                                .then(res => {
                                    if (res.status === 200){
                                        Router.push({
                                            pathname: '/dashboard' 
                                        });
                                    } else {
                                        actions.setErrors({
                                            email: 'That email was not found.'
                                        });
                                        return actions.resetForm();
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })

                                actions.setSubmitting(false);
                            }, 1500);
                        }}
                    >
                        {formikProps => (
                            <Form className="login-form">
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

                                <small><a onClick={this.props.redirect}>Need an account? Register here.</a></small><br/>

                                <button type="submit" disabled={formikProps.isSubmitting} className="btn">
                                    Log In
                                </button>
                            </Form>
                        )}
                    </Formik>

                <style jsx>{`

                    h1 {
                        font-size: 60px;
                        margin-bottom: 20px;
                        width: 100%;
                        text-align: center;
                    }

                    .login-form {
                        margin-top: 20px;
                    }
                `}</style>
            </div>
        );
    }
}

export default Login;