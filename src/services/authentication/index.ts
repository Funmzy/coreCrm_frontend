import { constants } from "@/constants";
import axios from "axios";

class Authentication {
    async signIn(username?: string, password?: string) {
        const formData = new FormData();
        formData.append("username", username ?? "");
        formData.append("password", password ?? "");

        console.log(formData);

        console.log(`${constants.backendApiBaseUrl}/auth/login`);
        console.log({ formData });

        const response = await axios({ url: `${constants.backendApiBaseUrl}/auth/login`, method: "POST", data: formData });

        console.log({ response });

        return response.data
    }

    async signUp(email: string, password: string, username: string) {
        await axios.post(constants.SIGN_UP, {
            email,
            password,
            username,
        });
        return { email, password };
    }
}

export default Authentication;
