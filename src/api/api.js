import Axios from "axios";

const instance = Axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "19ba1a2a-eda8-4d73-9a0f-f5e60f4f78e5"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    unFollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    }
};

export const auth = {
    me() {
        return instance.get(`auth/me`);
    },
    loginIn(email, password, rememberMe = false, captcha= null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    loginOut() {
        return instance.delete(`auth/login`)
    }
};

export const securityAPI = {
   getCaptchaUrl() {
       return instance.get(`security/get-captcha-url`)
   }
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status })
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
};