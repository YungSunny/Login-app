import React, {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import './LoginForm.css'
import ErrorMessage from '../../components/ErrorMessage'
import Welcome from '../../components/Welcome'


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .email("Must be valid email address")
        .required("Must enter an email"),
    password: Yup.string()
        .min(4, "Must be atleast 5 characters")
        .required("Must enter a password")
});

const LoginForm = () => {
    const [loggedIn, setLoggedIn] = useState("false");
    useEffect(() => {
        if(localStorage.getItem('username') && localStorage.getItem('password')){
            setLoggedIn(true);
        }
    },[loggedIn])

    return (
        <div className="form-wrapper">
            <header>
                Login Form
            </header>
            <Formik
                initialValues={{name: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    fetch('data.json')
                        .then(response => response.json())
                        .then((data) => {
                            if (data.username === values.name && data.password === values.password){
                                localStorage.setItem('username', data.username);
                                localStorage.setItem('password', data.password);
                                setLoggedIn("true");
                            }
                            else {
                                setLoggedIn("false");
                            }
                        });
                        resetForm();
                }}
                
            >   
                { props => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div>
                                <Field
                                    className={touched.name && errors.name ? "input-field-username-error" : "input-field-username"}
                                    name="name"
                                    type="email"
                                    placeholder="Username"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage touched={touched.name} errors={errors.name}/>
                            </div>
                            <div className="password-container">
                                <Field
                                    className={touched.password && errors.password ? "input-field-password-error" : "input-field-password"}
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage touched={touched.password} errors={errors.password}/>
                            </div>
                            <button type="submit" disabled={isSubmitting}>
                                Sign in
                            </button>
                        </Form>
                    )
                }}
            </Formik>
            <div className="welcome-message">
                <Welcome show={loggedIn}/>
            </div>
        </div>
    )

}

export default LoginForm;