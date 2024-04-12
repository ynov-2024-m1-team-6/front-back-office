export interface Log {
  mail: string;
  password: string;
}

const login = async (
  mail: string,
  password: string
): Promise<string | null> => {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}auth/login`);
  try {
    const body = JSON.stringify({
      mail: mail,
      password: password,
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    if (!response.ok) {
      return responseJson.message;
    }
    localStorage.setItem("tokenAdmin", responseJson.data);
    return null;
  } catch (error) {
    throw error;
  }
};

const register = async (
  mail: string,
  password: string,
  firstName: string,
  name: string,
  adress: string,
  city: string,
  zipCode: string,
  phoneNumber: string
): Promise<string | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          mail,
          password,
          firstName,
          name,
          adress,
          city,
          zipCode,
          phoneNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson = await response.json();
    if (!response.ok) {
      return responseJson.message;
    }

    localStorage.setItem("tokenAdmin", responseJson.data);
    return null;
  } catch (error) {
    throw error;
  }
};

const AuthService = { login, register };
export default AuthService;
