const vision = require('@google-cloud/vision');
const moment = require('moment');

const CREDENTIALS = {
    "type": "service_account",
    "project_id": "saurav-test-407109",
    "private_key_id": "7e1613d8871d10b2bb9410d948499343bd86e779",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNBsYtqP5fGmtc\nWniza6gw+itrkACdZzugZRs5YJsEVEmkV5AIcNK8BbDjQdGSYlTLLcFEToB7SI6D\nWRoc8Z0rh5VaNFaUxmt0fbKt74zvsyxyWodpmyGpM7AtIPKCJwcUJuipEgvbH8Yz\ntk1Zf2jysby5+tId6Wc3wgzn48ef1l8f8dRIBvzVrlHSy/kazbZiOPB41vF1liCS\n42dMzCmR7NcAPnR2BYWcvT+Hlf7WryRQhYr3v1kw0ZlFDdMuZPhIy+xJSrkMLypn\nPKdC7STHm06xWMNf5BqLjs7YMlHcGyZCGKpp/L6Wj/LPWkh2gTxnKNtHpnNnIwKH\n/ZBDQup3AgMBAAECggEAIHVzl5P7HYRZvefG1yTynjpk+GT2a/UFgBmxqy5LrG5J\nsF56e5OdEU5XWEs5yhKOORJ32AAToDD2+v12wGFSECupbfv+PxSAu5MQ4C+eIO69\nWSdS69m3BQodWK+wJQHXwY19ZRLp1Jmdr98rNMGSlGWmKs12SW0DvdSXZXjuyDOH\nz5HTU87J/USzJE3rs+EeNiSbdDaGxHdirgqgOmU1/tFx8iKu7SwSnCiSPI5x/Rk7\nUfSHen0SiZpEoAETkSfmxXxelUv9gF4TbkTLrMfbO6CN2Q01MTG4+PFu14lsvih5\nGmPveUuoGCtY0JeQbMZX1lULyjpHs15Z2o7jpdqNZQKBgQD5/F+No7EjMJCfzkwd\ndpOF0fMUcEbG5pGDnP69J5U3I073/AQdNJvJRBTyla9XADoLudPdIeTU377w5kw/\n/DpaokMS7roE2HMvkffT1KQ2/EXiSuyb1IF18QVvrDzGKawXS7SW3ibjIHTKQq+2\nuh5ilbxo+GGp5DBGgJdZz71UnQKBgQDR9YCpXqRkFi19F8Fteq55RRwJF3qQqGc9\n64Kt8c8TABsCOT+CJ2tk7CBjneIaLHa9JN3VfDnOKQIFqpKoE4wjwPso4n1juHnS\noaVy4ahN0vA5xHbVA5WdRYOXVFGFifbExch9EbLDDRwCkOzqemcOD1UT48O1nvnc\nEdeuW8ftIwKBgQCG2e5NwMS4f+U0X5vNtP5ljNj86Ig1mYFbpx//t8+Ve9WIjolF\nm/CBxNkr9zUr0HJ/itHQEw2XC8+7se/mAFEWPTvDhcYRARY5zhsLSUUAaFvmc5Zp\nhVwE3GybTiVGnIo50tvrGpGNqh92UDzrbEEh2zZUxdAhTngAQDPk/dxbPQKBgQDE\nqewhOYhMQ8XKFZVWAgMpjoVrMrXYiBVkl5QpcIWha4jg9VS6ikf7GX5hMQMXtyxl\nkQHFNX5D0H+XZSXID79Fwj7AFh6TaLmbhVQfHqXyd7ISuicA8kGTNgjDl/RgXFFs\nEULxe8FxGHdzI+L24z5imhP79G1eUxIBhCj9pfTH9wKBgCg9wdP1mWbGK4Y78qVP\nUeQANvI2UhqhFYUqfkL6tszR/YviAV35LAiBKgkLQ5Ok2IM2q+OO0WOCMQLO+NYp\nfzXZ2BwUn3cEVcrAH7UutzOWz6U+7CO3eQKVOS5aIPSsTyiuh4ITan7fIxPrUMgZ\nslZWuwSABUFaCSL6UFuBciWr\n-----END PRIVATE KEY-----\n",
    "client_email": "saurav-test@saurav-test-407109.iam.gserviceaccount.com",
    "client_id": "111754007414409575667",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/saurav-test%40saurav-test-407109.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

const CONFIG = {
    credentials: CREDENTIALS,
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectText = async (file_path) => {
    try {
        const [result] = await client.textDetection(file_path);
        let temp = result.fullTextAnnotation.text;

        // Removing the Thai characters
        const thaiCharacterRegex = /[\u0E00-\u0E7F]/g;
        temp = temp.replace(thaiCharacterRegex, '');

        let text = temp.split("\n");

        // Remove empty strings and strings without any alphabet or numbers
        text = text.filter(item => item.trim() !== '' && /[a-zA-Z0-9]/.test(item));

        let id_index = findIndexByText(text, "Thai National ID Card") + 1;
        let Identification_Number = text[id_index];

        let name_index = findIndexByText(text, "Name");
        let Name = removeSubstring(text[name_index], "Name ");

        let lastname_index = findIndexByText(text, "Last name");
        let Last_Name = removeSubstring(text[lastname_index], "Last name ");

        let issue_index = findIndexByText(text, "Date of Issue") - 1;
        let Date_of_Issue = getDate(text[issue_index]);

        let expiry_index = findIndexByText(text, "Date of Expiry") - 1;
        let Date_of_Expiry = getDate(text[expiry_index]);

        let dob_index = findIndexByText(text, "Date of Birth");
        let Date_of_Birth = getDate(removeSubstring(text[dob_index], "Date of Birth "));

        let final = {
            identification_number: Identification_Number,
            name: Name,
            last_name: Last_Name,
            date_of_birth: Date_of_Birth,
            date_of_issue: Date_of_Issue,
            date_of_expiry: Date_of_Expiry
        };

        console.log(final);
        return final;

    } catch (error) {
        console.error('Error during text detection:', error.message);
        return null; // Return null in case of an error
    }
};

function findIndexByText(array, targetText) {
    return array.findIndex(item => item.toLowerCase().includes(targetText.toLowerCase()));
}

function removeSubstring(inputString, substringToRemove) {
    return inputString.replace(substringToRemove, '');
}

function getDate(dateString) {
    let dateObject = moment(dateString, 'DD MMM. YYYY');
    return dateObject.format('YYYY-MM-DD');
}

module.exports = detectText;
