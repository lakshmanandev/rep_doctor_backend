// For now, use dummy data or MongoDB logic if you have models

exports.fetchAllDoctors = async () => {
    return [
        { id: 1, name: 'Dr. Arjun', specialization: 'Cardiology' },
        { id: 2, name: 'Dr. Meera', specialization: 'Dermatology' },
    ];
};

exports.fetchDoctorById = async (id) => {
    const doctor = { id, name: 'Dr. Arjun', specialization: 'Cardiology' };
    if (!doctor) throw new Error('Doctor not found');
    return doctor;
};

exports.createDoctor = async (data) => {
    return { message: 'Doctor created', doctor: data };
};

exports.updateDoctor = async (id, data) => {
    return { message: 'Doctor updated', doctor: { id, ...data } };
};

exports.deleteDoctor = async (id) => {
    return { message: `Doctor with ID ${id} deleted` };
};
