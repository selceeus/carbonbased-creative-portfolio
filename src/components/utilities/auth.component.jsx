import axios from 'axios';

function Auth() {

    const apiUrl = "https://cms.matthewa.development/wp-json";

    const loginData = {
        username: "selceeus",
        password: "1201ButterGus!"
    };
    
    axios
        .post('https://cms.matthewa.development/wp-json/jwt-auth/v1/token', loginData)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_nicename', res.data.user_nicename);
            localStorage.setItem('user_email', res.data.user_email);
            localStorage.setItem('user_display_name', res.data.user_display_name);
        })
        .catch((err) => {
            console.log(err);
    });
    
    const authAxios = axios
        .create({
            baseUrl: apiUrl,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
    });

}

export default Auth;