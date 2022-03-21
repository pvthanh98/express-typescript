const convertError = (errors: Array<any>) => {
    const { constraints } = errors[0];
    let message = '';
    for (const key in constraints) {
        message = constraints[key];
        break;
    }

    return {
        code: "PARAS_1",
        message
    }
}

export {
    convertError
}