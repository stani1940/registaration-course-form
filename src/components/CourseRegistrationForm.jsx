import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import bg from 'date-fns/locale/bg'; // Import Bulgarian locale from date-fns

registerLocale('bg', bg); // Register Bulgarian locale

const CourseRegistrationForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        phone: '',
        email: '',
        city: '',
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, birth_date: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://admin.perfectconsult.bg/api/register-course', {
                ...formData,
                birth_date: formData.birth_date ? formData.birth_date.toISOString().split('T')[0] : '' // Format date to YYYY-MM-DD
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setSuccessMessage(response.data.message);
            setErrors({});
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="container mt-5 px-1">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="mb-4 text-center">Регистрация за курс</h1>

                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="border p-3 rounded">
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    id="username"
                                    name="username"
                                    placeholder="Потребителско име"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                {errors.username && <div className="invalid-feedback">{errors.username[0]}</div>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    name="password"
                                    placeholder="Парола"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                    id="first_name"
                                    name="first_name"
                                    placeholder="Име"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                {errors.first_name && <div className="invalid-feedback">{errors.first_name[0]}</div>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className={`form-control ${errors.middle_name ? 'is-invalid' : ''}`}
                                    id="middle_name"
                                    name="middle_name"
                                    placeholder="Презиме"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                />
                                {errors.middle_name && <div className="invalid-feedback">{errors.middle_name[0]}</div>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Фамилия"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                                {errors.last_name && <div className="invalid-feedback">{errors.last_name[0]}</div>}
                            </div>
                        </div>

                        {/* Date Picker Field for Birth Date */}
                        <div className="row mb-3">
                            <div className="col-12">
                                <DatePicker
                                    selected={formData.birth_date}
                                    onChange={handleDateChange}
                                    className={`form-control ${errors.birth_date ? 'is-invalid' : ''}`}
                                    id="birth_date"
                                    name="birth_date"
                                    placeholderText="Дата на раждане"
                                    locale="bg" // Set locale to Bulgarian
                                    dateFormat="dd.MM.yyyy" // Date format
                                />
                                {errors.birth_date && <div className="invalid-feedback">{errors.birth_date[0]}</div>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    id="phone"
                                    name="phone"
                                    placeholder="Телефон"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                                {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                            </div>
                        </div>

                        {/* Row for Email */}
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    name="email"
                                    placeholder="Имейл"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                            </div>
                        </div>

                        <div className="row mb-1">
                            <div className="col-12">
                                <input
                                    type="text"
                                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                    id="city"
                                    name="city"
                                    placeholder="Град на живеене"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                                {errors.city && <div className="invalid-feedback">{errors.city[0]}</div>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-warning btn-block mt-3">Регистрация за курс</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseRegistrationForm;
