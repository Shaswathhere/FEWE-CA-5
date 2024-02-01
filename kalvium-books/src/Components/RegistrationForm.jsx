import React from "react";
import { useNavigate } from 'react-router-dom';
import './Forms.css';
import { useForm } from "react-hook-form";


const Forms = () => {
    const { register, handleSubmit, formState: { errors, isSubmitted }, trigger, watch } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        const isRegistrationSuccessful = data.password === data.confirmPassword;

        if (isRegistrationSuccessful) {
            alert('Registration Successful . Please Click OK to redirect to Home page')
            navigate('/');
        } else {
            alert('Registration Error')
        }
    };

    const handlePasswordChange = async () => {
        await trigger("confirmPassword", {
            shouldFocus: false,
        });
    };

    
    

    return (
        <div className="parent">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 id="h2">KALVIUM BOOKS</h2>
                <br/>
                <div>
                    {isSubmitted && Object.keys(errors).length === 0 && (
                        <p id="p">Registration Successful</p>
                    )}
                </div>
                <label htmlFor="firstName">Enter Your First Name</label>
                <input id="input" type="text" {...register("firstName", { required: "Please Enter Your First Name" })} />
                {errors.firstName && <p>{errors.firstName.message}</p>}

                <label htmlFor="lastName">Enter Your Last Name</label>
                <input id="input" type="text" {...register("lastName", { required: "Please Enter Your Last Name" })} />
                {errors.lastName && <p>{errors.lastName.message}</p>}

                <label htmlFor="email">Enter Your E-mail</label>
                <input id="input" type="email" {...register("email", { required: "Please Enter Your E-mail" })} />
                {errors.email && <p>{errors.email.message}</p>}

                <label htmlFor="password">Enter Your Password</label>
                <input
                    id="input"
                    type="password"
                    {...register("password", {
                        minLength: {
                            value: 5,
                            message: "Password must be more than 4 characters",
                        },
                        maxLength: {
                            value: 20,
                            message: "Password cannot be more than 20 characters",
                        },
                    })}
                    onChange={() => {
                        handlePasswordChange();
                    }}
                />
                {errors.password && <p>{errors.password.message}</p>}

                <label htmlFor="confirmPassword">Confirm Your Password</label>
                <input
                    id="input"
                    type="password"
                    {...register("confirmPassword", {
                        required: "Please Confirm Your Password",
                        validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                />
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

                <button id="button" type="submit">Register</button>
            </form>
        </div>
    );
};

export default Forms;
