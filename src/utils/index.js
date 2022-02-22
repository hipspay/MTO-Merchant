export const generateSignature = () => 'wallet_address';

export const getAddress = () => 'wallet_address';

export const parseDate = (d) => {
    let date = new Date(d).getDate();
    let month = new Date(d).getMonth() + 1;
    let year = new Date(d).getFullYear();

    let hours = new Date(d).getHours();
    let minutes = new Date(d).getMinutes();
    return `${date}/${month}/${year} ${hours}:${minutes}`;
};
