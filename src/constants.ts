export const constants = {
    backendApiBaseUrl: `${process.env.API_BASE_URL}`,
    API_BASE_URL_LOCAL: `${process.env.API_BASE_URL_LOCAL}`,
    API_BASE_URL: "/api",

    //Authentication Routes
    SIGN_IN: "/auth/login",
    SIGN_UP: "/auth/signup",
};

export const dateTimeFormat = {
    full: "dd MMM yyyy @ HH:mm",
    date: "dd MMM yyyy",
    time: "HH:mm",
    timeAndTimezone: "HH:mm Z",
};
