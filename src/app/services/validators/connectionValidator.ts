const connectionValidators = {
  isRegisterFormValid: (user: {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
  }): string | null => {
    if (!user.firstname) {
      return `Le prénom est requis`;
    }
    if (!user.lastname) {
      return `Le nom est requis`;
    }
    if (!user.email) {
      return `L'email est requis`;
    }
    if (!user.password) {
      return `Le mot de passe est requis`;
    }
    return null;
  },
  isLoginFormValid: (user: {
    email?: string;
    password?: string;
  }): string | null => {
    if (!user.email) {
      return `L'email est requis`;
    }
    if (!user.password) {
      return `Le mot de passe est requis`;
    }
    return null;
  },
};

export default connectionValidators;
