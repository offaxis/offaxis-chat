
export function displayErrors(response) {
    if(response.errors) {
        for(var i in response.errors) {
            const error = response.errors[i];
            alert(error.type + ' : ' + error.message);
        }
    }
}
